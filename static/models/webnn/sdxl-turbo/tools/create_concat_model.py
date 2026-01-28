import onnx
from onnx import helper
from onnx import TensorProto
import os
import onnxruntime as ort

# This script creates a simple ONNX model that concatenates two hidden states
# and expands them to create prompt embeddings.
# Usage: python create_concat_model.py


# It emulates the following JS code:
# // Construct promptEmbeds (Batch N) by repeating the single batch output​
# // This ensures valid embeddings for ALL images in the batch.​
# const promptEmbedsData = new Float16Array(batchSize * 77 * 2048);​
# const te1Output = textEncoderOutputs["hidden_states.11"].data; // [77, 768]​
# const te2Output = textEncoder2Outputs["hidden_states.31"].data; // [77, 1280]​
#
# for (let i = 0; i < batchSize; i++) {​
#     for (let j = 0; j < 77; j++) {​
#         const destOffset = (i * 77 + j) * 2048;​
#         // Copy 768 from Text Encoder 1​
#         promptEmbedsData.set(te1Output.subarray(j * 768, (j + 1) * 768), destOffset);​
#         // Copy 1280 from Text Encoder 2​
#         promptEmbedsData.set(te2Output.subarray(j * 1280, (j + 1) * 1280), destOffset + 768);​
#     }​
# }​
# const promptEmbeds = new ort.Tensor("float16", promptEmbedsData, [batchSize, 77, 2048]);​
# // Construct pooledPromptEmbeds (Batch N) by repeating the single batch output​
# const pooledOutput = textEncoder2Outputs.text_embeds.data; // [1280]​
# const pooledData = new Float16Array(batchSize * 1280);​
#
# for (let i = 0; i < batchSize; i++) {​
#     pooledData.set(pooledOutput, i * 1280);​
# }​
# const pooledPromptEmbeds = new ort.Tensor("float16", pooledData, [batchSize, 1280]);​


output_dir = "../onnx"
tensor_type = TensorProto.FLOAT16

# Define inputs
# hidden_states_1: [1, 77, 768]
hidden_states_1 = helper.make_tensor_value_info('hidden_states_1', tensor_type, [1, 77, 768])
# hidden_states_2: [1, 77, 1280]
hidden_states_2 = helper.make_tensor_value_info('hidden_states_2', tensor_type, [1, 77, 1280])
# text_embeds: [1, 1280]
text_embeds = helper.make_tensor_value_info('text_embeds', tensor_type, [1, 1280])

# Dummy input for batch size inference
# sample: [batch_size]
sample = helper.make_tensor_value_info('sample', TensorProto.INT32, ['batch_size'])

# Define outputs
# prompt_embeds: [batch_size, 77, 2048]
prompt_embeds = helper.make_tensor_value_info('prompt_embeds', tensor_type, ['batch_size', 77, 2048])
# pooled_prompt_embeds: [batch_size, 1280]
pooled_prompt_embeds = helper.make_tensor_value_info('pooled_prompt_embeds', tensor_type, ['batch_size', 1280])

# Initializers (Constants)
const_77 = helper.make_tensor('const_77', TensorProto.INT64, [1], [77])
const_2048 = helper.make_tensor('const_2048', TensorProto.INT64, [1], [2048])
const_1280 = helper.make_tensor('const_1280', TensorProto.INT64, [1], [1280])

# Nodes
# 1. Concat hidden states
concat_node = helper.make_node(
    'Concat',
    inputs=['hidden_states_1', 'hidden_states_2'],
    outputs=['concat_out'],
    axis=2,
    name='Concat_1'
)

# 2. Get batch size from sample shape
# Shape(sample) -> [batch_size] (1D tensor)
shape_node = helper.make_node(
    'Shape',
    inputs=['sample'],
    outputs=['sample_shape'],
    name='Shape_1'
)

# 3. Construct shape for prompt_embeds: [batch_size, 77, 2048]
concat_shape_1 = helper.make_node(
    'Concat',
    inputs=['sample_shape', 'const_77', 'const_2048'],
    outputs=['shape_prompt'],
    axis=0,
    name='Concat_Shape_1'
)

# 4. Construct shape for pooled_prompt_embeds: [batch_size, 1280]
concat_shape_2 = helper.make_node(
    'Concat',
    inputs=['sample_shape', 'const_1280'],
    outputs=['shape_pooled'],
    axis=0,
    name='Concat_Shape_2'
)

# 5. Expand prompt_embeds
expand_1 = helper.make_node(
    'Expand',
    inputs=['concat_out', 'shape_prompt'],
    outputs=['prompt_embeds'],
    name='Expand_1'
)

# 6. Expand pooled_prompt_embeds
expand_2 = helper.make_node(
    'Expand',
    inputs=['text_embeds', 'shape_pooled'],
    outputs=['pooled_prompt_embeds'],
    name='Expand_2'
)

# Graph
graph_def = helper.make_graph(
    [concat_node, shape_node, concat_shape_1, concat_shape_2, expand_1, expand_2],
    'ConcatModel',
    [hidden_states_1, hidden_states_2, text_embeds, sample],
    [prompt_embeds, pooled_prompt_embeds],
    initializer=[const_77, const_2048, const_1280]
)

# Model
# Use IR version 8 which corresponds to opset 17 roughly, or let it default.
# ORT error says max supported IR version: 11.
# Let's try setting ir_version explicitly to 8 or 9.
model_def = helper.make_model(graph_def, producer_name='webnn-demo', opset_imports=[helper.make_opsetid("", 17)])
model_def.ir_version = 8

# Save
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
output_path = os.path.join(output_dir, "concat_model_f16.onnx")
print(f"Exporting model to {output_path}...")
onnx.save(model_def, output_path)
print(f"Model exported to {output_path}")

# Optimize using ONNX Runtime graph optimization
print("Optimizing model with ONNX Runtime...")
try:
    sess_options = ort.SessionOptions()
    sess_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_EXTENDED
    sess_options.optimized_model_filepath = output_path
    
    # Create session to trigger optimization
    sess = ort.InferenceSession(output_path, sess_options)
    print(f"Optimized model saved to {output_path}")
except Exception as e:
    print(f"Optimization failed: {e}")
    print(f"Using non-optimized model at {output_path}")
