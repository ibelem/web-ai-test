import onnx
from onnx import helper, numpy_helper
from onnx import TensorProto
import onnxruntime as ort
import os
import math
import numpy as np

# This script creates a simple ONNX model that generates latents for a diffusion model.
# It simulates the generation of latents by applying a random normal distribution
# and scaling them with a predefined sigma value.

# Usage: python create_latents_model.py


# It emulates the following JS code:
# // Initialize latents (Batch N) for random noise​
# const latents = new ort.Tensor(randn_latents(latentShape, sigma), latentShape);​
# const latentModelInput = scale_model_inputs(latents);​
#
# // initialize latents with random noise​
# function randn_latents(shape, noise_sigma) {​
#     function randn() {​
#         // Use the Box-Muller transform​
#         let u = Math.random();​
#         while (u === 0) u = Math.random(); // avoid log(0)​
#         let v = Math.random();​
#         let z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);​
#         return z;​
#     }​
#
#     let size = 1;​
#     shape.forEach(element => { size *= element; });​
#     let data = new Float16Array(size);​
#
#     // Loop over the shape dimensions​
#     for (let i = 0; i < size; i++) {​
#         data[i] = randn() * noise_sigma;​
#     }​
#     return data;​
# }​
# // scale the latents​
# function scale_model_inputs(t) {​
#     const d_i = t.data;​
#     const d_o = new Float16Array(d_i.length);​
#     const divi = (sigma ** 2 + 1) ** 0.5;​
#
#     for (let i = 0; i < d_i.length; i++) {​
#         d_o[i] = d_i[i] / divi;​
#     }​
#     return new ort.Tensor(d_o, t.dims);​
# }​

sigma = 14.6146
divi = math.sqrt(sigma ** 2 + 1)

output_dir = '../onnx'
tensor_type = TensorProto.FLOAT16

output_path = os.path.join(output_dir, 'latents_model_f16.onnx')

# Define inputs
# We use a dummy input 'sample' to determine the shape
input_sample = helper.make_tensor_value_info('sample', tensor_type, ['batch', 'channels', 'height', 'width'])

# Define outputs
output_latents = helper.make_tensor_value_info('latents', tensor_type, ['batch', 'channels', 'height', 'width'])
output_latentModelInput = helper.make_tensor_value_info('latentModelInput', tensor_type, ['batch', 'channels', 'height', 'width'])

# Create nodes

# 1. RandomNormalLike(sample) -> noise
# mean=0.0, scale=1.0 (Standard Normal)
node_random = helper.make_node(
    'RandomNormalLike',
    inputs=['sample'],
    outputs=['noise'],
    mean=0.0,
    scale=1.0,
    name='RandomNormalLike'
)

# 2. Mul(noise, sigma) -> latents
node_mul_sigma = helper.make_node(
    'Mul',
    inputs=['noise', 'sigma_const'],
    outputs=['latents'],
    name='Mul_sigma'
)

# 3. Div(latents, divi) -> latentModelInput
node_div_divi = helper.make_node(
    'Div',
    inputs=['latents', 'divi_const'],
    outputs=['latentModelInput'],
    name='Div_divi'
)

# Initializers
sigma_init = numpy_helper.from_array(np.array([sigma], dtype=np.float16), name='sigma_const')
divi_init = numpy_helper.from_array(np.array([divi], dtype=np.float16), name='divi_const')

# Create graph
graph_def = helper.make_graph(
    [node_random, node_mul_sigma, node_div_divi],
    'latents_model',
    [input_sample],
    [output_latents, output_latentModelInput],
    initializer=[sigma_init, divi_init]
)

# Create model
model_def = helper.make_model(graph_def, producer_name='webnn-latents')
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
