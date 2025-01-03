/*!
 * ONNX Runtime Web v1.21.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var wb=Object.create;var xn=Object.defineProperty;var _b=Object.getOwnPropertyDescriptor;var Tb=Object.getOwnPropertyNames;var vb=Object.getPrototypeOf,Ib=Object.prototype.hasOwnProperty;var ui=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var S=(r,e)=>()=>(r&&(e=r(r=0)),e);var Be=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),Vr=(r,e)=>{for(var n in e)xn(r,n,{get:e[n],enumerable:!0})},os=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Tb(e))!Ib.call(r,o)&&o!==n&&xn(r,o,{get:()=>e[o],enumerable:!(t=_b(e,o))||t.enumerable});return r};var _r=(r,e,n)=>(n=r!=null?wb(vb(r)):{},os(e||!r||!r.__esModule?xn(n,"default",{value:r,enumerable:!0}):n,r)),wn=r=>os(xn({},"__esModule",{value:!0}),r);var _n,er,Ut,Sb,Tn,vn=S(()=>{"use strict";_n=new Map,er=[],Ut=(r,e,n)=>{if(e&&typeof e.init=="function"&&typeof e.createInferenceSessionHandler=="function"){let t=_n.get(r);if(t===void 0)_n.set(r,{backend:e,priority:n});else{if(t.priority>n)return;if(t.priority===n&&t.backend!==e)throw new Error(`cannot register backend "${r}" using priority ${n}`)}if(n>=0){let o=er.indexOf(r);o!==-1&&er.splice(o,1);for(let i=0;i<er.length;i++)if(_n.get(er[i]).priority<=n){er.splice(i,0,r);return}er.push(r)}return}throw new TypeError("not a valid backend")},Sb=async r=>{let e=_n.get(r);if(!e)return"backend not found.";if(e.initialized)return e.backend;if(e.aborted)return e.error;{let n=!!e.initPromise;try{return n||(e.initPromise=e.backend.init(r)),await e.initPromise,e.initialized=!0,e.backend}catch(t){return n||(e.error=`${t}`,e.aborted=!0),e.error}finally{delete e.initPromise}}},Tn=async r=>{let e=r.executionProviders||[],n=e.map(u=>typeof u=="string"?u:u.name),t=n.length===0?er:n,o,i=[],s=new Set;for(let u of t){let l=await Sb(u);typeof l=="string"?i.push({name:u,err:l}):(o||(o=l),o===l&&s.add(u))}if(!o)throw new Error(`no available backend found. ERR: ${i.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:l}of i)n.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${l}`);let a=e.filter(u=>s.has(typeof u=="string"?u:u.name));return[o,new Proxy(r,{get:(u,l)=>l==="executionProviders"?a:Reflect.get(u,l)})]}});var is=S(()=>{"use strict";vn()});var as,ss=S(()=>{"use strict";as="1.21.0"});var us,rt,li=S(()=>{"use strict";ss();us="warning",rt={wasm:{},webgl:{},webgpu:{},versions:{common:as},set logLevel(r){if(r!==void 0){if(typeof r!="string"||["verbose","info","warning","error","fatal"].indexOf(r)===-1)throw new Error(`Unsupported logging level: ${r}`);us=r}},get logLevel(){return us}};Object.defineProperty(rt,"logLevel",{enumerable:!0})});var j,ls=S(()=>{"use strict";li();j=rt});var cs,ds,fs=S(()=>{"use strict";cs=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);n.width=r.dims[3],n.height=r.dims[2];let t=n.getContext("2d");if(t!=null){let o,i;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[3]):(o=r.dims[3],i=r.dims[2]);let s=e?.format!==void 0?e.format:"RGB",a=e?.norm,u,l;a===void 0||a.mean===void 0?u=[255,255,255,255]:typeof a.mean=="number"?u=[a.mean,a.mean,a.mean,a.mean]:(u=[a.mean[0],a.mean[1],a.mean[2],0],a.mean[3]!==void 0&&(u[3]=a.mean[3])),a===void 0||a.bias===void 0?l=[0,0,0,0]:typeof a.bias=="number"?l=[a.bias,a.bias,a.bias,a.bias]:(l=[a.bias[0],a.bias[1],a.bias[2],0],a.bias[3]!==void 0&&(l[3]=a.bias[3]));let c=i*o,d=0,f=c,m=c*2,p=-1;s==="RGBA"?(d=0,f=c,m=c*2,p=c*3):s==="RGB"?(d=0,f=c,m=c*2):s==="RBG"&&(d=0,m=c,f=c*2);for(let h=0;h<i;h++)for(let b=0;b<o;b++){let y=(r.data[d++]-l[0])*u[0],g=(r.data[f++]-l[1])*u[1],x=(r.data[m++]-l[2])*u[2],_=p===-1?255:(r.data[p++]-l[3])*u[3];t.fillStyle="rgba("+y+","+g+","+x+","+_+")",t.fillRect(b,h,1,1)}if("toDataURL"in n)return n.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ds=(r,e)=>{let n=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),t;if(n!=null){let o,i,s;e?.tensorLayout!==void 0&&e.tensorLayout==="NHWC"?(o=r.dims[2],i=r.dims[1],s=r.dims[3]):(o=r.dims[3],i=r.dims[2],s=r.dims[1]);let a=e!==void 0&&e.format!==void 0?e.format:"RGB",u=e?.norm,l,c;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let d=i*o;if(e!==void 0&&(e.format!==void 0&&s===4&&e.format!=="RGBA"||s===3&&e.format!=="RGB"&&e.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let f=4,m=0,p=1,h=2,b=3,y=0,g=d,x=d*2,_=-1;a==="RGBA"?(y=0,g=d,x=d*2,_=d*3):a==="RGB"?(y=0,g=d,x=d*2):a==="RBG"&&(y=0,x=d,g=d*2),t=n.createImageData(o,i);for(let v=0;v<i*o;m+=f,p+=f,h+=f,b+=f,v++)t.data[m]=(r.data[y++]-c[0])*l[0],t.data[p]=(r.data[g++]-c[1])*l[1],t.data[h]=(r.data[x++]-c[2])*l[2],t.data[b]=_===-1?255:(r.data[_++]-c[3])*l[3]}else throw new Error("Can not access image data");return t}});var ci,ps,ms,hs,gs,bs,ys=S(()=>{"use strict";In();ci=(r,e)=>{if(r===void 0)throw new Error("Image buffer must be defined");if(e.height===void 0||e.width===void 0)throw new Error("Image height and width must be defined");if(e.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:n,width:t}=e,o=e.norm??{mean:255,bias:0},i,s;typeof o.mean=="number"?i=[o.mean,o.mean,o.mean,o.mean]:i=[o.mean[0],o.mean[1],o.mean[2],o.mean[3]??255],typeof o.bias=="number"?s=[o.bias,o.bias,o.bias,o.bias]:s=[o.bias[0],o.bias[1],o.bias[2],o.bias[3]??0];let a=e.format!==void 0?e.format:"RGBA",u=e.tensorFormat!==void 0&&e.tensorFormat!==void 0?e.tensorFormat:"RGB",l=n*t,c=u==="RGBA"?new Float32Array(l*4):new Float32Array(l*3),d=4,f=0,m=1,p=2,h=3,b=0,y=l,g=l*2,x=-1;a==="RGB"&&(d=3,f=0,m=1,p=2,h=-1),u==="RGBA"?x=l*3:u==="RBG"?(b=0,g=l,y=l*2):u==="BGR"&&(g=0,y=l,b=l*2);for(let v=0;v<l;v++,f+=d,p+=d,m+=d,h+=d)c[b++]=(r[f]+s[0])/i[0],c[y++]=(r[m]+s[1])/i[1],c[g++]=(r[p]+s[2])/i[2],x!==-1&&h!==-1&&(c[x++]=(r[h]+s[3])/i[3]);return u==="RGBA"?new We("float32",c,[1,4,n,t]):new We("float32",c,[1,3,n,t])},ps=async(r,e)=>{let n=typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement,t=typeof ImageData<"u"&&r instanceof ImageData,o=typeof ImageBitmap<"u"&&r instanceof ImageBitmap,i=typeof r=="string",s,a=e??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},l=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(n){let c=u();c.width=r.width,c.height=r.height;let d=l(c);if(d!=null){let f=r.height,m=r.width;if(e!==void 0&&e.resizedHeight!==void 0&&e.resizedWidth!==void 0&&(f=e.resizedHeight,m=e.resizedWidth),e!==void 0){if(a=e,e.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");a.tensorFormat="RGBA",a.height=f,a.width=m}else a.tensorFormat="RGBA",a.height=f,a.width=m;d.drawImage(r,0,0),s=d.getImageData(0,0,m,f).data}else throw new Error("Can not access image data")}else if(t){let c,d;if(e!==void 0&&e.resizedWidth!==void 0&&e.resizedHeight!==void 0?(c=e.resizedHeight,d=e.resizedWidth):(c=r.height,d=r.width),e!==void 0&&(a=e),a.format="RGBA",a.height=c,a.width=d,e!==void 0){let f=u();f.width=d,f.height=c;let m=l(f);if(m!=null)m.putImageData(r,0,0),s=m.getImageData(0,0,d,c).data;else throw new Error("Can not access image data")}else s=r.data}else if(o){if(e===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=r.width,c.height=r.height;let d=l(c);if(d!=null){let f=r.height,m=r.width;return d.drawImage(r,0,0,m,f),s=d.getImageData(0,0,m,f).data,a.height=f,a.width=m,ci(s,a)}else throw new Error("Can not access image data")}else{if(i)return new Promise((c,d)=>{let f=u(),m=l(f);if(!r||!m)return d();let p=new Image;p.crossOrigin="Anonymous",p.src=r,p.onload=()=>{f.width=p.width,f.height=p.height,m.drawImage(p,0,0,f.width,f.height);let h=m.getImageData(0,0,f.width,f.height);a.height=f.height,a.width=f.width,c(ci(h.data,a))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return ci(s,a);throw new Error("Input data provided is not supported - aborted tensor creation")},ms=(r,e)=>{let{width:n,height:t,download:o,dispose:i}=e,s=[1,t,n,4];return new We({location:"texture",type:"float32",texture:r,dims:s,download:o,dispose:i})},hs=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new We({location:"gpu-buffer",type:n??"float32",gpuBuffer:r,dims:t,download:o,dispose:i})},gs=(r,e)=>{let{dataType:n,dims:t,download:o,dispose:i}=e;return new We({location:"ml-tensor",type:n??"float32",mlTensor:r,dims:t,download:o,dispose:i})},bs=(r,e,n)=>new We({location:"cpu-pinned",type:r,data:e,dims:n??[e.length]})});var tr,Mr,xs,ws,_s=S(()=>{"use strict";tr=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Mr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xs=!1,ws=()=>{if(!xs){xs=!0;let r=typeof BigInt64Array<"u"&&BigInt64Array.from,e=typeof BigUint64Array<"u"&&BigUint64Array.from,n=typeof Float16Array<"u"&&Float16Array.from;r&&(tr.set("int64",BigInt64Array),Mr.set(BigInt64Array,"int64")),e&&(tr.set("uint64",BigUint64Array),Mr.set(BigUint64Array,"uint64")),n?(tr.set("float16",Float16Array),Mr.set(Float16Array,"float16")):tr.set("float16",Uint16Array)}}});var Ts,vs,Is=S(()=>{"use strict";In();Ts=r=>{let e=1;for(let n=0;n<r.length;n++){let t=r[n];if(typeof t!="number"||!Number.isSafeInteger(t))throw new TypeError(`dims[${n}] must be an integer, got: ${t}`);if(t<0)throw new RangeError(`dims[${n}] must be a non-negative integer, got: ${t}`);e*=t}return e},vs=(r,e)=>{switch(r.location){case"cpu":return new We(r.type,r.data,e);case"cpu-pinned":return new We({location:"cpu-pinned",data:r.data,type:r.type,dims:e});case"texture":return new We({location:"texture",texture:r.texture,type:r.type,dims:e});case"gpu-buffer":return new We({location:"gpu-buffer",gpuBuffer:r.gpuBuffer,type:r.type,dims:e});case"ml-tensor":return new We({location:"ml-tensor",mlTensor:r.mlTensor,type:r.type,dims:e});default:throw new Error(`tensorReshape: tensor location ${r.location} is not supported`)}}});var We,In=S(()=>{"use strict";fs();ys();_s();Is();We=class{constructor(e,n,t){ws();let o,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,o=e.type,i=e.dims,e.location){case"cpu-pinned":{let a=tr.get(o);if(!a)throw new TypeError(`unsupported type "${o}" to create tensor from pinned buffer`);if(!(e.data instanceof a))throw new TypeError(`buffer should be of type ${a.name}`);this.cpuData=e.data;break}case"texture":{if(o!=="float32")throw new TypeError(`unsupported type "${o}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(o!=="float32"&&o!=="float16"&&o!=="int32"&&o!=="int64"&&o!=="uint32"&&o!=="uint64"&&o!=="int8"&&o!=="uint8"&&o!=="bool"&&o!=="uint4"&&o!=="int4")throw new TypeError(`unsupported type "${o}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let a,u;if(typeof e=="string")if(o=e,u=t,e==="string"){if(!Array.isArray(n))throw new TypeError("A string tensor's data must be a string array.");a=n}else{let l=tr.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(n)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?a=l.from(n,BigInt):a=l.from(n)}else if(n instanceof l)a=n;else if(n instanceof Uint8ClampedArray)if(e==="uint8")a=Uint8Array.from(n);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else throw new TypeError(`A ${o} tensor's data must be type of ${l}`)}else if(u=n,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")o="string",a=e;else if(l==="boolean")o="bool",a=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)o="uint8",a=Uint8Array.from(e);else{let l=Mr.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);o=l,a=e}if(u===void 0)u=[a.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=a,this.dataLocation="cpu"}let s=Ts(i);if(this.cpuData&&s!==this.cpuData.length&&!((o==="uint4"||o==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=o,this.dims=i,this.size=s}static async fromImage(e,n){return ps(e,n)}static fromTexture(e,n){return ms(e,n)}static fromGpuBuffer(e,n){return hs(e,n)}static fromMLTensor(e,n){return gs(e,n)}static fromPinnedBuffer(e,n,t){return bs(e,n,t)}toDataURL(e){return cs(this,e)}toImageData(e){return ds(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let n=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=n,e&&this.disposer&&(this.disposer(),this.disposer=void 0),n}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return vs(this,e)}}});var Re,Sn=S(()=>{"use strict";In();Re=We});var $n,Ss,nt,Je,di=S(()=>{"use strict";li();$n=(r,e)=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||console.timeStamp(`${r}::ORT::${e}`)},Ss=(r,e)=>{let n=new Error().stack?.split(/\r\n|\r|\n/g)||[],t=!1;for(let o=0;o<n.length;o++){if(t&&!n[o].includes("TRACE_FUNC")){let i=`FUNC_${r}::${n[o].trim().split(" ")[1]}`;e&&(i+=`::${e}`),$n("CPU",i);return}n[o].includes("TRACE_FUNC")&&(t=!0)}},nt=r=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Ss("BEGIN",r)},Je=r=>{(typeof rt.trace>"u"?!rt.wasm.trace:!rt.trace)||Ss("END",r)}});var An,$s=S(()=>{"use strict";vn();Sn();di();An=class r{constructor(e){this.handler=e}async run(e,n,t){nt();let o={},i={};if(typeof e!="object"||e===null||e instanceof Re||Array.isArray(e))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof n=="object"){if(n===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(n instanceof Re)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(n)){if(n.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let l of n){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);o[l]=null}if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(n);for(let d of this.outputNames)if(c.indexOf(d)!==-1){let f=n[d];(f===null||f instanceof Re)&&(l=!0,s=!1,o[d]=f)}if(l){if(typeof t=="object"&&t!==null)i=t;else if(typeof t<"u")throw new TypeError("'options' must be an object.")}else i=n}}else if(typeof n<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of this.inputNames)if(typeof e[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(s)for(let l of this.outputNames)o[l]=null;let a=await this.handler.run(e,o,i),u={};for(let l in a)if(Object.hasOwnProperty.call(a,l)){let c=a[l];c instanceof Re?u[l]=c:u[l]=new Re(c.type,c.data,c.dims)}return Je(),u}async release(){return this.handler.dispose()}static async create(e,n,t,o){nt();let i,s={};if(typeof e=="string"){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof Uint8Array){if(i=e,typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(e instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&e instanceof SharedArrayBuffer){let c=e,d=0,f=e.byteLength;if(typeof n=="object"&&n!==null)s=n;else if(typeof n=="number"){if(d=n,!Number.isSafeInteger(d))throw new RangeError("'byteOffset' must be an integer.");if(d<0||d>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(f=e.byteLength-d,typeof t=="number"){if(f=t,!Number.isSafeInteger(f))throw new RangeError("'byteLength' must be an integer.");if(f<=0||d+f>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-d}].`);if(typeof o=="object"&&o!==null)s=o;else if(typeof o<"u")throw new TypeError("'options' must be an object.")}else if(typeof t<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof n<"u")throw new TypeError("'options' must be an object.");i=new Uint8Array(c,d,f)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[a,u]=await Tn(s),l=await a.createInferenceSessionHandler(i,u);return Je(),new r(l)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}}});var $b,As=S(()=>{"use strict";$s();$b=An});var Ps=S(()=>{"use strict"});var Os=S(()=>{"use strict"});var Es=S(()=>{"use strict"});var Cs=S(()=>{"use strict"});var Ab,Pn,ks=S(()=>{"use strict";vn();Sn();Ab="Training backend could not be resolved. Make sure you're using the correct configuration & WebAssembly files.",Pn=class r{constructor(e,n,t){this.handler=e,this.hasOptimizerModel=n,this.hasEvalModel=t}get trainingInputNames(){return this.handler.inputNames}get trainingOutputNames(){return this.handler.outputNames}get evalInputNames(){if(this.hasEvalModel)return this.handler.evalInputNames;throw new Error("This training session has no evalModel loaded.")}get evalOutputNames(){if(this.hasEvalModel)return this.handler.evalOutputNames;throw new Error("This training session has no evalModel loaded.")}static async create(e,n){let t=e.evalModel||"",o=e.optimizerModel||"",i=n||{},[s,a]=await Tn(i);if(s.createTrainingSessionHandler){let u=await s.createTrainingSessionHandler(e.checkpointState,e.trainModel,t,o,a);return new r(u,!!e.optimizerModel,!!e.evalModel)}else throw new Error(Ab)}typeNarrowingForRunStep(e,n,t,o,i){let s={},a={};if(typeof t!="object"||t===null||t instanceof Re||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let u=!0;if(typeof o=="object"){if(o===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(o instanceof Re)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(o)){if(o.length===0)throw new TypeError("'fetches' cannot be an empty array.");u=!1;for(let l of o){if(typeof l!="string")throw new TypeError("'fetches' must be a string array or an object.");if(n.indexOf(l)===-1)throw new RangeError(`'fetches' contains invalid output name: ${l}.`);s[l]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let l=!1,c=Object.getOwnPropertyNames(o);for(let d of n)if(c.indexOf(d)!==-1){let f=o[d];(f===null||f instanceof Re)&&(l=!0,u=!1,s[d]=f)}if(l){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=o}}else if(typeof o<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let l of e)if(typeof t[l]>"u")throw new Error(`input '${l}' is missing in 'feeds'.`);if(u)for(let l of n)s[l]=null;return[s,a]}convertHandlerReturnTypeToMapOfTensors(e){let n={};for(let t in e)if(Object.hasOwnProperty.call(e,t)){let o=e[t];o instanceof Re?n[t]=o:n[t]=new Re(o.type,o.data,o.dims)}return n}async lazyResetGrad(){await this.handler.lazyResetGrad()}async runTrainStep(e,n,t){let[o,i]=this.typeNarrowingForRunStep(this.trainingInputNames,this.trainingOutputNames,e,n,t),s=await this.handler.runTrainStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}async runOptimizerStep(e){if(this.hasOptimizerModel)await this.handler.runOptimizerStep(e||{});else throw new Error("This TrainingSession has no OptimizerModel loaded.")}async runEvalStep(e,n,t){if(this.hasEvalModel){let[o,i]=this.typeNarrowingForRunStep(this.evalInputNames,this.evalOutputNames,e,n,t),s=await this.handler.runEvalStep(e,o,i);return this.convertHandlerReturnTypeToMapOfTensors(s)}else throw new Error("This TrainingSession has no EvalModel loaded.")}async getParametersSize(e=!0){return this.handler.getParametersSize(e)}async loadParametersBuffer(e,n=!0){let t=await this.getParametersSize(n);if(e.length!==4*t)throw new Error("Size of the buffer passed into loadParametersBuffer must match the number of parameters in the model. Please use getParametersSize method to check.");return this.handler.loadParametersBuffer(e,n)}async getContiguousParameters(e=!0){return this.handler.getContiguousParameters(e)}async release(){return this.handler.dispose()}}});var Pb,Ds=S(()=>{"use strict";ks();Pb=Pn});var fi={};Vr(fi,{InferenceSession:()=>$b,TRACE:()=>$n,TRACE_FUNC_BEGIN:()=>nt,TRACE_FUNC_END:()=>Je,Tensor:()=>Re,TrainingSession:()=>Pb,env:()=>j,registerBackend:()=>Ut});var Ke=S(()=>{"use strict";is();ls();As();Sn();Ps();Os();di();Es();Cs();Ds()});function Wt(r,e,n,t){if(e===void 0)return Eb(r);if(n===void 0)On(r,e,1);else if(typeof n=="number"&&t===void 0)On(r,e,n);else if(typeof n=="string"&&t===void 0)On(r,n,1,e);else if(typeof n=="string"&&typeof t=="number")On(r,n,t,e);else throw new TypeError("input is valid")}function Eb(r){return{verbose:Wt.verbose.bind(null,r),info:Wt.info.bind(null,r),warning:Wt.warning.bind(null,r),error:Wt.error.bind(null,r),fatal:Wt.fatal.bind(null,r)}}function On(r,e,n,t){let o=Fr[t||""]||Fr[""];Ls[r]<Ls[o.minimalSeverity]||(o.logDateTime&&(e=`${new Date().toISOString()}|${e}`),o.logSourceLocation,Ob[o.provider].log(r,e,t))}var pi,mi,Ls,Ob,zs,Fr,ye,Cn,kn,Dn,En,st=S(()=>{"use strict";pi=class{log(e,n,t){}},mi=class{log(e,n,t){console.log(`${this.color(e)} ${t?"\x1B[35m"+t+"\x1B[0m ":""}${n}`)}color(e){switch(e){case"verbose":return"\x1B[34;40mv\x1B[0m";case"info":return"\x1B[32mi\x1B[0m";case"warning":return"\x1B[30;43mw\x1B[0m";case"error":return"\x1B[31;40me\x1B[0m";case"fatal":return"\x1B[101mf\x1B[0m";default:throw new Error(`unsupported severity: ${e}`)}}},Ls={verbose:1e3,info:2e3,warning:4e3,error:5e3,fatal:6e3},Ob={none:new pi,console:new mi},zs={provider:"console",minimalSeverity:"warning",logDateTime:!0,logSourceLocation:!1},Fr={"":zs};(u=>{function r(l,c){u("verbose",l,c)}u.verbose=r;function e(l,c){u("info",l,c)}u.info=e;function n(l,c){u("warning",l,c)}u.warning=n;function t(l,c){u("error",l,c)}u.error=t;function o(l,c){u("fatal",l,c)}u.fatal=o;function i(l){Fr={},s("",l||{})}u.reset=i;function s(l,c){if(l==="*")i(c);else{let d=Fr[l]||zs;Fr[l]={provider:c.provider||d.provider,minimalSeverity:c.minimalSeverity||d.minimalSeverity,logDateTime:c.logDateTime===void 0?d.logDateTime:c.logDateTime,logSourceLocation:c.logSourceLocation===void 0?d.logSourceLocation:c.logSourceLocation}}}u.set=s;function a(l){let c={};l.logLevel&&(c.minimalSeverity=l.logLevel),s("",c)}u.setWithEnv=a})(Wt||={});ye=Wt,Cn=class{constructor(e,n,t,o,i,s){this.category=e;this.name=n;this.startTime=t;this.endCallback=o;this.timer=i;this.ctx=s}async end(){return this.endCallback(this)}async checkTimer(){if(this.ctx===void 0||this.timer===void 0)throw new Error("No webgl timer found");return this.ctx.endTimer(),this.ctx.waitForQueryAndGetTime(this.timer)}},kn=class{constructor(e,n,t,o){this.category=e;this.name=n;this.startTime=t;this.endTime=o}},Dn=class{constructor(e,n,t){this._started=!1;this._flushPointer=0;this._started=!1,this._maxNumberEvents=e===void 0?1e4:e,this._flushBatchSize=n===void 0?10:n,this._flushIntervalInMilliseconds=t===void 0?5e3:t}static create(e){return e===void 0?new this:new this(e.maxNumberEvents,e.flushBatchSize,e.flushIntervalInMilliseconds)}start(){this._started=!0,this._timingEvents=[],this._flushTime=En(),this._flushPointer=0}stop(){for(this._started=!1;this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer])}event(e,n,t,o){let i=this._started?this.begin(e,n,o):void 0,s=!1,a=t();if(a&&typeof a.then=="function")return s=!0,new Promise((u,l)=>{a.then(async c=>{i&&await i.end(),u(c)},async c=>{i&&await i.end(),l(c)})});if(!s&&i){let u=i.end();if(u&&typeof u.then=="function")return new Promise((l,c)=>{u.then(()=>{l(a)},d=>{c(d)})})}return a}begin(e,n,t){if(!this._started)throw new Error("profiler is not started yet");if(t===void 0){let o=En();return this.flush(o),new Cn(e,n,o,i=>this.endSync(i))}else{let o=t.beginTimer();return new Cn(e,n,0,async i=>this.end(i),o,t)}}async end(e){let n=await e.checkTimer();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new kn(e.category,e.name,e.startTime,n)),this.flush(n))}endSync(e){let n=En();this._timingEvents.length<this._maxNumberEvents&&(this._timingEvents.push(new kn(e.category,e.name,e.startTime,n)),this.flush(n))}logOneEvent(e){ye.verbose(`Profiler.${e.category}`,`${(e.endTime-e.startTime).toFixed(2)}ms on event '${e.name}' at ${e.endTime.toFixed(2)}`)}flush(e){if(this._timingEvents.length-this._flushPointer>=this._flushBatchSize||e-this._flushTime>=this._flushIntervalInMilliseconds){for(let n=this._flushPointer;this._flushPointer<n+this._flushBatchSize&&this._flushPointer<this._timingEvents.length;this._flushPointer++)this.logOneEvent(this._timingEvents[this._flushPointer]);this._flushTime=En()}}get started(){return this._started}},En=typeof performance<"u"&&performance.now?()=>performance.now():Date.now});function Rs(r,e,n){for(let t of n){let o=t[0],i=t[1],s=t[2],a=t[3],u=t[4];if(r.opType===o){for(let l of e)if((l.domain===i||l.domain==="ai.onnx"&&i==="")&&Cb(l.version,s))return{opImpl:a,opInit:u}}}throw new TypeError(`cannot resolve operator '${r.opType}' with opsets: ${e.map(t=>`${t.domain||"ai.onnx"} v${t.version}`).join(", ")}`)}function Cb(r,e){if(e.endsWith("+")){let n=Number.parseInt(e.substring(0,e.length-1),10);return!isNaN(n)&&n<=r}else if(e.split("-").length===2){let n=e.split("-"),t=Number.parseInt(n[0],10),o=Number.parseInt(n[1],10);return!isNaN(t)&&!isNaN(o)&&t<=r&&r<=o}else return Number.parseInt(e,10)===r}var Ns=S(()=>{"use strict"});var Vs=Be(hi=>{"use strict";hi.__esModule=!0;var kb=function(){function r(e){if(!e)throw new TypeError("Invalid argument; `value` has no value.");this.value=r.EMPTY,e&&r.isGuid(e)&&(this.value=e)}return r.isGuid=function(e){var n=e.toString();return e&&(e instanceof r||r.validator.test(n))},r.create=function(){return new r([r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-"))},r.createEmpty=function(){return new r("emptyguid")},r.parse=function(e){return new r(e)},r.raw=function(){return[r.gen(2),r.gen(1),r.gen(1),r.gen(1),r.gen(3)].join("-")},r.gen=function(e){for(var n="",t=0;t<e;t++)n+=((1+Math.random())*65536|0).toString(16).substring(1);return n},r.prototype.equals=function(e){return r.isGuid(e)&&this.value===e.toString()},r.prototype.isEmpty=function(){return this.value===r.EMPTY},r.prototype.toString=function(){return this.value},r.prototype.toJSON=function(){return{value:this.value}},r.validator=new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$","i"),r.EMPTY="00000000-0000-0000-0000-000000000000",r}();hi.Guid=kb});function Te(r,e,n){this.low=r|0,this.high=e|0,this.unsigned=!!n}function je(r){return(r&&r.__isLong__)===!0}function Ms(r){var e=Math.clz32(r&-r);return r?31-e:e}function rr(r,e){var n,t,o;return e?(r>>>=0,(o=0<=r&&r<256)&&(t=Gs[r],t)?t:(n=ge(r,0,!0),o&&(Gs[r]=n),n)):(r|=0,(o=-128<=r&&r<128)&&(t=Fs[r],t)?t:(n=ge(r,r<0?-1:0,!1),o&&(Fs[r]=n),n))}function lt(r,e){if(isNaN(r))return e?zt:bt;if(e){if(r<0)return zt;if(r>=qs)return Xs}else{if(r<=-Ws)return Ye;if(r+1>=Ws)return js}return r<0?lt(-r,e).neg():ge(r%vr|0,r/vr|0,e)}function ge(r,e,n){return new Te(r,e,n)}function bi(r,e,n){if(r.length===0)throw Error("empty string");if(typeof e=="number"?(n=e,e=!1):e=!!e,r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return e?zt:bt;if(n=n||10,n<2||36<n)throw RangeError("radix");var t;if((t=r.indexOf("-"))>0)throw Error("interior hyphen");if(t===0)return bi(r.substring(1),e,n).neg();for(var o=lt(Bn(n,8)),i=bt,s=0;s<r.length;s+=8){var a=Math.min(8,r.length-s),u=parseInt(r.substring(s,s+a),n);if(a<8){var l=lt(Bn(n,a));i=i.mul(l).add(lt(u))}else i=i.mul(o),i=i.add(lt(u))}return i.unsigned=e,i}function yt(r,e){return typeof r=="number"?lt(r,e):typeof r=="string"?bi(r,e):ge(r.low,r.high,typeof e=="boolean"?e:r.unsigned)}var ut,Fs,Gs,Bn,Us,Db,vr,qs,Ws,Hs,bt,zt,Tr,Ks,gi,js,Xs,Ye,L,Rt,yi=S(()=>{ut=null;try{ut=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}Te.prototype.__isLong__;Object.defineProperty(Te.prototype,"__isLong__",{value:!0});Te.isLong=je;Fs={},Gs={};Te.fromInt=rr;Te.fromNumber=lt;Te.fromBits=ge;Bn=Math.pow;Te.fromString=bi;Te.fromValue=yt;Us=65536,Db=1<<24,vr=Us*Us,qs=vr*vr,Ws=qs/2,Hs=rr(Db),bt=rr(0);Te.ZERO=bt;zt=rr(0,!0);Te.UZERO=zt;Tr=rr(1);Te.ONE=Tr;Ks=rr(1,!0);Te.UONE=Ks;gi=rr(-1);Te.NEG_ONE=gi;js=ge(-1,2147483647,!1);Te.MAX_VALUE=js;Xs=ge(-1,-1,!0);Te.MAX_UNSIGNED_VALUE=Xs;Ye=ge(0,-2147483648,!1);Te.MIN_VALUE=Ye;L=Te.prototype;L.toInt=function(){return this.unsigned?this.low>>>0:this.low};L.toNumber=function(){return this.unsigned?(this.high>>>0)*vr+(this.low>>>0):this.high*vr+(this.low>>>0)};L.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(Ye)){var n=lt(e),t=this.div(n),o=t.mul(n).sub(this);return t.toString(e)+o.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var i=lt(Bn(e,6),this.unsigned),s=this,a="";;){var u=s.div(i),l=s.sub(u.mul(i)).toInt()>>>0,c=l.toString(e);if(s=u,s.isZero())return c+a;for(;c.length<6;)c="0"+c;a=""+c+a}};L.getHighBits=function(){return this.high};L.getHighBitsUnsigned=function(){return this.high>>>0};L.getLowBits=function(){return this.low};L.getLowBitsUnsigned=function(){return this.low>>>0};L.getNumBitsAbs=function(){if(this.isNegative())return this.eq(Ye)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};L.isZero=function(){return this.high===0&&this.low===0};L.eqz=L.isZero;L.isNegative=function(){return!this.unsigned&&this.high<0};L.isPositive=function(){return this.unsigned||this.high>=0};L.isOdd=function(){return(this.low&1)===1};L.isEven=function(){return(this.low&1)===0};L.equals=function(e){return je(e)||(e=yt(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};L.eq=L.equals;L.notEquals=function(e){return!this.eq(e)};L.neq=L.notEquals;L.ne=L.notEquals;L.lessThan=function(e){return this.comp(e)<0};L.lt=L.lessThan;L.lessThanOrEqual=function(e){return this.comp(e)<=0};L.lte=L.lessThanOrEqual;L.le=L.lessThanOrEqual;L.greaterThan=function(e){return this.comp(e)>0};L.gt=L.greaterThan;L.greaterThanOrEqual=function(e){return this.comp(e)>=0};L.gte=L.greaterThanOrEqual;L.ge=L.greaterThanOrEqual;L.compare=function(e){if(je(e)||(e=yt(e)),this.eq(e))return 0;var n=this.isNegative(),t=e.isNegative();return n&&!t?-1:!n&&t?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};L.comp=L.compare;L.negate=function(){return!this.unsigned&&this.eq(Ye)?Ye:this.not().add(Tr)};L.neg=L.negate;L.add=function(e){je(e)||(e=yt(e));var n=this.high>>>16,t=this.high&65535,o=this.low>>>16,i=this.low&65535,s=e.high>>>16,a=e.high&65535,u=e.low>>>16,l=e.low&65535,c=0,d=0,f=0,m=0;return m+=i+l,f+=m>>>16,m&=65535,f+=o+u,d+=f>>>16,f&=65535,d+=t+a,c+=d>>>16,d&=65535,c+=n+s,c&=65535,ge(f<<16|m,c<<16|d,this.unsigned)};L.subtract=function(e){return je(e)||(e=yt(e)),this.add(e.neg())};L.sub=L.subtract;L.multiply=function(e){if(this.isZero())return this;if(je(e)||(e=yt(e)),ut){var n=ut.mul(this.low,this.high,e.low,e.high);return ge(n,ut.get_high(),this.unsigned)}if(e.isZero())return this.unsigned?zt:bt;if(this.eq(Ye))return e.isOdd()?Ye:bt;if(e.eq(Ye))return this.isOdd()?Ye:bt;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Hs)&&e.lt(Hs))return lt(this.toNumber()*e.toNumber(),this.unsigned);var t=this.high>>>16,o=this.high&65535,i=this.low>>>16,s=this.low&65535,a=e.high>>>16,u=e.high&65535,l=e.low>>>16,c=e.low&65535,d=0,f=0,m=0,p=0;return p+=s*c,m+=p>>>16,p&=65535,m+=i*c,f+=m>>>16,m&=65535,m+=s*l,f+=m>>>16,m&=65535,f+=o*c,d+=f>>>16,f&=65535,f+=i*l,d+=f>>>16,f&=65535,f+=s*u,d+=f>>>16,f&=65535,d+=t*c+o*l+i*u+s*a,d&=65535,ge(m<<16|p,d<<16|f,this.unsigned)};L.mul=L.multiply;L.divide=function(e){if(je(e)||(e=yt(e)),e.isZero())throw Error("division by zero");if(ut){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?ut.div_u:ut.div_s)(this.low,this.high,e.low,e.high);return ge(n,ut.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?zt:bt;var t,o,i;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return zt;if(e.gt(this.shru(1)))return Ks;i=zt}else{if(this.eq(Ye)){if(e.eq(Tr)||e.eq(gi))return Ye;if(e.eq(Ye))return Tr;var s=this.shr(1);return t=s.div(e).shl(1),t.eq(bt)?e.isNegative()?Tr:gi:(o=this.sub(e.mul(t)),i=t.add(o.div(e)),i)}else if(e.eq(Ye))return this.unsigned?zt:bt;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();i=bt}for(o=this;o.gte(e);){t=Math.max(1,Math.floor(o.toNumber()/e.toNumber()));for(var a=Math.ceil(Math.log(t)/Math.LN2),u=a<=48?1:Bn(2,a-48),l=lt(t),c=l.mul(e);c.isNegative()||c.gt(o);)t-=u,l=lt(t,this.unsigned),c=l.mul(e);l.isZero()&&(l=Tr),i=i.add(l),o=o.sub(c)}return i};L.div=L.divide;L.modulo=function(e){if(je(e)||(e=yt(e)),ut){var n=(this.unsigned?ut.rem_u:ut.rem_s)(this.low,this.high,e.low,e.high);return ge(n,ut.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};L.mod=L.modulo;L.rem=L.modulo;L.not=function(){return ge(~this.low,~this.high,this.unsigned)};L.countLeadingZeros=function(){return this.high?Math.clz32(this.high):Math.clz32(this.low)+32};L.clz=L.countLeadingZeros;L.countTrailingZeros=function(){return this.low?Ms(this.low):Ms(this.high)+32};L.ctz=L.countTrailingZeros;L.and=function(e){return je(e)||(e=yt(e)),ge(this.low&e.low,this.high&e.high,this.unsigned)};L.or=function(e){return je(e)||(e=yt(e)),ge(this.low|e.low,this.high|e.high,this.unsigned)};L.xor=function(e){return je(e)||(e=yt(e)),ge(this.low^e.low,this.high^e.high,this.unsigned)};L.shiftLeft=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):ge(0,this.low<<e-32,this.unsigned)};L.shl=L.shiftLeft;L.shiftRight=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):ge(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};L.shr=L.shiftRight;L.shiftRightUnsigned=function(e){return je(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?ge(this.low>>>e|this.high<<32-e,this.high>>>e,this.unsigned):e===32?ge(this.high,0,this.unsigned):ge(this.high>>>e-32,0,this.unsigned)};L.shru=L.shiftRightUnsigned;L.shr_u=L.shiftRightUnsigned;L.rotateLeft=function(e){var n;return je(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ge(this.high,this.low,this.unsigned):e<32?(n=32-e,ge(this.low<<e|this.high>>>n,this.high<<e|this.low>>>n,this.unsigned)):(e-=32,n=32-e,ge(this.high<<e|this.low>>>n,this.low<<e|this.high>>>n,this.unsigned))};L.rotl=L.rotateLeft;L.rotateRight=function(e){var n;return je(e)&&(e=e.toInt()),(e&=63)===0?this:e===32?ge(this.high,this.low,this.unsigned):e<32?(n=32-e,ge(this.high<<n|this.low>>>e,this.low<<n|this.high>>>e,this.unsigned)):(e-=32,n=32-e,ge(this.low<<n|this.high>>>e,this.high<<n|this.low>>>e,this.unsigned))};L.rotr=L.rotateRight;L.toSigned=function(){return this.unsigned?ge(this.low,this.high,!1):this};L.toUnsigned=function(){return this.unsigned?this:ge(this.low,this.high,!0)};L.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};L.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};L.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Te.fromBytes=function(e,n,t){return t?Te.fromBytesLE(e,n):Te.fromBytesBE(e,n)};Te.fromBytesLE=function(e,n){return new Te(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Te.fromBytesBE=function(e,n){return new Te(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};Rt=Te});var A,Ln=S(()=>{A={};A.Offset;A.Table;A.SIZEOF_SHORT=2;A.SIZEOF_INT=4;A.FILE_IDENTIFIER_LENGTH=4;A.SIZE_PREFIX_LENGTH=4;A.Encoding={UTF8_BYTES:1,UTF16_STRING:2};A.int32=new Int32Array(2);A.float32=new Float32Array(A.int32.buffer);A.float64=new Float64Array(A.int32.buffer);A.isLittleEndian=new Uint16Array(new Uint8Array([1,0]).buffer)[0]===1;A.Long=function(r,e){this.low=r|0,this.high=e|0};A.Long.create=function(r,e){return r==0&&e==0?A.Long.ZERO:new A.Long(r,e)};A.Long.prototype.toFloat64=function(){return(this.low>>>0)+this.high*4294967296};A.Long.prototype.equals=function(r){return this.low==r.low&&this.high==r.high};A.Long.ZERO=new A.Long(0,0);A.Builder=function(r){if(r)var e=r;else var e=1024;this.bb=A.ByteBuffer.allocate(e),this.space=e,this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};A.Builder.prototype.clear=function(){this.bb.clear(),this.space=this.bb.capacity(),this.minalign=1,this.vtable=null,this.vtable_in_use=0,this.isNested=!1,this.object_start=0,this.vtables=[],this.vector_num_elems=0,this.force_defaults=!1};A.Builder.prototype.forceDefaults=function(r){this.force_defaults=r};A.Builder.prototype.dataBuffer=function(){return this.bb};A.Builder.prototype.asUint8Array=function(){return this.bb.bytes().subarray(this.bb.position(),this.bb.position()+this.offset())};A.Builder.prototype.prep=function(r,e){r>this.minalign&&(this.minalign=r);for(var n=~(this.bb.capacity()-this.space+e)+1&r-1;this.space<n+r+e;){var t=this.bb.capacity();this.bb=A.Builder.growByteBuffer(this.bb),this.space+=this.bb.capacity()-t}this.pad(n)};A.Builder.prototype.pad=function(r){for(var e=0;e<r;e++)this.bb.writeInt8(--this.space,0)};A.Builder.prototype.writeInt8=function(r){this.bb.writeInt8(this.space-=1,r)};A.Builder.prototype.writeInt16=function(r){this.bb.writeInt16(this.space-=2,r)};A.Builder.prototype.writeInt32=function(r){this.bb.writeInt32(this.space-=4,r)};A.Builder.prototype.writeInt64=function(r){this.bb.writeInt64(this.space-=8,r)};A.Builder.prototype.writeFloat32=function(r){this.bb.writeFloat32(this.space-=4,r)};A.Builder.prototype.writeFloat64=function(r){this.bb.writeFloat64(this.space-=8,r)};A.Builder.prototype.addInt8=function(r){this.prep(1,0),this.writeInt8(r)};A.Builder.prototype.addInt16=function(r){this.prep(2,0),this.writeInt16(r)};A.Builder.prototype.addInt32=function(r){this.prep(4,0),this.writeInt32(r)};A.Builder.prototype.addInt64=function(r){this.prep(8,0),this.writeInt64(r)};A.Builder.prototype.addFloat32=function(r){this.prep(4,0),this.writeFloat32(r)};A.Builder.prototype.addFloat64=function(r){this.prep(8,0),this.writeFloat64(r)};A.Builder.prototype.addFieldInt8=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt8(e),this.slot(r))};A.Builder.prototype.addFieldInt16=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt16(e),this.slot(r))};A.Builder.prototype.addFieldInt32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addInt32(e),this.slot(r))};A.Builder.prototype.addFieldInt64=function(r,e,n){(this.force_defaults||!e.equals(n))&&(this.addInt64(e),this.slot(r))};A.Builder.prototype.addFieldFloat32=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat32(e),this.slot(r))};A.Builder.prototype.addFieldFloat64=function(r,e,n){(this.force_defaults||e!=n)&&(this.addFloat64(e),this.slot(r))};A.Builder.prototype.addFieldOffset=function(r,e,n){(this.force_defaults||e!=n)&&(this.addOffset(e),this.slot(r))};A.Builder.prototype.addFieldStruct=function(r,e,n){e!=n&&(this.nested(e),this.slot(r))};A.Builder.prototype.nested=function(r){if(r!=this.offset())throw new Error("FlatBuffers: struct must be serialized inline.")};A.Builder.prototype.notNested=function(){if(this.isNested)throw new Error("FlatBuffers: object serialization must not be nested.")};A.Builder.prototype.slot=function(r){this.vtable[r]=this.offset()};A.Builder.prototype.offset=function(){return this.bb.capacity()-this.space};A.Builder.growByteBuffer=function(r){var e=r.capacity();if(e&3221225472)throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");var n=e<<1,t=A.ByteBuffer.allocate(n);return t.setPosition(n-e),t.bytes().set(r.bytes(),n-e),t};A.Builder.prototype.addOffset=function(r){this.prep(A.SIZEOF_INT,0),this.writeInt32(this.offset()-r+A.SIZEOF_INT)};A.Builder.prototype.startObject=function(r){this.notNested(),this.vtable==null&&(this.vtable=[]),this.vtable_in_use=r;for(var e=0;e<r;e++)this.vtable[e]=0;this.isNested=!0,this.object_start=this.offset()};A.Builder.prototype.endObject=function(){if(this.vtable==null||!this.isNested)throw new Error("FlatBuffers: endObject called without startObject");this.addInt32(0);for(var r=this.offset(),e=this.vtable_in_use-1;e>=0&&this.vtable[e]==0;e--);for(var n=e+1;e>=0;e--)this.addInt16(this.vtable[e]!=0?r-this.vtable[e]:0);var t=2;this.addInt16(r-this.object_start);var o=(n+t)*A.SIZEOF_SHORT;this.addInt16(o);var i=0,s=this.space;e:for(e=0;e<this.vtables.length;e++){var a=this.bb.capacity()-this.vtables[e];if(o==this.bb.readInt16(a)){for(var u=A.SIZEOF_SHORT;u<o;u+=A.SIZEOF_SHORT)if(this.bb.readInt16(s+u)!=this.bb.readInt16(a+u))continue e;i=this.vtables[e];break}}return i?(this.space=this.bb.capacity()-r,this.bb.writeInt32(this.space,i-r)):(this.vtables.push(this.offset()),this.bb.writeInt32(this.bb.capacity()-r,this.offset()-r)),this.isNested=!1,r};A.Builder.prototype.finish=function(r,e,n){var t=n?A.SIZE_PREFIX_LENGTH:0;if(e){var o=e;if(this.prep(this.minalign,A.SIZEOF_INT+A.FILE_IDENTIFIER_LENGTH+t),o.length!=A.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+A.FILE_IDENTIFIER_LENGTH);for(var i=A.FILE_IDENTIFIER_LENGTH-1;i>=0;i--)this.writeInt8(o.charCodeAt(i))}this.prep(this.minalign,A.SIZEOF_INT+t),this.addOffset(r),t&&this.addInt32(this.bb.capacity()-this.space),this.bb.setPosition(this.space)};A.Builder.prototype.finishSizePrefixed=function(r,e){this.finish(r,e,!0)};A.Builder.prototype.requiredField=function(r,e){var n=this.bb.capacity()-r,t=n-this.bb.readInt32(n),o=this.bb.readInt16(t+e)!=0;if(!o)throw new Error("FlatBuffers: field "+e+" must be set")};A.Builder.prototype.startVector=function(r,e,n){this.notNested(),this.vector_num_elems=e,this.prep(A.SIZEOF_INT,r*e),this.prep(n,r*e)};A.Builder.prototype.endVector=function(){return this.writeInt32(this.vector_num_elems),this.offset()};A.Builder.prototype.createString=function(r){if(r instanceof Uint8Array)var e=r;else for(var e=[],n=0;n<r.length;){var t,o=r.charCodeAt(n++);if(o<55296||o>=56320)t=o;else{var i=r.charCodeAt(n++);t=(o<<10)+i+(65536-56623104-56320)}t<128?e.push(t):(t<2048?e.push(t>>6&31|192):(t<65536?e.push(t>>12&15|224):e.push(t>>18&7|240,t>>12&63|128),e.push(t>>6&63|128)),e.push(t&63|128))}this.addInt8(0),this.startVector(1,e.length,1),this.bb.setPosition(this.space-=e.length);for(var n=0,s=this.space,a=this.bb.bytes();n<e.length;n++)a[s++]=e[n];return this.endVector()};A.Builder.prototype.createLong=function(r,e){return A.Long.create(r,e)};A.ByteBuffer=function(r){this.bytes_=r,this.position_=0};A.ByteBuffer.allocate=function(r){return new A.ByteBuffer(new Uint8Array(r))};A.ByteBuffer.prototype.clear=function(){this.position_=0};A.ByteBuffer.prototype.bytes=function(){return this.bytes_};A.ByteBuffer.prototype.position=function(){return this.position_};A.ByteBuffer.prototype.setPosition=function(r){this.position_=r};A.ByteBuffer.prototype.capacity=function(){return this.bytes_.length};A.ByteBuffer.prototype.readInt8=function(r){return this.readUint8(r)<<24>>24};A.ByteBuffer.prototype.readUint8=function(r){return this.bytes_[r]};A.ByteBuffer.prototype.readInt16=function(r){return this.readUint16(r)<<16>>16};A.ByteBuffer.prototype.readUint16=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8};A.ByteBuffer.prototype.readInt32=function(r){return this.bytes_[r]|this.bytes_[r+1]<<8|this.bytes_[r+2]<<16|this.bytes_[r+3]<<24};A.ByteBuffer.prototype.readUint32=function(r){return this.readInt32(r)>>>0};A.ByteBuffer.prototype.readInt64=function(r){return new A.Long(this.readInt32(r),this.readInt32(r+4))};A.ByteBuffer.prototype.readUint64=function(r){return new A.Long(this.readUint32(r),this.readUint32(r+4))};A.ByteBuffer.prototype.readFloat32=function(r){return A.int32[0]=this.readInt32(r),A.float32[0]};A.ByteBuffer.prototype.readFloat64=function(r){return A.int32[A.isLittleEndian?0:1]=this.readInt32(r),A.int32[A.isLittleEndian?1:0]=this.readInt32(r+4),A.float64[0]};A.ByteBuffer.prototype.writeInt8=function(r,e){this.bytes_[r]=e};A.ByteBuffer.prototype.writeUint8=function(r,e){this.bytes_[r]=e};A.ByteBuffer.prototype.writeInt16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};A.ByteBuffer.prototype.writeUint16=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8};A.ByteBuffer.prototype.writeInt32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};A.ByteBuffer.prototype.writeUint32=function(r,e){this.bytes_[r]=e,this.bytes_[r+1]=e>>8,this.bytes_[r+2]=e>>16,this.bytes_[r+3]=e>>24};A.ByteBuffer.prototype.writeInt64=function(r,e){this.writeInt32(r,e.low),this.writeInt32(r+4,e.high)};A.ByteBuffer.prototype.writeUint64=function(r,e){this.writeUint32(r,e.low),this.writeUint32(r+4,e.high)};A.ByteBuffer.prototype.writeFloat32=function(r,e){A.float32[0]=e,this.writeInt32(r,A.int32[0])};A.ByteBuffer.prototype.writeFloat64=function(r,e){A.float64[0]=e,this.writeInt32(r,A.int32[A.isLittleEndian?0:1]),this.writeInt32(r+4,A.int32[A.isLittleEndian?1:0])};A.ByteBuffer.prototype.getBufferIdentifier=function(){if(this.bytes_.length<this.position_+A.SIZEOF_INT+A.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");for(var r="",e=0;e<A.FILE_IDENTIFIER_LENGTH;e++)r+=String.fromCharCode(this.readInt8(this.position_+A.SIZEOF_INT+e));return r};A.ByteBuffer.prototype.__offset=function(r,e){var n=r-this.readInt32(r);return e<this.readInt16(n)?this.readInt16(n+e):0};A.ByteBuffer.prototype.__union=function(r,e){return r.bb_pos=e+this.readInt32(e),r.bb=this,r};A.ByteBuffer.prototype.__string=function(r,e){r+=this.readInt32(r);var n=this.readInt32(r),t="",o=0;if(r+=A.SIZEOF_INT,e===A.Encoding.UTF8_BYTES)return this.bytes_.subarray(r,r+n);for(;o<n;){var i,s=this.readUint8(r+o++);if(s<192)i=s;else{var a=this.readUint8(r+o++);if(s<224)i=(s&31)<<6|a&63;else{var u=this.readUint8(r+o++);if(s<240)i=(s&15)<<12|(a&63)<<6|u&63;else{var l=this.readUint8(r+o++);i=(s&7)<<18|(a&63)<<12|(u&63)<<6|l&63}}}i<65536?t+=String.fromCharCode(i):(i-=65536,t+=String.fromCharCode((i>>10)+55296,(i&1024-1)+56320))}return t};A.ByteBuffer.prototype.__indirect=function(r){return r+this.readInt32(r)};A.ByteBuffer.prototype.__vector=function(r){return r+this.readInt32(r)+A.SIZEOF_INT};A.ByteBuffer.prototype.__vector_len=function(r){return this.readInt32(r+this.readInt32(r))};A.ByteBuffer.prototype.__has_identifier=function(r){if(r.length!=A.FILE_IDENTIFIER_LENGTH)throw new Error("FlatBuffers: file identifier must be length "+A.FILE_IDENTIFIER_LENGTH);for(var e=0;e<A.FILE_IDENTIFIER_LENGTH;e++)if(r.charCodeAt(e)!=this.readInt8(this.position_+A.SIZEOF_INT+e))return!1;return!0};A.ByteBuffer.prototype.createLong=function(r,e){return A.Long.create(r,e)}});var W,Gr=S(()=>{"use strict";Ln();(e=>{let r;(t=>{let n;(i=>{let o;(x=>(x[x.UNDEFINED=0]="UNDEFINED",x[x.FLOAT=1]="FLOAT",x[x.INT=2]="INT",x[x.STRING=3]="STRING",x[x.TENSOR=4]="TENSOR",x[x.GRAPH=5]="GRAPH",x[x.FLOATS=6]="FLOATS",x[x.INTS=7]="INTS",x[x.STRINGS=8]="STRINGS",x[x.TENSORS=9]="TENSORS",x[x.GRAPHS=10]="GRAPHS",x[x.SPARSE_TENSOR=11]="SPARSE_TENSOR",x[x.SPARSE_TENSORS=12]="SPARSE_TENSORS"))(o=i.AttributeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{let o;(l=>(l[l.UNKNOWN=0]="UNKNOWN",l[l.VALUE=1]="VALUE",l[l.PARAM=2]="PARAM"))(o=i.DimensionValueType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{let o;(C=>(C[C.UNDEFINED=0]="UNDEFINED",C[C.FLOAT=1]="FLOAT",C[C.UINT8=2]="UINT8",C[C.INT8=3]="INT8",C[C.UINT16=4]="UINT16",C[C.INT16=5]="INT16",C[C.INT32=6]="INT32",C[C.INT64=7]="INT64",C[C.STRING=8]="STRING",C[C.BOOL=9]="BOOL",C[C.FLOAT16=10]="FLOAT16",C[C.DOUBLE=11]="DOUBLE",C[C.UINT32=12]="UINT32",C[C.UINT64=13]="UINT64",C[C.COMPLEX64=14]="COMPLEX64",C[C.COMPLEX128=15]="COMPLEX128",C[C.BFLOAT16=16]="BFLOAT16",C[C.FLOAT8E4M3FN=17]="FLOAT8E4M3FN",C[C.FLOAT8E4M3FNUZ=18]="FLOAT8E4M3FNUZ",C[C.FLOAT8E5M2=19]="FLOAT8E5M2",C[C.FLOAT8E5M2FNUZ=20]="FLOAT8E5M2FNUZ"))(o=i.TensorDataType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{let o;(u=>(u[u.Primitive=0]="Primitive",u[u.Fused=1]="Fused"))(o=i.NodeType||={})})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{let o;(c=>(c[c.NONE=0]="NONE",c[c.tensor_type=1]="tensor_type",c[c.sequence_type=2]="sequence_type",c[c.map_type=3]="map_type"))(o=i.TypeInfoValue||={})})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsShape(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dim(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Dimension).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}dimLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}static startShape(a){a.startObject(1)}static addDim(a,u){a.addFieldOffset(0,u,0)}static createDimVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startDimVector(a,u){a.startVector(4,u,4)}static endShape(a){return a.endObject()}static createShape(a,u){return o.startShape(a),o.addDim(a,u),o.endShape(a)}}i.Shape=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimension(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimension(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}value(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.DimensionValue).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}denotation(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimension(a){a.startObject(2)}static addValue(a,u){a.addFieldOffset(0,u,0)}static addDenotation(a,u){a.addFieldOffset(1,u,0)}static endDimension(a){return a.endObject()}static createDimension(a,u,l){return o.startDimension(a),o.addValue(a,u),o.addDenotation(a,l),o.endDimension(a)}}i.Dimension=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsDimensionValue(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsDimensionValue(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}dimType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt8(this.bb_pos+a):0}dimValue(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}dimParam(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}static startDimensionValue(a){a.startObject(3)}static addDimType(a,u){a.addFieldInt8(0,u,0)}static addDimValue(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static addDimParam(a,u){a.addFieldOffset(2,u,0)}static endDimensionValue(a){return a.endObject()}static createDimensionValue(a,u,l,c){return o.startDimensionValue(a),o.addDimType(a,u),o.addDimValue(a,l),o.addDimParam(a,c),o.endDimensionValue(a)}}i.DimensionValue=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensorTypeAndShape(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensorTypeAndShape(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}shape(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Shape).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startTensorTypeAndShape(a){a.startObject(2)}static addElemType(a,u){a.addFieldInt32(0,u,0)}static addShape(a,u){a.addFieldOffset(1,u,0)}static endTensorTypeAndShape(a){return a.endObject()}static createTensorTypeAndShape(a,u,l){return o.startTensorTypeAndShape(a),o.addElemType(a,u),o.addShape(a,l),o.endTensorTypeAndShape(a)}}i.TensorTypeAndShape=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsMapType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsMapType(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}keyType(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt32(this.bb_pos+a):0}valueType(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startMapType(a){a.startObject(2)}static addKeyType(a,u){a.addFieldInt32(0,u,0)}static addValueType(a,u){a.addFieldOffset(1,u,0)}static endMapType(a){return a.endObject()}static createMapType(a,u,l){return o.startMapType(a),o.addKeyType(a,u),o.addValueType(a,l),o.endMapType(a)}}i.MapType=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSequenceType(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSequenceType(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}elemType(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSequenceType(a){a.startObject(1)}static addElemType(a,u){a.addFieldOffset(0,u,0)}static endSequenceType(a){return a.endObject()}static createSequenceType(a,u){return o.startSequenceType(a),o.addElemType(a,u),o.endSequenceType(a)}}i.SequenceType=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}nodeIndex(){return this.bb.readUint32(this.bb_pos)}srcArgIndex(){return this.bb.readInt32(this.bb_pos+4)}dstArgIndex(){return this.bb.readInt32(this.bb_pos+8)}static createEdgeEnd(a,u,l,c){return a.prep(4,12),a.writeInt32(c),a.writeInt32(l),a.writeInt32(u),a.offset()}}i.EdgeEnd=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNodeEdge(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNodeEdge(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndex(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readUint32(this.bb_pos+a):0}inputEdges(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}inputEdgesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}outputEdges(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.EdgeEnd).__init(this.bb.__vector(this.bb_pos+l)+a*12,this.bb):null}outputEdgesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNodeEdge(a){a.startObject(3)}static addNodeIndex(a,u){a.addFieldInt32(0,u,0)}static addInputEdges(a,u){a.addFieldOffset(1,u,0)}static startInputEdgesVector(a,u){a.startVector(12,u,4)}static addOutputEdges(a,u){a.addFieldOffset(2,u,0)}static startOutputEdgesVector(a,u){a.startVector(12,u,4)}static endNodeEdge(a){return a.endObject()}static createNodeEdge(a,u,l,c){return o.startNodeEdge(a),o.addNodeIndex(a,u),o.addInputEdges(a,l),o.addOutputEdges(a,c),o.endNodeEdge(a)}}i.NodeEdge=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsNode(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsNode(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}sinceVersion(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}index(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readUint32(this.bb_pos+a):0}opType(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.readInt32(this.bb_pos+a):0}executionProviderType(a){let u=this.bb.__offset(this.bb_pos,18);return u?this.bb.__string(this.bb_pos+u,a):null}inputs(a,u){let l=this.bb.__offset(this.bb_pos,20);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,22);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}attributes(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?(u||new e.experimental.fbs.Attribute).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}attributesLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCounts(a){let u=this.bb.__offset(this.bb_pos,26);return u?this.bb.readInt32(this.bb.__vector(this.bb_pos+u)+a*4):0}inputArgCountsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}inputArgCountsArray(){let a=this.bb.__offset(this.bb_pos,26);return a?new Int32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}implicitInputs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}implicitInputsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startNode(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDomain(a,u){a.addFieldOffset(2,u,0)}static addSinceVersion(a,u){a.addFieldInt32(3,u,0)}static addIndex(a,u){a.addFieldInt32(4,u,0)}static addOpType(a,u){a.addFieldOffset(5,u,0)}static addType(a,u){a.addFieldInt32(6,u,0)}static addExecutionProviderType(a,u){a.addFieldOffset(7,u,0)}static addInputs(a,u){a.addFieldOffset(8,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(9,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addAttributes(a,u){a.addFieldOffset(10,u,0)}static createAttributesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startAttributesVector(a,u){a.startVector(4,u,4)}static addInputArgCounts(a,u){a.addFieldOffset(11,u,0)}static createInputArgCountsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startInputArgCountsVector(a,u){a.startVector(4,u,4)}static addImplicitInputs(a,u){a.addFieldOffset(12,u,0)}static createImplicitInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startImplicitInputsVector(a,u){a.startVector(4,u,4)}static endNode(a){return a.endObject()}static createNode(a,u,l,c,d,f,m,p,h,b,y,g,x,_){return o.startNode(a),o.addName(a,u),o.addDocString(a,l),o.addDomain(a,c),o.addSinceVersion(a,d),o.addIndex(a,f),o.addOpType(a,m),o.addType(a,p),o.addExecutionProviderType(a,h),o.addInputs(a,b),o.addOutputs(a,y),o.addAttributes(a,g),o.addInputArgCounts(a,x),o.addImplicitInputs(a,_),o.endNode(a)}}i.Node=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsValueInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsValueInfo(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.TypeInfo).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startValueInfo(a){a.startObject(3)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldOffset(2,u,0)}static endValueInfo(a){return a.endObject()}static createValueInfo(a,u,l,c){return o.startValueInfo(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,c),o.endValueInfo(a)}}i.ValueInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTypeInfo(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTypeInfo(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}denotation(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}valueType(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readUint8(this.bb_pos+a):0}value(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__union(a,this.bb_pos+u):null}static startTypeInfo(a){a.startObject(3)}static addDenotation(a,u){a.addFieldOffset(0,u,0)}static addValueType(a,u){a.addFieldInt8(1,u,0)}static addValue(a,u){a.addFieldOffset(2,u,0)}static endTypeInfo(a){return a.endObject()}static createTypeInfo(a,u,l,c){return o.startTypeInfo(a),o.addDenotation(a,u),o.addValueType(a,l),o.addValue(a,c),o.endTypeInfo(a)}}i.TypeInfo=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsOperatorSetId(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsOperatorSetId(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}domain(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}version(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}static startOperatorSetId(a){a.startObject(2)}static addDomain(a,u){a.addFieldOffset(0,u,0)}static addVersion(a,u){a.addFieldInt64(1,u,a.createLong(0,0))}static endOperatorSetId(a){return a.endObject()}static createOperatorSetId(a,u,l){return o.startOperatorSetId(a),o.addDomain(a,u),o.addVersion(a,l),o.endOperatorSetId(a)}}i.OperatorSetId=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsTensor(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}dataType(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readInt32(this.bb_pos+a):0}rawData(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.readUint8(this.bb.__vector(this.bb_pos+u)+a):0}rawDataLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}rawDataArray(){let a=this.bb.__offset(this.bb_pos,12);return a?new Uint8Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}stringData(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringDataLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}static startTensor(a){a.startObject(6)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static addDataType(a,u){a.addFieldInt32(3,u,0)}static addRawData(a,u){a.addFieldOffset(4,u,0)}static createRawDataVector(a,u){a.startVector(1,u.length,1);for(let l=u.length-1;l>=0;l--)a.addInt8(u[l]);return a.endVector()}static startRawDataVector(a,u){a.startVector(1,u,1)}static addStringData(a,u){a.addFieldOffset(5,u,0)}static createStringDataVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringDataVector(a,u){a.startVector(4,u,4)}static endTensor(a){return a.endObject()}static createTensor(a,u,l,c,d,f,m){return o.startTensor(a),o.addName(a,u),o.addDocString(a,l),o.addDims(a,c),o.addDataType(a,d),o.addRawData(a,f),o.addStringData(a,m),o.endTensor(a)}}i.Tensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSparseTensor(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSparseTensor(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}values(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}indices(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}dims(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}dimsLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSparseTensor(a){a.startObject(3)}static addValues(a,u){a.addFieldOffset(0,u,0)}static addIndices(a,u){a.addFieldOffset(1,u,0)}static addDims(a,u){a.addFieldOffset(2,u,0)}static createDimsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startDimsVector(a,u){a.startVector(8,u,8)}static endSparseTensor(a){return a.endObject()}static createSparseTensor(a,u,l,c){return o.startSparseTensor(a),o.addValues(a,u),o.addIndices(a,l),o.addDims(a,c),o.endSparseTensor(a)}}i.SparseTensor=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsAttribute(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsAttribute(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}name(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}docString(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.__string(this.bb_pos+u,a):null}type(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.readInt32(this.bb_pos+a):0}f(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readFloat32(this.bb_pos+a):0}i(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}s(a){let u=this.bb.__offset(this.bb_pos,14);return u?this.bb.__string(this.bb_pos+u,a):null}t(a){let u=this.bb.__offset(this.bb_pos,16);return u?(a||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}g(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}floats(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.readFloat32(this.bb.__vector(this.bb_pos+u)+a*4):0}floatsLength(){let a=this.bb.__offset(this.bb_pos,20);return a?this.bb.__vector_len(this.bb_pos+a):0}floatsArray(){let a=this.bb.__offset(this.bb_pos,20);return a?new Float32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}ints(a){let u=this.bb.__offset(this.bb_pos,22);return u?this.bb.readInt64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}intsLength(){let a=this.bb.__offset(this.bb_pos,22);return a?this.bb.__vector_len(this.bb_pos+a):0}strings(a,u){let l=this.bb.__offset(this.bb_pos,24);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}stringsLength(){let a=this.bb.__offset(this.bb_pos,24);return a?this.bb.__vector_len(this.bb_pos+a):0}tensors(a,u){let l=this.bb.__offset(this.bb_pos,26);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}tensorsLength(){let a=this.bb.__offset(this.bb_pos,26);return a?this.bb.__vector_len(this.bb_pos+a):0}graphs(a,u){let l=this.bb.__offset(this.bb_pos,28);return l?(u||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}graphsLength(){let a=this.bb.__offset(this.bb_pos,28);return a?this.bb.__vector_len(this.bb_pos+a):0}static startAttribute(a){a.startObject(13)}static addName(a,u){a.addFieldOffset(0,u,0)}static addDocString(a,u){a.addFieldOffset(1,u,0)}static addType(a,u){a.addFieldInt32(2,u,0)}static addF(a,u){a.addFieldFloat32(3,u,0)}static addI(a,u){a.addFieldInt64(4,u,a.createLong(0,0))}static addS(a,u){a.addFieldOffset(5,u,0)}static addT(a,u){a.addFieldOffset(6,u,0)}static addG(a,u){a.addFieldOffset(7,u,0)}static addFloats(a,u){a.addFieldOffset(8,u,0)}static createFloatsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addFloat32(u[l]);return a.endVector()}static startFloatsVector(a,u){a.startVector(4,u,4)}static addInts(a,u){a.addFieldOffset(9,u,0)}static createIntsVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startIntsVector(a,u){a.startVector(8,u,8)}static addStrings(a,u){a.addFieldOffset(10,u,0)}static createStringsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startStringsVector(a,u){a.startVector(4,u,4)}static addTensors(a,u){a.addFieldOffset(11,u,0)}static createTensorsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startTensorsVector(a,u){a.startVector(4,u,4)}static addGraphs(a,u){a.addFieldOffset(12,u,0)}static createGraphsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startGraphsVector(a,u){a.startVector(4,u,4)}static endAttribute(a){return a.endObject()}static createAttribute(a,u,l,c,d,f,m,p,h,b,y,g,x,_){return o.startAttribute(a),o.addName(a,u),o.addDocString(a,l),o.addType(a,c),o.addF(a,d),o.addI(a,f),o.addS(a,m),o.addT(a,p),o.addG(a,h),o.addFloats(a,b),o.addInts(a,y),o.addStrings(a,g),o.addTensors(a,x),o.addGraphs(a,_),o.endAttribute(a)}}i.Attribute=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsGraph(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsGraph(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}initializers(a,u){let l=this.bb.__offset(this.bb_pos,4);return l?(u||new e.experimental.fbs.Tensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}initializersLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeArgs(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.ValueInfo).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeArgsLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}nodes(a,u){let l=this.bb.__offset(this.bb_pos,8);return l?(u||new e.experimental.fbs.Node).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodesLength(){let a=this.bb.__offset(this.bb_pos,8);return a?this.bb.__vector_len(this.bb_pos+a):0}maxNodeIndex(){let a=this.bb.__offset(this.bb_pos,10);return a?this.bb.readUint32(this.bb_pos+a):0}nodeEdges(a,u){let l=this.bb.__offset(this.bb_pos,12);return l?(u||new e.experimental.fbs.NodeEdge).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}nodeEdgesLength(){let a=this.bb.__offset(this.bb_pos,12);return a?this.bb.__vector_len(this.bb_pos+a):0}inputs(a,u){let l=this.bb.__offset(this.bb_pos,14);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}inputsLength(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.__vector_len(this.bb_pos+a):0}outputs(a,u){let l=this.bb.__offset(this.bb_pos,16);return l?this.bb.__string(this.bb.__vector(this.bb_pos+l)+a*4,u):null}outputsLength(){let a=this.bb.__offset(this.bb_pos,16);return a?this.bb.__vector_len(this.bb_pos+a):0}sparseInitializers(a,u){let l=this.bb.__offset(this.bb_pos,18);return l?(u||new e.experimental.fbs.SparseTensor).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}sparseInitializersLength(){let a=this.bb.__offset(this.bb_pos,18);return a?this.bb.__vector_len(this.bb_pos+a):0}static startGraph(a){a.startObject(8)}static addInitializers(a,u){a.addFieldOffset(0,u,0)}static createInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInitializersVector(a,u){a.startVector(4,u,4)}static addNodeArgs(a,u){a.addFieldOffset(1,u,0)}static createNodeArgsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeArgsVector(a,u){a.startVector(4,u,4)}static addNodes(a,u){a.addFieldOffset(2,u,0)}static createNodesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodesVector(a,u){a.startVector(4,u,4)}static addMaxNodeIndex(a,u){a.addFieldInt32(3,u,0)}static addNodeEdges(a,u){a.addFieldOffset(4,u,0)}static createNodeEdgesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startNodeEdgesVector(a,u){a.startVector(4,u,4)}static addInputs(a,u){a.addFieldOffset(5,u,0)}static createInputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startInputsVector(a,u){a.startVector(4,u,4)}static addOutputs(a,u){a.addFieldOffset(6,u,0)}static createOutputsVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOutputsVector(a,u){a.startVector(4,u,4)}static addSparseInitializers(a,u){a.addFieldOffset(7,u,0)}static createSparseInitializersVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSparseInitializersVector(a,u){a.startVector(4,u,4)}static endGraph(a){return a.endObject()}static createGraph(a,u,l,c,d,f,m,p,h){return o.startGraph(a),o.addInitializers(a,u),o.addNodeArgs(a,l),o.addNodes(a,c),o.addMaxNodeIndex(a,d),o.addNodeEdges(a,f),o.addInputs(a,m),o.addOutputs(a,p),o.addSparseInitializers(a,h),o.endGraph(a)}}i.Graph=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsModel(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsModel(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}irVersion(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}opsetImport(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.OperatorSetId).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}opsetImportLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}producerName(a){let u=this.bb.__offset(this.bb_pos,8);return u?this.bb.__string(this.bb_pos+u,a):null}producerVersion(a){let u=this.bb.__offset(this.bb_pos,10);return u?this.bb.__string(this.bb_pos+u,a):null}domain(a){let u=this.bb.__offset(this.bb_pos,12);return u?this.bb.__string(this.bb_pos+u,a):null}modelVersion(){let a=this.bb.__offset(this.bb_pos,14);return a?this.bb.readInt64(this.bb_pos+a):this.bb.createLong(0,0)}docString(a){let u=this.bb.__offset(this.bb_pos,16);return u?this.bb.__string(this.bb_pos+u,a):null}graph(a){let u=this.bb.__offset(this.bb_pos,18);return u?(a||new e.experimental.fbs.Graph).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}graphDocString(a){let u=this.bb.__offset(this.bb_pos,20);return u?this.bb.__string(this.bb_pos+u,a):null}static startModel(a){a.startObject(9)}static addIrVersion(a,u){a.addFieldInt64(0,u,a.createLong(0,0))}static addOpsetImport(a,u){a.addFieldOffset(1,u,0)}static createOpsetImportVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startOpsetImportVector(a,u){a.startVector(4,u,4)}static addProducerName(a,u){a.addFieldOffset(2,u,0)}static addProducerVersion(a,u){a.addFieldOffset(3,u,0)}static addDomain(a,u){a.addFieldOffset(4,u,0)}static addModelVersion(a,u){a.addFieldInt64(5,u,a.createLong(0,0))}static addDocString(a,u){a.addFieldOffset(6,u,0)}static addGraph(a,u){a.addFieldOffset(7,u,0)}static addGraphDocString(a,u){a.addFieldOffset(8,u,0)}static endModel(a){return a.endObject()}static createModel(a,u,l,c,d,f,m,p,h,b){return o.startModel(a),o.addIrVersion(a,u),o.addOpsetImport(a,l),o.addProducerName(a,c),o.addProducerVersion(a,d),o.addDomain(a,f),o.addModelVersion(a,m),o.addDocString(a,p),o.addGraph(a,h),o.addGraphDocString(a,b),o.endModel(a)}}i.Model=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsKernelCreateInfos(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsKernelCreateInfos(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}nodeIndices(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.readUint32(this.bb.__vector(this.bb_pos+u)+a*4):0}nodeIndicesLength(){let a=this.bb.__offset(this.bb_pos,4);return a?this.bb.__vector_len(this.bb_pos+a):0}nodeIndicesArray(){let a=this.bb.__offset(this.bb_pos,4);return a?new Uint32Array(this.bb.bytes().buffer,this.bb.bytes().byteOffset+this.bb.__vector(this.bb_pos+a),this.bb.__vector_len(this.bb_pos+a)):null}kernelDefHashes(a){let u=this.bb.__offset(this.bb_pos,6);return u?this.bb.readUint64(this.bb.__vector(this.bb_pos+u)+a*8):this.bb.createLong(0,0)}kernelDefHashesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startKernelCreateInfos(a){a.startObject(2)}static addNodeIndices(a,u){a.addFieldOffset(0,u,0)}static createNodeIndicesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addInt32(u[l]);return a.endVector()}static startNodeIndicesVector(a,u){a.startVector(4,u,4)}static addKernelDefHashes(a,u){a.addFieldOffset(1,u,0)}static createKernelDefHashesVector(a,u){a.startVector(8,u.length,8);for(let l=u.length-1;l>=0;l--)a.addInt64(u[l]);return a.endVector()}static startKernelDefHashesVector(a,u){a.startVector(8,u,8)}static endKernelCreateInfos(a){return a.endObject()}static createKernelCreateInfos(a,u,l){return o.startKernelCreateInfos(a),o.addNodeIndices(a,u),o.addKernelDefHashes(a,l),o.endKernelCreateInfos(a)}}i.KernelCreateInfos=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSubGraphSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSubGraphSessionState(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}graphId(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startSubGraphSessionState(a){a.startObject(2)}static addGraphId(a,u){a.addFieldOffset(0,u,0)}static addSessionState(a,u){a.addFieldOffset(1,u,0)}static endSubGraphSessionState(a){let u=a.endObject();return a.requiredField(u,4),u}static createSubGraphSessionState(a,u,l){return o.startSubGraphSessionState(a),o.addGraphId(a,u),o.addSessionState(a,l),o.endSubGraphSessionState(a)}}i.SubGraphSessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsSessionState(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsSessionState(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}kernels(a){let u=this.bb.__offset(this.bb_pos,4);return u?(a||new e.experimental.fbs.KernelCreateInfos).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}subGraphSessionStates(a,u){let l=this.bb.__offset(this.bb_pos,6);return l?(u||new e.experimental.fbs.SubGraphSessionState).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos+l)+a*4),this.bb):null}subGraphSessionStatesLength(){let a=this.bb.__offset(this.bb_pos,6);return a?this.bb.__vector_len(this.bb_pos+a):0}static startSessionState(a){a.startObject(2)}static addKernels(a,u){a.addFieldOffset(0,u,0)}static addSubGraphSessionStates(a,u){a.addFieldOffset(1,u,0)}static createSubGraphSessionStatesVector(a,u){a.startVector(4,u.length,4);for(let l=u.length-1;l>=0;l--)a.addOffset(u[l]);return a.endVector()}static startSubGraphSessionStatesVector(a,u){a.startVector(4,u,4)}static endSessionState(a){return a.endObject()}static createSessionState(a,u,l){return o.startSessionState(a),o.addKernels(a,u),o.addSubGraphSessionStates(a,l),o.endSessionState(a)}}i.SessionState=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={});(e=>{let r;(t=>{let n;(i=>{class o{constructor(){this.bb=null;this.bb_pos=0}__init(a,u){return this.bb_pos=a,this.bb=u,this}static getRootAsInferenceSession(a,u){return(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static getSizePrefixedRootAsInferenceSession(a,u){return a.setPosition(a.position()+A.SIZE_PREFIX_LENGTH),(u||new o).__init(a.readInt32(a.position())+a.position(),a)}static bufferHasIdentifier(a){return a.__has_identifier("ORTM")}ortVersion(a){let u=this.bb.__offset(this.bb_pos,4);return u?this.bb.__string(this.bb_pos+u,a):null}model(a){let u=this.bb.__offset(this.bb_pos,6);return u?(a||new e.experimental.fbs.Model).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}sessionState(a){let u=this.bb.__offset(this.bb_pos,8);return u?(a||new e.experimental.fbs.SessionState).__init(this.bb.__indirect(this.bb_pos+u),this.bb):null}static startInferenceSession(a){a.startObject(3)}static addOrtVersion(a,u){a.addFieldOffset(0,u,0)}static addModel(a,u){a.addFieldOffset(1,u,0)}static addSessionState(a,u){a.addFieldOffset(2,u,0)}static endInferenceSession(a){return a.endObject()}static finishInferenceSessionBuffer(a,u){a.finish(u,"ORTM")}static finishSizePrefixedInferenceSessionBuffer(a,u){a.finish(u,"ORTM",!0)}static createInferenceSession(a,u,l,c){return o.startInferenceSession(a),o.addOrtVersion(a,u),o.addModel(a,l),o.addSessionState(a,c),o.endInferenceSession(a)}}i.InferenceSession=o})(n=t.fbs||={})})(r=e.experimental||={})})(W||={})});var Js=Be((S2,Zs)=>{"use strict";Zs.exports=Bb;function Bb(r,e){for(var n=new Array(arguments.length-1),t=0,o=2,i=!0;o<arguments.length;)n[t++]=arguments[o++];return new Promise(function(a,u){n[t]=function(c){if(i)if(i=!1,c)u(c);else{for(var d=new Array(arguments.length-1),f=0;f<d.length;)d[f++]=arguments[f];a.apply(null,d)}};try{r.apply(e||null,n)}catch(l){i&&(i=!1,u(l))}})}});var tu=Be(eu=>{"use strict";var zn=eu;zn.length=function(e){var n=e.length;if(!n)return 0;for(var t=0;--n%4>1&&e.charAt(n)==="=";)++t;return Math.ceil(e.length*3)/4-t};var Ir=new Array(64),Qs=new Array(123);for(xt=0;xt<64;)Qs[Ir[xt]=xt<26?xt+65:xt<52?xt+71:xt<62?xt-4:xt-59|43]=xt++;var xt;zn.encode=function(e,n,t){for(var o=null,i=[],s=0,a=0,u;n<t;){var l=e[n++];switch(a){case 0:i[s++]=Ir[l>>2],u=(l&3)<<4,a=1;break;case 1:i[s++]=Ir[u|l>>4],u=(l&15)<<2,a=2;break;case 2:i[s++]=Ir[u|l>>6],i[s++]=Ir[l&63],a=0;break}s>8191&&((o||(o=[])).push(String.fromCharCode.apply(String,i)),s=0)}return a&&(i[s++]=Ir[u],i[s++]=61,a===1&&(i[s++]=61)),o?(s&&o.push(String.fromCharCode.apply(String,i.slice(0,s))),o.join("")):String.fromCharCode.apply(String,i.slice(0,s))};var Ys="invalid encoding";zn.decode=function(e,n,t){for(var o=t,i=0,s,a=0;a<e.length;){var u=e.charCodeAt(a++);if(u===61&&i>1)break;if((u=Qs[u])===void 0)throw Error(Ys);switch(i){case 0:s=u,i=1;break;case 1:n[t++]=s<<2|(u&48)>>4,s=u,i=2;break;case 2:n[t++]=(s&15)<<4|(u&60)>>2,s=u,i=3;break;case 3:n[t++]=(s&3)<<6|u,i=0;break}}if(i===1)throw Error(Ys);return t-o};zn.test=function(e){return/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e)}});var nu=Be((A2,ru)=>{"use strict";ru.exports=Rn;function Rn(){this._listeners={}}Rn.prototype.on=function(e,n,t){return(this._listeners[e]||(this._listeners[e]=[])).push({fn:n,ctx:t||this}),this};Rn.prototype.off=function(e,n){if(e===void 0)this._listeners={};else if(n===void 0)this._listeners[e]=[];else for(var t=this._listeners[e],o=0;o<t.length;)t[o].fn===n?t.splice(o,1):++o;return this};Rn.prototype.emit=function(e){var n=this._listeners[e];if(n){for(var t=[],o=1;o<arguments.length;)t.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,t)}return this}});var cu=Be((P2,lu)=>{"use strict";lu.exports=ou(ou);function ou(r){return typeof Float32Array<"u"?function(){var e=new Float32Array([-0]),n=new Uint8Array(e.buffer),t=n[3]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3]}function i(u,l,c){e[0]=u,l[c]=n[3],l[c+1]=n[2],l[c+2]=n[1],l[c+3]=n[0]}r.writeFloatLE=t?o:i,r.writeFloatBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],e[0]}function a(u,l){return n[3]=u[l],n[2]=u[l+1],n[1]=u[l+2],n[0]=u[l+3],e[0]}r.readFloatLE=t?s:a,r.readFloatBE=t?a:s}():function(){function e(t,o,i,s){var a=o<0?1:0;if(a&&(o=-o),o===0)t(1/o>0?0:2147483648,i,s);else if(isNaN(o))t(2143289344,i,s);else if(o>34028234663852886e22)t((a<<31|2139095040)>>>0,i,s);else if(o<11754943508222875e-54)t((a<<31|Math.round(o/1401298464324817e-60))>>>0,i,s);else{var u=Math.floor(Math.log(o)/Math.LN2),l=Math.round(o*Math.pow(2,-u)*8388608)&8388607;t((a<<31|u+127<<23|l)>>>0,i,s)}}r.writeFloatLE=e.bind(null,iu),r.writeFloatBE=e.bind(null,au);function n(t,o,i){var s=t(o,i),a=(s>>31)*2+1,u=s>>>23&255,l=s&8388607;return u===255?l?NaN:a*(1/0):u===0?a*1401298464324817e-60*l:a*Math.pow(2,u-150)*(l+8388608)}r.readFloatLE=n.bind(null,su),r.readFloatBE=n.bind(null,uu)}(),typeof Float64Array<"u"?function(){var e=new Float64Array([-0]),n=new Uint8Array(e.buffer),t=n[7]===128;function o(u,l,c){e[0]=u,l[c]=n[0],l[c+1]=n[1],l[c+2]=n[2],l[c+3]=n[3],l[c+4]=n[4],l[c+5]=n[5],l[c+6]=n[6],l[c+7]=n[7]}function i(u,l,c){e[0]=u,l[c]=n[7],l[c+1]=n[6],l[c+2]=n[5],l[c+3]=n[4],l[c+4]=n[3],l[c+5]=n[2],l[c+6]=n[1],l[c+7]=n[0]}r.writeDoubleLE=t?o:i,r.writeDoubleBE=t?i:o;function s(u,l){return n[0]=u[l],n[1]=u[l+1],n[2]=u[l+2],n[3]=u[l+3],n[4]=u[l+4],n[5]=u[l+5],n[6]=u[l+6],n[7]=u[l+7],e[0]}function a(u,l){return n[7]=u[l],n[6]=u[l+1],n[5]=u[l+2],n[4]=u[l+3],n[3]=u[l+4],n[2]=u[l+5],n[1]=u[l+6],n[0]=u[l+7],e[0]}r.readDoubleLE=t?s:a,r.readDoubleBE=t?a:s}():function(){function e(t,o,i,s,a,u){var l=s<0?1:0;if(l&&(s=-s),s===0)t(0,a,u+o),t(1/s>0?0:2147483648,a,u+i);else if(isNaN(s))t(0,a,u+o),t(2146959360,a,u+i);else if(s>17976931348623157e292)t(0,a,u+o),t((l<<31|2146435072)>>>0,a,u+i);else{var c;if(s<22250738585072014e-324)c=s/5e-324,t(c>>>0,a,u+o),t((l<<31|c/4294967296)>>>0,a,u+i);else{var d=Math.floor(Math.log(s)/Math.LN2);d===1024&&(d=1023),c=s*Math.pow(2,-d),t(c*4503599627370496>>>0,a,u+o),t((l<<31|d+1023<<20|c*1048576&1048575)>>>0,a,u+i)}}}r.writeDoubleLE=e.bind(null,iu,0,4),r.writeDoubleBE=e.bind(null,au,4,0);function n(t,o,i,s,a){var u=t(s,a+o),l=t(s,a+i),c=(l>>31)*2+1,d=l>>>20&2047,f=4294967296*(l&1048575)+u;return d===2047?f?NaN:c*(1/0):d===0?c*5e-324*f:c*Math.pow(2,d-1075)*(f+4503599627370496)}r.readDoubleLE=n.bind(null,su,0,4),r.readDoubleBE=n.bind(null,uu,4,0)}(),r}function iu(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}function au(r,e,n){e[n]=r>>>24,e[n+1]=r>>>16&255,e[n+2]=r>>>8&255,e[n+3]=r&255}function su(r,e){return(r[e]|r[e+1]<<8|r[e+2]<<16|r[e+3]<<24)>>>0}function uu(r,e){return(r[e]<<24|r[e+1]<<16|r[e+2]<<8|r[e+3])>>>0}});var du=Be((exports,module)=>{"use strict";module.exports=inquire;function inquire(moduleName){try{var mod=eval("quire".replace(/^/,"re"))(moduleName);if(mod&&(mod.length||Object.keys(mod).length))return mod}catch(r){}return null}});var pu=Be(fu=>{"use strict";var xi=fu;xi.length=function(e){for(var n=0,t=0,o=0;o<e.length;++o)t=e.charCodeAt(o),t<128?n+=1:t<2048?n+=2:(t&64512)===55296&&(e.charCodeAt(o+1)&64512)===56320?(++o,n+=4):n+=3;return n};xi.read=function(e,n,t){var o=t-n;if(o<1)return"";for(var i=null,s=[],a=0,u;n<t;)u=e[n++],u<128?s[a++]=u:u>191&&u<224?s[a++]=(u&31)<<6|e[n++]&63:u>239&&u<365?(u=((u&7)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,s[a++]=55296+(u>>10),s[a++]=56320+(u&1023)):s[a++]=(u&15)<<12|(e[n++]&63)<<6|e[n++]&63,a>8191&&((i||(i=[])).push(String.fromCharCode.apply(String,s)),a=0);return i?(a&&i.push(String.fromCharCode.apply(String,s.slice(0,a))),i.join("")):String.fromCharCode.apply(String,s.slice(0,a))};xi.write=function(e,n,t){for(var o=t,i,s,a=0;a<e.length;++a)i=e.charCodeAt(a),i<128?n[t++]=i:i<2048?(n[t++]=i>>6|192,n[t++]=i&63|128):(i&64512)===55296&&((s=e.charCodeAt(a+1))&64512)===56320?(i=65536+((i&1023)<<10)+(s&1023),++a,n[t++]=i>>18|240,n[t++]=i>>12&63|128,n[t++]=i>>6&63|128,n[t++]=i&63|128):(n[t++]=i>>12|224,n[t++]=i>>6&63|128,n[t++]=i&63|128);return t-o}});var hu=Be((E2,mu)=>{"use strict";mu.exports=Lb;function Lb(r,e,n){var t=n||8192,o=t>>>1,i=null,s=t;return function(u){if(u<1||u>o)return r(u);s+u>t&&(i=r(t),s=0);var l=e.call(i,s,s+=u);return s&7&&(s=(s|7)+1),l}}});var bu=Be((C2,gu)=>{"use strict";gu.exports=Fe;var Ur=qt();function Fe(r,e){this.lo=r>>>0,this.hi=e>>>0}var nr=Fe.zero=new Fe(0,0);nr.toNumber=function(){return 0};nr.zzEncode=nr.zzDecode=function(){return this};nr.length=function(){return 1};var zb=Fe.zeroHash="\0\0\0\0\0\0\0\0";Fe.fromNumber=function(e){if(e===0)return nr;var n=e<0;n&&(e=-e);var t=e>>>0,o=(e-t)/4294967296>>>0;return n&&(o=~o>>>0,t=~t>>>0,++t>4294967295&&(t=0,++o>4294967295&&(o=0))),new Fe(t,o)};Fe.from=function(e){if(typeof e=="number")return Fe.fromNumber(e);if(Ur.isString(e))if(Ur.Long)e=Ur.Long.fromString(e);else return Fe.fromNumber(parseInt(e,10));return e.low||e.high?new Fe(e.low>>>0,e.high>>>0):nr};Fe.prototype.toNumber=function(e){if(!e&&this.hi>>>31){var n=~this.lo+1>>>0,t=~this.hi>>>0;return n||(t=t+1>>>0),-(n+t*4294967296)}return this.lo+this.hi*4294967296};Fe.prototype.toLong=function(e){return Ur.Long?new Ur.Long(this.lo|0,this.hi|0,!!e):{low:this.lo|0,high:this.hi|0,unsigned:!!e}};var Ht=String.prototype.charCodeAt;Fe.fromHash=function(e){return e===zb?nr:new Fe((Ht.call(e,0)|Ht.call(e,1)<<8|Ht.call(e,2)<<16|Ht.call(e,3)<<24)>>>0,(Ht.call(e,4)|Ht.call(e,5)<<8|Ht.call(e,6)<<16|Ht.call(e,7)<<24)>>>0)};Fe.prototype.toHash=function(){return String.fromCharCode(this.lo&255,this.lo>>>8&255,this.lo>>>16&255,this.lo>>>24,this.hi&255,this.hi>>>8&255,this.hi>>>16&255,this.hi>>>24)};Fe.prototype.zzEncode=function(){var e=this.hi>>31;return this.hi=((this.hi<<1|this.lo>>>31)^e)>>>0,this.lo=(this.lo<<1^e)>>>0,this};Fe.prototype.zzDecode=function(){var e=-(this.lo&1);return this.lo=((this.lo>>>1|this.hi<<31)^e)>>>0,this.hi=(this.hi>>>1^e)>>>0,this};Fe.prototype.length=function(){var e=this.lo,n=(this.lo>>>28|this.hi<<4)>>>0,t=this.hi>>>24;return t===0?n===0?e<16384?e<128?1:2:e<2097152?3:4:n<16384?n<128?5:6:n<2097152?7:8:t<128?9:10}});var qt=Be(wi=>{"use strict";var H=wi;H.asPromise=Js();H.base64=tu();H.EventEmitter=nu();H.float=cu();H.inquire=du();H.utf8=pu();H.pool=hu();H.LongBits=bu();H.isNode=!!(typeof global<"u"&&global&&global.process&&global.process.versions&&global.process.versions.node);H.global=H.isNode&&global||typeof window<"u"&&window||typeof self<"u"&&self||wi;H.emptyArray=Object.freeze?Object.freeze([]):[];H.emptyObject=Object.freeze?Object.freeze({}):{};H.isInteger=Number.isInteger||function(e){return typeof e=="number"&&isFinite(e)&&Math.floor(e)===e};H.isString=function(e){return typeof e=="string"||e instanceof String};H.isObject=function(e){return e&&typeof e=="object"};H.isset=H.isSet=function(e,n){var t=e[n];return t!=null&&e.hasOwnProperty(n)?typeof t!="object"||(Array.isArray(t)?t.length:Object.keys(t).length)>0:!1};H.Buffer=function(){try{var r=H.inquire("buffer").Buffer;return r.prototype.utf8Write?r:null}catch{return null}}();H._Buffer_from=null;H._Buffer_allocUnsafe=null;H.newBuffer=function(e){return typeof e=="number"?H.Buffer?H._Buffer_allocUnsafe(e):new H.Array(e):H.Buffer?H._Buffer_from(e):typeof Uint8Array>"u"?e:new Uint8Array(e)};H.Array=typeof Uint8Array<"u"?Uint8Array:Array;H.Long=H.global.dcodeIO&&H.global.dcodeIO.Long||H.global.Long||H.inquire("long");H.key2Re=/^true|false|0|1$/;H.key32Re=/^-?(?:0|[1-9][0-9]*)$/;H.key64Re=/^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;H.longToHash=function(e){return e?H.LongBits.from(e).toHash():H.LongBits.zeroHash};H.longFromHash=function(e,n){var t=H.LongBits.fromHash(e);return H.Long?H.Long.fromBits(t.lo,t.hi,n):t.toNumber(!!n)};function yu(r,e,n){for(var t=Object.keys(e),o=0;o<t.length;++o)(r[t[o]]===void 0||!n)&&(r[t[o]]=e[t[o]]);return r}H.merge=yu;H.lcFirst=function(e){return e.charAt(0).toLowerCase()+e.substring(1)};function xu(r){function e(n,t){if(!(this instanceof e))return new e(n,t);Object.defineProperty(this,"message",{get:function(){return n}}),Error.captureStackTrace?Error.captureStackTrace(this,e):Object.defineProperty(this,"stack",{value:new Error().stack||""}),t&&yu(this,t)}return e.prototype=Object.create(Error.prototype,{constructor:{value:e,writable:!0,enumerable:!1,configurable:!0},name:{get:function(){return r},set:void 0,enumerable:!1,configurable:!0},toString:{value:function(){return this.name+": "+this.message},writable:!0,enumerable:!1,configurable:!0}}),e}H.newError=xu;H.ProtocolError=xu("ProtocolError");H.oneOfGetter=function(e){for(var n={},t=0;t<e.length;++t)n[e[t]]=1;return function(){for(var o=Object.keys(this),i=o.length-1;i>-1;--i)if(n[o[i]]===1&&this[o[i]]!==void 0&&this[o[i]]!==null)return o[i]}};H.oneOfSetter=function(e){return function(n){for(var t=0;t<e.length;++t)e[t]!==n&&delete this[e[t]]}};H.toJSONOptions={longs:String,enums:String,bytes:String,json:!0};H._configure=function(){var r=H.Buffer;if(!r){H._Buffer_from=H._Buffer_allocUnsafe=null;return}H._Buffer_from=r.from!==Uint8Array.from&&r.from||function(n,t){return new r(n,t)},H._Buffer_allocUnsafe=r.allocUnsafe||function(n){return new r(n)}}});var Ai=Be((D2,vu)=>{"use strict";vu.exports=fe;var ct=qt(),_i,Nn=ct.LongBits,wu=ct.base64,_u=ct.utf8;function Wr(r,e,n){this.fn=r,this.len=e,this.next=void 0,this.val=n}function vi(){}function Rb(r){this.head=r.head,this.tail=r.tail,this.len=r.len,this.next=r.states}function fe(){this.len=0,this.head=new Wr(vi,0,0),this.tail=this.head,this.states=null}var Tu=function(){return ct.Buffer?function(){return(fe.create=function(){return new _i})()}:function(){return new fe}};fe.create=Tu();fe.alloc=function(e){return new ct.Array(e)};ct.Array!==Array&&(fe.alloc=ct.pool(fe.alloc,ct.Array.prototype.subarray));fe.prototype._push=function(e,n,t){return this.tail=this.tail.next=new Wr(e,n,t),this.len+=n,this};function Ii(r,e,n){e[n]=r&255}function Nb(r,e,n){for(;r>127;)e[n++]=r&127|128,r>>>=7;e[n]=r}function Si(r,e){this.len=r,this.next=void 0,this.val=e}Si.prototype=Object.create(Wr.prototype);Si.prototype.fn=Nb;fe.prototype.uint32=function(e){return this.len+=(this.tail=this.tail.next=new Si((e=e>>>0)<128?1:e<16384?2:e<2097152?3:e<268435456?4:5,e)).len,this};fe.prototype.int32=function(e){return e<0?this._push($i,10,Nn.fromNumber(e)):this.uint32(e)};fe.prototype.sint32=function(e){return this.uint32((e<<1^e>>31)>>>0)};function $i(r,e,n){for(;r.hi;)e[n++]=r.lo&127|128,r.lo=(r.lo>>>7|r.hi<<25)>>>0,r.hi>>>=7;for(;r.lo>127;)e[n++]=r.lo&127|128,r.lo=r.lo>>>7;e[n++]=r.lo}fe.prototype.uint64=function(e){var n=Nn.from(e);return this._push($i,n.length(),n)};fe.prototype.int64=fe.prototype.uint64;fe.prototype.sint64=function(e){var n=Nn.from(e).zzEncode();return this._push($i,n.length(),n)};fe.prototype.bool=function(e){return this._push(Ii,1,e?1:0)};function Ti(r,e,n){e[n]=r&255,e[n+1]=r>>>8&255,e[n+2]=r>>>16&255,e[n+3]=r>>>24}fe.prototype.fixed32=function(e){return this._push(Ti,4,e>>>0)};fe.prototype.sfixed32=fe.prototype.fixed32;fe.prototype.fixed64=function(e){var n=Nn.from(e);return this._push(Ti,4,n.lo)._push(Ti,4,n.hi)};fe.prototype.sfixed64=fe.prototype.fixed64;fe.prototype.float=function(e){return this._push(ct.float.writeFloatLE,4,e)};fe.prototype.double=function(e){return this._push(ct.float.writeDoubleLE,8,e)};var Vb=ct.Array.prototype.set?function(e,n,t){n.set(e,t)}:function(e,n,t){for(var o=0;o<e.length;++o)n[t+o]=e[o]};fe.prototype.bytes=function(e){var n=e.length>>>0;if(!n)return this._push(Ii,1,0);if(ct.isString(e)){var t=fe.alloc(n=wu.length(e));wu.decode(e,t,0),e=t}return this.uint32(n)._push(Vb,n,e)};fe.prototype.string=function(e){var n=_u.length(e);return n?this.uint32(n)._push(_u.write,n,e):this._push(Ii,1,0)};fe.prototype.fork=function(){return this.states=new Rb(this),this.head=this.tail=new Wr(vi,0,0),this.len=0,this};fe.prototype.reset=function(){return this.states?(this.head=this.states.head,this.tail=this.states.tail,this.len=this.states.len,this.states=this.states.next):(this.head=this.tail=new Wr(vi,0,0),this.len=0),this};fe.prototype.ldelim=function(){var e=this.head,n=this.tail,t=this.len;return this.reset().uint32(t),t&&(this.tail.next=e.next,this.tail=n,this.len+=t),this};fe.prototype.finish=function(){for(var e=this.head.next,n=this.constructor.alloc(this.len),t=0;e;)e.fn(e.val,n,t),t+=e.len,e=e.next;return n};fe._configure=function(r){_i=r,fe.create=Tu(),_i._configure()}});var $u=Be((B2,Su)=>{"use strict";Su.exports=St;var Iu=Ai();(St.prototype=Object.create(Iu.prototype)).constructor=St;var Kt=qt();function St(){Iu.call(this)}St._configure=function(){St.alloc=Kt._Buffer_allocUnsafe,St.writeBytesBuffer=Kt.Buffer&&Kt.Buffer.prototype instanceof Uint8Array&&Kt.Buffer.prototype.set.name==="set"?function(e,n,t){n.set(e,t)}:function(e,n,t){if(e.copy)e.copy(n,t,0,e.length);else for(var o=0;o<e.length;)n[t++]=e[o++]}};St.prototype.bytes=function(e){Kt.isString(e)&&(e=Kt._Buffer_from(e,"base64"));var n=e.length>>>0;return this.uint32(n),n&&this._push(St.writeBytesBuffer,n,e),this};function Mb(r,e,n){r.length<40?Kt.utf8.write(r,e,n):e.utf8Write?e.utf8Write(r,n):e.write(r,n)}St.prototype.string=function(e){var n=Kt.Buffer.byteLength(e);return this.uint32(n),n&&this._push(Mb,n,e),this};St._configure()});var Ei=Be((L2,Cu)=>{"use strict";Cu.exports=Ce;var wt=qt(),Oi,Ou=wt.LongBits,Fb=wt.utf8;function _t(r,e){return RangeError("index out of range: "+r.pos+" + "+(e||1)+" > "+r.len)}function Ce(r){this.buf=r,this.pos=0,this.len=r.length}var Au=typeof Uint8Array<"u"?function(e){if(e instanceof Uint8Array||Array.isArray(e))return new Ce(e);throw Error("illegal buffer")}:function(e){if(Array.isArray(e))return new Ce(e);throw Error("illegal buffer")},Eu=function(){return wt.Buffer?function(n){return(Ce.create=function(o){return wt.Buffer.isBuffer(o)?new Oi(o):Au(o)})(n)}:Au};Ce.create=Eu();Ce.prototype._slice=wt.Array.prototype.subarray||wt.Array.prototype.slice;Ce.prototype.uint32=function(){var e=4294967295;return function(){if(e=(this.buf[this.pos]&127)>>>0,this.buf[this.pos++]<128||(e=(e|(this.buf[this.pos]&127)<<7)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<14)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&127)<<21)>>>0,this.buf[this.pos++]<128)||(e=(e|(this.buf[this.pos]&15)<<28)>>>0,this.buf[this.pos++]<128))return e;if((this.pos+=5)>this.len)throw this.pos=this.len,_t(this,10);return e}}();Ce.prototype.int32=function(){return this.uint32()|0};Ce.prototype.sint32=function(){var e=this.uint32();return e>>>1^-(e&1)|0};function Pi(){var r=new Ou(0,0),e=0;if(this.len-this.pos>4){for(;e<4;++e)if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r;if(r.lo=(r.lo|(this.buf[this.pos]&127)<<28)>>>0,r.hi=(r.hi|(this.buf[this.pos]&127)>>4)>>>0,this.buf[this.pos++]<128)return r;e=0}else{for(;e<3;++e){if(this.pos>=this.len)throw _t(this);if(r.lo=(r.lo|(this.buf[this.pos]&127)<<e*7)>>>0,this.buf[this.pos++]<128)return r}return r.lo=(r.lo|(this.buf[this.pos++]&127)<<e*7)>>>0,r}if(this.len-this.pos>4){for(;e<5;++e)if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}else for(;e<5;++e){if(this.pos>=this.len)throw _t(this);if(r.hi=(r.hi|(this.buf[this.pos]&127)<<e*7+3)>>>0,this.buf[this.pos++]<128)return r}throw Error("invalid varint encoding")}Ce.prototype.bool=function(){return this.uint32()!==0};function Vn(r,e){return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0}Ce.prototype.fixed32=function(){if(this.pos+4>this.len)throw _t(this,4);return Vn(this.buf,this.pos+=4)};Ce.prototype.sfixed32=function(){if(this.pos+4>this.len)throw _t(this,4);return Vn(this.buf,this.pos+=4)|0};function Pu(){if(this.pos+8>this.len)throw _t(this,8);return new Ou(Vn(this.buf,this.pos+=4),Vn(this.buf,this.pos+=4))}Ce.prototype.float=function(){if(this.pos+4>this.len)throw _t(this,4);var e=wt.float.readFloatLE(this.buf,this.pos);return this.pos+=4,e};Ce.prototype.double=function(){if(this.pos+8>this.len)throw _t(this,4);var e=wt.float.readDoubleLE(this.buf,this.pos);return this.pos+=8,e};Ce.prototype.bytes=function(){var e=this.uint32(),n=this.pos,t=this.pos+e;if(t>this.len)throw _t(this,e);if(this.pos+=e,Array.isArray(this.buf))return this.buf.slice(n,t);if(n===t){var o=wt.Buffer;return o?o.alloc(0):new this.buf.constructor(0)}return this._slice.call(this.buf,n,t)};Ce.prototype.string=function(){var e=this.bytes();return Fb.read(e,0,e.length)};Ce.prototype.skip=function(e){if(typeof e=="number"){if(this.pos+e>this.len)throw _t(this,e);this.pos+=e}else do if(this.pos>=this.len)throw _t(this);while(this.buf[this.pos++]&128);return this};Ce.prototype.skipType=function(r){switch(r){case 0:this.skip();break;case 1:this.skip(8);break;case 2:this.skip(this.uint32());break;case 3:for(;(r=this.uint32()&7)!==4;)this.skipType(r);break;case 5:this.skip(4);break;default:throw Error("invalid wire type "+r+" at offset "+this.pos)}return this};Ce._configure=function(r){Oi=r,Ce.create=Eu(),Oi._configure();var e=wt.Long?"toLong":"toNumber";wt.merge(Ce.prototype,{int64:function(){return Pi.call(this)[e](!1)},uint64:function(){return Pi.call(this)[e](!0)},sint64:function(){return Pi.call(this).zzDecode()[e](!1)},fixed64:function(){return Pu.call(this)[e](!0)},sfixed64:function(){return Pu.call(this)[e](!1)}})}});var Lu=Be((z2,Bu)=>{"use strict";Bu.exports=or;var Du=Ei();(or.prototype=Object.create(Du.prototype)).constructor=or;var ku=qt();function or(r){Du.call(this,r)}or._configure=function(){ku.Buffer&&(or.prototype._slice=ku.Buffer.prototype.slice)};or.prototype.string=function(){var e=this.uint32();return this.buf.utf8Slice?this.buf.utf8Slice(this.pos,this.pos=Math.min(this.pos+e,this.len)):this.buf.toString("utf-8",this.pos,this.pos=Math.min(this.pos+e,this.len))};or._configure()});var Ru=Be((R2,zu)=>{"use strict";zu.exports=Hr;var Ci=qt();(Hr.prototype=Object.create(Ci.EventEmitter.prototype)).constructor=Hr;function Hr(r,e,n){if(typeof r!="function")throw TypeError("rpcImpl must be a function");Ci.EventEmitter.call(this),this.rpcImpl=r,this.requestDelimited=!!e,this.responseDelimited=!!n}Hr.prototype.rpcCall=function r(e,n,t,o,i){if(!o)throw TypeError("request must be specified");var s=this;if(!i)return Ci.asPromise(r,s,e,n,t,o);if(!s.rpcImpl){setTimeout(function(){i(Error("already ended"))},0);return}try{return s.rpcImpl(e,n[s.requestDelimited?"encodeDelimited":"encode"](o).finish(),function(u,l){if(u)return s.emit("error",u,e),i(u);if(l===null){s.end(!0);return}if(!(l instanceof t))try{l=t[s.responseDelimited?"decodeDelimited":"decode"](l)}catch(c){return s.emit("error",c,e),i(c)}return s.emit("data",l,e),i(null,l)})}catch(a){s.emit("error",a,e),setTimeout(function(){i(a)},0);return}};Hr.prototype.end=function(e){return this.rpcImpl&&(e||this.rpcImpl(null,null,null),this.rpcImpl=null,this.emit("end").off()),this}});var Vu=Be(Nu=>{"use strict";var Gb=Nu;Gb.Service=Ru()});var Fu=Be((V2,Mu)=>{"use strict";Mu.exports={}});var Wu=Be(Uu=>{"use strict";var Qe=Uu;Qe.build="minimal";Qe.Writer=Ai();Qe.BufferWriter=$u();Qe.Reader=Ei();Qe.BufferReader=Lu();Qe.util=qt();Qe.rpc=Vu();Qe.roots=Fu();Qe.configure=Gu;function Gu(){Qe.util._configure(),Qe.Writer._configure(Qe.BufferWriter),Qe.Reader._configure(Qe.BufferReader)}Gu()});var qu=Be((F2,Hu)=>{"use strict";Hu.exports=Wu()});var Sr=Be((G2,Ku)=>{"use strict";var ve=qu(),R=ve.Reader,ke=ve.Writer,T=ve.util,w=ve.roots.default||(ve.roots.default={});w.onnx=function(){var r={};return r.Version=function(){var e={},n=Object.create(e);return n[e[0]="_START_VERSION"]=0,n[e[1]="IR_VERSION_2017_10_10"]=1,n[e[2]="IR_VERSION_2017_10_30"]=2,n[e[3]="IR_VERSION_2017_11_3"]=3,n[e[4]="IR_VERSION_2019_1_22"]=4,n[e[5]="IR_VERSION_2019_3_18"]=5,n[e[6]="IR_VERSION_2019_9_19"]=6,n[e[7]="IR_VERSION_2020_5_8"]=7,n[e[8]="IR_VERSION_2021_7_30"]=8,n[e[9]="IR_VERSION"]=9,n}(),r.AttributeProto=function(){function e(n){if(this.floats=[],this.ints=[],this.strings=[],this.tensors=[],this.graphs=[],this.sparseTensors=[],this.typeProtos=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.refAttrName="",e.prototype.docString="",e.prototype.type=0,e.prototype.f=0,e.prototype.i=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.s=T.newBuffer([]),e.prototype.t=null,e.prototype.g=null,e.prototype.sparseTensor=null,e.prototype.tp=null,e.prototype.floats=T.emptyArray,e.prototype.ints=T.emptyArray,e.prototype.strings=T.emptyArray,e.prototype.tensors=T.emptyArray,e.prototype.graphs=T.emptyArray,e.prototype.sparseTensors=T.emptyArray,e.prototype.typeProtos=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.f!=null&&Object.hasOwnProperty.call(t,"f")&&o.uint32(21).float(t.f),t.i!=null&&Object.hasOwnProperty.call(t,"i")&&o.uint32(24).int64(t.i),t.s!=null&&Object.hasOwnProperty.call(t,"s")&&o.uint32(34).bytes(t.s),t.t!=null&&Object.hasOwnProperty.call(t,"t")&&w.onnx.TensorProto.encode(t.t,o.uint32(42).fork()).ldelim(),t.g!=null&&Object.hasOwnProperty.call(t,"g")&&w.onnx.GraphProto.encode(t.g,o.uint32(50).fork()).ldelim(),t.floats!=null&&t.floats.length){o.uint32(58).fork();for(var i=0;i<t.floats.length;++i)o.float(t.floats[i]);o.ldelim()}if(t.ints!=null&&t.ints.length){o.uint32(66).fork();for(var i=0;i<t.ints.length;++i)o.int64(t.ints[i]);o.ldelim()}if(t.strings!=null&&t.strings.length)for(var i=0;i<t.strings.length;++i)o.uint32(74).bytes(t.strings[i]);if(t.tensors!=null&&t.tensors.length)for(var i=0;i<t.tensors.length;++i)w.onnx.TensorProto.encode(t.tensors[i],o.uint32(82).fork()).ldelim();if(t.graphs!=null&&t.graphs.length)for(var i=0;i<t.graphs.length;++i)w.onnx.GraphProto.encode(t.graphs[i],o.uint32(90).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(106).string(t.docString),t.tp!=null&&Object.hasOwnProperty.call(t,"tp")&&w.onnx.TypeProto.encode(t.tp,o.uint32(114).fork()).ldelim(),t.typeProtos!=null&&t.typeProtos.length)for(var i=0;i<t.typeProtos.length;++i)w.onnx.TypeProto.encode(t.typeProtos[i],o.uint32(122).fork()).ldelim();if(t.type!=null&&Object.hasOwnProperty.call(t,"type")&&o.uint32(160).int32(t.type),t.refAttrName!=null&&Object.hasOwnProperty.call(t,"refAttrName")&&o.uint32(170).string(t.refAttrName),t.sparseTensor!=null&&Object.hasOwnProperty.call(t,"sparseTensor")&&w.onnx.SparseTensorProto.encode(t.sparseTensor,o.uint32(178).fork()).ldelim(),t.sparseTensors!=null&&t.sparseTensors.length)for(var i=0;i<t.sparseTensors.length;++i)w.onnx.SparseTensorProto.encode(t.sparseTensors[i],o.uint32(186).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.AttributeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 21:{s.refAttrName=t.string();break}case 13:{s.docString=t.string();break}case 20:{s.type=t.int32();break}case 2:{s.f=t.float();break}case 3:{s.i=t.int64();break}case 4:{s.s=t.bytes();break}case 5:{s.t=w.onnx.TensorProto.decode(t,t.uint32());break}case 6:{s.g=w.onnx.GraphProto.decode(t,t.uint32());break}case 22:{s.sparseTensor=w.onnx.SparseTensorProto.decode(t,t.uint32());break}case 14:{s.tp=w.onnx.TypeProto.decode(t,t.uint32());break}case 7:{if(s.floats&&s.floats.length||(s.floats=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floats.push(t.float());else s.floats.push(t.float());break}case 8:{if(s.ints&&s.ints.length||(s.ints=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.ints.push(t.int64());else s.ints.push(t.int64());break}case 9:{s.strings&&s.strings.length||(s.strings=[]),s.strings.push(t.bytes());break}case 10:{s.tensors&&s.tensors.length||(s.tensors=[]),s.tensors.push(w.onnx.TensorProto.decode(t,t.uint32()));break}case 11:{s.graphs&&s.graphs.length||(s.graphs=[]),s.graphs.push(w.onnx.GraphProto.decode(t,t.uint32()));break}case 23:{s.sparseTensors&&s.sparseTensors.length||(s.sparseTensors=[]),s.sparseTensors.push(w.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 15:{s.typeProtos&&s.typeProtos.length||(s.typeProtos=[]),s.typeProtos.push(w.onnx.TypeProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&!T.isString(t.refAttrName))return"refAttrName: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.type!=null&&t.hasOwnProperty("type"))switch(t.type){default:return"type: enum value expected";case 0:case 1:case 2:case 3:case 4:case 5:case 11:case 13:case 6:case 7:case 8:case 9:case 10:case 12:case 14:break}if(t.f!=null&&t.hasOwnProperty("f")&&typeof t.f!="number")return"f: number expected";if(t.i!=null&&t.hasOwnProperty("i")&&!T.isInteger(t.i)&&!(t.i&&T.isInteger(t.i.low)&&T.isInteger(t.i.high)))return"i: integer|Long expected";if(t.s!=null&&t.hasOwnProperty("s")&&!(t.s&&typeof t.s.length=="number"||T.isString(t.s)))return"s: buffer expected";if(t.t!=null&&t.hasOwnProperty("t")){var o=w.onnx.TensorProto.verify(t.t);if(o)return"t."+o}if(t.g!=null&&t.hasOwnProperty("g")){var o=w.onnx.GraphProto.verify(t.g);if(o)return"g."+o}if(t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")){var o=w.onnx.SparseTensorProto.verify(t.sparseTensor);if(o)return"sparseTensor."+o}if(t.tp!=null&&t.hasOwnProperty("tp")){var o=w.onnx.TypeProto.verify(t.tp);if(o)return"tp."+o}if(t.floats!=null&&t.hasOwnProperty("floats")){if(!Array.isArray(t.floats))return"floats: array expected";for(var i=0;i<t.floats.length;++i)if(typeof t.floats[i]!="number")return"floats: number[] expected"}if(t.ints!=null&&t.hasOwnProperty("ints")){if(!Array.isArray(t.ints))return"ints: array expected";for(var i=0;i<t.ints.length;++i)if(!T.isInteger(t.ints[i])&&!(t.ints[i]&&T.isInteger(t.ints[i].low)&&T.isInteger(t.ints[i].high)))return"ints: integer|Long[] expected"}if(t.strings!=null&&t.hasOwnProperty("strings")){if(!Array.isArray(t.strings))return"strings: array expected";for(var i=0;i<t.strings.length;++i)if(!(t.strings[i]&&typeof t.strings[i].length=="number"||T.isString(t.strings[i])))return"strings: buffer[] expected"}if(t.tensors!=null&&t.hasOwnProperty("tensors")){if(!Array.isArray(t.tensors))return"tensors: array expected";for(var i=0;i<t.tensors.length;++i){var o=w.onnx.TensorProto.verify(t.tensors[i]);if(o)return"tensors."+o}}if(t.graphs!=null&&t.hasOwnProperty("graphs")){if(!Array.isArray(t.graphs))return"graphs: array expected";for(var i=0;i<t.graphs.length;++i){var o=w.onnx.GraphProto.verify(t.graphs[i]);if(o)return"graphs."+o}}if(t.sparseTensors!=null&&t.hasOwnProperty("sparseTensors")){if(!Array.isArray(t.sparseTensors))return"sparseTensors: array expected";for(var i=0;i<t.sparseTensors.length;++i){var o=w.onnx.SparseTensorProto.verify(t.sparseTensors[i]);if(o)return"sparseTensors."+o}}if(t.typeProtos!=null&&t.hasOwnProperty("typeProtos")){if(!Array.isArray(t.typeProtos))return"typeProtos: array expected";for(var i=0;i<t.typeProtos.length;++i){var o=w.onnx.TypeProto.verify(t.typeProtos[i]);if(o)return"typeProtos."+o}}return null},e.fromObject=function(t){if(t instanceof w.onnx.AttributeProto)return t;var o=new w.onnx.AttributeProto;switch(t.name!=null&&(o.name=String(t.name)),t.refAttrName!=null&&(o.refAttrName=String(t.refAttrName)),t.docString!=null&&(o.docString=String(t.docString)),t.type){default:if(typeof t.type=="number"){o.type=t.type;break}break;case"UNDEFINED":case 0:o.type=0;break;case"FLOAT":case 1:o.type=1;break;case"INT":case 2:o.type=2;break;case"STRING":case 3:o.type=3;break;case"TENSOR":case 4:o.type=4;break;case"GRAPH":case 5:o.type=5;break;case"SPARSE_TENSOR":case 11:o.type=11;break;case"TYPE_PROTO":case 13:o.type=13;break;case"FLOATS":case 6:o.type=6;break;case"INTS":case 7:o.type=7;break;case"STRINGS":case 8:o.type=8;break;case"TENSORS":case 9:o.type=9;break;case"GRAPHS":case 10:o.type=10;break;case"SPARSE_TENSORS":case 12:o.type=12;break;case"TYPE_PROTOS":case 14:o.type=14;break}if(t.f!=null&&(o.f=Number(t.f)),t.i!=null&&(T.Long?(o.i=T.Long.fromValue(t.i)).unsigned=!1:typeof t.i=="string"?o.i=parseInt(t.i,10):typeof t.i=="number"?o.i=t.i:typeof t.i=="object"&&(o.i=new T.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber())),t.s!=null&&(typeof t.s=="string"?T.base64.decode(t.s,o.s=T.newBuffer(T.base64.length(t.s)),0):t.s.length>=0&&(o.s=t.s)),t.t!=null){if(typeof t.t!="object")throw TypeError(".onnx.AttributeProto.t: object expected");o.t=w.onnx.TensorProto.fromObject(t.t)}if(t.g!=null){if(typeof t.g!="object")throw TypeError(".onnx.AttributeProto.g: object expected");o.g=w.onnx.GraphProto.fromObject(t.g)}if(t.sparseTensor!=null){if(typeof t.sparseTensor!="object")throw TypeError(".onnx.AttributeProto.sparseTensor: object expected");o.sparseTensor=w.onnx.SparseTensorProto.fromObject(t.sparseTensor)}if(t.tp!=null){if(typeof t.tp!="object")throw TypeError(".onnx.AttributeProto.tp: object expected");o.tp=w.onnx.TypeProto.fromObject(t.tp)}if(t.floats){if(!Array.isArray(t.floats))throw TypeError(".onnx.AttributeProto.floats: array expected");o.floats=[];for(var i=0;i<t.floats.length;++i)o.floats[i]=Number(t.floats[i])}if(t.ints){if(!Array.isArray(t.ints))throw TypeError(".onnx.AttributeProto.ints: array expected");o.ints=[];for(var i=0;i<t.ints.length;++i)T.Long?(o.ints[i]=T.Long.fromValue(t.ints[i])).unsigned=!1:typeof t.ints[i]=="string"?o.ints[i]=parseInt(t.ints[i],10):typeof t.ints[i]=="number"?o.ints[i]=t.ints[i]:typeof t.ints[i]=="object"&&(o.ints[i]=new T.LongBits(t.ints[i].low>>>0,t.ints[i].high>>>0).toNumber())}if(t.strings){if(!Array.isArray(t.strings))throw TypeError(".onnx.AttributeProto.strings: array expected");o.strings=[];for(var i=0;i<t.strings.length;++i)typeof t.strings[i]=="string"?T.base64.decode(t.strings[i],o.strings[i]=T.newBuffer(T.base64.length(t.strings[i])),0):t.strings[i].length>=0&&(o.strings[i]=t.strings[i])}if(t.tensors){if(!Array.isArray(t.tensors))throw TypeError(".onnx.AttributeProto.tensors: array expected");o.tensors=[];for(var i=0;i<t.tensors.length;++i){if(typeof t.tensors[i]!="object")throw TypeError(".onnx.AttributeProto.tensors: object expected");o.tensors[i]=w.onnx.TensorProto.fromObject(t.tensors[i])}}if(t.graphs){if(!Array.isArray(t.graphs))throw TypeError(".onnx.AttributeProto.graphs: array expected");o.graphs=[];for(var i=0;i<t.graphs.length;++i){if(typeof t.graphs[i]!="object")throw TypeError(".onnx.AttributeProto.graphs: object expected");o.graphs[i]=w.onnx.GraphProto.fromObject(t.graphs[i])}}if(t.sparseTensors){if(!Array.isArray(t.sparseTensors))throw TypeError(".onnx.AttributeProto.sparseTensors: array expected");o.sparseTensors=[];for(var i=0;i<t.sparseTensors.length;++i){if(typeof t.sparseTensors[i]!="object")throw TypeError(".onnx.AttributeProto.sparseTensors: object expected");o.sparseTensors[i]=w.onnx.SparseTensorProto.fromObject(t.sparseTensors[i])}}if(t.typeProtos){if(!Array.isArray(t.typeProtos))throw TypeError(".onnx.AttributeProto.typeProtos: array expected");o.typeProtos=[];for(var i=0;i<t.typeProtos.length;++i){if(typeof t.typeProtos[i]!="object")throw TypeError(".onnx.AttributeProto.typeProtos: object expected");o.typeProtos[i]=w.onnx.TypeProto.fromObject(t.typeProtos[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.floats=[],i.ints=[],i.strings=[],i.tensors=[],i.graphs=[],i.typeProtos=[],i.sparseTensors=[]),o.defaults){if(i.name="",i.f=0,T.Long){var s=new T.Long(0,0,!1);i.i=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.i=o.longs===String?"0":0;o.bytes===String?i.s="":(i.s=[],o.bytes!==Array&&(i.s=T.newBuffer(i.s))),i.t=null,i.g=null,i.docString="",i.tp=null,i.type=o.enums===String?"UNDEFINED":0,i.refAttrName="",i.sparseTensor=null}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.f!=null&&t.hasOwnProperty("f")&&(i.f=o.json&&!isFinite(t.f)?String(t.f):t.f),t.i!=null&&t.hasOwnProperty("i")&&(typeof t.i=="number"?i.i=o.longs===String?String(t.i):t.i:i.i=o.longs===String?T.Long.prototype.toString.call(t.i):o.longs===Number?new T.LongBits(t.i.low>>>0,t.i.high>>>0).toNumber():t.i),t.s!=null&&t.hasOwnProperty("s")&&(i.s=o.bytes===String?T.base64.encode(t.s,0,t.s.length):o.bytes===Array?Array.prototype.slice.call(t.s):t.s),t.t!=null&&t.hasOwnProperty("t")&&(i.t=w.onnx.TensorProto.toObject(t.t,o)),t.g!=null&&t.hasOwnProperty("g")&&(i.g=w.onnx.GraphProto.toObject(t.g,o)),t.floats&&t.floats.length){i.floats=[];for(var a=0;a<t.floats.length;++a)i.floats[a]=o.json&&!isFinite(t.floats[a])?String(t.floats[a]):t.floats[a]}if(t.ints&&t.ints.length){i.ints=[];for(var a=0;a<t.ints.length;++a)typeof t.ints[a]=="number"?i.ints[a]=o.longs===String?String(t.ints[a]):t.ints[a]:i.ints[a]=o.longs===String?T.Long.prototype.toString.call(t.ints[a]):o.longs===Number?new T.LongBits(t.ints[a].low>>>0,t.ints[a].high>>>0).toNumber():t.ints[a]}if(t.strings&&t.strings.length){i.strings=[];for(var a=0;a<t.strings.length;++a)i.strings[a]=o.bytes===String?T.base64.encode(t.strings[a],0,t.strings[a].length):o.bytes===Array?Array.prototype.slice.call(t.strings[a]):t.strings[a]}if(t.tensors&&t.tensors.length){i.tensors=[];for(var a=0;a<t.tensors.length;++a)i.tensors[a]=w.onnx.TensorProto.toObject(t.tensors[a],o)}if(t.graphs&&t.graphs.length){i.graphs=[];for(var a=0;a<t.graphs.length;++a)i.graphs[a]=w.onnx.GraphProto.toObject(t.graphs[a],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.tp!=null&&t.hasOwnProperty("tp")&&(i.tp=w.onnx.TypeProto.toObject(t.tp,o)),t.typeProtos&&t.typeProtos.length){i.typeProtos=[];for(var a=0;a<t.typeProtos.length;++a)i.typeProtos[a]=w.onnx.TypeProto.toObject(t.typeProtos[a],o)}if(t.type!=null&&t.hasOwnProperty("type")&&(i.type=o.enums===String?w.onnx.AttributeProto.AttributeType[t.type]===void 0?t.type:w.onnx.AttributeProto.AttributeType[t.type]:t.type),t.refAttrName!=null&&t.hasOwnProperty("refAttrName")&&(i.refAttrName=t.refAttrName),t.sparseTensor!=null&&t.hasOwnProperty("sparseTensor")&&(i.sparseTensor=w.onnx.SparseTensorProto.toObject(t.sparseTensor,o)),t.sparseTensors&&t.sparseTensors.length){i.sparseTensors=[];for(var a=0;a<t.sparseTensors.length;++a)i.sparseTensors[a]=w.onnx.SparseTensorProto.toObject(t.sparseTensors[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.AttributeProto"},e.AttributeType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="INT"]=2,t[n[3]="STRING"]=3,t[n[4]="TENSOR"]=4,t[n[5]="GRAPH"]=5,t[n[11]="SPARSE_TENSOR"]=11,t[n[13]="TYPE_PROTO"]=13,t[n[6]="FLOATS"]=6,t[n[7]="INTS"]=7,t[n[8]="STRINGS"]=8,t[n[9]="TENSORS"]=9,t[n[10]="GRAPHS"]=10,t[n[12]="SPARSE_TENSORS"]=12,t[n[14]="TYPE_PROTOS"]=14,t}(),e}(),r.ValueInfoProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.type=null,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ke.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.type!=null&&Object.hasOwnProperty.call(t,"type")&&w.onnx.TypeProto.encode(t.type,o.uint32(18).fork()).ldelim(),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(26).string(t.docString),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.ValueInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 2:{s.type=w.onnx.TypeProto.decode(t,t.uint32());break}case 3:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.type!=null&&t.hasOwnProperty("type")){var o=w.onnx.TypeProto.verify(t.type);if(o)return"type."+o}return t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.ValueInfoProto)return t;var o=new w.onnx.ValueInfoProto;if(t.name!=null&&(o.name=String(t.name)),t.type!=null){if(typeof t.type!="object")throw TypeError(".onnx.ValueInfoProto.type: object expected");o.type=w.onnx.TypeProto.fromObject(t.type)}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.name="",i.type=null,i.docString=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.type!=null&&t.hasOwnProperty("type")&&(i.type=w.onnx.TypeProto.toObject(t.type,o)),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ValueInfoProto"},e}(),r.NodeProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.name="",e.prototype.opType="",e.prototype.domain="",e.prototype.attribute=T.emptyArray,e.prototype.docString="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(10).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(18).string(t.output[i]);if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(26).string(t.name),t.opType!=null&&Object.hasOwnProperty.call(t,"opType")&&o.uint32(34).string(t.opType),t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)w.onnx.AttributeProto.encode(t.attribute[i],o.uint32(42).fork()).ldelim();return t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(58).string(t.domain),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.NodeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 2:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 3:{s.name=t.string();break}case 4:{s.opType=t.string();break}case 7:{s.domain=t.string();break}case 5:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(w.onnx.AttributeProto.decode(t,t.uint32()));break}case 6:{s.docString=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!T.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!T.isString(t.output[o]))return"output: string[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.opType!=null&&t.hasOwnProperty("opType")&&!T.isString(t.opType))return"opType: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain))return"domain: string expected";if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o){var i=w.onnx.AttributeProto.verify(t.attribute[o]);if(i)return"attribute."+i}}return t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString)?"docString: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.NodeProto)return t;var o=new w.onnx.NodeProto;if(t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.NodeProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.NodeProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.name!=null&&(o.name=String(t.name)),t.opType!=null&&(o.opType=String(t.opType)),t.domain!=null&&(o.domain=String(t.domain)),t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.NodeProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i){if(typeof t.attribute[i]!="object")throw TypeError(".onnx.NodeProto.attribute: object expected");o.attribute[i]=w.onnx.AttributeProto.fromObject(t.attribute[i])}}return t.docString!=null&&(o.docString=String(t.docString)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[]),o.defaults&&(i.name="",i.opType="",i.docString="",i.domain=""),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.opType!=null&&t.hasOwnProperty("opType")&&(i.opType=t.opType),t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=w.onnx.AttributeProto.toObject(t.attribute[s],o)}return t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.NodeProto"},e}(),r.TrainingInfoProto=function(){function e(n){if(this.initializationBinding=[],this.updateBinding=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.initialization=null,e.prototype.algorithm=null,e.prototype.initializationBinding=T.emptyArray,e.prototype.updateBinding=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.initialization!=null&&Object.hasOwnProperty.call(t,"initialization")&&w.onnx.GraphProto.encode(t.initialization,o.uint32(10).fork()).ldelim(),t.algorithm!=null&&Object.hasOwnProperty.call(t,"algorithm")&&w.onnx.GraphProto.encode(t.algorithm,o.uint32(18).fork()).ldelim(),t.initializationBinding!=null&&t.initializationBinding.length)for(var i=0;i<t.initializationBinding.length;++i)w.onnx.StringStringEntryProto.encode(t.initializationBinding[i],o.uint32(26).fork()).ldelim();if(t.updateBinding!=null&&t.updateBinding.length)for(var i=0;i<t.updateBinding.length;++i)w.onnx.StringStringEntryProto.encode(t.updateBinding[i],o.uint32(34).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TrainingInfoProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.initialization=w.onnx.GraphProto.decode(t,t.uint32());break}case 2:{s.algorithm=w.onnx.GraphProto.decode(t,t.uint32());break}case 3:{s.initializationBinding&&s.initializationBinding.length||(s.initializationBinding=[]),s.initializationBinding.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 4:{s.updateBinding&&s.updateBinding.length||(s.updateBinding=[]),s.updateBinding.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.initialization!=null&&t.hasOwnProperty("initialization")){var o=w.onnx.GraphProto.verify(t.initialization);if(o)return"initialization."+o}if(t.algorithm!=null&&t.hasOwnProperty("algorithm")){var o=w.onnx.GraphProto.verify(t.algorithm);if(o)return"algorithm."+o}if(t.initializationBinding!=null&&t.hasOwnProperty("initializationBinding")){if(!Array.isArray(t.initializationBinding))return"initializationBinding: array expected";for(var i=0;i<t.initializationBinding.length;++i){var o=w.onnx.StringStringEntryProto.verify(t.initializationBinding[i]);if(o)return"initializationBinding."+o}}if(t.updateBinding!=null&&t.hasOwnProperty("updateBinding")){if(!Array.isArray(t.updateBinding))return"updateBinding: array expected";for(var i=0;i<t.updateBinding.length;++i){var o=w.onnx.StringStringEntryProto.verify(t.updateBinding[i]);if(o)return"updateBinding."+o}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TrainingInfoProto)return t;var o=new w.onnx.TrainingInfoProto;if(t.initialization!=null){if(typeof t.initialization!="object")throw TypeError(".onnx.TrainingInfoProto.initialization: object expected");o.initialization=w.onnx.GraphProto.fromObject(t.initialization)}if(t.algorithm!=null){if(typeof t.algorithm!="object")throw TypeError(".onnx.TrainingInfoProto.algorithm: object expected");o.algorithm=w.onnx.GraphProto.fromObject(t.algorithm)}if(t.initializationBinding){if(!Array.isArray(t.initializationBinding))throw TypeError(".onnx.TrainingInfoProto.initializationBinding: array expected");o.initializationBinding=[];for(var i=0;i<t.initializationBinding.length;++i){if(typeof t.initializationBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.initializationBinding: object expected");o.initializationBinding[i]=w.onnx.StringStringEntryProto.fromObject(t.initializationBinding[i])}}if(t.updateBinding){if(!Array.isArray(t.updateBinding))throw TypeError(".onnx.TrainingInfoProto.updateBinding: array expected");o.updateBinding=[];for(var i=0;i<t.updateBinding.length;++i){if(typeof t.updateBinding[i]!="object")throw TypeError(".onnx.TrainingInfoProto.updateBinding: object expected");o.updateBinding[i]=w.onnx.StringStringEntryProto.fromObject(t.updateBinding[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.initializationBinding=[],i.updateBinding=[]),o.defaults&&(i.initialization=null,i.algorithm=null),t.initialization!=null&&t.hasOwnProperty("initialization")&&(i.initialization=w.onnx.GraphProto.toObject(t.initialization,o)),t.algorithm!=null&&t.hasOwnProperty("algorithm")&&(i.algorithm=w.onnx.GraphProto.toObject(t.algorithm,o)),t.initializationBinding&&t.initializationBinding.length){i.initializationBinding=[];for(var s=0;s<t.initializationBinding.length;++s)i.initializationBinding[s]=w.onnx.StringStringEntryProto.toObject(t.initializationBinding[s],o)}if(t.updateBinding&&t.updateBinding.length){i.updateBinding=[];for(var s=0;s<t.updateBinding.length;++s)i.updateBinding[s]=w.onnx.StringStringEntryProto.toObject(t.updateBinding[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TrainingInfoProto"},e}(),r.ModelProto=function(){function e(n){if(this.opsetImport=[],this.metadataProps=[],this.trainingInfo=[],this.functions=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.irVersion=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.opsetImport=T.emptyArray,e.prototype.producerName="",e.prototype.producerVersion="",e.prototype.domain="",e.prototype.modelVersion=T.Long?T.Long.fromBits(0,0,!1):0,e.prototype.docString="",e.prototype.graph=null,e.prototype.metadataProps=T.emptyArray,e.prototype.trainingInfo=T.emptyArray,e.prototype.functions=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.irVersion!=null&&Object.hasOwnProperty.call(t,"irVersion")&&o.uint32(8).int64(t.irVersion),t.producerName!=null&&Object.hasOwnProperty.call(t,"producerName")&&o.uint32(18).string(t.producerName),t.producerVersion!=null&&Object.hasOwnProperty.call(t,"producerVersion")&&o.uint32(26).string(t.producerVersion),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(34).string(t.domain),t.modelVersion!=null&&Object.hasOwnProperty.call(t,"modelVersion")&&o.uint32(40).int64(t.modelVersion),t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(50).string(t.docString),t.graph!=null&&Object.hasOwnProperty.call(t,"graph")&&w.onnx.GraphProto.encode(t.graph,o.uint32(58).fork()).ldelim(),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)w.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(66).fork()).ldelim();if(t.metadataProps!=null&&t.metadataProps.length)for(var i=0;i<t.metadataProps.length;++i)w.onnx.StringStringEntryProto.encode(t.metadataProps[i],o.uint32(114).fork()).ldelim();if(t.trainingInfo!=null&&t.trainingInfo.length)for(var i=0;i<t.trainingInfo.length;++i)w.onnx.TrainingInfoProto.encode(t.trainingInfo[i],o.uint32(162).fork()).ldelim();if(t.functions!=null&&t.functions.length)for(var i=0;i<t.functions.length;++i)w.onnx.FunctionProto.encode(t.functions[i],o.uint32(202).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.ModelProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.irVersion=t.int64();break}case 8:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(w.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 2:{s.producerName=t.string();break}case 3:{s.producerVersion=t.string();break}case 4:{s.domain=t.string();break}case 5:{s.modelVersion=t.int64();break}case 6:{s.docString=t.string();break}case 7:{s.graph=w.onnx.GraphProto.decode(t,t.uint32());break}case 14:{s.metadataProps&&s.metadataProps.length||(s.metadataProps=[]),s.metadataProps.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 20:{s.trainingInfo&&s.trainingInfo.length||(s.trainingInfo=[]),s.trainingInfo.push(w.onnx.TrainingInfoProto.decode(t,t.uint32()));break}case 25:{s.functions&&s.functions.length||(s.functions=[]),s.functions.push(w.onnx.FunctionProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&!T.isInteger(t.irVersion)&&!(t.irVersion&&T.isInteger(t.irVersion.low)&&T.isInteger(t.irVersion.high)))return"irVersion: integer|Long expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=w.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}if(t.producerName!=null&&t.hasOwnProperty("producerName")&&!T.isString(t.producerName))return"producerName: string expected";if(t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&!T.isString(t.producerVersion))return"producerVersion: string expected";if(t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain))return"domain: string expected";if(t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&!T.isInteger(t.modelVersion)&&!(t.modelVersion&&T.isInteger(t.modelVersion.low)&&T.isInteger(t.modelVersion.high)))return"modelVersion: integer|Long expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.graph!=null&&t.hasOwnProperty("graph")){var i=w.onnx.GraphProto.verify(t.graph);if(i)return"graph."+i}if(t.metadataProps!=null&&t.hasOwnProperty("metadataProps")){if(!Array.isArray(t.metadataProps))return"metadataProps: array expected";for(var o=0;o<t.metadataProps.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.metadataProps[o]);if(i)return"metadataProps."+i}}if(t.trainingInfo!=null&&t.hasOwnProperty("trainingInfo")){if(!Array.isArray(t.trainingInfo))return"trainingInfo: array expected";for(var o=0;o<t.trainingInfo.length;++o){var i=w.onnx.TrainingInfoProto.verify(t.trainingInfo[o]);if(i)return"trainingInfo."+i}}if(t.functions!=null&&t.hasOwnProperty("functions")){if(!Array.isArray(t.functions))return"functions: array expected";for(var o=0;o<t.functions.length;++o){var i=w.onnx.FunctionProto.verify(t.functions[o]);if(i)return"functions."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.ModelProto)return t;var o=new w.onnx.ModelProto;if(t.irVersion!=null&&(T.Long?(o.irVersion=T.Long.fromValue(t.irVersion)).unsigned=!1:typeof t.irVersion=="string"?o.irVersion=parseInt(t.irVersion,10):typeof t.irVersion=="number"?o.irVersion=t.irVersion:typeof t.irVersion=="object"&&(o.irVersion=new T.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber())),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.ModelProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.ModelProto.opsetImport: object expected");o.opsetImport[i]=w.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}if(t.producerName!=null&&(o.producerName=String(t.producerName)),t.producerVersion!=null&&(o.producerVersion=String(t.producerVersion)),t.domain!=null&&(o.domain=String(t.domain)),t.modelVersion!=null&&(T.Long?(o.modelVersion=T.Long.fromValue(t.modelVersion)).unsigned=!1:typeof t.modelVersion=="string"?o.modelVersion=parseInt(t.modelVersion,10):typeof t.modelVersion=="number"?o.modelVersion=t.modelVersion:typeof t.modelVersion=="object"&&(o.modelVersion=new T.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber())),t.docString!=null&&(o.docString=String(t.docString)),t.graph!=null){if(typeof t.graph!="object")throw TypeError(".onnx.ModelProto.graph: object expected");o.graph=w.onnx.GraphProto.fromObject(t.graph)}if(t.metadataProps){if(!Array.isArray(t.metadataProps))throw TypeError(".onnx.ModelProto.metadataProps: array expected");o.metadataProps=[];for(var i=0;i<t.metadataProps.length;++i){if(typeof t.metadataProps[i]!="object")throw TypeError(".onnx.ModelProto.metadataProps: object expected");o.metadataProps[i]=w.onnx.StringStringEntryProto.fromObject(t.metadataProps[i])}}if(t.trainingInfo){if(!Array.isArray(t.trainingInfo))throw TypeError(".onnx.ModelProto.trainingInfo: array expected");o.trainingInfo=[];for(var i=0;i<t.trainingInfo.length;++i){if(typeof t.trainingInfo[i]!="object")throw TypeError(".onnx.ModelProto.trainingInfo: object expected");o.trainingInfo[i]=w.onnx.TrainingInfoProto.fromObject(t.trainingInfo[i])}}if(t.functions){if(!Array.isArray(t.functions))throw TypeError(".onnx.ModelProto.functions: array expected");o.functions=[];for(var i=0;i<t.functions.length;++i){if(typeof t.functions[i]!="object")throw TypeError(".onnx.ModelProto.functions: object expected");o.functions[i]=w.onnx.FunctionProto.fromObject(t.functions[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.opsetImport=[],i.metadataProps=[],i.trainingInfo=[],i.functions=[]),o.defaults){if(T.Long){var s=new T.Long(0,0,!1);i.irVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.irVersion=o.longs===String?"0":0;if(i.producerName="",i.producerVersion="",i.domain="",T.Long){var s=new T.Long(0,0,!1);i.modelVersion=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.modelVersion=o.longs===String?"0":0;i.docString="",i.graph=null}if(t.irVersion!=null&&t.hasOwnProperty("irVersion")&&(typeof t.irVersion=="number"?i.irVersion=o.longs===String?String(t.irVersion):t.irVersion:i.irVersion=o.longs===String?T.Long.prototype.toString.call(t.irVersion):o.longs===Number?new T.LongBits(t.irVersion.low>>>0,t.irVersion.high>>>0).toNumber():t.irVersion),t.producerName!=null&&t.hasOwnProperty("producerName")&&(i.producerName=t.producerName),t.producerVersion!=null&&t.hasOwnProperty("producerVersion")&&(i.producerVersion=t.producerVersion),t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.modelVersion!=null&&t.hasOwnProperty("modelVersion")&&(typeof t.modelVersion=="number"?i.modelVersion=o.longs===String?String(t.modelVersion):t.modelVersion:i.modelVersion=o.longs===String?T.Long.prototype.toString.call(t.modelVersion):o.longs===Number?new T.LongBits(t.modelVersion.low>>>0,t.modelVersion.high>>>0).toNumber():t.modelVersion),t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.graph!=null&&t.hasOwnProperty("graph")&&(i.graph=w.onnx.GraphProto.toObject(t.graph,o)),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var a=0;a<t.opsetImport.length;++a)i.opsetImport[a]=w.onnx.OperatorSetIdProto.toObject(t.opsetImport[a],o)}if(t.metadataProps&&t.metadataProps.length){i.metadataProps=[];for(var a=0;a<t.metadataProps.length;++a)i.metadataProps[a]=w.onnx.StringStringEntryProto.toObject(t.metadataProps[a],o)}if(t.trainingInfo&&t.trainingInfo.length){i.trainingInfo=[];for(var a=0;a<t.trainingInfo.length;++a)i.trainingInfo[a]=w.onnx.TrainingInfoProto.toObject(t.trainingInfo[a],o)}if(t.functions&&t.functions.length){i.functions=[];for(var a=0;a<t.functions.length;++a)i.functions[a]=w.onnx.FunctionProto.toObject(t.functions[a],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.ModelProto"},e}(),r.StringStringEntryProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.key="",e.prototype.value="",e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ke.create()),t.key!=null&&Object.hasOwnProperty.call(t,"key")&&o.uint32(10).string(t.key),t.value!=null&&Object.hasOwnProperty.call(t,"value")&&o.uint32(18).string(t.value),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.StringStringEntryProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.key=t.string();break}case 2:{s.value=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.key!=null&&t.hasOwnProperty("key")&&!T.isString(t.key)?"key: string expected":t.value!=null&&t.hasOwnProperty("value")&&!T.isString(t.value)?"value: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.StringStringEntryProto)return t;var o=new w.onnx.StringStringEntryProto;return t.key!=null&&(o.key=String(t.key)),t.value!=null&&(o.value=String(t.value)),o},e.toObject=function(t,o){o||(o={});var i={};return o.defaults&&(i.key="",i.value=""),t.key!=null&&t.hasOwnProperty("key")&&(i.key=t.key),t.value!=null&&t.hasOwnProperty("value")&&(i.value=t.value),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.StringStringEntryProto"},e}(),r.TensorAnnotation=function(){function e(n){if(this.quantParameterTensorNames=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.tensorName="",e.prototype.quantParameterTensorNames=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.tensorName!=null&&Object.hasOwnProperty.call(t,"tensorName")&&o.uint32(10).string(t.tensorName),t.quantParameterTensorNames!=null&&t.quantParameterTensorNames.length)for(var i=0;i<t.quantParameterTensorNames.length;++i)w.onnx.StringStringEntryProto.encode(t.quantParameterTensorNames[i],o.uint32(18).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorAnnotation;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.tensorName=t.string();break}case 2:{s.quantParameterTensorNames&&s.quantParameterTensorNames.length||(s.quantParameterTensorNames=[]),s.quantParameterTensorNames.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.tensorName!=null&&t.hasOwnProperty("tensorName")&&!T.isString(t.tensorName))return"tensorName: string expected";if(t.quantParameterTensorNames!=null&&t.hasOwnProperty("quantParameterTensorNames")){if(!Array.isArray(t.quantParameterTensorNames))return"quantParameterTensorNames: array expected";for(var o=0;o<t.quantParameterTensorNames.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.quantParameterTensorNames[o]);if(i)return"quantParameterTensorNames."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorAnnotation)return t;var o=new w.onnx.TensorAnnotation;if(t.tensorName!=null&&(o.tensorName=String(t.tensorName)),t.quantParameterTensorNames){if(!Array.isArray(t.quantParameterTensorNames))throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: array expected");o.quantParameterTensorNames=[];for(var i=0;i<t.quantParameterTensorNames.length;++i){if(typeof t.quantParameterTensorNames[i]!="object")throw TypeError(".onnx.TensorAnnotation.quantParameterTensorNames: object expected");o.quantParameterTensorNames[i]=w.onnx.StringStringEntryProto.fromObject(t.quantParameterTensorNames[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.quantParameterTensorNames=[]),o.defaults&&(i.tensorName=""),t.tensorName!=null&&t.hasOwnProperty("tensorName")&&(i.tensorName=t.tensorName),t.quantParameterTensorNames&&t.quantParameterTensorNames.length){i.quantParameterTensorNames=[];for(var s=0;s<t.quantParameterTensorNames.length;++s)i.quantParameterTensorNames[s]=w.onnx.StringStringEntryProto.toObject(t.quantParameterTensorNames[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorAnnotation"},e}(),r.GraphProto=function(){function e(n){if(this.node=[],this.initializer=[],this.sparseInitializer=[],this.input=[],this.output=[],this.valueInfo=[],this.quantizationAnnotation=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.node=T.emptyArray,e.prototype.name="",e.prototype.initializer=T.emptyArray,e.prototype.sparseInitializer=T.emptyArray,e.prototype.docString="",e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.valueInfo=T.emptyArray,e.prototype.quantizationAnnotation=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)w.onnx.NodeProto.encode(t.node[i],o.uint32(10).fork()).ldelim();if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(18).string(t.name),t.initializer!=null&&t.initializer.length)for(var i=0;i<t.initializer.length;++i)w.onnx.TensorProto.encode(t.initializer[i],o.uint32(42).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(82).string(t.docString),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)w.onnx.ValueInfoProto.encode(t.input[i],o.uint32(90).fork()).ldelim();if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)w.onnx.ValueInfoProto.encode(t.output[i],o.uint32(98).fork()).ldelim();if(t.valueInfo!=null&&t.valueInfo.length)for(var i=0;i<t.valueInfo.length;++i)w.onnx.ValueInfoProto.encode(t.valueInfo[i],o.uint32(106).fork()).ldelim();if(t.quantizationAnnotation!=null&&t.quantizationAnnotation.length)for(var i=0;i<t.quantizationAnnotation.length;++i)w.onnx.TensorAnnotation.encode(t.quantizationAnnotation[i],o.uint32(114).fork()).ldelim();if(t.sparseInitializer!=null&&t.sparseInitializer.length)for(var i=0;i<t.sparseInitializer.length;++i)w.onnx.SparseTensorProto.encode(t.sparseInitializer[i],o.uint32(122).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.GraphProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.node&&s.node.length||(s.node=[]),s.node.push(w.onnx.NodeProto.decode(t,t.uint32()));break}case 2:{s.name=t.string();break}case 5:{s.initializer&&s.initializer.length||(s.initializer=[]),s.initializer.push(w.onnx.TensorProto.decode(t,t.uint32()));break}case 15:{s.sparseInitializer&&s.sparseInitializer.length||(s.sparseInitializer=[]),s.sparseInitializer.push(w.onnx.SparseTensorProto.decode(t,t.uint32()));break}case 10:{s.docString=t.string();break}case 11:{s.input&&s.input.length||(s.input=[]),s.input.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 12:{s.output&&s.output.length||(s.output=[]),s.output.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 13:{s.valueInfo&&s.valueInfo.length||(s.valueInfo=[]),s.valueInfo.push(w.onnx.ValueInfoProto.decode(t,t.uint32()));break}case 14:{s.quantizationAnnotation&&s.quantizationAnnotation.length||(s.quantizationAnnotation=[]),s.quantizationAnnotation.push(w.onnx.TensorAnnotation.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=w.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.initializer!=null&&t.hasOwnProperty("initializer")){if(!Array.isArray(t.initializer))return"initializer: array expected";for(var o=0;o<t.initializer.length;++o){var i=w.onnx.TensorProto.verify(t.initializer[o]);if(i)return"initializer."+i}}if(t.sparseInitializer!=null&&t.hasOwnProperty("sparseInitializer")){if(!Array.isArray(t.sparseInitializer))return"sparseInitializer: array expected";for(var o=0;o<t.sparseInitializer.length;++o){var i=w.onnx.SparseTensorProto.verify(t.sparseInitializer[o]);if(i)return"sparseInitializer."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o){var i=w.onnx.ValueInfoProto.verify(t.input[o]);if(i)return"input."+i}}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o){var i=w.onnx.ValueInfoProto.verify(t.output[o]);if(i)return"output."+i}}if(t.valueInfo!=null&&t.hasOwnProperty("valueInfo")){if(!Array.isArray(t.valueInfo))return"valueInfo: array expected";for(var o=0;o<t.valueInfo.length;++o){var i=w.onnx.ValueInfoProto.verify(t.valueInfo[o]);if(i)return"valueInfo."+i}}if(t.quantizationAnnotation!=null&&t.hasOwnProperty("quantizationAnnotation")){if(!Array.isArray(t.quantizationAnnotation))return"quantizationAnnotation: array expected";for(var o=0;o<t.quantizationAnnotation.length;++o){var i=w.onnx.TensorAnnotation.verify(t.quantizationAnnotation[o]);if(i)return"quantizationAnnotation."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.GraphProto)return t;var o=new w.onnx.GraphProto;if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.GraphProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.GraphProto.node: object expected");o.node[i]=w.onnx.NodeProto.fromObject(t.node[i])}}if(t.name!=null&&(o.name=String(t.name)),t.initializer){if(!Array.isArray(t.initializer))throw TypeError(".onnx.GraphProto.initializer: array expected");o.initializer=[];for(var i=0;i<t.initializer.length;++i){if(typeof t.initializer[i]!="object")throw TypeError(".onnx.GraphProto.initializer: object expected");o.initializer[i]=w.onnx.TensorProto.fromObject(t.initializer[i])}}if(t.sparseInitializer){if(!Array.isArray(t.sparseInitializer))throw TypeError(".onnx.GraphProto.sparseInitializer: array expected");o.sparseInitializer=[];for(var i=0;i<t.sparseInitializer.length;++i){if(typeof t.sparseInitializer[i]!="object")throw TypeError(".onnx.GraphProto.sparseInitializer: object expected");o.sparseInitializer[i]=w.onnx.SparseTensorProto.fromObject(t.sparseInitializer[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.GraphProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i){if(typeof t.input[i]!="object")throw TypeError(".onnx.GraphProto.input: object expected");o.input[i]=w.onnx.ValueInfoProto.fromObject(t.input[i])}}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.GraphProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i){if(typeof t.output[i]!="object")throw TypeError(".onnx.GraphProto.output: object expected");o.output[i]=w.onnx.ValueInfoProto.fromObject(t.output[i])}}if(t.valueInfo){if(!Array.isArray(t.valueInfo))throw TypeError(".onnx.GraphProto.valueInfo: array expected");o.valueInfo=[];for(var i=0;i<t.valueInfo.length;++i){if(typeof t.valueInfo[i]!="object")throw TypeError(".onnx.GraphProto.valueInfo: object expected");o.valueInfo[i]=w.onnx.ValueInfoProto.fromObject(t.valueInfo[i])}}if(t.quantizationAnnotation){if(!Array.isArray(t.quantizationAnnotation))throw TypeError(".onnx.GraphProto.quantizationAnnotation: array expected");o.quantizationAnnotation=[];for(var i=0;i<t.quantizationAnnotation.length;++i){if(typeof t.quantizationAnnotation[i]!="object")throw TypeError(".onnx.GraphProto.quantizationAnnotation: object expected");o.quantizationAnnotation[i]=w.onnx.TensorAnnotation.fromObject(t.quantizationAnnotation[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.node=[],i.initializer=[],i.input=[],i.output=[],i.valueInfo=[],i.quantizationAnnotation=[],i.sparseInitializer=[]),o.defaults&&(i.name="",i.docString=""),t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=w.onnx.NodeProto.toObject(t.node[s],o)}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.initializer&&t.initializer.length){i.initializer=[];for(var s=0;s<t.initializer.length;++s)i.initializer[s]=w.onnx.TensorProto.toObject(t.initializer[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=w.onnx.ValueInfoProto.toObject(t.input[s],o)}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=w.onnx.ValueInfoProto.toObject(t.output[s],o)}if(t.valueInfo&&t.valueInfo.length){i.valueInfo=[];for(var s=0;s<t.valueInfo.length;++s)i.valueInfo[s]=w.onnx.ValueInfoProto.toObject(t.valueInfo[s],o)}if(t.quantizationAnnotation&&t.quantizationAnnotation.length){i.quantizationAnnotation=[];for(var s=0;s<t.quantizationAnnotation.length;++s)i.quantizationAnnotation[s]=w.onnx.TensorAnnotation.toObject(t.quantizationAnnotation[s],o)}if(t.sparseInitializer&&t.sparseInitializer.length){i.sparseInitializer=[];for(var s=0;s<t.sparseInitializer.length;++s)i.sparseInitializer[s]=w.onnx.SparseTensorProto.toObject(t.sparseInitializer[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.GraphProto"},e}(),r.TensorProto=function(){function e(n){if(this.dims=[],this.floatData=[],this.int32Data=[],this.stringData=[],this.int64Data=[],this.externalData=[],this.doubleData=[],this.uint64Data=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dims=T.emptyArray,e.prototype.dataType=0,e.prototype.segment=null,e.prototype.floatData=T.emptyArray,e.prototype.int32Data=T.emptyArray,e.prototype.stringData=T.emptyArray,e.prototype.int64Data=T.emptyArray,e.prototype.name="",e.prototype.docString="",e.prototype.rawData=T.newBuffer([]),e.prototype.externalData=T.emptyArray,e.prototype.dataLocation=0,e.prototype.doubleData=T.emptyArray,e.prototype.uint64Data=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.dims!=null&&t.dims.length){o.uint32(10).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}if(t.dataType!=null&&Object.hasOwnProperty.call(t,"dataType")&&o.uint32(16).int32(t.dataType),t.segment!=null&&Object.hasOwnProperty.call(t,"segment")&&w.onnx.TensorProto.Segment.encode(t.segment,o.uint32(26).fork()).ldelim(),t.floatData!=null&&t.floatData.length){o.uint32(34).fork();for(var i=0;i<t.floatData.length;++i)o.float(t.floatData[i]);o.ldelim()}if(t.int32Data!=null&&t.int32Data.length){o.uint32(42).fork();for(var i=0;i<t.int32Data.length;++i)o.int32(t.int32Data[i]);o.ldelim()}if(t.stringData!=null&&t.stringData.length)for(var i=0;i<t.stringData.length;++i)o.uint32(50).bytes(t.stringData[i]);if(t.int64Data!=null&&t.int64Data.length){o.uint32(58).fork();for(var i=0;i<t.int64Data.length;++i)o.int64(t.int64Data[i]);o.ldelim()}if(t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(66).string(t.name),t.rawData!=null&&Object.hasOwnProperty.call(t,"rawData")&&o.uint32(74).bytes(t.rawData),t.doubleData!=null&&t.doubleData.length){o.uint32(82).fork();for(var i=0;i<t.doubleData.length;++i)o.double(t.doubleData[i]);o.ldelim()}if(t.uint64Data!=null&&t.uint64Data.length){o.uint32(90).fork();for(var i=0;i<t.uint64Data.length;++i)o.uint64(t.uint64Data[i]);o.ldelim()}if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(98).string(t.docString),t.externalData!=null&&t.externalData.length)for(var i=0;i<t.externalData.length;++i)w.onnx.StringStringEntryProto.encode(t.externalData[i],o.uint32(106).fork()).ldelim();return t.dataLocation!=null&&Object.hasOwnProperty.call(t,"dataLocation")&&o.uint32(112).int32(t.dataLocation),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}case 2:{s.dataType=t.int32();break}case 3:{s.segment=w.onnx.TensorProto.Segment.decode(t,t.uint32());break}case 4:{if(s.floatData&&s.floatData.length||(s.floatData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.floatData.push(t.float());else s.floatData.push(t.float());break}case 5:{if(s.int32Data&&s.int32Data.length||(s.int32Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int32Data.push(t.int32());else s.int32Data.push(t.int32());break}case 6:{s.stringData&&s.stringData.length||(s.stringData=[]),s.stringData.push(t.bytes());break}case 7:{if(s.int64Data&&s.int64Data.length||(s.int64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.int64Data.push(t.int64());else s.int64Data.push(t.int64());break}case 8:{s.name=t.string();break}case 12:{s.docString=t.string();break}case 9:{s.rawData=t.bytes();break}case 13:{s.externalData&&s.externalData.length||(s.externalData=[]),s.externalData.push(w.onnx.StringStringEntryProto.decode(t,t.uint32()));break}case 14:{s.dataLocation=t.int32();break}case 10:{if(s.doubleData&&s.doubleData.length||(s.doubleData=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.doubleData.push(t.double());else s.doubleData.push(t.double());break}case 11:{if(s.uint64Data&&s.uint64Data.length||(s.uint64Data=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.uint64Data.push(t.uint64());else s.uint64Data.push(t.uint64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var o=0;o<t.dims.length;++o)if(!T.isInteger(t.dims[o])&&!(t.dims[o]&&T.isInteger(t.dims[o].low)&&T.isInteger(t.dims[o].high)))return"dims: integer|Long[] expected"}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&!T.isInteger(t.dataType))return"dataType: integer expected";if(t.segment!=null&&t.hasOwnProperty("segment")){var i=w.onnx.TensorProto.Segment.verify(t.segment);if(i)return"segment."+i}if(t.floatData!=null&&t.hasOwnProperty("floatData")){if(!Array.isArray(t.floatData))return"floatData: array expected";for(var o=0;o<t.floatData.length;++o)if(typeof t.floatData[o]!="number")return"floatData: number[] expected"}if(t.int32Data!=null&&t.hasOwnProperty("int32Data")){if(!Array.isArray(t.int32Data))return"int32Data: array expected";for(var o=0;o<t.int32Data.length;++o)if(!T.isInteger(t.int32Data[o]))return"int32Data: integer[] expected"}if(t.stringData!=null&&t.hasOwnProperty("stringData")){if(!Array.isArray(t.stringData))return"stringData: array expected";for(var o=0;o<t.stringData.length;++o)if(!(t.stringData[o]&&typeof t.stringData[o].length=="number"||T.isString(t.stringData[o])))return"stringData: buffer[] expected"}if(t.int64Data!=null&&t.hasOwnProperty("int64Data")){if(!Array.isArray(t.int64Data))return"int64Data: array expected";for(var o=0;o<t.int64Data.length;++o)if(!T.isInteger(t.int64Data[o])&&!(t.int64Data[o]&&T.isInteger(t.int64Data[o].low)&&T.isInteger(t.int64Data[o].high)))return"int64Data: integer|Long[] expected"}if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.rawData!=null&&t.hasOwnProperty("rawData")&&!(t.rawData&&typeof t.rawData.length=="number"||T.isString(t.rawData)))return"rawData: buffer expected";if(t.externalData!=null&&t.hasOwnProperty("externalData")){if(!Array.isArray(t.externalData))return"externalData: array expected";for(var o=0;o<t.externalData.length;++o){var i=w.onnx.StringStringEntryProto.verify(t.externalData[o]);if(i)return"externalData."+i}}if(t.dataLocation!=null&&t.hasOwnProperty("dataLocation"))switch(t.dataLocation){default:return"dataLocation: enum value expected";case 0:case 1:break}if(t.doubleData!=null&&t.hasOwnProperty("doubleData")){if(!Array.isArray(t.doubleData))return"doubleData: array expected";for(var o=0;o<t.doubleData.length;++o)if(typeof t.doubleData[o]!="number")return"doubleData: number[] expected"}if(t.uint64Data!=null&&t.hasOwnProperty("uint64Data")){if(!Array.isArray(t.uint64Data))return"uint64Data: array expected";for(var o=0;o<t.uint64Data.length;++o)if(!T.isInteger(t.uint64Data[o])&&!(t.uint64Data[o]&&T.isInteger(t.uint64Data[o].low)&&T.isInteger(t.uint64Data[o].high)))return"uint64Data: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorProto)return t;var o=new w.onnx.TensorProto;if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.TensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)T.Long?(o.dims[i]=T.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new T.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}if(t.dataType!=null&&(o.dataType=t.dataType|0),t.segment!=null){if(typeof t.segment!="object")throw TypeError(".onnx.TensorProto.segment: object expected");o.segment=w.onnx.TensorProto.Segment.fromObject(t.segment)}if(t.floatData){if(!Array.isArray(t.floatData))throw TypeError(".onnx.TensorProto.floatData: array expected");o.floatData=[];for(var i=0;i<t.floatData.length;++i)o.floatData[i]=Number(t.floatData[i])}if(t.int32Data){if(!Array.isArray(t.int32Data))throw TypeError(".onnx.TensorProto.int32Data: array expected");o.int32Data=[];for(var i=0;i<t.int32Data.length;++i)o.int32Data[i]=t.int32Data[i]|0}if(t.stringData){if(!Array.isArray(t.stringData))throw TypeError(".onnx.TensorProto.stringData: array expected");o.stringData=[];for(var i=0;i<t.stringData.length;++i)typeof t.stringData[i]=="string"?T.base64.decode(t.stringData[i],o.stringData[i]=T.newBuffer(T.base64.length(t.stringData[i])),0):t.stringData[i].length>=0&&(o.stringData[i]=t.stringData[i])}if(t.int64Data){if(!Array.isArray(t.int64Data))throw TypeError(".onnx.TensorProto.int64Data: array expected");o.int64Data=[];for(var i=0;i<t.int64Data.length;++i)T.Long?(o.int64Data[i]=T.Long.fromValue(t.int64Data[i])).unsigned=!1:typeof t.int64Data[i]=="string"?o.int64Data[i]=parseInt(t.int64Data[i],10):typeof t.int64Data[i]=="number"?o.int64Data[i]=t.int64Data[i]:typeof t.int64Data[i]=="object"&&(o.int64Data[i]=new T.LongBits(t.int64Data[i].low>>>0,t.int64Data[i].high>>>0).toNumber())}if(t.name!=null&&(o.name=String(t.name)),t.docString!=null&&(o.docString=String(t.docString)),t.rawData!=null&&(typeof t.rawData=="string"?T.base64.decode(t.rawData,o.rawData=T.newBuffer(T.base64.length(t.rawData)),0):t.rawData.length>=0&&(o.rawData=t.rawData)),t.externalData){if(!Array.isArray(t.externalData))throw TypeError(".onnx.TensorProto.externalData: array expected");o.externalData=[];for(var i=0;i<t.externalData.length;++i){if(typeof t.externalData[i]!="object")throw TypeError(".onnx.TensorProto.externalData: object expected");o.externalData[i]=w.onnx.StringStringEntryProto.fromObject(t.externalData[i])}}switch(t.dataLocation){default:if(typeof t.dataLocation=="number"){o.dataLocation=t.dataLocation;break}break;case"DEFAULT":case 0:o.dataLocation=0;break;case"EXTERNAL":case 1:o.dataLocation=1;break}if(t.doubleData){if(!Array.isArray(t.doubleData))throw TypeError(".onnx.TensorProto.doubleData: array expected");o.doubleData=[];for(var i=0;i<t.doubleData.length;++i)o.doubleData[i]=Number(t.doubleData[i])}if(t.uint64Data){if(!Array.isArray(t.uint64Data))throw TypeError(".onnx.TensorProto.uint64Data: array expected");o.uint64Data=[];for(var i=0;i<t.uint64Data.length;++i)T.Long?(o.uint64Data[i]=T.Long.fromValue(t.uint64Data[i])).unsigned=!0:typeof t.uint64Data[i]=="string"?o.uint64Data[i]=parseInt(t.uint64Data[i],10):typeof t.uint64Data[i]=="number"?o.uint64Data[i]=t.uint64Data[i]:typeof t.uint64Data[i]=="object"&&(o.uint64Data[i]=new T.LongBits(t.uint64Data[i].low>>>0,t.uint64Data[i].high>>>0).toNumber(!0))}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[],i.floatData=[],i.int32Data=[],i.stringData=[],i.int64Data=[],i.doubleData=[],i.uint64Data=[],i.externalData=[]),o.defaults&&(i.dataType=0,i.segment=null,i.name="",o.bytes===String?i.rawData="":(i.rawData=[],o.bytes!==Array&&(i.rawData=T.newBuffer(i.rawData))),i.docString="",i.dataLocation=o.enums===String?"DEFAULT":0),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?T.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new T.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}if(t.dataType!=null&&t.hasOwnProperty("dataType")&&(i.dataType=t.dataType),t.segment!=null&&t.hasOwnProperty("segment")&&(i.segment=w.onnx.TensorProto.Segment.toObject(t.segment,o)),t.floatData&&t.floatData.length){i.floatData=[];for(var s=0;s<t.floatData.length;++s)i.floatData[s]=o.json&&!isFinite(t.floatData[s])?String(t.floatData[s]):t.floatData[s]}if(t.int32Data&&t.int32Data.length){i.int32Data=[];for(var s=0;s<t.int32Data.length;++s)i.int32Data[s]=t.int32Data[s]}if(t.stringData&&t.stringData.length){i.stringData=[];for(var s=0;s<t.stringData.length;++s)i.stringData[s]=o.bytes===String?T.base64.encode(t.stringData[s],0,t.stringData[s].length):o.bytes===Array?Array.prototype.slice.call(t.stringData[s]):t.stringData[s]}if(t.int64Data&&t.int64Data.length){i.int64Data=[];for(var s=0;s<t.int64Data.length;++s)typeof t.int64Data[s]=="number"?i.int64Data[s]=o.longs===String?String(t.int64Data[s]):t.int64Data[s]:i.int64Data[s]=o.longs===String?T.Long.prototype.toString.call(t.int64Data[s]):o.longs===Number?new T.LongBits(t.int64Data[s].low>>>0,t.int64Data[s].high>>>0).toNumber():t.int64Data[s]}if(t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.rawData!=null&&t.hasOwnProperty("rawData")&&(i.rawData=o.bytes===String?T.base64.encode(t.rawData,0,t.rawData.length):o.bytes===Array?Array.prototype.slice.call(t.rawData):t.rawData),t.doubleData&&t.doubleData.length){i.doubleData=[];for(var s=0;s<t.doubleData.length;++s)i.doubleData[s]=o.json&&!isFinite(t.doubleData[s])?String(t.doubleData[s]):t.doubleData[s]}if(t.uint64Data&&t.uint64Data.length){i.uint64Data=[];for(var s=0;s<t.uint64Data.length;++s)typeof t.uint64Data[s]=="number"?i.uint64Data[s]=o.longs===String?String(t.uint64Data[s]):t.uint64Data[s]:i.uint64Data[s]=o.longs===String?T.Long.prototype.toString.call(t.uint64Data[s]):o.longs===Number?new T.LongBits(t.uint64Data[s].low>>>0,t.uint64Data[s].high>>>0).toNumber(!0):t.uint64Data[s]}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.externalData&&t.externalData.length){i.externalData=[];for(var s=0;s<t.externalData.length;++s)i.externalData[s]=w.onnx.StringStringEntryProto.toObject(t.externalData[s],o)}return t.dataLocation!=null&&t.hasOwnProperty("dataLocation")&&(i.dataLocation=o.enums===String?w.onnx.TensorProto.DataLocation[t.dataLocation]===void 0?t.dataLocation:w.onnx.TensorProto.DataLocation[t.dataLocation]:t.dataLocation),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorProto"},e.DataType=function(){var n={},t=Object.create(n);return t[n[0]="UNDEFINED"]=0,t[n[1]="FLOAT"]=1,t[n[2]="UINT8"]=2,t[n[3]="INT8"]=3,t[n[4]="UINT16"]=4,t[n[5]="INT16"]=5,t[n[6]="INT32"]=6,t[n[7]="INT64"]=7,t[n[8]="STRING"]=8,t[n[9]="BOOL"]=9,t[n[10]="FLOAT16"]=10,t[n[11]="DOUBLE"]=11,t[n[12]="UINT32"]=12,t[n[13]="UINT64"]=13,t[n[14]="COMPLEX64"]=14,t[n[15]="COMPLEX128"]=15,t[n[16]="BFLOAT16"]=16,t[n[17]="FLOAT8E4M3FN"]=17,t[n[18]="FLOAT8E4M3FNUZ"]=18,t[n[19]="FLOAT8E5M2"]=19,t[n[20]="FLOAT8E5M2FNUZ"]=20,t}(),e.Segment=function(){function n(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}return n.prototype.begin=T.Long?T.Long.fromBits(0,0,!1):0,n.prototype.end=T.Long?T.Long.fromBits(0,0,!1):0,n.create=function(o){return new n(o)},n.encode=function(o,i){return i||(i=ke.create()),o.begin!=null&&Object.hasOwnProperty.call(o,"begin")&&i.uint32(8).int64(o.begin),o.end!=null&&Object.hasOwnProperty.call(o,"end")&&i.uint32(16).int64(o.end),i},n.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},n.decode=function(o,i){o instanceof R||(o=R.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new w.onnx.TensorProto.Segment;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.begin=o.int64();break}case 2:{a.end=o.int64();break}default:o.skipType(u&7);break}}return a},n.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},n.verify=function(o){return typeof o!="object"||o===null?"object expected":o.begin!=null&&o.hasOwnProperty("begin")&&!T.isInteger(o.begin)&&!(o.begin&&T.isInteger(o.begin.low)&&T.isInteger(o.begin.high))?"begin: integer|Long expected":o.end!=null&&o.hasOwnProperty("end")&&!T.isInteger(o.end)&&!(o.end&&T.isInteger(o.end.low)&&T.isInteger(o.end.high))?"end: integer|Long expected":null},n.fromObject=function(o){if(o instanceof w.onnx.TensorProto.Segment)return o;var i=new w.onnx.TensorProto.Segment;return o.begin!=null&&(T.Long?(i.begin=T.Long.fromValue(o.begin)).unsigned=!1:typeof o.begin=="string"?i.begin=parseInt(o.begin,10):typeof o.begin=="number"?i.begin=o.begin:typeof o.begin=="object"&&(i.begin=new T.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber())),o.end!=null&&(T.Long?(i.end=T.Long.fromValue(o.end)).unsigned=!1:typeof o.end=="string"?i.end=parseInt(o.end,10):typeof o.end=="number"?i.end=o.end:typeof o.end=="object"&&(i.end=new T.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber())),i},n.toObject=function(o,i){i||(i={});var s={};if(i.defaults){if(T.Long){var a=new T.Long(0,0,!1);s.begin=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.begin=i.longs===String?"0":0;if(T.Long){var a=new T.Long(0,0,!1);s.end=i.longs===String?a.toString():i.longs===Number?a.toNumber():a}else s.end=i.longs===String?"0":0}return o.begin!=null&&o.hasOwnProperty("begin")&&(typeof o.begin=="number"?s.begin=i.longs===String?String(o.begin):o.begin:s.begin=i.longs===String?T.Long.prototype.toString.call(o.begin):i.longs===Number?new T.LongBits(o.begin.low>>>0,o.begin.high>>>0).toNumber():o.begin),o.end!=null&&o.hasOwnProperty("end")&&(typeof o.end=="number"?s.end=i.longs===String?String(o.end):o.end:s.end=i.longs===String?T.Long.prototype.toString.call(o.end):i.longs===Number?new T.LongBits(o.end.low>>>0,o.end.high>>>0).toNumber():o.end),s},n.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},n.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TensorProto.Segment"},n}(),e.DataLocation=function(){var n={},t=Object.create(n);return t[n[0]="DEFAULT"]=0,t[n[1]="EXTERNAL"]=1,t}(),e}(),r.SparseTensorProto=function(){function e(n){if(this.dims=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.values=null,e.prototype.indices=null,e.prototype.dims=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.values!=null&&Object.hasOwnProperty.call(t,"values")&&w.onnx.TensorProto.encode(t.values,o.uint32(10).fork()).ldelim(),t.indices!=null&&Object.hasOwnProperty.call(t,"indices")&&w.onnx.TensorProto.encode(t.indices,o.uint32(18).fork()).ldelim(),t.dims!=null&&t.dims.length){o.uint32(26).fork();for(var i=0;i<t.dims.length;++i)o.int64(t.dims[i]);o.ldelim()}return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.SparseTensorProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.values=w.onnx.TensorProto.decode(t,t.uint32());break}case 2:{s.indices=w.onnx.TensorProto.decode(t,t.uint32());break}case 3:{if(s.dims&&s.dims.length||(s.dims=[]),(a&7)===2)for(var u=t.uint32()+t.pos;t.pos<u;)s.dims.push(t.int64());else s.dims.push(t.int64());break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.values!=null&&t.hasOwnProperty("values")){var o=w.onnx.TensorProto.verify(t.values);if(o)return"values."+o}if(t.indices!=null&&t.hasOwnProperty("indices")){var o=w.onnx.TensorProto.verify(t.indices);if(o)return"indices."+o}if(t.dims!=null&&t.hasOwnProperty("dims")){if(!Array.isArray(t.dims))return"dims: array expected";for(var i=0;i<t.dims.length;++i)if(!T.isInteger(t.dims[i])&&!(t.dims[i]&&T.isInteger(t.dims[i].low)&&T.isInteger(t.dims[i].high)))return"dims: integer|Long[] expected"}return null},e.fromObject=function(t){if(t instanceof w.onnx.SparseTensorProto)return t;var o=new w.onnx.SparseTensorProto;if(t.values!=null){if(typeof t.values!="object")throw TypeError(".onnx.SparseTensorProto.values: object expected");o.values=w.onnx.TensorProto.fromObject(t.values)}if(t.indices!=null){if(typeof t.indices!="object")throw TypeError(".onnx.SparseTensorProto.indices: object expected");o.indices=w.onnx.TensorProto.fromObject(t.indices)}if(t.dims){if(!Array.isArray(t.dims))throw TypeError(".onnx.SparseTensorProto.dims: array expected");o.dims=[];for(var i=0;i<t.dims.length;++i)T.Long?(o.dims[i]=T.Long.fromValue(t.dims[i])).unsigned=!1:typeof t.dims[i]=="string"?o.dims[i]=parseInt(t.dims[i],10):typeof t.dims[i]=="number"?o.dims[i]=t.dims[i]:typeof t.dims[i]=="object"&&(o.dims[i]=new T.LongBits(t.dims[i].low>>>0,t.dims[i].high>>>0).toNumber())}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dims=[]),o.defaults&&(i.values=null,i.indices=null),t.values!=null&&t.hasOwnProperty("values")&&(i.values=w.onnx.TensorProto.toObject(t.values,o)),t.indices!=null&&t.hasOwnProperty("indices")&&(i.indices=w.onnx.TensorProto.toObject(t.indices,o)),t.dims&&t.dims.length){i.dims=[];for(var s=0;s<t.dims.length;++s)typeof t.dims[s]=="number"?i.dims[s]=o.longs===String?String(t.dims[s]):t.dims[s]:i.dims[s]=o.longs===String?T.Long.prototype.toString.call(t.dims[s]):o.longs===Number?new T.LongBits(t.dims[s].low>>>0,t.dims[s].high>>>0).toNumber():t.dims[s]}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.SparseTensorProto"},e}(),r.TensorShapeProto=function(){function e(n){if(this.dim=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.dim=T.emptyArray,e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.dim!=null&&t.dim.length)for(var i=0;i<t.dim.length;++i)w.onnx.TensorShapeProto.Dimension.encode(t.dim[i],o.uint32(10).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.TensorShapeProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.dim&&s.dim.length||(s.dim=[]),s.dim.push(w.onnx.TensorShapeProto.Dimension.decode(t,t.uint32()));break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.dim!=null&&t.hasOwnProperty("dim")){if(!Array.isArray(t.dim))return"dim: array expected";for(var o=0;o<t.dim.length;++o){var i=w.onnx.TensorShapeProto.Dimension.verify(t.dim[o]);if(i)return"dim."+i}}return null},e.fromObject=function(t){if(t instanceof w.onnx.TensorShapeProto)return t;var o=new w.onnx.TensorShapeProto;if(t.dim){if(!Array.isArray(t.dim))throw TypeError(".onnx.TensorShapeProto.dim: array expected");o.dim=[];for(var i=0;i<t.dim.length;++i){if(typeof t.dim[i]!="object")throw TypeError(".onnx.TensorShapeProto.dim: object expected");o.dim[i]=w.onnx.TensorShapeProto.Dimension.fromObject(t.dim[i])}}return o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.dim=[]),t.dim&&t.dim.length){i.dim=[];for(var s=0;s<t.dim.length;++s)i.dim[s]=w.onnx.TensorShapeProto.Dimension.toObject(t.dim[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.TensorShapeProto"},e.Dimension=function(){function n(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}n.prototype.dimValue=null,n.prototype.dimParam=null,n.prototype.denotation="";var t;return Object.defineProperty(n.prototype,"value",{get:T.oneOfGetter(t=["dimValue","dimParam"]),set:T.oneOfSetter(t)}),n.create=function(i){return new n(i)},n.encode=function(i,s){return s||(s=ke.create()),i.dimValue!=null&&Object.hasOwnProperty.call(i,"dimValue")&&s.uint32(8).int64(i.dimValue),i.dimParam!=null&&Object.hasOwnProperty.call(i,"dimParam")&&s.uint32(18).string(i.dimParam),i.denotation!=null&&Object.hasOwnProperty.call(i,"denotation")&&s.uint32(26).string(i.denotation),s},n.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},n.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TensorShapeProto.Dimension;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.dimValue=i.int64();break}case 2:{u.dimParam=i.string();break}case 3:{u.denotation=i.string();break}default:i.skipType(l&7);break}}return u},n.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},n.verify=function(i){if(typeof i!="object"||i===null)return"object expected";var s={};if(i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(s.value=1,!T.isInteger(i.dimValue)&&!(i.dimValue&&T.isInteger(i.dimValue.low)&&T.isInteger(i.dimValue.high))))return"dimValue: integer|Long expected";if(i.dimParam!=null&&i.hasOwnProperty("dimParam")){if(s.value===1)return"value: multiple values";if(s.value=1,!T.isString(i.dimParam))return"dimParam: string expected"}return i.denotation!=null&&i.hasOwnProperty("denotation")&&!T.isString(i.denotation)?"denotation: string expected":null},n.fromObject=function(i){if(i instanceof w.onnx.TensorShapeProto.Dimension)return i;var s=new w.onnx.TensorShapeProto.Dimension;return i.dimValue!=null&&(T.Long?(s.dimValue=T.Long.fromValue(i.dimValue)).unsigned=!1:typeof i.dimValue=="string"?s.dimValue=parseInt(i.dimValue,10):typeof i.dimValue=="number"?s.dimValue=i.dimValue:typeof i.dimValue=="object"&&(s.dimValue=new T.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber())),i.dimParam!=null&&(s.dimParam=String(i.dimParam)),i.denotation!=null&&(s.denotation=String(i.denotation)),s},n.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.denotation=""),i.dimValue!=null&&i.hasOwnProperty("dimValue")&&(typeof i.dimValue=="number"?a.dimValue=s.longs===String?String(i.dimValue):i.dimValue:a.dimValue=s.longs===String?T.Long.prototype.toString.call(i.dimValue):s.longs===Number?new T.LongBits(i.dimValue.low>>>0,i.dimValue.high>>>0).toNumber():i.dimValue,s.oneofs&&(a.value="dimValue")),i.dimParam!=null&&i.hasOwnProperty("dimParam")&&(a.dimParam=i.dimParam,s.oneofs&&(a.value="dimParam")),i.denotation!=null&&i.hasOwnProperty("denotation")&&(a.denotation=i.denotation),a},n.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},n.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TensorShapeProto.Dimension"},n}(),e}(),r.TypeProto=function(){function e(t){if(t)for(var o=Object.keys(t),i=0;i<o.length;++i)t[o[i]]!=null&&(this[o[i]]=t[o[i]])}e.prototype.tensorType=null,e.prototype.sequenceType=null,e.prototype.mapType=null,e.prototype.optionalType=null,e.prototype.sparseTensorType=null,e.prototype.denotation="";var n;return Object.defineProperty(e.prototype,"value",{get:T.oneOfGetter(n=["tensorType","sequenceType","mapType","optionalType","sparseTensorType"]),set:T.oneOfSetter(n)}),e.create=function(o){return new e(o)},e.encode=function(o,i){return i||(i=ke.create()),o.tensorType!=null&&Object.hasOwnProperty.call(o,"tensorType")&&w.onnx.TypeProto.Tensor.encode(o.tensorType,i.uint32(10).fork()).ldelim(),o.sequenceType!=null&&Object.hasOwnProperty.call(o,"sequenceType")&&w.onnx.TypeProto.Sequence.encode(o.sequenceType,i.uint32(34).fork()).ldelim(),o.mapType!=null&&Object.hasOwnProperty.call(o,"mapType")&&w.onnx.TypeProto.Map.encode(o.mapType,i.uint32(42).fork()).ldelim(),o.denotation!=null&&Object.hasOwnProperty.call(o,"denotation")&&i.uint32(50).string(o.denotation),o.sparseTensorType!=null&&Object.hasOwnProperty.call(o,"sparseTensorType")&&w.onnx.TypeProto.SparseTensor.encode(o.sparseTensorType,i.uint32(66).fork()).ldelim(),o.optionalType!=null&&Object.hasOwnProperty.call(o,"optionalType")&&w.onnx.TypeProto.Optional.encode(o.optionalType,i.uint32(74).fork()).ldelim(),i},e.encodeDelimited=function(o,i){return this.encode(o,i).ldelim()},e.decode=function(o,i){o instanceof R||(o=R.create(o));for(var s=i===void 0?o.len:o.pos+i,a=new w.onnx.TypeProto;o.pos<s;){var u=o.uint32();switch(u>>>3){case 1:{a.tensorType=w.onnx.TypeProto.Tensor.decode(o,o.uint32());break}case 4:{a.sequenceType=w.onnx.TypeProto.Sequence.decode(o,o.uint32());break}case 5:{a.mapType=w.onnx.TypeProto.Map.decode(o,o.uint32());break}case 9:{a.optionalType=w.onnx.TypeProto.Optional.decode(o,o.uint32());break}case 8:{a.sparseTensorType=w.onnx.TypeProto.SparseTensor.decode(o,o.uint32());break}case 6:{a.denotation=o.string();break}default:o.skipType(u&7);break}}return a},e.decodeDelimited=function(o){return o instanceof R||(o=new R(o)),this.decode(o,o.uint32())},e.verify=function(o){if(typeof o!="object"||o===null)return"object expected";var i={};if(o.tensorType!=null&&o.hasOwnProperty("tensorType")){i.value=1;{var s=w.onnx.TypeProto.Tensor.verify(o.tensorType);if(s)return"tensorType."+s}}if(o.sequenceType!=null&&o.hasOwnProperty("sequenceType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Sequence.verify(o.sequenceType);if(s)return"sequenceType."+s}}if(o.mapType!=null&&o.hasOwnProperty("mapType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Map.verify(o.mapType);if(s)return"mapType."+s}}if(o.optionalType!=null&&o.hasOwnProperty("optionalType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.Optional.verify(o.optionalType);if(s)return"optionalType."+s}}if(o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")){if(i.value===1)return"value: multiple values";i.value=1;{var s=w.onnx.TypeProto.SparseTensor.verify(o.sparseTensorType);if(s)return"sparseTensorType."+s}}return o.denotation!=null&&o.hasOwnProperty("denotation")&&!T.isString(o.denotation)?"denotation: string expected":null},e.fromObject=function(o){if(o instanceof w.onnx.TypeProto)return o;var i=new w.onnx.TypeProto;if(o.tensorType!=null){if(typeof o.tensorType!="object")throw TypeError(".onnx.TypeProto.tensorType: object expected");i.tensorType=w.onnx.TypeProto.Tensor.fromObject(o.tensorType)}if(o.sequenceType!=null){if(typeof o.sequenceType!="object")throw TypeError(".onnx.TypeProto.sequenceType: object expected");i.sequenceType=w.onnx.TypeProto.Sequence.fromObject(o.sequenceType)}if(o.mapType!=null){if(typeof o.mapType!="object")throw TypeError(".onnx.TypeProto.mapType: object expected");i.mapType=w.onnx.TypeProto.Map.fromObject(o.mapType)}if(o.optionalType!=null){if(typeof o.optionalType!="object")throw TypeError(".onnx.TypeProto.optionalType: object expected");i.optionalType=w.onnx.TypeProto.Optional.fromObject(o.optionalType)}if(o.sparseTensorType!=null){if(typeof o.sparseTensorType!="object")throw TypeError(".onnx.TypeProto.sparseTensorType: object expected");i.sparseTensorType=w.onnx.TypeProto.SparseTensor.fromObject(o.sparseTensorType)}return o.denotation!=null&&(i.denotation=String(o.denotation)),i},e.toObject=function(o,i){i||(i={});var s={};return i.defaults&&(s.denotation=""),o.tensorType!=null&&o.hasOwnProperty("tensorType")&&(s.tensorType=w.onnx.TypeProto.Tensor.toObject(o.tensorType,i),i.oneofs&&(s.value="tensorType")),o.sequenceType!=null&&o.hasOwnProperty("sequenceType")&&(s.sequenceType=w.onnx.TypeProto.Sequence.toObject(o.sequenceType,i),i.oneofs&&(s.value="sequenceType")),o.mapType!=null&&o.hasOwnProperty("mapType")&&(s.mapType=w.onnx.TypeProto.Map.toObject(o.mapType,i),i.oneofs&&(s.value="mapType")),o.denotation!=null&&o.hasOwnProperty("denotation")&&(s.denotation=o.denotation),o.sparseTensorType!=null&&o.hasOwnProperty("sparseTensorType")&&(s.sparseTensorType=w.onnx.TypeProto.SparseTensor.toObject(o.sparseTensorType,i),i.oneofs&&(s.value="sparseTensorType")),o.optionalType!=null&&o.hasOwnProperty("optionalType")&&(s.optionalType=w.onnx.TypeProto.Optional.toObject(o.optionalType,i),i.oneofs&&(s.value="optionalType")),s},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(o){return o===void 0&&(o="type.googleapis.com"),o+"/onnx.TypeProto"},e.Tensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=ke.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&w.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Tensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=w.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!T.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=w.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Tensor)return i;var s=new w.onnx.TypeProto.Tensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.Tensor.shape: object expected");s.shape=w.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=w.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Tensor"},t}(),e.Sequence=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=ke.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&w.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Sequence;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=w.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Sequence)return i;var s=new w.onnx.TypeProto.Sequence;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Sequence.elemType: object expected");s.elemType=w.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=w.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Sequence"},t}(),e.Map=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.keyType=0,t.prototype.valueType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=ke.create()),i.keyType!=null&&Object.hasOwnProperty.call(i,"keyType")&&s.uint32(8).int32(i.keyType),i.valueType!=null&&Object.hasOwnProperty.call(i,"valueType")&&w.onnx.TypeProto.encode(i.valueType,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Map;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.keyType=i.int32();break}case 2:{u.valueType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.keyType!=null&&i.hasOwnProperty("keyType")&&!T.isInteger(i.keyType))return"keyType: integer expected";if(i.valueType!=null&&i.hasOwnProperty("valueType")){var s=w.onnx.TypeProto.verify(i.valueType);if(s)return"valueType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Map)return i;var s=new w.onnx.TypeProto.Map;if(i.keyType!=null&&(s.keyType=i.keyType|0),i.valueType!=null){if(typeof i.valueType!="object")throw TypeError(".onnx.TypeProto.Map.valueType: object expected");s.valueType=w.onnx.TypeProto.fromObject(i.valueType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.keyType=0,a.valueType=null),i.keyType!=null&&i.hasOwnProperty("keyType")&&(a.keyType=i.keyType),i.valueType!=null&&i.hasOwnProperty("valueType")&&(a.valueType=w.onnx.TypeProto.toObject(i.valueType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Map"},t}(),e.Optional=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=ke.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&w.onnx.TypeProto.encode(i.elemType,s.uint32(10).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.Optional;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=w.onnx.TypeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")){var s=w.onnx.TypeProto.verify(i.elemType);if(s)return"elemType."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.Optional)return i;var s=new w.onnx.TypeProto.Optional;if(i.elemType!=null){if(typeof i.elemType!="object")throw TypeError(".onnx.TypeProto.Optional.elemType: object expected");s.elemType=w.onnx.TypeProto.fromObject(i.elemType)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=w.onnx.TypeProto.toObject(i.elemType,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.Optional"},t}(),e.SparseTensor=function(){function t(o){if(o)for(var i=Object.keys(o),s=0;s<i.length;++s)o[i[s]]!=null&&(this[i[s]]=o[i[s]])}return t.prototype.elemType=0,t.prototype.shape=null,t.create=function(i){return new t(i)},t.encode=function(i,s){return s||(s=ke.create()),i.elemType!=null&&Object.hasOwnProperty.call(i,"elemType")&&s.uint32(8).int32(i.elemType),i.shape!=null&&Object.hasOwnProperty.call(i,"shape")&&w.onnx.TensorShapeProto.encode(i.shape,s.uint32(18).fork()).ldelim(),s},t.encodeDelimited=function(i,s){return this.encode(i,s).ldelim()},t.decode=function(i,s){i instanceof R||(i=R.create(i));for(var a=s===void 0?i.len:i.pos+s,u=new w.onnx.TypeProto.SparseTensor;i.pos<a;){var l=i.uint32();switch(l>>>3){case 1:{u.elemType=i.int32();break}case 2:{u.shape=w.onnx.TensorShapeProto.decode(i,i.uint32());break}default:i.skipType(l&7);break}}return u},t.decodeDelimited=function(i){return i instanceof R||(i=new R(i)),this.decode(i,i.uint32())},t.verify=function(i){if(typeof i!="object"||i===null)return"object expected";if(i.elemType!=null&&i.hasOwnProperty("elemType")&&!T.isInteger(i.elemType))return"elemType: integer expected";if(i.shape!=null&&i.hasOwnProperty("shape")){var s=w.onnx.TensorShapeProto.verify(i.shape);if(s)return"shape."+s}return null},t.fromObject=function(i){if(i instanceof w.onnx.TypeProto.SparseTensor)return i;var s=new w.onnx.TypeProto.SparseTensor;if(i.elemType!=null&&(s.elemType=i.elemType|0),i.shape!=null){if(typeof i.shape!="object")throw TypeError(".onnx.TypeProto.SparseTensor.shape: object expected");s.shape=w.onnx.TensorShapeProto.fromObject(i.shape)}return s},t.toObject=function(i,s){s||(s={});var a={};return s.defaults&&(a.elemType=0,a.shape=null),i.elemType!=null&&i.hasOwnProperty("elemType")&&(a.elemType=i.elemType),i.shape!=null&&i.hasOwnProperty("shape")&&(a.shape=w.onnx.TensorShapeProto.toObject(i.shape,s)),a},t.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},t.getTypeUrl=function(i){return i===void 0&&(i="type.googleapis.com"),i+"/onnx.TypeProto.SparseTensor"},t}(),e}(),r.OperatorSetIdProto=function(){function e(n){if(n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.domain="",e.prototype.version=T.Long?T.Long.fromBits(0,0,!1):0,e.create=function(t){return new e(t)},e.encode=function(t,o){return o||(o=ke.create()),t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(10).string(t.domain),t.version!=null&&Object.hasOwnProperty.call(t,"version")&&o.uint32(16).int64(t.version),o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.OperatorSetIdProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.domain=t.string();break}case 2:{s.version=t.int64();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){return typeof t!="object"||t===null?"object expected":t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain)?"domain: string expected":t.version!=null&&t.hasOwnProperty("version")&&!T.isInteger(t.version)&&!(t.version&&T.isInteger(t.version.low)&&T.isInteger(t.version.high))?"version: integer|Long expected":null},e.fromObject=function(t){if(t instanceof w.onnx.OperatorSetIdProto)return t;var o=new w.onnx.OperatorSetIdProto;return t.domain!=null&&(o.domain=String(t.domain)),t.version!=null&&(T.Long?(o.version=T.Long.fromValue(t.version)).unsigned=!1:typeof t.version=="string"?o.version=parseInt(t.version,10):typeof t.version=="number"?o.version=t.version:typeof t.version=="object"&&(o.version=new T.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber())),o},e.toObject=function(t,o){o||(o={});var i={};if(o.defaults)if(i.domain="",T.Long){var s=new T.Long(0,0,!1);i.version=o.longs===String?s.toString():o.longs===Number?s.toNumber():s}else i.version=o.longs===String?"0":0;return t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.version!=null&&t.hasOwnProperty("version")&&(typeof t.version=="number"?i.version=o.longs===String?String(t.version):t.version:i.version=o.longs===String?T.Long.prototype.toString.call(t.version):o.longs===Number?new T.LongBits(t.version.low>>>0,t.version.high>>>0).toNumber():t.version),i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.OperatorSetIdProto"},e}(),r.OperatorStatus=function(){var e={},n=Object.create(e);return n[e[0]="EXPERIMENTAL"]=0,n[e[1]="STABLE"]=1,n}(),r.FunctionProto=function(){function e(n){if(this.input=[],this.output=[],this.attribute=[],this.attributeProto=[],this.node=[],this.opsetImport=[],n)for(var t=Object.keys(n),o=0;o<t.length;++o)n[t[o]]!=null&&(this[t[o]]=n[t[o]])}return e.prototype.name="",e.prototype.input=T.emptyArray,e.prototype.output=T.emptyArray,e.prototype.attribute=T.emptyArray,e.prototype.attributeProto=T.emptyArray,e.prototype.node=T.emptyArray,e.prototype.docString="",e.prototype.opsetImport=T.emptyArray,e.prototype.domain="",e.create=function(t){return new e(t)},e.encode=function(t,o){if(o||(o=ke.create()),t.name!=null&&Object.hasOwnProperty.call(t,"name")&&o.uint32(10).string(t.name),t.input!=null&&t.input.length)for(var i=0;i<t.input.length;++i)o.uint32(34).string(t.input[i]);if(t.output!=null&&t.output.length)for(var i=0;i<t.output.length;++i)o.uint32(42).string(t.output[i]);if(t.attribute!=null&&t.attribute.length)for(var i=0;i<t.attribute.length;++i)o.uint32(50).string(t.attribute[i]);if(t.node!=null&&t.node.length)for(var i=0;i<t.node.length;++i)w.onnx.NodeProto.encode(t.node[i],o.uint32(58).fork()).ldelim();if(t.docString!=null&&Object.hasOwnProperty.call(t,"docString")&&o.uint32(66).string(t.docString),t.opsetImport!=null&&t.opsetImport.length)for(var i=0;i<t.opsetImport.length;++i)w.onnx.OperatorSetIdProto.encode(t.opsetImport[i],o.uint32(74).fork()).ldelim();if(t.domain!=null&&Object.hasOwnProperty.call(t,"domain")&&o.uint32(82).string(t.domain),t.attributeProto!=null&&t.attributeProto.length)for(var i=0;i<t.attributeProto.length;++i)w.onnx.AttributeProto.encode(t.attributeProto[i],o.uint32(90).fork()).ldelim();return o},e.encodeDelimited=function(t,o){return this.encode(t,o).ldelim()},e.decode=function(t,o){t instanceof R||(t=R.create(t));for(var i=o===void 0?t.len:t.pos+o,s=new w.onnx.FunctionProto;t.pos<i;){var a=t.uint32();switch(a>>>3){case 1:{s.name=t.string();break}case 4:{s.input&&s.input.length||(s.input=[]),s.input.push(t.string());break}case 5:{s.output&&s.output.length||(s.output=[]),s.output.push(t.string());break}case 6:{s.attribute&&s.attribute.length||(s.attribute=[]),s.attribute.push(t.string());break}case 11:{s.attributeProto&&s.attributeProto.length||(s.attributeProto=[]),s.attributeProto.push(w.onnx.AttributeProto.decode(t,t.uint32()));break}case 7:{s.node&&s.node.length||(s.node=[]),s.node.push(w.onnx.NodeProto.decode(t,t.uint32()));break}case 8:{s.docString=t.string();break}case 9:{s.opsetImport&&s.opsetImport.length||(s.opsetImport=[]),s.opsetImport.push(w.onnx.OperatorSetIdProto.decode(t,t.uint32()));break}case 10:{s.domain=t.string();break}default:t.skipType(a&7);break}}return s},e.decodeDelimited=function(t){return t instanceof R||(t=new R(t)),this.decode(t,t.uint32())},e.verify=function(t){if(typeof t!="object"||t===null)return"object expected";if(t.name!=null&&t.hasOwnProperty("name")&&!T.isString(t.name))return"name: string expected";if(t.input!=null&&t.hasOwnProperty("input")){if(!Array.isArray(t.input))return"input: array expected";for(var o=0;o<t.input.length;++o)if(!T.isString(t.input[o]))return"input: string[] expected"}if(t.output!=null&&t.hasOwnProperty("output")){if(!Array.isArray(t.output))return"output: array expected";for(var o=0;o<t.output.length;++o)if(!T.isString(t.output[o]))return"output: string[] expected"}if(t.attribute!=null&&t.hasOwnProperty("attribute")){if(!Array.isArray(t.attribute))return"attribute: array expected";for(var o=0;o<t.attribute.length;++o)if(!T.isString(t.attribute[o]))return"attribute: string[] expected"}if(t.attributeProto!=null&&t.hasOwnProperty("attributeProto")){if(!Array.isArray(t.attributeProto))return"attributeProto: array expected";for(var o=0;o<t.attributeProto.length;++o){var i=w.onnx.AttributeProto.verify(t.attributeProto[o]);if(i)return"attributeProto."+i}}if(t.node!=null&&t.hasOwnProperty("node")){if(!Array.isArray(t.node))return"node: array expected";for(var o=0;o<t.node.length;++o){var i=w.onnx.NodeProto.verify(t.node[o]);if(i)return"node."+i}}if(t.docString!=null&&t.hasOwnProperty("docString")&&!T.isString(t.docString))return"docString: string expected";if(t.opsetImport!=null&&t.hasOwnProperty("opsetImport")){if(!Array.isArray(t.opsetImport))return"opsetImport: array expected";for(var o=0;o<t.opsetImport.length;++o){var i=w.onnx.OperatorSetIdProto.verify(t.opsetImport[o]);if(i)return"opsetImport."+i}}return t.domain!=null&&t.hasOwnProperty("domain")&&!T.isString(t.domain)?"domain: string expected":null},e.fromObject=function(t){if(t instanceof w.onnx.FunctionProto)return t;var o=new w.onnx.FunctionProto;if(t.name!=null&&(o.name=String(t.name)),t.input){if(!Array.isArray(t.input))throw TypeError(".onnx.FunctionProto.input: array expected");o.input=[];for(var i=0;i<t.input.length;++i)o.input[i]=String(t.input[i])}if(t.output){if(!Array.isArray(t.output))throw TypeError(".onnx.FunctionProto.output: array expected");o.output=[];for(var i=0;i<t.output.length;++i)o.output[i]=String(t.output[i])}if(t.attribute){if(!Array.isArray(t.attribute))throw TypeError(".onnx.FunctionProto.attribute: array expected");o.attribute=[];for(var i=0;i<t.attribute.length;++i)o.attribute[i]=String(t.attribute[i])}if(t.attributeProto){if(!Array.isArray(t.attributeProto))throw TypeError(".onnx.FunctionProto.attributeProto: array expected");o.attributeProto=[];for(var i=0;i<t.attributeProto.length;++i){if(typeof t.attributeProto[i]!="object")throw TypeError(".onnx.FunctionProto.attributeProto: object expected");o.attributeProto[i]=w.onnx.AttributeProto.fromObject(t.attributeProto[i])}}if(t.node){if(!Array.isArray(t.node))throw TypeError(".onnx.FunctionProto.node: array expected");o.node=[];for(var i=0;i<t.node.length;++i){if(typeof t.node[i]!="object")throw TypeError(".onnx.FunctionProto.node: object expected");o.node[i]=w.onnx.NodeProto.fromObject(t.node[i])}}if(t.docString!=null&&(o.docString=String(t.docString)),t.opsetImport){if(!Array.isArray(t.opsetImport))throw TypeError(".onnx.FunctionProto.opsetImport: array expected");o.opsetImport=[];for(var i=0;i<t.opsetImport.length;++i){if(typeof t.opsetImport[i]!="object")throw TypeError(".onnx.FunctionProto.opsetImport: object expected");o.opsetImport[i]=w.onnx.OperatorSetIdProto.fromObject(t.opsetImport[i])}}return t.domain!=null&&(o.domain=String(t.domain)),o},e.toObject=function(t,o){o||(o={});var i={};if((o.arrays||o.defaults)&&(i.input=[],i.output=[],i.attribute=[],i.node=[],i.opsetImport=[],i.attributeProto=[]),o.defaults&&(i.name="",i.docString="",i.domain=""),t.name!=null&&t.hasOwnProperty("name")&&(i.name=t.name),t.input&&t.input.length){i.input=[];for(var s=0;s<t.input.length;++s)i.input[s]=t.input[s]}if(t.output&&t.output.length){i.output=[];for(var s=0;s<t.output.length;++s)i.output[s]=t.output[s]}if(t.attribute&&t.attribute.length){i.attribute=[];for(var s=0;s<t.attribute.length;++s)i.attribute[s]=t.attribute[s]}if(t.node&&t.node.length){i.node=[];for(var s=0;s<t.node.length;++s)i.node[s]=w.onnx.NodeProto.toObject(t.node[s],o)}if(t.docString!=null&&t.hasOwnProperty("docString")&&(i.docString=t.docString),t.opsetImport&&t.opsetImport.length){i.opsetImport=[];for(var s=0;s<t.opsetImport.length;++s)i.opsetImport[s]=w.onnx.OperatorSetIdProto.toObject(t.opsetImport[s],o)}if(t.domain!=null&&t.hasOwnProperty("domain")&&(i.domain=t.domain),t.attributeProto&&t.attributeProto.length){i.attributeProto=[];for(var s=0;s<t.attributeProto.length;++s)i.attributeProto[s]=w.onnx.AttributeProto.toObject(t.attributeProto[s],o)}return i},e.prototype.toJSON=function(){return this.constructor.toObject(this,ve.util.toJSONOptions)},e.getTypeUrl=function(t){return t===void 0&&(t="type.googleapis.com"),t+"/onnx.FunctionProto"},e}(),r}();Ku.exports=w});function $r(r,e){if(!r)throw new Error(typeof e=="string"?e:e())}function Kr(r){return new TextDecoder().decode(r)}var Ie,ir,ki,Xe,Mn,He,et,G,qr,ar,sr,ur,be=S(()=>{"use strict";Ln();yi();Ie=_r(Sr());lr();ir=class{static arraysEqual(e,n){if(e.length!==n.length)return!1;for(let t=0;t<e.length;t++)if(e[t]!==n[t])return!1;return!0}},ki=class{static preprocessInputShapes(e,n){let t=e.length===1?[1,e[0]]:e,o=n.length===1?[n[0],1]:n;return[t,o]}static postprocessOutputShape(e,n,t){n===1&&e.splice(e.length-2,1),t===1&&e.pop()}static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Xe=class r{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=ki.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;a[s-u]=Math.max(l,c)}return a}static index(e,n){let t=new Array(n.length);return r.fillIndex(e,n,t),t}static fillIndex(e,n,t){let o=e.length-n.length;for(let i=0;i<n.length;i++)t[i]=e[o+i]%n[i]}static calc(e,n,t,o,i){let s=r.calcShape(e.dims,n.dims);if(s){if(o&&!G.areEqual(s,e.dims))return;let a=G.size(s),u=o?e:new Le(s,i||e.type);if(s.length===0)u.set([],t(e.get([]),n.get([])));else{let l=new Array(s.length),c=new Array(e.dims.length),d=new Array(n.dims.length),f=0,m=0,p=!1,h=!1;e.dims.length===0&&(f=e.get([]),p=!0),n.dims.length===0&&(m=n.get([]),h=!0);let b;for(let y=0;y<a;y++){b=y;for(let g=s.length-1;g>=0;g--)l[g]=b%s[g],b=Math.floor(b/s[g]);p||(r.fillIndex(l,e.dims,c),f=e.get(c)),h||(r.fillIndex(l,n.dims,d),m=n.get(d)),u.set(l,t(f,m))}}return u}}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}static getBroadcastDims(e,n){let t=e.length,o=[];for(let i=0;i<t;i++){let s=t-1-i,a=e[s]||1;(n[n.length-1-i]||1)>1&&a===1&&o.unshift(s)}return o}},Mn=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Xe.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},He=class r{static tensorDataTypeFromProto(e){switch(e){case Ie.onnx.TensorProto.DataType.INT8:return"int8";case Ie.onnx.TensorProto.DataType.UINT8:return"uint8";case Ie.onnx.TensorProto.DataType.BOOL:return"bool";case Ie.onnx.TensorProto.DataType.INT16:return"int16";case Ie.onnx.TensorProto.DataType.UINT16:return"uint16";case Ie.onnx.TensorProto.DataType.INT32:return"int32";case Ie.onnx.TensorProto.DataType.UINT32:return"uint32";case Ie.onnx.TensorProto.DataType.FLOAT:return"float32";case Ie.onnx.TensorProto.DataType.DOUBLE:return"float64";case Ie.onnx.TensorProto.DataType.STRING:return"string";case Ie.onnx.TensorProto.DataType.INT64:return"int32";case Ie.onnx.TensorProto.DataType.UINT64:return"uint32";default:throw new Error(`unsupported data type: ${Ie.onnx.TensorProto.DataType[e]}`)}}static tensorDataTypeStringToEnum(e){switch(e){case"int8":return Ie.onnx.TensorProto.DataType.INT8;case"uint8":return Ie.onnx.TensorProto.DataType.UINT8;case"bool":return Ie.onnx.TensorProto.DataType.BOOL;case"int16":return Ie.onnx.TensorProto.DataType.INT16;case"uint16":return Ie.onnx.TensorProto.DataType.UINT16;case"int32":return Ie.onnx.TensorProto.DataType.INT32;case"uint32":return Ie.onnx.TensorProto.DataType.UINT32;case"float32":return Ie.onnx.TensorProto.DataType.FLOAT;case"float64":return Ie.onnx.TensorProto.DataType.DOUBLE;case"string":return Ie.onnx.TensorProto.DataType.STRING;case"int64":return Ie.onnx.TensorProto.DataType.INT64;case"uint64":return Ie.onnx.TensorProto.DataType.UINT64;default:throw new Error(`unsupported data type: ${e}`)}}static tensorDimsFromProto(e){return e.map(n=>Rt.isLong(n)?n.toNumber():n)}static tensorValueTypeFromProto(e){return{tensorType:r.tensorDataTypeFromProto(e.elemType),shape:{dims:r.tensorDimsFromProto(e.shape.dim.map(n=>n.dimValue))}}}static tensorDimsFromORTFormat(e){let n=[];for(let t=0;t<e.dimsLength();t++)n.push(et.longToNumber(e.dims(t)));return n}static tensorAttributesFromORTFormat(e){let n=[];for(let t=0;t<e.attributesLength();t++)n.push(e.attributes(t));return n}},et=class{static longToNumber(e,n){return Rt.isLong(e)?e.toNumber():e instanceof A.Long?Rt.fromValue({low:e.low,high:e.high,unsigned:n??!1}).toNumber():e}static isLong(e){return Rt.isLong(e)||e instanceof A.Long}},G=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<=0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains 0 or negative values in them.");o*=e[i]}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static transpose(e){return e.slice().reverse()}static indicesToOffset(e,n,t){t===void 0&&(t=e.length);let o=0;for(let i=0;i<t;++i)o+=n[i]*e[i];return o}static offsetToIndices(e,n){let t=n.length;if(t===0)return[];if(t===1)return[e*n[0]];let o=new Array(n.length);for(let i=0;i<o.length-1;++i)o[i]=Math.floor(e/n[i]),e-=o[i]*n[i];return o[o.length-1]=e,o}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n))}static incrementIndex(e,n,t){if(n.length===0||e.length===0)throw new Error("Index incrementing unsupported for scalar Tensor");if(t===void 0)t=n.length;else if(t<=0||t>n.length)throw new Error("Incorrect axis to increment on");for(let o=t-1;o>=0&&(e[o]++,!(e[o]<n[o]));--o)e[o]=0}static calculateReshapedDims(e,n){if(n.length===0){if(e.length===0||r.size(e)===1)return[];throw new Error("cannot reshape to a scalar Tensor")}let t=n.length,o=new Array(t),i=-1,s=1;for(let u=0;u<t;u++){if(n[u]<-1)throw new Error("a dimension in shape hints cannot be less than -1");if(n[u]===-1){if(i!==-1)throw new Error("at most one dimension in shape hints can be -1");i=u}else{if(n[u]===0){if(u>=e.length)throw new Error("the dimension with value zero exceeds the dimension size of the input tensor");o[u]=e[u]}else o[u]=n[u];s*=o[u]}}let a=r.size(e);if(i!==-1){if(a%s!==0)throw new Error(`the input tensor cannot be reshaped to the requested shape. Input shape: [${e}] Output shape: [${n}]`);o[i]=a/s}else if(s!==a)throw new Error("reshapedDims and originalDims don't have matching sizes");return o}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}static validateDimsAndCalcSize(e){if(e.length>6)throw new TypeError("Only rank 0 to 6 is supported for tensor shape.");let n=1;for(let t of e){if(!Number.isInteger(t))throw new TypeError(`Invalid shape: ${t} is not an integer`);if(t<0||t>2147483647)throw new TypeError(`Invalid shape: length ${t} is not allowed`);n*=t}return n}static flattenShape(e,n){n<0&&(n+=e.length);let t=e.reduce((s,a)=>s*a,1),o=e.slice(n).reduce((s,a)=>s*a,1);return[t/o,o]}static squeezeShape(e,n){let t=new Array;n=r.normalizeAxes(n,e.length);for(let o=0;o<e.length;o++){let i=n.indexOf(o)>=0;if(i&&e[o]!==1)throw new Error("squeeze an axis of size different than 1");(n.length===0&&e[o]>1||n.length>0&&!i)&&t.push(e[o])}return t}static unsqueezeShape(e,n){let t=new Array(e.length+n.length);t.fill(0);for(let i=0;i<n.length;i++){let s=r.normalizeAxis(n[i],t.length);if(s>=t.length)throw new Error("'axes' has an out of range axis");if(t[s]!==0)throw new Error("'axes' has a duplicate axis");t[s]=1}let o=0;for(let i=0;i<t.length;i++)t[i]===0&&(t[i]=e[o++]);if(o!==e.length)throw new Error("the unsqueezed dimension could not be established");return t}},qr=class r{static splitShape(e,n,t,o){if(t.length===0){if(!o)throw new Error("need to know number of outputs when the 'split' attribute is not specified");r.determineSplit(e[n],o,t)}let i=[],s=[0];for(let a=0;a<t.length;++a){a!==0&&s.push(s[a-1]+t[a-1]);let u=e.slice();u[n]=t[a],i.push(u)}return[i,s]}static determineSplit(e,n,t){if(e%n!==0)throw new Error("cannot split tensor to equal sized parts");for(let o=0;o<n;++o)t.push(e/n)}},ar=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s){if(s){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let a=0;a<e.length-2;a++)r.adjustPadAndReturnShape(e[a+2],n[a],t[a],o[a],i,a,a+e.length-2,s)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),i[a]=d-i[s],Math.floor((e+d-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},sr=-34028234663852886e22,ur=34028234663852886e22});function Ub(r){switch(r){case"bool":case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;case"float64":return 8;default:throw new Error(`cannot calculate sizeof() on type ${r}`)}}function ju(r){switch(r){case se.onnx.TensorProto.DataType.UINT8:case se.onnx.TensorProto.DataType.INT8:case se.onnx.TensorProto.DataType.BOOL:return 1;case se.onnx.TensorProto.DataType.UINT16:case se.onnx.TensorProto.DataType.INT16:return 2;case se.onnx.TensorProto.DataType.FLOAT:case se.onnx.TensorProto.DataType.INT32:case se.onnx.TensorProto.DataType.UINT32:return 4;case se.onnx.TensorProto.DataType.INT64:case se.onnx.TensorProto.DataType.DOUBLE:case se.onnx.TensorProto.DataType.UINT64:return 8;default:throw new Error(`cannot calculate sizeof() on type ${se.onnx.TensorProto.DataType[r]}`)}}function Wb(r,e){return new(Ju(e))(r)}function Ju(r){switch(r){case"bool":case"uint8":return Uint8Array;case"int8":return Int8Array;case"int16":return Int16Array;case"uint16":return Uint16Array;case"int32":return Int32Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"float32":return Float32Array;case"float64":return Float64Array;default:throw new Error("unspecified error")}}function Bi(r,e){if(e===se.onnx.TensorProto.DataType.INT64||e===Di.TensorDataType.INT64){if(r.greaterThanOrEqual(2147483648)||r.lessThan(-2147483648))throw new TypeError("int64 is not supported")}else if(e===se.onnx.TensorProto.DataType.UINT32||e===Di.TensorDataType.UINT32||e===se.onnx.TensorProto.DataType.UINT64||e===Di.TensorDataType.UINT64){if(r.greaterThanOrEqual(4294967296)||r.lessThan(0))throw new TypeError("uint64 is not supported")}else throw new TypeError(`not a LONG type: ${se.onnx.TensorProto.DataType[e]}`);return r.toNumber()}function Xu(r,e,n){switch(e){case se.onnx.TensorProto.DataType.BOOL:case se.onnx.TensorProto.DataType.UINT8:return r.getUint8(n);case se.onnx.TensorProto.DataType.INT8:return r.getInt8(n);case se.onnx.TensorProto.DataType.UINT16:return r.getUint16(n,!0);case se.onnx.TensorProto.DataType.INT16:return r.getInt16(n,!0);case se.onnx.TensorProto.DataType.FLOAT:return r.getFloat32(n,!0);case se.onnx.TensorProto.DataType.INT32:return r.getInt32(n,!0);case se.onnx.TensorProto.DataType.UINT32:return r.getUint32(n,!0);case se.onnx.TensorProto.DataType.INT64:return Bi(Rt.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!1),e);case se.onnx.TensorProto.DataType.DOUBLE:return r.getFloat64(n,!0);case se.onnx.TensorProto.DataType.UINT64:return Bi(Rt.fromBits(r.getUint32(n,!0),r.getUint32(n+4,!0),!0),e);default:throw new Error(`cannot read from DataView for type ${se.onnx.TensorProto.DataType[e]}`)}}var Zu,se,Di,Le,lr=S(()=>{"use strict";Zu=_r(Vs());yi();Gr();se=_r(Sr());be();Di=W.experimental.fbs,Le=class r{constructor(e,n,t,o,i,s=Zu.Guid.create()){this.dims=e;this.type=n;this.dataProvider=t;this.asyncDataProvider=o;this.cache=i;this.dataId=s;this.size=G.validateDimsAndCalcSize(e);let a=this.size,u=t===void 0&&o===void 0&&i===void 0;if(i!==void 0&&i.length!==a)throw new RangeError("Input dims doesn't match data length.");if(n==="string"){if(i!==void 0&&(!Array.isArray(i)||!i.every(l=>typeof l=="string")))throw new TypeError("cache should be a string array");u&&(this.cache=new Array(a))}else{if(i!==void 0){let l=Ju(n);if(!(i instanceof l))throw new TypeError(`cache should be type ${l.name}`)}if(u){let l=new ArrayBuffer(a*Ub(n));this.cache=Wb(l,n)}}}get data(){if(this.cache===void 0){let e=this.dataProvider(this.dataId);if(e.length!==this.size)throw new Error("Length of data provided by the Data Provider is inconsistent with the dims of this Tensor.");this.cache=e}return this.cache}get stringData(){if(this.type!=="string")throw new TypeError("data type is not string");return this.data}get integerData(){switch(this.type){case"uint8":case"int8":case"uint16":case"int16":case"int32":case"uint32":case"bool":return this.data;default:throw new TypeError("data type is not integer (uint8, int8, uint16, int16, int32, uint32, bool)")}}get floatData(){switch(this.type){case"float32":case"float64":return this.data;default:throw new TypeError("data type is not float (float32, float64)")}}get numberData(){if(this.type!=="string")return this.data;throw new TypeError("type cannot be non-number (string)")}get(e){return this.data[G.indicesToOffset(e,this.strides)]}set(e,n){this.data[G.indicesToOffset(e,this.strides)]=n}async getData(){return this.cache===void 0&&(this.cache=await this.asyncDataProvider(this.dataId)),this.cache}get strides(){return this._strides||(this._strides=G.computeStrides(this.dims)),this._strides}static fromProto(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=He.tensorDataTypeFromProto(e.dataType),t=He.tensorDimsFromProto(e.dims),o=new r(t,n);if(n==="string")e.stringData.forEach((i,s)=>{o.data[s]=Kr(i)});else if(e.rawData&&typeof e.rawData.byteLength=="number"&&e.rawData.byteLength>0){let i=o.data,s=new DataView(e.rawData.buffer,e.rawData.byteOffset,e.rawData.byteLength),a=ju(e.dataType),u=e.rawData.byteLength/a;if(e.rawData.byteLength%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Xu(s,e.dataType,l*a);i[l]=c}}else{let i;switch(e.dataType){case se.onnx.TensorProto.DataType.FLOAT:i=e.floatData;break;case se.onnx.TensorProto.DataType.INT32:case se.onnx.TensorProto.DataType.INT16:case se.onnx.TensorProto.DataType.UINT16:case se.onnx.TensorProto.DataType.INT8:case se.onnx.TensorProto.DataType.UINT8:case se.onnx.TensorProto.DataType.BOOL:i=e.int32Data;break;case se.onnx.TensorProto.DataType.INT64:i=e.int64Data;break;case se.onnx.TensorProto.DataType.DOUBLE:i=e.doubleData;break;case se.onnx.TensorProto.DataType.UINT32:case se.onnx.TensorProto.DataType.UINT64:i=e.uint64Data;break;default:throw new Error("unspecific error")}if(i==null)throw new Error("failed to populate data from a tensorproto value");let s=o.data;if(s.length!==i.length)throw new Error("array length mismatch");for(let a=0;a<i.length;a++){let u=i[a];Rt.isLong(u)?s[a]=Bi(u,e.dataType):s[a]=u}}return o}static fromData(e,n,t){return new r(n,t,void 0,void 0,e)}static fromOrtTensor(e){if(!e)throw new Error("cannot construct Value from an empty tensor");let n=He.tensorDimsFromORTFormat(e),t=He.tensorDataTypeFromProto(e.dataType()),o=new r(n,t);if(t==="string")for(let i=0;i<e.stringDataLength();i++)o.data[i]=e.stringData(i);else if(e.rawDataArray()&&typeof e.rawDataLength()=="number"&&e.rawDataLength()>0){let i=o.data,s=new DataView(e.rawDataArray().buffer,e.rawDataArray().byteOffset,e.rawDataLength()),a=ju(e.dataType()),u=e.rawDataLength()/a;if(e.rawDataLength()%a!==0)throw new Error("invalid buffer length");if(i.length!==u)throw new Error("buffer length mismatch");for(let l=0;l<u;l++){let c=Xu(s,e.dataType(),l*a);i[l]=c}}return o}}});function q(r){return r===1?Hb:qb}function Yu(r){let e=q(r);return`${e.version}
      precision highp float;
      ${e.attribute} vec3 position;
      ${e.attribute} vec2 textureCoord;

      ${e.varyingVertex} vec2 TexCoords;

      void main()
      {
          gl_Position = vec4(position, 1.0);
          TexCoords = textureCoord;
      }`}function Qu(r){let e=q(r);return`${e.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${e.varyingFrag} vec2 TexCoords;
    ${e.outputDeclaration}
    const vec2 halfCR = vec2(0.5, 0.5);

    // Custom vector types to handle higher dimenalities.
    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    `}function el(r,e){let n=q(r);return`
  void main() {
    int indices[${e}];
    toVec(TexCoords, indices);
    vec4 result = vec4(process(indices));
    ${n.output} = result;
  }
  `}var Hb,qb,$e=S(()=>{"use strict";Hb={version:"",attribute:"attribute",varyingVertex:"varying",varyingFrag:"varying",texture2D:"texture2D",output:"gl_FragColor",outputDeclaration:""},qb={version:"#version 300 es",attribute:"in",varyingVertex:"out",varyingFrag:"in",texture2D:"texture",output:"outputColor",outputDeclaration:"out vec4 outputColor;"}});var le=S(()=>{"use strict"});async function Li(r,e=t=>0,n){return new Promise((t,o)=>{let i=0,s=()=>{if(r()){t();return}i++;let a=e(i);if(n!=null&&i>=n){o();return}setTimeout(s,a)};s()})}function Fn(r){return $r(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)}function tl(r){return $r(typeof r<"u"&&r.length!==0,()=>"empty string found for sampler name"),"get"+r.charAt(0).toUpperCase()+r.slice(1)+"AtOutCoords"}function Ar(r,e){let n=JSON.parse(JSON.stringify(r));return n=e,n}function Pr(r,e){return e.map(n=>r[n]).join(", ")}function Ze(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function Tt(r=6){return["x","y","z","w","u","v"].slice(0,r)}var $t=S(()=>{"use strict";be()});function Kb(r,e){return Tt(e).map(n=>`${r}.${n}`)}function Or(r,e){return e===1?[r]:Kb(r,e)}function At(){return`
    float getChannel(vec4 frag, int dim) {
      int modCoord = imod(dim, 2);
      return modCoord == 0 ? frag.r : frag.g;
    }

    float getChannel(vec4 frag, vec2 innerDims) {
      vec2 modCoord = mod(innerDims, 2.);
      return modCoord.x == 0. ?
        (modCoord.y == 0. ? frag.r : frag.g) :
        (modCoord.y == 0. ? frag.b : frag.a);
    }
  `}var cr=S(()=>{"use strict";$t()});function Xb(r,e,n){if(r===0)return"false";if(r===1)return`rc > ${e[0]}`;let t="";for(let o=r-2;o<r;o++)t+=`${n[o]} >= ${e[o-r+2]}`,o<r-1&&(t+="||");return t}function Zb(r,e){let n=r.length;if(n===0)return"getA(), 0, 0, 0";if(n===1)return`getA(rc),
            rc + 1 >= ${r[0]} ? 0. : getA(rc + 1),
            0, 0`;let t="r, c",o="r, cp1",i="rp1, c",s="rp1, cp1",a="";if(n>2)for(let u=0;u<n-2;++u)a=a+`${e[u]},`;return`getA(${a}${t}),
          rEdge ? 0. : getA(${a}${i}),
          cEdge ? 0. : getA(${a}${o}),
          rEdge || cEdge ? 0. : getA(${a}${s})`}function Jb(r,e,n,t){return r===0||r===1?"":`
    int r = ${e[r-2]};
    int c = ${e[r-1]};
    int rp1 = ${e[r-2]} + 1;
    int cp1 = ${e[r-1]} + 1;
    bool rEdge = rp1 >= ${t};
    bool cEdge = cp1 >= ${n};
    `}var rl,jb,nl,ol=S(()=>{"use strict";$e();le();$t();cr();rl={name:"pack",inputNames:["A"],inputTypes:[1]},jb=(r,e)=>{let n=q(r.session.backend.glContext.version),t=e.dims,o=t.length,i=e.dims.length,s=Ze(i),a=Or("rc",i),u=Jb(i,a,t[t.length-2],t[t.length-1]),l;o===0?l=[1,1]:o===1?l=[t[0],1]:l=[t[i-1],t[i-2]];let c=Xb(i,l,a),d=Zb(t,a),f=`
        void main() {
          ${s} rc = getOutputCoords();

          if(${c}) {
            ${n.output} = vec4(0);
          } else {
            ${u}

            ${n.output} = vec4(${d});
          }
        }
      `;return{...rl,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:2},shaderSource:f}},nl=(r,e)=>({...rl,get:()=>jb(r,e)})});function zi(r){if(r.length===0)return[1,1,1];let e=1;for(let n=0;n<r.length-2;++n)e*=r[n];return[e,r.length>1?r[r.length-2]:1,r[r.length-1]]}function al(r,e){let n=!1;return r.length===0||e.length===0?n=!0:r.length<2||e.length<2?n=r[r.length-1]===e[e.length-1]:n=r[r.length-1]===e[e.length-1]&&r[r.length-2]===e[e.length-2],n}function ey(r){let e=G.computeStrides(r),n=["b","r","c"],t="index";return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${e.map((i,s)=>{let a=`int ${n[s]} = ${t} / ${i}`,u=s===e.length-1?`int ${n[s+1]} = ${t} - ${n[s]} * ${i}`:`index -= ${n[s]} * ${i}`;return`${a}; ${u};`}).join("")}
      return ivec3(b, r, c);
    }
  `}function ty(r){let e=G.computeStrides(r);return`
  int getFlattenedIndex(ivec3 coords) {
    // reverse y, z order
    return coords.x * ${e[0]} + coords.z * ${e[1]} + coords.y;
  }
`}var Yb,Qb,il,sl=S(()=>{"use strict";be();$e();le();cr();Yb=r=>({name:"Reshape (packed)",inputTypes:[2],inputNames:["A"],cacheHint:`${r}`}),Qb=(r,e,n,t)=>{let o=e.dims,i=t,s="";for(let l=0;l<4;l++){let c="";switch(l){case 0:c="outputCoords = rc;";break;case 1:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z);";break;case 2:c="outputCoords = ivec3(rc.x, rc.y, rc.z+1);";break;case 3:c="outputCoords = ivec3(rc.x, rc.y+1, rc.z+1);";break;default:throw new Error}s+=`
        ${c}
        ${l>0?"if(outputCoords.y < rows && outputCoords.z < cols){":""}
          int flattenedIndex = getFlattenedIndex(outputCoords);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flattenedIndex);
          vec2 innerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${l}] = getChannel(getA(inputRC.x, inputRC.y, inputRC.z), innerDims);

        ${l>0?"}":""}
      `}let a=q(r.session.backend.glContext.version),u=`
      ${ey(o)}
      ${ty(i)}
      ${At()}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.0);

        ivec3 outputCoords;
        int rows = ${i[2]};
        int cols = ${i[1]};

        ${s}
        ${a.output} = result;
      }
    `;return{...n,output:{dims:i,type:e.type,textureType:2},shaderSource:u,hasMain:!0}},il=(r,e,n)=>{let t=Yb(n);return{...t,get:()=>Qb(r,e,t,n)}}});var Ri,ul=S(()=>{"use strict";$e();le();Ri=(r,e)=>{let n=e.shape,t=q(r.session.backend.glContext.version),o=`
    const float FLOAT_MAX = 1.70141184e38;
    const float FLOAT_MIN = 1.17549435e-38;

    bool isNaN(float val) {
      return (val < 1.0 || 0.0 < val || val == 0.0) ? false : true;
    }

    highp vec4 encodeAsUint8(highp float v) {
      if (isNaN(v)) {
        return vec4(255, 255, 255, 255);
      }

      highp float av = abs(v);

      if(av < FLOAT_MIN) {
        return vec4(0.0, 0.0, 0.0, 0.0);
      } else if(v > FLOAT_MAX) {
        return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
      } else if(v < -FLOAT_MAX) {
        return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
      }

      highp vec4 c = vec4(0,0,0,0);

      highp float e = floor(log2(av));
      highp float m = exp2(fract(log2(av))) - 1.0;

      c[2] = floor(128.0 * m);
      m -= c[2] / 128.0;
      c[1] = floor(32768.0 * m);
      m -= c[1] / 32768.0;
      c[0] = floor(8388608.0 * m);

      highp float ebias = e + 127.0;
      c[3] = floor(ebias / 2.0);
      ebias -= c[3] * 2.0;
      c[2] += floor(ebias) * 128.0;

      c[3] += 128.0 * step(0.0, -v);

      return c / 255.0;
    }

    void main() {
      float value = ${t.texture2D}(X,TexCoords).r;
      ${t.output} = encodeAsUint8(value);
    }`,i={name:"Uint8Encode",inputTypes:[0],inputNames:["X"],output:{dims:n,type:e.tensor.type,textureType:3},shaderSource:o,hasMain:!0};return r.executeProgram(i,[e.tensor])}});function ny(r,e){if(r===1)return"rc";let n="";for(let t=0;t<r;t++)n+=e[t],t<r-1&&(n+=",");return n}var ll,ry,cl,dl=S(()=>{"use strict";$e();le();$t();cr();ll={name:"unpack",inputNames:["A"],inputTypes:[2]},ry=(r,e)=>{let n=e.dims.length,t=Or("rc",n),o=t.slice(-2),i=Ze(n),s=At(),u=e.dims.length===0?"":ny(n,t),l=n<=1?"rc":`vec2(${o.join(",")})`,c=q(r.session.backend.glContext.version),d=`
    ${s}
    void main() {
      ${i} rc = getOutputCoords();

       // Sample the texture with the coords to get the rgba channel value.
       vec4 packedInput = getA(${u});

       ${c.output} = vec4(getChannel(packedInput, ${l}), 0, 0, 0);
     }
   `;return{...ll,hasMain:!0,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:d}},cl=(r,e)=>({...ll,get:()=>ry(r,e)})});var Gn,jr,Un,Xr=S(()=>{"use strict";st();Gn=class{constructor(e,n=1){if(n===1)this.internalFormat=e.R32F,this.format=e.RED,this.textureType=e.FLOAT,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA32F,this.format=e.RGBA,this.textureType=e.FLOAT,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){let t,o;return e.constructor!==Float32Array&&(ye.warning("Encoder","data was not of type Float32; creating new Float32Array"),o=new Float32Array(e)),n*this.channelSize>e.length?(ye.warning("Encoder","Source data too small. Allocating larger array"),o=e,t=this.allocate(n*this.channelSize),o.forEach((i,s)=>t[s]=i)):(o=e,t=o),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},jr=class{constructor(e,n=1,t){if(n!==1&&n!==4)throw new Error(`Invalid number of channels: ${n}`);this.internalFormat=e.RGBA,this.format=e.RGBA,this.channelSize=n,this.textureType=t||e.FLOAT}encode(e,n){let t=e;return this.channelSize===1&&(ye.verbose("Encoder","Exploding into a larger array"),t=this.allocate(n),e.forEach((o,i)=>t[i*4]=o)),t}allocate(e){return new Float32Array(e*4)}decode(e,n){return this.channelSize===1?e.filter((o,i)=>i%4===0).subarray(0,n):e.subarray(0,n)}},Un=class{constructor(e,n=1){this.channelSize=4;if(n===1)this.internalFormat=e.ALPHA,this.format=e.ALPHA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else if(n===4)this.internalFormat=e.RGBA,this.format=e.RGBA,this.textureType=e.UNSIGNED_BYTE,this.channelSize=n;else throw new Error(`Invalid number of channels: ${n}`)}encode(e,n){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}allocate(e){return new Uint8Array(e*this.channelSize)}decode(e,n){if(e instanceof Uint8Array)return e.subarray(0,n);throw new Error(`Invalid array type: ${e.constructor}`)}}});var Zr,fl,Ni,pl=S(()=>{"use strict";be();le();Zr=(r,e,n)=>{let t=n===0||n===1?1:4,o=n===2,i=n===1||n===2,s=n===4?e.length-1:void 0,a=n===4?e.map((u,l)=>l===e.length-1?u*4:u):void 0;return Ni(r,e,t,a,{isPacked:o,reverseWH:i,breakAxis:s})},fl=(r,e,n)=>{let t=Zr(r,e,n);return[t.width,t.height]},Ni=(r,e,n=1,t,o)=>{let i=!!(o&&o.isPacked),[s,a]=r.computeTextureWH(i&&t||e,o),u=e.length,l=e.slice(0);if(u===0&&(l=[1]),n===1)t=e;else if(i){if(n!==4)throw new Error("a packed texture must be 4-channel");t=e,u>0&&(l[u-1]=Math.ceil(l[u-1]/2)),u>1&&(l[u-2]=Math.ceil(l[u-2]/2))}else if(!t)throw new Error("Unpacked shape is needed when using channels > 1");return{width:s,height:a,channels:n,isPacked:i,shape:l,strides:G.computeStrides(l),unpackedShape:t,reversedWH:o&&o.reverseWH}}});var iy,Wn,hl=S(()=>{"use strict";st();lr();be();ol();sl();ul();dl();Xr();pl();le();iy=(r,e)=>{let n=e.map(o=>`${o.unpackedShape.join(",")};${o.width}x${o.height}`).join("_"),t=r.name;return r.cacheHint&&(t+="["+r.cacheHint+"]"),t+=":"+n,t},Wn=class{constructor(e){this.session=e;this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map}calculateTextureWidthAndHeight(e,n){return fl(this.session.layoutStrategy,e,n)}executeProgram(e,n){if(n.length<e.inputNames.length)throw new Error(`Input size mustn't be less than ${e.inputNames.length}.`);if(e.inputNames.length!==e.inputTypes.length)throw new Error("input names size does not match input types");let t=[];for(let l=0;l<e.inputNames.length;++l)t[l]=this.getOrCreateTextureData(n[l],e.inputTypes[l]);let o=iy(e,t),i=this.session.programManager.getArtifact(o),s=i?i.programInfo:typeof e.get=="function"?e.get():e,a=Zr(this.session.layoutStrategy,s.output.dims,s.output.textureType),u=this.createTextureData(a,s.output.type);return i||(i=this.session.programManager.build(s,t,u),this.session.programManager.setArtifact(o,i)),this.runProgram(i,t,u),u}run(e,n){return this.executeProgram(e,n).tensor}runProgram(e,n,t){for(let o=0;o<n.length;++o)if(!!n[o].isPacked!=(e.programInfo.inputTypes[o]===2))throw new Error(`input[${o}] property packed inconsistent`);if(!!t.isPacked!=(e.programInfo.output.textureType===2))throw new Error("output property packed inconsistent");this.session.programManager.run(e,n,t)}getOrCreateTextureData(e,n){let t=this.getTextureData(e.dataId,n===2);if(!t&&(t=this.getTextureData(e.dataId,n!==2),t))return n===2?this.pack(t):this.unpack(t);if(!t){let o=Zr(this.session.layoutStrategy,e.dims,n);if(n===4){let a=e.dims;if(a.length===4){let u=[a[0],Math.ceil(a[1]*a[2]*a[3]/4)],l=Zr(this.session.layoutStrategy,u,n),c=e.numberData;if(a[1]*a[2]*a[3]%4!==0){let d=a[0],f=a[1]*a[2]*a[3],m=Math.ceil(f*1/4)*4,p=d*m;c=new Float32Array(p);for(let h=0;h<d;++h){let b=h*f,y=h*m+h%1*f;c.set(e.numberData.subarray(b,b+f),y)}}return this.createTextureData(l,e.type,c,e,1)}}if(n===2){let i=Ni(this.session.layoutStrategy,e.dims,1,[],{reverseWH:!0}),s=this.createTextureData(i,e.type,e.numberData,e,1);t=this.pack(s)}else t=this.createTextureData(o,e.type,e.numberData,e,1)}return t}createTextureDataFromLayoutBindTensor(e,n,t,o){return this.createTextureData(e,n,t,o,1)}createTextureData(e,n,t,o,i){ye.verbose("InferenceHandler",`Creating TextureData: layout:[${JSON.stringify(e)}]`);let s=this.session.textureManager.createTextureFromLayout(n,e,t,i);return this.createTextureDataFromTexture(e,n,s,o)}reshapeUnpacked(e,n){let t=this.getOrCreateTextureData(e,0),o={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:G.computeStrides(n),unpackedShape:n};return this.createTextureDataFromTexture(o,e.type,t.texture).tensor}reshapePacked(e,n){let t=this.getOrCreateTextureData(e,2);if(al(e.dims,n)){let l={channels:t.channels,height:t.height,width:t.width,shape:n.length!==0?n:[1],strides:G.computeStrides(n),unpackedShape:n,isPacked:!0};return this.createTextureDataFromTexture(l,e.type,t.texture).tensor}let o=zi(e.dims),i=zi(n),s=this.reshapePacked(e,o),a=this.run(il(this,s,i),[s]);return this.reshapePacked(a,n)}cast(e,n){let t=this.getOrCreateTextureData(e,0);return this.createTextureDataFromTexture(t,n,t.texture).tensor}createTextureDataFromTexture(e,n,t,o,i){let s={...e,tensor:o||new Le(e.unpackedShape,n,a=>this.readTexture(s),async a=>this.readTextureAsync(s),void 0,i),texture:t};return this.setTextureData(s.tensor.dataId,s,e.isPacked),s}getTextureData(e,n=!1){return this.session.isInitializer(e)?this.session.getTextureData(e,n):n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){this.session.isInitializer(e)?this.session.setTextureData(e,n,t):(t?this.packedTextureDataCache:this.unpackedTextureDataCache).set(e,n)}isTextureLayoutCached(e,n=!1){return!!this.getTextureData(e.dataId,n)}dispose(){this.session.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.session.textureManager.releaseTexture(e)),this.unpackedTextureDataCache=new Map}readTexture(e){return e.isPacked?this.readTexture(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTexture(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Ri(this,e))}async readTextureAsync(e){return e.isPacked?this.readTextureAsync(this.unpack(e)):this.session.backend.glContext.isFloat32DownloadSupported?this.session.textureManager.readTextureAsync(e,e.tensor.type,e.channels):this.session.textureManager.readUint8TextureAsFloat(Ri(this,e))}pack(e){return this.executeProgram(nl(this,e.tensor),[e.tensor])}unpack(e){return this.executeProgram(cl(this,e.tensor),[e.tensor])}}});var Vi,ie,Ge=S(()=>{"use strict";Vi=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},ie=r=>new Vi(r)});var gl,bl,yl,ay,sy,xl=S(()=>{"use strict";Ge();$e();le();gl={name:"BatchNormalization",inputNames:["A","Scale","B","Mean","Variance"],inputTypes:[0,0,0,0,0]},bl=(r,e,n)=>(sy(e),[r.run({...gl,cacheHint:n.cacheKey,get:()=>ay(r,e,n)},e)]),yl=r=>{let e=r.attributes.getFloat("epsilon",1e-5),n=r.attributes.getFloat("momentum",.9),t=r.attributes.getInt("spatial",1);return ie({epsilon:e,momentum:n,spatial:t})},ay=(r,e,n)=>{let t=q(r.session.backend.glContext.version),o=e[0].dims.length,[i,s]=r.calculateTextureWidthAndHeight(e[1].dims,0),a=`
  float process(int[${o}] indices) {
    vec2 position = offsetToCoords(indices[1], ${i}, ${s});
    float scale = getColorAsFloat(${t.texture2D}(Scale, position));
    float mean = getColorAsFloat(${t.texture2D}(Mean, position));
    float variance = getColorAsFloat(${t.texture2D}(Variance, position));
    float b = getColorAsFloat(${t.texture2D}(B, position));

    return scale * ( (_A(indices) - mean) / sqrt(variance + float(${n.epsilon})) ) + b;
  }`;return{...gl,output:{dims:e[0].dims,type:e[0].type,textureType:0},shaderSource:a}},sy=r=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs.");let e=r[0],n=r[1],t=r[2],o=r[3],i=r[4];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1||o.dims.length!==1||i.dims.length!==1)throw new Error("invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1]||o.dims[0]!==e.dims[1]||i.dims[0]!==e.dims[1])throw new Error("invalid input shape.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64"||o.type!=="float32"&&o.type!=="float64"||i.type!=="float32"&&i.type!=="float64")throw new Error("invalid input tensor types.")}});var Hn,dt,M,Jr,qn,Nt=S(()=>{"use strict";Hn=class{constructor(e,n,t,o){this.glContext=e;this.programInfo=n;this.inputTextureLayouts=t;this.outputTextureLayout=o}},dt=class{constructor(e){this.context=e}},M=class{constructor(e,n){this.routineBody=e;this.dependencies=n}},Jr=class{constructor(e,n,t){this.name=e;t?this.dependencies=t:this.dependencies=[],n&&(this.routineBody=n)}addDependency(e){e&&this.dependencies.push(e)}},qn=class{static returnOrderedNodes(e){if(!e||e.length===0)return[];if(e.length===1)return e;let n=new Set,t=new Set,o=new Array;return this.createOrderedNodes(e,n,t,o),o}static createOrderedNodes(e,n,t,o){for(let i=0;i<e.length;++i)this.dfsTraverse(e[i],n,t,o)}static dfsTraverse(e,n,t,o){if(!e||t.has(e.name))return;if(n.has(e.name))throw new Error("Cyclic dependency detected. Can't topologically sort routines needed for shader.");n.add(e.name);let i=e.dependencies;if(i&&i.length>0)for(let s=0;s<i.length;++s)this.dfsTraverse(i[s],n,t,o);o.push(e),t.add(e.name),n.delete(e.name)}}});function ly(){let r="add_";return{body:`
  float ${r}(float a, float b) {
    return a + b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 + v2;
  }
  `,name:r,type:0}}function cy(){let r="div_";return{body:`
  float ${r}(float a, float b) {
    return a / b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 / v2;
  }
  `,name:r,type:0}}function dy(){let r="mul_";return{body:`
  float ${r}(float a, float b) {
    return a * b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 * v2;
  }
  `,name:r,type:0}}function fy(){let r="sub_";return{body:`
  float ${r}(float a, float b) {
    return a - b;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return v1 - v2;
  }
  `,name:r,type:0}}function py(){let r="equal_";return{body:`
  float ${r}(float a, float b) {
    return float(a == b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(equal(v1, v2));
  }
  `,name:r,type:0}}function my(){let r="greater_";return{body:`
  float ${r}(float a, float b) {
    return float(a > b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r > v2.r ,
      v1.g > v2.g,
      v1.b > v2.b,
      v1.a > v2.a );
  }
  `,name:r,type:0}}function hy(){let r="less_";return{body:`
  float ${r}(float a, float b) {
    return float(a < b);
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4( v1.r < v2.r ,
                v1.g < v2.g,
                v1.b < v2.b,
                v1.a < v2.a );
  }
  `,name:r,type:0}}function gy(){let r="and_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) && bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r && b2.r ,
                b1.g && b2.g,
                b1.b && b2.b,
                b1.a && b2.a );
  }
  `,name:r,type:0}}function by(){let r="or_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) || bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r || b2.r ,
                b1.g || b2.g,
                b1.b || b2.b,
                b1.a || b2.a );
  }
  `,name:r,type:0}}function yy(){let r="xor_";return{body:`
  float ${r}(float a, float b) {
    return float( bool(a) ^^ bool(b) );
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    bvec4 b1 = bvec4(v1);
    bvec4 b2 = bvec4(v2);
    return vec4( b1.r ^^ b2.r ,
                b1.g ^^ b2.g,
                b1.b ^^ b2.b,
                b1.a ^^ b2.a );
  }
  `,name:r,type:0}}function xy(){return _y("pow")}function wy(){let r="prelu_";return{body:`
  float ${r}(float a, float b) {
    return a < 0.0 ? a * b: a;
  }
  vec4 ${r}(vec4 v1, vec4 v2) {
    return vec4(
      v1.r < 0.0 ? v1.r * v2.r: v1.r,
      v1.g < 0.0 ? v1.g * v2.g: v1.g,
      v1.b < 0.0 ? v1.b * v2.b: v1.b,
      v1.a < 0.0 ? v1.a * v2.a: v1.a
      );
  }
  `,name:r,type:0}}function _y(r){let e=`${r}_`;return{body:`
  float ${e}(float a, float b) {
    return ${r}(a, b);
  }
  vec4 ${e}(vec4 v1, vec4 v2) {
    return ${r}(v1, v2);
  }
  `,name:e,type:0}}var ft,Ty,wl,_l,Tl,vl,Il,Sl,$l,Al,Pl,Ol,El,Cl,kl=S(()=>{"use strict";be();Nt();$e();le();ft=(r,e,n,t=e[0].type,o)=>{let i=r.session.pack?2:0;return{name:n.name,inputNames:["A","B"],inputTypes:[i,i],cacheHint:o,get:()=>Ty(r,e,n,t)}},Ty=(r,e,n,t=e[0].type)=>{let o=r.session.pack?2:0,i=!G.areEqual(e[0].dims,e[1].dims),s=e[0].dims,a=r.session.pack;if(i){let c=Xe.calcShape(e[0].dims,e[1].dims,!1);if(!c)throw new Error("Can't perform binary op on the given tensors");s=c;let d=s.length,f=e[0].dims.length!==0?e[0].dims.length:1,m=e[1].dims.length!==0?e[1].dims.length:1,p=e[0].dims.length!==0?"bcastIndices_A(indices, aindices);":"aindices[0] = 0;",h=e[1].dims.length!==0?"bcastIndices_B(indices, bindices);":"bindices[0] = 0;",b=q(r.session.backend.glContext.version),y=a?`
      ${n.body}
      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();
        vec4 result = ${n.name}(a, b);
        ${b.output} = result;
      }`:`
      ${n.body}
      float process(int indices[${d}]) {
        int aindices[${f}];
        int bindices[${m}];
        ${p}
        ${h}
        return ${n.name}(_A(aindices), _B(bindices));
      }`;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:s,type:t,textureType:o},shaderSource:y,hasMain:a}}let u=q(r.session.backend.glContext.version),l=`
    ${n.body}
    void main() {
      vec4 v1 = ${u.texture2D}(A, TexCoords);
      vec4 v2 = ${u.texture2D}(B, TexCoords);
      vec4 result = ${n.name}(v1, v2);
      ${u.output} = result;
    }
    `;return{name:n.name,inputNames:["A","B"],inputTypes:[o,o],output:{dims:e[0].dims,type:t,textureType:o},shaderSource:l,hasMain:!0}},wl=(r,e)=>[r.run(ft(r,e,ly()),e)],_l=(r,e)=>[r.run(ft(r,e,gy(),"bool"),e)],Tl=(r,e)=>[r.run(ft(r,e,cy()),e)],vl=(r,e)=>[r.run(ft(r,e,py(),"bool"),e)],Il=(r,e)=>[r.run(ft(r,e,my(),"bool"),e)],Sl=(r,e)=>[r.run(ft(r,e,hy(),"bool"),e)],$l=(r,e)=>[r.run(ft(r,e,dy()),e)],Al=(r,e)=>[r.run(ft(r,e,by(),"bool"),e)],Pl=(r,e)=>[r.run(ft(r,e,xy()),e)],Ol=(r,e)=>[r.run(ft(r,e,wy()),e)],El=(r,e)=>[r.run(ft(r,e,fy()),e)],Cl=(r,e)=>[r.run(ft(r,e,yy(),"bool"),e)]});var Dl,Bl,Iy,Ll=S(()=>{"use strict";be();Dl=(r,e,n)=>(Iy(e),[r.cast(e[0],n)]),Bl=r=>He.tensorDataTypeFromProto(r.attributes.getInt("to")),Iy=r=>{if(!r||r.length!==1)throw new Error("Cast requires 1 input.");if(r[0].type==="string")throw new Error("Invalid input type.")}});var Sy,$y,zl,Kn,Rl=S(()=>{"use strict";$e();le();$t();cr();Sy=(r,e)=>({name:"Concat (packed)",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(2),cacheHint:e}),$y=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let v=1;v<n.length;v++){let I=n[v].dims.slice();for(let O=0;O<o.length;O++)if(O===t)i[t]+=I[O];else if(o[O]!==I[O])throw new Error("non concat dimensions must match")}let s=i.length,a=Or("coords",s),u=Ze(s),l=At(),c=n.map(v=>v.dims),d=Tt(s),f=new Array(c.length-1);f[0]=c[0][t];for(let v=1;v<f.length;v++)f[v]=f[v-1]+c[v][t];let m=d[t],p=d.slice(-2),h=d.join(),b=`if (${m} < ${f[0]}) {
        return getChannel(
            getX0(${h}), vec2(${p.join()}));
        }`;for(let v=1;v<f.length;v++){let I=f[v-1];b+=`
            if (${m} < ${f[v]}  && ${m} >= ${f[v-1]}) {
              return getChannel(
                getX${v}(${Kn(d,m,I)}),
                vec2(${Kn(p,m,I)}));
            }`}let y=f.length,g=f[f.length-1];b+=`
            return getChannel(
              getX${y}(${Kn(d,m,g)}),
              vec2(${Kn(p,m,g)}));`;let x=q(r.session.backend.glContext.version),_=`
          ${l}
          float getValue(${d.map(v=>"int "+v)}) {
            ${b}
          }

          void main() {
            ${u} coords = getOutputCoords();
            int lastDim = coords.${d[s-1]};
            coords.${d[s-1]} = coords.${d[s-2]};
            coords.${d[s-2]} = lastDim;

            vec4 result = vec4(getValue(${a}), 0., 0., 0.);

            ${a[s-1]} = ${a[s-1]} + 1;
            if (${a[s-1]} < ${i[s-1]}) {
              result.g = getValue(${a});
            }

            ${a[s-2]} = ${a[s-2]} + 1;
            if (${a[s-2]} < ${i[s-2]}) {
              result.a = getValue(${a});
            }

            ${a[s-1]} = ${a[s-1]} - 1;
            if (${a[s-2]} < ${i[s-2]} &&
                ${a[s-1]} < ${i[s-1]}) {
              result.b = getValue(${a});
            }
            ${x.output} = result;
          }
        `;return{...e,output:{dims:i,type:n[0].type,textureType:2},shaderSource:_,hasMain:!0}},zl=(r,e,n)=>{let t=Sy(e.length,n.cacheKey);return{...t,get:()=>$y(r,t,e,n.axis)}},Kn=(r,e,n)=>{let t=r.indexOf(e);return r.map((i,s)=>s===t?`${i} - ${n}`:i).join()}});var Nl,Ay,Py,Oy,Vl,Ey,Cy,ky,Ml,Dy,Fl=S(()=>{"use strict";Ge();le();Rl();Nl=(r,e,n)=>(Dy(e),r.session.pack&&e[0].dims.length>1?[r.run(zl(r,e,n),e)]:[r.run(Oy(r,e,n),e)]),Ay=(r,e)=>({name:"Concat",inputNames:Array.from({length:r},(n,t)=>`X${t}`),inputTypes:Array(r).fill(0),cacheHint:e}),Py=(r,e,n,t)=>{let o=n[0].dims.slice();if(t>=o.length||t<-1*o.length)throw new Error("axis specified for concat doesn't match input dimensionality");t<0&&(t=o.length+t);let i=o.slice(0);for(let m=1;m<n.length;m++){let p=n[m].dims.slice();for(let h=0;h<o.length;h++)if(h===t)i[t]+=p[h];else if(o[h]!==p[h])throw new Error("non concat dimensions must match")}let s=i.length,a=new Array(n.length),u=0;for(let m=0;m<a.length;++m)u+=n[m].dims[t],a[m]=u;let l="";n.length<5?l=Vl(a):l=Ey(a);let c=Cy(n.length,s),d=ky(a),f=`
        ${c}
        ${d}
        ${l}
        float process(int indices[${s}]) {
          int textureIndex = getTextureWhereDataResides (indices[${t}]);

          if(textureIndex != 0) {
            indices[${t}] = indices[${t}] - int(getSizeInConcatAxisValueFromIndex(textureIndex-int(1)));
          }

          return fetchDataFromCorrectTexture(textureIndex, indices);
        }`;return{...e,output:{dims:i,type:n[0].type,textureType:0},shaderSource:f}},Oy=(r,e,n)=>{let t=Ay(e.length,n.cacheKey);return{...t,get:()=>Py(r,t,e,n.axis)}},Vl=r=>`int getTextureWhereDataResides(int index) {
      ${r.map((n,t)=>`if(index<${n}) {return ${t};}
`).join("")}
    }`,Ey=r=>Vl(r),Cy=(r,e)=>{let n=[`float fetchDataFromCorrectTexture(int textureIndex, int indices[${e}]) {`];for(let t=0;t<r;++t)t===0?n.push(`	if (textureIndex == ${t}) { return _X${t}(indices); }`):t===r-1?n.push(`	else { return _X${t}(indices); }`):n.push(`	else if (textureIndex == ${t}) { return _X${t}(indices); }`);return n.push("	}"),n.join(`
`)},ky=r=>{let e=["int getSizeInConcatAxisValueFromIndex(int index) {"];for(let n=0;n<r.length;++n)n===0?e.push(`	if (index == ${n}) { return ${r[n]}; }`):n===r.length-1?e.push(`	else { return ${r[n]}; }`):e.push(`	else if (index == ${n}) { return ${r[n]}; }`);return e.push("	}"),e.join(`
`)},Ml=r=>ie({axis:r.attributes.getInt("axis")}),Dy=r=>{if(!r||r.length<1)throw new Error("too few inputs");let e=r[0].type,n=r[0].dims.length;if(e==="string")throw new Error("string tensor is not supported yet");for(let t of r){if(t.type!==e)throw new Error("input tensors should be one type");if(t.dims.length!==n)throw new Error("input tensors should have the same shape")}}});function By(){return pt("abs")}function Ly(){return pt("acos")}function zy(){return pt("asin")}function Ry(){return pt("atan")}function Ny(){return pt("ceil")}function Vy(){return pt("cos")}function My(r){let e="elu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a >= 0.0 ? a: (exp(a) - 1.0) * alpha;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Fy(){return pt("exp")}function Gy(){return pt("floor")}function Mi(r,e){let n="clip";return{body:`
  const float min = float(${r});
  const float max = float(${e});

  float ${n}_(float a) {
    return clamp(a, min, max);
  }
  vec4 ${n}_(vec4 v) {
    return clamp(v, min, max);
  }
  `,name:n,type:0}}function Uy(){let r="indentity";return{body:`
  float ${r}_(float a) {
    return a;
  }
  vec4 ${r}_(vec4 v) {
    return v;
  }
  `,name:r,type:0}}function Wy(r){let e="leakyRelu";return{body:`
  const float alpha = float(${r});

  float ${e}_(float a) {
    return a < 0.0 ? a * alpha : a;
  }
  vec4 ${e}_(vec4 v) {
    return vec4(${e}_(v.x), ${e}_(v.y), ${e}_(v.z), ${e}_(v.w));
  }
  `,name:e,type:0}}function Hy(){return pt("log")}function qy(){let r="neg";return{body:`
  float ${r}_(float a) {
    return -a;
  }
  vec4 ${r}_(vec4 v) {
    return -v;
  }
  `,name:r,type:0}}function Ky(){let r="not";return{body:`
  float ${r}_(float a) {
    return float( ! bool(a) );
  }
  bool ${r}_(bool a) {
    return !a;
  }
  vec4 ${r}_(vec4 v) {
    return vec4(!bool(v.x), !bool(v.y), !bool(v.z), !bool(v.w));
  }
  bvec4 ${r}_(bvec4 v) {
    return bvec4(!v.x, !v.y, !v.z, !v.w);
  }
  `,name:r,type:0}}function jy(){return pt("sin")}function Fi(){let r="relu";return{body:`
  float ${r}_(float a) {
    return max( a, 0.0 );
  }
  vec4 ${r}_(vec4 v) {
    return max( v, 0.0 );
  }
  `,name:r,type:0}}function Gi(){let r="sigmoid";return{body:`
  float ${r}_(float a) {
    return 1.0 / (1.0 + exp(-a));
  }
  vec4 ${r}_(vec4 v) {
    return 1.0 / (1.0 + exp(-v));
  }
  `,name:r,type:0}}function Xy(){return pt("sqrt")}function Zy(){return pt("tan")}function Jy(){let r="tanh";return{body:`
  float ${r}_(float a) {
    a = clamp(a, -10., 10.);
    a = exp(2.*a);
    return (a - 1.) / (a + 1.);
  }
  vec4 ${r}_(vec4 v) {
    v = clamp(v, -10., 10.);
    v = exp(2.*v);
    return (v - 1.) / (v + 1.);
  }
  `,name:r,type:0}}function pt(r){return{body:`
  float ${r}_(float a) {
    return ${r}(a);
  }
  vec4 ${r}_(vec4 v) {
    return ${r}(v);
  }
  `,name:r,type:0}}var Yy,De,Gl,Ul,Wl,Hl,Ui,ql,Kl,Qy,jl,Xl,Zl,Jl,Yl,Ql,Wi,ec,tc,rc,nc,oc,ic,ac,sc,uc,lc,cc,Hi=S(()=>{"use strict";Ge();be();Nt();$e();le();Yy=(r,e,n,t)=>{let o=r.session.pack?2:0,i=q(r.session.backend.glContext.version);return{...e,output:{dims:n.dims,type:n.type,textureType:o},shaderSource:`
     ${t.body}
     void main() {
       vec4 v = ${i.texture2D}(A, TexCoords);
       v = ${t.name}_(v);
       ${i.output} = v;
     }
     `,hasMain:!0}},De=(r,e,n,t)=>{let o=r.session.pack?2:0,i={name:n.name,inputTypes:[o],inputNames:["A"],cacheHint:t};return{...i,get:()=>Yy(r,i,e,n)}},Gl=(r,e)=>[r.run(De(r,e[0],By()),e)],Ul=(r,e)=>[r.run(De(r,e[0],Ly()),e)],Wl=(r,e)=>[r.run(De(r,e[0],zy()),e)],Hl=(r,e)=>[r.run(De(r,e[0],Ry()),e)],Ui=(r,e,n)=>[r.run(De(r,e[0],Mi(n.min,n.max),n.cacheKey),e)],ql=r=>ie({min:r.attributes.getFloat("min",sr),max:r.attributes.getFloat("max",ur)}),Kl=(r,e)=>{let n=Qy(r,e);return Ui(r,[e[0]],n)},Qy=(r,e)=>{if(e.length>=3&&(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)))throw new Error("dynamic clip attributes are not allowed");let n=e.length>=3?e[1].numberData[0]:sr,t=e.length>=3?e[2].numberData[0]:ur;return ie({min:n,max:t})},jl=(r,e)=>[r.run(De(r,e[0],Ny()),e)],Xl=(r,e)=>[r.run(De(r,e[0],Vy()),e)],Zl=(r,e,n)=>[r.run(De(r,e[0],My(n.alpha),n.cacheKey),e)],Jl=r=>ie({alpha:r.attributes.getFloat("alpha",1)}),Yl=(r,e)=>[r.run(De(r,e[0],Fy()),e)],Ql=(r,e)=>[r.run(De(r,e[0],Gy()),e)],Wi=(r,e)=>[r.run(De(r,e[0],Uy()),e)],ec=(r,e,n)=>[r.run(De(r,e[0],Wy(n.alpha),n.cacheKey),e)],tc=r=>ie({alpha:r.attributes.getFloat("alpha",.01)}),rc=(r,e)=>[r.run(De(r,e[0],Hy()),e)],nc=(r,e)=>[r.run(De(r,e[0],qy()),e)],oc=(r,e)=>[r.run(De(r,e[0],Ky()),e)],ic=(r,e)=>[r.run(De(r,e[0],Fi()),e)],ac=(r,e)=>[r.run(De(r,e[0],Gi()),e)],sc=(r,e)=>[r.run(De(r,e[0],jy()),e)],uc=(r,e)=>[r.run(De(r,e[0],Xy()),e)],lc=(r,e)=>[r.run(De(r,e[0],Zy()),e)],cc=(r,e)=>[r.run(De(r,e[0],Jy()),e)]});function Pt(r){let e;switch(r.activation){case"Relu":e=Fi();break;case"Sigmoid":e=Gi();break;case"Clip":e=Mi(r.clipMin,r.clipMax);break;default:return{activationFunction:"",applyActivation:""}}let n=e.name,t=e.body,o=`value = ${n}_(value);`;return{activationFunction:t,applyActivation:o}}var Er,dr=S(()=>{"use strict";be();Hi();Er=r=>{let e=r.getString("activation","");if(e==="Clip"){let[n,t]=r.getFloats("activation_params",[sr,ur]);return{activation:e,clipMax:t,clipMin:n,activationCacheKey:`${e}:${n},${t}`}}return{activation:e,activationCacheKey:e}}});var tx,rx,dc,fc=S(()=>{"use strict";st();$e();le();jn();dr();tx=(r,e)=>({name:"GroupedConv",inputNames:r?["X","W","Bias"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),rx=(r,e,n,t)=>{let i=e.length>2?"value += getBias(output_channel);":"",s=e[0].dims.slice(),a=e[1].dims.slice(),u=a[0]/t.group;ye.verbose("GroupedConv",`autpPad:${t.autoPad}, dilations:${t.dilations}, group:${t.group}, kernelShape:${t.kernelShape}, pads:${t.pads}, strides:${t.strides}`);let l=Cr(s,a,t.dilations,t.pads,t.strides),c=q(r.session.backend.glContext.version),{activationFunction:d,applyActivation:f}=Pt(t),m=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${d}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;
    ivec2 xRCCorner = coords.zw * strides - pads;
    int group_id = output_channel / ${u};

    float value = 0.0;
    for (int wInChannel = 0; wInChannel < ${a[1]}; wInChannel++) {
      int input_channel = group_id * ${a[1]} + wInChannel;
      for (int wHeight = 0; wHeight < ${a[2]}; wHeight++) {
        int xHeight = xRCCorner.x + wHeight * ${t.dilations[0]};

        if (xHeight < 0 || xHeight >= ${s[2]}) {
          continue;
        }

        for (int wWidth = 0; wWidth < ${a[3]}; wWidth++) {
          int xWidth = xRCCorner.y + wWidth * ${t.dilations[1]};
          if (xWidth < 0 || xWidth >= ${s[3]}) {
            continue;
          }

          float xVal = getX(batch, input_channel, xWidth, xHeight);
          float wVal = getW(output_channel, wInChannel, wWidth, wHeight);
          value += xVal*wVal;
        }
      }
    }
    ${i}
    ${f}
    ${c.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:l,type:e[0].type,textureType:0},shaderSource:m,hasMain:!0}},dc=(r,e,n)=>{let t=tx(e.length>2,n.cacheKey);return{...t,get:()=>rx(r,e,t,n)}}});var nx,ox,pc,mc=S(()=>{"use strict";$e();le();cr();nx=r=>({name:"Im2Col (packed)",inputNames:["A"],inputTypes:[2],cacheHint:r}),ox=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=2,l=3,c=o.length,d=[a[1]*a[2]*a[3],o[2]*o[3]],f=a[2]*a[3],m=At(),p=q(r.session.backend.glContext.version),h="";for(let y=0;y<=1;y++)for(let g=0;g<=1;g++)h+=`
            blockIndex = rc.x + ${g};
            pos = rc.y + ${y};

            if(blockIndex < ${d[1]} && pos < ${d[0]}) {
              offsetY = int(blockIndex / (${o[c-1]})) * ${i.strides[0]} -
                ${i.pads[0]};
              d0 = offsetY + ${i.dilations[0]} * (imod(pos, ${f}) / ${a[2]});

              if(d0 < ${s[u]} && d0 >= 0) {
                offsetX = imod(blockIndex, ${o[c-1]}) * ${i.strides[1]} -
                  ${i.pads[1]};
                d1 = offsetX + ${i.dilations[1]} * imod(imod(pos, ${f}), ${a[2]});

                if(d1 < ${s[l]} && d1 >= 0) {

                  ch = int(float(pos)/ ${f}.);
                    innerDims = vec2(d0, d1);
                    result[${y*2+g}] = getChannel(
                      getA(0, ch, int(innerDims.x),
                      int(innerDims.y)), innerDims);
                }
              }
            }

          `;let b=`
      ${m}

      void main() {
        ivec2 rc = getOutputCoords();
          vec4 result = vec4(0.0);
          int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
          vec2 innerDims;
          ${h}
          ${p.output} = result;
      }
            `;return{...e,output:{dims:d,type:n.type,textureType:2},shaderSource:b,hasMain:!0}},pc=(r,e,n,t,o)=>{let i=nx(o.cacheKey);return{...i,get:()=>ox(r,i,e,n,t,o)}}});function ax(r,e,n){let t=e[0].dims,o=e[1].dims,i=Xe.calcShape(t,o,!0);if(!i)throw new Error("Can't use matmul on the given tensors");let s=Ze(i.length),a=Tt(),{activationFunction:u,applyActivation:l}=Pt(n),c=e.length>2,d=c?"value += getBiasForMatmul();":"",f=c?`${Ki(s,a,e[2].dims,i,!1)}`:"",m=i.length,p=t.length,h=o.length,b=t[t.length-1],y=`
    ${u}
    ${f}
    float process(int indices[${m}]) {
        int a[${p}];
        int b[${h}];
        bcastMatmulIndices_A(indices, a);
        bcastMatmulIndices_B(indices, b);

        float value;
        for (int k=0; k<${b}; ++k) {
            a[${p-1}] = k;
            b[${h-2}] = k;
            value += _A(a) * _B(b);
        }
        ${d}
        ${l}
        return value;
    }`;return{...r,output:{dims:i,type:e[0].type,textureType:0},shaderSource:y}}function qi(r,e){let n=ix(r.length>2,e.activationCacheKey);return{...n,get:()=>ax(n,r,e)}}function Ki(r,e,n,t,o){let i="",s=n.length,a=t.length,u=a-s;a<2&&s>0?i="coords":i=n.map((h,b)=>`coords.${e[b+u]}`).join(", ");let c=Xe.getBroadcastDims(n,t).map(h=>`coords.${e[h+u]} = 0;`).join(`
`),f=G.size(n)===1,m="vec4(outputValue.xx, outputValue.yy)";return f&&(m="vec4(outputValue.x)"),o?`
vec4 getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  vec4 outputValue = getBias(${i});
  return ${m};
}`:`
float getBiasForMatmul() {
  ${r} coords = getOutputCoords();
  ${c}
  return getBias(coords.x);
}`}var hc,gc,ix,sx,Xn=S(()=>{"use strict";be();le();$t();dr();ji();hc=(r,e,n)=>(sx(e),r.session.pack?[r.run(Zn(r,e,n),e)]:[r.run(qi(e,n),e)]),gc=r=>Er(r.attributes),ix=(r,e)=>({name:"MatMul",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e});sx=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64")throw new Error("inputs should be float type");if(r[0].type!==r[1].type)throw new Error("inputs types should match")}});function cx(r,e,n,t){let o=[],i=[],s=n[0].dims,a=n[1].dims,u=s.length,l=a.length,c=t.length,d=c-u,f=c-l;o=s.map((x,_)=>`coords.${e[_+d]}`),o[u-1]="i*2",o.join(", "),i=a.map((x,_)=>`coords.${e[_+f]}`),i[l-2]="i*2",i.join(", ");let m=Xe.getBroadcastDims(s,t),p=Xe.getBroadcastDims(a,t),h=m.map(x=>`coords.${e[x+d]} = 0;`).join(`
`),b=p.map(x=>`coords.${e[x+f]} = 0;`).join(`
`),y=`int lastDim = coords.${e[c-1]};
  coords.${e[c-1]} = coords.${e[c-2]};
  coords.${e[c-2]} = lastDim;`;return`
vec4 getAAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${y}
  ${h}
  vec4 outputValue = getA(${o});
  return outputValue;
}

vec4 getBAtOutCoordsMatmul(int i) {
  ${r} coords = getOutputCoords();
  ${y}
  ${b}
  vec4 outputValue = getB(${i});
  return outputValue;
}`}function dx(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`rc.${r[e-2]}, i*2`,n}function fx(r,e){let n="";for(let t=0;t<e-2;t++)n+=`rc.${r[t]}, `;return n+=`i*2, rc.${r[e-1]}`,n}var ux,lx,Zn,ji=S(()=>{"use strict";be();$e();le();$t();dr();Xn();ux=(r,e)=>({name:"MatMul (packed)",inputNames:r?["A","B","Bias"]:["A","B"],inputTypes:r?[2,2,2]:[2,2],cacheHint:e}),lx=(r,e,n,t)=>{let o=n.length>2,i=o?"value += getBiasForMatmul();":"",s=n[0].dims,a=n[1].dims,u=Xe.calcShape(s,a,!0),l=!G.areEqual(n[0].dims,n[1].dims);if(!u)throw new Error("Can't use matmul on the given tensors");let c=s[s.length-1],d=Math.ceil(c/2),f=s.length,m=a.length,p=q(r.session.backend.glContext.version),h=Ze(u.length),b=u.length,y=Tt(),{activationFunction:g,applyActivation:x}=Pt(t),_=o?`${Ki(h,y,n[2].dims,u,!0)}`:"",v=l?`${cx(h,y,n,u)}`:"",I=l?"getAAtOutCoordsMatmul(i)":`getA(${dx(y,f)})`,O=l?"getBAtOutCoordsMatmul(i)":`getB(${fx(y,m)})`,E=l?"":`${h} rc =
          getOutputCoords(); int lastDim = rc.${y[b-1]}; rc.${y[b-1]} =
          rc.${y[b-2]}; rc.${y[b-2]} = lastDim;
      `,k=`
            ${v}
            ${_}
            ${g}
            void main() {
              ${E}

              vec4 value = vec4(0);
              for (int i = 0; i < ${d}; i++) {
                vec4 a = ${I};
                vec4 b = ${O};

                value += (a.rrbb * b.rgrg);
                value += (a.ggaa * b.baba);
              }
              ${i}
              ${x}
              ${p.output} = value;
            }`;return{...e,output:{dims:u,type:n[0].type,textureType:2},shaderSource:k,hasMain:!0}},Zn=(r,e,n)=>{let t=ux(e.length>2,n.activationCacheKey);return{...t,get:()=>lx(r,t,e,n)}}});var bc,yc=S(()=>{"use strict";jn();mc();ji();bc=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Cr(t,o,n.dilations,n.pads,n.strides),s=r.run(pc(r,e[0],e[1],i,n),[e[0]]),a=r.reshapePacked(e[1],[o[0],o[1]*o[2]*o[3]]),u=e.length===3?[a,s,e[2]]:[a,s],l=r.run(Zn(r,u,n),u);return r.reshapePacked(l,i)}});var px,mx,xc,Xi,Zi=S(()=>{"use strict";le();px=r=>({name:"Im2Col",inputNames:["X"],inputTypes:[0],cacheHint:r}),mx=(r,e,n,t,o,i)=>{let s=n.dims,a=t.dims,u=o.length,l=Xi(s,a,o,4),c=`
        const int XC = ${s[1]};
        const int XH = ${s[2]};
        const int XW = ${s[3]};
        const int KH = ${i.kernelShape[0]};
        const int KW = ${i.kernelShape[1]};
        const int dilationH = ${i.dilations[0]};
        const int dilationW = ${i.dilations[1]};
        const int strideH = ${i.strides[0]};
        const int strideW = ${i.strides[1]};
        const int padH = ${i.pads[0]};
        const int padW = ${i.pads[1]};
        const int KHKW = KH*KW;
        const int XCKHKW = XC * KHKW;
        const int outputChannels = 4;
        vec4 process(int indices[${u}]) {
          int b  = indices[0]; // batch size
          int oh = indices[1] * strideH - padH; //output height
          int ow = indices[2] * strideW - padW; //output width
          int p = indices[3] * outputChannels; //patch
          vec4 value = vec4(0.0);
          for(int i=0; i < outputChannels; ++i) {
            if(p < XCKHKW) {
              int patchC = p / KHKW;
              int patchH = (p - patchC*KHKW) / KW;
              int patchW = (p - patchC*KHKW) - patchH * KW;
              int xh2 = oh + patchH * dilationH;
              int xw2 = ow + patchW * dilationW;
              int x[${s.length}];
              x[0] = b;
              x[1] = patchC;
              x[2] = xh2;
              x[3] = xw2;
              if(xh2 >= 0 &&
                  xh2 < XH &&
                  xw2 >= 0 &&
                  xw2 < XW) {
                value[i] = _X(x);
              }
            }
            ++p;
          }
          return value;
        }
        `;return{...e,output:{dims:l,type:n.type,textureType:4},shaderSource:c}},xc=(r,e,n,t,o)=>{let i=px(o.cacheKey);return{...i,get:()=>mx(r,i,e,n,t,o)}},Xi=(r,e,n,t=4)=>[n[0],n[2],n[3],Math.ceil(r[1]*e[2]*e[3]/t)]});var hx,gx,wc,_c=S(()=>{"use strict";be();$e();le();dr();Zi();hx=(r,e)=>({name:"ConvDotProduct",inputNames:r?["Im2Col","K","B"]:["Im2Col","K"],inputTypes:r?[0,4,0]:[0,4],cacheKey:e.activationCacheKey}),gx=(r,e,n,t,o)=>{let i=n[0].dims,s=n[1].dims,a=[s[0],Math.ceil(i[1]*s[2]*s[3]/4)],u=Xi(i,s,t),[l,c]=r.calculateTextureWidthAndHeight(a,4),d=G.computeStrides(u),[f,m]=r.calculateTextureWidthAndHeight(u,4),p=t.length,h=n.length<3?"0.0":"_B(b)",b=Math.ceil(i[1]*s[2]*s[3]/4),{activationFunction:y,applyActivation:g}=Pt(o),x=q(r.session.backend.glContext.version),_=`
${y}
float process(int indices[${p}]) {
  int b[1];
  b[0] = indices[1];
  int im2col[4];
  im2col[0] = indices[0];
  im2col[1] = indices[2];
  im2col[2] = indices[3];
  int im2colOffset = im2col[0] * ${d[0]} + im2col[1] * ${d[1]} + im2col[2] * ${d[2]};
  int kernelOffset = indices[1] * ${a[1]};
  float value = ${h};
  for (int i = 0; i < ${b}; ++i) {
    vec2 im2colCoords = offsetToCoords(im2colOffset, ${f}, ${m});
    vec2 kernelCoords = offsetToCoords(kernelOffset, ${l}, ${c});
    value += dot(${x.texture2D}(Im2Col, im2colCoords), ${x.texture2D}(K, kernelCoords));
    ++im2colOffset;
    ++kernelOffset;
  }
  ${g}
  return value;
}`;return{...e,output:{dims:t,type:n[0].type,textureType:0},shaderSource:_}},wc=(r,e,n,t)=>{let o=hx(e.length>2,t);return{...o,get:()=>gx(r,o,e,n,t)}}});var Cr,Ji,bx,yx,xx,wx,Yi,_x,jn=S(()=>{"use strict";Ge();be();fc();yc();_c();dr();Zi();Xn();Cr=(r,e,n,t,o)=>{let i=r[0],s=r.slice(2),a=s.length,u=e[0],c=e.slice(2).map((p,h)=>p+(p-1)*(n[h]-1)),f=s.map((p,h)=>p+t[h]+t[h+a]).map((p,h)=>Math.floor((p-c[h]+o[h])/o[h]));return[i,u].concat(...f)},Ji=(r,e,n)=>(_x(e,n),bx(r,e,n)),bx=(r,e,n)=>{let t=wx(n,e),o=r.session.pack,i=t.kernelShape[0]===1&&t.kernelShape[1]===1;return t.group>1?[r.run(dc(r,e,t),e)]:i&&o?[yx(r,e,t)]:o&&e[0].dims.length===4&&e[0].dims[0]===1&&!i?[bc(r,e,t)]:[xx(r,e,t)]},yx=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Cr(t,o,n.dilations,n.pads,n.strides),s=r.reshapeUnpacked(e[0],[t[1],t[2]*t[3]]),a=r.reshapeUnpacked(e[1],[o[0],o[1]]),u=e.length>2?[a,s,e[2]]:[a,s],l=r.run(qi(u,n),u);return r.reshapeUnpacked(l,i)},xx=(r,e,n)=>{let t=e[0].dims,o=e[1].dims,i=Cr(t,o,n.dilations,n.pads,n.strides),s=r.run(xc(r,e[0],e[1],i,n),[e[0]]),a=e.length===3?[s,e[1],e[2]]:[s,e[1]];return r.run(wc(r,e,i,n),a)},wx=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let i=2;i<e[1].dims.length;++i)n.push(e[1].dims[i]);let t=r.pads.slice();ar.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t,cacheKey:r.cacheKey}),o},Yi=r=>{let e=r.attributes,n=Er(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("pads",[0,0,0,0]),u=e.getInts("strides",[1,1]);return ie({autoPad:t,dilations:o,group:i,kernelShape:s,pads:a,strides:u,...n})},_x=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("Conv input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("Conv input(bias) should be float tensor")}});var Tx,vx,Ix,Tc,Sx,$x,Ax,Px,Ox,Ex,vc,Cx,Ic=S(()=>{"use strict";Ge();$e();le();dr();Tx=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,vx=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},Ix=(r,e,n,t,o,i,s,a)=>{let u=r.length-2,l=a.length===0;for(let c=0;c<u;++c){let d=l?r[c+2]*i[c]:a[c],f=Tx(r[c+2],i[c],o[c],e[c],n[c],d);vx(f,t,o,c,c+u),l&&a.push(i[c]*(r[c+2]-1)+s[c]+(e[c]-1)*n[c]+1-o[c]-o[c+u])}},Tc=(r,e,n)=>(Cx(e,n),Sx(r,e,n)),Sx=(r,e,n)=>{let t=Ex(n,e);return[Ox(r,e,t)]},$x=(r,e)=>({name:"ConvTranspose",inputNames:r?["X","W","B"]:["X","W"],inputTypes:r?[0,0,0]:[0,0],cacheHint:e}),Ax=(r,e,n,t)=>{let i=e.length>2?"getB(output_channel)":"0.0",s=e[0].dims,a=e[1].dims,u=a[1],l=a[0]/t.group,c=[e[0].dims[0],e[1].dims[1]*t.group,...t.outputShape],d=q(r.session.backend.glContext.version),{activationFunction:f,applyActivation:m}=Pt(t),p=`
  const ivec2 strides = ivec2(${t.strides[0]}, ${t.strides[1]});
  const ivec2 pads = ivec2(${t.pads[0]}, ${t.pads[1]});
  ${f}
  void main() {
    ivec4 coords = getOutputCoords();
    int batch = coords.x;
    int output_channel = coords.y;

    ivec2 loc = coords.zw + pads;

    int group_id = output_channel / ${u};
    int wOutChannel = output_channel - group_id * ${u};

    float value = ${i};
    for (int inChannelOffset = 0; inChannelOffset < ${l}; inChannelOffset++) {
      int input_channel = group_id * ${l} + inChannelOffset;
      for (int wWOff = 0; wWOff < ${a[2]}; wWOff++) {
        for (int wHOff = 0; wHOff < ${a[3]}; wHOff++) {
          ivec2 wOff = ivec2(wWOff * ${t.dilations[0]}, wHOff * ${t.dilations[1]});
          ivec2 wLoc = loc - wOff;
          ivec2 wLocIn = wLoc / strides;
          if (
            wLocIn * strides == wLoc &&
            wLocIn.x >= 0 && wLocIn.x < ${s[2]} &&
            wLocIn.y >= 0 && wLocIn.y < ${s[3]}
          ) {
            float xVal = getX(batch, input_channel, wLocIn.y, wLocIn.x);
            float wVal = getW(input_channel, wOutChannel, wHOff, wWOff);
            value += xVal * wVal;
          }
        }
      }
    }
    ${m}
    ${d.output} = vec4(value, .0, .0, .0);
  }
`;return{...n,output:{dims:c,type:e[0].type,textureType:0},shaderSource:p,hasMain:!0}},Px=(r,e,n)=>{let t=$x(e.length>2,n.cacheKey);return{...t,get:()=>Ax(r,e,t,n)}},Ox=(r,e,n)=>r.run(Px(r,e,n),e),Ex=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0)for(let a=2;a<e[1].dims.length;++a)n.push(e[1].dims[a]);let t=r.pads.slice(),o=r.outputShape.slice(),i=e[0].dims;Ix(i,n,r.dilations,r.autoPad,t,r.strides,r.outputPadding,o);let s=Object.assign({},r);return Object.assign(s,{kernelShape:n,pads:t,outputShape:o,cacheKey:r.cacheKey}),s},vc=r=>{let e=r.attributes,n=Er(e),t=e.getString("auto_pad","NOTSET"),o=e.getInts("dilations",[1,1]),i=e.getInt("group",1),s=e.getInts("kernel_shape",[]),a=e.getInts("output_padding",[0,0]),u=e.getInts("output_shape",[]),l=e.getInts("pads",[0,0,0,0]),c=e.getInts("strides",[1,1]);return ie({autoPad:t,dilations:o,group:i,kernelShape:s,outputPadding:a,outputShape:u,pads:l,strides:c,...n})},Cx=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4||r[1].dims.length!==4)throw new Error("currently only support 2-dimensional conv");let n=r[0].dims[1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape");if(r[0].type!=="float32"||r[1].type!=="float32")throw new Error("ConvTranspose input(X,W) should be float tensor");if(r.length===3&&r[2].type!=="float32")throw new Error("ConvTranspose input(bias) should be float tensor")}});var Sc,fr,$c,kx,Ac,Dx,Bx,Lx,Jn=S(()=>{"use strict";Ge();be();le();Sc={name:"Transpose",inputNames:["A"],inputTypes:[0]},fr=(r,e,n)=>(Lx(e),[r.run({...Sc,cacheHint:n.cacheKey,get:()=>kx(r,e[0],n.perm)},e)]),$c=r=>ie({perm:r.attributes.getInts("perm",[])}),kx=(r,e,n)=>{let t=e.dims;n=Ac(t,n);let o=Dx(t,n),i=t.length,s=`
      ${Bx("perm",n,i)}
      float process(int indices[${i}]) {
        int a[${i}];
        perm(a, indices);
        return _A(a);
      }`;return{...Sc,output:{dims:o,type:e.type,textureType:0},shaderSource:s}},Ac=(r,e)=>(e&&e.length!==r.length&&(e=[...r.keys()].reverse()),e),Dx=(r,e)=>(e=Ac(r,e),G.sortBasedOnPerm(r,e)),Bx=(r,e,n)=>{let t=[];t.push(`void ${r}(out int a[${n}], int src[${n}]) {`);for(let o=0;o<n;++o)t.push(`	a[${e[o]}]=src[${o}];`);return t.push("	}"),t.join(`
`)},Lx=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("input should be float tensor")}});var Pc,Oc,zx,Ec=S(()=>{"use strict";Jn();Pc=(r,e,n)=>{zx(e);let t=n.blocksize,o=t*t,i=n.mode==="DCR"?[0,3,4,1,5,2]:[0,1,4,2,5,3],s=n.mode==="DCR"?[e[0].dims[0],t,t,e[0].dims[1]/o,e[0].dims[2],e[0].dims[3]]:[e[0].dims[0],e[0].dims[1]/o,t,t,e[0].dims[2],e[0].dims[3]],a=r.reshapeUnpacked(e[0],s),u={perm:i,cacheKey:`${i}`},[l]=fr(r,[a],u),c=[e[0].dims[0],e[0].dims[1]/o,e[0].dims[2]*t,e[0].dims[3]*t];return[r.reshapeUnpacked(l,c)]},Oc=r=>{let e=r.attributes.getInt("blocksize");if(e<1)throw new Error(`blocksize must be >= 1, but got : ${e} for DepthToSpace`);let n=r.attributes.getString("mode","DCR");if(n!=="DCR"&&n!=="CRD")throw new Error(`unrecognized mode: ${n} for DepthToSpace`);return{mode:n,blocksize:e}},zx=r=>{if(r.length!==1)throw new Error(`DepthToSpace expect 1 inputs, but got ${r.length}`);if(r[0].type==="string"||r[0].dims.length!==4)throw new TypeError("DepthToSpace input should be a 4-D numeric tensor")}});var Cc,kc,Rx,Dc=S(()=>{"use strict";be();Cc=(r,e,n)=>{Rx(e,n);let t=G.flattenShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},kc=r=>r.attributes.getInt("axis",1),Rx=(r,e)=>{if(!r||r.length!==1)throw new Error("Flatten requires 1 input.");let n=r[0].dims.length;if(n===0)throw new Error("scalar tensor is not supported.");if(e<-n||e>n)throw new Error("Invalid axis");if(r[0].type==="string")throw new Error("string tensor is not supported.")}});var jt,Yr=S(()=>{"use strict";jt=["float32","float64","int32","int16","int8","uint16","uint32","uint8"]});var Bc,Lc,Nx,Vx,Mx,Fx,zc=S(()=>{"use strict";Ge();Yr();be();le();Bc=(r,e,n)=>(Fx(e,n.axis),[r.run(Mx(r,e,n),e)]),Lc=r=>ie({axis:r.attributes.getInt("axis",0)}),Nx={name:"Gather",inputNames:["A","B"],inputTypes:[0,0]},Vx=(r,e,n,t)=>{let o=n[0].dims.slice(),i=n[1].dims.slice(),s=new Array(o.length+i.length-1);t=G.normalizeAxis(t,o.length);let a=[];for(let f=0;f<s.length;f++)f<t?(s[f]=o[f],a.push(`inputIdx[${f}] = outputIdx[${f}];`)):f<t+i.length?(s[f]=i[f-t],a.push(`indexDataIdx[${f-t}] = outputIdx[${f}];`)):(s[f]=o[f-i.length+1],a.push(`inputIdx[${f-i.length+1}] = outputIdx[${f}];`));let u=s.length||1,l=o.length,c=i.length||1,d=`
      float process(int outputIdx[${u}]) {
        int inputIdx[${l}];
        int indexDataIdx[${c}];
        indexDataIdx[0] = 0;
        ${a.join(`
        `)}
        int idx = int(_B(indexDataIdx));
        inputIdx[${t}] = idx < 0 ? idx + ${o[t]} : idx;
        return _A(inputIdx);
      }`;return{...e,output:{dims:s,type:n[0].type,textureType:0},shaderSource:d}},Mx=(r,e,n)=>{let t={...Nx,cacheHint:n.cacheKey};return{...t,get:()=>Vx(r,t,e,n.axis)}},Fx=(r,e)=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.");let n=r[0].dims.length;if(n<1)throw new Error("Invalid input shape.");if(e<-n||e>n-1)throw new Error("Invalid axis.");if(jt.indexOf(r[0].type)===-1)throw new Error("Invaid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invaid input type.")}});var Qi,Rc,Nc,Vc,Gx,Ux,Wx,Mc=S(()=>{"use strict";Ge();be();le();Qi=(r,e,n)=>(Wx(e,n),[r.run(Gx(e,n),e)]),Rc=(r,e)=>{let n=r.attributes.getInt("transA",0)!==0,t=r.attributes.getInt("transB",0)!==0,o=r.attributes.getFloat("alpha",1),i=r.attributes.getFloat("beta",1);return ie({transA:n,transB:t,alpha:o,beta:i,isOptionalC:e})},Nc=r=>Rc(r,!1),Vc=r=>Rc(r,!0),Gx=(r,e)=>{let n={name:"Gemm",inputNames:r.length===3?["A","B","C"]:["A","B"],inputTypes:r.length===3?[0,0,0]:[0,0],key:e.cacheKey};return{...n,get:()=>Ux(n,r,e)}},Ux=(r,e,n)=>{let t=e[0].dims.slice(),o=e[1].dims.slice(),[i,s]=Mn.getShapeOfGemmResult(t,n.transA,o,n.transB,e.length===3?e[2].dims:void 0),a=[i,s];if(!a)throw new Error("Can't use gemm on the given tensors");let u=t[t.length-1],l="";n.transA&&(u=t[0]),n.transA&&n.transB?l="value += _A_T(a) * _B_T(b);":n.transA&&!n.transB?l="value += _A_T(a) * _B(b);":!n.transA&&n.transB?l="value += _A(a) * _B_T(b);":!n.transA&&!n.transB&&(l="value += _A(a) * _B(b);");let c=a.length,d=e.length===3?`int c[${e[2].dims.length}];`:"",f=e.length===3?"bcastIndices_C(indices, c);":"",m=e.length===3?"value += beta * _C(c);":"",p=`
      float process(int indices[${c}]) {
          int a[${c}];
          int b[${c}];
          ${d}

          copyVec(indices, a);
          copyVec(indices, b);
          ${f}

          float value = 0.0;
          for (int k=0; k<${u}; ++k) {
              a[${c-1}] = k;
              b[${c-2}] = k;
              ${l}
          }

          value = value * alpha;
          ${m}
          return value;
      }`;return{...r,output:{dims:a,type:e[0].type,textureType:0},variables:[{name:"alpha",type:"float",data:n.alpha},{name:"beta",type:"float",data:n.beta}],shaderSource:p}},Wx=(r,e)=>{if(!r)throw new Error("Input is missing");if(e.isOptionalC&&(r.length<2||r.length>3))throw new Error("Invaid input shape.");if(!e.isOptionalC&&r.length!==3)throw new Error("Gemm requires 3 inputs");if(r.length===3&&r[2].dims.length!==1&&r[2].dims.length!==2)throw new Error("Invalid input shape of C");if(r[0].type!=="float32"&&r[0].type!=="float64"||r[1].type!=="float32"&&r[1].type!=="float64"||r.length===3&&r[2].type!=="float32"&&r[2].type!=="float64")throw new Error("Invalid input type.");if(r[0].type!==r[1].type||r.length===3&&r[0].type!==r[2].type)throw new Error("Input types are mismatched")}});var Fc,Gc,Hx,qx,Kx,jx,Xx,Uc=S(()=>{"use strict";Ge();le();Fc=(r,e,n)=>(Xx(e),[r.run(Kx(r,e,n),e)]),Gc=r=>{let e=r.attributes.getFloat("scale"),n=r.attributes.getFloats("bias");return ie({scale:e,bias:n})},Hx={name:"ImageScaler",inputNames:["X"],inputTypes:[0]},qx=(r,e,n,t)=>{let o=n[0].dims.slice(),i=o.length,a=`
      ${jx(t.bias.length)}
      float process(int indices[${i}]) {
        return _X(indices) * scale + getBias(bias, indices[1]);
      }`;return{...e,output:{dims:o,type:n[0].type,textureType:0},variables:[{name:"bias",type:"float",arrayLength:t.bias.length,data:t.bias},{name:"scale",type:"float",data:t.scale}],shaderSource:a}},Kx=(r,e,n)=>{let t={...Hx,cacheHint:n.cacheKey};return{...t,get:()=>qx(r,t,e,n)}},jx=r=>{let e=[`float getBias(float bias[${r}], int channel) {`];for(let n=0;n<r;++n)n===0?e.push(`	if (channel == ${n}) { return bias[${n}]; }`):n===r-1?e.push(`	else { return bias[${n}]; }`):e.push(`	else if (channel == ${n}) { return bias[${n}]; }`);return e.push("	}"),e.join(`
`)},Xx=r=>{if(!r||r.length!==1)throw new Error("ImageScaler requires 1 input.");if(r[0].dims.length!==4)throw new Error("Invalid input shape.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")}});var Hc,qc,Wc,Zx,Jx,Yx,Qx,ew,tw,Kc=S(()=>{"use strict";$e();le();Hc=(r,e,n)=>{tw(e);let t=r.run(Jx(e[0]),e);return[r.run(ew(r,e[0],n,t.dims),[e[0],t,e[1],e[2]])]},qc=r=>r.attributes.getFloat("epsilon",1e-5),Wc={name:"InstanceNormalization_MeanAndVariance",inputNames:["X"],inputTypes:[0]},Zx=(r,e)=>{let n=e.dims.slice(),t=n[1],o=n[2]*n[3],i=[n[0],t],s=`
      vec4 process(int[2] indices) {
        vec4 v = vec4(0.0);
        int a[4];
        a[0] = indices[0];
        a[1] = indices[1];
        float temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += x;
          }
        }
        float mean = temp / float(${o});
        temp = 0.0;
        for(int a2=0; a2<${n[2]}; a2++) {
          a[2] = a2;
          for(int a3=0; a3<${n[3]}; a3++) {
            a[3] = a3;
            float x = _X(a);
            temp += (x - mean) * (x - mean);
          }
        }
        v.r = mean;
        v.g = temp / float(${o});

        return v;
      }`;return{...r,output:{dims:i,type:e.type,textureType:4},shaderSource:s}},Jx=r=>({...Wc,get:()=>Zx(Wc,r)}),Yx={name:"InstanceNormalization_ComputeOutput",inputNames:["X","MeanAndVariance","Scale","B"],inputTypes:[0,4,0,0]},Qx=(r,e,n,t,o)=>{let i=q(r.session.backend.glContext.version),[s,a]=r.calculateTextureWidthAndHeight(o,4),[u,l]=[s/4,a],c=`
      vec4 get_MeanAndVariance(int[2] mv) {
        int offset = indicesToOffset_MeanAndVariance(mv);
        vec2 coords = offsetToCoords(offset, ${u}, ${l});
        return ${i.texture2D}(MeanAndVariance, coords);
      }

      float process(int[4] indices) {
        int mv[2];
        mv[0] = indices[0];
        mv[1] = indices[1];
        vec4 mean_and_variance = get_MeanAndVariance(mv);
        float mean = mean_and_variance.r;
        float variance = mean_and_variance.g;

        int sb[1];
        sb[0] = indices[1];
        float scale = _Scale(sb);
        float b = _B(sb);

        return scale * (_X(indices) - mean) / sqrt(variance + epsilon) + b;
      }`;return{...e,output:{dims:n.dims,type:n.type,textureType:0},variables:[{name:"epsilon",type:"float",data:t}],shaderSource:c}},ew=(r,e,n,t)=>{let o={...Yx,cacheHint:`${n}`};return{...o,get:()=>Qx(r,o,e,n,t)}},tw=r=>{if(!r||r.length!==3)throw new Error("InstanceNormalization requires 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dims.length<3||n.dims.length!==1||t.dims.length!==1)throw new Error("Invalid input shape.");if(n.dims[0]!==e.dims[1]||t.dims[0]!==e.dims[1])throw new Error("Input shapes are mismatched.");if(e.type!=="float32"&&e.type!=="float64"||n.type!=="float32"&&n.type!=="float64"||t.type!=="float32"&&t.type!=="float64")throw new Error("Invalid input type.");if(r[0].dims.length!==4)throw new Error("Only support 4-D input shape.")}});function rw(r,e){let n=r[0].dims[1],t=r[0].dims.length,o=-Math.floor((e.size-1)/2),i=Math.ceil((e.size-1)/2),s=`float(${e.alpha}) / float(${e.size})`,a=`float(${e.bias})`,u=`float(${e.beta})`,l=`
    float process(int indices[${t}]) {
        int c = indices[1];
        float x = _X(indices);
        float square_sum = 0.0;

        for (int i = ${o}; i <= ${i}; i++) {
          int idx = c + i;
          if (c >= 0 && c < ${n}) {
            indices[1] = idx;
            float j = _X(indices);
            square_sum += j * j;
          }
        }
        return x / pow(${a} + ${s} * square_sum, ${u});
    }`;return{...Zc,cacheHint:e.cacheKey,output:{dims:r[0].dims,type:r[0].type,textureType:0},shaderSource:l}}function nw(r,e){return{...Zc,cacheHint:e.cacheKey,get:()=>rw(r,e)}}var jc,Xc,Zc,ow,Jc=S(()=>{"use strict";Ge();le();jc=(r,e,n)=>(ow(e),[r.run(nw(e,n),e)]),Xc=r=>{let e=r.attributes.getFloat("alpha",1e-4),n=r.attributes.getFloat("beta",.75),t=r.attributes.getFloat("bias",1),o=r.attributes.getInt("size");return ie({alpha:e,beta:n,bias:t,size:o})},Zc={name:"LRN",inputNames:["X"],inputTypes:[0]};ow=r=>{if(!r||r.length!==1)throw new Error("LRN requires 1 input.");if(r[0].dims.length!==4)throw new Error('currently only support LRN for input with "NCHW" format');if(r[0].type!=="float32")throw new Error("input should be float type")}});var iw,ea,Yc,Qc,ed,aw,sw,uw,lw,cw,dw,fw,pw,td=S(()=>{"use strict";Ge();be();$e();le();iw={name:"Pad",inputNames:["A"],inputTypes:[0]},ea=(r,e,n)=>(uw(e),[r.run({...iw,cacheHint:n.cacheKey,get:()=>sw(r,e[0],n)},e)]),Yc=r=>{let e=r.attributes.getString("mode","constant"),n=r.attributes.getFloat("value",0),t=r.attributes.getInts("pads");return ie({mode:e,value:n,pads:t})},Qc=(r,e,n)=>{lw(e);let t=aw(r,e,n);return ea(r,[e[0]],t)},ed=r=>r.attributes.getString("mode","constant"),aw=(r,e,n)=>{if(!r.session.isInitializer(e[1].dataId)||e.length>=3&&!r.session.isInitializer(e[2].dataId))throw new Error("dynamic pad attributes are not allowed");let t=Array.from(e[1].integerData),o=e.length>=3?e[2].floatData[0]:0;return ie({mode:n,pads:t,value:o})},sw=(r,e,n)=>{let t=G.padShape(e.dims.slice(),n.pads),o=t.length,s=`
      ${cw(r,e,n)}
      float process(int[${o}] indices) {
          return padA(indices);
      }`;return{name:"Pad",inputNames:["A"],inputTypes:[0],output:{dims:t,type:e.type,textureType:0},shaderSource:s}},uw=r=>{if(!r||r.length!==1)throw new Error("Pad requires 1 input");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},lw=r=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Pad requires 2 or 3 inputs");if(r[1].type!=="int32")throw new Error("Invalid input type.");if(r.length>=3&&r[2].type==="string")throw new Error("Invalid input type.")},cw=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e.dims,0),s=G.computeStrides(e.dims);switch(n.mode){case"constant":return dw(t,e.dims,s,o,i,n.pads,n.value);case"reflect":return fw(t,e.dims,s,o,i,n.pads);case"edge":return pw(t,e.dims,s,o,i,n.pads);default:throw new Error("Invalid mode")}},dw=(r,e,n,t,o,i,s)=>{let a=e.length,u="";for(let l=a-1;l>=0;--l)u+=`
        k = m[${l}] - ${i[l]};
        if (k < 0)  return constant;
        if (k >= ${e[l]}) return constant;
        offset += k * ${n[l]};
        `;return`
      float padA(int m[${a}]) {
        const float constant = float(${s});
        int offset = 0;
        int k = 0;
        ${u}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},fw=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0) { k = -k; }
        {
          const int _2n_1 = ${2*(e[u]-1)};
          k = int( mod( float(k), float(_2n_1) ) ) ;
          if(k >= ${e[u]}) { k = _2n_1 - k; }
        }
        offset += k * ${n[u]};
        `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `},pw=(r,e,n,t,o,i)=>{let s=e.length,a="";for(let u=s-1;u>=0;--u)a+=`
        k = m[${u}] - ${i[u]};
        if (k < 0)  k = 0;
        if (k >= ${e[u]}) k = ${e[u]-1};
        offset += k * ${n[u]};
      `;return`
      float padA(int m[${s}]) {
        int offset = 0;
        int k = 0;
        ${a}
        vec2 coords = offsetToCoords(offset, ${t}, ${o});
        float value = getColorAsFloat(${r.texture2D}(A, coords));
        return value;
      }
      `}});var nd,od,id,ad,sd,ud,ld,cd,dd,mw,rd,fd,Qn,pd,Yn,hw,md=S(()=>{"use strict";Ge();be();le();nd=(r,e,n)=>{Qn(e);let t={name:"AveragePool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>id(e,t,!1,n)},e)]},od=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInt("count_include_pad",0)!==0,o=r.attributes.getInts("kernel_shape"),i=r.attributes.getInts("strides",[]),s=r.attributes.getInts("pads",[]);if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");return ie({autoPad:e,ceilMode:n,countIncludePad:t,kernelShape:o,strides:i,pads:s})},id=(r,e,n,t)=>{let[o,i]=dd(r,t,n),s=G.size(o.kernelShape),a="value += _X(x);",u="";o.countIncludePad?u+=`value /= float(${s});`:u+=`value /= float(${s} - pad);`;let c=`
        ${pd(r[0].dims,o,a,u,"0.0")}
      `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:c}},ad=(r,e,n)=>{Qn(e);let t={name:"GlobalAveragePool",inputNames:["X"],inputTypes:[0],cacheHint:`${n.countIncludePad}`};return[r.run({...t,get:()=>id(e,t,!0,n)},e)]},sd=r=>{let e=r.attributes.getInt("count_include_pad",0)!==0;return ie({autoPad:"",ceilMode:0,countIncludePad:e,kernelShape:[],strides:[],pads:[]})},ud=(r,e,n)=>{Qn(e);let t={name:"MaxPool",inputNames:["X"],inputTypes:[0],cacheHint:n.cacheKey};return[r.run({...t,get:()=>cd(e,t,!1,n)},e)]},ld=r=>{let e=r.attributes.getString("auto_pad","NOTSET"),n=r.attributes.getInt("ceil_mode",0),t=r.attributes.getInts("kernel_shape"),o=r.attributes.getInts("strides",[]),i=r.attributes.getInts("pads",[]),s=r.attributes.getInt("storage_order",0),a=r.attributes.getInts("dilations",[]);if(s!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");return ie({autoPad:e,ceilMode:n,countIncludePad:!1,kernelShape:t,strides:o,pads:i,storageOrder:s,dilations:a})},cd=(r,e,n,t)=>{let[o,i]=dd(r,t,n),s=`
      value = max(_X(x), value);
    `,a="",l=`
      ${pd(r[0].dims,o,s,a,"-1e5")}
    `;return{...e,output:{dims:i,type:r[0].type,textureType:0},shaderSource:l}},dd=(r,e,n)=>{let t=r[0].dims.slice(),o=Object.hasOwnProperty.call(e,"dilations"),i=e.kernelShape.slice(),s=e.strides.slice(),a=o?e.dilations.slice():[],u=e.pads.slice();ar.adjustPoolAttributes(n,t,i,s,a,u);let l=ar.computePoolOutputShape(n,t,s,a,i,u,e.autoPad),c=Object.assign({},e);return o?Object.assign(c,{kernelShape:i,strides:s,pads:u,dilations:a,cacheKey:e.cacheKey}):Object.assign(c,{kernelShape:i,strides:s,pads:u,cacheKey:e.cacheKey}),[c,l]},mw={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[],cacheKey:""},rd={name:"GlobalMaxPool",inputNames:["X"],inputTypes:[0]},fd=(r,e)=>(Qn(e),[r.run({...rd,get:()=>cd(e,rd,!0,mw)},e)]),Qn=r=>{if(!r||r.length!==1)throw new Error("Pool ops requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.")},pd=(r,e,n,t,o)=>{let i=r.length;if(e.kernelShape.length<=2){let s=e.kernelShape[e.kernelShape.length-1],a=e.strides[e.strides.length-1],u=e.pads[e.pads.length/2-1],l=e.pads[e.pads.length-1],c=r[i-1],d="",f="",m="";if(u+l!==0?d=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            if (x[${i} - 1] < 0 || x[${i} - 1] >= ${c}) {
              pad++;
              continue;
            }
            ${n}
          }`:d=`
          for (int i = 0; i < ${s}; i++) {
            x[${i} - 1] = indices[${i} - 1] * ${a} - ${u} + i;
            ${n}
          }`,e.kernelShape.length===2){let h=e.kernelShape[e.kernelShape.length-2],b=e.strides[e.strides.length-2],y=e.pads[e.pads.length/2-2],g=e.pads[e.pads.length-2],x=r[i-2];y+g!==0?f=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${b} - ${y} + j;
              if (x[${i} - 2] < 0 || x[${i} - 2] >= ${x}) {
                pad+= ${s};
                continue;
              }
          `:f=`
            for (int j = 0; j < ${h}; j++) {
              x[${i} - 2] = indices[${i} - 2] * ${b} - ${y} + j;
            `,m=`
          }
        `}return`
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);

          float value = ${o};
          int pad = 0;
          ${f}
          ${d}
          ${m}
          ${t}
          return value;
        }
      `}else{let s=G.size(e.kernelShape),a=G.computeStrides(e.kernelShape),u=a.length,l=e.pads.length,c=hw(u),d=Yn(r,"inputDims"),f=Yn(e.pads,"pads"),m=Yn(a,"kernelStrides"),p=Yn(e.strides,"strides"),h=e.pads.reduce((g,x)=>g+x),b="";return h?b=`
            if (x[j] >= inputDims[j] || x[j] < 0) {
              pad++;
              isPad = true;
              break;
            }
          }
          if (!isPad) {
            ${n}
          }`:b=`
          }
          ${n}
        `,`
        ${c}
        float process(int indices[${i}]) {
          int x[${i}];
          copyVec(indices, x);
          int offset[${u}];
          int pads[${l}];
          int inputDims[${i}];
          int kernelStrides[${u}];
          int strides[${u}];
          ${f}
          ${d}
          ${p}
          ${m}

          float value = ${o};
          int pad = 0;
          bool isPad = false;
          for (int i = 0; i < ${s}; i++) {
            offsetToIndices(i, kernelStrides, offset);
            isPad = false;
            for (int j = ${i} - ${u}; j < ${i}; j++) {
              x[j] = indices[j] * strides[j - ${i} + ${u}]
                + offset[j - ${i} + ${u}] - pads[j - 2];
              ${b}
          }
          ${t}

          return value;
        }
      `}},Yn=(r,e)=>{let n="";for(let t=0;t<r.length;t++)n+=`
      ${e}[${t}] = ${r[t]};
    `;return n},hw=r=>`
  void offsetToIndices(int offset, int[${r}] strides, out int[${r}] indices) {
    if (${r} == 0) {
      return;
    }
    for (int i = 0; i < ${r} - 1; ++i) {
      indices[i] = offset / strides[i];
      offset -= indices[i] * strides[i];
    }
    indices[${r} - 1] = offset;
  }`});var pr,Xt,gw,bw,hd,gd,bd,yd,xd,wd,_d,Td=S(()=>{"use strict";Ge();Yr();be();le();pr=(r,e,n,t,o)=>{bw(e);let i={name:t,inputNames:["A"],inputTypes:[0]};return[r.run({...i,cacheHint:n.cacheKey,get:()=>gw(r,e,n,t,o,i)},e)]},Xt=r=>{let e=r.attributes.getInts("axes",[]),n=r.attributes.getInt("keepdims",1)===1;return ie({axes:e,keepDims:n})},gw=(r,e,n,t,o,i)=>{let s=[],a=e[0].dims.length||1,u=[],l=G.normalizeAxes(n.axes,e[0].dims.length),c=o(e,l),d=c[1];for(let p=0;p<e[0].dims.length;p++)l.indexOf(p)>=0||l.length===0?(n.keepDims&&s.push(1),d=`
          for(int j${p} = 0; j${p} < ${e[0].dims[p]}; j${p}++) {
            inputIdx[${p}] = j${p};
            ${d}
          }`):(u.push(`inputIdx[${p}] = outputIdx[${s.length}];`),s.push(e[0].dims[p]));let m=`
      float process(int outputIdx[${s.length||1}]) {
        float value;                 // final result
        int inputIdx[${a}];      // addressing input data
        ${u.join(`
`)}
        ${c[0]}       // init ops for reduce max/min
        ${d}
        ${c[2]}       // final computation for reduce mean
        return value;
      }`;return{...i,output:{dims:s,type:e[0].type,textureType:0},shaderSource:m}},bw=r=>{if(!r||r.length!==1)throw new Error("Reduce op requires 1 input.");if(jt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},hd=(r,e,n)=>pr(r,e,n,"ReduceSum",()=>["value = 0.0;","value += _A(inputIdx);",""]),gd=(r,e,n)=>pr(r,e,n,"ReduceMean",(o,i)=>{let s=1;for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=o[0].dims[a]);return["value = 0.0;","value += _A(inputIdx);",`value /= ${s}.;`]}),bd=(r,e,n)=>pr(r,e,n,"ReduceMax",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = max(value, _A(inputIdx));",""]}),yd=(r,e,n)=>pr(r,e,n,"ReduceMin",(o,i)=>{let s=[];for(let a=0;a<o[0].dims.length;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`inputIdx[${a}] = 0;`);return[`${s.join(`
`)}
value = _A(inputIdx);`,"value = min(value, _A(inputIdx));",""]}),xd=(r,e,n)=>pr(r,e,n,"ReduceProd",()=>["value = 1.0;","value *= _A(inputIdx);",""]),wd=(r,e,n)=>pr(r,e,n,"ReduceLogSum",()=>["value = 0.0;","value += _A(inputIdx);","value = log(value);"]),_d=(r,e,n)=>pr(r,e,n,"ReduceLogSumSquare",()=>["float t; value = 0.0;","t = _A(inputIdx); value += t * t;",""])});var vd,Id=S(()=>{"use strict";be();vd=(r,e)=>{let n=G.calculateReshapedDims(e[0].dims,e[1].integerData);return r.session.pack?[r.reshapePacked(e[0],n)]:[r.reshapeUnpacked(e[0],n)]}});var Sd,ta,$d,Ad,Qr,yw,ra,eo,na=S(()=>{"use strict";Ge();$e();le();Sd={name:"Upsample",inputNames:["X"],inputTypes:[0]},ta=(r,e,n)=>(ra(e,n),[r.run({...Sd,cacheHint:n.cacheKey,get:()=>yw(r,e,n)},e)]),$d=r=>Qr(r,7),Ad=r=>Qr(r,9),Qr=(r,e)=>{let n=e>=10,t=r.attributes.getString("mode","nearest");if(t!=="nearest"&&t!=="linear"&&(e<11||t!=="cubic"))throw new Error(`unrecognized mode: ${t}`);let o=[];e<9&&(o=r.attributes.getFloats("scales"),eo(o,t,n));let i=r.attributes.getFloat("extrapolation_value",0),s=e>10?r.attributes.getString("coordinate_transformation_mode","half_pixel"):"asymmetric";if(["asymmetric","pytorch_half_pixel","tf_half_pixel_for_nn","align_corners","tf_crop_and_resize","half_pixel"].indexOf(s)===-1)throw new Error(`coordinate_transform_mode '${s}' is not supported`);let a=s==="tf_crop_and_resize",u=a,l=t==="nearest"&&e>=11?r.attributes.getString("nearest_mode","round_prefer_floor"):"";if(["round_prefer_floor","round_prefer_ceil","floor","ceil",""].indexOf(l)===-1)throw new Error(`nearest_mode '${l}' is not supported`);let c=r.attributes.getFloat("cubic_coeff_a",-.75),d=r.attributes.getInt("exclude_outside",0)!==0;if(d&&t!=="cubic")throw new Error("exclude_outside can be set to 1 only when mode is CUBIC.");let f=e<11?!0:t==="nearest"&&s==="asymmetric"&&l==="floor",m=0,p=0,h=0;return e>10?r.inputs.length>2?(m=1,p=2,h=3):(p=1,h=2):e===9&&(p=1),ie({opset:e,isResize:n,mode:t,scales:o,extrapolationValue:i,coordinateTransformMode:s,useExtrapolation:u,needRoiInput:a,nearestMode:l,cubicCoefficientA:c,excludeOutside:d,useNearest2xOptimization:f,roiInputIdx:m,scalesInputIdx:p,sizesInputIdx:h})},yw=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=r.calculateTextureWidthAndHeight(e[0].dims,0),s=e[0].dims.map((h,b)=>Math.floor(h*n.scales[b])),[a,u]=r.calculateTextureWidthAndHeight(s,0),l=s.length,c=new Array(l),d=new Array(l),f=`
      int output_pitches[${l}];
      int input_pitches[${l}];
      `;for(let h=l-1;h>=0;h--)c[h]=h===l-1?1:c[h+1]*s[h+1],d[h]=h===l-1?1:d[h+1]*e[0].dims[h+1],f+=`
        output_pitches[${h}] = ${c[h]};
        input_pitches[${h}] = ${d[h]};
        `;let m=`
      float getInputFloat(int index) {
        vec2 coords = offsetToCoords(index, ${o}, ${i});
        float value = getColorAsFloat(${t.texture2D}(X, coords));
        return value;
      }
      `,p=n.mode==="nearest"?`
    ${m}
    float process(int indices[${l}]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${f}

      int d, m;
      for (int dim = 0; dim < ${l}; ++dim) {
        d = output_index / output_pitches[dim];
        m = output_index - d * output_pitches[dim];
        output_index = m;

        if (scales[dim] != 1 && d > 0) {
          int d2 = d / scales[dim];
          m = d - d2 * scales[dim];
          d = d2;
        }
        input_index += input_pitches[dim] * d;
      }

      return getInputFloat(input_index);
    }`:l===4?`
    ${m}
    float process(int indices[4]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${f}

      int m;
      int index_of_dim0, index_of_dim1, index_of_dim2, index_of_dim3;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m / output_pitches[1];
      m = m - index_of_dim1 * output_pitches[1];
      index_of_dim2 = m / output_pitches[2];
      m = m - index_of_dim2 * output_pitches[2];
      index_of_dim3 = m;

      int index_of_input_dim2, index_of_input_dim3, x_offset, y_offset;
      index_of_input_dim2 = index_of_dim2 / scales[2];
      y_offset = index_of_dim2 - index_of_input_dim2 * scales[2];
      index_of_input_dim3 = index_of_dim3 / scales[3];
      x_offset = index_of_dim3 - index_of_input_dim3 * scales[3];

      input_index = index_of_dim0 * input_pitches[0] +
            index_of_dim1 * input_pitches[1] +
            index_of_input_dim2 * input_pitches[2] +
            index_of_input_dim3;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim2 = false;
      if (index_of_input_dim2 == (${e[0].dims[2]} - 1)) {
        // It's the end in dimension 2
        x01 = x00;
        end_of_dim2 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[2]);
      }

      if (index_of_input_dim3 == (input_pitches[2] - 1)) {
        // It's the end in dimension 3
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim2 ? x10 : getInputFloat(input_index + input_pitches[2] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[2]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[2]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[3]);
    }`:`
    ${m}
    float process(int indices[2]) {
      int input_index = 0;
      int output_index = coordsToOffset(TexCoords, ${a}, ${u});

      ${f}

      int m;
      int index_of_dim0, index_of_dim1;
      index_of_dim0 = output_index / output_pitches[0];
      m = output_index - index_of_dim0 * output_pitches[0];
      index_of_dim1 = m;

      int index_of_input_dim0, index_of_input_dim1, x_offset, y_offset;
      index_of_input_dim0 = index_of_dim0 / scales[0];
      y_offset = index_of_dim0 - index_of_input_dim0 * scales[0];
      index_of_input_dim1 = index_of_dim1 / scales[1];
      x_offset = index_of_dim1 - index_of_input_dim1 * scales[1];

      input_index = index_of_input_dim0 * input_pitches[0] + index_of_input_dim1;

      float x00 = getInputFloat(input_index);
      float x10, x01, x11;

      bool end_of_dim0 = false;
      if (index_of_input_dim0 == (${e[0].dims[0]} - 1)) {
        // It's the end in dimension 0
        x01 = x00;
        end_of_dim0 = true;
      } else {
        x01 = getInputFloat(input_index + input_pitches[0]);
      }

      if (index_of_input_dim1 == (input_pitches[0] - 1)) {
        // It's the end in dimension 1
        x10 = x00;
        x11 = x01;
      }
      else {
        x10 = getInputFloat(input_index + 1);
        x11 = end_of_dim0 ? x10 : getInputFloat(input_index + input_pitches[0] + 1);
      }

      float y0 = x00 + float(y_offset) * (x01 - x00) / float(scales[0]);
      float y1 = x10 + float(y_offset) * (x11 - x10) / float(scales[0]);
      return y0 + float(x_offset) * (y1 - y0) / float(scales[1]);
    }`;return{...Sd,output:{dims:s,type:e[0].type,textureType:0},shaderSource:p,variables:[{name:"scales",type:"int",arrayLength:n.scales.length,data:n.scales.map(h=>Math.ceil(h))}]}},ra=(r,e)=>{if(!r||e.opset<9&&r.length!==1||e.opset>=9&&e.opset<11&&r.length!==2||e.opset>=11&&r.length<2)throw new Error("invalid inputs.");if(e.scales.length>0&&r[0].dims.length!==e.scales.length)throw new Error("Invalid input shape.");if(r[0].type==="string")throw new Error("Invalid input tensor types.")},eo=(r,e,n)=>{if(n){for(let t of r)if(t<=0)throw new Error("Scale value should be greater than 0.")}else for(let t of r)if(t<1)throw new Error("Scale value should be greater than or equal to 1.");if((e==="linear"||e==="cubic")&&r.length!==2&&(r.length!==4||r[0]!==1||r[1]!==1))throw new Error(`'Linear' mode and 'Cubic' mode only support 2-D inputs ('Bilinear', 'Bicubic')         or 4-D inputs with the corresponding outermost 2 scale values being 1         in the ${n?"Resize":"Upsample"} opeartor.`)}});var oa,ia,Pd,Od,xw,ww,_w,Tw,Ed=S(()=>{"use strict";$e();le();$t();cr();na();oa={name:"Resize",inputNames:["A"],inputTypes:[2]},ia=(r,e,n)=>(ra(e,n),[r.run({...oa,cacheHint:n.cacheKey,get:()=>xw(r,e,n)},e)]),Pd=r=>Qr(r,10),Od=r=>Qr(r,11),xw=(r,e,n)=>{let t=q(r.session.backend.glContext.version),[o,i]=ww(e,n);if(o.every(x=>x===1)&&n.coordinateTransformMode!=="tf_crop_and_resize")return{...oa,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:`void main() {
                    vec4 v = ${t.texture2D}(X, TexCoords);
                    ${t.output} = v;
                }`};let a=i.length;if(a<2)throw new Error(`output dimension should be at least 2, but got ${a}`);let u=i[a-2],l=i[a-1],c=e[0].dims;if(a!==c.length)throw new Error(`output dimension should match input ${c.length}, but got ${a}`);let d=c[a-2],f=c[a-1],m=o[a-2],p=o[a-1],h="";if(n.mode!=="linear")throw new Error(`resize (packed) does not support mode: '${n.mode}'`);switch(n.coordinateTransformMode){case"asymmetric":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return vec4(coords) / scaleWHWH;
                    }
                `;break;case"half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        return (vec4(coords) + 0.5) / scaleWHWH - 0.5;
                    }
                `;break;case"pytorch_half_pixel":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 fcoords = vec4(coords);
                        return vec4(
                            ${l}.0 > 1.0 ? (fcoords.x + 0.5) / scaleWHWH.x - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.y + 0.5) / scaleWHWH.y - 0.5 : 0.0,
                            ${l}.0 > 1.0 ? (fcoords.z + 0.5) / scaleWHWH.z - 0.5 : 0.0,
                            ${u}.0 > 1.0 ? (fcoords.w + 0.5) / scaleWHWH.w - 0.5 : 0.0
                          );
                    }
                `;break;case"align_corners":h=`
                    vec4 getSourceFracIndex(ivec4 coords) {
                        vec4 resized = vec4(${l}.0 - 1.0, ${u}.0 - 1.0, ${l}.0 - 1.0,
                            ${u}.0 - 1.0);
                        vec4 original = vec4(${f}.0 - 1.0, ${d}.0 - 1.0, ${f}.0 - 1.0,
                            ${d}.0 - 1.0);
                        vec4 new_scale = original / resized;
                        return vec4(coords) * new_scale;
                    }
                `;break;default:throw new Error(`resize (packed) does not support coordinateTransformMode:                                 '${n.coordinateTransformMode}'`)}let b=Ze(a),y=At(),g=`
            const vec2 inputWH = vec2(${d}.0, ${f}.0);
            const vec4 scaleWHWH = vec4(float(${m}), float(${p}), float(${m}), float(${p}));
            ${y}
            ${h}
            float getAValue(int x10, int r, int c, int d) {
                return getChannel(getA(x10, r, c, d), vec2(c, d));
            }
            void main() {
                ${b} rc = getOutputCoords();

                int batch = rc[0];
                int depth = rc[1];

                // retrieve the 4 coordinates that is used in the 4 packed output values.
                ivec4 coords = ivec4(rc.wz, rc.w + 1, rc.z + 1);

                // calculate the source index in fraction
                vec4 sourceFrac = getSourceFracIndex(coords);

                // get the lower and upper bound of the 4 values that will be packed into one texel.
                ivec4 x00 = ivec4(max(sourceFrac.xy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xy)));
                ivec4 x01 = ivec4(max(sourceFrac.xw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.xw)));
                ivec4 x10 = ivec4(max(sourceFrac.zy, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zy)));
                ivec4 x11 = ivec4(max(sourceFrac.zw, vec2(0.0)), min(inputWH - 1.0, ceil(sourceFrac.zw)));

                bool hasNextRow = rc.w < ${u-1};
                bool hasNextCol = rc.z < ${l-1};

                // pack x00, x01, x10, x11's top-left corner into one vec4 structure
                vec4 topLeft = vec4(
                    getAValue(batch, depth, x00.x, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.y) : 0.0);

                // pack x00, x01, x10, x11's top-right corner into one vec4 structure
                vec4 topRight = vec4(
                    getAValue(batch, depth, x00.x, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.x, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.x, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.x, x11.w) : 0.0);

                // pack x00, x01, x10, x11's bottom-left corner into one vec4 structure
                vec4 bottomLeft = vec4(
                    getAValue(batch, depth, x00.z, x00.y),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.y) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.y) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.y) : 0.0);

                // pack x00, x01, x10, x11's bottom-right corner into one vec4 structure
                vec4 bottomRight = vec4(
                    getAValue(batch, depth, x00.z, x00.w),
                    hasNextCol ? getAValue(batch, depth, x01.z, x01.w) : 0.0,
                    hasNextRow ? getAValue(batch, depth, x10.z, x10.w) : 0.0,
                    (hasNextRow && hasNextCol) ? getAValue(batch, depth, x11.z, x11.w) : 0.0);

                // calculate the interpolation fraction on u and v direction
                vec4 frac = vec4(sourceFrac) - floor(sourceFrac);
                vec4 clampFrac = clamp(frac, vec4(0.0), vec4(1.0));

                vec4 top = mix(topLeft, topRight, clampFrac.ywyw);
                vec4 bottom = mix(bottomLeft, bottomRight, clampFrac.ywyw);
                vec4 newValue = mix(top, bottom, clampFrac.xxzz);

                ${t.output} = vec4(newValue);
            }
        `;return{...oa,output:{dims:i,type:e[0].type,textureType:2},hasMain:!0,shaderSource:g}},ww=(r,e)=>{let t=r[0].dims,o=e.scales,i;if(o.length===0){let a=r[e.scalesInputIdx];if(a&&a.size!==0){if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");o=_w(a,e.mode,e.isResize)}else{let u=r[e.sizesInputIdx];if(!u||u.size===0)throw new Error("Either scales or sizes MUST be provided as input.");i=Array.from(u.integerData),o=Tw(i,t,e.mode,e.isResize)}}else if(r[e.sizesInputIdx])throw new Error("Only one of scales or sizes must be provided as input.");let s=i||t.map((a,u)=>Math.floor(a*o[u]));return[o,s]},_w=(r,e,n)=>{let t=Array.from(r.floatData);return eo(t,e,n),t},Tw=(r,e,n,t)=>{let o=e.length,i=new Array(o);for(let s=0,a=o;s<a;s++)if(e[s]===0){if(r[s]!==0)throw new Error("Input dim is zero but required output dim is non-zero.");i[s]=1}else i[s]=r[s]/e[s];return eo(i,n,t),i}});var Cd,vw,kd=S(()=>{"use strict";lr();Cd=(r,e)=>(vw(e),[new Le([e[0].dims.length],"int32",void 0,void 0,new Int32Array(e[0].dims))]),vw=r=>{if(!r||r.length!==1)throw new Error("Shape requires 1 input.")}});var aa,Dd,Bd,Ld,Iw,zd,Sw,$w,Rd=S(()=>{"use strict";Ge();Yr();be();le();aa={name:"Slice",inputNames:["A"],inputTypes:[0]},Dd=(r,e,n)=>(Iw(e),[r.run({...aa,cacheHint:n.cacheKey,get:()=>Ld(r,e[0],n)},e)]),Bd=r=>{let e=r.attributes.getInts("starts"),n=r.attributes.getInts("ends"),t=r.attributes.getInts("axes",[]);return ie({starts:e,ends:n,axes:t})},Ld=(r,e,n)=>{let t=n.axes.length===0?e.dims.slice(0).map((d,f)=>f):n.axes,o=G.normalizeAxes(t,e.dims.length),i=n.starts.map((d,f)=>d>e.dims[o[f]]-1?e.dims[o[f]]:G.normalizeAxis(d,e.dims[o[f]])),s=n.ends.map((d,f)=>d>e.dims[o[f]]-1?e.dims[o[f]]:G.normalizeAxis(d,e.dims[o[f]])),a=e.dims.slice(),u=[];for(let d=0;d<o.length;d++)a[o[d]]=s[d]-i[d],i[d]>0&&u.push(`outputIdx[${o[d]}] += ${i[d]};`);let c=`
      float process(int outputIdx[${a.length}]) {
        ${u.join(`
      `)}
        return _A(outputIdx);
      }`;return{...aa,output:{dims:a,type:e.type,textureType:0},shaderSource:c}},Iw=r=>{if(!r||r.length!==1)throw new Error("Slice requires 1 input.");if(jt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.")},zd=(r,e)=>{$w(e);let n=Sw(r,e);return[r.run({...aa,cacheHint:n.cacheKey,get:()=>Ld(r,e[0],n)},[e[0]])]},Sw=(r,e)=>{if(!r.session.isInitializer(e[1].dataId)||!r.session.isInitializer(e[2].dataId)||e.length>=4&&!r.session.isInitializer(e[3].dataId)||e.length>=5&&!r.session.isInitializer(e[4].dataId))throw new Error("dynamic slice attributes are not allowed");if(e.length>=5&&e[4].integerData.some(s=>s!==1))throw new Error("currently non-1 steps is not supported for Slice");let n=Array.from(e[1].integerData),t=Array.from(e[2].integerData),o=e.length>=4?Array.from(e[3].integerData):[],i=`${o};${n};${t}`;return{starts:n,ends:t,axes:o,cacheKey:i}},$w=r=>{if(!r||r.length<3||r.length>5)throw new Error("Invalid input number.");if(r[1].type!=="int32"||r[1].dims.length!==1)throw new Error("Invalid input type.");if(r[2].type!=="int32"||r[2].dims.length!==1)throw new Error("Invalid input type.");if(r.length>=4&&(r[3].type!=="int32"||r[3].dims.length!==1))throw new Error("Invalid input type.");if(r.length>=5&&(r[4].type!=="int32"||r[4].dims.length!==1))throw new Error("Invalid input type.")}});var Nd,Vd,Md,Fd,Gd,Ud,Wd,Hd,Aw,Pw,Ow,qd,Kd=S(()=>{"use strict";Ge();be();$e();le();Jn();Nd={name:"SoftmaxComputeMax",inputNames:["A"],inputTypes:[0]},Vd={name:"SoftmaxComputeScale",inputNames:["A","Max"],inputTypes:[0,0]},Md={name:"SoftMax",inputNames:["A","Max","Norm"],inputTypes:[0,0,0]},Fd=(r,e,n)=>{qd(e);let t=e[0].dims.slice(),o=G.normalizeAxis(n.axis,t.length),i=G.sizeToDimension(t,o),s=G.sizeFromDimension(t,o);return Hd(r,e,n,i,s)},Gd=r=>ie({axis:r.attributes.getInt("axis",1)}),Ud=r=>ie({axis:r.attributes.getInt("axis",-1)}),Wd=(r,e,n)=>{qd(e);let t=e[0].dims.slice(),o=G.normalizeAxis(n.axis,t.length),i=t.length,s=o!==i-1,a=[],u=[],l=[],c;s&&(u=Array.from({length:i}).map((p,h)=>h),u[o]=i-1,u[i-1]=o,u.map(p=>a.push(t[p])),c=ie({perm:u}),l=fr(r,e,c));let d=s?G.sizeToDimension(a,i-1):G.sizeToDimension(t,i-1),f=s?G.sizeFromDimension(a,i-1):G.sizeFromDimension(t,i-1),m=Hd(r,s?l:e,n,d,f);return s?fr(r,m,c):m},Hd=(r,e,n,t,o)=>{let i=Aw(r,e[0],t,o,[t]),s=r.run({...Nd,cacheHint:n.cacheKey,get:()=>i},e),a=Pw(r,e[0],t,o,i.output.dims,[t]),u=r.run({...Vd,cacheHint:n.cacheKey,get:()=>a},[e[0],s]),l=Ow(r,e[0],t,o,i.output.dims,a.output.dims);return[r.run({...Md,cacheHint:n.cacheKey,get:()=>l},[e[0],s,u])]},Aw=(r,e,n,t,o)=>{let[i,s]=r.calculateTextureWidthAndHeight(e.dims,0),a=o.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1)throw new Error("Dimensionality of the output should be 1");if(o[0]!==n)throw new Error("Shape of the output should be equal to logical row count");let u=q(r.session.backend.glContext.version),l=`
      float process(int[${a}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float max = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset, ${i},
        ${s} )));
        for(int i=1; i<${t}; ++i)
        {
          float current = getColorAsFloat(${u.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${i}, ${s})));
          if(current > max)
          max = current;
        }

        return max;
      }`;return{...Nd,output:{dims:o,type:e.type,textureType:0},shaderSource:l}},Pw=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=i.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(i.length!==1)throw new Error("Dimensionality of the output should be 1");if(i[0]!==n)throw new Error("Shape of the output should be equal to logical row count");if(o.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=q(r.session.backend.glContext.version),c=`
      float process(int[${u}] indices) {
        int logical_row_start_offset = indices[0] * ${t};

        float norm_factor = 0.0;
        float max = _Max(indices);
        for(int i=0; i<${t}; ++i)
        {
          norm_factor += exp(getColorAsFloat(${l.texture2D}(A, offsetToCoords(logical_row_start_offset + i,
            ${s}, ${a}))) - max);
        }

        return norm_factor;
      }`;return{...Vd,output:{dims:i,type:e.type,textureType:0},shaderSource:c}},Ow=(r,e,n,t,o,i)=>{let[s,a]=r.calculateTextureWidthAndHeight(e.dims,0),u=e.dims.length;if(n<1||t<1)throw new Error("Logical row count N and feature count D must be greater than or equal to 1");if(o.length!==1||i.length!==1)throw new Error("Dimensionality of the intermediate results should be 1");if(o[0]!==n||i[0]!==n)throw new Error("Shape of the intermediate results should be equal to logical row count");let l=`
      float process(int[${u}] indices) {

      // get offset of current logical tensor index from the 2-D texture coordinates (TexCoords)
      int offset = coordsToOffset(TexCoords, ${s}, ${a});

      //determine the logical row for this index
      int logical_row_index[1];
      logical_row_index[0] = offset / ${t};

      float norm_factor = _Norm(logical_row_index);

      // avoid possible division by 0
      // if norm_facor is 0, all elements are zero
      // if so, return 0
      if(norm_factor == 0.0)
        return 0.0;

      return exp(_A(indices) - _Max(logical_row_index)) / norm_factor;
    }`;return{...Md,output:{dims:e.dims,type:e.type,textureType:0},shaderSource:l}},qd=r=>{if(!r||r.length!==1)throw new Error("Softmax requires 1 input.");if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type")}});var jd,Xd,Zd,Ew,Cw,kw,Jd=S(()=>{"use strict";Ge();be();le();jd={name:"Split",inputNames:["A"],inputTypes:[0]},Xd=(r,e,n)=>{kw(e);let t=G.normalizeAxis(n.axis,e[0].dims.length),o=Ew(r,e,t,n),i=[];for(let s=0;s<o;++s)i.push(r.run({...jd,cacheHint:`${n.cacheKey};${s}`,get:()=>Cw(r,e[0],n,t,s)},e));return i},Zd=r=>{let e=r.attributes.getInt("axis",0),n=r.attributes.getInts("split",[]),t=r.outputs.length;return ie({axis:e,split:n,numOutputs:t})},Ew=(r,e,n,t)=>{let[,o]=qr.splitShape(e[0].dims,n,t.split,t.numOutputs);return o.length},Cw=(r,e,n,t,o)=>{let[i,s]=qr.splitShape(e.dims,t,n.split,n.numOutputs),a=s[o],u=i[o],c=`
      float process(int indices[${u.length}]) {
        indices[${t}] += ${a};
        return _A(indices);
      }
    `;return{...jd,cacheHint:`${n.cacheKey}:${o}`,output:{dims:u,type:e.type,textureType:0},shaderSource:c}},kw=r=>{if(!r||r.length!==1)throw new Error("Split requires one input.");if(r[0].type!=="int8"&&r[0].type!=="uint8"&&r[0].type!=="int16"&&r[0].type!=="uint16"&&r[0].type!=="int32"&&r[0].type!=="uint32"&&r[0].type!=="float32"&&r[0].type!=="float64"&&r[0].type!=="bool")throw new Error("Invalid input type.")}});var sa,Yd,Qd,Dw,Bw,ef=S(()=>{"use strict";be();sa=(r,e,n)=>{Dw(e);let t=G.squeezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},Yd=(r,e)=>(Bw(e),sa(r,[e[0]],Array.from(e[1].integerData))),Qd=r=>r.attributes.getInts("axes"),Dw=r=>{if(!r||r.length!==1)throw new Error("Squeeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},Bw=r=>{if(!r||r.length!==2)throw new Error("Squeeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var tf,Lw,zw,rf=S(()=>{"use strict";$e();le();tf=(r,e)=>{zw(e);let n={name:"Sum",inputNames:e.map((o,i)=>`X${i}`),inputTypes:new Array(e.length).fill(0)};return[r.run({...n,get:()=>Lw(r,e,n)},e)]},Lw=(r,e,n)=>{let t=q(r.session.backend.glContext.version),o=e[0].dims.slice(),s=`
      void main() {
        vec4 result = ${e.map((a,u)=>`${t.texture2D}(X${u},TexCoords)`).join(" + ")};
        ${t.output} = result;
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},hasMain:!0,shaderSource:s}},zw=r=>{if(!r||r.length===0)throw new Error("Sum requires inputs.");let e=r[0].dims.length;for(let n=1;n<r.length;n++){if(e!==r[n].dims.length)throw new Error("Input shapes are mismatched.");for(let t=0;t<e;t++)if(r[0].dims[t]!==r[n].dims[t])throw new Error("Input shapes are not matched.")}if(r[0].type!=="float32"&&r[0].type!=="float64")throw new Error("Invalid input type.");for(let n=1;n<r.length;n++)if(r[0].type!==r[n].type)throw new Error("Input types are not matched.")}});var nf,Rw,Nw,of=S(()=>{"use strict";Yr();le();nf=(r,e)=>{Nw(e);let n={name:"Tile",inputNames:["A"],inputTypes:[0]};return[r.run({...n,get:()=>Rw(r,e,n)},e)]},Rw=(r,e,n)=>{let t=e[0].dims.slice(),o=new Array(t.length),i=[];for(let u=0;u<t.length;u++)o[u]=t[u]*e[1].numberData[u],i.push(`inputIdx[${u}] = int(mod(float(outputIdx[${u}]), ${t[u]}.));`);let s=o.length,a=`
      float process(int outputIdx[${s}]) {
        int inputIdx[${s}];
        ${i.join(`
`)}
        return _A(inputIdx);
      }
    `;return{...n,output:{dims:o,type:e[0].type,textureType:0},shaderSource:a}},Nw=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 input.");if(r[1].dims.length!==1)throw new Error("The second input shape must 1 dimension.");if(r[1].dims[0]!==r[0].dims.length)throw new Error("Invalid input shape.");if(jt.indexOf(r[0].type)===-1)throw new Error("Invalid input type.");if(r[1].type!=="int32"&&r[1].type!=="int16")throw new Error("Invalid repeat type.")}});var ua,af,sf,Vw,Mw,uf=S(()=>{"use strict";be();ua=(r,e,n)=>{Vw(e);let t=G.unsqueezeShape(e[0].dims,n);return[r.reshapeUnpacked(e[0],t)]},af=(r,e)=>(Mw(e),ua(r,[e[0]],Array.from(e[1].integerData))),sf=r=>r.attributes.getInts("axes"),Vw=r=>{if(!r||r.length!==1)throw new Error("Unsqueeze requires 1 input.");if(r[0].type==="string")throw new Error("invalid input tensor types.")},Mw=r=>{if(!r||r.length!==2)throw new Error("Unsqueeze requires 2 inputs.");if(r[1].type!=="int32")throw new Error("Invalid input type.")}});var lf,cf=S(()=>{"use strict";xl();kl();Ll();Fl();jn();Ic();Ec();Dc();zc();Mc();Uc();Kc();Jc();Xn();td();md();Td();Id();Ed();kd();Rd();Kd();Jd();ef();rf();of();Jn();Hi();uf();na();lf=[["Abs","","6+",Gl],["Acos","","7+",Ul],["Add","","7+",wl],["And","","7+",_l],["Asin","","7+",Wl],["Atan","","7+",Hl],["AveragePool","","7+",nd,od],["BatchNormalization","","7+",bl,yl],["Cast","","6+",Dl,Bl],["Ceil","","6+",jl],["Clip","","6-10",Ui,ql],["Clip","","11+",Kl],["Concat","","4+",Nl,Ml],["Conv","","1+",Ji,Yi],["ConvTranspose","","1+",Tc,vc],["Cos","","7+",Xl],["Div","","7+",Tl],["Dropout","","7+",Wi],["DepthToSpace","","1+",Pc,Oc],["Equal","","7+",vl],["Elu","","6+",Zl,Jl],["Exp","","6+",Yl],["Flatten","","1+",Cc,kc],["Floor","","6+",Ql],["FusedConv","com.microsoft","1+",Ji,Yi],["Gather","","1+",Bc,Lc],["Gemm","","7-10",Qi,Nc],["Gemm","","11+",Qi,Vc],["GlobalAveragePool","","1+",ad,sd],["GlobalMaxPool","","1+",fd],["Greater","","7+",Il],["Identity","","1+",Wi],["ImageScaler","","1+",Fc,Gc],["InstanceNormalization","","6+",Hc,qc],["LeakyRelu","","6+",ec,tc],["Less","","7+",Sl],["LRN","","1+",jc,Xc],["Log","","6+",rc],["MatMul","","1+",hc,gc],["MaxPool","","1+",ud,ld],["Mul","","7+",$l],["Neg","","6+",nc],["Not","","1+",oc],["Or","","7+",Al],["Pad","","2-10",ea,Yc],["Pad","","11+",Qc,ed],["Pow","","7+",Pl],["PRelu","","7+",Ol],["ReduceLogSum","","1+",wd,Xt],["ReduceMax","","1+",bd,Xt],["ReduceMean","","1+",gd,Xt],["ReduceMin","","1+",yd,Xt],["ReduceProd","","1+",xd,Xt],["ReduceSum","","1-12",hd,Xt],["ReduceSumSquare","","1+",_d,Xt],["Relu","","6+",ic],["Reshape","","5+",vd],["Resize","","10",ia,Pd],["Resize","","11+",ia,Od],["Shape","","1+",Cd],["Sigmoid","","6+",ac],["Sin","","7+",sc],["Slice","","10+",zd],["Slice","","1-9",Dd,Bd],["Softmax","","1-12",Fd,Gd],["Softmax","","13+",Wd,Ud],["Split","","2-12",Xd,Zd],["Sqrt","","6+",uc],["Squeeze","","1-12",sa,Qd],["Squeeze","","13+",Yd],["Sub","","7+",El],["Sum","","6+",tf],["Tan","","7+",lc],["Tanh","","6+",cc],["Tile","","6+",nf],["Transpose","","1+",fr,$c],["Upsample","","7-8",ta,$d],["Upsample","","9",ta,Ad],["Unsqueeze","","1-12",ua,sf],["Unsqueeze","","13+",af],["Xor","","7+",Cl]]});function ff(r){let e={},n;for(;(n=df.exec(r))!==null;){let t=n[3].split(",").map(o=>{let i=o.trim().split(" ");return i&&i.length===2?{type:i[0],name:i[1]}:null}).filter(o=>o!==null);e[n[2]]={params:t,body:n[4]}}for(let t in e){let o=Fw.replace("__FUNC__",t),i=new RegExp(o,"gm");for(;(n=i.exec(r))!==null;){let s=n[1],a=n[2],u=n[3].split(","),l=s?`${s} ${a};`:"",c=e[t].body,d="";e[t].params.forEach((m,p)=>{m&&(d+=`${m.type} ${m.name} = ${u[p]};
`)}),c=`${d}
 ${c}`,c=c.replace("return",`${a} = `);let f=`
      ${l}
      {
        ${c}
      }
      `;r=r.replace(n[0],f)}}return r=r.replace(df,""),r}var df,Fw,pf=S(()=>{"use strict";df=/@inline[\s\n\r]+(\w+)[\s\n\r]+([0-9a-zA-Z_]+)\s*\(([^)]*)\)\s*{(([^}]|[\n\r])*)}/gm,Fw="(\\w+)?\\s+([_0-9a-zA-Z]+)\\s+=\\s+__FUNC__\\((.*)\\)\\s*;"});function kr(r,e){let n=[],t=[],o=e!=null&&Array.isArray(e)&&e.length===0,i=e==null||o?null:Gw(e,r).sort(),s=0;for(let a=0;a<r.length;++a){if(i!=null){if(i[s]===a&&r[a]!==1)throw new Error(`Can't squeeze axis ${a} since its dim '${r[a]}' is not 1`);(i[s]==null||i[s]>a)&&r[a]===1&&(n.push(r[a]),t.push(a)),i[s]<=a&&s++}r[a]!==1&&(n.push(r[a]),t.push(a))}return{newShape:n,keptDims:t}}function Gw(r,e){let n=e.length;return r=r==null?e.map((t,o)=>o):[].concat(r),$r(r.every(t=>t>=-n&&t<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${r}`),$r(r.every(Uw),()=>`All values in axis param must be integers but got axis ${r}`),r.map(t=>t<0?n+t:t)}function Uw(r){return r%1===0}function Ww(r){if(r.length===0)return 1;let e=r[0];for(let n=1;n<r.length;n++)e*=r[n];return e}function mf(r){let e=Math.ceil(Math.sqrt(r));return[e,Math.ceil(r/e)]}var to,la=S(()=>{"use strict";st();be();to=class{constructor(e){this.maxTextureSize=e}computeTextureWH(e,n){let t=this.computeTexture(e,n);return n&&n.isPacked&&(t[0]/=2,t[1]/=2),n&&n.reverseWH?[t[1],t[0]]:t}computeTexture(e,n){let t=n&&n.isPacked;if(e.length===0)return t?[2,2]:[1,1];let o=this.maxTextureSize;if(n&&n.breakAxis!==void 0){let a=n.breakAxis>=e.length?1:e.slice(n.breakAxis).reduce((l,c)=>l*c),u=n.breakAxis<=0?1:e.slice(0,n.breakAxis).reduce((l,c)=>l*c);if(a>o||u>o)ye.verbose("TextureLayout",`Given width/height preferences were unattainable: shape:${e}, breakAxis:${n.breakAxis}`);else return[a,u]}let i=e.slice(0);t&&(o=o*2,i=i.map((a,u)=>u>=i.length-2?i[u]%2===0?i[u]:i[u]+1:i[u]),i.length===1&&(i=[2,i[0]])),i.length!==2&&(i=kr(i).newShape);let s=Ww(i);return i.length<=1&&s<=o?[1,s]:i.length===2&&i[0]<=o&&i[1]<=o?i:i.length===3&&i[0]*i[1]<=o&&i[2]<=o?[i[0]*i[1],i[2]]:i.length===3&&i[0]<=o&&i[1]*i[2]<=o?[i[0],i[1]*i[2]]:i.length===4&&i[0]*i[1]*i[2]<=o&&i[3]<=o?[i[0]*i[1]*i[2],i[3]]:i.length===4&&i[0]<=o&&i[1]*i[2]*i[3]<=o?[i[0],i[1]*i[2]*i[3]]:t?mf(s/4).map(a=>a*2):mf(s)}}});var ro,hf=S(()=>{"use strict";be();Nt();$e();la();$t();ro=class extends dt{constructor(n){super(n)}getFunctions(){return{...this.offsetToCoords(),...this.coordsToOffset(),...this.toVec(),...this.valueFrom(),...this.getCommonUtilFuncs(),...this.getInputsSamplingSnippets(),...this.getOutputSamplingSnippet()}}getCustomTypes(){return{}}offsetToCoords(){let n="offsetToCoords";return{offsetToCoords:new M(`
      vec2 ${n}(int offset, int width, int height) {
        int t = offset / width;
        int s = offset - t*width;
        vec2 coords = (vec2(s,t) + vec2(0.5,0.5)) / vec2(width, height);
        return coords;
      }
      `)}}coordsToOffset(){let n="coordsToOffset";return{coordsToOffset:new M(`
      int ${n}(vec2 coords, int width, int height) {
        float s = coords.s * float(width);
        float t = coords.t * float(height);
        int offset = int(t) * width + int(s);
        return offset;
      }
      `)}}getOutputSamplingSnippet(){let n=this.context.outputTextureLayout;return n.isPacked?this.getPackedOutputSamplingSnippet(n):this.getUnpackedOutputSamplingSnippet(n)}getPackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputPacked1DCoords(t,o);break;case 2:i[s]=this.getOutputPacked2DCoords(t,o);break;case 3:i[s]=this.getOutputPacked3DCoords(t,o);break;default:i[s]=this.getOutputPackedNDCoords(t,o)}let u=`
      void setOutput(vec4 val) {
        ${q(this.context.glContext.version).output} = val;
      }
    `,l="floatTextureSetRGBA";return i[l]=new M(u),i}getUnpackedOutputSamplingSnippet(n){let t=n.unpackedShape,o=[n.width,n.height],i={},s="getOutputCoords";switch(t.length){case 0:i[s]=this.getOutputScalarCoords();break;case 1:i[s]=this.getOutputUnpacked1DCoords(t,o);break;case 2:i[s]=this.getOutputUnpacked2DCoords(t,o);break;case 3:i[s]=this.getOutputUnpacked3DCoords(t,o);break;case 4:i[s]=this.getOutputUnpacked4DCoords(t,o);break;case 5:i[s]=this.getOutputUnpacked5DCoords(t,o);break;case 6:i[s]=this.getOutputUnpacked6DCoords(t,o);break;default:throw new Error(`Unsupported output dimensionality: ${t.length}`)}let u=`
        void setOutput(float val) {
          ${q(this.context.glContext.version).output} = vec4(val, 0, 0, 0);
        }
    `,l="floatTextureSetR";return i[l]=new M(u),i}getOutputScalarCoords(){return new M(`
      int getOutputCoords() {
        return 0;
      }
    `)}getOutputPacked1DCoords(n,t){let o=t,i="";return o[0]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.y * ${o[1]}.0);
          }
        `,new M(i)):o[1]===1?(i=`
          int getOutputCoords() {
            return 2 * int(TexCoords.x * ${o[0]}.0);
          }
        `,new M(i)):(i=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                 vec2(${o[0]}, ${o[1]}));
          return 2 * (resTexRC.y * ${o[0]} + resTexRC.x);
        }
      `,new M(i))}getOutputPacked2DCoords(n,t){let o="";if(ir.arraysEqual(n,t))return o=`
        ivec2 getOutputCoords() {
          return 2 * ivec2(TexCoords.xy * vec2(${t[0]}, ${t[1]}));
        }
      `,new M(o);let i=t,s=Math.ceil(n[1]/2);return o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${i[0]}, ${i[1]}));

          int index = resTexRC.y * ${i[0]} + resTexRC.x;

          // reverse r and c order for packed texture
          int r = imod(index, ${s}) * 2;
          int c = 2 * (index / ${s});

          return ivec2(r, c);
        }
      `,new M(o)}getOutputPacked3DCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[2]/2),s=i*Math.ceil(n[1]/2),a=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${o[0]}, ${o[1]}));
          int index = resTexRC.y * ${o[0]} + resTexRC.x;

          int b = index / ${s};
          index -= b * ${s};

          // reverse r and c order for packed texture
          int r = imod(index, ${i}) * 2;
          int c = 2 * (index / ${i});

          return ivec3(b, r, c);
        }
      `;return new M(a)}getOutputPackedNDCoords(n,t){let o=[t[0],t[1]],i=Math.ceil(n[n.length-1]/2),s=i*Math.ceil(n[n.length-2]/2),a=s,u="",l="b, r, c";for(let d=2;d<n.length-1;d++)a*=n[n.length-d-1],u=`
      int b${d} = index / ${a};
      index -= b${d} * ${a};
    `+u,l=`b${d}, `+l;let c=`
      ivec${n.length} getOutputCoords() {
        ivec2 resTexRC = ivec2(TexCoords.xy *
                              vec2(${o[0]}, ${o[1]}));
        int index = resTexRC.y * ${o[0]} + resTexRC.x;

        ${u}

        int b = index / ${s};
        index -= b * ${s};

        // reverse r and c order for packed texture
        int r = imod(index, ${i}) * 2;
        int c = 2 * (index / ${i});

        return ivec${n.length}(${l});
      }
    `;return new M(c)}getOutputUnpacked1DCoords(n,t){let o=`
        int getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          return resTexRC.y * ${t[0]} + resTexRC.x;
        }
      `;return new M(o)}getOutputUnpacked2DCoords(n,t){let o=`
        ivec2 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          int r = index / ${n[1]};
          int c = index - r * ${n[1]};
          return ivec2(r, c);
        }
      `;return new M(o)}getOutputUnpacked3DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d"],u=s.map((l,c)=>{let d=`int ${a[c]} = index / ${l}`,f=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${d}; ${f};`}).join("");return o=`
        ivec3 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec3(r, c, d);
        }
      `,new M(o)}getOutputUnpacked4DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2"],u=s.map((l,c)=>{let d=`int ${a[c]} = index / ${l}`,f=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${d}; ${f};`}).join("");return o=`
      ivec4 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec4(r, c, d, d2);
        }
      `,new M(o)}getOutputUnpacked5DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3"],u=s.map((l,c)=>{let d=`int ${a[c]} = index / ${l}`,f=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${d}; ${f};`}).join("");return o=`
      ivec5 getOutputCoords() {
          ivec2 resTexRC = ivec2(TexCoords.xy *
                                vec2(${t[0]}, ${t[1]}));
          int index = resTexRC.y * ${t[0]} + resTexRC.x;
          ${u}
          return ivec5(r, c, d, d2, d3);
        }
      `,new M(o)}getOutputUnpacked6DCoords(n,t){let o="",i=n.length,s=null;i<2&&(s=[]),s=new Array(i-1),s[i-2]=n[i-1];for(let l=i-3;l>=0;--l)s[l]=s[l+1]*n[l+1];let a=["r","c","d","d2","d3","d4"],u=s.map((l,c)=>{let d=`int ${a[c]} = index / ${l}`,f=c===s.length-1?`int ${a[c+1]} = index - ${a[c]} * ${l}`:`index -= ${a[c]} * ${l}`;return`${d}; ${f};`}).join("");return o=`
     ivec6 getOutputCoords() {
         ivec2 resTexRC = ivec2(TexCoords.xy *
                               vec2(${t[0]}, ${t[1]}));
         int index = resTexRC.y * ${t[0]} + resTexRC.x;
         ${u}
         return ivec6(r, c, d, d2, d3, d4);
       }
     `,new M(o)}getCommonUtilFuncs(){let n={},t="uvFromFlat";n[t]=new M(`
    vec2 uvFromFlat(int texNumR, int texNumC, int index) {
      int texC = index / texNumR;
      int texR = index - texC * texNumR;
      // TODO: swap texR, texC order in following function so row is corresponding to u and column is corresponding to
      //       v.
      return (vec2(texR, texC) + halfCR) / vec2(texNumR, texNumC);
    }
    `),t="packedUVfrom1D",n[t]=new M(`
      vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
        int texelIndex = index / 2;
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom2D",n[t]=new M(`
      vec2 packedUVfrom2D(int texNumR, int texNumC, int texelsInLogicalRow, int row, int col) {
        int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = texelIndex / texNumC;
        int texC = texelIndex - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="packedUVfrom3D",n[t]=new M(`
      vec2 packedUVfrom3D(int texNumR, int texNumC,
          int texelsInBatch, int texelsInLogicalRow, int b,
          int row, int col) {
        int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
        int texR = index / texNumC;
        int texC = index - texR * texNumC;
        return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
      }
      `),t="sampleTexture";let o=q(this.context.glContext.version);return n[t]=new M(`
        float sampleTexture(sampler2D textureSampler, vec2 uv) {
            return ${o.texture2D}(textureSampler, uv).r;
        }`),n}getInputsSamplingSnippets(){let n={},t=this.context.outputTextureLayout;return this.context.programInfo.inputNames.forEach((o,i)=>{let s=this.context.inputTextureLayouts[i],a=Fn(o);s.isPacked?n[a]=this.getPackedSamplerFromInput(a,o,s):n[a]=this.getUnpackedSamplerFromInput(a,o,s);let u=tl(o);s.unpackedShape.length<=t.unpackedShape.length&&(s.isPacked?n[u]=this.getPackedSamplerAtOutputCoords(u,s,t,o):n[u]=this.getUnpackedSamplerAtOutputCoords(u,s,t,o))}),n}getPackedSamplerAtOutputCoords(n,t,o,i){let s=t.unpackedShape,a=o.unpackedShape,l=Fn(i),c=s.length,d=a.length,f=Xe.getBroadcastDims(s,a),m=Ze(d),p=d-c,h,b=Tt();c===0?h="":d<2&&f.length>=1?h="coords = 0;":h=f.map(k=>`coords.${b[k+p]} = 0;`).join(`
`);let y="";d<2&&c>0?y="coords":y=s.map((k,N)=>`coords.${b[N+p]}`).join(", ");let g="return outputValue;",_=G.size(s)===1,I=G.size(a)===1;if(c===1&&!_&&!I)g=`
        return vec4(outputValue.xy, outputValue.xy);
      `;else if(_&&!I)d===1?g=`
          return vec4(outputValue.x, outputValue.x, 0., 0.);
        `:g=`
          return vec4(outputValue.x);
        `;else if(f.length){let k=c-2,N=c-1;f.indexOf(k)>-1&&f.indexOf(N)>-1?g="return vec4(outputValue.x);":f.indexOf(k)>-1?g="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":f.indexOf(N)>-1&&(g="return vec4(outputValue.xx, outputValue.zz);")}let O=`
        int lastDim = coords.${b[d-1]};
        coords.${b[d-1]} = coords.${b[d-2]};
        coords.${b[d-2]} = lastDim;
      `,E=`
      vec4 ${n}() {
        ${m} coords = getOutputCoords();
        ${O}
        ${h}
        vec4 outputValue = ${l}(${y});
        ${g}
      }
    `;return new M(E,["coordinates.getOutputCoords"])}getUnpackedSamplerAtOutputCoords(n,t,o,i){let s=[o.width,o.height],a=[t.width,t.height],u=t.unpackedShape.length,l=o.unpackedShape.length,c=t.unpackedShape,d=o.unpackedShape,f=Fn(i);if(u===l&&ir.arraysEqual(a,s)){let _=`
          float ${n}() {
            return sampleTexture(${i}, TexCoords);
          }
        `;return new M(_,["coordinates.sampleTexture"])}let m=Ze(l),p=Xe.getBroadcastDims(c,d),h=l-u,b,y=Tt();u===0?b="":l<2&&p.length>=1?b="coords = 0;":b=p.map(_=>`coords.${y[_+h]} = 0;`).join(`
`);let g="";l<2&&u>0?g="coords":g=t.unpackedShape.map((_,v)=>`coords.${y[v+h]}`).join(", ");let x=`
        float ${n}() {
          ${m} coords = getOutputCoords();
          ${b}
          return ${f}(${g});
        }
      `;return new M(x,["coordinates.getOutputCoords"])}getPackedSamplerFromInput(n,t,o){switch(o.unpackedShape.length){case 0:return this.getPackedSamplerScalar(n,t);case 1:return this.getPackedSampler1D(n,t,o);case 2:return this.getPackedSampler2D(n,t,o);case 3:return this.getPackedSampler3D(n,t,o);default:return this.getPackedSamplerND(n,t,o)}}getUnpackedSamplerFromInput(n,t,o){let i=o.unpackedShape;switch(i.length){case 0:return this.getUnpackedSamplerScalar(n,t,o);case 1:return this.getUnpackedSampler1D(n,t,o);case 2:return this.getUnpackedSampler2D(n,t,o);case 3:return this.getUnpackedSampler3D(n,t,o);case 4:return this.getUnpackedSampler4D(n,t,o);case 5:return this.getUnpackedSampler5D(n,t,o);case 6:return this.getUnpackedSampler6D(n,t,o);default:throw new Error(`Unsupported dimension ${i.length}-D`)}}getPackedSamplerScalar(n,t){let o=q(this.context.glContext.version),i=`
          vec4 ${n}() {
            return ${o.texture2D}(${t}, halfCR);
          }
        `;return new M(i)}getPackedSampler1D(n,t,o){let i=[o.width,o.height],s=[i[1],i[0]],a=q(this.context.glContext.version),l=`vec4 ${n}(int index) {
      vec2 uv = packedUVfrom1D(
      ${s[0]}, ${s[1]}, index);
      return ${a.texture2D}(${t}, uv);
    }`;return new M(l,["coordinates.packedUVfrom1D"])}getPackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=q(this.context.glContext.version),u=s[0],l=s[1];if(s!=null&&ir.arraysEqual(i,s)){let p=`vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${l}.0, ${u}.0);
        return ${a.texture2D}(${t}, uv);
      }`;return new M(p)}let c=s,d=Math.ceil(i[1]/2),m=`vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${c[1]}, ${c[0]}, ${d}, row, col);
      return ${a.texture2D}(${t}, uv);
    }`;return new M(m,["coordinates.packedUVfrom2D"])}getPackedSampler3D(n,t,o){let i=o.unpackedShape,s=[o.width,o.height],a=[s[0],s[1]],u=q(this.context.glContext.version);if(i[0]===1){let h=i.slice(1),b=[1,2],y=Ar(i,h),g=["b","row","col"],x=JSON.parse(JSON.stringify(o));x.unpackedShape=y;let _=this.getPackedSamplerFromInput(n,t,x),I=`${_.routineBody}
      vec4 ${n}(int b, int row, int col) {
        return ${n}(${Pr(g,b)});
      } `;return new M(I,_.dependencies)}let l=a[0],c=a[1],d=Math.ceil(i[2]/2),f=d*Math.ceil(i[1]/2),p=`vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${l}, ${f}, ${d}, b, row, col);
      return ${u.texture2D}(${t}, uv);}`;return new M(p,["coordinates.packedUVfrom3D"])}getPackedSamplerND(n,t,o){let i=o.unpackedShape,s=i.length,a=[o.width,o.height],u=q(this.context.glContext.version),l=[a[0],a[1]],c=l[1],d=l[0],f=Math.ceil(i[s-1]/2),m=f*Math.ceil(i[s-2]/2),p="int b, int row, int col",h=`b * ${m} + (row / 2) * ${f} + (col / 2)`;for(let g=2;g<s-1;g++)p=`int b${g}, `+p,m*=i[s-g-1],h=`b${g} * ${m} + `+h;let y=`vec4 ${n}(${p}) {
      int index = ${h};
      int texR = index / ${d};
      int texC = index - texR * ${d};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${d}, ${c});
      return ${u.texture2D}(${t}, uv);
    }`;return new M(y)}getUnpackedSamplerScalar(n,t,o){let[i,s]=[o.width,o.height];if(i===1&&s===1){let u=`
          float ${n}() {
            return sampleTexture(${t}, halfCR);
          }
        `;return new M(u,["coordinates.sampleTexture"])}let a=`
        float ${n}() {
          int offset_${t} = coordsToOffset(TexCoords, ${i}, ${s});
          vec2 uv = uvFromFlat(${i}, ${s}, offset_${t});
          return sampleTexture(${t}, uv);
        }
      `;return new M(a,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler1D(n,t,o){let i=o.width,s=o.height;if(s===1&&i===1){let u=`
        float ${n}(int index) {
          return sampleTexture(${t}, halfCR);
        }
      `;return new M(u,["coordinates.sampleTexture"])}if(s===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2((float(index) + 0.5) / ${i}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new M(u,["coordinates.sampleTexture"])}if(i===1){let u=`
          float ${n}(int index) {
            vec2 uv = vec2(0.5, (float(index) + 0.5) / ${s}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new M(u,["coordinates.sampleTexture"])}let a=`
        float ${n}(int index) {
          vec2 uv = uvFromFlat(${i}, ${s}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new M(a,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler2D(n,t,o){let i=o.unpackedShape,s=[o.height,o.width];if(s!=null&&ir.arraysEqual(i,s)){let m=s[1],p=s[0],h=`
          float ${n}(int row, int col) {
            vec2 uv = (vec2(row, col) + halfCR) / vec2(${m}.0, ${p}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new M(h,["coordinates.sampleTexture"])}let{newShape:a,keptDims:u}=kr(i),l=a;if(l.length<i.length){let m=Ar(i,l),p=JSON.parse(JSON.stringify(o));p.unpackedShape=m;let h=["col","row"],b=`
          ${this.getUnpackedSamplerFromInput(n,t,p).routineBody}
          float ${n}(int row, int col) {
            return ${n}(${Pr(h,u)});
          }
        `;return new M(b,["coordinates.sampleTexture"])}let c=s[1],d=s[0];if(d===1){let m=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${c}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2(0.5, (index + 0.5) / ${c}.0);
            return sampleTexture(${t}, uv);
          }
        `;return new M(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}if(c===1){let m=`
          float ${n}(int row, int col) {
            int offset_${t} = coordsToOffset(TexCoords, ${c}, ${d});
            float index = dot(vec3(row, col, offset_${t}), vec3(${i[1]}, 1, 1));
            vec2 uv = vec2((index + 0.5) / ${d}.0, 0.5);
            return sampleTexture(${t}, uv);
          }
        `;return new M(m,["coordinates.sampleTexture","coordinates.coordsToOffset"])}let f=`
        float ${n}(int row, int col) {
          int index = col * ${i[1]} + row;
          vec2 uv = uvFromFlat(${c}, ${d}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new M(f,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler3D(n,t,o){let i=o.unpackedShape,s=i[1]*i[2],a=i[2],{newShape:u,keptDims:l}=kr(i),c=u;if(c.length<i.length){let p=Ar(i,c),h=["batch","col","row"],b=JSON.parse(JSON.stringify(o));b.unpackedShape=p;let y=this.getUnpackedSamplerFromInput(n,t,b),g=l.reverse(),x=`
          ${y.routineBody}
          float ${n}(int batch, int row, int col) {
            return ${n}(${Pr(h,g)});
          }
        `;return new M(x,y.dependencies)}let d=o.width,f=o.height,m=`
          float ${n}(int depth, int row, int col) {
            // Explicitly use integer operations as dot() only works on floats.
            int index = depth * ${s} + col * ${a} + row;
            vec2 uv = uvFromFlat(${d}, ${f}, index);
            return sampleTexture(${t}, uv);
          }
      `;return new M(m,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}getUnpackedSampler4D(n,t,o){let i=o.unpackedShape,s=i[3],a=i[2]*s,u=i[1]*a,l=o.width,c=o.height,d=`
        float ${n}(int row, int col, int depth, int depth2) {
          int index = row * ${u} + col * ${a} +
              depth2 * ${s} + depth;
          vec2 uv = uvFromFlat(${l}, ${c}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new M(d,["coordinates.uvFromFlat","coordinates.sampleTexture"])}getUnpackedSampler5D(n,t,o){let i=o.unpackedShape,s=i[4],a=i[3]*s,u=i[2]*a,l=i[1]*u,{newShape:c,keptDims:d}=kr(i);if(c.length<i.length){let h=Ar(i,c),b=["row","col","depth","depth2","depth3"],y=JSON.parse(JSON.stringify(o));y.unpackedShape=h;let g=`
          ${this.getUnpackedSamplerFromInput(n,t,y).routineBody}
          float ${n}(int row, int col, int depth, int depth2, int depth3) {
            return ${n}(${Pr(b,d)});
          }
        `;return new M(g,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let f=o.width,m=o.height,p=`
        float ${n}(int row, int col, int depth, int depth2, int depth3) {
          int index = row * ${l} + col * ${u} + depth * ${a} +
          depth3 * ${s} + depth2;
          vec2 uv = uvFromFlat(${f}, ${m}, index);
          return sampleTexture(${t}, uv);
        }
      `;return new M(p,["coordinates.sampleTexture","coordinates.uvFromFlat"])}getUnpackedSampler6D(n,t,o){let i=o.unpackedShape,s=i[5],a=i[4]*s,u=i[3]*a,l=i[2]*u,c=i[1]*l,{newShape:d,keptDims:f}=kr(i);if(d.length<i.length){let b=Ar(i,d),y=["row","col","depth","depth2","depth3","depth4"],g=JSON.parse(JSON.stringify(o));g.unpackedShape=b;let x=`
            ${this.getUnpackedSamplerFromInput(n,t,g).routineBody}
            float ${n}(int row, int col, int depth,
              int depth2, int depth3, int depth4) {
              return ${n}(${Pr(y,f)});
            }
          `;return new M(x,["coordinates.sampleTexture","coordinates.uvFromFlat"])}let m=o.width,p=o.height,h=`
          float ${n}(int row, int col, int depth,
            int depth2, int depth3, int depth4) {
            int index = row * ${c} + col * ${l} + depth * ${u} +
            depth2 * ${a} + depth3 * ${s} + depth4;
            vec2 uv = uvFromFlat(${m}, ${p}, index);
            return sampleTexture(${t}, uv);
          }
        `;return new M(h,["coordinates.uvFromFlat","coordinates.sampleTexture","coordinates.coordsToOffset"])}toVec(){let n=this.context.outputTextureLayout,t=n.shape.length,o=n.strides,i=n.width,s=n.height,a=[];for(let l=0;l<t-1;++l)a.push(`
        c[${l}] = offset / ${o[l]};`),a.push(`
        offset -= c[${l}] * ${o[l]};`);a.push(`
        c[${t-1}] = offset;`);let u=`
      void toVec(vec2 texCoords, out int c[${t}]) {
        int offset = coordsToOffset(texCoords, ${i}, ${s});
        ${a.join("")}
      }
      void toVec(int offset, out int c[${t}]) {
        ${a.join("")}
      }
    `;return{toVec:new M(u,["coordinates.coordsToOffset"])}}valueFrom(){let n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o],a=(i.unpackedShape.length>0?i.unpackedShape:i.shape).length,u=`_${t}`;n[u]=new M(this.getValueFromSingle(t,a,i.width,i.height,!1),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"]),u=u+"_T",n[u]=new M(this.getValueFromSingle(t,a,i.width,i.height,!0),[`shapeUtils.indicesToOffset${u}`,"coordinates.offsetToCoords","fragcolor.getColorAsFloat"])}),n}getValueFromSingle(n,t,o,i,s){let a=`_${n}`;s&&(a=a+"_T");let u=q(this.context.glContext.version);return`
        float ${a}(int m[${t}]) {
          int offset = indicesToOffset${a}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          float value = getColorAsFloat(${u.texture2D}(${n}, coords));
          return value;
        }
        `}getPackedValueFrom(n,t,o,i,s){let a=`_${n}_Pack`;s&&(a=a+"_T");let u=q(this.context.glContext.version);return`
        vec4 ${a}(int m[${t}]) {
          int offset = indicesToOffset_${n}(m);
          vec2 coords = offsetToCoords(offset, ${o}, ${i});
          return ${u.texture2D}(${n}, coords);
        }
        `}}});var no,gf=S(()=>{"use strict";Nt();no=class r extends dt{constructor(e){super(e)}getFunctions(){return{...this.encodeFloat32(),...this.decodeFloat32()}}getCustomTypes(){return{}}encodeFloat32(){return{encode:new M(`highp vec4 encode(highp float f) {
        return vec4(f, 0.0, 0.0, 0.0);
      }
        `)}}decodeFloat32(){return{decode:new M(`highp float decode(highp vec4 rgba) {
        return rgba.r;
      }
        `)}}encodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{encode:new M(`
      highp vec4 encode(highp float f) {
        highp float F = abs(f);
        highp float Sign = step(0.0,-f);
        highp float Exponent = floor(log2(F));
        highp float Mantissa = (exp2(- Exponent) * F);
        Exponent = floor(log2(F) + 127.0) + floor(log2(Mantissa));
        highp vec4 rgba;
        rgba[0] = 128.0 * Sign  + floor(Exponent*exp2(-1.0));
        rgba[1] = 128.0 * mod(Exponent,2.0) + mod(floor(Mantissa*128.0),128.0);
        rgba[2] = floor(mod(floor(Mantissa*exp2(23.0 -8.0)),exp2(8.0)));
        rgba[3] = floor(exp2(23.0)*mod(Mantissa,exp2(-15.0)));
        ${e}
        rgba = rgba / 255.0; // values need to be normalized to [0,1]
        return rgba;
    }
        `)}}decodeUint8(){let e=r.isLittleEndian()?"rgba.rgba=rgba.abgr;":"";return{decode:new M(`
        highp float decode(highp vec4 rgba) {
          rgba = rgba * 255.0; // values need to be de-normalized from [0,1] to [0,255]
          ${e}
          highp float Sign = 1.0 - step(128.0,rgba[0])*2.0;
          highp float Exponent = 2.0 * mod(rgba[0],128.0) + step(128.0,rgba[1]) - 127.0;
          highp float Mantissa = mod(rgba[1],128.0)*65536.0 + rgba[2]*256.0 +rgba[3] + float(0x800000);
          highp float Result =  Sign * exp2(Exponent) * (Mantissa * exp2(-23.0 ));
          return Result;
      }
        `)}}static isLittleEndian(){let e=new ArrayBuffer(4),n=new Uint32Array(e),t=new Uint8Array(e);if(n[0]=3735928559,t[0]===239)return!0;if(t[0]===222)return!1;throw new Error("unknown endianness")}}});var oo,bf=S(()=>{"use strict";Nt();$e();oo=class extends dt{constructor(e){super(e)}getFunctions(){return{...this.setFragColor(),...this.getColorAsFloat()}}getCustomTypes(){return{}}setFragColor(){let e=q(this.context.glContext.version);return{setFragColor:new M(`
        void setFragColor(float value) {
            ${e.output} = encode(value);
        }
        `,["encoding.encode"])}}getColorAsFloat(){return{getColorAsFloat:new M(`
        float getColorAsFloat(vec4 color) {
            return decode(color);
        }
        `,["encoding.decode"])}}}});var io,yf=S(()=>{"use strict";Nt();io=class r extends dt{constructor(e){super(e)}getFunctions(){return{...this.bcastIndex(),...this.bcastMatmulIndex(),...this.offsetToIndices(),...this.indicesToOffset(),...this.incrementIndices()}}getCustomTypes(){return{}}bcastIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].unpackedShape;if(i.length<=e){let s=i.length,a=e-s,u=`bcastIndices_${t}`,l="";for(let d=0;d<s;++d)l+=`
          realIndices[${d}] = int( mod(float(bcastedIndices[${a+d}]), ${i[d]}.0) );
          `;let c=`
        void ${u} (int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
        }
        `;n[u]=new M(c)}}),n}bcastMatmulIndex(){let e=this.context.outputTextureLayout.shape.length,n={};return this.context.programInfo.inputNames.forEach((t,o)=>{let i=this.context.inputTextureLayouts[o].shape;if(!(i.length<2||i.length>e)){let s=i.length,a=e-s,u=`bcastMatmulIndices_${t}`,l="";for(let d=0;d<s-2;++d)l+=`
          realIndices[${d}] = int( mod(float(bcastedIndices[${a+d}]), ${i[d]}.0) );
          `;let c=`
        void ${u}(int bcastedIndices[${e}], out int realIndices[${s}]) {
          ${l}
          realIndices[${s-1}] = bcastedIndices[${e-1}];
          realIndices[${s-2}] = bcastedIndices[${e-2}];
        }
        `;n[u]=new M(c)}}),n}indicesToOffset(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`indicesToOffset_${n}`;e[a]=new M(r.indexToOffsetSingle(a,s,i)),a=`indicesToOffset_${n}_T`,e[a]=new M(r.indexToOffsetSingle(a,s,i.slice().reverse()))}),e}static indexToOffsetSingle(e,n,t){let o="";for(let i=n-1;i>=0;--i)o+=`
        offset += indices[${i}] * ${t[i]};
        `;return`
      int ${e}(int indices[${n}]) {
        int offset = 0;
        ${o}
        return offset;
      }
      `}offsetToIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=this.context.inputTextureLayouts[t].strides,s=o.length,a=`offsetToIndices_${n}`;e[a]=new M(r.offsetToIndicesSingle(a,s,i)),a=`offsetToIndices_${n}_T`,e[a]=new M(r.offsetToIndicesSingle(a,s,i.slice().reverse()))}),e}static offsetToIndicesSingle(e,n,t){let o=[];for(let i=0;i<n-1;++i)o.push(`
      indices[${i}] = offset / ${t[i]};`),o.push(`
        offset -= indices[${i}] * ${t[i]};`);return o.push(`
      indices[${n-1}] = offset;`),`
      void ${e}(int offset, out int indices[${n}]) {
        ${o.join("")}
      }
      `}incrementIndices(){let e={};return this.context.programInfo.inputNames.forEach((n,t)=>{let o=this.context.inputTextureLayouts[t].shape,i=o.length,s=`incrementIndices_${n}`,a="";for(let l=0;l<i;++l)a+=`
        shape[${l}] = ${o[l]};`;let u=`
        void ${s}(int axis, out int indices[${i}]) {
          int shape[${i}];
          ${a};
          for(int i = ${i} -1 ; i >= 0; --i) {
            if(i > axis) continue;
            indices[i] += 1;
            if(indices[i] < shape[i]) {
              break;
            }
            indices[i] = 0;
          }
        }
        `;e[s]=new M(u)}),e}}});var ao,xf=S(()=>{"use strict";Nt();ao=class extends dt{constructor(e){super(e)}getCustomTypes(){return{}}getFunctions(){return{...this.binaryVecFunctions(),...this.copyVec(),...this.setVecItem(),...this.getVecItem()}}binaryVecFunctions(){let n=this.context.outputTextureLayout.shape.length,t={add:"+=",sub:"-=",mul:"*=",div:"/="},o={};for(let i in t){let s=`${i}Vec`,a="";for(let l=0;l<n;++l)a+=`
          dest[${l}] ${t[i]} src[${l}];
          `;let u=`
        void ${s}(int src[${n}], out int dest[${n}]) {
          ${a}
        }
        `;o[s]=new M(u)}return o}copyVec(){let n=this.context.outputTextureLayout.shape.length,t="";for(let i=0;i<n;++i)t+=`
        dest[${i}] = src[${i}];
        `;let o=`
      void copyVec(int src[${n}], out int dest[${n}]) {
        ${t}
      }
      `;return{copyVec:new M(o)}}setVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index =${n} + index;
        if (index == 0)
            m[0] = value;
        `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            m[${i}] = value;
            `;t+=`
        else
            m[${n-1}] = value;
        `;let o=`
      void setVecItem(out int m[${n}], int index, int value) {
        ${t}
      }
        `;return{setVecItem:new M(o)}}getVecItem(){let n=this.context.outputTextureLayout.shape.length,t=`
        if(index < 0)
            index = ${n} + index;
        if (index == 0)
            return m[0];
      `;for(let i=1;i<n-1;++i)t+=`
        else if (index == ${i})
            return m[${i}];
      `;t+=`
        else
            return m[${n-1}];
        `;let o=`
      int getVecItem(int m[${n}], int index) {
        ${t}
      }
    `;return{getVecItem:new M(o)}}}});var ca,wf=S(()=>{"use strict";hf();gf();bf();yf();xf();ca={encoding:no,fragcolor:oo,vec:ao,shapeUtils:io,coordinates:ro}});var so,_f=S(()=>{"use strict";Nt();pf();wf();$e();so=class{constructor(e,n,t,o){this.libs={};this.glslLibRoutineDependencyGraph={};this.context=new Hn(e,n,t,o),Object.keys(ca).forEach(s=>{let a=new ca[s](this.context);this.libs[s]=a});let i=this.glslLibRoutineDependencyGraph;for(let s in this.libs){let u=this.libs[s].getFunctions();for(let l in u){let c=s+"."+l,d;i[c]?(d=i[c],d.routineBody=u[l].routineBody):(d=new Jr(c,u[l].routineBody),i[c]=d);let f=u[l].dependencies;if(f)for(let m=0;m<f.length;++m)if(i[f[m]])d.addDependency(i[f[m]]);else{let p=new Jr(f[m]);i[f[m]]=p,d.addDependency(p)}}}}preprocess(){let e=this.context.programInfo,n=e.shaderSource;return this.context.programInfo.hasMain||(n=`${n}
      ${el(this.context.glContext.version,this.context.outputTextureLayout.shape.length)}`),n=ff(n),`${Qu(this.context.glContext.version)}
    ${this.getUniforms(e.inputNames,e.variables)}
    ${this.getImports(n)}
    ${n}`}getImports(e){let n=this.selectGlslLibRoutinesToBeIncluded(e);if(n.length===0)return"";let t="";for(let o=0;o<n.length;++o)if(n[o].routineBody)t+=n[o].routineBody+`
`;else throw new Error(`Missing body for the Glsl Library routine: ${n[o].name}`);return t}selectGlslLibRoutinesToBeIncluded(e){let n=[];return Object.keys(this.glslLibRoutineDependencyGraph).forEach(t=>{let o=t.split(".")[1];e.indexOf(o)!==-1&&n.push(this.glslLibRoutineDependencyGraph[t])}),qn.returnOrderedNodes(n)}getUniforms(e,n){let t=[];if(e)for(let o of e)t.push(`uniform sampler2D ${o};`);if(n)for(let o of n)t.push(`uniform ${o.type} ${o.name}${o.arrayLength?`[${o.arrayLength}]`:""};`);return t.join(`
`)}}});var uo,Tf=S(()=>{"use strict";Ke();st();_f();$e();uo=class{constructor(e,n,t){this.profiler=e;this.glContext=n;this.textureLayoutStrategy=t;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t){this.profiler.event("op",`ProgramManager.run ${e.programInfo.name??"unknown kernel"}`,()=>{let o=this.glContext.gl,i=e.program;o.useProgram(i);try{this.bindOutput(t),this.attributesBound||this.bindAttributes(e.attribLocations),this.bindUniforms(e.uniformLocations,e.programInfo.variables??[],n)}catch(s){throw ye.error("ProgramManager",e.programInfo.shaderSource),s}this.profiler.event("backend","GlContext.draw()",()=>{this.glContext.draw()})},this.glContext)}dispose(){this.vertexShader&&this.glContext.deleteShader(this.vertexShader),this.repo.forEach(e=>this.glContext.deleteProgram(e.program))}build(e,n,t){return this.profiler.event("backend","ProgramManager.build",()=>{let o=new so(this.glContext,e,n,t),i=o.preprocess(),s=this.compile(i);return{programInfo:e,program:s,uniformLocations:this.getUniformLocations(s,o.context.programInfo.inputNames,o.context.programInfo.variables),attribLocations:this.getAttribLocations(s)}})}compile(e){if(!this.vertexShader){ye.verbose("ProrgramManager","Compiling and caching Vertex shader for the first time");let o=Yu(this.glContext.version);this.vertexShader=this.glContext.compileShader(o,this.glContext.gl.VERTEX_SHADER)}j.debug&&ye.verbose("ProrgramManager",`FragShader:
${e}
`);let n=this.glContext.compileShader(e,this.glContext.gl.FRAGMENT_SHADER),t=this.glContext.createProgram(this.vertexShader,n);return this.glContext.deleteShader(n),t}bindOutput(e){let n=e.width,t=e.height;ye.verbose("ProrgramManager",`Binding output texture to Framebuffer: w/h=${n}/${t}, shape=${e.shape}, type=${e.tensor.type}`),this.glContext.attachFramebuffer(e.texture,n,t)}bindAttributes(e){let n=e.position,t=e.textureCoord;this.glContext.setVertexAttributes(n,t),this.attributesBound=!0}bindUniforms(e,n,t){let o=this.glContext.gl,i=0;for(let{name:s,type:a,location:u,arrayLength:l}of e){let c=n.find(d=>d.name===s)?.data;if(a!=="sampler2D"&&!c)throw new Error(`variable '${s}' does not have data defined in program info`);switch(a){case"sampler2D":this.bindTexture(t[i],u,i),i++;break;case"float":l?o.uniform1fv(u,c):o.uniform1f(u,c);break;case"int":l?o.uniform1iv(u,c):o.uniform1i(u,c);break;default:throw new Error(`Uniform not implemented: ${a}`)}}}bindTexture(e,n,t){this.glContext.bindTextureToUniform(e.texture,t,n)}getAttribLocations(e){return{position:this.getAttribLocation(e,"position"),textureCoord:this.getAttribLocation(e,"textureCoord")}}getUniformLocations(e,n,t){let o=[];if(n)for(let i of n)o.push({name:i,type:"sampler2D",location:this.getUniformLocation(e,i)});if(t)for(let i of t)o.push({...i,location:this.getUniformLocation(e,i.name)});return o}getUniformLocation(e,n){let o=this.glContext.gl.getUniformLocation(e,n);if(o===null)throw new Error(`Uniform ${n} not found.`);return o}getAttribLocation(e,n){return this.glContext.gl.getAttribLocation(e,n)}}});var lo,vf=S(()=>{"use strict";st();Xr();lo=class{constructor(e,n,t,o){this.glContext=e;this.layoutStrategy=n;this.profiler=t;this.config=o;this.pendingRead=new Map;o.reuseTextures&&(this.inUseTextures=new Map,this.idleTextures=new Map,this.textureLookup=new Map)}createTextureFromLayout(e,n,t,o){let i=this.toEncoderType(e),s=this.glContext.getEncoder(i,n.channels||1,o);if(n.isPacked&&o===1)throw new Error("not implemented");let a=n.width,u=n.height,l,c;if(this.config.reuseTextures){l=`${a}x${u}_${s.format}_${s.internalFormat}_${s.textureType}`,c=this.inUseTextures.get(l),c||(c=[],this.inUseTextures.set(l,c));let f=this.idleTextures.get(l);if(f&&f.length>0){let m=f.pop();return c.push(m),o===1&&this.glContext.updateTexture(m,a,u,s,this.toTextureData(e,t)),m}}ye.verbose("TextureManager",`Creating new texture of size ${n.width}x${n.height}`);let d=this.glContext.allocateTexture(a,u,s,this.toTextureData(e,t));return this.config.reuseTextures&&(c.push(d),this.textureLookup.set(d,l)),d}readTexture(e,n,t){return t||(t=1),this.profiler.event("backend","TextureManager.readTexture",()=>{let o=e.shape.reduce((s,a)=>s*a)*t,i=this.glContext.readTexture(e.texture,e.width,e.height,o,this.toEncoderType(n),t);return this.toTensorData(n,i)})}async readTextureAsync(e,n,t){let o=e.tensor.dataId;if(t||(t=1),this.pendingRead.has(o)){let i=this.pendingRead.get(o);return new Promise(s=>i?.push(s))}return this.profiler.event("backend","TextureManager.readTextureAsync",async()=>{this.pendingRead.set(o,[]);let i=e.shape.reduce((l,c)=>l*c)*t;await this.glContext.createAndWaitForFence();let s=this.glContext.readTexture(e.texture,e.width,e.height,i,this.toEncoderType(n),t),a=this.toTensorData(n,s),u=this.pendingRead.get(o);return this.pendingRead.delete(o),u?.forEach(l=>l(a)),a})}readUint8TextureAsFloat(e){return this.profiler.event("backend","TextureManager.readUint8TextureAsFloat",()=>{let n=e.shape.reduce((o,i)=>o*i),t=this.glContext.readTexture(e.texture,e.width,e.height,n*4,"byte",4);return new Float32Array(t.buffer,t.byteOffset,n)})}releaseTexture(e,n){let t;if(this.config.reuseTextures&&(t=this.textureLookup.get(e.texture),t)){n&&this.textureLookup.delete(t);let o=this.inUseTextures.get(t);if(o){let i=o.indexOf(e.texture);if(i!==-1){o.splice(i,1);let s=this.idleTextures.get(t);s||(s=[],this.idleTextures.set(t,s)),s.push(e.texture)}}}(!t||n)&&(ye.verbose("TextureManager",`Deleting texture of size ${e.width}x${e.height}`),this.glContext.deleteTexture(e.texture))}toTensorData(e,n){switch(e){case"int16":return n instanceof Int16Array?n:Int16Array.from(n);case"int32":return n instanceof Int32Array?n:Int32Array.from(n);case"int8":return n instanceof Int8Array?n:Int8Array.from(n);case"uint16":return n instanceof Uint16Array?n:Uint16Array.from(n);case"uint32":return n instanceof Uint32Array?n:Uint32Array.from(n);case"uint8":case"bool":return n instanceof Uint8Array?n:Uint8Array.from(n);case"float32":return n instanceof Float32Array?n:Float32Array.from(n);case"float64":return n instanceof Float64Array?n:Float64Array.from(n);default:throw new Error(`TensorData type ${e} is not supported`)}}toTextureData(e,n){if(n)return n instanceof Float32Array?n:new Float32Array(n)}toEncoderType(e){return"float"}clearActiveTextures(){this.glContext.clearActiveTextures()}}});var co,If=S(()=>{"use strict";st();Ns();hl();cf();Tf();la();vf();co=class{constructor(e,n){this.backend=e;this.context=n;this.layoutStrategy=new to(e.glContext.maxTextureSize),this.programManager=new uo(this.context.profiler,e.glContext,this.layoutStrategy),this.textureManager=new lo(e.glContext,this.layoutStrategy,this.context.profiler,{reuseTextures:e.textureCacheMode==="full"}),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache=new Map,this.pack=e.pack,this.pack2unpackMap=new Map,this.unpack2packMap=new Map}createInferenceHandler(){return new Wn(this)}onGraphInitialized(e){let n=e.getValues().filter(t=>t.from===-1&&t.tensor).map(t=>t.tensor.dataId);this.initializers=new Set(n)}isInitializer(e){return this.initializers?this.initializers.has(e):!1}addInitializer(e){this.initializers.add(e)}getTextureData(e,n){return n?this.packedTextureDataCache.get(e):this.unpackedTextureDataCache.get(e)}setTextureData(e,n,t=!1){ye.verbose("WebGLSessionHandler","Storing Texture data in cache"),t?this.packedTextureDataCache.set(e,n):this.unpackedTextureDataCache.set(e,n)}dispose(){this.programManager.dispose(),this.textureManager.clearActiveTextures(),this.packedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.packedTextureDataCache=new Map,this.unpackedTextureDataCache.forEach(e=>this.textureManager.releaseTexture(e,!0)),this.unpackedTextureDataCache=new Map}resolve(e,n,t){let o=Rs(e,n,lf);return{impl:o.opImpl,context:o.opInit?o.opInit(e,t):e}}}});function Hw(r){let e=0;for(;e<r.length&&r[e]();++e);return e-1}var en,Sf=S(()=>{"use strict";Ke();Xr();Xr();$t();en=class{constructor(e,n){this.frameBufferBound=!1;this.itemsToPoll=[];this.gl=e,this.version=n,this.getExtensions(),this.vertexbuffer=this.createVertexbuffer(),this.framebuffer=this.createFramebuffer(),this.queryVitalParameters()}allocateTexture(e,n,t,o){let i=this.gl,s=i.createTexture();i.bindTexture(i.TEXTURE_2D,s),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MAG_FILTER,i.NEAREST),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE);let a=o?t.encode(o,e*n):null;return i.texImage2D(i.TEXTURE_2D,0,t.internalFormat,e,n,0,t.format,t.textureType,a),this.checkError(),s}updateTexture(e,n,t,o,i){let s=this.gl;s.bindTexture(s.TEXTURE_2D,e);let a=o.encode(i,n*t);s.texSubImage2D(s.TEXTURE_2D,0,0,0,n,t,o.format,o.textureType,a),this.checkError()}attachFramebuffer(e,n,t){let o=this.gl;o.bindTexture(o.TEXTURE_2D,e),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,e,0),this.checkError(),o.viewport(0,0,n,t),o.scissor(0,0,n,t)}readTexture(e,n,t,o,i,s){let a=this.gl;s||(s=1),this.frameBufferBound||this.attachFramebuffer(e,n,t);let u=this.getEncoder(i,s),l=u.allocate(n*t);return a.bindTexture(a.TEXTURE_2D,e),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,e,0),a.readPixels(0,0,n,t,a.RGBA,u.textureType,l),this.checkError(),u.decode(l,o)}isFramebufferReady(){return!0}getActiveTexture(){let e=this.gl;return`TEXTURE${e.getParameter(this.gl.ACTIVE_TEXTURE)-e.TEXTURE0}`}getTextureBinding(){return this.gl.getParameter(this.gl.TEXTURE_BINDING_2D)}getFramebufferBinding(){return this.gl.getParameter(this.gl.FRAMEBUFFER_BINDING)}setVertexAttributes(e,n){let t=this.gl;t.vertexAttribPointer(e,3,t.FLOAT,!1,20,0),t.enableVertexAttribArray(e),n!==-1&&(t.vertexAttribPointer(n,2,t.FLOAT,!1,20,12),t.enableVertexAttribArray(n)),this.checkError()}createProgram(e,n){let t=this.gl,o=t.createProgram();return t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),o}compileShader(e,n){let t=this.gl,o=t.createShader(n);if(!o)throw new Error(`createShader() returned null with type ${n}`);if(t.shaderSource(o,e),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS)===!1)throw new Error(`Failed to compile shader: ${t.getShaderInfoLog(o)}
Shader source:
${e}`);return o}deleteShader(e){this.gl.deleteShader(e)}bindTextureToUniform(e,n,t){let o=this.gl;o.activeTexture(o.TEXTURE0+n),this.checkError(),o.bindTexture(o.TEXTURE_2D,e),this.checkError(),o.uniform1i(t,n),this.checkError()}draw(){this.gl.drawArrays(this.gl.TRIANGLE_STRIP,0,4),this.checkError()}checkError(){if(j.debug){let e=this.gl,n=e.getError(),t="";switch(n){case e.NO_ERROR:return;case e.INVALID_ENUM:t="INVALID_ENUM";break;case e.INVALID_VALUE:t="INVALID_VALUE";break;case e.INVALID_OPERATION:t="INVALID_OPERATION";break;case e.INVALID_FRAMEBUFFER_OPERATION:t="INVALID_FRAMEBUFFER_OPERATION";break;case e.OUT_OF_MEMORY:t="OUT_OF_MEMORY";break;case e.CONTEXT_LOST_WEBGL:t="CONTEXT_LOST_WEBGL";break;default:t=`Unknown WebGL Error: ${n.toString(16)}`}throw new Error(t)}}deleteTexture(e){this.gl.deleteTexture(e)}deleteProgram(e){this.gl.deleteProgram(e)}getEncoder(e,n,t=0){if(this.version===2)return new Gn(this.gl,n);switch(e){case"float":return t===1||this.isRenderFloat32Supported?new jr(this.gl,n):new jr(this.gl,n,this.textureHalfFloatExtension.HALF_FLOAT_OES);case"int":throw new Error("not implemented");case"byte":return new Un(this.gl,n);default:throw new Error(`Invalid dataType: ${e}`)}}clearActiveTextures(){let e=this.gl;for(let n=0;n<this.maxTextureImageUnits;++n)e.activeTexture(e.TEXTURE0+n),e.bindTexture(e.TEXTURE_2D,null)}dispose(){if(this.disposed)return;let e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(this.framebuffer),e.bindBuffer(e.ARRAY_BUFFER,null),e.deleteBuffer(this.vertexbuffer),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,null),e.finish(),this.disposed=!0}createDefaultGeometry(){return new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0])}createVertexbuffer(){let e=this.gl,n=e.createBuffer();if(!n)throw new Error("createBuffer() returned null");let t=this.createDefaultGeometry();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),this.checkError(),n}createFramebuffer(){let e=this.gl.createFramebuffer();if(!e)throw new Error("createFramebuffer returned null");return e}queryVitalParameters(){let e=this.gl;if(this.isFloatTextureAttachableToFrameBuffer=this.checkFloatTextureAttachableToFrameBuffer(),this.isRenderFloat32Supported=this.checkRenderFloat32(),this.isFloat32DownloadSupported=this.checkFloat32Download(),this.version===1&&!this.textureHalfFloatExtension&&!this.isRenderFloat32Supported)throw new Error("both float32 and float16 TextureType are not supported");this.isBlendSupported=!this.isRenderFloat32Supported||this.checkFloat32Blend(),this.maxTextureSize=e.getParameter(e.MAX_TEXTURE_SIZE),this.maxTextureImageUnits=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),this.version}getExtensions(){this.version===2?(this.colorBufferFloatExtension=this.gl.getExtension("EXT_color_buffer_float"),this.disjointTimerQueryWebgl2Extension=this.gl.getExtension("EXT_disjoint_timer_query_webgl2")):(this.textureFloatExtension=this.gl.getExtension("OES_texture_float"),this.textureHalfFloatExtension=this.gl.getExtension("OES_texture_half_float"))}checkFloatTextureAttachableToFrameBuffer(){let e=this.gl,n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n);let t=this.version===2?e.RGBA32F:e.RGBA;e.texImage2D(e.TEXTURE_2D,0,t,1,1,0,e.RGBA,e.FLOAT,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindTexture(e.TEXTURE_2D,null),e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteTexture(n),e.deleteFramebuffer(o),i}checkRenderFloat32(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension)return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Download(){if(this.version===2){if(!this.colorBufferFloatExtension)return!1}else if(!this.textureFloatExtension||!this.gl.getExtension("WEBGL_color_buffer_float"))return!1;return this.isFloatTextureAttachableToFrameBuffer}checkFloat32Blend(){let e=this.gl,n,t,o,i,s;try{n=e.createTexture(),t=e.createFramebuffer(),e.bindTexture(e.TEXTURE_2D,n);let a=this.version===2?e.RGBA32F:e.RGBA;return e.texImage2D(e.TEXTURE_2D,0,a,1,1,0,e.RGBA,e.FLOAT,null),e.bindFramebuffer(e.FRAMEBUFFER,t),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0),e.enable(e.BLEND),o=e.createShader(e.VERTEX_SHADER),!o||(e.shaderSource(o,"void main(){}"),e.compileShader(o),i=e.createShader(e.FRAGMENT_SHADER),!i)||(e.shaderSource(i,"precision highp float;void main(){gl_FragColor=vec4(0.5);}"),e.compileShader(i),s=e.createProgram(),!s)?!1:(e.attachShader(s,o),e.attachShader(s,i),e.linkProgram(s),e.useProgram(s),e.drawArrays(e.POINTS,0,1),e.getError()===e.NO_ERROR)}finally{e.disable(e.BLEND),s&&e.deleteProgram(s),o&&e.deleteShader(o),i&&e.deleteShader(i),t&&(e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(t)),n&&(e.bindTexture(e.TEXTURE_2D,null),e.deleteTexture(n))}}beginTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension,t=e.createQuery();return e.beginQuery(n.TIME_ELAPSED_EXT,t),t}else throw new Error("WebGL1 profiling currently not supported.")}endTimer(){if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let e=this.gl,n=this.disjointTimerQueryWebgl2Extension;e.endQuery(n.TIME_ELAPSED_EXT);return}else throw new Error("WebGL1 profiling currently not supported")}isTimerResultAvailable(e){let n=!1,t=!1;if(this.version===2&&this.disjointTimerQueryWebgl2Extension){let o=this.gl,i=this.disjointTimerQueryWebgl2Extension;n=o.getQueryParameter(e,o.QUERY_RESULT_AVAILABLE),t=o.getParameter(i.GPU_DISJOINT_EXT)}else throw new Error("WebGL1 profiling currently not supported");return n&&!t}getTimerResult(e){let n=0;if(this.version===2){let t=this.gl;n=t.getQueryParameter(e,t.QUERY_RESULT),t.deleteQuery(e)}else throw new Error("WebGL1 profiling currently not supported");return n/1e6}async waitForQueryAndGetTime(e){return await Li(()=>this.isTimerResultAvailable(e)),this.getTimerResult(e)}async createAndWaitForFence(){let e=this.createFence(this.gl);return this.pollFence(e)}createFence(e){let n,t=e,o=t.fenceSync(t.SYNC_GPU_COMMANDS_COMPLETE,0);return e.flush(),o===null?n=()=>!0:n=()=>{let i=t.clientWaitSync(o,0,0);return i===t.ALREADY_SIGNALED||i===t.CONDITION_SATISFIED},{query:o,isFencePassed:n}}async pollFence(e){return new Promise(n=>{this.addItemToPoll(()=>e.isFencePassed(),()=>n())})}pollItems(){let e=Hw(this.itemsToPoll.map(n=>n.isDoneFn));for(let n=0;n<=e;++n){let{resolveFn:t}=this.itemsToPoll[n];t()}this.itemsToPoll=this.itemsToPoll.slice(e+1)}async addItemToPoll(e,n){this.itemsToPoll.push({isDoneFn:e,resolveFn:n}),!(this.itemsToPoll.length>1)&&await Li(()=>(this.pollItems(),this.itemsToPoll.length===0))}}});function da(r){let e;if((!r||r==="webgl2")&&"webgl2"in Dr?e=Dr.webgl2:(!r||r==="webgl")&&"webgl"in Dr&&(e=Dr.webgl),!e)try{let t=Kw();e=$f(t,r)}catch{let o=qw();e=$f(o,r)}r=r||e.version===1?"webgl":"webgl2";let n=e.gl;return Dr[r]=e,n.isContextLost()?(delete Dr[r],da(r)):(n.disable(n.DEPTH_TEST),n.disable(n.STENCIL_TEST),n.disable(n.BLEND),n.disable(n.DITHER),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SAMPLE_COVERAGE),n.enable(n.SCISSOR_TEST),n.enable(n.CULL_FACE),n.cullFace(n.BACK),e)}function $f(r,e){let n={alpha:!1,depth:!1,antialias:!1,stencil:!1,preserveDrawingBuffer:!1,premultipliedAlpha:!1,failIfMajorPerformanceCaveat:!1},t,o=n;if((!e||e==="webgl2")&&(t=r.getContext("webgl2",o),t))try{return new en(t,2)}catch(i){ye.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl2'. Error: ${i}`)}if((!e||e==="webgl")&&(t=r.getContext("webgl",o)||r.getContext("experimental-webgl",o),t))try{return new en(t,1)}catch(i){ye.warning("GlContextFactory",`failed to create WebGLContext using contextId 'webgl' or 'experimental-webgl'. Error: ${i}`)}throw new Error("WebGL is not supported")}function qw(){if(typeof document>"u")throw new TypeError("failed to create canvas: document is not supported");let r=document.createElement("canvas");return r.width=1,r.height=1,r}function Kw(){if(typeof OffscreenCanvas>"u")throw new TypeError("failed to create offscreen canvas: OffscreenCanvas is not supported");return new OffscreenCanvas(1,1)}var Dr,Af=S(()=>{"use strict";st();Sf();Dr={}});var fo,Pf=S(()=>{"use strict";Ke();st();If();Af();fo=class{get contextId(){return j.webgl.contextId}set contextId(e){j.webgl.contextId=e}get matmulMaxBatchSize(){return j.webgl.matmulMaxBatchSize}set matmulMaxBatchSize(e){j.webgl.matmulMaxBatchSize=e}get textureCacheMode(){return j.webgl.textureCacheMode}set textureCacheMode(e){j.webgl.textureCacheMode=e}get pack(){return j.webgl.pack}set pack(e){j.webgl.pack=e}get async(){return j.webgl.async}set async(e){j.webgl.async=e}initialize(){try{return this.glContext=da(this.contextId),typeof this.matmulMaxBatchSize!="number"&&(this.matmulMaxBatchSize=16),typeof this.textureCacheMode!="string"&&(this.textureCacheMode="full"),typeof this.pack!="boolean"&&(this.pack=!1),typeof this.async!="boolean"&&(this.async=!1),ye.setWithEnv(j),j.webgl.context||Object.defineProperty(j.webgl,"context",{value:this.glContext.gl}),ye.verbose("WebGLBackend",`Created WebGLContext: ${typeof this.glContext} with matmulMaxBatchSize: ${this.matmulMaxBatchSize}; textureCacheMode: ${this.textureCacheMode}; pack: ${this.pack}; async: ${this.async}.`),!0}catch(e){return ye.warning("WebGLBackend",`Unable to initialize WebGLBackend. ${e}`),!1}}createSessionHandler(e){return new co(this,e)}dispose(){this.glContext.dispose()}}});async function fa(r){if(r){let e=typeof r=="string"?[r]:r;for(let n of e){let t=Of.get(n);if(t)return t;let o=await Xw(n);if(o)return o}}else return fa(["webgl"]);throw new Error("no available backend to use")}async function Xw(r){let e=jw;if(typeof e[r]<"u"&&Zw(e[r])){let n=e[r],t=n.initialize();if(typeof t=="object"&&"then"in t&&(t=await t),t)return Of.set(r,n),n}}function Zw(r){let e=r;return"initialize"in e&&typeof e.initialize=="function"&&"createSessionHandler"in e&&typeof e.createSessionHandler=="function"&&"dispose"in e&&typeof e.dispose=="function"}var Of,jw,Ef=S(()=>{"use strict";Pf();Of=new Map,jw={webgl:new fo}});var pa,po,Cf=S(()=>{"use strict";st();pa=class{constructor(e,n){this.op=e;this.node=n}},po=class{constructor(e,n,t){this.graph=e;this.profiler=t;this.initialize(n)}initialize(e){this.profiler.event("session","ExecutionPlan.initialize",()=>{let n=this.graph.getNodes();if(n.length!==e.length)throw new Error("The size of nodes and OPs do not match.");this._ops=e.map((t,o)=>new pa(t,n[o])),this.reset(),this._starter=[],this._ops.forEach((t,o)=>{let i=!0;for(let s of t.node.inputs)if(!this._values[s]&&this.graph.getInputIndices().indexOf(s)===-1){i=!1;break}i&&this._starter.push(o)})})}reset(){this._values=this.graph.getValues().map(e=>e.tensor)}async execute(e,n){return this.profiler.event("session","ExecutionPlan.execute",async()=>{this.reset();let t=e.createInferenceHandler(),o=this.graph.getInputIndices();if(n.length!==o.length)throw new Error(`number of input tensors don't match the number of inputs to the model: actual: ${n.length} expected: ${o.length}`);n.forEach((c,d)=>{let f=o[d];this._values[f]=c});let i=this._starter.slice(0),s=this.graph.getValues(),a=this.graph.getNodes(),u=0;for(;u<i.length;){let c=i[u++],d=this._ops[c],f=d.node.inputs.map(b=>this._values[b]);if(f.indexOf(void 0)!==-1)throw new Error(`unresolved input detected: op: ${d.node}`);let m=f;ye.verbose("ExecPlan",`Running op:${d.node.name} (${m.map((b,y)=>`'${d.node.inputs[y]}': ${b.type}[${b.dims.join(",")}]`).join(", ")})`);let p=await this.profiler.event("node",d.node.name,async()=>d.op.impl(t,m,d.op.context));if(p.length!==d.node.outputs.length)throw new Error("the size of output does not match model definition.");p.forEach((b,y)=>{let g=d.node.outputs[y];if(this._values[g])throw new Error(`output [${g}] already has value: op:${d.node.name}`);this._values[g]=b});let h=new Set;p.forEach((b,y)=>{let g=d.node.outputs[y];for(let x of s[g].to){let _=a[x],v=!0;for(let I of _.inputs)if(!this._values[I]){v=!1;break}v&&h.add(x)}}),i.push(...h)}let l=[];for(let c=0;c<this.graph.getOutputIndices().length;c++){let d=this.graph.getOutputIndices()[c],f=this._values[d];if(f===void 0)throw new Error(`required output [${d}] does not have value`);d===0?await f.getData():f.data,l.push(f)}return ye.verbose("ExecPlan","disposing of inferenceHandler"),t.dispose(),l})}}});var ue,mt,tn,kf=S(()=>{"use strict";Gr();ue=_r(Sr());lr();be();mt=W.experimental.fbs,tn=class r{constructor(e){if(this._attributes=new Map,e!=null){for(let n of e)n instanceof ue.onnx.AttributeProto?this._attributes.set(n.name,[r.getValue(n),r.getType(n)]):n instanceof mt.Attribute&&this._attributes.set(n.name(),[r.getValue(n),r.getType(n)]);if(this._attributes.size<e.length)throw new Error("duplicated attribute names")}}set(e,n,t){this._attributes.set(e,[t,n])}delete(e){this._attributes.delete(e)}getFloat(e,n){return this.get(e,"float",n)}getInt(e,n){return this.get(e,"int",n)}getString(e,n){return this.get(e,"string",n)}getTensor(e,n){return this.get(e,"tensor",n)}getFloats(e,n){return this.get(e,"floats",n)}getInts(e,n){return this.get(e,"ints",n)}getStrings(e,n){return this.get(e,"strings",n)}getTensors(e,n){return this.get(e,"tensors",n)}get(e,n,t){let o=this._attributes.get(e);if(o===void 0){if(t!==void 0)return t;throw new Error(`required attribute not found: ${e}`)}if(o[1]!==n)throw new Error(`type mismatch: expected ${n} but got ${o[1]}`);return o[0]}static getType(e){let n=e instanceof ue.onnx.AttributeProto?e.type:e.type();switch(n){case ue.onnx.AttributeProto.AttributeType.FLOAT:return"float";case ue.onnx.AttributeProto.AttributeType.INT:return"int";case ue.onnx.AttributeProto.AttributeType.STRING:return"string";case ue.onnx.AttributeProto.AttributeType.TENSOR:return"tensor";case ue.onnx.AttributeProto.AttributeType.FLOATS:return"floats";case ue.onnx.AttributeProto.AttributeType.INTS:return"ints";case ue.onnx.AttributeProto.AttributeType.STRINGS:return"strings";case ue.onnx.AttributeProto.AttributeType.TENSORS:return"tensors";default:throw new Error(`attribute type is not supported yet: ${ue.onnx.AttributeProto.AttributeType[n]}`)}}static getValue(e){let n=e instanceof ue.onnx.AttributeProto?e.type:e.type();if(n===ue.onnx.AttributeProto.AttributeType.GRAPH||n===ue.onnx.AttributeProto.AttributeType.GRAPHS)throw new Error("graph attribute is not supported yet");let t=this.getValueNoCheck(e);if(n===ue.onnx.AttributeProto.AttributeType.INT&&et.isLong(t))return et.longToNumber(t);if(n===ue.onnx.AttributeProto.AttributeType.INTS){let o=t,i=new Array(o.length);for(let s=0;s<o.length;s++){let a=o[s];i[s]=et.longToNumber(a)}return i}if(n===ue.onnx.AttributeProto.AttributeType.TENSOR)return e instanceof ue.onnx.AttributeProto?Le.fromProto(t):Le.fromOrtTensor(t);if(n===ue.onnx.AttributeProto.AttributeType.TENSORS){if(e instanceof ue.onnx.AttributeProto)return t.map(i=>Le.fromProto(i));if(e instanceof mt.Attribute)return t.map(i=>Le.fromOrtTensor(i))}return n===ue.onnx.AttributeProto.AttributeType.STRING&&e instanceof ue.onnx.AttributeProto?Kr(t):n===ue.onnx.AttributeProto.AttributeType.STRINGS&&e instanceof ue.onnx.AttributeProto?t.map(Kr):t}static getValueNoCheck(e){return e instanceof ue.onnx.AttributeProto?this.getValueNoCheckFromOnnxFormat(e):this.getValueNoCheckFromOrtFormat(e)}static getValueNoCheckFromOnnxFormat(e){switch(e.type){case ue.onnx.AttributeProto.AttributeType.FLOAT:return e.f;case ue.onnx.AttributeProto.AttributeType.INT:return e.i;case ue.onnx.AttributeProto.AttributeType.STRING:return e.s;case ue.onnx.AttributeProto.AttributeType.TENSOR:return e.t;case ue.onnx.AttributeProto.AttributeType.GRAPH:return e.g;case ue.onnx.AttributeProto.AttributeType.FLOATS:return e.floats;case ue.onnx.AttributeProto.AttributeType.INTS:return e.ints;case ue.onnx.AttributeProto.AttributeType.STRINGS:return e.strings;case ue.onnx.AttributeProto.AttributeType.TENSORS:return e.tensors;case ue.onnx.AttributeProto.AttributeType.GRAPHS:return e.graphs;default:throw new Error(`unsupported attribute type: ${ue.onnx.AttributeProto.AttributeType[e.type]}`)}}static getValueNoCheckFromOrtFormat(e){switch(e.type()){case mt.AttributeType.FLOAT:return e.f();case mt.AttributeType.INT:return e.i();case mt.AttributeType.STRING:return e.s();case mt.AttributeType.TENSOR:return e.t();case mt.AttributeType.GRAPH:return e.g();case mt.AttributeType.FLOATS:return e.floatsArray();case mt.AttributeType.INTS:{let n=[];for(let t=0;t<e.intsLength();t++)n.push(e.ints(t));return n}case mt.AttributeType.STRINGS:{let n=[];for(let t=0;t<e.stringsLength();t++)n.push(e.strings(t));return n}case mt.AttributeType.TENSORS:{let n=[];for(let t=0;t<e.tensorsLength();t++)n.push(e.tensors(t));return n}default:throw new Error(`unsupported attribute type: ${mt.AttributeType[e.type()]}`)}}}});var ha,mo,ga,Ot,ho,ma,Df=S(()=>{"use strict";kf();Gr();ha=_r(Sr());lr();be();mo=W.experimental.fbs,ga={from:(r,e)=>new ma(r,e)},Ot=class{constructor(e){this._from=void 0,this._to=[],this.tensor=void 0,this.type=void 0,e&&(this.type=He.tensorValueTypeFromProto(e.type.tensorType))}get from(){return this._from}get to(){return this._to}},ho=class{constructor(e,n){e instanceof ha.onnx.NodeProto?(this.name=e.name,this.opType=e.opType,this.attributes=new tn(e.attribute)):e instanceof mo.Node&&(this.name=n??e.name(),this.opType=e.opType(),this.attributes=new tn(He.tensorAttributesFromORTFormat(e))),this.inputs=[],this.outputs=[],this.executeNode=!0}},ma=class{constructor(e,n){if(!e)throw new TypeError("graph is empty");this.buildGraph(e),this.transformGraph(n),this.checkIsAcyclic()}getInputIndices(){return this._allInputIndices}getInputNames(){return this._allInputNames}getOutputIndices(){return this._allOutputIndices}getOutputNames(){return this._allOutputNames}getValues(){return this._allData}getNodes(){return this._nodes}buildGraph(e){if(e instanceof ha.onnx.GraphProto)this.buildGraphFromOnnxFormat(e);else if(e instanceof mo.Graph)this.buildGraphFromOrtFormat(e);else throw new TypeError("Graph type is not supported.")}buildGraphFromOnnxFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map;if(!e.input)throw new Error("missing information in graph: input");let o=[];for(let i of e.input){if(n.has(i.name))throw new Error(`duplicated input name: ${i.name}`);let s=this._allData.push(new Ot(i))-1;n.set(i.name,s),o.push(i.name)}if(!e.initializer)throw new Error("missing information in graph: initializer");for(let i of e.initializer){let s=n.get(i.name);if(s===void 0){let a=new Ot;a.type={shape:{dims:He.tensorDimsFromProto(i.dims)},tensorType:He.tensorDataTypeFromProto(i.dataType)},s=this._allData.push(a)-1,n.set(i.name,s)}this._allData[s]._from=-1,this._allData[s].tensor=Le.fromProto(i)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));if(!e.output)throw new Error("missing information in graph: output");for(let i of e.output){if(n.has(i.name))throw new Error(`duplicated output name: ${i.name}`);let s=this._allData.push(new Ot(i))-1;n.set(i.name,s),this._allOutputIndices.push(s),this._allOutputNames.push(i.name)}if(!e.node)throw new Error("missing information in graph: node");for(let i of e.node){if(!i.name)for(let a=0;;a++){let u=`unnamed_${i.opType}_${a}`;if(!t.has(u)){i.name=u;break}}if(t.has(i.name))throw new Error(`duplicated node name: ${i.name}`);let s=this._nodes.push(new ho(i))-1;t.set(i.name,s)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.output)throw new Error(`missing output for node: ${a.name}`);for(let u of a.output){let l=n.get(u);if(typeof l>"u"&&(l=this._allData.push(new Ot)-1,n.set(u,l)),s.outputs.push(l),this._allData[l]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${l}`);if(this._allData[l]._from=i,a.opType==="Constant"){if(!a.attribute||a.attribute.length!==1||!a.attribute[0].t)throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(!a.output||a.output.length!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[l]._from=-1,this._allData[l].tensor=Le.fromProto(a.attribute[0].t)}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.node[i];if(!a.input)throw new Error(`missing input for node: ${a.name}`);for(let u of a.input){let l=n.get(u);if(typeof l>"u"){if(u===""&&(a.input.length===3||a.input.length===4)&&a.opType==="Resize")continue;throw new Error(`unrecognized input '${u}' for node: ${a.name}`)}s.inputs.push(l),this._allData[l]._to.push(i)}}return!0}buildGraphFromOrtFormat(e){let n=new Map;this._allData=[],this._allInputIndices=[],this._allInputNames=[],this._allOutputIndices=[],this._allOutputNames=[],this._nodes=[];let t=new Map,o=[];for(let i=0;i<e.inputsLength();i++){let s=e.inputs(i);if(n.has(s))throw new Error(`duplicated input name: ${s}`);for(let a=0;a<e.nodeArgsLength();a++)if(e.nodeArgs(a)?.name()===s){let u=new Ot;if(e.nodeArgs(a)?.type()?.valueType()!==mo.TypeInfoValue.tensor_type)throw new Error("Unexpected value type for the nodeArg.");let c=e.nodeArgs(a).type().value(new mo.TensorTypeAndShape),d=He.tensorDataTypeFromProto(c.elemType()),f=c.shape(),m=[];for(let h=0;h<f.dimLength();h++)m.push(et.longToNumber(f.dim(h).value().dimValue()));u.type={shape:{dims:m},tensorType:d};let p=this._allData.push(u)-1;n.set(s,p),o.push(s)}}for(let i=0;i<e.initializersLength();i++){let s=e.initializers(i),a=n.get(s.name());if(a===void 0){let u=new Ot,l=He.tensorDimsFromORTFormat(s),c=He.tensorDataTypeFromProto(s.dataType());u.type={shape:{dims:l},tensorType:c},a=this._allData.push(u)-1,n.set(s.name(),a)}this._allData[a]._from=-1,this._allData[a].tensor=Le.fromOrtTensor(s)}for(let i=0;i<this._allData.length;i++)this._allData[i].tensor||(this._allInputIndices.push(i),this._allInputNames.push(o[i]));for(let i=0;i<e.outputsLength();i++){let s=e.outputs(i);if(n.has(s))throw new Error(`duplicated output name: ${s}`);let a=this._allData.push(new Ot)-1;n.set(s,a),this._allOutputIndices.push(a),this._allOutputNames.push(s)}if(!e.nodes)throw new Error("missing information in graph: node");for(let i=0;i<e.nodesLength();i++){let s=e.nodes(i),a=s.name();if(!a)for(let l=0;a=`unnamed_${s.opType()}_${l}`,!!t.has(a);l++);if(t.has(a))throw new Error(`duplicated node name: ${a}`);let u=this._nodes.push(new ho(s,a))-1;t.set(a,u)}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a==null)throw new Error(`No node exists at index ${i}`);if(a?.outputsLength()===0)throw new Error(`missing output for node: ${a.name}`);for(let u=0;u<a?.outputsLength();u++){let l=a?.outputs(u),c=n.get(l);if(typeof c>"u"&&(c=this._allData.push(new Ot)-1,n.set(l,c)),s.outputs.push(c),this._allData[c]._from!==void 0)throw new Error(`multiple nodes output to one data value: ${c}`);if(this._allData[c]._from=i,a.opType()==="Constant"){if(a.attributesLength()!==1||!a.attributes(0).t())throw new Error("missing attributes or missing tensor value in attributes for this Constant operator");if(a.outputsLength()!==1)throw new Error("missing output or incorrect number of outputs for this Constant operator");s.outputs.pop(),s.executeNode=!1,this._allData[c]._from=-1,this._allData[c].tensor=Le.fromOrtTensor(a.attributes(0).t())}}}for(let i=0;i<this._nodes.length;i++){let s=this._nodes[i],a=e.nodes(i);if(a.inputsLength()===0)throw new Error(`missing input for node: ${a.name}`);for(let u=0;u<a.inputsLength();u++){let l=a.inputs(u),c=n.get(l);if(typeof c>"u")throw new Error(`unrecognized input '${l}' for node: ${a.name()}`);s.inputs.push(c),this._allData[c]._to.push(i)}}}checkIsAcyclic(){let e=new Set;this._allInputIndices.forEach(o=>{this._allData[o]._to.forEach(s=>{e.add(s)})});let n=Array.from(e),t=new Array(this._nodes.length).fill("white");for(;n.length>0;){let o=n.pop();t[o]==="gray"?t[o]="black":(n.push(o),t[o]="gray",this._nodes[o].outputs.forEach(i=>{let s=this._allData[i];if(typeof s.tensor<"u")throw new Error("node outputs should not be initialized");if(s._from!==o)throw new Error("from property of the Value object doesn't match index of Node being processed");s._to.forEach(a=>{if(t[a]==="gray")throw new Error("model graph is cyclic");t[a]==="white"&&n.push(a)})}))}}transformGraph(e){this.removeAllIdentityNodes(),this.removeAllDropoutNodes(),this.fuseConvActivationNodes(),e&&e.transformGraph(this),this.finalizeGraph()}finalizeGraph(){let e=0,n=new Array(this._nodes.length,0),t=0;for(let o=0;o<this._nodes.length;o++)n[o]=t,this._nodes[o].executeNode?(t!==o&&(this._nodes[t]=this._nodes[o]),t++):this._nodes[o].outputs.forEach(i=>{this._allData[i]._from=-2});this._nodes.splice(t,this._nodes.length-t);for(let o=0;o<this._allData.length;o++){let i=this._allData[o];i._from!==void 0&&i._from!==-1&&i._from!==-2&&(i._from=n[i._from]);for(let s=0;s<i._to.length;s++)if(i._to[s]>=0)i._to[s]=n[i._to[s]];else throw new Error("Trying to update a removed node")}e=0;for(let o=0;o<this._allData.length;o++){if(this._allData[o].from===-2&&this._allOutputIndices.indexOf(o+e)===-1){e++,this._allData.splice(o,1),o--;continue}if(e>0){let i=-1;this._allData[o].from!==void 0&&this._allData[o].from!==-1?(i=this._nodes[this._allData[o].from].outputs.indexOf(o+e),i!==-1&&(this._nodes[this._allData[o].from].outputs[i]=o)):(i=this._allInputIndices.indexOf(o+e),i!==-1&&(this._allInputIndices[i]=o)),this._allData[o].to.forEach(s=>{i=this._nodes[s].inputs.indexOf(o+e),i!==-1&&(this._nodes[s].inputs[i]=o)}),this._allData[o].to.length===0&&(i=this._allOutputIndices.indexOf(o+e),i!==-1&&(this._allOutputIndices[i]=o))}}}deleteNode(e){let n=this._nodes[e];if(n.outputs.length>1){for(let a=1;a<n.outputs.length;a++)if(this._allData[n.outputs[a]].to.length>0)throw new Error("Node deletion with more than one output connected to other nodes is not supported. ")}n.executeNode=!1;let t=n.inputs[0],o=n.outputs[0],i=this._allData[o].to;for(let a=0;a<n.inputs.length;a++){let u=this._allData[n.inputs[a]].to.indexOf(e);if(u===-1)throw new Error("The Value object doesn't have the current Node in it's 'to' property ");this._allData[n.inputs[a]].to.splice(u,1)}this._allData[o]._to=[];let s=this._allOutputIndices.indexOf(o);if(s!==-1&&(this._allOutputIndices[s]=t),i&&i.length>0)for(let a of i){let u=this._nodes[a].inputs.indexOf(o);if(u===-1)throw new Error("The Node object doesn't have the output Value in it's 'inputs' property ");this._nodes[a].inputs[u]=t,this._allData[t].to.push(a)}}removeAllDropoutNodes(){let e=0;for(let n of this._nodes){if(n.opType==="Dropout"){if(n.inputs.length!==1)throw new Error("Dropout nodes should only contain one input. ");if(n.outputs.length!==1&&n.outputs.length!==2)throw new Error("Dropout nodes should contain either 1 or 2 output(s)");if(n.outputs.length===2&&this._allData[n.outputs[1]]._to.length!==0)throw new Error("Dropout nodes's second output should not be referenced by other nodes");this.deleteNode(e)}e++}}removeAllIdentityNodes(){let e=0;for(let n of this._nodes)n.opType==="Identity"&&this.deleteNode(e),e++}isActivation(e){switch(e.opType){case"Relu":case"Sigmoid":case"Clip":return!0;default:return!1}}fuseConvActivationNodes(){for(let e of this._nodes)if(e.opType==="Conv"){let n=this._allData[e.outputs[0]]._to;if(n.length===1&&this.isActivation(this._nodes[n[0]])){let t=this._nodes[n[0]];if(t.opType==="Clip")if(t.inputs.length===1)try{e.attributes.set("activation_params","floats",[t.attributes.getFloat("min"),t.attributes.getFloat("max")])}catch{e.attributes.set("activation_params","floats",[sr,ur])}else if(t.inputs.length>=3&&this._allData[t.inputs[1]].tensor!==void 0&&this._allData[t.inputs[2]].tensor!==void 0)e.attributes.set("activation_params","floats",[this._allData[t.inputs[1]].tensor.floatData[0],this._allData[t.inputs[2]].tensor.floatData[0]]);else continue;e.attributes.set("activation","string",t.opType),this.deleteNode(n[0])}}}}});var Bf,Jw,go,Lf=S(()=>{"use strict";Ln();Df();Gr();Bf=_r(Sr());be();Jw=W.experimental.fbs,go=class{constructor(){}load(e,n,t){let o;if(!t)try{this.loadFromOnnxFormat(e,n);return}catch(i){if(t!==void 0)throw i;o=i}try{this.loadFromOrtFormat(e,n)}catch(i){throw t!==void 0?i:new Error(`Failed to load model as ONNX format: ${o}
as ORT format: ${i}`)}}loadFromOnnxFormat(e,n){let t=Bf.onnx.ModelProto.decode(e);if(et.longToNumber(t.irVersion)<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=t.opsetImport.map(i=>({domain:i.domain,version:et.longToNumber(i.version)})),this._graph=ga.from(t.graph,n)}loadFromOrtFormat(e,n){let t=new A.ByteBuffer(e),o=Jw.InferenceSession.getRootAsInferenceSession(t).model();if(et.longToNumber(o.irVersion())<3)throw new Error("only support ONNX model with IR_VERSION>=3");this._opsets=[];for(let s=0;s<o.opsetImportLength();s++){let a=o.opsetImport(s);this._opsets.push({domain:a?.domain(),version:et.longToNumber(a.version())})}this._graph=ga.from(o.graph(),n)}get graph(){return this._graph}get opsets(){return this._opsets}}});var bo,zf=S(()=>{"use strict";Ef();Cf();st();Lf();bo=class{constructor(e={}){this._initialized=!1,this.backendHint=e.backendHint,this.profiler=Dn.create(e.profiler),this.context={profiler:this.profiler,graphInputTypes:[],graphInputDims:[]}}get inputNames(){return this._model.graph.getInputNames()}get outputNames(){return this._model.graph.getOutputNames()}startProfiling(){this.profiler.start()}endProfiling(){this.profiler.stop()}async loadModel(e,n,t){await this.profiler.event("session","Session.loadModel",async()=>{let o=await fa(this.backendHint);if(this.sessionHandler=o.createSessionHandler(this.context),this._model=new go,typeof e=="string"){let i=e.endsWith(".ort");{let a=await(await fetch(e)).arrayBuffer();this.initialize(new Uint8Array(a),i)}}else if(ArrayBuffer.isView(e))this.initialize(e);else{let i=new Uint8Array(e,n||0,t||e.byteLength);this.initialize(i)}})}initialize(e,n){if(this._initialized)throw new Error("already initialized");this.profiler.event("session","Session.initialize",()=>{let t=this.sessionHandler.transformGraph?this.sessionHandler:void 0;this._model.load(e,t,n),this.sessionHandler.onGraphInitialized&&this.sessionHandler.onGraphInitialized(this._model.graph),this.initializeOps(this._model.graph),this._executionPlan=new po(this._model.graph,this._ops,this.profiler)}),this._initialized=!0}async run(e){if(!this._initialized)throw new Error("session not initialized yet");return this.profiler.event("session","Session.run",async()=>{let n=this.normalizeAndValidateInputs(e),t=await this._executionPlan.execute(this.sessionHandler,n);return this.createOutput(t)})}normalizeAndValidateInputs(e){let n=this._model.graph.getInputNames();if(Array.isArray(e)){if(e.length!==n.length)throw new Error(`incorrect input array length: expected ${n.length} but got ${e.length}`)}else{if(e.size!==n.length)throw new Error(`incorrect input map size: expected ${n.length} but got ${e.size}`);let t=new Array(e.size),o=0;for(let i=0;i<n.length;++i){let s=e.get(n[i]);if(!s)throw new Error(`missing input tensor for: '${name}'`);t[o++]=s}e=t}if(!this.context.graphInputTypes||this.context.graphInputTypes.length===0||!this.context.graphInputDims||this.context.graphInputDims.length===0){let t=this._model.graph.getInputIndices(),o=this._model.graph.getValues(),i=new Array(t.length);for(let s=0;s<t.length;++s){let a=o[t[s]];i[s]=a.type.shape.dims,this.context.graphInputTypes.push(a.type.tensorType),this.context.graphInputDims.push(e[s].dims)}this.validateInputTensorDims(i,e,!0)}else this.validateInputTensorDims(this.context.graphInputDims,e,!1);return this.validateInputTensorTypes(this.context.graphInputTypes,e),e}validateInputTensorTypes(e,n){for(let t=0;t<n.length;t++){let o=e[t],i=n[t].type;if(o!==i)throw new Error(`input tensor[${t}] check failed: expected type '${o}' but got ${i}`)}}validateInputTensorDims(e,n,t){for(let o=0;o<n.length;o++){let i=e[o],s=n[o].dims;if(!this.compareTensorDims(i,s,t))throw new Error(`input tensor[${o}] check failed: expected shape '[${i.join(",")}]' but got [${s.join(",")}]`)}}compareTensorDims(e,n,t){if(e.length!==n.length)return!1;for(let o=0;o<e.length;++o)if(e[o]!==n[o]&&(!t||e[o]!==0))return!1;return!0}createOutput(e){let n=this._model.graph.getOutputNames();if(e.length!==n.length)throw new Error("expected number of outputs do not match number of generated outputs");let t=new Map;for(let o=0;o<n.length;++o)t.set(n[o],e[o]);return t}initializeOps(e){let n=e.getNodes();this._ops=new Array(n.length);for(let t=0;t<n.length;t++)this._ops[t]=this.sessionHandler.resolve(n[t],this._model.opsets,e)}}});var yo,Rf=S(()=>{"use strict";Ke();lr();yo=class{constructor(e){this.session=e;this.inputNames=this.session.inputNames,this.outputNames=this.session.outputNames}async dispose(){}async run(e,n,t){let o=new Map;for(let a in e)if(Object.hasOwnProperty.call(e,a)){let u=e[a];o.set(a,new Le(u.dims,u.type,void 0,void 0,u.data))}let i=await this.session.run(o),s={};return i.forEach((a,u)=>{s[u]=new Re(a.type,a.data,a.dims)}),s}startProfiling(){this.session.startProfiling()}endProfiling(){this.session.endProfiling()}}});var Nf={};Vr(Nf,{onnxjsBackend:()=>Yw});var ba,Yw,Vf=S(()=>{"use strict";zf();Rf();ba=class{async init(){}async createInferenceSessionHandler(e,n){let t=new bo(n);return typeof e=="string"?await t.loadModel(e):await t.loadModel(e),new yo(t)}},Yw=new ba});var xo=S(()=>{"use strict"});var Gf={};Vr(Gf,{default:()=>Qw});var Mf,Ff,Qw,Uf=S(()=>{"use strict";ya();Zt();rn();Mf="ort-wasm-proxy-worker",Ff=globalThis.self?.name===Mf;Ff&&(self.onmessage=r=>{let{type:e,in:n}=r.data;try{switch(e){case"init-wasm":wo(n.wasm).then(()=>{_o(n).then(()=>{postMessage({type:e})},t=>{postMessage({type:e,err:t})})},t=>{postMessage({type:e,err:t})});break;case"init-ep":{let{epName:t,env:o}=n;To(o,t).then(()=>{postMessage({type:e})},i=>{postMessage({type:e,err:i})});break}case"copy-from":{let{buffer:t}=n,o=nn(t);postMessage({type:e,out:o});break}case"create":{let{model:t,options:o}=n;vo(t,o).then(i=>{postMessage({type:e,out:i})},i=>{postMessage({type:e,err:i})});break}case"release":Io(n),postMessage({type:e});break;case"run":{let{sessionId:t,inputIndices:o,inputs:i,outputIndices:s,options:a}=n;So(t,o,i,s,new Array(s.length).fill(null),a).then(u=>{u.some(l=>l[3]!=="cpu")?postMessage({type:e,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:e,out:u},Ao([...i,...u]))},u=>{postMessage({type:e,err:u})});break}case"end-profiling":$o(n),postMessage({type:e});break;default:}}catch(t){postMessage({type:e,err:t})}});Qw=Ff?null:r=>new Worker(r??ht,{type:"module",name:Mf})});var ht,e_,Hf,t_,r_,qf,n_,Wf,Kf,jf,rn=S(()=>{"use strict";xo();ht=!1?void 0:import.meta.url??(typeof document<"u"?document.currentScript?.src:typeof self<"u"?self.location?.href:void 0),e_=!1||typeof location>"u"?void 0:location.origin,Hf=(r,e)=>{try{let n=e??ht;return(n?new URL(r,n):new URL(r)).origin===e_}catch{return!1}},t_=(r,e)=>{let n=e??ht;try{return(n?new URL(r,n):new URL(r)).href}catch{return}},r_=(r,e)=>`${e??"./"}${r}`,qf=async r=>{let n=await(await fetch(r,{credentials:"same-origin"})).blob();return URL.createObjectURL(n)},n_=async r=>(await import(/*webpackIgnore:true*/r)).default,Wf=(Uf(),wn(Gf)).default,Kf=async()=>{if(!ht)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Hf(ht))return[void 0,Wf()];let r=await qf(ht);return[r,Wf(r)]},jf=async(r,e,n,t)=>{{let o=t?"ort-wasm-relaxedsimd-threaded.jsep.mjs":"ort-wasm-simd-threaded.jsep.mjs",i=r??t_(o,e),s=!!1&&n&&i&&!Hf(i,e),a=s?await qf(i):i??r_(o,e);return[s?a:void 0,await n_(a)]}}});var xa,wa,Po,Xf,o_,i_,a_,wo,Ae,Zt=S(()=>{"use strict";rn();wa=!1,Po=!1,Xf=!1,o_=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},i_=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},a_=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},wo=async r=>{if(wa)return Promise.resolve();if(Po)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Xf)throw new Error("previous call to 'initializeWebAssembly()' failed.");Po=!0;let e=r.initTimeout,n=r.numThreads,t=r.relaxedSimd;if(!i_())throw new Error("WebAssembly SIMD is not supported in the current environment.");let o=t&&a_(),i=o_();n>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+n+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),r.numThreads=n=1);let s=r.wasmPaths,a=typeof s=="string"?s:void 0,u=s?.mjs,l=u?.href??u,c=s?.wasm,d=c?.href??c,f=r.wasmBinary,[m,p]=await jf(l,a,n>1,o),h=!1,b=[];if(e>0&&b.push(new Promise(y=>{setTimeout(()=>{h=!0,y()},e)})),b.push(new Promise((y,g)=>{let x={numThreads:n};f?x.wasmBinary=f:(d||a)&&(x.locateFile=(_,v)=>d??(a??v)+_),p(x).then(_=>{Po=!1,wa=!0,xa=_,y(),m&&URL.revokeObjectURL(m)},_=>{Po=!1,Xf=!0,g(_)})})),await Promise.race(b),h)throw new Error(`WebAssembly backend initializing failed due to timeout: ${e}ms`)},Ae=()=>{if(wa&&xa)return xa;throw new Error("WebAssembly is not initialized yet.")}});var Ne,on,ce,Oo=S(()=>{"use strict";Zt();Ne=(r,e)=>{let n=Ae(),t=n.lengthBytesUTF8(r)+1,o=n._malloc(t);return n.stringToUTF8(r,o,t),e.push(o),o},on=(r,e,n,t)=>{if(typeof r=="object"&&r!==null){if(n.has(r))throw new Error("Circular reference in options");n.add(r)}Object.entries(r).forEach(([o,i])=>{let s=e?e+o:o;if(typeof i=="object")on(i,s+".",n,t);else if(typeof i=="string"||typeof i=="number")t(s,i.toString());else if(typeof i=="boolean")t(s,i?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof i}`)})},ce=r=>{let e=Ae(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetLastError(o,o+t);let i=Number(e.getValue(o,t===4?"i32":"i64")),s=e.getValue(o+t,"*"),a=s?e.UTF8ToString(s):"";throw new Error(`${r} ERROR_CODE: ${i}, ERROR_MESSAGE: ${a}`)}finally{e.stackRestore(n)}}});var Zf,Jf=S(()=>{"use strict";Zt();Oo();Zf=r=>{let e=Ae(),n=0,t=[],o=r||{};try{if(r?.logSeverityLevel===void 0)o.logSeverityLevel=2;else if(typeof r.logSeverityLevel!="number"||!Number.isInteger(r.logSeverityLevel)||r.logSeverityLevel<0||r.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${r.logSeverityLevel}`);if(r?.logVerbosityLevel===void 0)o.logVerbosityLevel=0;else if(typeof r.logVerbosityLevel!="number"||!Number.isInteger(r.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${r.logVerbosityLevel}`);r?.terminate===void 0&&(o.terminate=!1);let i=0;return r?.tag!==void 0&&(i=Ne(r.tag,t)),n=e._OrtCreateRunOptions(o.logSeverityLevel,o.logVerbosityLevel,!!o.terminate,i),n===0&&ce("Can't create run options."),r?.extra!==void 0&&on(r.extra,"",new WeakSet,(s,a)=>{let u=Ne(s,t),l=Ne(a,t);e._OrtAddRunConfigEntry(n,u,l)!==0&&ce(`Can't set a run config entry: ${s} - ${a}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseRunOptions(n),t.forEach(s=>e._free(s)),i}}});var s_,u_,l_,c_,Yf,Qf=S(()=>{"use strict";Zt();Oo();s_=r=>{switch(r){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${r}`)}},u_=r=>{switch(r){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${r}`)}},l_=r=>{r.extra||(r.extra={}),r.extra.session||(r.extra.session={});let e=r.extra.session;e.use_ort_model_bytes_directly||(e.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(n=>(typeof n=="string"?n:n.name)==="webgpu")&&(r.enableMemPattern=!1)},c_=(r,e,n)=>{for(let t of e){let o=typeof t=="string"?t:t.name;switch(o){case"webnn":if(o="WEBNN",typeof t!="string"){let a=t?.deviceType;if(a){let u=Ne("deviceType",n),l=Ne(a,n);Ae()._OrtAddSessionConfigEntry(r,u,l)!==0&&ce(`Can't set a session config entry: 'deviceType' - ${a}.`)}}break;case"webgpu":if(o="JS",typeof t!="string"){let s=t;if(s?.preferredLayout){if(s.preferredLayout!=="NCHW"&&s.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${s.preferredLayout}`);let a=Ne("preferredLayout",n),u=Ne(s.preferredLayout,n);Ae()._OrtAddSessionConfigEntry(r,a,u)!==0&&ce(`Can't set a session config entry: 'preferredLayout' - ${s.preferredLayout}.`)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${o}`)}let i=Ne(o,n);Ae()._OrtAppendExecutionProvider(r,i)!==0&&ce(`Can't append execution provider: ${o}.`)}},Yf=r=>{let e=Ae(),n=0,t=[],o=r||{};l_(o);try{let i=s_(o.graphOptimizationLevel??"all"),s=u_(o.executionMode??"sequential"),a=typeof o.logId=="string"?Ne(o.logId,t):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log verbosity level is not valid: ${l}`);let c=typeof o.optimizedModelFilePath=="string"?Ne(o.optimizedModelFilePath,t):0;if(n=e._OrtCreateSessionOptions(i,!!o.enableCpuMemArena,!!o.enableMemPattern,s,!!o.enableProfiling,0,a,u,l,c),n===0&&ce("Can't create session options."),o.executionProviders&&c_(n,o.executionProviders,t),o.enableGraphCapture!==void 0){if(typeof o.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);let d=Ne("enableGraphCapture",t),f=Ne(o.enableGraphCapture.toString(),t);e._OrtAddSessionConfigEntry(n,d,f)!==0&&ce(`Can't set a session config entry: 'enableGraphCapture' - ${o.enableGraphCapture}.`)}if(o.freeDimensionOverrides)for(let[d,f]of Object.entries(o.freeDimensionOverrides)){if(typeof d!="string")throw new Error(`free dimension override name must be a string: ${d}`);if(typeof f!="number"||!Number.isInteger(f)||f<0)throw new Error(`free dimension override value must be a non-negative integer: ${f}`);let m=Ne(d,t);e._OrtAddFreeDimensionOverride(n,m,f)!==0&&ce(`Can't set a free dimension override: ${d} - ${f}.`)}return o.extra!==void 0&&on(o.extra,"",new WeakSet,(d,f)=>{let m=Ne(d,t),p=Ne(f,t);e._OrtAddSessionConfigEntry(n,m,p)!==0&&ce(`Can't set a session config entry: ${d} - ${f}.`)}),[n,t]}catch(i){throw n!==0&&e._OrtReleaseSessionOptions(n)!==0&&ce("Can't release session options."),t.forEach(s=>e._free(s)),i}}});var an,Jt,hr,Eo,sn,Co,ko,_a,X=S(()=>{"use strict";an=r=>{switch(r){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${r}`)}},Jt=r=>{switch(r){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${r}`)}},hr=(r,e)=>{let n=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][r],t=typeof e=="number"?e:e.reduce((o,i)=>o*i,1);return n>0?Math.ceil(t*n):void 0},Eo=r=>{switch(r){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${r}`)}},sn=r=>{switch(r){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${r}`)}},Co=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",ko=r=>r==="float32"||r==="float16"||r==="int32"||r==="int64"||r==="uint32"||r==="uint64"||r==="int8"||r==="uint8"||r==="bool"||r==="uint4"||r==="int4",_a=r=>{switch(r){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${r}`)}}});var un,Ta=S(()=>{"use strict";xo();un=async r=>{if(typeof r=="string")if(!1)try{let{readFile:e}=ui("node:fs/promises");return new Uint8Array(await e(r))}catch(e){if(e.code==="ERR_FS_FILE_TOO_LARGE"){let{createReadStream:n}=ui("node:fs"),t=n(r),o=[];for await(let i of t)o.push(i);return new Uint8Array(Buffer.concat(o))}throw e}else{let e=await fetch(r);if(!e.ok)throw new Error(`failed to load external data file: ${r}`);let n=e.headers.get("Content-Length"),t=n?parseInt(n,10):0;if(t<1073741824)return new Uint8Array(await e.arrayBuffer());{if(!e.body)throw new Error(`failed to load external data file: ${r}, no response body.`);let o=e.body.getReader(),i;try{i=new ArrayBuffer(t)}catch(a){if(a instanceof RangeError){let u=Math.ceil(t/65536);i=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw a}let s=0;for(;;){let{done:a,value:u}=await o.read();if(a)break;let l=u.byteLength;new Uint8Array(i,s,l).set(u),s+=l}return new Uint8Array(i,0,t)}}else return r instanceof Blob?new Uint8Array(await r.arrayBuffer()):r instanceof Uint8Array?r:new Uint8Array(r)}});var d_,f_,ep,tp,Do,p_,ae,vt=S(()=>{"use strict";X();d_=["V","I","W","E","F"],f_=(r,e)=>{console.log(`[${d_[r]},${new Date().toISOString()}]${e}`)},Do=(r,e)=>{ep=r,tp=e},p_=(r,e)=>{let n=sn(r),t=sn(ep);n>=t&&f_(n,typeof e=="function"?e():e)},ae=(...r)=>{tp&&p_(...r)}});var Bo,va=S(()=>{"use strict";X();Bo=(r,e)=>new(Eo(e))(r)});var Lo=S(()=>{"use strict"});var rp,Ia,Sa,m_,h_,np,Aa,$a,ip,ap=S(()=>{"use strict";vt();Lo();rp=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ia=[],Sa=r=>Math.ceil(Number(r)/16)*16,m_=r=>{for(let e=0;e<Ia.length;e++){let n=Ia[e];if(r<=n)return n}return Math.ceil(r/16)*16},h_=1,np=()=>h_++,Aa=async(r,e,n,t)=>{let o=Sa(n),i=r.device.createBuffer({size:o,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=r.getCommandEncoder();r.endComputePass(),s.copyBufferToBuffer(e,0,i,0,o),r.flush(),await i.mapAsync(GPUMapMode.READ);let a=i.getMappedRange();if(t){let u=t();return u.set(new Uint8Array(a,0,n)),u}else return new Uint8Array(a.slice(0,n))}finally{i.destroy()}},$a=class{constructor(e){this.backend=e;this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[n]of rp)Ia.push(n),this.freeBuffers.set(n,[]),this.freeUniformBuffers.set(n,[]);this.sessionCount=0}upload(e,n){let t=n.buffer,o=n.byteOffset,i=n.byteLength,s=Sa(i),a=this.storageCache.get(e);if(!a)throw new Error("gpu data for uploading does not exist");if(Number(a.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${a.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(t,o,i)),u.unmap();let c=this.backend.device.createCommandEncoder();c.copyBufferToBuffer(u,0,a.gpuData.buffer,0,s),this.backend.device.queue.submit([c.finish()]),u.destroy(),ae("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,n){let t=this.storageCache.get(e);if(!t)throw new Error("source gpu data for memcpy does not exist");let o=this.storageCache.get(n);if(!o)throw new Error("destination gpu data for memcpy does not exist");if(t.originalSize!==o.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=Sa(t.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(t.gpuData.buffer,0,o.gpuData.buffer,0,i)}registerExternalBuffer(e,n,t){let o;if(t){if(o=t[0],e===t[1])return ae("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, buffer is the same, skip.`),o;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else o=np();return this.storageCache.set(o,{gpuData:{id:o,type:0,buffer:e},originalSize:n}),ae("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${n}) => id=${o}, registered.`),o}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ae("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,n=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let t=m_(e),o,i=(n&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(n&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let l=(i?this.freeBuffers:this.freeUniformBuffers).get(t);l?l.length>0?o=l.pop():o=this.backend.device.createBuffer({size:t,usage:n}):o=this.backend.device.createBuffer({size:t,usage:n})}else o=this.backend.device.createBuffer({size:t,usage:n});let a={id:np(),type:0,buffer:o};return this.storageCache.set(a.id,{gpuData:a,originalSize:Number(e)}),ae("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${a.id}`),a}get(e){return this.storageCache.get(e)?.gpuData}release(e){let n=typeof e=="bigint"?Number(e):e,t=this.storageCache.get(n);if(!t){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ae("verbose",()=>`[WebGPU] GpuDataManager.release(id=${n}), gpuDataId=${t.gpuData.id}`),this.storageCache.delete(n),this.buffersPending.push(t.gpuData.buffer),t.originalSize}async download(e,n){let t=this.storageCache.get(Number(e));if(!t)throw new Error("data does not exist");await Aa(this.backend,t.gpuData.buffer,t.originalSize,n)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let n=rp.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let t=this.freeBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let t=this.freeUniformBuffers.get(e.size)||[];n===void 0||t.length>=n?e.destroy():t.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let n of this.buffersPending)e.push(n);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(n=>{n.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let n=this.capturedPendingBuffers.get(e);n&&(n.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ae("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},ip=(...r)=>new $a(...r)});var Pa,Z,Pe=S(()=>{"use strict";Pa=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Z=r=>new Pa(r)});var Oa,Et,$,gr,zo,sp,up,te=S(()=>{"use strict";Oa=class{static calcMatMulShape(e,n){return e[1]!==n[0]?void 0:[e[0],n[1]]}},Et=class{static calcShape(e,n,t=!1){let o=e.length,i=n.length;if(o===0)return n;if(i===0)return e;let s=Math.max(e.length,n.length),a=new Array(s);if(t){if(o<2||i<2)return;let u=Oa.calcMatMulShape([e[o-2],e[o-1]],[n[i-2],n[i-1]]);if(u===void 0)return;[a[s-2],a[s-1]]=u}for(let u=t?3:1;u<=s;u++){let l=o-u<0?1:e[o-u],c=i-u<0?1:n[i-u];if(l!==c&&l>1&&c>1)return;let d=Math.max(l,c);if(l&&c)a[s-u]=Math.max(l,c);else{if(d>1)return;a[s-u]=0}}return a}static isValidBroadcast(e,n){let t=e.length,o=n.length;if(t>o)return!1;for(let i=1;i<=t;i++)if(e[t-i]!==1&&e[t-i]!==n[o-i])return!1;return!0}},$=class r{static size(e){return r.getSizeFromDimensionRange(e,0,e.length)}static convertShape(e,n=4){let t=e.length;if(t===0)return[];let o=new Array(t),i=t-1;for(;i>=0;){if(e[i]%n===0){o[i]=e[i]/n;break}if(n%e[i]!==0)throw new Error("cannot convert shape");o[i]=1,n/=e[i],i--}for(i--;i>=0;i--)o[i]=e[i];return o}static sizeFromDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeFromDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,n,e.length)}static sizeToDimension(e,n){if(n<0||n>e.length)throw new Error(`invalid dimension of ${n} for sizeToDimension as Tensor has ${e.length} dimensions.`);return r.getSizeFromDimensionRange(e,0,n)}static getSizeFromDimensionRange(e,n,t){let o=1;for(let i=n;i<t;i++){if(e[i]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");o*=Number(e[i])}return o}static computeStrides(e){let n=e.length;if(n===0)return[];if(n===1)return[1];let t=new Array(n);t[n-1]=1,t[n-2]=e[n-1];for(let o=n-3;o>=0;--o)t[o]=t[o+1]*e[o+1];return t}static normalizeAxis(e,n){if(e<-n&&e>=n)throw new Error("unsupported axis for this operation.");return e<0?e+n:e}static normalizeAxes(e,n){return e.map(t=>this.normalizeAxis(t,n??e.length))}static sortBasedOnPerm(e,n){return n?n.map(t=>e[t]):e.slice().reverse()}static padShape(e,n){let t=e.length;return e.map((o,i)=>o+n[i]+n[i+t])}static areEqual(e,n){return e.length!==n.length?!1:e.every((t,o)=>t===n[o])}},gr=class r{static adjustPoolAttributes(e,n,t,o,i,s){if(!e&&t.length!==n.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(e)for(let a=0;a<n.length-2;a++)a>=t.length?t.push(n[a+2]):t[a]=n[a+2];for(let a=0;a<t.length;a++)if(a<o.length){if(o[a]<0)throw new Error("strides should be greater than or equal to 1")}else o.push(1);for(let a=0;a<t.length;a++)if(a<i.length){if(i[a]<0)throw new Error("dilations should be greater than or equal to 1")}else i.push(1);for(let a=0;a<t.length*2;a++)if(a<s.length){if(s[a]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let a=0;a<t.length;a++){if(t[a]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[a]>=t[a]||s[a+t.length]>=t[a])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(e,n,t,o,i,s,a){if(a){if(i.length!==2*(e.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(n.length!==e.length-2)throw new Error("length of strides should be the length of data dimensions");if(o.length!==e.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<e.length-2;u++)r.adjustPadAndReturnShape(e[u+(s?1:2)],n[u],t[u],o[u],i,u,u+e.length-2,a)}}static computePoolOutputShape(e,n,t,o,i,s,a){if(n.length<=0)throw new Error("input shape must be of size greater than 0");let u=[n[0],n[1]];return r.computeShapeHelper(e,n,u,t,o,i,s,a),u}static computeConvOutputShape(e,n,t,o,i,s,a){if(e.length<=0||n.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[e[0],n[0]];return r.computeShapeHelper(!1,e,u,t,o,i,s,a),u}static computeShapeHelper(e,n,t,o,i,s,a,u){if(e)for(let l=0;l<n.length-2;l++)t.push(1);else for(let l=0;l<n.length-2;l++)t.push(r.adjustPadAndReturnShape(n[l+2],o[l],i[l],s[l],a,l,l+n.length-2,u))}static adjustPadAndReturnShape(e,n,t,o,i,s,a,u){let l=t*(o-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return i[s]=0,i[a]=0,Math.floor((e-l)/n+1);case"SAME_LOWER":case"SAME_UPPER":if(t!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let d=((e+n-1)/n-1)*n+o-e;return i[s]=Math.floor(u==="SAME_LOWER"?(d+1)/2:d/2),i[a]=d-i[s],Math.floor((e+d-o)/n+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((e+i[s]+i[a]-l)/n+1)}},zo=class{static getShapeOfGemmResult(e,n,t,o,i){if(e.length!==2||t.length!==2)throw new Error("shape need to be of size 2");let s,a,u;n?(s=e[1],a=e[0]):(s=e[0],a=e[1]);let l=-1;if(o?(u=t[0],l=1):(u=t[1],l=0),t[l]!==a)throw new Error("dimension mismatch");if(s<=0||u<=0||a<=0)throw new Error("invalid shape specified");if(i&&!Et.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,a]}},sp=-34028234663852886e22,up=34028234663852886e22});var br,Ca,me,Ve,B,xe,ka,yr,It,F,Da,P,D,Ro,Ea,lp,ne=S(()=>{"use strict";X();te();br=64,Ca=(r,e)=>{if(e===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(r)){case 10:return e>1?`vec${e}<f16>`:"f16";case 1:return e>1?`vec${e}<f32>`:"f32";case 6:return e>1?`vec${e}<i32>`:"i32";case 12:return e>1?`vec${e}<u32>`:"u32";case 7:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(e>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(e!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${r}`)}},me=(r,e=1)=>{let n=Ca(r,e);return typeof n=="string"?n:n[0]},Ve=(r,e=1)=>{let n=Ca(r,e);return typeof n=="string"?n:n[1]},B=(...r)=>{let e=[];return r.forEach(n=>{n.length!==0&&e.push({type:12,data:n},{type:12,data:$.computeStrides(n)})}),e},xe=r=>r%4===0?4:r%2===0?2:1,ka=(r="f32",e,n="0")=>!e||e===1?`${r}(${n})`:`vec${e}<${r}>(${n})`,yr=(r,e,n)=>r==="f32"?n:e===1?`f32(${n})`:`vec${e}<f32>(${n})`,It=(r,e)=>e===4?`(${r}.x + ${r}.y + ${r}.z + ${r}.w)`:e===2?`(${r}.x + ${r}.y)`:e===3?`(${r}.x + ${r}.y + ${r}.z)`:r,F=(r,e,n,t)=>r.startsWith("uniforms.")&&n>4?typeof e=="string"?t==="f16"?`${r}[(${e}) / 8][(${e}) % 8 / 4][(${e}) % 8 % 4]`:`${r}[(${e}) / 4][(${e}) % 4]`:t==="f16"?`${r}[${Math.floor(e/8)}][${Math.floor(e%8/4)}][${e%8%4}]`:`${r}[${Math.floor(e/4)}][${e%4}]`:n>1?`${r}[${e}]`:r,Da=(r,e,n,t,o)=>{let i=typeof n=="number",s=i?n:n.length,a=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,l=Ca(e,o),c=typeof l=="string"?l:l[1],d=typeof l=="string"?l:l[0],f={indices:u,value:c,storage:d,tensor:e},m=z=>typeof z=="string"?z:`${z}u`,p={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},h=i?"uniforms.":"",b=`${h}${r}_shape`,y=`${h}${r}_strides`,g="";for(let z=0;z<s-1;z++)g+=`
    let dim${z} = current / ${F(y,z,s)};
    let rest${z} = current % ${F(y,z,s)};
    indices[${z}] = dim${z};
    current = rest${z};
    `;g+=`indices[${s-1}] = current;`;let x=s<2?"":`
  fn o2i_${r}(offset: u32) -> ${f.indices} {
    var indices: ${f.indices};
    var current = offset;
    ${g}
    return indices;
  }`,_=z=>(p.offsetToIndices=!0,s<2?z:`o2i_${r}(${z})`),v=[];if(s>=2)for(let z=s-1;z>=0;z--)v.push(`${F(y,z,s)} * (indices[${z}])`);let I=s<2?"":`
  fn i2o_${r}(indices: ${f.indices}) -> u32 {
    return ${v.join("+")};
  }`,O=z=>(p.indicesToOffset=!0,s<2?z:`i2o_${r}(${z})`),E=(...z)=>s===0?"0u":`${f.indices}(${z.map(m).join(",")})`,k=(z,U)=>s<2?`${z}`:`${F(z,U,s)}`,N=(z,U,we)=>s<2?`${z}=${we};`:`${F(z,U,s)}=${we};`,C={},ee=(z,U)=>{p.broadcastedIndicesToOffset=!0;let we=`${U.name}broadcastedIndicesTo${r}Offset`;if(we in C)return`${we}(${z})`;let Gt=[];for(let Oe=s-1;Oe>=0;Oe--){let ze=U.indicesGet("outputIndices",Oe+U.rank-s);Gt.push(`${k(y,Oe)} * (${ze} % ${k(b,Oe)})`)}return C[we]=`fn ${we}(outputIndices: ${U.type.indices}) -> u32 {
             return ${Gt.length>0?Gt.join("+"):"0u"};
           }`,`${we}(${z})`},V=(z,U)=>(()=>{if(f.storage===f.value)return`${r}[${z}]=${U};`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`${r}[${z}]=vec2<u32>(u32(${U}), select(0u, 0xFFFFFFFFu, ${U} < 0));`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`${r}[${z}]=vec2<u32>(u32(${U}), 0u);`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`${r}[${z}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${U}));`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),J=z=>(()=>{if(f.storage===f.value)return`${r}[${z}]`;if(f.storage==="vec2<u32>"&&f.value==="i32")return`i32(${r}[${z}].x)`;if(f.storage==="vec2<u32>"&&f.value==="u32")return`u32(${r}[${z}].x)`;if(f.storage==="u32"&&f.value==="vec4<bool>")return`vec4<bool>(bool(${r}[${z}] & 0xFFu), bool(${r}[${z}] & 0xFF00u), bool(${r}[${z}] & 0xFF0000u), bool(${r}[${z}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${f.storage} and value type ${f.value} yet`)})(),Se=s<2?"":`
  fn get_${r}ByIndices(indices: ${f.indices}) -> ${c} {
    return ${J(`i2o_${r}(indices)`)};
  }`,K=s<2?"":(()=>{let z=a.map(we=>`d${we}: u32`).join(", "),U=a.map(we=>`d${we}`).join(", ");return`
  fn get_${r}(${z}) -> ${c} {
    return get_${r}ByIndices(${E(U)});
  }`})(),Y=(...z)=>{if(z.length!==s)throw new Error(`indices length must be ${s}`);let U=z.map(m).join(",");return s===0?J("0u"):s===1?J(U[0]):(p.get=!0,p.getByIndices=!0,p.indicesToOffset=!0,`get_${r}(${U})`)},oe=z=>s<2?J(z):(p.getByIndices=!0,p.indicesToOffset=!0,`get_${r}ByIndices(${z})`),Q=s<2?"":`
  fn set_${r}ByIndices(indices: ${f.indices}, value: ${c}) {
    ${V(`i2o_${r}(indices)`,"value")}
  }`,_e=s<2?"":(()=>{let z=a.map(we=>`d${we}: u32`).join(", "),U=a.map(we=>`d${we}`).join(", ");return`
  fn set_${r}(${z}, value: ${c}) {
    set_${r}ByIndices(${E(U)}, value);
  }`})();return{impl:()=>{let z=[],U=!1;return p.offsetToIndices&&(z.push(x),U=!0),p.indicesToOffset&&(z.push(I),U=!0),p.broadcastedIndicesToOffset&&(Object.values(C).forEach(we=>z.push(we)),U=!0),p.set&&(z.push(_e),U=!0),p.setByIndices&&(z.push(Q),U=!0),p.get&&(z.push(K),U=!0),p.getByIndices&&(z.push(Se),U=!0),!i&&U&&z.unshift(`const ${b} = ${f.indices}(${n.join(",")});`,`const ${y} = ${f.indices}(${$.computeStrides(n).join(",")});`),z.join(`
`)},type:f,offsetToIndices:_,indicesToOffset:O,broadcastedIndicesToOffset:ee,indices:E,indicesGet:k,indicesSet:N,set:(...z)=>{if(z.length!==s+1)throw new Error(`indices length must be ${s}`);let U=z[s];if(typeof U!="string")throw new Error("value must be string");let we=z.slice(0,s).map(m).join(",");return s===0?V("0u",U):s===1?V(we[0],U):(p.set=!0,p.setByIndices=!0,p.indicesToOffset=!0,`set_${r}(${we}, ${U})`)},setByOffset:V,setByIndices:(z,U)=>s<2?V(z,U):(p.setByIndices=!0,p.indicesToOffset=!0,`set_${r}ByIndices(${z}, ${U});`),get:Y,getByOffset:J,getByIndices:oe,usage:t,name:r,strides:y,shape:b,rank:s}},P=(r,e,n,t=1)=>Da(r,e,n,"input",t),D=(r,e,n,t=1)=>Da(r,e,n,"output",t),Ro=(r,e,n,t=1)=>Da(r,e,n,"internal",t),Ea=class{constructor(e,n){this.normalizedDispatchGroup=e;this.limits=n;this.internalVariables=[];this.variables=[];this.uniforms=[];this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=br){let n=typeof e=="number"?e:e[0],t=typeof e=="number"?1:e[1],o=typeof e=="number"?1:e[2];if(n>this.limits.maxComputeWorkgroupSizeX||t>this.limits.maxComputeWorkgroupSizeY||o>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(n*t*o>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${n}, ${t}, ${o}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,a=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${n*t*o}u + local_idx;`;return`@compute @workgroup_size(${n}, ${t}, ${o})
  fn main(${s}) {
    ${a}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,n){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let t=e.usage==="input"?"read":"read_write",o=e.type.storage;return`@group(0) @binding(${n}) var<storage, ${t}> ${e.name}: array<${o}>;`}declareVariables(...e){return e.map(n=>this.declareVariable(n,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(n=>this.registerInternalVariable(n)),this}registerUniform(e,n,t=1){return this.uniforms.push({name:e,type:n,length:t}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:n,type:t,length:o}of this.uniforms)if(o&&o>4)t==="f16"?e.push(`@align(16) ${n}:array<mat2x4<${t}>, ${Math.ceil(o/8)}>`):e.push(`${n}:array<vec4<${t}>, ${Math.ceil(o/4)}>`);else{let i=o==null||o===1?t:`vec${o}<${t}>`;e.push(`${n}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=n=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(n)];return this.uniforms.map(n=>[e(n.type),n.length??1])}},lp=(r,e)=>new Ea(r,e)});var g_,cp,b_,y_,x_,Me,dp,fp,Vt=S(()=>{"use strict";X();te();Pe();ne();g_=r=>{if(!r||r.length!==1)throw new Error("Transpose requires 1 input.")},cp=(r,e)=>e&&e.length!==r?[...new Array(r).keys()].reverse():e,b_=(r,e)=>$.sortBasedOnPerm(r,cp(r.length,e)),y_=(r,e,n,t)=>{let o=`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`;for(let i=0;i<e;++i)o+=n.indicesSet("a",r[i],`i[${i}]`);return o+="return a;}"},x_=(r,e)=>{let n=[],t=[];for(let o=0;o<r.length;++o)r[o]!==1&&n.push(r[o]),r[e[o]]!==1&&t.push(e[o]);return{newShape:n,newPerm:t}},Me=(r,e)=>{let n=r.dataType,t=r.dims.length,o=cp(t,e),i=b_(r.dims,o),{newShape:s,newPerm:a}=x_(r.dims,o),u=$.areEqual(a,[2,3,1]),l=$.areEqual(a,[3,1,2]),c=s.length===2&&a[0]>a[1]||u||l,d=c?s:r.dims,f=i;c&&(d=u?[s[0],s[1]*s[2]]:l?[s[0]*s[1],s[2]]:s,f=[d[1],d[0]]);let m=P("a",n,d.length),p=D("output",n,f.length),h=16,b;return c?b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,p)}
  var<workgroup> tile : array<array<${p.type.value}, ${h+1}>, ${h}>;
  ${y.mainStart([h,h,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${h} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${h}u + local_id.x;
    let input_row = workgroup_id_x * ${h}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${m.getByIndices(`${m.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${h}u + local_id.x;
    let output_row = workgroup_id_y * ${h}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${p.setByIndices(`${p.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`:b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(m,p)}

  ${y_(o,t,m,p)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${p.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${p.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`,{name:c?"TransposeShared":"Transpose",shaderCache:{hint:`${e}`,inputDependencies:["rank"]},getRunData:()=>{let y=$.size(i);return{outputs:[{dims:i,dataType:r.dataType}],dispatchGroup:c?{x:Math.ceil(f[1]/h),y:Math.ceil(f[0]/h)}:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...B(d,f)]}},getShaderSource:b}},dp=(r,e)=>{g_(r.inputs),r.compute(Me(r.inputs[0],e.perm))},fp=r=>Z({perm:r.perm})});var w_,__,T_,v_,I_,S_,$_,A_,P_,O_,Ct,pp,mp,hp,gp,bp,yp,xp,wp,_p,Tp,vp=S(()=>{"use strict";X();te();ne();No();Vt();w_={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},__={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},T_={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},v_={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},I_=(r,e)=>{let n=[];for(let t=e-r;t<e;++t)n.push(t);return n},S_=(r,e)=>{let n=[],t=r.length;for(let i=0;i<t;i++)e.indexOf(i)===-1&&n.push(r[i]);let o=e.map(i=>r[i]);return[n,o]},$_=(r,e)=>{let n=r.length+e.length,t=[],o=0;for(let i=0;i<n;i++)e.indexOf(i)===-1?t.push(r[o++]):t.push(1);return t},A_=(r,e)=>{for(let n=0;n<r.length;++n)if(r[r.length-n-1]!==e-1-n)return!1;return!0},P_=(r,e)=>{let n=[];if(!A_(r,e)){for(let t=0;t<e;++t)r.indexOf(t)===-1&&n.push(t);r.forEach(t=>n.push(t))}return n},O_=(r,e,n,t,o,i,s)=>{let a=n[0].dims,u=$.size(i),l=$.size(s),c=P("_A",n[0].dataType,a),d=D("output",o,i),f=64;u===1&&(f=256);let m=`
          var<workgroup> aBestValues : array<f32, ${f}>;
       `,p=h=>`
        ${h.registerUniform("reduceSize","u32").declareVariables(c,d)}
        ${m}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${h.mainStart(f)}

          let outputIndex = global_idx / ${f};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${T_[t]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${f}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${w_[t]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${f}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${__[t]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${d.setByOffset("outputIndex",`${t==="mean"?`${d.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${d.type.storage}(${v_[t]})`}`)};
         }
        }`;return{name:r,shaderCache:{hint:`${e};${f}`,inputDependencies:["type"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:i,dataType:o}],dispatchGroup:{x:u},programUniforms:[{type:12,data:l}]})}},Ct=(r,e,n,t)=>{let o=r.inputs.length===1?n:Ba(r.inputs,n),i=o.axes;i.length===0&&!o.noopWithEmptyAxes&&(i=r.inputs[0].dims.map((m,p)=>p));let s=$.normalizeAxes(i,r.inputs[0].dims.length),a=s,u=r.inputs[0],l=P_(a,r.inputs[0].dims.length);l.length>0&&(u=r.compute(Me(r.inputs[0],l),{inputs:[0],outputs:[-1]})[0],a=I_(a.length,u.dims.length));let[c,d]=S_(u.dims,a),f=c;o.keepDims&&(f=$_(c,s)),r.compute(O_(e,o.cacheKey,[u],t,r.inputs[0].dataType,f,d),{inputs:[u]})},pp=(r,e)=>{Ct(r,"ReduceMeanShared",e,"mean")},mp=(r,e)=>{Ct(r,"ReduceL1Shared",e,"l1")},hp=(r,e)=>{Ct(r,"ReduceL2Shared",e,"l2")},gp=(r,e)=>{Ct(r,"ReduceLogSumExpShared",e,"logSumExp")},bp=(r,e)=>{Ct(r,"ReduceMaxShared",e,"max")},yp=(r,e)=>{Ct(r,"ReduceMinShared",e,"min")},xp=(r,e)=>{Ct(r,"ReduceProdShared",e,"prod")},wp=(r,e)=>{Ct(r,"ReduceSumShared",e,"sum")},_p=(r,e)=>{Ct(r,"ReduceSumSquareShared",e,"sumSquare")},Tp=(r,e)=>{Ct(r,"ReduceLogSumShared",e,"logSum")}});var kt,E_,Vo,Ba,Dt,C_,k_,D_,B_,L_,z_,R_,N_,V_,M_,Bt,Ip,Sp,$p,Ap,Pp,Op,Ep,Cp,kp,Dp,No=S(()=>{"use strict";X();te();Pe();ne();vp();kt=r=>{if(!r||r.length===0||r.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(r.length===2&&r[1].dims.length!==1)throw new Error("Invalid axes input dims.")},E_=r=>["","",`var value = ${r.getByIndices("input_indices")};`,""],Vo=(r,e,n,t,o,i,s=!1,a=!1)=>{let u=[],l=n[0].dims,c=l.length,d=$.normalizeAxes(o,c),f=!a&&d.length===0;l.forEach((b,y)=>{f||d.indexOf(y)>=0?s&&u.push(1):u.push(b)});let m=u.length,p=$.size(u);return{name:r,shaderCache:e,getShaderSource:b=>{let y=[],g=P("_A",n[0].dataType,c),x=D("output",i,m),_=t(g,x,d),v=_[2];for(let I=0,O=0;I<c;I++)f||d.indexOf(I)>=0?(s&&O++,v=`for(var j${I}: u32 = 0; j${I} < ${l[I]}; j${I}++) {
                  ${_[2].includes("last_index")?`let last_index = j${I};`:""}
                  ${g.indicesSet("input_indices",I,`j${I}`)}
                  ${v}
                }`):(y.push(`${g.indicesSet("input_indices",I,x.indicesGet("output_indices",O))};`),O++);return`

        ${b.registerUniform("output_size","u32").declareVariables(g,x)}

        ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${g.type.indices};
          let output_indices = ${x.offsetToIndices("global_idx")};

          ${y.join(`
`)}
          ${_[0]}       // init ops for reduce max/min
          ${_[1]}
          ${v}
          ${_[3]}
          ${_.length===4?x.setByOffset("global_idx","value"):_.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:i}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...B(l,u)]})}},Ba=(r,e)=>{let n=[];return r[1].dims[0]>0&&r[1].getBigInt64Array().forEach(t=>n.push(Number(t))),Z({axes:n,keepDims:e.keepDims,noopWithEmptyAxes:e.noopWithEmptyAxes})},Dt=(r,e,n,t)=>{let o=r.inputs,i=o.length===1?n:Ba(o,n);r.compute(Vo(e,{hint:i.cacheKey,inputDependencies:["rank"]},[o[0]],i.noopWithEmptyAxes&&i.axes.length===0?E_:t,i.axes,o[0].dataType,i.keepDims,i.noopWithEmptyAxes),{inputs:[0]})},C_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceLogSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])},k_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceL1",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])},D_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceL2",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},B_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceLogSumExp",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])},L_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceMax",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(t.indicesSet("input_indices",a,0));return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})},z_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceMean",e,(t,o,i)=>{let s=1;for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&(s*=r.inputs[0].dims[a]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${o.type.value}(sum / ${s});`]})},R_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceMin",e,(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})},N_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceProd",e,(t,o)=>[`var value = ${o.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])},V_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceSum",e,(t,o)=>[`var value = ${o.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])},M_=(r,e)=>{kt(r.inputs),Dt(r,"ReduceSumSquare",e,(t,o)=>[`var t = ${o.type.value}(0); var value = ${o.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])},Bt=(r,e,n)=>{if(e.length===0)return n;let t=1,o=1;for(let i=0;i<e.length;i++)e.indexOf(i)===-1?t*=r[i]:o*=r[i];return o<32&&t>1024},Ip=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?z_(r,e):pp(r,e)},Sp=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?k_(r,e):mp(r,e)},$p=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?D_(r,e):hp(r,e)},Ap=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?B_(r,e):gp(r,e)},Pp=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?L_(r,e):bp(r,e)},Op=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?R_(r,e):yp(r,e)},Ep=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?N_(r,e):xp(r,e)},Cp=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?V_(r,e):wp(r,e)},kp=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?M_(r,e):_p(r,e)},Dp=(r,e)=>{Bt(r.inputs[0].dims,e.axes,e.noopWithEmptyAxes)?C_(r,e):Tp(r,e)}});var Bp,Lp,zp,La,Rp=S(()=>{"use strict";X();Pe();No();Bp=r=>{if(!r||r.length===0||r.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(r[0].dataType!==1)throw new Error("Invalid input type.")},Lp=(r,e)=>{Bp(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Vo("ArgMin",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},zp=(r,e)=>{Bp(r.inputs);let n=(t,o,i)=>{let s=[];for(let a=0;a<t.rank;a++)(i.indexOf(a)>=0||i.length===0)&&s.push(`input_indices[${a}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${e.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",o.setByOffset("global_idx","best_index")]};r.compute(Vo("argMax",{hint:e.cacheKey,inputDependencies:["rank"]},[r.inputs[0]],n,[e.axis],7,e.keepDims),{inputs:[0]})},La=r=>Z(r)});var F_,za,G_,U_,W_,Br,H_,Np,Mo=S(()=>{"use strict";X();te();Lo();ne();F_=(r,e)=>{let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4],a=r[5];if(s&&a)throw new Error("Attention cannot have both past and attention_bias");if(n.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=n.dims[0],l=n.dims[1],c=n.dims[2];if(o.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(t.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(t.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(o.dims[0]!==t.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let d=o.dims[0]/3,f=d,m=f;if(e.qkvHiddenSizes.length>0){if(e.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let x of e.qkvHiddenSizes)if(x%e.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");d=e.qkvHiddenSizes[0],f=e.qkvHiddenSizes[1],m=e.qkvHiddenSizes[2]}let p=l;if(d!==f)throw new Error("qkv_hidden_sizes first element should be same as the second");if(o.dims[0]!==d+f+m)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let h=0;if(s){if(f!==m)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==e.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==f/e.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');e.pastPresentShareBuffer||(h=s.dims[3])}let b=p+h,y=-1,g=0;if(i)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(a){if(a.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(a.dims[0]!==u||a.dims[1]!==e.numHeads||a.dims[2]!==l||a.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:l,pastSequenceLength:h,kvSequenceLength:p,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:c,hiddenSize:d,vHiddenSize:m,headSize:Math.floor(d/e.numHeads),vHeadSize:Math.floor(m/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:g,scale:e.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},za=(r,e,n)=>e&&r?`
      let total_sequence_length_input = u32(${e.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${r?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${n?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,G_=(r,e,n,t,o,i,s,a)=>{let u=xe(s?1:i),l=64,c=i/u;c<l&&(l=32);let d=Math.ceil(i/u/l),f=[{type:12,data:e},{type:12,data:n},{type:12,data:t},{type:12,data:o},{type:12,data:c},{type:12,data:d}],m=me(r.dataType,u),p=Ve(1,u),h=["type"];s&&h.push("type"),a&&h.push("type");let b=y=>{let g=D("x",r.dataType,r.dims,u),x=[g],_=s?P("seq_lens",s.dataType,s.dims):void 0;_&&x.push(_);let v=a?P("total_sequence_length_input",a.dataType,a.dims):void 0;v&&x.push(v);let I=Ve(r.dataType),O=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${l}>;
  var<workgroup> thread_sum: array<f32, ${l}>;
  ${y.registerUniforms(O).declareVariables(...x)}
  ${y.mainStart([l,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${za(_,v,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${l}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${p}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${p}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${l}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${p}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${p}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${l}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${g.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${p}(x[offset + i]);
        x[offset + i] = ${g.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${g.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${l};${m};${u}`,inputDependencies:h},getShaderSource:b,getRunData:()=>({outputs:[],dispatchGroup:{x:Math.ceil(i/l),y:o,z:e*n},programUniforms:f})}},U_=(r,e,n,t,o,i,s,a,u)=>{let l=s+i.kvSequenceLength,c=[i.batchSize,i.numHeads,i.sequenceLength,l],d=r>1&&t,f=i.kvNumHeads?i.kvNumHeads:i.numHeads,m=d?[i.batchSize,f,l,i.headSize]:void 0,p=i.nReps?i.nReps:1,h=i.scale===0?1/Math.sqrt(i.headSize):i.scale,b=xe(i.headSize),y=i.headSize/b,g=12,x={x:Math.ceil(l/g),y:Math.ceil(i.sequenceLength/g),z:i.batchSize*i.numHeads},_=[{type:12,data:i.sequenceLength},{type:12,data:y},{type:12,data:l},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:1,data:h},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:p}],v=d&&t&&$.size(t.dims)>0,I=["type","type"];v&&I.push("type"),o&&I.push("type"),a&&I.push("type"),u&&I.push("type");let O=[{dims:c,dataType:e.dataType,gpuDataType:0}];d&&O.push({dims:m,dataType:e.dataType,gpuDataType:0});let E=k=>{let N=P("q",e.dataType,e.dims,b),C=P("key",n.dataType,n.dims,b),ee=[N,C];if(v){let Q=P("past_key",t.dataType,t.dims,b);ee.push(Q)}o&&ee.push(P("attention_bias",o.dataType,o.dims));let V=a?P("seq_lens",a.dataType,a.dims):void 0;V&&ee.push(V);let J=u?P("total_sequence_length_input",u.dataType,u.dims):void 0;J&&ee.push(J);let Se=D("output",e.dataType,c),K=[Se];d&&K.push(D("present_key",e.dataType,m,b));let Y=Ve(1,b),oe=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${g}u;

  var<workgroup> tileQ: array<${N.type.storage}, ${g*g}>;
  var<workgroup> tileK: array<${N.type.storage}, ${g*g}>;
  ${k.registerUniforms(oe).declareVariables(...ee,...K)}
  ${k.mainStart([g,g,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${za(V,J,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${v&&d?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${d?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Y}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${(()=>v&&d?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`)()}
      ${d?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Y}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(b){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${b}`)}})()};
        output[outputIdx] = ${Se.type.value} (sum * uniforms.alpha) + ${o?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${b};${o!==void 0};${t!==void 0};${r}`,inputDependencies:I},getRunData:()=>({outputs:O,dispatchGroup:x,programUniforms:_}),getShaderSource:E}},W_=(r,e,n,t,o,i,s=void 0,a=void 0)=>{let u=i+o.kvSequenceLength,l=o.nReps?o.nReps:1,c=o.vHiddenSize*l,d=r>1&&t,f=o.kvNumHeads?o.kvNumHeads:o.numHeads,m=d?[o.batchSize,f,u,o.headSize]:void 0,p=[o.batchSize,o.sequenceLength,c],h=12,b={x:Math.ceil(o.vHeadSize/h),y:Math.ceil(o.sequenceLength/h),z:o.batchSize*o.numHeads},y=[{type:12,data:o.sequenceLength},{type:12,data:u},{type:12,data:o.vHeadSize},{type:12,data:o.numHeads},{type:12,data:o.headSize},{type:12,data:c},{type:12,data:i},{type:12,data:o.kvSequenceLength},{type:12,data:l}],g=d&&t&&$.size(t.dims)>0,x=["type","type"];g&&x.push("type"),s&&x.push("type"),a&&x.push("type");let _=[{dims:p,dataType:e.dataType,gpuDataType:0}];d&&_.push({dims:m,dataType:e.dataType,gpuDataType:0});let v=I=>{let O=P("probs",e.dataType,e.dims),E=P("v",n.dataType,n.dims),k=[O,E];g&&k.push(P("past_value",t.dataType,t.dims));let N=s?P("seq_lens",s.dataType,s.dims):void 0;s&&k.push(N);let C=a?P("total_sequence_length_input",a.dataType,a.dims):void 0;a&&k.push(C);let V=[D("output",e.dataType,p)];d&&V.push(D("present_value",e.dataType,m));let J=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${h}u;
  var<workgroup> tileQ: array<${O.type.value}, ${h*h}>;
  var<workgroup> tileV: array<${O.type.value}, ${h*h}>;
  ${I.registerUniforms(J).declareVariables(...k,...V)}
  ${I.mainStart([h,h,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${l===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${l===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${za(N,C,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${g&&d?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${d?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${O.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${(()=>g&&d?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`)()}
        ${d?`
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
  }`};return{name:"AttentionScore",shaderCache:{hint:`${t!==void 0};${r}`,inputDependencies:x},getRunData:()=>({outputs:_,dispatchGroup:b,programUniforms:y}),getShaderSource:v}},Br=(r,e,n,t,o,i,s,a,u,l,c=void 0,d=void 0)=>{let f=Math.min(r.outputCount,1+(s?1:0)+(a?1:0)),m=f>1?l.pastSequenceLength:0,p=m+l.kvSequenceLength,h=u&&$.size(u.dims)>0?u:void 0,b=[e,n];f>1&&s&&$.size(s.dims)>0&&b.push(s),h&&b.push(h),c&&b.push(c),d&&b.push(d);let y=r.compute(U_(f,e,n,s,h,l,m,c,d),{inputs:b,outputs:f>1?[-1,1]:[-1]})[0];r.compute(G_(y,l.batchSize,l.numHeads,m,l.sequenceLength,p,c,d),{inputs:c&&d?[y,c,d]:[y],outputs:[]});let g=[y,t];f>1&&a&&$.size(a.dims)>0&&g.push(a),c&&g.push(c),d&&g.push(d),r.compute(W_(f,y,t,a,l,m,c,d),{inputs:g,outputs:f>1?[0,2]:[0]})},H_=(r,e)=>{let n=[e.batchSize,e.numHeads,e.sequenceLength,e.headSize],t=e.sequenceLength,o=e.inputHiddenSize,i=e.headSize,s=12,a={x:Math.ceil(e.headSize/s),y:Math.ceil(e.sequenceLength/s),z:e.batchSize*e.numHeads},u=[r.inputs[0],r.inputs[1],r.inputs[2]],l=[{type:12,data:t},{type:12,data:o},{type:12,data:i},{type:12,data:e.numHeads},{type:12,data:e.headSize},{type:12,data:e.hiddenSize},{type:12,data:e.hiddenSize+e.hiddenSize+e.vHiddenSize}],c=d=>{let f=D("output_q",u[0].dataType,n),m=D("output_k",u[0].dataType,n),p=D("output_v",u[0].dataType,n),h=P("input",u[0].dataType,u[0].dims),b=P("weight",u[1].dataType,u[1].dims),y=P("bias",u[2].dataType,u[2].dims),g=h.type.storage,x=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${g}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${g}, ${s*s}>;
  var<workgroup> tileWeightK: array<${g}, ${s*s}>;
  var<workgroup> tileWeightV: array<${g}, ${s*s}>;
  ${d.registerUniforms(x).declareVariables(h,b,y,f,m,p)}
  ${d.mainStart([s,s,1])}
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
  }`};return r.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0},{dims:n,dataType:r.inputs[0].dataType,gpuDataType:0}],dispatchGroup:a,programUniforms:l}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},Np=(r,e)=>{let n=F_(r.inputs,e),[t,o,i]=H_(r,n);return Br(r,t,o,i,r.inputs[4],void 0,void 0,void 0,r.inputs[5],n)}});var q_,K_,j_,Vp,Mp=S(()=>{"use strict";Ke();X();te();Pe();ne();q_=(r,e)=>{if(!r||r.length!==5)throw new Error("BatchNormalization requires 5 inputs");let n=(t,o,i)=>{let s=o.length;if(s!==t.length)throw new Error(`${i}: num dimensions != ${s}`);o.forEach((a,u)=>{if(a!==t[u])throw new Error(`${i}: dim[${u}] do not match`)})};if(r[0].dims.length>1){let t=e.format==="NHWC"?e.spatial?r[0].dims.slice(-1):r[0].dims.slice(-1).concat(r[0].dims.slice(1,r[0].dims.length-1)):r[0].dims.slice(1,e.spatial?2:void 0);n(r[1].dims,t,"Invalid input scale"),n(r[2].dims,t,"Invalid input B"),n(r[3].dims,t,"Invalid input mean"),n(r[4].dims,t,"Invalid input var")}else n(r[1].dims,[1],"Invalid input scale"),n(r[2].dims,[1],"Invalid input B"),n(r[3].dims,[1],"Invalid input mean"),n(r[4].dims,[1],"Invalid input var")},K_=(r,e)=>{let{epsilon:n,spatial:t,format:o}=e,i=r[0].dims,s=t?xe(i[i.length-1]):1,a=o==="NHWC"&&i.length>1?s:1,u=$.size(i)/s,l=t,c=l?i.length:i,d=P("x",r[0].dataType,r[0].dims,s),f=P("scale",r[1].dataType,r[1].dims,a),m=P("bias",r[2].dataType,r[2].dims,a),p=P("inputMean",r[3].dataType,r[3].dims,a),h=P("inputVar",r[4].dataType,r[4].dims,a),b=D("y",r[0].dataType,c,s),y=()=>{let x="";if(t)x=`let cOffset = ${i.length===1?"0u":o==="NHWC"?`outputIndices[${i.length-1}] / ${s}`:"outputIndices[1]"};`;else if(o==="NCHW")x=`
            ${b.indicesSet("outputIndices","0","0")}
            let cOffset = ${b.indicesToOffset("outputIndices")};`;else{x=`var cIndices = ${f.type.indices}(0);
                       cIndices[0] = outputIndices[${i.length-1}];`;for(let _=1;_<f.rank;_++)x+=`cIndices[${_}] = outputIndices[${_}];`;x+=`let cOffset = ${f.indicesToOffset("cIndices")};`}return x},g=x=>`
  const epsilon = ${n};
  ${x.registerUniform("outputSize","u32").declareVariables(d,f,m,p,h,b)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${b.offsetToIndices(`global_idx * ${s}`)};
    ${y()}
    let scale = ${f.getByOffset("cOffset")};
    let bias = ${m.getByOffset("cOffset")};
    let inputMean = ${p.getByOffset("cOffset")};
    let inputVar = ${h.getByOffset("cOffset")};
    let x = ${d.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${b.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${e.epsilon}_${e.format}_${t}_${s}`,inputDependencies:l?["rank","type","type","type","type"]:void 0},getShaderSource:g,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l?[{type:12,data:u},...B(i)]:[{type:12,data:u}]})}},j_=r=>Z(r),Vp=(r,e)=>{let{inputs:n,outputCount:t}=r,o=j_({...e,outputCount:t});if(j.webgpu.validateInputContent&&q_(n,o),e.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");r.compute(K_(n,o))}});var X_,Z_,Fp,Gp=S(()=>{"use strict";te();ne();X_=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(r[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Z_=r=>{let e=r[0].dims,n=r[0].dims[2],t=$.size(e)/4,o=r[0].dataType,i=P("input",o,e,4),s=P("bias",o,[n],4),a=P("residual",o,e,4),u=D("output",o,e,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(t/64)}}),getShaderSource:c=>`
  const channels = ${n}u / 4;
  ${c.declareVariables(i,s,a,u)}

  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes(t)}
    let value = ${i.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${a.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},Fp=r=>{X_(r.inputs),r.compute(Z_(r.inputs))}});var J_,he,Up,Wp,Hp,qp,Kp,jp,Xp,Zp,Jp,Y_,Yp,Qp,em,tm,ln,rm,Fo,nm,om,im,am,sm,um,lm,cm,dm,fm,pm,mm,hm,gm,bm,ym,xm,wm,Ra,Na,_m,Tm,vm,Q_,eT,Im,Go=S(()=>{"use strict";X();te();Pe();ne();J_=(r,e,n,t,o,i,s)=>{let a=Math.ceil(e/4),u="";typeof o=="string"?u=`${o}(a)`:u=o("a");let l=P("inputData",n,[a],4),c=D("outputData",t,[a],4),d=[{name:"vec_size",type:"u32"}];return s&&d.push(...s),`
      ${r.registerUniforms(d).declareVariables(l,c)}

  ${i??""}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${l.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},he=(r,e,n,t,o,i=r.dataType,s,a)=>{let u=[{type:12,data:Math.ceil($.size(r.dims)/4)}];return s&&u.push(...s),{name:e,shaderCache:{hint:o,inputDependencies:["type"]},getShaderSource:l=>J_(l,$.size(r.dims),r.dataType,i,n,t,a),getRunData:l=>({outputs:[{dims:r.dims,dataType:i}],dispatchGroup:{x:Math.ceil($.size(l[0].dims)/64/4)},programUniforms:u})}},Up=r=>{r.compute(he(r.inputs[0],"Abs","abs"))},Wp=r=>{r.compute(he(r.inputs[0],"Acos","acos"))},Hp=r=>{r.compute(he(r.inputs[0],"Acosh","acosh"))},qp=r=>{r.compute(he(r.inputs[0],"Asin","asin"))},Kp=r=>{r.compute(he(r.inputs[0],"Asinh","asinh"))},jp=r=>{r.compute(he(r.inputs[0],"Atan","atan"))},Xp=r=>{r.compute(he(r.inputs[0],"Atanh","atanh"))},Zp=r=>Z(r),Jp=(r,e)=>{let n;switch(e.to){case 10:n="vec4<f16>";break;case 1:n="vec4<f32>";break;case 12:n="vec4<u32>";break;case 6:n="vec4<i32>";break;case 9:n="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${e.to}`)}r.compute(he(r.inputs[0],"Cast",n,void 0,e.cacheKey,e.to))},Y_=r=>{let e,n,t=r.length>=2&&r[1].data!==0,o=r.length>=3&&r[2].data!==0;switch(r[0].dataType){case 1:e=t?r[1].getFloat32Array()[0]:-34028234663852886e22,n=o?r[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:e=t?r[1].getUint16Array()[0]:64511,n=o?r[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Z({min:e,max:n})},Yp=(r,e)=>{let n=e||Y_(r.inputs),t=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"Clip",o=>`clamp(${o}, vec4<${t}>(uniforms.min), vec4<${t}>(uniforms.max))`,void 0,n.cacheKey,void 0,[{type:r.inputs[0].dataType,data:n.min},{type:r.inputs[0].dataType,data:n.max}],[{name:"min",type:t},{name:"max",type:t}]),{inputs:[0]})},Qp=r=>{r.compute(he(r.inputs[0],"Ceil","ceil"))},em=r=>{r.compute(he(r.inputs[0],"Cos","cos"))},tm=r=>{r.compute(he(r.inputs[0],"Cosh","cosh"))},ln=r=>Z(r),rm=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${n}(${e.alpha});

  fn elu_f32(a: ${n}) -> ${n} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${n}>) -> vec4<${n}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,e.cacheKey))},Fo=(r="f32")=>`
const r0: ${r} = 0.3275911;
const r1: ${r} = 0.254829592;
const r2: ${r} = -0.284496736;
const r3: ${r} = 1.421413741;
const r4: ${r} = -1.453152027;
const r5: ${r} = 1.061405429;

fn erf_vf32(v: vec4<${r}>) -> vec4<${r}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,nm=r=>{let e=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"Erf",n=>`erf_vf32(${n})`,Fo(e)))},om=r=>{r.compute(he(r.inputs[0],"Exp","exp"))},im=r=>{r.compute(he(r.inputs[0],"Floor","floor"))},am=r=>{let e=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"Gelu",n=>`0.5 * ${n} * (1.0 + erf_vf32(${n} * 0.7071067811865475))`,Fo(e)))},sm=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${n}>(0.0))`,`const leaky_relu_alpha_ = ${n}(${e.alpha});`,e.cacheKey))},um=r=>{r.compute(he(r.inputs[0],"Not",e=>`!${e}`))},lm=r=>{r.compute(he(r.inputs[0],"Neg",e=>`-${e}`))},cm=r=>{r.compute(he(r.inputs[0],"Reciprocal",e=>`1.0/${e}`))},dm=r=>{let e=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"Relu",n=>`select(vec4<${e}>(0.0), ${n}, ${n} > vec4<${e}>(0.0))`))},fm=r=>{r.compute(he(r.inputs[0],"Sigmoid",e=>`(1.0 / (1.0 + exp(-${e})))`))},pm=r=>Z(r),mm=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"HardSigmoid",t=>`max(vec4<${n}>(0.0), min(vec4<${n}>(1.0), ${e.alpha} * ${t} + vec4<${n}>(${e.beta})))`,void 0,e.cacheKey))},hm=r=>{r.compute(he(r.inputs[0],"Sin","sin"))},gm=r=>{r.compute(he(r.inputs[0],"Sinh","sinh"))},bm=r=>{r.compute(he(r.inputs[0],"Sqrt","sqrt"))},ym=r=>{r.compute(he(r.inputs[0],"Tan","tan"))},xm=r=>`sign(${r}) * (1 - exp(-2 * abs(${r}))) / (1 + exp(-2 * abs(${r})))`,wm=r=>{r.compute(he(r.inputs[0],"Tanh",xm))},Ra=(r="f32")=>`
const fast_gelu_a: ${r} = 0.5;
const fast_gelu_b: ${r} = 0.7978845608028654;
const fast_gelu_c: ${r} = 0.035677408136300125;

fn tanh_v(v: vec4<${r}>) -> vec4<${r}> {
  return ${xm("v")};
}
`,Na=r=>`(fast_gelu_a + fast_gelu_a * tanh_v(${r} * (fast_gelu_c * ${r} * ${r} + fast_gelu_b))) * ${r}`,_m=r=>{let e=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"FastGelu",Na,Ra(e),void 0,r.inputs[0].dataType))},Tm=(r,e)=>{let n=Ve(r.inputs[0].dataType);return r.compute(he(r.inputs[0],"ThresholdedRelu",t=>`select(vec4<${n}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${n}>(${e.alpha});`,e.cacheKey)),0},vm=r=>{r.compute(he(r.inputs[0],"Log","log"))},Q_=(r,e)=>`
const alpha = vec4<${r}>(${e});
const one = ${r}(1.0);
const zero = ${r}(0.0);

fn quick_gelu_impl(x: vec4<${r}>) -> vec4<${r}> {
  let v = x *alpha;
  var x1 : vec4<${r}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,eT=r=>`quick_gelu_impl(${r})`,Im=(r,e)=>{let n=Ve(r.inputs[0].dataType);r.compute(he(r.inputs[0],"QuickGelu",eT,Q_(n,e.alpha),e.cacheKey,r.inputs[0].dataType))}});var tT,rT,$m,Am=S(()=>{"use strict";te();ne();Go();tT=r=>{if(r[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(r[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(r[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(r[0].dims[2]!==r[1].dims[0])throw new Error("last dimension of input and bias are not the same")},rT=r=>{let e=r[0].dims.slice();e[2]=e[2]/2;let n=P("input",r[0].dataType,r[0].dims,4),t=P("bias",r[0].dataType,[r[0].dims[2]],4),o=D("output",r[0].dataType,e,4),i=$.size(e)/4,s=me(r[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:e,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${u.declareVariables(n,t,o)}

  ${Fo(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${o.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},$m=r=>{tT(r.inputs),r.compute(rT(r.inputs))}});var nT,oT,Lt,Pm,Om,Em,Cm,km,Dm,Bm,Lm,zm,Rm,Nm=S(()=>{"use strict";X();te();ne();nT=(r,e,n,t,o,i,s,a,u,l,c,d)=>{let f,m;typeof a=="string"?f=m=(g,x)=>`${a}((${g}),(${x}))`:typeof a=="function"?f=m=a:(f=a.scalar,m=a.vector);let p=D("outputData",c,t.length,4),h=P("aData",u,e.length,4),b=P("bData",l,n.length,4),y;if(o)if(i){let g=$.size(e)===1,x=$.size(n)===1,_=e.length>0&&e[e.length-1]%4===0,v=n.length>0&&n[n.length-1]%4===0;g||x?y=p.setByOffset("global_idx",m(g?`${h.type.value}(${h.getByOffset("0")}.x)`:h.getByOffset("global_idx"),x?`${b.type.value}(${b.getByOffset("0")}.x)`:b.getByOffset("global_idx"))):y=`
            let outputIndices = ${p.offsetToIndices("global_idx * 4u")};
            let offsetA = ${h.broadcastedIndicesToOffset("outputIndices",p)};
            let offsetB = ${b.broadcastedIndicesToOffset("outputIndices",p)};
            ${p.setByOffset("global_idx",m(s||_?h.getByOffset("offsetA / 4u"):`${h.type.value}(${h.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||v?b.getByOffset("offsetB / 4u"):`${b.type.value}(${b.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else y=p.setByOffset("global_idx",m(h.getByOffset("global_idx"),b.getByOffset("global_idx")));else{if(!i)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let g=(x,_,v="")=>{let I=`aData[indexA${_}][componentA${_}]`,O=`bData[indexB${_}][componentB${_}]`;return`
            let outputIndices${_} = ${p.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offsetA${_} = ${h.broadcastedIndicesToOffset(`outputIndices${_}`,p)};
            let offsetB${_} = ${b.broadcastedIndicesToOffset(`outputIndices${_}`,p)};
            let indexA${_} = offsetA${_} / 4u;
            let indexB${_} = offsetB${_} / 4u;
            let componentA${_} = offsetA${_} % 4u;
            let componentB${_} = offsetB${_} % 4u;
            ${x}[${_}] = ${v}(${f(I,O)});
          `};c===9?y=`
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
        ${r.registerUniform("vec_size","u32").declareVariables(h,b,p)}

        ${d??""}

        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${y}
      }`},oT=(r,e,n,t,o,i,s=n.dataType)=>{let a=n.dims.map(h=>Number(h)??1),u=t.dims.map(h=>Number(h)??1),l=!$.areEqual(a,u),c=a,d=$.size(a),f=!1,m=!1,p=[l];if(l){let h=Et.calcShape(a,u,!1);if(!h)throw new Error("Can't perform binary op on the given tensors");c=h.slice(),d=$.size(c);let b=$.size(a)===1,y=$.size(u)===1,g=a.length>0&&a[a.length-1]%4===0,x=u.length>0&&u[u.length-1]%4===0;p.push(b),p.push(y),p.push(g),p.push(x);let _=1;for(let v=1;v<c.length;v++){let I=a[a.length-v],O=u[u.length-v];if(I===O)_*=I;else break}_%4===0?(m=!0,f=!0):(b||y||g||x)&&(f=!0)}else f=!0;return p.push(f),{name:r,shaderCache:{hint:e+p.map(h=>h.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:h=>nT(h,a,u,c,f,l,m,o,n.dataType,t.dataType,s,i),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(d/64/4)},programUniforms:[{type:12,data:Math.ceil($.size(c)/4)},...B(a,u,c)]})}},Lt=(r,e,n,t,o,i)=>{r.compute(oT(e,o??"",r.inputs[0],r.inputs[1],n,t,i))},Pm=r=>{Lt(r,"Add",(e,n)=>`${e}+${n}`)},Om=r=>{Lt(r,"Div",(e,n)=>`${e}/${n}`)},Em=r=>{Lt(r,"Equal",{scalar:(e,n)=>`u32(${e}==${n})`,vector:(e,n)=>`vec4<u32>(${e}==${n})`},void 0,void 0,9)},Cm=r=>{Lt(r,"Mul",(e,n)=>`${e}*${n}`)},km=r=>{let e=P("input",r.inputs[0].dataType,r.inputs[0].dims).type.value;Lt(r,"Pow",{scalar:(t,o)=>`pow_custom(${t},${o})`,vector:(t,o)=>`pow_vector_custom(${t},${o})`},`
    fn pow_custom(a : ${e}, b : ${e}) -> ${e} {
      if (b == ${e}(0.0)) {
        return ${e}(1.0);
      } else if (a < ${e}(0.0) && f32(b) != floor(f32(b))) {
        return ${e}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${e}(1.0), round(f32(abs(b) % ${e}(2.0))) != 1.0) * ${e}(${e==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${e}>, b : vec4<${e}>) -> vec4<${e}> {
      // TODO: implement vectorized pow
      return vec4<${e}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Dm=r=>{Lt(r,"Sub",(e,n)=>`${e}-${n}`)},Bm=r=>{Lt(r,"Greater",{scalar:(e,n)=>`u32(${e}>${n})`,vector:(e,n)=>`vec4<u32>(${e}>${n})`},void 0,void 0,9)},Lm=r=>{Lt(r,"Less",{scalar:(e,n)=>`u32(${e}<${n})`,vector:(e,n)=>`vec4<u32>(${e}<${n})`},void 0,void 0,9)},zm=r=>{Lt(r,"GreaterOrEqual",{scalar:(e,n)=>`u32(${e}>=${n})`,vector:(e,n)=>`vec4<u32>(${e}>=${n})`},void 0,void 0,9)},Rm=r=>{Lt(r,"LessOrEqual",{scalar:(e,n)=>`u32(${e}<=${n})`,vector:(e,n)=>`vec4<u32>(${e}<=${n})`},void 0,void 0,9)}});var aT,sT,uT,lT,Vm,Mm,Fm=S(()=>{"use strict";X();te();Pe();ne();aT=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");let n=0,t=r[n],o=t.dataType,i=t.dims.length;r.forEach((s,a)=>{if(a!==n){if(s.dataType!==o)throw new Error("input tensors should be one type");if(s.dims.length!==i)throw new Error("input tensors should have the same shape");s.dims.forEach((u,l)=>{if(l!==e&&u!==t.dims[l])throw new Error("non concat dimensions must match")})}})},sT=(r,e)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${r}u>(${e});
    for (var i: u32 = 0u; i < ${r}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${r}u;
  }`,uT=(r,e)=>{let n=r.length,t=[];for(let o=0;o<n;++o){let i=e.setByOffset("global_idx",r[o].getByIndices("indices"));n===1?t.push(i):o===0?t.push(`if (inputIndex == ${o}u) { ${i} }`):o===n-1?t.push(`else { ${i} }`):t.push(`else if (inputIndex == ${o}) { ${i} }`)}return t.join(`
`)},lT=(r,e,n,t)=>{let o=$.size(n),i=new Array(r.length),s=new Array(r.length),a=0,u=[],l=[],c=[{type:12,data:o}];for(let h=0;h<r.length;++h)a+=r[h].dims[e],i[h]=a,l.push(r[h].dims.length),s[h]=P(`input${h}`,t,l[h]),u.push("rank"),c.push({type:12,data:i[h]});for(let h=0;h<r.length;++h)c.push(...B(r[h].dims));c.push(...B(n));let d=D("output",t,n.length),f=d.indicesGet("indices",e),m=Array.from(Array(i.length).keys()).map(h=>`uniforms.sizeInConcatAxis${h}`).join(","),p=h=>`

  ${(()=>{h.registerUniform("outputSize","u32");for(let b=0;b<r.length;b++)h.registerUniform(`sizeInConcatAxis${b}`,"u32");return h.declareVariables(...s,d)})()}

  ${sT(i.length,m)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${d.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${f});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${i.length}u>(${m});
      ${f} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${uT(s,d)}
  }`;return{name:"Concat",shaderCache:{hint:`${e}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:c}),getShaderSource:p}},Vm=(r,e)=>{let n=r.inputs,t=n[0].dims,o=$.normalizeAxis(e.axis,t.length);aT(n,o);let i=t.slice();i[o]=n.reduce((a,u)=>a+(u.dims.length>o?u.dims[o]:0),0);let s=n.filter(a=>$.size(a.dims)>0);r.compute(lT(s,o,i,n[0].dataType),{inputs:s})},Mm=r=>Z({axis:r.axis})});var ot,it,at,Uo,Mt=S(()=>{"use strict";X();te();ot=(r,e,n="f32")=>{switch(r.activation){case"Relu":return`value = max(value, ${e}(0.0));`;case"Sigmoid":return`value = (${e}(1.0) / (${e}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${e}(${n}(uniforms.clip_min)), ${e}(${n}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${e}(0.0), min(${e}(1.0), ${n}(uniforms.alpha) * value + ${n}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${n}(uniforms.alpha) * value, value, value >= ${e}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${r.activation}`)}},it=(r,e)=>{r.activation==="Clip"?e.push({type:1,data:r.clipMax},{type:1,data:r.clipMin}):r.activation==="HardSigmoid"?e.push({type:1,data:r.alpha},{type:1,data:r.beta}):r.activation==="LeakyRelu"&&e.push({type:1,data:r.alpha})},at=(r,e)=>{r.activation==="Clip"?e.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):r.activation==="HardSigmoid"?e.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):r.activation==="LeakyRelu"&&e.push({name:"alpha",type:"f32"})},Uo=r=>{let e=r?.activation||"";if(e==="HardSigmoid"){let[n,t]=r?.activation_params||[.2,.5];return{activation:e,alpha:n,beta:t}}else if(e==="Clip"){let[n,t]=r?.activation_params||[sp,up];return{activation:e,clipMax:t,clipMin:n}}else if(e==="LeakyRelu"){let[n]=r?.activation_params||[.01];return{activation:e,alpha:n}}return{activation:e}}});var Ue,Wo,cn=S(()=>{"use strict";Ue=(r,e)=>{switch(r){case 1:return e;case 2:return`vec2<${e}>`;case 3:return`vec3<${e}>`;case 4:return`vec4<${e}>`;default:throw new Error(`${r}-component is not supported.`)}},Wo=r=>`
      ${r?"value = value + getBiasByOutputCoords(coords);":""}
      `});var Ho,Va=S(()=>{"use strict";Ho=r=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${r}.x), i32(${r}.y), i32(${r}.z), 1));
}
`});var dn,qo,Ko=S(()=>{"use strict";X();te();ne();Mt();dn=(r,e,n,t,o)=>{let i=t-n;return`
      ${Array.from({length:n}).map((s,a)=>`
      if (${F(e.shape,a,e.rank)} != 1) {
        ${e.indicesSet(r,a,F(o,a+i,t))}
      } else {
        ${e.indicesSet(r,a,0)}
      }`).join("")}
`},qo=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s[s.length-2],l=a[a.length-1],c=s[s.length-1],d=xe(l),f=xe(c),m=xe(u),p=$.size(n)/d/m,h=r.length>2,b=t?t.slice(0,-2):n.slice(0,-2),g=[$.size(b),u,l],x=[{type:12,data:p},{type:12,data:u},{type:12,data:l},{type:12,data:c}];it(e,x),x.push(...B(b,s,a)),h&&x.push(...B(r[2].dims)),x.push(...B(g));let _=v=>{let I=Ro("batch_dims",r[0].dataType,b.length),O=P("a",r[0].dataType,s.length,f),E=P("b",r[1].dataType,a.length,d),k=D("output",r[0].dataType,g.length,d),N=me(k.type.tensor),C=ot(e,k.type.value,N),ee=[O,E],V="";if(h){let K=o?d:1;ee.push(P("bias",r[2].dataType,r[2].dims.length,K)),V=`${o?`value += bias[col / ${K}];`:`value += ${k.type.value}(bias[row + i]);`}`}let J=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];at(e,J);let Se=()=>{let K=`var a_data: ${O.type.value};`;for(let Y=0;Y<f;Y++)K+=`
              let b_data${Y} = b[(b_offset + (k + ${Y}) * uniforms.N + col) / ${d}];`;for(let Y=0;Y<m;Y++){K+=`a_data = a[(a_offset + (row + ${Y}) * uniforms.K + k) / ${f}];`;for(let oe=0;oe<f;oe++)K+=`
            values[${Y}] = fma(${E.type.value}(a_data${f===1?"":`[${oe}]`}), b_data${oe}, values[${Y}]);
`}return K};return`
  ${v.registerUniforms(J).registerInternalVariables(I).declareVariables(...ee,k)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${d})) * ${d};
    var index1 = global_idx / (uniforms.N / ${d});
    let stride1 = uniforms.M / ${m};
    let row = (index1 % stride1) * ${m};
    let batch = index1 / stride1;

    ${n.length===2?"":`let batch_indices = ${I.offsetToIndices("batch")};`}

    var a_indices: ${O.type.indices};
    ${dn("a_indices",O,O.rank-2,I.rank,"batch_indices")}
    ${O.indicesSet("a_indices",O.rank-2,0)}
    ${O.indicesSet("a_indices",O.rank-1,0)}
    let a_offset = ${O.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${dn("b_indices",E,E.rank-2,I.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${k.type.value}, ${m}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${f}) {
      ${Se()}
    }
    for (var i = 0u; i < ${m}u; i++) {
      var value = values[i];
      ${V}
      ${C}
      let cur_indices = ${k.type.indices}(batch, row + i, col);
      let offset = ${k.indicesToOffset("cur_indices")};
      ${k.setByOffset(`offset / ${d}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${e.activation};${d};${f};${m};${o}`,inputDependencies:h?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:x}),getShaderSource:_}}});var cT,dT,fn,Gm,fT,pn,pT,mn,hn=S(()=>{"use strict";X();te();ne();Mt();Ko();cn();cT=(r,e)=>r?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${e?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${e?", batchIndices":""});
        `,dT=(r,e)=>r?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${e===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${e===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,fn=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32)=>{let u=e[1]*r[1],l=e[0]*r[0],c=o?u:i,d=o?i:u,f=c/e[0],m=i/e[1];if(!((o&&f===4&&r[1]===4||!o&&(f===3||f===4))&&c%e[0]===0&&i%e[1]===0&&r[0]===4))throw new Error(`If transposeA ${o} is true, innerElementSize ${f} and workPerThread[1] ${r[1]} must be 4.
      Otherwise, innerElementSize ${f} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${e[0]}. tileInner ${i} must be divisible by workgroupSize[1] ${e[1]}. colPerThread ${r[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${f}<${n}>, ${c/f}>, ${d}>;
var<workgroup> mm_Bsub: array<array<vec4<${n}>, ${l/r[0]}>, ${i}>;

const rowPerThread = ${r[1]};
const colPerThread = ${r[0]};
const innerElementSize = ${f};
const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

  var acc: array<vec4<${n}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${m};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${cT(o,t)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${t?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${f===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${dT(o,f)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Gm=(r,e)=>r?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${e?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${e?", batchIndices":""});
            `,fT=r=>r?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",pn=(r,e,n="f32",t,o=!1,i=32,s=!1,a=32,u=!1)=>{let l=r[1]*e[1],c=r[0]*e[0],d=o?l:i,f=o?i:l;if(!(f%e[1]===0&&d%e[0]===0&&i%e[1]===0))throw new Error(`tileAHight ${f} must be divisible by workgroupSize[1]${e[1]}, tileAWidth ${d} must be divisible by workgroupSize[0]${e[0]}, tileInner ${i} must be divisible by workgroupSize[1]${e[1]}`);let m=f/e[1],p=d/e[0],h=i/e[1],b=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${l};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${f}; inputRow = inputRow + ${e[1]}) {
        for (var inputCol = localCol; inputCol < ${d}; inputCol = inputCol + ${e[0]}) {
          ${Gm(o,t)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${i}; inputRow = inputRow + ${e[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${e[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${t?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${n}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${e[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${o?`mm_Asub[k][localRow + innerRow * ${e[1]}];`:`mm_Asub[localRow + innerRow * ${e[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${e[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${e[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${l};

let tileRowA = i32(localId.y) * ${m};
let tileColA = i32(localId.x) * ${p};
let tileRowB = i32(localId.y) * ${h};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${m}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${p}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Gm(o,t)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${h}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${t?", batchIndices":""});
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
      ${fT(o)}
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
  var<workgroup> mm_Asub : array<array<${n}, ${d}>, ${f}>;
  var<workgroup> mm_Bsub : array<array<${n}, ${c}>, ${i}>;
  const rowPerThread = ${r[1]};
  const colPerThread = ${r[0]};
  const tileInner = ${i};

@compute @workgroup_size(${e[0]}, ${e[1]}, ${e[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${t?`let batchIndices = ${t.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(a/i)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${a}`:"0"};

    var acc : array<array<${n}, colPerThread>, rowPerThread>;
    ${b}
  }
`},pT=(r,e,n,t,o=!1)=>{let[i,s,a,u]=t,l=me(t[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ue(r,l)} {
      var value = ${Ue(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${dn("aIndices",s,s.rank-2,i.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${i.type.indices}) -> ${Ue(r,l)} {
      var value = ${Ue(r,l)}(0.0);
      let col = colIn * ${r};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${a.type.indices};
        ${dn("bIndices",a,a.rank-2,i.rank,"batchIndices")}
        ${a.indicesSet("bIndices",a.rank-2,"u32(row)")}
        ${a.indicesSet("bIndices",a.rank-1,"u32(colIn)")}
        value = ${a.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ue(r,l)}) {
      let col = colIn * ${r};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${e?`value = value + ${o?"bias[colIn]":`${Ue(r,l)}(bias[row])`};`:""}
        ${n}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},mn=(r,e,n,t,o=!1,i)=>{let s=r[0].dims,a=r[1].dims,u=s.slice(0,-2),l=a.slice(0,-2),c=t?t.slice(0,-2):n.slice(0,-2),d=$.size(c),f=s[s.length-2],m=s[s.length-1],p=a[a.length-1],h=m%4===0&&p%4===0,b=f<=8?[4,1,1]:[4,4,1],y=[8,8,1],g=[Math.ceil(p/y[0]/b[0]),Math.ceil(f/y[1]/b[1]),Math.ceil(d/y[2]/b[2])],x=h?4:1,_=[...u,f,m/x],v=_.length,I=[...l,m,p/x],O=I.length,E=[d,f,p/x],k=[{type:6,data:f},{type:6,data:p},{type:6,data:m}];it(e,k),k.push(...B(c,_,I));let N=["rank","rank"],C=r.length>2;C&&(k.push(...B(r[2].dims)),N.push("rank")),k.push(...B(E));let ee=V=>{let J=c.length,Se=Ro("batchDims",r[0].dataType,J,1),K=me(r[0].dataType),Y=P("a",r[0].dataType,v,x),oe=P("b",r[1].dataType,O,x),Q=D("result",r[0].dataType,E.length,x),_e=[Y,oe];if(C){let U=o?x:1;_e.push(P("bias",r[2].dataType,r[2].dims.length,U))}let qe=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];at(e,qe);let Ee=me(Q.type.tensor),de=ot(e,Q.type.value,Ee),z=pT(x,C,de,[Se,Y,oe,Q],o);return`
  ${V.registerUniforms(qe).registerInternalVariables(Se).declareVariables(..._e,Q)}
  ${z}
  ${h?fn(b,y,K,Se):pn(b,y,K,Se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${b};${e.activation};${h};${o}`,inputDependencies:N},getRunData:()=>({outputs:[{dims:i?i(n):n,dataType:r[0].dataType}],dispatchGroup:{x:g[0],y:g[1],z:g[2]},programUniforms:k}),getShaderSource:ee}}});var mT,Um,Wm=S(()=>{"use strict";X();vt();ne();Mt();cn();Va();hn();mT=(r,e,n,t,o=!1,i,s=4,a=4,u=4,l="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${l}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},d=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=r?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,m=r?`
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
    `,p=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",h=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",b=r?"row":"col",y=r?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${b} / outWidth;
    let outCol = ${b} % outWidth;

    let WRow = ${y} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${y} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${y} % inChannels;
    var resData = ${Ue(s,l)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${p} && xCol >= 0 && xCol < ${h}) {
      ${f}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,x=r?e&&t?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${Ue(s,l)}(0.0);`:t&&n?`
    let col = colIn * ${s};
    ${g}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${Ue(s,l)}(0.0);`,_=`${d(a)}`,v=Ue(u,l),I=r?Ue(s,l):Ue(a,l),O=r?Ue(a,l):Ue(s,l),E=ot(i,v,l);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${r?x:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${O} {
      ${r?_:x}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${v}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${m}
      ${Wo(o)}
      ${E}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Um=(r,e,n,t,o,i,s,a,u)=>{let l=e.format==="NHWC",c=l?r[0].dims[3]:r[0].dims[1],d=n[0],f=l?n[2]:n[3],m=l?n[1]:n[2],p=l?n[3]:n[1],h=l&&(c%4===0||c%3===0)&&p%4===0,b=l?p:f*m,y=l?f*m:p,g=[8,8,1],x=t<=8?[4,1,1]:[4,4,1],_=[Math.ceil(b/g[0]/x[0]),Math.ceil(y/g[1]/x[1]),Math.ceil(d/g[2]/x[2])];ae("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${_}`);let v=h?l&&c%4!==0?3:4:1,I=g[1]*x[1],O=g[0]*x[0],E=Math.max(g[0]*v,g[1]),k=t%I===0,N=o%O===0,C=i%E===0,ee=h?[v,4,4]:[1,1,1],V=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:[e.pads[0],e.pads[1]]},{type:6,data:e.strides},{type:6,data:e.dilations}];it(e,V),V.push(...B(r[0].dims,r[1].dims));let J=["rank","rank"];s&&(V.push(...B(r[2].dims)),J.push("rank")),V.push(...B(n));let Se=K=>{let Y=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];at(e,Y);let oe=h?4:1,Q=me(r[0].dataType),_e=`
      fn setOutputAtIndex(flatIndex : i32, value : ${h?`vec4<${Q}>`:Q}) {
        result[flatIndex] = ${h?`vec4<${Q}>`:Q}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${h?`vec4<${Q}>`:Q}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${h?"/ 4":""}, value);
      }`,qe=P("x",r[0].dataType,r[0].dims.length,v===3?1:v),Ee=P("w",r[1].dataType,r[1].dims.length,oe),de=[qe,Ee],z=D("result",r[0].dataType,n.length,oe);if(s){let U=P("bias",r[2].dataType,r[2].dims.length,oe);de.push(U),_e+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${h?`vec4<${Q}>`:Q} {
          return bias[coords.${l?"w":"y"}${h?"/ 4":""}];
        }`}return`
        ${Ho("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${K.registerUniforms(Y).declareVariables(...de,z)}
        ${_e}
        ${mT(l,k,N,C,s,e,ee[0],ee[1],ee[2],Q)}
        ${h?fn(x,g,Q,void 0,!l,E):pn(x,g,Q,void 0,!l,E,!1,void 0,a)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${e.cacheKey};${v};${h};${k};${N};${C};${I};${O};${E}`,inputDependencies:J},getRunData:()=>({outputs:[{dims:u?u(n):n,dataType:r[0].dataType}],dispatchGroup:{x:_[0],y:_[1],z:_[2]},programUniforms:V}),getShaderSource:Se}}});var hT,Hm,jo,gT,qm,bT,Km,jm,Xm=S(()=>{"use strict";X();vt();te();ne();Mt();cn();hT=r=>{let e=1;for(let n=0;n<r.length;n++)e*=r[n];return e},Hm=r=>typeof r=="number"?[r,r,r]:r,jo=(r,e)=>e<=1?r:r+(r-1)*(e-1),gT=(r,e,n,t=1)=>{let o=jo(e,t);return Math.floor((r[0]*(n-1)-n+o)/2)},qm=(r,e,n,t,o)=>{o==null&&(o=gT(r,e[0],t[0]));let i=[0,0,0,n];for(let s=0;s<3;s++)r[s]+2*o>=e[s]&&(i[s]=Math.trunc((r[s]-e[s]+2*o)/t[s]+1));return i},bT=(r,e,n,t,o,i,s,a,u,l)=>{let c,d,f,m;if(r==="VALID"&&(r=0),typeof r=="number"){c={top:r,bottom:r,left:r,right:r,front:r,back:r};let p=qm([e,n,t,1],[a,u,l],1,[o,i,s],r);d=p[0],f=p[1],m=p[2]}else if(Array.isArray(r)){if(!r.every((h,b,y)=>h===y[0]))throw Error(`Unsupported padding parameter: ${r}`);c={top:r[0],bottom:r[1],left:r[2],right:r[3],front:r[4],back:r[5]};let p=qm([e,n,t,1],[a,u,l],1,[o,i,s],r[0]);d=p[0],f=p[1],m=p[2]}else if(r==="SAME_UPPER"){d=Math.ceil(e/o),f=Math.ceil(n/i),m=Math.ceil(t/s);let p=(d-1)*o+a-e,h=(f-1)*i+u-n,b=(m-1)*s+l-t,y=Math.floor(p/2),g=p-y,x=Math.floor(h/2),_=h-x,v=Math.floor(b/2),I=b-v;c={top:x,bottom:_,left:v,right:I,front:y,back:g}}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:c,outDepth:d,outHeight:f,outWidth:m}},Km=(r,e,n,t,o,i=!1,s="channelsLast")=>{let a,u,l,c,d;if(s==="channelsLast")[a,u,l,c,d]=r;else if(s==="channelsFirst")[a,d,u,l,c]=r;else throw new Error(`Unknown dataFormat ${s}`);let[f,,m,p,h]=e,[b,y,g]=Hm(n),[x,_,v]=Hm(t),I=jo(m,x),O=jo(p,_),E=jo(h,v),{padInfo:k,outDepth:N,outHeight:C,outWidth:ee}=bT(o,u,l,c,b,y,g,I,O,E),V=i?f*d:f,J=[0,0,0,0,0];return s==="channelsFirst"?J=[a,V,N,C,ee]:s==="channelsLast"&&(J=[a,N,C,ee,V]),{batchSize:a,dataFormat:s,inDepth:u,inHeight:l,inWidth:c,inChannels:d,outDepth:N,outHeight:C,outWidth:ee,outChannels:V,padInfo:k,strideDepth:b,strideHeight:y,strideWidth:g,filterDepth:m,filterHeight:p,filterWidth:h,effectiveFilterDepth:I,effectiveFilterHeight:O,effectiveFilterWidth:E,dilationDepth:x,dilationHeight:_,dilationWidth:v,inShape:r,outShape:J,filterShape:e}},jm=(r,e,n,t,o,i)=>{let s=i==="channelsLast",a=s?r[0].dims[3]:r[0].dims[1],u=!1,l=[64,1,1],c={x:n.map((g,x)=>x)},d=[Math.ceil(hT(c.x.map(g=>n[g]))/l[0]),1,1];ae("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${d}`);let f=u?s&&a%4!==0?3:4:1,m=$.size(n),p=[{type:12,data:m},{type:12,data:t},{type:12,data:o},{type:12,data:e.strides},{type:12,data:e.dilations}];it(e,p),p.push(...B(r[0].dims,r[1].dims));let h=["rank","rank"],b=r.length===3;b&&(p.push(...B(r[2].dims)),h.push("rank")),p.push(...B(n));let y=g=>{let x=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:t.length},{name:"pads",type:"u32",length:o.length},{name:"strides",type:"u32",length:e.strides.length},{name:"dilations",type:"u32",length:e.dilations.length}];at(e,x);let _=u?4:1,v=me(r[0].dataType),I=P("x",r[0].dataType,r[0].dims.length,f===3?1:f),O=P("W",r[1].dataType,r[1].dims.length,_),E=[I,O],k=D("result",r[0].dataType,n.length,_),N="";if(b){let V=P("bias",r[2].dataType,r[2].dims.length,_);E.push(V),N+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${v}>`:v} {
          return bias[${s?F("coords",4,5):F("coords",1,5)}${u?"/ 4":""}];
        }`}let C=Ue(f,v),ee=ot(e,C,v);return`
            ${N}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${O.getByIndices("aIndices")};
            }
          ${g.registerUniforms(x).declareVariables(...E,k)}
          ${g.mainStart()}
          ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${k.offsetToIndices("global_idx")};
              let batch = ${F("coords",0,I.rank)};
              let d2 = ${s?F("coords",I.rank-1,I.rank):F("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${s?F("coords",1,I.rank):F("coords",2,I.rank)},
              ${s?F("coords",2,I.rank):F("coords",3,I.rank)},
              ${s?F("coords",3,I.rank):F("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?F("uniforms.x_shape",1,I.rank):F("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${s?F("uniforms.x_shape",2,I.rank):F("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${s?F("uniforms.x_shape",3,I.rank):F("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${s?F("uniforms.x_shape",4,I.rank):F("uniforms.x_shape",1,I.rank)};
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
              ${b?"value = value + getBiasByOutputCoords(coords)":""};
              ${ee}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${e.cacheKey};${s};${f};${b}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:d[0],y:d[1],z:d[2]},programUniforms:p}),getShaderSource:y}}});var Zm,Jm,Ym=S(()=>{"use strict";X();te();ne();Mt();Zm=(r,e,n,t)=>{let o=r.length>2,i=o?"value += b[output_channel];":"",s=r[0].dims,a=r[1].dims,u=e.format==="NHWC",l=u?n[3]:n[1],c=l/e.group,d=u&&c>=4?xe(l):1,f=$.size(n)/d,m=[{type:12,data:f},{type:12,data:e.dilations},{type:12,data:[e.strides[0],e.strides[1]]},{type:12,data:[e.pads[0],e.pads[1]]},{type:12,data:c}];it(e,m),m.push(...B(s,[a[0],a[1],a[2],a[3]/d]));let p=o?["rank","rank","rank"]:["rank","rank"];m.push(...B([n[0],n[1],n[2],n[3]/d]));let h=b=>{let y=D("output",r[0].dataType,n.length,d),g=me(y.type.tensor),x=ot(e,y.type.value,g),_=P("x",r[0].dataType,s.length),v=P("w",r[1].dataType,a.length,d),I=[_,v];o&&I.push(P("b",r[2].dataType,r[2].dims,d));let O=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:e.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];at(e,O);let E=u?`
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
            let xVal = ${_.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${v.get("wHeight","wWidth","wInChannel","output_channel")};
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

            let xVal = ${_.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${v.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${b.registerUniforms(O).declareVariables(...I,y)}

  ${b.mainStart()}
    ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${y.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${d} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${y.type.value} = ${y.type.value}(0);
    ${E}
    ${i}
    ${x}
    ${y.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${e.cacheKey}_${d}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:m}),getShaderSource:h}},Jm=(r,e,n,t)=>{let o=r.length>2,i=xe(n[3]),s=xe(n[2]),a=$.size(n)/i/s,u=[r[0].dims[0],r[0].dims[1],r[0].dims[2],r[0].dims[3]/i],l=[r[1].dims[0],r[1].dims[1],r[1].dims[2],r[1].dims[3]/i],c=[n[0],n[1],n[2],n[3]/i],d=[{type:12,data:a},{type:6,data:[e.strides[0],e.strides[1]]},{type:6,data:[e.pads[0],e.pads[1]]}];it(e,d),d.push(...B(u,l,c));let f=(s-1)*e.strides[1]+l[1],m=p=>{let h=D("output",r[0].dataType,c.length,i),b=me(h.type.tensor),y=ot(e,h.type.value,b),g=P("x",r[0].dataType,u.length,i),x=P("w",r[1].dataType,l.length,i),_=[g,x];o&&_.push(P("b",r[2].dataType,r[2].dims,i));let v=o?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return at(e,I),`
  ${p.registerUniforms(I).declareVariables(..._,h)}
  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${g.type.value}, ${f}>;
    var values: array<${h.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${l[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${f}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${g.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${g.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${l[1]}; w_width++) {
          let w_val = ${x.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${v}
      ${y}
      ${h.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${e.cacheKey};${i};${s};${f};${l[0]};${l[1]}`,inputDependencies:o?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:t?t(n):n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:m}}});var yT,Ma,xT,Fa,Ga,Qm,wT,_T,Ua,eh=S(()=>{"use strict";te();Wm();Xm();hn();Ym();Mt();Ko();Vt();yT=(r,e,n,t,o,i)=>{let s=r[0],a=r.slice(i?1:2,i?3:4),u=a.length,l=e[0],d=e.slice(2).map((p,h)=>p+(p-1)*(n[h]-1)),m=a.map((p,h)=>p+t[h]+t[h+u]).map((p,h)=>Math.floor((p-d[h]+o[h])/o[h]));return m.splice(0,0,s),m.splice(i?3:1,0,l),m},Ma=[2,3,1,0],xT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length>5)throw new Error("greater than 5D is not supported");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[1]*e.group;if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(r.length===3&&(r[2].dims.length!==1||r[1].dims[0]!==r[2].dims[0]))throw new Error("invalid bias");let o=r[0].dims.length-2;if(e.dilations.length!==o)throw new Error(`dilations should be ${o}D`);if(e.strides.length!==o)throw new Error(`strides should be ${o}D`);if(e.pads.length!==o*2)throw new Error(`pads should be ${o*2}D`);if(e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape")},Fa=(r,e)=>{let n=r.kernelShape.slice();n.length<e[1].dims.length-2&&n.push(...Array(e[1].dims.length-2-n.length).fill(0));for(let i=2;i<e[1].dims.length;++i)n[i-2]===0&&(n[i-2]=e[1].dims[i]);let t=r.pads.slice();gr.adjustPadsBasedOnAutoPad(e[0].dims,r.strides,r.dilations,n,t,r.format==="NHWC",r.autoPad);let o=Object.assign({},r);return Object.assign(o,{kernelShape:n,pads:t}),o},Ga=r=>{let e=Uo(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],o=r.dilations,i=r.group,s=r.kernel_shape,a=r.pads,u=r.strides,l=r.w_is_const();return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},Qm=(r,e,n,t)=>{let o=n.format==="NHWC",i=yT(e[0].dims,e[1].dims,n.dilations,n.pads,n.strides,o);if(n.group!==1){let I=[e[0]];if(o){let E=r.kernelCustomData.wT??r.compute(Me(e[1],Ma),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=E),I.push(E)}else I.push(e[1]);e.length===3&&I.push(e[2]),!r.adapterInfo.isArchitecture("ampere")&&o&&e[1].dims[0]===n.group&&e[1].dims[1]===1&&n.dilations[0]===1&&n.dilations[1]===1?r.compute(Jm(I,n,i,t),{inputs:I}):r.compute(Zm(I,n,i,t),{inputs:I});return}let s=e.length===3,a=e[0].dims[o?1:2],u=e[0].dims[o?2:3],l=e[0].dims[o?3:1],c=e[1].dims[2],d=e[1].dims[3],f=i[o?1:2],m=i[o?2:3],p=i[o?3:1],h=o&&c===a&&d===u&&n.pads[0]===0&&n.pads[1]===0;if(h||c===1&&d===1&&n.dilations[0]===1&&n.dilations[1]===1&&n.strides[0]===1&&n.strides[1]===1&&n.pads[0]===0&&n.pads[1]===0){let I=i[0],O,E,k,N=[];if(o){let V=r.kernelCustomData.wT??r.compute(Me(e[1],Ma),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];if(n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=V),h){let J=a*u*l;O=e[0].reshape([1,I,J]),E=V.reshape([1,J,p]),k=[1,I,p]}else O=e[0].reshape([I,a*u,l]),E=V.reshape([1,l,p]),k=[I,f*m,p];N.push(O),N.push(E)}else O=e[0].reshape([I,l,a*u]),E=e[1].reshape([1,p,l]),k=[I,p,f*m],N.push(E),N.push(O);s&&N.push(e[2]);let C=k[2],ee=N[0].dims[N[0].dims.length-1];C<8&&ee<8?r.compute(qo(N,n,i,k,o,t),{inputs:N}):r.compute(mn(N,n,i,k,o,t),{inputs:N});return}let b=!0,y=r.kernelCustomData.wT??r.compute(Me(e[1],Ma),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=y);let g=[e[0],y];s&&g.push(e[2]);let x=o?f*m:p,_=o?p:f*m,v=c*d*l;r.compute(Um(g,n,i,x,_,v,s,b,t),{inputs:g})},wT=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=[0,e.pads[0],0,e.pads[1]],i=[1].concat(e.strides),s=[1].concat(e.dilations),a=[1].concat(e.kernelShape),u=Fa({...e,pads:o,strides:i,dilations:s,kernelShape:a},t);Qm(r,t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]])},_T=(r,e,n)=>{let t=n.format==="NHWC"?"channelsLast":"channelsFirst",o=Fa(n,e),i=n.autoPad==="NOTSET"?n.pads:n.autoPad,s=Km(e[0].dims,e[1].dims,n.strides,n.dilations,i,!1,t);r.compute(jm(e,o,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],t))},Ua=(r,e)=>{if(xT(r.inputs,e),r.inputs[0].dims.length===3)wT(r,e);else if(r.inputs[0].dims.length===5)_T(r,r.inputs,e);else{let n=Fa(e,r.inputs);Qm(r,r.inputs,n)}}});var TT,th,rh=S(()=>{"use strict";X();vt();ne();Mt();cn();Va();hn();TT=(r,e=!1,n,t,o=4)=>{let i=y=>{switch(y){case 1:return"return w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];";case 4:return`
            let coord1 = vec4<i32>(coordX, coordY, col + 1, rowInner);
            let coord2 = vec4<i32>(coordX, coordY, col + 2, rowInner);
            let coord3 = vec4<i32>(coordX, coordY, col + 3, rowInner);
            let v0 = w[getIndexFromCoords4D(coord, vec4<i32>(uniforms.w_shape))];
            let v1 = w[getIndexFromCoords4D(coord1, vec4<i32>(uniforms.w_shape))];
            let v2 = w[getIndexFromCoords4D(coord2, vec4<i32>(uniforms.w_shape))];
            let v3 = w[getIndexFromCoords4D(coord3, vec4<i32>(uniforms.w_shape))];
            return ${t}(v0, v1, v2, v3);
            `;default:throw new Error(`innerElementSize ${y} is not supported.`)}},s=r?`
      let coord = vec4<i32>(batch, iXR, iXC, xCh);
      `:`
      let coord = vec4<i32>(batch, xCh, iXR, iXC);
      `,a=r?`
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
    `,u=r?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",l=r?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",c=r?"row":"col",d=r?"col":"row",f=`
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      let outRow = ${c} / outWidth;
      let outCol = ${c} % outWidth;

      let WRow = ${d} / (uniforms.filter_dims[1] * inChannels);
      let WCol = ${d} / inChannels % uniforms.filter_dims[1];
      let xR = f32(outRow - uniforms.pads[0] + uniforms.dilations[0] * WRow) / f32(uniforms.strides[0]);
      let xC = f32(outCol - uniforms.pads[1] + uniforms.dilations[1] * WCol) / f32(uniforms.strides[1]);
      if (xR < 0.0 || xR >= f32(${u}) || fract(xR) > 0.0) {
        return ${t}(0.0);
      }
      if (xC < 0.0 || xC >= f32(${l}) || fract(xC) > 0.0) {
        return ${t}(0.0);
      }
      let iXR = i32(xR);
      let iXC = i32(xC);
      let xCh = ${d} % inChannels;
      ${s}
      return x[getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape))/${o}];`,m=r?`
      let col = colIn * ${o};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
        ${f}
      }
      return ${t}(0.0);`:`
      let col = colIn * ${o};
      if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
        ${f}
      }
      return ${t}(0.0);`,p=`
      let col = colIn * ${o};
      let inChannels = ${r?"i32(uniforms.x_shape[3])":"i32(uniforms.x_shape[1])"};
      let coordX = uniforms.filter_dims[0] - 1 - row / (uniforms.filter_dims[1] * inChannels);
      let coordY = uniforms.filter_dims[1] - 1 - (row / inChannels) % uniforms.filter_dims[1];
      if (${r?"row < uniforms.dim_inner && col < uniforms.dim_b_outer":"row < uniforms.dim_inner && col < uniforms.dim_a_outer"}  && coordX >= 0 && coordY >= 0) {
        let rowInner = row % inChannels;
        let coord = vec4<i32>(coordX, coordY, col, rowInner);
        ${i(o)}
      }
      return ${t}(0.0);
      `,h=ot(n,t);return`
  fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?m:p}
  }

  fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${t} {
    ${r?p:m}
  }

  fn mm_write(batch: i32, row : i32, colIn : i32, valueInput : ${t}) {
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
      var value = valueInput;
      let outWidth = ${r?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${a}
      ${Wo(e)}
      ${h}
      result[getIndexFromCoords4D(coords, vec4<i32>(uniforms.result_shape))/${o}] = value;
    }
  }`},th=(r,e,n,t,o,i,s,a)=>{let u=e.format==="NHWC",l=u?r[0].dims[3]:r[0].dims[1],c=n[0],d=u?n[2]:n[3],f=u?n[1]:n[2],m=u?n[3]:n[1],p=u&&l%4===0&&l%3&&m%4===0,h=u?m:d*f,b=u?d*f:m,y=[8,8,1],g=t<=8?[4,1,1]:[4,4,1],x=[Math.ceil(h/y[0]/g[0]),Math.ceil(b/y[1]/g[1]),Math.ceil(c/y[2]/g[2])];ae("verbose",()=>`[conv_backprop_mm_webgpu] dispatch = ${x}`);let _=p?4:1,v=Math.max(y[0]*_,y[1]),I=p?4:1,O=[e.kernelShape[u?1:2],e.kernelShape[u?2:3]],E=[O[0]+(e.dilations[0]<=1?0:(O[0]-1)*(e.dilations[0]-1)),O[1]+(e.dilations[1]<=1?0:(O[1]-1)*(e.dilations[1]-1))],k=[E[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),E[1]-1-Math.floor((e.pads[1]+e.pads[3])/2)],N=[{type:6,data:t},{type:6,data:o},{type:6,data:i},{type:6,data:e.strides},{type:6,data:e.dilations},{type:6,data:O},{type:6,data:k}];it(e,N),N.push(...B(r[0].dims,r[1].dims));let C=["rank","rank"];s&&(N.push(...B(r[2].dims)),C.push("rank")),N.push(...B(n));let ee=V=>{let J=P("x",r[0].dataType,r[0].dims.length,I),Se=P("w",r[1].dataType,r[1].dims.length,1),K=D("result",r[0].dataType,n.length,I),Y=[J,Se],oe="";if(s){let qe=P("bias",r[2].dataType,r[2].dims.length,I);Y.push(qe),oe+=`
          fn getBiasByOutputCoords(coords : vec4<i32>) -> ${qe.type.value} {
            return bias[coords.${u?"w":"y"}${p?"/ 4":""}];
          }`}let Q=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"strides",type:"i32",length:2},{name:"dilations",type:"i32",length:2},{name:"filter_dims",type:"i32",length:O.length},{name:"pads",type:"i32",length:k.length}];at(e,Q);let _e=me(r[0].dataType,1);if(_e!=="f16"&&_e!=="f32")throw new Error(`elemType ${_e} is not supported.`);return`
        ${Ho("uniforms.result_strides")}
        ${V.registerUniforms(Q).declareVariables(...Y,K)};
        ${oe}
        ${TT(u,s,e,J.type.value,_)}
        ${p?fn(g,y,_e,void 0,!u,v):pn(g,y,_e,void 0,!u,v,!1,void 0,a)}`};return{name:"Conv2DTransposeMatMul",shaderCache:{hint:`${e.cacheKey};${g};${y};${p}`,inputDependencies:C},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:N}),getShaderSource:ee}}});var vT,Wa,nh=S(()=>{"use strict";X();vt();te();ne();vT=(r,e,n,t,o,i=!1,s,a,u=!1)=>{let l=u?1:2,c=u?2:3,d=u?3:1,f=i?2:1,m=`
  fn setOutputAtIndex(flatIndex : u32, value : ${i?`vec4<${s}>`:s}) {
    result[flatIndex] = ${i?`vec4<${s}>`:s}(value);
  }`;t&&(m+=`
    fn getBiasByOutputCoords(coords : vec4<u32>) -> ${i?`vec4<${s}>`:s} {
      return bias[coords.${u?"w":"y"}${i?"/ 4":""}];
    }`);let p=i?4:1,h=P("W",e[1].dataType,e[1].dims.length,p),b=P("Dy",e[0].dataType,e[0].dims.length,p),y=[b,h];t&&y.push(P("bias",e[2].dataType,[n[d]].length,p));let g=D("result",e[0].dataType,n.length,p),x=`{
        let batch: u32 = ${o?"global_id.z":"workgroup_id.z"} / uniforms.result_shape[1];
        let r = ${o?"global_id.z":"workgroup_id.z"} % uniforms.result_shape[1];
        let c = ${o?"global_id.y":"workgroup_id.y"} * ${f};
        let d1: u32 = ${o?"global_id.x":"workgroup_id.x"} * 4;

        let dyCorner = vec2<i32>(i32(r), i32(c)) - vec2<i32>(uniforms.pads);

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        var dotProd: array<vec4<${s}>, ${f}>;
        for (var i = 0; i < ${f}; i++) {
          dotProd[i] = vec4<${s}>(0.0);
        }
        for (var wR: u32 = 0; wR < uniforms.filter_dims[0]; wR = wR + 1) {
          var dyR = (${s}(dyCorner.x) + ${s}(wR)) / ${s}(uniforms.strides.x);
          let wRPerm = uniforms.filter_dims[0] - 1 - wR;
          if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[1]) ||
              fract(dyR) > 0.0 || wRPerm < 0) {
            continue;
          }
          let idyR: u32 = u32(dyR);

          for (var wC: u32 = 0; wC < uniforms.filter_dims[1]; wC = wC + 1) {
            let dyC = (${s}(dyCorner.y) + ${s}(wC)) / ${s}(uniforms.strides.y);
            let dyC2 = (${s}(dyCorner.y) + 1.0 + ${s}(wC)) / ${s}(uniforms.strides.y);
            let wCPerm = uniforms.filter_dims[1] - 1 - wC;
            if (wCPerm < 0) {
              continue;
            }
            var bDyCVal = true;
            var bDyCVal2 = true;
            if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC) > 0.0) {
              bDyCVal = false;
            }
            if (dyC2 < 0.0 || dyC2 >= ${s}(uniforms.Dy_shape[2]) ||
                fract(dyC2) > 0.0) {
              bDyCVal2 = false;
            }

            let idyC: u32 = u32(dyC);
            let idyC2: u32 = u32(dyC2);
            if (bDyCVal && bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2 :u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;

                xValue =  ${b.get("batch","idyR","idyC2","d2")};

                dotProd[1] = dotProd[1] + vec4<${s}>(dot(xValue, wValue0),
                                                    dot(xValue, wValue1),
                                                    dot(xValue, wValue2),
                                                    dot(xValue, wValue3));
              }
            } else if (bDyCVal) {
              let d2Length = uniforms.Dy_shape[${d}];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[0] = dotProd[0] + tmpval;
              }
            } else if (bDyCVal2) {
              let d2Length = uniforms.Dy_shape[3];
              for (var d2: u32 = 0; d2 < d2Length; d2 = d2 + 4) {
                let wValue0 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1","d2")};
                let wValue1 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 1","d2")};
                let wValue2 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 2","d2")};
                let wValue3 = ${h.get("u32(wRPerm)","u32(wCPerm)","d1 + 3","d2")};

                var xValue = ${b.get("batch","idyR","idyC2","d2")};
                let tmpval = vec4<${s}>(dot(xValue, wValue0),
                                      dot(xValue, wValue1),
                                      dot(xValue, wValue2),
                                      dot(xValue, wValue3));
                dotProd[1] = dotProd[1] + tmpval;
              }
            }
          }
        }

        for (var i: u32 = 0; i < ${f}; i = i + 1) {
          let value = dotProd[i] + ${t?"bias[c+i]":`vec4<${s}>(0.0)`};
          ${g.set("batch","r","c + i","d1","value")};
        }
      }`,_=`
          let outputIndices = ${g.offsetToIndices("global_idx")};
          let batch = ${g.indicesGet("outputIndices",0)};
          let d1 = ${g.indicesGet("outputIndices",d)};
          let r = ${g.indicesGet("outputIndices",l)};
          let c = ${g.indicesGet("outputIndices",c)};
          let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
          let dyRCorner = dyCorner.x;
          let dyCCorner = dyCorner.y;
          let groupId = d1 / uniforms.output_channels_per_group;
          let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
          // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
          // ? = to be determined. : = across all values in that axis.
          var dotProd = ${s}(0.0);
          for (var wR: u32 = 0; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
            if (wR % uniforms.dilations.x != 0) {
              continue;
            }
            let dyR = (${s}(dyRCorner) + ${s}(wR)) / ${s}(uniforms.strides[0]);
            let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
            if (dyR < 0.0 || dyR >= ${s}(uniforms.Dy_shape[${l}]) || fract(dyR) > 0.0 ||
                wRPerm < 0) {
              continue;
            }
            let idyR: u32 = u32(dyR);

            for (var wC: u32 = 0; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
              if (wC % uniforms.dilations.y != 0) {
                continue;
              }
              let dyC = (${s}(dyCCorner) + ${s}(wC)) / ${s}(uniforms.strides.y);
              let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
              if (dyC < 0.0 || dyC >= ${s}(uniforms.Dy_shape[${c}]) ||
                  fract(dyC) > 0.0 || wCPerm < 0) {
                continue;
              }
              let idyC: u32 = u32(dyC);
              var inputChannel = groupId * uniforms.input_channels_per_group;
              for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group; d2 = d2 + 1) {
                let xValue = ${u?b.get("batch","idyR","idyC","inputChannel"):b.get("batch","inputChannel","idyR","idyC")};
                let wValue = ${h.get("inputChannel","wOutChannel","u32(wRPerm)","u32(wCPerm)")};
                dotProd = dotProd + xValue * wValue;
                inputChannel = inputChannel + 1;
              }
            }
          }
          let value = dotProd + ${t?"bias[d1]":`${s}(0.0)`};
          ${g.setByOffset("global_idx","value")};
        `;return`
  ${r.registerUniforms(a).declareVariables(...y,g)}
  ${m}

    ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
  ${i?x:_}}`},Wa=(r,e,n)=>{let t=r.length>2,o=e.outputShape,i=$.size(o),s=[Math.ceil(i/64),1,1];ae("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${s}`);let a=e.format==="NHWC",u=["rank","rank"],l=[e.strides[0],e.strides[1]],c=[e.kernelShape[a?1:2],e.kernelShape[a?2:3]],d=[e.dilations[0],e.dilations[1]],f=[c[0]+(e.dilations[0]<=1?0:(e.kernelShape[a?1:2]-1)*(e.dilations[0]-1)),c[1]+(e.dilations[1]<=1?0:(e.kernelShape[a?2:3]-1)*(e.dilations[1]-1))],m=[f[0]-1-Math.floor((e.pads[0]+e.pads[2])/2),f[1]-1-Math.floor(e.pads[1]+e.pads[3])/2],p=!1,h=e.group,b=r[1].dims,y=b[0]/h,g=b[1],x=[{type:12,data:i},{type:12,data:l},{type:12,data:c},{type:12,data:d},{type:12,data:f},{type:6,data:m},{type:12,data:y},{type:12,data:g},...B(r[0].dims,r[1].dims)];t&&(x.push(...B(r[2].dims)),u.push("rank")),x.push(...B(o));let _=s[1]===1&&s[2]===1,v=I=>{let O=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:l.length},{name:"filter_dims",type:"u32",length:c.length},{name:"dilations",type:"u32",length:c.length},{name:"effective_filter_dims",type:"u32",length:f.length},{name:"pads",type:"i32",length:m.length},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],E=me(r[0].dataType);return`${vT(I,r,o,t,_,p,E,O,a)}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${e.cacheKey};`,inputDependencies:u},getRunData:()=>({dispatchGroup:{x:s[0],y:s[1],z:s[2]},outputs:[{dims:n?n(o):o,dataType:r[0].dataType}],programUniforms:x}),getShaderSource:v}}});var IT,ST,$T,oh,ih,AT,PT,OT,ET,ah,sh=S(()=>{"use strict";rh();nh();Mt();Vt();IT=(r,e,n,t,o,i)=>(r-1)*e+n+(t-1)*o+1-i,ST=(r,e,n,t,o)=>{let i=Math.floor(r/2);e==="SAME_UPPER"?(n[t]=i,n[o]=r-i):e==="SAME_LOWER"&&(n[t]=r-i,n[o]=i)},$T=(r,e,n,t,o,i,s,a,u,l)=>{let c=r.length-2,d=l.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let f=r[0],m=e[a?3:1]*o;for(let p=0,h=r.length-c-(a?1:0);p<c;++p,++h){let b=r[h],y=d?b*s[p]:l[p],g=IT(b,s[p],i[p],e[h],n[p],y);ST(g,t,i,p,p+c),d&&l.push(s[p]*(b-1)+u[p]+(e[h]-1)*n[p]+1-i[p]-i[p+c])}l.splice(0,0,f),l.splice(a?3:1,0,m)},oh=(r,e)=>{let n=r.kernelShape.slice();if(r.kernelShape.length===0||r.kernelShape.reduce((d,f)=>d*f,1)===0){n.length=0;for(let d=2;d<e[1].dims.length;++d)n.push(e[1].dims[d])}let t=r.format==="NHWC";n.splice(0,0,e[1].dims[0]),n.splice(t?3:1,0,e[1].dims[1]);let o=r.pads.slice(),i=r.outputShape.slice(),s=r.outputPadding.slice(),a=e[0].dims,u=r.dilations.slice();if(u.reduce((d,f)=>d+f,0)===0){let d=e[0].dims.length-2;u=new Array(d).fill(1)}let l=r.strides.slice();if(l.reduce((d,f)=>d+f,0)===0){let d=e[0].dims.length-2;l=new Array(d).fill(1)}$T(a,n,u,r.autoPad,r.group,o,l,t,s,i);let c=Object.assign({},r);return Object.assign(c,{kernelShape:n,pads:o,outputPadding:s,outputShape:i,dilations:u,strides:l}),c},ih=r=>{let e=Uo(r),n=r.format,t=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof r.autoPad>"u"?0:r.autoPad],o=r.dilations,i=r.group,s=r.kernelShape,a=r.pads,u=r.strides,l=r.wIsConst(),c=r.outputPadding,d=r.outputShape;return{autoPad:t,format:n,dilations:o,group:i,kernelShape:s,outputPadding:c,outputShape:d,pads:a,strides:u,wIsConst:l,...e,cacheKey:`${r.format};${e.activation};`}},AT=(r,e)=>{if(!r||r.length!==2&&r.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(r[0].dims.length!==4&&r[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(r[0].dims.length!==r[1].dims.length)throw new Error("filter does not have same dimension as input");let n=r[0].dims[e.format==="NHWC"?r[0].dims.length-1:1],t=r[1].dims[0];if(n!==t)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let o=r[1].dims[1]*e.group;if(r.length===3&&(r[2].dims.length!==1||r[2].dims[0]!==o))throw new Error("invalid bias");let i=r[0].dims.length-2;if(e.dilations.reduce((c,d)=>c+d,0)>0&&e.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(e.strides.reduce((c,d)=>c+d,0)>0&&e.strides.length!==i)throw new Error(`strides should be ${i}D`);if(e.pads.reduce((c,d)=>c+d,0)>0&&e.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(e.outputPadding.length!==i&&e.outputPadding.length!==0)throw new Error(`output_padding should be ${i}D`);if(e.kernelShape.reduce((c,d)=>c+d,0)>0&&e.kernelShape.length!==0&&e.kernelShape.length!==r[1].dims.length-2)throw new Error("invalid kernel shape");if(e.outputShape.length!==0&&e.outputShape.length!==r[0].dims.length-2)throw new Error("invalid output shape")},PT=[2,3,1,0],OT=(r,e,n)=>{let t=oh(n,e),o=n.format==="NHWC",i=t.outputShape,s=i[o?3:1],a=e[0].dims[o?3:1];if(t.group!==1||s===1&&a===1){r.compute(Wa(e,t));return}let u=i[o?1:2],l=i[o?2:3],c=e[1].dims[2],d=e[1].dims[3],f=o?u*l:s,m=o?s:u*l,p=c*d*a,h=!0,b=r.kernelCustomData.wT??r.compute(Me(e[1],PT),{inputs:[1],outputs:[n.wIsConst?-2:-1]})[0];n.wIsConst&&!r.kernelCustomData.wT&&(r.kernelCustomData.wT=b);let y=[e[0],b],g=e.length===3;g&&(!o&&e[2].dims.length===1?y.push(e[2].reshape([e[2].dims[0],1,1])):y.push(e[2])),r.compute(th(y,t,i,f,m,p,g,h),{inputs:y})},ET=(r,e)=>{let n=e.format==="NHWC",t=[r.inputs[0].reshape(n?[r.inputs[0].dims[0],1,r.inputs[0].dims[1],r.inputs[0].dims[2]]:[r.inputs[0].dims[0],r.inputs[0].dims[1],1,r.inputs[0].dims[2]]),r.inputs[1].reshape([r.inputs[1].dims[0],r.inputs[1].dims[1],1,r.inputs[1].dims[2]])];r.inputs.length===3&&t.push(r.inputs[2]);let o=e.kernelShape;(o.length===0||o[0]===0)&&(o=[r.inputs[1].dims[2]]);let i=e.dilations;(i.length===0||i[0]===0)&&(i=[1]);let s=e.strides;(s.length===0||s[0]===0)&&(s=[1]);let a=e.pads;a.length===0&&(a=[0,0]),a=[0,a[0],0,a[1]],s=[1].concat(s),i=[1].concat(i),o=[1].concat(o);let u=oh({...e,pads:a,strides:s,dilations:i,kernelShape:o},t);r.compute(Wa(t,u,l=>n?[l[0],l[2],l[3]]:[l[0],l[1],l[3]]))},ah=(r,e)=>{AT(r.inputs,e),r.inputs[0].dims.length===3?ET(r,e):OT(r,r.inputs,e)}});var CT,uh,lh,ch=S(()=>{"use strict";X();te();Pe();ne();CT=(r,e,n,t)=>{let o=$.size(e),i=e.length,s=P("input",r,i),a=D("output",r,i),u=n.dataType===6?n.getInt32Array()[0]:Number(n.getBigInt64Array()[0]),l=$.normalizeAxis(u,i),c=d=>{let f=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,m=F("uniforms.input_shape","uniforms.axis",i),p=t.reverse?f+(t.exclusive?" + 1":""):"0",h=t.reverse?m:f+(t.exclusive?"":" + 1");return`
                ${d.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,a)}
                ${d.mainStart()}
                  ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${a.offsetToIndices("global_idx")};
                  var sum = ${a.type.value}(0);
                  let first : i32 = ${p};
                  let last : i32 = ${h};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${a.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:e,dataType:r}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:l},...B(e,e)]}),getShaderSource:c}},uh=(r,e)=>{let n=r.inputs[0].dims,t=r.inputs[0].dataType,o=r.inputs[1];r.compute(CT(t,n,o,e),{inputs:[0]})},lh=r=>{let e=r.exclusive===1,n=r.reverse===1;return Z({exclusive:e,reverse:n})}});var kT,DT,BT,dh,fh,ph=S(()=>{"use strict";X();te();Pe();ne();kT=r=>{if(!r||r.length!==1)throw new Error("DepthToSpace requires 1 input.");if(r[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},DT=(r,e,n,t)=>{let o=[];o.push(`fn perm(i: ${t.type.indices}) -> ${n.type.indices} {
    var a: ${n.type.indices};`);for(let i=0;i<e;++i)o.push(n.indicesSet("a",r[i],`i[${i}]`));return o.push("return a;}"),o.join(`
`)},BT=(r,e)=>{let n,t,o,i,s,a,u=e.format==="NHWC",l=e.blocksize,c=e.mode==="DCR";u?([n,t,o,i]=r.dims,s=c?[n,t,o,l,l,i/l**2]:[n,t,o,i/l**2,l,l],a=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([n,t,o,i]=[r.dims[0],r.dims[2],r.dims[3],r.dims[1]],s=c?[n,l,l,i/l**2,t,o]:[n,i/l**2,l,l,t,o],a=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let d=r.reshape(s),f=d.dims.length,m=r.dataType,p=P("a",m,f),h=D("output",m,f),b=y=>`
  ${y.registerUniform("output_size","u32").declareVariables(p,h)}

  ${DT(a,f,p,h)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${h.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${h.setByOffset("global_idx",p.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${r.dims};${e.blocksize};${e.mode}`,inputDependencies:["rank"]},getRunData:y=>{let g=u?[n,t*l,o*l,i/l**2]:[n,i/l**2,t*l,o*l],x=$.size(g),_=d.dims,v=$.sortBasedOnPerm(_,a);return{outputs:[{dims:g,dataType:y[0].dataType}],dispatchGroup:{x:Math.ceil(x/64)},programUniforms:[{type:12,data:x},...B(_,v)]}},getShaderSource:b}},dh=(r,e)=>{kT(r.inputs),r.compute(BT(r.inputs[0],e))},fh=r=>Z({blocksize:r.blocksize,mode:r.mode,format:r.format})});var Ha,Xo,mh,LT,zT,qa,Ka,hh,RT,gh,bh,yh=S(()=>{"use strict";X();te();Pe();ne();Ha="[a-zA-Z]|\\.\\.\\.",Xo="("+Ha+")+",mh="^"+Xo+"$",LT="("+Xo+",)*"+Xo,zT="^"+LT+"$",qa=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,n){let t=this.symbolToIndices.get(e);t===void 0?t=[n]:t.push(n),this.symbolToIndices.set(e,t)}},Ka=class{constructor(e,n){this.equation=n;this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[t,o]=n.includes("->")?n.split("->",2):[n,""];if(!t.match(RegExp(zT)))throw new Error("Invalid LHS term");if(t.split(",").forEach((a,u)=>{let l=e[u].dims.slice();if(!a.match(RegExp(mh)))throw new Error("Invalid LHS term");let c=this.processTerm(a,!0,l,u);this.lhs.push(c)}),o==="")o+=[...this.symbolToInfo.entries()].filter(([a,u])=>u.count===1||a==="...").map(([a])=>a).join("");else if(!o.match(RegExp(Xo)))throw new Error("Invalid RHS");o.match(RegExp(Ha,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let u=this.symbolToInfo.get(a);if(u===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(u.dimValue)}}),this.rhs=this.processTerm(o,!1,this.outputDims)}addSymbol(e,n,t){let o=this.symbolToInfo.get(e);if(o!==void 0){if(o.dimValue!==n&&o.count!==1)throw new Error("Dimension mismatch");o.count++,o.inputIndices.push(t)}else o={count:1,dimValue:n,inputIndices:[t]};this.symbolToInfo.set(e,o)}processTerm(e,n,t,o=-1){let i=t.length,s=!1,a=[],u=0;if(!e.match(RegExp(mh))&&!n&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Ha,"g")),c=new qa(o);return l?.forEach((d,f)=>{if(d==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let m=i-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(a=t.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==a.length||this.ellipsisDims.toString()!==a.toString())throw new Error("Ellipsis dimensions mismatch")}else if(n)this.hasEllipsis=!0,this.ellipsisDims=a;else throw new Error("Ellipsis must be specified in the LHS");for(let p=0;p<a.length;p++){let h=String.fromCharCode("0".charCodeAt(0)+p);c.addSymbol(h,f+p),this.addSymbol(h,t[u++],o)}}else c.addSymbol(d,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(d,t[u++],o)}),c}},hh=r=>r+"_max",RT=(r,e,n,t)=>{let i=r.map(c=>c.length).map((c,d)=>P(`input${d}`,e,c)),s=$.size(t),a=D("output",e,t.length),u=[...n.symbolToInfo.keys()].filter(c=>!n.rhs.symbolToIndices.has(c)),l=c=>{let d=[],f="var prod = 1.0;",m="var sum = 0.0;",p="sum += prod;",h=[],b=[],y=[],g=[],x=n.symbolToInfo.size===n.rhs.symbolToIndices.size;n.symbolToInfo.forEach((v,I)=>{if(n.rhs.symbolToIndices.has(I)){let O=n.rhs.symbolToIndices.get(I)?.[0];O!==void 0&&n.lhs.forEach((E,k)=>{if(v.inputIndices.includes(k)){let N=E.symbolToIndices.get(I);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(C=>{d.push(`${i[k].indicesSet(`input${k}Indices`,C,a.indicesGet("outputIndices",O))}`)})}})}else n.lhs.forEach((O,E)=>{if(v.inputIndices.includes(E)){let k=O.symbolToIndices.get(I);if(k===void 0)throw new Error("Invalid symbol error");k.forEach(N=>{h.push(`${i[E].indicesSet(`input${E}Indices`,N,`${I}`)}`)}),g.push(`prod *= ${i[E].getByIndices(`input${E}Indices`)};`)}}),b.push(`for(var ${I}: u32 = 0; ${I} < uniforms.${hh(I)}; ${I}++) {`),y.push("}")});let _=x?[...d,`let sum = ${i.map((v,I)=>v.getByIndices(`input${I}Indices`)).join(" * ")};`]:[...d,m,...b,...h,f,...g,p,...y];return`
            ${c.registerUniforms(u.map(v=>({name:`${hh(v)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,a)}

            ${c.mainStart()}
            ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${a.offsetToIndices("global_idx")};
            ${i.map((v,I)=>`var input${I}Indices: ${i[I].type.indices};`).join(`
`)}
            ${_.join(`
`)};
            ${a.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:n.equation,inputDependencies:r.map(()=>"rank")},getRunData:()=>{let c=u.filter(f=>n.symbolToInfo.has(f)).map(f=>({type:12,data:n.symbolToInfo.get(f)?.dimValue||0}));c.push({type:12,data:s});let d=r.map((f,m)=>[...B(f)]).reduce((f,m)=>f.concat(m),c);return d.push(...B(t)),{outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:d}},getShaderSource:l}},gh=(r,e)=>{let n=new Ka(r.inputs,e.equation),t=n.outputDims,o=r.inputs.map((i,s)=>i.dims);r.compute(RT(o,r.inputs[0].dataType,n,t))},bh=r=>{let e=r.equation.replace(/\s+/g,"");return Z({equation:e})}});var NT,xh,VT,MT,wh,_h=S(()=>{"use strict";X();te();ne();NT=r=>{if(!r||r.length!==2)throw new Error("Expand requires 2 input.");let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=n.length<e.length?0:n.length-e.length,o=e.length<n.length?0:e.length-n.length;for(;t<n.length&&o<e.length;++t,++o)if(n[t]!==e[o]&&n[t]!==1&&e[o]!==1)throw new Error("Expand requires shape to be broadcastable to input")},xh=(r,e)=>{let n=r.length-e.length,t=[];for(let o=0;o<n;++o)t.push(r[o]);for(let o=0;o<e.length;++o)t.push(e[o]===1?r[o+n]:e[o]);return t},VT=(r,e)=>r.length>e.length?xh(r,e):xh(e,r),MT=r=>{let e=r[0].dims,n=Array.from(r[1].getBigInt64Array(),Number),t=VT(e,n),o=r[0].dataType,i=o===9?4:1,s=Math.ceil($.size(t)/i),a=l=>{let c=P("input",o,e.length,i),d=D("output",o,t.length,i),f;if(o===9){let m=(p,h,b="")=>`
          let outputIndices${h} = ${d.offsetToIndices(`outputOffset + ${h}u`)};
          let offset${h} = ${c.broadcastedIndicesToOffset(`outputIndices${h}`,d)};
          let index${h} = offset${h} / 4u;
          let component${h} = offset${h} % 4u;
          ${p}[${h}] = ${b}(${c.getByOffset(`index${h}`)}[component${h}]);
        `;f=`
        let outputOffset = global_idx * ${i};
        var data = vec4<u32>(0);
        ${m("data",0,"u32")}
        ${m("data",1,"u32")}
        ${m("data",2,"u32")}
        ${m("data",3,"u32")}
        ${d.setByOffset("global_idx","data")}
      }`}else f=`
        let outputIndices = ${d.offsetToIndices("global_idx")};
        let inputOffset = ${c.broadcastedIndicesToOffset("outputIndices",d)};
        ${d.setByOffset("global_idx",c.getByOffset("inputOffset"))}
      }`;return`
    ${l.registerUniform("vec_size","u32").declareVariables(c,d)}
    ${l.mainStart()}
    ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${f}`},u=[{type:12,data:s},...B(e,t)];return{name:"Expand",shaderCache:{hint:`${t.length}`,inputDependencies:["rank"]},getShaderSource:a,getRunData:()=>({outputs:[{dims:t,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},wh=r=>{NT(r.inputs),r.compute(MT(r.inputs),{inputs:[0]})}});var FT,Th,vh=S(()=>{"use strict";X();te();ne();Go();FT=r=>{let e=r[0].dataType,n=$.size(r[0].dims),t=$.size(r[1].dims),o=t%4===0,i=s=>{let a=P("x",e,[1],4),u=P("bias",e,[1],4),l=D("y",e,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],d=m=>`
      let bias${m}_offset: u32 = (global_idx * 4 + ${m}) % uniforms.bias_size;
      let bias${m} = ${u.getByOffset(`bias${m}_offset / 4`)}[bias${m}_offset % 4];`,f=o?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${d(0)}${d(1)}${d(2)}${d(3)}
      let bias = ${a.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(a,u,l)}

    ${Ra(Ve(e))}

    ${s.mainStart(br)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${a.getByOffset("global_idx")};
      ${f}
      let x_in = x + bias;
      ${l.setByOffset("global_idx",Na("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${o}`,inputDependencies:["type","type"]},getShaderSource:i,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(n/4)},{type:12,data:t}],dispatchGroup:{x:Math.ceil(n/br/4)}})}},Th=r=>{r.inputs.length<2||$.size(r.inputs[1].dims)===0?_m(r):r.compute(FT(r.inputs))}});var GT,UT,Ih,Sh,$h=S(()=>{"use strict";X();te();Pe();ne();GT=r=>{if(!r||r.length!==2)throw new Error("Gather requires 2 inputs.")},UT=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=$.normalizeAxis(e.axis,o),s=n.slice(0);s.splice(i,1,...t);let a=n[i],u=r[0].dataType===9?4:1,l=Math.ceil($.size(s)/u),c=[{type:12,data:l},{type:6,data:a},{type:12,data:i},...B(r[0].dims,r[1].dims,s)],d=f=>{let m=P("data",r[0].dataType,r[0].dims.length,u),p=P("inputIndices",r[1].dataType,r[1].dims.length),h=D("output",r[0].dataType,s.length,u),b=g=>{let x=t.length,_=`var indicesIndices${g}  = ${p.type.indices}(0);`;for(let v=0;v<x;v++)_+=`${x>1?`indicesIndices${g}[${v}]`:`indicesIndices${g}`} = ${s.length>1?`outputIndices${g}[uniforms.axis + ${v}]`:`outputIndices${g}`};`;_+=`
          var idx${g} = ${p.getByIndices(`indicesIndices${g}`)};
          if (idx${g} < 0) {
            idx${g} = idx${g} + uniforms.axisDimLimit;
          }
          var dataIndices${g} : ${m.type.indices};
        `;for(let v=0,I=0;v<o;v++)v===i?(_+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = u32(idx${g});`,I+=x):(_+=`${o>1?`dataIndices${g}[${v}]`:`dataIndices${g}`} = ${s.length>1?`outputIndices${g}[${I}]`:`outputIndices${g}`};`,I++);return _},y;if(r[0].dataType===9){let g=(x,_,v="")=>`
          let outputIndices${_} = ${h.offsetToIndices(`outputOffset + ${_}u`)};
          ${b(_)};
          let offset${_} = ${m.indicesToOffset(`dataIndices${_}`)};
          let index${_} = offset${_} / 4u;
          let component${_} = offset${_} % 4u;
          ${x}[${_}] = ${v}(${m.getByOffset(`index${_}`)}[component${_}]);
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
      ${b("")};
      let value = ${m.getByIndices("dataIndices")};
      ${h.setByOffset("global_idx","value")};
      `;return`
      ${f.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,p,h)}
      ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${y}
      }`};return{name:"Gather",shaderCache:{hint:e.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:d}},Ih=r=>Z({axis:r.axis}),Sh=(r,e)=>{let n=r.inputs;GT(n),r.compute(UT(r.inputs,e))}});var WT,HT,Ah,Ph,Oh=S(()=>{"use strict";X();te();Pe();ne();WT=(r,e)=>{if(r.length<3||r.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let n=$.normalizeAxis(e.quantizeAxis,r[0].dims.length),t=e.blockSize,o=r[0],i=r[2],s=r.length===4?r[3]:void 0;if(i.dims.length!==o.dims.length||!o.dims.map((a,u)=>u===n?Math.ceil(a/t)===i.dims[u]:a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==o.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==i.dims.length||!s.dims.map((a,u)=>a===i.dims[u]).reduce((a,u)=>a&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},HT=(r,e)=>{let n=r[0].dims,t=r[1].dims,o=n.length,i=$.normalizeAxis(e.gatherAxis,o),s=$.normalizeAxis(e.quantizeAxis,o),a=n.slice(0);a.splice(i,1,...t);let u=$.size(a),l=r[2].dataType,d=r[0].dataType===22,f=[{type:12,data:u},{type:12,data:s},{type:12,data:i},{type:12,data:e.blockSize},...B(...r.map((p,h)=>p.dims),a)],m=p=>{let h=P("data",r[0].dataType,r[0].dims.length),b=P("inputIndices",r[1].dataType,r[1].dims.length),y=P("scales",r[2].dataType,r[2].dims.length),g=r.length>3?P("zeroPoint",r[3].dataType,r[3].dims.length):void 0,x=D("output",l,a.length),_=[h,b,y];g&&_.push(g);let v=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${p.registerUniforms(v).declareVariables(..._,x)}
        ${p.mainStart()}
        let output_indices = ${x.offsetToIndices("global_idx")};
        var indices_indices = ${b.type.indices}(0);
        ${(()=>t.length>1?`
          for (var i: u32 = 0; i < ${t.length}; i++) {
            let index = ${x.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${b.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${x.indicesGet("output_indices","uniforms.gather_axis")};`)()};
        var data_indices = ${h.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${x.indicesGet("output_indices","i")};
          ${h.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${b.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${n[i]};
        }
        ${h.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${a.length}; i++) {
          let index = ${x.indicesGet("output_indices",`i + ${t.length} - 1`)};
          ${h.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${h.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${h.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
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
              let zero_point_vec = ${d?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0")()};
        let dequantized_data = ${Ve(l)}(quantized_data - zero_point) * scale;
        ${x.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${e.cacheKey};${r.filter((p,h)=>h!==1).map(p=>p.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:r.length},(p,h)=>"rank")},getRunData:()=>({outputs:[{dims:a,dataType:l}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:m}},Ah=(r,e)=>{let n=r.inputs;WT(n,e),r.compute(HT(r.inputs,e))},Ph=r=>Z({blockSize:r.blockSize,gatherAxis:r.gatherAxis,quantizeAxis:r.quantizeAxis})});var qT,KT,Eh,Ch,kh=S(()=>{"use strict";X();te();Pe();ne();qT=r=>{if(!r||r.length!==2)throw new Error("GatherElements requires 2 inputs.");if(r[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(r[0].dims.length!==r[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},KT=(r,e)=>{let n=r[0].dims,t=r[0].dataType,o=n.length,i=r[1].dims,s=r[1].dataType,a=$.normalizeAxis(e.axis,o),u=n[a],l=i.slice(0),c=$.size(l),d=P("input",t,o),f=P("indicesInput",s,i.length),m=D("output",t,l.length),p=[{type:12,data:c},{type:6,data:u},{type:12,data:a}];return p.push(...B(n,i,l)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:p}),getShaderSource:y=>`
      ${y.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(d,f,m)}
      ${y.mainStart()}
      ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${m.offsetToIndices("global_idx")};

      var idx = ${f.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${d.type.indices}(outputIndices);
      ${d.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${d.getByIndices("inputIndices")};

      ${m.setByOffset("global_idx","value")};
  }`}},Eh=r=>Z({axis:r.axis}),Ch=(r,e)=>{let n=r.inputs;qT(n),r.compute(KT(r.inputs,e))}});var jT,XT,Dh,Bh,Lh=S(()=>{"use strict";X();te();ne();jT=r=>{if(!r)throw new Error("Input is missing");if(r.length<2||r.length>3)throw new Error("Invaid input number.");if(r.length===3&&r[2].dims.length>2)throw new Error("Invalid input shape of C");if(r[0].dataType!==r[1].dataType||r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("Input types are mismatched")},XT=(r,e)=>{let n=r[0].dims.slice(),t=r[1].dims.slice(),[o,i,s]=zo.getShapeOfGemmResult(n,e.transA,t,e.transB,r.length===3?r[2].dims:void 0),a=[o,i];if(!a)throw new Error("Can't use gemm on the given tensors");let u=16,l=Math.ceil(i/u),c=Math.ceil(o/u),d=!0,f=$.size(a),m=[{type:12,data:d?l:f},{type:12,data:o},{type:12,data:i},{type:12,data:s},{type:1,data:e.alpha},{type:1,data:e.beta}],p=["type","type"];r.length===3&&(m.push(...B(r[2].dims)),p.push("rank")),m.push(...B(a));let h=y=>{let g="";e.transA&&e.transB?g="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":e.transA&&!e.transB?g="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!e.transA&&e.transB?g="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!e.transA&&!e.transB&&(g="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let x=e.alpha===1?"":"value *= uniforms.alpha;",_=P("a",r[0].dataType,r[0].dims),v=P("b",r[1].dataType,r[1].dims),I=_.type.value,O=null,E=[_,v];r.length===3&&(O=P("c",r[2].dataType,r[2].dims.length),E.push(O));let k=D("output",r[0].dataType,a.length);E.push(k);let N=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${y.registerUniforms(N).declareVariables(...E)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${g}
    }

    ${x}
    ${(()=>O!=null?`let cOffset = ${O.broadcastedIndicesToOffset("vec2(m, n)",k)}; value += ${I}(uniforms.beta) * ${O.getByOffset("cOffset")};`:"")()}
    output[global_idx] = value;
  }`},b=y=>{let g=P("a",r[0].dataType,r[0].dims),x=P("b",r[1].dataType,r[1].dims),_=null,v=[g,x];r.length===3&&(_=P("c",r[2].dataType,r[2].dims.length),v.push(_));let I=D("output",r[0].dataType,a.length);v.push(I);let O=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],E="",k="";e.transA&&e.transB?(k=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,E="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):e.transA&&!e.transB?(k=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,E="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!e.transA&&e.transB?(k=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,E="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!e.transA&&!e.transB&&(k=`
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
        tile_b[local_id.y][local_id.x] = ${x.type.value}(0);
      }
      `,E="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let N=e.alpha===1?"":"value *= uniforms.alpha;";return`
  ${y.registerUniforms(O).declareVariables(...v)}
  var<workgroup> tile_a: array<array<${g.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${x.type.storage}, ${u}>, ${u}>;
  ${y.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${k}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${E}
      }
      workgroupBarrier();
    }

    ${N}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${(()=>_!=null?`let cOffset = ${_.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${_.getByOffset("cOffset")};`:"")()}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return d?{name:"GemmShared",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:l*c},programUniforms:m}),getShaderSource:b}:{name:"Gemm",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:m}),getShaderSource:h}},Dh=r=>{let e=r.transA,n=r.transB,t=r.alpha,o=r.beta;return{transA:e,transB:n,alpha:t,beta:o,cacheKey:`${r.transA};${r.transB};${r.alpha===1}`}},Bh=(r,e)=>{jT(r.inputs),r.compute(XT(r.inputs,e))}});var Ft,Yt,Lr,zr,ZT,JT,YT,QT,ev,tv,rv,nv,zh,Rh,Nh=S(()=>{"use strict";X();te();Pe();ne();[Ft,Yt,Lr,zr]=[0,1,2,3],ZT=r=>{if(r[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(r[0].dims.length!==r[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(r[0].dims.length-2!==r[1].dims[r[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${r[0].dims.length-2}`);if(r[0].dims[0]!==r[1].dims[0])throw new Error("grid batch size must match input batch size")},JT=`
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
`,YT=r=>`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,QT=r=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${r.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,ev=r=>`
  ${r.paddingMode==="reflection"?`
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
`,tv=(r,e,n)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${e} {
     var pixel = ${e}(0);
     var indices = vec4<u32>(0);
     indices[${Ft}] = batch;
     indices[${Yt}] = channel;`+(()=>{switch(n.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Lr}] = u32(r);
            indices[${zr}] = u32(c);
          }
        `;case"border":return`
          indices[${Lr}] = u32(clamp(r, 0, H - 1));
          indices[${zr}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Lr}] = gs_reflect(r, border[1], border[3]);
          indices[${zr}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${n.paddingMode} is not supported`)}})()+`
    return ${r.getByIndices("indices")};
  }
`,rv=(r,e,n)=>(()=>{switch(n.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Ft}], indices[${Yt}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Ft}], indices[${Yt}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Ft}], indices[${Yt}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Ft}], indices[${Yt}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Ft}], indices[${Yt}], border);

          let dx2 = ${e}(f32(x2) - x);
          let dx1 = ${e}(x - f32(x1));
          let dy2 = ${e}(f32(y2) - y);
          let dy1 = ${e}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${e}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Ft}], indices[${Yt}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${n.mode} is not supported`)}})()+`${r.setByOffset("global_idx","result")}`,nv=(r,e)=>{let n=P("x",r[0].dataType,r[0].dims.length),t=[r[1].dims[0],r[1].dims[1],r[1].dims[2]],o=P("grid",r[1].dataType,t.length,2),i=[r[0].dims[0],r[0].dims[1],r[1].dims[1],r[1].dims[2]];e.format==="NHWC"&&(i=[r[0].dims[0],r[1].dims[1],r[1].dims[2],r[0].dims[3]],[Ft,Yt,Lr,zr]=[0,3,1,2]);let s=D("output",r[0].dataType,i.length),a=n.type.value,u=$.size(i),l=[{type:12,data:u},...B(r[0].dims,t,i)],c=d=>`
  ${d.registerUniform("output_size","u32").declareVariables(n,o,s)}
  ${JT}
  ${YT(a)}
  ${QT(e)}
  ${ev(e)}
  ${tv(n,a,e)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Lr}]);
      let W_in = i32(uniforms.x_shape[${zr}]);

      ${e.alignCorners===0?`
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
      var grid_indices = vec3<u32>(indices[${Ft}], indices[${Lr}], indices[${zr}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${rv(s,a,e)}
  }`;return{name:"GridSample",shaderCache:{hint:`${e.cacheKey}`,inputDependencies:["type","type"]},getRunData:d=>{let f=$.size(i);return{outputs:[{dims:i,dataType:d[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:l}},getShaderSource:c}},zh=(r,e)=>{ZT(r.inputs),r.compute(nv(r.inputs,e))},Rh=r=>Z({alignCorners:r.align_corners,mode:r.mode,paddingMode:r.padding_mode,format:r.format})});var tt,av,Mh,Vh,sv,gn,Fh,ja=S(()=>{"use strict";X();te();Pe();Lo();Mo();ne();Vt();tt=(r,e)=>r.length>e&&r[e].dims.length>0?r[e]:void 0,av=(r,e)=>{let n=r[0],t=tt(r,1),o=tt(r,2),i=tt(r,3),s=tt(r,4),a=tt(r,5),u=tt(r,6),l=tt(r,7);if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=n.dims[0],d=n.dims[1],f=n.dims.length===3?n.dims[2]:e.numHeads*n.dims[4],m=d,p=0,h=0,b=Math.floor(f/e.numHeads);if(u&&l&&$.size(u.dims)&&$.size(l.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==e.numHeads||u.dims[3]!==b)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[0]!==c||l.dims[1]!==e.numHeads||l.dims[3]!==b)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==l.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(l.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');p=u.dims[2],h=u.dims[2]}else if(u&&$.size(u.dims)||l&&$.size(l.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let y;if(t&&$.size(t.dims)>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(t.dims[2]!==n.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');y=2,m=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==b)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');y=5,m=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==b)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');y=0,m=t.dims[2]}}else{if(n.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(n.dims[2]!==e.numHeads||n.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}if(i&&$.size(i.dims)>0){if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(t&&t.dims.length===5&&t.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let g=p+m,x=0;if(s&&$.size(s.dims)>0){x=8;let O=s.dims;throw O.length===1?O[0]===c?x=1:O[0]===3*c+2&&(x=3):O.length===2&&O[0]===c&&O[1]===g&&(x=5),x===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let _=!1,v=f;if(o&&$.size(o.dims)>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(m!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(m!==o.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],_=!0}}let I=!1;if(s&&$.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(a&&$.size(a.dims)>0){if(a.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(a.dims[0]!==c||a.dims[1]!==e.numHeads||a.dims[2]!==d||a.dims[3]!==g)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:d,pastSequenceLength:p,kvSequenceLength:m,totalSequenceLength:g,maxSequenceLength:h,inputHiddenSize:0,hiddenSize:f,vHiddenSize:v,headSize:b,vHeadSize:Math.floor(v/e.numHeads),numHeads:e.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:e.maskFilterValue,maskType:x,scale:e.scale,broadcastResPosBias:I,passPastInKv:_,qkvFormat:y}},Mh=r=>Z({...r}),Vh=Z({perm:[0,2,1,3]}),sv=(r,e,n,t,o,i,s)=>{let a=[t,o,i],u=$.size(a),l=[{type:12,data:u},{type:12,data:s},{type:12,data:i}],c=d=>{let f=D("qkv_with_bias",e.dataType,a),m=P("qkv",e.dataType,a),p=P("bias",n.dataType,a),h=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${d.registerUniforms(h).declareVariables(m,p,f)}
  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return r.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:e.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:c},{inputs:[e,n],outputs:[-1]})[0]},gn=(r,e,n,t,o,i,s,a)=>{let u=i;if(s&&$.size(s.dims)>0){if(t===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=sv(r,i,s,e,t,n*o,a),u=u.reshape([e,t,n,o]),n===1||t===1?u:r.compute(Me(u,Vh.perm),{inputs:[u],outputs:[-1]})[0]}else return i.dims.length===3&&(u=i.reshape([e,t,n,o])),n===1||t===1?u:r.compute(Me(u,Vh.perm),{inputs:[u],outputs:[-1]})[0]},Fh=(r,e)=>{let n=av(r.inputs,e),t=r.inputs[0],o=tt(r.inputs,1),i=tt(r.inputs,2),s=tt(r.inputs,3),a=tt(r.inputs,4),u=tt(r.inputs,5),l=tt(r.inputs,6),c=tt(r.inputs,7);if(t.dims.length===5)throw new Error("Packed QKV is not implemented");if(o?.dims.length===5)throw new Error("Packed KV is not implemented");let d=o&&i&&o.dims.length===4&&i.dims.length===4,f=gn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,t,s,0);if(d)return Br(r,f,o,i,a,void 0,l,c,u,n);if(!o||!i)throw new Error("key and value must be provided");let m=gn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.headSize,o,s,n.hiddenSize),p=gn(r,n.batchSize,n.numHeads,n.kvSequenceLength,n.vHeadSize,i,s,2*n.hiddenSize);Br(r,f,m,p,a,void 0,l,c,u,n)}});var uv,lv,cv,dv,Xa,Gh,Uh,Za=S(()=>{"use strict";X();te();Pe();ne();uv=r=>{if(!r||r.length<1)throw new Error("too few inputs")},lv=(r,e)=>{let n=[],t=e.numOutputs;return r[1].dims[0]>0&&(r[1].getBigInt64Array().forEach(o=>n.push(Number(o))),t=n.length),Z({numOutputs:t,axis:e.axis,splitSizes:n})},cv=r=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${F("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`,dv=r=>{let e=r.length,n=[];for(let t=0;t<e;++t){let o=r[t].setByIndices("indices","input[global_idx]");e===1?n.push(o):t===0?n.push(`if (output_number == ${t}u) { ${o} }`):t===e-1?n.push(`else { ${o} }`):n.push(`else if (output_number == ${t}) { ${o} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${r[0].type.indices}, global_idx: u32) {
        ${n.join(`
`)}
      }`},Xa=(r,e)=>{let n=r[0].dims,t=$.size(n),o=r[0].dataType,i=$.normalizeAxis(e.axis,n.length),s=new Array(e.numOutputs),a=P("input",o,n.length),u=new Array(e.numOutputs),l=[],c=[],d=0,f=[{type:12,data:t}];for(let p=0;p<e.numOutputs;p++){d+=e.splitSizes[p],u[p]=d;let h=n.slice();h[i]=e.splitSizes[p],c.push(h),s[p]=D(`output${p}`,o,h.length),l.push({dims:c[p],dataType:r[0].dataType})}f.push({type:12,data:u},...B(n,...c));let m=p=>`
  ${p.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(a,...s)}
  ${cv(u.length)}
  ${dv(s)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${a.offsetToIndices("global_idx")};
    var index = ${a.indicesGet("indices",i)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${F("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${a.indicesSet("indices",i,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:e.cacheKey,inputDependencies:["rank"]},getShaderSource:m,getRunData:()=>({outputs:l,dispatchGroup:{x:Math.ceil(t/64)},programUniforms:f})}},Gh=(r,e)=>{uv(r.inputs);let n=r.inputs.length===1?e:lv(r.inputs,e);r.compute(Xa(r.inputs,n),{inputs:[0]})},Uh=r=>{let e=r.axis,n=r.splitSizes,t=r.numOutputs<0?n.length:r.numOutputs;if(t!==n.length)throw new Error("numOutputs and splitSizes lengh must be equal");return Z({axis:e,numOutputs:t,splitSizes:n})}});var fv,pv,Wh,Hh,qh=S(()=>{"use strict";Pe();Mo();ja();Za();Vt();fv=(r,e)=>{if(e.doRotary&&r.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let n=r[0],t=r[1],o=r[2],i=r[3],s=r[4];if(e.localWindowSize!==-1)throw new Error("Local attention is not supported");if(e.softcap!==0)throw new Error("Softcap is not supported");if(e.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(e.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(n.dims.length!==3&&n.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let a=!1,u=n.dims[0],l=n.dims[1],c=n.dims.length===3?a?n.dims[2]/3:n.dims[2]:e.numHeads*n.dims[4],d=l,f=0,m=!t||t.dims.length===0,p=Math.floor(m?c/(e.numHeads+2*e.kvNumHeads):c/e.numHeads);m&&(c=p*e.numHeads);let h=i&&i.dims.length!==0,b=s&&s.dims.length!==0;if(h&&i.dims.length===4&&i.dims[0]===u&&i.dims[1]!==e.kvNumHeads&&i.dims[2]===e.kvNumHeads&&i.dims[3]===p)throw new Error("BSNH pastKey/pastValue is not supported");if(h&&b){if(i.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');f=i.dims[2]}else if(h||b)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let g=1;if(t&&t.dims.length>0){if(n.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(t.dims.length<3||t.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(n.dims[0]!==t.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(t.dims.length===3){if(n.dims[2]%t.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');d=t.dims[1]}else if(t.dims.length===5){if(t.dims[2]!==e.numHeads||t.dims[3]!==2||t.dims[4]!==p)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(o)throw new Error('Expect "value" be none when "key" has packed kv format.');d=t.dims[1]}else{if(t.dims[1]!==e.numHeads||t.dims[3]!==p)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');d=t.dims[2]}}else{if(n.dims.length!==3&&n.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(n.dims.length===5&&(n.dims[2]!==e.numHeads||n.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');g=3}let x=0,_=!1,v=e.kvNumHeads?p*e.kvNumHeads:c;if(o&&o.dims.length>0){if(o.dims.length!==3&&o.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(n.dims[0]!==o.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(o.dims.length===3){if(d!==o.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=o.dims[2]}else{if(d!==o.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');v=o.dims[1]*o.dims[3],_=!0}}let I=r.length>4?r[5]:void 0;if(I&&I.dims.length!==1&&I.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');let O=-1,E=-1,k=!1;return{batchSize:u,sequenceLength:l,pastSequenceLength:f,kvSequenceLength:d,totalSequenceLength:O,maxSequenceLength:E,inputHiddenSize:0,hiddenSize:c,vHiddenSize:v,headSize:p,vHeadSize:Math.floor(v/e.kvNumHeads),numHeads:e.numHeads,kvNumHeads:e.kvNumHeads,nReps:e.numHeads/e.kvNumHeads,pastPresentShareBuffer:!1,maskType:x,scale:e.scale,broadcastResPosBias:k,passPastInKv:_,qkvFormat:g}},pv=Z({perm:[0,2,1,3]}),Wh=(r,e,n)=>{let t=e,o=n.kvNumHeads;return e.dims.length===3&&n.kvSequenceLength!==0&&(t=e.reshape([n.batchSize,n.kvSequenceLength,o,n.headSize]),t=r.compute(Me(t,pv.perm),{inputs:[t],outputs:[-1]})[0]),t},Hh=(r,e)=>{let n=fv(r.inputs,e);if(r.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(r.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let t=r.inputs[0],o=r.inputs[1]&&r.inputs[1].dims.length>0?r.inputs[1]:void 0,i=r.inputs[2]&&r.inputs[2].dims.length>0?r.inputs[2]:void 0,s=r.inputs[3]&&r.inputs[3].dims.length!==0?r.inputs[3]:void 0,a=r.inputs[4]&&r.inputs[4].dims.length!==0?r.inputs[4]:void 0,u=r.inputs.length>4?r.inputs[5]:void 0,l=r.inputs.length>5?r.inputs[6]:void 0,c=n.kvNumHeads?n.kvNumHeads:n.numHeads,d=Z({axis:2,numOutputs:3,splitSizes:[n.numHeads*n.headSize,c*n.headSize,c*n.headSize]}),[f,m,p]=!o&&!i?r.compute(Xa([t],d),{inputs:[t],outputs:[-1,-1,-1]}):[t,o,i],h=gn(r,n.batchSize,n.numHeads,n.sequenceLength,n.headSize,f,void 0,0);Br(r,h,Wh(r,m,n),Wh(r,p,n),void 0,void 0,s,a,void 0,n,u,l)}});var Kh,mv,hv,jh,Xh=S(()=>{"use strict";X();te();Vt();ne();Kh=(r,e,n,t,o,i,s,a)=>{let u=xe(i),l=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,d=o*s,f=64;d===1&&(f=256);let m=[o,s,i/u],p=[o,s,2],h=["rank","type","type"],b=[];b.push(...B(m,p));let y=g=>{let x=P("x",e.dataType,3,u),_=P("scale",n.dataType,n.dims),v=P("bias",t.dataType,t.dims),I=D("output",1,3,2),O=[x,_,v,I];return`
  var<workgroup> workgroup_shared : array<${c}, ${f}>;
  const workgroup_size = ${f}u;
  ${g.declareVariables(...O)}
  ${g.mainStart(f)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${l}(0);
    var squared_sum = ${l}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${l}(${x.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${It("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${It("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${a}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return r.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${a};${f}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:p,dataType:1}],dispatchGroup:{x:d},programUniforms:b}),getShaderSource:y},{inputs:[e,n,t],outputs:[-1]})[0]},mv=(r,e,n)=>{let t=e[0].dims,o=t,i=2,s=t[0],a=t[1],u=$.sizeFromDimension(t,i),l=xe(u),c=$.size(o)/l,d=Kh(r,e[0],e[1],e[2],s,u,a,n.epsilon),f=[s,a,u/l],m=[s,a],p=["type","none"],h=b=>{let y=P("x",e[0].dataType,f.length,l),g=P("scale_shift",1,m.length,2),x=D("output",e[0].dataType,f.length,l),_=[y,g,x];return`
  ${b.registerUniform("output_size","u32").declareVariables(..._)}
  ${b.mainStart()}
  ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${x.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${g.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${y.getByOffset("global_idx")} * ${x.type.value}(scale_shift.x) + ${x.type.value}(scale_shift.y);
      ${x.setByOffset("global_idx","value")};
  }`};r.compute({name:"InstanceNormalization",shaderCache:{hint:`${l}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...B(f,m,f)]}),getShaderSource:h},{inputs:[e[0],d]})},hv=(r,e,n)=>{let t=e[0].dims,o=t,i=t[0],s=t[t.length-1],a=$.sizeFromDimension(t,1)/s,u=xe(s),l=$.size(o)/u,c=[{type:12,data:a},{type:12,data:Math.floor(s/u)}],d=["type","type"],f=!1,m=[0,t.length-1];for(let y=0;y<t.length-2;y++)f=f||t[y+1]!==1,m.push(y+1);f=f&&t[t.length-1]!==1;let p=f?r.compute(Me(r.inputs[0],m),{inputs:[r.inputs[0]],outputs:[-1]})[0]:r.inputs[0].reshape(Array.from({length:t.length},(y,g)=>t[m[g]])),h=Kh(r,p,e[1],e[2],i,a,s,n.epsilon),b=y=>{let g=me(e[0].dataType),x=u===1?"vec2f":`mat${u}x2f`,_=O=>{let E=O===0?"x":"y",k=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${g}(${k}(scale.${E}))`;case 2:return`vec2<${g}>(${k}(scale[0].${E}, scale[1].${E}))`;case 4:return`vec4<${g}>(${k}(scale[0].${E}, scale[1].${E}, scale[2].${E}, scale[3].${E}))`;default:throw new Error(`Not supported compoents ${u}`)}},v=P("input",e[0].dataType,e[0].dims,u),I=D("output",e[0].dataType,o,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${v.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${x}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${y.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${_(0)}, ${_(1)});
  }`};r.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c}),getShaderSource:b},{inputs:[e[0],h]})},jh=(r,e)=>{e.format==="NHWC"?hv(r,r.inputs,e):mv(r,r.inputs,e)}});var gv,bv,Zh,Jh=S(()=>{"use strict";X();te();ne();gv=r=>{if(!r||r.length<2)throw new Error("layerNorm requires at least 2 inputs.")},bv=(r,e,n)=>{let t=e.simplified,o=r[0].dims,i=r[1],s=!t&&r[2],a=o,u=$.normalizeAxis(e.axis,o.length),l=$.sizeToDimension(o,u),c=$.sizeFromDimension(o,u),d=$.size(i.dims),f=s?$.size(s.dims):0;if(d!==c||s&&f!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${d} and bias size of ${f}`);let m=[];for(let v=0;v<o.length;++v)v<u?m.push(o[v]):m.push(1);let p=xe(c),h=["type","type"],b=[{type:12,data:l},{type:1,data:c},{type:12,data:Math.floor(c/p)},{type:1,data:e.epsilon}];s&&h.push("type");let y=n>1,g=n>2,x=v=>{let I=me(r[0].dataType),O=[P("x",r[0].dataType,r[0].dims,p),P("scale",i.dataType,i.dims,p)];s&&O.push(P("bias",s.dataType,s.dims,p)),O.push(D("output",r[0].dataType,a,p)),y&&O.push(D("mean_data_output",1,m)),g&&O.push(D("inv_std_output",1,m));let E=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${v.registerUniforms(E).declareVariables(...O)}
  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ka("f32",p)};
    var mean_square_vector = ${ka("f32",p)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${yr(I,p,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${It("mean_vector",p)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${It("mean_square_vector",p)} / uniforms.norm_size ${t?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${yr(I,p,"x[j + offset]")};
      let f32scale = ${yr(I,p,"scale[j]")};
      output[j + offset] = ${O[0].type.value}((f32input ${t?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${yr(I,p,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${g?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},_=[{dims:a,dataType:r[0].dataType}];return y&&_.push({dims:m,dataType:1}),g&&_.push({dims:m,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${p};${n};${t}`,inputDependencies:h},getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:b}),getShaderSource:x}},Zh=(r,e)=>{gv(r.inputs),r.compute(bv(r.inputs,e,r.outputCount))}});var yv,Yh,Qh=S(()=>{"use strict";te();Ko();hn();yv=r=>{if(!r||r.length!==2)throw new Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw new Error("shared dimension does not match.")},Yh=r=>{yv(r.inputs);let e=Et.calcShape(r.inputs[0].dims,r.inputs[1].dims,!0);if(!e)throw new Error("Can't use matmul on the given tensors");let n=e[e.length-1],t=r.inputs[0].dims[r.inputs[0].dims.length-1];if(n<8&&t<8)r.compute(qo(r.inputs,{activation:""},e));else{let o=e[e.length-2],i=$.size(r.inputs[0].dims.slice(0,-2)),s=$.size(r.inputs[1].dims.slice(0,-2));if(i!==1&&o===1&&s===1){let a=r.inputs[0].reshape([1,i,t]),u=r.inputs[1].reshape([1,t,n]),l=[1,i,n],c=[a,u];r.compute(mn(c,{activation:""},e,l),{inputs:c})}else r.compute(mn(r.inputs,{activation:""},e))}}});var xv,wv,_v,eg,tg,rg=S(()=>{"use strict";X();te();Pe();ne();xv=(r,e)=>{if(r.length<3||r.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let n=r[0],t=n.dims.length;if(n.dims[t-1]!==e.k)throw new Error("The last dim of input shape does not match the k value");let o=Math.floor((e.k+e.blockSize-1)/e.blockSize),i=e.blockSize/8*e.bits,s=r[1];if(!$.areEqual(s.dims,[e.n,o,i]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=r[2].dims;if($.size(u)!==e.n*o)throw new Error("scales input size error.");if(r.length===4){let c=r[3].dims,d=e.bits>4?e.n*o:e.n*Math.floor((o+1)/2);if($.size(c)!==d)throw new Error("zeroPoints input size error.")}},wv=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=$.size(a),c=r[1].dims[2]/4,d=r[0].dataType,f=xe(e.k),m=xe(c),p=xe(s),h=a.concat([o,s]),b=o>1&&s/p%2===0?2:1,y=$.size(h)/p/b,g=64,x=[],_=[u,o,i/f],v=$.convertShape(r[1].dims).slice();v.splice(-1,1,c/m),x.push(...B(_)),x.push(...B(v)),x.push(...B(r[2].dims)),r.length===4&&x.push(...B($.convertShape(r[3].dims)));let I=[u,o,s/p];x.push(...B(I));let O=E=>{let k=_.length,N=P("a",r[0].dataType,k,f),C=P("b",12,v.length,m),ee=P("scales",r[2].dataType,r[2].dims.length),V=[N,C,ee],J=r.length===4?P("zero_points",12,r[3].dims.length):void 0;J&&V.push(J);let Se=I.length,K=D("output",r[0].dataType,Se,p),Y=me(r[0].dataType),oe=(()=>{switch(f){case 1:return`array<${Y}, 8>`;case 2:return`mat4x2<${Y}>`;case 4:return`mat2x4<${Y}>`;default:throw new Error(`${f}-component is not supported.`)}})(),Q=()=>{let Ee=`
          // reuse a data
            var input_offset = ${N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`)};
            var a_data: ${oe};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${N.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let de=0;de<p*b;de++)Ee+=`
            b_value = ${m===1?`b${de}_data`:`b${de}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${oe}(${Array.from({length:4},(z,U)=>`${Y}(b_value_lower[${U}]), ${Y}(b_value_upper[${U}])`).join(", ")});
            b_dequantized_values = ${(()=>f===1?`${oe}(${Array.from({length:8},(z,U)=>`(b_quantized_values[${U}] - ${J?`zero_point${de}`:"zero_point"}) * scale${de}`).join(", ")});`:`(b_quantized_values - ${oe}(${Array(8).fill(`${J?`zero_point${de}`:"zero_point"}`).join(",")})) * scale${de};`)()};
            workgroup_shared[local_id.x * ${b} + ${Math.floor(de/p)}]${p>1?`[${de%p}]`:""} += ${Array.from({length:8/f},(z,U)=>`${f===1?`a_data[${U}] * b_dequantized_values[${U}]`:`dot(a_data[${U}], b_dequantized_values[${U}])`}`).join(" + ")};
          `;return Ee},_e=()=>{let Ee=`
            var col_index = col * ${p};
            ${J?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Y}(8);`}
            `;for(let de=0;de<p*b;de++)Ee+=`
            let scale${de} = ${ee.getByOffset("col_index * nBlocksPerCol + block")};
            ${J?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${de} = ${Y}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return Ee},qe=()=>{let Ee=`col_index = col * ${p};`;for(let de=0;de<p*b;de++)Ee+=`
            let b${de}_data = ${C.getByIndices(`${C.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return Ee+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${oe};
            var b_dequantized_values: ${oe};`,Ee};return`
        var<workgroup> workgroup_shared: array<${K.type.value}, ${b*g}>;
        ${E.declareVariables(...V,K)}
        ${E.mainStart([g,1,1])}
          let output_indices = ${K.offsetToIndices(`(global_idx / ${g}) * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${g}) {
            //process one block
            var word_offset: u32 = block * ${e.blockSize/f};
            ${_e()}
            for (var word: u32 = 0; word < ${c}; word += ${m}) {
              ${qe()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${Q()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${b}) {
            var output_value: ${K.type.value} = ${K.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${g}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${b};
            }
            ${K.setByIndices(`${K.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${e.blockSize};${e.bits};${f};${m};${p};${b};${g}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:h,dataType:d}],dispatchGroup:{x:y},programUniforms:x}),getShaderSource:O}},_v=(r,e)=>{let n=r[0].dims,t=n.length,o=n[t-2],i=e.k,s=e.n,a=n.slice(0,t-2),u=$.size(a),c=r[1].dims[2]/4,d=r[0].dataType,f=xe(e.k),m=xe(c),p=a.concat([o,s]),h=128,b=s%8===0?8:s%4===0?4:1,y=h/b,g=y*m*8,x=g/f,_=g/e.blockSize,v=$.size(p)/b,I=[],O=[u,o,i/f],E=$.convertShape(r[1].dims).slice();E.splice(-1,1,c/m),I.push(...B(O)),I.push(...B(E)),I.push(...B(r[2].dims)),r.length===4&&I.push(...B($.convertShape(r[3].dims)));let k=[u,o,s];I.push(...B(k));let N=C=>{let ee=O.length,V=P("a",r[0].dataType,ee,f),J=P("b",12,E.length,m),Se=P("scales",r[2].dataType,r[2].dims.length),K=[V,J,Se],Y=r.length===4?P("zero_points",12,r[3].dims.length):void 0;Y&&K.push(Y);let oe=k.length,Q=D("output",r[0].dataType,oe),_e=me(r[0].dataType),qe=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${_e}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${_e}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${V.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${Q.type.value}, ${y}>, ${b}>;
        ${C.declareVariables(...K,Q)}
        ${C.mainStart([y,b,1])}
          let output_indices = ${Q.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${_} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += ${h})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${V.getByIndices(`${V.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${V.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${_} + local_id.x;
            ${Y?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${Y.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${_e}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${_e}(8);`}
            let scale = ${Se.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${J.getByIndices(`${J.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${e.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${qe()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${_e}>(${Array.from({length:4},(Ee,de)=>`${_e}(b_value_lower[${de}]), ${_e}(b_value_upper[${de}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${_e}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(Ee,de)=>`${`dot(a_data${de}, b_dequantized_values[${de}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${Q.type.value} = ${Q.type.value}(0);
            for (var b = 0u; b < ${y}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${Q.setByIndices(`${Q.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${e.blockSize};${f};${m};${y};${b}`,inputDependencies:Array(r.length).fill("rank")},getRunData:()=>({outputs:[{dims:p,dataType:d}],dispatchGroup:{x:v},programUniforms:I}),getShaderSource:N}},eg=(r,e)=>{xv(r.inputs,e),e.blockSize===32&&r.adapterInfo.isVendor("intel")&&r.adapterInfo.isArchitecture("gen-12lp")?r.compute(_v(r.inputs,e)):r.compute(wv(r.inputs,e))},tg=r=>Z(r)});var Tv,vv,Iv,Sv,$v,Av,Pv,Ov,ng,og=S(()=>{"use strict";X();te();ne();Tv=r=>{if(!r||r.length<1)throw new Error("Too few inputs");if(r[0].dataType!==1&&r[0].dataType!==10)throw new Error("Input type must be float or float16.");if(r.length>=2){let e=r[0].dims.length*2===r[1].dims[0];if(r.length===4&&(e=r[3].dims[0]*2===r[1].dims[0]),!e)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},vv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
            k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${F("uniforms.x_shape",o,e)})) {
              break;
            }
            offset += k * i32(${F("uniforms.x_strides",o,e)});
        `;return`
          value = ${r.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${t}
            value = x[offset];
          }
      `},Iv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${F("uniforms.x_shape",o,e)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${F("uniforms.x_shape",o,e)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Sv=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k = i32(${F("uniforms.x_shape",o,e)}) - 1;
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},$v=(r,e,n)=>{let t="";for(let o=e-1;o>=0;--o)t+=`
                k = i32(${r.indicesGet("indices",o)}) - ${F("uniforms.pads",o,n)};
                if (k < 0)  {
                  k += i32(${F("uniforms.x_shape",o,e)}]);
                }
                if (k >= i32(${F("uniforms.x_shape",o,e)})) {
                  k -= i32(${F("uniforms.x_shape",o,e)});
                }
                offset += k * i32(${F("uniforms.x_strides",o,e)});
            `;return`
              var offset = 0;
              var k = 0;
              ${t}
              value = x[offset];
          `},Av=(r,e,n)=>{switch(n.mode){case 0:return vv(r,e,n.pads.length);case 1:return Iv(r,e,n.pads.length);case 2:return Sv(r,e,n.pads.length);case 3:return $v(r,e,n.pads.length);default:throw new Error("Invalid mode")}},Pv=(r,e)=>{let n=$.padShape(r[0].dims.slice(),e.pads),t=r[0].dims,o=$.size(n),i=[{type:12,data:o},{type:6,data:e.pads}],s=r.length>=3&&r[2].data;e.mode===0&&i.push({type:s?r[2].dataType:1,data:e.value}),i.push(...B(r[0].dims,n));let a=["rank"],u=l=>{let c=D("output",r[0].dataType,n.length),d=P("x",r[0].dataType,t.length),f=d.type.value,m=Av(c,t.length,e),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:e.pads.length}];return e.mode===0&&p.push({name:"constant_value",type:s?f:"f32"}),`
            ${l.registerUniforms(p).declareVariables(d,c)}
            ${l.mainStart()}
            ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${f}(0);
            ${m}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${e.mode}${s}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil($.size(n)/64)},programUniforms:i}),getShaderSource:u}},Ov=(r,e)=>{if(r.length>1){let n=r[1].getBigInt64Array(),t=r.length>=3&&r[2].data?r[2].dataType===10?r[2].getUint16Array()[0]:r[2].getFloat32Array()[0]:0,o=r[0].dims.length,i=new Int32Array(2*o).fill(0);if(r.length>=4){let a=r[3].getBigInt64Array();for(let u=0;u<a.length;u++)i[Number(a[u])]=Number(n[u]),i[Number(a[u])+o]=Number(n[u+a.length])}else n.forEach((a,u)=>i[Number(u)]=Number(a));let s=[];return i.forEach(a=>s.push(a)),{mode:e.mode,value:t,pads:s}}else return e},ng=(r,e)=>{Tv(r.inputs);let n=Ov(r.inputs,e);r.compute(Pv(r.inputs,n),{inputs:[0]})}});var Zo,ig,ag,sg,ug,Ev,Cv,lg,cg,dg,fg,pg,mg,hg,gg,bg,yg,xg,wg,_g=S(()=>{"use strict";Ke();X();te();ne();Zo=r=>{if(j.webgpu.validateInputContent&&(!r||r.length!==1))throw new Error("Pool ops requires 1 input.")},ig=(r,e,n)=>{let t=e.format==="NHWC",o=r.dims.slice();t&&o.splice(1,0,o.pop());let i=Object.hasOwnProperty.call(e,"dilations"),s=e.kernelShape.slice(),a=e.strides.slice(),u=i?e.dilations.slice():[],l=e.pads.slice();gr.adjustPoolAttributes(n,o,s,a,u,l);let c=gr.computePoolOutputShape(n,o,a,u,s,l,e.autoPad),d=Object.assign({},e);i?Object.assign(d,{kernelShape:s,strides:a,pads:l,dilations:u,cacheKey:e.cacheKey}):Object.assign(d,{kernelShape:s,strides:a,pads:l,cacheKey:e.cacheKey});let f=c.slice();return f.push(f.splice(1,1)[0]),[d,t?f:c]},ag=(r,e)=>{let n=e.format==="NHWC",t=$.size(r),o=$.size(e.kernelShape),i=[{type:12,data:t},{type:12,data:o}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(e.kernelShape.length<=2){let a=e.kernelShape[e.kernelShape.length-1],u=e.strides[e.strides.length-1],l=e.pads[e.pads.length/2-1],c=e.pads[e.pads.length-1],d=!!(l+c);i.push({type:12,data:a},{type:12,data:u},{type:12,data:l},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let f=!1;if(e.kernelShape.length===2){let m=e.kernelShape[e.kernelShape.length-2],p=e.strides[e.strides.length-2],h=e.pads[e.pads.length/2-2],b=e.pads[e.pads.length-2];f=!!(h+b),i.push({type:12,data:m},{type:12,data:p},{type:12,data:h},{type:12,data:b}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[i,s,!0,d,f]}else{if(n)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=$.computeStrides(e.kernelShape);i.push({type:12,data:a},{type:12,data:e.pads},{type:12,data:e.strides}),s.push({name:"kernelStrides",type:"u32",length:a.length},{name:"pads",type:"u32",length:e.pads.length},{name:"strides",type:"u32",length:e.strides.length});let u=e.pads.reduce((l,c)=>l+c);return[i,s,!!u,!1,!1]}},sg=(r,e,n,t,o,i,s,a,u,l,c,d)=>{let f=o.format==="NHWC",m=e.type.value,p=D("output",e.type.tensor,t);if(o.kernelShape.length<=2){let h="",b="",y="",g=n-(f?2:1);if(c?h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${g}] < 0 || xIndices[${g}]
                      >= uniforms.x_shape[${g}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`:h=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${g}] = indices[${g}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${e.indicesToOffset("xIndices")}];
                  ${i}
                }`,o.kernelShape.length===2){let _=n-(f?3:2);d?b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${_}] < 0 || xIndices[${_}] >= uniforms.x_shape[${_}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:b=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${_}] = indices[${_}] * uniforms.sh - uniforms.phStart + j;
                `,y=`
              }
            `}return`
            ${r.registerUniforms(u).declareVariables(e,p)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${p.offsetToIndices("global_idx")};
              var xIndices = ${p.offsetToIndices("global_idx")};

              var value = ${m}(${a});
              var pad = 0;
              ${b}
              ${h}
              ${y}
              ${s}

              output[global_idx] = value;
            }`}else{if(f)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let h=o.kernelShape.length,b=o.pads.length,y="";return l?y=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${e.indicesToOffset("xIndices")}];
                ${i}
              }`:y=`
              }
              let x_val = x[${e.indicesToOffset("xIndices")}];
              ${i}
            `,`
            ${r.registerUniforms(u).declareVariables(e,p)}

            ${r.mainStart()}
              ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${p.offsetToIndices("global_idx")};
              var xIndices = ${p.offsetToIndices("global_idx")};

              var offsets: array<u32, ${h}>;

              var value = ${m}(${a});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${h-1}u; j++) {
                  offsets[j] = offset / ${F("uniforms.kernelStrides","j",h)};
                  offset -= offsets[j] * ${F("uniforms.kernelStrides","j",h)};
                }
                offsets[${h-1}] = offset;

                isPad = false;
                for (var j = ${n-h}u; j < ${n}u; j++) {
                  xIndices[j] = indices[j] * ${F("uniforms.strides",`j - ${n-h}u`,h)}
                    + offsets[j - ${n-h}u] - ${F("uniforms.pads","j - 2u",b)};
                  ${y}
              }
              ${s}

              output[global_idx] = value;
            }`}},ug=r=>`${r.format};${r.ceilMode};${r.autoPad};${r.kernelShape.length}`,Ev=r=>`${ug(r)};${r.countIncludePad}`,Cv=r=>`${ug(r)};${r.storageOrder};${r.dilations}`,lg=r=>({format:r.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][r.auto_pad],ceilMode:r.ceil_mode,kernelShape:r.kernel_shape,strides:r.strides,pads:r.pads}),cg=(r,e,n,t)=>{let[o,i]=ig(e,t,n),s=P("x",e.dataType,e.dims.length),a=s.type.value,u="value += x_val;",l="";o.countIncludePad?l+=`value /= ${a}(uniforms.kernelSize);`:l+=`value /= ${a}(i32(uniforms.kernelSize) - pad);`;let[c,d,f,m,p]=ag(i,o);c.push(...B(e.dims,i));let h=["rank"];return{name:r,shaderCache:{hint:`${t.cacheKey};${f};${m};${p}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil($.size(i)/64)},programUniforms:c}),getShaderSource:b=>sg(b,s,e.dims.length,i.length,o,u,l,0,d,f,m,p)}},dg=r=>{let e=r.count_include_pad!==0,n=lg(r);if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let t={countIncludePad:e,...n,cacheKey:""};return{...t,cacheKey:Ev(t)}},fg=(r,e)=>{Zo(r.inputs),r.compute(cg("AveragePool",r.inputs[0],!1,e))},pg={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},mg=r=>{let e=r.format;return{format:e,...pg,cacheKey:e}},hg=(r,e)=>{Zo(r.inputs),r.compute(cg("GlobalAveragePool",r.inputs[0],!0,e))},gg=(r,e,n,t)=>{let[o,i]=ig(e,t,n),s=`
      value = max(x_val, value);
    `,a="",u=P("x",e.dataType,e.dims.length),l=["rank"],[c,d,f,m,p]=ag(i,o);return c.push(...B(e.dims,i)),{name:r,shaderCache:{hint:`${t.cacheKey};${f};${m};${p}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:e.dataType}],dispatchGroup:{x:Math.ceil($.size(i)/64)},programUniforms:c}),getShaderSource:h=>sg(h,u,e.dims.length,i.length,o,s,a,e.dataType===10?-65504:-1e5,d,f,m,p)}},bg=(r,e)=>{Zo(r.inputs),r.compute(gg("MaxPool",r.inputs[0],!1,e))},yg=r=>{let e=r.storage_order,n=r.dilations,t=lg(r);if(e!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(t.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let o={storageOrder:e,dilations:n,...t,cacheKey:""};return{...o,cacheKey:Cv(o)}},xg=r=>{let e=r.format;return{format:e,...pg,cacheKey:e}},wg=(r,e)=>{Zo(r.inputs),r.compute(gg("GlobalMaxPool",r.inputs[0],!0,e))}});var Dv,Bv,Tg,vg,Ig=S(()=>{"use strict";X();te();Pe();ne();Dv=(r,e)=>{if(r.length<2||r.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(r.length===3&&r[1].dims===r[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(r.length===3&&r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[0].dataType===6&&r.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(r[1].dims.length!==0&&r[1].dims.length!==1&&r[1].dims.length!==r[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(r.length>2){if(r[0].dataType!==r[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(r[1].dims.length!==r[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!r[1].dims.map((n,t)=>n===r[2].dims[t]).reduce((n,t)=>n&&t,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(e.blockSize>0){if(r[1].dims.length===0||r[1].dims.length===1&&r[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!r[1].dims.map((o,i)=>i===e.axis||o===r[0].dims[i]).reduce((o,i)=>o&&i,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(r[1].dims.length!==r[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let n=r[0].dims[e.axis],t=r[1].dims[e.axis];if(e.blockSize<Math.ceil(n/t)||e.blockSize>Math.ceil(n/(t-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Bv=(r,e)=>{let n=$.normalizeAxis(e.axis,r[0].dims.length),t=r[0].dataType,o=t===3,i=r[0].dims,s=r[1].dataType,a=$.size(i),u=t===3||t===2,l=u?[Math.ceil($.size(r[0].dims)/4)]:r[0].dims,c=r[1].dims,d=r.length>2?r[2]:void 0,f=d?u?[Math.ceil($.size(d.dims)/4)]:d.dims:void 0,m=c.length===0||c.length===1&&c[0]===1,p=m===!1&&c.length===1,h=xe(a),b=m&&(!u||h===4),y=b?h:1,g=b&&!u?h:1,x=P("input",u?12:t,l.length,g),_=P("scale",s,c.length),v=d?P("zero_point",u?12:t,f.length):void 0,I=D("output",s,i.length,y),O=[x,_];v&&O.push(v);let E=[l,c];d&&E.push(f);let k=[{type:12,data:a/y},{type:12,data:n},{type:12,data:e.blockSize},...B(...E,i)],N=C=>{let ee=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${C.registerUniforms(ee).declareVariables(...O,I)}
      ${C.mainStart()}
          ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${(()=>u?`
            let input = ${x.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${y===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${x.getByOffset("global_idx")};`)()};

          // Set scale input
          ${(()=>m?`let scale_value= ${_.getByOffset("0")}`:p?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${_.getByOffset("scale_index")};`:`
            var scale_indices: ${_.type.indices} = output_indices;
            let index = ${_.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${_.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${_.getByIndices("scale_indices")};`)()};

          // Set zero-point input
          ${(()=>v?m?u?`
                let zero_point_input = ${v.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${v.getByOffset("0")}`:p?u?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${v.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${v.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${_.indicesToOffset("scale_indices")};
                let zero_point_input = ${v.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${v.getByIndices("scale_indices")};`:`let zero_point_value = ${u?o?"i32":"u32":x.type.value}(0);`)()};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:e.cacheKey,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getShaderSource:N,getRunData:()=>({outputs:[{dims:i,dataType:s}],dispatchGroup:{x:Math.ceil(a/y/64),y:1,z:1},programUniforms:k})}},Tg=(r,e)=>{Dv(r.inputs,e),r.compute(Bv(r.inputs,e))},vg=r=>Z({axis:r.axis,blockSize:r.blockSize})});var Lv,zv,Sg,$g=S(()=>{"use strict";Ke();X();ne();Lv=(r,e,n)=>{let t=r===e,o=r<e&&n<0,i=r>e&&n>0;if(t||o||i)throw new Error("Range these inputs' contents are invalid.")},zv=(r,e,n,t)=>{let o=Math.abs(Math.ceil((e-r)/n)),i=[o],s=o,a=[{type:12,data:s},{type:t,data:r},{type:t,data:n},...B(i)],u=l=>{let c=D("output",t,i.length),d=c.type.value,f=[{name:"outputSize",type:"u32"},{name:"start",type:d},{name:"delta",type:d}];return`
        ${l.registerUniforms(f).declareVariables(c)}
        ${l.mainStart()}
        ${l.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${d}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${t}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:a})}},Sg=r=>{let e=0,n=0,t=0;r.inputs[0].dataType===6?(e=r.inputs[0].getInt32Array()[0],n=r.inputs[1].getInt32Array()[0],t=r.inputs[2].getInt32Array()[0]):r.inputs[0].dataType===1&&(e=r.inputs[0].getFloat32Array()[0],n=r.inputs[1].getFloat32Array()[0],t=r.inputs[2].getFloat32Array()[0]),j.webgpu.validateInputContent&&Lv(e,n,t),r.compute(zv(e,n,t,r.inputs[0].dataType),{inputs:[]})}});var Rv,Nv,Vv,Mv,Fv,Gv,Uv,Wv,Hv,qv,Kv,Ag,jv,Xv,Zv,Jv,Yv,Pg,Og,Eg=S(()=>{"use strict";X();te();Pe();ne();Rv=(r,e)=>{if(r.every(n=>n>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),r.length>0){if(e.mode==="linear"){if(!(r.length===2||r.length===3||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1||r.length===5&&r[0]===1&&r[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(e.mode==="cubic"&&!(r.length===2||r.length===4&&r[0]===1&&r[1]===1||r.length===4&&r[0]===1&&r[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Nv=(r,e,n)=>{e.every(o=>o>=0&&o<n||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let t=new Array(n).fill(1);return e.forEach((o,i)=>t[o]=r[i]),t},Vv=(r,e,n,t,o,i)=>{let[s,a,u]=n>10?[1,2,3]:[-1,r.length>1?1:-1,-1],l=r[0].dims.length;if(s>0&&r.length>s&&r[s].dims.length>0)r[s].getFloat32Array().forEach(c=>i.push(c));else if(e.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(a>0&&r.length>a&&r[a].dims.length===1&&r[a].dims[0]>0){if(r[a].getFloat32Array().forEach(c=>t.push(c)),t.length!==0&&t.length!==l&&n>=18&&t.length!==e.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Rv(t,e),e.axes.length>0&&Nv(t,e.axes,l).forEach((c,d)=>t[d]=c)}if(u>0&&r.length>u&&r[u].dims.length===1&&r[u].dims[0]>0&&(r[u].getBigInt64Array().forEach(c=>o.push(Number(c))),o.length!==0&&o.length!==l&&n>=18&&o.length!==e.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(e.axes.length>0){if(t.length!==0&&t.length!==e.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(o.length!==0&&o.length!==e.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof t<"u"&&typeof o<"u"&&t.length>0&&o.length>l)throw new Error("Resize requires only of scales or sizes to be specified")},Mv=(r,e)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${e} { `+(()=>{switch(r){case"asymmetric":return`return ${e}(xResized) / ${e}(xScale);`;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${e}(xResized) + 0.5) / ${e}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${e}(xResized) + 0.5) / ${e}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    // The whole part and the fractional part are calculated separately due to inaccuracy of floating
                    // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
                    // offset-by-one error later in floor().
                    let whole = ${e}(xResized * (lengthOriginal - 1) / (lengthResized - 1));
                    let fract =
                        ${e}(xResized * (lengthOriginal - 1) % (lengthResized - 1)) / ${e}(lengthResized - 1);
                    return whole + fract;
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${e}(roiStart) * ${e}(lengthOriginal - 1) +
                        (${e}(xResized) * ${e}(roiEnd - roiStart) * ${e}(lengthOriginal - 1)) /
                        ${e}(lengthResized - 1);
                  } else {
                    return 0.5 * ${e}(roiStart + roiEnd) * ${e}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${e}xScale * ${e}(lengthResized);
                  const adjustment = ${e}(lengthResized) / outputWidth;
                  const center = ${e}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;case"half_pixel":return`return ((${e}(xResized) + 0.5) / ${e}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${r} is not supported`)}})()+"}",Fv=(r,e,n)=>`fn getNearestPixelFromOriginal(xOriginal: ${n}, isDownSample: bool) -> ${n} {`+(()=>{switch(r){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(e<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${r} is not supported`)}})()+"}",Gv=(r,e,n)=>{let t=new Array(n).fill(0).concat(new Array(n).fill(1)),o=r.length===0?t:r.slice();return e.length>0?(e.forEach((i,s)=>{t[i]=o[s],t[s+n]=o[e.length+s]}),t):o},Uv=(r,e,n,t)=>{let o=[];if(n.length>0)if(t.length>0){if(r.forEach(i=>o.push(i)),Math.max(...t)>r.length)throw new Error("axes is out of bound");t.forEach((i,s)=>o[i]=n[s])}else n.forEach(i=>o.push(i));else{if(e.length===0)throw new Error("Resize requires either scales or sizes.");o=r.map((i,s)=>Math.round(i*e[s]))}return o},Wv=(r,e,n)=>{let t=(()=>{switch(n.keepAspectRatioPolicy){case"not_larger":return n.axes.length>0?Math.min(...n.axes.map(i=>e[i]),Number.MAX_VALUE):Math.min(...e,Number.MAX_VALUE);case"not_smaller":return n.axes.length>0?Math.max(...n.axes.map(i=>e[i]),Number.MIN_VALUE):Math.max(...e,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${n.keepAspectRatioPolicy} is not supported`)}})();e.fill(1,0,e.length);let o=r.slice();return n.axes.length>0?(n.axes.forEach(i=>e[i]=t),n.axes.forEach(i=>o[i]=Math.round(r[i]*e[i]))):(e.fill(t,0,e.length),o.forEach((i,s)=>o[s]=Math.round(i*e[s]))),o},Hv=(r,e,n,t,o)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${r.type.indices}) -> array<${r.type.value}, ${n.length}> {
      var original_indices: array<${r.type.value}, ${n.length}>;
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${r.indicesGet("output_indices","i")};
        var scale = ${F("uniforms.scales","i",t)};
        var roi_low = ${F("uniforms.roi","i",o)};
        var roi_hi = ${F("uniforms.roi",`i + ${e.length}`,o)};
        if (scale == 1.0) {
          original_indices[i] = ${r.type.value}(output_index);
        } else {
          var input_shape_i = ${F("uniforms.input_shape","i",e.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",n.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,qv=(r,e,n,t,o,i,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
      var input_indices: ${r.type.indices};
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${F("uniforms.scales","i",o)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${F("uniforms.roi","i",i)};
          var roi_hi = ${F("uniforms.roi",`i + ${n.length}`,i)};
          var input_shape_i = ${F("uniforms.input_shape","i",n.length)};
          var output_shape_i = ${F("uniforms.output_shape","i",t.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${e.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${e.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${r.indicesSet("input_indices","i"," input_index")}
      }
      return input_indices;
    }`,Kv=(r,e)=>`
    fn checkInputIndices(input_indices: ${r.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${e.length}; i++) {
        var input_index = ${r.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${F("uniforms.input_shape","i",e.length)}) {
          return false;
        }
      }
      return true;
    }`,Ag=(r,e,n,t)=>r.rank>t?`
    ${r.indicesSet("input_indices",e,"channel")};
    ${r.indicesSet("input_indices",n,"batch")};
`:"",jv=(r,e,n,t,o)=>{let[s,a,u,l]=n.length===2?[-1,0,1,-1]:[0,2,3,1],c=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${c} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(row, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(col, ${n[u]} - 1))`)};
      ${Ag(r,l,s,2)}
      return ${r.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${e.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${c} = originalIndices[${a}];
      var col:${c} = originalIndices[${u}];
      ${t?`if (row < 0 || row > (${n[a]} - 1) || col < 0 || col > (${n[u]} - 1)) {
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
      var x11: ${c} = getInputValue(batch, channel, row1, col1);
      var x12: ${c} = getInputValue(batch, channel, row1, col2);
      var x21: ${c} = getInputValue(batch, channel, row2, col1);
      var x22: ${c} = getInputValue(batch, channel, row2, col2);
      var dx1: ${c} = abs(row - ${c}(row1));
      var dx2: ${c} = abs(${c}(row2) - row);
      var dy1: ${c} = abs(col - ${c}(col1));
      var dy2: ${c} = abs(${c}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Xv=(r,e,n,t,o,i,s,a,u,l)=>{let c=n.length===2,d=!0,[f,m]=c?[0,1]:d?[2,3]:[1,2],p=r.type.value,h=b=>{let y=b===f?"row":"col";return`
      fn ${y}CubicInterpolation(input_indices: ${r.type.indices}, output_indices: ${e.type.indices}) -> ${p} {
        var output_index = ${e.indicesGet("output_indices",b)};
        var originalIdx: ${p} = getOriginalCoordinateFromResizedCoordinate(output_index, ${o[b]},
        ${t[b]}, ${n[b]}, ${i[b]}, ${i[b]} + ${n.length});
        var fractOriginalIdx: ${p} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${a} && (originalIdx < 0 || originalIdx > (${n[b]} - 1))) {
          return ${u};
        }
        var data: array<${p}, 4> = array<${p}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${y}: ${p} = originalIdx + ${p}(i);
          if (${y} < 0 || ${y} >= ${n[b]}) {
            ${(()=>l?`coefs[i + 1] = 0.0;
                        continue;`:a?`return ${u};`:`${y} = max(0, min(${y}, ${n[b]} - 1));`)()};
          }
        var input_indices_copy: ${r.type.indices} = input_indices;
          ${r.indicesSet("input_indices_copy",b,`u32(${y})`)};
          data[i + 1] = ${b===f?r.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${h(f)};
    ${h(m)};
  fn getCubicInterpolationCoefs(s: ${p}) -> array<${p}, 4> {
    var absS = abs(s);
    var coeffs: array<${p}, 4> = array<${p}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${p} = 1.0 - absS;
    var twoMinusAbsS: ${p} = 2.0 - absS;
    var onePlusAbsS: ${p} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${p}, 4>, coefs: array<${p}, 4>) -> ${p} {
    var coefsSum: ${p} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${e.type.indices}) -> ${p} {
    var input_indices: ${r.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Zv=(r,e,n,t,o)=>{let[s,a,u,l,c]=n.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],d=r.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${d} {
      var input_indices: ${r.type.indices};
      ${r.indicesSet("input_indices",a,`max(0, min(depth, ${n[a]} - 1))`)};
      ${r.indicesSet("input_indices",u,`max(0, min(height, ${n[u]} - 1))`)};
      ${r.indicesSet("input_indices",l,`max(0, min(width, ${n[l]} - 1))`)};
      ${Ag(r,c,s,3)}
      return ${r.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${e.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${d} = originalIndices[${a}];
      var height:${d} = originalIndices[${u}];
      var width:${d} = originalIndices[${l}];
      ${t?`if (depth < 0 || depth > (${n[a]} - 1) || height < 0 || height > (${n[u]} - 1) || width < 0 || (width > ${n[l]} - 1)) {
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
      var channel: u32 = ${n.length>3?`u32(originalIndices[${c}])`:"0"};
      var batch: u32 =  ${n.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${d} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${d} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${d} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${d} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${d} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${d} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${d} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${d} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${d} = abs(depth - ${d}(depth1));
      var dx2: ${d} = abs(${d}(depth2) - depth);
      var dy1: ${d} = abs(height - ${d}(height1));
      var dy2: ${d} = abs(${d}(height2) - height);
      var dz1: ${d} = abs(width - ${d}(width1));
      var dz2: ${d} = abs(${d}(width2) - width);
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
    }`},Jv=(r,e,n,t,o,i)=>{let s=r.dims,a=Gv(i,e.axes,s.length),u=Uv(s,t,o,e.axes),l=t.slice();t.length===0&&(l=s.map((g,x)=>g===0?1:u[x]/g),e.keepAspectRatioPolicy!=="stretch"&&(u=Wv(s,l,e)));let c=D("output",r.dataType,u.length),d=P("input",r.dataType,s.length),f=$.size(u),m=s.length===u.length&&s.every((g,x)=>g===u[x]),p=e.coordinateTransformMode==="tf_crop_and_resize",h=e.extrapolationValue,b=d.type.value,y=g=>`
      ${m?"":`
      ${Mv(e.coordinateTransformMode,b)};
      ${(()=>{switch(e.mode){case"nearest":return`
              ${Kv(d,s)};
              ${Fv(e.nearestMode,n,b)};
              ${qv(d,c,s,u,l.length,a.length,p)};
              `;case"linear":return`
              ${Hv(c,s,u,l.length,a.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${jv(d,c,s,p,h)}`;if(s.length===3||s.length===5)return`${Zv(d,c,s,p,h)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Xv(d,c,s,u,l,a,e.cubicCoeffA,p,e.extrapolationValue,e.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${g.registerUniform("output_size","u32").registerUniform("scales","f32",l.length).registerUniform("roi","f32",a.length).declareVariables(d,c)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${m?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${d.type.indices};
        ${(()=>{switch(e.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${d.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${e.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${e.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${e.cacheKey}|${n}|${l.length>0?l:""}|${o.length>0?o:""}|${a.length>0?a:""}|${m}|${s}`,inputDependencies:["rank"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:u,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:[{type:12,data:f},{type:1,data:l},{type:1,data:a},...B(s,u)]})}},Yv=r=>{let e=r.customDataBuffer;return new Uint32Array(e,e.byteOffset,1)[0]},Pg=(r,e)=>{let n=[],t=[],o=[],i=Yv(r);if(e.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Vv(r.inputs,e,i,n,t,o),r.compute(Jv(r.inputs[0],e,i,n,t,o),{inputs:[0]})},Og=r=>{let e=r.antialias,n=r.axes,t=r.coordinateTransformMode,o=r.cubicCoeffA,i=r.excludeOutside!==0,s=r.extrapolationValue,a=r.keepAspectRatioPolicy,u=r.mode,l=r.nearestMode===""?"simple":r.nearestMode;return Z({antialias:e,axes:n,coordinateTransformMode:t,cubicCoeffA:o,excludeOutside:i,extrapolationValue:s,keepAspectRatioPolicy:a,mode:u,nearestMode:l})}});var Qv,e0,Cg,kg=S(()=>{"use strict";X();te();Pe();ne();Qv=(r,e)=>{let[n,t,o,i]=r,{numHeads:s,rotaryEmbeddingDim:a}=e;if(n.dims.length!==3&&n.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${n.dims.length}`);if(!$.areEqual(t.dims,[])&&!$.areEqual(t.dims,[1])&&t.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${t.dims.length}`);if(o.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${o.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(!$.areEqual(o.dims,i.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(a>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=n.dims[0],l=n.dims[n.dims.length-2],c=o.dims[0],d=$.sizeFromDimension(n.dims,1)/l,f=a===0?o.dims[1]*2:d/s;if(a>f)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(t.dims.length===2){if(u!==t.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${t.dims[0]}`);if(l!==t.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${t.dims[1]}`)}if(f/2!==o.dims[1]&&a/2!==o.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${o.dims[1]}`);if(l>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},e0=(r,e)=>{let{interleaved:n,numHeads:t,rotaryEmbeddingDim:o,scale:i}=e,s=r[0].dims[0],a=$.sizeFromDimension(r[0].dims,1),u=r[0].dims[r[0].dims.length-2],l=a/u,c=r[2].dims[1],d=o===0?c*2:l/t,f=new Array(s,u,l/d,d-c),m=$.computeStrides(f),p=[{type:1,data:i},{type:12,data:f},{type:12,data:m},...r[0].dims.length===3?new Array({type:12,data:[a,l,d,1]}):[],...r[0].dims.length===4?new Array({type:12,data:[a,d,u*d,1]}):[],...B(r[0].dims,r[1].dims,r[2].dims,r[3].dims,r[0].dims)],h=b=>{let y=P("input",r[0].dataType,r[0].dims.length),g=P("position_ids",r[1].dataType,r[1].dims.length),x=P("cos_cache",r[2].dataType,r[2].dims.length),_=P("sin_cache",r[3].dataType,r[3].dims.length),v=D("output",r[0].dataType,r[0].dims.length);return b.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:f.length},{name:"global_strides",type:"u32",length:m.length},{name:"input_output_strides",type:"u32",length:m.length}]),`
        ${b.declareVariables(y,g,x,_,v)}

        ${b.mainStart(br)}
          let half_rotary_emb_dim = uniforms.${x.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${g.broadcastedIndicesToOffset("bsnh.xy",D("",g.type.tensor,2))};
            let position_id =
                u32(${g.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${n});
            let j = i + select(half_rotary_emb_dim, 1, ${n});
            let re = ${y.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} -
                ${y.getByOffset("j")} * ${_.get("position_id","bsnh[3]")};
            ${v.setByOffset("i","re")}
            let im = ${y.getByOffset("i")} * ${_.get("position_id","bsnh[3]")} +
                ${y.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${v.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${v.setByOffset("k",y.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Z({interleaved:n}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:h,getRunData:()=>({outputs:[{dims:r[0].dims,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil($.size(f)/br)},programUniforms:p})}},Cg=(r,e)=>{Qv(r.inputs,e),r.compute(e0(r.inputs,e))}});var t0,r0,Dg,Bg=S(()=>{"use strict";X();te();ne();t0=r=>{if(!r||r.length<3)throw new Error("layerNorm requires at least 3 inputs.");let e=r[0],n=r[1],t=r[2];if(e.dataType!==n.dataType||e.dataType!==t.dataType)throw new Error("All inputs must have the same data type");if(e.dims.length!==3&&e.dims.length!==2)throw new Error("Input must be 2D or 3D");if(n.dims.length!==3&&n.dims.length!==2)throw new Error("Skip must be 2D or 3D");let o=e.dims[e.dims.length-1],i=e.dims[e.dims.length-2];if(n.dims[n.dims.length-1]!==o)throw new Error("Skip must have the same hidden size as input");if(n.dims[n.dims.length-2]!==i)throw new Error("Skip must have the same sequence length as input");if(t.dims.length!==1)throw new Error("Gamma must be 1D");if(t.dims[t.dims.length-1]!==o)throw new Error("Gamma must have the same hidden size as input");if(r.length>3){let s=r[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Beta must have the same hidden size as input")}if(r.length>4){let s=r[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==o)throw new Error("Bias must have the same hidden size as input")}},r0=(r,e,n,t)=>{let o=e.simplified,i=r[0].dims,s=$.size(i),a=i,u=s,l=i.slice(-1)[0],c=t?i.slice(0,-1).concat(1):[],d=!o&&r.length>3,f=r.length>4,m=t&&n>1,p=t&&n>2,h=n>3,b=64,y=xe(l),g=[{type:12,data:u},{type:12,data:y},{type:12,data:l},{type:1,data:e.epsilon}],x=v=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],O=[P("x",r[0].dataType,r[0].dims,y),P("skip",r[1].dataType,r[1].dims,y),P("gamma",r[2].dataType,r[2].dims,y)];d&&O.push(P("beta",r[3].dataType,r[3].dims,y)),f&&O.push(P("bias",r[4].dataType,r[4].dims,y)),O.push(D("output",r[0].dataType,a,y)),m&&O.push(D("mean_output",1,c)),p&&O.push(D("inv_std_output",1,c)),h&&O.push(D("input_skip_bias_sum",r[0].dataType,a,y));let E=me(r[0].dataType),k=me(1,y);return`

      ${v.registerUniforms(I).declareVariables(...O)}
      var<workgroup> sum_shared : array<${k}, ${b}>;
      var<workgroup> sum_squared_shared : array<${k}, ${b}>;

      ${v.mainStart([b,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${b};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${b};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${b-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${f?"bias[offset1d + i]":E+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${h?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${yr(E,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${b};
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
        let mean = ${It("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${It("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${m?"mean_output[global_idx] = mean;":""}
        ${p?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${E}(mean)`}) *
            ${E}(inv_std_dev) * gamma[offset1d + i]
            ${d?"+ beta[offset1d + i]":""};
        }
      }`},_=[{dims:a,dataType:r[0].dataType}];return n>1&&_.push({dims:c,dataType:1}),n>2&&_.push({dims:c,dataType:1}),n>3&&_.push({dims:i,dataType:r[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${m};${p};${h}`,inputDependencies:r.map((v,I)=>"type")},getShaderSource:x,getRunData:()=>({outputs:_,dispatchGroup:{x:Math.ceil(u/l)},programUniforms:g})}},Dg=(r,e)=>{t0(r.inputs);let t=[0];r.outputCount>1&&t.push(-3),r.outputCount>2&&t.push(-3),r.outputCount>3&&t.push(3),r.compute(r0(r.inputs,e,r.outputCount,!1),{outputs:t})}});var n0,Jo,o0,Lg,i0,a0,zg,Rg,Ng=S(()=>{"use strict";X();te();Pe();ne();n0=(r,e)=>{if(!r||r.length<1)throw new Error("too few inputs");if(e.axes.length!==0){if(e.axes.length!==e.starts.length||e.axes.length!==e.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(e.starts.length!==e.ends.length)throw new Error("starts and ends must have the same length");r.slice(1).forEach((n,t)=>{if(r[t+1].dataType!==6&&r[t+1].dataType!==7)throw new Error(`Input ${t} must be an array of int32 or int64`)})},Jo=(r,e)=>{let n=[];if(r.length>e)if(r[e].dataType===7)r[e].getBigInt64Array().forEach(t=>n.push(Number(t)));else if(r[e].dataType===6)r[e].getInt32Array().forEach(t=>n.push(Number(t)));else throw new Error(`Input ${e} must be an array of int32 or int64`);return n},o0=(r,e)=>{if(r.length>1){let n=Jo(r,1),t=Jo(r,2),o=Jo(r,3);return o.length===0&&(o=[...Array(r[0].dims.length).keys()]),Z({starts:n,ends:t,axes:o})}else return e},Lg=(r,e,n,t,o)=>{let i=r;return r<0&&(i+=n[t[e]]),o[e]<0?Math.max(0,Math.min(i,n[t[e]]-1)):Math.max(0,Math.min(i,n[t[e]]))},i0=(r,e,n)=>`fn calculateInputIndices(output_indices: ${e.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${n.length}; i >= 0; i--) {
            let input_shape_i = ${F("uniforms.input_shape","i",n.length)};
            let steps_i = ${F("uniforms.steps","i",n.length)};
            let signs_i = ${F("uniforms.signs","i",n.length)};
            let starts_i = ${F("uniforms.starts","i",n.length)};
            var output_index = ${e.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,a0=(r,e)=>{let n=r[0].dims,t=$.size(n),o=e.axes.length>0?$.normalizeAxes(e.axes,n.length):[...Array(n.length).keys()],i=Jo(r,4);i.forEach(y=>y!==0||(()=>{throw new Error("step cannot be 0")})),i.length===0&&(i=Array(o.length).fill(1));let s=e.starts.map((y,g)=>Lg(y,g,n,o,i)),a=e.ends.map((y,g)=>Lg(y,g,n,o,i));if(o.length!==s.length||o.length!==a.length)throw new Error("start, ends and axes should have the same number of elements");if(o.length!==n.length)for(let y=0;y<n.length;++y)o.includes(y)||(s.splice(y,0,0),a.splice(y,0,n[y]),i.splice(y,0,1));let u=i.map(y=>Math.sign(y));i.forEach((y,g,x)=>{if(y<0){let _=(a[g]-s[g])/y,v=s[g],I=v+_*i[g];s[g]=I,a[g]=v,x[g]=-y}});let l=n.slice(0);o.forEach((y,g)=>{l[y]=Math.ceil((a[y]-s[y])/i[y])});let c={dims:l,dataType:r[0].dataType},d=D("output",r[0].dataType,l.length),f=P("input",r[0].dataType,r[0].dims.length),m=$.size(l),p=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:i.length}],h=[{type:12,data:m},{type:12,data:s},{type:6,data:u},{type:12,data:i},...B(r[0].dims,l)],b=y=>`
      ${y.registerUniforms(p).declareVariables(f,d)}
        ${i0(f,d,n)}
        ${y.mainStart()}
          ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${d.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${d.setByOffset("global_idx",f.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${i.length}`,inputDependencies:["rank"]},getShaderSource:b,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(t/64)},programUniforms:h})}},zg=(r,e)=>{n0(r.inputs,e);let n=o0(r.inputs,e);r.compute(a0(r.inputs,n),{inputs:[0]})},Rg=r=>{let e=r.starts,n=r.ends,t=r.axes;return Z({starts:e,ends:n,axes:t})}});var s0,u0,Vg,Mg,Fg=S(()=>{"use strict";X();te();Pe();Vt();ne();s0=r=>{if(!r||r.length!==1)throw new Error("Softmax op requires 1 input.")},u0=(r,e)=>{let n=r.inputs[0],t=n.dims,o=$.size(t),i=t.length,s=$.normalizeAxis(e.axis,i),a=s<t.length-1,u,l=[];a?(l=Array.from({length:i},(O,E)=>E),l[s]=i-1,l[i-1]=s,u=r.compute(Me(n,l),{inputs:[n],outputs:[-1]})[0]):u=n;let c=u.dims,d=c[i-1],f=o/d,m=xe(d),p=d/m,h=64;f===1&&(h=256);let b=(O,E)=>E===4?`max(max(${O}.x, ${O}.y), max(${O}.z, ${O}.w))`:E===2?`max(${O}.x, ${O}.y)`:E===3?`max(max(${O}.x, ${O}.y), ${O}.z)`:O,y=P("x",u.dataType,u.dims,m),g=D("result",u.dataType,u.dims,m),x=y.type.value,_=me(u.dataType)==="f32"?`var threadMax = ${x}(-3.402823e+38f);`:`var threadMax = ${x}(-65504.0h);`,v=O=>`
      var<workgroup> rowMaxShared : ${x};
      var<workgroup> rowSumShared : ${x};
      var<workgroup> threadShared : array<${x}, ${h}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${x} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${x}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${O.registerUniform("packedCols","i32").declareVariables(y,g)}
      ${O.mainStart(h)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${h};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${_}
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
          rowMaxShared = ${x}(${b("threadShared[0]",m)});
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
          rowSumShared = ${x}(${It("threadShared[0]",m)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,I=r.compute({name:"Softmax",shaderCache:{hint:`${m};${h}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:f},programUniforms:[{type:6,data:p}]}),getShaderSource:v},{inputs:[u],outputs:[a?-1:0]})[0];a&&r.compute(Me(I,l),{inputs:[I]})},Vg=(r,e)=>{s0(r.inputs),u0(r,e)},Mg=r=>Z({axis:r.axis})});var Gg,l0,c0,d0,Ug,Wg=S(()=>{"use strict";X();te();ne();Gg=r=>Array.from(r.getBigInt64Array(),Number),l0=r=>{if(!r||r.length!==2)throw new Error("Tile requires 2 inputs.");if(r[0].dataType!==1&&r[0].dataType!==10&&r[0].dataType!==6&&r[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(r[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(r[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(Gg(r[1]).length!==r[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},c0=(r,e)=>{let n=[];for(let t=0;t<r.length;++t)n.push(r[t]*e[t]);return n},d0=(r,e)=>{let n=r[0].dims,t=e??Gg(r[1]),o=c0(n,t),i=$.size(o),s=r[0].dataType,a=P("input",s,n.length),u=D("output",s,o.length),l=c=>`
      const inputShape = ${a.indices(...n)};
      ${c.registerUniform("output_size","u32").declareVariables(a,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${a.type.indices};
      for (var i = 0; i < ${n.length}; i++) {
        let input_dim_i = ${a.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${a.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",a.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:o,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...B(r[0].dims,o)]}),getShaderSource:l}},Ug=r=>{l0(r.inputs),r.compute(d0(r.inputs),{inputs:[0]})}});var f0,p0,Hg,qg=S(()=>{"use strict";X();te();ne();f0=(r,e,n,t,o)=>{let i=D("output_data",o,n.length,4),s=P("a_data",e[1].dataType,e[1].dims.length,4),a=P("b_data",e[2].dataType,e[2].dims.length,4),u=P("c_data",e[0].dataType,e[0].dims.length,4),l,c=(d,f,m)=>`select(${f}, ${d}, ${m})`;if(!t)l=i.setByOffset("global_idx",c(s.getByOffset("global_idx"),a.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let d=(f,m,p="")=>{let h=`a_data[index_a${m}][component_a${m}]`,b=`b_data[index_b${m}][component_b${m}]`,y=`bool(c_data[index_c${m}] & (0xffu << (component_c${m} * 8)))`;return`
            let output_indices${m} = ${i.offsetToIndices(`global_idx * 4u + ${m}u`)};
            let offset_a${m} = ${s.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_b${m} = ${a.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let offset_c${m} = ${u.broadcastedIndicesToOffset(`output_indices${m}`,i)};
            let index_a${m} = offset_a${m} / 4u;
            let index_b${m} = offset_b${m} / 4u;
            let index_c${m} = offset_c${m} / 4u;
            let component_a${m} = offset_a${m} % 4u;
            let component_b${m} = offset_b${m} % 4u;
            let component_c${m} = offset_c${m} % 4u;
            ${f}[${m}] = ${p}(${c(h,b,y)});
          `};o===9?l=`
            var data = vec4<u32>(0);
            ${d("data",0,"u32")}
            ${d("data",1,"u32")}
            ${d("data",2,"u32")}
            ${d("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:l=`
            ${d("output_data[global_idx]",0)}
            ${d("output_data[global_idx]",1)}
            ${d("output_data[global_idx]",2)}
            ${d("output_data[global_idx]",3)}
          `}return`
        ${r.registerUniform("vec_size","u32").declareVariables(u,s,a,i)}
        ${r.mainStart()}
        ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${l}
      }`},p0=r=>{let e=r[1].dims,n=r[2].dims,t=r[0].dims,o=r[1].dataType,i=!($.areEqual(e,n)&&$.areEqual(n,t)),s=e,a=$.size(e);if(i){let l=Et.calcShape(Et.calcShape(e,n,!1),t,!1);if(!l)throw new Error("Can't perform where op on the given tensors");s=l,a=$.size(s)}let u=Math.ceil(a/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:l=>f0(l,r,s,i,o),getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(a/64/4)},programUniforms:[{type:12,data:u},...B(t,e,n,s)]})}},Hg=r=>{r.compute(p0(r.inputs))}});var Kg,jg=S(()=>{"use strict";Rp();Mo();Mp();Gp();Am();Nm();Fm();eh();sh();ch();ph();yh();_h();vh();$h();Oh();kh();Lh();Nh();qh();Xh();Jh();Qh();rg();ja();og();_g();Ig();$g();No();Eg();kg();Bg();Ng();Fg();Za();Wg();Vt();Go();qg();Kg=new Map([["Abs",[Up]],["Acos",[Wp]],["Acosh",[Hp]],["Add",[Pm]],["ArgMax",[zp,La]],["ArgMin",[Lp,La]],["Asin",[qp]],["Asinh",[Kp]],["Atan",[jp]],["Atanh",[Xp]],["Attention",[Np]],["AveragePool",[fg,dg]],["BatchNormalization",[Vp]],["BiasAdd",[Fp]],["BiasSplitGelu",[$m]],["Cast",[Jp,Zp]],["Ceil",[Qp]],["Clip",[Yp]],["Concat",[Vm,Mm]],["Conv",[Ua,Ga]],["ConvTranspose",[ah,ih]],["Cos",[em]],["Cosh",[tm]],["CumSum",[uh,lh]],["DepthToSpace",[dh,fh]],["DequantizeLinear",[Tg,vg]],["Div",[Om]],["Einsum",[gh,bh]],["Elu",[rm,ln]],["Equal",[Em]],["Erf",[nm]],["Exp",[om]],["Expand",[wh]],["FastGelu",[Th]],["Floor",[im]],["FusedConv",[Ua,Ga]],["Gather",[Sh,Ih]],["GatherElements",[Ch,Eh]],["GatherBlockQuantized",[Ah,Ph]],["Gelu",[am]],["Gemm",[Bh,Dh]],["GlobalAveragePool",[hg,mg]],["GlobalMaxPool",[wg,xg]],["Greater",[Bm]],["GreaterOrEqual",[zm]],["GridSample",[zh,Rh]],["GroupQueryAttention",[Hh]],["HardSigmoid",[mm,pm]],["InstanceNormalization",[jh]],["LayerNormalization",[Zh]],["LeakyRelu",[sm,ln]],["Less",[Lm]],["LessOrEqual",[Rm]],["Log",[vm]],["MatMul",[Yh]],["MatMulNBits",[eg,tg]],["MaxPool",[bg,yg]],["Mul",[Cm]],["MultiHeadAttention",[Fh,Mh]],["Neg",[lm]],["Not",[um]],["Pad",[ng]],["Pow",[km]],["QuickGelu",[Im,ln]],["Range",[Sg]],["Reciprocal",[cm]],["ReduceMin",[Op]],["ReduceMean",[Ip]],["ReduceMax",[Pp]],["ReduceSum",[Cp]],["ReduceProd",[Ep]],["ReduceL1",[Sp]],["ReduceL2",[$p]],["ReduceLogSum",[Dp]],["ReduceLogSumExp",[Ap]],["ReduceSumSquare",[kp]],["Relu",[dm]],["Resize",[Pg,Og]],["RotaryEmbedding",[Cg]],["Sigmoid",[fm]],["Sin",[hm]],["Sinh",[gm]],["Slice",[zg,Rg]],["SkipLayerNormalization",[Dg]],["Split",[Gh,Uh]],["Sqrt",[bm]],["Softmax",[Vg,Mg]],["Sub",[Dm]],["Tan",[ym]],["Tanh",[wm]],["ThresholdedRelu",[Tm,ln]],["Tile",[Ug]],["Transpose",[dp,fp]],["Where",[Hg]]])});var Yo,Xg=S(()=>{"use strict";Ke();vt();ne();Yo=class{constructor(e){this.backend=e;this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,n){this.repo.set(e,n)}run(e,n,t,o,i){nt(e.programInfo.name);let s=this.backend.device,a=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let c of n)u.push({binding:u.length,resource:{buffer:c.buffer}});for(let c of t)u.push({binding:u.length,resource:{buffer:c.buffer}});i&&u.push({binding:u.length,resource:i});let l=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let c={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:o};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(c)}a.setPipeline(e.computePipeline),a.setBindGroup(0,l),a.dispatchWorkgroups(...o),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Je(e.programInfo.name)}dispose(){}build(e,n){nt(e.name);let t=this.backend.device,o=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"},{feature:"subgroups-f16",extension:"subgroups_f16"}].forEach(d=>{t.features.has(d.feature)&&o.push(`enable ${d.extension};`)});let s=lp(n,this.backend.device.limits),a=e.getShaderSource(s),u=`${o.join(`
`)}
${s.additionalImplementations}
${a}`,l=t.createShaderModule({code:u,label:e.name});ae("verbose",()=>`[WebGPU] ${e.name} shader code: ${u}`);let c=t.createComputePipeline({compute:{module:l,entryPoint:"main"},layout:"auto",label:e.name});return Je(e.name),{programInfo:e,computePipeline:c,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(e){let n=typeof e=="number"?e:e.x,t=typeof e=="number"?1:e.y||1,o=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(n<=i&&t<=i&&o<=i)return[n,t,o];let s=n*t*o,a=Math.ceil(Math.sqrt(s));if(a>i){if(a=Math.ceil(Math.cbrt(s)),a>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[a,a,a]}else return[a,a,1]}}});var m0,h0,Ja,Ya,Qo,Zg=S(()=>{"use strict";Ke();X();vt();va();ap();jg();Xg();m0=(r,e)=>{if(e.length!==r.length)throw new Error(`inputDependencies length ${e.length} is not equal to inputTensors length ${r.length}.`);let n=[];for(let t=0;t<r.length;++t){let o=r[t].dataType;switch(e[t]){case"none":{n.push("");break}case"type":{n.push(`${o}`);break}case"rank":{let i=r[t].dims.length;n.push(`${o};${i}`);break}case"dims":{let i=r[t].dims.join(",");n.push(`${o};${i}`);break}default:throw new Error(`unsupported input dependency: ${e[t]}`)}}return n.join("|")},h0=(r,e,n)=>{let t=r.name;return r.shaderCache?.hint&&(t+="["+r.shaderCache.hint+"]"),t+=":"+n+`:${m0(e,r.shaderCache?.inputDependencies??new Array(e.length).fill("dims"))}`,t},Ja=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Ya=class{constructor(e){this.subgroupsSupported=e.features.has("subgroups"),this.subgroupsF16Supported=e.features.has("subgroups");let n=e.limits;!this.subgroupsSupported||!n.minSubgroupSize||!n.maxSubgroupSize?this.subgroupSizeRange=void 0:this.subgroupSizeRange=[n.minSubgroupSize,n.maxSubgroupSize]}},Qo=class{constructor(){this.currentSessionId=null;this.currentKernelId=null;this.commandEncoder=null;this.computePassEncoder=null;this.maxDispatchNumber=16;this.pendingDispatchNumber=0;this.pendingKernels=[];this.pendingQueries=new Map;this.sessionStatus="default";this.capturedCommandList=new Map;this.capturedPendingKernels=new Map;this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,n){this.env=e;let t=[],o={requiredLimits:{maxComputeWorkgroupStorageSize:n.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:n.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:n.limits.maxStorageBufferBindingSize,maxBufferSize:n.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:n.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:n.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:n.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:n.limits.maxComputeWorkgroupSizeZ},requiredFeatures:t},i=s=>n.features.has(s)&&t.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups")&&i("subgroups-f16"),this.device=await n.requestDevice(o),this.deviceInfo=new Ya(this.device),this.adapterInfo=new Ja(n.info||await n.requestAdapterInfo()),this.gpuDataManager=ip(this),this.programManager=new Yo(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Do(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:n,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),n={};this.queryType==="at-passes"&&(n.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(n)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;nt(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let n=new BigUint64Array(e.getMappedRange()),t=this.pendingQueries.get(e);for(let o=0;o<n.length/2;o++){let i=t[o],s=i.kernelId,a=this.kernels.get(s),u=a.kernelType,l=a.kernelName,c=i.programName,d=i.inputTensorViews,f=i.outputTensorViews,m=n[o*2],p=n[o*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let h=Number(m-this.queryTimeBase),b=Number(p-this.queryTimeBase);if(!Number.isSafeInteger(h)||!Number.isSafeInteger(b))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(y=>({dims:y.dims,dataType:Jt(y.dataType)})),outputsMetadata:f.map(y=>({dims:y.dims,dataType:Jt(y.dataType)})),kernelId:s,kernelType:u,kernelName:l,programName:c,startTime:h,endTime:b});else{let y="";d.forEach((x,_)=>{y+=`input[${_}]: [${x.dims}] | ${Jt(x.dataType)}, `});let g="";f.forEach((x,_)=>{g+=`output[${_}]: [${x.dims}] | ${Jt(x.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${l}|${c}" ${y}${g}execution time: ${b-h} ns`)}$n("GPU",`${c}::${m}::${p}`)}e.unmap(),this.pendingQueries.delete(e)}),Je()}run(e,n,t,o,i,s){nt(e.name);let a=[];for(let x=0;x<n.length;++x){let _=n[x].data;if(_===0)continue;let v=this.gpuDataManager.get(_);if(!v)throw new Error(`no GPU data for input: ${_}`);a.push(v)}let{outputs:u,dispatchGroup:l,programUniforms:c}=e.getRunData(n),d=t.length===0?u.map((x,_)=>_):t;if(d.length!==u.length)throw new Error(`Output size ${d.length} must be equal to ${u.length}.`);let f=[],m=[];for(let x=0;x<u.length;++x){if(!Number.isInteger(d[x])||d[x]<-3||d[x]>=s)throw new Error(`Invalid output index: ${d[x]}`);if(d[x]===-3)continue;let _=d[x]===-1,v=d[x]===-2,I=_||v?i(u[x].dataType,u[x].dims):o(d[x],u[x].dataType,u[x].dims);if(f.push(I),I.data===0)continue;let O=this.gpuDataManager.get(I.data);if(!O)throw new Error(`no GPU data for output: ${I.data}`);if(_&&this.temporaryData.push(O),v){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(O)}m.push(O)}if(a.length!==n.length||m.length!==f.length){if(m.length===0)return Je(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let p;if(c){let x=0,_=[];c.forEach(E=>{let k=typeof E.data=="number"?[E.data]:E.data;if(k.length===0)return;let N=E.type===10?2:4,C,ee;E.type===10?(ee=k.length>4?16:k.length>2?8:k.length*N,C=k.length>4?16:N*k.length):(ee=k.length<=2?k.length*N:16,C=16),x=Math.ceil(x/ee)*ee,_.push(x);let V=E.type===10?8:4;x+=k.length>4?Math.ceil(k.length/V)*C:k.length*N});let v=16;x=Math.ceil(x/v)*v;let I=new ArrayBuffer(x);c.forEach((E,k)=>{let N=_[k],C=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(I,N,C.length).set(C);else if(E.type===12)new Uint32Array(I,N,C.length).set(C);else if(E.type===10)new Uint16Array(I,N,C.length).set(C);else if(E.type===1)new Float32Array(I,N,C.length).set(C);else throw new Error(`Unsupported uniform type: ${Jt(E.type)}`)});let O=this.gpuDataManager.create(x,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(O.buffer,0,I,0,x),this.gpuDataManager.release(O.id),p={offset:0,size:x,buffer:O.buffer}}let h=this.programManager.normalizeDispatchGroupSize(l),b=h[1]===1&&h[2]===1,y=h0(e,n,b),g=this.programManager.getArtifact(y);if(g||(g=this.programManager.build(e,h),this.programManager.setArtifact(y,g),ae("info",()=>`[artifact] key: ${y}, programName: ${e.name}`)),c&&g.uniformVariablesInfo){if(c.length!==g.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${g.uniformVariablesInfo.length}, got ${c.length} in program "${g.programInfo.name}".`);for(let x=0;x<c.length;x++){let _=c[x],v=_.type,I=typeof _.data=="number"?1:_.data.length,[O,E]=g.uniformVariablesInfo[x];if(v!==O||I!==E)throw new Error(`Uniform variable ${x} mismatch: expect type ${O} with size ${E}, got type ${v} with size ${I} in program "${g.programInfo.name}".`)}}if(ae("info",()=>`[ProgramManager] run "${e.name}" (key=${y}) with ${h[0]}x${h[1]}x${h[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let x={kernelId:this.currentKernelId,programName:g.programInfo.name,inputTensorViews:n,outputTensorViews:f};this.pendingKernels.push(x),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(x)}return this.programManager.run(g,a,m,h,p),Je(e.name),f}upload(e,n){this.gpuDataManager.upload(e,n)}memcpy(e,n){this.gpuDataManager.memcpy(e,n)}async download(e,n){await this.gpuDataManager.download(e,n)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,n,t,o){let i=Kg.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:o,kernelEntry:i[0],attributes:[i[1],t]};this.kernels.set(n,s)}releaseKernel(e){let n=this.kernelPersistentData.get(e);if(n){for(let t of n)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,n,t){let o=this.kernels.get(e);if(!o)throw new Error(`kernel not created: ${e}`);let i=o.kernelType,s=o.kernelName,a=o.kernelEntry,u=o.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ae("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),a(n,u[1]),0}catch(c){return t.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${c}`)),1}finally{l&&t.push(this.device.popErrorScope().then(c=>c?`GPU validation error for kernel "[${i}] ${s}": ${c.message}`:null));for(let c of this.temporaryData)this.gpuDataManager.release(c.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,n,t,o){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(n),a=this.gpuDataManager.registerExternalBuffer(t,o,s);return i.set(n,[a,t]),a}unregisterBuffers(e){let n=this.sessionExternalDataMapping.get(e);n&&(n.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let n=this.gpuDataManager.get(e);if(!n)throw new Error(`no GPU data for buffer: ${e}`);return n.buffer}createDownloader(e,n,t){return async()=>{let o=await Aa(this,e,n);return Bo(o.buffer,t)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ae("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ae("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ae("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),n=this.capturedPendingKernels.get(this.currentSessionId),t=e.length;this.pendingKernels=[];for(let o=0;o<t;o++){let i=this.getComputePassEncoder(),s=e[o];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(n[o]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}});var g0,Jg,b0,Yg,ei,ti,Qa,Qg,eb=S(()=>{"use strict";vt();g0=1,Jg=()=>g0++,b0=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Yg=(r,e)=>{let n=b0.get(r);if(!n)throw new Error("Unsupported data type.");return Math.ceil(e.reduce((t,o)=>t*o)*n/8)},ei=class{constructor(e){this.sessionId=e.sessionId,this.mlContext=e.context,this.mlTensor=e.tensor,this.dataType=e.dataType,this.tensorShape=e.shape}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return Yg(this.dataType,this.tensorShape)}destroy(){ae("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}sameTypeAndShape(e,n){return this.dataType===e&&this.tensorShape.length===n.length&&this.tensorShape.every((t,o)=>t===n[o])}},ti=class{constructor(e,n){this.tensorManager=e;this.wrapper=n}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,n,t){if(this.wrapper){if(this.wrapper.sameTypeAndShape(e,n))return this.wrapper.tensor;if(t){if(this.wrapper.byteLength!==Yg(e,n))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,n,o,!0,!0),t&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){if(this.wrapper)if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(e);return}else ae("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(e):this.activeUpload=new Uint8Array(e)}async download(e){if(this.activeUpload)if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(this.activeUpload):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(this.activeUpload);return}else return this.activeUpload.buffer;if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Qa=class{constructor(e){this.backend=e;this.tensorTrackersById=new Map;this.freeTensors=[];this.externalTensors=new Set}reserveTensorId(){let e=Jg();return this.tensorTrackersById.set(e,new ti(this)),e}releaseTensorId(e){let n=this.tensorTrackersById.get(e);n&&(this.tensorTrackersById.delete(e),n.tensorWrapper&&this.releaseTensor(n.tensorWrapper))}async ensureTensor(e,n,t,o){ae("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${e}, dataType: ${n}, shape: ${t}, copyOld: ${o}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.ensureTensor(n,t,o)}upload(e,n){let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");t.upload(n)}async download(e,n){ae("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${n?.byteLength}}`);let t=this.tensorTrackersById.get(e);if(!t)throw new Error("Tensor not found.");return t.download(n)}releaseTensorsForSession(e){for(let n of this.freeTensors)n.sessionId===e&&n.destroy();this.freeTensors=this.freeTensors.filter(n=>n.sessionId!==e)}registerTensor(e,n,t,o){let i=Jg(),s=new ei({sessionId:this.backend.currentSessionId,context:e,tensor:n,dataType:t,shape:o});return this.tensorTrackersById.set(i,new ti(this,s)),this.externalTensors.add(s),i}async getCachedTensor(e,n,t,o,i){let s=this.backend.currentSessionId;for(let[l,c]of this.freeTensors.entries())if(c.sameTypeAndShape(e,n)){ae("verbose",()=>`[WebNN] Reusing tensor {dataType: ${e}, shape: ${n}}`);let d=this.freeTensors.splice(l,1)[0];return d.sessionId=s,d}let a=this.backend.currentContext;ae("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${e}, shape: ${n}}`);let u=await a.createTensor({dataType:e,shape:n,dimensions:n,usage:t,writable:o,readable:i});return new ei({sessionId:s,context:a,tensor:u,dataType:e,shape:n})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Qg=(...r)=>new Qa(...r)});var tb,y0,ri,rb=S(()=>{"use strict";X();Zt();va();eb();vt();tb=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),y0=(r,e)=>{if(r===e)return!0;if(r===void 0||e===void 0)return!1;let n=Object.keys(r).sort(),t=Object.keys(e).sort();return n.length===t.length&&n.every((o,i)=>o===t[i]&&r[o]===e[o])},ri=class{constructor(e){this.tensorManager=Qg(this);this.mlContextBySessionId=new Map;this.sessionIdsByMLContext=new Map;this.mlContextCache=[];Do(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){this.activeSessionId=e}async createMLContext(e){if(e instanceof GPUDevice){let t=this.mlContextCache.findIndex(o=>o.gpuDevice===e);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:o}),o}}else if(e===void 0){let t=this.mlContextCache.findIndex(o=>o.options===void 0&&o.gpuDevice===void 0);if(t!==-1)return this.mlContextCache[t].mlContext;{let o=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:o}),o}}let n=this.mlContextCache.findIndex(t=>y0(t.options,e));if(n!==-1)return this.mlContextCache[n].mlContext;{let t=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:t}),t}}get currentContext(){let e=this.getMLContext(this.currentSessionId);if(!e)throw new Error(`No MLContext found for session ${this.currentSessionId}`);return e}registerMLContext(e,n){this.mlContextBySessionId.set(e,n);let t=this.sessionIdsByMLContext.get(n);t||(t=new Set,this.sessionIdsByMLContext.set(n,t)),t.add(e)}onReleaseSession(e){let n=this.mlContextBySessionId.get(e);if(!n)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let t=this.sessionIdsByMLContext.get(n);if(t.delete(e),t.size===0){this.sessionIdsByMLContext.delete(n);let o=this.mlContextCache.findIndex(i=>i.mlContext===n);o!==-1&&this.mlContextCache.splice(o,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ae("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,n,t,o){let i=tb.get(n);if(!i)throw new Error(`Unsupported ONNX data type: ${n}`);return this.tensorManager.ensureTensor(e,i,t,o)}uploadTensor(e,n){if(!Ae().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ae("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${n.byteLength}}`),this.tensorManager.upload(e,n)}async downloadTensor(e,n){return this.tensorManager.download(e,n)}createMLTensorDownloader(e,n){return async()=>{let t=await this.tensorManager.download(e);return Bo(t,n)}}registerMLTensor(e,n,t){let o=tb.get(n);if(!o)throw new Error(`Unsupported ONNX data type: ${n}`);let i=this.tensorManager.registerTensor(this.currentContext,e,o,t);return ae("verbose",()=>`[WebNN] registerMLTensor {tensor: ${e}, dataType: ${o}, dimensions: ${t}} -> {tensorId: ${i}}`),i}registerMLConstant(e,n,t,o,i,s){if(!s)throw new Error("External mounted files are not available.");let a=e;e.startsWith("./")&&(a=e.substring(2));let u=s.get(a);if(!u)throw new Error(`File with name ${a} not found in preloaded files.`);if(n+t>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let l=u.slice(n,n+t).buffer,c;switch(i.dataType){case"float32":c=new Float32Array(l);break;case"float16":c=new Uint16Array(l);break;case"int32":c=new Int32Array(l);break;case"uint32":c=new Uint32Array(l);break;case"int64":c=new BigInt64Array(l);break;case"uint64":c=new BigUint64Array(l);break;case"int8":c=new Int8Array(l);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(l);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return ae("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}}`),o.constant(i,c)}flush(){}}});var nb={};Vr(nb,{init:()=>x0});var bn,es,x0,ob=S(()=>{"use strict";X();Zg();vt();te();rb();bn=class r{constructor(e,n,t,o){this.module=e;this.dataType=n;this.data=t;this.dims=o}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,e)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,e)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,e)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let e=$.size(this.dims);return e===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,e)}reshape(e){if($.size(e)!==$.size(this.dims))throw new Error("Invalid new shape");return new r(this.module,this.dataType,this.data,e)}},es=class{constructor(e,n,t){this.module=e;this.backend=n;this.customDataOffset=0;this.customDataSize=0;this.adapterInfo=n.adapterInfo,this.deviceInfo=n.deviceInfo;let o=e.PTR_SIZE,i=t/e.PTR_SIZE,s=o===4?"i32":"i64";this.opKernelContext=Number(e.getValue(o*i++,s));let a=Number(e.getValue(o*i++,s));this.outputCount=Number(e.getValue(o*i++,s)),this.customDataOffset=Number(e.getValue(o*i++,"*")),this.customDataSize=Number(e.getValue(o*i++,s));let u=[];for(let l=0;l<a;l++){let c=Number(e.getValue(o*i++,s)),d=Number(e.getValue(o*i++,"*")),f=Number(e.getValue(o*i++,s)),m=[];for(let p=0;p<f;p++)m.push(Number(e.getValue(o*i++,s)));u.push(new bn(e,c,d,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,n){let t=n?.inputs?.map(a=>typeof a=="number"?this.inputs[a]:a)??this.inputs,o=n?.outputs??[],i=(a,u,l)=>new bn(this.module,u,this.output(a,l),l),s=(a,u)=>{let l=hr(a,u);if(!l)throw new Error(`Unsupported data type: ${a}`);let c=l>0?this.backend.gpuDataManager.create(l).id:0;return new bn(this.module,a,c,u)};return this.backend.run(e,t,o,i,s,this.outputCount)}output(e,n){let t=this.module.stackSave();try{let o=this.module.PTR_SIZE,i=o===4?"i32":"i64",s=this.module.stackAlloc((1+n.length)*o);this.module.setValue(s,n.length,i);for(let a=0;a<n.length;a++)this.module.setValue(s+o*(a+1),n[a],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(o){throw new Error(`Failed to generate kernel's output[${e}] with dims [${n}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${o}`)}finally{this.module.stackRestore(t)}}},x0=async(r,e,n,t)=>{let o=e.jsepInit;if(!o)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(r==="webgpu"){let i=new Qo;await i.initialize(n,t),o("webgpu",[i,s=>i.alloc(Number(s)),s=>i.free(s),(s,a,u,l=!1)=>{if(l)ae("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(s)}, dst=${Number(a)}, size=${Number(u)}`),i.memcpy(Number(s),Number(a));else{ae("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(s)}, gpuDataId=${Number(a)}, size=${Number(u)}`);let c=e.HEAPU8.subarray(Number(s>>>0),Number(s>>>0)+Number(u));i.upload(Number(a),c)}},async(s,a,u)=>{ae("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${s}, dataOffset=${a}, size=${u}`),await i.download(Number(s),()=>e.HEAPU8.subarray(Number(a)>>>0,Number(a+u)>>>0))},(s,a,u)=>i.createKernel(s,Number(a),u,e.UTF8ToString(e._JsepGetNodeName(Number(a)))),s=>i.releaseKernel(s),(s,a,u,l)=>{ae("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${u}, kernel=${s}, contextDataOffset=${a}`);let c=new es(e,i,Number(a));return i.computeKernel(Number(s),c,l)},()=>i.captureBegin(),()=>i.captureEnd(),()=>i.replay()])}else{let i=new ri(n);o("webnn",[i,()=>i.reserveTensorId(),s=>i.releaseTensorId(s),async(s,a,u,l)=>i.ensureTensor(s,a,u,l),(s,a)=>{i.uploadTensor(s,a)},async(s,a)=>i.downloadTensor(s,a)])}}});var w0,_o,To,xr,_0,nn,vo,Io,ib,So,$o,Ao,ya=S(()=>{"use strict";Jf();Qf();X();Zt();Oo();Ta();w0=(r,e)=>{Ae()._OrtInit(r,e)!==0&&ce("Can't initialize onnxruntime.")},_o=async r=>{w0(r.wasm.numThreads,sn(r.logLevel))},To=async(r,e)=>{{let n=(ob(),wn(nb)).init;if(e==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let t=r.webgpu.adapter;if(t){if(typeof t.limits!="object"||typeof t.features!="object"||typeof t.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let o=r.webgpu.powerPreference;if(o!==void 0&&o!=="low-power"&&o!=="high-performance")throw new Error(`Invalid powerPreference setting: "${o}"`);let i=r.webgpu.forceFallbackAdapter;if(i!==void 0&&typeof i!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${i}"`);if(t=await navigator.gpu.requestAdapter({powerPreference:o,forceFallbackAdapter:i}),!t)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await n("webgpu",Ae(),r,t)}if(e==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await n("webnn",Ae(),r)}}},xr=new Map,_0=r=>{let e=Ae(),n=e.stackSave();try{let t=e.PTR_SIZE,o=e.stackAlloc(2*t);e._OrtGetInputOutputCount(r,o,o+t)!==0&&ce("Can't get session input/output count.");let s=t===4?"i32":"i64";return[Number(e.getValue(o,s)),Number(e.getValue(o+t,s))]}finally{e.stackRestore(n)}},nn=r=>{let e=Ae(),n=e._malloc(r.byteLength);if(n===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${r.byteLength}.`);return e.HEAPU8.set(r,n),[n,r.byteLength]},vo=async(r,e)=>{let n,t,o=Ae();Array.isArray(r)?[n,t]=r:r.buffer===o.HEAPU8.buffer?[n,t]=[r.byteOffset,r.byteLength]:[n,t]=nn(r);let i=0,s=0,a=0,u=[],l=[],c=[];try{if([s,u]=Yf(e),e?.externalData&&o.mountExternalData){let g=[];for(let x of e.externalData){let _=typeof x=="string"?x:x.path;g.push(un(typeof x=="string"?x:x.data).then(v=>{o.mountExternalData(_,v)}))}await Promise.all(g)}for(let g of e?.executionProviders??[])if((typeof g=="string"?g:g.name)==="webnn"){if(o.shouldTransferToMLTensor=!1,o.currentContext)throw new Error("WebNN execution provider is already set.");if(typeof g!="string"){let _=g,v=_?.context,I=_?.gpuDevice,O=_?.deviceType,E=_?.powerPreference;v?o.currentContext=v:I?o.currentContext=await o.jsepCreateMLContext(I):o.currentContext=await o.jsepCreateMLContext({deviceType:O,powerPreference:E})}else o.currentContext=await o.jsepCreateMLContext();break}i=await o._OrtCreateSession(n,t,s),i===0&&ce("Can't create a session."),o.jsepOnCreateSession?.(),o.currentContext&&(o.jsepRegisterMLContext(i,o.currentContext),o.currentContext=void 0,o.shouldTransferToMLTensor=!0);let[d,f]=_0(i),m=!!e?.enableGraphCapture,p=[],h=[],b=[];for(let g=0;g<d;g++){let x=o._OrtGetInputName(i,g);x===0&&ce("Can't get an input name."),l.push(x),p.push(o.UTF8ToString(x))}for(let g=0;g<f;g++){let x=o._OrtGetOutputName(i,g);x===0&&ce("Can't get an output name."),c.push(x);let _=o.UTF8ToString(x);h.push(_);{if(m&&e?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let v=typeof e?.preferredOutputLocation=="string"?e.preferredOutputLocation:e?.preferredOutputLocation?.[_]??"cpu";if(v!=="cpu"&&v!=="cpu-pinned"&&v!=="gpu-buffer"&&v!=="ml-tensor")throw new Error(`Not supported preferred output location: ${v}.`);if(m&&v!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${v}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(v)}}let y=null;return b.some(g=>g==="gpu-buffer"||g==="ml-tensor")&&(a=o._OrtCreateBinding(i),a===0&&ce("Can't create IO binding."),y={handle:a,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(g=>_a(g))}),xr.set(i,[i,l,c,y,m,!1]),[i,p,h]}catch(d){throw l.forEach(f=>o._OrtFree(f)),c.forEach(f=>o._OrtFree(f)),a!==0&&o._OrtReleaseBinding(a)!==0&&ce("Can't release IO binding."),i!==0&&o._OrtReleaseSession(i)!==0&&ce("Can't release session."),d}finally{o._free(n),s!==0&&o._OrtReleaseSessionOptions(s)!==0&&ce("Can't release session options."),u.forEach(d=>o._free(d)),o.unmountExternalData?.()}},Io=r=>{let e=Ae(),n=xr.get(r);if(!n)throw new Error(`cannot release session. invalid session id: ${r}`);let[t,o,i,s,a]=n;s&&(a&&e._OrtClearBoundOutputs(s.handle)!==0&&ce("Can't clear bound outputs."),e._OrtReleaseBinding(s.handle)!==0&&ce("Can't release IO binding.")),e.jsepOnReleaseSession?.(r),o.forEach(u=>e._OrtFree(u)),i.forEach(u=>e._OrtFree(u)),e._OrtReleaseSession(t)!==0&&ce("Can't release session."),xr.delete(r)},ib=(r,e,n,t,o,i=!1)=>{if(!r){e.push(0);return}let s=Ae(),a=s.PTR_SIZE,u=r[0],l=r[1],c=r[3],d,f;if(u==="string"&&(c==="gpu-buffer"||c==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(i&&c!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${o} when enableGraphCapture is true.`);if(c==="gpu-buffer"){let h=r[2].gpuBuffer;f=hr(an(u),l);let b=s.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');d=b(t,o,h,f)}else if(c==="ml-tensor"){let h=r[2].mlTensor;f=hr(an(u),l);let b=s.jsepRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');d=b(h,an(u),l)}else{let h=r[2];if(Array.isArray(h)){f=a*h.length,d=s._malloc(f),n.push(d);for(let b=0;b<h.length;b++){if(typeof h[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);s.setValue(d+b*a,Ne(h[b],n),"*")}}else f=h.byteLength,d=s._malloc(f),n.push(d),s.HEAPU8.set(new Uint8Array(h.buffer,h.byteOffset,f),d)}let m=s.stackSave(),p=s.stackAlloc(4*l.length);try{l.forEach((b,y)=>s.setValue(p+y*a,b,a===4?"i32":"i64"));let h=s._OrtCreateTensor(an(u),d,f,p,l.length,_a(c));h===0&&ce(`Can't create tensor for input/output. session=${t}, index=${o}.`),e.push(h)}finally{s.stackRestore(m)}},So=async(r,e,n,t,o,i)=>{let s=Ae(),a=s.PTR_SIZE,u=xr.get(r);if(!u)throw new Error(`cannot run inference. invalid session id: ${r}`);let l=u[0],c=u[1],d=u[2],f=u[3],m=u[4],p=u[5],h=e.length,b=t.length,y=0,g=[],x=[],_=[],v=[],I=s.stackSave(),O=s.stackAlloc(h*a),E=s.stackAlloc(h*a),k=s.stackAlloc(b*a),N=s.stackAlloc(b*a);try{s.jsepOnRunStart?.(l),[y,g]=Zf(i);for(let V=0;V<h;V++)ib(n[V],x,v,r,e[V],m);for(let V=0;V<b;V++)ib(o[V],_,v,r,h+t[V],m);for(let V=0;V<h;V++)s.setValue(O+V*a,x[V],"*"),s.setValue(E+V*a,c[e[V]],"*");for(let V=0;V<b;V++)s.setValue(k+V*a,_[V],"*"),s.setValue(N+V*a,d[t[V]],"*");if(f&&!p){let{handle:V,outputPreferredLocations:J,outputPreferredLocationsEncoded:Se}=f;if(c.length!==h)throw new Error(`input count from feeds (${h}) is expected to be always equal to model's input count (${c.length}).`);for(let K=0;K<h;K++){let Y=e[K];await s._OrtBindInput(V,c[Y],x[K])!==0&&ce(`Can't bind input[${K}] for session=${r}.`)}for(let K=0;K<b;K++){let Y=t[K];o[K]?.[3]?s._OrtBindOutput(V,d[Y],_[K],0)!==0&&ce(`Can't bind pre-allocated output[${K}] for session=${r}.`):s._OrtBindOutput(V,d[Y],0,Se[Y])!==0&&ce(`Can't bind output[${K}] to ${J[K]} for session=${r}.`)}xr.set(r,[l,c,d,f,m,!0])}let C;f?C=await s._OrtRunWithBinding(l,f.handle,b,k,y):C=await s._OrtRun(l,E,O,h,N,b,k,y),C!==0&&ce("failed to call OrtRun().");let ee=[];for(let V=0;V<b;V++){let J=Number(s.getValue(k+V*a,"*"));if(J===_[V]){ee.push(o[V]);continue}let Se=s.stackSave(),K=s.stackAlloc(4*a),Y=!1,oe,Q=0;try{s._OrtGetTensorData(J,K,K+a,K+2*a,K+3*a)!==0&&ce(`Can't access output tensor data on index ${V}.`);let qe=a===4?"i32":"i64",Ee=Number(s.getValue(K,qe));Q=s.getValue(K+a,"*");let de=s.getValue(K+a*2,"*"),z=Number(s.getValue(K+a*3,qe)),U=[];for(let Oe=0;Oe<z;Oe++)U.push(Number(s.getValue(de+Oe*a,qe)));s._OrtFree(de)!==0&&ce("Can't free memory for tensor dims.");let we=U.reduce((Oe,ze)=>Oe*ze,1);oe=Jt(Ee);let Gt=f?.outputPreferredLocations[t[V]];if(oe==="string"){if(Gt==="gpu-buffer"||Gt==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let Oe=[];for(let ze=0;ze<we;ze++){let Qt=s.getValue(Q+ze*a,"*"),yb=s.getValue(Q+(ze+1)*a,"*"),xb=ze===we-1?void 0:yb-Qt;Oe.push(s.UTF8ToString(Qt,xb))}ee.push([oe,U,Oe,"cpu"])}else if(Gt==="gpu-buffer"&&we>0){let Oe=s.jsepGetBuffer;if(!Oe)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ze=Oe(Q),Qt=hr(Ee,we);if(Qt===void 0||!Co(oe))throw new Error(`Unsupported data type: ${oe}`);Y=!0,ee.push([oe,U,{gpuBuffer:ze,download:s.jsepCreateDownloader(ze,Qt,oe),dispose:()=>{s._OrtReleaseTensor(J)!==0&&ce("Can't release tensor.")}},"gpu-buffer"])}else if(Gt==="ml-tensor"&&we>0){let Oe=s.jsepEnsureTensor;if(!Oe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(hr(Ee,we)===void 0||!ko(oe))throw new Error(`Unsupported data type: ${oe}`);let Qt=await Oe(Q,Ee,U,!1);Y=!0,ee.push([oe,U,{mlTensor:Qt,download:s.jsepCreateMLTensorDownloader(Q,oe),dispose:()=>{s.jsepReleaseTensorId(Q),s._OrtReleaseTensor(J)}},"ml-tensor"])}else{let Oe=Eo(oe),ze=new Oe(we);new Uint8Array(ze.buffer,ze.byteOffset,ze.byteLength).set(s.HEAPU8.subarray(Q,Q+ze.byteLength)),ee.push([oe,U,ze,"cpu"])}}finally{s.stackRestore(Se),oe==="string"&&Q&&s._free(Q),Y||s._OrtReleaseTensor(J)}}return f&&!m&&(s._OrtClearBoundOutputs(f.handle)!==0&&ce("Can't clear bound outputs."),xr.set(r,[l,c,d,f,m,!1])),ee}finally{s.stackRestore(I),x.forEach(C=>s._OrtReleaseTensor(C)),_.forEach(C=>s._OrtReleaseTensor(C)),v.forEach(C=>s._free(C)),y!==0&&s._OrtReleaseRunOptions(y),g.forEach(C=>s._free(C))}},$o=r=>{let e=Ae(),n=xr.get(r);if(!n)throw new Error("invalid session id");let t=n[0],o=e._OrtEndProfiling(t);o===0&&ce("Can't get an profile file name."),e._OrtFree(o)},Ao=r=>{let e=[];for(let n of r){let t=n[2];!Array.isArray(t)&&"buffer"in t&&e.push(t.buffer)}return e}});var wr,gt,yn,oi,ii,ni,ts,rs,Rr,Nr,v0,ab,sb,ub,lb,cb,db,fb,ns=S(()=>{"use strict";Ke();ya();Zt();rn();wr=()=>!!j.wasm.proxy&&typeof document<"u",yn=!1,oi=!1,ii=!1,rs=new Map,Rr=(r,e)=>{let n=rs.get(r);n?n.push(e):rs.set(r,[e])},Nr=()=>{if(yn||!oi||ii||!gt)throw new Error("worker not ready")},v0=r=>{switch(r.data.type){case"init-wasm":yn=!1,r.data.err?(ii=!0,ts[1](r.data.err)):(oi=!0,ts[0]()),ni&&(URL.revokeObjectURL(ni),ni=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let e=rs.get(r.data.type);r.data.err?e.shift()[1](r.data.err):e.shift()[0](r.data.out);break}default:}},ab=async()=>{if(!oi){if(yn)throw new Error("multiple calls to 'initWasm()' detected.");if(ii)throw new Error("previous call to 'initWasm()' failed.");if(yn=!0,wr())return new Promise((r,e)=>{gt?.terminate(),Kf().then(([n,t])=>{try{gt=t,gt.onerror=i=>e(i),gt.onmessage=v0,ts=[r,e];let o={type:"init-wasm",in:j};gt.postMessage(o),ni=n}catch(o){e(o)}},e)});try{await wo(j.wasm),await _o(j),oi=!0}catch(r){throw ii=!0,r}finally{yn=!1}}},sb=async r=>{if(wr())return Nr(),new Promise((e,n)=>{Rr("init-ep",[e,n]);let t={type:"init-ep",in:{epName:r,env:j}};gt.postMessage(t)});await To(j,r)},ub=async r=>wr()?(Nr(),new Promise((e,n)=>{Rr("copy-from",[e,n]);let t={type:"copy-from",in:{buffer:r}};gt.postMessage(t,[r.buffer])})):nn(r),lb=async(r,e)=>{if(wr()){if(e?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Nr(),new Promise((n,t)=>{Rr("create",[n,t]);let o={type:"create",in:{model:r,options:{...e}}},i=[];r instanceof Uint8Array&&i.push(r.buffer),gt.postMessage(o,i)})}else return vo(r,e)},cb=async r=>{if(wr())return Nr(),new Promise((e,n)=>{Rr("release",[e,n]);let t={type:"release",in:r};gt.postMessage(t)});Io(r)},db=async(r,e,n,t,o,i)=>{if(wr()){if(n.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(o.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Nr(),new Promise((s,a)=>{Rr("run",[s,a]);let u=n,l={type:"run",in:{sessionId:r,inputIndices:e,inputs:u,outputIndices:t,options:i}};gt.postMessage(l,Ao(u))})}else return So(r,e,n,t,o,i)},fb=async r=>{if(wr())return Nr(),new Promise((e,n)=>{Rr("end-profiling",[e,n]);let t={type:"end-profiling",in:r};gt.postMessage(t)});$o(r)}});var pb,I0,ai,mb=S(()=>{"use strict";Ke();ns();X();xo();Ta();pb=(r,e)=>{switch(r.location){case"cpu":return[r.type,r.dims,r.data,"cpu"];case"gpu-buffer":return[r.type,r.dims,{gpuBuffer:r.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[r.type,r.dims,{mlTensor:r.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${r.location} for ${e()}`)}},I0=r=>{switch(r[3]){case"cpu":return new Re(r[0],r[2],r[1]);case"gpu-buffer":{let e=r[0];if(!Co(e))throw new Error(`not supported data type: ${e} for deserializing GPU tensor`);let{gpuBuffer:n,download:t,dispose:o}=r[2];return Re.fromGpuBuffer(n,{dataType:e,dims:r[1],download:t,dispose:o})}case"ml-tensor":{let e=r[0];if(!ko(e))throw new Error(`not supported data type: ${e} for deserializing MLTensor tensor`);let{mlTensor:n,download:t,dispose:o}=r[2];return Re.fromMLTensor(n,{dataType:e,dims:r[1],download:t,dispose:o})}default:throw new Error(`invalid data location: ${r[3]}`)}},ai=class{async fetchModelAndCopyToWasmMemory(e){return ub(await un(e))}async loadModel(e,n){nt();let t;typeof e=="string"?!1?t=await un(e):t=await this.fetchModelAndCopyToWasmMemory(e):t=e,[this.sessionId,this.inputNames,this.outputNames]=await lb(t,n),Je()}async dispose(){return cb(this.sessionId)}async run(e,n,t){nt();let o=[],i=[];Object.entries(e).forEach(f=>{let m=f[0],p=f[1],h=this.inputNames.indexOf(m);if(h===-1)throw new Error(`invalid input '${m}'`);o.push(p),i.push(h)});let s=[],a=[];Object.entries(n).forEach(f=>{let m=f[0],p=f[1],h=this.outputNames.indexOf(m);if(h===-1)throw new Error(`invalid output '${m}'`);s.push(p),a.push(h)});let u=o.map((f,m)=>pb(f,()=>`input "${this.inputNames[i[m]]}"`)),l=s.map((f,m)=>f?pb(f,()=>`output "${this.outputNames[a[m]]}"`):null),c=await db(this.sessionId,i,u,a,l,t),d={};for(let f=0;f<c.length;f++)d[this.outputNames[a[f]]]=s[f]??I0(c[f]);return Je(),d}startProfiling(){}endProfiling(){fb(this.sessionId)}}});var gb={};Vr(gb,{OnnxruntimeWebAssemblyBackend:()=>si,initializeFlags:()=>hb,wasmBackend:()=>S0});var hb,si,S0,bb=S(()=>{"use strict";Ke();ns();mb();rn();hb=()=>{if((typeof j.wasm.initTimeout!="number"||j.wasm.initTimeout<0)&&(j.wasm.initTimeout=0),j.wasm.simd===!1&&console.warn('Deprecated property "env.wasm.simd" is set to false. non-SIMD build is no longer provided, and this setting will be ignored.'),typeof j.wasm.relaxedSimd!="boolean"&&(j.wasm.relaxedSimd=!1),typeof j.wasm.proxy!="boolean"&&(j.wasm.proxy=!1),typeof j.wasm.trace!="boolean"&&(j.wasm.trace=!1),typeof j.wasm.numThreads!="number"||!Number.isInteger(j.wasm.numThreads)||j.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)j.wasm.numThreads=1;else{let r=typeof navigator>"u"?ui("node:os").cpus().length:navigator.hardwareConcurrency;j.wasm.numThreads=Math.min(4,Math.ceil((r||1)/2))}j.wasm.wasmPaths===void 0&&ht&&ht.indexOf("blob:")!==0&&(j.wasm.wasmPaths=ht.substring(0,ht.lastIndexOf("/")+1))},si=class{async init(e){hb(),await ab(),await sb(e)}async createInferenceSessionHandler(e,n){let t=new ai;return await t.loadModel(e,n),Promise.resolve(t)}},S0=new si});Ke();Ke();Ke();var Bs="1.21.0";var mN=fi;{let r=(Vf(),wn(Nf)).onnxjsBackend;Ut("webgl",r,-10)}{let r=(bb(),wn(gb)).wasmBackend;Ut("webgpu",r,5),Ut("webnn",r,5),Ut("cpu",r,10),Ut("wasm",r,10)}Object.defineProperty(j.versions,"web",{value:Bs,enumerable:!0});export{$b as InferenceSession,$n as TRACE,nt as TRACE_FUNC_BEGIN,Je as TRACE_FUNC_END,Re as Tensor,Pb as TrainingSession,mN as default,j as env,Ut as registerBackend};
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
/*! Bundled license information:

long/index.js:
  (**
   * @license
   * Copyright 2009 The Closure Library Authors
   * Copyright 2020 Daniel Wirtz / The long.js Authors.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *     http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
//# sourceMappingURL=ort.all.min.mjs.map
