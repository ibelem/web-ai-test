/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var hn=Object.defineProperty;var vu=Object.getOwnPropertyDescriptor;var xu=Object.getOwnPropertyNames;var Su=Object.prototype.hasOwnProperty;var gn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var A=(e,t)=>()=>(e&&(t=e(e=0)),t);var gt=(e,t)=>{for(var n in t)hn(e,n,{get:t[n],enumerable:!0})},Tu=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of xu(t))!Su.call(e,o)&&o!==n&&hn(e,o,{get:()=>t[o],enumerable:!(r=vu(t,o))||r.enumerable});return e};var yn=e=>Tu(hn({},"__esModule",{value:!0}),e);var yt,We,Ge,Iu,bt,_t=A(()=>{"use strict";yt=new Map,We=[],Ge=(e,t,n)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=yt.get(e);if(r===void 0)yt.set(e,{backend:t,priority:n});else{if(r.priority>n)return;if(r.priority===n&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${n}`)}if(n>=0){let o=We.indexOf(e);o!==-1&&We.splice(o,1);for(let i=0;i<We.length;i++)if(yt.get(We[i]).priority<=n){We.splice(i,0,e);return}We.push(e)}return}throw new TypeError("not a valid backend")},Iu=async e=>{let t=yt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let n=!!t.initPromise;try{return n||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return n||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},bt=async e=>{let t=e.executionProviders||[],n=t.map(u=>typeof u=="string"?u:u.name),r=n.length===0?We:n,o,i=[],s=new Set;for(let u of r){let l=await Iu(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(e,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var ur=A(()=>{"use strict";_t()});var lr,dr=A(()=>{"use strict";lr="1.21.0"});var cr,be,bn=A(()=>{"use strict";dr();cr="warning",be={wasm:{},webgl:{},webgpu:{},versions:{common:lr},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);cr=e}},get logLevel(){return cr}};Object.defineProperty(be,"logLevel",{enumerable:!0})});var J,pr=A(()=>{"use strict";bn();J=be});var mr,fr,hr=A(()=>{"use strict";mr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=e.dims[3],n.height=e.dims[2];let r=n.getContext("2d");if(r!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",a=t?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let d=i*o,c=0,p=d,f=d*2,m=-1;s==="RGBA"?(c=0,p=d,f=d*2,m=d*3):s==="RGB"?(c=0,p=d,f=d*2):s==="RBG"&&(c=0,f=d,p=d*2);for(let h=0;h<i;h++)for(let _=0;_<o;_++){let y=(e.data[c++]-l[0])*u[0],g=(e.data[p++]-l[1])*u[1],b=(e.data[f++]-l[2])*u[2],w=m===-1?255:(e.data[m++]-l[3])*u[3];r.fillStyle="rgba("+y+","+g+","+b+","+w+")",r.fillRect(_,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},fr=(e,t)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(n!=null){let o,i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],s=e.dims[3]):(o=e.dims[3],i=e.dims[2],s=e.dims[1]);let a=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let c=i*o;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let p=4,f=0,m=1,h=2,_=3,y=0,g=c,b=c*2,w=-1;a==="RGBA"?(y=0,g=c,b=c*2,w=c*3):a==="RGB"?(y=0,g=c,b=c*2):a==="RBG"&&(y=0,b=c,g=c*2),r=n.createImageData(o,i);for(let $=0;$<i*o;f+=p,m+=p,h+=p,_+=p,$++)r.data[f]=(e.data[y++]-d[0])*l[0],r.data[m]=(e.data[g++]-d[1])*l[1],r.data[h]=(e.data[b++]-d[2])*l[2],r.data[_]=w===-1?255:(e.data[w++]-d[3])*l[3]}else throw new Error("Can not access image data");return r}});var _n,gr,yr,br,_r,wr,$r=A(()=>{"use strict";wt();_n=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:r}=t,o=t.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",l=n*r,d=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),c=4,p=0,f=1,m=2,h=3,_=0,y=l,g=l*2,b=-1;a==="RGB"&&(c=3,p=0,f=1,m=2,h=-1),u==="RGBA"?b=l*3:u==="RBG"?(_=0,g=l,y=l*2):u==="BGR"&&(g=0,y=l,_=l*2);for(let $=0;$<l;$++,p+=c,m+=c,f+=c,h+=c)d[_++]=(e[p]+s[0])/i[0],d[y++]=(e[f]+s[1])/i[1],d[g++]=(e[m]+s[2])/i[2],b!==-1&&h!==-1&&(d[b++]=(e[h]+s[3])/i[3]);return u==="RGBA"?new me("float32",d,[1,4,n,r]):new me("float32",d,[1,3,n,r])},gr=async(e,t)=>{let n=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",s,a=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=d=>typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement||d instanceof OffscreenCanvas?d.getContext("2d"):null;if(n){let d=u();d.width=e.width,d.height=e.height;let c=l(d);if(c!=null){let p=e.height,f=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(p=t.resizedHeight,f=t.resizedWidth),t!==void 0){if(a=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=p,a.width=f}else a.tensorFormat="RGBA",a.height=p,a.width=f;c.drawImage(e,0,0),s=c.getImageData(0,0,f,p).data}else throw new Error("Can not access image data")}else if(r){let d,c;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(d=t.resizedHeight,c=t.resizedWidth):(d=e.height,c=e.width),t!==void 0&&(a=t),a.format="RGBA",a.height=d,a.width=c,t!==void 0){let p=u();p.width=c,p.height=d;let f=l(p);if(f!=null)f.putImageData(e,0,0),s=f.getImageData(0,0,c,d).data;else throw new Error("Can not access image data")}else s=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let d=u();d.width=e.width,d.height=e.height;let c=l(d);if(c!=null){let p=e.height,f=e.width;return c.drawImage(e,0,0,f,p),s=c.getImageData(0,0,f,p).data,a.height=p,a.width=f,_n(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((d,c)=>{let p=u(),f=l(p);if(!e||!f)return c();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{p.width=m.width,p.height=m.height,f.drawImage(m,0,0,p.width,p.height);let h=f.getImageData(0,0,p.width,p.height);a.height=p.height,a.width=p.width,d(_n(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return _n(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},yr=(e,t)=>{let{width:n,height:r,download:o,dispose:i}=t,s=[1,r,n,4];return new me({location:"texture",type:"float32",texture:e,dims:s,download:o,dispose:i})},br=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new me({location:"gpu-buffer",type:n??"float32",gpuBuffer:e,dims:r,download:o,dispose:i})},_r=(e,t)=>{let{dataType:n,dims:r,download:o,dispose:i}=t;return new me({location:"ml-tensor",type:n??"float32",mlTensor:e,dims:r,download:o,dispose:i})},wr=(e,t,n)=>new me({location:"cpu-pinned",type:e,data:t,dims:n??[t.length]})});var He,rt,vr,xr,Sr=A(()=>{"use strict";He=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),rt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),vr=!1,xr=()=>{if(!vr){vr=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;e&&(He.set("int64",BigInt64Array),rt.set(BigInt64Array,"int64")),t&&(He.set("uint64",BigUint64Array),rt.set(BigUint64Array,"uint64")),n?(He.set("float16",Float16Array),rt.set(Float16Array,"float16")):He.set("float16",Uint16Array)}}});var Tr,Ir,Cr=A(()=>{"use strict";wt();Tr=e=>{let t=1;for(let n=0;n<e.length;n++){let r=e[n];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${n}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${r}`);t*=r}return t},Ir=(e,t)=>{switch(e.location){case"cpu":return new me(e.type,e.data,t);case"cpu-pinned":return new me({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new me({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new me({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new me({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var me,wt=A(()=>{"use strict";hr();$r();Sr();Cr();me=class{constructor(t,n,r){xr();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let a=He.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof t=="string")if(o=t,u=r,t==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=He.get(t);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(n)){if(t==="float16"&&l===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${l.name} as data.`);t==="uint64"||t==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else if(n instanceof Uint8ClampedArray)if(t==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof t[0];if(l==="string")o="string",a=t;else if(l==="boolean")o="bool",a=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(t);else{let l=rt.get(t.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=l,a=t}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Tr(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(t,n){return gr(t,n)}static fromTexture(t,n){return yr(t,n)}static fromGpuBuffer(t,n){return br(t,n)}static fromMLTensor(t,n){return _r(t,n)}static fromPinnedBuffer(t,n,r){return wr(t,n,r)}toDataURL(t){return mr(this,t)}toImageData(t){return fr(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,t&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Ir(this,t)}}});var fe,$t=A(()=>{"use strict";wt();fe=me});var vt,Ar,_e,he,wn=A(()=>{"use strict";bn();vt=(e,t)=>{(typeof be.trace>"u"?!be.wasm.trace:!be.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ar=(e,t)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let o=0;o<n.length;o++){if(r&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${n[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),vt("CPU",i);return}n[o].includes("TRACE_FUNC")&&(r=!0)}},_e=e=>{(typeof be.trace>"u"?!be.wasm.trace:!be.trace)||Ar("BEGIN",e)},he=e=>{(typeof be.trace>"u"?!be.wasm.trace:!be.trace)||Ar("END",e)}});var xt,kr=A(()=>{"use strict";_t();$t();wn();xt=class e{constructor(t){this.handler=t}async run(t,n,r){_e();let o={},i={};if(typeof t!="object"||t===null||t instanceof fe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof fe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(n);for(let c of this.outputNames)if(d.indexOf(c)!==-1){let p=n[c];(p===null||p instanceof fe)&&(l=!0,s=!1,o[c]=p)}if(l){if(typeof r=="object"&&r!==null)i=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(t,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let d=a[l];d instanceof fe?u[l]=d:u[l]=new fe(d.type,d.data,d.dims)}return he(),u}async release(){return this.handler.dispose()}static async create(t,n,r,o){_e();let i,s={};if(typeof t=="string"){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let d=t,c=0,p=t.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(c=n,!Number.isSafeInteger(c))throw new RangeError("'byteOffset' must be an integer.");if(c<0||c>=d.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${d.byteLength}).`);if(p=t.byteLength-c,typeof r=="number"){if(p=r,!Number.isSafeInteger(p))throw new RangeError("'byteLength' must be an integer.");if(p<=0||c+p>d.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${d.byteLength-c}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(d,c,p)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await bt(s),l=await a.createInferenceSessionHandler(i,u);return he(),new e(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Cu,Er=A(()=>{"use strict";kr();Cu=xt});var zr=A(()=>{"use strict"});var Pr=A(()=>{"use strict"});var Br=A(()=>{"use strict"});var Or=A(()=>{"use strict"});var Au,St,Dr=A(()=>{"use strict";_t();$t();Au="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",St=class e{constructor(t,n,r){this.handler=t,this.hasOptimizerModel=n,this.hasEvalModel=r}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,n){let r=t.evalModel||"",o=t.optimizerModel||"",i=n||{},[s,a]=await bt(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(t.checkpointState,t.trainModel,r,o,a);return new e(u,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Au)}typeNarrowingForRunStep(t,n,r,o,i){let s={},a={};if(typeof r!="object"||r===null||r instanceof fe||Array.isArray(r))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof fe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,d=Object.getOwnPropertyNames(o);for(let c of n)if(d.indexOf(c)!==-1){let p=o[c];(p===null||p instanceof fe)&&(l=!0,u=!1,s[c]=p)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of t)if(typeof r[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of n)s[l]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(t){let n={};for(let r in t)if(Object.hasOwnProperty.call(t,r)){let o=t[r];o instanceof fe?n[r]=o:n[r]=new fe(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,n,r){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,n,r),s=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,n,r){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,n,r),s=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,n=!0){let r=await this.getParametersSize(n);if(t.length!==4*r)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,n)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var ku,Mr=A(()=>{"use strict";Dr();ku=St});var $n={};gt($n,{InferenceSession:()=>Cu,TRACE:()=>vt,TRACE_FUNC_BEGIN:()=>_e,TRACE_FUNC_END:()=>he,Tensor:()=>fe,TrainingSession:()=>ku,env:()=>J,registerBackend:()=>Ge});var we=A(()=>{"use strict";ur();pr();Er();$t();zr();Pr();wn();Br();Or();Mr()});var Tt=A(()=>{"use strict"});var Nr={};gt(Nr,{default:()=>Eu});var Ur,Vr,Eu,Lr=A(()=>{"use strict";vn();Re();ot();Ur="ort-wasm-proxy-worker",Vr=globalThis.self?.name===Ur;Vr&&(self.onmessage=e=>{let{type:t,in:n}=e.data;try{switch(t){case"init-wasm":It(n.wasm).then(()=>{Ct(n).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:o}=n;At(o,r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:r}=n,o=it(r);postMessage({type:t,out:o});break}case"create":{let{model:r,options:o}=n;kt(r,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Et(n),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;zt(r,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Bt([...i,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Pt(n),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}});Eu=Vr?null:e=>new Worker(e??$e,{type:"module",name:Ur})});var $e,zu,Gr,Pu,Bu,Hr,Ou,Wr,qr,Fr,ot=A(()=>{"use strict";Tt();$e=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),zu=!1||typeof location>"u"?void 0:location.origin,Gr=(e,t)=>{try{let n=t??$e;return(n?new URL(e,n):new URL(e)).origin===zu}catch{return!1}},Pu=(e,t)=>{let n=t??$e;try{return(n?new URL(e,n):new URL(e)).href}catch{return}},Bu=(e,t)=>`${t??"./"}${e}`,Hr=async e=>{let n=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},Ou=async e=>(await import(/*webpackIgnore:true*/e)).default,Wr=(Lr(),yn(Nr)).default,qr=async()=>{if(!$e)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gr($e))return[void 0,Wr()];let e=await Hr($e);return[e,Wr(e)]},Fr=async(e,t,n)=>{{let r="ort-wasm-simd-threaded.jsep.mjs",o=e??Pu(r,t),i=!!1&&n&&o&&!Gr(o,t),s=i?await Hr(o):o??Bu(r,t);return[i?s:void 0,await Ou(s)]}}});var xn,Sn,Ot,Kr,Du,Mu,It,re,Re=A(()=>{"use strict";ot();Sn=!1,Ot=!1,Kr=!1,Du=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Mu=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},It=async e=>{if(Sn)return Promise.resolve();if(Ot)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Kr)throw new Error("previous call to 'initializeWebAssembly()' failed.");Ot=!0;let t=e.initTimeout,n=e.numThreads;if(!Mu())throw new Error("WebAssembly SIMD is not supported in the current environment.");let r=Du();n>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=n=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,s=o?.mjs,a=s?.href??s,u=o?.wasm,l=u?.href??u,d=e.wasmBinary,[c,p]=await Fr(a,i,n>1),f=!1,m=[];if(t>0&&m.push(new Promise(h=>{setTimeout(()=>{f=!0,h()},t)})),m.push(new Promise((h,_)=>{let y={numThreads:n};d?y.wasmBinary=d:(l||i)&&(y.locateFile=(g,b)=>l??(i??b)+g),p(y).then(g=>{Ot=!1,Sn=!0,xn=g,h(),c&&URL.revokeObjectURL(c)},g=>{Ot=!1,Kr=!0,_(g)})})),await Promise.race(m),f)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},re=()=>{if(Sn&&xn)return xn;throw new Error("WebAssembly is not initialized yet.")}});var le,st,Z,Dt=A(()=>{"use strict";Re();le=(e,t)=>{let n=re(),r=n.lengthBytesUTF8(e)+1,o=n._malloc(r);return n.stringToUTF8(e,o,r),t.push(o),o},st=(e,t,n,r)=>{if(typeof e=="object"&&e!==null){if(n.has(e))throw new Error("Circular reference in options");n.add(e)}Object.entries(e).forEach(([o,i])=>{let s=t?t+o:o;if(typeof i=="object")st(i,s+".",n,r);else if(typeof i=="string"||typeof i=="number")r(s,i.toString());else if(typeof i=="boolean")r(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},Z=e=>{let t=re(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetLastError(o,o+r);let i=Number(t.getValue(o,r===4?"i32":"i64")),s=t.getValue(o+r,"*"),a=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{t.stackRestore(n)}}});var jr,Zr=A(()=>{"use strict";Re();Dt();jr=e=>{let t=re(),n=0,r=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=le(e.tag,r)),n=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&Z("Can't create run options."),e?.extra!==void 0&&st(e.extra,"",new WeakSet,(s,a)=>{let u=le(s,r),l=le(a,r);t._OrtAddRunConfigEntry(n,u,l)!==0&&Z(`Can't set a run config entry: ${s} - ${a}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseRunOptions(n),r.forEach(s=>t._free(s)),i}}});var Ru,Uu,Vu,Nu,Qr,Xr=A(()=>{"use strict";Re();Dt();Ru=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Uu=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Vu=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(e.enableMemPattern=!1)},Nu=(e,t,n)=>{for(let r of t){let o=typeof r=="string"?r:r.name;switch(o){case"webnn":if(o="WEBNN",typeof r!="string"){let a=r?.deviceType;if(a){let u=le("deviceType",n),l=le(a,n);re()._OrtAddSessionConfigEntry(e,u,l)!==0&&Z(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof r!="string"){let s=r;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=le("preferredLayout",n),u=le(s.preferredLayout,n);re()._OrtAddSessionConfigEntry(e,a,u)!==0&&Z(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=le(o,n);re()._OrtAppendExecutionProvider(e,i)!==0&&Z(`Can't append execution provider: ${o}.`)}},Qr=e=>{let t=re(),n=0,r=[],o=e||{};Vu(o);try{let i=Ru(o.graphOptimizationLevel??"all"),s=Uu(o.executionMode??"sequential"),a=typeof o.logId=="string"?le(o.logId,r):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let d=typeof o.optimizedModelFilePath=="string"?le(o.optimizedModelFilePath,r):0;if(n=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,d),n===0&&Z("Can't create session options."),o.executionProviders&&Nu(n,o.executionProviders,r),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let c=le("enableGraphCapture",r),p=le(o.enableGraphCapture.toString(),r);t._OrtAddSessionConfigEntry(n,c,p)!==0&&Z(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[c,p]of Object.entries(o.freeDimensionOverrides)){if(typeof c!="string")throw new Error(`free dimension override name must be a string: ${c}`);if(typeof p!="number"||!Number.isInteger(p)||p<0)throw new Error(`free dimension override value must be a non-negative integer: ${p}`);let f=le(c,r);t._OrtAddFreeDimensionOverride(n,f,p)!==0&&Z(`Can't set a free dimension override: ${c} - ${p}.`)}return o.extra!==void 0&&st(o.extra,"",new WeakSet,(c,p)=>{let f=le(c,r),m=le(p,r);t._OrtAddSessionConfigEntry(n,f,m)!==0&&Z(`Can't set a session config entry: ${c} - ${p}.`)}),[n,r]}catch(i){throw n!==0&&t._OrtReleaseSessionOptions(n)!==0&&Z("Can't release session options."),r.forEach(s=>t._free(s)),i}}});var at,Ue,Fe,Mt,ut,Rt,Ut,Tn,V=A(()=>{"use strict";at=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},Ue=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Fe=(e,t)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return n>0?Math.ceil(r*n):void 0},Mt=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ut=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Rt=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Ut=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Tn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var lt,In=A(()=>{"use strict";Tt();lt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=gn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=gn("node:fs"),r=n(e),o=[];for await(let i of r)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let n=t.headers.get("Content-Length"),r=n?parseInt(n,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(r)}catch(a){if(a instanceof RangeError){let u=Math.ceil(r/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Lu,Wu,Yr,Jr,Vt,Gu,j,Ce=A(()=>{"use strict";V();Lu=["V","I","W","E","F"],Wu=(e,t)=>{console.log(`[${Lu[e]},${new Date().toISOString()}]${t}`)},Vt=(e,t)=>{Yr=e,Jr=t},Gu=(e,t)=>{let n=ut(e),r=ut(Yr);n>=r&&Wu(n,typeof t=="function"?t():t)},j=(...e)=>{Jr&&Gu(...e)}});var Nt,Cn=A(()=>{"use strict";V();Nt=(e,t)=>new(Mt(t))(e)});var Lt=A(()=>{"use strict"});var eo,An,kn,Hu,qu,to,zn,En,ro,oo=A(()=>{"use strict";Ce();Lt();eo=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),An=[],kn=e=>Math.ceil(Number(e)/16)*16,Hu=e=>{for(let t=0;t<An.length;t++){let n=An[t];if(e<=n)return n}return Math.ceil(e/16)*16},qu=1,to=()=>qu++,zn=async(e,t,n,r)=>{let o=kn(n),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(r){let u=r();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},En=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of eo)An.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(t,n){let r=n.buffer,o=n.byteOffset,i=n.byteLength,s=kn(i),a=this.storageCache.get(t);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,o,i)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([d.finish()]),u.destroy(),j("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,n){let r=this.storageCache.get(t);if(!r)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=kn(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,n,r){let o;if(r){if(o=r[0],t===r[1])return j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=to();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:n}),j("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),j("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Hu(t),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(r);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:r,usage:n}):o=this.backend.device.createBuffer({size:r,usage:n})}else o=this.backend.device.createBuffer({size:r,usage:n});let a={id:to(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(t)}),j("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${a.id}`),a}get(t){return this.storageCache.get(t)?.gpuData}release(t){let n=typeof t=="bigint"?Number(t):t,r=this.storageCache.get(n);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return j("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(t,n){let r=this.storageCache.get(Number(t));if(!r)throw new Error("data does not exist");await zn(this.backend,r.gpuData.buffer,r.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let n=eo.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(t.size)||[];n===void 0||r.length>=n?t.destroy():r.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let n of this.buffersPending)t.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let n=this.capturedPendingBuffers.get(t);n&&(n.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(j("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ro=(...e)=>new En(...e)});var Pn,N,oe=A(()=>{"use strict";Pn=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},N=e=>new Pn(e)});var Bn,Ae,x,Ke,Wt,io,so,W=A(()=>{"use strict";Bn=class{static calcMatMulShape(t,n){return t[1]!==n[0]?void 0:[t[0],n[1]]}},Ae=class{static calcShape(t,n,r=!1){let o=t.length,i=n.length;if(o===0)return n;if(i===0)return t;let s=Math.max(t.length,n.length),a=new Array(s);if(r){if(o<2||i<2)return;let u=Bn.calcMatMulShape([t[o-2],t[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=r?3:1;u<=s;u++){let l=o-u<0?1:t[o-u],d=i-u<0?1:n[i-u];if(l!==d&&l>1&&d>1)return;let c=Math.max(l,d);if(l&&d)a[s-u]=Math.max(l,d);else{if(c>1)return;a[s-u]=0}}return a}static isValidBroadcast(t,n){let r=t.length,o=n.length;if(r>o)return!1;for(let i=1;i<=r;i++)if(t[r-i]!==1&&t[r-i]!==n[o-i])return!1;return!0}},x=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,n=4){let r=t.length;if(r===0)return[];let o=new Array(r),i=r-1;for(;i>=0;){if(t[i]%n===0){o[i]=t[i]/n;break}if(n%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,n,t.length)}static sizeToDimension(t,n){if(n<0||n>t.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,n)}static getSizeFromDimensionRange(t,n,r){let o=1;for(let i=n;i<r;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let n=t.length;if(n===0)return[];if(n===1)return[1];let r=new Array(n);r[n-1]=1,r[n-2]=t[n-1];for(let o=n-3;o>=0;--o)r[o]=r[o+1]*t[o+1];return r}static normalizeAxis(t,n){if(t<-n&&t>=n)throw new Error("unsupported axis for this operation.");return t<0?t+n:t}static normalizeAxes(t,n){return t.map(r=>this.normalizeAxis(r,n??t.length))}static sortBasedOnPerm(t,n){return n?n.map(r=>t[r]):t.slice().reverse()}static padShape(t,n){let r=t.length;return t.map((o,i)=>o+n[i]+n[i+r])}static areEqual(t,n){return t.length!==n.length?!1:t.every((r,o)=>r===n[o])}},Ke=class e{static adjustPoolAttributes(t,n,r,o,i,s){if(!t&&r.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let a=0;a<n.length-2;a++)a>=r.length?r.push(n[a+2]):r[a]=n[a+2];for(let a=0;a<r.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<r.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<r.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<r.length;a++){if(r[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=r[a]||s[a+r.length]>=r[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,n,r,o,i,s,a){if(a){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)e.adjustPadAndReturnShape(t[u+(s?1:2)],n[u],r[u],o[u],i,u,u+t.length-2,a)}}static computePoolOutputShape(t,n,r,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return e.computeShapeHelper(t,n,u,r,o,i,s,a),u}static computeConvOutputShape(t,n,r,o,i,s,a){if(t.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],n[0]];return e.computeShapeHelper(!1,t,u,r,o,i,s,a),u}static computeShapeHelper(t,n,r,o,i,s,a,u){if(t)for(let l=0;l<n.length-2;l++)r.push(1);else for(let l=0;l<n.length-2;l++)r.push(e.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(t,n,r,o,i,s,a,u){let l=r*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((t-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+n-1)/n-1)*n+o-t;return i[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),i[a]=c-i[s],Math.floor((t+c-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[s]+i[a]-l)/n+1)}},Wt=class{static getShapeOfGemmResult(t,n,r,o,i){if(t.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=t[1],a=t[0]):(s=t[0],a=t[1]);let l=-1;if(o?(u=r[0],l=1):(u=r[1],l=0),r[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Ae.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},io=-34028234663852886e22,so=34028234663852886e22});var je,Dn,ee,de,E,X,Mn,Ze,xe,O,Rn,S,C,Gt,On,ao,F=A(()=>{"use strict";V();W();je=64,Dn=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ee=(e,t=1)=>{let n=Dn(e,t);return typeof n=="string"?n:n[0]},de=(e,t=1)=>{let n=Dn(e,t);return typeof n=="string"?n:n[1]},E=(...e)=>{let t=[];return e.forEach(n=>{n.length!==0&&t.push({type:12,data:n},{type:12,data:x.computeStrides(n)})}),t},X=e=>e%4===0?4:e%2===0?2:1,Mn=(e="f32",t,n="0")=>!t||t===1?`${e}(${n})`:`vec${t}<${e}>(${n})`,Ze=(e,t,n)=>e==="f32"?n:t===1?`f32(${n})`:`vec${t}<f32>(${n})`,xe=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,O=(e,t,n,r)=>e.startsWith("uniforms.")&&n>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:n>1?`${e}[${t}]`:e,Rn=(e,t,n,r,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Dn(t,o),d=typeof l=="string"?l:l[1],c=typeof l=="string"?l:l[0],p={indices:u,value:d,storage:c,tensor:t},f=z=>typeof z=="string"?z:`${z}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",_=`${h}${e}_shape`,y=`${h}${e}_strides`,g="";for(let z=0;z<s-1;z++)g+=`
    let dim${z} = current / ${O(y,z,s)};
    let rest${z} = current % ${O(y,z,s)};
    indices[${z}] = dim${z};
    current = rest${z};
    `;g+=`indices[${s-1}] = current;`;let b=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${p.indices} {
    var indices: ${p.indices};
    var current = offset;
    ${g}
    return indices;
  }`,w=z=>(m.offsetToIndices=!0,s<2?z:`o2i_${e}(${z})`),$=[];if(s>=2)for(let z=s-1;z>=0;z--)$.push(`${O(y,z,s)} * (indices[${z}])`);let v=s<2?"":`
  fn i2o_${e}(indices: ${p.indices}) -> u32 {
    return ${$.join("+")};
  }`,T=z=>(m.indicesToOffset=!0,s<2?z:`i2o_${e}(${z})`),I=(...z)=>s===0?"0u":`${p.indices}(${z.map(f).join(",")})`,k=(z,M)=>s<2?`${z}`:`${O(z,M,s)}`,B=(z,M,te)=>s<2?`${z}=${te};`:`${O(z,M,s)}=${te};`,D={},L=(z,M)=>{m.broadcastedIndicesToOffset=!0;let te=`${M.name}broadcastedIndicesTo${e}Offset`;if(te in D)return`${te}(${z})`;let Me=[];for(let ie=s-1;ie>=0;ie--){let ue=M.indicesGet("outputIndices",ie+M.rank-s);Me.push(`${k(y,ie)} * (${ue} % ${k(_,ie)})`)}return D[te]=`fn ${te}(outputIndices: ${M.type.indices}) -> u32 {
             return ${Me.length>0?Me.join("+"):"0u"};
           }`,`${te}(${z})`},P=(z,M)=>(()=>{if(p.storage===p.value)return`${e}[${z}]=${M};`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`${e}[${z}]=vec2<u32>(u32(${M}), select(0u, 0xFFFFFFFFu, ${M} < 0));`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`${e}[${z}]=vec2<u32>(u32(${M}), 0u);`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`${e}[${z}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${M}));`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),R=z=>(()=>{if(p.storage===p.value)return`${e}[${z}]`;if(p.storage==="vec2<u32>"&&p.value==="i32")return`i32(${e}[${z}].x)`;if(p.storage==="vec2<u32>"&&p.value==="u32")return`u32(${e}[${z}].x)`;if(p.storage==="u32"&&p.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${z}] & 0xFFu), bool(${e}[${z}] & 0xFF00u), bool(${e}[${z}] & 0xFF0000u), bool(${e}[${z}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${p.storage} and value type ${p.value} yet`)})(),ne=s<2?"":`
  fn get_${e}ByIndices(indices: ${p.indices}) -> ${d} {
    return ${R(`i2o_${e}(indices)`)};
  }`,U=s<2?"":(()=>{let z=a.map(te=>`d${te}: u32`).join(", "),M=a.map(te=>`d${te}`).join(", ");return`
  fn get_${e}(${z}) -> ${d} {
    return get_${e}ByIndices(${I(M)});
  }`})(),H=(...z)=>{if(z.length!==s)throw new Error(`indices length must be ${s}`);let M=z.map(f).join(",");return s===0?R("0u"):s===1?R(M[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${M})`)},K=z=>s<2?R(z):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${z})`),q=s<2?"":`
  fn set_${e}ByIndices(indices: ${p.indices}, value: ${d}) {
    ${P(`i2o_${e}(indices)`,"value")}
  }`,se=s<2?"":(()=>{let z=a.map(te=>`d${te}: u32`).join(", "),M=a.map(te=>`d${te}`).join(", ");return`
  fn set_${e}(${z}, value: ${d}) {
    set_${e}ByIndices(${I(M)}, value);
  }`})();return{impl:()=>{let z=[],M=!1;return m.offsetToIndices&&(z.push(b),M=!0),m.indicesToOffset&&(z.push(v),M=!0),m.broadcastedIndicesToOffset&&(Object.values(D).forEach(te=>z.push(te)),M=!0),m.set&&(z.push(se),M=!0),m.setByIndices&&(z.push(q),M=!0),m.get&&(z.push(U),M=!0),m.getByIndices&&(z.push(ne),M=!0),!i&&M&&z.unshift(`const ${_} = ${p.indices}(${n.join(",")});`,`const ${y} = ${p.indices}(${x.computeStrides(n).join(",")});`),z.join(`
`)},type:p,offsetToIndices:w,indicesToOffset:T,broadcastedIndicesToOffset:L,indices:I,indicesGet:k,indicesSet:B,set:(...z)=>{if(z.length!==s+1)throw new Error(`indices length must be ${s}`);let M=z[s];if(typeof M!="string")throw new Error("value must be string");let te=z.slice(0,s).map(f).join(",");return s===0?P("0u",M):s===1?P(te[0],M):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${te}, ${M})`)},setByOffset:P,setByIndices:(z,M)=>s<2?P(z,M):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${z}, ${M});`),get:H,getByOffset:R,getByIndices:K,usage:r,name:e,strides:y,shape:_,rank:s}},S=(e,t,n,r=1)=>Rn(e,t,n,"input",r),C=(e,t,n,r=1)=>Rn(e,t,n,"output",r),Gt=(e,t,n,r=1)=>Rn(e,t,n,"internal",r),On=class{constructor(t,n){this.normalizedDispatchGroup=t;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=je){let n=typeof t=="number"?t:t[0],r=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(n>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*r*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${r}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*r*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${r}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,n){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let r=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${n}) var<storage, ${r}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(t,n,r=1){return this.uniforms.push({name:t,type:n,length:r}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:n,type:r,length:o}of this.uniforms)if(o&&o>4)r==="f16"?t.push(`@align(16) ${n}:array<mat2x4<${r}>, ${Math.ceil(o/8)}>`):t.push(`${n}:array<vec4<${r}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?r:`vec${o}<${r}>`;t.push(`${n}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[t(n.type),n.length??1])}},ao=(e,t)=>new On(e,t)});var Fu,uo,Ku,ju,Zu,ce,lo,co,Oe=A(()=>{"use strict";V();W();oe();F();Fu=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},uo=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,Ku=(e,t)=>x.sortBasedOnPerm(e,uo(e.length,t)),ju=(e,t,n,r)=>{let o=`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<t;++i)o+=n.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},Zu=(e,t)=>{let n=[],r=[];for(let o=0;o<e.length;++o)e[o]!==1&&n.push(e[o]),e[t[o]]!==1&&r.push(t[o]);return{newShape:n,newPerm:r}},ce=(e,t)=>{let n=e.dataType,r=e.dims.length,o=uo(r,t),i=Ku(e.dims,o),{newShape:s,newPerm:a}=Zu(e.dims,o),u=x.areEqual(a,[2,3,1]),l=x.areEqual(a,[3,1,2]),d=s.length===2&&a[0]>a[1]||u||l,c=d?s:e.dims,p=i;d&&(c=u?[s[0],s[1]*s[2]]:l?[s[0]*s[1],s[2]]:s,p=[c[1],c[0]]);let f=S("a",n,c.length),m=C("output",n,p.length),h=16,_;return d?_=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(f,m)}
  var<workgroup> tile : array<array<${m.type.value}, ${h+1}>, ${h}>;
  ${y.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${f.getByIndices(`${f.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${m.setByIndices(`${m.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:_=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(f,m)}

  ${ju(o,r,f,m)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${m.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${m.setByOffset("global_idx",f.getByIndices("aIndices"))}
  }`,{name:d?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=x.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:d?{x:Math.ceil(p[1]/h),y:Math.ceil(p[0]/h)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...E(c,p)]}},getShaderSource:_}},lo=(e,t)=>{Fu(e.inputs),e.compute(ce(e.inputs[0],t.perm))},co=e=>N({perm:e.perm})});var Qu,Xu,Yu,Ju,el,tl,nl,rl,ol,il,ke,po,mo,fo,ho,go,yo,bo,_o,wo,$o,vo=A(()=>{"use strict";V();W();F();Ht();Oe();Qu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Xu={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Yu={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Ju={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},el=(e,t)=>{let n=[];for(let r=t-e;r<t;++r)n.push(r);return n},tl=(e,t)=>{let n=[],r=e.length;for(let i=0;i<r;i++)t.indexOf(i)===-1&&n.push(e[i]);let o=t.map(i=>e[i]);return[n,o]},nl=(e,t)=>{let n=e.length+t.length,r=[],o=0;for(let i=0;i<n;i++)t.indexOf(i)===-1?r.push(e[o++]):r.push(1);return r},rl=(e,t)=>{for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0},ol=(e,t)=>{let n=[];if(!rl(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&n.push(r);e.forEach(r=>n.push(r))}return n},il=(e,t,n,r,o,i,s)=>{let a=n[0].dims,u=x.size(i),l=x.size(s),d=S("_A",n[0].dataType,a),c=C("output",o,i),p=64;u===1&&(p=256);let f=`
          var<workgroup> aBestValues : array<f32, ${p}>;
       `,m=h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(d,c)}
        ${f}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(p)}

          let outputIndex = global_idx / ${p};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Yu[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${p}) {
           let candidate = f32(${d.getByOffset("offset + k")});
           bestValue = ${Qu[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${p}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Xu[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${c.setByOffset("outputIndex",`${r==="mean"?`${c.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${c.type.storage}(${Ju[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${p}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},ke=(e,t,n,r)=>{let o=e.inputs.length===1?n:Un(e.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((f,m)=>m));let s=x.normalizeAxes(i,e.inputs[0].dims.length),a=s,u=e.inputs[0],l=ol(a,e.inputs[0].dims.length);l.length>0&&(u=e.compute(ce(e.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=el(a.length,u.dims.length));let[d,c]=tl(u.dims,a),p=d;o.keepDims&&(p=nl(d,s)),e.compute(il(t,o.cacheKey,[u],r,e.inputs[0].dataType,p,c),{inputs:[u]})},po=(e,t)=>{ke(e,"ReduceMeanShared",t,"mean")},mo=(e,t)=>{ke(e,"ReduceL1Shared",t,"l1")},fo=(e,t)=>{ke(e,"ReduceL2Shared",t,"l2")},ho=(e,t)=>{ke(e,"ReduceLogSumExpShared",t,"logSumExp")},go=(e,t)=>{ke(e,"ReduceMaxShared",t,"max")},yo=(e,t)=>{ke(e,"ReduceMinShared",t,"min")},bo=(e,t)=>{ke(e,"ReduceProdShared",t,"prod")},_o=(e,t)=>{ke(e,"ReduceSumShared",t,"sum")},wo=(e,t)=>{ke(e,"ReduceSumSquareShared",t,"sumSquare")},$o=(e,t)=>{ke(e,"ReduceLogSumShared",t,"logSum")}});var Ee,sl,qt,Un,ze,al,ul,ll,dl,cl,pl,ml,fl,hl,gl,Pe,xo,So,To,Io,Co,Ao,ko,Eo,zo,Po,Ht=A(()=>{"use strict";V();W();oe();F();vo();Ee=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},sl=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qt=(e,t,n,r,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,d=l.length,c=x.normalizeAxes(o,d),p=!a&&c.length===0;l.forEach((_,y)=>{p||c.indexOf(y)>=0?s&&u.push(1):u.push(_)});let f=u.length,m=x.size(u);return{name:e,shaderCache:t,getShaderSource:_=>{let y=[],g=S("_A",n[0].dataType,d),b=C("output",i,f),w=r(g,b,c),$=w[2];for(let v=0,T=0;v<d;v++)p||c.indexOf(v)>=0?(s&&T++,$=`for(var j${v}: u32 = 0; j${v} < ${l[v]}; j${v}++) {
                  ${w[2].includes("last_index")?`let last_index = j${v};`:""}
                  ${g.indicesSet("input_indices",v,`j${v}`)}
                  ${$}
                }`):(y.push(`${g.indicesSet("input_indices",v,b.indicesGet("output_indices",T))};`),T++);return`

        ${_.registerUniform("output_size","u32").declareVariables(g,b)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${w[0]}       // init ops for reduce max/min
          ${w[1]}
          ${$}
          ${w[3]}
          ${w.length===4?b.setByOffset("global_idx","value"):w.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...E(l,u)]})}},Un=(e,t)=>{let n=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>n.push(Number(r))),N({axes:n,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},ze=(e,t,n,r)=>{let o=e.inputs,i=o.length===1?n:Un(o,n);e.compute(qt(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?sl:r,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},al=(e,t)=>{Ee(e.inputs),ze(e,"ReduceLogSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ul=(e,t)=>{Ee(e.inputs),ze(e,"ReduceL1",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},ll=(e,t)=>{Ee(e.inputs),ze(e,"ReduceL2",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},dl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceLogSumExp",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},cl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceMax",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(r.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},pl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceMean",t,(r,o,i)=>{let s=1;for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=e.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},ml=(e,t)=>{Ee(e.inputs),ze(e,"ReduceMin",t,(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},fl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceProd",t,(r,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},hl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceSum",t,(r,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},gl=(e,t)=>{Ee(e.inputs),ze(e,"ReduceSumSquare",t,(r,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Pe=(e,t,n)=>{if(t.length===0)return n;let r=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?r*=e[i]:o*=e[i];return o<32&&r>1024},xo=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pl(e,t):po(e,t)},So=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ul(e,t):mo(e,t)},To=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ll(e,t):fo(e,t)},Io=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?dl(e,t):ho(e,t)},Co=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cl(e,t):go(e,t)},Ao=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ml(e,t):yo(e,t)},ko=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fl(e,t):bo(e,t)},Eo=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hl(e,t):_o(e,t)},zo=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gl(e,t):wo(e,t)},Po=(e,t)=>{Pe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?al(e,t):$o(e,t)}});var Bo,Oo,Do,Vn,Mo=A(()=>{"use strict";V();oe();Ht();Bo=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Oo=(e,t)=>{Bo(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Do=(e,t)=>{Bo(e.inputs);let n=(r,o,i)=>{let s=[];for(let a=0;a<r.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qt("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],n,[t.axis],7,t.keepDims),{inputs:[0]})},Vn=e=>N(e)});var yl,Nn,bl,_l,wl,Ye,$l,Ro,Ft=A(()=>{"use strict";V();W();Lt();F();yl=(e,t)=>{let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4],a=e[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],d=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==d)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=o.dims[0]/3,p=c,f=p;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let b of t.qkvHiddenSizes)if(b%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");c=t.qkvHiddenSizes[0],p=t.qkvHiddenSizes[1],f=t.qkvHiddenSizes[2]}let m=l;if(c!==p)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==c+p+f)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(p!==f)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==p/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(h=s.dims[3])}let _=m+h,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==t.numHeads||a.dims[2]!==l||a.dims[3]!==_)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:m,totalSequenceLength:_,maxSequenceLength:y,inputHiddenSize:d,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/t.numHeads),vHeadSize:Math.floor(f/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:g,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Nn=(e,t,n)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,bl=(e,t,n,r,o,i,s,a)=>{let u=X(s?1:i),l=64,d=i/u;d<l&&(l=32);let c=Math.ceil(i/u/l),p=[{type:12,data:t},{type:12,data:n},{type:12,data:r},{type:12,data:o},{type:12,data:d},{type:12,data:c}],f=ee(e.dataType,u),m=de(1,u),h=["type"];s&&h.push("type"),a&&h.push("type");let _=y=>{let g=C("x",e.dataType,e.dims,u),b=[g],w=s?S("seq_lens",s.dataType,s.dims):void 0;w&&b.push(w);let $=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;$&&b.push($);let v=de(e.dataType),T=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${y.registerUniforms(T).declareVariables(...b)}
  ${y.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Nn(w,$,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${v}(1.0) / ${v}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${v}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${f};${u}`,inputDependencies:h},getShaderSource:_,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:t*n},programUniforms:p})}},_l=(e,t,n,r,o,i,s,a,u)=>{let l=s+i.kvSequenceLength,d=[i.batchSize,i.numHeads,i.sequenceLength,l],c=e>1&&r,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,f=c?[i.batchSize,p,l,i.headSize]:void 0,m=i.nReps?i.nReps:1,h=i.scale===0?1/Math.sqrt(i.headSize):i.scale,_=X(i.headSize),y=i.headSize/_,g=12,b={x:Math.ceil(l/g),y:Math.ceil(i.sequenceLength/g),z:i.batchSize*i.numHeads},w=[{type:12,data:i.sequenceLength},{type:12,data:y},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:h},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:m}],$=c&&r&&x.size(r.dims)>0,v=["type","type"];$&&v.push("type"),o&&v.push("type"),a&&v.push("type"),u&&v.push("type");let T=[{dims:d,dataType:t.dataType,gpuDataType:0}];c&&T.push({dims:f,dataType:t.dataType,gpuDataType:0});let I=k=>{let B=S("q",t.dataType,t.dims,_),D=S("key",n.dataType,n.dims,_),L=[B,D];if($){let q=S("past_key",r.dataType,r.dims,_);L.push(q)}o&&L.push(S("attention_bias",o.dataType,o.dims));let P=a?S("seq_lens",a.dataType,a.dims):void 0;P&&L.push(P);let R=u?S("total_sequence_length_input",u.dataType,u.dims):void 0;R&&L.push(R);let ne=C("output",t.dataType,d),U=[ne];c&&U.push(C("present_key",t.dataType,f,_));let H=de(1,_),K=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${B.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${B.type.storage}, ${g*g}>;
  ${k.registerUniforms(K).declareVariables(...L,...U)}
  ${k.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Nn(P,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${$&&c?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${c?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${H}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>$&&c?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${c?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${H}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(_){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${_}`)}})()};
        output[outputIdx] = ${ne.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${_};${o!==void 0};${r!==void 0};${e}`,inputDependencies:v},getRunData:()=>({outputs:T,dispatchGroup:b,programUniforms:w}),getShaderSource:I}},wl=(e,t,n,r,o,i,s=void 0,a=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,d=o.vHiddenSize*l,c=e>1&&r,p=o.kvNumHeads?o.kvNumHeads:o.numHeads,f=c?[o.batchSize,p,u,o.headSize]:void 0,m=[o.batchSize,o.sequenceLength,d],h=12,_={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},y=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:d},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],g=c&&r&&x.size(r.dims)>0,b=["type","type"];g&&b.push("type"),s&&b.push("type"),a&&b.push("type");let w=[{dims:m,dataType:t.dataType,gpuDataType:0}];c&&w.push({dims:f,dataType:t.dataType,gpuDataType:0});let $=v=>{let T=S("probs",t.dataType,t.dims),I=S("v",n.dataType,n.dims),k=[T,I];g&&k.push(S("past_value",r.dataType,r.dims));let B=s?S("seq_lens",s.dataType,s.dims):void 0;s&&k.push(B);let D=a?S("total_sequence_length_input",a.dataType,a.dims):void 0;a&&k.push(D);let P=[C("output",t.dataType,m)];c&&P.push(C("present_value",t.dataType,f));let R=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${T.type.value}, ${h*h}>;
  var<workgroup> tileV: array<${T.type.value}, ${h*h}>;
  ${v.registerUniforms(R).declareVariables(...k,...P)}
  ${v.mainStart([h,h,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Nn(B,D,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&c?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${c?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${T.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>g&&c?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${c?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:b},getRunData:()=>({outputs:w,dispatchGroup:_,programUniforms:y}),getShaderSource:$}},Ye=(e,t,n,r,o,i,s,a,u,l,d=void 0,c=void 0)=>{let p=Math.min(e.outputCount,1+(s?1:0)+(a?1:0)),f=p>1?l.pastSequenceLength:0,m=f+l.kvSequenceLength,h=u&&x.size(u.dims)>0?u:void 0,_=[t,n];p>1&&s&&x.size(s.dims)>0&&_.push(s),h&&_.push(h),d&&_.push(d),c&&_.push(c);let y=e.compute(_l(p,t,n,s,h,l,f,d,c),{inputs:_,outputs:p>1?[-1,1]:[-1]})[0];e.compute(bl(y,l.batchSize,l.numHeads,f,l.sequenceLength,m,d,c),{inputs:d&&c?[y,d,c]:[y],outputs:[]});let g=[y,r];p>1&&a&&x.size(a.dims)>0&&g.push(a),d&&g.push(d),c&&g.push(c),e.compute(wl(p,y,r,a,l,f,d,c),{inputs:g,outputs:p>1?[0,2]:[0]})},$l=(e,t)=>{let n=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,s=12,a={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],l=[{type:12,data:r},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],d=c=>{let p=C("output_q",u[0].dataType,n),f=C("output_k",u[0].dataType,n),m=C("output_v",u[0].dataType,n),h=S("input",u[0].dataType,u[0].dims),_=S("weight",u[1].dataType,u[1].dims),y=S("bias",u[2].dataType,u[2].dims),g=h.type.storage,b=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${c.registerUniforms(b).declareVariables(h,_,y,p,f,m)}
  ${c.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${g}(0);
    var valueK = ${g}(0);
    var valueV = ${g}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:d},{inputs:u,outputs:[-1,-1,-1]})},Ro=(e,t)=>{let n=yl(e.inputs,t),[r,o,i]=$l(e,n);return Ye(e,r,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],n)}});var vl,xl,Sl,Uo,Vo=A(()=>{"use strict";we();V();W();oe();F();vl=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(r,o,i)=>{let s=o.length;if(s!==r.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==r[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);n(e[1].dims,r,"Invalid input scale"),n(e[2].dims,r,"Invalid input B"),n(e[3].dims,r,"Invalid input mean"),n(e[4].dims,r,"Invalid input var")}else n(e[1].dims,[1],"Invalid input scale"),n(e[2].dims,[1],"Invalid input B"),n(e[3].dims,[1],"Invalid input mean"),n(e[4].dims,[1],"Invalid input var")},xl=(e,t)=>{let{epsilon:n,spatial:r,format:o}=t,i=e[0].dims,s=r?X(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=x.size(i)/s,l=r,d=l?i.length:i,c=S("x",e[0].dataType,e[0].dims,s),p=S("scale",e[1].dataType,e[1].dims,a),f=S("bias",e[2].dataType,e[2].dims,a),m=S("inputMean",e[3].dataType,e[3].dims,a),h=S("inputVar",e[4].dataType,e[4].dims,a),_=C("y",e[0].dataType,d,s),y=()=>{let b="";if(r)b=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")b=`
            ${_.indicesSet("outputIndices","0","0")}
            let cOffset = ${_.indicesToOffset("outputIndices")};`;else{b=`var cIndices = ${p.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let w=1;w<p.rank;w++)b+=`cIndices[${w}] = outputIndices[${w}];`;b+=`let cOffset = ${p.indicesToOffset("cIndices")};`}return b},g=b=>`
  const epsilon = ${n};
  ${b.registerUniform("outputSize","u32").declareVariables(c,p,f,m,h,_)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${_.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${p.getByOffset("cOffset")};
    let bias = ${f.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${c.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${_.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...E(i)]:[{type:12,data:u}]})}},Sl=e=>N(e),Uo=(e,t)=>{let{inputs:n,outputCount:r}=e,o=Sl({...t,outputCount:r});if(J.webgpu.validateInputContent&&vl(n,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(xl(n,o))}});var Tl,Il,No,Lo=A(()=>{"use strict";W();F();Tl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Il=e=>{let t=e[0].dims,n=e[0].dims[2],r=x.size(t)/4,o=e[0].dataType,i=S("input",o,t,4),s=S("bias",o,[n],4),a=S("residual",o,t,4),u=C("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:d=>`
  const channels = ${n}u / 4;
  ${d.declareVariables(i,s,a,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},No=e=>{Tl(e.inputs),e.compute(Il(e.inputs))}});var Cl,Y,Wo,Go,Ho,qo,Fo,Ko,jo,Zo,Qo,Al,Xo,Yo,Jo,ei,dt,ti,Kt,ni,ri,oi,ii,si,ai,ui,li,di,ci,pi,mi,fi,hi,gi,yi,bi,_i,Ln,Wn,wi,$i,vi,kl,El,xi,jt=A(()=>{"use strict";V();W();oe();F();Cl=(e,t,n,r,o,i,s)=>{let a=Math.ceil(t/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=S("inputData",n,[a],4),d=C("outputData",r,[a],4),c=[{name:"vec_size",type:"u32"}];return s&&c.push(...s),`
      ${e.registerUniforms(c).declareVariables(l,d)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx",u)}
  }`},Y=(e,t,n,r,o,i=e.dataType,s,a)=>{let u=[{type:12,data:Math.ceil(x.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>Cl(l,x.size(e.dims),e.dataType,i,n,r,a),getRunData:l=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(x.size(l[0].dims)/64/4)},programUniforms:u})}},Wo=e=>{e.compute(Y(e.inputs[0],"Abs","abs"))},Go=e=>{e.compute(Y(e.inputs[0],"Acos","acos"))},Ho=e=>{e.compute(Y(e.inputs[0],"Acosh","acosh"))},qo=e=>{e.compute(Y(e.inputs[0],"Asin","asin"))},Fo=e=>{e.compute(Y(e.inputs[0],"Asinh","asinh"))},Ko=e=>{e.compute(Y(e.inputs[0],"Atan","atan"))},jo=e=>{e.compute(Y(e.inputs[0],"Atanh","atanh"))},Zo=e=>N(e),Qo=(e,t)=>{let n;switch(t.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Y(e.inputs[0],"Cast",n,void 0,t.cacheKey,t.to))},Al=e=>{let t,n,r=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,n=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,n=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return N({min:t,max:n})},Xo=(e,t)=>{let n=t||Al(e.inputs),r=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:e.inputs[0].dataType,data:n.min},{type:e.inputs[0].dataType,data:n.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},Yo=e=>{e.compute(Y(e.inputs[0],"Ceil","ceil"))},Jo=e=>{e.compute(Y(e.inputs[0],"Cos","cos"))},ei=e=>{e.compute(Y(e.inputs[0],"Cosh","cosh"))},dt=e=>N(e),ti=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${n}(${t.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kt=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,ni=e=>{let t=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"Erf",n=>`erf_vf32(${n})`,Kt(t)))},ri=e=>{e.compute(Y(e.inputs[0],"Exp","exp"))},oi=e=>{e.compute(Y(e.inputs[0],"Floor","floor"))},ii=e=>{let t=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Kt(t)))},si=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${t.alpha});`,t.cacheKey))},ai=e=>{e.compute(Y(e.inputs[0],"Not",t=>`!${t}`))},ui=e=>{e.compute(Y(e.inputs[0],"Neg",t=>`-${t}`))},li=e=>{e.compute(Y(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},di=e=>{let t=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"Relu",n=>`select(vec4<${t}>(0.0), ${n}, ${n} > vec4<${t}>(0.0))`))},ci=e=>{e.compute(Y(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},pi=e=>N(e),mi=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"HardSigmoid",r=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${t.alpha} * ${r} + vec4<${n}>(${t.beta})))`,void 0,t.cacheKey))},fi=e=>{e.compute(Y(e.inputs[0],"Sin","sin"))},hi=e=>{e.compute(Y(e.inputs[0],"Sinh","sinh"))},gi=e=>{e.compute(Y(e.inputs[0],"Sqrt","sqrt"))},yi=e=>{e.compute(Y(e.inputs[0],"Tan","tan"))},bi=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,_i=e=>{e.compute(Y(e.inputs[0],"Tanh",bi))},Ln=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${bi("v")};
}
`,Wn=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,wi=e=>{let t=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"FastGelu",Wn,Ln(t),void 0,e.inputs[0].dataType))},$i=(e,t)=>{let n=de(e.inputs[0].dataType);return e.compute(Y(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${n}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${t.alpha});`,t.cacheKey)),0},vi=e=>{e.compute(Y(e.inputs[0],"Log","log"))},kl=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,El=e=>`quick_gelu_impl(${e})`,xi=(e,t)=>{let n=de(e.inputs[0].dataType);e.compute(Y(e.inputs[0],"QuickGelu",El,kl(n,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var zl,Pl,Ti,Ii=A(()=>{"use strict";W();F();jt();zl=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Pl=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let n=S("input",e[0].dataType,e[0].dims,4),r=S("bias",e[0].dataType,[e[0].dims[2]],4),o=C("output",e[0].dataType,t,4),i=x.size(t)/4,s=ee(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(n,r,o)}

  ${Kt(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Ti=e=>{zl(e.inputs),e.compute(Pl(e.inputs))}});var Bl,Ol,Be,Ci,Ai,ki,Ei,zi,Pi,Bi,Oi,Di,Mi,Ri=A(()=>{"use strict";V();W();F();Bl=(e,t,n,r,o,i,s,a,u,l,d,c)=>{let p,f;typeof a=="string"?p=f=(g,b)=>`${a}((${g}),(${b}))`:typeof a=="function"?p=f=a:(p=a.scalar,f=a.vector);let m=C("outputData",d,r.length,4),h=S("aData",u,t.length,4),_=S("bData",l,n.length,4),y;if(o)if(i){let g=x.size(t)===1,b=x.size(n)===1,w=t.length>0&&t[t.length-1]%4===0,$=n.length>0&&n[n.length-1]%4===0;g||b?y=m.setByOffset("global_idx",f(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"))):y=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(s||w?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||$?_.getByOffset("offsetB / 4u"):`${_.type.value}(${_.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=m.setByOffset("global_idx",f(h.getByOffset("global_idx"),_.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(b,w,$="")=>{let v=`aData[indexA${w}][componentA${w}]`,T=`bData[indexB${w}][componentB${w}]`;return`
            let outputIndices${w} = ${m.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offsetA${w} = ${h.broadcastedIndicesToOffset(`outputIndices${w}`,m)};
            let offsetB${w} = ${_.broadcastedIndicesToOffset(`outputIndices${w}`,m)};
            let indexA${w} = offsetA${w} / 4u;
            let indexB${w} = offsetB${w} / 4u;
            let componentA${w} = offsetA${w} % 4u;
            let componentB${w} = offsetB${w} % 4u;
            ${b}[${w}] = ${$}(${p(v,T)});
          `};d===9?y=`
            var data = vec4<u32>(0);
            ${g("data",0,"u32")}
            ${g("data",1,"u32")}
            ${g("data",2,"u32")}
            ${g("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:y=`
            ${g("outputData[global_idx]",0)}
            ${g("outputData[global_idx]",1)}
            ${g("outputData[global_idx]",2)}
            ${g("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(h,_,m)}

        ${c??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},Ol=(e,t,n,r,o,i,s=n.dataType)=>{let a=n.dims.map(h=>Number(h)??1),u=r.dims.map(h=>Number(h)??1),l=!x.areEqual(a,u),d=a,c=x.size(a),p=!1,f=!1,m=[l];if(l){let h=Ae.calcShape(a,u,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");d=h.slice(),c=x.size(d);let _=x.size(a)===1,y=x.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,b=u.length>0&&u[u.length-1]%4===0;m.push(_),m.push(y),m.push(g),m.push(b);let w=1;for(let $=1;$<d.length;$++){let v=a[a.length-$],T=u[u.length-$];if(v===T)w*=v;else break}w%4===0?(f=!0,p=!0):(_||y||g||b)&&(p=!0)}else p=!0;return m.push(p),{name:e,shaderCache:{hint:t+m.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>Bl(h,a,u,d,p,l,f,o,n.dataType,r.dataType,s,i),getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(x.size(d)/4)},...E(a,u,d)]})}},Be=(e,t,n,r,o,i)=>{e.compute(Ol(t,o??"",e.inputs[0],e.inputs[1],n,r,i))},Ci=e=>{Be(e,"Add",(t,n)=>`${t}+${n}`)},Ai=e=>{Be(e,"Div",(t,n)=>`${t}/${n}`)},ki=e=>{Be(e,"Equal",{scalar:(t,n)=>`u32(${t}==${n})`,vector:(t,n)=>`vec4<u32>(${t}==${n})`},void 0,void 0,9)},Ei=e=>{Be(e,"Mul",(t,n)=>`${t}*${n}`)},zi=e=>{let t=S("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Be(e,"Pow",{scalar:(r,o)=>`pow_custom(${r},${o})`,vector:(r,o)=>`pow_vector_custom(${r},${o})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Pi=e=>{Be(e,"Sub",(t,n)=>`${t}-${n}`)},Bi=e=>{Be(e,"Greater",{scalar:(t,n)=>`u32(${t}>${n})`,vector:(t,n)=>`vec4<u32>(${t}>${n})`},void 0,void 0,9)},Oi=e=>{Be(e,"Less",{scalar:(t,n)=>`u32(${t}<${n})`,vector:(t,n)=>`vec4<u32>(${t}<${n})`},void 0,void 0,9)},Di=e=>{Be(e,"GreaterOrEqual",{scalar:(t,n)=>`u32(${t}>=${n})`,vector:(t,n)=>`vec4<u32>(${t}>=${n})`},void 0,void 0,9)},Mi=e=>{Be(e,"LessOrEqual",{scalar:(t,n)=>`u32(${t}<=${n})`,vector:(t,n)=>`vec4<u32>(${t}<=${n})`},void 0,void 0,9)}});var Ml,Rl,Ul,Vl,Ui,Vi,Ni=A(()=>{"use strict";V();W();oe();F();Ml=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let n=0,r=e[n],o=r.dataType,i=r.dims.length;e.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==t&&u!==r.dims[l])throw new Error("non concat dimensions must match")})}})},Rl=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ul=(e,t)=>{let n=e.length,r=[];for(let o=0;o<n;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));n===1?r.push(i):o===0?r.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?r.push(`else { ${i} }`):r.push(`else if (inputIndex == ${o}) { ${i} }`)}return r.join(`
`)},Vl=(e,t,n,r)=>{let o=x.size(n),i=new Array(e.length),s=new Array(e.length),a=0,u=[],l=[],d=[{type:12,data:o}];for(let h=0;h<e.length;++h)a+=e[h].dims[t],i[h]=a,l.push(e[h].dims.length),s[h]=S(`input${h}`,r,l[h]),u.push("rank"),d.push({type:12,data:i[h]});for(let h=0;h<e.length;++h)d.push(...E(e[h].dims));d.push(...E(n));let c=C("output",r,n.length),p=c.indicesGet("indices",t),f=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),m=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let _=0;_<e.length;_++)h.registerUniform(`sizeInConcatAxis${_}`,"u32");return h.declareVariables(...s,c)})()}

  ${Rl(i.length,f)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${p});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${f});
      ${p} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ul(s,c)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:m}},Ui=(e,t)=>{let n=e.inputs,r=n[0].dims,o=x.normalizeAxis(t.axis,r.length);Ml(n,o);let i=r.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>x.size(a.dims)>0);e.compute(Vl(s,o,i,n[0].dataType),{inputs:s})},Vi=e=>N({axis:e.axis})});var Se,Te,Ie,Zt,Ve=A(()=>{"use strict";V();W();Se=(e,t,n="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${n}(uniforms.clip_min)), ${t}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Te=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Ie=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zt=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[n,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:n,beta:r}}else if(t==="Clip"){let[n,r]=e?.activation_params||[io,so];return{activation:t,clipMax:r,clipMin:n}}else if(t==="LeakyRelu"){let[n]=e?.activation_params||[.01];return{activation:t,alpha:n}}return{activation:t}}});var pe,Li,Qt=A(()=>{"use strict";pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Li=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Wi,Gi=A(()=>{"use strict";Wi=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var ct,Xt,Yt=A(()=>{"use strict";V();W();F();Ve();ct=(e,t,n,r,o)=>{let i=r-n;return`
      ${Array.from({length:n}).map((s,a)=>`
      if (${O(t.shape,a,t.rank)} != 1) {
        ${t.indicesSet(e,a,O(o,a+i,r))}
      } else {
        ${t.indicesSet(e,a,0)}
      }`).join("")}
`},Xt=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s[s.length-2],l=a[a.length-1],d=s[s.length-1],c=X(l),p=X(d),f=X(u),m=x.size(n)/c/f,h=e.length>2,_=r?r.slice(0,-2):n.slice(0,-2),g=[x.size(_),u,l],b=[{type:12,data:m},{type:12,data:u},{type:12,data:l},{type:12,data:d}];Te(t,b),b.push(...E(_,s,a)),h&&b.push(...E(e[2].dims)),b.push(...E(g));let w=$=>{let v=Gt("batch_dims",e[0].dataType,_.length),T=S("a",e[0].dataType,s.length,p),I=S("b",e[1].dataType,a.length,c),k=C("output",e[0].dataType,g.length,c),B=ee(k.type.tensor),D=Se(t,k.type.value,B),L=[T,I],P="";if(h){let U=o?c:1;L.push(S("bias",e[2].dataType,e[2].dims.length,U)),P=`${o?`value += bias[col / ${U}];`:`value += ${k.type.value}(bias[row + i]);`}`}let R=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Ie(t,R);let ne=()=>{let U=`var a_data: ${T.type.value};`;for(let H=0;H<p;H++)U+=`
              let b_data${H} = b[(b_offset + (k + ${H}) * uniforms.N + col) / ${c}];`;for(let H=0;H<f;H++){U+=`a_data = a[(a_offset + (row + ${H}) * uniforms.K + k) / ${p}];`;for(let K=0;K<p;K++)U+=`
            values[${H}] = fma(${I.type.value}(a_data${p===1?"":`[${K}]`}), b_data${K}, values[${H}]);
`}return U};return`
  ${$.registerUniforms(R).registerInternalVariables(v).declareVariables(...L,k)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${v.offsetToIndices("batch")};`}

    var a_indices: ${T.type.indices};
    ${ct("a_indices",T,T.rank-2,v.rank,"batch_indices")}
    ${T.indicesSet("a_indices",T.rank-2,0)}
    ${T.indicesSet("a_indices",T.rank-1,0)}
    let a_offset = ${T.indicesToOffset("a_indices")};

    var b_indices: ${I.type.indices};
    ${ct("b_indices",I,I.rank-2,v.rank,"batch_indices")}
    ${I.indicesSet("b_indices",I.rank-2,0)}
    ${I.indicesSet("b_indices",I.rank-1,0)}
    let b_offset = ${I.indicesToOffset("b_indices")};
    var values: array<${k.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${p}) {
      ${ne()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${P}
      ${D}
      let cur_indices = ${k.type.indices}(batch, row + i, col);
      let offset = ${k.indicesToOffset("cur_indices")};
      ${k.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${c};${p};${f};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:w}}});var Nl,Ll,Gn,Hi,Wl,Hn,Gl,pt,Jt=A(()=>{"use strict";V();W();F();Ve();Yt();Qt();Nl=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Ll=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Gn=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32)=>{let u=t[1]*e[1],l=t[0]*e[0],d=o?u:i,c=o?i:u,p=d/t[0],f=i/t[1];if(!((o&&p===4&&e[1]===4||!o&&(p===3||p===4))&&d%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${p} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${p} must be 3 or 4.
  tileAWidth ${d} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${p}<${n}>, ${d/p}>, ${c}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${p};
const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${f};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Nl(o,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${p===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Ll(o,p)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Hi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Wl=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Hn=(e,t,n="f32",r,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=e[1]*t[1],d=e[0]*t[0],c=o?l:i,p=o?i:l;if(!(p%t[1]===0&&c%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${p} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let f=p/t[1],m=c/t[0],h=i/t[1],_=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${d};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${p}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          ${Hi(o,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Hi(o,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${n}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Wl(o)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${n}, ${c}>, ${p}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${d}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${_}
  }
`},Gl=(e,t,n,r,o=!1)=>{let[i,s,a,u]=r,l=ee(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${pe(e,l)} {
      var value = ${pe(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ct("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${pe(e,l)} {
      var value = ${pe(e,l)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${a.type.indices};
        ${ct("bIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("bIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("bIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${pe(e,l)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${pe(e,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},pt=(e,t,n,r,o=!1,i)=>{let s=e[0].dims,a=e[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),d=r?r.slice(0,-2):n.slice(0,-2),c=x.size(d),p=s[s.length-2],f=s[s.length-1],m=a[a.length-1],h=f%4===0&&m%4===0,_=p<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(m/y[0]/_[0]),Math.ceil(p/y[1]/_[1]),Math.ceil(c/y[2]/_[2])],b=h?4:1,w=[...u,p,f/b],$=w.length,v=[...l,f,m/b],T=v.length,I=[c,p,m/b],k=[{type:6,data:p},{type:6,data:m},{type:6,data:f}];Te(t,k),k.push(...E(d,w,v));let B=["rank","rank"],D=e.length>2;D&&(k.push(...E(e[2].dims)),B.push("rank")),k.push(...E(I));let L=P=>{let R=d.length,ne=Gt("batchDims",e[0].dataType,R,1),U=ee(e[0].dataType),H=S("a",e[0].dataType,$,b),K=S("b",e[1].dataType,T,b),q=C("result",e[0].dataType,I.length,b),se=[H,K];if(D){let M=o?b:1;se.push(S("bias",e[2].dataType,e[2].dims.length,M))}let ye=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Ie(t,ye);let ae=ee(q.type.tensor),Q=Se(t,q.type.value,ae),z=Gl(b,D,Q,[ne,H,K,q],o);return`
  ${P.registerUniforms(ye).registerInternalVariables(ne).declareVariables(...se,q)}
  ${z}
  ${h?Gn(_,y,U,ne):Hn(_,y,U,ne)}
                   `};return{name:"MatMul",shaderCache:{hint:`${_};${t.activation};${h};${o}`,inputDependencies:B},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:e[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:k}),getShaderSource:L}}});var Hl,qi,Fi=A(()=>{"use strict";V();Ce();F();Ve();Qt();Gi();Jt();Hl=(e,t,n,r,o=!1,i,s=4,a=4,u=4,l="f32")=>{let d=B=>{switch(B){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},c=B=>{switch(B){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${B} is not supported.`)}},p=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,f=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",_=e?"row":"col",y=e?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${_} / outWidth;
    let outCol = ${_} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${pe(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${h}) {
      ${p}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${d(s)}
    }
    return resData;`,b=e?t&&r?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${pe(s,l)}(0.0);`:r&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${pe(s,l)}(0.0);`,w=`${c(a)}`,$=pe(u,l),v=e?pe(s,l):pe(a,l),T=e?pe(a,l):pe(s,l),I=Se(i,$,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${v} {
      ${e?b:w}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${T} {
      ${e?w:b}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${$}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${f}
      ${Li(o)}
      ${I}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},qi=(e,t,n,r,o,i,s,a,u)=>{let l=t.format==="NHWC",d=l?e[0].dims[3]:e[0].dims[1],c=n[0],p=l?n[2]:n[3],f=l?n[1]:n[2],m=l?n[3]:n[1],h=l&&(d%4===0||d%3===0)&&m%4===0,_=l?m:p*f,y=l?p*f:m,g=[8,8,1],b=r<=8?[4,1,1]:[4,4,1],w=[Math.ceil(_/g[0]/b[0]),Math.ceil(y/g[1]/b[1]),Math.ceil(c/g[2]/b[2])];j("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${w}`);let $=h?l&&d%4!==0?3:4:1,v=g[1]*b[1],T=g[0]*b[0],I=Math.max(g[0]*$,g[1]),k=r%v===0,B=o%T===0,D=i%I===0,L=h?[$,4,4]:[1,1,1],P=[{type:6,data:r},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Te(t,P),P.push(...E(e[0].dims,e[1].dims));let R=["rank","rank"];s&&(P.push(...E(e[2].dims)),R.push("rank")),P.push(...E(n));let ne=U=>{let H=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Ie(t,H);let K=h?4:1,q=ee(e[0].dataType),se=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${q}>`:q}) {
        result[flatIndex] = ${h?`vec4<${q}>`:q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${q}>`:q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,ye=S("x",e[0].dataType,e[0].dims.length,$===3?1:$),ae=S("w",e[1].dataType,e[1].dims.length,K),Q=[ye,ae],z=C("result",e[0].dataType,n.length,K);if(s){let M=S("bias",e[2].dataType,e[2].dims.length,K);Q.push(M),se+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${q}>`:q} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Wi("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${U.registerUniforms(H).declareVariables(...Q,z)}
        ${se}
        ${Hl(l,k,B,D,s,t,L[0],L[1],L[2],q)}
        ${h?Gn(b,g,q,void 0,!l,I):Hn(b,g,q,void 0,!l,I,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${$};${h};${k};${B};${D};${v};${T};${I}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:e[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:P}),getShaderSource:ne}}});var ql,Ki,en,Fl,ji,Kl,Zi,Qi,Xi=A(()=>{"use strict";V();Ce();W();F();Ve();Qt();ql=e=>{let t=1;for(let n=0;n<e.length;n++)t*=e[n];return t},Ki=e=>typeof e=="number"?[e,e,e]:e,en=(e,t)=>t<=1?e:e+(e-1)*(t-1),Fl=(e,t,n,r=1)=>{let o=en(t,r);return Math.floor((e[0]*(n-1)-n+o)/2)},ji=(e,t,n,r,o)=>{o==null&&(o=Fl(e,t[0],r[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)e[s]+2*o>=t[s]&&(i[s]=Math.trunc((e[s]-t[s]+2*o)/r[s]+1));return i},Kl=(e,t,n,r,o,i,s,a,u,l)=>{let d,c,p,f;if(e==="VALID"&&(e=0),typeof e=="number"){d={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=ji([t,n,r,1],[a,u,l],1,[o,i,s],e);c=m[0],p=m[1],f=m[2]}else if(Array.isArray(e)){if(!e.every((h,_,y)=>h===y[0]))throw Error(`Unsupported padding parameter: ${e}`);d={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=ji([t,n,r,1],[a,u,l],1,[o,i,s],e[0]);c=m[0],p=m[1],f=m[2]}else if(e==="SAME_UPPER"){c=Math.ceil(t/o),p=Math.ceil(n/i),f=Math.ceil(r/s);let m=(c-1)*o+a-t,h=(p-1)*i+u-n,_=(f-1)*s+l-r,y=Math.floor(m/2),g=m-y,b=Math.floor(h/2),w=h-b,$=Math.floor(_/2),v=_-$;d={top:b,bottom:w,left:$,right:v,front:y,back:g}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:d,outDepth:c,outHeight:p,outWidth:f}},Zi=(e,t,n,r,o,i=!1,s="channelsLast")=>{let a,u,l,d,c;if(s==="channelsLast")[a,u,l,d,c]=e;else if(s==="channelsFirst")[a,c,u,l,d]=e;else throw new Error(`Unknown dataFormat ${s}`);let[p,,f,m,h]=t,[_,y,g]=Ki(n),[b,w,$]=Ki(r),v=en(f,b),T=en(m,w),I=en(h,$),{padInfo:k,outDepth:B,outHeight:D,outWidth:L}=Kl(o,u,l,d,_,y,g,v,T,I),P=i?p*c:p,R=[0,0,0,0,0];return s==="channelsFirst"?R=[a,P,B,D,L]:s==="channelsLast"&&(R=[a,B,D,L,P]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:d,inChannels:c,outDepth:B,outHeight:D,outWidth:L,outChannels:P,padInfo:k,strideDepth:_,strideHeight:y,strideWidth:g,filterDepth:f,filterHeight:m,filterWidth:h,effectiveFilterDepth:v,effectiveFilterHeight:T,effectiveFilterWidth:I,dilationDepth:b,dilationHeight:w,dilationWidth:$,inShape:e,outShape:R,filterShape:t}},Qi=(e,t,n,r,o,i)=>{let s=i==="channelsLast",a=s?e[0].dims[3]:e[0].dims[1],u=!1,l=[64,1,1],d={x:n.map((g,b)=>b)},c=[Math.ceil(ql(d.x.map(g=>n[g]))/l[0]),1,1];j("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${c}`);let p=u?s&&a%4!==0?3:4:1,f=x.size(n),m=[{type:12,data:f},{type:12,data:r},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];Te(t,m),m.push(...E(e[0].dims,e[1].dims));let h=["rank","rank"],_=e.length===3;_&&(m.push(...E(e[2].dims)),h.push("rank")),m.push(...E(n));let y=g=>{let b=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Ie(t,b);let w=u?4:1,$=ee(e[0].dataType),v=S("x",e[0].dataType,e[0].dims.length,p===3?1:p),T=S("W",e[1].dataType,e[1].dims.length,w),I=[v,T],k=C("result",e[0].dataType,n.length,w),B="";if(_){let P=S("bias",e[2].dataType,e[2].dims.length,w);I.push(P),B+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${$}>`:$} {
          return bias[${s?O("coords",4,5):O("coords",1,5)}${u?"/ 4":""}];
        }`}let D=pe(p,$),L=Se(t,D,$);return`
            ${B}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${v.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${T.getByIndices("aIndices")};
            }
          ${g.registerUniforms(b).declareVariables(...I,k)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${k.offsetToIndices("global_idx")};
              let batch = ${O("coords",0,v.rank)};
              let d2 = ${s?O("coords",v.rank-1,v.rank):O("coords",1,v.rank)};
              let xFRCCorner = vec3<u32>(${s?O("coords",1,v.rank):O("coords",2,v.rank)},
              ${s?O("coords",2,v.rank):O("coords",3,v.rank)},
              ${s?O("coords",3,v.rank):O("coords",4,v.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?O("uniforms.x_shape",1,v.rank):O("uniforms.x_shape",2,v.rank)};
              let xShapeZ = ${s?O("uniforms.x_shape",2,v.rank):O("uniforms.x_shape",3,v.rank)};
              let xShapeW = ${s?O("uniforms.x_shape",3,v.rank):O("uniforms.x_shape",4,v.rank)};
              let xShapeU = ${s?O("uniforms.x_shape",4,v.rank):O("uniforms.x_shape",1,v.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${L}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${p};${_}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:c[0],y:c[1],z:c[2]},programUniforms:m}),getShaderSource:y}}});var Yi,Ji,es=A(()=>{"use strict";V();W();F();Ve();Yi=(e,t,n,r)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",s=e[0].dims,a=e[1].dims,u=t.format==="NHWC",l=u?n[3]:n[1],d=l/t.group,c=u&&d>=4?X(l):1,p=x.size(n)/c,f=[{type:12,data:p},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:d}];Te(t,f),f.push(...E(s,[a[0],a[1],a[2],a[3]/c]));let m=o?["rank","rank","rank"]:["rank","rank"];f.push(...E([n[0],n[1],n[2],n[3]/c]));let h=_=>{let y=C("output",e[0].dataType,n.length,c),g=ee(y.type.tensor),b=Se(t,y.type.value,g),w=S("x",e[0].dataType,s.length),$=S("w",e[1].dataType,a.length,c),v=[w,$];o&&v.push(S("b",e[2].dataType,e[2].dims,c));let T=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Ie(t,T);let I=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${w.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${$.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${w.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${$.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${_.registerUniforms(T).declareVariables(...v,y)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${I}
    ${i}
    ${b}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${c}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},Ji=(e,t,n,r)=>{let o=e.length>2,i=X(n[3]),s=X(n[2]),a=x.size(n)/i/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],l=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],d=[n[0],n[1],n[2],n[3]/i],c=[{type:12,data:a},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Te(t,c),c.push(...E(u,l,d));let p=(s-1)*t.strides[1]+l[1],f=m=>{let h=C("output",e[0].dataType,d.length,i),_=ee(h.type.tensor),y=Se(t,h.type.value,_),g=S("x",e[0].dataType,u.length,i),b=S("w",e[1].dataType,l.length,i),w=[g,b];o&&w.push(S("b",e[2].dataType,e[2].dims,i));let $=o?"value += b[output_channel];":"",v=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Ie(t,v),`
  ${m.registerUniforms(v).declareVariables(...w,h)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${p}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${p}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${b.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${$}
      ${y}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${s};${p};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:f}}});var jl,qn,Zl,Fn,Kn,ts,Ql,Xl,jn,ns=A(()=>{"use strict";W();Fi();Xi();Jt();es();Ve();Yt();Oe();jl=(e,t,n,r,o,i)=>{let s=e[0],a=e.slice(i?1:2,i?3:4),u=a.length,l=t[0],c=t.slice(2).map((m,h)=>m+(m-1)*(n[h]-1)),f=a.map((m,h)=>m+r[h]+r[h+u]).map((m,h)=>Math.floor((m-c[h]+o[h])/o[h]));return f.splice(0,0,s),f.splice(i?3:1,0,l),f},qn=[2,3,1,0],Zl=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Fn=(e,t)=>{let n=e.kernelShape.slice();n.length<t[1].dims.length-2&&n.push(...Array(t[1].dims.length-2-n.length).fill(0));for(let i=2;i<t[1].dims.length;++i)n[i-2]===0&&(n[i-2]=t[1].dims[i]);let r=e.pads.slice();Ke.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,n,r,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:n,pads:r}),o},Kn=e=>{let t=Zt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,s=e.kernel_shape,a=e.pads,u=e.strides,l=e.w_is_const();return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},ts=(e,t,n,r)=>{let o=n.format==="NHWC",i=jl(t[0].dims,t[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let v=[t[0]];if(o){let I=e.kernelCustomData.wT??e.compute(ce(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=I),v.push(I)}else v.push(t[1]);t.length===3&&v.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===n.group&&t[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?e.compute(Ji(v,n,i,r),{inputs:v}):e.compute(Yi(v,n,i,r),{inputs:v});return}let s=t.length===3,a=t[0].dims[o?1:2],u=t[0].dims[o?2:3],l=t[0].dims[o?3:1],d=t[1].dims[2],c=t[1].dims[3],p=i[o?1:2],f=i[o?2:3],m=i[o?3:1],h=o&&d===a&&c===u&&n.pads[0]===0&&n.pads[1]===0;if(h||d===1&&c===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let v=i[0],T,I,k,B=[];if(o){let P=e.kernelCustomData.wT??e.compute(ce(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=P),h){let R=a*u*l;T=t[0].reshape([1,v,R]),I=P.reshape([1,R,m]),k=[1,v,m]}else T=t[0].reshape([v,a*u,l]),I=P.reshape([1,l,m]),k=[v,p*f,m];B.push(T),B.push(I)}else T=t[0].reshape([v,l,a*u]),I=t[1].reshape([1,m,l]),k=[v,m,p*f],B.push(I),B.push(T);s&&B.push(t[2]);let D=k[2],L=B[0].dims[B[0].dims.length-1];D<8&&L<8?e.compute(Xt(B,n,i,k,o,r),{inputs:B}):e.compute(pt(B,n,i,k,o,r),{inputs:B});return}let _=!0,y=e.kernelCustomData.wT??e.compute(ce(t[1],qn),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=y);let g=[t[0],y];s&&g.push(t[2]);let b=o?p*f:m,w=o?m:p*f,$=d*c*l;e.compute(qi(g,n,i,b,w,$,s,_,r),{inputs:g})},Ql=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),s=[1].concat(t.dilations),a=[1].concat(t.kernelShape),u=Fn({...t,pads:o,strides:i,dilations:s,kernelShape:a},r);ts(e,r,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},Xl=(e,t,n)=>{let r=n.format==="NHWC"?"channelsLast":"channelsFirst",o=Fn(n,t),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Zi(t[0].dims,t[1].dims,n.strides,n.dilations,i,!1,r);e.compute(Qi(t,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},jn=(e,t)=>{if(Zl(e.inputs,t),e.inputs[0].dims.length===3)Ql(e,t);else if(e.inputs[0].dims.length===5)Xl(e,e.inputs,t);else{let n=Fn(t,e.inputs);ts(e,e.inputs,n)}}});var rs,os=A(()=>{"use strict";V();Ce();W();F();rs=(e,t,n)=>{let r=e.length>2,o=t.outputShape,i=t.format==="NHWC",s=t.group,a=e[1].dims,u=a[2]/s,l=a[3],d=i?X(l):1,c=x.size(o)/d,p=[Math.ceil(c/64),1,1];j("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${p}`);let f=["rank","rank"],m=[t.strides[0],t.strides[1]],h=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],_=[t.dilations[0],t.dilations[1]],y=[h[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),h[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],g=[y[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),y[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],b=[{type:12,data:c},{type:12,data:m},{type:12,data:h},{type:12,data:_},{type:12,data:y},{type:6,data:g},{type:12,data:u},{type:12,data:l},...E(e[0].dims,e[1].dims)];r&&(b.push(...E(e[2].dims)),f.push("rank")),b.push(...E(o));let w=$=>{let v=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:m.length},{name:"filter_dims",type:"u32",length:h.length},{name:"dilations",type:"u32",length:h.length},{name:"effective_filter_dims",type:"u32",length:y.length},{name:"pads",type:"i32",length:g.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],T=ee(e[0].dataType),I=i?1:2,k=i?2:3,B=i?3:1,D=S("W",e[1].dataType,e[1].dims.length,d),L=S("Dy",e[0].dataType,e[0].dims.length),P=[L,D];r&&P.push(S("bias",e[2].dataType,[o[B]].length,d));let R=C("result",e[0].dataType,o.length,d),ne=`
            let outputIndices = ${R.offsetToIndices(`global_idx * ${d}`)};
            let batch = ${R.indicesGet("outputIndices",0)};
            let d1 = ${R.indicesGet("outputIndices",B)};
            let r = ${R.indicesGet("outputIndices",I)};
            let c = ${R.indicesGet("outputIndices",k)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${R.type.value}(0.0);
            for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${T}(dyRCorner) + ${T}(wR)) / ${T}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${T}(uniforms.Dy_shape[${I}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);

              for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${T}(dyCCorner) + ${T}(wC)) / ${T}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${T}(uniforms.Dy_shape[${k}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                  let xValue = ${i?L.get("batch","idyR","idyC","inputChannel"):L.get("batch","inputChannel","idyR","idyC")};
                  let w_offset = ${D.indicesToOffset(`${D.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
                  let wValue = ${D.getByOffset(`w_offset / ${d}`)};
                  dotProd = dotProd + xValue * wValue;
                  inputChannel = inputChannel + 1;
                }
              }
            }
            let value = dotProd${r?` + bias[d1 / ${d}]`:""};
            ${R.setByOffset("global_idx","value")};
          `;return`
    ${$.registerUniforms(v).declareVariables(...P,R)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${ne}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${d}`,inputDependencies:f},getRunData:()=>({dispatchGroup:{x:p[0],y:p[1],z:p[2]},outputs:[{dims:n?n(o):o,dataType:e[0].dataType}],programUniforms:b}),getShaderSource:w}}});var Yl,Jl,ed,is,ss,td,as,nd,us,ls=A(()=>{"use strict";os();Ve();Oe();Yl=(e,t,n,r,o,i)=>(e-1)*t+n+(r-1)*o+1-i,Jl=(e,t,n,r,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(n[r]=i,n[o]=e-i):t==="SAME_LOWER"&&(n[r]=e-i,n[o]=i)},ed=(e,t,n,r,o,i,s,a,u,l)=>{let d=e.length-2,c=l.length===0;u.length<d&&u.push(...Array(d-u.length).fill(0));let p=e[0],f=t[a?3:1]*o;for(let m=0,h=e.length-d-(a?1:0);m<d;++m,++h){let _=e[h],y=c?_*s[m]:l[m],g=Yl(_,s[m],i[m],t[h],n[m],y);Jl(g,r,i,m,m+d),c&&l.push(s[m]*(_-1)+u[m]+(t[h]-1)*n[m]+1-i[m]-i[m+d])}l.splice(0,0,p),l.splice(a?3:1,0,f)},is=(e,t)=>{let n=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((c,p)=>c*p,1)===0){n.length=0;for(let c=2;c<t[1].dims.length;++c)n.push(t[1].dims[c])}let r=e.format==="NHWC";n.splice(0,0,t[1].dims[0]),n.splice(r?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),s=e.outputPadding.slice(),a=t[0].dims,u=e.dilations.slice();if(u.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;u=new Array(c).fill(1)}let l=e.strides.slice();if(l.reduce((c,p)=>c+p,0)===0){let c=t[0].dims.length-2;l=new Array(c).fill(1)}ed(a,n,u,e.autoPad,e.group,o,l,r,s,i);let d=Object.assign({},e);return Object.assign(d,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),d},ss=e=>{let t=Zt(e),n=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,s=e.kernelShape,a=e.pads,u=e.strides,l=e.wIsConst(),d=e.outputPadding,c=e.outputShape;return{autoPad:r,format:n,dilations:o,group:i,kernelShape:s,outputPadding:d,outputShape:c,pads:a,strides:u,wIsConst:l,...t,cacheKey:`${e.format};${t.activation};`}},td=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let n=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(n!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((d,c)=>d+c,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((d,c)=>d+c,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((d,c)=>d+c,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((d,c)=>d+c,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},as=(e,t,n,r)=>{let o=e.kernelCustomData.wT??e.compute(ce(t[1],[2,3,0,1]),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(rs(i,n,r),{inputs:i})},nd=(e,t)=>{let n=t.format==="NHWC",r=[e.inputs[0].reshape(n?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=t.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=is({...t,pads:a,strides:s,dilations:i,kernelShape:o},r);as(e,r,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},us=(e,t)=>{if(td(e.inputs,t),e.inputs[0].dims.length===3)nd(e,t);else{let n=is(t,e.inputs);as(e,e.inputs,n)}}});var rd,ds,cs,ps=A(()=>{"use strict";V();W();oe();F();rd=(e,t,n,r)=>{let o=x.size(t),i=t.length,s=S("input",e,i),a=C("output",e,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=x.normalizeAxis(u,i),d=c=>{let p=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,f=O("uniforms.input_shape","uniforms.axis",i),m=r.reverse?p+(r.exclusive?" + 1":""):"0",h=r.reverse?f:p+(r.exclusive?"":" + 1");return`
                ${c.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${c.mainStart()}
                  ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...E(t,t)]}),getShaderSource:d}},ds=(e,t)=>{let n=e.inputs[0].dims,r=e.inputs[0].dataType,o=e.inputs[1];e.compute(rd(r,n,o,t),{inputs:[0]})},cs=e=>{let t=e.exclusive===1,n=e.reverse===1;return N({exclusive:t,reverse:n})}});var od,id,sd,ms,fs,hs=A(()=>{"use strict";V();W();oe();F();od=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},id=(e,t,n,r)=>{let o=[];o.push(`fn perm(i: ${r.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<t;++i)o.push(n.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},sd=(e,t)=>{let n,r,o,i,s,a,u=t.format==="NHWC",l=t.blocksize,d=t.mode==="DCR";u?([n,r,o,i]=e.dims,s=d?[n,r,o,l,l,i/l**2]:[n,r,o,i/l**2,l,l],a=d?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,r,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=d?[n,l,l,i/l**2,r,o]:[n,i/l**2,l,l,r,o],a=d?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let c=e.reshape(s),p=c.dims.length,f=e.dataType,m=S("a",f,p),h=C("output",f,p),_=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,h)}

  ${id(a,p,m,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[n,r*l,o*l,i/l**2]:[n,i/l**2,r*l,o*l],b=x.size(g),w=c.dims,$=x.sortBasedOnPerm(w,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(b/64)},programUniforms:[{type:12,data:b},...E(w,$)]}},getShaderSource:_}},ms=(e,t)=>{od(e.inputs),e.compute(sd(e.inputs[0],t))},fs=e=>N({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Zn,tn,gs,ad,ud,Qn,Xn,ys,ld,bs,_s,ws=A(()=>{"use strict";V();W();oe();F();Zn="[a-zA-Z]|\\.\\.\\.",tn="("+Zn+")+",gs="^"+tn+"$",ad="("+tn+",)*"+tn,ud="^"+ad+"$",Qn=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,n){let r=this.symbolToIndices.get(t);r===void 0?r=[n]:r.push(n),this.symbolToIndices.set(t,r)}},Xn=class{constructor(t,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,o]=n.includes("->")?n.split("->",2):[n,""];if(!r.match(RegExp(ud)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,u)=>{let l=t[u].dims.slice();if(!a.match(RegExp(gs)))throw new Error("Invalid LHS term");let d=this.processTerm(a,!0,l,u);this.lhs.push(d)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(tn)))throw new Error("Invalid RHS");o.match(RegExp(Zn,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,n,r){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(r)}else o={count:1,dimValue:n,inputIndices:[r]};this.symbolToInfo.set(t,o)}processTerm(t,n,r,o=-1){let i=r.length,s=!1,a=[],u=0;if(!t.match(RegExp(gs))&&!n&&t!=="")throw new Error("Invalid LHS term");let l=t.match(RegExp(Zn,"g")),d=new Qn(o);return l?.forEach((c,p)=>{if(c==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let f=i-l.length+1;if(f<0)throw new Error("Ellipsis out of bounds");if(a=r.slice(u,u+f),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let m=0;m<a.length;m++){let h=String.fromCharCode("0".charCodeAt(0)+m);d.addSymbol(h,p+m),this.addSymbol(h,r[u++],o)}}else d.addSymbol(c,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],o)}),d}},ys=e=>e+"_max",ld=(e,t,n,r)=>{let i=e.map(d=>d.length).map((d,c)=>S(`input${c}`,t,d)),s=x.size(r),a=C("output",t,r.length),u=[...n.symbolToInfo.keys()].filter(d=>!n.rhs.symbolToIndices.has(d)),l=d=>{let c=[],p="var prod = 1.0;",f="var sum = 0.0;",m="sum += prod;",h=[],_=[],y=[],g=[],b=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach(($,v)=>{if(n.rhs.symbolToIndices.has(v)){let T=n.rhs.symbolToIndices.get(v)?.[0];T!==void 0&&n.lhs.forEach((I,k)=>{if($.inputIndices.includes(k)){let B=I.symbolToIndices.get(v);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(D=>{c.push(`${i[k].indicesSet(`input${k}Indices`,D,a.indicesGet("outputIndices",T))}`)})}})}else n.lhs.forEach((T,I)=>{if($.inputIndices.includes(I)){let k=T.symbolToIndices.get(v);if(k===void 0)throw new Error("Invalid symbol error");k.forEach(B=>{h.push(`${i[I].indicesSet(`input${I}Indices`,B,`${v}`)}`)}),g.push(`prod *= ${i[I].getByIndices(`input${I}Indices`)};`)}}),_.push(`for(var ${v}: u32 = 0; ${v} < uniforms.${ys(v)}; ${v}++) {`),y.push("}")});let w=b?[...c,`let sum = ${i.map(($,v)=>$.getByIndices(`input${v}Indices`)).join(" * ")};`]:[...c,f,..._,...h,p,...g,m,...y];return`
            ${d.registerUniforms(u.map($=>({name:`${ys($)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map(($,v)=>`var input${v}Indices: ${i[v].type.indices};`).join(`
`)}
            ${w.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(p=>n.symbolToInfo.has(p)).map(p=>({type:12,data:n.symbolToInfo.get(p)?.dimValue||0}));d.push({type:12,data:s});let c=e.map((p,f)=>[...E(p)]).reduce((p,f)=>p.concat(f),d);return c.push(...E(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}},getShaderSource:l}},bs=(e,t)=>{let n=new Xn(e.inputs,t.equation),r=n.outputDims,o=e.inputs.map((i,s)=>i.dims);e.compute(ld(o,e.inputs[0].dataType,n,r))},_s=e=>{let t=e.equation.replace(/\s+/g,"");return N({equation:t})}});var dd,$s,cd,pd,vs,xs=A(()=>{"use strict";V();W();F();dd=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=n.length<t.length?0:n.length-t.length,o=t.length<n.length?0:t.length-n.length;for(;r<n.length&&o<t.length;++r,++o)if(n[r]!==t[o]&&n[r]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},$s=(e,t)=>{let n=e.length-t.length,r=[];for(let o=0;o<n;++o)r.push(e[o]);for(let o=0;o<t.length;++o)r.push(t[o]===1?e[o+n]:t[o]);return r},cd=(e,t)=>e.length>t.length?$s(e,t):$s(t,e),pd=e=>{let t=e[0].dims,n=Array.from(e[1].getBigInt64Array(),Number),r=cd(t,n),o=e[0].dataType,i=o===9||x.size(t)===1,s=o===9||t.length>0&&t[t.length-1]%4===0?4:1,a=i||r.length>0&&r[r.length-1]%4===0?4:1,u=Math.ceil(x.size(r)/a),l=c=>{let p=S("input",o,t.length,s),f=C("output",o,r.length,a),m;if(o===9){let h=(_,y,g="")=>`
          let outputIndices${y} = ${f.offsetToIndices(`outputOffset + ${y}u`)};
          let offset${y} = ${p.broadcastedIndicesToOffset(`outputIndices${y}`,f)};
          let index${y} = offset${y} / 4u;
          let component${y} = offset${y} % 4u;
          ${_}[${y}] = ${g}(${p.getByOffset(`index${y}`)}[component${y}]);
        `;m=`
        let outputOffset = global_idx * ${a};
        var data = vec4<u32>(0);
        ${h("data",0,"u32")}
        ${h("data",1,"u32")}
        ${h("data",2,"u32")}
        ${h("data",3,"u32")}
        ${f.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${f.offsetToIndices(`global_idx * ${a}`)};
        let inputOffset = ${p.broadcastedIndicesToOffset("outputIndices",f)};
        let data = ${f.type.value}(${p.getByOffset(`inputOffset / ${s}`)});
        ${f.setByOffset("global_idx","data")}
      }`;return`
    ${c.registerUniform("vec_size","u32").declareVariables(p,f)}
    ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},d=[{type:12,data:u},...E(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${a}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d})}},vs=e=>{dd(e.inputs),e.compute(pd(e.inputs),{inputs:[0]})}});var md,Ss,Ts=A(()=>{"use strict";V();W();F();jt();md=e=>{let t=e[0].dataType,n=x.size(e[0].dims),r=x.size(e[1].dims),o=r%4===0,i=s=>{let a=S("x",t,[1],4),u=S("bias",t,[1],4),l=C("y",t,[1],4),d=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],c=f=>`
      let bias${f}_offset: u32 = (global_idx * 4 + ${f}) % uniforms.bias_size;
      let bias${f} = ${u.getByOffset(`bias${f}_offset / 4`)}[bias${f}_offset % 4];`,p=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${c(0)}${c(1)}${c(2)}${c(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(d).declareVariables(a,u,l)}

    ${Ln(de(t))}

    ${s.mainStart(je)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${p}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Wn("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(n/je/4)}})}},Ss=e=>{e.inputs.length<2||x.size(e.inputs[1].dims)===0?wi(e):e.compute(md(e.inputs))}});var fd,hd,Is,Cs,As=A(()=>{"use strict";V();W();oe();F();fd=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},hd=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.axis,o),s=n.slice(0);s.splice(i,1,...r);let a=n[i],u=e[0].dataType===9?4:1,l=Math.ceil(x.size(s)/u),d=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...E(e[0].dims,e[1].dims,s)],c=p=>{let f=S("data",e[0].dataType,e[0].dims.length,u),m=S("inputIndices",e[1].dataType,e[1].dims.length),h=C("output",e[0].dataType,s.length,u),_=g=>{let b=r.length,w=`var indicesIndices${g}  = ${m.type.indices}(0);`;for(let $=0;$<b;$++)w+=`${b>1?`indicesIndices${g}[${$}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${$}]`:`outputIndices${g}`};`;w+=`
          var idx${g} = ${m.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${f.type.indices};
        `;for(let $=0,v=0;$<o;$++)$===i?(w+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = u32(idx${g});`,v+=b):(w+=`${o>1?`dataIndices${g}[${$}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${v}]`:`outputIndices${g}`};`,v++);return w},y;if(e[0].dataType===9){let g=(b,w,$="")=>`
          let outputIndices${w} = ${h.offsetToIndices(`outputOffset + ${w}u`)};
          ${_(w)};
          let offset${w} = ${f.indicesToOffset(`dataIndices${w}`)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${b}[${w}] = ${$}(${f.getByOffset(`index${w}`)}[component${w}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${g("value",0,"u32")}
        ${g("value",1,"u32")}
        ${g("value",2,"u32")}
        ${g("value",3,"u32")}
        ${h.setByOffset("global_idx","value")}
      `}else y=`
      let outputIndices = ${h.offsetToIndices("global_idx")};
      ${_("")};
      let value = ${f.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${p.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,h)}
      ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:c}},Is=e=>N({axis:e.axis}),Cs=(e,t)=>{let n=e.inputs;fd(n),e.compute(hd(e.inputs,t))}});var gd,yd,ks,Es,zs=A(()=>{"use strict";V();W();oe();F();gd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=x.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,o=e[0],i=e[2],s=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/r)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},yd=(e,t)=>{let n=e[0].dims,r=e[1].dims,o=n.length,i=x.normalizeAxis(t.gatherAxis,o),s=x.normalizeAxis(t.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...r);let u=x.size(a),l=e[2].dataType,c=e[0].dataType===22,p=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:t.blockSize},...E(...e.map((m,h)=>m.dims),a)],f=m=>{let h=S("data",e[0].dataType,e[0].dims.length),_=S("inputIndices",e[1].dataType,e[1].dims.length),y=S("scales",e[2].dataType,e[2].dims.length),g=e.length>3?S("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=C("output",l,a.length),w=[h,_,y];g&&w.push(g);let $=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${m.registerUniforms($).declareVariables(...w,b)}
        ${m.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${(()=>r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${h.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${h.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${h.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${y.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${y.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${y.getByIndices("scale_indices")};
        ${(()=>g?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${g.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${g.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${de(l)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((m,h)=>h!==1).map(m=>m.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(m,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:p}),getShaderSource:f}},ks=(e,t)=>{let n=e.inputs;gd(n,t),e.compute(yd(e.inputs,t))},Es=e=>N({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var bd,_d,Ps,Bs,Os=A(()=>{"use strict";V();W();oe();F();bd=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},_d=(e,t)=>{let n=e[0].dims,r=e[0].dataType,o=n.length,i=e[1].dims,s=e[1].dataType,a=x.normalizeAxis(t.axis,o),u=n[a],l=i.slice(0),d=x.size(l),c=S("input",r,o),p=S("indicesInput",s,i.length),f=C("output",r,l.length),m=[{type:12,data:d},{type:6,data:u},{type:12,data:a}];return m.push(...E(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(c,p,f)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${f.offsetToIndices("global_idx")};

      var idx = ${p.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${c.type.indices}(outputIndices);
      ${c.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${c.getByIndices("inputIndices")};

      ${f.setByOffset("global_idx","value")};
  }`}},Ps=e=>N({axis:e.axis}),Bs=(e,t)=>{let n=e.inputs;bd(n),e.compute(_d(e.inputs,t))}});var wd,$d,Ds,Ms,Rs=A(()=>{"use strict";V();W();F();wd=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},$d=(e,t)=>{let n=e[0].dims.slice(),r=e[1].dims.slice(),[o,i,s]=Wt.getShapeOfGemmResult(n,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),d=Math.ceil(o/u),c=!0,p=x.size(a),f=[{type:12,data:c?l:p},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(f.push(...E(e[2].dims)),m.push("rank")),f.push(...E(a));let h=y=>{let g="";t.transA&&t.transB?g="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?g="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?g="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(g="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let b=t.alpha===1?"":"value *= uniforms.alpha;",w=S("a",e[0].dataType,e[0].dims),$=S("b",e[1].dataType,e[1].dims),v=w.type.value,T=null,I=[w,$];e.length===3&&(T=S("c",e[2].dataType,e[2].dims.length),I.push(T));let k=C("output",e[0].dataType,a.length);I.push(k);let B=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${y.registerUniforms(B).declareVariables(...I)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${v}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${g}
    }

    ${b}
    ${(()=>T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${v}(uniforms.beta) * ${T.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},_=y=>{let g=S("a",e[0].dataType,e[0].dims),b=S("b",e[1].dataType,e[1].dims),w=null,$=[g,b];e.length===3&&(w=S("c",e[2].dataType,e[2].dims.length),$.push(w));let v=C("output",e[0].dataType,a.length);$.push(v);let T=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],I="",k="";t.transA&&t.transB?(k=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,I="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(k=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,I="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(k=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,I="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(k=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${g.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${b.type.value}(0);
      }
      `,I="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let B=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${y.registerUniforms(T).declareVariables(...$)}
  var<workgroup> tile_a: array<array<${g.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${b.type.storage}, ${u}>, ${u}>;
  ${y.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${v.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${k}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${I}
      }
      workgroupBarrier();
    }

    ${B}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>w!=null?`let cOffset = ${w.broadcastedIndicesToOffset("vec2(m, n)",v)}; value += ${v.type.value}(uniforms.beta) * ${w.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return c?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:l*d},programUniforms:f}),getShaderSource:_}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:h}},Ds=e=>{let t=e.transA,n=e.transB,r=e.alpha,o=e.beta;return{transA:t,transB:n,alpha:r,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Ms=(e,t)=>{wd(e.inputs),e.compute($d(e.inputs,t))}});var De,Ne,Je,et,vd,xd,Sd,Td,Id,Cd,Ad,kd,Us,Vs,Ns=A(()=>{"use strict";V();W();oe();F();[De,Ne,Je,et]=[0,1,2,3],vd=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},xd=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Sd=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Td=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Id=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Cd=(e,t,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${De}] = batch;
     indices[${Ne}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Je}] = u32(r);
            indices[${et}] = u32(c);
          }
        `;case"border":return`
          indices[${Je}] = u32(clamp(r, 0, H - 1));
          indices[${et}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Je}] = gs_reflect(r, border[1], border[3]);
          indices[${et}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Ad=(e,t,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${De}], indices[${Ne}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${De}], indices[${Ne}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${De}], indices[${Ne}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${De}], indices[${Ne}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${De}], indices[${Ne}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${De}], indices[${Ne}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,kd=(e,t)=>{let n=S("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=S("grid",e[1].dataType,r.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[De,Ne,Je,et]=[0,3,1,2]);let s=C("output",e[0].dataType,i.length),a=n.type.value,u=x.size(i),l=[{type:12,data:u},...E(e[0].dims,r,i)],d=c=>`
  ${c.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${xd}
  ${Sd(a)}
  ${Td(t)}
  ${Id(t)}
  ${Cd(n,a,t)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Je}]);
      let W_in = i32(uniforms.x_shape[${et}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${De}], indices[${Je}], indices[${et}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Ad(s,a,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:c=>{let p=x.size(i);return{outputs:[{dims:i,dataType:c[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:l}},getShaderSource:d}},Us=(e,t)=>{vd(e.inputs),e.compute(kd(e.inputs,t))},Vs=e=>N({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var ge,Pd,Ws,Ls,Bd,mt,Gs,Yn=A(()=>{"use strict";V();W();oe();Lt();Ft();F();Oe();ge=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Pd=(e,t)=>{let n=e[0],r=ge(e,1),o=ge(e,2),i=ge(e,3),s=ge(e,4),a=ge(e,5),u=ge(e,6),l=ge(e,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let d=n.dims[0],c=n.dims[1],p=n.dims.length===3?n.dims[2]:t.numHeads*n.dims[4],f=c,m=0,h=0,_=Math.floor(p/t.numHeads);if(u&&l&&x.size(u.dims)&&x.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[3]!==_)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[3]!==_)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],h=u.dims[2]}else if(u&&x.size(u.dims)||l&&x.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(r&&x.size(r.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,f=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,f=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,f=r.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==t.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i&&x.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=m+f,b=0;if(s&&x.size(s.dims)>0){b=8;let T=s.dims;throw T.length===1?T[0]===d?b=1:T[0]===3*d+2&&(b=3):T.length===2&&T[0]===d&&T[1]===g&&(b=5),b===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let w=!1,$=p;if(o&&x.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(f!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(f!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],w=!0}}let v=!1;if(s&&x.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&x.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==d||a.dims[1]!==t.numHeads||a.dims[2]!==c||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:c,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:g,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:p,vHiddenSize:$,headSize:_,vHeadSize:Math.floor($/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:v,passPastInKv:w,qkvFormat:y}},Ws=e=>N({...e}),Ls=N({perm:[0,2,1,3]}),Bd=(e,t,n,r,o,i,s)=>{let a=[r,o,i],u=x.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],d=c=>{let p=C("qkv_with_bias",t.dataType,a),f=S("qkv",t.dataType,a),m=S("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${c.registerUniforms(h).declareVariables(f,m,p)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d},{inputs:[t,n],outputs:[-1]})[0]},mt=(e,t,n,r,o,i,s,a)=>{let u=i;if(s&&x.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Bd(e,i,s,t,r,n*o,a),u=u.reshape([t,r,n,o]),n===1||r===1?u:e.compute(ce(u,Ls.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([t,r,n,o])),n===1||r===1?u:e.compute(ce(u,Ls.perm),{inputs:[u],outputs:[-1]})[0]},Gs=(e,t)=>{let n=Pd(e.inputs,t),r=e.inputs[0],o=ge(e.inputs,1),i=ge(e.inputs,2),s=ge(e.inputs,3),a=ge(e.inputs,4),u=ge(e.inputs,5),l=ge(e.inputs,6),d=ge(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let c=o&&i&&o.dims.length===4&&i.dims.length===4,p=mt(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,r,s,0);if(c)return Ye(e,p,o,i,a,void 0,l,d,u,n);if(!o||!i)throw new Error("key and value must be provided");let f=mt(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),m=mt(e,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Ye(e,p,f,m,a,void 0,l,d,u,n)}});var Od,Dd,Md,Rd,Jn,Hs,qs,er=A(()=>{"use strict";V();W();oe();F();Od=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Dd=(e,t)=>{let n=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>n.push(Number(o))),r=n.length),N({numOutputs:r,axis:t.axis,splitSizes:n})},Md=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${O("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Rd=e=>{let t=e.length,n=[];for(let r=0;r<t;++r){let o=e[r].setByIndices("indices","input[global_idx]");t===1?n.push(o):r===0?n.push(`if (output_number == ${r}u) { ${o} }`):r===t-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${r}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Jn=(e,t)=>{let n=e[0].dims,r=x.size(n),o=e[0].dataType,i=x.normalizeAxis(t.axis,n.length),s=new Array(t.numOutputs),a=S("input",o,n.length),u=new Array(t.numOutputs),l=[],d=[],c=0,p=[{type:12,data:r}];for(let m=0;m<t.numOutputs;m++){c+=t.splitSizes[m],u[m]=c;let h=n.slice();h[i]=t.splitSizes[m],d.push(h),s[m]=C(`output${m}`,o,h.length),l.push({dims:d[m],dataType:e[0].dataType})}p.push({type:12,data:u},...E(n,...d));let f=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${Md(u.length)}
  ${Rd(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${O("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p})}},Hs=(e,t)=>{Od(e.inputs);let n=e.inputs.length===1?t:Dd(e.inputs,t);e.compute(Jn(e.inputs,n),{inputs:[0]})},qs=e=>{let t=e.axis,n=e.splitSizes,r=e.numOutputs<0?n.length:e.numOutputs;if(r!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return N({axis:t,numOutputs:r,splitSizes:n})}});var Ud,Vd,Fs,Ks,js=A(()=>{"use strict";oe();Ft();Yn();er();Oe();Ud=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=e[0],r=e[1],o=e[2],i=e[3],s=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],d=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:t.numHeads*n.dims[4],c=l,p=0,f=!r||r.dims.length===0,m=Math.floor(f?d/(t.numHeads+2*t.kvNumHeads):d/t.numHeads);f&&(d=m*t.numHeads);let h=i&&i.dims.length!==0,_=s&&s.dims.length!==0;if(h&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(h&&_){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=i.dims[2]}else if(h||_)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(r&&r.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(n.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');c=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');c=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');c=r.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==t.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let b=0,w=!1,$=t.kvNumHeads?m*t.kvNumHeads:d;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(c!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');$=o.dims[2]}else{if(c!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');$=o.dims[1]*o.dims[3],w=!0}}let v=e.length>4?e[5]:void 0;if(v&&v.dims.length!==1&&v.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let T=-1,I=-1,k=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:p,kvSequenceLength:c,totalSequenceLength:T,maxSequenceLength:I,inputHiddenSize:0,hiddenSize:d,vHiddenSize:$,headSize:m,vHeadSize:Math.floor($/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:k,passPastInKv:w,qkvFormat:g}},Vd=N({perm:[0,2,1,3]}),Fs=(e,t,n)=>{let r=t,o=n.kvNumHeads;return t.dims.length===3&&n.kvSequenceLength!==0&&(r=t.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),r=e.compute(ce(r,Vd.perm),{inputs:[r],outputs:[-1]})[0]),r},Ks=(e,t)=>{let n=Ud(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,a=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,l=e.inputs.length>5?e.inputs[6]:void 0,d=n.kvNumHeads?n.kvNumHeads:n.numHeads,c=N({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,d*n.headSize,d*n.headSize]}),[p,f,m]=!o&&!i?e.compute(Jn([r],c),{inputs:[r],outputs:[-1,-1,-1]}):[r,o,i],h=mt(e,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,p,void 0,0);Ye(e,h,Fs(e,f,n),Fs(e,m,n),void 0,void 0,s,a,void 0,n,u,l)}});var Zs,Nd,Ld,Qs,Xs=A(()=>{"use strict";V();W();Oe();F();Zs=(e,t,n,r,o,i,s,a)=>{let u=X(i),l=u===1?"f32":`vec${u}f`,d=u===1?"vec2f":`mat2x${u}f`,c=o*s,p=64;c===1&&(p=256);let f=[o,s,i/u],m=[o,s,2],h=["rank","type","type"],_=[];_.push(...E(f,m));let y=g=>{let b=S("x",t.dataType,3,u),w=S("scale",n.dataType,n.dims),$=S("bias",r.dataType,r.dims),v=C("output",1,3,2),T=[b,w,$,v];return`
  var<workgroup> workgroup_shared : array<${d}, ${p}>;
  const workgroup_size = ${p}u;
  ${g.declareVariables(...T)}
  ${g.mainStart(p)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${b.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${d}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${xe("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${xe("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${p}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:_}),getShaderSource:y},{inputs:[t,n,r],outputs:[-1]})[0]},Nd=(e,t,n)=>{let r=t[0].dims,o=r,i=2,s=r[0],a=r[1],u=x.sizeFromDimension(r,i),l=X(u),d=x.size(o)/l,c=Zs(e,t[0],t[1],t[2],s,u,a,n.epsilon),p=[s,a,u/l],f=[s,a],m=["type","none"],h=_=>{let y=S("x",t[0].dataType,p.length,l),g=S("scale_shift",1,f.length,2),b=C("output",t[0].dataType,p.length,l),w=[y,g,b];return`
  ${_.registerUniform("output_size","u32").declareVariables(...w)}
  ${_.mainStart()}
  ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${b.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${b.type.value}(scale_shift.x) + ${b.type.value}(scale_shift.y);
      ${b.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:[{type:12,data:d},...E(p,f,p)]}),getShaderSource:h},{inputs:[t[0],c]})},Ld=(e,t,n)=>{let r=t[0].dims,o=r,i=r[0],s=r[r.length-1],a=x.sizeFromDimension(r,1)/s,u=X(s),l=x.size(o)/u,d=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],c=["type","type"],p=!1,f=[0,r.length-1];for(let y=0;y<r.length-2;y++)p=p||r[y+1]!==1,f.push(y+1);p=p&&r[r.length-1]!==1;let m=p?e.compute(ce(e.inputs[0],f),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(y,g)=>r[f[g]])),h=Zs(e,m,t[1],t[2],i,a,s,n.epsilon),_=y=>{let g=ee(t[0].dataType),b=u===1?"vec2f":`mat${u}x2f`,w=T=>{let I=T===0?"x":"y",k=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${g}(${k}(scale.${I}))`;case 2:return`vec2<${g}>(${k}(scale[0].${I}, scale[1].${I}))`;case 4:return`vec4<${g}>(${k}(scale[0].${I}, scale[1].${I}, scale[2].${I}, scale[3].${I}))`;default:throw new Error(`Not supported compoents ${u}`)}},$=S("input",t[0].dataType,t[0].dims,u),v=C("output",t[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${$.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${b}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${v.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${w(0)}, ${w(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:_},{inputs:[t[0],h]})},Qs=(e,t)=>{t.format==="NHWC"?Ld(e,e.inputs,t):Nd(e,e.inputs,t)}});var Wd,Gd,Ys,Js=A(()=>{"use strict";V();W();F();Wd=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Gd=(e,t,n)=>{let r=t.simplified,o=e[0].dims,i=e[1],s=!r&&e[2],a=o,u=x.normalizeAxis(t.axis,o.length),l=x.sizeToDimension(o,u),d=x.sizeFromDimension(o,u),c=x.size(i.dims),p=s?x.size(s.dims):0;if(c!==d||s&&p!==d)throw new Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${c} and bias size of ${p}`);let f=[];for(let $=0;$<o.length;++$)$<u?f.push(o[$]):f.push(1);let m=X(d),h=["type","type"],_=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/m)},{type:1,data:t.epsilon}];s&&h.push("type");let y=n>1,g=n>2,b=$=>{let v=ee(e[0].dataType),T=[S("x",e[0].dataType,e[0].dims,m),S("scale",i.dataType,i.dims,m)];s&&T.push(S("bias",s.dataType,s.dims,m)),T.push(C("output",e[0].dataType,a,m)),y&&T.push(C("mean_data_output",1,f)),g&&T.push(C("inv_std_output",1,f));let I=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${$.registerUniforms(I).declareVariables(...T)}
  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Mn("f32",m)};
    var mean_square_vector = ${Mn("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Ze(v,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${xe("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${xe("mean_square_vector",m)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Ze(v,m,"x[j + offset]")};
      let f32scale = ${Ze(v,m,"scale[j]")};
      output[j + offset] = ${T[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Ze(v,m,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},w=[{dims:a,dataType:e[0].dataType}];return y&&w.push({dims:f,dataType:1}),g&&w.push({dims:f,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${n};${r}`,inputDependencies:h},getRunData:()=>({outputs:w,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:_}),getShaderSource:b}},Ys=(e,t)=>{Wd(e.inputs),e.compute(Gd(e.inputs,t,e.outputCount))}});var Hd,ea,ta=A(()=>{"use strict";W();Yt();Jt();Hd=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},ea=e=>{Hd(e.inputs);let t=Ae.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let n=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(n<8&&r<8)e.compute(Xt(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=x.size(e.inputs[0].dims.slice(0,-2)),s=x.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let a=e.inputs[0].reshape([1,i,r]),u=e.inputs[1].reshape([1,r,n]),l=[1,i,n],d=[a,u];e.compute(pt(d,{activation:""},t,l),{inputs:d})}else e.compute(pt(e.inputs,{activation:""},t))}}});var qd,Fd,Kd,na,ra,oa=A(()=>{"use strict";V();W();oe();F();qd=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=e[0],r=n.dims.length;if(n.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,s=e[1];if(!x.areEqual(s.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(x.size(u)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,c=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(x.size(d)!==c)throw new Error("zeroPoints input size error.")}},Fd=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),d=e[1].dims[2]/4,c=e[0].dataType,p=X(t.k),f=X(d),m=X(s),h=a.concat([o,s]),_=o>1&&s/m%2===0?2:1,y=x.size(h)/m/_,g=64,b=[],w=[u,o,i/p],$=x.convertShape(e[1].dims).slice();$.splice(-1,1,d/f),b.push(...E(w)),b.push(...E($)),b.push(...E(e[2].dims)),e.length===4&&b.push(...E(x.convertShape(e[3].dims)));let v=[u,o,s/m];b.push(...E(v));let T=I=>{let k=w.length,B=S("a",e[0].dataType,k,p),D=S("b",12,$.length,f),L=S("scales",e[2].dataType,e[2].dims.length),P=[B,D,L],R=e.length===4?S("zero_points",12,e[3].dims.length):void 0;R&&P.push(R);let ne=v.length,U=C("output",e[0].dataType,ne,m),H=ee(e[0].dataType),K=(()=>{switch(p){case 1:return`array<${H}, 8>`;case 2:return`mat4x2<${H}>`;case 4:return`mat2x4<${H}>`;default:throw new Error(`${p}-component is not supported.`)}})(),q=()=>{let ae=`
          // reuse a data
            var input_offset = ${B.indicesToOffset(`${B.type.indices}(batch, row, word_offset)`)};
            var a_data: ${K};
            for (var j: u32 = 0; j < ${8/p}; j++) {
              a_data[j] = ${B.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let Q=0;Q<m*_;Q++)ae+=`
            b_value = ${f===1?`b${Q}_data`:`b${Q}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${K}(${Array.from({length:4},(z,M)=>`${H}(b_value_lower[${M}]), ${H}(b_value_upper[${M}])`).join(", ")});
            b_dequantized_values = ${(()=>p===1?`${K}(${Array.from({length:8},(z,M)=>`(b_quantized_values[${M}] - ${R?`zero_point${Q}`:"zero_point"}) * scale${Q}`).join(", ")});`:`(b_quantized_values - ${K}(${Array(8).fill(`${R?`zero_point${Q}`:"zero_point"}`).join(",")})) * scale${Q};`)()};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(Q/m)}]${m>1?`[${Q%m}]`:""} += ${Array.from({length:8/p},(z,M)=>`${p===1?`a_data[${M}] * b_dequantized_values[${M}]`:`dot(a_data[${M}], b_dequantized_values[${M}])`}`).join(" + ")};
          `;return ae},se=()=>{let ae=`
            var col_index = col * ${m};
            ${R?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${H}(8);`}
            `;for(let Q=0;Q<m*_;Q++)ae+=`
            let scale${Q} = ${L.getByOffset("col_index * nBlocksPerCol + block")};
            ${R?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${R.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${Q} = ${H}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ae},ye=()=>{let ae=`col_index = col * ${m};`;for(let Q=0;Q<m*_;Q++)ae+=`
            let b${Q}_data = ${D.getByIndices(`${D.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ae+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${K};
            var b_dequantized_values: ${K};`,ae};return`
        var<workgroup> workgroup_shared: array<${U.type.value}, ${_*g}>;
        ${I.declareVariables(...P,U)}
        ${I.mainStart([g,1,1])}
          let output_indices = ${U.offsetToIndices(`(global_idx / ${g}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/p};
            ${se()}
            for (var word: u32 = 0; word < ${d}; word += ${f}) {
              ${ye()}
              for (var i: u32 = 0; i < ${f}; i++) {
                ${q()}
                word_offset += ${8/p};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${U.type.value} = ${U.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${U.setByIndices(`${U.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${p};${f};${m};${_};${g}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:c}],dispatchGroup:{x:y},programUniforms:b}),getShaderSource:T}},Kd=(e,t)=>{let n=e[0].dims,r=n.length,o=n[r-2],i=t.k,s=t.n,a=n.slice(0,r-2),u=x.size(a),d=e[1].dims[2]/4,c=e[0].dataType,p=X(t.k),f=X(d),m=a.concat([o,s]),h=128,_=s%8===0?8:s%4===0?4:1,y=h/_,g=y*f*8,b=g/p,w=g/t.blockSize,$=x.size(m)/_,v=[],T=[u,o,i/p],I=x.convertShape(e[1].dims).slice();I.splice(-1,1,d/f),v.push(...E(T)),v.push(...E(I)),v.push(...E(e[2].dims)),e.length===4&&v.push(...E(x.convertShape(e[3].dims)));let k=[u,o,s];v.push(...E(k));let B=D=>{let L=T.length,P=S("a",e[0].dataType,L,p),R=S("b",12,I.length,f),ne=S("scales",e[2].dataType,e[2].dims.length),U=[P,R,ne],H=e.length===4?S("zero_points",12,e[3].dims.length):void 0;H&&U.push(H);let K=k.length,q=C("output",e[0].dataType,K),se=ee(e[0].dataType),ye=()=>{switch(p){case 1:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${se}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${se}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${p}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${P.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${q.type.value}, ${y}>, ${_}>;
        ${D.declareVariables(...U,q)}
        ${D.mainStart([y,_,1])}
          let output_indices = ${q.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${w} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${h})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${P.getByIndices(`${P.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${P.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${w} + local_id.x;
            ${H?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${H.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${se}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${se}(8);`}
            let scale = ${ne.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${R.getByIndices(`${R.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/p};
            for (var i: u32 = 0; i < ${f}; i++) {
              ${ye()}
              let b_value = ${f===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${se}>(${Array.from({length:4},(ae,Q)=>`${se}(b_value_lower[${Q}]), ${se}(b_value_upper[${Q}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${se}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ae,Q)=>`${`dot(a_data${Q}, b_dequantized_values[${Q}])`}`).join(" + ")};
              word_offset += ${8/p};
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${q.type.value} = ${q.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${q.setByIndices(`${q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${p};${f};${y};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x:$},programUniforms:v}),getShaderSource:B}},na=(e,t)=>{qd(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Kd(e.inputs,t)):e.compute(Fd(e.inputs,t))},ra=e=>N(e)});var jd,Zd,Qd,Xd,Yd,Jd,ec,tc,ia,sa=A(()=>{"use strict";V();W();F();jd=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Zd=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
            k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${O("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${O("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},Qd=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${O("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${O("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Xd=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k = i32(${O("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Yd=(e,t,n)=>{let r="";for(let o=t-1;o>=0;--o)r+=`
                k = i32(${e.indicesGet("indices",o)}) - ${O("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${O("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${O("uniforms.x_shape",o,t)})) {
                  k -= i32(${O("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${O("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},Jd=(e,t,n)=>{switch(n.mode){case 0:return Zd(e,t,n.pads.length);case 1:return Qd(e,t,n.pads.length);case 2:return Xd(e,t,n.pads.length);case 3:return Yd(e,t,n.pads.length);default:throw new Error("Invalid mode")}},ec=(e,t)=>{let n=x.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,o=x.size(n),i=[{type:12,data:o},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&i.push({type:s?e[2].dataType:1,data:t.value}),i.push(...E(e[0].dims,n));let a=["rank"],u=l=>{let d=C("output",e[0].dataType,n.length),c=S("x",e[0].dataType,r.length),p=c.type.value,f=Jd(d,r.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?p:"f32"}),`
            ${l.registerUniforms(m).declareVariables(c,d)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${d.offsetToIndices("global_idx")};

            var value = ${p}(0);
            ${f}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(n)/64)},programUniforms:i}),getShaderSource:u}},tc=(e,t)=>{if(e.length>1){let n=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let a=e[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:t.mode,value:r,pads:s}}else return t},ia=(e,t)=>{jd(e.inputs);let n=tc(e.inputs,t);e.compute(ec(e.inputs,n),{inputs:[0]})}});var nn,aa,ua,la,da,nc,rc,ca,pa,ma,fa,ha,ga,ya,ba,_a,wa,$a,va,xa=A(()=>{"use strict";we();V();W();F();nn=e=>{if(J.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},aa=(e,t,n)=>{let r=t.format==="NHWC",o=e.dims.slice();r&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),a=t.strides.slice(),u=i?t.dilations.slice():[],l=t.pads.slice();Ke.adjustPoolAttributes(n,o,s,a,u,l);let d=Ke.computePoolOutputShape(n,o,a,u,s,l,t.autoPad),c=Object.assign({},t);i?Object.assign(c,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:t.cacheKey}):Object.assign(c,{kernelShape:s,strides:a,pads:l,cacheKey:t.cacheKey});let p=d.slice();return p.push(p.splice(1,1)[0]),[c,r?p:d]},ua=(e,t)=>{let n=t.format==="NHWC",r=x.size(e),o=x.size(t.kernelShape),i=[{type:12,data:r},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let a=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],l=t.pads[t.pads.length/2-1],d=t.pads[t.pads.length-1],c=!!(l+d);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:d}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let p=!1;if(t.kernelShape.length===2){let f=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],h=t.pads[t.pads.length/2-2],_=t.pads[t.pads.length-2];p=!!(h+_),i.push({type:12,data:f},{type:12,data:m},{type:12,data:h},{type:12,data:_}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,c,p]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=x.computeStrides(t.kernelShape);i.push({type:12,data:a},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((l,d)=>l+d);return[i,s,!!u,!1,!1]}},la=(e,t,n,r,o,i,s,a,u,l,d,c)=>{let p=o.format==="NHWC",f=t.type.value,m=C("output",t.type.tensor,r);if(o.kernelShape.length<=2){let h="",_="",y="",g=n-(p?2:1);if(d?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let w=n-(p?3:2);c?_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${w}] < 0 || xIndices[${w}] >= uniforms.x_shape[${w}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:_=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${w}] = indices[${w}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${a});
              var pad = 0;
              ${_}
              ${h}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(p)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,_=o.pads.length,y="";return l?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:y=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${f}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${O("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${O("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${O("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${O("uniforms.pads","j - 2u",_)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},da=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,nc=e=>`${da(e)};${e.countIncludePad}`,rc=e=>`${da(e)};${e.storageOrder};${e.dilations}`,ca=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),pa=(e,t,n,r)=>{let[o,i]=aa(t,r,n),s=S("x",t.dataType,t.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[d,c,p,f,m]=ua(i,o);d.push(...E(t.dims,i));let h=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${p};${f};${m}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:d}),getShaderSource:_=>la(_,s,t.dims.length,i.length,o,u,l,0,c,p,f,m)}},ma=e=>{let t=e.count_include_pad!==0,n=ca(e);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...n,cacheKey:""};return{...r,cacheKey:nc(r)}},fa=(e,t)=>{nn(e.inputs),e.compute(pa("AveragePool",e.inputs[0],!1,t))},ha={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ga=e=>{let t=e.format;return{format:t,...ha,cacheKey:t}},ya=(e,t)=>{nn(e.inputs),e.compute(pa("GlobalAveragePool",e.inputs[0],!0,t))},ba=(e,t,n,r)=>{let[o,i]=aa(t,r,n),s=`
      value = max(x_val, value);
    `,a="",u=S("x",t.dataType,t.dims.length),l=["rank"],[d,c,p,f,m]=ua(i,o);return d.push(...E(t.dims,i)),{name:e,shaderCache:{hint:`${r.cacheKey};${p};${f};${m}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(x.size(i)/64)},programUniforms:d}),getShaderSource:h=>la(h,u,t.dims.length,i.length,o,s,a,t.dataType===10?-65504:-1e5,c,p,f,m)}},_a=(e,t)=>{nn(e.inputs),e.compute(ba("MaxPool",e.inputs[0],!1,t))},wa=e=>{let t=e.storage_order,n=e.dilations,r=ca(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:n,...r,cacheKey:""};return{...o,cacheKey:rc(o)}},$a=e=>{let t=e.format;return{format:t,...ha,cacheKey:t}},va=(e,t)=>{nn(e.inputs),e.compute(ba("GlobalMaxPool",e.inputs[0],!0,t))}});var ic,sc,Sa,Ta,Ia=A(()=>{"use strict";V();W();oe();F();ic=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((n,r)=>n===e[2].dims[r]).reduce((n,r)=>n&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(n/r)||t.blockSize>Math.ceil(n/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},sc=(e,t)=>{let n=x.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,o=r===3,i=e[0].dims,s=e[1].dataType,a=x.size(i),u=r===3||r===2,l=u?[Math.ceil(x.size(e[0].dims)/4)]:e[0].dims,d=e[1].dims,c=e.length>2?e[2]:void 0,p=c?u?[Math.ceil(x.size(c.dims)/4)]:c.dims:void 0,f=d.length===0||d.length===1&&d[0]===1,m=f===!1&&d.length===1,h=X(a),_=f&&(!u||h===4),y=_?h:1,g=_&&!u?h:1,b=S("input",u?12:r,l.length,g),w=S("scale",s,d.length),$=c?S("zero_point",u?12:r,p.length):void 0,v=C("output",s,i.length,y),T=[b,w];$&&T.push($);let I=[l,d];c&&I.push(p);let k=[{type:12,data:a/y},{type:12,data:n},{type:12,data:t.blockSize},...E(...I,i)],B=D=>{let L=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${D.registerUniforms(L).declareVariables(...T,v)}
      ${D.mainStart()}
          ${D.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${v.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${b.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${b.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>f?`let scale_value= ${w.getByOffset("0")}`:m?`
            let scale_index = ${v.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${w.getByOffset("scale_index")};`:`
            var scale_indices: ${w.type.indices} = output_indices;
            let index = ${w.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${w.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${w.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>$?f?u?`
                let zero_point_input = ${$.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${$.getByOffset("0")}`:m?u?`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${$.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${v.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${$.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${w.indicesToOffset("scale_indices")};
                let zero_point_input = ${$.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${$.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":b.type.value}(0);`)()};
      // Compute and write output
      ${v.setByOffset("global_idx",`${v.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getShaderSource:B,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:k})}},Sa=(e,t)=>{ic(e.inputs,t),e.compute(sc(e.inputs,t))},Ta=e=>N({axis:e.axis,blockSize:e.blockSize})});var ac,uc,Ca,Aa=A(()=>{"use strict";we();V();F();ac=(e,t,n)=>{let r=e===t,o=e<t&&n<0,i=e>t&&n>0;if(r||o||i)throw new Error("Range these inputs' contents are invalid.")},uc=(e,t,n,r)=>{let o=Math.abs(Math.ceil((t-e)/n)),i=[o],s=o,a=[{type:12,data:s},{type:r,data:e},{type:r,data:n},...E(i)],u=l=>{let d=C("output",r,i.length),c=d.type.value,p=[{name:"outputSize",type:"u32"},{name:"start",type:c},{name:"delta",type:c}];return`
        ${l.registerUniforms(p).declareVariables(d)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${c}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},Ca=e=>{let t=0,n=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],n=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],n=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),J.webgpu.validateInputContent&&ac(t,n,r),e.compute(uc(t,n,r,e.inputs[0].dataType),{inputs:[]})}});var lc,dc,cc,pc,mc,fc,hc,gc,yc,bc,_c,ka,wc,$c,vc,xc,Sc,Ea,za,Pa=A(()=>{"use strict";V();W();oe();F();lc=(e,t)=>{if(e.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},dc=(e,t,n)=>{t.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(n).fill(1);return t.forEach((o,i)=>r[o]=e[i]),r},cc=(e,t,n,r,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,e.length>1?1:-1,-1],l=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(d=>i.push(d));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&e.length>a&&e[a].dims.length===1&&e[a].dims[0]>0){if(e[a].getFloat32Array().forEach(d=>r.push(d)),r.length!==0&&r.length!==l&&n>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");lc(r,t),t.axes.length>0&&dc(r,t.axes,l).forEach((d,c)=>r[c]=d)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(d=>o.push(Number(d))),o.length!==0&&o.length!==l&&n>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof o<"u"&&r.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},pc=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`return ${t}(xResized) / ${t}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${t}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${t}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${t}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",mc=(e,t,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",fc=(e,t,n)=>{let r=new Array(n).fill(0).concat(new Array(n).fill(1)),o=e.length===0?r:e.slice();return t.length>0?(t.forEach((i,s)=>{r[i]=o[s],r[s+n]=o[t.length+s]}),r):o},hc=(e,t,n,r)=>{let o=[];if(n.length>0)if(r.length>0){if(e.forEach(i=>o.push(i)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,s)=>Math.round(i*t[s]))}return o},gc=(e,t,n)=>{let r=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return n.axes.length>0?(n.axes.forEach(i=>t[i]=r),n.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(r,0,t.length),o.forEach((i,s)=>o[s]=Math.round(i*t[s]))),o},yc=(e,t,n,r,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${n.length}> {
      var original_indices: array<${e.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${O("uniforms.scales","i",r)};
        var roi_low = ${O("uniforms.roi","i",o)};
        var roi_hi = ${O("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${O("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,bc=(e,t,n,r,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${O("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${O("uniforms.roi","i",i)};
          var roi_hi = ${O("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${O("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${O("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,_c=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${O("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ka=(e,t,n,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",n,"batch")};
`:"",wc=(e,t,n,r,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${ka(e,l,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${a}];
      var col:${d} = originalIndices[${u}];
      ${r?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${n[a]} - 1));
      col = max(0, min(col, ${n[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${n.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${n.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},$c=(e,t,n,r,o,i,s,a,u,l)=>{let d=n.length===2,c=!0,[p,f]=d?[0,1]:c?[2,3]:[1,2],m=e.type.value,h=_=>{let y=_===p?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",_)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[_]},
        ${r[_]}, ${n[_]}, ${i[_]}, ${i[_]} + ${n.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[_]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${m} = originalIdx + ${m}(i);
          if (${y} < 0 || ${y} >= ${n[_]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${n[_]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",_,`u32(${y})`)};
          data[i + 1] = ${_===p?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(p)};
    ${h(f)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},vc=(e,t,n,r,o)=>{let[s,a,u,l,d]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${ka(e,d,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${a}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${n[a]} - 1));
      height = max(0, min(height, ${n[u]} - 1));
      width = max(0, min(width, ${n[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${n.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},xc=(e,t,n,r,o,i)=>{let s=e.dims,a=fc(i,t.axes,s.length),u=hc(s,r,o,t.axes),l=r.slice();r.length===0&&(l=s.map((g,b)=>g===0?1:u[b]/g),t.keepAspectRatioPolicy!=="stretch"&&(u=gc(s,l,t)));let d=C("output",e.dataType,u.length),c=S("input",e.dataType,s.length),p=x.size(u),f=s.length===u.length&&s.every((g,b)=>g===u[b]),m=t.coordinateTransformMode==="tf_crop_and_resize",h=t.extrapolationValue,_=c.type.value,y=g=>`
      ${f?"":`
      ${pc(t.coordinateTransformMode,_)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${_c(c,s)};
              ${mc(t.nearestMode,n,_)};
              ${bc(c,d,s,u,l.length,a.length,m)};
              `;case"linear":return`
              ${yc(d,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${wc(c,d,s,m,h)}`;if(s.length===3||s.length===5)return`${vc(c,d,s,m,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${$c(c,d,s,u,l,a,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(c,d)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${f?"output[global_idx] = input[global_idx];":`
        let output_indices = ${d.offsetToIndices("global_idx")};
        var input_indices: ${c.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${c.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${f}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},{type:1,data:l},{type:1,data:a},...E(s,u)]})}},Sc=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},Ea=(e,t)=>{let n=[],r=[],o=[],i=Sc(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");cc(e.inputs,t,i,n,r,o),e.compute(xc(e.inputs[0],t,i,n,r,o),{inputs:[0]})},za=e=>{let t=e.antialias,n=e.axes,r=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,s=e.extrapolationValue,a=e.keepAspectRatioPolicy,u=e.mode,l=e.nearestMode===""?"simple":e.nearestMode;return N({antialias:t,axes:n,coordinateTransformMode:r,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var Tc,Ic,Ba,Oa=A(()=>{"use strict";V();W();oe();F();Tc=(e,t)=>{let[n,r,o,i]=e,{numHeads:s,rotaryEmbeddingDim:a}=t;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!x.areEqual(r.dims,[])&&!x.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!x.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],d=o.dims[0],c=x.sizeFromDimension(n.dims,1)/l,p=a===0?o.dims[1]*2:c/s;if(a>p)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(u!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(l!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(p/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>d)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Ic=(e,t)=>{let{interleaved:n,numHeads:r,rotaryEmbeddingDim:o,scale:i}=t,s=e[0].dims[0],a=x.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],l=a/u,d=e[2].dims[1],c=o===0?d*2:l/r,p=new Array(s,u,l/c,c-d),f=x.computeStrides(p),m=[{type:1,data:i},{type:12,data:p},{type:12,data:f},...e[0].dims.length===3?new Array({type:12,data:[a,l,c,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[a,c,u*c,1]}):[],...E(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],h=_=>{let y=S("input",e[0].dataType,e[0].dims.length),g=S("position_ids",e[1].dataType,e[1].dims.length),b=S("cos_cache",e[2].dataType,e[2].dims.length),w=S("sin_cache",e[3].dataType,e[3].dims.length),$=C("output",e[0].dataType,e[0].dims.length);return _.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:p.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${_.declareVariables(y,g,b,w,$)}

        ${_.mainStart(je)}
          let half_rotary_emb_dim = uniforms.${b.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",C("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${y.getByOffset("i")} * ${b.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${w.get("position_id","bsnh[3]")};
            ${$.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${w.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${b.get("position_id","bsnh[3]")};
            ${$.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${$.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:N({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(x.size(p)/je)},programUniforms:m})}},Ba=(e,t)=>{Tc(e.inputs,t),e.compute(Ic(e.inputs,t))}});var Cc,Ac,Da,Ma=A(()=>{"use strict";V();W();F();Cc=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],n=e[1],r=e[2];if(t.dataType!==n.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Ac=(e,t,n,r)=>{let o=t.simplified,i=e[0].dims,s=x.size(i),a=i,u=s,l=i.slice(-1)[0],d=r?i.slice(0,-1).concat(1):[],c=!o&&e.length>3,p=e.length>4,f=r&&n>1,m=r&&n>2,h=n>3,_=64,y=X(l),g=[{type:12,data:u},{type:12,data:y},{type:12,data:l},{type:1,data:t.epsilon}],b=$=>{let v=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],T=[S("x",e[0].dataType,e[0].dims,y),S("skip",e[1].dataType,e[1].dims,y),S("gamma",e[2].dataType,e[2].dims,y)];c&&T.push(S("beta",e[3].dataType,e[3].dims,y)),p&&T.push(S("bias",e[4].dataType,e[4].dims,y)),T.push(C("output",e[0].dataType,a,y)),f&&T.push(C("mean_output",1,d)),m&&T.push(C("inv_std_output",1,d)),h&&T.push(C("input_skip_bias_sum",e[0].dataType,a,y));let I=ee(e[0].dataType),k=ee(1,y);return`

      ${$.registerUniforms(v).declareVariables(...T)}
      var<workgroup> sum_shared : array<${k}, ${_}>;
      var<workgroup> sum_squared_shared : array<${k}, ${_}>;

      ${$.mainStart([_,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${_};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${_};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${_-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${p?"bias[offset1d + i]":I+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Ze(I,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${_};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${xe("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${xe("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${I}(mean)`}) *
            ${I}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},w=[{dims:a,dataType:e[0].dataType}];return n>1&&w.push({dims:d,dataType:1}),n>2&&w.push({dims:d,dataType:1}),n>3&&w.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${h}`,inputDependencies:e.map(($,v)=>"type")},getShaderSource:b,getRunData:()=>({outputs:w,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:g})}},Da=(e,t)=>{Cc(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Ac(e.inputs,t,e.outputCount,!1),{outputs:r})}});var kc,rn,Ec,Ra,zc,Pc,Ua,Va,Na=A(()=>{"use strict";V();W();oe();F();kc=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((n,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},rn=(e,t)=>{let n=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>n.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>n.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return n},Ec=(e,t)=>{if(e.length>1){let n=rn(e,1),r=rn(e,2),o=rn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),N({starts:n,ends:r,axes:o})}else return t},Ra=(e,t,n,r,o)=>{let i=e;return e<0&&(i+=n[r[t]]),o[t]<0?Math.max(0,Math.min(i,n[r[t]]-1)):Math.max(0,Math.min(i,n[r[t]]))},zc=(e,t,n)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${O("uniforms.input_shape","i",n.length)};
            let steps_i = ${O("uniforms.steps","i",n.length)};
            let signs_i = ${O("uniforms.signs","i",n.length)};
            let starts_i = ${O("uniforms.starts","i",n.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Pc=(e,t)=>{let n=e[0].dims,r=x.size(n),o=t.axes.length>0?x.normalizeAxes(t.axes,n.length):[...Array(n.length).keys()],i=rn(e,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=t.starts.map((y,g)=>Ra(y,g,n,o,i)),a=t.ends.map((y,g)=>Ra(y,g,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let y=0;y<n.length;++y)o.includes(y)||(s.splice(y,0,0),a.splice(y,0,n[y]),i.splice(y,0,1));let u=i.map(y=>Math.sign(y));i.forEach((y,g,b)=>{if(y<0){let w=(a[g]-s[g])/y,$=s[g],v=$+w*i[g];s[g]=v,a[g]=$,b[g]=-y}});let l=n.slice(0);o.forEach((y,g)=>{l[y]=Math.ceil((a[y]-s[y])/i[y])});let d={dims:l,dataType:e[0].dataType},c=C("output",e[0].dataType,l.length),p=S("input",e[0].dataType,e[0].dims.length),f=x.size(l),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:f},{type:12,data:s},{type:6,data:u},{type:12,data:i},...E(e[0].dims,l)],_=y=>`
      ${y.registerUniforms(m).declareVariables(p,c)}
        ${zc(p,c,n)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",p.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:[d],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:h})}},Ua=(e,t)=>{kc(e.inputs,t);let n=Ec(e.inputs,t);e.compute(Pc(e.inputs,n),{inputs:[0]})},Va=e=>{let t=e.starts,n=e.ends,r=e.axes;return N({starts:t,ends:n,axes:r})}});var Bc,Oc,La,Wa,Ga=A(()=>{"use strict";V();W();oe();Oe();F();Bc=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Oc=(e,t)=>{let n=e.inputs[0],r=n.dims,o=x.size(r),i=r.length,s=x.normalizeAxis(t.axis,i),a=s<r.length-1,u,l=[];a?(l=Array.from({length:i},(T,I)=>I),l[s]=i-1,l[i-1]=s,u=e.compute(ce(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let d=u.dims,c=d[i-1],p=o/c,f=X(c),m=c/f,h=64;p===1&&(h=256);let _=(T,I)=>I===4?`max(max(${T}.x, ${T}.y), max(${T}.z, ${T}.w))`:I===2?`max(${T}.x, ${T}.y)`:I===3?`max(max(${T}.x, ${T}.y), ${T}.z)`:T,y=S("x",u.dataType,u.dims,f),g=C("result",u.dataType,u.dims,f),b=y.type.value,w=ee(u.dataType)==="f32"?`var threadMax = ${b}(-3.402823e+38f);`:`var threadMax = ${b}(-65504.0h);`,$=T=>`
      var<workgroup> rowMaxShared : ${b};
      var<workgroup> rowSumShared : ${b};
      var<workgroup> threadShared : array<${b}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${b} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${b}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${T.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${T.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${w}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${b}(${_("threadShared[0]",f)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${b}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${b}(${xe("threadShared[0]",f)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,v=e.compute({name:"Softmax",shaderCache:{hint:`${f};${h}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:d,dataType:u.dataType}],dispatchGroup:{x:p},programUniforms:[{type:6,data:m}]}),getShaderSource:$},{inputs:[u],outputs:[a?-1:0]})[0];a&&e.compute(ce(v,l),{inputs:[v]})},La=(e,t)=>{Bc(e.inputs),Oc(e,t)},Wa=e=>N({axis:e.axis})});var Ha,Dc,Mc,Rc,qa,Fa=A(()=>{"use strict";V();W();F();Ha=e=>Array.from(e.getBigInt64Array(),Number),Dc=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Ha(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Mc=(e,t)=>{let n=[];for(let r=0;r<e.length;++r)n.push(e[r]*t[r]);return n},Rc=(e,t)=>{let n=e[0].dims,r=t??Ha(e[1]),o=Mc(n,r),i=x.size(o),s=e[0].dataType,a=S("input",s,n.length),u=C("output",s,o.length),l=d=>`
      const inputShape = ${a.indices(...n)};
      ${d.registerUniform("output_size","u32").declareVariables(a,u)}
      ${d.mainStart()}
      ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...E(e[0].dims,o)]}),getShaderSource:l}},qa=e=>{Dc(e.inputs),e.compute(Rc(e.inputs),{inputs:[0]})}});var Uc,Vc,Ka,ja=A(()=>{"use strict";V();W();F();Uc=(e,t,n,r,o)=>{let i=C("output_data",o,n.length,4),s=S("a_data",t[1].dataType,t[1].dims.length,4),a=S("b_data",t[2].dataType,t[2].dims.length,4),u=S("c_data",t[0].dataType,t[0].dims.length,4),l,d=(c,p,f)=>`select(${p}, ${c}, ${f})`;if(!r)l=i.setByOffset("global_idx",d(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let c=(p,f,m="")=>{let h=`a_data[index_a${f}][component_a${f}]`,_=`b_data[index_b${f}][component_b${f}]`,y=`bool(c_data[index_c${f}] & (0xffu << (component_c${f} * 8)))`;return`
            let output_indices${f} = ${i.offsetToIndices(`global_idx * 4u + ${f}u`)};
            let offset_a${f} = ${s.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_b${f} = ${a.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let offset_c${f} = ${u.broadcastedIndicesToOffset(`output_indices${f}`,i)};
            let index_a${f} = offset_a${f} / 4u;
            let index_b${f} = offset_b${f} / 4u;
            let index_c${f} = offset_c${f} / 4u;
            let component_a${f} = offset_a${f} % 4u;
            let component_b${f} = offset_b${f} % 4u;
            let component_c${f} = offset_c${f} % 4u;
            ${p}[${f}] = ${m}(${d(h,_,y)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${c("data",0,"u32")}
            ${c("data",1,"u32")}
            ${c("data",2,"u32")}
            ${c("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${c("output_data[global_idx]",0)}
            ${c("output_data[global_idx]",1)}
            ${c("output_data[global_idx]",2)}
            ${c("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},Vc=e=>{let t=e[1].dims,n=e[2].dims,r=e[0].dims,o=e[1].dataType,i=!(x.areEqual(t,n)&&x.areEqual(n,r)),s=t,a=x.size(t);if(i){let l=Ae.calcShape(Ae.calcShape(t,n,!1),r,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=x.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>Uc(l,e,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...E(r,t,n,s)]})}},Ka=e=>{e.compute(Vc(e.inputs))}});var Za,Qa=A(()=>{"use strict";Mo();Ft();Vo();Lo();Ii();Ri();Ni();ns();ls();ps();hs();ws();xs();Ts();As();zs();Os();Rs();Ns();js();Xs();Js();ta();oa();Yn();sa();xa();Ia();Aa();Ht();Pa();Oa();Ma();Na();Ga();er();Fa();Oe();jt();ja();Za=new Map([["Abs",[Wo]],["Acos",[Go]],["Acosh",[Ho]],["Add",[Ci]],["ArgMax",[Do,Vn]],["ArgMin",[Oo,Vn]],["Asin",[qo]],["Asinh",[Fo]],["Atan",[Ko]],["Atanh",[jo]],["Attention",[Ro]],["AveragePool",[fa,ma]],["BatchNormalization",[Uo]],["BiasAdd",[No]],["BiasSplitGelu",[Ti]],["Cast",[Qo,Zo]],["Ceil",[Yo]],["Clip",[Xo]],["Concat",[Ui,Vi]],["Conv",[jn,Kn]],["ConvTranspose",[us,ss]],["Cos",[Jo]],["Cosh",[ei]],["CumSum",[ds,cs]],["DepthToSpace",[ms,fs]],["DequantizeLinear",[Sa,Ta]],["Div",[Ai]],["Einsum",[bs,_s]],["Elu",[ti,dt]],["Equal",[ki]],["Erf",[ni]],["Exp",[ri]],["Expand",[vs]],["FastGelu",[Ss]],["Floor",[oi]],["FusedConv",[jn,Kn]],["Gather",[Cs,Is]],["GatherElements",[Bs,Ps]],["GatherBlockQuantized",[ks,Es]],["Gelu",[ii]],["Gemm",[Ms,Ds]],["GlobalAveragePool",[ya,ga]],["GlobalMaxPool",[va,$a]],["Greater",[Bi]],["GreaterOrEqual",[Di]],["GridSample",[Us,Vs]],["GroupQueryAttention",[Ks]],["HardSigmoid",[mi,pi]],["InstanceNormalization",[Qs]],["LayerNormalization",[Ys]],["LeakyRelu",[si,dt]],["Less",[Oi]],["LessOrEqual",[Mi]],["Log",[vi]],["MatMul",[ea]],["MatMulNBits",[na,ra]],["MaxPool",[_a,wa]],["Mul",[Ei]],["MultiHeadAttention",[Gs,Ws]],["Neg",[ui]],["Not",[ai]],["Pad",[ia]],["Pow",[zi]],["QuickGelu",[xi,dt]],["Range",[Ca]],["Reciprocal",[li]],["ReduceMin",[Ao]],["ReduceMean",[xo]],["ReduceMax",[Co]],["ReduceSum",[Eo]],["ReduceProd",[ko]],["ReduceL1",[So]],["ReduceL2",[To]],["ReduceLogSum",[Po]],["ReduceLogSumExp",[Io]],["ReduceSumSquare",[zo]],["Relu",[di]],["Resize",[Ea,za]],["RotaryEmbedding",[Ba]],["Sigmoid",[ci]],["Sin",[fi]],["Sinh",[hi]],["Slice",[Ua,Va]],["SkipLayerNormalization",[Da]],["Split",[Hs,qs]],["Sqrt",[gi]],["Softmax",[La,Wa]],["Sub",[Pi]],["Tan",[yi]],["Tanh",[_i]],["ThresholdedRelu",[$i,dt]],["Tile",[qa]],["Transpose",[lo,co]],["Where",[Ka]]])});var on,Xa=A(()=>{"use strict";we();Ce();F();on=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,n){this.repo.set(t,n)}run(t,n,r,o,i){_e(t.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of n)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}a.setPipeline(t.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),he(t.programInfo.name)}dispose(){}build(t,n){_e(t.name);let r=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(c=>{r.features.has(c.feature)&&o.push(`enable ${c.extension};`)});let s=ao(n,this.backend.device.limits),a=t.getShaderSource(s),u=`${o.join(`
`)}
${s.additionalImplementations}
${a}`,l=r.createShaderModule({code:u,label:t.name});j("verbose",()=>`[WebGPU] ${t.name} shader code: ${u}`);let d=r.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:t.name});return he(t.name),{programInfo:t,computePipeline:d,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let n=typeof t=="number"?t:t.x,r=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&r<=i&&o<=i)return[n,r,o];let s=n*r*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var Nc,Lc,tr,nr,sn,Ya=A(()=>{"use strict";we();V();Ce();Cn();oo();Qa();Xa();Nc=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let n=[];for(let r=0;r<e.length;++r){let o=e[r].dataType;switch(t[r]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=e[r].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=e[r].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return n.join("|")},Lc=(e,t,n)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+n+`:${Nc(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},tr=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},nr=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let n=t.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},sn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,n){this.env=t;let r=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=s=>n.features.has(s)&&r.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new nr(this.device),this.adapterInfo=new tr(n.info||await n.requestAdapterInfo()),this.gpuDataManager=ro(this),this.programManager=new on(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vt(t.logLevel,!!t.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;_e(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(t.getMappedRange()),r=this.pendingQueries.get(t);for(let o=0;o<n.length/2;o++){let i=r[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,d=i.programName,c=i.inputTensorViews,p=i.outputTensorViews,f=n[o*2],m=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=f);let h=Number(f-this.queryTimeBase),_=Number(m-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(_))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(y=>({dims:y.dims,dataType:Ue(y.dataType)})),outputsMetadata:p.map(y=>({dims:y.dims,dataType:Ue(y.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:d,startTime:h,endTime:_});else{let y="";c.forEach((b,w)=>{y+=`input[${w}]: [${b.dims}] | ${Ue(b.dataType)}, `});let g="";p.forEach((b,w)=>{g+=`output[${w}]: [${b.dims}] | ${Ue(b.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${d}" ${y}${g}execution time: ${_-h} ns`)}vt("GPU",`${d}::${f}::${m}`)}t.unmap(),this.pendingQueries.delete(t)}),he()}run(t,n,r,o,i,s){_e(t.name);let a=[];for(let b=0;b<n.length;++b){let w=n[b].data;if(w===0)continue;let $=this.gpuDataManager.get(w);if(!$)throw new Error(`no GPU data for input: ${w}`);a.push($)}let{outputs:u,dispatchGroup:l,programUniforms:d}=t.getRunData(n),c=r.length===0?u.map((b,w)=>w):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let p=[],f=[];for(let b=0;b<u.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=s)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let w=c[b]===-1,$=c[b]===-2,v=w||$?i(u[b].dataType,u[b].dims):o(c[b],u[b].dataType,u[b].dims);if(p.push(v),v.data===0)continue;let T=this.gpuDataManager.get(v.data);if(!T)throw new Error(`no GPU data for output: ${v.data}`);if(w&&this.temporaryData.push(T),$){let I=this.kernelPersistentData.get(this.currentKernelId);I||(I=[],this.kernelPersistentData.set(this.currentKernelId,I)),I.push(T)}f.push(T)}if(a.length!==n.length||f.length!==p.length){if(f.length===0)return he(t.name),p;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let m;if(d){let b=0,w=[];d.forEach(I=>{let k=typeof I.data=="number"?[I.data]:I.data;if(k.length===0)return;let B=I.type===10?2:4,D,L;I.type===10?(L=k.length>4?16:k.length>2?8:k.length*B,D=k.length>4?16:B*k.length):(L=k.length<=2?k.length*B:16,D=16),b=Math.ceil(b/L)*L,w.push(b);let P=I.type===10?8:4;b+=k.length>4?Math.ceil(k.length/P)*D:k.length*B});let $=16;b=Math.ceil(b/$)*$;let v=new ArrayBuffer(b);d.forEach((I,k)=>{let B=w[k],D=typeof I.data=="number"?[I.data]:I.data;if(I.type===6)new Int32Array(v,B,D.length).set(D);else if(I.type===12)new Uint32Array(v,B,D.length).set(D);else if(I.type===10)new Uint16Array(v,B,D.length).set(D);else if(I.type===1)new Float32Array(v,B,D.length).set(D);else throw new Error(`Unsupported uniform type: ${Ue(I.type)}`)});let T=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(T.buffer,0,v,0,b),this.gpuDataManager.release(T.id),m={offset:0,size:b,buffer:T.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),_=h[1]===1&&h[2]===1,y=Lc(t,n,_),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(t,h),this.programManager.setArtifact(y,g),j("info",()=>`[artifact] key: ${y}, programName: ${t.name}`)),d&&g.uniformVariablesInfo){if(d.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${d.length} in program "${g.programInfo.name}".`);for(let b=0;b<d.length;b++){let w=d[b],$=w.type,v=typeof w.data=="number"?1:w.data.length,[T,I]=g.uniformVariablesInfo[b];if($!==T||v!==I)throw new Error(`Uniform variable ${b} mismatch: expect type ${T} with size ${I}, got type ${$} with size ${v} in program "${g.programInfo.name}".`)}}if(j("info",()=>`[ProgramManager] run "${t.name}" (key=${y}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:n,outputTensorViews:p};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(g,a,f,h,m),he(t.name),p}upload(t,n){this.gpuDataManager.upload(t,n)}memcpy(t,n){this.gpuDataManager.memcpy(t,n)}async download(t,n){await this.gpuDataManager.download(t,n)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,n,r,o){let i=Za.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let s={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(n,s)}releaseKernel(t){let n=this.kernelPersistentData.get(t);if(n){for(let r of n)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,n,r){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),j("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${i}] ${s}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,n,r,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(r,o,s);return i.set(n,[a,r]),a}unregisterBuffers(t){let n=this.sessionExternalDataMapping.get(t);n&&(n.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let n=this.gpuDataManager.get(t);if(!n)throw new Error(`no GPU data for buffer: ${t}`);return n.buffer}createDownloader(t,n,r){return async()=>{let o=await zn(this,t,n);return Nt(o.buffer,r)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){j("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){j("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){j("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),r=t.length;this.pendingKernels=[];for(let o=0;o<r;o++){let i=this.getComputePassEncoder(),s=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Wc,Ja,Gc,eu,an,un,rr,tu,nu=A(()=>{"use strict";Ce();Wc=1,Ja=()=>Wc++,Gc=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),eu=(e,t)=>{let n=Gc.get(e);if(!n)throw new Error("Unsupported data type.");return Math.ceil(t.reduce((r,o)=>r*o)*n/8)},an=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return eu(this.dataType,this.tensorShape)}destroy(){j("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,n){return this.dataType===t&&this.tensorShape.length===n.length&&this.tensorShape.every((r,o)=>r===n[o])}},un=class{constructor(t,n){this.tensorManager=t;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,n,r){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,n))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==eu(t,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,n,o,!0,!0),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else j("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},rr=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Ja();return this.tensorTrackersById.set(t,new un(this)),t}releaseTensorId(t){let n=this.tensorTrackersById.get(t);n&&(this.tensorTrackersById.delete(t),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(t,n,r,o){j("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${n}, shape: ${r}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(n,r,o)}upload(t,n){let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");r.upload(n)}async download(t,n){j("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${n?.byteLength}}`);let r=this.tensorTrackersById.get(t);if(!r)throw new Error("Tensor not found.");return r.download(n)}releaseTensorsForSession(t){for(let n of this.freeTensors)n.sessionId===t&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==t)}registerTensor(t,n,r,o){let i=Ja(),s=new an({sessionId:this.backend.currentSessionId,context:t,tensor:n,dataType:r,shape:o});return this.tensorTrackersById.set(i,new un(this,s)),this.externalTensors.add(s),i}async getCachedTensor(t,n,r,o,i){let s=this.backend.currentSessionId;for(let[l,d]of this.freeTensors.entries())if(d.sameTypeAndShape(t,n)){j("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${n}}`);let c=this.freeTensors.splice(l,1)[0];return c.sessionId=s,c}let a=this.backend.currentContext;j("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${n}}`);let u=await a.createTensor({dataType:t,shape:n,dimensions:n,usage:r,writable:o,readable:i});return new an({sessionId:s,context:a,tensor:u,dataType:t,shape:n})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},tu=(...e)=>new rr(...e)});var ru,Hc,ln,ou=A(()=>{"use strict";V();Re();Cn();nu();Ce();ru=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Hc=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let n=Object.keys(e).sort(),r=Object.keys(t).sort();return n.length===r.length&&n.every((o,i)=>o===r[i]&&e[o]===t[o])},ln=class{constructor(t){this.tensorManager=tu(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Vt(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let r=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(r=>Hc(r.options,t));if(n!==-1)return this.mlContextCache[n].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,n){this.mlContextBySessionId.set(t,n);let r=this.sessionIdsByMLContext.get(n);r||(r=new Set,this.sessionIdsByMLContext.set(n,r)),r.add(t)}onReleaseSession(t){let n=this.mlContextBySessionId.get(t);if(!n)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let r=this.sessionIdsByMLContext.get(n);if(r.delete(t),r.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){j("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,n,r,o){let i=ru.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(t,i,r,o)}uploadTensor(t,n){if(!re().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");j("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${n.byteLength}}`),this.tensorManager.upload(t,n)}async downloadTensor(t,n){return this.tensorManager.download(t,n)}createMLTensorDownloader(t,n){return async()=>{let r=await this.tensorManager.download(t);return Nt(r,n)}}registerMLTensor(t,n,r){let o=ru.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,r);return j("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${r}} -> {tensorId: ${i}}`),i}registerMLConstant(t,n,r,o,i,s){if(!s)throw new Error("External mounted files are not available.");let a=t;t.startsWith("./")&&(a=t.substring(2));let u=s.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(n+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(n,n+r).buffer,d;switch(i.dataType){case"float32":d=new Float32Array(l);break;case"float16":d=new Uint16Array(l);break;case"int32":d=new Int32Array(l);break;case"uint32":d=new Uint32Array(l);break;case"int64":d=new BigInt64Array(l);break;case"uint64":d=new BigUint64Array(l);break;case"int8":d=new Int8Array(l);break;case"int4":case"uint4":case"uint8":d=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return j("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,d)}flush(){}}});var iu={};gt(iu,{init:()=>qc});var ft,or,qc,su=A(()=>{"use strict";V();Ya();Ce();W();ou();ft=class e{constructor(t,n,r,o){this.module=t;this.dataType=n;this.data=r;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=x.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(x.size(t)!==x.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},or=class{constructor(t,n,r){this.module=t;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=t.PTR_SIZE,i=r/t.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,s));let a=Number(t.getValue(o*i++,s));this.outputCount=Number(t.getValue(o*i++,s)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,s));let u=[];for(let l=0;l<a;l++){let d=Number(t.getValue(o*i++,s)),c=Number(t.getValue(o*i++,"*")),p=Number(t.getValue(o*i++,s)),f=[];for(let m=0;m<p;m++)f.push(Number(t.getValue(o*i++,s)));u.push(new ft(t,d,c,f))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,n){let r=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new ft(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=Fe(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new ft(this.module,a,d,u)};return this.backend.run(t,r,o,i,s,this.outputCount)}output(t,n){let r=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,i);for(let a=0;a<n.length;a++)this.module.setValue(s+o*(a+1),n[a],i);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(r)}}},qc=async(e,t,n,r)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new sn;await i.initialize(n,r),o("webgpu",[i,s=>i.alloc(Number(s)),s=>i.free(s),(s,a,u,l=!1)=>{if(l)j("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(a)}, size=${Number(u)}`),i.memcpy(Number(s),Number(a));else{j("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let d=t.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));i.upload(Number(a),d)}},async(s,a,u)=>{j("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(Number(s),()=>t.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(s,a,u)=>i.createKernel(s,Number(a),u,t.UTF8ToString(t._JsepGetNodeName(Number(a)))),s=>i.releaseKernel(s),(s,a,u,l)=>{j("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let d=new or(t,i,Number(a));return i.computeKernel(Number(s),d,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new ln(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,l)=>i.ensureTensor(s,a,u,l),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var Fc,Ct,At,Qe,Kc,it,kt,Et,au,zt,Pt,Bt,vn=A(()=>{"use strict";Zr();Xr();V();Re();Dt();In();Fc=(e,t)=>{re()._OrtInit(e,t)!==0&&Z("Can't initialize onnxruntime.")},Ct=async e=>{Fc(e.wasm.numThreads,ut(e.logLevel))},At=async(e,t)=>{{let n=(su(),yn(iu)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let r=e.webgpu.adapter;if(r){if(typeof r.limits!="object"||typeof r.features!="object"||typeof r.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(r=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!r)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",re(),e,r)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",re(),e)}}},Qe=new Map,Kc=e=>{let t=re(),n=t.stackSave();try{let r=t.PTR_SIZE,o=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,o,o+r)!==0&&Z("Can't get session input/output count.");let s=r===4?"i32":"i64";return[Number(t.getValue(o,s)),Number(t.getValue(o+r,s))]}finally{t.stackRestore(n)}},it=e=>{let t=re(),n=t._malloc(e.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,n),[n,e.byteLength]},kt=async(e,t)=>{let n,r,o=re();Array.isArray(e)?[n,r]=e:e.buffer===o.HEAPU8.buffer?[n,r]=[e.byteOffset,e.byteLength]:[n,r]=it(e);let i=0,s=0,a=0,u=[],l=[],d=[];try{if([s,u]=Qr(t),t?.externalData&&o.mountExternalData){let g=[];for(let b of t.externalData){let w=typeof b=="string"?b:b.path;g.push(lt(typeof b=="string"?b:b.data).then($=>{o.mountExternalData(w,$)}))}await Promise.all(g)}for(let g of t?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let w=g,$=w?.context,v=w?.gpuDevice,T=w?.deviceType,I=w?.powerPreference;$?o.currentContext=$:v?o.currentContext=await o.jsepCreateMLContext(v):o.currentContext=await o.jsepCreateMLContext({deviceType:T,powerPreference:I})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(n,r,s),i===0&&Z("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[c,p]=Kc(i),f=!!t?.enableGraphCapture,m=[],h=[],_=[];for(let g=0;g<c;g++){let b=o._OrtGetInputName(i,g);b===0&&Z("Can't get an input name."),l.push(b),m.push(o.UTF8ToString(b))}for(let g=0;g<p;g++){let b=o._OrtGetOutputName(i,g);b===0&&Z("Can't get an output name."),d.push(b);let w=o.UTF8ToString(b);h.push(w);{if(f&&t?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let $=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[w]??"cpu";if($!=="cpu"&&$!=="cpu-pinned"&&$!=="gpu-buffer"&&$!=="ml-tensor")throw new Error(`Not supported preferred output location: ${$}.`);if(f&&$!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${$}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push($)}}let y=null;return _.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&Z("Can't create IO binding."),y={handle:a,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(g=>Tn(g))}),Qe.set(i,[i,l,d,y,f,!1]),[i,m,h]}catch(c){throw l.forEach(p=>o._OrtFree(p)),d.forEach(p=>o._OrtFree(p)),a!==0&&o._OrtReleaseBinding(a)!==0&&Z("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&Z("Can't release session."),c}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&Z("Can't release session options."),u.forEach(c=>o._free(c)),o.unmountExternalData?.()}},Et=e=>{let t=re(),n=Qe.get(e);if(!n)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,o,i,s,a]=n;s&&(a&&t._OrtClearBoundOutputs(s.handle)!==0&&Z("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&Z("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(u=>t._OrtFree(u)),i.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(r)!==0&&Z("Can't release session."),Qe.delete(e)},au=(e,t,n,r,o,i=!1)=>{if(!e){t.push(0);return}let s=re(),a=s.PTR_SIZE,u=e[0],l=e[1],d=e[3],c,p;if(u==="string"&&(d==="gpu-buffer"||d==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&d!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(d==="gpu-buffer"){let h=e[2].gpuBuffer;p=Fe(at(u),l);let _=s.jsepRegisterBuffer;if(!_)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');c=_(r,o,h,p)}else if(d==="ml-tensor"){let h=e[2].mlTensor;p=Fe(at(u),l);let _=s.jsepRegisterMLTensor;if(!_)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');c=_(h,at(u),l)}else{let h=e[2];if(Array.isArray(h)){p=a*h.length,c=s._malloc(p),n.push(c);for(let _=0;_<h.length;_++){if(typeof h[_]!="string")throw new TypeError(`tensor data at index ${_} is not a string`);s.setValue(c+_*a,le(h[_],n),"*")}}else p=h.byteLength,c=s._malloc(p),n.push(c),s.HEAPU8.set(new Uint8Array(h.buffer,h.byteOffset,p),c)}let f=s.stackSave(),m=s.stackAlloc(4*l.length);try{l.forEach((_,y)=>s.setValue(m+y*a,_,a===4?"i32":"i64"));let h=s._OrtCreateTensor(at(u),c,p,m,l.length,Tn(d));h===0&&Z(`Can't create tensor for input/output. session=${r}, index=${o}.`),t.push(h)}finally{s.stackRestore(f)}},zt=async(e,t,n,r,o,i)=>{let s=re(),a=s.PTR_SIZE,u=Qe.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let l=u[0],d=u[1],c=u[2],p=u[3],f=u[4],m=u[5],h=t.length,_=r.length,y=0,g=[],b=[],w=[],$=[],v=s.stackSave(),T=s.stackAlloc(h*a),I=s.stackAlloc(h*a),k=s.stackAlloc(_*a),B=s.stackAlloc(_*a);try{s.jsepOnRunStart?.(l),[y,g]=jr(i);for(let P=0;P<h;P++)au(n[P],b,$,e,t[P],f);for(let P=0;P<_;P++)au(o[P],w,$,e,h+r[P],f);for(let P=0;P<h;P++)s.setValue(T+P*a,b[P],"*"),s.setValue(I+P*a,d[t[P]],"*");for(let P=0;P<_;P++)s.setValue(k+P*a,w[P],"*"),s.setValue(B+P*a,c[r[P]],"*");if(p&&!m){let{handle:P,outputPreferredLocations:R,outputPreferredLocationsEncoded:ne}=p;if(d.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${d.length}).`);for(let U=0;U<h;U++){let H=t[U];await s._OrtBindInput(P,d[H],b[U])!==0&&Z(`Can't bind input[${U}] for session=${e}.`)}for(let U=0;U<_;U++){let H=r[U];o[U]?.[3]?s._OrtBindOutput(P,c[H],w[U],0)!==0&&Z(`Can't bind pre-allocated output[${U}] for session=${e}.`):s._OrtBindOutput(P,c[H],0,ne[H])!==0&&Z(`Can't bind output[${U}] to ${R[U]} for session=${e}.`)}Qe.set(e,[l,d,c,p,f,!0])}let D;p?D=await s._OrtRunWithBinding(l,p.handle,_,k,y):D=await s._OrtRun(l,I,T,h,B,_,k,y),D!==0&&Z("failed to call OrtRun().");let L=[];for(let P=0;P<_;P++){let R=Number(s.getValue(k+P*a,"*"));if(R===w[P]){L.push(o[P]);continue}let ne=s.stackSave(),U=s.stackAlloc(4*a),H=!1,K,q=0;try{s._OrtGetTensorData(R,U,U+a,U+2*a,U+3*a)!==0&&Z(`Can't access output tensor data on index ${P}.`);let ye=a===4?"i32":"i64",ae=Number(s.getValue(U,ye));q=s.getValue(U+a,"*");let Q=s.getValue(U+a*2,"*"),z=Number(s.getValue(U+a*3,ye)),M=[];for(let ie=0;ie<z;ie++)M.push(Number(s.getValue(Q+ie*a,ye)));s._OrtFree(Q)!==0&&Z("Can't free memory for tensor dims.");let te=M.reduce((ie,ue)=>ie*ue,1);K=Ue(ae);let Me=p?.outputPreferredLocations[r[P]];if(K==="string"){if(Me==="gpu-buffer"||Me==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ie=[];for(let ue=0;ue<te;ue++){let Le=s.getValue(q+ue*a,"*"),wu=s.getValue(q+(ue+1)*a,"*"),$u=ue===te-1?void 0:wu-Le;ie.push(s.UTF8ToString(Le,$u))}L.push([K,M,ie,"cpu"])}else if(Me==="gpu-buffer"&&te>0){let ie=s.jsepGetBuffer;if(!ie)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ue=ie(q),Le=Fe(ae,te);if(Le===void 0||!Rt(K))throw new Error(`Unsupported data type: ${K}`);H=!0,L.push([K,M,{gpuBuffer:ue,download:s.jsepCreateDownloader(ue,Le,K),dispose:()=>{s._OrtReleaseTensor(R)!==0&&Z("Can't release tensor.")}},"gpu-buffer"])}else if(Me==="ml-tensor"&&te>0){let ie=s.jsepEnsureTensor;if(!ie)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Fe(ae,te)===void 0||!Ut(K))throw new Error(`Unsupported data type: ${K}`);let Le=await ie(q,ae,M,!1);H=!0,L.push([K,M,{mlTensor:Le,download:s.jsepCreateMLTensorDownloader(q,K),dispose:()=>{s.jsepReleaseTensorId(q),s._OrtReleaseTensor(R)}},"ml-tensor"])}else{let ie=Mt(K),ue=new ie(te);new Uint8Array(ue.buffer,ue.byteOffset,ue.byteLength).set(s.HEAPU8.subarray(q,q+ue.byteLength)),L.push([K,M,ue,"cpu"])}}finally{s.stackRestore(ne),K==="string"&&q&&s._free(q),H||s._OrtReleaseTensor(R)}}return p&&!f&&(s._OrtClearBoundOutputs(p.handle)!==0&&Z("Can't clear bound outputs."),Qe.set(e,[l,d,c,p,f,!1])),L}finally{s.stackRestore(v),b.forEach(D=>s._OrtReleaseTensor(D)),w.forEach(D=>s._OrtReleaseTensor(D)),$.forEach(D=>s._free(D)),y!==0&&s._OrtReleaseRunOptions(y),g.forEach(D=>s._free(D))}},Pt=e=>{let t=re(),n=Qe.get(e);if(!n)throw new Error("invalid session id");let r=n[0],o=t._OrtEndProfiling(r);o===0&&Z("Can't get an profile file name."),t._OrtFree(o)},Bt=e=>{let t=[];for(let n of e){let r=n[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}});var Xe,ve,ht,cn,pn,dn,ir,sr,tt,nt,Zc,uu,lu,du,cu,pu,mu,fu,ar=A(()=>{"use strict";we();vn();Re();ot();Xe=()=>!!J.wasm.proxy&&typeof document<"u",ht=!1,cn=!1,pn=!1,sr=new Map,tt=(e,t)=>{let n=sr.get(e);n?n.push(t):sr.set(e,[t])},nt=()=>{if(ht||!cn||pn||!ve)throw new Error("worker not ready")},Zc=e=>{switch(e.data.type){case"init-wasm":ht=!1,e.data.err?(pn=!0,ir[1](e.data.err)):(cn=!0,ir[0]()),dn&&(URL.revokeObjectURL(dn),dn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=sr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},uu=async()=>{if(!cn){if(ht)throw new Error("multiple calls to 'initWasm()' detected.");if(pn)throw new Error("previous call to 'initWasm()' failed.");if(ht=!0,Xe())return new Promise((e,t)=>{ve?.terminate(),qr().then(([n,r])=>{try{ve=r,ve.onerror=i=>t(i),ve.onmessage=Zc,ir=[e,t];let o={type:"init-wasm",in:J};ve.postMessage(o),dn=n}catch(o){t(o)}},t)});try{await It(J.wasm),await Ct(J),cn=!0}catch(e){throw pn=!0,e}finally{ht=!1}}},lu=async e=>{if(Xe())return nt(),new Promise((t,n)=>{tt("init-ep",[t,n]);let r={type:"init-ep",in:{epName:e,env:J}};ve.postMessage(r)});await At(J,e)},du=async e=>Xe()?(nt(),new Promise((t,n)=>{tt("copy-from",[t,n]);let r={type:"copy-from",in:{buffer:e}};ve.postMessage(r,[e.buffer])})):it(e),cu=async(e,t)=>{if(Xe()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return nt(),new Promise((n,r)=>{tt("create",[n,r]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),ve.postMessage(o,i)})}else return kt(e,t)},pu=async e=>{if(Xe())return nt(),new Promise((t,n)=>{tt("release",[t,n]);let r={type:"release",in:e};ve.postMessage(r)});Et(e)},mu=async(e,t,n,r,o,i)=>{if(Xe()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return nt(),new Promise((s,a)=>{tt("run",[s,a]);let u=n,l={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:r,options:i}};ve.postMessage(l,Bt(u))})}else return zt(e,t,n,r,o,i)},fu=async e=>{if(Xe())return nt(),new Promise((t,n)=>{tt("end-profiling",[t,n]);let r={type:"end-profiling",in:e};ve.postMessage(r)});Pt(e)}});var hu,Qc,mn,gu=A(()=>{"use strict";we();ar();V();Tt();In();hu=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Qc=e=>{switch(e[3]){case"cpu":return new fe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Rt(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:n,download:r,dispose:o}=e[2];return fe.fromGpuBuffer(n,{dataType:t,dims:e[1],download:r,dispose:o})}case"ml-tensor":{let t=e[0];if(!Ut(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:n,download:r,dispose:o}=e[2];return fe.fromMLTensor(n,{dataType:t,dims:e[1],download:r,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},mn=class{async fetchModelAndCopyToWasmMemory(t){return du(await lt(t))}async loadModel(t,n){_e();let r;typeof t=="string"?!1?r=await lt(t):r=await this.fetchModelAndCopyToWasmMemory(t):r=t,[this.sessionId,this.inputNames,this.outputNames]=await cu(r,n),he()}async dispose(){return pu(this.sessionId)}async run(t,n,r){_e();let o=[],i=[];Object.entries(t).forEach(p=>{let f=p[0],m=p[1],h=this.inputNames.indexOf(f);if(h===-1)throw new Error(`invalid input '${f}'`);o.push(m),i.push(h)});let s=[],a=[];Object.entries(n).forEach(p=>{let f=p[0],m=p[1],h=this.outputNames.indexOf(f);if(h===-1)throw new Error(`invalid output '${f}'`);s.push(m),a.push(h)});let u=o.map((p,f)=>hu(p,()=>`input "${this.inputNames[i[f]]}"`)),l=s.map((p,f)=>p?hu(p,()=>`output "${this.outputNames[a[f]]}"`):null),d=await mu(this.sessionId,i,u,a,l,r),c={};for(let p=0;p<d.length;p++)c[this.outputNames[a[p]]]=s[p]??Qc(d[p]);return he(),c}startProfiling(){}endProfiling(){fu(this.sessionId)}}});var bu={};gt(bu,{OnnxruntimeWebAssemblyBackend:()=>fn,initializeFlags:()=>yu,wasmBackend:()=>Xc});var yu,fn,Xc,_u=A(()=>{"use strict";we();ar();gu();ot();yu=()=>{if((typeof J.wasm.initTimeout!="number"||J.wasm.initTimeout<0)&&(J.wasm.initTimeout=0),J.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof J.wasm.proxy!="boolean"&&(J.wasm.proxy=!1),typeof J.wasm.trace!="boolean"&&(J.wasm.trace=!1),typeof J.wasm.numThreads!="number"||!Number.isInteger(J.wasm.numThreads)||J.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)J.wasm.numThreads=1;else{let e=typeof navigator>"u"?gn("node:os").cpus().length:navigator.hardwareConcurrency;J.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}J.wasm.wasmPaths===void 0&&$e&&$e.indexOf("blob:")!==0&&(J.wasm.wasmPaths=$e.substring(0,$e.lastIndexOf("/")+1))},fn=class{async init(t){yu(),await uu(),await lu(t)}async createInferenceSessionHandler(t,n){let r=new mn;return await r.loadModel(t,n),Promise.resolve(r)}},Xc=new fn});we();we();we();var Rr="1.21.0";var G$=$n;{let e=(_u(),yn(bu)).wasmBackend;Ge("webgpu",e,5),Ge("webnn",e,5),Ge("cpu",e,10),Ge("wasm",e,10)}Object.defineProperty(J.versions,"web",{value:Rr,enumerable:!0});export{Cu as InferenceSession,vt as TRACE,_e as TRACE_FUNC_BEGIN,he as TRACE_FUNC_END,fe as Tensor,ku as TrainingSession,G$ as default,J as env,Ge as registerBackend};
/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
//# sourceMappingURL=ort.webgpu.min.mjs.map
