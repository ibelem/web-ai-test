/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Wn=Object.defineProperty;var Ep=Object.getOwnPropertyDescriptor;var Pp=Object.getOwnPropertyNames;var zp=Object.prototype.hasOwnProperty;var Ln=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var U=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ft=(e,t)=>{for(var r in t)Wn(e,r,{get:t[r],enumerable:!0})},Op=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Pp(t))!zp.call(e,o)&&o!==r&&Wn(e,o,{get:()=>t[o],enumerable:!(n=Ep(t,o))||n.enumerable});return e};var br=e=>Op(Wn({},"__esModule",{value:!0}),e);var yr,$t,xt,Bp,wr,_r=U(()=>{"use strict";yr=new Map,$t=[],xt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=yr.get(e);if(n===void 0)yr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=$t.indexOf(e);o!==-1&&$t.splice(o,1);for(let i=0;i<$t.length;i++)if(yr.get($t[i]).priority<=r){$t.splice(i,0,e);return}$t.push(e)}return}throw new TypeError("not a valid backend")},Bp=async e=>{let t=yr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},wr=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?$t:r,o,i=[],a=new Set;for(let d of n){let p=await Bp(d);typeof p=="string"?i.push({name:d,err:p}):(o||(o=p),o===p&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let l=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,p)=>p==="executionProviders"?l:Reflect.get(d,p)})]}});var ea=U(()=>{"use strict";_r()});var ta,ra=U(()=>{"use strict";ta="1.21.0"});var na,Re,Gn=U(()=>{"use strict";ra();na="warning",Re={wasm:{},webgl:{},webgpu:{},versions:{common:ta},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);na=e}},get logLevel(){return na}};Object.defineProperty(Re,"logLevel",{enumerable:!0})});var _e,oa=U(()=>{"use strict";Gn();_e=Re});var ia,aa,sa=U(()=>{"use strict";ia=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let m=i*o,u=0,h=m,w=m*2,y=-1;a==="RGBA"?(u=0,h=m,w=m*2,y=m*3):a==="RGB"?(u=0,h=m,w=m*2):a==="RBG"&&(u=0,w=m,h=m*2);for(let b=0;b<i;b++)for(let S=0;S<o;S++){let $=(e.data[u++]-p[0])*d[0],v=(e.data[h++]-p[1])*d[1],x=(e.data[w++]-p[2])*d[2],T=y===-1?255:(e.data[y++]-p[3])*d[3];n.fillStyle="rgba("+$+","+v+","+x+","+T+")",n.fillRect(S,b,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},aa=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,p,m;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,w=0,y=1,b=2,S=3,$=0,v=u,x=u*2,T=-1;l==="RGBA"?($=0,v=u,x=u*2,T=u*3):l==="RGB"?($=0,v=u,x=u*2):l==="RBG"&&($=0,x=u,v=u*2),n=r.createImageData(o,i);for(let C=0;C<i*o;w+=h,y+=h,b+=h,S+=h,C++)n.data[w]=(e.data[$++]-m[0])*p[0],n.data[y]=(e.data[v++]-m[1])*p[1],n.data[b]=(e.data[x++]-m[2])*p[2],n.data[S]=T===-1?255:(e.data[T++]-m[3])*p[3]}else throw new Error("Can not access image data");return n}});var Hn,ua,la,da,ca,pa,ma=U(()=>{"use strict";vr();Hn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*n,m=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),u=4,h=0,w=1,y=2,b=3,S=0,$=p,v=p*2,x=-1;l==="RGB"&&(u=3,h=0,w=1,y=2,b=-1),d==="RGBA"?x=p*3:d==="RBG"?(S=0,v=p,$=p*2):d==="BGR"&&(v=0,$=p,S=p*2);for(let C=0;C<p;C++,h+=u,y+=u,w+=u,b+=u)m[S++]=(e[h]+a[0])/i[0],m[$++]=(e[w]+a[1])/i[1],m[v++]=(e[y]+a[2])/i[2],x!==-1&&b!==-1&&(m[x++]=(e[b]+a[3])/i[3]);return d==="RGBA"?new ze("float32",m,[1,4,r,n]):new ze("float32",m,[1,3,r,n])},ua=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=d();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=h,l.width=w}else l.tensorFormat="RGBA",l.height=h,l.width=w;u.drawImage(e,0,0),a=u.getImageData(0,0,w,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=m,l.width=u,t!==void 0){let h=d();h.width=u,h.height=m;let w=p(h);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,w=e.width;return u.drawImage(e,0,0,w,h),a=u.getImageData(0,0,w,h).data,l.height=h,l.width=w,Hn(a,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=d(),w=p(h);if(!e||!w)return u();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{h.width=y.width,h.height=y.height,w.drawImage(y,0,0,h.width,h.height);let b=w.getImageData(0,0,h.width,h.height);l.height=h.height,l.width=h.width,m(Hn(b.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return Hn(a,l);throw new Error("Input data provided is not supported - aborted tensor creation")},la=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new ze({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},da=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},ca=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new ze({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},pa=(e,t,r)=>new ze({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var St,qt,fa,ha,ga=U(()=>{"use strict";St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),fa=!1,ha=()=>{if(!fa){fa=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(St.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),r?(St.set("float16",Float16Array),qt.set(Float16Array,"float16")):St.set("float16",Uint16Array)}}});var ba,ya,wa=U(()=>{"use strict";vr();ba=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},ya=(e,t)=>{switch(e.location){case"cpu":return new ze(e.type,e.data,t);case"cpu-pinned":return new ze({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new ze({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new ze({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new ze({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var ze,vr=U(()=>{"use strict";sa();ma();ga();wa();ze=class{constructor(t,r,n){ha();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let l=St.get(o);if(!l)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof l))throw new TypeError(`buffer should be of type ${l.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let l,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");l=r}else{let p=St.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?l=p.from(r,BigInt):l=p.from(r)}else if(r instanceof p)l=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")l=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",l=t;else if(p==="boolean")o="bool",l=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",l=Uint8Array.from(t);else{let p=qt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,l=t}if(d===void 0)d=[l.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=l,this.dataLocation="cpu"}let a=ba(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return ua(t,r)}static fromTexture(t,r){return la(t,r)}static fromGpuBuffer(t,r){return da(t,r)}static fromMLTensor(t,r){return ca(t,r)}static fromPinnedBuffer(t,r,n){return pa(t,r,n)}toDataURL(t){return ia(this,t)}toImageData(t){return aa(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return ya(this,t)}}});var Oe,$r=U(()=>{"use strict";vr();Oe=ze});var xr,_a,Ue,Me,Fn=U(()=>{"use strict";Gn();xr=(e,t)=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||console.timeStamp(`${e}::ORT::${t}`)},_a=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),xr("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ue=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||_a("BEGIN",e)},Me=e=>{(typeof Re.trace>"u"?!Re.wasm.trace:!Re.trace)||_a("END",e)}});var Sr,va=U(()=>{"use strict";_r();$r();Fn();Sr=class e{constructor(t){this.handler=t}async run(t,r,n){Ue();let o={},i={};if(typeof t!="object"||t===null||t instanceof Oe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof Oe)&&(p=!0,a=!1,o[u]=h)}if(p){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(a)for(let p of this.outputNames)o[p]=null;let l=await this.handler.run(t,o,i),d={};for(let p in l)if(Object.hasOwnProperty.call(l,p)){let m=l[p];m instanceof Oe?d[p]=m:d[p]=new Oe(m.type,m.data,m.dims)}return Me(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ue();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await wr(a),p=await l.createInferenceSessionHandler(i,d);return Me(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Mp,$a=U(()=>{"use strict";va();Mp=Sr});var xa=U(()=>{"use strict"});var Sa=U(()=>{"use strict"});var Ta=U(()=>{"use strict"});var Ia=U(()=>{"use strict"});var Dp,Tr,Ca=U(()=>{"use strict";_r();$r();Dp="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Tr=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,l]=await wr(i);if(a.createTrainingSessionHandler){let d=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,l);return new e(d,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Dp)}typeNarrowingForRunStep(t,r,n,o,i){let a={},l={};if(typeof n!="object"||n===null||n instanceof Oe||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Oe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let p of o){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof Oe)&&(p=!0,d=!1,a[u]=h)}if(p){if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else l=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of t)if(typeof n[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(d)for(let p of r)a[p]=null;return[a,l]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof Oe?r[n]=o:r[n]=new Oe(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Rp,Aa=U(()=>{"use strict";Ca();Rp=Tr});var qn={};Ft(qn,{InferenceSession:()=>Mp,TRACE:()=>xr,TRACE_FUNC_BEGIN:()=>Ue,TRACE_FUNC_END:()=>Me,Tensor:()=>Oe,TrainingSession:()=>Rp,env:()=>_e,registerBackend:()=>xt});var We=U(()=>{"use strict";ea();oa();$a();$r();xa();Sa();Fn();Ta();Ia();Aa()});var Ir=U(()=>{"use strict"});var za={};Ft(za,{default:()=>Up});var Ea,Pa,Up,Oa=U(()=>{"use strict";jn();ht();jt();Ea="ort-wasm-proxy-worker",Pa=globalThis.self?.name===Ea;Pa&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Cr(r.wasm).then(()=>{Ar(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;kr(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=Kt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Er(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Pr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:l}=r;zr(n,o,i,a,new Array(a.length).fill(null),l).then(d=>{d.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Br([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Or(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Up=Pa?null:e=>new Worker(e??Mt,{type:"module",name:Ea})});var Ma={};Ft(Ma,{default:()=>Np});var Kn,Ba,Np,Da=U(()=>{"use strict";Ba=(Kn=import.meta.url,async function(e={}){function t(){return se.buffer!=J.buffer&&be(),J}function r(){return se.buffer!=J.buffer&&be(),ne}function n(){return se.buffer!=J.buffer&&be(),ve}function o(){return se.buffer!=J.buffer&&be(),Be}function i(){return se.buffer!=J.buffer&&be(),$e}function a(){return se.buffer!=J.buffer&&be(),de}function l(){return se.buffer!=J.buffer&&be(),V}function d(){return se.buffer!=J.buffer&&be(),Ge}var p,m,u=Object.assign({},e),h=new Promise((s,c)=>{p=s,m=c}),w=typeof window=="object",y=typeof importScripts=="function",b=y&&self.name=="em-pthread";u.mountExternalData=(s,c)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Eb||(u.Eb=new Map)).set(s,c)},u.unmountExternalData=()=>{delete u.Eb};var S=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,g,_)=>(...I)=>{let B=Qe,M=g?.();I=f(...I);let L=g?.();return M!==L&&(f=L,_(M),g=_=null),Qe!=B?new Promise((H,Q)=>{On={resolve:H,reject:Q}}):I},c=f=>async(...g)=>{try{if(u.Fb)throw Error("Session already started");let _=u.Fb={fc:g[0],errors:[]},I=await f(...g);if(u.Fb!==_)throw Error("Session mismatch");u.Gb?.flush();let B=_.errors;if(0<B.length){let M=await Promise.all(B);if(M=M.filter(L=>L),0<M.length)throw Error(M.join(`
`))}return I}finally{u.Fb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=c(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=c(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,c)=>{if($?.(),s==="webgpu"){[u.Gb,u.Ub,u.Yb,u.Nb,u.Xb,u.jb,u.Zb,u.bc,u.Vb,u.Wb,u.$b]=c;let f=u.Gb;u.jsepRegisterBuffer=(g,_,I,B)=>f.registerBuffer(g,_,I,B),u.jsepGetBuffer=g=>f.getBuffer(g),u.jsepCreateDownloader=(g,_,I)=>f.createDownloader(g,_,I),u.jsepOnCreateSession=g=>{f.onCreateSession(g)},u.jsepOnReleaseSession=g=>{f.onReleaseSession(g)},u.jsepOnRunStart=g=>f.onRunStart(g),u.cc=(g,_)=>{f.upload(g,_)}}else if(s==="webnn"){[u.Gb,u.ac,u.Ob,u.jsepEnsureTensor,u.dc,u.jsepDownloadTensor]=c,u.jsepReleaseTensorId=u.Ob;let f=u.Gb;u.jsepOnRunStart=g=>f.onRunStart(g),u.jsepRegisterMLContext=(g,_)=>{f.registerMLContext(g,_)},u.jsepOnReleaseSession=g=>{f.onReleaseSession(g)},u.jsepCreateMLTensorDownloader=(g,_)=>f.createMLTensorDownloader(g,_),u.jsepRegisterMLTensor=(g,_,I)=>f.registerMLTensor(g,_,I),u.jsepCreateMLContext=g=>f.createMLContext(g),u.jsepRegisterMLConstant=(g,_,I,B,M)=>f.registerMLConstant(g,_,I,B,M,u.Eb)}};var v,x,T=Object.assign({},u),C="./this.program",A=(s,c)=>{throw c},P="";(w||y)&&(y?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),Kn&&(P=Kn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),y&&(x=s=>{var c=new XMLHttpRequest;return c.open("GET",s,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),v=(s,c,f)=>{var g=new XMLHttpRequest;g.open("GET",s,!0),g.responseType="arraybuffer",g.onload=()=>{g.status==200||g.status==0&&g.response?c(g.response):f()},g.onerror=f,g.send(null)});var O,R=console.log.bind(console),G=console.error.bind(console),q=R,K=G;if(Object.assign(u,T),T=null,b){let s=function(c){try{var f=c.data,g=f.cmd;if(g==="load"){let _=[];self.onmessage=I=>_.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of _)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...B)=>{postMessage({Mb:"callHandler",oc:I,args:B})},I=="print"&&(q=u[I]),I=="printErr"&&(K=u[I]));se=f.wasmMemory,be(),W(f.wasmModule)}else if(g==="run"){Rn(f.pthread_ptr,0,0,1,0,0),En(f.pthread_ptr),fc(),Fo(),Y||(Li(),Y=!0);try{hc(f.start_routine,f.arg)}catch(_){if(_!="unwind")throw _}}else g==="cancel"?Bt()&&hr(-1):f.target!=="setimmediate"&&(g==="checkMailbox"?Y&&ar():g&&(K(`worker: received unknown command ${g}`),K(f)))}catch(_){throw Gi(),_}};var ug=s,W,Y=!1;K=function(...c){c=c.join(" "),console.error(c)},self.alert=function(...c){postMessage({Mb:"alert",text:c.join(" "),qc:Bt()})},u.instantiateWasm=(c,f)=>new Promise(g=>{W=_=>{_=new WebAssembly.Instance(_,Vo()),f(_),g()}}),self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=s}u.wasmBinary&&(O=u.wasmBinary);var se,X,ee,J,ne,ve,Be,$e,de,V,j,he,Ge,we=!1;function be(){var s=se.buffer;u.HEAP8=J=new Int8Array(s),u.HEAP16=ve=new Int16Array(s),u.HEAPU8=ne=new Uint8Array(s),u.HEAPU16=Be=new Uint16Array(s),u.HEAP32=$e=new Int32Array(s),u.HEAPU32=de=new Uint32Array(s),u.HEAPF32=V=new Float32Array(s),u.HEAPF64=Ge=new Float64Array(s),u.HEAP64=j=new BigInt64Array(s),u.HEAPU64=he=new BigUint64Array(s)}if(!b){if(!((se=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof S))throw K("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");be()}var Ke=[],Lt=[],gn=[],Gt=0,bn=null,Ht=null;function Mo(){if(--Gt==0&&(bn!==null&&(clearInterval(bn),bn=null),Ht)){var s=Ht;Ht=null,s()}}function dt(s){throw K(s="Aborted("+s+")"),we=!0,ee=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var yn,Do=s=>s.startsWith("data:application/octet-stream;base64,"),Ro=s=>s.startsWith("file://");function Uo(s){if(s==yn&&O)return new Uint8Array(O);if(x)return x(s);throw"both async and sync fetching of the wasm failed"}function No(s,c,f){return function(g){if(!O&&(w||y)){if(typeof fetch=="function"&&!Ro(g))return fetch(g,{credentials:"same-origin"}).then(_=>{if(!_.ok)throw`failed to load wasm binary file at '${g}'`;return _.arrayBuffer()}).catch(()=>Uo(g));if(v)return new Promise((_,I)=>{v(g,B=>_(new Uint8Array(B)),I)})}return Promise.resolve().then(()=>Uo(g))}(s).then(g=>WebAssembly.instantiate(g,c)).then(f,g=>{K(`failed to asynchronously prepare wasm: ${g}`),dt(g)})}function Vo(){return{a:{O:mc,Aa:pc,b:bc,aa:Yo,B:Xo,qa:Jo,Y:ti,_:ri,ra:ni,oa:oi,ha:ii,na:ai,L:si,Z:ui,W:li,pa:di,X:ci,wa:yc,F:_c,Q:vc,P:xc,E:Tc,u:Ic,q:Cc,G:Ac,A:Mc,R:Dc,ua:Rc,ka:Uc,U:Nc,ba:Vc,H:Wc,ja:En,ta:Lc,t:Gc,x:qc,o:jc,l:Yc,c:An,n:Zc,j:Jc,w:ep,p:tp,g:rp,s:np,m:op,e:ip,k:ap,i:sp,h:up,d:lp,ea:dp,fa:cp,ga:pp,ca:Ti,da:Ii,T:mp,f:fp,D:hp,I:gp,M:bp,y:yp,sa:wp,V:_p,v:Ai,z:vp,N:$p,S:xp,za:Sp,ya:Tp,la:Pi,ma:zi,$:xn,C:Oi,K:Bi,ia:Mi,J:Di,a:se,xa:$n,va:Ni,r:Ap}}}var wn={869332:(s,c,f,g,_)=>{if(u===void 0||!u.Eb)return 1;if((s=Se(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=u.Eb.get(s)))return 2;if(c=Number(c>>>0),f=Number(f>>>0),g=Number(g>>>0),c+f>s.byteLength)return 3;try{let I=s.subarray(c,c+f);switch(_){case 0:r().set(I,g>>>0);break;case 1:u.cc(g,I);break;default:return 4}return 0}catch{return 4}},870047:(s,c,f)=>{u.dc(s,r().subarray(c>>>0,c+f>>>0))},870110:()=>u.ac(),870151:s=>{u.Ob(s)},870187:()=>{u.Vb()},870218:()=>{u.Wb()},870247:()=>{u.$b()},870272:s=>u.Ub(s),870305:s=>u.Yb(s),870337:(s,c,f)=>{u.Nb(Number(s),Number(c),Number(f),!0)},870400:(s,c,f)=>{u.Nb(Number(s),Number(c),Number(f))},870457:()=>typeof wasmOffsetConverter<"u",870514:s=>{u.jb("Abs",s,void 0)},870565:s=>{u.jb("Neg",s,void 0)},870616:s=>{u.jb("Floor",s,void 0)},870669:s=>{u.jb("Ceil",s,void 0)},870721:s=>{u.jb("Reciprocal",s,void 0)},870779:s=>{u.jb("Sqrt",s,void 0)},870831:s=>{u.jb("Exp",s,void 0)},870882:s=>{u.jb("Erf",s,void 0)},870933:s=>{u.jb("Sigmoid",s,void 0)},870988:(s,c,f)=>{u.jb("HardSigmoid",s,{alpha:c,beta:f})},871067:s=>{u.jb("Log",s,void 0)},871118:s=>{u.jb("Sin",s,void 0)},871169:s=>{u.jb("Cos",s,void 0)},871220:s=>{u.jb("Tan",s,void 0)},871271:s=>{u.jb("Asin",s,void 0)},871323:s=>{u.jb("Acos",s,void 0)},871375:s=>{u.jb("Atan",s,void 0)},871427:s=>{u.jb("Sinh",s,void 0)},871479:s=>{u.jb("Cosh",s,void 0)},871531:s=>{u.jb("Asinh",s,void 0)},871584:s=>{u.jb("Acosh",s,void 0)},871637:s=>{u.jb("Atanh",s,void 0)},871690:s=>{u.jb("Tanh",s,void 0)},871742:s=>{u.jb("Not",s,void 0)},871793:(s,c,f)=>{u.jb("Clip",s,{min:c,max:f})},871862:s=>{u.jb("Clip",s,void 0)},871914:(s,c)=>{u.jb("Elu",s,{alpha:c})},871972:s=>{u.jb("Gelu",s,void 0)},872024:s=>{u.jb("Relu",s,void 0)},872076:(s,c)=>{u.jb("LeakyRelu",s,{alpha:c})},872140:(s,c)=>{u.jb("ThresholdedRelu",s,{alpha:c})},872210:(s,c)=>{u.jb("Cast",s,{to:c})},872268:s=>{u.jb("Add",s,void 0)},872319:s=>{u.jb("Sub",s,void 0)},872370:s=>{u.jb("Mul",s,void 0)},872421:s=>{u.jb("Div",s,void 0)},872472:s=>{u.jb("Pow",s,void 0)},872523:s=>{u.jb("Equal",s,void 0)},872576:s=>{u.jb("Greater",s,void 0)},872631:s=>{u.jb("GreaterOrEqual",s,void 0)},872693:s=>{u.jb("Less",s,void 0)},872745:s=>{u.jb("LessOrEqual",s,void 0)},872804:(s,c,f,g,_)=>{u.jb("ReduceMean",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},872979:(s,c,f,g,_)=>{u.jb("ReduceMax",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},873153:(s,c,f,g,_)=>{u.jb("ReduceMin",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},873327:(s,c,f,g,_)=>{u.jb("ReduceProd",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},873502:(s,c,f,g,_)=>{u.jb("ReduceSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},873676:(s,c,f,g,_)=>{u.jb("ReduceL1",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},873849:(s,c,f,g,_)=>{u.jb("ReduceL2",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},874022:(s,c,f,g,_)=>{u.jb("ReduceLogSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},874199:(s,c,f,g,_)=>{u.jb("ReduceSumSquare",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},874379:(s,c,f,g,_)=>{u.jb("ReduceLogSumExp",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},874559:s=>{u.jb("Where",s,void 0)},874612:(s,c,f)=>{u.jb("Transpose",s,{perm:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},874736:(s,c,f,g)=>{u.jb("DepthToSpace",s,{blocksize:c,mode:Se(f),format:g?"NHWC":"NCHW"})},874869:(s,c,f,g)=>{u.jb("DepthToSpace",s,{blocksize:c,mode:Se(f),format:g?"NHWC":"NCHW"})},875002:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[f],group:g,kernelShape:[_],pads:[I,B],strides:[M],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Se(le)})},875435:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("ConvTranspose",s,{format:M?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:g,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Se(z)})},876096:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z,le)=>{u.jb("ConvTranspose",s,{format:L?"NHWC":"NCHW",autoPad:c,dilations:[f],group:g,kernelShape:[_],pads:[I,B],strides:[M],wIsConst:()=>!!t()[H>>>0],outputPadding:Q?Array.from(i().subarray(Number(Q)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Se(le)})},876529:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("ConvTranspose",s,{format:M?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:g,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(B)>>>0,2+(Number(B)>>>0)>>>0)),wIsConst:()=>!!t()[L>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Se(z)})},877190:(s,c)=>{u.jb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},877281:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:g,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},877760:(s,c)=>{u.jb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},877851:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:g,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},878330:(s,c)=>{u.jb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},878417:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:g,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},878892:(s,c)=>{u.jb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},878979:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z)=>{u.jb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:g,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],kernel_shape:M?Array.from(i().subarray(Number(M)>>>0,Number(L)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},879454:(s,c,f,g,_)=>{u.jb("Gemm",s,{alpha:c,beta:f,transA:g,transB:_})},879558:s=>{u.jb("MatMul",s,void 0)},879612:(s,c,f,g)=>{u.jb("ArgMax",s,{keepDims:!!c,selectLastIndex:!!f,axis:g})},879720:(s,c,f,g)=>{u.jb("ArgMin",s,{keepDims:!!c,selectLastIndex:!!f,axis:g})},879828:(s,c)=>{u.jb("Softmax",s,{axis:c})},879891:(s,c)=>{u.jb("Concat",s,{axis:c})},879951:(s,c,f,g,_)=>{u.jb("Split",s,{axis:c,numOutputs:f,splitSizes:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},880107:s=>{u.jb("Expand",s,void 0)},880161:(s,c)=>{u.jb("Gather",s,{axis:Number(c)})},880232:(s,c)=>{u.jb("GatherElements",s,{axis:Number(c)})},880311:(s,c,f,g,_,I,B,M,L,H,Q)=>{u.jb("Resize",s,{antialias:c,axes:f?Array.from(i().subarray(Number(f)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Se(_),cubicCoeffA:I,excludeOutside:B,extrapolationValue:M,keepAspectRatioPolicy:Se(L),mode:Se(H),nearestMode:Se(Q)})},880673:(s,c,f,g,_,I,B)=>{u.jb("Slice",s,{starts:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[],ends:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[],axes:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[]})},880937:s=>{u.jb("Tile",s,void 0)},880989:(s,c,f)=>{u.jb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},881103:(s,c,f)=>{u.jb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},881217:s=>{u.jb("Range",s,void 0)},881270:(s,c)=>{u.jb("Einsum",s,{equation:Se(c)})},881351:(s,c,f,g,_)=>{u.jb("Pad",s,{mode:c,value:f,pads:g?Array.from(i().subarray(Number(g)>>>0,Number(_)>>>0)):[]})},881494:(s,c,f,g,_,I)=>{u.jb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!_,trainingMode:!!g,format:I?"NHWC":"NCHW"})},881663:(s,c,f,g,_,I)=>{u.jb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!_,trainingMode:!!g,format:I?"NHWC":"NCHW"})},881832:(s,c,f)=>{u.jb("CumSum",s,{exclusive:Number(c),reverse:Number(f)})},881929:(s,c,f)=>{u.jb("DequantizeLinear",s,{axis:c,blockSize:f})},882019:(s,c,f,g,_)=>{u.jb("GridSample",s,{align_corners:c,mode:Se(f),padding_mode:Se(g),format:_?"NHWC":"NCHW"})},882189:(s,c,f,g,_)=>{u.jb("GridSample",s,{align_corners:c,mode:Se(f),padding_mode:Se(g),format:_?"NHWC":"NCHW"})},882359:(s,c)=>{u.jb("ScatterND",s,{reduction:Se(c)})},882444:(s,c,f,g,_,I,B,M,L)=>{u.jb("Attention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:g,scale:_,doRotary:I,qkvHiddenSizes:B?Array.from(i().subarray(Number(M)>>>0,Number(M)+B>>>0)):[],pastPresentShareBuffer:!!L})},882716:s=>{u.jb("BiasAdd",s,void 0)},882771:s=>{u.jb("BiasSplitGelu",s,void 0)},882832:s=>{u.jb("FastGelu",s,void 0)},882888:(s,c,f,g,_,I,B,M,L,H,Q,ce,ge,z,le,Te)=>{u.jb("Conv",s,{format:ce?"NHWC":"NCHW",auto_pad:c,dilations:f?Array.from(i().subarray(Number(f)>>>0,Number(g)>>>0)):[],group:_,kernel_shape:I?Array.from(i().subarray(Number(I)>>>0,Number(B)>>>0)):[],pads:M?Array.from(i().subarray(Number(M)>>>0,Number(L)>>>0)):[],strides:H?Array.from(i().subarray(Number(H)>>>0,Number(Q)>>>0)):[],w_is_const:()=>!!t()[Number(ge)>>>0],activation:Se(z),activation_params:le?Array.from(l().subarray(Number(le)>>>0,Number(Te)>>>0)):[]})},883472:s=>{u.jb("Gelu",s,void 0)},883524:(s,c,f,g,_,I,B,M,L)=>{u.jb("GroupQueryAttention",s,{numHeads:c,kvNumHeads:f,scale:g,softcap:_,doRotary:I,rotaryInterleaved:B,smoothSoftmax:M,localWindowSize:L})},883741:(s,c,f,g)=>{u.jb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!g})},883852:(s,c,f,g)=>{u.jb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!g})},883963:(s,c,f,g,_,I)=>{u.jb("MatMulNBits",s,{k:c,n:f,accuracyLevel:g,bits:_,blockSize:I})},884090:(s,c,f,g,_,I)=>{u.jb("MultiHeadAttention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:g,scale:_,doRotary:I})},884249:(s,c)=>{u.jb("QuickGelu",s,{alpha:c})},884313:(s,c,f,g,_)=>{u.jb("RotaryEmbedding",s,{interleaved:!!c,numHeads:f,rotaryEmbeddingDim:g,scale:_})},884452:(s,c,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},884554:(s,c,f)=>{u.jb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},884656:(s,c,f,g)=>{u.jb("GatherBlockQuantized",s,{gatherAxis:c,quantizeAxis:f,blockSize:g})},884777:s=>{u.Zb(s)},884811:(s,c)=>u.bc(Number(s),Number(c),u.Fb.fc,u.Fb.errors)};function pc(s,c,f){return _i(async()=>{await u.Xb(Number(s),Number(c),Number(f))})}function mc(){return typeof wasmOffsetConverter<"u"}function _n(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var vn=s=>{s.terminate(),s.onmessage=()=>{}},Wo=s=>{ct.length==0&&(jo(),qo(ct[0]));var c=ct.pop();if(!c)return 6;_t.push(c),Ye[s.Ab]=c,c.Ab=s.Ab;var f={cmd:"run",start_routine:s.hc,arg:s.Qb,pthread_ptr:s.Ab};return c.postMessage(f,s.mc),0},wt=0,xe=(s,c,...f)=>{for(var g=2*f.length,_=Vn(),I=Nn(8*g),B=I>>>3,M=0;M<f.length;M++){var L=f[M];typeof L=="bigint"?(j[B+2*M]=1n,j[B+2*M+1]=L):(j[B+2*M]=0n,d()[B+2*M+1>>>0]=L)}return s=Hi(s,0,g,I,c),gr(_),s};function $n(s){if(b)return xe(0,1,s);if(ee=s,!(0<wt)){for(var c of _t)vn(c);for(c of ct)vn(c);ct=[],_t=[],Ye=[],we=!0}A(s,new _n(s))}function Lo(s){if(b)return xe(1,0,s);xn(s)}var xn=s=>{if(ee=s,b)throw Lo(s),"unwind";$n(s)},ct=[],_t=[],Go=[],Ye={},Ho=s=>{var c=s.Ab;delete Ye[c],ct.push(s),_t.splice(_t.indexOf(s),1),s.Ab=0,Un(c)};function Fo(){Go.forEach(s=>s())}var qo=s=>new Promise(c=>{s.onmessage=_=>{var I=(_=_.data).cmd;if(_.targetThread&&_.targetThread!=Bt()){var B=Ye[_.targetThread];B?B.postMessage(_,_.transferList):K(`Internal error! Worker sent a message "${I}" to target pthread ${_.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?ar():I==="spawnThread"?Wo(_):I==="cleanupThread"?Ho(Ye[_.thread]):I==="killThread"?(_=_.thread,I=Ye[_],delete Ye[_],vn(I),Un(_),_t.splice(_t.indexOf(I),1),I.Ab=0):I==="cancelThread"?Ye[_.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,c(s)):I==="alert"?alert(`Thread ${_.threadId}: ${_.text}`):_.target==="setimmediate"?s.postMessage(_):I==="callHandler"?u[_.handler](..._.args):I&&K(`worker sent an unknown command ${I}`)},s.onerror=_=>{throw K(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var f,g=[];for(f of[])u.hasOwnProperty(f)&&g.push(f);s.postMessage({cmd:"load",handlers:g,wasmMemory:se,wasmModule:X})});function jo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});ct.push(s)}var ir=s=>{for(;0<s.length;)s.shift()(u)},fc=()=>{var s=Bt(),c=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],qi(c,c-s),gr(c)},hc=(s,c)=>{wt=0,s=ji(s,c),0<wt?ee=s:hr(s)};class gc{constructor(c){this.Jb=c-24}}function bc(s,c,f){var g=new gc(s>>>=0);throw c>>>=0,f>>>=0,a()[g.Jb+16>>>2>>>0]=0,a()[g.Jb+4>>>2>>>0]=c,a()[g.Jb+8>>>2>>>0]=f,s}function Ko(s,c,f,g){return b?xe(2,1,s,c,f,g):Yo(s,c,f,g)}function Yo(s,c,f,g){if(s>>>=0,c>>>=0,f>>>=0,g>>>=0,S===void 0)return K("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var _=[];return b&&_.length===0?Ko(s,c,f,g):(s={hc:f,Ab:s,Qb:g,mc:_},b?(s.Mb="spawnThread",postMessage(s,_),0):Wo(s))}var Zo=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,Qo=(s,c,f)=>{var g=(c>>>=0)+f;for(f=c;s[f]&&!(f>=g);)++f;if(16<f-c&&s.buffer&&Zo)return Zo.decode(s.buffer instanceof S?s.slice(c,f):s.subarray(c,f));for(g="";c<f;){var _=s[c++];if(128&_){var I=63&s[c++];if((224&_)==192)g+=String.fromCharCode((31&_)<<6|I);else{var B=63&s[c++];65536>(_=(240&_)==224?(15&_)<<12|I<<6|B:(7&_)<<18|I<<12|B<<6|63&s[c++])?g+=String.fromCharCode(_):(_-=65536,g+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else g+=String.fromCharCode(_)}return g},Se=(s,c)=>(s>>>=0)?Qo(r(),s,c):"";function Xo(s,c,f){return b?xe(3,1,s,c,f):0}function Jo(s,c){if(b)return xe(4,1,s,c)}var Sn=s=>{for(var c=0,f=0;f<s.length;++f){var g=s.charCodeAt(f);127>=g?c++:2047>=g?c+=2:55296<=g&&57343>=g?(c+=4,++f):c+=3}return c},ei=(s,c,f,g)=>{if(!(0<g))return 0;var _=f>>>=0;g=f+g-1;for(var I=0;I<s.length;++I){var B=s.charCodeAt(I);if(55296<=B&&57343>=B&&(B=65536+((1023&B)<<10)|1023&s.charCodeAt(++I)),127>=B){if(f>=g)break;c[f++>>>0]=B}else{if(2047>=B){if(f+1>=g)break;c[f++>>>0]=192|B>>6}else{if(65535>=B){if(f+2>=g)break;c[f++>>>0]=224|B>>12}else{if(f+3>=g)break;c[f++>>>0]=240|B>>18,c[f++>>>0]=128|B>>12&63}c[f++>>>0]=128|B>>6&63}c[f++>>>0]=128|63&B}}return c[f>>>0]=0,f-_},Pt=(s,c,f)=>ei(s,r(),c,f);function ti(s,c){if(b)return xe(5,1,s,c)}function ri(s,c,f){if(b)return xe(6,1,s,c,f)}function ni(s,c,f){return b?xe(7,1,s,c,f):0}function oi(s,c){if(b)return xe(8,1,s,c)}function ii(s,c,f){if(b)return xe(9,1,s,c,f)}function ai(s,c,f,g){if(b)return xe(10,1,s,c,f,g)}function si(s,c,f,g){if(b)return xe(11,1,s,c,f,g)}function ui(s,c,f,g){if(b)return xe(12,1,s,c,f,g)}function li(s){if(b)return xe(13,1,s)}function di(s,c){if(b)return xe(14,1,s,c)}function ci(s,c,f){if(b)return xe(15,1,s,c,f)}var pi,pt,yc=()=>{dt("")},Ze=s=>{for(var c="";r()[s>>>0];)c+=pi[r()[s++>>>0]];return c},Tn={},In={},wc={};function at(s,c,f={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(g,_,I={}){var B=_.name;if(!g)throw new pt(`type "${B}" must have a positive integer typeid pointer`);if(In.hasOwnProperty(g)){if(I.Sb)return;throw new pt(`Cannot register type '${B}' twice`)}In[g]=_,delete wc[g],Tn.hasOwnProperty(g)&&(_=Tn[g],delete Tn[g],_.forEach(M=>M()))}(s,c,f)}var mi=(s,c,f)=>{switch(c){case 1:return f?g=>t()[g>>>0]:g=>r()[g>>>0];case 2:return f?g=>n()[g>>>1>>>0]:g=>o()[g>>>1>>>0];case 4:return f?g=>i()[g>>>2>>>0]:g=>a()[g>>>2>>>0];case 8:return f?g=>j[g>>>3]:g=>he[g>>>3];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}};function _c(s,c,f){f>>>=0,at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:g=>g,toWireType:function(g,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(g=typeof _)=="object"||g==="array"||g==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},argPackAdvance:mt,readValueFromPointer:mi(c,f,c.indexOf("u")==-1),Db:null})}var mt=8;function vc(s,c,f,g){at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:function(_){return!!_},toWireType:function(_,I){return I?f:g},argPackAdvance:mt,readValueFromPointer:function(_){return this.fromWireType(r()[_>>>0])},Db:null})}var Cn=[],st=[];function An(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,Cn.push(s))}var Ne=s=>{if(!s)throw new pt("Cannot use deleted val. handle = "+s);return st[s]},Ve=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=Cn.pop()||st.length;return st[c]=s,st[c+1]=1,c}};function kn(s){return this.fromWireType(a()[s>>>2>>>0])}var $c={name:"emscripten::val",fromWireType:s=>{var c=Ne(s);return An(s),c},toWireType:(s,c)=>Ve(c),argPackAdvance:mt,readValueFromPointer:kn,Db:null};function xc(s){return at(s>>>0,$c)}var Sc=(s,c)=>{switch(c){case 4:return function(f){return this.fromWireType(l()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(d()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}};function Tc(s,c,f){f>>>=0,at(s>>>=0,{name:c=Ze(c>>>0),fromWireType:g=>g,toWireType:(g,_)=>_,argPackAdvance:mt,readValueFromPointer:Sc(c,f),Db:null})}function Ic(s,c,f,g,_){if(s>>>=0,f>>>=0,c=Ze(c>>>0),_===-1&&(_=4294967295),_=M=>M,g===0){var I=32-8*f;_=M=>M<<I>>>I}var B=c.includes("unsigned")?function(M,L){return L>>>0}:function(M,L){return L};at(s,{name:c,fromWireType:_,toWireType:B,argPackAdvance:mt,readValueFromPointer:mi(c,f,g!==0),Db:null})}function Cc(s,c,f){function g(I){var B=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new _(t().buffer,I,B)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];at(s>>>=0,{name:f=Ze(f>>>0),fromWireType:g,argPackAdvance:mt,readValueFromPointer:g},{Sb:!0})}function Ac(s,c){s>>>=0;var f=(c=Ze(c>>>0))==="std::string";at(s,{name:c,fromWireType:function(g){var _=a()[g>>>2>>>0],I=g+4;if(f)for(var B=I,M=0;M<=_;++M){var L=I+M;if(M==_||r()[L>>>0]==0){if(B=Se(B,L-B),H===void 0)var H=B;else H+=String.fromCharCode(0),H+=B;B=L+1}}else{for(H=Array(_),M=0;M<_;++M)H[M]=String.fromCharCode(r()[I+M>>>0]);H=H.join("")}return Xe(g),H},toWireType:function(g,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var I=typeof _=="string";if(!(I||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new pt("Cannot pass non-string to std::string");var B=f&&I?Sn(_):_.length,M=fr(4+B+1),L=M+4;if(a()[M>>>2>>>0]=B,f&&I)Pt(_,L,B+1);else if(I)for(I=0;I<B;++I){var H=_.charCodeAt(I);if(255<H)throw Xe(L),new pt("String has UTF-16 code units that do not fit in 8 bits");r()[L+I>>>0]=H}else for(I=0;I<B;++I)r()[L+I>>>0]=_[I];return g!==null&&g.push(Xe,M),M},argPackAdvance:mt,readValueFromPointer:kn,Db(g){Xe(g)}})}var fi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,kc=(s,c)=>{for(var f=s>>1,g=f+c/2;!(f>=g)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&fi)return fi.decode(r().slice(s,f));for(f="",g=0;!(g>=c/2);++g){var _=n()[s+2*g>>>1>>>0];if(_==0)break;f+=String.fromCharCode(_)}return f},Ec=(s,c,f)=>{if(f??=2147483647,2>f)return 0;var g=c;f=(f-=2)<2*s.length?f/2:s.length;for(var _=0;_<f;++_){var I=s.charCodeAt(_);n()[c>>>1>>>0]=I,c+=2}return n()[c>>>1>>>0]=0,c-g},Pc=s=>2*s.length,zc=(s,c)=>{for(var f=0,g="";!(f>=c/4);){var _=i()[s+4*f>>>2>>>0];if(_==0)break;++f,65536<=_?(_-=65536,g+=String.fromCharCode(55296|_>>10,56320|1023&_)):g+=String.fromCharCode(_)}return g},Oc=(s,c,f)=>{if(c>>>=0,f??=2147483647,4>f)return 0;var g=c;f=g+f-4;for(var _=0;_<s.length;++_){var I=s.charCodeAt(_);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++_)),i()[c>>>2>>>0]=I,(c+=4)+4>f)break}return i()[c>>>2>>>0]=0,c-g},Bc=s=>{for(var c=0,f=0;f<s.length;++f){var g=s.charCodeAt(f);55296<=g&&57343>=g&&++f,c+=4}return c};function Mc(s,c,f){if(s>>>=0,c>>>=0,f=Ze(f>>>=0),c===2)var g=kc,_=Ec,I=Pc,B=M=>o()[M>>>1>>>0];else c===4&&(g=zc,_=Oc,I=Bc,B=M=>a()[M>>>2>>>0]);at(s,{name:f,fromWireType:M=>{for(var L,H=a()[M>>>2>>>0],Q=M+4,ce=0;ce<=H;++ce){var ge=M+4+ce*c;ce!=H&&B(ge)!=0||(Q=g(Q,ge-Q),L===void 0?L=Q:(L+=String.fromCharCode(0),L+=Q),Q=ge+c)}return Xe(M),L},toWireType:(M,L)=>{if(typeof L!="string")throw new pt(`Cannot pass non-string to C++ string type ${f}`);var H=I(L),Q=fr(4+H+c);return a()[Q>>>2>>>0]=H/c,_(L,Q+4,H+c),M!==null&&M.push(Xe,Q),Q},argPackAdvance:mt,readValueFromPointer:kn,Db(M){Xe(M)}})}function Dc(s,c){at(s>>>=0,{Tb:!0,name:c=Ze(c>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Rc=()=>1;function Uc(s){Rn(s>>>0,!y,1,!w,131072,!1),Fo()}var hi=s=>{if(!we)try{if(s(),!(0<wt))try{b?hr(ee):xn(ee)}catch(c){c instanceof _n||c=="unwind"||A(1,c)}}catch(c){c instanceof _n||c=="unwind"||A(1,c)}};function En(s){s>>>=0,typeof Atomics.nc=="function"&&(Atomics.nc(i(),s>>>2,s).value.then(ar),s+=128,Atomics.store(i(),s>>>2,1))}var ar=()=>{var s=Bt();s&&(En(s),hi(Fi))};function Nc(s,c){(s>>>=0)==c>>>0?setTimeout(ar):b?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ye[s])&&s.postMessage({cmd:"checkMailbox"})}var Pn=[];function Vc(s,c,f,g,_){for(c>>>=0,g/=2,Pn.length=g,f=_>>>0>>>3,_=0;_<g;_++)Pn[_]=j[f+2*_]?j[f+2*_+1]:d()[f+2*_+1>>>0];return(c?wn[c]:kp[s])(...Pn)}function Wc(s){s>>>=0,b?postMessage({cmd:"cleanupThread",thread:s}):Ho(Ye[s])}function Lc(s){}var zn=(s,c)=>{var f=In[s];if(f===void 0)throw s=Wi(s),f=Ze(s),Xe(s),new pt(`${c} has unknown type ${f}`);return f},gi=(s,c,f)=>{var g=[];return s=s.toWireType(g,f),g.length&&(a()[c>>>2>>>0]=Ve(g)),s};function Gc(s,c,f){return c>>>=0,f>>>=0,s=Ne(s>>>0),c=zn(c,"emval::as"),gi(c,f,s)}var sr=s=>{try{s()}catch(c){dt(c)}},ft=0,Qe=null,bi=0,ur=[],yi={},wi={},Hc=0,On=null,Fc=[];function _i(s){return function(c){if(!we){if(ft===0){var f=!1,g=!1;c((_=0)=>{if(!we&&(bi=_,f=!0,g)){ft=2,sr(()=>Zi(Qe)),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.resume(),_=!1;try{var I=function(){var L=i()[Qe+8>>>2>>>0];return L=Z[wi[L]],--wt,L()}()}catch(L){I=L,_=!0}var B=!1;if(!Qe){var M=On;M&&(On=null,(_?M.reject:M.resolve)(I),B=!0)}if(_&&!B)throw I}}),g=!0,f||(ft=1,Qe=function(){var _=fr(65548),I=_+12;a()[_>>>2>>>0]=I,a()[_+4>>>2>>>0]=I+65536,I=ur[0];var B=yi[I];return B===void 0&&(B=Hc++,yi[I]=B,wi[B]=I),I=B,i()[_+8>>>2>>>0]=I,_}(),typeof Browser<"u"&&Browser.Kb.Rb&&Browser.Kb.pause(),sr(()=>Ki(Qe)))}else ft===2?(ft=0,sr(Qi),Xe(Qe),Qe=null,Fc.forEach(hi)):dt(`invalid state: ${ft}`);return bi}}(c=>{s().then(c)})}function qc(s){return s>>>=0,_i(()=>(s=Ne(s)).then(Ve))}var lr=[];function jc(s,c,f,g){return f>>>=0,g>>>=0,(s=lr[s>>>0])(null,c=Ne(c>>>0),f,g)}var Kc={},dr=s=>{var c=Kc[s];return c===void 0?Ze(s):c};function Yc(s,c,f,g,_){return f>>>=0,g>>>=0,_>>>=0,(s=lr[s>>>0])(c=Ne(c>>>0),c[f=dr(f)],g,_)}var vi=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Zc(s){return(s>>>=0)==0?Ve(vi()):(s=dr(s),Ve(vi()[s]))}var Qc=s=>{var c=lr.length;return lr.push(s),c},Xc=(s,c)=>{for(var f=Array(s),g=0;g<s;++g)f[g]=zn(a()[c+4*g>>>2>>>0],"parameter "+g);return f},$i=(s,c)=>Object.defineProperty(c,"name",{value:s});function Jc(s,c,f){var g=(c=Xc(s,c>>>0)).shift();s--;var _=`return function (obj, func, destructorsRef, args) {
`,I=0,B=[];f===0&&B.push("obj");for(var M=["retType"],L=[g],H=0;H<s;++H)B.push("arg"+H),M.push("argType"+H),L.push(c[H]),_+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=c[H].argPackAdvance;return _+=`  var rv = ${f===1?"new func":"func.call"}(${B.join(", ")});
`,g.Tb||(M.push("emval_returnValue"),L.push(gi),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),M.push(_+`};
`),s=function(Q){var ce=Function;if(!(ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ce} which is not a function`);var ge=$i(ce.name||"unknownFunctionName",function(){});return ge.prototype=ce.prototype,ge=new ge,(Q=ce.apply(ge,Q))instanceof Object?Q:ge}(M)(...L),f=`methodCaller<(${c.map(Q=>Q.name).join(", ")}) => ${g.name}>`,Qc($i(f,s))}function ep(s){return s=dr(s>>>0),Ve(u[s])}function tp(s,c){return c>>>=0,s=Ne(s>>>0),c=Ne(c),Ve(s[c])}function rp(s){9<(s>>>=0)&&(st[s+1]+=1)}function np(){return Ve([])}function op(s){s=Ne(s>>>0);for(var c=Array(s.length),f=0;f<s.length;f++)c[f]=s[f];return Ve(c)}function ip(s){return Ve(dr(s>>>0))}function ap(){return Ve({})}function sp(s){for(var c=Ne(s>>>=0);c.length;){var f=c.pop();c.pop()(f)}An(s)}function up(s,c,f){c>>>=0,f>>>=0,s=Ne(s>>>0),c=Ne(c),f=Ne(f),s[c]=f}function lp(s,c){return c>>>=0,s=(s=zn(s>>>0,"_emval_take_value")).readValueFromPointer(c),Ve(s)}function dp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getUTCSeconds(),i()[c+4>>>2>>>0]=s.getUTCMinutes(),i()[c+8>>>2>>>0]=s.getUTCHours(),i()[c+12>>>2>>>0]=s.getUTCDate(),i()[c+16>>>2>>>0]=s.getUTCMonth(),i()[c+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[c+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[c+28>>>2>>>0]=s}var zt=s=>s%4==0&&(s%100!=0||s%400==0),xi=[0,31,60,91,121,152,182,213,244,274,305,335],Si=[0,31,59,90,120,151,181,212,243,273,304,334];function cp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getSeconds(),i()[c+4>>>2>>>0]=s.getMinutes(),i()[c+8>>>2>>>0]=s.getHours(),i()[c+12>>>2>>>0]=s.getDate(),i()[c+16>>>2>>>0]=s.getMonth(),i()[c+20>>>2>>>0]=s.getFullYear()-1900,i()[c+24>>>2>>>0]=s.getDay();var f=(zt(s.getFullYear())?xi:Si)[s.getMonth()]+s.getDate()-1|0;i()[c+28>>>2>>>0]=f,i()[c+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var g=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=g&&s.getTimezoneOffset()==Math.min(g,f)),i()[c+32>>>2>>>0]=s}function pp(s){s>>>=0;var c=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],g=c.getTimezoneOffset(),_=new Date(c.getFullYear(),6,1).getTimezoneOffset(),I=new Date(c.getFullYear(),0,1).getTimezoneOffset(),B=Math.min(I,_);return 0>f?i()[s+32>>>2>>>0]=+(_!=I&&B==g):0<f!=(B==g)&&(_=Math.max(I,_),c.setTime(c.getTime()+6e4*((0<f?B:_)-g))),i()[s+24>>>2>>>0]=c.getDay(),f=(zt(c.getFullYear())?xi:Si)[c.getMonth()]+c.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=c.getSeconds(),i()[s+4>>>2>>>0]=c.getMinutes(),i()[s+8>>>2>>>0]=c.getHours(),i()[s+12>>>2>>>0]=c.getDate(),i()[s+16>>>2>>>0]=c.getMonth(),i()[s+20>>>2>>>0]=c.getYear(),s=c.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function Ti(s,c,f,g,_,I,B){return b?xe(16,1,s,c,f,g,_,I,B):-52}function Ii(s,c,f,g,_,I){if(b)return xe(17,1,s,c,f,g,_,I)}function mp(s,c,f,g){s>>>=0,c>>>=0,f>>>=0,g>>>=0;var _=new Date().getFullYear(),I=new Date(_,0,1),B=new Date(_,6,1);_=I.getTimezoneOffset();var M=B.getTimezoneOffset(),L=Math.max(_,M);a()[s>>>2>>>0]=60*L,i()[c>>>2>>>0]=+(_!=M),I=(s=H=>H.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),B=s(B),M<_?(Pt(I,f,17),Pt(B,g,17)):(Pt(I,g,17),Pt(B,f,17))}var Bn=[],Ci=(s,c)=>{Bn.length=0;for(var f;f=r()[s++>>>0];){var g=f!=105;c+=(g&=f!=112)&&c%8?4:0,Bn.push(f==112?a()[c>>>2>>>0]:f==106?j[c>>>3]:f==105?i()[c>>>2>>>0]:d()[c>>>3>>>0]),c+=g?8:4}return Bn};function fp(s,c,f){return s>>>=0,c=Ci(c>>>0,f>>>0),wn[s](...c)}function hp(s,c,f){return s>>>=0,c=Ci(c>>>0,f>>>0),wn[s](...c)}var gp=()=>{},bp=()=>Date.now();function yp(s,c){return K(Se(s>>>0,c>>>0))}var Ai,wp=()=>{throw wt+=1,"unwind"};function _p(){return 4294901760}Ai=()=>performance.timeOrigin+performance.now();var vp=()=>navigator.hardwareConcurrency;function $p(){return dt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function xp(s){s>>>=0;var c=r().length;if(s<=c||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var g=c*(1+.2/f);g=Math.min(g,s+100663296);var _=Math;g=Math.max(s,g);e:{_=(_.min.call(_,4294901760,g+(65536-g%65536)%65536)-se.buffer.byteLength+65535)/65536;try{se.grow(_),be();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var cr=()=>(dt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ot={},ki=s=>{s.forEach(c=>{var f=cr();f&&(Ot[f]=c)})};function Sp(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),ki(s),Ot.Pb=cr(),Ot.ec=s,Ot.Pb}function Tp(s,c,f){if(s>>>=0,c>>>=0,Ot.Pb==s)var g=Ot.ec;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),ki(g);for(var _=3;g[_]&&cr()!=s;)++_;for(s=0;s<f&&g[s+_];++s)i()[c+4*s>>>2>>>0]=cr();return s}var Mn,Dn={},Ei=()=>{if(!Mn){var s,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:C||"./this.program"};for(s in Dn)Dn[s]===void 0?delete c[s]:c[s]=Dn[s];var f=[];for(s in c)f.push(`${s}=${c[s]}`);Mn=f}return Mn};function Pi(s,c){if(b)return xe(18,1,s,c);s>>>=0,c>>>=0;var f=0;return Ei().forEach((g,_)=>{var I=c+f;for(_=a()[s+4*_>>>2>>>0]=I,I=0;I<g.length;++I)t()[_++>>>0]=g.charCodeAt(I);t()[_>>>0]=0,f+=g.length+1}),0}function zi(s,c){if(b)return xe(19,1,s,c);s>>>=0,c>>>=0;var f=Ei();a()[s>>>2>>>0]=f.length;var g=0;return f.forEach(_=>g+=_.length+1),a()[c>>>2>>>0]=g,0}function Oi(s){return b?xe(20,1,s):52}function Bi(s,c,f,g){return b?xe(21,1,s,c,f,g):52}function Mi(s,c,f,g){return b?xe(22,1,s,c,f,g):70}var Ip=[null,[],[]];function Di(s,c,f,g){if(b)return xe(23,1,s,c,f,g);c>>>=0,f>>>=0,g>>>=0;for(var _=0,I=0;I<f;I++){var B=a()[c>>>2>>>0],M=a()[c+4>>>2>>>0];c+=8;for(var L=0;L<M;L++){var H=r()[B+L>>>0],Q=Ip[s];H===0||H===10?((s===1?q:K)(Qo(Q,0)),Q.length=0):Q.push(H)}_+=M}return a()[g>>>2>>>0]=_,0}var Ri=[31,29,31,30,31,30,31,31,30,31,30,31],Ui=[31,28,31,30,31,30,31,31,30,31,30,31],Cp=(s,c)=>{t().set(s,c>>>0)};function Ni(s,c,f,g){function _(z,le,Te){for(z=typeof z=="number"?z.toString():z||"";z.length<le;)z=Te[0]+z;return z}function I(z,le){return _(z,le,"0")}function B(z,le){function Te(Ji){return 0>Ji?-1:0<Ji?1:0}var vt;return(vt=Te(z.getFullYear()-le.getFullYear()))===0&&(vt=Te(z.getMonth()-le.getMonth()))===0&&(vt=Te(z.getDate()-le.getDate())),vt}function M(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function L(z){var le=z.Bb;for(z=new Date(new Date(z.Cb+1900,0,1).getTime());0<le;){var Te=z.getMonth(),vt=(zt(z.getFullYear())?Ri:Ui)[Te];if(!(le>vt-z.getDate())){z.setDate(z.getDate()+le);break}le-=vt-z.getDate()+1,z.setDate(1),11>Te?z.setMonth(Te+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Te=new Date(z.getFullYear()+1,0,4),le=M(new Date(z.getFullYear(),0,4)),Te=M(Te),0>=B(le,z)?0>=B(Te,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,c>>>=0,f>>>=0,g>>>=0;var H=a()[g+40>>>2>>>0];for(var Q in g={kc:i()[g>>>2>>>0],jc:i()[g+4>>>2>>>0],Hb:i()[g+8>>>2>>>0],Lb:i()[g+12>>>2>>>0],Ib:i()[g+16>>>2>>>0],Cb:i()[g+20>>>2>>>0],ub:i()[g+24>>>2>>>0],Bb:i()[g+28>>>2>>>0],rc:i()[g+32>>>2>>>0],ic:i()[g+36>>>2>>>0],lc:H?Se(H):""},f=Se(f),H={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(Q,"g"),H[Q]);var ce="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ge="January February March April May June July August September October November December".split(" ");for(Q in H={"%a":z=>ce[z.ub].substring(0,3),"%A":z=>ce[z.ub],"%b":z=>ge[z.Ib].substring(0,3),"%B":z=>ge[z.Ib],"%C":z=>I((z.Cb+1900)/100|0,2),"%d":z=>I(z.Lb,2),"%e":z=>_(z.Lb,2," "),"%g":z=>L(z).toString().substring(2),"%G":L,"%H":z=>I(z.Hb,2),"%I":z=>((z=z.Hb)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var le=0,Te=0;Te<=z.Ib-1;le+=(zt(z.Cb+1900)?Ri:Ui)[Te++]);return I(z.Lb+le,3)},"%m":z=>I(z.Ib+1,2),"%M":z=>I(z.jc,2),"%n":()=>`
`,"%p":z=>0<=z.Hb&&12>z.Hb?"AM":"PM","%S":z=>I(z.kc,2),"%t":()=>"	","%u":z=>z.ub||7,"%U":z=>I(Math.floor((z.Bb+7-z.ub)/7),2),"%V":z=>{var le=Math.floor((z.Bb+7-(z.ub+6)%7)/7);if(2>=(z.ub+371-z.Bb-2)%7&&le++,le)le==53&&((Te=(z.ub+371-z.Bb)%7)==4||Te==3&&zt(z.Cb)||(le=1));else{le=52;var Te=(z.ub+7-z.Bb-1)%7;(Te==4||Te==5&&zt(z.Cb%400-1))&&le++}return I(le,2)},"%w":z=>z.ub,"%W":z=>I(Math.floor((z.Bb+7-(z.ub+6)%7)/7),2),"%y":z=>(z.Cb+1900).toString().substring(2),"%Y":z=>z.Cb+1900,"%z":z=>{var le=0<=(z=z.ic);return z=Math.abs(z)/60,(le?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.lc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),H)f.includes(Q)&&(f=f.replace(new RegExp(Q,"g"),H[Q](g)));return Q=function(z){var le=Array(Sn(z)+1);return ei(z,le,0,le.length),le}(f=f.replace(/\0\0/g,"%")),Q.length>c?0:(Cp(Q,s),Q.length-1)}function Ap(s,c,f,g){return Ni(s>>>0,c>>>0,f>>>0,g>>>0)}b||function(){for(var s=u.numThreads-1;s--;)jo();Ke.unshift(()=>{Gt++,function(c){b?c():Promise.all(ct.map(qo)).then(c)}(()=>Mo())})}();for(var Vi=Array(256),pr=0;256>pr;++pr)Vi[pr]=String.fromCharCode(pr);pi=Vi,pt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>st.length/2-5-Cn.length;var kp=[$n,Lo,Ko,Xo,Jo,ti,ri,ni,oi,ii,ai,si,ui,li,di,ci,Ti,Ii,Pi,zi,Oi,Bi,Mi,Di],Z=function(){function s(f,g){return Z=f.exports,Z=function(){var _=Z,I={};for(let[B,M]of Object.entries(_))I[B]=typeof M=="function"?(...L)=>{ur.push(B);try{return M(...L)}finally{we||(ur.pop(),Qe&&ft===1&&ur.length===0&&(ft=0,wt+=1,sr(Yi),typeof Fibers<"u"&&Fibers.sc()))}}:M;return I}(),Z=function(){var _=Z,I=M=>L=>M(L)>>>0,B=M=>()=>M()>>>0;return(_=Object.assign({},_)).Ca=I(_.Ca),_.fb=B(_.fb),_.hb=I(_.hb),_.emscripten_main_runtime_thread_id=B(_.emscripten_main_runtime_thread_id),_.sb=I(_.sb),_.tb=B(_.tb),_}(),Go.push(Z.ib),Lt.unshift(Z.Ba),X=g,Mo(),Z}var c=Vo();if(Gt++,u.instantiateWasm)try{return u.instantiateWasm(c,s)}catch(f){K(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return yn||=u.locateFile?Do("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,g){var _=yn;return O||typeof WebAssembly.instantiateStreaming!="function"||Do(_)||Ro(_)||typeof fetch!="function"?No(_,f,g):fetch(_,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(g,function(B){return K(`wasm streaming compile failed: ${B}`),K("falling back to ArrayBuffer instantiation"),No(_,f,g)}))}(c,function(f){s(f.instance,f.module)}).catch(m),{}}(),Wi=s=>(Wi=Z.Ca)(s),Li=()=>(Li=Z.Da)();u._OrtInit=(s,c)=>(u._OrtInit=Z.Ea)(s,c),u._OrtGetLastError=(s,c)=>(u._OrtGetLastError=Z.Fa)(s,c),u._OrtCreateSessionOptions=(s,c,f,g,_,I,B,M,L,H)=>(u._OrtCreateSessionOptions=Z.Ga)(s,c,f,g,_,I,B,M,L,H),u._OrtAppendExecutionProvider=(s,c)=>(u._OrtAppendExecutionProvider=Z.Ha)(s,c),u._OrtAddFreeDimensionOverride=(s,c,f)=>(u._OrtAddFreeDimensionOverride=Z.Ia)(s,c,f),u._OrtAddSessionConfigEntry=(s,c,f)=>(u._OrtAddSessionConfigEntry=Z.Ja)(s,c,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=Z.Ka)(s),u._OrtCreateSession=(s,c,f)=>(u._OrtCreateSession=Z.La)(s,c,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=Z.Ma)(s),u._OrtGetInputOutputCount=(s,c,f)=>(u._OrtGetInputOutputCount=Z.Na)(s,c,f),u._OrtGetInputName=(s,c)=>(u._OrtGetInputName=Z.Oa)(s,c),u._OrtGetOutputName=(s,c)=>(u._OrtGetOutputName=Z.Pa)(s,c),u._OrtFree=s=>(u._OrtFree=Z.Qa)(s),u._OrtCreateTensor=(s,c,f,g,_,I)=>(u._OrtCreateTensor=Z.Ra)(s,c,f,g,_,I),u._OrtGetTensorData=(s,c,f,g,_)=>(u._OrtGetTensorData=Z.Sa)(s,c,f,g,_),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=Z.Ta)(s),u._OrtCreateRunOptions=(s,c,f,g)=>(u._OrtCreateRunOptions=Z.Ua)(s,c,f,g),u._OrtAddRunConfigEntry=(s,c,f)=>(u._OrtAddRunConfigEntry=Z.Va)(s,c,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=Z.Wa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=Z.Xa)(s),u._OrtBindInput=(s,c,f)=>(u._OrtBindInput=Z.Ya)(s,c,f),u._OrtBindOutput=(s,c,f,g)=>(u._OrtBindOutput=Z.Za)(s,c,f,g),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=Z._a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=Z.$a)(s),u._OrtRunWithBinding=(s,c,f,g,_)=>(u._OrtRunWithBinding=Z.ab)(s,c,f,g,_),u._OrtRun=(s,c,f,g,_,I,B,M)=>(u._OrtRun=Z.bb)(s,c,f,g,_,I,B,M),u._OrtEndProfiling=s=>(u._OrtEndProfiling=Z.cb)(s),u._JsepOutput=(s,c,f)=>(u._JsepOutput=Z.db)(s,c,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=Z.eb)(s);var mr,Bt=()=>(Bt=Z.fb)(),Xe=u._free=s=>(Xe=u._free=Z.gb)(s),fr=u._malloc=s=>(fr=u._malloc=Z.hb)(s),Rn=(s,c,f,g,_,I)=>(Rn=Z.kb)(s,c,f,g,_,I),Gi=()=>(Gi=Z.lb)(),Hi=(s,c,f,g,_)=>(Hi=Z.mb)(s,c,f,g,_),Un=s=>(Un=Z.nb)(s),hr=s=>(hr=Z.ob)(s),Fi=()=>(Fi=Z.pb)(),qi=(s,c)=>(qi=Z.qb)(s,c),gr=s=>(gr=Z.rb)(s),Nn=s=>(Nn=Z.sb)(s),Vn=()=>(Vn=Z.tb)(),ji=u.dynCall_ii=(s,c)=>(ji=u.dynCall_ii=Z.vb)(s,c),Ki=s=>(Ki=Z.wb)(s),Yi=()=>(Yi=Z.xb)(),Zi=s=>(Zi=Z.yb)(s),Qi=()=>(Qi=Z.zb)();function Xi(){0<Gt||(b?(p(u),b||ir(Lt),startWorker(u)):(ir(Ke),0<Gt||mr||(mr=!0,u.calledRun=!0,we||(b||ir(Lt),p(u),b||ir(gn)))))}return u.___start_em_js=884939,u.___stop_em_js=885185,u.stackSave=()=>Vn(),u.stackRestore=s=>gr(s),u.stackAlloc=s=>Nn(s),u.setValue=function(s,c,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":t()[s>>>0]=c;break;case"i16":n()[s>>>1>>>0]=c;break;case"i32":i()[s>>>2>>>0]=c;break;case"i64":j[s>>>3]=BigInt(c);break;case"float":l()[s>>>2>>>0]=c;break;case"double":d()[s>>>3>>>0]=c;break;case"*":a()[s>>>2>>>0]=c;break;default:dt(`invalid type for setValue: ${f}`)}},u.getValue=function(s,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return t()[s>>>0];case"i16":return n()[s>>>1>>>0];case"i32":return i()[s>>>2>>>0];case"i64":return j[s>>>3];case"float":return l()[s>>>2>>>0];case"double":return d()[s>>>3>>>0];case"*":return a()[s>>>2>>>0];default:dt(`invalid type for getValue: ${c}`)}},u.UTF8ToString=Se,u.stringToUTF8=Pt,u.lengthBytesUTF8=Sn,Ht=function s(){mr||Xi(),mr||(Ht=s)},Xi(),u.PTR_SIZE=4,h}),Np=Ba;globalThis.self?.name==="em-pthread"&&Ba()});var Mt,Vp,Wp,Lp,Ra,Ua,Gp,Na,jt=U(()=>{"use strict";Ir();Mt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Vp=!1||typeof location>"u"?void 0:location.origin,Wp=(e,t)=>{try{let r=t??Mt;return(r?new URL(e,r):new URL(e)).origin===Vp}catch{return!1}},Lp=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Ra=(Oa(),br(za)).default,Ua=async()=>{if(!Mt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Wp(Mt))return[void 0,Ra()];let e=await Lp(Mt);return[e,Ra(e)]},Gp=(Da(),br(Ma)).default,Na=async(e,t,r)=>[void 0,Gp]});var Yn,Zn,Mr,Va,Hp,Fp,Cr,Ie,ht=U(()=>{"use strict";jt();Zn=!1,Mr=!1,Va=!1,Hp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Fp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Cr=async e=>{if(Zn)return Promise.resolve();if(Mr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Va)throw new Error("previous call to 'initializeWebAssembly()' failed.");Mr=!0;let t=e.initTimeout,r=e.numThreads;if(!Fp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let n=Hp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let o=e.wasmPaths,i=typeof o=="string"?o:void 0,a=o?.mjs,l=a?.href??a,d=o?.wasm,p=d?.href??d,m=e.wasmBinary,[u,h]=await Na(l,i,r>1),w=!1,y=[];if(t>0&&y.push(new Promise(b=>{setTimeout(()=>{w=!0,b()},t)})),y.push(new Promise((b,S)=>{let $={numThreads:r};m?$.wasmBinary=m:(p||i)&&($.locateFile=(v,x)=>p??(i??x)+v),h($).then(v=>{Mr=!1,Zn=!0,Yn=v,b(),u&&URL.revokeObjectURL(u)},v=>{Mr=!1,Va=!0,S(v)})})),await Promise.race(y),w)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(Zn&&Yn)return Yn;throw new Error("WebAssembly is not initialized yet.")}});var Ae,Yt,pe,Dr=U(()=>{"use strict";ht();Ae=(e,t)=>{let r=Ie(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Yt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Yt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},pe=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),l=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}});var Wa,La=U(()=>{"use strict";ht();Dr();Wa=e=>{let t=Ie(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=Ae(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&pe("Can't create run options."),e?.extra!==void 0&&Yt(e.extra,"",new WeakSet,(a,l)=>{let d=Ae(a,n),p=Ae(l,n);t._OrtAddRunConfigEntry(r,d,p)!==0&&pe(`Can't set a run config entry: ${a} - ${l}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var qp,jp,Kp,Yp,Ga,Ha=U(()=>{"use strict";ht();Dr();qp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},jp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Kp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Yp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let l=n?.deviceType;if(l){let d=Ae("deviceType",r),p=Ae(l,r);Ie()._OrtAddSessionConfigEntry(e,d,p)!==0&&pe(`Can't set a session config entry: 'deviceType' - ${l}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let l=Ae("preferredLayout",r),d=Ae(a.preferredLayout,r);Ie()._OrtAddSessionConfigEntry(e,l,d)!==0&&pe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ae(o,r);Ie()._OrtAppendExecutionProvider(e,i)!==0&&pe(`Can't append execution provider: ${o}.`)}},Ga=e=>{let t=Ie(),r=0,n=[],o=e||{};Kp(o);try{let i=qp(o.graphOptimizationLevel??"all"),a=jp(o.executionMode??"sequential"),l=typeof o.logId=="string"?Ae(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let m=typeof o.optimizedModelFilePath=="string"?Ae(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,l,d,p,m),r===0&&pe("Can't create session options."),o.executionProviders&&Yp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=Ae("enableGraphCapture",n),h=Ae(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&pe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let w=Ae(u,n);t._OrtAddFreeDimensionOverride(r,w,h)!==0&&pe(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Yt(o.extra,"",new WeakSet,(u,h)=>{let w=Ae(u,n),y=Ae(h,n);t._OrtAddSessionConfigEntry(r,w,y)!==0&&pe(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Zt,gt,Tt,Rr,Qt,Ur,Nr,Qn,te=U(()=>{"use strict";Zt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},gt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Rr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Qt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Ur=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Nr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Qn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Xt,Xn=U(()=>{"use strict";Ir();Xt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=Ln("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=Ln("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(l){if(l instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let a=0;for(;;){let{done:l,value:d}=await o.read();if(l)break;let p=d.byteLength;new Uint8Array(i,a,p).set(d),a+=p}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Zp,Qp,Fa,qa,Vr,Xp,ue,Je=U(()=>{"use strict";te();Zp=["V","I","W","E","F"],Qp=(e,t)=>{console.log(`[${Zp[e]},${new Date().toISOString()}]${t}`)},Vr=(e,t)=>{Fa=e,qa=t},Xp=(e,t)=>{let r=Qt(e),n=Qt(Fa);r>=n&&Qp(r,typeof t=="function"?t():t)},ue=(...e)=>{qa&&Xp(...e)}});var Wr,Jn=U(()=>{"use strict";te();Wr=(e,t)=>new(Rr(t))(e)});var Lr=U(()=>{"use strict"});var ja,eo,to,Jp,em,Ka,no,ro,Za,Qa=U(()=>{"use strict";Je();Lr();ja=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),eo=[],to=e=>Math.ceil(Number(e)/16)*16,Jp=e=>{for(let t=0;t<eo.length;t++){let r=eo[t];if(e<=r)return r}return Math.ceil(e/16)*16},em=1,Ka=()=>em++,no=async(e,t,r,n)=>{let o=to(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},ro=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of ja)eo.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=to(i),l=this.storageCache.get(t);if(!l)throw new Error("gpu data for uploading does not exist");if(Number(l.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${l.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=d.getMappedRange();new Uint8Array(p).set(new Uint8Array(n,o,i)),d.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(d,0,l.gpuData.buffer,0,a),this.backend.device.queue.submit([m.finish()]),d.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=to(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Ka();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=Jp(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let p=(i?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let l={id:Ka(),type:0,buffer:o};return this.storageCache.set(l.id,{gpuData:l,originalSize:Number(t)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${l.id}`),l}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await no(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=ja.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Za=(...e)=>new ro(...e)});var oo,re,Ce=U(()=>{"use strict";oo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new oo(e)});var io,et,k,It,Gr,Xa,Ja,oe=U(()=>{"use strict";io=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),l=new Array(a);if(n){if(o<2||i<2)return;let d=io.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[l[a-2],l[a-1]]=d}for(let d=n?3:1;d<=a;d++){let p=o-d<0?1:t[o-d],m=i-d<0?1:r[i-d];if(p!==m&&p>1&&m>1)return;let u=Math.max(p,m);if(p&&m)l[a-d]=Math.max(p,m);else{if(u>1)return;l[a-d]=0}}return l}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},It=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=n.length?n.push(r[l+2]):n[l]=r[l+2];for(let l=0;l<n.length;l++)if(l<o.length){if(o[l]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let l=0;l<n.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<n.length*2;l++)if(l<a.length){if(a[l]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let l=0;l<n.length;l++){if(n[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[l]>=n[l]||a[l+n.length]>=n[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,n,o,i,a,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,l),d}static computeConvOutputShape(t,r,n,o,i,a,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,l),d}static computeShapeHelper(t,r,n,o,i,a,l,d){if(t)for(let p=0;p<r.length-2;p++)n.push(1);else for(let p=0;p<r.length-2;p++)n.push(e.adjustPadAndReturnShape(r[p+2],o[p],i[p],a[p],l,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,l,d){let p=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[l]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(u+1)/2:u/2),i[l]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[l]-p)/r+1)}},Gr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,l,d;r?(a=t[1],l=t[0]):(a=t[0],l=t[1]);let p=-1;if(o?(d=n[0],p=1):(d=n[1],p=0),n[p]!==l)throw new Error("dimension mismatch");if(a<=0||d<=0||l<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,l]}},Xa=-34028234663852886e22,Ja=34028234663852886e22});var Ct,so,ye,ke,N,me,uo,At,He,F,lo,E,D,Hr,ao,es,ae=U(()=>{"use strict";te();oe();Ct=64,so=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},ye=(e,t=1)=>{let r=so(e,t);return typeof r=="string"?r:r[0]},ke=(e,t=1)=>{let r=so(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},me=e=>e%4===0?4:e%2===0?2:1,uo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,At=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,He=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,lo=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,l=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,p=so(t,o),m=typeof p=="string"?p:p[1],u=typeof p=="string"?p:p[0],h={indices:d,value:m,storage:u,tensor:t},w=V=>typeof V=="string"?V:`${V}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=i?"uniforms.":"",S=`${b}${e}_shape`,$=`${b}${e}_strides`,v="";for(let V=0;V<a-1;V++)v+=`
    let dim${V} = current / ${F($,V,a)};
    let rest${V} = current % ${F($,V,a)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;v+=`indices[${a-1}] = current;`;let x=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=V=>(y.offsetToIndices=!0,a<2?V:`o2i_${e}(${V})`),C=[];if(a>=2)for(let V=a-1;V>=0;V--)C.push(`${F($,V,a)} * (indices[${V}])`);let A=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=V=>(y.indicesToOffset=!0,a<2?V:`i2o_${e}(${V})`),O=(...V)=>a===0?"0u":`${h.indices}(${V.map(w).join(",")})`,R=(V,j)=>a<2?`${V}`:`${F(V,j,a)}`,G=(V,j,he)=>a<2?`${V}=${he};`:`${F(V,j,a)}=${he};`,q={},K=(V,j)=>{y.broadcastedIndicesToOffset=!0;let he=`${j.name}broadcastedIndicesTo${e}Offset`;if(he in q)return`${he}(${V})`;let Ge=[];for(let we=a-1;we>=0;we--){let be=j.indicesGet("outputIndices",we+j.rank-a);Ge.push(`${R($,we)} * (${be} % ${R(S,we)})`)}return q[he]=`fn ${he}(outputIndices: ${j.type.indices}) -> u32 {
             return ${Ge.length>0?Ge.join("+"):"0u"};
           }`,`${he}(${V})`},W=(V,j)=>(()=>{if(h.storage===h.value)return`${e}[${V}]=${j};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${j}), select(0u, 0xFFFFFFFFu, ${j} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${j}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${j}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),Y=V=>(()=>{if(h.storage===h.value)return`${e}[${V}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${V}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${V}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),se=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${Y(`i2o_${e}(indices)`)};
  }`,X=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),j=l.map(he=>`d${he}`).join(", ");return`
  fn get_${e}(${V}) -> ${m} {
    return get_${e}ByIndices(${O(j)});
  }`})(),ee=(...V)=>{if(V.length!==a)throw new Error(`indices length must be ${a}`);let j=V.map(w).join(",");return a===0?Y("0u"):a===1?Y(j[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${j})`)},J=V=>a<2?Y(V):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${V})`),ne=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,ve=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),j=l.map(he=>`d${he}`).join(", ");return`
  fn set_${e}(${V}, value: ${m}) {
    set_${e}ByIndices(${O(j)}, value);
  }`})();return{impl:()=>{let V=[],j=!1;return y.offsetToIndices&&(V.push(x),j=!0),y.indicesToOffset&&(V.push(A),j=!0),y.broadcastedIndicesToOffset&&(Object.values(q).forEach(he=>V.push(he)),j=!0),y.set&&(V.push(ve),j=!0),y.setByIndices&&(V.push(ne),j=!0),y.get&&(V.push(X),j=!0),y.getByIndices&&(V.push(se),j=!0),!i&&j&&V.unshift(`const ${S} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),V.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:K,indices:O,indicesGet:R,indicesSet:G,set:(...V)=>{if(V.length!==a+1)throw new Error(`indices length must be ${a}`);let j=V[a];if(typeof j!="string")throw new Error("value must be string");let he=V.slice(0,a).map(w).join(",");return a===0?W("0u",j):a===1?W(he[0],j):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${he}, ${j})`)},setByOffset:W,setByIndices:(V,j)=>a<2?W(V,j):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${j});`),get:ee,getByOffset:Y,getByIndices:J,usage:n,name:e,strides:$,shape:S,rank:a}},E=(e,t,r,n=1)=>lo(e,t,r,"input",n),D=(e,t,r,n=1)=>lo(e,t,r,"output",n),Hr=(e,t,r,n=1)=>lo(e,t,r,"internal",n),ao=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ct){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,l=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*n*o}u + local_idx;`;return`@compute @workgroup_size(${r}, ${n}, ${o})
  fn main(${a}) {
    ${l}
  `}appendVariableUniforms(t){t.rank!==0&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if(t.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let n=t.usage==="input"?"read":"read_write",o=t.type.storage;return`@group(0) @binding(${r}) var<storage, ${n}> ${t.name}: array<${o}>;`}declareVariables(...t){return t.map(r=>this.declareVariable(r,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if(t.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(r=>this.registerInternalVariable(r)),this}registerUniform(t,r,n=1){return this.uniforms.push({name:t,type:r,length:n}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let t=[];for(let{name:r,type:n,length:o}of this.uniforms)if(o&&o>4)n==="f16"?t.push(`@align(16) ${r}:array<mat2x4<${n}>, ${Math.ceil(o/8)}>`):t.push(`${r}:array<vec4<${n}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?n:`vec${o}<${n}>`;t.push(`${r}:${i}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},es=(e,t)=>new ao(e,t)});var tm,ts,rm,nm,om,Ee,rs,ns,ut=U(()=>{"use strict";te();oe();Ce();ae();tm=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},ts=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,rm=(e,t)=>k.sortBasedOnPerm(e,ts(e.length,t)),nm=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=r.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},om=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Ee=(e,t)=>{let r=e.dataType,n=e.dims.length,o=ts(n,t),i=rm(e.dims,o),{newShape:a,newPerm:l}=om(e.dims,o),d=k.areEqual(l,[2,3,1]),p=k.areEqual(l,[3,1,2]),m=a.length===2&&l[0]>l[1]||d||p,u=m?a:e.dims,h=i;m&&(u=d?[a[0],a[1]*a[2]]:p?[a[0]*a[1],a[2]]:a,h=[u[1],u[0]]);let w=E("a",r,u.length),y=D("output",r,h.length),b=16,S;return m?S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,y)}
  var<workgroup> tile : array<array<${y.type.value}, ${b+1}>, ${b}>;
  ${$.mainStart([b,b,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${b} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${b}u + local_id.x;
    let input_row = workgroup_id_x * ${b}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${b}u + local_id.x;
    let output_row = workgroup_id_y * ${b}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${y.setByIndices(`${y.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,y)}

  ${nm(o,n,w,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`,{name:m?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let $=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:m?{x:Math.ceil(h[1]/b),y:Math.ceil(h[0]/b)}:{x:Math.ceil($/64)},programUniforms:[{type:12,data:$},...N(u,h)]}},getShaderSource:S}},rs=(e,t)=>{tm(e.inputs),e.compute(Ee(e.inputs[0],t.perm))},ns=e=>re({perm:e.perm})});var im,am,sm,um,lm,dm,cm,pm,mm,fm,tt,os,is,as,ss,us,ls,ds,cs,ps,ms,fs=U(()=>{"use strict";te();oe();ae();Fr();ut();im={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},am={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},sm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},um={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},lm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},dm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},cm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},pm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},mm=(e,t)=>{let r=[];if(!pm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},fm=(e,t,r,n,o,i,a)=>{let l=r[0].dims,d=k.size(i),p=k.size(a),m=E("_A",r[0].dataType,l),u=D("output",o,i),h=64;d===1&&(h=256);let w=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=b=>`
        ${b.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${b.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${sm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${im[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${am[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${um[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:co(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((w,y)=>y));let a=k.normalizeAxes(i,e.inputs[0].dims.length),l=a,d=e.inputs[0],p=mm(l,e.inputs[0].dims.length);p.length>0&&(d=e.compute(Ee(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],l=lm(l.length,d.dims.length));let[m,u]=dm(d.dims,l),h=m;o.keepDims&&(h=cm(m,a)),e.compute(fm(t,o.cacheKey,[d],n,e.inputs[0].dataType,h,u),{inputs:[d]})},os=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},is=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},as=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},ss=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},us=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},ls=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},ds=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},cs=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},ps=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},ms=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,hm,qr,co,nt,gm,bm,ym,wm,_m,vm,$m,xm,Sm,Tm,ot,hs,gs,bs,ys,ws,_s,vs,$s,xs,Ss,Fr=U(()=>{"use strict";te();oe();Ce();ae();fs();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},hm=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qr=(e,t,r,n,o,i,a=!1,l=!1)=>{let d=[],p=r[0].dims,m=p.length,u=k.normalizeAxes(o,m),h=!l&&u.length===0;p.forEach((S,$)=>{h||u.indexOf($)>=0?a&&d.push(1):d.push(S)});let w=d.length,y=k.size(d);return{name:e,shaderCache:t,getShaderSource:S=>{let $=[],v=E("_A",r[0].dataType,m),x=D("output",i,w),T=n(v,x,u),C=T[2];for(let A=0,P=0;A<m;A++)h||u.indexOf(A)>=0?(a&&P++,C=`for(var j${A}: u32 = 0; j${A} < ${p[A]}; j${A}++) {
                  ${T[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):($.push(`${v.indicesSet("input_indices",A,x.indicesGet("output_indices",P))};`),P++);return`

        ${S.registerUniform("output_size","u32").declareVariables(v,x)}

        ${S.mainStart()}
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?x.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...N(p,d)]})}},co=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),re({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:co(o,r);e.compute(qr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?hm:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},gm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},bm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},ym=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},wm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},_m=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",l,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},vm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&(a*=e.inputs[0].dims[l]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},$m=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},xm=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Sm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Tm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},hs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vm(e,t):os(e,t)},gs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bm(e,t):is(e,t)},bs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ym(e,t):as(e,t)},ys=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wm(e,t):ss(e,t)},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_m(e,t):us(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$m(e,t):ls(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xm(e,t):ds(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sm(e,t):cs(e,t)},xs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tm(e,t):ps(e,t)},Ss=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?gm(e,t):ms(e,t)}});var Ts,Is,Cs,po,As=U(()=>{"use strict";te();Ce();Fr();Ts=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Is=(e,t)=>{Ts(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Cs=(e,t)=>{Ts(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},po=e=>re(e)});var Im,mo,Cm,Am,km,Rt,Em,ks,jr=U(()=>{"use strict";te();oe();Lr();ae();Im=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],l=e[5];if(a&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,w=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of t.qkvHiddenSizes)if(x%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let y=p;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let b=0;if(a){if(h!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(b=a.dims[3])}let S=y+b,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[2]!==p||l.dims[3]!==S)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:b,kvSequenceLength:y,totalSequenceLength:S,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},mo=(e,t,r)=>t&&e?`
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
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Cm=(e,t,r,n,o,i,a,l)=>{let d=me(a?1:i),p=64,m=i/d;m<p&&(p=32);let u=Math.ceil(i/d/p),h=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:u}],w=ye(e.dataType,d),y=ke(1,d),b=["type"];a&&b.push("type"),l&&b.push("type");let S=$=>{let v=D("x",e.dataType,e.dims,d),x=[v],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&x.push(T);let C=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;C&&x.push(C);let A=ke(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(P).declareVariables(...x)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${mo(T,C,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${a?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${v.type.value}(${A}(1.0) / ${A}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${v.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${a?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${v.type.value}(${A}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${w};${d}`,inputDependencies:b},getShaderSource:S,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/p),y:o,z:t*r},programUniforms:h})}},Am=(e,t,r,n,o,i,a,l,d)=>{let p=a+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,p],u=e>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,w=u?[i.batchSize,h,p,i.headSize]:void 0,y=i.nReps?i.nReps:1,b=i.scale===0?1/Math.sqrt(i.headSize):i.scale,S=me(i.headSize),$=i.headSize/S,v=12,x={x:Math.ceil(p/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:b},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],C=u&&n&&k.size(n.dims)>0,A=["type","type"];C&&A.push("type"),o&&A.push("type"),l&&A.push("type"),d&&A.push("type");let P=[{dims:m,dataType:t.dataType,gpuDataType:0}];u&&P.push({dims:w,dataType:t.dataType,gpuDataType:0});let O=R=>{let G=E("q",t.dataType,t.dims,S),q=E("key",r.dataType,r.dims,S),K=[G,q];if(C){let ne=E("past_key",n.dataType,n.dims,S);K.push(ne)}o&&K.push(E("attention_bias",o.dataType,o.dims));let W=l?E("seq_lens",l.dataType,l.dims):void 0;W&&K.push(W);let Y=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;Y&&K.push(Y);let se=D("output",t.dataType,m),X=[se];u&&X.push(D("present_key",t.dataType,w,S));let ee=ke(1,S),J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${G.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${G.type.storage}, ${v*v}>;
  ${R.registerUniforms(J).declareVariables(...K,...X)}
  ${R.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${mo(W,Y,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&u?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${u?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${ee}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>C&&u?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${u?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${ee}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(S){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${S}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${S};${o!==void 0};${n!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:P,dispatchGroup:x,programUniforms:T}),getShaderSource:O}},km=(e,t,r,n,o,i,a=void 0,l=void 0)=>{let d=i+o.kvSequenceLength,p=o.nReps?o.nReps:1,m=o.vHiddenSize*p,u=e>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,w=u?[o.batchSize,h,d,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,m],b=12,S={x:Math.ceil(o.vHeadSize/b),y:Math.ceil(o.sequenceLength/b),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=u&&n&&k.size(n.dims)>0,x=["type","type"];v&&x.push("type"),a&&x.push("type"),l&&x.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];u&&T.push({dims:w,dataType:t.dataType,gpuDataType:0});let C=A=>{let P=E("probs",t.dataType,t.dims),O=E("v",r.dataType,r.dims),R=[P,O];v&&R.push(E("past_value",n.dataType,n.dims));let G=a?E("seq_lens",a.dataType,a.dims):void 0;a&&R.push(G);let q=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;l&&R.push(q);let W=[D("output",t.dataType,y)];u&&W.push(D("present_value",t.dataType,w));let Y=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;
  var<workgroup> tileQ: array<${P.type.value}, ${b*b}>;
  var<workgroup> tileV: array<${P.type.value}, ${b*b}>;
  ${A.registerUniforms(Y).declareVariables(...R,...W)}
  ${A.mainStart([b,b,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${mo(G,q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${v&&u?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${u?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${P.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>v&&u?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${u?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:x},getRunData:()=>({outputs:T,dispatchGroup:S,programUniforms:$}),getShaderSource:C}},Rt=(e,t,r,n,o,i,a,l,d,p,m=void 0,u=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(l?1:0)),w=h>1?p.pastSequenceLength:0,y=w+p.kvSequenceLength,b=d&&k.size(d.dims)>0?d:void 0,S=[t,r];h>1&&a&&k.size(a.dims)>0&&S.push(a),b&&S.push(b),m&&S.push(m),u&&S.push(u);let $=e.compute(Am(h,t,r,a,b,p,w,m,u),{inputs:S,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Cm($,p.batchSize,p.numHeads,w,p.sequenceLength,y,m,u),{inputs:m&&u?[$,m,u]:[$],outputs:[]});let v=[$,n];h>1&&l&&k.size(l.dims)>0&&v.push(l),m&&v.push(m),u&&v.push(u),e.compute(km(h,$,n,l,p,w,m,u),{inputs:v,outputs:h>1?[0,2]:[0]})},Em=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,l={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=D("output_q",d[0].dataType,r),w=D("output_k",d[0].dataType,r),y=D("output_v",d[0].dataType,r),b=E("input",d[0].dataType,d[0].dims),S=E("weight",d[1].dataType,d[1].dims),$=E("bias",d[2].dataType,d[2].dims),v=b.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(x).declareVariables(b,S,$,h,w,y)}
  ${u.mainStart([a,a,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${v}(0);
    var valueK = ${v}(0);
    var valueV = ${v}(0);
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},ks=(e,t)=>{let r=Im(e.inputs,t),[n,o,i]=Em(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Pm,zm,Om,Es,Ps=U(()=>{"use strict";We();te();oe();Ce();ae();Pm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((l,d)=>{if(l!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},zm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?me(i[i.length-1]):1,l=o==="NHWC"&&i.length>1?a:1,d=k.size(i)/a,p=n,m=p?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,l),w=E("bias",e[2].dataType,e[2].dims,l),y=E("inputMean",e[3].dataType,e[3].dims,l),b=E("inputVar",e[4].dataType,e[4].dims,l),S=D("y",e[0].dataType,m,a),$=()=>{let x="";if(n)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${S.indicesSet("outputIndices","0","0")}
            let cOffset = ${S.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)x+=`cIndices[${T}] = outputIndices[${T}];`;x+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return x},v=x=>`
  const epsilon = ${r};
  ${x.registerUniform("outputSize","u32").declareVariables(u,h,w,y,b,S)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${S.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${b.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${S.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...N(i)]:[{type:12,data:d}]})}},Om=e=>re(e),Es=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Om({...t,outputCount:n});if(_e.webgpu.validateInputContent&&Pm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(zm(r,o))}});var Bm,Mm,zs,Os=U(()=>{"use strict";oe();ae();Bm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Mm=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),l=E("residual",o,t,4),d=D("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,l,d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},zs=e=>{Bm(e.inputs),e.compute(Mm(e.inputs))}});var Dm,fe,Bs,Ms,Ds,Rs,Us,Ns,Vs,Ws,Ls,Rm,Gs,Hs,Fs,qs,Jt,js,Kr,Ks,Ys,Zs,Qs,Xs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,lu,du,cu,fo,ho,pu,mu,fu,Um,Nm,hu,Yr=U(()=>{"use strict";te();oe();Ce();ae();Dm=(e,t,r,n,o,i,a)=>{let l=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let p=E("inputData",r,[l],4),m=D("outputData",n,[l],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(p,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},fe=(e,t,r,n,o,i=e.dataType,a,l)=>{let d=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Dm(p,k.size(e.dims),e.dataType,i,r,n,l),getRunData:p=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(p[0].dims)/64/4)},programUniforms:d})}},Bs=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Ms=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},Ds=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Rs=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Us=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Ns=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},Vs=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},Ws=e=>re(e),Ls=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Rm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:r})},Gs=(e,t)=>{let r=t||Rm(e.inputs),n=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},Hs=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},Fs=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},qs=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},Jt=e=>re(e),js=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Kr=(e="f32")=>`
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
}`,Ks=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Kr(t)))},Ys=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},Zs=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},Qs=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Kr(t)))},Xs=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Js=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},eu=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},tu=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},ru=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},nu=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ou=e=>re(e),iu=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},au=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},su=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},uu=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},lu=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},du=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,cu=e=>{e.compute(fe(e.inputs[0],"Tanh",du))},fo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${du("v")};
}
`,ho=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,pu=e=>{let t=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",ho,fo(t),void 0,e.inputs[0].dataType))},mu=(e,t)=>{let r=ke(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},fu=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Um=(e,t)=>`
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
`,Nm=e=>`quick_gelu_impl(${e})`,hu=(e,t)=>{let r=ke(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Nm,Um(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Vm,Wm,bu,yu=U(()=>{"use strict";oe();ae();Yr();Vm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Wm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=D("output",e[0].dataType,t,4),i=k.size(t)/4,a=ye(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Kr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},bu=e=>{Vm(e.inputs),e.compute(Wm(e.inputs))}});var Lm,Gm,it,wu,_u,vu,$u,xu,Su,Tu,Iu,Cu,Au,ku=U(()=>{"use strict";te();oe();ae();Lm=(e,t,r,n,o,i,a,l,d,p,m,u)=>{let h,w;typeof l=="string"?h=w=(v,x)=>`${l}((${v}),(${x}))`:typeof l=="function"?h=w=l:(h=l.scalar,w=l.vector);let y=D("outputData",m,n.length,4),b=E("aData",d,t.length,4),S=E("bData",p,r.length,4),$;if(o)if(i){let v=k.size(t)===1,x=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;v||x?$=y.setByOffset("global_idx",w(v?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"),x?`${S.type.value}(${S.getByOffset("0")}.x)`:S.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${b.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${S.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",w(a||T?b.getByOffset("offsetA / 4u"):`${b.type.value}(${b.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?S.getByOffset("offsetB / 4u"):`${S.type.value}(${S.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",w(b.getByOffset("global_idx"),S.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(x,T,C="")=>{let A=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${b.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${S.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${x}[${T}] = ${C}(${h(A,P)});
          `};m===9?$=`
            var data = vec4<u32>(0);
            ${v("data",0,"u32")}
            ${v("data",1,"u32")}
            ${v("data",2,"u32")}
            ${v("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:$=`
            ${v("outputData[global_idx]",0)}
            ${v("outputData[global_idx]",1)}
            ${v("outputData[global_idx]",2)}
            ${v("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(b,S,y)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},Gm=(e,t,r,n,o,i,a=r.dataType)=>{let l=r.dims.map(b=>Number(b)??1),d=n.dims.map(b=>Number(b)??1),p=!k.areEqual(l,d),m=l,u=k.size(l),h=!1,w=!1,y=[p];if(p){let b=et.calcShape(l,d,!1);if(!b)throw new Error("Can't perform binary op on the given tensors");m=b.slice(),u=k.size(m);let S=k.size(l)===1,$=k.size(d)===1,v=l.length>0&&l[l.length-1]%4===0,x=d.length>0&&d[d.length-1]%4===0;y.push(S),y.push($),y.push(v),y.push(x);let T=1;for(let C=1;C<m.length;C++){let A=l[l.length-C],P=d[d.length-C];if(A===P)T*=A;else break}T%4===0?(w=!0,h=!0):(S||$||v||x)&&(h=!0)}else h=!0;return y.push(h),{name:e,shaderCache:{hint:t+y.map(b=>b.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:b=>Lm(b,l,d,m,h,p,w,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:m,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(m)/4)},...N(l,d,m)]})}},it=(e,t,r,n,o,i)=>{e.compute(Gm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},wu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},_u=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},vu=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},$u=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},xu=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Su=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},Tu=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Iu=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Cu=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Au=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var Fm,qm,jm,Km,Eu,Pu,zu=U(()=>{"use strict";te();oe();Ce();ae();Fm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,l)=>{if(l!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,p)=>{if(p!==t&&d!==n.dims[p])throw new Error("non concat dimensions must match")})}})},qm=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,jm=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Km=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),l=0,d=[],p=[],m=[{type:12,data:o}];for(let b=0;b<e.length;++b)l+=e[b].dims[t],i[b]=l,p.push(e[b].dims.length),a[b]=E(`input${b}`,n,p[b]),d.push("rank"),m.push({type:12,data:i[b]});for(let b=0;b<e.length;++b)m.push(...N(e[b].dims));m.push(...N(r));let u=D("output",n,r.length),h=u.indicesGet("indices",t),w=Array.from(Array(i.length).keys()).map(b=>`uniforms.sizeInConcatAxis${b}`).join(","),y=b=>`

  ${(()=>{b.registerUniform("outputSize","u32");for(let S=0;S<e.length;S++)b.registerUniform(`sizeInConcatAxis${S}`,"u32");return b.declareVariables(...a,u)})()}

  ${qm(i.length,w)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${w});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${jm(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:y}},Eu=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);Fm(r,o);let i=n.slice();i[o]=r.reduce((l,d)=>l+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(l=>k.size(l.dims)>0);e.compute(Km(a,o,i,r[0].dataType),{inputs:a})},Pu=e=>re({axis:e.axis})});var Fe,qe,je,Zr,bt=U(()=>{"use strict";te();oe();Fe=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},qe=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},je=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Zr=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[Xa,Ja];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var Pe,Ou,Qr=U(()=>{"use strict";Pe=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Ou=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Bu,Mu=U(()=>{"use strict";Bu=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var er,Xr,Jr=U(()=>{"use strict";te();oe();ae();bt();er=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,l)=>`
      if (${F(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,F(o,l+i,n))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},Xr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a[a.length-2],p=l[l.length-1],m=a[a.length-1],u=me(p),h=me(m),w=me(d),y=k.size(r)/u/w,b=e.length>2,S=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(S),d,p],x=[{type:12,data:y},{type:12,data:d},{type:12,data:p},{type:12,data:m}];qe(t,x),x.push(...N(S,a,l)),b&&x.push(...N(e[2].dims)),x.push(...N(v));let T=C=>{let A=Hr("batch_dims",e[0].dataType,S.length),P=E("a",e[0].dataType,a.length,h),O=E("b",e[1].dataType,l.length,u),R=D("output",e[0].dataType,v.length,u),G=ye(R.type.tensor),q=Fe(t,R.type.value,G),K=[P,O],W="";if(b){let X=o?u:1;K.push(E("bias",e[2].dataType,e[2].dims.length,X)),W=`${o?`value += bias[col / ${X}];`:`value += ${R.type.value}(bias[row + i]);`}`}let Y=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];je(t,Y);let se=()=>{let X=`var a_data: ${P.type.value};`;for(let ee=0;ee<h;ee++)X+=`
              let b_data${ee} = b[(b_offset + (k + ${ee}) * uniforms.N + col) / ${u}];`;for(let ee=0;ee<w;ee++){X+=`a_data = a[(a_offset + (row + ${ee}) * uniforms.K + k) / ${h}];`;for(let J=0;J<h;J++)X+=`
            values[${ee}] = fma(${O.type.value}(a_data${h===1?"":`[${J}]`}), b_data${J}, values[${ee}]);
`}return X};return`
  ${C.registerUniforms(Y).registerInternalVariables(A).declareVariables(...K,R)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${er("a_indices",P,P.rank-2,A.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${er("b_indices",O,O.rank-2,A.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${se()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${W}
      ${q}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${w};${o}`,inputDependencies:b?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:x}),getShaderSource:T}}});var Ym,Zm,go,Du,Qm,bo,Xm,tr,en=U(()=>{"use strict";te();oe();ae();bt();Jr();Qr();Ym=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Zm=(e,t)=>e?`
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
        }`,go=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32)=>{let d=t[1]*e[1],p=t[0]*e[0],m=o?d:i,u=o?i:d,h=m/t[0],w=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${m/h}>, ${u}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${p/e[0]}>, ${i}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
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
  let batch = ${a?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${a?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${w};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Ym(o,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Zm(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Du=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qm=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",bo=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32,d=!1)=>{let p=e[1]*t[1],m=e[0]*t[0],u=o?p:i,h=o?i:p;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let w=h/t[1],y=u/t[0],b=i/t[1],S=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Du(o,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
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
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${w};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${b};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Du(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${b}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Qm(o)}
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
  var<workgroup> mm_Asub : array<array<${r}, ${u}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${m}>, ${i}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${i};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${a?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${a?`${Math.ceil(l/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${a?`i32(globalId.z) * ${l}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${S}
  }
`},Xm=(e,t,r,n,o=!1)=>{let[i,a,l,d]=n,p=ye(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${er("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Pe(e,p)} {
      var value = ${Pe(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${er("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Pe(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${Pe(e,p)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},tr=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a.slice(0,-2),p=l.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],w=a[a.length-1],y=l[l.length-1],b=w%4===0&&y%4===0,S=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(y/$[0]/S[0]),Math.ceil(h/$[1]/S[1]),Math.ceil(u/$[2]/S[2])],x=b?4:1,T=[...d,h,w/x],C=T.length,A=[...p,w,y/x],P=A.length,O=[u,h,y/x],R=[{type:6,data:h},{type:6,data:y},{type:6,data:w}];qe(t,R),R.push(...N(m,T,A));let G=["rank","rank"],q=e.length>2;q&&(R.push(...N(e[2].dims)),G.push("rank")),R.push(...N(O));let K=W=>{let Y=m.length,se=Hr("batchDims",e[0].dataType,Y,1),X=ye(e[0].dataType),ee=E("a",e[0].dataType,C,x),J=E("b",e[1].dataType,P,x),ne=D("result",e[0].dataType,O.length,x),ve=[ee,J];if(q){let j=o?x:1;ve.push(E("bias",e[2].dataType,e[2].dims.length,j))}let Be=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];je(t,Be);let $e=ye(ne.type.tensor),de=Fe(t,ne.type.value,$e),V=Xm(x,q,de,[se,ee,J,ne],o);return`
  ${W.registerUniforms(Be).registerInternalVariables(se).declareVariables(...ve,ne)}
  ${V}
  ${b?go(S,$,X,se):bo(S,$,X,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${S};${t.activation};${b};${o}`,inputDependencies:G},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:R}),getShaderSource:K}}});var Jm,Ru,Uu=U(()=>{"use strict";te();Je();ae();bt();Qr();Mu();en();Jm=(e,t,r,n,o=!1,i,a=4,l=4,d=4,p="f32")=>{let m=G=>{switch(G){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},u=G=>{switch(G){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${G} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,w=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",b=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",S=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${S} / outWidth;
    let outCol = ${S} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${Pe(a,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${b}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,x=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${Pe(a,p)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${Pe(a,p)}(0.0);`,T=`${u(l)}`,C=Pe(d,p),A=e?Pe(a,p):Pe(l,p),P=e?Pe(l,p):Pe(a,p),O=Fe(i,C,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?x:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${Ou(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Ru=(e,t,r,n,o,i,a,l,d)=>{let p=t.format==="NHWC",m=p?e[0].dims[3]:e[0].dims[1],u=r[0],h=p?r[2]:r[3],w=p?r[1]:r[2],y=p?r[3]:r[1],b=p&&(m%4===0||m%3===0)&&y%4===0,S=p?y:h*w,$=p?h*w:y,v=[8,8,1],x=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(S/v[0]/x[0]),Math.ceil($/v[1]/x[1]),Math.ceil(u/v[2]/x[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let C=b?p&&m%4!==0?3:4:1,A=v[1]*x[1],P=v[0]*x[0],O=Math.max(v[0]*C,v[1]),R=n%A===0,G=o%P===0,q=i%O===0,K=b?[C,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];qe(t,W),W.push(...N(e[0].dims,e[1].dims));let Y=["rank","rank"];a&&(W.push(...N(e[2].dims)),Y.push("rank")),W.push(...N(r));let se=X=>{let ee=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];je(t,ee);let J=b?4:1,ne=ye(e[0].dataType),ve=`
      fn setOutputAtIndex(flatIndex : i32, value : ${b?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${b?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${b?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${b?"/ 4":""}, value);
      }`,Be=E("x",e[0].dataType,e[0].dims.length,C===3?1:C),$e=E("w",e[1].dataType,e[1].dims.length,J),de=[Be,$e],V=D("result",e[0].dataType,r.length,J);if(a){let j=E("bias",e[2].dataType,e[2].dims.length,J);de.push(j),ve+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${b?`vec4<${ne}>`:ne} {
          return bias[coords.${p?"w":"y"}${b?"/ 4":""}];
        }`}return`
        ${Bu("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(ee).declareVariables(...de,V)}
        ${ve}
        ${Jm(p,R,G,q,a,t,K[0],K[1],K[2],ne)}
        ${b?go(x,v,ne,void 0,!p,O):bo(x,v,ne,void 0,!p,O,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${b};${R};${G};${q};${A};${P};${O}`,inputDependencies:Y},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:se}}});var ef,Nu,tn,tf,Vu,rf,Wu,Lu,Gu=U(()=>{"use strict";te();Je();oe();ae();bt();Qr();ef=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Nu=e=>typeof e=="number"?[e,e,e]:e,tn=(e,t)=>t<=1?e:e+(e-1)*(t-1),tf=(e,t,r,n=1)=>{let o=tn(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Vu=(e,t,r,n,o)=>{o==null&&(o=tf(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},rf=(e,t,r,n,o,i,a,l,d,p)=>{let m,u,h,w;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Vu([t,r,n,1],[l,d,p],1,[o,i,a],e);u=y[0],h=y[1],w=y[2]}else if(Array.isArray(e)){if(!e.every((b,S,$)=>b===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Vu([t,r,n,1],[l,d,p],1,[o,i,a],e[0]);u=y[0],h=y[1],w=y[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),w=Math.ceil(n/a);let y=(u-1)*o+l-t,b=(h-1)*i+d-r,S=(w-1)*a+p-n,$=Math.floor(y/2),v=y-$,x=Math.floor(b/2),T=b-x,C=Math.floor(S/2),A=S-C;m={top:x,bottom:T,left:C,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:w}},Wu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let l,d,p,m,u;if(a==="channelsLast")[l,d,p,m,u]=e;else if(a==="channelsFirst")[l,u,d,p,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,w,y,b]=t,[S,$,v]=Nu(r),[x,T,C]=Nu(n),A=tn(w,x),P=tn(y,T),O=tn(b,C),{padInfo:R,outDepth:G,outHeight:q,outWidth:K}=rf(o,d,p,m,S,$,v,A,P,O),W=i?h*u:h,Y=[0,0,0,0,0];return a==="channelsFirst"?Y=[l,W,G,q,K]:a==="channelsLast"&&(Y=[l,G,q,K,W]),{batchSize:l,dataFormat:a,inDepth:d,inHeight:p,inWidth:m,inChannels:u,outDepth:G,outHeight:q,outWidth:K,outChannels:W,padInfo:R,strideDepth:S,strideHeight:$,strideWidth:v,filterDepth:w,filterHeight:y,filterWidth:b,effectiveFilterDepth:A,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:x,dilationHeight:T,dilationWidth:C,inShape:e,outShape:Y,filterShape:t}},Lu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",l=a?e[0].dims[3]:e[0].dims[1],d=!1,p=[64,1,1],m={x:r.map((v,x)=>x)},u=[Math.ceil(ef(m.x.map(v=>r[v]))/p[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=d?a&&l%4!==0?3:4:1,w=k.size(r),y=[{type:12,data:w},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];qe(t,y),y.push(...N(e[0].dims,e[1].dims));let b=["rank","rank"],S=e.length===3;S&&(y.push(...N(e[2].dims)),b.push("rank")),y.push(...N(r));let $=v=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];je(t,x);let T=d?4:1,C=ye(e[0].dataType),A=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),O=[A,P],R=D("result",e[0].dataType,r.length,T),G="";if(S){let W=E("bias",e[2].dataType,e[2].dims.length,T);O.push(W),G+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${C}>`:C} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let q=Pe(h,C),K=Fe(t,q,C);return`
            ${G}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(x).declareVariables(...O,R)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${R.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,A.rank)};
              let d2 = ${a?F("coords",A.rank-1,A.rank):F("coords",1,A.rank)};
              let xFRCCorner = vec3<u32>(${a?F("coords",1,A.rank):F("coords",2,A.rank)},
              ${a?F("coords",2,A.rank):F("coords",3,A.rank)},
              ${a?F("coords",3,A.rank):F("coords",4,A.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${a?F("uniforms.x_shape",1,A.rank):F("uniforms.x_shape",2,A.rank)};
              let xShapeZ = ${a?F("uniforms.x_shape",2,A.rank):F("uniforms.x_shape",3,A.rank)};
              let xShapeW = ${a?F("uniforms.x_shape",3,A.rank):F("uniforms.x_shape",4,A.rank)};
              let xShapeU = ${a?F("uniforms.x_shape",4,A.rank):F("uniforms.x_shape",1,A.rank)};
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
                      ${a?`let xValues = vec4<f32>(
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
                        ${a?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${a?`let xValues = vec2<f32>(
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
                      ${a?`let xValues = vec3<f32>(
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
              ${S?"value = value + getBiasByOutputCoords(coords)":""};
              ${K}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${S}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:y}),getShaderSource:$}}});var Hu,Fu,qu=U(()=>{"use strict";te();oe();ae();bt();Hu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,l=e[1].dims,d=t.format==="NHWC",p=d?r[3]:r[1],m=p/t.group,u=d&&m>=4?me(p):1,h=k.size(r)/u,w=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];qe(t,w),w.push(...N(a,[l[0],l[1],l[2],l[3]/u]));let y=o?["rank","rank","rank"]:["rank","rank"];w.push(...N([r[0],r[1],r[2],r[3]/u]));let b=S=>{let $=D("output",e[0].dataType,r.length,u),v=ye($.type.tensor),x=Fe(t,$.type.value,v),T=E("x",e[0].dataType,a.length),C=E("w",e[1].dataType,l.length,u),A=[T,C];o&&A.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];je(t,P);let O=d?`
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
            let xVal = ${T.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${C.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${T.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${C.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${S.registerUniforms(P).declareVariables(...A,$)}

  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${x}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:b}},Fu=(e,t,r,n)=>{let o=e.length>2,i=me(r[3]),a=me(r[2]),l=k.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];qe(t,u),u.push(...N(d,p,m));let h=(a-1)*t.strides[1]+p[1],w=y=>{let b=D("output",e[0].dataType,m.length,i),S=ye(b.type.tensor),$=Fe(t,b.type.value,S),v=E("x",e[0].dataType,d.length,i),x=E("w",e[1].dataType,p.length,i),T=[v,x];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let C=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return je(t,A),`
  ${y.registerUniforms(A).declareVariables(...T,b)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${a}u;
    let col = (index1 % width1) * ${a}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${v.type.value}, ${h}>;
    var values: array<${b.type.value}, ${a}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${v.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${v.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${a}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${a}u; i++) {
      var value = values[i];
      ${C}
      ${$}
      ${b.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:w}}});var nf,yo,of,wo,_o,ju,af,sf,vo,Ku=U(()=>{"use strict";oe();Uu();Gu();en();qu();bt();Jr();ut();nf=(e,t,r,n,o,i)=>{let a=e[0],l=e.slice(i?1:2,i?3:4),d=l.length,p=t[0],u=t.slice(2).map((y,b)=>y+(y-1)*(r[b]-1)),w=l.map((y,b)=>y+n[b]+n[b+d]).map((y,b)=>Math.floor((y-u[b]+o[b])/o[b]));return w.splice(0,0,a),w.splice(i?3:1,0,p),w},yo=[2,3,1,0],of=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},wo=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();It.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},_o=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,l=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ju=(e,t,r,n)=>{let o=r.format==="NHWC",i=nf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(Ee(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),A.push(O)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Fu(A,r,i,n),{inputs:A}):e.compute(Hu(A,r,i,n),{inputs:A});return}let a=t.length===3,l=t[0].dims[o?1:2],d=t[0].dims[o?2:3],p=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],w=i[o?2:3],y=i[o?3:1],b=o&&m===l&&u===d&&r.pads[0]===0&&r.pads[1]===0;if(b||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],P,O,R,G=[];if(o){let W=e.kernelCustomData.wT??e.compute(Ee(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),b){let Y=l*d*p;P=t[0].reshape([1,A,Y]),O=W.reshape([1,Y,y]),R=[1,A,y]}else P=t[0].reshape([A,l*d,p]),O=W.reshape([1,p,y]),R=[A,h*w,y];G.push(P),G.push(O)}else P=t[0].reshape([A,p,l*d]),O=t[1].reshape([1,y,p]),R=[A,y,h*w],G.push(O),G.push(P);a&&G.push(t[2]);let q=R[2],K=G[0].dims[G[0].dims.length-1];q<8&&K<8?e.compute(Xr(G,r,i,R,o,n),{inputs:G}):e.compute(tr(G,r,i,R,o,n),{inputs:G});return}let S=!0,$=e.kernelCustomData.wT??e.compute(Ee(t[1],yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let x=o?h*w:y,T=o?y:h*w,C=m*u*p;e.compute(Ru(v,r,i,x,T,C,a,S,n),{inputs:v})},af=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=wo({...t,pads:o,strides:i,dilations:a,kernelShape:l},n);ju(e,n,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},sf=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=wo(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Wu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Lu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},vo=(e,t)=>{if(of(e.inputs,t),e.inputs[0].dims.length===3)af(e,t);else if(e.inputs[0].dims.length===5)sf(e,e.inputs,t);else{let r=wo(t,e.inputs);ju(e,e.inputs,r)}}});var Yu,Zu=U(()=>{"use strict";te();Je();oe();ae();Yu=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=t.format==="NHWC",a=t.group,l=e[1].dims,d=l[2]/a,p=l[3],m=i?me(p):1,u=k.size(o)/m,h=[Math.ceil(u/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${h}`);let w=["rank","rank"],y=[t.strides[0],t.strides[1]],b=[t.kernelShape[i?1:2],t.kernelShape[i?2:3]],S=[t.dilations[0],t.dilations[1]],$=[b[0]+(t.dilations[0]<=1?0:(t.kernelShape[i?1:2]-1)*(t.dilations[0]-1)),b[1]+(t.dilations[1]<=1?0:(t.kernelShape[i?2:3]-1)*(t.dilations[1]-1))],v=[$[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),$[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],x=[{type:12,data:u},{type:12,data:y},{type:12,data:b},{type:12,data:S},{type:12,data:$},{type:6,data:v},{type:12,data:d},{type:12,data:p},...N(e[0].dims,e[1].dims)];n&&(x.push(...N(e[2].dims)),w.push("rank")),x.push(...N(o));let T=C=>{let A=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:y.length},{name:"filter_dims",type:"u32",length:b.length},{name:"dilations",type:"u32",length:b.length},{name:"effective_filter_dims",type:"u32",length:$.length},{name:"pads",type:"i32",length:v.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],P=ye(e[0].dataType),O=i?1:2,R=i?2:3,G=i?3:1,q=E("W",e[1].dataType,e[1].dims.length,m),K=E("Dy",e[0].dataType,e[0].dims.length),W=[K,q];n&&W.push(E("bias",e[2].dataType,[o[G]].length,m));let Y=D("result",e[0].dataType,o.length,m),se=`
            let outputIndices = ${Y.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${Y.indicesGet("outputIndices",0)};
            let d1 = ${Y.indicesGet("outputIndices",G)};
            let r = ${Y.indicesGet("outputIndices",O)};
            let c = ${Y.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Y.type.value}(0.0);
            for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${P}(dyRCorner) + ${P}(wR)) / ${P}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${P}(uniforms.Dy_shape[${O}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);

              for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${P}(dyCCorner) + ${P}(wC)) / ${P}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${P}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                  let xValue = ${i?K.get("batch","idyR","idyC","inputChannel"):K.get("batch","inputChannel","idyR","idyC")};
                  let w_offset = ${q.indicesToOffset(`${q.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
                  let wValue = ${q.getByOffset(`w_offset / ${m}`)};
                  dotProd = dotProd + xValue * wValue;
                  inputChannel = inputChannel + 1;
                }
              }
            }
            let value = dotProd${n?` + bias[d1 / ${m}]`:""};
            ${Y.setByOffset("global_idx","value")};
          `;return`
    ${C.registerUniforms(A).declareVariables(...W,Y)}
      ${C.mainStart()}
      ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${se}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${m}`,inputDependencies:w},getRunData:()=>({dispatchGroup:{x:h[0],y:h[1],z:h[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:x}),getShaderSource:T}}});var uf,lf,df,Qu,Xu,cf,Ju,pf,el,tl=U(()=>{"use strict";Zu();bt();ut();uf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,lf=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},df=(e,t,r,n,o,i,a,l,d,p)=>{let m=e.length-2,u=p.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let h=e[0],w=t[l?3:1]*o;for(let y=0,b=e.length-m-(l?1:0);y<m;++y,++b){let S=e[b],$=u?S*a[y]:p[y],v=uf(S,a[y],i[y],t[b],r[y],$);lf(v,n,i,y,y+m),u&&p.push(a[y]*(S-1)+d[y]+(t[b]-1)*r[y]+1-i[y]-i[y+m])}p.splice(0,0,h),p.splice(l?3:1,0,w)},Qu=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;d=new Array(u).fill(1)}let p=e.strides.slice();if(p.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;p=new Array(u).fill(1)}df(l,r,d,e.autoPad,e.group,o,p,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:p}),m},Xu=e=>{let t=Zr(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,l=e.pads,d=e.strides,p=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},cf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Ju=(e,t,r,n)=>{let o=e.kernelCustomData.wT??e.compute(Ee(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=o);let i=[t[0],o];t.length===3&&i.push(t[2]),e.compute(Yu(i,r,n),{inputs:i})},pf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=Qu({...t,pads:l,strides:a,dilations:i,kernelShape:o},n);Ju(e,n,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},el=(e,t)=>{if(cf(e.inputs,t),e.inputs[0].dims.length===3)pf(e,t);else{let r=Qu(t,e.inputs);Ju(e,e.inputs,r)}}});var mf,rl,nl,ol=U(()=>{"use strict";te();oe();Ce();ae();mf=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),l=D("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=k.normalizeAxis(d,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=F("uniforms.input_shape","uniforms.axis",i),y=n.reverse?h+(n.exclusive?" + 1":""):"0",b=n.reverse?w:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,l)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${b};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...N(t,t)]}),getShaderSource:m}},rl=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(mf(n,r,o,t),{inputs:[0]})},nl=e=>{let t=e.exclusive===1,r=e.reverse===1;return re({exclusive:t,reverse:r})}});var ff,hf,gf,il,al,sl=U(()=>{"use strict";te();oe();Ce();ae();ff=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},hf=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},gf=(e,t)=>{let r,n,o,i,a,l,d=t.format==="NHWC",p=t.blocksize,m=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=m?[r,n,o,p,p,i/p**2]:[r,n,o,i/p**2,p,p],l=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,p,p,i/p**2,n,o]:[r,i/p**2,p,p,n,o],l=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,w=e.dataType,y=E("a",w,h),b=D("output",w,h),S=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,b)}

  ${hf(l,h,y,b)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${b.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${b.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=d?[r,n*p,o*p,i/p**2]:[r,i/p**2,n*p,o*p],x=k.size(v),T=u.dims,C=k.sortBasedOnPerm(T,l);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...N(T,C)]}},getShaderSource:S}},il=(e,t)=>{ff(e.inputs),e.compute(gf(e.inputs[0],t))},al=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var $o,rn,ul,bf,yf,xo,So,ll,wf,dl,cl,pl=U(()=>{"use strict";te();oe();Ce();ae();$o="[a-zA-Z]|\\.\\.\\.",rn="("+$o+")+",ul="^"+rn+"$",bf="("+rn+",)*"+rn,yf="^"+bf+"$",xo=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},So=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(yf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((l,d)=>{let p=t[d].dims.slice();if(!l.match(RegExp(ul)))throw new Error("Invalid LHS term");let m=this.processTerm(l,!0,p,d);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([l,d])=>d.count===1||l==="...").map(([l])=>l).join("");else if(!o.match(RegExp(rn)))throw new Error("Invalid RHS");o.match(RegExp($o,"g"))?.forEach(l=>{if(l==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(l);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,l=[],d=0;if(!t.match(RegExp(ul))&&!r&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp($o,"g")),m=new xo(o);return p?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let w=i-p.length+1;if(w<0)throw new Error("Ellipsis out of bounds");if(l=n.slice(d,d+w),this.hasEllipsis){if(this.ellipsisDims.length!==l.length||this.ellipsisDims.toString()!==l.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=l;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<l.length;y++){let b=String.fromCharCode("0".charCodeAt(0)+y);m.addSymbol(b,h+y),this.addSymbol(b,n[d++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[d++],o)}),m}},ll=e=>e+"_max",wf=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),l=D("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),p=m=>{let u=[],h="var prod = 1.0;",w="var sum = 0.0;",y="sum += prod;",b=[],S=[],$=[],v=[],x=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,A)=>{if(r.rhs.symbolToIndices.has(A)){let P=r.rhs.symbolToIndices.get(A)?.[0];P!==void 0&&r.lhs.forEach((O,R)=>{if(C.inputIndices.includes(R)){let G=O.symbolToIndices.get(A);if(G===void 0)throw new Error("Invalid symbol error");G.forEach(q=>{u.push(`${i[R].indicesSet(`input${R}Indices`,q,l.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(C.inputIndices.includes(O)){let R=P.symbolToIndices.get(A);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(G=>{b.push(`${i[O].indicesSet(`input${O}Indices`,G,`${A}`)}`)}),v.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),S.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${ll(A)}; ${A}++) {`),$.push("}")});let T=x?[...u,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...u,w,...S,...b,h,...v,y,...$];return`
            ${m.registerUniforms(d.map(C=>({name:`${ll(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,l)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=d.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,w)=>[...N(h)]).reduce((h,w)=>h.concat(w),m);return u.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:p}},dl=(e,t)=>{let r=new So(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(wf(o,e.inputs[0].dataType,r,n))},cl=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var _f,ml,vf,$f,fl,hl=U(()=>{"use strict";te();oe();ae();_f=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},ml=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},vf=(e,t)=>e.length>t.length?ml(e,t):ml(t,e),$f=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=vf(t,r),o=e[0].dataType,i=o===9||k.size(t)===1,a=o===9||t.length>0&&t[t.length-1]%4===0?4:1,l=i||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(k.size(n)/l),p=u=>{let h=E("input",o,t.length,a),w=D("output",o,n.length,l),y;if(o===9){let b=(S,$,v="")=>`
          let outputIndices${$} = ${w.offsetToIndices(`outputOffset + ${$}u`)};
          let offset${$} = ${h.broadcastedIndicesToOffset(`outputIndices${$}`,w)};
          let index${$} = offset${$} / 4u;
          let component${$} = offset${$} % 4u;
          ${S}[${$}] = ${v}(${h.getByOffset(`index${$}`)}[component${$}]);
        `;y=`
        let outputOffset = global_idx * ${l};
        var data = vec4<u32>(0);
        ${b("data",0,"u32")}
        ${b("data",1,"u32")}
        ${b("data",2,"u32")}
        ${b("data",3,"u32")}
        ${w.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${w.offsetToIndices(`global_idx * ${l}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",w)};
        let data = ${w.type.value}(${h.getByOffset(`inputOffset / ${a}`)});
        ${w.setByOffset("global_idx","data")}
      }`;return`
    ${u.registerUniform("vec_size","u32").declareVariables(h,w)}
    ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},m=[{type:12,data:d},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${a}${l}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m})}},fl=e=>{_f(e.inputs),e.compute($f(e.inputs),{inputs:[0]})}});var xf,gl,bl=U(()=>{"use strict";te();oe();ae();Yr();xf=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let l=E("x",t,[1],4),d=E("bias",t,[1],4),p=D("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${d.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,h=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(l,d,p)}

    ${fo(ke(t))}

    ${a.mainStart(Ct)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",ho("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ct/4)}})}},gl=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?pu(e):e.compute(xf(e.inputs))}});var Sf,Tf,yl,wl,_l=U(()=>{"use strict";te();oe();Ce();ae();Sf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Tf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let l=r[i],d=e[0].dataType===9?4:1,p=Math.ceil(k.size(a)/d),m=[{type:12,data:p},{type:6,data:l},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],u=h=>{let w=E("data",e[0].dataType,e[0].dims.length,d),y=E("inputIndices",e[1].dataType,e[1].dims.length),b=D("output",e[0].dataType,a.length,d),S=v=>{let x=n.length,T=`var indicesIndices${v}  = ${y.type.indices}(0);`;for(let C=0;C<x;C++)T+=`${x>1?`indicesIndices${v}[${C}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${C}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${y.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${w.type.indices};
        `;for(let C=0,A=0;C<o;C++)C===i?(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = u32(idx${v});`,A+=x):(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return T},$;if(e[0].dataType===9){let v=(x,T,C="")=>`
          let outputIndices${T} = ${b.offsetToIndices(`outputOffset + ${T}u`)};
          ${S(T)};
          let offset${T} = ${w.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${x}[${T}] = ${C}(${w.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${b.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${b.offsetToIndices("global_idx")};
      ${S("")};
      let value = ${w.getByIndices("dataIndices")};
      ${b.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,y,b)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:u}},yl=e=>re({axis:e.axis}),wl=(e,t)=>{let r=e.inputs;Sf(r),e.compute(Tf(e.inputs,t))}});var If,Cf,vl,$l,xl=U(()=>{"use strict";te();oe();Ce();ae();If=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((l,d)=>d===r?Math.ceil(l/n)===i.dims[d]:l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((l,d)=>l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Cf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),l=r.slice(0);l.splice(i,1,...n);let d=k.size(l),p=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((y,b)=>y.dims),l)],w=y=>{let b=E("data",e[0].dataType,e[0].dims.length),S=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,x=D("output",p,l.length),T=[b,S,$];v&&T.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...T,x)}
        ${y.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${S.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${S.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${b.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${b.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${S.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${b.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${b.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${b.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${b.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${$.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${$.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${$.getByIndices("scale_indices")};
        ${(()=>v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${u?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${ke(p)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,b)=>b!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,b)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:w}},vl=(e,t)=>{let r=e.inputs;If(r,t),e.compute(Cf(e.inputs,t))},$l=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Af,kf,Sl,Tl,Il=U(()=>{"use strict";te();oe();Ce();ae();Af=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},kf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,l=k.normalizeAxis(t.axis,o),d=r[l],p=i.slice(0),m=k.size(p),u=E("input",n,o),h=E("indicesInput",a,i.length),w=D("output",n,p.length),y=[{type:12,data:m},{type:6,data:d},{type:12,data:l}];return y.push(...N(r,i,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(u,h,w)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${w.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${u.type.indices}(outputIndices);
      ${u.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${u.getByIndices("inputIndices")};

      ${w.setByOffset("global_idx","value")};
  }`}},Sl=e=>re({axis:e.axis}),Tl=(e,t)=>{let r=e.inputs;Af(r),e.compute(kf(e.inputs,t))}});var Ef,Pf,Cl,Al,kl=U(()=>{"use strict";te();oe();ae();Ef=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Pf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=Gr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),l=[o,i];if(!l)throw new Error("Can't use gemm on the given tensors");let d=16,p=Math.ceil(i/d),m=Math.ceil(o/d),u=!0,h=k.size(l),w=[{type:12,data:u?p:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(w.push(...N(e[2].dims)),y.push("rank")),w.push(...N(l));let b=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let x=t.alpha===1?"":"value *= uniforms.alpha;",T=E("a",e[0].dataType,e[0].dims),C=E("b",e[1].dataType,e[1].dims),A=T.type.value,P=null,O=[T,C];e.length===3&&(P=E("c",e[2].dataType,e[2].dims.length),O.push(P));let R=D("output",e[0].dataType,l.length);O.push(R);let G=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(G).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${x}
    ${(()=>P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",R)}; value += ${A}(uniforms.beta) * ${P.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},S=$=>{let v=E("a",e[0].dataType,e[0].dims),x=E("b",e[1].dataType,e[1].dims),T=null,C=[v,x];e.length===3&&(T=E("c",e[2].dataType,e[2].dims.length),C.push(T));let A=D("output",e[0].dataType,l.length);C.push(A);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",R="";t.transA&&t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(R=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(R=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${v.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let G=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(P).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${x.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${R}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${G}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return u?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:p*m},programUniforms:w}),getShaderSource:S}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:b}},Cl=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Al=(e,t)=>{Ef(e.inputs),e.compute(Pf(e.inputs,t))}});var lt,yt,Ut,Nt,zf,Of,Bf,Mf,Df,Rf,Uf,Nf,El,Pl,zl=U(()=>{"use strict";te();oe();Ce();ae();[lt,yt,Ut,Nt]=[0,1,2,3],zf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Of=`
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
`,Bf=e=>`
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
`,Mf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Df=e=>`
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
`,Rf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${lt}] = batch;
     indices[${yt}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Ut}] = u32(r);
            indices[${Nt}] = u32(c);
          }
        `;case"border":return`
          indices[${Ut}] = u32(clamp(r, 0, H - 1));
          indices[${Nt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Ut}] = gs_reflect(r, border[1], border[3]);
          indices[${Nt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Uf=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${lt}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${lt}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${lt}], indices[${yt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${lt}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Nf=(e,t)=>{let r=E("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=E("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[lt,yt,Ut,Nt]=[0,3,1,2]);let a=D("output",e[0].dataType,i.length),l=r.type.value,d=k.size(i),p=[{type:12,data:d},...N(e[0].dims,n,i)],m=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${Of}
  ${Bf(l)}
  ${Mf(t)}
  ${Df(t)}
  ${Rf(r,l,t)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Ut}]);
      let W_in = i32(uniforms.x_shape[${Nt}]);

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

      let indices = ${a.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${lt}], indices[${Ut}], indices[${Nt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Uf(a,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:u=>{let h=k.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:p}},getShaderSource:m}},El=(e,t)=>{zf(e.inputs),e.compute(Nf(e.inputs,t))},Pl=e=>re({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var De,Lf,Bl,Ol,Gf,rr,Ml,To=U(()=>{"use strict";te();oe();Ce();Lr();jr();ae();ut();De=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Lf=(e,t)=>{let r=e[0],n=De(e,1),o=De(e,2),i=De(e,3),a=De(e,4),l=De(e,5),d=De(e,6),p=De(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=u,y=0,b=0,S=Math.floor(h/t.numHeads);if(d&&p&&k.size(d.dims)&&k.size(p.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==S)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==m||p.dims[1]!==t.numHeads||p.dims[3]!==S)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],b=d.dims[2]}else if(d&&k.size(d.dims)||p&&k.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,w=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==S)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,w=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==S)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,w=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=y+w,x=0;if(a&&k.size(a.dims)>0){x=8;let P=a.dims;throw P.length===1?P[0]===m?x=1:P[0]===3*m+2&&(x=3):P.length===2&&P[0]===m&&P[1]===v&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,C=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(w!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(w!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(l&&k.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[2]!==u||l.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:y,kvSequenceLength:w,totalSequenceLength:v,maxSequenceLength:b,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:S,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:x,scale:t.scale,broadcastResPosBias:A,passPastInKv:T,qkvFormat:$}},Bl=e=>re({...e}),Ol=re({perm:[0,2,1,3]}),Gf=(e,t,r,n,o,i,a)=>{let l=[n,o,i],d=k.size(l),p=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],m=u=>{let h=D("qkv_with_bias",t.dataType,l),w=E("qkv",t.dataType,l),y=E("bias",r.dataType,l),b=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(b).declareVariables(w,y,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},rr=(e,t,r,n,o,i,a,l)=>{let d=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Gf(e,i,a,t,n,r*o,l),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(Ee(d,Ol.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(Ee(d,Ol.perm),{inputs:[d],outputs:[-1]})[0]},Ml=(e,t)=>{let r=Lf(e.inputs,t),n=e.inputs[0],o=De(e.inputs,1),i=De(e.inputs,2),a=De(e.inputs,3),l=De(e.inputs,4),d=De(e.inputs,5),p=De(e.inputs,6),m=De(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Rt(e,h,o,i,l,void 0,p,m,d,r);if(!o||!i)throw new Error("key and value must be provided");let w=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,h,w,y,l,void 0,p,m,d,r)}});var Hf,Ff,qf,jf,Io,Dl,Rl,Co=U(()=>{"use strict";te();oe();Ce();ae();Hf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Ff=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),re({numOutputs:n,axis:t.axis,splitSizes:r})},qf=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,jf=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Io=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),l=E("input",o,r.length),d=new Array(t.numOutputs),p=[],m=[],u=0,h=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){u+=t.splitSizes[y],d[y]=u;let b=r.slice();b[i]=t.splitSizes[y],m.push(b),a[y]=D(`output${y}`,o,b.length),p.push({dims:m[y],dataType:e[0].dataType})}h.push({type:12,data:d},...N(r,...m));let w=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...a)}
  ${qf(d.length)}
  ${jf(a)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${l.offsetToIndices("global_idx")};
    var index = ${l.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${l.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Dl=(e,t)=>{Hf(e.inputs);let r=e.inputs.length===1?t:Ff(e.inputs,t);e.compute(Io(e.inputs,r),{inputs:[0]})},Rl=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:n,splitSizes:r})}});var Kf,Yf,Ul,Nl,Vl=U(()=>{"use strict";Ce();jr();To();Co();ut();Kf=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],p=r.dims[1],m=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=p,h=0,w=!n||n.dims.length===0,y=Math.floor(w?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);w&&(m=y*t.numHeads);let b=i&&i.dims.length!==0,S=a&&a.dims.length!==0;if(b&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(b&&S){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(b||S)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let x=0,T=!1,C=t.kvNumHeads?y*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=e.length>4?e[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let P=-1,O=-1,R=!1;return{batchSize:d,sequenceLength:p,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:P,maxSequenceLength:O,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:y,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:t.scale,broadcastResPosBias:R,passPastInKv:T,qkvFormat:v}},Yf=re({perm:[0,2,1,3]}),Ul=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Ee(n,Yf.perm),{inputs:[n],outputs:[-1]})[0]),n},Nl=(e,t)=>{let r=Kf(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,u=re({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[h,w,y]=!o&&!i?e.compute(Io([n],u),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],b=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);Rt(e,b,Ul(e,w,r),Ul(e,y,r),void 0,void 0,a,l,void 0,r,d,p)}});var Wl,Zf,Qf,Ll,Gl=U(()=>{"use strict";te();oe();ut();ae();Wl=(e,t,r,n,o,i,a,l)=>{let d=me(i),p=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,u=o*a,h=64;u===1&&(h=256);let w=[o,a,i/d],y=[o,a,2],b=["rank","type","type"],S=[];S.push(...N(w,y));let $=v=>{let x=E("x",t.dataType,3,d),T=E("scale",r.dataType,r.dims),C=E("bias",n.dataType,n.dims),A=D("output",1,3,2),P=[x,T,C,A];return`
  var<workgroup> workgroup_shared : array<${m}, ${h}>;
  const workgroup_size = ${h}u;
  ${v.declareVariables(...P)}
  ${v.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${x.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${m}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${He("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${He("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l};${h}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:u},programUniforms:S}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},Zf=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],l=n[1],d=k.sizeFromDimension(n,i),p=me(d),m=k.size(o)/p,u=Wl(e,t[0],t[1],t[2],a,d,l,r.epsilon),h=[a,l,d/p],w=[a,l],y=["type","none"],b=S=>{let $=E("x",t[0].dataType,h.length,p),v=E("scale_shift",1,w.length,2),x=D("output",t[0].dataType,h.length,p),T=[$,v,x];return`
  ${S.registerUniform("output_size","u32").declareVariables(...T)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...N(h,w,h)]}),getShaderSource:b},{inputs:[t[0],u]})},Qf=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],l=k.sizeFromDimension(n,1)/a,d=me(a),p=k.size(o)/d,m=[{type:12,data:l},{type:12,data:Math.floor(a/d)}],u=["type","type"],h=!1,w=[0,n.length-1];for(let $=0;$<n.length-2;$++)h=h||n[$+1]!==1,w.push($+1);h=h&&n[n.length-1]!==1;let y=h?e.compute(Ee(e.inputs[0],w),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[w[v]])),b=Wl(e,y,t[1],t[2],i,l,a,r.epsilon),S=$=>{let v=ye(t[0].dataType),x=d===1?"vec2f":`mat${d}x2f`,T=P=>{let O=P===0?"x":"y",R=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${v}(${R}(scale.${O}))`;case 2:return`vec2<${v}>(${R}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${R}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${d}`)}},C=E("input",t[0].dataType,t[0].dims,d),A=D("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:S},{inputs:[t[0],b]})},Ll=(e,t)=>{t.format==="NHWC"?Qf(e,e.inputs,t):Zf(e,e.inputs,t)}});var Xf,Jf,Hl,Fl=U(()=>{"use strict";te();oe();ae();Xf=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Jf=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],l=o,d=k.normalizeAxis(t.axis,o.length),p=k.sizeToDimension(o,d),m=k.sizeFromDimension(o,d),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let w=[];for(let C=0;C<o.length;++C)C<d?w.push(o[C]):w.push(1);let y=me(m),b=["type","type"],S=[{type:12,data:p},{type:1,data:m},{type:12,data:Math.floor(m/y)},{type:1,data:t.epsilon}];a&&b.push("type");let $=r>1,v=r>2,x=C=>{let A=ye(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,y),E("scale",i.dataType,i.dims,y)];a&&P.push(E("bias",a.dataType,a.dims,y)),P.push(D("output",e[0].dataType,l,y)),$&&P.push(D("mean_data_output",1,w)),v&&P.push(D("inv_std_output",1,w));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(O).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${uo("f32",y)};
    var mean_square_vector = ${uo("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(A,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${He("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${He("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(A,y,"x[j + offset]")};
      let f32scale = ${At(A,y,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(A,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:l,dataType:e[0].dataType}];return $&&T.push({dims:w,dataType:1}),v&&T.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:b},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:S}),getShaderSource:x}},Hl=(e,t)=>{Xf(e.inputs),e.compute(Jf(e.inputs,t,e.outputCount))}});var eh,ql,jl=U(()=>{"use strict";oe();Jr();en();eh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},ql=e=>{eh(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(Xr(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=k.size(e.inputs[0].dims.slice(0,-2)),a=k.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let l=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),p=[1,i,r],m=[l,d];e.compute(tr(m,{activation:""},t,p),{inputs:m})}else e.compute(tr(e.inputs,{activation:""},t))}}});var th,rh,nh,Kl,Yl,Zl=U(()=>{"use strict";te();oe();Ce();ae();th=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(k.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},rh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),w=me(m),y=me(a),b=l.concat([o,a]),S=o>1&&a/y%2===0?2:1,$=k.size(b)/y/S,v=64,x=[],T=[d,o,i/h],C=k.convertShape(e[1].dims).slice();C.splice(-1,1,m/w),x.push(...N(T)),x.push(...N(C)),x.push(...N(e[2].dims)),e.length===4&&x.push(...N(k.convertShape(e[3].dims)));let A=[d,o,a/y];x.push(...N(A));let P=O=>{let R=T.length,G=E("a",e[0].dataType,R,h),q=E("b",12,C.length,w),K=E("scales",e[2].dataType,e[2].dims.length),W=[G,q,K],Y=e.length===4?E("zero_points",12,e[3].dims.length):void 0;Y&&W.push(Y);let se=A.length,X=D("output",e[0].dataType,se,y),ee=ye(e[0].dataType),J=(()=>{switch(h){case 1:return`array<${ee}, 8>`;case 2:return`mat4x2<${ee}>`;case 4:return`mat2x4<${ee}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ne=()=>{let $e=`
          // reuse a data
            var input_offset = ${G.indicesToOffset(`${G.type.indices}(batch, row, word_offset)`)};
            var a_data: ${J};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${G.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let de=0;de<y*S;de++)$e+=`
            b_value = ${w===1?`b${de}_data`:`b${de}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${J}(${Array.from({length:4},(V,j)=>`${ee}(b_value_lower[${j}]), ${ee}(b_value_upper[${j}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${J}(${Array.from({length:8},(V,j)=>`(b_quantized_values[${j}] - ${Y?`zero_point${de}`:"zero_point"}) * scale${de}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${Y?`zero_point${de}`:"zero_point"}`).join(",")})) * scale${de};`)()};
            workgroup_shared[local_id.x * ${S} + ${Math.floor(de/y)}]${y>1?`[${de%y}]`:""} += ${Array.from({length:8/h},(V,j)=>`${h===1?`a_data[${j}] * b_dequantized_values[${j}]`:`dot(a_data[${j}], b_dequantized_values[${j}])`}`).join(" + ")};
          `;return $e},ve=()=>{let $e=`
            var col_index = col * ${y};
            ${Y?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ee}(8);`}
            `;for(let de=0;de<y*S;de++)$e+=`
            let scale${de} = ${K.getByOffset("col_index * nBlocksPerCol + block")};
            ${Y?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${de} = ${ee}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return $e},Be=()=>{let $e=`col_index = col * ${y};`;for(let de=0;de<y*S;de++)$e+=`
            let b${de}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return $e+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,$e};return`
        var<workgroup> workgroup_shared: array<${X.type.value}, ${S*v}>;
        ${O.declareVariables(...W,X)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${X.offsetToIndices(`(global_idx / ${v}) * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${ve()}
            for (var word: u32 = 0; word < ${m}; word += ${w}) {
              ${Be()}
              for (var i: u32 = 0; i < ${w}; i++) {
                ${ne()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${S}) {
            var output_value: ${X.type.value} = ${X.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${S};
            }
            ${X.setByIndices(`${X.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${w};${y};${S};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:b,dataType:u}],dispatchGroup:{x:$},programUniforms:x}),getShaderSource:P}},nh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=me(t.k),w=me(m),y=l.concat([o,a]),b=128,S=a%8===0?8:a%4===0?4:1,$=b/S,v=$*w*8,x=v/h,T=v/t.blockSize,C=k.size(y)/S,A=[],P=[d,o,i/h],O=k.convertShape(e[1].dims).slice();O.splice(-1,1,m/w),A.push(...N(P)),A.push(...N(O)),A.push(...N(e[2].dims)),e.length===4&&A.push(...N(k.convertShape(e[3].dims)));let R=[d,o,a];A.push(...N(R));let G=q=>{let K=P.length,W=E("a",e[0].dataType,K,h),Y=E("b",12,O.length,w),se=E("scales",e[2].dataType,e[2].dims.length),X=[W,Y,se],ee=e.length===4?E("zero_points",12,e[3].dims.length):void 0;ee&&X.push(ee);let J=R.length,ne=D("output",e[0].dataType,J),ve=ye(e[0].dataType),Be=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${ve}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${ve}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${$}>, ${S}>;
        ${q.declareVariables(...X,ne)}
        ${q.mainStart([$,S,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${S}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += ${b})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${W.getByIndices(`${W.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${W.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${T} + local_id.x;
            ${ee?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${ve}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${ve}(8);`}
            let scale = ${se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${Y.getByIndices(`${Y.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${w}; i++) {
              ${Be()}
              let b_value = ${w===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${ve}>(${Array.from({length:4},($e,de)=>`${ve}(b_value_lower[${de}]), ${ve}(b_value_upper[${de}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${ve}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,de)=>`${`dot(a_data${de}, b_dequantized_values[${de}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${S}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${w};${$};${S}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:G}},Kl=(e,t)=>{th(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(nh(e.inputs,t)):e.compute(rh(e.inputs,t))},Yl=e=>re(e)});var oh,ih,ah,sh,uh,lh,dh,ch,Ql,Xl=U(()=>{"use strict";te();oe();ae();oh=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ih=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
            k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,t)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},ah=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},sh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k = i32(${F("uniforms.x_shape",o,t)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},uh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
                k = i32(${e.indicesGet("indices",o)}) - ${F("uniforms.pads",o,r)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,t)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,t)})) {
                  k -= i32(${F("uniforms.x_shape",o,t)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},lh=(e,t,r)=>{switch(r.mode){case 0:return ih(e,t,r.pads.length);case 1:return ah(e,t,r.pads.length);case 2:return sh(e,t,r.pads.length);case 3:return uh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},dh=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let l=["rank"],d=p=>{let m=D("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,w=lh(m,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:a?h:"f32"}),`
            ${p.registerUniforms(y).declareVariables(u,m)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},ch=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)i[Number(l[d])]=Number(r[d]),i[Number(l[d])+o]=Number(r[d+l.length])}else r.forEach((l,d)=>i[Number(d)]=Number(l));let a=[];return i.forEach(l=>a.push(l)),{mode:t.mode,value:n,pads:a}}else return t},Ql=(e,t)=>{oh(e.inputs);let r=ch(e.inputs,t);e.compute(dh(e.inputs,r),{inputs:[0]})}});var nn,Jl,ed,td,rd,ph,mh,nd,od,id,ad,sd,ud,ld,dd,cd,pd,md,fd,hd=U(()=>{"use strict";We();te();oe();ae();nn=e=>{if(_e.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Jl=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),l=t.strides.slice(),d=i?t.dilations.slice():[],p=t.pads.slice();It.adjustPoolAttributes(r,o,a,l,d,p);let m=It.computePoolOutputShape(r,o,l,d,a,p,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:l,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:l,pads:p,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},ed=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(p+m);i.push({type:12,data:l},{type:12,data:d},{type:12,data:p},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],b=t.pads[t.pads.length/2-2],S=t.pads[t.pads.length-2];h=!!(b+S),i.push({type:12,data:w},{type:12,data:y},{type:12,data:b},{type:12,data:S}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=k.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,m)=>p+m);return[i,a,!!d,!1,!1]}},td=(e,t,r,n,o,i,a,l,d,p,m,u)=>{let h=o.format==="NHWC",w=t.type.value,y=D("output",t.type.tensor,n);if(o.kernelShape.length<=2){let b="",S="",$="",v=r-(h?2:1);if(m?b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:b=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:S=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                `,$=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${w}(${l});
              var pad = 0;
              ${S}
              ${b}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let b=o.kernelShape.length,S=o.pads.length,$="";return p?$=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${i}
              }`:$=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${e.registerUniforms(d).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${b}>;

              var value = ${w}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${b-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",b)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",b)};
                }
                offsets[${b-1}] = offset;

                isPad = false;
                for (var j = ${r-b}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-b}u`,b)}
                    + offsets[j - ${r-b}u] - ${F("uniforms.pads","j - 2u",S)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},rd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,ph=e=>`${rd(e)};${e.countIncludePad}`,mh=e=>`${rd(e)};${e.storageOrder};${e.dilations}`,nd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),od=(e,t,r,n)=>{let[o,i]=Jl(t,n,r),a=E("x",t.dataType,t.dims.length),l=a.type.value,d="value += x_val;",p="";o.countIncludePad?p+=`value /= ${l}(uniforms.kernelSize);`:p+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,w,y]=ed(i,o);m.push(...N(t.dims,i));let b=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${y}`,inputDependencies:b},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:S=>td(S,a,t.dims.length,i.length,o,d,p,0,u,h,w,y)}},id=e=>{let t=e.count_include_pad!==0,r=nd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:ph(n)}},ad=(e,t)=>{nn(e.inputs),e.compute(od("AveragePool",e.inputs[0],!1,t))},sd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ud=e=>{let t=e.format;return{format:t,...sd,cacheKey:t}},ld=(e,t)=>{nn(e.inputs),e.compute(od("GlobalAveragePool",e.inputs[0],!0,t))},dd=(e,t,r,n)=>{let[o,i]=Jl(t,n,r),a=`
      value = max(x_val, value);
    `,l="",d=E("x",t.dataType,t.dims.length),p=["rank"],[m,u,h,w,y]=ed(i,o);return m.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:b=>td(b,d,t.dims.length,i.length,o,a,l,t.dataType===10?-65504:-1e5,u,h,w,y)}},cd=(e,t)=>{nn(e.inputs),e.compute(dd("MaxPool",e.inputs[0],!1,t))},pd=e=>{let t=e.storage_order,r=e.dilations,n=nd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:mh(o)}},md=e=>{let t=e.format;return{format:t,...sd,cacheKey:t}},fd=(e,t)=>{nn(e.inputs),e.compute(dd("GlobalMaxPool",e.inputs[0],!0,t))}});var hh,gh,gd,bd,yd=U(()=>{"use strict";te();oe();Ce();ae();hh=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gh=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,l=k.size(i),d=n===3||n===2,p=d?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?d?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,w=m.length===0||m.length===1&&m[0]===1,y=w===!1&&m.length===1,b=me(l),S=w&&(!d||b===4),$=S?b:1,v=S&&!d?b:1,x=E("input",d?12:n,p.length,v),T=E("scale",a,m.length),C=u?E("zero_point",d?12:n,h.length):void 0,A=D("output",a,i.length,$),P=[x,T];C&&P.push(C);let O=[p,m];u&&O.push(h);let R=[{type:12,data:l/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...O,i)],G=q=>{let K=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${q.registerUniforms(K).declareVariables(...P,A)}
      ${q.mainStart()}
          ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>d?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>w?`let scale_value= ${T.getByOffset("0")}`:y?`
            let scale_index = ${A.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${T.getByOffset("scale_index")};`:`
            var scale_indices: ${T.type.indices} = output_indices;
            let index = ${T.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${T.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${T.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>C?w?d?`
                let zero_point_input = ${C.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${C.getByOffset("0")}`:y?d?`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${C.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${A.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${C.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${T.indicesToOffset("scale_indices")};
                let zero_point_input = ${C.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":x.type.value}(0);`)()};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:G,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:R})}},gd=(e,t)=>{hh(e.inputs,t),e.compute(gh(e.inputs,t))},bd=e=>re({axis:e.axis,blockSize:e.blockSize})});var bh,yh,wd,_d=U(()=>{"use strict";We();te();ae();bh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},yh=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,l=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],d=p=>{let m=D("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${p.registerUniforms(h).declareVariables(m)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},wd=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),_e.webgpu.validateInputContent&&bh(t,r,n),e.compute(yh(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var wh,_h,vh,$h,xh,Sh,Th,Ih,Ch,Ah,kh,vd,Eh,Ph,zh,Oh,Bh,$d,xd,Sd=U(()=>{"use strict";te();oe();Ce();ae();wh=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},_h=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},vh=(e,t,r,n,o,i)=>{let[a,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");wh(n,t),t.axes.length>0&&_h(n,t.axes,p).forEach((m,u)=>n[u]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==p&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},$h=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",xh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Sh=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},Th=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Ih=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},Ch=(e,t,r,n,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",n)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${t.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Ah=(e,t,r,n,o,i,a)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${F("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${F("uniforms.roi","i",i)};
          var roi_hi = ${F("uniforms.roi",`i + ${r.length}`,i)};
          var input_shape_i = ${F("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${a} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
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
    }`,kh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,vd=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Eh=(e,t,r,n,o)=>{let[a,l,d,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(row, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${vd(e,p,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${m} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${m} = originalIndices[${l}];
      var col:${m} = originalIndices[${d}];
      ${n?`if (row < 0 || row > (${r[l]} - 1) || col < 0 || col > (${r[d]} - 1)) {
        return ${o};
      }`:""};
      row = max(0, min(row, ${r[l]} - 1));
      col = max(0, min(col, ${r[d]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${m} = getInputValue(batch, channel, row1, col1);
      var x12: ${m} = getInputValue(batch, channel, row1, col2);
      var x21: ${m} = getInputValue(batch, channel, row2, col1);
      var x22: ${m} = getInputValue(batch, channel, row2, col2);
      var dx1: ${m} = abs(row - ${m}(row1));
      var dx2: ${m} = abs(${m}(row2) - row);
      var dy1: ${m} = abs(col - ${m}(col1));
      var dy2: ${m} = abs(${m}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ph=(e,t,r,n,o,i,a,l,d,p)=>{let m=r.length===2,u=!0,[h,w]=m?[0,1]:u?[2,3]:[1,2],y=e.type.value,b=S=>{let $=S===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",S)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[S]},
        ${n[S]}, ${r[S]}, ${i[S]}, ${i[S]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[S]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[S]}) {
            ${(()=>p?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${$} = max(0, min(${$}, ${r[S]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",S,`u32(${$})`)};
          data[i + 1] = ${S===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${b(h)};
    ${b(w)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${a} * onePlusAbsS - 5 * ${a}) * onePlusAbsS + 8 * ${a}) * onePlusAbsS - 4 * ${a};
    coeffs[1] = ((${a} + 2) * absS - (${a} + 3)) * absS * absS + 1;
    coeffs[2] = ((${a} + 2) * oneMinusAbsS - (${a} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${a} * twoMinusAbsS - 5 * ${a}) * twoMinusAbsS + 8 * ${a}) * twoMinusAbsS - 4 * ${a};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},zh=(e,t,r,n,o)=>{let[a,l,d,p,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(depth, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${vd(e,m,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${u} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${u} = originalIndices[${l}];
      var height:${u} = originalIndices[${d}];
      var width:${u} = originalIndices[${p}];
      ${n?`if (depth < 0 || depth > (${r[l]} - 1) || height < 0 || height > (${r[d]} - 1) || width < 0 || (width > ${r[p]} - 1)) {
      return ${o};
        }`:""};

    depth = max(0, min(depth, ${r[l]} - 1));
      height = max(0, min(height, ${r[d]} - 1));
      width = max(0, min(width, ${r[p]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${m}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${u} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${u} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${u} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${u} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${u} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${u} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${u} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${u} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${u} = abs(depth - ${u}(depth1));
      var dx2: ${u} = abs(${u}(depth2) - depth);
      var dy1: ${u} = abs(height - ${u}(height1));
      var dy2: ${u} = abs(${u}(height2) - height);
      var dz1: ${u} = abs(width - ${u}(width1));
      var dz2: ${u} = abs(${u}(width2) - width);
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
    }`},Oh=(e,t,r,n,o,i)=>{let a=e.dims,l=Sh(i,t.axes,a.length),d=Th(a,n,o,t.axes),p=n.slice();n.length===0&&(p=a.map((v,x)=>v===0?1:d[x]/v),t.keepAspectRatioPolicy!=="stretch"&&(d=Ih(a,p,t)));let m=D("output",e.dataType,d.length),u=E("input",e.dataType,a.length),h=k.size(d),w=a.length===d.length&&a.every((v,x)=>v===d[x]),y=t.coordinateTransformMode==="tf_crop_and_resize",b=t.extrapolationValue,S=u.type.value,$=v=>`
      ${w?"":`
      ${$h(t.coordinateTransformMode,S)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${kh(u,a)};
              ${xh(t.nearestMode,r,S)};
              ${Ah(u,m,a,d,p.length,l.length,y)};
              `;case"linear":return`
              ${Ch(m,a,d,p.length,l.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Eh(u,m,a,y,b)}`;if(a.length===3||a.length===5)return`${zh(u,m,a,y,b)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Ph(u,m,a,d,p,l,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${v.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",l.length).declareVariables(u,m)}
      ${v.mainStart()}
        ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${w?"output[global_idx] = input[global_idx];":`
        let output_indices = ${m.offsetToIndices("global_idx")};
        var input_indices: ${u.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${u.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${a.length===2||a.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?p:""}|${o.length>0?o:""}|${l.length>0?l:""}|${w}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:p},{type:1,data:l},...N(a,d)]})}},Bh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},$d=(e,t)=>{let r=[],n=[],o=[],i=Bh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");vh(e.inputs,t,i,r,n,o),e.compute(Oh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},xd=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:l,mode:d,nearestMode:p})}});var Mh,Dh,Td,Id=U(()=>{"use strict";te();oe();Ce();ae();Mh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/p,h=l===0?o.dims[1]*2:u/a;if(l>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(p!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&l/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Dh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],l=k.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=l/d,m=e[2].dims[1],u=o===0?m*2:p/n,h=new Array(a,d,p/u,u-m),w=k.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[l,p,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,u,d*u,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],b=S=>{let $=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),x=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),C=D("output",e[0].dataType,e[0].dims.length);return S.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${S.declareVariables($,v,x,T,C)}

        ${S.mainStart(Ct)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${S.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",D("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Ct)},programUniforms:y})}},Td=(e,t)=>{Mh(e.inputs,t),e.compute(Dh(e.inputs,t))}});var Rh,Uh,Cd,Ad=U(()=>{"use strict";te();oe();ae();Rh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Uh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),l=i,d=a,p=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,w=n&&r>1,y=n&&r>2,b=r>3,S=64,$=me(p),v=[{type:12,data:d},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],x=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&P.push(E("beta",e[3].dataType,e[3].dims,$)),h&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(D("output",e[0].dataType,l,$)),w&&P.push(D("mean_output",1,m)),y&&P.push(D("inv_std_output",1,m)),b&&P.push(D("input_skip_bias_sum",e[0].dataType,l,$));let O=ye(e[0].dataType),R=ye(1,$);return`

      ${C.registerUniforms(A).declareVariables(...P)}
      var<workgroup> sum_shared : array<${R}, ${S}>;
      var<workgroup> sum_squared_shared : array<${R}, ${S}>;

      ${C.mainStart([S,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${S};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${S};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${S-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${b?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(O,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${S};
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
        let mean = ${He("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${He("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:l,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${w};${y};${b}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:x,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:v})}},Cd=(e,t)=>{Rh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Uh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var Nh,on,Vh,kd,Wh,Lh,Ed,Pd,zd=U(()=>{"use strict";te();oe();Ce();ae();Nh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},on=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Vh=(e,t)=>{if(e.length>1){let r=on(e,1),n=on(e,2),o=on(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:r,ends:n,axes:o})}else return t},kd=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},Wh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",r.length)};
            let steps_i = ${F("uniforms.steps","i",r.length)};
            let signs_i = ${F("uniforms.signs","i",r.length)};
            let starts_i = ${F("uniforms.starts","i",r.length)};
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
      }`,Lh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=on(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>kd($,v,r,o,i)),l=t.ends.map(($,v)=>kd($,v,r,o,i));if(o.length!==a.length||o.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),l.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,v,x)=>{if($<0){let T=(l[v]-a[v])/$,C=a[v],A=C+T*i[v];a[v]=A,l[v]=C,x[v]=-$}});let p=r.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((l[$]-a[$])/i[$])});let m={dims:p,dataType:e[0].dataType},u=D("output",e[0].dataType,p.length),h=E("input",e[0].dataType,e[0].dims.length),w=k.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],b=[{type:12,data:w},{type:12,data:a},{type:6,data:d},{type:12,data:i},...N(e[0].dims,p)],S=$=>`
      ${$.registerUniforms(y).declareVariables(h,u)}
        ${Wh(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:S,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:b})}},Ed=(e,t)=>{Nh(e.inputs,t);let r=Vh(e.inputs,t);e.compute(Lh(e.inputs,r),{inputs:[0]})},Pd=e=>{let t=e.starts,r=e.ends,n=e.axes;return re({starts:t,ends:r,axes:n})}});var Gh,Hh,Od,Bd,Md=U(()=>{"use strict";te();oe();Ce();ut();ae();Gh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Hh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=n.length,a=k.normalizeAxis(t.axis,i),l=a<n.length-1,d,p=[];l?(p=Array.from({length:i},(P,O)=>O),p[a]=i-1,p[i-1]=a,d=e.compute(Ee(r,p),{inputs:[r],outputs:[-1]})[0]):d=r;let m=d.dims,u=m[i-1],h=o/u,w=me(u),y=u/w,b=64;h===1&&(b=256);let S=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",d.dataType,d.dims,w),v=D("result",d.dataType,d.dims,w),x=$.type.value,T=ye(d.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,C=P=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${b}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables($,v)}
      ${P.mainStart(b)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${b};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${T}
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
          rowMaxShared = ${x}(${S("threadShared[0]",w)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${x}(0.0);
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
          rowSumShared = ${x}(${He("threadShared[0]",w)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${w};${b}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:C},{inputs:[d],outputs:[l?-1:0]})[0];l&&e.compute(Ee(A,p),{inputs:[A]})},Od=(e,t)=>{Gh(e.inputs),Hh(e,t)},Bd=e=>re({axis:e.axis})});var Dd,Fh,qh,jh,Rd,Ud=U(()=>{"use strict";te();oe();ae();Dd=e=>Array.from(e.getBigInt64Array(),Number),Fh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Dd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},qh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},jh=(e,t)=>{let r=e[0].dims,n=t??Dd(e[1]),o=qh(r,n),i=k.size(o),a=e[0].dataType,l=E("input",a,r.length),d=D("output",a,o.length),p=m=>`
      const inputShape = ${l.indices(...r)};
      ${m.registerUniform("output_size","u32").declareVariables(l,d)}
      ${m.mainStart()}
      ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${l.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${l.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${l.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",l.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:p}},Rd=e=>{Fh(e.inputs),e.compute(jh(e.inputs),{inputs:[0]})}});var Kh,Yh,Nd,Vd=U(()=>{"use strict";te();oe();ae();Kh=(e,t,r,n,o)=>{let i=D("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),l=E("b_data",t[2].dataType,t[2].dims.length,4),d=E("c_data",t[0].dataType,t[0].dims.length,4),p,m=(u,h,w)=>`select(${h}, ${u}, ${w})`;if(!n)p=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let u=(h,w,y="")=>{let b=`a_data[index_a${w}][component_a${w}]`,S=`b_data[index_b${w}][component_b${w}]`,$=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
            let output_indices${w} = ${i.offsetToIndices(`global_idx * 4u + ${w}u`)};
            let offset_a${w} = ${a.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let offset_b${w} = ${l.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let offset_c${w} = ${d.broadcastedIndicesToOffset(`output_indices${w}`,i)};
            let index_a${w} = offset_a${w} / 4u;
            let index_b${w} = offset_b${w} / 4u;
            let index_c${w} = offset_c${w} / 4u;
            let component_a${w} = offset_a${w} % 4u;
            let component_b${w} = offset_b${w} % 4u;
            let component_c${w} = offset_c${w} % 4u;
            ${h}[${w}] = ${y}(${m(b,S,$)});
          `};o===9?p=`
            var data = vec4<u32>(0);
            ${u("data",0,"u32")}
            ${u("data",1,"u32")}
            ${u("data",2,"u32")}
            ${u("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${u("output_data[global_idx]",0)}
            ${u("output_data[global_idx]",1)}
            ${u("output_data[global_idx]",2)}
            ${u("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,a,l,i)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Yh=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,l=k.size(t);if(i){let p=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!p)throw new Error("Can't perform where op on the given tensors");a=p,l=k.size(a)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Kh(p,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...N(n,t,r,a)]})}},Nd=e=>{e.compute(Yh(e.inputs))}});var Wd,Ld=U(()=>{"use strict";As();jr();Ps();Os();yu();ku();zu();Ku();tl();ol();sl();pl();hl();bl();_l();xl();Il();kl();zl();Vl();Gl();Fl();jl();Zl();To();Xl();hd();yd();_d();Fr();Sd();Id();Ad();zd();Md();Co();Ud();ut();Yr();Vd();Wd=new Map([["Abs",[Bs]],["Acos",[Ms]],["Acosh",[Ds]],["Add",[wu]],["ArgMax",[Cs,po]],["ArgMin",[Is,po]],["Asin",[Rs]],["Asinh",[Us]],["Atan",[Ns]],["Atanh",[Vs]],["Attention",[ks]],["AveragePool",[ad,id]],["BatchNormalization",[Es]],["BiasAdd",[zs]],["BiasSplitGelu",[bu]],["Cast",[Ls,Ws]],["Ceil",[Hs]],["Clip",[Gs]],["Concat",[Eu,Pu]],["Conv",[vo,_o]],["ConvTranspose",[el,Xu]],["Cos",[Fs]],["Cosh",[qs]],["CumSum",[rl,nl]],["DepthToSpace",[il,al]],["DequantizeLinear",[gd,bd]],["Div",[_u]],["Einsum",[dl,cl]],["Elu",[js,Jt]],["Equal",[vu]],["Erf",[Ks]],["Exp",[Ys]],["Expand",[fl]],["FastGelu",[gl]],["Floor",[Zs]],["FusedConv",[vo,_o]],["Gather",[wl,yl]],["GatherElements",[Tl,Sl]],["GatherBlockQuantized",[vl,$l]],["Gelu",[Qs]],["Gemm",[Al,Cl]],["GlobalAveragePool",[ld,ud]],["GlobalMaxPool",[fd,md]],["Greater",[Tu]],["GreaterOrEqual",[Cu]],["GridSample",[El,Pl]],["GroupQueryAttention",[Nl]],["HardSigmoid",[iu,ou]],["InstanceNormalization",[Ll]],["LayerNormalization",[Hl]],["LeakyRelu",[Xs,Jt]],["Less",[Iu]],["LessOrEqual",[Au]],["Log",[fu]],["MatMul",[ql]],["MatMulNBits",[Kl,Yl]],["MaxPool",[cd,pd]],["Mul",[$u]],["MultiHeadAttention",[Ml,Bl]],["Neg",[eu]],["Not",[Js]],["Pad",[Ql]],["Pow",[xu]],["QuickGelu",[hu,Jt]],["Range",[wd]],["Reciprocal",[tu]],["ReduceMin",[_s]],["ReduceMean",[hs]],["ReduceMax",[ws]],["ReduceSum",[$s]],["ReduceProd",[vs]],["ReduceL1",[gs]],["ReduceL2",[bs]],["ReduceLogSum",[Ss]],["ReduceLogSumExp",[ys]],["ReduceSumSquare",[xs]],["Relu",[ru]],["Resize",[$d,xd]],["RotaryEmbedding",[Td]],["Sigmoid",[nu]],["Sin",[au]],["Sinh",[su]],["Slice",[Ed,Pd]],["SkipLayerNormalization",[Cd]],["Split",[Dl,Rl]],["Sqrt",[uu]],["Softmax",[Od,Bd]],["Sub",[Su]],["Tan",[lu]],["Tanh",[cu]],["ThresholdedRelu",[mu,Jt]],["Tile",[Rd]],["Transpose",[rs,ns]],["Where",[Nd]]])});var an,Gd=U(()=>{"use strict";We();Je();ae();an=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Ue(t.programInfo.name);let a=this.backend.device,l=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let m of r)d.push({binding:d.length,resource:{buffer:m.buffer}});for(let m of n)d.push({binding:d.length,resource:{buffer:m.buffer}});i&&d.push({binding:d.length,resource:i});let p=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}l.setPipeline(t.computePipeline),l.setBindGroup(0,p),l.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Me(t.programInfo.name)}dispose(){}build(t,r){Ue(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(u=>{n.features.has(u.feature)&&o.push(`enable ${u.extension};`)});let a=es(r,this.backend.device.limits),l=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${l}`,p=n.createShaderModule({code:d,label:t.name});ue("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let m=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Me(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,l=Math.ceil(Math.sqrt(a));if(l>i){if(l=Math.ceil(Math.cbrt(a)),l>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[l,l,l]}else return[l,l,1]}}});var Zh,Qh,Ao,ko,sn,Hd=U(()=>{"use strict";We();te();Je();Jn();Qa();Ld();Gd();Zh=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Qh=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Zh(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Ao=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},ko=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},sn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new ko(this.device),this.adapterInfo=new Ao(r.info||await r.requestAdapterInfo()),this.gpuDataManager=Za(this),this.programManager=new an(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Vr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ue(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,l=this.kernels.get(a),d=l.kernelType,p=l.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,w=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let b=Number(w-this.queryTimeBase),S=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(b)||!Number.isSafeInteger(S))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:gt($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:gt($.dataType)})),kernelId:a,kernelType:d,kernelName:p,programName:m,startTime:b,endTime:S});else{let $="";u.forEach((x,T)=>{$+=`input[${T}]: [${x.dims}] | ${gt(x.dataType)}, `});let v="";h.forEach((x,T)=>{v+=`output[${T}]: [${x.dims}] | ${gt(x.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${p}|${m}" ${$}${v}execution time: ${S-b} ns`)}xr("GPU",`${m}::${w}::${y}`)}t.unmap(),this.pendingQueries.delete(t)}),Me()}run(t,r,n,o,i,a){Ue(t.name);let l=[];for(let x=0;x<r.length;++x){let T=r[x].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);l.push(C)}let{outputs:d,dispatchGroup:p,programUniforms:m}=t.getRunData(r),u=n.length===0?d.map((x,T)=>T):n;if(u.length!==d.length)throw new Error(`Output size ${u.length} must be equal to ${d.length}.`);let h=[],w=[];for(let x=0;x<d.length;++x){if(!Number.isInteger(u[x])||u[x]<-3||u[x]>=a)throw new Error(`Invalid output index: ${u[x]}`);if(u[x]===-3)continue;let T=u[x]===-1,C=u[x]===-2,A=T||C?i(d[x].dataType,d[x].dims):o(u[x],d[x].dataType,d[x].dims);if(h.push(A),A.data===0)continue;let P=this.gpuDataManager.get(A.data);if(!P)throw new Error(`no GPU data for output: ${A.data}`);if(T&&this.temporaryData.push(P),C){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}w.push(P)}if(l.length!==r.length||w.length!==h.length){if(w.length===0)return Me(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(m){let x=0,T=[];m.forEach(O=>{let R=typeof O.data=="number"?[O.data]:O.data;if(R.length===0)return;let G=O.type===10?2:4,q,K;O.type===10?(K=R.length>4?16:R.length>2?8:R.length*G,q=R.length>4?16:G*R.length):(K=R.length<=2?R.length*G:16,q=16),x=Math.ceil(x/K)*K,T.push(x);let W=O.type===10?8:4;x+=R.length>4?Math.ceil(R.length/W)*q:R.length*G});let C=16;x=Math.ceil(x/C)*C;let A=new ArrayBuffer(x);m.forEach((O,R)=>{let G=T[R],q=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(A,G,q.length).set(q);else if(O.type===12)new Uint32Array(A,G,q.length).set(q);else if(O.type===10)new Uint16Array(A,G,q.length).set(q);else if(O.type===1)new Float32Array(A,G,q.length).set(q);else throw new Error(`Unsupported uniform type: ${gt(O.type)}`)});let P=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,A,0,x),this.gpuDataManager.release(P.id),y={offset:0,size:x,buffer:P.buffer}}let b=this.programManager.normalizeDispatchGroupSize(p),S=b[1]===1&&b[2]===1,$=Qh(t,r,S),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,b),this.programManager.setArtifact($,v),ue("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let x=0;x<m.length;x++){let T=m[x],C=T.type,A=typeof T.data=="number"?1:T.data.length,[P,O]=v.uniformVariablesInfo[x];if(C!==P||A!==O)throw new Error(`Uniform variable ${x} mismatch: expect type ${P} with size ${O}, got type ${C} with size ${A} in program "${v.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${b[0]}x${b[1]}x${b[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(v,l,w,b,y),Me(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Wd.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,l=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),l(r,d[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{p&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),l=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[l,n]),l}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await no(this,t,r);return Wr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var Xh,Fd,Jh,qd,un,ln,Eo,jd,Kd=U(()=>{"use strict";Je();Xh=1,Fd=()=>Xh++,Jh=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),qd=(e,t)=>{let r=Jh.get(e);if(!r)throw new Error("Unsupported data type.");return Math.ceil(t.reduce((n,o)=>n*o)*r/8)},un=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return qd(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,o)=>n===r[o])}},ln=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==qd(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},Eo=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=Fd();return this.tensorTrackersById.set(t,new ln(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=Fd(),a=new un({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(i,new ln(this,a)),this.externalTensors.add(a),i}async getCachedTensor(t,r,n,o,i){let a=this.backend.currentSessionId;for(let[p,m]of this.freeTensors.entries())if(m.sameTypeAndShape(t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let u=this.freeTensors.splice(p,1)[0];return u.sessionId=a,u}let l=this.backend.currentContext;ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let d=await l.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:i});return new un({sessionId:a,context:l,tensor:d,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},jd=(...e)=>new Eo(...e)});var Yd,eg,dn,Zd=U(()=>{"use strict";te();ht();Jn();Kd();Je();Yd=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),eg=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},dn=class{constructor(t){this.tensorManager=jd(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Vr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>eg(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Yd.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return Wr(n,r)}}registerMLTensor(t,r,n){let o=Yd.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let d=a.get(l);if(!d)throw new Error(`File with name ${l} not found in preloaded files.`);if(r+n>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=d.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,m)}flush(){}}});var Qd={};Ft(Qd,{init:()=>tg});var nr,Po,tg,Xd=U(()=>{"use strict";te();Hd();Je();oe();Zd();nr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Po=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let l=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let p=0;p<l;p++){let m=Number(t.getValue(o*i++,a)),u=Number(t.getValue(o*i++,"*")),h=Number(t.getValue(o*i++,a)),w=[];for(let y=0;y<h;y++)w.push(Number(t.getValue(o*i++,a)));d.push(new nr(t,m,u,w))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(l=>typeof l=="number"?this.inputs[l]:l)??this.inputs,o=r?.outputs??[],i=(l,d,p)=>new nr(this.module,d,this.output(l,p),p),a=(l,d)=>{let p=Tt(l,d);if(!p)throw new Error(`Unsupported data type: ${l}`);let m=p>0?this.backend.gpuDataManager.create(p).id:0;return new nr(this.module,l,m,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let l=0;l<r.length;l++)this.module.setValue(a+o*(l+1),r[l],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},tg=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new sn;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,l,d,p=!1)=>{if(p)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(a),Number(l));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let m=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(d));i.upload(Number(l),m)}},async(a,l,d)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${l}, size=${d}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(a,l,d)=>i.createKernel(a,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),a=>i.releaseKernel(a),(a,l,d,p)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${a}, contextDataOffset=${l}`);let m=new Po(t,i,Number(l));return i.computeKernel(Number(a),m,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new dn(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,l,d,p)=>i.ensureTensor(a,l,d,p),(a,l)=>{i.uploadTensor(a,l)},async(a,l)=>i.downloadTensor(a,l)])}}});var rg,Ar,kr,kt,ng,Kt,Er,Pr,Jd,zr,Or,Br,jn=U(()=>{"use strict";La();Ha();te();ht();Dr();Xn();rg=(e,t)=>{Ie()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},Ar=async e=>{rg(e.wasm.numThreads,Qt(e.logLevel))},kr=async(e,t)=>{{let r=(Xd(),br(Qd)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ie(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ie(),e)}}},kt=new Map,ng=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&pe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},Kt=e=>{let t=Ie(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Er=async(e,t)=>{let r,n,o=Ie();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=Kt(e);let i=0,a=0,l=0,d=[],p=[],m=[];try{if([a,d]=Ga(t),t?.externalData&&o.mountExternalData){let v=[];for(let x of t.externalData){let T=typeof x=="string"?x:x.path;v.push(Xt(typeof x=="string"?x:x.data).then(C=>{o.mountExternalData(T,C)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let T=v,C=T?.context,A=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;C?o.currentContext=C:A?o.currentContext=await o.jsepCreateMLContext(A):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=ng(i),w=!!t?.enableGraphCapture,y=[],b=[],S=[];for(let v=0;v<u;v++){let x=o._OrtGetInputName(i,v);x===0&&pe("Can't get an input name."),p.push(x),y.push(o.UTF8ToString(x))}for(let v=0;v<h;v++){let x=o._OrtGetOutputName(i,v);x===0&&pe("Can't get an output name."),m.push(x);let T=o.UTF8ToString(x);b.push(T);{if(w&&t?.preferredOutputLocation===void 0){S.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(w&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);S.push(C)}}let $=null;return S.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(l=o._OrtCreateBinding(i),l===0&&pe("Can't create IO binding."),$={handle:l,outputPreferredLocations:S,outputPreferredLocationsEncoded:S.map(v=>Qn(v))}),kt.set(i,[i,p,m,$,w,!1]),[i,y,b]}catch(u){throw p.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),l!==0&&o._OrtReleaseBinding(l)!==0&&pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&pe("Can't release session."),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&pe("Can't release session options."),d.forEach(u=>o._free(u)),o.unmountExternalData?.()}},Pr=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,l]=r;a&&(l&&t._OrtClearBoundOutputs(a.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&pe("Can't release session."),kt.delete(e)},Jd=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ie(),l=a.PTR_SIZE,d=e[0],p=e[1],m=e[3],u,h;if(d==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let b=e[2].gpuBuffer;h=Tt(Zt(d),p);let S=a.jsepRegisterBuffer;if(!S)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');u=S(n,o,b,h)}else if(m==="ml-tensor"){let b=e[2].mlTensor;h=Tt(Zt(d),p);let S=a.jsepRegisterMLTensor;if(!S)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');u=S(b,Zt(d),p)}else{let b=e[2];if(Array.isArray(b)){h=l*b.length,u=a._malloc(h),r.push(u);for(let S=0;S<b.length;S++){if(typeof b[S]!="string")throw new TypeError(`tensor data at index ${S} is not a string`);a.setValue(u+S*l,Ae(b[S],r),"*")}}else h=b.byteLength,u=a._malloc(h),r.push(u),a.HEAPU8.set(new Uint8Array(b.buffer,b.byteOffset,h),u)}let w=a.stackSave(),y=a.stackAlloc(4*p.length);try{p.forEach((S,$)=>a.setValue(y+$*l,S,l===4?"i32":"i64"));let b=a._OrtCreateTensor(Zt(d),u,h,y,p.length,Qn(m));b===0&&pe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(b)}finally{a.stackRestore(w)}},zr=async(e,t,r,n,o,i)=>{let a=Ie(),l=a.PTR_SIZE,d=kt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=d[0],m=d[1],u=d[2],h=d[3],w=d[4],y=d[5],b=t.length,S=n.length,$=0,v=[],x=[],T=[],C=[],A=a.stackSave(),P=a.stackAlloc(b*l),O=a.stackAlloc(b*l),R=a.stackAlloc(S*l),G=a.stackAlloc(S*l);try{a.jsepOnRunStart?.(p),[$,v]=Wa(i);for(let W=0;W<b;W++)Jd(r[W],x,C,e,t[W],w);for(let W=0;W<S;W++)Jd(o[W],T,C,e,b+n[W],w);for(let W=0;W<b;W++)a.setValue(P+W*l,x[W],"*"),a.setValue(O+W*l,m[t[W]],"*");for(let W=0;W<S;W++)a.setValue(R+W*l,T[W],"*"),a.setValue(G+W*l,u[n[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:Y,outputPreferredLocationsEncoded:se}=h;if(m.length!==b)throw new Error(`input count from feeds (${b}) is expected to be always equal to model's input count (${m.length}).`);for(let X=0;X<b;X++){let ee=t[X];await a._OrtBindInput(W,m[ee],x[X])!==0&&pe(`Can't bind input[${X}] for session=${e}.`)}for(let X=0;X<S;X++){let ee=n[X];o[X]?.[3]?a._OrtBindOutput(W,u[ee],T[X],0)!==0&&pe(`Can't bind pre-allocated output[${X}] for session=${e}.`):a._OrtBindOutput(W,u[ee],0,se[ee])!==0&&pe(`Can't bind output[${X}] to ${Y[X]} for session=${e}.`)}kt.set(e,[p,m,u,h,w,!0])}let q;h?q=await a._OrtRunWithBinding(p,h.handle,S,R,$):q=await a._OrtRun(p,O,P,b,G,S,R,$),q!==0&&pe("failed to call OrtRun().");let K=[];for(let W=0;W<S;W++){let Y=Number(a.getValue(R+W*l,"*"));if(Y===T[W]){K.push(o[W]);continue}let se=a.stackSave(),X=a.stackAlloc(4*l),ee=!1,J,ne=0;try{a._OrtGetTensorData(Y,X,X+l,X+2*l,X+3*l)!==0&&pe(`Can't access output tensor data on index ${W}.`);let Be=l===4?"i32":"i64",$e=Number(a.getValue(X,Be));ne=a.getValue(X+l,"*");let de=a.getValue(X+l*2,"*"),V=Number(a.getValue(X+l*3,Be)),j=[];for(let we=0;we<V;we++)j.push(Number(a.getValue(de+we*l,Be)));a._OrtFree(de)!==0&&pe("Can't free memory for tensor dims.");let he=j.reduce((we,be)=>we*be,1);J=gt($e);let Ge=h?.outputPreferredLocations[n[W]];if(J==="string"){if(Ge==="gpu-buffer"||Ge==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let we=[];for(let be=0;be<he;be++){let Ke=a.getValue(ne+be*l,"*"),Lt=a.getValue(ne+(be+1)*l,"*"),gn=be===he-1?void 0:Lt-Ke;we.push(a.UTF8ToString(Ke,gn))}K.push([J,j,we,"cpu"])}else if(Ge==="gpu-buffer"&&he>0){let we=a.jsepGetBuffer;if(!we)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=we(ne),Ke=Tt($e,he);if(Ke===void 0||!Ur(J))throw new Error(`Unsupported data type: ${J}`);ee=!0,K.push([J,j,{gpuBuffer:be,download:a.jsepCreateDownloader(be,Ke,J),dispose:()=>{a._OrtReleaseTensor(Y)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(Ge==="ml-tensor"&&he>0){let we=a.jsepEnsureTensor;if(!we)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt($e,he)===void 0||!Nr(J))throw new Error(`Unsupported data type: ${J}`);let Ke=await we(ne,$e,j,!1);ee=!0,K.push([J,j,{mlTensor:Ke,download:a.jsepCreateMLTensorDownloader(ne,J),dispose:()=>{a.jsepReleaseTensorId(ne),a._OrtReleaseTensor(Y)}},"ml-tensor"])}else{let we=Rr(J),be=new we(he);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(a.HEAPU8.subarray(ne,ne+be.byteLength)),K.push([J,j,be,"cpu"])}}finally{a.stackRestore(se),J==="string"&&ne&&a._free(ne),ee||a._OrtReleaseTensor(Y)}}return h&&!w&&(a._OrtClearBoundOutputs(h.handle)!==0&&pe("Can't clear bound outputs."),kt.set(e,[p,m,u,h,w,!1])),K}finally{a.stackRestore(A),x.forEach(q=>a._OrtReleaseTensor(q)),T.forEach(q=>a._OrtReleaseTensor(q)),C.forEach(q=>a._free(q)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(q=>a._free(q))}},Or=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&pe("Can't get an profile file name."),t._OrtFree(o)},Br=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,Le,or,pn,mn,cn,zo,Oo,Vt,Wt,ig,ec,tc,rc,nc,oc,ic,ac,Bo=U(()=>{"use strict";We();jn();ht();jt();Et=()=>!!_e.wasm.proxy&&typeof document<"u",or=!1,pn=!1,mn=!1,Oo=new Map,Vt=(e,t)=>{let r=Oo.get(e);r?r.push(t):Oo.set(e,[t])},Wt=()=>{if(or||!pn||mn||!Le)throw new Error("worker not ready")},ig=e=>{switch(e.data.type){case"init-wasm":or=!1,e.data.err?(mn=!0,zo[1](e.data.err)):(pn=!0,zo[0]()),cn&&(URL.revokeObjectURL(cn),cn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Oo.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},ec=async()=>{if(!pn){if(or)throw new Error("multiple calls to 'initWasm()' detected.");if(mn)throw new Error("previous call to 'initWasm()' failed.");if(or=!0,Et())return new Promise((e,t)=>{Le?.terminate(),Ua().then(([r,n])=>{try{Le=n,Le.onerror=i=>t(i),Le.onmessage=ig,zo=[e,t];let o={type:"init-wasm",in:_e};Le.postMessage(o),cn=r}catch(o){t(o)}},t)});try{await Cr(_e.wasm),await Ar(_e),pn=!0}catch(e){throw mn=!0,e}finally{or=!1}}},tc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:_e}};Le.postMessage(n)});await kr(_e,e)},rc=async e=>Et()?(Wt(),new Promise((t,r)=>{Vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Le.postMessage(n,[e.buffer])})):Kt(e),nc=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wt(),new Promise((r,n)=>{Vt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Le.postMessage(o,i)})}else return Er(e,t)},oc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("release",[t,r]);let n={type:"release",in:e};Le.postMessage(n)});Pr(e)},ic=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wt(),new Promise((a,l)=>{Vt("run",[a,l]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Le.postMessage(p,Br(d))})}else return zr(e,t,r,n,o,i)},ac=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Le.postMessage(n)});Or(e)}});var sc,ag,fn,uc=U(()=>{"use strict";We();Bo();te();Ir();Xn();sc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},ag=e=>{switch(e[3]){case"cpu":return new Oe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Ur(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return Oe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Nr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return Oe.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},fn=class{async fetchModelAndCopyToWasmMemory(t){return rc(await Xt(t))}async loadModel(t,r){Ue();let n;typeof t=="string"?!1?n=await Xt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await nc(n,r),Me()}async dispose(){return oc(this.sessionId)}async run(t,r,n){Ue();let o=[],i=[];Object.entries(t).forEach(h=>{let w=h[0],y=h[1],b=this.inputNames.indexOf(w);if(b===-1)throw new Error(`invalid input '${w}'`);o.push(y),i.push(b)});let a=[],l=[];Object.entries(r).forEach(h=>{let w=h[0],y=h[1],b=this.outputNames.indexOf(w);if(b===-1)throw new Error(`invalid output '${w}'`);a.push(y),l.push(b)});let d=o.map((h,w)=>sc(h,()=>`input "${this.inputNames[i[w]]}"`)),p=a.map((h,w)=>h?sc(h,()=>`output "${this.outputNames[l[w]]}"`):null),m=await ic(this.sessionId,i,d,l,p,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[l[h]]]=a[h]??ag(m[h]);return Me(),u}startProfiling(){}endProfiling(){ac(this.sessionId)}}});var dc={};Ft(dc,{OnnxruntimeWebAssemblyBackend:()=>hn,initializeFlags:()=>lc,wasmBackend:()=>sg});var lc,hn,sg,cc=U(()=>{"use strict";We();Bo();uc();jt();lc=()=>{if((typeof _e.wasm.initTimeout!="number"||_e.wasm.initTimeout<0)&&(_e.wasm.initTimeout=0),_e.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof _e.wasm.proxy!="boolean"&&(_e.wasm.proxy=!1),typeof _e.wasm.trace!="boolean"&&(_e.wasm.trace=!1),typeof _e.wasm.numThreads!="number"||!Number.isInteger(_e.wasm.numThreads)||_e.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)_e.wasm.numThreads=1;else{let e=typeof navigator>"u"?Ln("node:os").cpus().length:navigator.hardwareConcurrency;_e.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},hn=class{async init(t){lc(),await ec(),await tc(t)}async createInferenceSessionHandler(t,r){let n=new fn;return await n.loadModel(t,r),Promise.resolve(n)}},sg=new hn});We();We();We();var ka="1.21.0";var r1=qn;{let e=(cc(),br(dc)).wasmBackend;xt("webgpu",e,5),xt("webnn",e,5),xt("cpu",e,10),xt("wasm",e,10)}Object.defineProperty(_e.versions,"web",{value:ka,enumerable:!0});export{Mp as InferenceSession,xr as TRACE,Ue as TRACE_FUNC_BEGIN,Me as TRACE_FUNC_END,Oe as Tensor,Rp as TrainingSession,r1 as default,_e as env,xt as registerBackend};
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
//# sourceMappingURL=ort.webgpu.bundle.min.mjs.map
