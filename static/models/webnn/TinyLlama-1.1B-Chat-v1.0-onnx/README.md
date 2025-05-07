---
license: apache-2.0
---

Base on https://huggingface.co/TinyLlama/TinyLlama-1.1B-Chat-v1.0

Convert to onnx model using https://github.com/microsoft/onnxruntime-genai

Using command:
python src/python/py/models/builder.py -m TinyLlama/TinyLlama-1.1B-Chat-v1.0 -o path-to-onnx-model -p int4 -e dml 