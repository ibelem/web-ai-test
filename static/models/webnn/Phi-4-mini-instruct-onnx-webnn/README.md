---
license: mit
---
Based on https://huggingface.co/microsoft/Phi-4-mini-instruct

## Build Model
- Clone https://github.com/microsoft/onnxruntime-genai (based on the head of commit: d77033c) with a minor modification for WebNN to remove `If`
node as follows:
```patch
diff --git a/src/python/py/models/builder.py b/src/python/py/models/builder.py
index 7a0cb70d..774a3861 100644
--- a/src/python/py/models/builder.py
+++ b/src/python/py/models/builder.py
@@ -1459,7 +1459,7 @@ class Model:
         self.rope_attrs["save_caches"] = False
         cos_cache_small, sin_cache_small = self.make_rotary_embedding_caches(cos_cache_name=cos_cache_small_name, sin_cache_name=sin_cache_small_name)

-        if self.ep in ["dml", "NvTensorRtRtx"]:
+        if self.ep in ["dml", "NvTensorRtRtx", "webgpu"]:
             # Concat small and large cos/sin caches for DML and NvTensorRtRtx EPs
             # These EPs don't support the If operator
             cos_cache = torch.cat((cos_cache_small, cos_cache_large), dim=0)
```

- Build model with command: `python -m src/python/py/models/builder.py -m microsoft/Phi-4-mini-instruct -o Phi-4-mini-instruct-onnx -e webgpu -c cache-dir -p int4
--extra_options int4_block_size=32 int4_accuracy_level=4 int4_op_types_to_quantize=MatMul/Gather`

- The generated external data (`model.onnx.data`) is larger than 2GB, which is not suitable for ORT-Web. Move some weights to `model.onnx` to reduce the size of
`model.onnx.data` with following script:
```python
import onnx
from onnx.external_data_helper import convert_model_to_external_data

# load mode
model = onnx.load("model.onnx")

# re-convert model to external data with bigger size_threshold
convert_model_to_external_data(model, all_tensors_to_one_file=True, location='model.onnx.data', size_threshold=1024 * 1024 * 5)
onnx.save_model(model, "new_model.onnx")

```