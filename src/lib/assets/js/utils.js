export const getGpu = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

  renderer = renderer.replace('(R)', '').replace('(TM)', '')
    .replace('ANGLE', '').replace('0x00003EA0', '')
    .replace('Mesa DRI', '')
    .replace('OpenGL ES', '')
    .replace('3.2', '')
    .replace('Direct3D11', '').replace('D3D11', '')
    .replace('vs_5_0', '').replace('ps_5_0', '')
    .replace('(Intel', '').replace('Microsoft', '').replace('Google', '')
    .replace('(TM', '').replaceAll('(', '').replaceAll(')', '').replaceAll(',', '').trim();
  return renderer
}