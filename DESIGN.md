# Web AI Benchmark — Design Document

> A browser-based benchmark suite for testing ML model inference across multiple web runtimes (ONNX Runtime Web, LiteRT.js) and hardware backends (Wasm, WebGL, WebGPU, WebNN CPU/GPU/NPU).

---

## 1. Project Overview

### Purpose

Benchmark and compare AI/ML model inference performance directly in the browser across different execution backends. Users select models, backends, and data types, then run timed inference loops to collect metrics like compilation time, first inference latency, median/average inference time, throughput (FPS), and 90th-percentile latency.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit (Svelte 5) with TypeScript |
| Build | Vite 7 |
| Deployment | Vercel (adapter-vercel) |
| State | `svelte-local-storage-store` (persisted to localStorage) |
| ML Runtimes | ONNX Runtime Web, LiteRT.js (loaded dynamically from `/static`) |
| Graph Viz | `@xyflow/svelte` + Dagre layout engine |
| HTTPS | Required — `@vitejs/plugin-basic-ssl` for dev, Vercel for prod |
| Security Headers | COOP: same-origin, COEP: require-corp (enables SharedArrayBuffer) |

### Key URLs

- Production: `https://webai.run`
- Model hosting: HuggingFace, HuggingFace mirror (hf-mirror.com), local `/static/models/`

---

## 2. Architecture

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  BROWSER                                                        │
│                                                                 │
│  ┌──────────┐    ┌───────────┐    ┌──────────────────────────┐  │
│  │  UI Layer │───▶│   Stores  │───▶│  Execution Engine        │  │
│  │ (Svelte) │◀───│(localStorage)│◀──│  (utils.js orchestrator)│  │
│  └──────────┘    └───────────┘    └──────────┬───────────────┘  │
│                                               │                  │
│                              ┌────────────────┼─────────────┐   │
│                              ▼                ▼             ▼   │
│                     ┌──────────────┐  ┌─────────────┐           │
│                     │ ort_utils.js │  │litert_utils.js│          │
│                     │ (ONNX RT Web)│  │ (LiteRT.js)  │          │
│                     └──────┬───────┘  └──────┬───────┘          │
│                            ▼                 ▼                  │
│                    ┌─────────────────────────────────┐           │
│                    │   Backend Execution Providers    │           │
│                    │  wasm_1 │ wasm_4 │ webgl │      │           │
│                    │  webgpu │ webnn_cpu │            │           │
│                    │  webnn_gpu │ webnn_npu           │           │
│                    └─────────────────────────────────┘           │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Model Cache Layer (OPFS / Cache API)                     │  │
│  │  nn_utils.js — progressive download with progress events  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
         ▲                                        ▲
         │ fetch model files                      │ load runtime JS
         ▼                                        ▼
  ┌──────────────┐                      ┌─────────────────┐
  │ HuggingFace  │                      │ /static/ort/    │
  │ CDN / Local  │                      │ /static/litertjs│
  └──────────────┘                      └─────────────────┘
