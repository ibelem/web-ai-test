---
license: apache-2.0
---
Base on https://huggingface.co/Qwen/Qwen2-0.5B-Instruct

Convert to onnx model using https://github.com/microsoft/onnxruntime-genai

Using command: python src/python/py/models/builder.py -m Qwen/Qwen2-0.5B-Instruct -o path-to-onnx-model -p int4 -e dml