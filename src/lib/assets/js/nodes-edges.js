export const initialNodes = [
  {
    id: '1a',
    data: { label: 'ONNX Model' },
    position: { x: 0, y: 0 },
  },
  {
    id: '1b',
    data: { label: 'TFLite Model' },
    position: { x: 200, y: 0 },
  },
  {
    id: '2a',
    data: { label: 'ONNX Runtime Web' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2b',
    data: { label: 'LiteRT.js' },
    position: { x: 200, y: 50 },
  },
  {
    id: '3a',
    data: { label: 'Wasm' },
    position: { x: 0, y: 100 },
  },
  {
    id: '3b',
    data: { label: 'WebNN' },
    position: { x: 200, y: 100 },
  },
    {
    id: '3c',
    data: { label: 'WebGPU' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4a',
    data: { label: 'LiteRT' },
    position: { x: 0, y: 300 },
  },
  {
    id: '4b',
    data: { label: 'Windows ML' },
    position: { x: 200, y: 300 },
  },
  {
    id: '4c',
    data: { label: 'Core ML' },
    position: { x: 400, y: 300 },
  },
    {
    id: '5a',
    data: { label: 'XNNPACK' },
    position: { x: 0, y: 400 },
  },
  {
    id: '5b',
    data: { label: 'OpenVINO' },
    position: { x: 200, y: 400 },
  },
  {
    id: '5c',
    data: { label: 'ML Drift / Dawn' },
    position: { x: 400, y: 400 },
  },
    {
    id: '5d',
    data: { label: 'MPS' },
    position: { x: 600, y: 400 },
  },
    {
    id: '5e',
    data: { label: 'BNNS' },
    position: { x: 800, y: 400 },
  },
];

export const initialEdges = [
  { id: 'e1a2a', source: '1a', target: '2a', animated: true },
  { id: 'e1b2b', source: '1b', target: '2b', animated: true },
];