```

### Directory Structure

```
src/
├── app.html                    # Shell HTML (origin-trial tokens, fonts)
├── app.d.ts                    # SvelteKit type declarations
├── lib/
│   ├── index.ts                # Lib entry point
│   ├── assets/
│   │   ├── css/
│   │   │   ├── _vars.css       # Design tokens (colors, spacing)
│   │   │   └── global.css      # Global styles, layout system
│   │   └── js/
│   │       ├── utils.js        # Central orchestrator: run(), queue, results, model lookup
│   │       ├── ort_utils.js    # ONNX Runtime inference execution
│   │       ├── litert_utils.js # LiteRT.js inference execution
│   │       ├── litert_helper.js# Input tensor creation for LiteRT
│   │       ├── nn_utils.js     # Model caching (OPFS / Cache API) + download progress
│   │       ├── ort_utils_custom.js  # Custom user-uploaded ONNX model handling
│   │       ├── data_type.js    # Type conversions (float16, BigInt, typed arrays)
│   │       └── pin_verify.js   # GPU vendor detection + PIN access control
│   ├── components/             # All Svelte UI components (see §4)
│   ├── config/                 # Model catalogs + constants (see §5)
│   └── store/
│       └── store.js            # All application state (persisted stores)
├── routes/                     # SvelteKit file-based routing (see §3)
static/
├── ort/                        # ONNX Runtime Web distributions (.mjs files)
├── litertjs/                   # LiteRT.js versioned distributions
├── models/                     # Local model files (ONNX, TFLite, by datatype)
├── worker.js                   # Web Worker for Dagre graph layout
├── dagre.js                    # Dagre graph layout library
├── onnx-metadata.json          # ONNX operator metadata
├── tf-metadata.json            # TensorFlow operator metadata
├── tflite-metadata.json        # TFLite operator metadata
└── fonts/                      # Self-hosted fonts
```

---

## 3. Routing

All routes use SvelteKit file-based routing. The root layout (`+layout.js`) sets `prerender = true`.

| Route | Page Component | Purpose |
|---|---|---|
| `/` | `+page.svelte` | **Main benchmark UI** — model/backend selection, test execution, results table |
| `/about` | `about/+page.svelte` | Feature overview, metrics explanation, links to related projects |
| `/run/[id]` | `run/[id]/+page.svelte` | **Single model test page** — dynamic route per model, deep-linkable |
| `/custom` | `custom/+page.svelte` | Upload & test user-provided ONNX models |
| `/custom_litert` | `custom_litert/+page.svelte` | Upload & test user-provided LiteRT models |
| `/litert` | `litert/+page.svelte` | **LiteRT model browser** — filter by category, data type, search |
| `/tflite` | `tflite/+page.svelte` | Redirects (302) to `/litert` |
| `/operators` | `operators/+page.svelte` | Browse supported ONNX operators by data type |
| `/tests` | `tests/+page.svelte` | Model browser/filtering (similar pattern to `/operators`) |
| `/graph` | `graph/+page.svelte` | Neural network graph visualization (JSON upload, vis.js) |
| `/demo` | `demo/+page.svelte` | Demo links page |
| `/demo/stable-diffusion` | `demo/stable-diffusion/+page.svelte` | Stable Diffusion demo (stub/placeholder) |
| `/install` | `install/+page.svelte` | WebNN installation guide (links to webnn.io) |
| `/workload/object-detection` | `workload/object-detection/+page.svelte` | Object detection demo (commented out / incomplete) |
| `/pv` | `pv/+page.svelte` | PIN verification related page |
| `/honry` | `honry/+page.svelte` | Single model test runner via query param `?q=<model_id>__<backend>` |
| `/c` | `c/+page.svelte` | Single model conformance test via query param (can be excluded) |

### Route Parameter Patterns

The main page (`/`) and `/run/[id]` accept URL query parameters for configuration:

| Parameter | Example | Purpose |
|---|---|---|
| `backend` | `backend=wasm_4,webgpu` | Pre-select backends |
| `datatype` | `datatype=fp32,int8` | Pre-select data types |
| `run` | `run=100` | Set number of inference runs |
| `q` | `q=model_id__backend` | Direct test execution (used in `/c`, `/honry`) |

---

## 4. Component Architecture

### Component Tree (Main Benchmark Page `/`)

```
+page.svelte
├── Header.svelte                    # Animated SVG logo + navigation
├── Nav.svelte                       # Responsive nav with dropdown menus
├── Environment.svelte               # System info (CPU, GPU, browser, memory, battery)
│   ├── ONNXRuntimeWebDetect.svelte  # ORT version selector (stable/dev from jsDelivr)
│   ├── LiteRtJsDetect.svelte       # LiteRT.js version selector (from jsDelivr)
│   └── Modal.svelte                 # Generic modal dialog (HTML <dialog>)
├── Config.svelte                    # Collapsible config panel
│   ├── ConfigBackends.svelte        # Backend toggles (7 backends)
│   ├── ConfigModels.svelte          # Model selector with category/type/datatype filters
│   ├── ConfigDataTypes.svelte       # Data type toggles (fp32, fp16, int8, int4, q4f16, etc.)
│   ├── ConfigModelTypes.svelte      # Framework toggles (ONNX, TFLite)
│   └── ConfigNumOfRuns.svelte       # Run count slider (1-1000)
├── TestQueue.svelte                 # Pending test list with status icons
├── PinModal.svelte                  # PIN verification for non-Intel GPUs
├── Info.svelte                      # Live test progress (model, queue position, progress bar)
├── InferenceLog.svelte              # Real-time log output with auto-scroll
├── Results.svelte                   # Sortable results table + screenshot/copy actions
└── Footer.svelte                    # Copyright, WebNN support badge

