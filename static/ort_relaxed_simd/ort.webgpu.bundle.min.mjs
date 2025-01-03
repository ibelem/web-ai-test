/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Fn=Object.defineProperty;var zp=Object.getOwnPropertyDescriptor;var Op=Object.getOwnPropertyNames;var Dp=Object.prototype.hasOwnProperty;var qn=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var R=(e,t)=>()=>(e&&(t=e(e=0)),t);var Ft=(e,t)=>{for(var r in t)Fn(e,r,{get:t[r],enumerable:!0})},Bp=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Op(t))!Dp.call(e,o)&&o!==r&&Fn(e,o,{get:()=>t[o],enumerable:!(n=zp(t,o))||n.enumerable});return e};var $r=e=>Bp(Fn({},"__esModule",{value:!0}),e);var xr,$t,xt,Mp,Sr,Tr=R(()=>{"use strict";xr=new Map,$t=[],xt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=xr.get(e);if(n===void 0)xr.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let o=$t.indexOf(e);o!==-1&&$t.splice(o,1);for(let i=0;i<$t.length;i++)if(xr.get($t[i]).priority<=r){$t.splice(i,0,e);return}$t.push(e)}return}throw new TypeError("not a valid backend")},Mp=async e=>{let t=xr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Sr=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?$t:r,o,i=[],a=new Set;for(let d of n){let p=await Mp(d);typeof p=="string"?i.push({name:d,err:p}):(o||(o=p),o===p&&a.add(d))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:p}of i)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${p}`);let l=t.filter(d=>a.has(typeof d=="string"?d:d.name));return[o,new Proxy(e,{get:(d,p)=>p==="executionProviders"?l:Reflect.get(d,p)})]}});var oa=R(()=>{"use strict";Tr()});var ia,aa=R(()=>{"use strict";ia="1.21.0"});var sa,Ue,Kn=R(()=>{"use strict";aa();sa="warning",Ue={wasm:{},webgl:{},webgpu:{},versions:{common:ia},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);sa=e}},get logLevel(){return sa}};Object.defineProperty(Ue,"logLevel",{enumerable:!0})});var be,ua=R(()=>{"use strict";Kn();be=Ue});var la,da,ca=R(()=>{"use strict";la=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let o,i;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[3]):(o=e.dims[3],i=e.dims[2]);let a=t?.format!==void 0?t.format:"RGB",l=t?.norm,d,p;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],0],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?p=[0,0,0,0]:typeof l.bias=="number"?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(p[3]=l.bias[3]));let m=i*o,u=0,h=m,w=m*2,y=-1;a==="RGBA"?(u=0,h=m,w=m*2,y=m*3):a==="RGB"?(u=0,h=m,w=m*2):a==="RBG"&&(u=0,w=m,h=m*2);for(let g=0;g<i;g++)for(let x=0;x<o;x++){let $=(e.data[u++]-p[0])*d[0],v=(e.data[h++]-p[1])*d[1],S=(e.data[w++]-p[2])*d[2],T=y===-1?255:(e.data[y++]-p[3])*d[3];n.fillStyle="rgba("+$+","+v+","+S+","+T+")",n.fillRect(x,g,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},da=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let o,i,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(o=e.dims[2],i=e.dims[1],a=e.dims[3]):(o=e.dims[3],i=e.dims[2],a=e.dims[1]);let l=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,p,m;d===void 0||d.mean===void 0?p=[255,255,255,255]:typeof d.mean=="number"?p=[d.mean,d.mean,d.mean,d.mean]:(p=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(p[3]=d.mean[3])),d===void 0||d.bias===void 0?m=[0,0,0,0]:typeof d.bias=="number"?m=[d.bias,d.bias,d.bias,d.bias]:(m=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(m[3]=d.bias[3]));let u=i*o;if(t!==void 0&&(t.format!==void 0&&a===4&&t.format!=="RGBA"||a===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,w=0,y=1,g=2,x=3,$=0,v=u,S=u*2,T=-1;l==="RGBA"?($=0,v=u,S=u*2,T=u*3):l==="RGB"?($=0,v=u,S=u*2):l==="RBG"&&($=0,S=u,v=u*2),n=r.createImageData(o,i);for(let C=0;C<i*o;w+=h,y+=h,g+=h,x+=h,C++)n.data[w]=(e.data[$++]-m[0])*p[0],n.data[y]=(e.data[v++]-m[1])*p[1],n.data[g]=(e.data[S++]-m[2])*p[2],n.data[x]=T===-1?255:(e.data[T++]-m[3])*p[3]}else throw new Error("Can not access image data");return n}});var jn,pa,ma,fa,ha,ga,ba=R(()=>{"use strict";Ir();jn=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,o=t.norm??{mean:255,bias:0},i,a;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?a=[o.bias,o.bias,o.bias,o.bias]:a=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let l=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=r*n,m=d==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),u=4,h=0,w=1,y=2,g=3,x=0,$=p,v=p*2,S=-1;l==="RGB"&&(u=3,h=0,w=1,y=2,g=-1),d==="RGBA"?S=p*3:d==="RBG"?(x=0,v=p,$=p*2):d==="BGR"&&(v=0,$=p,x=p*2);for(let C=0;C<p;C++,h+=u,y+=u,w+=u,g+=u)m[x++]=(e[h]+a[0])/i[0],m[$++]=(e[w]+a[1])/i[1],m[v++]=(e[y]+a[2])/i[2],S!==-1&&g!==-1&&(m[S++]=(e[g]+a[3])/i[3]);return d==="RGBA"?new Oe("float32",m,[1,4,r,n]):new Oe("float32",m,[1,3,r,n])},pa=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,o=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,i=typeof e=="string",a,l=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=m=>typeof HTMLCanvasElement<"u"&&m instanceof HTMLCanvasElement||m instanceof OffscreenCanvas?m.getContext("2d"):null;if(r){let m=d();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,w=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,w=t.resizedWidth),t!==void 0){if(l=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");l.tensorFormat="RGBA",l.height=h,l.width=w}else l.tensorFormat="RGBA",l.height=h,l.width=w;u.drawImage(e,0,0),a=u.getImageData(0,0,w,h).data}else throw new Error("Can not access image data")}else if(n){let m,u;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(m=t.resizedHeight,u=t.resizedWidth):(m=e.height,u=e.width),t!==void 0&&(l=t),l.format="RGBA",l.height=m,l.width=u,t!==void 0){let h=d();h.width=u,h.height=m;let w=p(h);if(w!=null)w.putImageData(e,0,0),a=w.getImageData(0,0,u,m).data;else throw new Error("Can not access image data")}else a=e.data}else if(o){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let m=d();m.width=e.width,m.height=e.height;let u=p(m);if(u!=null){let h=e.height,w=e.width;return u.drawImage(e,0,0,w,h),a=u.getImageData(0,0,w,h).data,l.height=h,l.width=w,jn(a,l)}else throw new Error("Can not access image data")}else{if(i)return new Promise((m,u)=>{let h=d(),w=p(h);if(!e||!w)return u();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{h.width=y.width,h.height=y.height,w.drawImage(y,0,0,h.width,h.height);let g=w.getImageData(0,0,h.width,h.height);l.height=h.height,l.width=h.width,m(jn(g.data,l))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(a!==void 0)return jn(a,l);throw new Error("Input data provided is not supported - aborted tensor creation")},ma=(e,t)=>{let{width:r,height:n,download:o,dispose:i}=t,a=[1,n,r,4];return new Oe({location:"texture",type:"float32",texture:e,dims:a,download:o,dispose:i})},fa=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Oe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:o,dispose:i})},ha=(e,t)=>{let{dataType:r,dims:n,download:o,dispose:i}=t;return new Oe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:o,dispose:i})},ga=(e,t,r)=>new Oe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})});var St,qt,ya,wa,_a=R(()=>{"use strict";St=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),qt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),ya=!1,wa=()=>{if(!ya){ya=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=typeof Float16Array<"u"&&Float16Array.from;e&&(St.set("int64",BigInt64Array),qt.set(BigInt64Array,"int64")),t&&(St.set("uint64",BigUint64Array),qt.set(BigUint64Array,"uint64")),r?(St.set("float16",Float16Array),qt.set(Float16Array,"float16")):St.set("float16",Uint16Array)}}});var va,$a,xa=R(()=>{"use strict";Ir();va=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},$a=(e,t)=>{switch(e.location){case"cpu":return new Oe(e.type,e.data,t);case"cpu-pinned":return new Oe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Oe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Oe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Oe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}});var Oe,Ir=R(()=>{"use strict";ca();ba();_a();xa();Oe=class{constructor(t,r,n){wa();let o,i;if(typeof t=="object"&&"location"in t)switch(this.dataLocation=t.location,o=t.type,i=t.dims,t.location){case"cpu-pinned":{let l=St.get(o);if(!l)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(t.data instanceof l))throw new TypeError(`buffer should be of type ${l.name}`);this.cpuData=t.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let l,d;if(typeof t=="string")if(o=t,d=n,t==="string"){if(!Array.isArray(r))throw new TypeError("A string tensor's data must be a string array.");l=r}else{let p=St.get(t);if(p===void 0)throw new TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if(t==="float16"&&p===Uint16Array||t==="uint4"||t==="int4")throw new TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${p.name} as data.`);t==="uint64"||t==="int64"?l=p.from(r,BigInt):l=p.from(r)}else if(r instanceof p)l=r;else if(r instanceof Uint8ClampedArray)if(t==="uint8")l=Uint8Array.from(r);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${p}`)}else if(d=r,Array.isArray(t)){if(t.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let p=typeof t[0];if(p==="string")o="string",l=t;else if(p==="boolean")o="bool",l=Uint8Array.from(t);else throw new TypeError(`Invalid element type of data array: ${p}.`)}else if(t instanceof Uint8ClampedArray)o="uint8",l=Uint8Array.from(t);else{let p=qt.get(t.constructor);if(p===void 0)throw new TypeError(`Unsupported type for tensor data: ${t.constructor}.`);o=p,l=t}if(d===void 0)d=[l.length];else if(!Array.isArray(d))throw new TypeError("A tensor's dims must be a number array");i=d,this.cpuData=l,this.dataLocation="cpu"}let a=va(i);if(this.cpuData&&a!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=a}static async fromImage(t,r){return pa(t,r)}static fromTexture(t,r){return ma(t,r)}static fromGpuBuffer(t,r){return fa(t,r)}static fromMLTensor(t,r){return ha(t,r)}static fromPinnedBuffer(t,r,n){return ga(t,r,n)}toDataURL(t){return la(this,t)}toImageData(t){return da(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return $a(this,t)}}});var De,Cr=R(()=>{"use strict";Ir();De=Oe});var Ar,Sa,Ne,Be,Yn=R(()=>{"use strict";Kn();Ar=(e,t)=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||console.timeStamp(`${e}::ORT::${t}`)},Sa=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let o=0;o<r.length;o++){if(n&&!r[o].includes("TRACE_FUNC")){let i=`FUNC_${e}::${r[o].trim().split(" ")[1]}`;t&&(i+=`::${t}`),Ar("CPU",i);return}r[o].includes("TRACE_FUNC")&&(n=!0)}},Ne=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Sa("BEGIN",e)},Be=e=>{(typeof Ue.trace>"u"?!Ue.wasm.trace:!Ue.trace)||Sa("END",e)}});var kr,Ta=R(()=>{"use strict";Tr();Cr();Yn();kr=class e{constructor(t){this.handler=t}async run(t,r,n){Ne();let o={},i={};if(typeof t!="object"||t===null||t instanceof De||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let a=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof De)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");a=!1;for(let p of r){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);o[p]=null}if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(r);for(let u of this.outputNames)if(m.indexOf(u)!==-1){let h=r[u];(h===null||h instanceof De)&&(p=!0,a=!1,o[u]=h)}if(p){if(typeof n=="object"&&n!==null)i=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else i=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(a)for(let p of this.outputNames)o[p]=null;let l=await this.handler.run(t,o,i),d={};for(let p in l)if(Object.hasOwnProperty.call(l,p)){let m=l[p];m instanceof De?d[p]=m:d[p]=new De(m.type,m.data,m.dims)}return Be(),d}async release(){return this.handler.dispose()}static async create(t,r,n,o){Ne();let i,a={};if(typeof t=="string"){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(i=t,typeof r=="object"&&r!==null)a=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let m=t,u=0,h=t.byteLength;if(typeof r=="object"&&r!==null)a=r;else if(typeof r=="number"){if(u=r,!Number.isSafeInteger(u))throw new RangeError("'byteOffset' must be an integer.");if(u<0||u>=m.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${m.byteLength}).`);if(h=t.byteLength-u,typeof n=="number"){if(h=n,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||u+h>m.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${m.byteLength-u}].`);if(typeof o=="object"&&o!==null)a=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(m,u,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[l,d]=await Sr(a),p=await l.createInferenceSessionHandler(i,d);return Be(),new e(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var Rp,Ia=R(()=>{"use strict";Ta();Rp=kr});var Ca=R(()=>{"use strict"});var Aa=R(()=>{"use strict"});var ka=R(()=>{"use strict"});var Ea=R(()=>{"use strict"});var Up,Er,Pa=R(()=>{"use strict";Tr();Cr();Up="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Er=class e{constructor(t,r,n){this.handler=t,this.hasOptimizerModel=r,this.hasEvalModel=n}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(t,r){let n=t.evalModel||"",o=t.optimizerModel||"",i=r||{},[a,l]=await Sr(i);if(a.createTrainingSessionHandler){let d=await a.createTrainingSessionHandler(t.checkpointState,t.trainModel,n,o,l);return new e(d,!!t.optimizerModel,!!t.evalModel)}else throw new Error(Up)}typeNarrowingForRunStep(t,r,n,o,i){let a={},l={};if(typeof n!="object"||n===null||n instanceof De||Array.isArray(n))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let d=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof De)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");d=!1;for(let p of o){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(r.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,m=Object.getOwnPropertyNames(o);for(let u of r)if(m.indexOf(u)!==-1){let h=o[u];(h===null||h instanceof De)&&(p=!0,d=!1,a[u]=h)}if(p){if(typeof i=="object"&&i!==null)l=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else l=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of t)if(typeof n[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(d)for(let p of r)a[p]=null;return[a,l]}convertHandlerReturnTypeToMapOfTensors(t){let r={};for(let n in t)if(Object.hasOwnProperty.call(t,n)){let o=t[n];o instanceof De?r[n]=o:r[n]=new De(o.type,o.data,o.dims)}return r}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(t,r,n){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,t,r,n),a=await this.handler.runTrainStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}async runOptimizerStep(t){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(t||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(t,r,n){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,t,r,n),a=await this.handler.runEvalStep(t,o,i);return this.convertHandlerReturnTypeToMapOfTensors(a)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(t=!0){return this.handler.getParametersSize(t)}async loadParametersBuffer(t,r=!0){let n=await this.getParametersSize(r);if(t.length!==4*n)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(t,r)}async getContiguousParameters(t=!0){return this.handler.getContiguousParameters(t)}async release(){return this.handler.dispose()}}});var Np,za=R(()=>{"use strict";Pa();Np=Er});var Zn={};Ft(Zn,{InferenceSession:()=>Rp,TRACE:()=>Ar,TRACE_FUNC_BEGIN:()=>Ne,TRACE_FUNC_END:()=>Be,Tensor:()=>De,TrainingSession:()=>Np,env:()=>be,registerBackend:()=>xt});var He=R(()=>{"use strict";oa();ua();Ia();Cr();Ca();Aa();Yn();ka();Ea();za()});var Pr=R(()=>{"use strict"});var Ma={};Ft(Ma,{default:()=>Vp});var Da,Ba,Vp,Ra=R(()=>{"use strict";Xn();gt();Kt();Da="ort-wasm-proxy-worker",Ba=globalThis.self?.name===Da;Ba&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":zr(r.wasm).then(()=>{Or(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:o}=r;Dr(o,n).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})});break}case"copy-from":{let{buffer:n}=r,o=jt(n);postMessage({type:t,out:o});break}case"create":{let{model:n,options:o}=r;Br(n,o).then(i=>{postMessage({type:t,out:i})},i=>{postMessage({type:t,err:i})});break}case"release":Mr(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:o,inputs:i,outputIndices:a,options:l}=r;Rr(n,o,i,a,new Array(a.length).fill(null),l).then(d=>{d.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Nr([...i,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Ur(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}});Vp=Ba?null:e=>new Worker(e??Bt,{type:"module",name:Da})});var Na={};Ft(Na,{default:()=>Wp});var Qn,Ua,Wp,Va=R(()=>{"use strict";Ua=(Qn=import.meta.url,async function(e={}){function t(){return ue.buffer!=Q.buffer&&ye(),Q}function r(){return ue.buffer!=Q.buffer&&ye(),ne}function n(){return ue.buffer!=Q.buffer&&ye(),_e}function o(){return ue.buffer!=Q.buffer&&ye(),Ae}function i(){return ue.buffer!=Q.buffer&&ye(),$e}function a(){return ue.buffer!=Q.buffer&&ye(),de}function l(){return ue.buffer!=Q.buffer&&ye(),V}function d(){return ue.buffer!=Q.buffer&&ye(),qe}var p,m,u=Object.assign({},e),h=new Promise((s,c)=>{p=s,m=c}),w=typeof window=="object",y=typeof importScripts=="function",g=y&&self.name=="em-pthread";u.mountExternalData=(s,c)=>{s.startsWith("./")&&(s=s.substring(2)),(u.Fb||(u.Fb=new Map)).set(s,c)},u.unmountExternalData=()=>{delete u.Fb};var x=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,shared:!0}).buffer.constructor;let $=()=>{let s=(f,b,_)=>(...I)=>{let D=Qe,B=b?.();I=f(...I);let G=b?.();return B!==G&&(f=G,_(B),b=_=null),Qe!=D?new Promise((H,X)=>{Rn={resolve:H,reject:X}}):I},c=f=>async(...b)=>{try{if(u.Gb)throw Error("Session already started");let _=u.Gb={hc:b[0],errors:[]},I=await f(...b);if(u.Gb!==_)throw Error("Session mismatch");u.Hb?.flush();let D=_.errors;if(0<D.length){let B=await Promise.all(D);if(B=B.filter(G=>G),0<B.length)throw Error(B.join(`
`))}return I}finally{u.Gb=null}};u._OrtCreateSession=s(u._OrtCreateSession,()=>u._OrtCreateSession,f=>u._OrtCreateSession=f),u._OrtRun=c(s(u._OrtRun,()=>u._OrtRun,f=>u._OrtRun=f)),u._OrtRunWithBinding=c(s(u._OrtRunWithBinding,()=>u._OrtRunWithBinding,f=>u._OrtRunWithBinding=f)),u._OrtBindInput=s(u._OrtBindInput,()=>u._OrtBindInput,f=>u._OrtBindInput=f),$=void 0};u.jsepInit=(s,c)=>{if($?.(),s==="webgpu"){[u.Hb,u.Vb,u.Zb,u.Ob,u.Yb,u.kb,u.$b,u.cc,u.Wb,u.Xb,u.ac]=c;let f=u.Hb;u.jsepRegisterBuffer=(b,_,I,D)=>f.registerBuffer(b,_,I,D),u.jsepGetBuffer=b=>f.getBuffer(b),u.jsepCreateDownloader=(b,_,I)=>f.createDownloader(b,_,I),u.jsepOnCreateSession=b=>{f.onCreateSession(b)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepOnRunStart=b=>f.onRunStart(b),u.dc=(b,_)=>{f.upload(b,_)}}else if(s==="webnn"){[u.Hb,u.bc,u.Pb,u.jsepEnsureTensor,u.ec,u.jsepDownloadTensor]=c,u.jsepReleaseTensorId=u.Pb;let f=u.Hb;u.jsepOnRunStart=b=>f.onRunStart(b),u.jsepRegisterMLContext=(b,_)=>{f.registerMLContext(b,_)},u.jsepOnReleaseSession=b=>{f.onReleaseSession(b)},u.jsepCreateMLTensorDownloader=(b,_)=>f.createMLTensorDownloader(b,_),u.jsepRegisterMLTensor=(b,_,I)=>f.registerMLTensor(b,_,I),u.jsepCreateMLContext=b=>f.createMLContext(b),u.jsepRegisterMLConstant=(b,_,I,D,B)=>f.registerMLConstant(b,_,I,D,B,u.Fb)}};var v,S,T=Object.assign({},u),C="./this.program",A=(s,c)=>{throw c},P="";(w||y)&&(y?P=self.location.href:typeof document<"u"&&document.currentScript&&(P=document.currentScript.src),Qn&&(P=Qn),P=P.startsWith("blob:")?"":P.substr(0,P.replace(/[?#].*/,"").lastIndexOf("/")+1),y&&(S=s=>{var c=new XMLHttpRequest;return c.open("GET",s,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),v=(s,c,f)=>{var b=new XMLHttpRequest;b.open("GET",s,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?c(b.response):f()},b.onerror=f,b.send(null)});var O,U=console.log.bind(console),L=console.error.bind(console),K=U,j=L;if(Object.assign(u,T),T=null,g){let s=function(c){try{var f=c.data,b=f.cmd;if(b==="load"){let _=[];self.onmessage=I=>_.push(I),self.startWorker=()=>{postMessage({cmd:"loaded"});for(let I of _)s(I);self.onmessage=s};for(let I of f.handlers)u[I]&&!u[I].proxy||(u[I]=(...D)=>{postMessage({Nb:"callHandler",pc:I,args:D})},I=="print"&&(K=u[I]),I=="printErr"&&(j=u[I]));ue=f.wasmMemory,ye(),W(f.wasmModule)}else if(b==="run"){Wn(f.pthread_ptr,0,0,1,0,0),Bn(f.pthread_ptr),hc(),Yo(),ee||(qi(),ee=!0);try{gc(f.start_routine,f.arg)}catch(_){if(_!="unwind")throw _}}else b==="cancel"?Dt()&&_r(-1):f.target!=="setimmediate"&&(b==="checkMailbox"?ee&&dr():b&&(j(`worker: received unknown command ${b}`),j(f)))}catch(_){throw Ki(),_}};var hg=s,W,ee=!1;j=function(...c){c=c.join(" "),console.error(c)},self.alert=function(...c){postMessage({Nb:"alert",text:c.join(" "),rc:Dt()})},u.instantiateWasm=(c,f)=>new Promise(b=>{W=_=>{_=new WebAssembly.Instance(_,Ho()),f(_),b()}}),self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=s}u.wasmBinary&&(O=u.wasmBinary);var ue,Z,J,Q,ne,_e,Ae,$e,de,V,q,he,qe,ve=!1;function ye(){var s=ue.buffer;u.HEAP8=Q=new Int8Array(s),u.HEAP16=_e=new Int16Array(s),u.HEAPU8=ne=new Uint8Array(s),u.HEAPU16=Ae=new Uint16Array(s),u.HEAP32=$e=new Int32Array(s),u.HEAPU32=de=new Uint32Array(s),u.HEAPF32=V=new Float32Array(s),u.HEAPF64=qe=new Float64Array(s),u.HEAP64=q=new BigInt64Array(s),u.HEAPU64=he=new BigUint64Array(s)}if(!g){if(!((ue=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0})).buffer instanceof x))throw j("requested a shared WebAssembly.Memory but the returned buffer is not a SharedArrayBuffer, indicating that while the browser has SharedArrayBuffer it does not have WebAssembly threads support - you may need to set a flag"),Error("bad memory");ye()}var Ye=[],Lt=[],vn=[],Gt=0,$n=null,Ht=null;function No(){if(--Gt==0&&($n!==null&&(clearInterval($n),$n=null),Ht)){var s=Ht;Ht=null,s()}}function ct(s){throw j(s="Aborted("+s+")"),ve=!0,J=1,s=new WebAssembly.RuntimeError(s+". Build with -sASSERTIONS for more info."),m(s),s}var xn,Vo=s=>s.startsWith("data:application/octet-stream;base64,"),Wo=s=>s.startsWith("file://");function Lo(s){if(s==xn&&O)return new Uint8Array(O);if(S)return S(s);throw"both async and sync fetching of the wasm failed"}function Go(s,c,f){return function(b){if(!O&&(w||y)){if(typeof fetch=="function"&&!Wo(b))return fetch(b,{credentials:"same-origin"}).then(_=>{if(!_.ok)throw`failed to load wasm binary file at '${b}'`;return _.arrayBuffer()}).catch(()=>Lo(b));if(v)return new Promise((_,I)=>{v(b,D=>_(new Uint8Array(D)),I)})}return Promise.resolve().then(()=>Lo(b))}(s).then(b=>WebAssembly.instantiate(b,c)).then(f,b=>{j(`failed to asynchronously prepare wasm: ${b}`),ct(b)})}function Ho(){return{a:{O:fc,Aa:mc,b:yc,aa:Jo,B:ri,qa:ni,Y:ii,_:ai,ra:si,oa:ui,ha:li,na:di,L:ci,Z:pi,W:mi,pa:fi,X:hi,va:wc,F:vc,Q:$c,P:Sc,E:Ic,u:Cc,q:Ac,G:kc,A:Mc,R:Rc,ua:Uc,ka:Nc,U:Vc,ba:Wc,H:Lc,ja:Bn,ta:Gc,t:Hc,Ba:Fc,x:jc,n:Yc,l:Xc,c:On,o:Qc,j:tp,w:rp,p:np,f:op,s:ip,m:ap,e:sp,k:up,i:lp,h:dp,d:cp,ea:pp,fa:mp,ga:fp,ca:ki,da:Ei,T:hp,g:gp,D:bp,I:yp,M:wp,y:_p,sa:vp,V:$p,v:zi,z:xp,N:Sp,S:Tp,za:Ip,ya:Cp,la:Bi,ma:Mi,$:An,C:Ri,K:Ui,ia:Ni,J:Vi,a:ue,xa:Cn,wa:Gi,r:Ep}}}var Sn={874772:(s,c,f,b,_)=>{if(u===void 0||!u.Fb)return 1;if((s=Se(Number(s>>>0))).startsWith("./")&&(s=s.substring(2)),!(s=u.Fb.get(s)))return 2;if(c=Number(c>>>0),f=Number(f>>>0),b=Number(b>>>0),c+f>s.byteLength)return 3;try{let I=s.subarray(c,c+f);switch(_){case 0:r().set(I,b>>>0);break;case 1:u.dc(b,I);break;default:return 4}return 0}catch{return 4}},875487:(s,c,f)=>{u.ec(s,r().subarray(c>>>0,c+f>>>0))},875550:()=>u.bc(),875591:s=>{u.Pb(s)},875627:()=>{u.Wb()},875658:()=>{u.Xb()},875687:()=>{u.ac()},875712:s=>u.Vb(s),875745:s=>u.Zb(s),875777:(s,c,f)=>{u.Ob(Number(s),Number(c),Number(f),!0)},875840:(s,c,f)=>{u.Ob(Number(s),Number(c),Number(f))},875897:()=>typeof wasmOffsetConverter<"u",875954:s=>{u.kb("Abs",s,void 0)},876005:s=>{u.kb("Neg",s,void 0)},876056:s=>{u.kb("Floor",s,void 0)},876109:s=>{u.kb("Ceil",s,void 0)},876161:s=>{u.kb("Reciprocal",s,void 0)},876219:s=>{u.kb("Sqrt",s,void 0)},876271:s=>{u.kb("Exp",s,void 0)},876322:s=>{u.kb("Erf",s,void 0)},876373:s=>{u.kb("Sigmoid",s,void 0)},876428:(s,c,f)=>{u.kb("HardSigmoid",s,{alpha:c,beta:f})},876507:s=>{u.kb("Log",s,void 0)},876558:s=>{u.kb("Sin",s,void 0)},876609:s=>{u.kb("Cos",s,void 0)},876660:s=>{u.kb("Tan",s,void 0)},876711:s=>{u.kb("Asin",s,void 0)},876763:s=>{u.kb("Acos",s,void 0)},876815:s=>{u.kb("Atan",s,void 0)},876867:s=>{u.kb("Sinh",s,void 0)},876919:s=>{u.kb("Cosh",s,void 0)},876971:s=>{u.kb("Asinh",s,void 0)},877024:s=>{u.kb("Acosh",s,void 0)},877077:s=>{u.kb("Atanh",s,void 0)},877130:s=>{u.kb("Tanh",s,void 0)},877182:s=>{u.kb("Not",s,void 0)},877233:(s,c,f)=>{u.kb("Clip",s,{min:c,max:f})},877302:s=>{u.kb("Clip",s,void 0)},877354:(s,c)=>{u.kb("Elu",s,{alpha:c})},877412:s=>{u.kb("Gelu",s,void 0)},877464:s=>{u.kb("Relu",s,void 0)},877516:(s,c)=>{u.kb("LeakyRelu",s,{alpha:c})},877580:(s,c)=>{u.kb("ThresholdedRelu",s,{alpha:c})},877650:(s,c)=>{u.kb("Cast",s,{to:c})},877708:s=>{u.kb("Add",s,void 0)},877759:s=>{u.kb("Sub",s,void 0)},877810:s=>{u.kb("Mul",s,void 0)},877861:s=>{u.kb("Div",s,void 0)},877912:s=>{u.kb("Pow",s,void 0)},877963:s=>{u.kb("Equal",s,void 0)},878016:s=>{u.kb("Greater",s,void 0)},878071:s=>{u.kb("GreaterOrEqual",s,void 0)},878133:s=>{u.kb("Less",s,void 0)},878185:s=>{u.kb("LessOrEqual",s,void 0)},878244:(s,c,f,b,_)=>{u.kb("ReduceMean",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},878419:(s,c,f,b,_)=>{u.kb("ReduceMax",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},878593:(s,c,f,b,_)=>{u.kb("ReduceMin",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},878767:(s,c,f,b,_)=>{u.kb("ReduceProd",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},878942:(s,c,f,b,_)=>{u.kb("ReduceSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879116:(s,c,f,b,_)=>{u.kb("ReduceL1",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879289:(s,c,f,b,_)=>{u.kb("ReduceL2",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879462:(s,c,f,b,_)=>{u.kb("ReduceLogSum",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879639:(s,c,f,b,_)=>{u.kb("ReduceSumSquare",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879819:(s,c,f,b,_)=>{u.kb("ReduceLogSumExp",s,{keepDims:!!c,noopWithEmptyAxes:!!f,axes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},879999:s=>{u.kb("Where",s,void 0)},880052:(s,c,f)=>{u.kb("Transpose",s,{perm:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[]})},880176:(s,c,f,b)=>{u.kb("DepthToSpace",s,{blocksize:c,mode:Se(f),format:b?"NHWC":"NCHW"})},880309:(s,c,f,b)=>{u.kb("DepthToSpace",s,{blocksize:c,mode:Se(f),format:b?"NHWC":"NCHW"})},880442:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z,le)=>{u.kb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:c,dilations:[f],group:b,kernelShape:[_],pads:[I,D],strides:[B],wIsConst:()=>!!t()[H>>>0],outputPadding:X?Array.from(i().subarray(Number(X)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Se(le)})},880875:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!t()[G>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Se(z)})},881536:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z,le)=>{u.kb("ConvTranspose",s,{format:G?"NHWC":"NCHW",autoPad:c,dilations:[f],group:b,kernelShape:[_],pads:[I,D],strides:[B],wIsConst:()=>!!t()[H>>>0],outputPadding:X?Array.from(i().subarray(Number(X)>>>0,Number(ce)>>>0)):[],outputShape:ge?Array.from(i().subarray(Number(ge)>>>0,Number(z)>>>0)):[],activation:Se(le)})},881969:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("ConvTranspose",s,{format:B?"NHWC":"NCHW",autoPad:c,dilations:Array.from(i().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:b,kernelShape:Array.from(i().subarray(Number(_)>>>0,2+(Number(_)>>>0)>>>0)),pads:Array.from(i().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(i().subarray(Number(D)>>>0,2+(Number(D)>>>0)>>>0)),wIsConst:()=>!!t()[G>>>0],outputPadding:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],outputShape:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[],activation:Se(z)})},882630:(s,c)=>{u.kb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},882721:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(G)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},883200:(s,c)=>{u.kb("GlobalAveragePool",s,{format:c?"NHWC":"NCHW"})},883291:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("AveragePool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(G)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},883770:(s,c)=>{u.kb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},883857:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(G)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},884332:(s,c)=>{u.kb("GlobalMaxPool",s,{format:c?"NHWC":"NCHW"})},884419:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z)=>{u.kb("MaxPool",s,{format:z?"NHWC":"NCHW",auto_pad:c,ceil_mode:f,count_include_pad:b,storage_order:_,dilations:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],kernel_shape:B?Array.from(i().subarray(Number(B)>>>0,Number(G)>>>0)):[],pads:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],strides:ce?Array.from(i().subarray(Number(ce)>>>0,Number(ge)>>>0)):[]})},884894:(s,c,f,b,_)=>{u.kb("Gemm",s,{alpha:c,beta:f,transA:b,transB:_})},884998:s=>{u.kb("MatMul",s,void 0)},885052:(s,c,f,b)=>{u.kb("ArgMax",s,{keepDims:!!c,selectLastIndex:!!f,axis:b})},885160:(s,c,f,b)=>{u.kb("ArgMin",s,{keepDims:!!c,selectLastIndex:!!f,axis:b})},885268:(s,c)=>{u.kb("Softmax",s,{axis:c})},885331:(s,c)=>{u.kb("Concat",s,{axis:c})},885391:(s,c,f,b,_)=>{u.kb("Split",s,{axis:c,numOutputs:f,splitSizes:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},885547:s=>{u.kb("Expand",s,void 0)},885601:(s,c)=>{u.kb("Gather",s,{axis:Number(c)})},885672:(s,c)=>{u.kb("GatherElements",s,{axis:Number(c)})},885751:(s,c)=>{u.kb("GatherND",s,{batch_dims:Number(c)})},885830:(s,c,f,b,_,I,D,B,G,H,X)=>{u.kb("Resize",s,{antialias:c,axes:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],coordinateTransformMode:Se(_),cubicCoeffA:I,excludeOutside:D,extrapolationValue:B,keepAspectRatioPolicy:Se(G),mode:Se(H),nearestMode:Se(X)})},886192:(s,c,f,b,_,I,D)=>{u.kb("Slice",s,{starts:c?Array.from(i().subarray(Number(c)>>>0,Number(f)>>>0)):[],ends:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[],axes:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[]})},886456:s=>{u.kb("Tile",s,void 0)},886508:(s,c,f)=>{u.kb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},886622:(s,c,f)=>{u.kb("InstanceNormalization",s,{epsilon:c,format:f?"NHWC":"NCHW"})},886736:s=>{u.kb("Range",s,void 0)},886789:(s,c)=>{u.kb("Einsum",s,{equation:Se(c)})},886870:(s,c,f,b,_)=>{u.kb("Pad",s,{mode:c,value:f,pads:b?Array.from(i().subarray(Number(b)>>>0,Number(_)>>>0)):[]})},887013:(s,c,f,b,_,I)=>{u.kb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!_,trainingMode:!!b,format:I?"NHWC":"NCHW"})},887182:(s,c,f,b,_,I)=>{u.kb("BatchNormalization",s,{epsilon:c,momentum:f,spatial:!!_,trainingMode:!!b,format:I?"NHWC":"NCHW"})},887351:(s,c,f)=>{u.kb("CumSum",s,{exclusive:Number(c),reverse:Number(f)})},887448:(s,c,f)=>{u.kb("DequantizeLinear",s,{axis:c,blockSize:f})},887538:(s,c,f,b,_)=>{u.kb("GridSample",s,{align_corners:c,mode:Se(f),padding_mode:Se(b),format:_?"NHWC":"NCHW"})},887708:(s,c,f,b,_)=>{u.kb("GridSample",s,{align_corners:c,mode:Se(f),padding_mode:Se(b),format:_?"NHWC":"NCHW"})},887878:(s,c)=>{u.kb("ScatterND",s,{reduction:Se(c)})},887963:(s,c,f,b,_,I,D,B,G)=>{u.kb("Attention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:b,scale:_,doRotary:I,qkvHiddenSizes:D?Array.from(i().subarray(Number(B)>>>0,Number(B)+D>>>0)):[],pastPresentShareBuffer:!!G})},888235:s=>{u.kb("BiasAdd",s,void 0)},888290:s=>{u.kb("BiasSplitGelu",s,void 0)},888351:s=>{u.kb("FastGelu",s,void 0)},888407:(s,c,f,b,_,I,D,B,G,H,X,ce,ge,z,le,Te)=>{u.kb("Conv",s,{format:ce?"NHWC":"NCHW",auto_pad:c,dilations:f?Array.from(i().subarray(Number(f)>>>0,Number(b)>>>0)):[],group:_,kernel_shape:I?Array.from(i().subarray(Number(I)>>>0,Number(D)>>>0)):[],pads:B?Array.from(i().subarray(Number(B)>>>0,Number(G)>>>0)):[],strides:H?Array.from(i().subarray(Number(H)>>>0,Number(X)>>>0)):[],w_is_const:()=>!!t()[Number(ge)>>>0],activation:Se(z),activation_params:le?Array.from(l().subarray(Number(le)>>>0,Number(Te)>>>0)):[]})},888991:s=>{u.kb("Gelu",s,void 0)},889043:(s,c,f,b,_,I,D,B,G)=>{u.kb("GroupQueryAttention",s,{numHeads:c,kvNumHeads:f,scale:b,softcap:_,doRotary:I,rotaryInterleaved:D,smoothSoftmax:B,localWindowSize:G})},889260:(s,c,f,b)=>{u.kb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!b})},889371:(s,c,f,b)=>{u.kb("LayerNormalization",s,{axis:c,epsilon:f,simplified:!!b})},889482:(s,c,f,b,_,I)=>{u.kb("MatMulNBits",s,{k:c,n:f,accuracyLevel:b,bits:_,blockSize:I})},889609:(s,c,f,b,_,I)=>{u.kb("MultiHeadAttention",s,{numHeads:c,isUnidirectional:f,maskFilterValue:b,scale:_,doRotary:I})},889768:(s,c)=>{u.kb("QuickGelu",s,{alpha:c})},889832:(s,c,f,b,_)=>{u.kb("RotaryEmbedding",s,{interleaved:!!c,numHeads:f,rotaryEmbeddingDim:b,scale:_})},889971:(s,c,f)=>{u.kb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},890073:(s,c,f)=>{u.kb("SkipLayerNormalization",s,{epsilon:c,simplified:!!f})},890175:(s,c,f,b)=>{u.kb("GatherBlockQuantized",s,{gatherAxis:c,quantizeAxis:f,blockSize:b})},890296:s=>{u.$b(s)},890330:(s,c)=>u.cc(Number(s),Number(c),u.Gb.hc,u.Gb.errors)};function mc(s,c,f){return Si(async()=>{await u.Yb(Number(s),Number(c),Number(f))})}function fc(){return typeof wasmOffsetConverter<"u"}function Tn(s){this.name="ExitStatus",this.message=`Program terminated with exit(${s})`,this.status=s}var In=s=>{s.terminate(),s.onmessage=()=>{}},Fo=s=>{pt.length==0&&(Xo(),Zo(pt[0]));var c=pt.pop();if(!c)return 6;_t.push(c),Ze[s.Bb]=c,c.Bb=s.Bb;var f={cmd:"run",start_routine:s.ic,arg:s.Rb,pthread_ptr:s.Bb};return c.postMessage(f,s.nc),0},wt=0,xe=(s,c,...f)=>{for(var b=2*f.length,_=Hn(),I=Gn(8*b),D=I>>>3,B=0;B<f.length;B++){var G=f[B];typeof G=="bigint"?(q[D+2*B]=1n,q[D+2*B+1]=G):(q[D+2*B]=0n,d()[D+2*B+1>>>0]=G)}return s=ji(s,0,b,I,c),vr(_),s};function Cn(s){if(g)return xe(0,1,s);if(J=s,!(0<wt)){for(var c of _t)In(c);for(c of pt)In(c);pt=[],_t=[],Ze=[],ve=!0}A(s,new Tn(s))}function qo(s){if(g)return xe(1,0,s);An(s)}var An=s=>{if(J=s,g)throw qo(s),"unwind";Cn(s)},pt=[],_t=[],Ko=[],Ze={},jo=s=>{var c=s.Bb;delete Ze[c],pt.push(s),_t.splice(_t.indexOf(s),1),s.Bb=0,Ln(c)};function Yo(){Ko.forEach(s=>s())}var Zo=s=>new Promise(c=>{s.onmessage=_=>{var I=(_=_.data).cmd;if(_.targetThread&&_.targetThread!=Dt()){var D=Ze[_.targetThread];D?D.postMessage(_,_.transferList):j(`Internal error! Worker sent a message "${I}" to target pthread ${_.targetThread}, but that thread no longer exists!`)}else I==="checkMailbox"?dr():I==="spawnThread"?Fo(_):I==="cleanupThread"?jo(Ze[_.thread]):I==="killThread"?(_=_.thread,I=Ze[_],delete Ze[_],In(I),Ln(_),_t.splice(_t.indexOf(I),1),I.Bb=0):I==="cancelThread"?Ze[_.thread].postMessage({cmd:"cancel"}):I==="loaded"?(s.loaded=!0,c(s)):I==="alert"?alert(`Thread ${_.threadId}: ${_.text}`):_.target==="setimmediate"?s.postMessage(_):I==="callHandler"?u[_.handler](..._.args):I&&j(`worker sent an unknown command ${I}`)},s.onerror=_=>{throw j(`worker sent an error! ${_.filename}:${_.lineno}: ${_.message}`),_};var f,b=[];for(f of[])u.hasOwnProperty(f)&&b.push(f);s.postMessage({cmd:"load",handlers:b,wasmMemory:ue,wasmModule:Z})});function Xo(){var s=new Worker(new URL(import.meta.url),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(s)}var lr=s=>{for(;0<s.length;)s.shift()(u)},hc=()=>{var s=Dt(),c=a()[s+52>>>2>>>0];s=a()[s+56>>>2>>>0],Zi(c,c-s),vr(c)},gc=(s,c)=>{wt=0,s=Xi(s,c),0<wt?J=s:_r(s)};class bc{constructor(c){this.Kb=c-24}}function yc(s,c,f){var b=new bc(s>>>=0);throw c>>>=0,f>>>=0,a()[b.Kb+16>>>2>>>0]=0,a()[b.Kb+4>>>2>>>0]=c,a()[b.Kb+8>>>2>>>0]=f,s}function Qo(s,c,f,b){return g?xe(2,1,s,c,f,b):Jo(s,c,f,b)}function Jo(s,c,f,b){if(s>>>=0,c>>>=0,f>>>=0,b>>>=0,x===void 0)return j("Current environment does not support SharedArrayBuffer, pthreads are not available!"),6;var _=[];return g&&_.length===0?Qo(s,c,f,b):(s={ic:f,Bb:s,Rb:b,nc:_},g?(s.Nb="spawnThread",postMessage(s,_),0):Fo(s))}var ei=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0,ti=(s,c,f)=>{var b=(c>>>=0)+f;for(f=c;s[f]&&!(f>=b);)++f;if(16<f-c&&s.buffer&&ei)return ei.decode(s.buffer instanceof x?s.slice(c,f):s.subarray(c,f));for(b="";c<f;){var _=s[c++];if(128&_){var I=63&s[c++];if((224&_)==192)b+=String.fromCharCode((31&_)<<6|I);else{var D=63&s[c++];65536>(_=(240&_)==224?(15&_)<<12|I<<6|D:(7&_)<<18|I<<12|D<<6|63&s[c++])?b+=String.fromCharCode(_):(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_))}}else b+=String.fromCharCode(_)}return b},Se=(s,c)=>(s>>>=0)?ti(r(),s,c):"";function ri(s,c,f){return g?xe(3,1,s,c,f):0}function ni(s,c){if(g)return xe(4,1,s,c)}var kn=s=>{for(var c=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);127>=b?c++:2047>=b?c+=2:55296<=b&&57343>=b?(c+=4,++f):c+=3}return c},oi=(s,c,f,b)=>{if(!(0<b))return 0;var _=f>>>=0;b=f+b-1;for(var I=0;I<s.length;++I){var D=s.charCodeAt(I);if(55296<=D&&57343>=D&&(D=65536+((1023&D)<<10)|1023&s.charCodeAt(++I)),127>=D){if(f>=b)break;c[f++>>>0]=D}else{if(2047>=D){if(f+1>=b)break;c[f++>>>0]=192|D>>6}else{if(65535>=D){if(f+2>=b)break;c[f++>>>0]=224|D>>12}else{if(f+3>=b)break;c[f++>>>0]=240|D>>18,c[f++>>>0]=128|D>>12&63}c[f++>>>0]=128|D>>6&63}c[f++>>>0]=128|63&D}}return c[f>>>0]=0,f-_},Pt=(s,c,f)=>oi(s,r(),c,f);function ii(s,c){if(g)return xe(5,1,s,c)}function ai(s,c,f){if(g)return xe(6,1,s,c,f)}function si(s,c,f){return g?xe(7,1,s,c,f):0}function ui(s,c){if(g)return xe(8,1,s,c)}function li(s,c,f){if(g)return xe(9,1,s,c,f)}function di(s,c,f,b){if(g)return xe(10,1,s,c,f,b)}function ci(s,c,f,b){if(g)return xe(11,1,s,c,f,b)}function pi(s,c,f,b){if(g)return xe(12,1,s,c,f,b)}function mi(s){if(g)return xe(13,1,s)}function fi(s,c){if(g)return xe(14,1,s,c)}function hi(s,c,f){if(g)return xe(15,1,s,c,f)}var gi,mt,wc=()=>{ct("")},Xe=s=>{for(var c="";r()[s>>>0];)c+=gi[r()[s++>>>0]];return c},En={},Pn={},_c={};function at(s,c,f={}){if(!("argPackAdvance"in c))throw new TypeError("registerType registeredInstance requires argPackAdvance");return function(b,_,I={}){var D=_.name;if(!b)throw new mt(`type "${D}" must have a positive integer typeid pointer`);if(Pn.hasOwnProperty(b)){if(I.Tb)return;throw new mt(`Cannot register type '${D}' twice`)}Pn[b]=_,delete _c[b],En.hasOwnProperty(b)&&(_=En[b],delete En[b],_.forEach(B=>B()))}(s,c,f)}var bi=(s,c,f)=>{switch(c){case 1:return f?b=>t()[b>>>0]:b=>r()[b>>>0];case 2:return f?b=>n()[b>>>1>>>0]:b=>o()[b>>>1>>>0];case 4:return f?b=>i()[b>>>2>>>0]:b=>a()[b>>>2>>>0];case 8:return f?b=>q[b>>>3]:b=>he[b>>>3];default:throw new TypeError(`invalid integer width (${c}): ${s}`)}};function vc(s,c,f){f>>>=0,at(s>>>=0,{name:c=Xe(c>>>0),fromWireType:b=>b,toWireType:function(b,_){if(typeof _!="bigint"&&typeof _!="number")throw _=_===null?"null":(b=typeof _)=="object"||b==="array"||b==="function"?_.toString():""+_,new TypeError(`Cannot convert "${_}" to ${this.name}`);return typeof _=="number"&&(_=BigInt(_)),_},argPackAdvance:ft,readValueFromPointer:bi(c,f,c.indexOf("u")==-1),Eb:null})}var ft=8;function $c(s,c,f,b){at(s>>>=0,{name:c=Xe(c>>>0),fromWireType:function(_){return!!_},toWireType:function(_,I){return I?f:b},argPackAdvance:ft,readValueFromPointer:function(_){return this.fromWireType(r()[_>>>0])},Eb:null})}var zn=[],st=[];function On(s){9<(s>>>=0)&&--st[s+1]==0&&(st[s]=void 0,zn.push(s))}var Re=s=>{if(!s)throw new mt("Cannot use deleted val. handle = "+s);return st[s]},Ge=s=>{switch(s){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=zn.pop()||st.length;return st[c]=s,st[c+1]=1,c}};function Dn(s){return this.fromWireType(a()[s>>>2>>>0])}var xc={name:"emscripten::val",fromWireType:s=>{var c=Re(s);return On(s),c},toWireType:(s,c)=>Ge(c),argPackAdvance:ft,readValueFromPointer:Dn,Eb:null};function Sc(s){return at(s>>>0,xc)}var Tc=(s,c)=>{switch(c){case 4:return function(f){return this.fromWireType(l()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(d()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${s}`)}};function Ic(s,c,f){f>>>=0,at(s>>>=0,{name:c=Xe(c>>>0),fromWireType:b=>b,toWireType:(b,_)=>_,argPackAdvance:ft,readValueFromPointer:Tc(c,f),Eb:null})}function Cc(s,c,f,b,_){if(s>>>=0,f>>>=0,c=Xe(c>>>0),_===-1&&(_=4294967295),_=B=>B,b===0){var I=32-8*f;_=B=>B<<I>>>I}var D=c.includes("unsigned")?function(B,G){return G>>>0}:function(B,G){return G};at(s,{name:c,fromWireType:_,toWireType:D,argPackAdvance:ft,readValueFromPointer:bi(c,f,b!==0),Eb:null})}function Ac(s,c,f){function b(I){var D=a()[I>>>2>>>0];return I=a()[I+4>>>2>>>0],new _(t().buffer,I,D)}var _=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];at(s>>>=0,{name:f=Xe(f>>>0),fromWireType:b,argPackAdvance:ft,readValueFromPointer:b},{Tb:!0})}function kc(s,c){s>>>=0;var f=(c=Xe(c>>>0))==="std::string";at(s,{name:c,fromWireType:function(b){var _=a()[b>>>2>>>0],I=b+4;if(f)for(var D=I,B=0;B<=_;++B){var G=I+B;if(B==_||r()[G>>>0]==0){if(D=Se(D,G-D),H===void 0)var H=D;else H+=String.fromCharCode(0),H+=D;D=G+1}}else{for(H=Array(_),B=0;B<_;++B)H[B]=String.fromCharCode(r()[I+B>>>0]);H=H.join("")}return Je(b),H},toWireType:function(b,_){_ instanceof ArrayBuffer&&(_=new Uint8Array(_));var I=typeof _=="string";if(!(I||_ instanceof Uint8Array||_ instanceof Uint8ClampedArray||_ instanceof Int8Array))throw new mt("Cannot pass non-string to std::string");var D=f&&I?kn(_):_.length,B=wr(4+D+1),G=B+4;if(a()[B>>>2>>>0]=D,f&&I)Pt(_,G,D+1);else if(I)for(I=0;I<D;++I){var H=_.charCodeAt(I);if(255<H)throw Je(G),new mt("String has UTF-16 code units that do not fit in 8 bits");r()[G+I>>>0]=H}else for(I=0;I<D;++I)r()[G+I>>>0]=_[I];return b!==null&&b.push(Je,B),B},argPackAdvance:ft,readValueFromPointer:Dn,Eb(b){Je(b)}})}var yi=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Ec=(s,c)=>{for(var f=s>>1,b=f+c/2;!(f>=b)&&o()[f>>>0];)++f;if(32<(f<<=1)-s&&yi)return yi.decode(r().slice(s,f));for(f="",b=0;!(b>=c/2);++b){var _=n()[s+2*b>>>1>>>0];if(_==0)break;f+=String.fromCharCode(_)}return f},Pc=(s,c,f)=>{if(f??=2147483647,2>f)return 0;var b=c;f=(f-=2)<2*s.length?f/2:s.length;for(var _=0;_<f;++_){var I=s.charCodeAt(_);n()[c>>>1>>>0]=I,c+=2}return n()[c>>>1>>>0]=0,c-b},zc=s=>2*s.length,Oc=(s,c)=>{for(var f=0,b="";!(f>=c/4);){var _=i()[s+4*f>>>2>>>0];if(_==0)break;++f,65536<=_?(_-=65536,b+=String.fromCharCode(55296|_>>10,56320|1023&_)):b+=String.fromCharCode(_)}return b},Dc=(s,c,f)=>{if(c>>>=0,f??=2147483647,4>f)return 0;var b=c;f=b+f-4;for(var _=0;_<s.length;++_){var I=s.charCodeAt(_);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&s.charCodeAt(++_)),i()[c>>>2>>>0]=I,(c+=4)+4>f)break}return i()[c>>>2>>>0]=0,c-b},Bc=s=>{for(var c=0,f=0;f<s.length;++f){var b=s.charCodeAt(f);55296<=b&&57343>=b&&++f,c+=4}return c};function Mc(s,c,f){if(s>>>=0,c>>>=0,f=Xe(f>>>=0),c===2)var b=Ec,_=Pc,I=zc,D=B=>o()[B>>>1>>>0];else c===4&&(b=Oc,_=Dc,I=Bc,D=B=>a()[B>>>2>>>0]);at(s,{name:f,fromWireType:B=>{for(var G,H=a()[B>>>2>>>0],X=B+4,ce=0;ce<=H;++ce){var ge=B+4+ce*c;ce!=H&&D(ge)!=0||(X=b(X,ge-X),G===void 0?G=X:(G+=String.fromCharCode(0),G+=X),X=ge+c)}return Je(B),G},toWireType:(B,G)=>{if(typeof G!="string")throw new mt(`Cannot pass non-string to C++ string type ${f}`);var H=I(G),X=wr(4+H+c);return a()[X>>>2>>>0]=H/c,_(G,X+4,H+c),B!==null&&B.push(Je,X),X},argPackAdvance:ft,readValueFromPointer:Dn,Eb(B){Je(B)}})}function Rc(s,c){at(s>>>=0,{Ub:!0,name:c=Xe(c>>>0),argPackAdvance:0,fromWireType:()=>{},toWireType:()=>{}})}var Uc=()=>1;function Nc(s){Wn(s>>>0,!y,1,!w,131072,!1),Yo()}var wi=s=>{if(!ve)try{if(s(),!(0<wt))try{g?_r(J):An(J)}catch(c){c instanceof Tn||c=="unwind"||A(1,c)}}catch(c){c instanceof Tn||c=="unwind"||A(1,c)}};function Bn(s){s>>>=0,typeof Atomics.oc=="function"&&(Atomics.oc(i(),s>>>2,s).value.then(dr),s+=128,Atomics.store(i(),s>>>2,1))}var dr=()=>{var s=Dt();s&&(Bn(s),wi(Yi))};function Vc(s,c){(s>>>=0)==c>>>0?setTimeout(dr):g?postMessage({targetThread:s,cmd:"checkMailbox"}):(s=Ze[s])&&s.postMessage({cmd:"checkMailbox"})}var Mn=[];function Wc(s,c,f,b,_){for(c>>>=0,b/=2,Mn.length=b,f=_>>>0>>>3,_=0;_<b;_++)Mn[_]=q[f+2*_]?q[f+2*_+1]:d()[f+2*_+1>>>0];return(c?Sn[c]:Pp[s])(...Mn)}function Lc(s){s>>>=0,g?postMessage({cmd:"cleanupThread",thread:s}):jo(Ze[s])}function Gc(s){}var cr=(s,c)=>{var f=Pn[s];if(f===void 0)throw s=Fi(s),f=Xe(s),Je(s),new mt(`${c} has unknown type ${f}`);return f},_i=(s,c,f)=>{var b=[];return s=s.toWireType(b,f),b.length&&(a()[c>>>2>>>0]=Ge(b)),s};function Hc(s,c,f){return c>>>=0,f>>>=0,s=Re(s>>>0),c=cr(c,"emval::as"),_i(c,f,s)}function Fc(s,c){return c>>>=0,s=Re(s>>>0),(c=cr(c,"emval::as")).toWireType(null,s)}var pr=s=>{try{s()}catch(c){ct(c)}},ht=0,Qe=null,vi=0,mr=[],$i={},xi={},qc=0,Rn=null,Kc=[];function Si(s){return function(c){if(!ve){if(ht===0){var f=!1,b=!1;c((_=0)=>{if(!ve&&(vi=_,f=!0,b)){ht=2,pr(()=>ea(Qe)),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.resume(),_=!1;try{var I=function(){var G=i()[Qe+8>>>2>>>0];return G=Y[xi[G]],--wt,G()}()}catch(G){I=G,_=!0}var D=!1;if(!Qe){var B=Rn;B&&(Rn=null,(_?B.reject:B.resolve)(I),D=!0)}if(_&&!D)throw I}}),b=!0,f||(ht=1,Qe=function(){var _=wr(65548),I=_+12;a()[_>>>2>>>0]=I,a()[_+4>>>2>>>0]=I+65536,I=mr[0];var D=$i[I];return D===void 0&&(D=qc++,$i[I]=D,xi[D]=I),I=D,i()[_+8>>>2>>>0]=I,_}(),typeof Browser<"u"&&Browser.Lb.Sb&&Browser.Lb.pause(),pr(()=>Qi(Qe)))}else ht===2?(ht=0,pr(ta),Je(Qe),Qe=null,Kc.forEach(wi)):ct(`invalid state: ${ht}`);return vi}}(c=>{s().then(c)})}function jc(s){return s>>>=0,Si(()=>(s=Re(s)).then(Ge))}var fr=[];function Yc(s,c,f,b){return f>>>=0,b>>>=0,(s=fr[s>>>0])(null,c=Re(c>>>0),f,b)}var Zc={},hr=s=>{var c=Zc[s];return c===void 0?Xe(s):c};function Xc(s,c,f,b,_){return f>>>=0,b>>>=0,_>>>=0,(s=fr[s>>>0])(c=Re(c>>>0),c[f=hr(f)],b,_)}var Ti=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Qc(s){return(s>>>=0)==0?Ge(Ti()):(s=hr(s),Ge(Ti()[s]))}var Jc=s=>{var c=fr.length;return fr.push(s),c},ep=(s,c)=>{for(var f=Array(s),b=0;b<s;++b)f[b]=cr(a()[c+4*b>>>2>>>0],"parameter "+b);return f},Ii=(s,c)=>Object.defineProperty(c,"name",{value:s});function tp(s,c,f){var b=(c=ep(s,c>>>0)).shift();s--;var _=`return function (obj, func, destructorsRef, args) {
`,I=0,D=[];f===0&&D.push("obj");for(var B=["retType"],G=[b],H=0;H<s;++H)D.push("arg"+H),B.push("argType"+H),G.push(c[H]),_+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=c[H].argPackAdvance;return _+=`  var rv = ${f===1?"new func":"func.call"}(${D.join(", ")});
`,b.Ub||(B.push("emval_returnValue"),G.push(_i),_+=`  return emval_returnValue(retType, destructorsRef, rv);
`),B.push(_+`};
`),s=function(X){var ce=Function;if(!(ce instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof ce} which is not a function`);var ge=Ii(ce.name||"unknownFunctionName",function(){});return ge.prototype=ce.prototype,ge=new ge,(X=ce.apply(ge,X))instanceof Object?X:ge}(B)(...G),f=`methodCaller<(${c.map(X=>X.name).join(", ")}) => ${b.name}>`,Jc(Ii(f,s))}function rp(s){return s=hr(s>>>0),Ge(u[s])}function np(s,c){return c>>>=0,s=Re(s>>>0),c=Re(c),Ge(s[c])}function op(s){9<(s>>>=0)&&(st[s+1]+=1)}function ip(){return Ge([])}function ap(s){s=Re(s>>>0);for(var c=Array(s.length),f=0;f<s.length;f++)c[f]=s[f];return Ge(c)}function sp(s){return Ge(hr(s>>>0))}function up(){return Ge({})}function lp(s){for(var c=Re(s>>>=0);c.length;){var f=c.pop();c.pop()(f)}On(s)}function dp(s,c,f){c>>>=0,f>>>=0,s=Re(s>>>0),c=Re(c),f=Re(f),s[c]=f}function cp(s,c){return c>>>=0,s=(s=cr(s>>>0,"_emval_take_value")).readValueFromPointer(c),Ge(s)}function pp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getUTCSeconds(),i()[c+4>>>2>>>0]=s.getUTCMinutes(),i()[c+8>>>2>>>0]=s.getUTCHours(),i()[c+12>>>2>>>0]=s.getUTCDate(),i()[c+16>>>2>>>0]=s.getUTCMonth(),i()[c+20>>>2>>>0]=s.getUTCFullYear()-1900,i()[c+24>>>2>>>0]=s.getUTCDay(),s=(s.getTime()-Date.UTC(s.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,i()[c+28>>>2>>>0]=s}var zt=s=>s%4==0&&(s%100!=0||s%400==0),Ci=[0,31,60,91,121,152,182,213,244,274,305,335],Ai=[0,31,59,90,120,151,181,212,243,273,304,334];function mp(s,c){s=-9007199254740992>s||9007199254740992<s?NaN:Number(s),c>>>=0,s=new Date(1e3*s),i()[c>>>2>>>0]=s.getSeconds(),i()[c+4>>>2>>>0]=s.getMinutes(),i()[c+8>>>2>>>0]=s.getHours(),i()[c+12>>>2>>>0]=s.getDate(),i()[c+16>>>2>>>0]=s.getMonth(),i()[c+20>>>2>>>0]=s.getFullYear()-1900,i()[c+24>>>2>>>0]=s.getDay();var f=(zt(s.getFullYear())?Ci:Ai)[s.getMonth()]+s.getDate()-1|0;i()[c+28>>>2>>>0]=f,i()[c+36>>>2>>>0]=-60*s.getTimezoneOffset(),f=new Date(s.getFullYear(),6,1).getTimezoneOffset();var b=new Date(s.getFullYear(),0,1).getTimezoneOffset();s=0|(f!=b&&s.getTimezoneOffset()==Math.min(b,f)),i()[c+32>>>2>>>0]=s}function fp(s){s>>>=0;var c=new Date(i()[s+20>>>2>>>0]+1900,i()[s+16>>>2>>>0],i()[s+12>>>2>>>0],i()[s+8>>>2>>>0],i()[s+4>>>2>>>0],i()[s>>>2>>>0],0),f=i()[s+32>>>2>>>0],b=c.getTimezoneOffset(),_=new Date(c.getFullYear(),6,1).getTimezoneOffset(),I=new Date(c.getFullYear(),0,1).getTimezoneOffset(),D=Math.min(I,_);return 0>f?i()[s+32>>>2>>>0]=+(_!=I&&D==b):0<f!=(D==b)&&(_=Math.max(I,_),c.setTime(c.getTime()+6e4*((0<f?D:_)-b))),i()[s+24>>>2>>>0]=c.getDay(),f=(zt(c.getFullYear())?Ci:Ai)[c.getMonth()]+c.getDate()-1|0,i()[s+28>>>2>>>0]=f,i()[s>>>2>>>0]=c.getSeconds(),i()[s+4>>>2>>>0]=c.getMinutes(),i()[s+8>>>2>>>0]=c.getHours(),i()[s+12>>>2>>>0]=c.getDate(),i()[s+16>>>2>>>0]=c.getMonth(),i()[s+20>>>2>>>0]=c.getYear(),s=c.getTime(),BigInt(isNaN(s)?-1:s/1e3)}function ki(s,c,f,b,_,I,D){return g?xe(16,1,s,c,f,b,_,I,D):-52}function Ei(s,c,f,b,_,I){if(g)return xe(17,1,s,c,f,b,_,I)}function hp(s,c,f,b){s>>>=0,c>>>=0,f>>>=0,b>>>=0;var _=new Date().getFullYear(),I=new Date(_,0,1),D=new Date(_,6,1);_=I.getTimezoneOffset();var B=D.getTimezoneOffset(),G=Math.max(_,B);a()[s>>>2>>>0]=60*G,i()[c>>>2>>>0]=+(_!=B),I=(s=H=>H.toLocaleTimeString(void 0,{hour12:!1,timeZoneName:"short"}).split(" ")[1])(I),D=s(D),B<_?(Pt(I,f,17),Pt(D,b,17)):(Pt(I,b,17),Pt(D,f,17))}var Un=[],Pi=(s,c)=>{Un.length=0;for(var f;f=r()[s++>>>0];){var b=f!=105;c+=(b&=f!=112)&&c%8?4:0,Un.push(f==112?a()[c>>>2>>>0]:f==106?q[c>>>3]:f==105?i()[c>>>2>>>0]:d()[c>>>3>>>0]),c+=b?8:4}return Un};function gp(s,c,f){return s>>>=0,c=Pi(c>>>0,f>>>0),Sn[s](...c)}function bp(s,c,f){return s>>>=0,c=Pi(c>>>0,f>>>0),Sn[s](...c)}var yp=()=>{},wp=()=>Date.now();function _p(s,c){return j(Se(s>>>0,c>>>0))}var zi,vp=()=>{throw wt+=1,"unwind"};function $p(){return 4294901760}zi=()=>performance.timeOrigin+performance.now();var xp=()=>navigator.hardwareConcurrency;function Sp(){return ct("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Tp(s){s>>>=0;var c=r().length;if(s<=c||4294901760<s)return!1;for(var f=1;4>=f;f*=2){var b=c*(1+.2/f);b=Math.min(b,s+100663296);var _=Math;b=Math.max(s,b);e:{_=(_.min.call(_,4294901760,b+(65536-b%65536)%65536)-ue.buffer.byteLength+65535)/65536;try{ue.grow(_),ye();var I=1;break e}catch{}I=void 0}if(I)return!0}return!1}var gr=()=>(ct("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ot={},Oi=s=>{s.forEach(c=>{var f=gr();f&&(Ot[f]=c)})};function Ip(){var s=Error().stack.toString().split(`
`);return s[0]=="Error"&&s.shift(),Oi(s),Ot.Qb=gr(),Ot.fc=s,Ot.Qb}function Cp(s,c,f){if(s>>>=0,c>>>=0,Ot.Qb==s)var b=Ot.fc;else(b=Error().stack.toString().split(`
`))[0]=="Error"&&b.shift(),Oi(b);for(var _=3;b[_]&&gr()!=s;)++_;for(s=0;s<f&&b[s+_];++s)i()[c+4*s>>>2>>>0]=gr();return s}var Nn,Vn={},Di=()=>{if(!Nn){var s,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:C||"./this.program"};for(s in Vn)Vn[s]===void 0?delete c[s]:c[s]=Vn[s];var f=[];for(s in c)f.push(`${s}=${c[s]}`);Nn=f}return Nn};function Bi(s,c){if(g)return xe(18,1,s,c);s>>>=0,c>>>=0;var f=0;return Di().forEach((b,_)=>{var I=c+f;for(_=a()[s+4*_>>>2>>>0]=I,I=0;I<b.length;++I)t()[_++>>>0]=b.charCodeAt(I);t()[_>>>0]=0,f+=b.length+1}),0}function Mi(s,c){if(g)return xe(19,1,s,c);s>>>=0,c>>>=0;var f=Di();a()[s>>>2>>>0]=f.length;var b=0;return f.forEach(_=>b+=_.length+1),a()[c>>>2>>>0]=b,0}function Ri(s){return g?xe(20,1,s):52}function Ui(s,c,f,b){return g?xe(21,1,s,c,f,b):52}function Ni(s,c,f,b){return g?xe(22,1,s,c,f,b):70}var Ap=[null,[],[]];function Vi(s,c,f,b){if(g)return xe(23,1,s,c,f,b);c>>>=0,f>>>=0,b>>>=0;for(var _=0,I=0;I<f;I++){var D=a()[c>>>2>>>0],B=a()[c+4>>>2>>>0];c+=8;for(var G=0;G<B;G++){var H=r()[D+G>>>0],X=Ap[s];H===0||H===10?((s===1?K:j)(ti(X,0)),X.length=0):X.push(H)}_+=B}return a()[b>>>2>>>0]=_,0}var Wi=[31,29,31,30,31,30,31,31,30,31,30,31],Li=[31,28,31,30,31,30,31,31,30,31,30,31],kp=(s,c)=>{t().set(s,c>>>0)};function Gi(s,c,f,b){function _(z,le,Te){for(z=typeof z=="number"?z.toString():z||"";z.length<le;)z=Te[0]+z;return z}function I(z,le){return _(z,le,"0")}function D(z,le){function Te(na){return 0>na?-1:0<na?1:0}var vt;return(vt=Te(z.getFullYear()-le.getFullYear()))===0&&(vt=Te(z.getMonth()-le.getMonth()))===0&&(vt=Te(z.getDate()-le.getDate())),vt}function B(z){switch(z.getDay()){case 0:return new Date(z.getFullYear()-1,11,29);case 1:return z;case 2:return new Date(z.getFullYear(),0,3);case 3:return new Date(z.getFullYear(),0,2);case 4:return new Date(z.getFullYear(),0,1);case 5:return new Date(z.getFullYear()-1,11,31);case 6:return new Date(z.getFullYear()-1,11,30)}}function G(z){var le=z.Cb;for(z=new Date(new Date(z.Db+1900,0,1).getTime());0<le;){var Te=z.getMonth(),vt=(zt(z.getFullYear())?Wi:Li)[Te];if(!(le>vt-z.getDate())){z.setDate(z.getDate()+le);break}le-=vt-z.getDate()+1,z.setDate(1),11>Te?z.setMonth(Te+1):(z.setMonth(0),z.setFullYear(z.getFullYear()+1))}return Te=new Date(z.getFullYear()+1,0,4),le=B(new Date(z.getFullYear(),0,4)),Te=B(Te),0>=D(le,z)?0>=D(Te,z)?z.getFullYear()+1:z.getFullYear():z.getFullYear()-1}s>>>=0,c>>>=0,f>>>=0,b>>>=0;var H=a()[b+40>>>2>>>0];for(var X in b={lc:i()[b>>>2>>>0],kc:i()[b+4>>>2>>>0],Ib:i()[b+8>>>2>>>0],Mb:i()[b+12>>>2>>>0],Jb:i()[b+16>>>2>>>0],Db:i()[b+20>>>2>>>0],vb:i()[b+24>>>2>>>0],Cb:i()[b+28>>>2>>>0],sc:i()[b+32>>>2>>>0],jc:i()[b+36>>>2>>>0],mc:H?Se(H):""},f=Se(f),H={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"})f=f.replace(new RegExp(X,"g"),H[X]);var ce="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),ge="January February March April May June July August September October November December".split(" ");for(X in H={"%a":z=>ce[z.vb].substring(0,3),"%A":z=>ce[z.vb],"%b":z=>ge[z.Jb].substring(0,3),"%B":z=>ge[z.Jb],"%C":z=>I((z.Db+1900)/100|0,2),"%d":z=>I(z.Mb,2),"%e":z=>_(z.Mb,2," "),"%g":z=>G(z).toString().substring(2),"%G":G,"%H":z=>I(z.Ib,2),"%I":z=>((z=z.Ib)==0?z=12:12<z&&(z-=12),I(z,2)),"%j":z=>{for(var le=0,Te=0;Te<=z.Jb-1;le+=(zt(z.Db+1900)?Wi:Li)[Te++]);return I(z.Mb+le,3)},"%m":z=>I(z.Jb+1,2),"%M":z=>I(z.kc,2),"%n":()=>`
`,"%p":z=>0<=z.Ib&&12>z.Ib?"AM":"PM","%S":z=>I(z.lc,2),"%t":()=>"	","%u":z=>z.vb||7,"%U":z=>I(Math.floor((z.Cb+7-z.vb)/7),2),"%V":z=>{var le=Math.floor((z.Cb+7-(z.vb+6)%7)/7);if(2>=(z.vb+371-z.Cb-2)%7&&le++,le)le==53&&((Te=(z.vb+371-z.Cb)%7)==4||Te==3&&zt(z.Db)||(le=1));else{le=52;var Te=(z.vb+7-z.Cb-1)%7;(Te==4||Te==5&&zt(z.Db%400-1))&&le++}return I(le,2)},"%w":z=>z.vb,"%W":z=>I(Math.floor((z.Cb+7-(z.vb+6)%7)/7),2),"%y":z=>(z.Db+1900).toString().substring(2),"%Y":z=>z.Db+1900,"%z":z=>{var le=0<=(z=z.jc);return z=Math.abs(z)/60,(le?"+":"-")+("0000"+(z/60*100+z%60)).slice(-4)},"%Z":z=>z.mc,"%%":()=>"%"},f=f.replace(/%%/g,"\0\0"),H)f.includes(X)&&(f=f.replace(new RegExp(X,"g"),H[X](b)));return X=function(z){var le=Array(kn(z)+1);return oi(z,le,0,le.length),le}(f=f.replace(/\0\0/g,"%")),X.length>c?0:(kp(X,s),X.length-1)}function Ep(s,c,f,b){return Gi(s>>>0,c>>>0,f>>>0,b>>>0)}g||function(){for(var s=u.numThreads-1;s--;)Xo();Ye.unshift(()=>{Gt++,function(c){g?c():Promise.all(pt.map(Zo)).then(c)}(()=>No())})}();for(var Hi=Array(256),br=0;256>br;++br)Hi[br]=String.fromCharCode(br);gi=Hi,mt=u.BindingError=class extends Error{constructor(s){super(s),this.name="BindingError"}},u.InternalError=class extends Error{constructor(s){super(s),this.name="InternalError"}},st.push(0,1,void 0,1,null,1,!0,1,!1,1),u.count_emval_handles=()=>st.length/2-5-zn.length;var Pp=[Cn,qo,Qo,ri,ni,ii,ai,si,ui,li,di,ci,pi,mi,fi,hi,ki,Ei,Bi,Mi,Ri,Ui,Ni,Vi],Y=function(){function s(f,b){return Y=f.exports,Y=function(){var _=Y,I={};for(let[D,B]of Object.entries(_))I[D]=typeof B=="function"?(...G)=>{mr.push(D);try{return B(...G)}finally{ve||(mr.pop(),Qe&&ht===1&&mr.length===0&&(ht=0,wt+=1,pr(Ji),typeof Fibers<"u"&&Fibers.tc()))}}:B;return I}(),Y=function(){var _=Y,I=B=>G=>B(G)>>>0,D=B=>()=>B()>>>0;return(_=Object.assign({},_)).Da=I(_.Da),_.gb=D(_.gb),_.ib=I(_.ib),_.emscripten_main_runtime_thread_id=D(_.emscripten_main_runtime_thread_id),_.tb=I(_.tb),_.ub=D(_.ub),_}(),Ko.push(Y.jb),Lt.unshift(Y.Ca),Z=b,No(),Y}var c=Ho();if(Gt++,u.instantiateWasm)try{return u.instantiateWasm(c,s)}catch(f){j(`Module.instantiateWasm callback failed with error: ${f}`),m(f)}return xn||=u.locateFile?Vo("ort-wasm-simd-threaded.jsep.wasm")?"ort-wasm-simd-threaded.jsep.wasm":u.locateFile?u.locateFile("ort-wasm-simd-threaded.jsep.wasm",P):P+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href,function(f,b){var _=xn;return O||typeof WebAssembly.instantiateStreaming!="function"||Vo(_)||Wo(_)||typeof fetch!="function"?Go(_,f,b):fetch(_,{credentials:"same-origin"}).then(I=>WebAssembly.instantiateStreaming(I,f).then(b,function(D){return j(`wasm streaming compile failed: ${D}`),j("falling back to ArrayBuffer instantiation"),Go(_,f,b)}))}(c,function(f){s(f.instance,f.module)}).catch(m),{}}(),Fi=s=>(Fi=Y.Da)(s),qi=()=>(qi=Y.Ea)();u._OrtInit=(s,c)=>(u._OrtInit=Y.Fa)(s,c),u._OrtGetLastError=(s,c)=>(u._OrtGetLastError=Y.Ga)(s,c),u._OrtCreateSessionOptions=(s,c,f,b,_,I,D,B,G,H)=>(u._OrtCreateSessionOptions=Y.Ha)(s,c,f,b,_,I,D,B,G,H),u._OrtAppendExecutionProvider=(s,c)=>(u._OrtAppendExecutionProvider=Y.Ia)(s,c),u._OrtAddFreeDimensionOverride=(s,c,f)=>(u._OrtAddFreeDimensionOverride=Y.Ja)(s,c,f),u._OrtAddSessionConfigEntry=(s,c,f)=>(u._OrtAddSessionConfigEntry=Y.Ka)(s,c,f),u._OrtReleaseSessionOptions=s=>(u._OrtReleaseSessionOptions=Y.La)(s),u._OrtCreateSession=(s,c,f)=>(u._OrtCreateSession=Y.Ma)(s,c,f),u._OrtReleaseSession=s=>(u._OrtReleaseSession=Y.Na)(s),u._OrtGetInputOutputCount=(s,c,f)=>(u._OrtGetInputOutputCount=Y.Oa)(s,c,f),u._OrtGetInputName=(s,c)=>(u._OrtGetInputName=Y.Pa)(s,c),u._OrtGetOutputName=(s,c)=>(u._OrtGetOutputName=Y.Qa)(s,c),u._OrtFree=s=>(u._OrtFree=Y.Ra)(s),u._OrtCreateTensor=(s,c,f,b,_,I)=>(u._OrtCreateTensor=Y.Sa)(s,c,f,b,_,I),u._OrtGetTensorData=(s,c,f,b,_)=>(u._OrtGetTensorData=Y.Ta)(s,c,f,b,_),u._OrtReleaseTensor=s=>(u._OrtReleaseTensor=Y.Ua)(s),u._OrtCreateRunOptions=(s,c,f,b)=>(u._OrtCreateRunOptions=Y.Va)(s,c,f,b),u._OrtAddRunConfigEntry=(s,c,f)=>(u._OrtAddRunConfigEntry=Y.Wa)(s,c,f),u._OrtReleaseRunOptions=s=>(u._OrtReleaseRunOptions=Y.Xa)(s),u._OrtCreateBinding=s=>(u._OrtCreateBinding=Y.Ya)(s),u._OrtBindInput=(s,c,f)=>(u._OrtBindInput=Y.Za)(s,c,f),u._OrtBindOutput=(s,c,f,b)=>(u._OrtBindOutput=Y._a)(s,c,f,b),u._OrtClearBoundOutputs=s=>(u._OrtClearBoundOutputs=Y.$a)(s),u._OrtReleaseBinding=s=>(u._OrtReleaseBinding=Y.ab)(s),u._OrtRunWithBinding=(s,c,f,b,_)=>(u._OrtRunWithBinding=Y.bb)(s,c,f,b,_),u._OrtRun=(s,c,f,b,_,I,D,B)=>(u._OrtRun=Y.cb)(s,c,f,b,_,I,D,B),u._OrtEndProfiling=s=>(u._OrtEndProfiling=Y.db)(s),u._JsepOutput=(s,c,f)=>(u._JsepOutput=Y.eb)(s,c,f),u._JsepGetNodeName=s=>(u._JsepGetNodeName=Y.fb)(s);var yr,Dt=()=>(Dt=Y.gb)(),Je=u._free=s=>(Je=u._free=Y.hb)(s),wr=u._malloc=s=>(wr=u._malloc=Y.ib)(s),Wn=(s,c,f,b,_,I)=>(Wn=Y.lb)(s,c,f,b,_,I),Ki=()=>(Ki=Y.mb)(),ji=(s,c,f,b,_)=>(ji=Y.nb)(s,c,f,b,_),Ln=s=>(Ln=Y.ob)(s),_r=s=>(_r=Y.pb)(s),Yi=()=>(Yi=Y.qb)(),Zi=(s,c)=>(Zi=Y.rb)(s,c),vr=s=>(vr=Y.sb)(s),Gn=s=>(Gn=Y.tb)(s),Hn=()=>(Hn=Y.ub)(),Xi=u.dynCall_ii=(s,c)=>(Xi=u.dynCall_ii=Y.wb)(s,c),Qi=s=>(Qi=Y.xb)(s),Ji=()=>(Ji=Y.yb)(),ea=s=>(ea=Y.zb)(s),ta=()=>(ta=Y.Ab)();function ra(){0<Gt||(g?(p(u),g||lr(Lt),startWorker(u)):(lr(Ye),0<Gt||yr||(yr=!0,u.calledRun=!0,ve||(g||lr(Lt),p(u),g||lr(vn)))))}return u.___start_em_js=890458,u.___stop_em_js=890704,u.stackSave=()=>Hn(),u.stackRestore=s=>vr(s),u.stackAlloc=s=>Gn(s),u.setValue=function(s,c,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":t()[s>>>0]=c;break;case"i16":n()[s>>>1>>>0]=c;break;case"i32":i()[s>>>2>>>0]=c;break;case"i64":q[s>>>3]=BigInt(c);break;case"float":l()[s>>>2>>>0]=c;break;case"double":d()[s>>>3>>>0]=c;break;case"*":a()[s>>>2>>>0]=c;break;default:ct(`invalid type for setValue: ${f}`)}},u.getValue=function(s,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return t()[s>>>0];case"i16":return n()[s>>>1>>>0];case"i32":return i()[s>>>2>>>0];case"i64":return q[s>>>3];case"float":return l()[s>>>2>>>0];case"double":return d()[s>>>3>>>0];case"*":return a()[s>>>2>>>0];default:ct(`invalid type for getValue: ${c}`)}},u.UTF8ToString=Se,u.stringToUTF8=Pt,u.lengthBytesUTF8=kn,Ht=function s(){yr||ra(),yr||(Ht=s)},ra(),u.PTR_SIZE=4,h}),Wp=Ua;globalThis.self?.name==="em-pthread"&&Ua()});var Bt,Lp,Gp,Hp,Wa,La,Fp,Ga,Kt=R(()=>{"use strict";Pr();Bt=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),Lp=!1||typeof location>"u"?void 0:location.origin,Gp=(e,t)=>{try{let r=t??Bt;return(r?new URL(e,r):new URL(e)).origin===Lp}catch{return!1}},Hp=async e=>{let r=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},Wa=(Ra(),$r(Ma)).default,La=async()=>{if(!Bt)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gp(Bt))return[void 0,Wa()];let e=await Hp(Bt);return[e,Wa(e)]},Fp=(Va(),$r(Na)).default,Ga=async(e,t,r,n)=>[void 0,Fp]});var Jn,eo,Vr,Ha,qp,Kp,jp,zr,Ie,gt=R(()=>{"use strict";Kt();eo=!1,Vr=!1,Ha=!1,qp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Kp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},jp=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},zr=async e=>{if(eo)return Promise.resolve();if(Vr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ha)throw new Error("previous call to 'initializeWebAssembly()' failed.");Vr=!0;let t=e.initTimeout,r=e.numThreads,n=e.relaxedSimd;if(!Kp())throw new Error("WebAssembly SIMD is not supported in the current environment.");let o=n&&jp(),i=qp();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,l=typeof a=="string"?a:void 0,d=a?.mjs,p=d?.href??d,m=a?.wasm,u=m?.href??m,h=e.wasmBinary,[w,y]=await Ga(p,l,r>1,o),g=!1,x=[];if(t>0&&x.push(new Promise($=>{setTimeout(()=>{g=!0,$()},t)})),x.push(new Promise(($,v)=>{let S={numThreads:r};h?S.wasmBinary=h:(u||l)&&(S.locateFile=(T,C)=>u??(l??C)+T),y(S).then(T=>{Vr=!1,eo=!0,Jn=T,$(),w&&URL.revokeObjectURL(w)},T=>{Vr=!1,Ha=!0,v(T)})})),await Promise.race(x),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Ie=()=>{if(eo&&Jn)return Jn;throw new Error("WebAssembly is not initialized yet.")}});var ke,Yt,pe,Wr=R(()=>{"use strict";gt();ke=(e,t)=>{let r=Ie(),n=r.lengthBytesUTF8(e)+1,o=r._malloc(n);return r.stringToUTF8(e,o,n),t.push(o),o},Yt=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([o,i])=>{let a=t?t+o:o;if(typeof i=="object")Yt(i,a+".",r,n);else if(typeof i=="string"||typeof i=="number")n(a,i.toString());else if(typeof i=="boolean")n(a,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},pe=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetLastError(o,o+n);let i=Number(t.getValue(o,n===4?"i32":"i64")),a=t.getValue(o+n,"*"),l=a?t.UTF8ToString(a):"";throw new Error(`${e} ERROR_CODE: ${i}, ERROR_MESSAGE: ${l}`)}finally{t.stackRestore(r)}}});var Fa,qa=R(()=>{"use strict";gt();Wr();Fa=e=>{let t=Ie(),r=0,n=[],o=e||{};try{if(e?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(o.terminate=!1);let i=0;return e?.tag!==void 0&&(i=ke(e.tag,n)),r=t._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),r===0&&pe("Can't create run options."),e?.extra!==void 0&&Yt(e.extra,"",new WeakSet,(a,l)=>{let d=ke(a,n),p=ke(l,n);t._OrtAddRunConfigEntry(r,d,p)!==0&&pe(`Can't set a run config entry: ${a} - ${l}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(a=>t._free(a)),i}}});var Yp,Zp,Xp,Qp,Ka,ja=R(()=>{"use strict";gt();Wr();Yp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Zp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Xp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Qp=(e,t,r)=>{for(let n of t){let o=typeof n=="string"?n:n.name;switch(o){case"webnn":if(o="WEBNN",typeof n!="string"){let l=n?.deviceType;if(l){let d=ke("deviceType",r),p=ke(l,r);Ie()._OrtAddSessionConfigEntry(e,d,p)!==0&&pe(`Can't set a session config entry: 'deviceType' - ${l}.`)}}break;case"webgpu":if(o="JS",typeof n!="string"){let a=n;if(a?.preferredLayout){if(a.preferredLayout!=="NCHW"&&a.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);let l=ke("preferredLayout",r),d=ke(a.preferredLayout,r);Ie()._OrtAddSessionConfigEntry(e,l,d)!==0&&pe(`Can't set a session config entry: 'preferredLayout' - ${a.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=ke(o,r);Ie()._OrtAppendExecutionProvider(e,i)!==0&&pe(`Can't append execution provider: ${o}.`)}},Ka=e=>{let t=Ie(),r=0,n=[],o=e||{};Xp(o);try{let i=Yp(o.graphOptimizationLevel??"all"),a=Zp(o.executionMode??"sequential"),l=typeof o.logId=="string"?ke(o.logId,n):0,d=o.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let p=o.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let m=typeof o.optimizedModelFilePath=="string"?ke(o.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,a,!!o.enableProfiling,0,l,d,p,m),r===0&&pe("Can't create session options."),o.executionProviders&&Qp(r,o.executionProviders,n),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let u=ke("enableGraphCapture",n),h=ke(o.enableGraphCapture.toString(),n);t._OrtAddSessionConfigEntry(r,u,h)!==0&&pe(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[u,h]of Object.entries(o.freeDimensionOverrides)){if(typeof u!="string")throw new Error(`free dimension override name must be a string: ${u}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let w=ke(u,n);t._OrtAddFreeDimensionOverride(r,w,h)!==0&&pe(`Can't set a free dimension override: ${u} - ${h}.`)}return o.extra!==void 0&&Yt(o.extra,"",new WeakSet,(u,h)=>{let w=ke(u,n),y=ke(h,n);t._OrtAddSessionConfigEntry(r,w,y)!==0&&pe(`Can't set a session config entry: ${u} - ${h}.`)}),[r,n]}catch(i){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&pe("Can't release session options."),n.forEach(a=>t._free(a)),i}}});var Zt,bt,Tt,Lr,Xt,Gr,Hr,to,te=R(()=>{"use strict";Zt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},bt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Tt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((o,i)=>o*i,1);return r>0?Math.ceil(n*r):void 0},Lr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Xt=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Gr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Hr=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",to=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}});var Qt,ro=R(()=>{"use strict";Pr();Qt=async e=>{if(typeof e=="string")if(!1)try{let{readFile:t}=qn("node:fs/promises");return new Uint8Array(await t(e))}catch(t){if(t.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:r}=qn("node:fs"),n=r(e),o=[];for await(let i of n)o.push(i);return new Uint8Array(Buffer.concat(o))}throw t}else{let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let o=t.body.getReader(),i;try{i=new ArrayBuffer(n)}catch(l){if(l instanceof RangeError){let d=Math.ceil(n/65536);i=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw l}let a=0;for(;;){let{done:l,value:d}=await o.read();if(l)break;let p=d.byteLength;new Uint8Array(i,a,p).set(d),a+=p}return new Uint8Array(i,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}});var Jp,em,Ya,Za,Fr,tm,se,Ke=R(()=>{"use strict";te();Jp=["V","I","W","E","F"],em=(e,t)=>{console.log(`[${Jp[e]},${new Date().toISOString()}]${t}`)},Fr=(e,t)=>{Ya=e,Za=t},tm=(e,t)=>{let r=Xt(e),n=Xt(Ya);r>=n&&em(r,typeof t=="function"?t():t)},se=(...e)=>{Za&&tm(...e)}});var qr,no=R(()=>{"use strict";te();qr=(e,t)=>new(Lr(t))(e)});var Kr=R(()=>{"use strict"});var Xa,oo,io,rm,nm,Qa,so,ao,es,ts=R(()=>{"use strict";Ke();Kr();Xa=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),oo=[],io=e=>Math.ceil(Number(e)/16)*16,rm=e=>{for(let t=0;t<oo.length;t++){let r=oo[t];if(e<=r)return r}return Math.ceil(e/16)*16},nm=1,Qa=()=>nm++,so=async(e,t,r,n)=>{let o=io(r),i=e.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let a=e.getCommandEncoder();e.endComputePass(),a.copyBufferToBuffer(t,0,i,0,o),e.flush(),await i.mapAsync(GPUMapMode.READ);let l=i.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(l,0,r)),d}else return new Uint8Array(l.slice(0,r))}finally{i.destroy()}},ao=class{constructor(t){this.backend=t;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[r]of Xa)oo.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let n=r.buffer,o=r.byteOffset,i=r.byteLength,a=io(i),l=this.storageCache.get(t);if(!l)throw new Error("gpu data for uploading does not exist");if(Number(l.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${l.originalSize}, data size=${i}`);let d=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),p=d.getMappedRange();new Uint8Array(p).set(new Uint8Array(n,o,i)),d.unmap();let m=this.backend.device.createCommandEncoder();m.copyBufferToBuffer(d,0,l.gpuData.buffer,0,a),this.backend.device.queue.submit([m.finish()]),d.destroy(),se("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let n=this.storageCache.get(t);if(!n)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(r);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(n.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=io(n.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(n.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(t,r,n){let o;if(n){if(o=n[0],t===n[1])return se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=Qa();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:t},originalSize:r}),se("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${o}, registered.`),o}unregisterExternalBuffer(t){t!==void 0&&(this.storageCache.delete(t),se("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let n=rm(t),o,i=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||a){let p=(i?this.freeBuffers:this.freeUniformBuffers).get(n);p?p.length>0?o=p.pop():o=this.backend.device.createBuffer({size:n,usage:r}):o=this.backend.device.createBuffer({size:n,usage:r})}else o=this.backend.device.createBuffer({size:n,usage:r});let l={id:Qa(),type:0,buffer:o};return this.storageCache.set(l.id,{gpuData:l,originalSize:Number(t)}),se("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${l.id}`),l}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r=typeof t=="bigint"?Number(t):t,n=this.storageCache.get(r);if(!n){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return se("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${n.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(n.gpuData.buffer),n.originalSize}async download(t,r){let n=this.storageCache.get(Number(t));if(!n)throw new Error("data does not exist");await so(this.backend,n.gpuData.buffer,n.originalSize,r)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let t of this.buffersPending){let r=Xa.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let n=this.freeBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let n=this.freeUniformBuffers.get(t.size)||[];r===void 0||n.length>=r?t.destroy():n.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t));for(let r of this.buffersPending)t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(r=>{r.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(n=>{n.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,this.sessionCount===0&&(se("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(n=>{n.gpuData.buffer.destroy()}),this.storageCache=new Map)}},es=(...e)=>new ao(...e)});var uo,re,Ce=R(()=>{"use strict";uo=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},re=e=>new uo(e)});var lo,et,k,It,jr,rs,ns,oe=R(()=>{"use strict";lo=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},et=class{static calcShape(t,r,n=!1){let o=t.length,i=r.length;if(o===0)return r;if(i===0)return t;let a=Math.max(t.length,r.length),l=new Array(a);if(n){if(o<2||i<2)return;let d=lo.calcMatMulShape([t[o-2],t[o-1]],[r[i-2],r[i-1]]);if(d===void 0)return;[l[a-2],l[a-1]]=d}for(let d=n?3:1;d<=a;d++){let p=o-d<0?1:t[o-d],m=i-d<0?1:r[i-d];if(p!==m&&p>1&&m>1)return;let u=Math.max(p,m);if(p&&m)l[a-d]=Math.max(p,m);else{if(u>1)return;l[a-d]=0}}return l}static isValidBroadcast(t,r){let n=t.length,o=r.length;if(n>o)return!1;for(let i=1;i<=n;i++)if(t[n-i]!==1&&t[n-i]!==r[o-i])return!1;return!0}},k=class e{static size(t){return e.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let o=new Array(n),i=n-1;for(;i>=0;){if(t[i]%r===0){o[i]=t[i]/r;break}if(r%t[i]!==0)throw new Error("cannot convert shape");o[i]=1,r/=t[i],i--}for(i--;i>=0;i--)o[i]=t[i];return o}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return e.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let o=1;for(let i=r;i<n;i++){if(t[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(t[i])}return o}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let o=r-3;o>=0;--o)n[o]=n[o+1]*t[o+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((o,i)=>o+r[i]+r[i+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,o)=>n===r[o])}},It=class e{static adjustPoolAttributes(t,r,n,o,i,a){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let l=0;l<r.length-2;l++)l>=n.length?n.push(r[l+2]):n[l]=r[l+2];for(let l=0;l<n.length;l++)if(l<o.length){if(o[l]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let l=0;l<n.length;l++)if(l<i.length){if(i[l]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let l=0;l<n.length*2;l++)if(l<a.length){if(a[l]<0)throw new Error("pad should be greater than or equal to 1")}else a.push(0);for(let l=0;l<n.length;l++){if(n[l]<=0)throw new Error("kernel shapes need to be greater than 0");if(a[l]>=n[l]||a[l+n.length]>=n[l])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,o,i,a,l){if(l){if(i.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)e.adjustPadAndReturnShape(t[d+(a?1:2)],r[d],n[d],o[d],i,d,d+t.length-2,l)}}static computePoolOutputShape(t,r,n,o,i,a,l){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return e.computeShapeHelper(t,r,d,n,o,i,a,l),d}static computeConvOutputShape(t,r,n,o,i,a,l){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return e.computeShapeHelper(!1,t,d,n,o,i,a,l),d}static computeShapeHelper(t,r,n,o,i,a,l,d){if(t)for(let p=0;p<r.length-2;p++)n.push(1);else for(let p=0;p<r.length-2;p++)n.push(e.adjustPadAndReturnShape(r[p+2],o[p],i[p],a[p],l,p,p+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,o,i,a,l,d){let p=n*(o-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return i[a]=0,i[l]=0,Math.floor((t-p)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let u=((t+r-1)/r-1)*r+o-t;return i[a]=Math.floor(d==="SAME_LOWER"?(u+1)/2:u/2),i[l]=u-i[a],Math.floor((t+u-o)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+i[a]+i[l]-p)/r+1)}},jr=class{static getShapeOfGemmResult(t,r,n,o,i){if(t.length!==2||n.length!==2)throw new Error("shape need to be of size 2");let a,l,d;r?(a=t[1],l=t[0]):(a=t[0],l=t[1]);let p=-1;if(o?(d=n[0],p=1):(d=n[1],p=0),n[p]!==l)throw new Error("dimension mismatch");if(a<=0||d<=0||l<=0)throw new Error("invalid shape specified");if(i&&!et.isValidBroadcast(i,[a,d]))throw new Error("gemm: invalid bias shape for broadcast");return[a,d,l]}},rs=-34028234663852886e22,ns=34028234663852886e22});var Ct,po,me,Ee,N,we,mo,At,je,F,fo,E,M,Yr,co,os,ae=R(()=>{"use strict";te();oe();Ct=64,po=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},me=(e,t=1)=>{let r=po(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=po(e,t);return typeof r=="string"?r:r[1]},N=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:k.computeStrides(r)})}),t},we=e=>e%4===0?4:e%2===0?2:1,mo=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,At=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,je=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,F=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,fo=(e,t,r,n,o)=>{let i=typeof r=="number",a=i?r:r.length,l=[...new Array(a).keys()],d=a<2?"u32":a<=4?`vec${a}<u32>`:`array<u32, ${a}>`,p=po(t,o),m=typeof p=="string"?p:p[1],u=typeof p=="string"?p:p[0],h={indices:d,value:m,storage:u,tensor:t},w=V=>typeof V=="string"?V:`${V}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},g=i?"uniforms.":"",x=`${g}${e}_shape`,$=`${g}${e}_strides`,v="";for(let V=0;V<a-1;V++)v+=`
    let dim${V} = current / ${F($,V,a)};
    let rest${V} = current % ${F($,V,a)};
    indices[${V}] = dim${V};
    current = rest${V};
    `;v+=`indices[${a-1}] = current;`;let S=a<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${v}
    return indices;
  }`,T=V=>(y.offsetToIndices=!0,a<2?V:`o2i_${e}(${V})`),C=[];if(a>=2)for(let V=a-1;V>=0;V--)C.push(`${F($,V,a)} * (indices[${V}])`);let A=a<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${C.join("+")};
  }`,P=V=>(y.indicesToOffset=!0,a<2?V:`i2o_${e}(${V})`),O=(...V)=>a===0?"0u":`${h.indices}(${V.map(w).join(",")})`,U=(V,q)=>a<2?`${V}`:`${F(V,q,a)}`,L=(V,q,he)=>a<2?`${V}=${he};`:`${F(V,q,a)}=${he};`,K={},j=(V,q)=>{y.broadcastedIndicesToOffset=!0;let he=`${q.name}broadcastedIndicesTo${e}Offset`;if(he in K)return`${he}(${V})`;let qe=[];for(let ve=a-1;ve>=0;ve--){let ye=q.indicesGet("outputIndices",ve+q.rank-a);qe.push(`${U($,ve)} * (${ye} % ${U(x,ve)})`)}return K[he]=`fn ${he}(outputIndices: ${q.type.indices}) -> u32 {
             return ${qe.length>0?qe.join("+"):"0u"};
           }`,`${he}(${V})`},W=(V,q)=>(()=>{if(h.storage===h.value)return`${e}[${V}]=${q};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${V}]=vec2<u32>(u32(${q}), select(0u, 0xFFFFFFFFu, ${q} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${V}]=vec2<u32>(u32(${q}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${V}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${q}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ee=V=>(()=>{if(h.storage===h.value)return`${e}[${V}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${V}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${V}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${V}] & 0xFFu), bool(${e}[${V}] & 0xFF00u), bool(${e}[${V}] & 0xFF0000u), bool(${e}[${V}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ue=a<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${m} {
    return ${ee(`i2o_${e}(indices)`)};
  }`,Z=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),q=l.map(he=>`d${he}`).join(", ");return`
  fn get_${e}(${V}) -> ${m} {
    return get_${e}ByIndices(${O(q)});
  }`})(),J=(...V)=>{if(V.length!==a)throw new Error(`indices length must be ${a}`);let q=V.map(w).join(",");return a===0?ee("0u"):a===1?ee(q[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${q})`)},Q=V=>a<2?ee(V):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${V})`),ne=a<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${m}) {
    ${W(`i2o_${e}(indices)`,"value")}
  }`,_e=a<2?"":(()=>{let V=l.map(he=>`d${he}: u32`).join(", "),q=l.map(he=>`d${he}`).join(", ");return`
  fn set_${e}(${V}, value: ${m}) {
    set_${e}ByIndices(${O(q)}, value);
  }`})();return{impl:()=>{let V=[],q=!1;return y.offsetToIndices&&(V.push(S),q=!0),y.indicesToOffset&&(V.push(A),q=!0),y.broadcastedIndicesToOffset&&(Object.values(K).forEach(he=>V.push(he)),q=!0),y.set&&(V.push(_e),q=!0),y.setByIndices&&(V.push(ne),q=!0),y.get&&(V.push(Z),q=!0),y.getByIndices&&(V.push(ue),q=!0),!i&&q&&V.unshift(`const ${x} = ${h.indices}(${r.join(",")});`,`const ${$} = ${h.indices}(${k.computeStrides(r).join(",")});`),V.join(`
`)},type:h,offsetToIndices:T,indicesToOffset:P,broadcastedIndicesToOffset:j,indices:O,indicesGet:U,indicesSet:L,set:(...V)=>{if(V.length!==a+1)throw new Error(`indices length must be ${a}`);let q=V[a];if(typeof q!="string")throw new Error("value must be string");let he=V.slice(0,a).map(w).join(",");return a===0?W("0u",q):a===1?W(he[0],q):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${he}, ${q})`)},setByOffset:W,setByIndices:(V,q)=>a<2?W(V,q):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${V}, ${q});`),get:J,getByOffset:ee,getByIndices:Q,usage:n,name:e,strides:$,shape:x,rank:a}},E=(e,t,r,n=1)=>fo(e,t,r,"input",n),M=(e,t,r,n=1)=>fo(e,t,r,"output",n),Yr=(e,t,r,n=1)=>fo(e,t,r,"internal",n),co=class{constructor(t,r){this.normalizedDispatchGroup=t;this.limits=r;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${typeof t=="number"?`${t}u`:t}) { return; }`}mainStart(t=Ct){let r=typeof t=="number"?t:t[0],n=typeof t=="number"?1:t[1],o=typeof t=="number"?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||n>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*n*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${r}, ${n}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
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
`)}get variablesInfo(){if(this.uniforms.length===0)return;let t=r=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(r)];return this.uniforms.map(r=>[t(r.type),r.length??1])}},os=(e,t)=>new co(e,t)});var om,is,im,am,sm,Pe,as,ss,ut=R(()=>{"use strict";te();oe();Ce();ae();om=e=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.")},is=(e,t)=>t&&t.length!==e?[...new Array(e).keys()].reverse():t,im=(e,t)=>k.sortBasedOnPerm(e,is(e.length,t)),am=(e,t,r,n)=>{let o=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let i=0;i<t;++i)o+=r.indicesSet("a",e[i],`i[${i}]`);return o+="return a;}"},sm=(e,t)=>{let r=[],n=[];for(let o=0;o<e.length;++o)e[o]!==1&&r.push(e[o]),e[t[o]]!==1&&n.push(t[o]);return{newShape:r,newPerm:n}},Pe=(e,t)=>{let r=e.dataType,n=e.dims.length,o=is(n,t),i=im(e.dims,o),{newShape:a,newPerm:l}=sm(e.dims,o),d=k.areEqual(l,[2,3,1]),p=k.areEqual(l,[3,1,2]),m=a.length===2&&l[0]>l[1]||d||p,u=m?a:e.dims,h=i;m&&(u=d?[a[0],a[1]*a[2]]:p?[a[0]*a[1],a[2]]:a,h=[u[1],u[0]]);let w=E("a",r,u.length),y=M("output",r,h.length),g=16,x;return m?x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,y)}
  var<workgroup> tile : array<array<${y.type.value}, ${g+1}>, ${g}>;
  ${$.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${w.getByIndices(`${w.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${y.setByIndices(`${y.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(w,y)}

  ${am(o,n,w,y)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${y.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${y.setByOffset("global_idx",w.getByIndices("aIndices"))}
  }`,{name:m?"TransposeShared":"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let $=k.size(i);return{outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:m?{x:Math.ceil(h[1]/g),y:Math.ceil(h[0]/g)}:{x:Math.ceil($/64)},programUniforms:[{type:12,data:$},...N(u,h)]}},getShaderSource:x}},as=(e,t)=>{om(e.inputs),e.compute(Pe(e.inputs[0],t.perm))},ss=e=>re({perm:e.perm})});var um,lm,dm,cm,pm,mm,fm,hm,gm,bm,tt,us,ls,ds,cs,ps,ms,fs,hs,gs,bs,ys=R(()=>{"use strict";te();oe();ae();Zr();ut();um={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},lm={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},dm={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},cm={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},pm=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},mm=(e,t)=>{let r=[],n=e.length;for(let i=0;i<n;i++)t.indexOf(i)===-1&&r.push(e[i]);let o=t.map(i=>e[i]);return[r,o]},fm=(e,t)=>{let r=e.length+t.length,n=[],o=0;for(let i=0;i<r;i++)t.indexOf(i)===-1?n.push(e[o++]):n.push(1);return n},hm=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},gm=(e,t)=>{let r=[];if(!hm(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},bm=(e,t,r,n,o,i,a)=>{let l=r[0].dims,d=k.size(i),p=k.size(a),m=E("_A",r[0].dataType,l),u=M("output",o,i),h=64;d===1&&(h=256);let w=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,y=g=>`
        ${g.registerUniform("reduceSize","u32").declareVariables(m,u)}
        ${w}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${g.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${dm[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${um[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${lm[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${u.setByOffset("outputIndex",`${n==="mean"?`${u.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${u.type.storage}(${cm[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:d},programUniforms:[{type:12,data:p}]})}},tt=(e,t,r,n)=>{let o=e.inputs.length===1?r:ho(e.inputs,r),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=e.inputs[0].dims.map((w,y)=>y));let a=k.normalizeAxes(i,e.inputs[0].dims.length),l=a,d=e.inputs[0],p=gm(l,e.inputs[0].dims.length);p.length>0&&(d=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],l=pm(l.length,d.dims.length));let[m,u]=mm(d.dims,l),h=m;o.keepDims&&(h=fm(m,a)),e.compute(bm(t,o.cacheKey,[d],n,e.inputs[0].dataType,h,u),{inputs:[d]})},us=(e,t)=>{tt(e,"ReduceMeanShared",t,"mean")},ls=(e,t)=>{tt(e,"ReduceL1Shared",t,"l1")},ds=(e,t)=>{tt(e,"ReduceL2Shared",t,"l2")},cs=(e,t)=>{tt(e,"ReduceLogSumExpShared",t,"logSumExp")},ps=(e,t)=>{tt(e,"ReduceMaxShared",t,"max")},ms=(e,t)=>{tt(e,"ReduceMinShared",t,"min")},fs=(e,t)=>{tt(e,"ReduceProdShared",t,"prod")},hs=(e,t)=>{tt(e,"ReduceSumShared",t,"sum")},gs=(e,t)=>{tt(e,"ReduceSumSquareShared",t,"sumSquare")},bs=(e,t)=>{tt(e,"ReduceLogSumShared",t,"logSum")}});var rt,ym,Xr,ho,nt,wm,_m,vm,$m,xm,Sm,Tm,Im,Cm,Am,ot,ws,_s,vs,$s,xs,Ss,Ts,Is,Cs,As,Zr=R(()=>{"use strict";te();oe();Ce();ae();ys();rt=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ym=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Xr=(e,t,r,n,o,i,a=!1,l=!1)=>{let d=[],p=r[0].dims,m=p.length,u=k.normalizeAxes(o,m),h=!l&&u.length===0;p.forEach((x,$)=>{h||u.indexOf($)>=0?a&&d.push(1):d.push(x)});let w=d.length,y=k.size(d);return{name:e,shaderCache:t,getShaderSource:x=>{let $=[],v=E("_A",r[0].dataType,m),S=M("output",i,w),T=n(v,S,u),C=T[2];for(let A=0,P=0;A<m;A++)h||u.indexOf(A)>=0?(a&&P++,C=`for(var j${A}: u32 = 0; j${A} < ${p[A]}; j${A}++) {
                  ${T[2].includes("last_index")?`let last_index = j${A};`:""}
                  ${v.indicesSet("input_indices",A,`j${A}`)}
                  ${C}
                }`):($.push(`${v.indicesSet("input_indices",A,S.indicesGet("output_indices",P))};`),P++);return`

        ${x.registerUniform("output_size","u32").declareVariables(v,S)}

        ${x.mainStart()}
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${S.offsetToIndices("global_idx")};

          ${$.join(`
`)}
          ${T[0]}       // init ops for reduce max/min
          ${T[1]}
          ${C}
          ${T[3]}
          ${T.length===4?S.setByOffset("global_idx","value"):T.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:i}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...N(p,d)]})}},ho=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),re({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},nt=(e,t,r,n)=>{let o=e.inputs,i=o.length===1?r:ho(o,r);e.compute(Xr(t,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?ym:n,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},wm=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,"value = log(value);"])},_m=(e,t)=>{rt(e.inputs),nt(e,"ReduceL1",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${n.getByIndices("input_indices")});`,""])},vm=(e,t)=>{rt(e.inputs),nt(e,"ReduceL2",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},$m=(e,t)=>{rt(e.inputs),nt(e,"ReduceLogSumExp",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${n.getByIndices("input_indices")});`,"value = log(value);"])},xm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMax",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(n.indicesSet("input_indices",l,0));return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = max(value, ${n.getByIndices("input_indices")});`,""]})},Sm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMean",t,(n,o,i)=>{let a=1;for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&(a*=e.inputs[0].dims[l]);return["var sum = f32(0);","",`sum += f32(${n.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${a});`]})},Tm=(e,t)=>{rt(e.inputs),nt(e,"ReduceMin",t,(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};`,`value = min(value, ${n.getByIndices("input_indices")});`,""]})},Im=(e,t)=>{rt(e.inputs),nt(e,"ReduceProd",t,(n,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${n.getByIndices("input_indices")};`,""])},Cm=(e,t)=>{rt(e.inputs),nt(e,"ReduceSum",t,(n,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${n.getByIndices("input_indices")};`,""])},Am=(e,t)=>{rt(e.inputs),nt(e,"ReduceSumSquare",t,(n,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${n.getByIndices("input_indices")}; value += t * t;`,""])},ot=(e,t,r)=>{if(t.length===0)return r;let n=1,o=1;for(let i=0;i<t.length;i++)t.indexOf(i)===-1?n*=e[i]:o*=e[i];return o<32&&n>1024},ws=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Sm(e,t):us(e,t)},_s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_m(e,t):ls(e,t)},vs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vm(e,t):ds(e,t)},$s=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$m(e,t):cs(e,t)},xs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xm(e,t):ps(e,t)},Ss=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Tm(e,t):ms(e,t)},Ts=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Im(e,t):fs(e,t)},Is=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Cm(e,t):hs(e,t)},Cs=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Am(e,t):gs(e,t)},As=(e,t)=>{ot(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wm(e,t):bs(e,t)}});var ks,Es,Ps,go,zs=R(()=>{"use strict";te();Ce();Zr();ks=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Es=(e,t)=>{ks(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Xr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Ps=(e,t)=>{ks(e.inputs);let r=(n,o,i)=>{let a=[];for(let l=0;l<n.rank;l++)(i.indexOf(l)>=0||i.length===0)&&a.push(`input_indices[${l}] = 0;`);return[`${a.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};e.compute(Xr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},go=e=>re(e)});var km,bo,Em,Pm,zm,Rt,Om,Os,Qr=R(()=>{"use strict";te();oe();Kr();ae();km=(e,t)=>{let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4],l=e[5];if(a&&l)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],p=r.dims[1],m=r.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==m)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let u=o.dims[0]/3,h=u,w=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");u=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],w=t.qkvHiddenSizes[2]}let y=p;if(u!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==u+h+w)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let g=0;if(a){if(h!==w)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(a.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(a.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(a.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(a.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(a.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(g=a.dims[3])}let x=y+g,$=-1,v=0;if(i)throw new Error("Mask not supported");if(a)throw new Error("past is not supported");if(l){if(l.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(l.dims[0]!==d||l.dims[1]!==t.numHeads||l.dims[2]!==p||l.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:p,pastSequenceLength:g,kvSequenceLength:y,totalSequenceLength:x,maxSequenceLength:$,inputHiddenSize:m,hiddenSize:u,vHiddenSize:w,headSize:Math.floor(u/t.numHeads),vHeadSize:Math.floor(w/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:v,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},bo=(e,t,r)=>t&&e?`
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
    `,Em=(e,t,r,n,o,i,a,l)=>{let d=we(a?1:i),p=64,m=i/d;m<p&&(p=32);let u=Math.ceil(i/d/p),h=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:o},{type:12,data:m},{type:12,data:u}],w=me(e.dataType,d),y=Ee(1,d),g=["type"];a&&g.push("type"),l&&g.push("type");let x=$=>{let v=M("x",e.dataType,e.dims,d),S=[v],T=a?E("seq_lens",a.dataType,a.dims):void 0;T&&S.push(T);let C=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;C&&S.push(C);let A=Ee(e.dataType),P=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${$.registerUniforms(P).declareVariables(...S)}
  ${$.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${bo(T,C,!1)}
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
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${w};${d}`,inputDependencies:g},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/p),y:o,z:t*r},programUniforms:h})}},Pm=(e,t,r,n,o,i,a,l,d)=>{let p=a+i.kvSequenceLength,m=[i.batchSize,i.numHeads,i.sequenceLength,p],u=e>1&&n,h=i.kvNumHeads?i.kvNumHeads:i.numHeads,w=u?[i.batchSize,h,p,i.headSize]:void 0,y=i.nReps?i.nReps:1,g=i.scale===0?1/Math.sqrt(i.headSize):i.scale,x=we(i.headSize),$=i.headSize/x,v=12,S={x:Math.ceil(p/v),y:Math.ceil(i.sequenceLength/v),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:$},{type:12,data:p},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:g},{type:12,data:a},{type:12,data:i.kvSequenceLength},{type:12,data:y}],C=u&&n&&k.size(n.dims)>0,A=["type","type"];C&&A.push("type"),o&&A.push("type"),l&&A.push("type"),d&&A.push("type");let P=[{dims:m,dataType:t.dataType,gpuDataType:0}];u&&P.push({dims:w,dataType:t.dataType,gpuDataType:0});let O=U=>{let L=E("q",t.dataType,t.dims,x),K=E("key",r.dataType,r.dims,x),j=[L,K];if(C){let ne=E("past_key",n.dataType,n.dims,x);j.push(ne)}o&&j.push(E("attention_bias",o.dataType,o.dims));let W=l?E("seq_lens",l.dataType,l.dims):void 0;W&&j.push(W);let ee=d?E("total_sequence_length_input",d.dataType,d.dims):void 0;ee&&j.push(ee);let ue=M("output",t.dataType,m),Z=[ue];u&&Z.push(M("present_key",t.dataType,w,x));let J=Ee(1,x),Q=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;

  var<workgroup> tileQ: array<${L.type.storage}, ${v*v}>;
  var<workgroup> tileK: array<${L.type.storage}, ${v*v}>;
  ${U.registerUniforms(Q).declareVariables(...j,...Z)}
  ${U.mainStart([v,v,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${bo(W,ee,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${C&&u?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${u?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
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
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${ue.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${o!==void 0};${n!==void 0};${e}`,inputDependencies:A},getRunData:()=>({outputs:P,dispatchGroup:S,programUniforms:T}),getShaderSource:O}},zm=(e,t,r,n,o,i,a=void 0,l=void 0)=>{let d=i+o.kvSequenceLength,p=o.nReps?o.nReps:1,m=o.vHiddenSize*p,u=e>1&&n,h=o.kvNumHeads?o.kvNumHeads:o.numHeads,w=u?[o.batchSize,h,d,o.headSize]:void 0,y=[o.batchSize,o.sequenceLength,m],g=12,x={x:Math.ceil(o.vHeadSize/g),y:Math.ceil(o.sequenceLength/g),z:o.batchSize*o.numHeads},$=[{type:12,data:o.sequenceLength},{type:12,data:d},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:m},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:p}],v=u&&n&&k.size(n.dims)>0,S=["type","type"];v&&S.push("type"),a&&S.push("type"),l&&S.push("type");let T=[{dims:y,dataType:t.dataType,gpuDataType:0}];u&&T.push({dims:w,dataType:t.dataType,gpuDataType:0});let C=A=>{let P=E("probs",t.dataType,t.dims),O=E("v",r.dataType,r.dims),U=[P,O];v&&U.push(E("past_value",n.dataType,n.dims));let L=a?E("seq_lens",a.dataType,a.dims):void 0;a&&U.push(L);let K=l?E("total_sequence_length_input",l.dataType,l.dims):void 0;l&&U.push(K);let W=[M("output",t.dataType,y)];u&&W.push(M("present_value",t.dataType,w));let ee=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;
  var<workgroup> tileQ: array<${P.type.value}, ${g*g}>;
  var<workgroup> tileV: array<${P.type.value}, ${g*g}>;
  ${A.registerUniforms(ee).declareVariables(...U,...W)}
  ${A.mainStart([g,g,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${bo(L,K,!0)}
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:T,dispatchGroup:x,programUniforms:$}),getShaderSource:C}},Rt=(e,t,r,n,o,i,a,l,d,p,m=void 0,u=void 0)=>{let h=Math.min(e.outputCount,1+(a?1:0)+(l?1:0)),w=h>1?p.pastSequenceLength:0,y=w+p.kvSequenceLength,g=d&&k.size(d.dims)>0?d:void 0,x=[t,r];h>1&&a&&k.size(a.dims)>0&&x.push(a),g&&x.push(g),m&&x.push(m),u&&x.push(u);let $=e.compute(Pm(h,t,r,a,g,p,w,m,u),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];e.compute(Em($,p.batchSize,p.numHeads,w,p.sequenceLength,y,m,u),{inputs:m&&u?[$,m,u]:[$],outputs:[]});let v=[$,n];h>1&&l&&k.size(l.dims)>0&&v.push(l),m&&v.push(m),u&&v.push(u),e.compute(zm(h,$,n,l,p,w,m,u),{inputs:v,outputs:h>1?[0,2]:[0]})},Om=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,o=t.inputHiddenSize,i=t.headSize,a=12,l={x:Math.ceil(t.headSize/a),y:Math.ceil(t.sequenceLength/a),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:i},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],m=u=>{let h=M("output_q",d[0].dataType,r),w=M("output_k",d[0].dataType,r),y=M("output_v",d[0].dataType,r),g=E("input",d[0].dataType,d[0].dims),x=E("weight",d[1].dataType,d[1].dims),$=E("bias",d[2].dataType,d[2].dims),v=g.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${a}u;
  var<workgroup> tileInput: array<${v}, ${a*a}>;
  var<workgroup> tileWeightQ: array<${v}, ${a*a}>;
  var<workgroup> tileWeightK: array<${v}, ${a*a}>;
  var<workgroup> tileWeightV: array<${v}, ${a*a}>;
  ${u.registerUniforms(S).declareVariables(g,x,$,h,w,y)}
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
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:m},{inputs:d,outputs:[-1,-1,-1]})},Os=(e,t)=>{let r=km(e.inputs,t),[n,o,i]=Om(e,r);return Rt(e,n,o,i,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}});var Dm,Bm,Mm,Ds,Bs=R(()=>{"use strict";He();te();oe();Ce();ae();Dm=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,o,i)=>{let a=o.length;if(a!==n.length)throw new Error(`${i}: num dimensions != ${a}`);o.forEach((l,d)=>{if(l!==n[d])throw new Error(`${i}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Bm=(e,t)=>{let{epsilon:r,spatial:n,format:o}=t,i=e[0].dims,a=n?we(i[i.length-1]):1,l=o==="NHWC"&&i.length>1?a:1,d=k.size(i)/a,p=n,m=p?i.length:i,u=E("x",e[0].dataType,e[0].dims,a),h=E("scale",e[1].dataType,e[1].dims,l),w=E("bias",e[2].dataType,e[2].dims,l),y=E("inputMean",e[3].dataType,e[3].dims,l),g=E("inputVar",e[4].dataType,e[4].dims,l),x=M("y",e[0].dataType,m,a),$=()=>{let S="";if(n)S=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${a}`:"outputIndices[1]"};`;else if(o==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let T=1;T<h.rank;T++)S+=`cIndices[${T}] = outputIndices[${T}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},v=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(u,h,w,y,g,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${a}`)};
    ${$()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${w.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${g.getByOffset("cOffset")};
    let x = ${u.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${a}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p?[{type:12,data:d},...N(i)]:[{type:12,data:d}]})}},Mm=e=>re(e),Ds=(e,t)=>{let{inputs:r,outputCount:n}=e,o=Mm({...t,outputCount:n});if(be.webgpu.validateInputContent&&Dm(r,o),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Bm(r,o))}});var Rm,Um,Ms,Rs=R(()=>{"use strict";oe();ae();Rm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Um=e=>{let t=e[0].dims,r=e[0].dims[2],n=k.size(t)/4,o=e[0].dataType,i=E("input",o,t,4),a=E("bias",o,[r],4),l=E("residual",o,t,4),d=M("output",o,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:m=>`
  const channels = ${r}u / 4;
  ${m.declareVariables(i,a,l,d)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${i.getByOffset("global_idx")}
      + ${a.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},Ms=e=>{Rm(e.inputs),e.compute(Um(e.inputs))}});var Nm,fe,Us,Ns,Vs,Ws,Ls,Gs,Hs,Fs,qs,Vm,Ks,js,Ys,Zs,Jt,Xs,Jr,Qs,Js,eu,tu,ru,nu,ou,iu,au,su,uu,lu,du,cu,pu,mu,fu,hu,yo,wo,gu,bu,yu,Wm,Lm,wu,en=R(()=>{"use strict";te();oe();Ce();ae();Nm=(e,t,r,n,o,i,a)=>{let l=Math.ceil(t/4),d="";typeof o=="string"?d=`${o}(a)`:d=o("a");let p=E("inputData",r,[l],4),m=M("outputData",n,[l],4),u=[{name:"vec_size",type:"u32"}];return a&&u.push(...a),`
      ${e.registerUniforms(u).declareVariables(p,m)}

  ${i??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${m.setByOffset("global_idx",d)}
  }`},fe=(e,t,r,n,o,i=e.dataType,a,l)=>{let d=[{type:12,data:Math.ceil(k.size(e.dims)/4)}];return a&&d.push(...a),{name:t,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:p=>Nm(p,k.size(e.dims),e.dataType,i,r,n,l),getRunData:p=>({outputs:[{dims:e.dims,dataType:i}],dispatchGroup:{x:Math.ceil(k.size(p[0].dims)/64/4)},programUniforms:d})}},Us=e=>{e.compute(fe(e.inputs[0],"Abs","abs"))},Ns=e=>{e.compute(fe(e.inputs[0],"Acos","acos"))},Vs=e=>{e.compute(fe(e.inputs[0],"Acosh","acosh"))},Ws=e=>{e.compute(fe(e.inputs[0],"Asin","asin"))},Ls=e=>{e.compute(fe(e.inputs[0],"Asinh","asinh"))},Gs=e=>{e.compute(fe(e.inputs[0],"Atan","atan"))},Hs=e=>{e.compute(fe(e.inputs[0],"Atanh","atanh"))},Fs=e=>re(e),qs=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(fe(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Vm=e=>{let t,r,n=e.length>=2&&e[1].data!==0,o=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=o?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=o?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return re({min:t,max:r})},Ks=(e,t)=>{let r=t||Vm(e.inputs),n=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Clip",o=>`clamp(${o}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},js=e=>{e.compute(fe(e.inputs[0],"Ceil","ceil"))},Ys=e=>{e.compute(fe(e.inputs[0],"Cos","cos"))},Zs=e=>{e.compute(fe(e.inputs[0],"Cosh","cosh"))},Jt=e=>re(e),Xs=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Jr=(e="f32")=>`
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
}`,Qs=e=>{let t=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Jr(t)))},Js=e=>{e.compute(fe(e.inputs[0],"Exp","exp"))},eu=e=>{e.compute(fe(e.inputs[0],"Floor","floor"))},tu=e=>{let t=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Jr(t)))},ru=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},nu=e=>{e.compute(fe(e.inputs[0],"Not",t=>`!${t}`))},ou=e=>{e.compute(fe(e.inputs[0],"Neg",t=>`-${t}`))},iu=e=>{e.compute(fe(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},au=e=>{let t=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},su=e=>{e.compute(fe(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},uu=e=>re(e),lu=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},du=e=>{e.compute(fe(e.inputs[0],"Sin","sin"))},cu=e=>{e.compute(fe(e.inputs[0],"Sinh","sinh"))},pu=e=>{e.compute(fe(e.inputs[0],"Sqrt","sqrt"))},mu=e=>{e.compute(fe(e.inputs[0],"Tan","tan"))},fu=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,hu=e=>{e.compute(fe(e.inputs[0],"Tanh",fu))},yo=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${fu("v")};
}
`,wo=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,gu=e=>{let t=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"FastGelu",wo,yo(t),void 0,e.inputs[0].dataType))},bu=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(fe(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},yu=e=>{e.compute(fe(e.inputs[0],"Log","log"))},Wm=(e,t)=>`
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
`,Lm=e=>`quick_gelu_impl(${e})`,wu=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(fe(e.inputs[0],"QuickGelu",Lm,Wm(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}});var Gm,Hm,vu,$u=R(()=>{"use strict";oe();ae();en();Gm=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Hm=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=E("input",e[0].dataType,e[0].dims,4),n=E("bias",e[0].dataType,[e[0].dims[2]],4),o=M("output",e[0].dataType,t,4),i=k.size(t)/4,a=me(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${d.declareVariables(r,n,o)}

  ${Jr(a)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},vu=e=>{Gm(e.inputs),e.compute(Hm(e.inputs))}});var Fm,qm,it,xu,Su,Tu,Iu,Cu,Au,ku,Eu,Pu,zu,Ou=R(()=>{"use strict";te();oe();ae();Fm=(e,t,r,n,o,i,a,l,d,p,m,u)=>{let h,w;typeof l=="string"?h=w=(v,S)=>`${l}((${v}),(${S}))`:typeof l=="function"?h=w=l:(h=l.scalar,w=l.vector);let y=M("outputData",m,n.length,4),g=E("aData",d,t.length,4),x=E("bData",p,r.length,4),$;if(o)if(i){let v=k.size(t)===1,S=k.size(r)===1,T=t.length>0&&t[t.length-1]%4===0,C=r.length>0&&r[r.length-1]%4===0;v||S?$=y.setByOffset("global_idx",w(v?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):$=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",w(a||T?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,a||C?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else $=y.setByOffset("global_idx",w(g.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let v=(S,T,C="")=>{let A=`aData[indexA${T}][componentA${T}]`,P=`bData[indexB${T}][componentB${T}]`;return`
            let outputIndices${T} = ${y.offsetToIndices(`global_idx * 4u + ${T}u`)};
            let offsetA${T} = ${g.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let offsetB${T} = ${x.broadcastedIndicesToOffset(`outputIndices${T}`,y)};
            let indexA${T} = offsetA${T} / 4u;
            let indexB${T} = offsetB${T} / 4u;
            let componentA${T} = offsetA${T} % 4u;
            let componentB${T} = offsetB${T} % 4u;
            ${S}[${T}] = ${C}(${h(A,P)});
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
        ${e.registerUniform("vec_size","u32").declareVariables(g,x,y)}

        ${u??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${$}
      }`},qm=(e,t,r,n,o,i,a=r.dataType)=>{let l=r.dims.map(g=>Number(g)??1),d=n.dims.map(g=>Number(g)??1),p=!k.areEqual(l,d),m=l,u=k.size(l),h=!1,w=!1,y=[p];if(p){let g=et.calcShape(l,d,!1);if(!g)throw new Error("Can't perform binary op on the given tensors");m=g.slice(),u=k.size(m);let x=k.size(l)===1,$=k.size(d)===1,v=l.length>0&&l[l.length-1]%4===0,S=d.length>0&&d[d.length-1]%4===0;y.push(x),y.push($),y.push(v),y.push(S);let T=1;for(let C=1;C<m.length;C++){let A=l[l.length-C],P=d[d.length-C];if(A===P)T*=A;else break}T%4===0?(w=!0,h=!0):(x||$||v||S)&&(h=!0)}else h=!0;return y.push(h),{name:e,shaderCache:{hint:t+y.map(g=>g.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:g=>Fm(g,l,d,m,h,p,w,o,r.dataType,n.dataType,a,i),getRunData:()=>({outputs:[{dims:m,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:Math.ceil(k.size(m)/4)},...N(l,d,m)]})}},it=(e,t,r,n,o,i)=>{e.compute(qm(t,o??"",e.inputs[0],e.inputs[1],r,n,i))},xu=e=>{it(e,"Add",(t,r)=>`${t}+${r}`)},Su=e=>{it(e,"Div",(t,r)=>`${t}/${r}`)},Tu=e=>{it(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Iu=e=>{it(e,"Mul",(t,r)=>`${t}*${r}`)},Cu=e=>{let t=E("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;it(e,"Pow",{scalar:(n,o)=>`pow_custom(${n},${o})`,vector:(n,o)=>`pow_vector_custom(${n},${o})`},`
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
      `)},Au=e=>{it(e,"Sub",(t,r)=>`${t}-${r}`)},ku=e=>{it(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Eu=e=>{it(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Pu=e=>{it(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},zu=e=>{it(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}});var jm,Ym,Zm,Xm,Du,Bu,Mu=R(()=>{"use strict";te();oe();Ce();ae();jm=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],o=n.dataType,i=n.dims.length;e.forEach((a,l)=>{if(l!==r){if(a.dataType!==o)throw new Error("input tensors should be one type");if(a.dims.length!==i)throw new Error("input tensors should have the same shape");a.dims.forEach((d,p)=>{if(p!==t&&d!==n.dims[p])throw new Error("non concat dimensions must match")})}})},Ym=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Zm=(e,t)=>{let r=e.length,n=[];for(let o=0;o<r;++o){let i=t.setByOffset("global_idx",e[o].getByIndices("indices"));r===1?n.push(i):o===0?n.push(`if (inputIndex == ${o}u) { ${i} }`):o===r-1?n.push(`else { ${i} }`):n.push(`else if (inputIndex == ${o}) { ${i} }`)}return n.join(`
`)},Xm=(e,t,r,n)=>{let o=k.size(r),i=new Array(e.length),a=new Array(e.length),l=0,d=[],p=[],m=[{type:12,data:o}];for(let g=0;g<e.length;++g)l+=e[g].dims[t],i[g]=l,p.push(e[g].dims.length),a[g]=E(`input${g}`,n,p[g]),d.push("rank"),m.push({type:12,data:i[g]});for(let g=0;g<e.length;++g)m.push(...N(e[g].dims));m.push(...N(r));let u=M("output",n,r.length),h=u.indicesGet("indices",t),w=Array.from(Array(i.length).keys()).map(g=>`uniforms.sizeInConcatAxis${g}`).join(","),y=g=>`

  ${(()=>{g.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)g.registerUniform(`sizeInConcatAxis${x}`,"u32");return g.declareVariables(...a,u)})()}

  ${Ym(i.length,w)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${u.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${w});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Zm(a,u)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:m}),getShaderSource:y}},Du=(e,t)=>{let r=e.inputs,n=r[0].dims,o=k.normalizeAxis(t.axis,n.length);jm(r,o);let i=n.slice();i[o]=r.reduce((l,d)=>l+(d.dims.length>o?d.dims[o]:0),0);let a=r.filter(l=>k.size(l.dims)>0);e.compute(Xm(a,o,i,r[0].dataType),{inputs:a})},Bu=e=>re({axis:e.axis})});var Ve,We,Le,tn,lt=R(()=>{"use strict";te();oe();Ve=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},We=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Le=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},tn=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[rs,ns];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}});var ze,rn,er=R(()=>{"use strict";ze=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},rn=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `});var nn,_o=R(()=>{"use strict";nn=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`});var tr,on,an=R(()=>{"use strict";te();oe();ae();lt();tr=(e,t,r,n,o)=>{let i=n-r;return`
      ${Array.from({length:r}).map((a,l)=>`
      if (${F(t.shape,l,t.rank)} != 1) {
        ${t.indicesSet(e,l,F(o,l+i,n))}
      } else {
        ${t.indicesSet(e,l,0)}
      }`).join("")}
`},on=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a[a.length-2],p=l[l.length-1],m=a[a.length-1],u=we(p),h=we(m),w=we(d),y=k.size(r)/u/w,g=e.length>2,x=n?n.slice(0,-2):r.slice(0,-2),v=[k.size(x),d,p],S=[{type:12,data:y},{type:12,data:d},{type:12,data:p},{type:12,data:m}];We(t,S),S.push(...N(x,a,l)),g&&S.push(...N(e[2].dims)),S.push(...N(v));let T=C=>{let A=Yr("batch_dims",e[0].dataType,x.length),P=E("a",e[0].dataType,a.length,h),O=E("b",e[1].dataType,l.length,u),U=M("output",e[0].dataType,v.length,u),L=me(U.type.tensor),K=Ve(t,U.type.value,L),j=[P,O],W="";if(g){let Z=o?u:1;j.push(E("bias",e[2].dataType,e[2].dims.length,Z)),W=`${o?`value += bias[col / ${Z}];`:`value += ${U.type.value}(bias[row + i]);`}`}let ee=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Le(t,ee);let ue=()=>{let Z=`var a_data: ${P.type.value};`;for(let J=0;J<h;J++)Z+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${u}];`;for(let J=0;J<w;J++){Z+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${h}];`;for(let Q=0;Q<h;Q++)Z+=`
            values[${J}] = fma(${O.type.value}(a_data${h===1?"":`[${Q}]`}), b_data${Q}, values[${J}]);
`}return Z};return`
  ${C.registerUniforms(ee).registerInternalVariables(A).declareVariables(...j,U)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${u})) * ${u};
    var index1 = global_idx / (uniforms.N / ${u});
    let stride1 = uniforms.M / ${w};
    let row = (index1 % stride1) * ${w};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${A.offsetToIndices("batch")};`}

    var a_indices: ${P.type.indices};
    ${tr("a_indices",P,P.rank-2,A.rank,"batch_indices")}
    ${P.indicesSet("a_indices",P.rank-2,0)}
    ${P.indicesSet("a_indices",P.rank-1,0)}
    let a_offset = ${P.indicesToOffset("a_indices")};

    var b_indices: ${O.type.indices};
    ${tr("b_indices",O,O.rank-2,A.rank,"batch_indices")}
    ${O.indicesSet("b_indices",O.rank-2,0)}
    ${O.indicesSet("b_indices",O.rank-1,0)}
    let b_offset = ${O.indicesToOffset("b_indices")};
    var values: array<${U.type.value}, ${w}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${ue()}
    }
    for (var i = 0u; i < ${w}u; i++) {
      var value = values[i];
      ${W}
      ${K}
      let cur_indices = ${U.type.indices}(batch, row + i, col);
      let offset = ${U.indicesToOffset("cur_indices")};
      ${U.setByOffset(`offset / ${u}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${u};${h};${w};${o}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:S}),getShaderSource:T}}});var Qm,Jm,rr,Ru,ef,nr,tf,or,ir=R(()=>{"use strict";te();oe();ae();lt();an();er();Qm=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Jm=(e,t)=>e?`
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
        }`,rr=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32)=>{let d=t[1]*e[1],p=t[0]*e[0],m=o?d:i,u=o?i:d,h=m/t[0],w=i/t[1];if(!((o&&h===4&&e[1]===4||!o&&(h===3||h===4))&&m%t[0]===0&&i%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
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
          ${Qm(o,n)}
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

          ${Jm(o,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Ru=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,ef=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",nr=(e,t,r="f32",n,o=!1,i=32,a=!1,l=32,d=!1)=>{let p=e[1]*t[1],m=e[0]*t[0],u=o?p:i,h=o?i:p;if(!(h%t[1]===0&&u%t[0]===0&&i%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${u} must be divisible by workgroupSize[0]${t[0]}, tileInner ${i} must be divisible by workgroupSize[1]${t[1]}`);let w=h/t[1],y=u/t[0],g=i/t[1],x=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${m};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${u}; inputCol = inputCol + ${t[0]}) {
          ${Ru(o,n)}
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
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${w}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Ru(o,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
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
      ${ef(o)}
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
    ${x}
  }
`},tf=(e,t,r,n,o=!1)=>{let[i,a,l,d]=n,p=me(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${a.type.indices};
        ${tr("aIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("aIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("aIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${ze(e,p)} {
      var value = ${ze(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${l.type.indices};
        ${tr("bIndices",l,l.rank-2,i.rank,"batchIndices")}
        ${l.indicesSet("bIndices",l.rank-2,"u32(row)")}
        ${l.indicesSet("bIndices",l.rank-1,"u32(colIn)")}
        value = ${l.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ze(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${o?"bias[colIn]":`${ze(e,p)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},or=(e,t,r,n,o=!1,i)=>{let a=e[0].dims,l=e[1].dims,d=a.slice(0,-2),p=l.slice(0,-2),m=n?n.slice(0,-2):r.slice(0,-2),u=k.size(m),h=a[a.length-2],w=a[a.length-1],y=l[l.length-1],g=w%4===0&&y%4===0,x=h<=8?[4,1,1]:[4,4,1],$=[8,8,1],v=[Math.ceil(y/$[0]/x[0]),Math.ceil(h/$[1]/x[1]),Math.ceil(u/$[2]/x[2])],S=g?4:1,T=[...d,h,w/S],C=T.length,A=[...p,w,y/S],P=A.length,O=[u,h,y/S],U=[{type:6,data:h},{type:6,data:y},{type:6,data:w}];We(t,U),U.push(...N(m,T,A));let L=["rank","rank"],K=e.length>2;K&&(U.push(...N(e[2].dims)),L.push("rank")),U.push(...N(O));let j=W=>{let ee=m.length,ue=Yr("batchDims",e[0].dataType,ee,1),Z=me(e[0].dataType),J=E("a",e[0].dataType,C,S),Q=E("b",e[1].dataType,P,S),ne=M("result",e[0].dataType,O.length,S),_e=[J,Q];if(K){let q=o?S:1;_e.push(E("bias",e[2].dataType,e[2].dims.length,q))}let Ae=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Le(t,Ae);let $e=me(ne.type.tensor),de=Ve(t,ne.type.value,$e),V=tf(S,K,de,[ue,J,Q,ne],o);return`
  ${W.registerUniforms(Ae).registerInternalVariables(ue).declareVariables(..._e,ne)}
  ${V}
  ${g?rr(x,$,Z,ue):nr(x,$,Z,ue)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${g};${o}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:v[0],y:v[1],z:v[2]},programUniforms:U}),getShaderSource:j}}});var rf,Uu,Nu=R(()=>{"use strict";te();Ke();ae();lt();er();_o();ir();rf=(e,t,r,n,o=!1,i,a=4,l=4,d=4,p="f32")=>{let m=L=>{switch(L){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${L} is not supported.`)}},u=L=>{switch(L){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${L} is not supported.`)}},h=e?`
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
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",g=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",$=e?"col":"row",v=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${$} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${$} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${$} % inChannels;
    var resData = ${ze(a,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${g}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${m(a)}
    }
    return resData;`,S=e?t&&n?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${v}
    }
    return ${ze(a,p)}(0.0);`:n&&r?`
    let col = colIn * ${a};
    ${v}`:`
    let col = colIn * ${a};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${v}
    }
    return ${ze(a,p)}(0.0);`,T=`${u(l)}`,C=ze(d,p),A=e?ze(a,p):ze(l,p),P=e?ze(l,p):ze(a,p),O=Ve(i,C,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${A} {
      ${e?S:T}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${P} {
      ${e?T:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${C}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${w}
      ${rn(o)}
      ${O}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Uu=(e,t,r,n,o,i,a,l,d)=>{let p=t.format==="NHWC",m=p?e[0].dims[3]:e[0].dims[1],u=r[0],h=p?r[2]:r[3],w=p?r[1]:r[2],y=p?r[3]:r[1],g=p&&(m%4===0||m%3===0)&&y%4===0,x=p?y:h*w,$=p?h*w:y,v=[8,8,1],S=n<=8?[4,1,1]:[4,4,1],T=[Math.ceil(x/v[0]/S[0]),Math.ceil($/v[1]/S[1]),Math.ceil(u/v[2]/S[2])];se("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${T}`);let C=g?p&&m%4!==0?3:4:1,A=v[1]*S[1],P=v[0]*S[0],O=Math.max(v[0]*C,v[1]),U=n%A===0,L=o%P===0,K=i%O===0,j=g?[C,4,4]:[1,1,1],W=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];We(t,W),W.push(...N(e[0].dims,e[1].dims));let ee=["rank","rank"];a&&(W.push(...N(e[2].dims)),ee.push("rank")),W.push(...N(r));let ue=Z=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Le(t,J);let Q=g?4:1,ne=me(e[0].dataType),_e=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${ne}>`:ne}) {
        result[flatIndex] = ${g?`vec4<${ne}>`:ne}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${ne}>`:ne}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,Ae=E("x",e[0].dataType,e[0].dims.length,C===3?1:C),$e=E("w",e[1].dataType,e[1].dims.length,Q),de=[Ae,$e],V=M("result",e[0].dataType,r.length,Q);if(a){let q=E("bias",e[2].dataType,e[2].dims.length,Q);de.push(q),_e+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${ne}>`:ne} {
          return bias[coords.${p?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${nn("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${Z.registerUniforms(J).declareVariables(...de,V)}
        ${_e}
        ${rf(p,U,L,K,a,t,j[0],j[1],j[2],ne)}
        ${g?rr(S,v,ne,void 0,!p,O):nr(S,v,ne,void 0,!p,O,!1,void 0,l)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${C};${g};${U};${L};${K};${A};${P};${O}`,inputDependencies:ee},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:T[0],y:T[1],z:T[2]},programUniforms:W}),getShaderSource:ue}}});var nf,Vu,sn,of,Wu,af,Lu,Gu,Hu=R(()=>{"use strict";te();Ke();oe();ae();lt();er();nf=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Vu=e=>typeof e=="number"?[e,e,e]:e,sn=(e,t)=>t<=1?e:e+(e-1)*(t-1),of=(e,t,r,n=1)=>{let o=sn(t,n);return Math.floor((e[0]*(r-1)-r+o)/2)},Wu=(e,t,r,n,o)=>{o==null&&(o=of(e,t[0],n[0]));let i=[0,0,0,r];for(let a=0;a<3;a++)e[a]+2*o>=t[a]&&(i[a]=Math.trunc((e[a]-t[a]+2*o)/n[a]+1));return i},af=(e,t,r,n,o,i,a,l,d,p)=>{let m,u,h,w;if(e==="VALID"&&(e=0),typeof e=="number"){m={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Wu([t,r,n,1],[l,d,p],1,[o,i,a],e);u=y[0],h=y[1],w=y[2]}else if(Array.isArray(e)){if(!e.every((g,x,$)=>g===$[0]))throw Error(`Unsupported padding parameter: ${e}`);m={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Wu([t,r,n,1],[l,d,p],1,[o,i,a],e[0]);u=y[0],h=y[1],w=y[2]}else if(e==="SAME_UPPER"){u=Math.ceil(t/o),h=Math.ceil(r/i),w=Math.ceil(n/a);let y=(u-1)*o+l-t,g=(h-1)*i+d-r,x=(w-1)*a+p-n,$=Math.floor(y/2),v=y-$,S=Math.floor(g/2),T=g-S,C=Math.floor(x/2),A=x-C;m={top:S,bottom:T,left:C,right:A,front:$,back:v}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:m,outDepth:u,outHeight:h,outWidth:w}},Lu=(e,t,r,n,o,i=!1,a="channelsLast")=>{let l,d,p,m,u;if(a==="channelsLast")[l,d,p,m,u]=e;else if(a==="channelsFirst")[l,u,d,p,m]=e;else throw new Error(`Unknown dataFormat ${a}`);let[h,,w,y,g]=t,[x,$,v]=Vu(r),[S,T,C]=Vu(n),A=sn(w,S),P=sn(y,T),O=sn(g,C),{padInfo:U,outDepth:L,outHeight:K,outWidth:j}=af(o,d,p,m,x,$,v,A,P,O),W=i?h*u:h,ee=[0,0,0,0,0];return a==="channelsFirst"?ee=[l,W,L,K,j]:a==="channelsLast"&&(ee=[l,L,K,j,W]),{batchSize:l,dataFormat:a,inDepth:d,inHeight:p,inWidth:m,inChannels:u,outDepth:L,outHeight:K,outWidth:j,outChannels:W,padInfo:U,strideDepth:x,strideHeight:$,strideWidth:v,filterDepth:w,filterHeight:y,filterWidth:g,effectiveFilterDepth:A,effectiveFilterHeight:P,effectiveFilterWidth:O,dilationDepth:S,dilationHeight:T,dilationWidth:C,inShape:e,outShape:ee,filterShape:t}},Gu=(e,t,r,n,o,i)=>{let a=i==="channelsLast",l=a?e[0].dims[3]:e[0].dims[1],d=!1,p=[64,1,1],m={x:r.map((v,S)=>S)},u=[Math.ceil(nf(m.x.map(v=>r[v]))/p[0]),1,1];se("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let h=d?a&&l%4!==0?3:4:1,w=k.size(r),y=[{type:12,data:w},{type:12,data:n},{type:12,data:o},{type:12,data:t.strides},{type:12,data:t.dilations}];We(t,y),y.push(...N(e[0].dims,e[1].dims));let g=["rank","rank"],x=e.length===3;x&&(y.push(...N(e[2].dims)),g.push("rank")),y.push(...N(r));let $=v=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Le(t,S);let T=d?4:1,C=me(e[0].dataType),A=E("x",e[0].dataType,e[0].dims.length,h===3?1:h),P=E("W",e[1].dataType,e[1].dims.length,T),O=[A,P],U=M("result",e[0].dataType,r.length,T),L="";if(x){let W=E("bias",e[2].dataType,e[2].dims.length,T);O.push(W),L+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${d?`vec4<${C}>`:C} {
          return bias[${a?F("coords",4,5):F("coords",1,5)}${d?"/ 4":""}];
        }`}let K=ze(h,C),j=Ve(t,K,C);return`
            ${L}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${A.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${P.getByIndices("aIndices")};
            }
          ${v.registerUniforms(S).declareVariables(...O,U)}
          ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${U.offsetToIndices("global_idx")};
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
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${j}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${a};${h};${x}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:y}),getShaderSource:$}}});var Fu,qu,Ku=R(()=>{"use strict";te();oe();ae();lt();Fu=(e,t,r,n)=>{let o=e.length>2,i=o?"value += b[output_channel];":"",a=e[0].dims,l=e[1].dims,d=t.format==="NHWC",p=d?r[3]:r[1],m=p/t.group,u=d&&m>=4?we(p):1,h=k.size(r)/u,w=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:m}];We(t,w),w.push(...N(a,[l[0],l[1],l[2],l[3]/u]));let y=o?["rank","rank","rank"]:["rank","rank"];w.push(...N([r[0],r[1],r[2],r[3]/u]));let g=x=>{let $=M("output",e[0].dataType,r.length,u),v=me($.type.tensor),S=Ve(t,$.type.value,v),T=E("x",e[0].dataType,a.length),C=E("w",e[1].dataType,l.length,u),A=[T,C];o&&A.push(E("b",e[2].dataType,e[2].dims,u));let P=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Le(t,P);let O=d?`
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
  ${x.registerUniforms(P).declareVariables(...A,$)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${$.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${u} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${$.type.value} = ${$.type.value}(0);
    ${O}
    ${i}
    ${S}
    ${$.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${u}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:g}},qu=(e,t,r,n)=>{let o=e.length>2,i=we(r[3]),a=we(r[2]),l=k.size(r)/i/a,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/i],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/i],m=[r[0],r[1],r[2],r[3]/i],u=[{type:12,data:l},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];We(t,u),u.push(...N(d,p,m));let h=(a-1)*t.strides[1]+p[1],w=y=>{let g=M("output",e[0].dataType,m.length,i),x=me(g.type.tensor),$=Ve(t,g.type.value,x),v=E("x",e[0].dataType,d.length,i),S=E("w",e[1].dataType,p.length,i),T=[v,S];o&&T.push(E("b",e[2].dataType,e[2].dims,i));let C=o?"value += b[output_channel];":"",A=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Le(t,A),`
  ${y.registerUniforms(A).declareVariables(...T,g)}
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
    var values: array<${g.type.value}, ${a}>;
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
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
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
      ${g.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${i};${a};${h};${p[0]};${p[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:u}),getShaderSource:w}}});var sf,vo,uf,$o,xo,ju,lf,df,So,Yu=R(()=>{"use strict";oe();Nu();Hu();ir();Ku();lt();an();ut();sf=(e,t,r,n,o,i)=>{let a=e[0],l=e.slice(i?1:2,i?3:4),d=l.length,p=t[0],u=t.slice(2).map((y,g)=>y+(y-1)*(r[g]-1)),w=l.map((y,g)=>y+n[g]+n[g+d]).map((y,g)=>Math.floor((y-u[g]+o[g])/o[g]));return w.splice(0,0,a),w.splice(i?3:1,0,p),w},vo=[2,3,1,0],uf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let o=e[0].dims.length-2;if(t.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(t.strides.length!==o)throw new Error(`strides should be ${o}D`);if(t.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},$o=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let i=2;i<t[1].dims.length;++i)r[i-2]===0&&(r[i-2]=t[1].dims[i]);let n=e.pads.slice();It.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let o=Object.assign({},e);return Object.assign(o,{kernelShape:r,pads:n}),o},xo=e=>{let t=tn(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],o=e.dilations,i=e.group,a=e.kernel_shape,l=e.pads,d=e.strides,p=e.w_is_const();return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},ju=(e,t,r,n)=>{let o=r.format==="NHWC",i=sf(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,o);if(r.group!==1){let A=[t[0]];if(o){let O=e.kernelCustomData.wT??e.compute(Pe(t[1],vo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=O),A.push(O)}else A.push(t[1]);t.length===3&&A.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&o&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(qu(A,r,i,n),{inputs:A}):e.compute(Fu(A,r,i,n),{inputs:A});return}let a=t.length===3,l=t[0].dims[o?1:2],d=t[0].dims[o?2:3],p=t[0].dims[o?3:1],m=t[1].dims[2],u=t[1].dims[3],h=i[o?1:2],w=i[o?2:3],y=i[o?3:1],g=o&&m===l&&u===d&&r.pads[0]===0&&r.pads[1]===0;if(g||m===1&&u===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let A=i[0],P,O,U,L=[];if(o){let W=e.kernelCustomData.wT??e.compute(Pe(t[1],vo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=W),g){let ee=l*d*p;P=t[0].reshape([1,A,ee]),O=W.reshape([1,ee,y]),U=[1,A,y]}else P=t[0].reshape([A,l*d,p]),O=W.reshape([1,p,y]),U=[A,h*w,y];L.push(P),L.push(O)}else P=t[0].reshape([A,p,l*d]),O=t[1].reshape([1,y,p]),U=[A,y,h*w],L.push(O),L.push(P);a&&L.push(t[2]);let K=U[2],j=L[0].dims[L[0].dims.length-1];K<8&&j<8?e.compute(on(L,r,i,U,o,n),{inputs:L}):e.compute(or(L,r,i,U,o,n),{inputs:L});return}let x=!0,$=e.kernelCustomData.wT??e.compute(Pe(t[1],vo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=$);let v=[t[0],$];a&&v.push(t[2]);let S=o?h*w:y,T=o?y:h*w,C=m*u*p;e.compute(Uu(v,r,i,S,T,C,a,x,n),{inputs:v})},lf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=[0,t.pads[0],0,t.pads[1]],i=[1].concat(t.strides),a=[1].concat(t.dilations),l=[1].concat(t.kernelShape),d=$o({...t,pads:o,strides:i,dilations:a,kernelShape:l},n);ju(e,n,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},df=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",o=$o(r,t),i=r.autoPad==="NOTSET"?r.pads:r.autoPad,a=Lu(t[0].dims,t[1].dims,r.strides,r.dilations,i,!1,n);e.compute(Gu(t,o,a.outShape,[a.filterDepth,a.filterHeight,a.filterWidth],[a.padInfo.front,a.padInfo.top,a.padInfo.left],n))},So=(e,t)=>{if(uf(e.inputs,t),e.inputs[0].dims.length===3)lf(e,t);else if(e.inputs[0].dims.length===5)df(e,e.inputs,t);else{let r=$o(t,e.inputs);ju(e,e.inputs,r)}}});var cf,Zu,Xu=R(()=>{"use strict";te();Ke();ae();lt();er();_o();ir();cf=(e,t=!1,r,n,o=4)=>{let i=$=>{switch($){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${n}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${$} is not supported.`)}},a=e?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,l=e?`
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
    `,d=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",p=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",m=e?"row":"col",u=e?"col":"row",h=`
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${m} / outWidth;
      let outCol = ${m} % outWidth;

      let WRow = ${u} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${u} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${d}) || fract(xR) > 0.0) {
        return ${n}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${p}) || fract(xC) > 0.0) {
        return ${n}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${u} % inChannels;
      ${a}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,w=e?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${h}
      }
      return ${n}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${h}
      }
      return ${n}(0.0);`,y=`
      let col = colIn * ${o};
      let inChannels = ${e?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${e?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${n}(0.0);
      `,g=Ve(r,n);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?w:y}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${n} {
    ${e?y:w}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${n}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${l}
      ${rn(t)}
      ${g}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},Zu=(e,t,r,n,o,i,a,l)=>{let d=t.format==="NHWC",p=d?e[0].dims[3]:e[0].dims[1],m=r[0],u=d?r[2]:r[3],h=d?r[1]:r[2],w=d?r[3]:r[1],y=d&&p%4===0&&p%3&&w%4===0,g=d?w:u*h,x=d?u*h:w,$=[8,8,1],v=n<=8?[4,1,1]:[4,4,1],S=[Math.ceil(g/$[0]/v[0]),Math.ceil(x/$[1]/v[1]),Math.ceil(m/$[2]/v[2])];se("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${S}`);let T=y?4:1,C=Math.max($[0]*T,$[1]),A=y?4:1,P=[t.kernelShape[d?1:2],t.kernelShape[d?2:3]],O=[P[0]+(t.dilations[0]<=1?0:(P[0]-1)*(t.dilations[0]-1)),P[1]+(t.dilations[1]<=1?0:(P[1]-1)*(t.dilations[1]-1))],U=[O[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),O[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],L=[{type:6,data:n},{type:6,data:o},{type:6,data:i},{type:6,data:t.strides},{type:6,data:t.dilations},{type:6,data:P},{type:6,data:U}];We(t,L),L.push(...N(e[0].dims,e[1].dims));let K=["rank","rank"];a&&(L.push(...N(e[2].dims)),K.push("rank")),L.push(...N(r));let j=W=>{let ee=E("x",e[0].dataType,e[0].dims.length,A),ue=E("w",e[1].dataType,e[1].dims.length,1),Z=M("result",e[0].dataType,r.length,A),J=[ee,ue],Q="";if(a){let Ae=E("bias",e[2].dataType,e[2].dims.length,A);J.push(Ae),Q+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${Ae.type.value} {
            return bias[coords.${d?"w":"y"}${y?"/ 4":""}];
          }`}let ne=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:P.length},{name:"pads",type:"i32",length:U.length}];Le(t,ne);let _e=me(e[0].dataType,1);if(_e!=="f16"&&_e!=="f32")throw new Error(`elemType ${_e} is not supported.`);return`
        ${nn("uniforms.result_strides")}
        ${W.registerUniforms(ne).declareVariables(...J,Z)};
        ${Q}
        ${cf(d,a,t,ee.type.value,T)}
        ${y?rr(v,$,_e,void 0,!d,C):nr(v,$,_e,void 0,!d,C,!1,void 0,l)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${t.cacheKey};${v};${$};${y}`,inputDependencies:K},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:L}),getShaderSource:j}}});var pf,To,Qu=R(()=>{"use strict";te();Ke();oe();ae();pf=(e,t,r,n,o,i=!1,a,l,d=!1)=>{let p=d?1:2,m=d?2:3,u=d?3:1,h=i?2:1,w=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${a}>`:a}) {
    result[flatIndex] = ${i?`vec4<${a}>`:a}(value);
  }`;n&&(w+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${a}>`:a} {
      return bias[coords.${d?"w":"y"}${i?"/ 4":""}];
    }`);let y=i?4:1,g=E("W",t[1].dataType,t[1].dims.length,y),x=E("Dy",t[0].dataType,t[0].dims.length,y),$=[x,g];n&&$.push(E("bias",t[2].dataType,[r[u]].length,y));let v=M("result",t[0].dataType,r.length,y),S=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${h};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${a}>, ${h}>;
        for (var i = 0; i < ${h}; i++) {
          dotProd[i] = vec4<${a}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${a}(dyCorner.x) + ${a}(wR)) / ${a}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${a}(dyCorner.y) + ${a}(wC)) / ${a}(uniforms.strides.y);
            let dyC2 = (${a}(dyCorner.y) + 1.0 + ${a}(wC)) / ${a}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${a}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${x.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${a}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${u}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${g.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${x.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${a}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${h}; i = i + 1) {
          let value = dotProd[i] + ${n?"bias[c+i]":`vec4<${a}>(0.0)`};
          ${v.set("batch","r","c + i","d1","value")};
        }
      }`,T=`
          let outputIndices = ${v.offsetToIndices("global_idx")};
          let batch = ${v.indicesGet("outputIndices",0)};
          let d1 = ${v.indicesGet("outputIndices",u)};
          let r = ${v.indicesGet("outputIndices",p)};
          let c = ${v.indicesGet("outputIndices",m)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${a}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${a}(dyRCorner) + ${a}(wR)) / ${a}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${a}(uniforms.Dy_shape[${p}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${a}(dyCCorner) + ${a}(wC)) / ${a}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${a}(uniforms.Dy_shape[${m}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${d?x.get("batch","idyR","idyC","inputChannel"):x.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${g.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${n?"bias[d1]":`${a}(0.0)`};
          ${v.setByOffset("global_idx","value")};
        `;return`
  ${e.registerUniforms(l).declareVariables(...$,v)}
  ${w}

    ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?S:T}}`},To=(e,t,r)=>{let n=e.length>2,o=t.outputShape,i=k.size(o),a=[Math.ceil(i/64),1,1];se("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${a}`);let l=t.format==="NHWC",d=["rank","rank"],p=[t.strides[0],t.strides[1]],m=[t.kernelShape[l?1:2],t.kernelShape[l?2:3]],u=[t.dilations[0],t.dilations[1]],h=[m[0]+(t.dilations[0]<=1?0:(t.kernelShape[l?1:2]-1)*(t.dilations[0]-1)),m[1]+(t.dilations[1]<=1?0:(t.kernelShape[l?2:3]-1)*(t.dilations[1]-1))],w=[h[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),h[1]-1-Math.floor(t.pads[1]+t.pads[3])/2],y=!1,g=t.group,x=e[1].dims,$=x[0]/g,v=x[1],S=[{type:12,data:i},{type:12,data:p},{type:12,data:m},{type:12,data:u},{type:12,data:h},{type:6,data:w},{type:12,data:$},{type:12,data:v},...N(e[0].dims,e[1].dims)];n&&(S.push(...N(e[2].dims)),d.push("rank")),S.push(...N(o));let T=a[1]===1&&a[2]===1,C=A=>{let P=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:p.length},{name:"filter_dims",type:"u32",length:m.length},{name:"dilations",type:"u32",length:m.length},{name:"effective_filter_dims",type:"u32",length:h.length},{name:"pads",type:"i32",length:w.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],O=me(e[0].dataType);return`${pf(A,e,o,n,T,y,O,P,l)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};`,inputDependencies:d},getRunData:()=>({dispatchGroup:{x:a[0],y:a[1],z:a[2]},outputs:[{dims:r?r(o):o,dataType:e[0].dataType}],programUniforms:S}),getShaderSource:C}}});var mf,ff,hf,Ju,el,gf,bf,yf,wf,tl,rl=R(()=>{"use strict";Xu();Qu();lt();ut();mf=(e,t,r,n,o,i)=>(e-1)*t+r+(n-1)*o+1-i,ff=(e,t,r,n,o)=>{let i=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=i,r[o]=e-i):t==="SAME_LOWER"&&(r[n]=e-i,r[o]=i)},hf=(e,t,r,n,o,i,a,l,d,p)=>{let m=e.length-2,u=p.length===0;d.length<m&&d.push(...Array(m-d.length).fill(0));let h=e[0],w=t[l?3:1]*o;for(let y=0,g=e.length-m-(l?1:0);y<m;++y,++g){let x=e[g],$=u?x*a[y]:p[y],v=mf(x,a[y],i[y],t[g],r[y],$);ff(v,n,i,y,y+m),u&&p.push(a[y]*(x-1)+d[y]+(t[g]-1)*r[y]+1-i[y]-i[y+m])}p.splice(0,0,h),p.splice(l?3:1,0,w)},Ju=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((u,h)=>u*h,1)===0){r.length=0;for(let u=2;u<t[1].dims.length;++u)r.push(t[1].dims[u])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let o=e.pads.slice(),i=e.outputShape.slice(),a=e.outputPadding.slice(),l=t[0].dims,d=e.dilations.slice();if(d.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;d=new Array(u).fill(1)}let p=e.strides.slice();if(p.reduce((u,h)=>u+h,0)===0){let u=t[0].dims.length-2;p=new Array(u).fill(1)}hf(l,r,d,e.autoPad,e.group,o,p,n,a,i);let m=Object.assign({},e);return Object.assign(m,{kernelShape:r,pads:o,outputPadding:a,outputShape:i,dilations:d,strides:p}),m},el=e=>{let t=tn(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],o=e.dilations,i=e.group,a=e.kernelShape,l=e.pads,d=e.strides,p=e.wIsConst(),m=e.outputPadding,u=e.outputShape;return{autoPad:n,format:r,dilations:o,group:i,kernelShape:a,outputPadding:m,outputShape:u,pads:l,strides:d,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},gf=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==o))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.reduce((m,u)=>m+u,0)>0&&t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.reduce((m,u)=>m+u,0)>0&&t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.reduce((m,u)=>m+u,0)>0&&t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.outputPadding.length!==i&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(t.kernelShape.reduce((m,u)=>m+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},bf=[2,3,1,0],yf=(e,t,r)=>{let n=Ju(r,t),o=r.format==="NHWC",i=n.outputShape,a=i[o?3:1],l=t[0].dims[o?3:1];if(n.group!==1||a===1&&l===1){e.compute(To(t,n));return}let d=i[o?1:2],p=i[o?2:3],m=t[1].dims[2],u=t[1].dims[3],h=o?d*p:a,w=o?a:d*p,y=m*u*l,g=!0,x=e.kernelCustomData.wT??e.compute(Pe(t[1],bf),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=x);let $=[t[0],x],v=t.length===3;v&&(!o&&t[2].dims.length===1?$.push(t[2].reshape([t[2].dims[0],1,1])):$.push(t[2])),e.compute(Zu($,n,i,h,w,y,v,g),{inputs:$})},wf=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let o=t.kernelShape;(o.length===0||o[0]===0)&&(o=[e.inputs[1].dims[2]]);let i=t.dilations;(i.length===0||i[0]===0)&&(i=[1]);let a=t.strides;(a.length===0||a[0]===0)&&(a=[1]);let l=t.pads;l.length===0&&(l=[0,0]),l=[0,l[0],0,l[1]],a=[1].concat(a),i=[1].concat(i),o=[1].concat(o);let d=Ju({...t,pads:l,strides:a,dilations:i,kernelShape:o},n);e.compute(To(n,d,p=>r?[p[0],p[2],p[3]]:[p[0],p[1],p[3]]))},tl=(e,t)=>{gf(e.inputs,t),e.inputs[0].dims.length===3?wf(e,t):yf(e,e.inputs,t)}});var _f,nl,ol,il=R(()=>{"use strict";te();oe();Ce();ae();_f=(e,t,r,n)=>{let o=k.size(t),i=t.length,a=E("input",e,i),l=M("output",e,i),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),p=k.normalizeAxis(d,i),m=u=>{let h=` i32(${a.indicesGet("inputIndices","uniforms.axis")}) `,w=F("uniforms.input_shape","uniforms.axis",i),y=n.reverse?h+(n.exclusive?" + 1":""):"0",g=n.reverse?w:h+(n.exclusive?"":" + 1");return`
                ${u.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(a,l)}
                ${u.mainStart()}
                  ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${l.offsetToIndices("global_idx")};
                  var sum = ${l.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${g};
                  for (var i : i32 = first; i < last; i++) {
                    ${a.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${a.getByIndices("inputIndices")};
                  }
                  ${l.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:p},...N(t,t)]}),getShaderSource:m}},nl=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,o=e.inputs[1];e.compute(_f(n,r,o,t),{inputs:[0]})},ol=e=>{let t=e.exclusive===1,r=e.reverse===1;return re({exclusive:t,reverse:r})}});var vf,$f,xf,al,sl,ul=R(()=>{"use strict";te();oe();Ce();ae();vf=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},$f=(e,t,r,n)=>{let o=[];o.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let i=0;i<t;++i)o.push(r.indicesSet("a",e[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},xf=(e,t)=>{let r,n,o,i,a,l,d=t.format==="NHWC",p=t.blocksize,m=t.mode==="DCR";d?([r,n,o,i]=e.dims,a=m?[r,n,o,p,p,i/p**2]:[r,n,o,i/p**2,p,p],l=m?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,o,i]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],a=m?[r,p,p,i/p**2,n,o]:[r,i/p**2,p,p,n,o],l=m?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let u=e.reshape(a),h=u.dims.length,w=e.dataType,y=E("a",w,h),g=M("output",w,h),x=$=>`
  ${$.registerUniform("output_size","u32").declareVariables(y,g)}

  ${$f(l,h,y,g)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${g.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${g.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:$=>{let v=d?[r,n*p,o*p,i/p**2]:[r,i/p**2,n*p,o*p],S=k.size(v),T=u.dims,C=k.sortBasedOnPerm(T,l);return{outputs:[{dims:v,dataType:$[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...N(T,C)]}},getShaderSource:x}},al=(e,t)=>{vf(e.inputs),e.compute(xf(e.inputs[0],t))},sl=e=>re({blocksize:e.blocksize,mode:e.mode,format:e.format})});var Io,un,ll,Sf,Tf,Co,Ao,dl,If,cl,pl,ml=R(()=>{"use strict";te();oe();Ce();ae();Io="[a-zA-Z]|\\.\\.\\.",un="("+Io+")+",ll="^"+un+"$",Sf="("+un+",)*"+un,Tf="^"+Sf+"$",Co=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let n=this.symbolToIndices.get(t);n===void 0?n=[r]:n.push(r),this.symbolToIndices.set(t,n)}},Ao=class{constructor(t,r){this.equation=r;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[n,o]=r.includes("->")?r.split("->",2):[r,""];if(!n.match(RegExp(Tf)))throw new Error("Invalid LHS term");if(n.split(",").forEach((l,d)=>{let p=t[d].dims.slice();if(!l.match(RegExp(ll)))throw new Error("Invalid LHS term");let m=this.processTerm(l,!0,p,d);this.lhs.push(m)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([l,d])=>d.count===1||l==="...").map(([l])=>l).join("");else if(!o.match(RegExp(un)))throw new Error("Invalid RHS");o.match(RegExp(Io,"g"))?.forEach(l=>{if(l==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let d=this.symbolToInfo.get(l);if(d===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(d.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(t,r,n){let o=this.symbolToInfo.get(t);if(o!==void 0){if(o.dimValue!==r&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(n)}else o={count:1,dimValue:r,inputIndices:[n]};this.symbolToInfo.set(t,o)}processTerm(t,r,n,o=-1){let i=n.length,a=!1,l=[],d=0;if(!t.match(RegExp(ll))&&!r&&t!=="")throw new Error("Invalid LHS term");let p=t.match(RegExp(Io,"g")),m=new Co(o);return p?.forEach((u,h)=>{if(u==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let w=i-p.length+1;if(w<0)throw new Error("Ellipsis out of bounds");if(l=n.slice(d,d+w),this.hasEllipsis){if(this.ellipsisDims.length!==l.length||this.ellipsisDims.toString()!==l.toString())throw new Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=l;else throw new Error("Ellipsis must be specified in the LHS");for(let y=0;y<l.length;y++){let g=String.fromCharCode("0".charCodeAt(0)+y);m.addSymbol(g,h+y),this.addSymbol(g,n[d++],o)}}else m.addSymbol(u,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(u,n[d++],o)}),m}},dl=e=>e+"_max",If=(e,t,r,n)=>{let i=e.map(m=>m.length).map((m,u)=>E(`input${u}`,t,m)),a=k.size(n),l=M("output",t,n.length),d=[...r.symbolToInfo.keys()].filter(m=>!r.rhs.symbolToIndices.has(m)),p=m=>{let u=[],h="var prod = 1.0;",w="var sum = 0.0;",y="sum += prod;",g=[],x=[],$=[],v=[],S=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((C,A)=>{if(r.rhs.symbolToIndices.has(A)){let P=r.rhs.symbolToIndices.get(A)?.[0];P!==void 0&&r.lhs.forEach((O,U)=>{if(C.inputIndices.includes(U)){let L=O.symbolToIndices.get(A);if(L===void 0)throw new Error("Invalid symbol error");L.forEach(K=>{u.push(`${i[U].indicesSet(`input${U}Indices`,K,l.indicesGet("outputIndices",P))}`)})}})}else r.lhs.forEach((P,O)=>{if(C.inputIndices.includes(O)){let U=P.symbolToIndices.get(A);if(U===void 0)throw new Error("Invalid symbol error");U.forEach(L=>{g.push(`${i[O].indicesSet(`input${O}Indices`,L,`${A}`)}`)}),v.push(`prod *= ${i[O].getByIndices(`input${O}Indices`)};`)}}),x.push(`for(var ${A}: u32 = 0; ${A} < uniforms.${dl(A)}; ${A}++) {`),$.push("}")});let T=S?[...u,`let sum = ${i.map((C,A)=>C.getByIndices(`input${A}Indices`)).join(" * ")};`]:[...u,w,...x,...g,h,...v,y,...$];return`
            ${m.registerUniforms(d.map(C=>({name:`${dl(C)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,l)}

            ${m.mainStart()}
            ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${i.map((C,A)=>`var input${A}Indices: ${i[A].type.indices};`).join(`
`)}
            ${T.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let m=d.filter(h=>r.symbolToInfo.has(h)).map(h=>({type:12,data:r.symbolToInfo.get(h)?.dimValue||0}));m.push({type:12,data:a});let u=e.map((h,w)=>[...N(h)]).reduce((h,w)=>h.concat(w),m);return u.push(...N(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:u}},getShaderSource:p}},cl=(e,t)=>{let r=new Ao(e.inputs,t.equation),n=r.outputDims,o=e.inputs.map((i,a)=>i.dims);e.compute(If(o,e.inputs[0].dataType,r,n))},pl=e=>{let t=e.equation.replace(/\s+/g,"");return re({equation:t})}});var Cf,fl,Af,kf,hl,gl=R(()=>{"use strict";te();oe();ae();Cf=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,o=t.length<r.length?0:t.length-r.length;for(;n<r.length&&o<t.length;++n,++o)if(r[n]!==t[o]&&r[n]!==1&&t[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},fl=(e,t)=>{let r=e.length-t.length,n=[];for(let o=0;o<r;++o)n.push(e[o]);for(let o=0;o<t.length;++o)n.push(t[o]===1?e[o+r]:t[o]);return n},Af=(e,t)=>e.length>t.length?fl(e,t):fl(t,e),kf=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Af(t,r),o=e[0].dataType,i=o===9?4:1,a=Math.ceil(k.size(n)/i),l=p=>{let m=E("input",o,t.length,i),u=M("output",o,n.length,i),h;if(o===9){let w=(y,g,x="")=>`
          let outputIndices${g} = ${u.offsetToIndices(`outputOffset + ${g}u`)};
          let offset${g} = ${m.broadcastedIndicesToOffset(`outputIndices${g}`,u)};
          let index${g} = offset${g} / 4u;
          let component${g} = offset${g} % 4u;
          ${y}[${g}] = ${x}(${m.getByOffset(`index${g}`)}[component${g}]);
        `;h=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${w("data",0,"u32")}
        ${w("data",1,"u32")}
        ${w("data",2,"u32")}
        ${w("data",3,"u32")}
        ${u.setByOffset("global_idx","data")}
      }`}else h=`
        let outputIndices = ${u.offsetToIndices("global_idx")};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",u)};
        ${u.setByOffset("global_idx",m.getByOffset("inputOffset"))}
      }`;return`
    ${p.registerUniform("vec_size","u32").declareVariables(m,u)}
    ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${h}`},d=[{type:12,data:a},...N(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length}`,inputDependencies:["rank"]},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d})}},hl=e=>{Cf(e.inputs),e.compute(kf(e.inputs),{inputs:[0]})}});var Ef,bl,yl=R(()=>{"use strict";te();oe();ae();en();Ef=e=>{let t=e[0].dataType,r=k.size(e[0].dims),n=k.size(e[1].dims),o=n%4===0,i=a=>{let l=E("x",t,[1],4),d=E("bias",t,[1],4),p=M("y",t,[1],4),m=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],u=w=>`
      let bias${w}_offset: u32 = (global_idx * 4 + ${w}) % uniforms.bias_size;
      let bias${w} = ${d.getByOffset(`bias${w}_offset / 4`)}[bias${w}_offset % 4];`,h=o?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${u(0)}${u(1)}${u(2)}${u(3)}
      let bias = ${l.type.value}(bias0, bias1, bias2, bias3);`;return`${a.registerUniforms(m).declareVariables(l,d,p)}

    ${yo(Ee(t))}

    ${a.mainStart(Ct)}
      ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${l.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",wo("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:a=>({outputs:[{dims:a[0].dims,dataType:a[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/Ct/4)}})}},bl=e=>{e.inputs.length<2||k.size(e.inputs[1].dims)===0?gu(e):e.compute(Ef(e.inputs))}});var Pf,zf,wl,_l,vl=R(()=>{"use strict";te();oe();Ce();ae();Pf=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},zf=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.axis,o),a=r.slice(0);a.splice(i,1,...n);let l=r[i],d=e[0].dataType===9?4:1,p=Math.ceil(k.size(a)/d),m=[{type:12,data:p},{type:6,data:l},{type:12,data:i},...N(e[0].dims,e[1].dims,a)],u=h=>{let w=E("data",e[0].dataType,e[0].dims.length,d),y=E("inputIndices",e[1].dataType,e[1].dims.length),g=M("output",e[0].dataType,a.length,d),x=v=>{let S=n.length,T=`var indicesIndices${v}  = ${y.type.indices}(0);`;for(let C=0;C<S;C++)T+=`${S>1?`indicesIndices${v}[${C}]`:`indicesIndices${v}`} = ${a.length>1?`outputIndices${v}[uniforms.axis + ${C}]`:`outputIndices${v}`};`;T+=`
          var idx${v} = ${y.getByIndices(`indicesIndices${v}`)};
          if (idx${v} < 0) {
            idx${v} = idx${v} + uniforms.axisDimLimit;
          }
          var dataIndices${v} : ${w.type.indices};
        `;for(let C=0,A=0;C<o;C++)C===i?(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = u32(idx${v});`,A+=S):(T+=`${o>1?`dataIndices${v}[${C}]`:`dataIndices${v}`} = ${a.length>1?`outputIndices${v}[${A}]`:`outputIndices${v}`};`,A++);return T},$;if(e[0].dataType===9){let v=(S,T,C="")=>`
          let outputIndices${T} = ${g.offsetToIndices(`outputOffset + ${T}u`)};
          ${x(T)};
          let offset${T} = ${w.indicesToOffset(`dataIndices${T}`)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${S}[${T}] = ${C}(${w.getByOffset(`index${T}`)}[component${T}]);
        `;$=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${v("value",0,"u32")}
        ${v("value",1,"u32")}
        ${v("value",2,"u32")}
        ${v("value",3,"u32")}
        ${g.setByOffset("global_idx","value")}
      `}else $=`
      let outputIndices = ${g.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${w.getByIndices("dataIndices")};
      ${g.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(w,y,g)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${$}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:u}},wl=e=>re({axis:e.axis}),_l=(e,t)=>{let r=e.inputs;Pf(r),e.compute(zf(e.inputs,t))}});var Of,Df,$l,xl,Sl=R(()=>{"use strict";te();oe();Ce();ae();Of=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=k.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,o=e[0],i=e[2],a=e.length===4?e[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((l,d)=>d===r?Math.ceil(l/n)===i.dims[d]:l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(a){if(a.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(a.dims.length!==i.dims.length||!a.dims.map((l,d)=>l===i.dims[d]).reduce((l,d)=>l&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Df=(e,t)=>{let r=e[0].dims,n=e[1].dims,o=r.length,i=k.normalizeAxis(t.gatherAxis,o),a=k.normalizeAxis(t.quantizeAxis,o),l=r.slice(0);l.splice(i,1,...n);let d=k.size(l),p=e[2].dataType,u=e[0].dataType===22,h=[{type:12,data:d},{type:12,data:a},{type:12,data:i},{type:12,data:t.blockSize},...N(...e.map((y,g)=>y.dims),l)],w=y=>{let g=E("data",e[0].dataType,e[0].dims.length),x=E("inputIndices",e[1].dataType,e[1].dims.length),$=E("scales",e[2].dataType,e[2].dims.length),v=e.length>3?E("zeroPoint",e[3].dataType,e[3].dims.length):void 0,S=M("output",p,l.length),T=[g,x,$];v&&T.push(v);let C=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${y.registerUniforms(C).declareVariables(...T,S)}
        ${y.mainStart()}
        let output_indices = ${S.offsetToIndices("global_idx")};
        var indices_indices = ${x.type.indices}(0);
        ${(()=>n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${S.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${x.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${S.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${S.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${x.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[i]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${l.length}; i++) {
          let index = ${S.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
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
        let dequantized_data = ${Ee(p)}(quantized_data - zero_point) * scale;
        ${S.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((y,g)=>g!==1).map(y=>y.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(y,g)=>"rank")},getRunData:()=>({outputs:[{dims:l,dataType:p}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h}),getShaderSource:w}},$l=(e,t)=>{let r=e.inputs;Of(r,t),e.compute(Df(e.inputs,t))},xl=e=>re({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})});var Bf,Mf,Tl,Il,Cl=R(()=>{"use strict";te();oe();Ce();ae();Bf=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Mf=(e,t)=>{let r=e[0].dims,n=e[0].dataType,o=r.length,i=e[1].dims,a=e[1].dataType,l=k.normalizeAxis(t.axis,o),d=r[l],p=i.slice(0),m=k.size(p),u=E("input",n,o),h=E("indicesInput",a,i.length),w=M("output",n,p.length),y=[{type:12,data:m},{type:6,data:d},{type:12,data:l}];return y.push(...N(r,i,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:y}),getShaderSource:$=>`
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
  }`}},Tl=e=>re({axis:e.axis}),Il=(e,t)=>{let r=e.inputs;Bf(r),e.compute(Mf(e.inputs,t))}});var Rf,Uf,Al,kl,El=R(()=>{"use strict";te();oe();ae();Rf=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Uf=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[o,i,a]=jr.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),l=[o,i];if(!l)throw new Error("Can't use gemm on the given tensors");let d=16,p=Math.ceil(i/d),m=Math.ceil(o/d),u=!0,h=k.size(l),w=[{type:12,data:u?p:h},{type:12,data:o},{type:12,data:i},{type:12,data:a},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(w.push(...N(e[2].dims)),y.push("rank")),w.push(...N(l));let g=$=>{let v="";t.transA&&t.transB?v="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?v="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?v="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(v="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",T=E("a",e[0].dataType,e[0].dims),C=E("b",e[1].dataType,e[1].dims),A=T.type.value,P=null,O=[T,C];e.length===3&&(P=E("c",e[2].dataType,e[2].dims.length),O.push(P));let U=M("output",e[0].dataType,l.length);O.push(U);let L=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${$.registerUniforms(L).declareVariables(...O)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${A}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${v}
    }

    ${S}
    ${(()=>P!=null?`let cOffset = ${P.broadcastedIndicesToOffset("vec2(m, n)",U)}; value += ${A}(uniforms.beta) * ${P.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},x=$=>{let v=E("a",e[0].dataType,e[0].dims),S=E("b",e[1].dataType,e[1].dims),T=null,C=[v,S];e.length===3&&(T=E("c",e[2].dataType,e[2].dims.length),C.push(T));let A=M("output",e[0].dataType,l.length);C.push(A);let P=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],O="",U="";t.transA&&t.transB?(U=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(U=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(U=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(U=`
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
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,O="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let L=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${$.registerUniforms(P).declareVariables(...C)}
  var<workgroup> tile_a: array<array<${v.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${d}>, ${d}>;
  ${$.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${A.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${U}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${O}
      }
      workgroupBarrier();
    }

    ${L}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>T!=null?`let cOffset = ${T.broadcastedIndicesToOffset("vec2(m, n)",A)}; value += ${A.type.value}(uniforms.beta) * ${T.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return u?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:p*m},programUniforms:w}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:l,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:w}),getShaderSource:g}},Al=e=>{let t=e.transA,r=e.transB,n=e.alpha,o=e.beta;return{transA:t,transB:r,alpha:n,beta:o,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},kl=(e,t)=>{Rf(e.inputs),e.compute(Uf(e.inputs,t))}});var dt,yt,Ut,Nt,Nf,Vf,Wf,Lf,Gf,Hf,Ff,qf,Pl,zl,Ol=R(()=>{"use strict";te();oe();Ce();ae();[dt,yt,Ut,Nt]=[0,1,2,3],Nf=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Vf=`
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
`,Wf=e=>`
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
`,Lf=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Gf=e=>`
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
`,Hf=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${dt}] = batch;
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
`,Ff=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${dt}], indices[${yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${dt}], indices[${yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${dt}], indices[${yt}], border);

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
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${dt}], indices[${yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,qf=(e,t)=>{let r=E("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],o=E("grid",e[1].dataType,n.length,2),i=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(i=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[dt,yt,Ut,Nt]=[0,3,1,2]);let a=M("output",e[0].dataType,i.length),l=r.type.value,d=k.size(i),p=[{type:12,data:d},...N(e[0].dims,n,i)],m=u=>`
  ${u.registerUniform("output_size","u32").declareVariables(r,o,a)}
  ${Vf}
  ${Wf(l)}
  ${Lf(t)}
  ${Gf(t)}
  ${Hf(r,l,t)}

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
      var grid_indices = vec3<u32>(indices[${dt}], indices[${Ut}], indices[${Nt}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Ff(a,l,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:u=>{let h=k.size(i);return{outputs:[{dims:i,dataType:u[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:p}},getShaderSource:m}},Pl=(e,t)=>{Nf(e.inputs),e.compute(qf(e.inputs,t))},zl=e=>re({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})});var Me,Yf,Bl,Dl,Zf,ar,Ml,ko=R(()=>{"use strict";te();oe();Ce();Kr();Qr();ae();ut();Me=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Yf=(e,t)=>{let r=e[0],n=Me(e,1),o=Me(e,2),i=Me(e,3),a=Me(e,4),l=Me(e,5),d=Me(e,6),p=Me(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let m=r.dims[0],u=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],w=u,y=0,g=0,x=Math.floor(h/t.numHeads);if(d&&p&&k.size(d.dims)&&k.size(p.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==m||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==m||p.dims[1]!==t.numHeads||p.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=d.dims[2],g=d.dims[2]}else if(d&&k.size(d.dims)||p&&k.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let $;if(n&&k.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');$=2,w=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');$=5,w=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');$=0,w=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');$=3}if(i&&k.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let v=y+w,S=0;if(a&&k.size(a.dims)>0){S=8;let P=a.dims;throw P.length===1?P[0]===m?S=1:P[0]===3*m+2&&(S=3):P.length===2&&P[0]===m&&P[1]===v&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let T=!1,C=h;if(o&&k.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(w!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(w!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=!1;if(a&&k.size(a.dims)>0)throw new Error("Key padding mask is not supported");if(l&&k.size(l.dims)>0){if(l.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==m||l.dims[1]!==t.numHeads||l.dims[2]!==u||l.dims[3]!==v)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:m,sequenceLength:u,pastSequenceLength:y,kvSequenceLength:w,totalSequenceLength:v,maxSequenceLength:g,inputHiddenSize:0,hiddenSize:h,vHiddenSize:C,headSize:x,vHeadSize:Math.floor(C/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:A,passPastInKv:T,qkvFormat:$}},Bl=e=>re({...e}),Dl=re({perm:[0,2,1,3]}),Zf=(e,t,r,n,o,i,a)=>{let l=[n,o,i],d=k.size(l),p=[{type:12,data:d},{type:12,data:a},{type:12,data:i}],m=u=>{let h=M("qkv_with_bias",t.dataType,l),w=E("qkv",t.dataType,l),y=E("bias",r.dataType,l),g=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${u.registerUniforms(g).declareVariables(w,y,h)}
  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:l,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:p}),getShaderSource:m},{inputs:[t,r],outputs:[-1]})[0]},ar=(e,t,r,n,o,i,a,l)=>{let d=i;if(a&&k.size(a.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=Zf(e,i,a,t,n,r*o,l),d=d.reshape([t,n,r,o]),r===1||n===1?d:e.compute(Pe(d,Dl.perm),{inputs:[d],outputs:[-1]})[0]}else return i.dims.length===3&&(d=i.reshape([t,n,r,o])),r===1||n===1?d:e.compute(Pe(d,Dl.perm),{inputs:[d],outputs:[-1]})[0]},Ml=(e,t)=>{let r=Yf(e.inputs,t),n=e.inputs[0],o=Me(e.inputs,1),i=Me(e.inputs,2),a=Me(e.inputs,3),l=Me(e.inputs,4),d=Me(e.inputs,5),p=Me(e.inputs,6),m=Me(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let u=o&&i&&o.dims.length===4&&i.dims.length===4,h=ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,a,0);if(u)return Rt(e,h,o,i,l,void 0,p,m,d,r);if(!o||!i)throw new Error("key and value must be provided");let w=ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,o,a,r.hiddenSize),y=ar(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,i,a,2*r.hiddenSize);Rt(e,h,w,y,l,void 0,p,m,d,r)}});var Xf,Qf,Jf,eh,Eo,Rl,Ul,Po=R(()=>{"use strict";te();oe();Ce();ae();Xf=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Qf=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(o=>r.push(Number(o))),n=r.length),re({numOutputs:n,axis:t.axis,splitSizes:r})},Jf=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,eh=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let o=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(o):n===0?r.push(`if (output_number == ${n}u) { ${o} }`):n===t-1?r.push(`else { ${o} }`):r.push(`else if (output_number == ${n}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Eo=(e,t)=>{let r=e[0].dims,n=k.size(r),o=e[0].dataType,i=k.normalizeAxis(t.axis,r.length),a=new Array(t.numOutputs),l=E("input",o,r.length),d=new Array(t.numOutputs),p=[],m=[],u=0,h=[{type:12,data:n}];for(let y=0;y<t.numOutputs;y++){u+=t.splitSizes[y],d[y]=u;let g=r.slice();g[i]=t.splitSizes[y],m.push(g),a[y]=M(`output${y}`,o,g.length),p.push({dims:m[y],dataType:e[0].dataType})}h.push({type:12,data:d},...N(r,...m));let w=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(l,...a)}
  ${Jf(d.length)}
  ${eh(a)}

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
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:h})}},Rl=(e,t)=>{Xf(e.inputs);let r=e.inputs.length===1?t:Qf(e.inputs,t);e.compute(Eo(e.inputs,r),{inputs:[0]})},Ul=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return re({axis:t,numOutputs:n,splitSizes:r})}});var th,rh,Nl,Vl,Wl=R(()=>{"use strict";Ce();Qr();ko();Po();ut();th=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],o=e[2],i=e[3],a=e[4];if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let l=!1,d=r.dims[0],p=r.dims[1],m=r.dims.length===3?l?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],u=p,h=0,w=!n||n.dims.length===0,y=Math.floor(w?m/(t.numHeads+2*t.kvNumHeads):m/t.numHeads);w&&(m=y*t.numHeads);let g=i&&i.dims.length!==0,x=a&&a.dims.length!==0;if(g&&i.dims.length===4&&i.dims[0]===d&&i.dims[1]!==t.kvNumHeads&&i.dims[2]===t.kvNumHeads&&i.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(g&&x){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(a.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=i.dims[2]}else if(g||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');u=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');u=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');u=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let S=0,T=!1,C=t.kvNumHeads?y*t.kvNumHeads:m;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(u!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');C=o.dims[2]}else{if(u!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');C=o.dims[1]*o.dims[3],T=!0}}let A=e.length>4?e[5]:void 0;if(A&&A.dims.length!==1&&A.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let P=-1,O=-1,U=!1;return{batchSize:d,sequenceLength:p,pastSequenceLength:h,kvSequenceLength:u,totalSequenceLength:P,maxSequenceLength:O,inputHiddenSize:0,hiddenSize:m,vHiddenSize:C,headSize:y,vHeadSize:Math.floor(C/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:S,scale:t.scale,broadcastResPosBias:U,passPastInKv:T,qkvFormat:v}},rh=re({perm:[0,2,1,3]}),Nl=(e,t,r)=>{let n=t,o=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,o,r.headSize]),n=e.compute(Pe(n,rh.perm),{inputs:[n],outputs:[-1]})[0]),n},Vl=(e,t)=>{let r=th(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],o=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,i=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,a=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,l=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,m=r.kvNumHeads?r.kvNumHeads:r.numHeads,u=re({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,m*r.headSize,m*r.headSize]}),[h,w,y]=!o&&!i?e.compute(Eo([n],u),{inputs:[n],outputs:[-1,-1,-1]}):[n,o,i],g=ar(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,h,void 0,0);Rt(e,g,Nl(e,w,r),Nl(e,y,r),void 0,void 0,a,l,void 0,r,d,p)}});var Ll,nh,oh,Gl,Hl=R(()=>{"use strict";te();oe();ut();ae();Ll=(e,t,r,n,o,i,a,l)=>{let d=we(i),p=d===1?"f32":`vec${d}f`,m=d===1?"vec2f":`mat2x${d}f`,u=o*a,h=64;u===1&&(h=256);let w=[o,a,i/d],y=[o,a,2],g=["rank","type","type"],x=[];x.push(...N(w,y));let $=v=>{let S=E("x",t.dataType,3,d),T=E("scale",r.dataType,r.dims),C=E("bias",n.dataType,n.dims),A=M("output",1,3,2),P=[S,T,C,A];return`
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
      let value = ${p}(${S.get("batch","channel","h")});
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
      let sum_final = ${je("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${je("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${l}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${l};${h}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:u},programUniforms:x}),getShaderSource:$},{inputs:[t,r,n],outputs:[-1]})[0]},nh=(e,t,r)=>{let n=t[0].dims,o=n,i=2,a=n[0],l=n[1],d=k.sizeFromDimension(n,i),p=we(d),m=k.size(o)/p,u=Ll(e,t[0],t[1],t[2],a,d,l,r.epsilon),h=[a,l,d/p],w=[a,l],y=["type","none"],g=x=>{let $=E("x",t[0].dataType,h.length,p),v=E("scale_shift",1,w.length,2),S=M("output",t[0].dataType,h.length,p),T=[$,v,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...T)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${v.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${$.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...N(h,w,h)]}),getShaderSource:g},{inputs:[t[0],u]})},oh=(e,t,r)=>{let n=t[0].dims,o=n,i=n[0],a=n[n.length-1],l=k.sizeFromDimension(n,1)/a,d=we(a),p=k.size(o)/d,m=[{type:12,data:l},{type:12,data:Math.floor(a/d)}],u=["type","type"],h=!1,w=[0,n.length-1];for(let $=0;$<n.length-2;$++)h=h||n[$+1]!==1,w.push($+1);h=h&&n[n.length-1]!==1;let y=h?e.compute(Pe(e.inputs[0],w),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},($,v)=>n[w[v]])),g=Ll(e,y,t[1],t[2],i,l,a,r.epsilon),x=$=>{let v=me(t[0].dataType),S=d===1?"vec2f":`mat${d}x2f`,T=P=>{let O=P===0?"x":"y",U=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${v}(${U}(scale.${O}))`;case 2:return`vec2<${v}>(${U}(scale[0].${O}, scale[1].${O}))`;case 4:return`vec4<${v}>(${U}(scale[0].${O}, scale[1].${O}, scale[2].${O}, scale[3].${O}))`;default:throw new Error(`Not supported compoents ${d}`)}},C=E("input",t[0].dataType,t[0].dims,d),A=M("output",t[0].dataType,o,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${C.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${A.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${$.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${T(0)}, ${T(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:o,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:m}),getShaderSource:x},{inputs:[t[0],g]})},Gl=(e,t)=>{t.format==="NHWC"?oh(e,e.inputs,t):nh(e,e.inputs,t)}});var ih,ah,Fl,ql=R(()=>{"use strict";te();oe();ae();ih=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},ah=(e,t,r)=>{let n=t.simplified,o=e[0].dims,i=e[1],a=!n&&e[2],l=o,d=k.normalizeAxis(t.axis,o.length),p=k.sizeToDimension(o,d),m=k.sizeFromDimension(o,d),u=k.size(i.dims),h=a?k.size(a.dims):0;if(u!==m||a&&h!==m)throw new Error(`Size of X.shape()[axis:] == ${m}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${u} and bias size of ${h}`);let w=[];for(let C=0;C<o.length;++C)C<d?w.push(o[C]):w.push(1);let y=we(m),g=["type","type"],x=[{type:12,data:p},{type:1,data:m},{type:12,data:Math.floor(m/y)},{type:1,data:t.epsilon}];a&&g.push("type");let $=r>1,v=r>2,S=C=>{let A=me(e[0].dataType),P=[E("x",e[0].dataType,e[0].dims,y),E("scale",i.dataType,i.dims,y)];a&&P.push(E("bias",a.dataType,a.dims,y)),P.push(M("output",e[0].dataType,l,y)),$&&P.push(M("mean_data_output",1,w)),v&&P.push(M("inv_std_output",1,w));let O=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${C.registerUniforms(O).declareVariables(...P)}
  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${mo("f32",y)};
    var mean_square_vector = ${mo("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${At(A,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${je("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${je("mean_square_vector",y)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${At(A,y,"x[j + offset]")};
      let f32scale = ${At(A,y,"scale[j]")};
      output[j + offset] = ${P[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${a?`+ ${At(A,y,"bias[j]")}`:""}
      );
    }

    ${$?"mean_data_output[global_idx] = mean":""};
    ${v?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},T=[{dims:l,dataType:e[0].dataType}];return $&&T.push({dims:w,dataType:1}),v&&T.push({dims:w,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${r};${n}`,inputDependencies:g},getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:S}},Fl=(e,t)=>{ih(e.inputs),e.compute(ah(e.inputs,t,e.outputCount))}});var sh,Kl,jl=R(()=>{"use strict";oe();an();ir();sh=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kl=e=>{sh(e.inputs);let t=et.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(on(e.inputs,{activation:""},t));else{let o=t[t.length-2],i=k.size(e.inputs[0].dims.slice(0,-2)),a=k.size(e.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&a===1){let l=e.inputs[0].reshape([1,i,n]),d=e.inputs[1].reshape([1,n,r]),p=[1,i,r],m=[l,d];e.compute(or(m,{activation:""},t,p),{inputs:m})}else e.compute(or(e.inputs,{activation:""},t))}}});var uh,lh,dh,Yl,Zl,Xl=R(()=>{"use strict";te();oe();Ce();ae();uh=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((t.k+t.blockSize-1)/t.blockSize),i=t.blockSize/8*t.bits,a=e[1];if(!k.areEqual(a.dims,[t.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let d=e[2].dims;if(k.size(d)!==t.n*o)throw new Error("scales input size error.");if(e.length===4){let m=e[3].dims,u=t.bits>4?t.n*o:t.n*Math.floor((o+1)/2);if(k.size(m)!==u)throw new Error("zeroPoints input size error.")}},lh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=we(t.k),w=we(m),y=we(a),g=l.concat([o,a]),x=o>1&&a/y%2===0?2:1,$=k.size(g)/y/x,v=64,S=[],T=[d,o,i/h],C=k.convertShape(e[1].dims).slice();C.splice(-1,1,m/w),S.push(...N(T)),S.push(...N(C)),S.push(...N(e[2].dims)),e.length===4&&S.push(...N(k.convertShape(e[3].dims)));let A=[d,o,a/y];S.push(...N(A));let P=O=>{let U=T.length,L=E("a",e[0].dataType,U,h),K=E("b",12,C.length,w),j=E("scales",e[2].dataType,e[2].dims.length),W=[L,K,j],ee=e.length===4?E("zero_points",12,e[3].dims.length):void 0;ee&&W.push(ee);let ue=A.length,Z=M("output",e[0].dataType,ue,y),J=me(e[0].dataType),Q=(()=>{switch(h){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ne=()=>{let $e=`
          // reuse a data
            var input_offset = ${L.indicesToOffset(`${L.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Q};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${L.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let de=0;de<y*x;de++)$e+=`
            b_value = ${w===1?`b${de}_data`:`b${de}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Q}(${Array.from({length:4},(V,q)=>`${J}(b_value_lower[${q}]), ${J}(b_value_upper[${q}])`).join(", ")});
            b_dequantized_values = ${(()=>h===1?`${Q}(${Array.from({length:8},(V,q)=>`(b_quantized_values[${q}] - ${ee?`zero_point${de}`:"zero_point"}) * scale${de}`).join(", ")});`:`(b_quantized_values - ${Q}(${Array(8).fill(`${ee?`zero_point${de}`:"zero_point"}`).join(",")})) * scale${de};`)()};
            workgroup_shared[local_id.x * ${x} + ${Math.floor(de/y)}]${y>1?`[${de%y}]`:""} += ${Array.from({length:8/h},(V,q)=>`${h===1?`a_data[${q}] * b_dequantized_values[${q}]`:`dot(a_data[${q}], b_dequantized_values[${q}])`}`).join(" + ")};
          `;return $e},_e=()=>{let $e=`
            var col_index = col * ${y};
            ${ee?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let de=0;de<y*x;de++)$e+=`
            let scale${de} = ${j.getByOffset("col_index * nBlocksPerCol + block")};
            ${ee?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${ee.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${de} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return $e},Ae=()=>{let $e=`col_index = col * ${y};`;for(let de=0;de<y*x;de++)$e+=`
            let b${de}_data = ${K.getByIndices(`${K.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return $e+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Q};
            var b_dequantized_values: ${Q};`,$e};return`
        var<workgroup> workgroup_shared: array<${Z.type.value}, ${x*v}>;
        ${O.declareVariables(...W,Z)}
        ${O.mainStart([v,1,1])}
          let output_indices = ${Z.offsetToIndices(`(global_idx / ${v}) * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${_e()}
            for (var word: u32 = 0; word < ${m}; word += ${w}) {
              ${Ae()}
              for (var i: u32 = 0; i < ${w}; i++) {
                ${ne()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${x}) {
            var output_value: ${Z.type.value} = ${Z.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${x};
            }
            ${Z.setByIndices(`${Z.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${w};${y};${x};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:u}],dispatchGroup:{x:$},programUniforms:S}),getShaderSource:P}},dh=(e,t)=>{let r=e[0].dims,n=r.length,o=r[n-2],i=t.k,a=t.n,l=r.slice(0,n-2),d=k.size(l),m=e[1].dims[2]/4,u=e[0].dataType,h=we(t.k),w=we(m),y=l.concat([o,a]),g=128,x=a%8===0?8:a%4===0?4:1,$=g/x,v=$*w*8,S=v/h,T=v/t.blockSize,C=k.size(y)/x,A=[],P=[d,o,i/h],O=k.convertShape(e[1].dims).slice();O.splice(-1,1,m/w),A.push(...N(P)),A.push(...N(O)),A.push(...N(e[2].dims)),e.length===4&&A.push(...N(k.convertShape(e[3].dims)));let U=[d,o,a];A.push(...N(U));let L=K=>{let j=P.length,W=E("a",e[0].dataType,j,h),ee=E("b",12,O.length,w),ue=E("scales",e[2].dataType,e[2].dims.length),Z=[W,ee,ue],J=e.length===4?E("zero_points",12,e[3].dims.length):void 0;J&&Z.push(J);let Q=U.length,ne=M("output",e[0].dataType,Q),_e=me(e[0].dataType),Ae=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${W.type.value}, ${S}>;
        var<workgroup> inter_results: array<array<${ne.type.value}, ${$}>, ${x}>;
        ${K.declareVariables(...Z,ne)}
        ${K.mainStart([$,x,1])}
          let output_indices = ${ne.offsetToIndices(`workgroup_index * ${x}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${T} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${S};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${S}; a_offset += ${g})
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
            ${J?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${_e}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${_e}(8);`}
            let scale = ${ue.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${ee.getByIndices(`${ee.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${w}; i++) {
              ${Ae()}
              let b_value = ${w===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${_e}>(${Array.from({length:4},($e,de)=>`${_e}(b_value_lower[${de}]), ${_e}(b_value_upper[${de}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${_e}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},($e,de)=>`${`dot(a_data${de}, b_dequantized_values[${de}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${x}) {
            var output_value: ${ne.type.value} = ${ne.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ne.setByIndices(`${ne.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${w};${$};${x}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:u}],dispatchGroup:{x:C},programUniforms:A}),getShaderSource:L}},Yl=(e,t)=>{uh(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(dh(e.inputs,t)):e.compute(lh(e.inputs,t))},Zl=e=>re(e)});var ch,ph,mh,fh,hh,gh,bh,yh,Ql,Jl=R(()=>{"use strict";te();oe();ae();ch=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},ph=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
      `},mh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},fh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},hh=(e,t,r)=>{let n="";for(let o=t-1;o>=0;--o)n+=`
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
          `},gh=(e,t,r)=>{switch(r.mode){case 0:return ph(e,t,r.pads.length);case 1:return mh(e,t,r.pads.length);case 2:return fh(e,t,r.pads.length);case 3:return hh(e,t,r.pads.length);default:throw new Error("Invalid mode")}},bh=(e,t)=>{let r=k.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,o=k.size(r),i=[{type:12,data:o},{type:6,data:t.pads}],a=e.length>=3&&e[2].data;t.mode===0&&i.push({type:a?e[2].dataType:1,data:t.value}),i.push(...N(e[0].dims,r));let l=["rank"],d=p=>{let m=M("output",e[0].dataType,r.length),u=E("x",e[0].dataType,n.length),h=u.type.value,w=gh(m,n.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:a?h:"f32"}),`
            ${p.registerUniforms(y).declareVariables(u,m)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${m.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${w}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${a}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(r)/64)},programUniforms:i}),getShaderSource:d}},yh=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,o=e[0].dims.length,i=new Int32Array(2*o).fill(0);if(e.length>=4){let l=e[3].getBigInt64Array();for(let d=0;d<l.length;d++)i[Number(l[d])]=Number(r[d]),i[Number(l[d])+o]=Number(r[d+l.length])}else r.forEach((l,d)=>i[Number(d)]=Number(l));let a=[];return i.forEach(l=>a.push(l)),{mode:t.mode,value:n,pads:a}}else return t},Ql=(e,t)=>{ch(e.inputs);let r=yh(e.inputs,t);e.compute(bh(e.inputs,r),{inputs:[0]})}});var ln,ed,td,rd,nd,wh,_h,od,id,ad,sd,ud,ld,dd,cd,pd,md,fd,hd,gd=R(()=>{"use strict";He();te();oe();ae();ln=e=>{if(be.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ed=(e,t,r)=>{let n=t.format==="NHWC",o=e.dims.slice();n&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(t,"dilations"),a=t.kernelShape.slice(),l=t.strides.slice(),d=i?t.dilations.slice():[],p=t.pads.slice();It.adjustPoolAttributes(r,o,a,l,d,p);let m=It.computePoolOutputShape(r,o,l,d,a,p,t.autoPad),u=Object.assign({},t);i?Object.assign(u,{kernelShape:a,strides:l,pads:p,dilations:d,cacheKey:t.cacheKey}):Object.assign(u,{kernelShape:a,strides:l,pads:p,cacheKey:t.cacheKey});let h=m.slice();return h.push(h.splice(1,1)[0]),[u,n?h:m]},td=(e,t)=>{let r=t.format==="NHWC",n=k.size(e),o=k.size(t.kernelShape),i=[{type:12,data:n},{type:12,data:o}],a=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let l=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],m=t.pads[t.pads.length-1],u=!!(p+m);i.push({type:12,data:l},{type:12,data:d},{type:12,data:p},{type:12,data:m}),a.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let w=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],g=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];h=!!(g+x),i.push({type:12,data:w},{type:12,data:y},{type:12,data:g},{type:12,data:x}),a.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,a,!0,u,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let l=k.computeStrides(t.kernelShape);i.push({type:12,data:l},{type:12,data:t.pads},{type:12,data:t.strides}),a.push({name:"kernelStrides",type:"u32",length:l.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((p,m)=>p+m);return[i,a,!!d,!1,!1]}},rd=(e,t,r,n,o,i,a,l,d,p,m,u)=>{let h=o.format==="NHWC",w=t.type.value,y=M("output",t.type.tensor,n);if(o.kernelShape.length<=2){let g="",x="",$="",v=r-(h?2:1);if(m?g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${v}] < 0 || xIndices[${v}]
                      >= uniforms.x_shape[${v}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`:g=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${v}] = indices[${v}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let T=r-(h?3:2);u?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${T}] = indices[${T}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${T}] < 0 || xIndices[${T}] >= uniforms.x_shape[${T}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
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
              ${x}
              ${g}
              ${$}
              ${a}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let g=o.kernelShape.length,x=o.pads.length,$="";return p?$=`
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

              var offsets: array<u32, ${g}>;

              var value = ${w}(${l});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${g-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",g)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",g)};
                }
                offsets[${g-1}] = offset;

                isPad = false;
                for (var j = ${r-g}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${r-g}u`,g)}
                    + offsets[j - ${r-g}u] - ${F("uniforms.pads","j - 2u",x)};
                  ${$}
              }
              ${a}

              output[global_idx] = value;
            }`}},nd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,wh=e=>`${nd(e)};${e.countIncludePad}`,_h=e=>`${nd(e)};${e.storageOrder};${e.dilations}`,od=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),id=(e,t,r,n)=>{let[o,i]=ed(t,n,r),a=E("x",t.dataType,t.dims.length),l=a.type.value,d="value += x_val;",p="";o.countIncludePad?p+=`value /= ${l}(uniforms.kernelSize);`:p+=`value /= ${l}(i32(uniforms.kernelSize) - pad);`;let[m,u,h,w,y]=td(i,o);m.push(...N(t.dims,i));let g=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${y}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:x=>rd(x,a,t.dims.length,i.length,o,d,p,0,u,h,w,y)}},ad=e=>{let t=e.count_include_pad!==0,r=od(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:wh(n)}},sd=(e,t)=>{ln(e.inputs),e.compute(id("AveragePool",e.inputs[0],!1,t))},ud={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ld=e=>{let t=e.format;return{format:t,...ud,cacheKey:t}},dd=(e,t)=>{ln(e.inputs),e.compute(id("GlobalAveragePool",e.inputs[0],!0,t))},cd=(e,t,r,n)=>{let[o,i]=ed(t,n,r),a=`
      value = max(x_val, value);
    `,l="",d=E("x",t.dataType,t.dims.length),p=["rank"],[m,u,h,w,y]=td(i,o);return m.push(...N(t.dims,i)),{name:e,shaderCache:{hint:`${n.cacheKey};${h};${w};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:i,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(k.size(i)/64)},programUniforms:m}),getShaderSource:g=>rd(g,d,t.dims.length,i.length,o,a,l,t.dataType===10?-65504:-1e5,u,h,w,y)}},pd=(e,t)=>{ln(e.inputs),e.compute(cd("MaxPool",e.inputs[0],!1,t))},md=e=>{let t=e.storage_order,r=e.dilations,n=od(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:t,dilations:r,...n,cacheKey:""};return{...o,cacheKey:_h(o)}},fd=e=>{let t=e.format;return{format:t,...ud,cacheKey:t}},hd=(e,t)=>{ln(e.inputs),e.compute(cd("GlobalMaxPool",e.inputs[0],!0,t))}});var $h,xh,bd,yd,wd=R(()=>{"use strict";te();oe();Ce();ae();$h=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((o,i)=>i===t.axis||o===e[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},xh=(e,t)=>{let r=k.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,o=n===3,i=e[0].dims,a=e[1].dataType,l=k.size(i),d=n===3||n===2,p=d?[Math.ceil(k.size(e[0].dims)/4)]:e[0].dims,m=e[1].dims,u=e.length>2?e[2]:void 0,h=u?d?[Math.ceil(k.size(u.dims)/4)]:u.dims:void 0,w=m.length===0||m.length===1&&m[0]===1,y=w===!1&&m.length===1,g=we(l),x=w&&(!d||g===4),$=x?g:1,v=x&&!d?g:1,S=E("input",d?12:n,p.length,v),T=E("scale",a,m.length),C=u?E("zero_point",d?12:n,h.length):void 0,A=M("output",a,i.length,$),P=[S,T];C&&P.push(C);let O=[p,m];u&&O.push(h);let U=[{type:12,data:l/$},{type:12,data:r},{type:12,data:t.blockSize},...N(...O,i)],L=K=>{let j=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${K.registerUniforms(j).declareVariables(...P,A)}
      ${K.mainStart()}
          ${K.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${A.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>d?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${$===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`)()};

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
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${C.getByIndices("scale_indices")};`:`let zero_point_value = ${d?o?"i32":"u32":S.type.value}(0);`)()};
      // Compute and write output
      ${A.setByOffset("global_idx",`${A.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:C?["rank","rank","rank"]:["rank","rank"]},getShaderSource:L,getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(l/$/64),y:1,z:1},programUniforms:U})}},bd=(e,t)=>{$h(e.inputs,t),e.compute(xh(e.inputs,t))},yd=e=>re({axis:e.axis,blockSize:e.blockSize})});var Sh,Th,_d,vd=R(()=>{"use strict";He();te();ae();Sh=(e,t,r)=>{let n=e===t,o=e<t&&r<0,i=e>t&&r>0;if(n||o||i)throw new Error("Range these inputs' contents are invalid.")},Th=(e,t,r,n)=>{let o=Math.abs(Math.ceil((t-e)/r)),i=[o],a=o,l=[{type:12,data:a},{type:n,data:e},{type:n,data:r},...N(i)],d=p=>{let m=M("output",n,i.length),u=m.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:u},{name:"delta",type:u}];return`
        ${p.registerUniforms(h).declareVariables(m)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${u}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:n}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:l})}},_d=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),be.webgpu.validateInputContent&&Sh(t,r,n),e.compute(Th(t,r,n,e.inputs[0].dataType),{inputs:[]})}});var Ih,Ch,Ah,kh,Eh,Ph,zh,Oh,Dh,Bh,Mh,$d,Rh,Uh,Nh,Vh,Wh,xd,Sd,Td=R(()=>{"use strict";te();oe();Ce();ae();Ih=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ch=(e,t,r)=>{t.every(o=>o>=0&&o<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((o,i)=>n[o]=e[i]),n},Ah=(e,t,r,n,o,i)=>{let[a,l,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(a>0&&e.length>a&&e[a].dims.length>0)e[a].getFloat32Array().forEach(m=>i.push(m));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0){if(e[l].getFloat32Array().forEach(m=>n.push(m)),n.length!==0&&n.length!==p&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Ih(n,t),t.axes.length>0&&Ch(n,t.axes,p).forEach((m,u)=>n[u]=m)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(m=>o.push(Number(m))),o.length!==0&&o.length!==p&&r>=18&&o.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof o<"u"&&n.length>0&&o.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},kh=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
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
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Eh=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Ph=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),o=e.length===0?n:e.slice();return t.length>0?(t.forEach((i,a)=>{n[i]=o[a],n[a+r]=o[t.length+a]}),n):o},zh=(e,t,r,n)=>{let o=[];if(r.length>0)if(n.length>0){if(e.forEach(i=>o.push(i)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((i,a)=>o[i]=r[a])}else r.forEach(i=>o.push(i));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");o=e.map((i,a)=>Math.round(i*t[a]))}return o},Oh=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(i=>t[i]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(i=>t[i]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let o=e.slice();return r.axes.length>0?(r.axes.forEach(i=>t[i]=n),r.axes.forEach(i=>o[i]=Math.round(e[i]*t[i]))):(t.fill(n,0,t.length),o.forEach((i,a)=>o[a]=Math.round(i*t[a]))),o},Dh=(e,t,r,n,o)=>`
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
    }`,Bh=(e,t,r,n,o,i,a)=>`
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
    }`,Mh=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,$d=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Rh=(e,t,r,n,o)=>{let[a,l,d,p]=r.length===2?[-1,0,1,-1]:[0,2,3,1],m=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${m} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(row, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(col, ${r[d]} - 1))`)};
      ${$d(e,p,a,2)}
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
    }`},Uh=(e,t,r,n,o,i,a,l,d,p)=>{let m=r.length===2,u=!0,[h,w]=m?[0,1]:u?[2,3]:[1,2],y=e.type.value,g=x=>{let $=x===h?"row":"col";return`
      fn ${$}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[x]},
        ${n[x]}, ${r[x]}, ${i[x]}, ${i[x]} + ${r.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${l} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${d};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${$}: ${y} = originalIdx + ${y}(i);
          if (${$} < 0 || ${$} >= ${r[x]}) {
            ${(()=>p?`coefs[i + 1] = 0.0;
                        continue;`:l?`return ${d};`:`${$} = max(0, min(${$}, ${r[x]} - 1));`)()};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${$})`)};
          data[i + 1] = ${x===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${g(h)};
    ${g(w)};
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
    `},Nh=(e,t,r,n,o)=>{let[a,l,d,p,m]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],u=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${u} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",l,`max(0, min(depth, ${r[l]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(height, ${r[d]} - 1))`)};
      ${e.indicesSet("input_indices",p,`max(0, min(width, ${r[p]} - 1))`)};
      ${$d(e,m,a,3)}
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
    }`},Vh=(e,t,r,n,o,i)=>{let a=e.dims,l=Ph(i,t.axes,a.length),d=zh(a,n,o,t.axes),p=n.slice();n.length===0&&(p=a.map((v,S)=>v===0?1:d[S]/v),t.keepAspectRatioPolicy!=="stretch"&&(d=Oh(a,p,t)));let m=M("output",e.dataType,d.length),u=E("input",e.dataType,a.length),h=k.size(d),w=a.length===d.length&&a.every((v,S)=>v===d[S]),y=t.coordinateTransformMode==="tf_crop_and_resize",g=t.extrapolationValue,x=u.type.value,$=v=>`
      ${w?"":`
      ${kh(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Mh(u,a)};
              ${Eh(t.nearestMode,r,x)};
              ${Bh(u,m,a,d,p.length,l.length,y)};
              `;case"linear":return`
              ${Dh(m,a,d,p.length,l.length)};
              ${(()=>{if(a.length===2||a.length===4)return`${Rh(u,m,a,y,g)}`;if(a.length===3||a.length===5)return`${Nh(u,m,a,y,g)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(a.length===2||a.length===4)return`${Uh(u,m,a,d,p,l,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
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
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${p.length>0?p:""}|${o.length>0?o:""}|${l.length>0?l:""}|${w}|${a}`,inputDependencies:["rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:p},{type:1,data:l},...N(a,d)]})}},Wh=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},xd=(e,t)=>{let r=[],n=[],o=[],i=Wh(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Ah(e.inputs,t,i,r,n,o),e.compute(Vh(e.inputs[0],t,i,r,n,o),{inputs:[0]})},Sd=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,o=e.cubicCoeffA,i=e.excludeOutside!==0,a=e.extrapolationValue,l=e.keepAspectRatioPolicy,d=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return re({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:o,excludeOutside:i,extrapolationValue:a,keepAspectRatioPolicy:l,mode:d,nearestMode:p})}});var Lh,Gh,Id,Cd=R(()=>{"use strict";te();oe();Ce();ae();Lh=(e,t)=>{let[r,n,o,i]=e,{numHeads:a,rotaryEmbeddingDim:l}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!k.areEqual(n.dims,[])&&!k.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!k.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(l>0&&a===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],p=r.dims[r.dims.length-2],m=o.dims[0],u=k.sizeFromDimension(r.dims,1)/p,h=l===0?o.dims[1]*2:u/a;if(l>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(p!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(h/2!==o.dims[1]&&l/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(p>m)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Gh=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:o,scale:i}=t,a=e[0].dims[0],l=k.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],p=l/d,m=e[2].dims[1],u=o===0?m*2:p/n,h=new Array(a,d,p/u,u-m),w=k.computeStrides(h),y=[{type:1,data:i},{type:12,data:h},{type:12,data:w},...e[0].dims.length===3?new Array({type:12,data:[l,p,u,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[l,u,d*u,1]}):[],...N(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],g=x=>{let $=E("input",e[0].dataType,e[0].dims.length),v=E("position_ids",e[1].dataType,e[1].dims.length),S=E("cos_cache",e[2].dataType,e[2].dims.length),T=E("sin_cache",e[3].dataType,e[3].dims.length),C=M("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:w.length},{name:"input_output_strides",type:"u32",length:w.length}]),`
        ${x.declareVariables($,v,S,T,C)}

        ${x.mainStart(Ct)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${v.broadcastedIndicesToOffset("bsnh.xy",M("",v.type.tensor,2))};
            let position_id =
                u32(${v.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${$.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${$.getByOffset("j")} * ${T.get("position_id","bsnh[3]")};
            ${C.setByOffset("i","re")}
            let im = ${$.getByOffset("i")} * ${T.get("position_id","bsnh[3]")} +
                ${$.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${C.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${C.setByOffset("k",$.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:re({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(k.size(h)/Ct)},programUniforms:y})}},Id=(e,t)=>{Lh(e.inputs,t),e.compute(Gh(e.inputs,t))}});var Hh,Fh,Ad,kd=R(()=>{"use strict";te();oe();ae();Hh=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=t.dims[t.dims.length-1],i=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let a=e[3];if(a.dims.length!==1)throw new Error("Beta must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let a=e[4];if(a.dims.length!==1)throw new Error("Bias must be 1D");if(a.dims[a.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},Fh=(e,t,r,n)=>{let o=t.simplified,i=e[0].dims,a=k.size(i),l=i,d=a,p=i.slice(-1)[0],m=n?i.slice(0,-1).concat(1):[],u=!o&&e.length>3,h=e.length>4,w=n&&r>1,y=n&&r>2,g=r>3,x=64,$=we(p),v=[{type:12,data:d},{type:12,data:$},{type:12,data:p},{type:1,data:t.epsilon}],S=C=>{let A=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],P=[E("x",e[0].dataType,e[0].dims,$),E("skip",e[1].dataType,e[1].dims,$),E("gamma",e[2].dataType,e[2].dims,$)];u&&P.push(E("beta",e[3].dataType,e[3].dims,$)),h&&P.push(E("bias",e[4].dataType,e[4].dims,$)),P.push(M("output",e[0].dataType,l,$)),w&&P.push(M("mean_output",1,m)),y&&P.push(M("inv_std_output",1,m)),g&&P.push(M("input_skip_bias_sum",e[0].dataType,l,$));let O=me(e[0].dataType),U=me(1,$);return`

      ${C.registerUniforms(A).declareVariables(...P)}
      var<workgroup> sum_shared : array<${U}, ${x}>;
      var<workgroup> sum_squared_shared : array<${U}, ${x}>;

      ${C.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":O+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${At(O,$,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
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
        let mean = ${je("sum",$)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${je("square_sum",$)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${w?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${O}(mean)`}) *
            ${O}(inv_std_dev) * gamma[offset1d + i]
            ${u?"+ beta[offset1d + i]":""};
        }
      }`},T=[{dims:l,dataType:e[0].dataType}];return r>1&&T.push({dims:m,dataType:1}),r>2&&T.push({dims:m,dataType:1}),r>3&&T.push({dims:i,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${$};${w};${y};${g}`,inputDependencies:e.map((C,A)=>"type")},getShaderSource:S,getRunData:()=>({outputs:T,dispatchGroup:{x:Math.ceil(d/p)},programUniforms:v})}},Ad=(e,t)=>{Hh(e.inputs);let n=[0];e.outputCount>1&&n.push(-3),e.outputCount>2&&n.push(-3),e.outputCount>3&&n.push(3),e.compute(Fh(e.inputs,t,e.outputCount,!1),{outputs:n})}});var qh,dn,Kh,Ed,jh,Yh,Pd,zd,Od=R(()=>{"use strict";te();oe();Ce();ae();qh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},dn=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Kh=(e,t)=>{if(e.length>1){let r=dn(e,1),n=dn(e,2),o=dn(e,3);return o.length===0&&(o=[...Array(e[0].dims.length).keys()]),re({starts:r,ends:n,axes:o})}else return t},Ed=(e,t,r,n,o)=>{let i=e;return e<0&&(i+=r[n[t]]),o[t]<0?Math.max(0,Math.min(i,r[n[t]]-1)):Math.max(0,Math.min(i,r[n[t]]))},jh=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
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
      }`,Yh=(e,t)=>{let r=e[0].dims,n=k.size(r),o=t.axes.length>0?k.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],i=dn(e,4);i.forEach($=>$!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let a=t.starts.map(($,v)=>Ed($,v,r,o,i)),l=t.ends.map(($,v)=>Ed($,v,r,o,i));if(o.length!==a.length||o.length!==l.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==r.length)for(let $=0;$<r.length;++$)o.includes($)||(a.splice($,0,0),l.splice($,0,r[$]),i.splice($,0,1));let d=i.map($=>Math.sign($));i.forEach(($,v,S)=>{if($<0){let T=(l[v]-a[v])/$,C=a[v],A=C+T*i[v];a[v]=A,l[v]=C,S[v]=-$}});let p=r.slice(0);o.forEach(($,v)=>{p[$]=Math.ceil((l[$]-a[$])/i[$])});let m={dims:p,dataType:e[0].dataType},u=M("output",e[0].dataType,p.length),h=E("input",e[0].dataType,e[0].dims.length),w=k.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:a.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:i.length}],g=[{type:12,data:w},{type:12,data:a},{type:6,data:d},{type:12,data:i},...N(e[0].dims,p)],x=$=>`
      ${$.registerUniforms(y).declareVariables(h,u)}
        ${jh(h,u,r)}
        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${u.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${u.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${a.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[m],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},Pd=(e,t)=>{qh(e.inputs,t);let r=Kh(e.inputs,t);e.compute(Yh(e.inputs,r),{inputs:[0]})},zd=e=>{let t=e.starts,r=e.ends,n=e.axes;return re({starts:t,ends:r,axes:n})}});var Zh,Xh,Dd,Bd,Md=R(()=>{"use strict";te();oe();Ce();ut();ae();Zh=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Xh=(e,t)=>{let r=e.inputs[0],n=r.dims,o=k.size(n),i=n.length,a=k.normalizeAxis(t.axis,i),l=a<n.length-1,d,p=[];l?(p=Array.from({length:i},(P,O)=>O),p[a]=i-1,p[i-1]=a,d=e.compute(Pe(r,p),{inputs:[r],outputs:[-1]})[0]):d=r;let m=d.dims,u=m[i-1],h=o/u,w=we(u),y=u/w,g=64;h===1&&(g=256);let x=(P,O)=>O===4?`max(max(${P}.x, ${P}.y), max(${P}.z, ${P}.w))`:O===2?`max(${P}.x, ${P}.y)`:O===3?`max(max(${P}.x, ${P}.y), ${P}.z)`:P,$=E("x",d.dataType,d.dims,w),v=M("result",d.dataType,d.dims,w),S=$.type.value,T=me(d.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,C=P=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${g}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${P.registerUniform("packedCols","i32").declareVariables($,v)}
      ${P.mainStart(g)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${g};
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
          rowMaxShared = ${S}(${x("threadShared[0]",w)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
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
          rowSumShared = ${S}(${je("threadShared[0]",w)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,A=e.compute({name:"Softmax",shaderCache:{hint:`${w};${g}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:m,dataType:d.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:y}]}),getShaderSource:C},{inputs:[d],outputs:[l?-1:0]})[0];l&&e.compute(Pe(A,p),{inputs:[A]})},Dd=(e,t)=>{Zh(e.inputs),Xh(e,t)},Bd=e=>re({axis:e.axis})});var Rd,Qh,Jh,eg,Ud,Nd=R(()=>{"use strict";te();oe();ae();Rd=e=>Array.from(e.getBigInt64Array(),Number),Qh=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Rd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Jh=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},eg=(e,t)=>{let r=e[0].dims,n=t??Rd(e[1]),o=Jh(r,n),i=k.size(o),a=e[0].dataType,l=E("input",a,r.length),d=M("output",a,o.length),p=m=>`
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
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...N(e[0].dims,o)]}),getShaderSource:p}},Ud=e=>{Qh(e.inputs),e.compute(eg(e.inputs),{inputs:[0]})}});var tg,rg,Vd,Wd=R(()=>{"use strict";te();oe();ae();tg=(e,t,r,n,o)=>{let i=M("output_data",o,r.length,4),a=E("a_data",t[1].dataType,t[1].dims.length,4),l=E("b_data",t[2].dataType,t[2].dims.length,4),d=E("c_data",t[0].dataType,t[0].dims.length,4),p,m=(u,h,w)=>`select(${h}, ${u}, ${w})`;if(!n)p=i.setByOffset("global_idx",m(a.getByOffset("global_idx"),l.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let u=(h,w,y="")=>{let g=`a_data[index_a${w}][component_a${w}]`,x=`b_data[index_b${w}][component_b${w}]`,$=`bool(c_data[index_c${w}] & (0xffu << (component_c${w} * 8)))`;return`
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
            ${h}[${w}] = ${y}(${m(g,x,$)});
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
      }`},rg=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,o=e[1].dataType,i=!(k.areEqual(t,r)&&k.areEqual(r,n)),a=t,l=k.size(t);if(i){let p=et.calcShape(et.calcShape(t,r,!1),n,!1);if(!p)throw new Error("Can't perform where op on the given tensors");a=p,l=k.size(a)}let d=Math.ceil(l/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>tg(p,e,a,i,o),getRunData:()=>({outputs:[{dims:a,dataType:o}],dispatchGroup:{x:Math.ceil(l/64/4)},programUniforms:[{type:12,data:d},...N(n,t,r,a)]})}},Vd=e=>{e.compute(rg(e.inputs))}});var Ld,Gd=R(()=>{"use strict";zs();Qr();Bs();Rs();$u();Ou();Mu();Yu();rl();il();ul();ml();gl();yl();vl();Sl();Cl();El();Ol();Wl();Hl();ql();jl();Xl();ko();Jl();gd();wd();vd();Zr();Td();Cd();kd();Od();Md();Po();Nd();ut();en();Wd();Ld=new Map([["Abs",[Us]],["Acos",[Ns]],["Acosh",[Vs]],["Add",[xu]],["ArgMax",[Ps,go]],["ArgMin",[Es,go]],["Asin",[Ws]],["Asinh",[Ls]],["Atan",[Gs]],["Atanh",[Hs]],["Attention",[Os]],["AveragePool",[sd,ad]],["BatchNormalization",[Ds]],["BiasAdd",[Ms]],["BiasSplitGelu",[vu]],["Cast",[qs,Fs]],["Ceil",[js]],["Clip",[Ks]],["Concat",[Du,Bu]],["Conv",[So,xo]],["ConvTranspose",[tl,el]],["Cos",[Ys]],["Cosh",[Zs]],["CumSum",[nl,ol]],["DepthToSpace",[al,sl]],["DequantizeLinear",[bd,yd]],["Div",[Su]],["Einsum",[cl,pl]],["Elu",[Xs,Jt]],["Equal",[Tu]],["Erf",[Qs]],["Exp",[Js]],["Expand",[hl]],["FastGelu",[bl]],["Floor",[eu]],["FusedConv",[So,xo]],["Gather",[_l,wl]],["GatherElements",[Il,Tl]],["GatherBlockQuantized",[$l,xl]],["Gelu",[tu]],["Gemm",[kl,Al]],["GlobalAveragePool",[dd,ld]],["GlobalMaxPool",[hd,fd]],["Greater",[ku]],["GreaterOrEqual",[Pu]],["GridSample",[Pl,zl]],["GroupQueryAttention",[Vl]],["HardSigmoid",[lu,uu]],["InstanceNormalization",[Gl]],["LayerNormalization",[Fl]],["LeakyRelu",[ru,Jt]],["Less",[Eu]],["LessOrEqual",[zu]],["Log",[yu]],["MatMul",[Kl]],["MatMulNBits",[Yl,Zl]],["MaxPool",[pd,md]],["Mul",[Iu]],["MultiHeadAttention",[Ml,Bl]],["Neg",[ou]],["Not",[nu]],["Pad",[Ql]],["Pow",[Cu]],["QuickGelu",[wu,Jt]],["Range",[_d]],["Reciprocal",[iu]],["ReduceMin",[Ss]],["ReduceMean",[ws]],["ReduceMax",[xs]],["ReduceSum",[Is]],["ReduceProd",[Ts]],["ReduceL1",[_s]],["ReduceL2",[vs]],["ReduceLogSum",[As]],["ReduceLogSumExp",[$s]],["ReduceSumSquare",[Cs]],["Relu",[au]],["Resize",[xd,Sd]],["RotaryEmbedding",[Id]],["Sigmoid",[su]],["Sin",[du]],["Sinh",[cu]],["Slice",[Pd,zd]],["SkipLayerNormalization",[Ad]],["Split",[Rl,Ul]],["Sqrt",[pu]],["Softmax",[Dd,Bd]],["Sub",[Au]],["Tan",[mu]],["Tanh",[hu]],["ThresholdedRelu",[bu,Jt]],["Tile",[Ud]],["Transpose",[as,ss]],["Where",[Vd]]])});var cn,Hd=R(()=>{"use strict";He();Ke();ae();cn=class{constructor(t){this.backend=t;this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,n,o,i){Ne(t.programInfo.name);let a=this.backend.device,l=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let d=[];for(let m of r)d.push({binding:d.length,resource:{buffer:m.buffer}});for(let m of n)d.push({binding:d.length,resource:{buffer:m.buffer}});i&&d.push({binding:d.length,resource:i});let p=a.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:d,label:t.programInfo.name});if(this.backend.sessionStatus==="capturing"){let m={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:p,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(m)}l.setPipeline(t.computePipeline),l.setBindGroup(0,p),l.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Be(t.programInfo.name)}dispose(){}build(t,r){Ne(t.name);let n=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(u=>{n.features.has(u.feature)&&o.push(`enable ${u.extension};`)});let a=os(r,this.backend.device.limits),l=t.getShaderSource(a),d=`${o.join(`
`)}
${a.additionalImplementations}
${l}`,p=n.createShaderModule({code:d,label:t.name});se("verbose",()=>`[WebGPU] ${t.name} shader code: ${d}`);let m=n.createComputePipeline({compute:{module:p,entryPoint:"main"},layout:"auto",label:t.name});return Be(t.name),{programInfo:t,computePipeline:m,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(t){let r=typeof t=="number"?t:t.x,n=typeof t=="number"?1:t.y||1,o=typeof t=="number"?1:t.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=i&&n<=i&&o<=i)return[r,n,o];let a=r*n*o,l=Math.ceil(Math.sqrt(a));if(l>i){if(l=Math.ceil(Math.cbrt(a)),l>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[l,l,l]}else return[l,l,1]}}});var ng,og,zo,Oo,pn,Fd=R(()=>{"use strict";He();te();Ke();no();ts();Gd();Hd();ng=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let o=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${o}`);break}case"rank":{let i=e[n].dims.length;r.push(`${o};${i}`);break}case"dims":{let i=e[n].dims.join(",");r.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},og=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${ng(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},zo=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},Oo=class{constructor(t){this.subgroupsSupported=t.features.has("subgroups"),this.subgroupsF16Supported=t.features.has("subgroups");let r=t.limits;!this.subgroupsSupported||!r.minSubgroupSize||!r.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[r.minSubgroupSize,r.maxSubgroupSize]}},pn=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let n=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:n},i=a=>r.features.has(a)&&n.push(a)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await r.requestDevice(o),this.deviceInfo=new Oo(this.device),this.adapterInfo=new zo(r.info||await r.requestAdapterInfo()),this.gpuDataManager=es(this),this.programManager=new cn(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Fr(t.logLevel,!!t.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};this.queryType==="at-passes"&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Ne(),this.endComputePass();let t;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),t=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),n=this.pendingQueries.get(t);for(let o=0;o<r.length/2;o++){let i=n[o],a=i.kernelId,l=this.kernels.get(a),d=l.kernelType,p=l.kernelName,m=i.programName,u=i.inputTensorViews,h=i.outputTensorViews,w=r[o*2],y=r[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=w);let g=Number(w-this.queryTimeBase),x=Number(y-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger(x))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:u.map($=>({dims:$.dims,dataType:bt($.dataType)})),outputsMetadata:h.map($=>({dims:$.dims,dataType:bt($.dataType)})),kernelId:a,kernelType:d,kernelName:p,programName:m,startTime:g,endTime:x});else{let $="";u.forEach((S,T)=>{$+=`input[${T}]: [${S.dims}] | ${bt(S.dataType)}, `});let v="";h.forEach((S,T)=>{v+=`output[${T}]: [${S.dims}] | ${bt(S.dataType)}, `}),console.log(`[profiling] kernel "${a}|${d}|${p}|${m}" ${$}${v}execution time: ${x-g} ns`)}Ar("GPU",`${m}::${w}::${y}`)}t.unmap(),this.pendingQueries.delete(t)}),Be()}run(t,r,n,o,i,a){Ne(t.name);let l=[];for(let S=0;S<r.length;++S){let T=r[S].data;if(T===0)continue;let C=this.gpuDataManager.get(T);if(!C)throw new Error(`no GPU data for input: ${T}`);l.push(C)}let{outputs:d,dispatchGroup:p,programUniforms:m}=t.getRunData(r),u=n.length===0?d.map((S,T)=>T):n;if(u.length!==d.length)throw new Error(`Output size ${u.length} must be equal to ${d.length}.`);let h=[],w=[];for(let S=0;S<d.length;++S){if(!Number.isInteger(u[S])||u[S]<-3||u[S]>=a)throw new Error(`Invalid output index: ${u[S]}`);if(u[S]===-3)continue;let T=u[S]===-1,C=u[S]===-2,A=T||C?i(d[S].dataType,d[S].dims):o(u[S],d[S].dataType,d[S].dims);if(h.push(A),A.data===0)continue;let P=this.gpuDataManager.get(A.data);if(!P)throw new Error(`no GPU data for output: ${A.data}`);if(T&&this.temporaryData.push(P),C){let O=this.kernelPersistentData.get(this.currentKernelId);O||(O=[],this.kernelPersistentData.set(this.currentKernelId,O)),O.push(P)}w.push(P)}if(l.length!==r.length||w.length!==h.length){if(w.length===0)return Be(t.name),h;throw new Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let y;if(m){let S=0,T=[];m.forEach(O=>{let U=typeof O.data=="number"?[O.data]:O.data;if(U.length===0)return;let L=O.type===10?2:4,K,j;O.type===10?(j=U.length>4?16:U.length>2?8:U.length*L,K=U.length>4?16:L*U.length):(j=U.length<=2?U.length*L:16,K=16),S=Math.ceil(S/j)*j,T.push(S);let W=O.type===10?8:4;S+=U.length>4?Math.ceil(U.length/W)*K:U.length*L});let C=16;S=Math.ceil(S/C)*C;let A=new ArrayBuffer(S);m.forEach((O,U)=>{let L=T[U],K=typeof O.data=="number"?[O.data]:O.data;if(O.type===6)new Int32Array(A,L,K.length).set(K);else if(O.type===12)new Uint32Array(A,L,K.length).set(K);else if(O.type===10)new Uint16Array(A,L,K.length).set(K);else if(O.type===1)new Float32Array(A,L,K.length).set(K);else throw new Error(`Unsupported uniform type: ${bt(O.type)}`)});let P=this.gpuDataManager.create(S,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(P.buffer,0,A,0,S),this.gpuDataManager.release(P.id),y={offset:0,size:S,buffer:P.buffer}}let g=this.programManager.normalizeDispatchGroupSize(p),x=g[1]===1&&g[2]===1,$=og(t,r,x),v=this.programManager.getArtifact($);if(v||(v=this.programManager.build(t,g),this.programManager.setArtifact($,v),se("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&v.uniformVariablesInfo){if(m.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${m.length} in program "${v.programInfo.name}".`);for(let S=0;S<m.length;S++){let T=m[S],C=T.type,A=typeof T.data=="number"?1:T.data.length,[P,O]=v.uniformVariablesInfo[S];if(C!==P||A!==O)throw new Error(`Uniform variable ${S} mismatch: expect type ${P} with size ${O}, got type ${C} with size ${A} in program "${v.programInfo.name}".`)}}if(se("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let S={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:r,outputTensorViews:h};this.pendingKernels.push(S),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(S)}return this.programManager.run(v,l,w,g,y),Be(t.name),h}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,n,o){let i=Ld.get(t);if(!i)throw new Error(`kernel not implemented: ${t}`);let a={kernelType:t,kernelName:o,kernelEntry:i[0],attributes:[i[1],n]};this.kernels.set(r,a)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let n of r)this.gpuDataManager.release(n.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,n){let o=this.kernels.get(t);if(!o)throw new Error(`kernel not created: ${t}`);let i=o.kernelType,a=o.kernelName,l=o.kernelEntry,d=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${a}" is not allowed to be called recursively`);this.currentKernelId=t,d[0]&&(d[1]=d[0](d[1]),d[0]=void 0),se("info",()=>`[WebGPU] Start to run kernel "[${i}] ${a}"...`);let p=this.env.debug;this.temporaryData=[];try{return p&&this.device.pushErrorScope("validation"),l(r,d[1]),0}catch(m){return n.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${a}" failed. ${m}`)),1}finally{p&&n.push(this.device.popErrorScope().then(m=>m?`GPU validation error for kernel "[${i}] ${a}": ${m.message}`:null));for(let m of this.temporaryData)this.gpuDataManager.release(m.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,n,o){let i=this.sessionExternalDataMapping.get(t);i||(i=new Map,this.sessionExternalDataMapping.set(t,i));let a=i.get(r),l=this.gpuDataManager.registerExternalBuffer(n,o,a);return i.set(r,[l,n]),l}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(n=>this.gpuDataManager.unregisterExternalBuffer(n[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw new Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,n){return async()=>{let o=await so(this,t,r);return qr(o.buffer,n)}}writeTimestamp(t){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){se("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){se("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){se("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),n=t.length;this.pendingKernels=[];for(let o=0;o<n;o++){let i=this.getComputePassEncoder(),a=t[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(a.computePipeline),i.setBindGroup(0,a.bindGroup),i.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(r[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}});var ig,qd,ag,Kd,mn,fn,Do,jd,Yd=R(()=>{"use strict";Ke();ig=1,qd=()=>ig++,ag=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Kd=(e,t)=>{let r=ag.get(e);if(!r)throw new Error("Unsupported data type.");return Math.ceil(t.reduce((n,o)=>n*o)*r/8)},mn=class{constructor(t){this.sessionId=t.sessionId,this.mlContext=t.context,this.mlTensor=t.tensor,this.dataType=t.dataType,this.tensorShape=t.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Kd(this.dataType,this.tensorShape)}destroy(){se("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(t,r){return this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,o)=>n===r[o])}},fn=class{constructor(t,r){this.tensorManager=t;this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,n){if(this.wrapper){if(this.wrapper.sameTypeAndShape(t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Kd(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,o,!0,!0),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){if(this.wrapper)if(t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else se("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(t){if(this.activeUpload)if(t){t instanceof ArrayBuffer?new Uint8Array(t).set(this.activeUpload):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},Do=class{constructor(t){this.backend=t;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let t=qd();return this.tensorTrackersById.set(t,new fn(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,n,o){se("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(t);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(r,n,o)}upload(t,r){let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");n.upload(r)}async download(t,r){se("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,n,o){let i=qd(),a=new mn({sessionId:this.backend.currentSessionId,context:t,tensor:r,dataType:n,shape:o});return this.tensorTrackersById.set(i,new fn(this,a)),this.externalTensors.add(a),i}async getCachedTensor(t,r,n,o,i){let a=this.backend.currentSessionId;for(let[p,m]of this.freeTensors.entries())if(m.sameTypeAndShape(t,r)){se("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let u=this.freeTensors.splice(p,1)[0];return u.sessionId=a,u}let l=this.backend.currentContext;se("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let d=await l.createTensor({dataType:t,shape:r,dimensions:r,usage:n,writable:o,readable:i});return new mn({sessionId:a,context:l,tensor:d,dataType:t,shape:r})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},jd=(...e)=>new Do(...e)});var Zd,sg,hn,Xd=R(()=>{"use strict";te();gt();no();Yd();Ke();Zd=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),sg=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((o,i)=>o===n[i]&&e[o]===t[o])},hn=class{constructor(t){this.tensorManager=jd(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Fr(t.logLevel,!!t.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(t){this.activeSessionId=t}async createMLContext(t){if(t instanceof GPUDevice){let n=this.mlContextCache.findIndex(o=>o.gpuDevice===t);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:o}),o}}else if(t===void 0){let n=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(n!==-1)return this.mlContextCache[n].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let r=this.mlContextCache.findIndex(n=>sg(n.options,t));if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:n}),n}}get currentContext(){let t=this.getMLContext(this.currentSessionId);if(!t)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return t}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let n=this.sessionIdsByMLContext.get(r);n||(n=new Set,this.sessionIdsByMLContext.set(r,n)),n.add(t)}onReleaseSession(t){let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t);let n=this.sessionIdsByMLContext.get(r);if(n.delete(t),n.size===0){this.sessionIdsByMLContext.delete(r);let o=this.mlContextCache.findIndex(i=>i.mlContext===r);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){se("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,n,o){let i=Zd.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(t,i,n,o)}uploadTensor(t,r){if(!Ie().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");se("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let n=await this.tensorManager.download(t);return qr(n,r)}}registerMLTensor(t,r,n){let o=Zd.get(r);if(!o)throw new Error(`Unsupported ONNX data type: ${r}`);let i=this.tensorManager.registerTensor(this.currentContext,t,o,n);return se("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${o}, dimensions: ${n}} -> {tensorId: ${i}}`),i}registerMLConstant(t,r,n,o,i,a){if(!a)throw new Error("External mounted files are not available.");let l=t;t.startsWith("./")&&(l=t.substring(2));let d=a.get(l);if(!d)throw new Error(`File with name ${l} not found in preloaded files.`);if(r+n>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=d.slice(r,r+n).buffer,m;switch(i.dataType){case"float32":m=new Float32Array(p);break;case"float16":m=new Uint16Array(p);break;case"int32":m=new Int32Array(p);break;case"uint32":m=new Uint32Array(p);break;case"int64":m=new BigInt64Array(p);break;case"uint64":m=new BigUint64Array(p);break;case"int8":m=new Int8Array(p);break;case"int4":case"uint4":case"uint8":m=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return se("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,m)}flush(){}}});var Qd={};Ft(Qd,{init:()=>ug});var sr,Bo,ug,Jd=R(()=>{"use strict";te();Fd();Ke();oe();Xd();sr=class e{constructor(t,r,n,o){this.module=t;this.dataType=r;this.data=n;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=k.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(k.size(t)!==k.size(this.dims))throw new Error("Invalid new shape");return new e(this.module,this.dataType,this.data,t)}},Bo=class{constructor(t,r,n){this.module=t;this.backend=r;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=r.adapterInfo,this.deviceInfo=r.deviceInfo;let o=t.PTR_SIZE,i=n/t.PTR_SIZE,a=o===4?"i32":"i64";this.opKernelContext=Number(t.getValue(o*i++,a));let l=Number(t.getValue(o*i++,a));this.outputCount=Number(t.getValue(o*i++,a)),this.customDataOffset=Number(t.getValue(o*i++,"*")),this.customDataSize=Number(t.getValue(o*i++,a));let d=[];for(let p=0;p<l;p++){let m=Number(t.getValue(o*i++,a)),u=Number(t.getValue(o*i++,"*")),h=Number(t.getValue(o*i++,a)),w=[];for(let y=0;y<h;y++)w.push(Number(t.getValue(o*i++,a)));d.push(new sr(t,m,u,w))}this.inputs=d}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let n=r?.inputs?.map(l=>typeof l=="number"?this.inputs[l]:l)??this.inputs,o=r?.outputs??[],i=(l,d,p)=>new sr(this.module,d,this.output(l,p),p),a=(l,d)=>{let p=Tt(l,d);if(!p)throw new Error(`Unsupported data type: ${l}`);let m=p>0?this.backend.gpuDataManager.create(p).id:0;return new sr(this.module,l,m,d)};return this.backend.run(t,n,o,i,a,this.outputCount)}output(t,r){let n=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",a=this.module.stackAlloc((1+r.length)*o);this.module.setValue(a,r.length,i);for(let l=0;l<r.length;l++)this.module.setValue(a+o*(l+1),r[l],i);return this.module._JsepOutput(this.opKernelContext,t,a)}catch(o){throw new Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(n)}}},ug=async(e,t,r,n)=>{let o=t.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let i=new pn;await i.initialize(r,n),o("webgpu",[i,a=>i.alloc(Number(a)),a=>i.free(a),(a,l,d,p=!1)=>{if(p)se("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(a)}, dst=${Number(l)}, size=${Number(d)}`),i.memcpy(Number(a),Number(l));else{se("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(a)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let m=t.HEAPU8.subarray(Number(a>>>0),Number(a>>>0)+Number(d));i.upload(Number(l),m)}},async(a,l,d)=>{se("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${a}, dataOffset=${l}, size=${d}`),await i.download(Number(a),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(a,l,d)=>i.createKernel(a,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),a=>i.releaseKernel(a),(a,l,d,p)=>{se("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${a}, contextDataOffset=${l}`);let m=new Bo(t,i,Number(l));return i.computeKernel(Number(a),m,p)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new hn(r);o("webnn",[i,()=>i.reserveTensorId(),a=>i.releaseTensorId(a),async(a,l,d,p)=>i.ensureTensor(a,l,d,p),(a,l)=>{i.uploadTensor(a,l)},async(a,l)=>i.downloadTensor(a,l)])}}});var lg,Or,Dr,kt,dg,jt,Br,Mr,ec,Rr,Ur,Nr,Xn=R(()=>{"use strict";qa();ja();te();gt();Wr();ro();lg=(e,t)=>{Ie()._OrtInit(e,t)!==0&&pe("Can't initialize onnxruntime.")},Or=async e=>{lg(e.wasm.numThreads,Xt(e.logLevel))},Dr=async(e,t)=>{{let r=(Jd(),$r(Qd)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=e.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=e.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Ie(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Ie(),e)}}},kt=new Map,dg=e=>{let t=Ie(),r=t.stackSave();try{let n=t.PTR_SIZE,o=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,o,o+n)!==0&&pe("Can't get session input/output count.");let a=n===4?"i32":"i64";return[Number(t.getValue(o,a)),Number(t.getValue(o+n,a))]}finally{t.stackRestore(r)}},jt=e=>{let t=Ie(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Br=async(e,t)=>{let r,n,o=Ie();Array.isArray(e)?[r,n]=e:e.buffer===o.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=jt(e);let i=0,a=0,l=0,d=[],p=[],m=[];try{if([a,d]=Ka(t),t?.externalData&&o.mountExternalData){let v=[];for(let S of t.externalData){let T=typeof S=="string"?S:S.path;v.push(Qt(typeof S=="string"?S:S.data).then(C=>{o.mountExternalData(T,C)}))}await Promise.all(v)}for(let v of t?.executionProviders??[])if((typeof v=="string"?v:v.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof v!="string"){let T=v,C=T?.context,A=T?.gpuDevice,P=T?.deviceType,O=T?.powerPreference;C?o.currentContext=C:A?o.currentContext=await o.jsepCreateMLContext(A):o.currentContext=await o.jsepCreateMLContext({deviceType:P,powerPreference:O})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(r,n,a),i===0&&pe("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[u,h]=dg(i),w=!!t?.enableGraphCapture,y=[],g=[],x=[];for(let v=0;v<u;v++){let S=o._OrtGetInputName(i,v);S===0&&pe("Can't get an input name."),p.push(S),y.push(o.UTF8ToString(S))}for(let v=0;v<h;v++){let S=o._OrtGetOutputName(i,v);S===0&&pe("Can't get an output name."),m.push(S);let T=o.UTF8ToString(S);g.push(T);{if(w&&t?.preferredOutputLocation===void 0){x.push("gpu-buffer");continue}let C=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[T]??"cpu";if(C!=="cpu"&&C!=="cpu-pinned"&&C!=="gpu-buffer"&&C!=="ml-tensor")throw new Error(`Not supported preferred output location: ${C}.`);if(w&&C!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${C}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);x.push(C)}}let $=null;return x.some(v=>v==="gpu-buffer"||v==="ml-tensor")&&(l=o._OrtCreateBinding(i),l===0&&pe("Can't create IO binding."),$={handle:l,outputPreferredLocations:x,outputPreferredLocationsEncoded:x.map(v=>to(v))}),kt.set(i,[i,p,m,$,w,!1]),[i,y,g]}catch(u){throw p.forEach(h=>o._OrtFree(h)),m.forEach(h=>o._OrtFree(h)),l!==0&&o._OrtReleaseBinding(l)!==0&&pe("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&pe("Can't release session."),u}finally{o._free(r),a!==0&&o._OrtReleaseSessionOptions(a)!==0&&pe("Can't release session options."),d.forEach(u=>o._free(u)),o.unmountExternalData?.()}},Mr=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,o,i,a,l]=r;a&&(l&&t._OrtClearBoundOutputs(a.handle)!==0&&pe("Can't clear bound outputs."),t._OrtReleaseBinding(a.handle)!==0&&pe("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),o.forEach(d=>t._OrtFree(d)),i.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&pe("Can't release session."),kt.delete(e)},ec=(e,t,r,n,o,i=!1)=>{if(!e){t.push(0);return}let a=Ie(),l=a.PTR_SIZE,d=e[0],p=e[1],m=e[3],u,h;if(d==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let g=e[2].gpuBuffer;h=Tt(Zt(d),p);let x=a.jsepRegisterBuffer;if(!x)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');u=x(n,o,g,h)}else if(m==="ml-tensor"){let g=e[2].mlTensor;h=Tt(Zt(d),p);let x=a.jsepRegisterMLTensor;if(!x)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');u=x(g,Zt(d),p)}else{let g=e[2];if(Array.isArray(g)){h=l*g.length,u=a._malloc(h),r.push(u);for(let x=0;x<g.length;x++){if(typeof g[x]!="string")throw new TypeError(`tensor data at index ${x} is not a string`);a.setValue(u+x*l,ke(g[x],r),"*")}}else h=g.byteLength,u=a._malloc(h),r.push(u),a.HEAPU8.set(new Uint8Array(g.buffer,g.byteOffset,h),u)}let w=a.stackSave(),y=a.stackAlloc(4*p.length);try{p.forEach((x,$)=>a.setValue(y+$*l,x,l===4?"i32":"i64"));let g=a._OrtCreateTensor(Zt(d),u,h,y,p.length,to(m));g===0&&pe(`Can't create tensor for input/output. session=${n}, index=${o}.`),t.push(g)}finally{a.stackRestore(w)}},Rr=async(e,t,r,n,o,i)=>{let a=Ie(),l=a.PTR_SIZE,d=kt.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=d[0],m=d[1],u=d[2],h=d[3],w=d[4],y=d[5],g=t.length,x=n.length,$=0,v=[],S=[],T=[],C=[],A=a.stackSave(),P=a.stackAlloc(g*l),O=a.stackAlloc(g*l),U=a.stackAlloc(x*l),L=a.stackAlloc(x*l);try{a.jsepOnRunStart?.(p),[$,v]=Fa(i);for(let W=0;W<g;W++)ec(r[W],S,C,e,t[W],w);for(let W=0;W<x;W++)ec(o[W],T,C,e,g+n[W],w);for(let W=0;W<g;W++)a.setValue(P+W*l,S[W],"*"),a.setValue(O+W*l,m[t[W]],"*");for(let W=0;W<x;W++)a.setValue(U+W*l,T[W],"*"),a.setValue(L+W*l,u[n[W]],"*");if(h&&!y){let{handle:W,outputPreferredLocations:ee,outputPreferredLocationsEncoded:ue}=h;if(m.length!==g)throw new Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${m.length}).`);for(let Z=0;Z<g;Z++){let J=t[Z];await a._OrtBindInput(W,m[J],S[Z])!==0&&pe(`Can't bind input[${Z}] for session=${e}.`)}for(let Z=0;Z<x;Z++){let J=n[Z];o[Z]?.[3]?a._OrtBindOutput(W,u[J],T[Z],0)!==0&&pe(`Can't bind pre-allocated output[${Z}] for session=${e}.`):a._OrtBindOutput(W,u[J],0,ue[J])!==0&&pe(`Can't bind output[${Z}] to ${ee[Z]} for session=${e}.`)}kt.set(e,[p,m,u,h,w,!0])}let K;h?K=await a._OrtRunWithBinding(p,h.handle,x,U,$):K=await a._OrtRun(p,O,P,g,L,x,U,$),K!==0&&pe("failed to call OrtRun().");let j=[];for(let W=0;W<x;W++){let ee=Number(a.getValue(U+W*l,"*"));if(ee===T[W]){j.push(o[W]);continue}let ue=a.stackSave(),Z=a.stackAlloc(4*l),J=!1,Q,ne=0;try{a._OrtGetTensorData(ee,Z,Z+l,Z+2*l,Z+3*l)!==0&&pe(`Can't access output tensor data on index ${W}.`);let Ae=l===4?"i32":"i64",$e=Number(a.getValue(Z,Ae));ne=a.getValue(Z+l,"*");let de=a.getValue(Z+l*2,"*"),V=Number(a.getValue(Z+l*3,Ae)),q=[];for(let ve=0;ve<V;ve++)q.push(Number(a.getValue(de+ve*l,Ae)));a._OrtFree(de)!==0&&pe("Can't free memory for tensor dims.");let he=q.reduce((ve,ye)=>ve*ye,1);Q=bt($e);let qe=h?.outputPreferredLocations[n[W]];if(Q==="string"){if(qe==="gpu-buffer"||qe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ve=[];for(let ye=0;ye<he;ye++){let Ye=a.getValue(ne+ye*l,"*"),Lt=a.getValue(ne+(ye+1)*l,"*"),vn=ye===he-1?void 0:Lt-Ye;ve.push(a.UTF8ToString(Ye,vn))}j.push([Q,q,ve,"cpu"])}else if(qe==="gpu-buffer"&&he>0){let ve=a.jsepGetBuffer;if(!ve)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ye=ve(ne),Ye=Tt($e,he);if(Ye===void 0||!Gr(Q))throw new Error(`Unsupported data type: ${Q}`);J=!0,j.push([Q,q,{gpuBuffer:ye,download:a.jsepCreateDownloader(ye,Ye,Q),dispose:()=>{a._OrtReleaseTensor(ee)!==0&&pe("Can't release tensor.")}},"gpu-buffer"])}else if(qe==="ml-tensor"&&he>0){let ve=a.jsepEnsureTensor;if(!ve)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Tt($e,he)===void 0||!Hr(Q))throw new Error(`Unsupported data type: ${Q}`);let Ye=await ve(ne,$e,q,!1);J=!0,j.push([Q,q,{mlTensor:Ye,download:a.jsepCreateMLTensorDownloader(ne,Q),dispose:()=>{a.jsepReleaseTensorId(ne),a._OrtReleaseTensor(ee)}},"ml-tensor"])}else{let ve=Lr(Q),ye=new ve(he);new Uint8Array(ye.buffer,ye.byteOffset,ye.byteLength).set(a.HEAPU8.subarray(ne,ne+ye.byteLength)),j.push([Q,q,ye,"cpu"])}}finally{a.stackRestore(ue),Q==="string"&&ne&&a._free(ne),J||a._OrtReleaseTensor(ee)}}return h&&!w&&(a._OrtClearBoundOutputs(h.handle)!==0&&pe("Can't clear bound outputs."),kt.set(e,[p,m,u,h,w,!1])),j}finally{a.stackRestore(A),S.forEach(K=>a._OrtReleaseTensor(K)),T.forEach(K=>a._OrtReleaseTensor(K)),C.forEach(K=>a._free(K)),$!==0&&a._OrtReleaseRunOptions($),v.forEach(K=>a._free(K))}},Ur=e=>{let t=Ie(),r=kt.get(e);if(!r)throw new Error("invalid session id");let n=r[0],o=t._OrtEndProfiling(n);o===0&&pe("Can't get an profile file name."),t._OrtFree(o)},Nr=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}});var Et,Fe,ur,bn,yn,gn,Mo,Ro,Vt,Wt,pg,tc,rc,nc,oc,ic,ac,sc,Uo=R(()=>{"use strict";He();Xn();gt();Kt();Et=()=>!!be.wasm.proxy&&typeof document<"u",ur=!1,bn=!1,yn=!1,Ro=new Map,Vt=(e,t)=>{let r=Ro.get(e);r?r.push(t):Ro.set(e,[t])},Wt=()=>{if(ur||!bn||yn||!Fe)throw new Error("worker not ready")},pg=e=>{switch(e.data.type){case"init-wasm":ur=!1,e.data.err?(yn=!0,Mo[1](e.data.err)):(bn=!0,Mo[0]()),gn&&(URL.revokeObjectURL(gn),gn=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Ro.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},tc=async()=>{if(!bn){if(ur)throw new Error("multiple calls to 'initWasm()' detected.");if(yn)throw new Error("previous call to 'initWasm()' failed.");if(ur=!0,Et())return new Promise((e,t)=>{Fe?.terminate(),La().then(([r,n])=>{try{Fe=n,Fe.onerror=i=>t(i),Fe.onmessage=pg,Mo=[e,t];let o={type:"init-wasm",in:be};Fe.postMessage(o),gn=r}catch(o){t(o)}},t)});try{await zr(be.wasm),await Or(be),bn=!0}catch(e){throw yn=!0,e}finally{ur=!1}}},rc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:be}};Fe.postMessage(n)});await Dr(be,e)},nc=async e=>Et()?(Wt(),new Promise((t,r)=>{Vt("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Fe.postMessage(n,[e.buffer])})):jt(e),oc=async(e,t)=>{if(Et()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Wt(),new Promise((r,n)=>{Vt("create",[r,n]);let o={type:"create",in:{model:e,options:{...t}}},i=[];e instanceof Uint8Array&&i.push(e.buffer),Fe.postMessage(o,i)})}else return Br(e,t)},ic=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("release",[t,r]);let n={type:"release",in:e};Fe.postMessage(n)});Mr(e)},ac=async(e,t,r,n,o,i)=>{if(Et()){if(r.some(a=>a[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(a=>a))throw new Error("pre-allocated output tensor is not supported for proxy.");return Wt(),new Promise((a,l)=>{Vt("run",[a,l]);let d=r,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:i}};Fe.postMessage(p,Nr(d))})}else return Rr(e,t,r,n,o,i)},sc=async e=>{if(Et())return Wt(),new Promise((t,r)=>{Vt("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Fe.postMessage(n)});Ur(e)}});var uc,mg,wn,lc=R(()=>{"use strict";He();Uo();te();Pr();ro();uc=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},mg=e=>{switch(e[3]){case"cpu":return new De(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Gr(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:o}=e[2];return De.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:o})}case"ml-tensor":{let t=e[0];if(!Hr(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:o}=e[2];return De.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:o})}default:throw new Error(`invalid data location: ${e[3]}`)}},wn=class{async fetchModelAndCopyToWasmMemory(t){return nc(await Qt(t))}async loadModel(t,r){Ne();let n;typeof t=="string"?!1?n=await Qt(t):n=await this.fetchModelAndCopyToWasmMemory(t):n=t,[this.sessionId,this.inputNames,this.outputNames]=await oc(n,r),Be()}async dispose(){return ic(this.sessionId)}async run(t,r,n){Ne();let o=[],i=[];Object.entries(t).forEach(h=>{let w=h[0],y=h[1],g=this.inputNames.indexOf(w);if(g===-1)throw new Error(`invalid input '${w}'`);o.push(y),i.push(g)});let a=[],l=[];Object.entries(r).forEach(h=>{let w=h[0],y=h[1],g=this.outputNames.indexOf(w);if(g===-1)throw new Error(`invalid output '${w}'`);a.push(y),l.push(g)});let d=o.map((h,w)=>uc(h,()=>`input "${this.inputNames[i[w]]}"`)),p=a.map((h,w)=>h?uc(h,()=>`output "${this.outputNames[l[w]]}"`):null),m=await ac(this.sessionId,i,d,l,p,n),u={};for(let h=0;h<m.length;h++)u[this.outputNames[l[h]]]=a[h]??mg(m[h]);return Be(),u}startProfiling(){}endProfiling(){sc(this.sessionId)}}});var cc={};Ft(cc,{OnnxruntimeWebAssemblyBackend:()=>_n,initializeFlags:()=>dc,wasmBackend:()=>fg});var dc,_n,fg,pc=R(()=>{"use strict";He();Uo();lc();Kt();dc=()=>{if((typeof be.wasm.initTimeout!="number"||be.wasm.initTimeout<0)&&(be.wasm.initTimeout=0),be.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof be.wasm.relaxedSimd!="boolean"&&(be.wasm.relaxedSimd=!1),typeof be.wasm.proxy!="boolean"&&(be.wasm.proxy=!1),typeof be.wasm.trace!="boolean"&&(be.wasm.trace=!1),typeof be.wasm.numThreads!="number"||!Number.isInteger(be.wasm.numThreads)||be.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)be.wasm.numThreads=1;else{let e=typeof navigator>"u"?qn("node:os").cpus().length:navigator.hardwareConcurrency;be.wasm.numThreads=Math.min(4,Math.ceil((e||1)/2))}},_n=class{async init(t){dc(),await tc(),await rc(t)}async createInferenceSessionHandler(t,r){let n=new wn;return await n.loadModel(t,r),Promise.resolve(n)}},fg=new _n});He();He();He();var Oa="1.21.0";var _1=Zn;{let e=(pc(),$r(cc)).wasmBackend;xt("webgpu",e,5),xt("webnn",e,5),xt("cpu",e,10),xt("wasm",e,10)}Object.defineProperty(be.versions,"web",{value:Oa,enumerable:!0});export{Rp as InferenceSession,Ar as TRACE,Ne as TRACE_FUNC_BEGIN,Be as TRACE_FUNC_END,De as Tensor,Np as TrainingSession,_1 as default,be as env,xt as registerBackend};
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
