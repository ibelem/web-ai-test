import onnx
from onnx import helper, TensorProto
import os
import numpy as np

# This script creates an ONNX model that performs preprocessing for the Safety Checker.
# It replaces the JavaScript implementation of:
# 1. Bilinear Interpolation (Resize) from dynamic input size to 224x224.
# 2. Normalization (Scale and Offset).

# JS Logic to emulate:
# const SC_MEAN = [0.48145466, 0.4578275, 0.40821073];
# const SC_STD = [0.26862954, 0.26130258, 0.27577711];
# const SC_SCALE = SC_MEAN.map((m, i) => 0.5 / SC_STD[i]);
# const SC_OFFSET = SC_MEAN.map((m, i) => (0.5 - m) / SC_STD[i]);
# val * cScale + cOffset; // Per channel

SC_MEAN = np.array([0.48145466, 0.4578275, 0.40821073], dtype=np.float32)
SC_STD = np.array([0.26862954, 0.26130258, 0.27577711], dtype=np.float32)
SC_SCALE = 0.5 / SC_STD
SC_OFFSET = (0.5 - SC_MEAN) / SC_STD

# Reshape for broadcasting [1, 3, 1, 1]
scale_data = SC_SCALE.reshape(1, 3, 1, 1).astype(np.float16)
offset_data = SC_OFFSET.reshape(1, 3, 1, 1).astype(np.float16)

output_dir = '../onnx'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

output_path = os.path.join(output_dir, 'sc_prep_model_f16.onnx')

# Define Model
# Inputs: sample (float16, [batch, 3, height, width]) - Assuming dynamic H/W from VAE
# Outputs: clip_input (float16, [batch, 3, 224, 224])

input_name = "sample"
output_name = "clip_input"

# Create inputs
# We use dynamic strings for dimensions
input_info = helper.make_tensor_value_info(
    input_name, TensorProto.FLOAT16, ["batch", 3, "height", "width"]
)

output_info = helper.make_tensor_value_info(
    output_name, TensorProto.FLOAT16, ["batch", 3, 224, 224]
)

nodes = []
initializers = []

# 1. Resize Construction
# To support dynamic batch size, we construct the 'sizes' tensor at runtime.
# ROI and Scales are empty for Resize with sizes.

# Check Opset 11 spec: Resize(X, roi, scales, sizes)
# We need to provide empty constant for roi and scales.

# Create empty roi (FLOAT)
roi_init = helper.make_tensor("roi_empty", TensorProto.FLOAT, [0], [])
initializers.append(roi_init)

# Create empty scales (FLOAT)
scales_init = helper.make_tensor("scales_empty", TensorProto.FLOAT, [0], [])
initializers.append(scales_init)

# Construct 'sizes' tensor dynamically: [batch, 3, 224, 224]
# Get input shape
nodes.append(helper.make_node("Shape", inputs=[input_name], outputs=["input_shape"]))

# Extract batch size (index 0)
# Use Gather. Indices needs to be a tensor.
batch_indices_init = helper.make_tensor("batch_index", TensorProto.INT64, [1], [0])
initializers.append(batch_indices_init)

nodes.append(helper.make_node(
    "Gather",
    inputs=["input_shape", "batch_index"],
    outputs=["batch_dim"],
    axis=0
))

# Constant for [3, 224, 224]
target_hw_init = helper.make_tensor("target_hw", TensorProto.INT64, [3], [3, 224, 224])
initializers.append(target_hw_init)

# Concat to get [batch, 3, 224, 224]
nodes.append(helper.make_node(
    "Concat",
    inputs=["batch_dim", "target_hw"],
    outputs=["resize_sizes"],
    axis=0
))

# Resize Node
# mode="linear" for bilinear interpolation
# coordinate_transformation_mode="asymmetric" matches the JS Math.floor(i * ratio) logic
nodes.append(helper.make_node(
    "Resize",
    inputs=[input_name, "roi_empty", "scales_empty", "resize_sizes"],
    outputs=["resized_output"],
    mode="linear",
    coordinate_transformation_mode="asymmetric"
))

# Normalization (Scale + Offset)
# Add Scale and Offset initializers
scale_init = helper.make_tensor(
    "scale_const",
    TensorProto.FLOAT16,
    [1, 3, 1, 1],
    scale_data.tobytes(),
    raw=True
)
initializers.append(scale_init)

offset_init = helper.make_tensor(
    "offset_const",
    TensorProto.FLOAT16,
    [1, 3, 1, 1],
    offset_data.tobytes(),
    raw=True
)
initializers.append(offset_init)

# Mul
nodes.append(helper.make_node(
    "Mul",
    inputs=["resized_output", "scale_const"],
    outputs=["scaled_output"]
))

# Add
nodes.append(helper.make_node(
    "Add",
    inputs=["scaled_output", "offset_const"],
    outputs=[output_name]
))

# Create Graph
graph_def = helper.make_graph(
    nodes,
    "sc_preprocessing",
    [input_info],
    [output_info],
    initializers
)

# Create Model
# Opset 11 is the first version to support Resize with 'sizes' input and 'coordinate_transformation_mode'
# IR Version 7 corresponds to ONNX 1.7 (Opset 11) timeframe, widely supported.
model_def = helper.make_model(
    graph_def,
    producer_name="webnn-developer-preview",
    opset_imports=[helper.make_opsetid("", 11)],
    ir_version=7
)

onnx.checker.check_model(model_def)
onnx.save(model_def, output_path)

print(f"Model saved to {output_path}")