+page.svelte (RunManual — /run/[id])
├── Header, Nav, Footer, Environment
├── RunManual.svelte                 # Single-model test UI with metadata display
│   ├── ConfigBackends, ConfigNumOfRuns
│   ├── Info, InferenceLog, Results
│   └── PinModal

+page.svelte (/custom)
├── RunCustom.svelte                 # Custom ONNX model upload + test
│   ├── ConfigBackends, ConfigNumOfRuns
│   ├── Info, InferenceLog, Results, PinModal

+page.svelte (/custom_litert)
├── RunCustomLiteRT.svelte           # Custom LiteRT model upload + test

+page.svelte (/graph)
├── Flow.svelte                      # @xyflow/svelte graph visualization with Dagre layout
```

### Component Responsibilities Summary

| Component | Role |
|---|---|
| `Config*` components | Collect user selections → write to stores → sync with URL params |
| `Environment` | Detect hardware/software capabilities → display system info |
| `TestQueue` | Render test items with status icons (clock/spinner/check/warning) |
| `Info` | Show live test execution state (current model, download %, queue progress) |
| `Results` | Render full results table, sortable columns, copy/screenshot export |
| `InferenceLog` | Append-only log viewer with auto-scroll |
| `PinModal` | Gate test execution for non-Intel GPUs with PIN + rate limiting |
| `Modal` | Generic `<dialog>` wrapper with backdrop click-to-close |
| `RunManual` | Single model detail page: shows metadata + runs test |
| `RunCustom` / `RunCustomLiteRT` | File upload → model inspection → inference test |

---

## 5. Config System

### 5.1 Constants (`config/constants.js`)

```js
// 7 execution backends
UNIQUE_BACKENDS = ['wasm_1', 'wasm_4', 'webgl', 'webgpu', 'webnn_cpu', 'webnn_gpu', 'webnn_npu']

// Data types
DATA_TYPES = ['fp32', 'fp16', 'int8', 'int4', 'q4', 'q4f16', 'uint8', 'bnb4']

// Model download sources (tried in order)
MODEL_HOSTS = { hf: 'HuggingFace', hfm: 'HF Mirror', cf: 'Cloudfront CDN', local: '/models/' }

// Model formats
MODEL_FORMATS = ['onnx', 'tflite']

// 30+ model categories
MODEL_CATEGORIES = [
  'Fill-Mask', 'Text Classification', 'Token Classification', 'Text Generation',
  'Summarization', 'Translation', 'Image Classification', 'Object Detection',
  'Image Segmentation', 'Depth Estimation', 'Keypoint Detection', 'Feature Extraction',
  'Zero-Shot Image Classification', 'Automatic Speech Recognition',
  'Audio Classification', 'Video Classification', 'Operators', 'Microsoft 365', ...
]
```

### 5.2 Model Definition Schema (`config/model_onnx.js`, `config/model_tflite.js`)

Each model is defined as an object with this structure:

```js
{
  // Identity
  id: 'mobilenet_v2_12_fp32',         // Unique ID (used in routes, stores, results)
  name: 'MobileNet v2',               // Display name
  description: 'Image classification',
  category: 'Image Classification',    // From MODEL_CATEGORIES
  tag: '',                             // Custom label

  // Source
  source: 'https://...',              // Attribution URL
  hf: {
    model: 'user/repo',               // HuggingFace repo
    file: 'model.onnx'                // File within repo
  },
  model: 'path/to/model.onnx',        // Direct path (for local hosting)

  // Technical
  format: 'onnx',                      // 'onnx' | 'tflite'
  datatype: 'fp32',                    // From DATA_TYPES
  size: '13.3 MB',                     // Human-readable file size

  // Inputs (ONNX models — explicit tensor specs)
  inputs: [{
    'input_name': ['float32', 1, [1, 3, 224, 224], {}]
    //             dtype    seed  shape          metadata
  }],
  inputstip: '1x3x224x224',           // Human-readable shape

  // Inputs (TFLite models — typically dynamic)
  // inputstip: 'Get inputs from compiled model dynamically'

  note: ''                              // Special notes (e.g., "Large model")
}
```

**Model counts**: ~200+ ONNX models, ~80+ TFLite models, many with multiple datatype variants.

Models are defined as factory functions that return arrays (allowing multiple datatype variants per model):

```js
// Example: model_onnx.js
export const mobilenet_v2 = () => [
  { id: 'mobilenet_v2_12_fp32', datatype: 'fp32', size: '13.3 MB', ... },
  { id: 'mobilenet_v2_12_fp16', datatype: 'fp16', size: '6.7 MB', ... },
  { id: 'mobilenet_v2_12_int8', datatype: 'int8', size: '3.4 MB', ... },
];

