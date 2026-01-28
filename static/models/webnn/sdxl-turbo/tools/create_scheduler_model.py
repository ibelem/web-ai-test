import onnx
from onnx import helper, numpy_helper
from onnx import TensorProto
import onnxruntime as ort
import os
import numpy as np

# This script creates a simple ONNX model that emulates the EulerA scheduler 
# for a diffusion model. It performs a mathematical operation to compute
# the previous sample based on the current sample and the output of the model.

# Usage: python create_scheduler_model.py

# It emulates the following JS code:

# const newLatents = step(unetOutputs.out_sample, latents);​
# /*​
#  * Poor mens EulerA step​
#  */​
# const sigma = 14.6146;​
# const gamma = 0;​
# const vaeScalingFactor = 0.13025; // SDXL uses 1/7.68 as scaling factor for VAE​
# // Formula: (sample - sigmaHat * out_sample) / vaeScalingFactor
# function step(modelOutput, sample) {​
#     const d_o = new Float16Array(modelOutput.data.length);​
#     const prevSample = new ort.Tensor(d_o, modelOutput.dims);​
#     const sigmaHat = sigma * (gamma + 1);​
#
#     for (let i = 0; i < modelOutput.data.length; i++) {​
#         const predOriginalSample = sample.data[i] - sigmaHat * modelOutput.data[i];​
#         const derivative = (sample.data[i] - predOriginalSample) / sigmaHat;​
#         const dt = 0 - sigmaHat;​
#         d_o[i] = (sample.data[i] + derivative * dt) / vaeScalingFactor;​
#     }​
#     return prevSample;​
# }

sigma = 14.6146
gamma = 0
vaeScalingFactor = 0.13025
sigmaHat = sigma * (gamma + 1)

output_dir = '../onnx'
tensor_type = TensorProto.FLOAT16

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, 'scheduler_model_f16.onnx')

# Define inputs
# Using symbolic dimensions for flexibility
input_sample = helper.make_tensor_value_info('sample', tensor_type, ['batch', 'channels', 'height', 'width'])
input_out_sample = helper.make_tensor_value_info('out_sample', tensor_type, ['batch', 'channels', 'height', 'width'])

# Define output
output_prevSample = helper.make_tensor_value_info('prevSample', tensor_type, ['batch', 'channels', 'height', 'width'])

# Create nodes
# Formula: (sample - sigmaHat * out_sample) / vaeScalingFactor

# Node 1: Mul(out_sample, sigmaHat)
node_mul = helper.make_node(
    'Mul',
    inputs=['out_sample', 'sigmaHat_const'],
    outputs=['mul_out'],
    name='Mul_sigmaHat'
)

# Node 2: Sub(sample, mul_out)
node_sub = helper.make_node(
    'Sub',
    inputs=['sample', 'mul_out'],
    outputs=['sub_out'],
    name='Sub_sample'
)

# Node 3: Div(sub_out, vaeScalingFactor)
node_div = helper.make_node(
    'Div',
    inputs=['sub_out', 'vaeScalingFactor_const'],
    outputs=['prevSample'],
    name='Div_vaeScalingFactor'
)

# Initializers (Constants)
# Using scalar tensors (rank 0) for broadcasting
sigmaHat_init = numpy_helper.from_array(np.array([sigmaHat], dtype=np.float16), name='sigmaHat_const')
vaeScalingFactor_init = numpy_helper.from_array(np.array([vaeScalingFactor], dtype=np.float16), name='vaeScalingFactor_const')

# Create graph
graph_def = helper.make_graph(
    [node_mul, node_sub, node_div],
    'scheduler_model',
    [input_sample, input_out_sample],
    [output_prevSample],
    initializer=[sigmaHat_init, vaeScalingFactor_init]
)

# Create model
model_def = helper.make_model(graph_def, producer_name='webnn-scheduler')
model_def.ir_version = 8
opset = model_def.opset_import[0]
opset.version = 14

# Save model
onnx.save(model_def, output_path)
print(f"Model saved to {output_path}")

# Optimize
sess_options = ort.SessionOptions()
sess_options.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
sess_options.optimized_model_filepath = output_path
session = ort.InferenceSession(output_path, sess_options)
print(f"Model optimized and saved to {output_path}")
