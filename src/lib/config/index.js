// Site configuration
export { siteTitle, siteDescription, siteURL } from './site.js';

// Constants
export { 
  MODEL_CATEGORIES,
  DATA_TYPES,
  MODEL_HOSTS,
  UNIQUE_BACKENDS,
  CORS_SITES,
  TRACKING,
  ORT_DISTS
} from './constants.js';

// Hardware
export { cpu, gpu, environment } from './hardware.js';

// Models - import from separate files
import { onnxModels } from './model_onnx.js';
import { tfliteModels } from './model_tflite.js';

// Combine all models
export const allModels = [
  ...onnxModels,
  ...tfliteModels
];

import { 
  CORS_SITES,
  MODEL_HOSTS,
  TRACKING,
  ORT_DISTS,
  UNIQUE_BACKENDS
} from './constants.js';

// Legacy exports for backward compatibility (using the same names as original config.js)
export const corsSites = CORS_SITES;
export const modelHosts = MODEL_HOSTS;
export const tracking = TRACKING;
export const ortDists = ORT_DISTS;
export const uniqueBackends = UNIQUE_BACKENDS;
export const models = allModels;

// Export individual model arrays for filtering
export { onnxModels, tfliteModels };