// Aggregated in config/index.js
export const onnxModels = [
  ...mobilenet_v2(), ...resnet50(), ...bert_base(), ...
];
export const tfliteModels = [...];
export const allModels = [...onnxModels, ...tfliteModels];
```

### 5.3 Hardware Database (`config/hardware.js`)

- **`cpu` array**: 900+ entries — Intel, AMD, ARM, Apple, Qualcomm processors
- **`gpu` array**: Known GPU configs (Intel Arc, Nvidia RTX)
- **`environment` object**: Runtime-populated with detected CPU, GPU, OS, browser info

### 5.4 Site Metadata (`config/site.js`)

```js
siteTitle = "Web AI Benchmark"
siteDescription = "A benchmark suite for AI models in the browser"
siteURL = "https://webai.run"
```

---

## 6. State Management

All stores are defined in `src/lib/store/store.js` using `persisted()` from `svelte-local-storage-store`. Every store persists to `localStorage` automatically.

### Store Catalog

| Store | Type | Initial | Purpose |
|---|---|---|---|
| `numberOfRunsStore` | `number` | `1` | Inference iterations per model |
| `backendsStore` | `string[]` | `[]` | Selected backends (e.g., `['wasm_4', 'webgpu']`) |
| `dataTypesStore` | `string[]` | `[]` | Selected data types |
| `modelTypesStore` | `string[]` | `[]` | Selected model formats (onnx/tflite) |
| `modelsStore` | `string[]` | `[]` | Selected model IDs |
| `testQueueStore` | `object[]` | `[]` | Queue of `{model, backend, status}` test items |
| `testQueueLengthStore` | `number` | `0` | Cached queue size |
| `resultsStore` | `object[]` | `[]` | Collected benchmark results |
| `infoStore` | `string[]` | `[]` | Real-time log messages |
| `modelDownloadProgressStore` | `object[]` | `[]` | Download progress per model |
| `modelDownloadUrlStore` | `number` | `1` | Current CDN index |
| `autoStore` | `boolean` | `false` | Auto-run mode toggle |
| `sleepStore` | `boolean` | `false` | System sleep prevention |
| `cpuStore` | `string` | `''` | Detected CPU string |
| `refererStore` | `string` | `''` | HTTP referer |
| `ortWebVersionStore` | `object` | `{selected:1, dev:'', stable:''}` | ORT version selection |
| `liteRtJsVersionStore` | `object` | `{selected:1, stable:'', dev:'2.5.0'}` | LiteRT.js version selection |
| `customStore` | `object` | `{id, filename, inputs, outputs, nodes, ...}` | Custom uploaded model metadata |

### Store Data Flow

```
URL Params ─────▶ Config Components ─────▶ Stores ─────▶ Test Queue Builder
                        │                     │                 │
                        │                     ▼                 ▼
                        │              localStorage        utils.run()
                        │               (persist)               │
                        ▼                                       ▼
                   UI Reactivity ◀──── Results Store ◀── ort/litert_utils
```

---

## 7. Execution Pipeline

### 7.1 Test Lifecycle

```
1. USER CONFIGURES
   Config* components → write selections to stores
   URL params synced bidirectionally

2. QUEUE BUILT
   updateTestQueue() in utils.js
   Cross-product: selectedModels × selectedBackends → testQueueStore
   Each queue item: { id, model, modelType, dataType, size, backend, status }

3. PIN VERIFICATION (if non-Intel GPU)
   PinModal.svelte → pin_verify.js
   GPU vendor detected via WebGL → Intel skips PIN, others must verify
   Rate limited: 3 failures = 24h lockout

4. EXECUTION LOOP
   run() in utils.js — sequential loop through testQueueStore
   For each item:
     a. Route to handler by format:
        - ONNX → ort_utils.js → runOnnx()
        - TFLite → litert_utils.js → runTflite()
     b. Download model (nn_utils.js → OPFS or Cache API, with progress)
     c. Load runtime (dynamic script injection from /static/ort/ or /static/litertjs/)
     d. Create session with execution provider
     e. Construct input tensors from model metadata
     f. Warmup inference (1 run, timed)
     g. Benchmark loop (N runs, each timed individually)
     h. Calculate metrics → write to resultsStore
     i. Update infoStore with log messages
     j. Move to next queue item

