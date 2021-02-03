/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2020 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 */
const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function n(t,n,r,i){let s,e,o;const h=n||[0],u=(r=r||0)>>>3,c=-1===i?3:0;for(s=0;s<t.length;s+=1)o=s+u,e=o>>>2,h.length<=e&&h.push(0),h[e]|=t[s]<<8*(c+i*(o%4));return{value:h,binLen:8*t.length+r}}function r(r,i,s){switch(i){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(r){case"HEX":return function(t,n,r){return function(t,n,r,i){let s,e,o,h;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");const u=n||[0],c=(r=r||0)>>>3,f=-1===i?3:0;for(s=0;s<t.length;s+=2){if(e=parseInt(t.substr(s,2),16),isNaN(e))throw new Error("String of HEX type contains invalid characters");for(h=(s>>>1)+c,o=h>>>2;u.length<=o;)u.push(0);u[o]|=e<<8*(f+i*(h%4))}return{value:u,binLen:4*t.length+r}}(t,n,r,s)};case"TEXT":return function(t,n,r){return function(t,n,r,i,s){let e,o,h,u,c,f,a,w,l=0;const A=r||[0],E=(i=i||0)>>>3;if("UTF8"===n)for(a=-1===s?3:0,h=0;h<t.length;h+=1)for(e=t.charCodeAt(h),o=[],128>e?o.push(e):2048>e?(o.push(192|e>>>6),o.push(128|63&e)):55296>e||57344<=e?o.push(224|e>>>12,128|e>>>6&63,128|63&e):(h+=1,e=65536+((1023&e)<<10|1023&t.charCodeAt(h)),o.push(240|e>>>18,128|e>>>12&63,128|e>>>6&63,128|63&e)),u=0;u<o.length;u+=1){for(f=l+E,c=f>>>2;A.length<=c;)A.push(0);A[c]|=o[u]<<8*(a+s*(f%4)),l+=1}else for(a=-1===s?2:0,w="UTF16LE"===n&&1!==s||"UTF16LE"!==n&&1===s,h=0;h<t.length;h+=1){for(e=t.charCodeAt(h),!0===w&&(u=255&e,e=u<<8|e>>>8),f=l+E,c=f>>>2;A.length<=c;)A.push(0);A[c]|=e<<8*(a+s*(f%4)),l+=2}return{value:A,binLen:8*l+i}}(t,i,n,r,s)};case"B64":return function(n,r,i){return function(n,r,i,s){let e,o,h,u,c,f,a,w=0;const l=r||[0],A=(i=i||0)>>>3,E=-1===s?3:0,b=n.indexOf("=");if(-1===n.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(n=n.replace(/=/g,""),-1!==b&&b<n.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<n.length;o+=4){for(c=n.substr(o,4),u=0,h=0;h<c.length;h+=1)e=t.indexOf(c.charAt(h)),u|=e<<18-6*h;for(h=0;h<c.length-1;h+=1){for(a=w+A,f=a>>>2;l.length<=f;)l.push(0);l[f]|=(u>>>16-8*h&255)<<8*(E+s*(a%4)),w+=1}}return{value:l,binLen:8*w+i}}(n,r,i,s)};case"BYTES":return function(t,n,r){return function(t,n,r,i){let s,e,o,h;const u=n||[0],c=(r=r||0)>>>3,f=-1===i?3:0;for(e=0;e<t.length;e+=1)s=t.charCodeAt(e),h=e+c,o=h>>>2,u.length<=o&&u.push(0),u[o]|=s<<8*(f+i*(h%4));return{value:u,binLen:8*t.length+r}}(t,n,r,s)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t,r,i){return function(t,r,i,s){return n(new Uint8Array(t),r,i,s)}(t,r,i,s)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t,r,i){return n(t,r,i,s)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function i(n,r,i,s){switch(n){case"HEX":return function(t){return function(t,n,r,i){const s="0123456789abcdef";let e,o,h="";const u=n/8,c=-1===r?3:0;for(e=0;e<u;e+=1)o=t[e>>>2]>>>8*(c+r*(e%4)),h+=s.charAt(o>>>4&15)+s.charAt(15&o);return i.outputUpper?h.toUpperCase():h}(t,r,i,s)};case"B64":return function(n){return function(n,r,i,s){let e,o,h,u,c,f="";const a=r/8,w=-1===i?3:0;for(e=0;e<a;e+=3)for(u=e+1<a?n[e+1>>>2]:0,c=e+2<a?n[e+2>>>2]:0,h=(n[e>>>2]>>>8*(w+i*(e%4))&255)<<16|(u>>>8*(w+i*((e+1)%4))&255)<<8|c>>>8*(w+i*((e+2)%4))&255,o=0;o<4;o+=1)f+=8*e+6*o<=r?t.charAt(h>>>6*(3-o)&63):s.b64Pad;return f}(n,r,i,s)};case"BYTES":return function(t){return function(t,n,r){let i,s,e="";const o=n/8,h=-1===r?3:0;for(i=0;i<o;i+=1)s=t[i>>>2]>>>8*(h+r*(i%4))&255,e+=String.fromCharCode(s);return e}(t,r,i)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t){return function(t,n,r){let i;const s=n/8,e=new ArrayBuffer(s),o=new Uint8Array(e),h=-1===r?3:0;for(i=0;i<s;i+=1)o[i]=t[i>>>2]>>>8*(h+r*(i%4))&255;return e}(t,r,i)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t){return function(t,n,r){let i;const s=n/8,e=-1===r?3:0,o=new Uint8Array(s);for(i=0;i<s;i+=1)o[i]=t[i>>>2]>>>8*(e+r*(i%4))&255;return o}(t,r,i)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function s(t,n){let r,i;const s=t.binLen>>>3,e=n.binLen>>>3,o=s<<3,h=4-s<<3;if(s%4!=0){for(r=0;r<e;r+=4)i=s+r>>>2,t.value[i]|=n.value[r>>>2]<<o,t.value.push(0),t.value[i+1]|=n.value[r>>>2]>>>h;return(t.value.length<<2)-4>=e+s&&t.value.pop(),{value:t.value,binLen:t.binLen+n.binLen}}return{value:t.value.concat(n.value),binLen:t.binLen+n.binLen}}function e(t){const n={outputUpper:!1,b64Pad:"=",outputLen:-1},r=t||{},i="Output length must be a multiple of 8";if(n.outputUpper=r.outputUpper||!1,r.b64Pad&&(n.b64Pad=r.b64Pad),r.outputLen){if(r.outputLen%8!=0)throw new Error(i);n.outputLen=r.outputLen}else if(r.shakeLen){if(r.shakeLen%8!=0)throw new Error(i);n.outputLen=r.shakeLen}if("boolean"!=typeof n.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof n.b64Pad)throw new Error("Invalid b64Pad formatting option");return n}function o(t,n,i,s){const e=t+" must include a value and format";if(!n){if(!s)throw new Error(e);return s}if(void 0===n.value||!n.format)throw new Error(e);return r(n.format,n.encoding||"UTF8",i)(n.value)}class h{constructor(t,n){this.t=t,this.i=n}}function u(t,n){let r;return n>32?(r=64-n,new h(t.i<<n|t.t>>>r,t.t<<n|t.i>>>r)):0!==n?(r=32-n,new h(t.t<<n|t.i>>>r,t.i<<n|t.t>>>r)):t}function c(t,n){return new h(t.t^n.t,t.i^n.i)}const f=[new h(0,1),new h(0,32898),new h(2147483648,32906),new h(2147483648,2147516416),new h(0,32907),new h(0,2147483649),new h(2147483648,2147516545),new h(2147483648,32777),new h(0,138),new h(0,136),new h(0,2147516425),new h(0,2147483658),new h(0,2147516555),new h(2147483648,139),new h(2147483648,32905),new h(2147483648,32771),new h(2147483648,32770),new h(2147483648,128),new h(0,32778),new h(2147483648,2147483658),new h(2147483648,2147516545),new h(2147483648,32896),new h(0,2147483649),new h(2147483648,2147516424)],a=[[0,36,3,41,18],[1,44,10,45,2],[62,6,43,15,61],[28,55,25,21,56],[27,20,39,8,14]];function w(t){let n;const r=[];for(n=0;n<5;n+=1)r[n]=[new h(0,0),new h(0,0),new h(0,0),new h(0,0),new h(0,0)];return r}function l(t){let n;const r=[];for(n=0;n<5;n+=1)r[n]=t[n].slice();return r}function A(t,n){let r,i,s,e;const o=[],l=[];if(null!==t)for(i=0;i<t.length;i+=2)n[(i>>>1)%5][(i>>>1)/5|0]=c(n[(i>>>1)%5][(i>>>1)/5|0],new h(t[i+1],t[i]));for(r=0;r<24;r+=1){for(e=w(),i=0;i<5;i+=1)o[i]=(A=n[i][0],E=n[i][1],b=n[i][2],p=n[i][3],R=n[i][4],new h(A.t^E.t^b.t^p.t^R.t,A.i^E.i^b.i^p.i^R.i));for(i=0;i<5;i+=1)l[i]=c(o[(i+4)%5],u(o[(i+1)%5],1));for(i=0;i<5;i+=1)for(s=0;s<5;s+=1)n[i][s]=c(n[i][s],l[i]);for(i=0;i<5;i+=1)for(s=0;s<5;s+=1)e[s][(2*i+3*s)%5]=u(n[i][s],a[i][s]);for(i=0;i<5;i+=1)for(s=0;s<5;s+=1)n[i][s]=c(e[i][s],new h(~e[(i+1)%5][s].t&e[(i+2)%5][s].t,~e[(i+1)%5][s].i&e[(i+2)%5][s].i));n[0][0]=c(n[0][0],f[r])}var A,E,b,p,R;return n}function E(t){let n,r,i=0;const s=[0,0],e=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)r=e[n>>2]>>>8*n&255,0===r&&0===i||(s[i+1>>2]|=r<<8*(i+1),i+=1);return i=0!==i?i:1,s[0]|=i,{value:i+1>4?s:[s[0]],binLen:8+8*i}}function b(t){return s(E(t.binLen),t)}function p(t,n){let r,i=E(n);i=s(i,t);const e=n>>>2,o=(e-i.value.length%e)%e;for(r=0;r<o;r++)i.value.push(0);return i.value}export default class extends class{constructor(t,n,r){const i=r||{};if(this.o=n,this.h=i.encoding||"UTF8",this.numRounds=i.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.u=t,this.l=[],this.A=0,this.p=!1,this.R=0,this.m=!1,this.U=[],this.C=[]}update(t){let n,r=0;const i=this.v>>>5,s=this.H(t,this.l,this.A),e=s.binLen,o=s.value,h=e>>>5;for(n=0;n<h;n+=i)r+this.v<=e&&(this.T=this.F(o.slice(n,n+i),this.T),r+=this.v);this.R+=r,this.l=o.slice(r>>>5),this.A=e%this.v,this.p=!0}getHash(t,n){let r,s,o=this.g;const h=e(n);if(this.S){if(-1===h.outputLen)throw new Error("Output length must be specified in options");o=h.outputLen}const u=i(t,o,this.B,h);if(this.m&&this.L)return u(this.L(h));for(s=this.K(this.l.slice(),this.A,this.R,this.k(this.T),o),r=1;r<this.numRounds;r+=1)this.S&&o%32!=0&&(s[s.length-1]&=16777215>>>24-o%32),s=this.K(s,o,0,this.Y(this.u),o);return u(s)}setHMACKey(t,n,i){if(!this.M)throw new Error("Variant does not support HMAC");if(this.p)throw new Error("Cannot set MAC key after calling update");const s=r(n,(i||{}).encoding||"UTF8",this.B);this.N(s(t))}N(t){const n=this.v>>>3,r=n/4-1;let i;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(this.m)throw new Error("MAC key already set");for(n<t.binLen/8&&(t.value=this.K(t.value,t.binLen,0,this.Y(this.u),this.g));t.value.length<=r;)t.value.push(0);for(i=0;i<=r;i+=1)this.U[i]=909522486^t.value[i],this.C[i]=1549556828^t.value[i];this.T=this.F(this.U,this.T),this.R=this.v,this.m=!0}getHMAC(t,n){const r=e(n);return i(t,this.g,this.B,r)(this.I())}I(){let t;if(!this.m)throw new Error("Cannot call getHMAC without first setting MAC key");const n=this.K(this.l.slice(),this.A,this.R,this.k(this.T),this.g);return t=this.F(this.C,this.Y(this.u)),t=this.K(n,this.g,this.v,t,this.g),t}}{constructor(t,n,i){let s=6,e=0;super(t,n,i);const h=i||{};if(1!==this.numRounds){if(h.kmacKey||h.hmacKey)throw new Error("Cannot set numRounds with MAC");if("CSHAKE128"===this.u||"CSHAKE256"===this.u)throw new Error("Cannot set numRounds for CSHAKE variants")}switch(this.B=1,this.H=r(this.o,this.h,this.B),this.F=A,this.k=l,this.Y=w,this.T=w(),this.S=!1,t){case"SHA3-224":this.v=e=1152,this.g=224,this.M=!0,this.L=this.I;break;case"SHA3-256":this.v=e=1088,this.g=256,this.M=!0,this.L=this.I;break;case"SHA3-384":this.v=e=832,this.g=384,this.M=!0,this.L=this.I;break;case"SHA3-512":this.v=e=576,this.g=512,this.M=!0,this.L=this.I;break;case"SHAKE128":s=31,this.v=e=1344,this.g=-1,this.S=!0,this.M=!1,this.L=null;break;case"SHAKE256":s=31,this.v=e=1088,this.g=-1,this.S=!0,this.M=!1,this.L=null;break;case"KMAC128":s=4,this.v=e=1344,this.X(i),this.g=-1,this.S=!0,this.M=!1,this.L=this._;break;case"KMAC256":s=4,this.v=e=1088,this.X(i),this.g=-1,this.S=!0,this.M=!1,this.L=this._;break;case"CSHAKE128":this.v=e=1344,s=this.O(i),this.g=-1,this.S=!0,this.M=!1,this.L=null;break;case"CSHAKE256":this.v=e=1088,s=this.O(i),this.g=-1,this.S=!0,this.M=!1,this.L=null;break;default:throw new Error("Chosen SHA variant is not supported")}this.K=function(t,n,r,i,o){return function(t,n,r,i,s,e,o){let h,u,c=0;const f=[],a=s>>>5,w=n>>>5;for(h=0;h<w&&n>=s;h+=a)i=A(t.slice(h,h+a),i),n-=s;for(t=t.slice(h),n%=s;t.length<a;)t.push(0);for(h=n>>>3,t[h>>2]^=e<<h%4*8,t[a-1]^=2147483648,i=A(t,i);32*f.length<o&&(u=i[c%5][c/5|0],f.push(u.i),!(32*f.length>=o));)f.push(u.t),c+=1,0==64*c%s&&(A(null,i),c=0);return f}(t,n,0,i,e,s,o)},h.hmacKey&&this.N(o("hmacKey",h.hmacKey,this.B))}O(t,n){const r=function(t){const n=t||{};return{funcName:o("funcName",n.funcName,1,{value:[],binLen:0}),customization:o("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});n&&(r.funcName=n);const i=s(b(r.funcName),b(r.customization));if(0!==r.customization.binLen||0!==r.funcName.binLen){const t=p(i,this.v>>>3);for(let n=0;n<t.length;n+=this.v>>>5)this.T=this.F(t.slice(n,n+(this.v>>>5)),this.T),this.R+=this.v;return 4}return 31}X(t){const n=function(t){const n=t||{};return{kmacKey:o("kmacKey",n.kmacKey,1),funcName:{value:[1128353099],binLen:32},customization:o("Customization",n.customization,1,{value:[],binLen:0})}}(t||{});this.O(t,n.funcName);const r=p(b(n.kmacKey),this.v>>>3);for(let t=0;t<r.length;t+=this.v>>>5)this.T=this.F(r.slice(t,t+(this.v>>>5)),this.T),this.R+=this.v;this.m=!0}_(t){const n=s({value:this.l.slice(),binLen:this.A},function(t){let n,r,i=0;const s=[0,0],e=[4294967295&t,t/4294967296&2097151];for(n=6;n>=0;n--)r=e[n>>2]>>>8*n&255,0===r&&0===i||(s[i>>2]|=r<<8*i,i+=1);return i=0!==i?i:1,s[i>>2]|=i<<8*i,{value:i+1>4?s:[s[0]],binLen:8+8*i}}(t.outputLen));return this.K(n.value,n.binLen,this.R,this.k(this.T),t.outputLen)}}