5. RESULTS DISPLAYED
   Results.svelte reactively renders from resultsStore
   Sortable table with per-backend columns
   Export: screenshot (html2canvas), copy JSON, copy raw inference times
```

### 7.2 Inference Metrics Collected

```js
{
  status: 1|2|3,               // 1=started, 2=in-progress, 3=done
  loadcompilation: ms,          // Model load + compile time
  warmup: ms,                   // Warmup inference time
  firstInferenceTime: ms,       // First benchmark inference
  timetofirstinference: ms,     // loadcompilation + firstInferenceTime
  inference: [ms, ms, ...],     // All individual run times
  inferencemedian: ms,          // Median of inference[]
  inferenceaverage: ms,         // Mean of inference[]
  inferencethroughput: "FPS",   // 1000 / average
  inferenceninety: ms,          // 90th percentile
  inferencebest: ms,            // Minimum time
  error: null | string          // Error message if failed
}
```

### 7.3 Model Download Strategy

```
nn_utils.js manages two caching strategies:

1. OPFS (Origin Private File System)
   - getModelOPFS(name, url, progressCallback)
   - Persistent browser-level file storage
   - Progress tracking via ReadableStream

2. Cache API
   - getModelCache(name, url, progressCallback)
   - HTTP cache with custom namespace
   - Fallback when OPFS unavailable

Download source priority: HuggingFace → HF Mirror → Cloudfront → Local
Progress updates → modelDownloadProgressStore → Info.svelte UI
```

### 7.4 Runtime Loading

ONNX Runtime Web and LiteRT.js are loaded dynamically (not bundled):

```
ONNX Runtime Web:
  /static/ort/ort.all.min.mjs              (default)
  /static/ort/ort.webgpu.min.mjs           (WebGPU backend)
  Also: jsDelivr CDN for user-selected versions

LiteRT.js:
  /static/litertjs/{version}/litert.mjs    (versioned)
  Also: jsDelivr CDN for user-selected versions

Both loaded via dynamic import() or script injection at runtime.
Guard against double-loading: window.__litertLoaded__ flag pattern.
```

---

## 8. Backend Configuration Details

| Backend Key | Runtime | Execution Provider | Threads |
|---|---|---|---|
| `wasm_1` | ONNX RT / LiteRT | WebAssembly (SIMD) | 1 |
| `wasm_4` | ONNX RT / LiteRT | WebAssembly (SIMD) | 4 |
| `webgl` | ONNX RT only | WebGL | N/A |
| `webgpu` | ONNX RT / LiteRT | WebGPU | N/A |
| `webnn_cpu` | ONNX RT / LiteRT | WebNN (CPU) | N/A |
| `webnn_gpu` | ONNX RT / LiteRT | WebNN (GPU) | N/A |
| `webnn_npu` | ONNX RT / LiteRT | WebNN (NPU) | N/A |

**WebNN Note**: Requires browser flag or Origin Trial token. App includes origin-trial meta tags in `app.html`.

---

## 9. Security & Access Control

### PIN System (`pin_verify.js`)

- Detects GPU vendor via WebGL (`WEBGL_debug_renderer_info`)
- Intel GPUs: no PIN required (bypass)
- Other GPUs (AMD, Nvidia, Qualcomm, Apple): PIN required
- 26 pre-hashed valid PINs stored in code
- PIN hashed with SHA-256 before comparison
- Verified PINs cached in localStorage
- Rate limiting: 3 failed attempts → 24-hour lockout

### CORS / Security Headers (`vercel.json`)

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Resource-Policy: cross-origin
Cache-Control: max-age=2592000 (30 days)
```

These headers enable `SharedArrayBuffer` (required for multi-threaded Wasm).

---

## 10. Styling System

### Design Tokens (`_vars.css`)

```css
/* Color system — CSS custom properties */
--font-color:       /* primary text */
--primary:          #C61A3E   /* brand red */
--p:                /* blue accent */
--p2:               /* purple accent */
--yellow, --green:  /* status colors */

/* Data type colors (used in badges, filters) */
--fp16, --int8, --int4, --q4f16, --uint8, --bnb4, --q4

/* Each color has opacity variants: -01, -005, -09, etc. */
```

### Fonts

Self-hosted in `/static/fonts/`:
- **JetBrains Mono** — Monospace (code, metrics)
- **Archivo** — UI text
- **Intel One Mono** — Alternative monospace
- **Space Mono** — Alternative monospace

---

## 11. Deployment

### Vercel Configuration

- Adapter: `@sveltejs/adapter-vercel`
- Static prerendering enabled (`prerender = true` in root layout)
- Dynamic routes: `/run/[id]` generates entries via `entries()` function filtering valid models
- Base path: configurable via `BASE_PATH` env var

### Required Environment

- HTTPS mandatory (SharedArrayBuffer requirement)
- Dev server: self-signed SSL via `@vitejs/plugin-basic-ssl`
- CORS headers for cross-origin model fetching

---

## 12. Key Design Patterns

### Pattern: URL ↔ Store Sync
Config components read URL params on mount, write selections to stores, and update URL params on change. This makes test configurations shareable via URL.

### Pattern: Factory Functions for Model Definitions
Models are defined as functions returning arrays, allowing a single model to produce multiple datatype variants. All variants are flattened into a single array at config/index.js.

### Pattern: Dynamic Runtime Loading
ML runtimes (ORT, LiteRT) are NOT bundled — they're loaded at runtime from `/static/` or CDN. This keeps the app bundle small and allows version switching without rebuilds.

### Pattern: Progressive Model Download
Models are fetched with progress tracking and cached in OPFS/Cache API. Multiple CDN sources are tried in order (HuggingFace → mirror → Cloudfront → local).

### Pattern: Sequential Test Queue
Tests run one at a time (not parallel) because ML backends share GPU/CPU resources. The queue is a cross-product of selected models × backends.

### Pattern: PIN Gating
Hardware-vendor-based access control allows unrestricted use on Intel hardware while requiring a PIN for other vendors.

---

## 13. Data Type Reference

| Key | Name | Bits | Usage |
|---|---|---|---|
| `fp32` | Float32 | 32 | Full precision baseline |
| `fp16` | Float16 | 16 | Half precision, GPU-optimized |
| `int8` | Int8 | 8 | Quantized, CPU-friendly |
| `int4` | Int4 | 4 | Aggressive quantization |
| `q4` | Quant4 | 4 | 4-bit quantization variant |
| `q4f16` | Quant4-Float16 | 4+16 | Mixed precision quantization |
| `uint8` | UInt8 | 8 | Unsigned quantization |
| `bnb4` | BitsAndBytes 4 | 4 | BnB-style 4-bit |

---

## 14. Graph Visualization (`/graph`)

- Upload model graph JSON → parse nodes/edges
- Layout computed in Web Worker (`worker.js` + `dagre.js`) to avoid blocking UI
- Rendered with `@xyflow/svelte` (Flow.svelte)
- Supports vertical (TB) and horizontal (LR) layout
- Node coloring: green (inputs), pink (outputs)
- Interactive: pan, zoom, search nodes

---

## 15. File Dependency Map

```
+page.svelte (main)
  └── imports from $lib/components/*
        └── imports from $lib/store/store.js
        └── imports from $lib/config/index.js
        └── imports from $lib/assets/js/utils.js
              ├── ort_utils.js
              │     └── nn_utils.js (model download)
              │     └── data_type.js (tensor conversions)
              ├── litert_utils.js
              │     └── litert_helper.js (tensor creation)
              │     └── nn_utils.js
              └── pin_verify.js (access control)

config/index.js
  ├── constants.js (enums)
  ├── hardware.js (CPU/GPU database)
  ├── site.js (metadata)
  ├── model_onnx.js (~200+ ONNX models)
  └── model_tflite.js (~80+ TFLite models)
```

---

## 16. Glossary

| Term | Meaning |
|---|---|
| **ORT** | ONNX Runtime — cross-platform ML inference engine |
| **LiteRT** | Lite Runtime (formerly TensorFlow Lite) — mobile/edge ML runtime |
| **WebNN** | Web Neural Network API — W3C standard for hardware-accelerated ML in browsers |
| **OPFS** | Origin Private File System — browser storage API for large files |
| **SIMD** | Single Instruction Multiple Data — CPU vectorization |
| **NPU** | Neural Processing Unit — dedicated AI accelerator hardware |
| **EP** | Execution Provider — backend that runs model inference (wasm, webgpu, webnn, etc.) |
| **SharedArrayBuffer** | JS API for shared memory between threads (requires COOP/COEP headers) |
