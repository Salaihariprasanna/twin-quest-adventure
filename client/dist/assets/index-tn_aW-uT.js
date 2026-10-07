(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();class ml{constructor(){this.ctx=null,this.masterGain=null,this.sfxGain=null,this.musicGain=null,this.isMuted=!1,this.masterVol=.8,this.sfxVol=.85,this.musicVol=.55,this.currentTrack=null,this.musicTimer=null,this.initialized=!1}init(){if(!this.initialized)try{const t=window.AudioContext||window.webkitAudioContext;this.ctx=new t,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(this.masterVol,this.ctx.currentTime),this.masterGain.connect(this.ctx.destination),this.sfxGain=this.ctx.createGain(),this.sfxGain.gain.setValueAtTime(this.sfxVol,this.ctx.currentTime),this.sfxGain.connect(this.masterGain),this.musicGain=this.ctx.createGain(),this.musicGain.gain.setValueAtTime(this.musicVol,this.ctx.currentTime),this.musicGain.connect(this.masterGain),this.initialized=!0}catch(t){console.warn("AudioContext not supported or blocked:",t)}}ensureContext(){this.initialized||this.init(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}setMasterVolume(t){this.masterVol=Math.max(0,Math.min(1,t)),this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(this.isMuted?0:this.masterVol,this.ctx.currentTime)}setSfxVolume(t){this.sfxVol=Math.max(0,Math.min(1,t)),this.sfxGain&&this.ctx&&this.sfxGain.gain.setValueAtTime(this.sfxVol,this.ctx.currentTime)}setMusicVolume(t){this.musicVol=Math.max(0,Math.min(1,t)),this.musicGain&&this.ctx&&this.musicGain.gain.setValueAtTime(this.musicVol,this.ctx.currentTime)}toggleMute(){return this.isMuted=!this.isMuted,this.masterGain&&this.ctx&&this.masterGain.gain.setValueAtTime(this.isMuted?0:this.masterVol,this.ctx.currentTime),this.isMuted}playJump(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sine";const i=this.ctx.currentTime;t.frequency.setValueAtTime(160,i),t.frequency.exponentialRampToValueAtTime(420,i+.12),e.gain.setValueAtTime(.3,i),e.gain.exponentialRampToValueAtTime(.01,i+.12),t.connect(e),e.connect(this.sfxGain),t.start(i),t.stop(i+.13)}playDoubleJump(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="triangle";const i=this.ctx.currentTime;t.frequency.setValueAtTime(320,i),t.frequency.exponentialRampToValueAtTime(750,i+.15),e.gain.setValueAtTime(.28,i),e.gain.exponentialRampToValueAtTime(.01,i+.15),t.connect(e),e.connect(this.sfxGain),t.start(i),t.stop(i+.16)}playDash(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.createOscillator(),e=this.ctx.createGain();t.type="sawtooth";const i=this.ctx.currentTime;t.frequency.setValueAtTime(280,i),t.frequency.exponentialRampToValueAtTime(100,i+.1),e.gain.setValueAtTime(.25,i),e.gain.exponentialRampToValueAtTime(.01,i+.1),t.connect(e),e.connect(this.sfxGain),t.start(i),t.stop(i+.1)}playAttack(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.sampleRate*.08,i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=i.getChannelData(0);for(let c=0;c<e;c++)s[c]=(Math.random()*2-1)*(1-c/e);const r=this.ctx.createBufferSource();r.buffer=i;const a=this.ctx.createBiquadFilter();a.type="bandpass",a.frequency.setValueAtTime(800,t),a.frequency.exponentialRampToValueAtTime(200,t+.08);const o=this.ctx.createGain();o.gain.setValueAtTime(.4,t),o.gain.exponentialRampToValueAtTime(.01,t+.08),r.connect(a),a.connect(o),o.connect(this.sfxGain),r.start(t)}playMagic(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(550,t),e.frequency.exponentialRampToValueAtTime(1100,t+.12),e.frequency.exponentialRampToValueAtTime(880,t+.25),i.gain.setValueAtTime(.3,t),i.gain.exponentialRampToValueAtTime(.01,t+.25),e.connect(i),i.connect(this.sfxGain),e.start(t),e.stop(t+.26)}playHit(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="square",e.frequency.setValueAtTime(120,t),e.frequency.exponentialRampToValueAtTime(40,t+.1),i.gain.setValueAtTime(.35,t),i.gain.exponentialRampToValueAtTime(.01,t+.1),e.connect(i),i.connect(this.sfxGain),e.start(t),e.stop(t+.11)}playCoin(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[987.77,1318.51].forEach((e,i)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(e,t+i*.07),r.gain.setValueAtTime(.22,t+i*.07),r.gain.exponentialRampToValueAtTime(.01,t+i*.07+.14),s.connect(r),r.connect(this.sfxGain),s.start(t+i*.07),s.stop(t+i*.07+.15)})}playGem(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[1046.5,1318.5,1567.98,2093].forEach((e,i)=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(e,t+i*.05),r.gain.setValueAtTime(.2,t+i*.05),r.gain.exponentialRampToValueAtTime(.01,t+i*.05+.2),s.connect(r),r.connect(this.sfxGain),s.start(t+i*.05),s.stop(t+i*.05+.22)})}playChest(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[440,554.37,659.25,880].forEach((i,s)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(i,t+s*.08),a.gain.setValueAtTime(.25,t+s*.08),a.gain.exponentialRampToValueAtTime(.01,t+s*.08+.3),r.connect(a),a.connect(this.sfxGain),r.start(t+s*.08),r.stop(t+s*.08+.32)})}playCheckpoint(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach(i=>{const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(i,t),r.gain.setValueAtTime(.12,t),r.gain.exponentialRampToValueAtTime(.001,t+1.2),s.connect(r),r.connect(this.sfxGain),s.start(t),s.stop(t+1.3)})}playSwitch(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="square",e.frequency.setValueAtTime(300,t),e.frequency.setValueAtTime(450,t+.04),i.gain.setValueAtTime(.2,t),i.gain.exponentialRampToValueAtTime(.01,t+.09),e.connect(i),i.connect(this.sfxGain),e.start(t),e.stop(t+.1)}playDoor(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(80,t),e.frequency.linearRampToValueAtTime(140,t+.4),i.gain.setValueAtTime(.2,t),i.gain.exponentialRampToValueAtTime(.01,t+.4),e.connect(i),i.connect(this.sfxGain),e.start(t),e.stop(t+.42)}playBossRoar(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),i=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(70,t),e.frequency.linearRampToValueAtTime(95,t+.3),e.frequency.linearRampToValueAtTime(50,t+.7),i.gain.setValueAtTime(.35,t),i.gain.exponentialRampToValueAtTime(.01,t+.7),e.connect(i),i.connect(this.sfxGain),e.start(t),e.stop(t+.72)}playVictory(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[392,523.25,659.25,783.99,1046.5].forEach((i,s)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(i,t+s*.15),a.gain.setValueAtTime(.25,t+s*.15),a.gain.exponentialRampToValueAtTime(.01,t+s*.15+(s===4?.8:.25)),r.connect(a),a.connect(this.sfxGain),r.start(t+s*.15),r.stop(t+s*.15+(s===4?.85:.28))})}playGameOver(){if(this.ensureContext(),!this.ctx)return;const t=this.ctx.currentTime;[329.63,293.66,261.63,220].forEach((i,s)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(i,t+s*.2),a.gain.setValueAtTime(.25,t+s*.2),a.gain.exponentialRampToValueAtTime(.01,t+s*.2+.35),r.connect(a),a.connect(this.sfxGain),r.start(t+s*.2),r.stop(t+s*.2+.38)})}startMusic(t=1){this.ensureContext(),this.stopMusic();const e={1:[261.63,329.63,392,440,523.25],2:[220,261.63,293.66,329.63,392],3:[196,246.94,293.66,329.63,392],4:[174.61,220,261.63,293.66,349.23],5:[146.83,174.61,220,261.63,293.66]},i=e[t]||e[1];let s=0;const r=()=>{if(!this.ctx||this.isMuted)return;const a=this.ctx.currentTime,o=i[s%i.length],c=this.ctx.createOscillator(),l=this.ctx.createGain();c.type="sine",c.frequency.setValueAtTime(o,a),l.gain.setValueAtTime(.06,a),l.gain.exponentialRampToValueAtTime(.001,a+.45),c.connect(l),l.connect(this.musicGain),c.start(a),c.stop(a+.48),s=(s+1+Math.floor(Math.random()*2))%i.length};this.musicTimer=setInterval(r,500)}stopMusic(){this.musicTimer&&(clearInterval(this.musicTimer),this.musicTimer=null)}}class gl{constructor(){this.keys={left:!1,right:!1,up:!1,down:!1,jump:!1,dash:!1,attack:!1,skill:!1,interact:!1,pause:!1},this.pressed={jump:!1,dash:!1,attack:!1,skill:!1,interact:!1,pause:!1},this.mouse={x:0,y:0,leftDown:!1,rightDown:!1},this.isTouchDevice=!1,this.initKeyboard(),this.initMouse(),this.initTouch()}initKeyboard(){window.addEventListener("keydown",t=>{["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(t.code)&&t.preventDefault(),this.handleKey(t.code,!0)}),window.addEventListener("keyup",t=>{this.handleKey(t.code,!1)})}handleKey(t,e){switch(t){case"KeyA":case"ArrowLeft":this.keys.left=e;break;case"KeyD":case"ArrowRight":this.keys.right=e;break;case"KeyW":case"ArrowUp":this.keys.up=e;break;case"KeyS":case"ArrowDown":this.keys.down=e;break;case"Space":e&&!this.keys.jump&&(this.pressed.jump=!0),this.keys.jump=e;break;case"ShiftLeft":case"ShiftRight":e&&!this.keys.dash&&(this.pressed.dash=!0),this.keys.dash=e;break;case"KeyJ":e&&!this.keys.attack&&(this.pressed.attack=!0),this.keys.attack=e;break;case"KeyK":e&&!this.keys.skill&&(this.pressed.skill=!0),this.keys.skill=e;break;case"KeyE":e&&!this.keys.interact&&(this.pressed.interact=!0),this.keys.interact=e;break;case"Escape":e&&!this.keys.pause&&(this.pressed.pause=!0),this.keys.pause=e;break}}initMouse(){window.addEventListener("mousemove",t=>{this.mouse.x=t.clientX,this.mouse.y=t.clientY}),window.addEventListener("mousedown",t=>{t.target.tagName==="BUTTON"||t.target.tagName==="INPUT"||(t.button===0?(this.mouse.leftDown=!0,this.keys.attack=!0,this.pressed.attack=!0):t.button===2&&(t.preventDefault(),this.mouse.rightDown=!0,this.keys.skill=!0,this.pressed.skill=!0))}),window.addEventListener("mouseup",t=>{t.button===0?(this.mouse.leftDown=!1,this.keys.attack=!1):t.button===2&&(this.mouse.rightDown=!1,this.keys.skill=!1)}),window.addEventListener("contextmenu",t=>{t.target.id==="gameCanvas"&&t.preventDefault()})}initTouch(){("ontouchstart"in window||navigator.maxTouchPoints>0)&&(this.isTouchDevice=!0);const t=(e,i,s=!1)=>{const r=document.getElementById(e);if(!r)return;const a=c=>{c.preventDefault(),this.keys[i]=!0,s&&(this.pressed[i]=!0)},o=c=>{c.preventDefault(),this.keys[i]=!1};r.addEventListener("touchstart",a,{passive:!1}),r.addEventListener("touchend",o,{passive:!1}),r.addEventListener("touchcancel",o,{passive:!1}),r.addEventListener("mousedown",a),r.addEventListener("mouseup",o)};t("btn-touch-left","left"),t("btn-touch-right","right"),t("btn-touch-jump","jump",!0),t("btn-touch-attack","attack",!0),t("btn-touch-skill","skill",!0),t("btn-touch-dash","dash",!0),t("btn-touch-interact","interact",!0)}consumeJump(){const t=this.pressed.jump;return this.pressed.jump=!1,t}consumeDash(){const t=this.pressed.dash;return this.pressed.dash=!1,t}consumeAttack(){const t=this.pressed.attack;return this.pressed.attack=!1,t}consumeSkill(){const t=this.pressed.skill;return this.pressed.skill=!1,t}consumeInteract(){const t=this.pressed.interact;return this.pressed.interact=!1,t}consumePause(){const t=this.pressed.pause;return this.pressed.pause=!1,t}}const di=Object.create(null);di.open="0";di.close="1";di.ping="2";di.pong="3";di.message="4";di.upgrade="5";di.noop="6";const Ms=Object.create(null);Object.keys(di).forEach(n=>{Ms[di[n]]=n});const Cr={type:"error",data:"parser error"},hc=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",uc=typeof ArrayBuffer=="function",dc=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n&&n.buffer instanceof ArrayBuffer,Sa=({type:n,data:t},e,i)=>hc&&t instanceof Blob?e?i(t):ao(t,i):uc&&(t instanceof ArrayBuffer||dc(t))?e?i(t):ao(new Blob([t]),i):i(di[n]+(t||"")),ao=(n,t)=>{const e=new FileReader;return e.onload=function(){const i=e.result.split(",")[1];t("b"+(i||""))},e.readAsDataURL(n)};function oo(n){return n instanceof Uint8Array?n:n instanceof ArrayBuffer?new Uint8Array(n):new Uint8Array(n.buffer,n.byteOffset,n.byteLength)}let $s;function _l(n,t){if(hc&&n.data instanceof Blob)return n.data.arrayBuffer().then(oo).then(t);if(uc&&(n.data instanceof ArrayBuffer||dc(n.data)))return t(oo(n.data));Sa(n,!1,e=>{$s||($s=new TextEncoder),t($s.encode(e))})}const co="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",Nn=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let n=0;n<co.length;n++)Nn[co.charCodeAt(n)]=n;const xl=n=>{let t=n.length*.75,e=n.length,i,s=0,r,a,o,c;n[n.length-1]==="="&&(t--,n[n.length-2]==="="&&t--);const l=new ArrayBuffer(t),u=new Uint8Array(l);for(i=0;i<e;i+=4)r=Nn[n.charCodeAt(i)],a=Nn[n.charCodeAt(i+1)],o=Nn[n.charCodeAt(i+2)],c=Nn[n.charCodeAt(i+3)],u[s++]=r<<2|a>>4,u[s++]=(a&15)<<4|o>>2,u[s++]=(o&3)<<6|c&63;return l},vl=typeof ArrayBuffer=="function",Ea=(n,t)=>{if(typeof n!="string")return{type:"message",data:fc(n,t)};const e=n.charAt(0);return e==="b"?{type:"message",data:yl(n.substring(1),t)}:Ms[e]?n.length>1?{type:Ms[e],data:n.substring(1)}:{type:Ms[e]}:Cr},yl=(n,t)=>{if(vl){const e=xl(n);return fc(e,t)}else return{base64:!0,data:n}},fc=(n,t)=>{switch(t){case"blob":return n instanceof Blob?n:new Blob([n]);case"arraybuffer":default:return n instanceof ArrayBuffer?n:n.buffer}},pc="",Ml=(n,t)=>{const e=n.length,i=new Array(e);let s=0;n.forEach((r,a)=>{Sa(r,!1,o=>{i[a]=o,++s===e&&t(i.join(pc))})})},Sl=(n,t)=>{const e=n.split(pc),i=[];for(let s=0;s<e.length;s++){const r=Ea(e[s],t);if(i.push(r),r.type==="error")break}return i};function El(){return new TransformStream({transform(n,t){_l(n,e=>{const i=e.length;let s;if(i<126)s=new Uint8Array(1),new DataView(s.buffer).setUint8(0,i);else if(i<65536){s=new Uint8Array(3);const r=new DataView(s.buffer);r.setUint8(0,126),r.setUint16(1,i)}else{s=new Uint8Array(9);const r=new DataView(s.buffer);r.setUint8(0,127),r.setBigUint64(1,BigInt(i))}n.data&&typeof n.data!="string"&&(s[0]|=128),t.enqueue(s),t.enqueue(e)})}})}let Zs;function Jn(n){return n.reduce((t,e)=>t+e.length,0)}function Qn(n,t){if(n[0].length===t)return n.shift();const e=new Uint8Array(t);let i=0;for(let s=0;s<t;s++)e[s]=n[0][i++],i===n[0].length&&(n.shift(),i=0);return n.length&&i<n[0].length&&(n[0]=n[0].slice(i)),e}function bl(n,t){Zs||(Zs=new TextDecoder);const e=[];let i=0,s=-1,r=!1;return new TransformStream({transform(a,o){for(e.push(a);;){if(i===0){if(Jn(e)<1)break;const c=Qn(e,1);r=(c[0]&128)===128,s=c[0]&127,s<126?i=3:s===126?i=1:i=2}else if(i===1){if(Jn(e)<2)break;const c=Qn(e,2);s=new DataView(c.buffer,c.byteOffset,c.length).getUint16(0),i=3}else if(i===2){if(Jn(e)<8)break;const c=Qn(e,8),l=new DataView(c.buffer,c.byteOffset,c.length),u=l.getUint32(0);if(u>Math.pow(2,21)-1){o.enqueue(Cr);break}s=u*Math.pow(2,32)+l.getUint32(4),i=3}else{if(Jn(e)<s)break;const c=Qn(e,s);o.enqueue(Ea(r?c:Zs.decode(c),t)),i=0}if(s===0||s>n){o.enqueue(Cr);break}}}})}const mc=4;function ve(n){if(n)return wl(n)}function wl(n){for(var t in ve.prototype)n[t]=ve.prototype[t];return n}ve.prototype.on=ve.prototype.addEventListener=function(n,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+n]=this._callbacks["$"+n]||[]).push(t),this};ve.prototype.once=function(n,t){function e(){this.off(n,e),t.apply(this,arguments)}return e.fn=t,this.on(n,e),this};ve.prototype.off=ve.prototype.removeListener=ve.prototype.removeAllListeners=ve.prototype.removeEventListener=function(n,t){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var e=this._callbacks["$"+n];if(!e)return this;if(arguments.length==1)return delete this._callbacks["$"+n],this;for(var i,s=0;s<e.length;s++)if(i=e[s],i===t||i.fn===t){e.splice(s,1);break}return e.length===0&&delete this._callbacks["$"+n],this};ve.prototype.emit=function(n){this._callbacks=this._callbacks||{};for(var t=new Array(arguments.length-1),e=this._callbacks["$"+n],i=1;i<arguments.length;i++)t[i-1]=arguments[i];if(e){e=e.slice(0);for(var i=0,s=e.length;i<s;++i)e[i].apply(this,t)}return this};ve.prototype.emitReserved=ve.prototype.emit;ve.prototype.listeners=function(n){return this._callbacks=this._callbacks||{},this._callbacks["$"+n]||[]};ve.prototype.hasListeners=function(n){return!!this.listeners(n).length};const ks=typeof Promise=="function"&&typeof Promise.resolve=="function"?t=>Promise.resolve().then(t):(t,e)=>e(t,0),Ye=typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),Tl="arraybuffer";function gc(n,...t){return t.reduce((e,i)=>(n.hasOwnProperty(i)&&(e[i]=n[i]),e),{})}const Al=Ye.setTimeout,Rl=Ye.clearTimeout;function Gs(n,t){t.useNativeTimers?(n.setTimeoutFn=Al.bind(Ye),n.clearTimeoutFn=Rl.bind(Ye)):(n.setTimeoutFn=Ye.setTimeout.bind(Ye),n.clearTimeoutFn=Ye.clearTimeout.bind(Ye))}const Cl=1.33;function Pl(n){return typeof n=="string"?Ll(n):Math.ceil((n.byteLength||n.size)*Cl)}function Ll(n){let t=0,e=0;for(let i=0,s=n.length;i<s;i++)t=n.charCodeAt(i),t<128?e+=1:t<2048?e+=2:t<55296||t>=57344?e+=3:(i++,e+=4);return e}function _c(){return Date.now().toString(36).substring(3)+Math.random().toString(36).substring(2,5)}function Dl(n){let t="";for(let e in n)n.hasOwnProperty(e)&&(t.length&&(t+="&"),t+=encodeURIComponent(e)+"="+encodeURIComponent(n[e]));return t}function Il(n){let t={},e=n.split("&");for(let i=0,s=e.length;i<s;i++){let r=e[i].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t}class Nl extends Error{constructor(t,e,i){super(t),this.description=e,this.context=i,this.type="TransportError"}}class ba extends ve{constructor(t){super(),this.writable=!1,Gs(this,t),this.opts=t,this.query=t.query,this.socket=t.socket,this.supportsBinary=!t.forceBase64}onError(t,e,i){return super.emitReserved("error",new Nl(t,e,i)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(t){this.readyState==="open"&&this.write(t)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(t){const e=Ea(t,this.socket.binaryType);this.onPacket(e)}onPacket(t){super.emitReserved("packet",t)}onClose(t){this.readyState="closed",super.emitReserved("close",t)}pause(t){}createUri(t,e={}){return t+"://"+this._hostname()+this._port()+this.opts.path+this._query(e)}_hostname(){const t=this.opts.hostname;return t.indexOf(":")===-1?t:"["+t+"]"}_port(){return this.opts.port&&(this.opts.secure&&Number(this.opts.port)!==443||!this.opts.secure&&Number(this.opts.port)!==80)?":"+this.opts.port:""}_query(t){const e=Dl(t);return e.length?"?"+e:""}}class Ul extends ba{constructor(){super(...arguments),this._polling=!1}get name(){return"polling"}doOpen(){this._poll()}pause(t){this.readyState="pausing";const e=()=>{this.readyState="paused",t()};if(this._polling||!this.writable){let i=0;this._polling&&(i++,this.once("pollComplete",function(){--i||e()})),this.writable||(i++,this.once("drain",function(){--i||e()}))}else e()}_poll(){this._polling=!0,this.doPoll(),this.emitReserved("poll")}onData(t){const e=i=>{if(this.readyState==="opening"&&i.type==="open"&&this.onOpen(),i.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(i)};Sl(t,this.socket.binaryType).forEach(e),this.readyState!=="closed"&&(this._polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this._poll())}doClose(){const t=()=>{this.write([{type:"close"}])};this.readyState==="open"?t():this.once("open",t)}write(t){this.writable=!1,Ml(t,e=>{this.doWrite(e,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){const t=this.opts.secure?"https":"http",e=this.query||{};return this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=_c()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.createUri(t,e)}}let xc=!1;try{xc=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const Fl=xc;function Ol(){}class Bl extends Ul{constructor(t){if(super(t),typeof location<"u"){const e=location.protocol==="https:";let i=location.port;i||(i=e?"443":"80"),this.xd=typeof location<"u"&&t.hostname!==location.hostname||i!==t.port}}doWrite(t,e){const i=this.request({method:"POST",data:t});i.on("success",e),i.on("error",(s,r)=>{this.onError("xhr post error",s,r)})}doPoll(){const t=this.request();t.on("data",this.onData.bind(this)),t.on("error",(e,i)=>{this.onError("xhr poll error",e,i)}),this.pollXhr=t}}class hi extends ve{constructor(t,e,i){super(),this.createRequest=t,Gs(this,i),this._opts=i,this._method=i.method||"GET",this._uri=e,this._data=i.data!==void 0?i.data:null,this._create()}_create(){var t;const e=gc(this._opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this._opts.xd;const i=this._xhr=this.createRequest(e);try{i.open(this._method,this._uri,!0);try{if(this._opts.extraHeaders){i.setDisableHeaderCheck&&i.setDisableHeaderCheck(!0);for(let s in this._opts.extraHeaders)this._opts.extraHeaders.hasOwnProperty(s)&&i.setRequestHeader(s,this._opts.extraHeaders[s])}}catch{}if(this._method==="POST")try{i.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{i.setRequestHeader("Accept","*/*")}catch{}(t=this._opts.cookieJar)===null||t===void 0||t.addCookies(i),"withCredentials"in i&&(i.withCredentials=this._opts.withCredentials),this._opts.requestTimeout&&(i.timeout=this._opts.requestTimeout),i.onreadystatechange=()=>{var s;i.readyState===3&&((s=this._opts.cookieJar)===null||s===void 0||s.parseCookies(i.getResponseHeader("set-cookie"))),i.readyState===4&&(i.status===200||i.status===1223?this._onLoad():this.setTimeoutFn(()=>{this._onError(typeof i.status=="number"?i.status:0)},0))},i.send(this._data)}catch(s){this.setTimeoutFn(()=>{this._onError(s)},0);return}typeof document<"u"&&(this._index=hi.requestsCount++,hi.requests[this._index]=this)}_onError(t){this.emitReserved("error",t,this._xhr),this._cleanup(!0)}_cleanup(t){if(!(typeof this._xhr>"u"||this._xhr===null)){if(this._xhr.onreadystatechange=Ol,t)try{this._xhr.abort()}catch{}typeof document<"u"&&delete hi.requests[this._index],this._xhr=null}}_onLoad(){const t=this._xhr.responseText;t!==null&&(this.emitReserved("data",t),this.emitReserved("success"),this._cleanup())}abort(){this._cleanup()}}hi.requestsCount=0;hi.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",lo);else if(typeof addEventListener=="function"){const n="onpagehide"in Ye?"pagehide":"unload";addEventListener(n,lo,!1)}}function lo(){for(let n in hi.requests)hi.requests.hasOwnProperty(n)&&hi.requests[n].abort()}const kl=(function(){const n=vc({xdomain:!1});return n&&n.responseType!==null})();class Gl extends Bl{constructor(t){super(t);const e=t&&t.forceBase64;this.supportsBinary=kl&&!e}request(t={}){return Object.assign(t,{xd:this.xd},this.opts),new hi(vc,this.uri(),t)}}function vc(n){const t=n.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!t||Fl))return new XMLHttpRequest}catch{}if(!t)try{return new Ye[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}const yc=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class zl extends ba{get name(){return"websocket"}doOpen(){const t=this.uri(),e=this.opts.protocols,i=yc?{}:gc(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(i.headers=this.opts.extraHeaders);try{this.ws=this.createSocket(t,e,i)}catch(s){return this.emitReserved("error",s)}this.ws.binaryType=this.socket.binaryType,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=t=>this.onClose({description:"websocket connection closed",context:t}),this.ws.onmessage=t=>this.onData(t.data),this.ws.onerror=t=>this.onError("websocket error",t)}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const i=t[e],s=e===t.length-1;Sa(i,this.supportsBinary,r=>{try{this.doWrite(i,r)}catch{}s&&ks(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.onerror=()=>{},this.ws.close(),this.ws=null)}uri(){const t=this.opts.secure?"wss":"ws",e=this.query||{};return this.opts.timestampRequests&&(e[this.opts.timestampParam]=_c()),this.supportsBinary||(e.b64=1),this.createUri(t,e)}}const Js=Ye.WebSocket||Ye.MozWebSocket;class Hl extends zl{createSocket(t,e,i){return yc?new Js(t,e,i):e?new Js(t,e):new Js(t)}doWrite(t,e){this.ws.send(e)}}class Vl extends ba{get name(){return"webtransport"}doOpen(){try{this._transport=new WebTransport(this.createUri("https"),this.opts.transportOptions[this.name])}catch(t){return this.emitReserved("error",t)}this._transport.closed.then(()=>{this.onClose()}).catch(t=>{this.onError("webtransport error",t)}),this._transport.ready.then(()=>{this._transport.createBidirectionalStream().then(t=>{const e=bl(Number.MAX_SAFE_INTEGER,this.socket.binaryType),i=t.readable.pipeThrough(e).getReader(),s=El();s.readable.pipeTo(t.writable),this._writer=s.writable.getWriter();const r=()=>{i.read().then(({done:o,value:c})=>{o||(this.onPacket(c),r())}).catch(o=>{})};r();const a={type:"open"};this.query.sid&&(a.data=`{"sid":"${this.query.sid}"}`),this._writer.write(a).then(()=>this.onOpen())})})}write(t){this.writable=!1;for(let e=0;e<t.length;e++){const i=t[e],s=e===t.length-1;this._writer.write(i).then(()=>{s&&ks(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){var t;(t=this._transport)===null||t===void 0||t.close()}}const Wl={websocket:Hl,webtransport:Vl,polling:Gl},Xl=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,ql=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function Pr(n){if(n.length>8e3)throw"URI too long";const t=n,e=n.indexOf("["),i=n.indexOf("]");e!=-1&&i!=-1&&(n=n.substring(0,e)+n.substring(e,i).replace(/:/g,";")+n.substring(i,n.length));let s=Xl.exec(n||""),r={},a=14;for(;a--;)r[ql[a]]=s[a]||"";return e!=-1&&i!=-1&&(r.source=t,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=Yl(r,r.path),r.queryKey=Kl(r,r.query),r}function Yl(n,t){const e=/\/{2,9}/g,i=t.replace(e,"/").split("/");return(t.slice(0,1)=="/"||t.length===0)&&i.splice(0,1),t.slice(-1)=="/"&&i.splice(i.length-1,1),i}function Kl(n,t){const e={};return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(i,s,r){s&&(e[s]=r)}),e}const Lr=typeof addEventListener=="function"&&typeof removeEventListener=="function",Ss=[];Lr&&addEventListener("offline",()=>{Ss.forEach(n=>n())},!1);let Mc=class fn extends ve{constructor(t,e={}){var i,s;if(super(),this.binaryType=Tl,this.writeBuffer=[],this._prevBufferLen=0,this._upgrades=[],this._pingInterval=-1,this._pingTimeout=-1,this._maxPayload=-1,this._pingTimeoutTime=1/0,t&&typeof t=="object"&&(e=t,t=null),t){const r=Pr(t);e.hostname=r.host,e.secure=r.protocol==="https"||r.protocol==="wss",e.port=r.port,r.query&&(e.query=r.query)}else e.host&&(e.hostname=Pr(e.host).host);if(Gs(this,e),this.secure=e.secure!=null?e.secure:typeof location<"u"&&location.protocol==="https:",e.hostname&&!e.port&&(e.port=this.secure?"443":"80"),this.hostname=e.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=e.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),e.transportImplementations&&e.transports)throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");e.transportImplementations||!((i=e.transports)===null||i===void 0)&&i.length&&typeof e.transports[0]=="function"?(this.transports=[],this._transportsByName=Object.create(null),((s=e.transportImplementations)!==null&&s!==void 0?s:e.transports).forEach(r=>{const a=r.prototype.name;this.transports.push(a),this._transportsByName[a]=r})):(this.transports=e.transports?[...e.transports]:["polling","websocket","webtransport"],this._transportsByName=Wl),this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!1},e),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Il(this.opts.query)),Lr&&(this.opts.closeOnBeforeunload&&(this._beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this._beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this._offlineEventListener=()=>{this._onClose("transport close",{description:"network connection lost"})},Ss.push(this._offlineEventListener))),this.opts.withCredentials&&(this._cookieJar=void 0),this._open()}createTransport(t){const e=Object.assign({},this.opts.query);e.EIO=mc,e.transport=t,this.id&&(e.sid=this.id);const i=Object.assign({},this.opts,{query:e,socket:this,hostname:this.hostname,secure:this.secure,port:this.port},this.opts.transportOptions[t]);return new this._transportsByName[t](i)}_open(){if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}const t=this.opts.rememberUpgrade&&fn.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1?"websocket":this.transports[0];this.readyState="opening";const e=this.createTransport(t);e.open(),this.setTransport(e)}setTransport(t){this.transport&&this.transport.removeAllListeners(),this.transport=t,t.on("drain",this._onDrain.bind(this)).on("packet",this._onPacket.bind(this)).on("error",this._onError.bind(this)).on("close",e=>this._onClose("transport close",e))}_probe(t){let e=this.createTransport(t),i=!1;fn.priorWebsocketSuccess=!1;const s=()=>{i||(e.send([{type:"ping",data:"probe"}]),e.once("packet",f=>{if(!i)if(f.type==="pong"&&f.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",e),!e)return;fn.priorWebsocketSuccess=e.name==="websocket",this.transport.pause(()=>{i||this.readyState!=="closed"&&(u(),this.setTransport(e),e.send([{type:"upgrade"}]),this.emitReserved("upgrade",e),e=null,this.upgrading=!1,this.flush())})}else{const h=new Error("probe error");h.transport=e.name,this.emitReserved("upgradeError",h)}}))};function r(){i||(i=!0,u(),e.close(),e=null)}const a=f=>{const h=new Error("probe error: "+f);h.transport=e.name,r(),this.emitReserved("upgradeError",h)};function o(){a("transport closed")}function c(){a("socket closed")}function l(f){e&&f.name!==e.name&&r()}const u=()=>{e.removeListener("open",s),e.removeListener("error",a),e.removeListener("close",o),this.off("close",c),this.off("upgrading",l)};e.once("open",s),e.once("error",a),e.once("close",o),this.once("close",c),this.once("upgrading",l),this._upgrades.indexOf("webtransport")!==-1&&t!=="webtransport"?this.setTimeoutFn(()=>{i||e.open()},200):e.open()}onOpen(){if(this.readyState="open",fn.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade)for(let t=0;t<this._upgrades.length;t++)this._probe(this._upgrades[t])}_onPacket(t){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",t),this.emitReserved("heartbeat"),t.type){case"open":this.onHandshake(JSON.parse(t.data));break;case"ping":this._sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong"),this._resetPingTimeout();break;case"error":const e=new Error("server error");e.code=t.data,this._onError(e);break;case"message":this.emitReserved("data",t.data),this.emitReserved("message",t.data);break}}onHandshake(t){this.emitReserved("handshake",t),this.id=t.sid,this.transport.query.sid=t.sid,this._upgrades=this._filterUpgrades(t.upgrades),this._pingInterval=t.pingInterval,this._pingTimeout=t.pingTimeout,this._maxPayload=t.maxPayload,this.onOpen(),this.readyState!=="closed"&&this._resetPingTimeout()}_resetPingTimeout(){this.clearTimeoutFn(this._pingTimeoutTimer);const t=this._pingInterval+this._pingTimeout;this._pingTimeoutTime=Date.now()+t,this._pingTimeoutTimer=this.setTimeoutFn(()=>{this._onClose("ping timeout")},t),this.opts.autoUnref&&this._pingTimeoutTimer.unref()}_onDrain(){this.writeBuffer.splice(0,this._prevBufferLen),this._prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const t=this._getWritablePackets();this.transport.send(t),this._prevBufferLen=t.length,this.emitReserved("flush")}}_getWritablePackets(){if(!(this._maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let e=1;for(let i=0;i<this.writeBuffer.length;i++){const s=this.writeBuffer[i].data;if(s&&(e+=Pl(s)),i>0&&e>this._maxPayload)return this.writeBuffer.slice(0,i);e+=2}return this.writeBuffer}_hasPingExpired(){if(!this._pingTimeoutTime)return!0;const t=Date.now()>this._pingTimeoutTime;return t&&(this._pingTimeoutTime=0,ks(()=>{this._onClose("ping timeout")},this.setTimeoutFn)),t}write(t,e,i){return this._sendPacket("message",t,e,i),this}send(t,e,i){return this._sendPacket("message",t,e,i),this}_sendPacket(t,e,i,s){if(typeof e=="function"&&(s=e,e=void 0),typeof i=="function"&&(s=i,i=null),this.readyState==="closing"||this.readyState==="closed")return;i=i||{},i.compress=i.compress!==!1;const r={type:t,data:e,options:i};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),s&&this.once("flush",s),this.flush()}close(){const t=()=>{this._onClose("forced close"),this.transport.close()},e=()=>{this.off("upgrade",e),this.off("upgradeError",e),t()},i=()=>{this.once("upgrade",e),this.once("upgradeError",e)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?i():t()}):this.upgrading?i():t()),this}_onError(t){if(fn.priorWebsocketSuccess=!1,this.opts.tryAllTransports&&this.transports.length>1&&this.readyState==="opening")return this.transports.shift(),this._open();this.emitReserved("error",t),this._onClose("transport error",t)}_onClose(t,e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing"){if(this.clearTimeoutFn(this._pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),Lr&&(this._beforeunloadEventListener&&removeEventListener("beforeunload",this._beforeunloadEventListener,!1),this._offlineEventListener)){const i=Ss.indexOf(this._offlineEventListener);i!==-1&&Ss.splice(i,1)}this.readyState="closed",this.id=null,this.emitReserved("close",t,e),this.writeBuffer=[],this._prevBufferLen=0}}_filterUpgrades(t){const e=[];for(let i=0;i<t.length;i++)~this.transports.indexOf(t[i])&&e.push(t[i]);return e}};Mc.protocol=mc;function $l(n,t="",e){let i=n;e=e||typeof location<"u"&&location,n==null&&(n=e.protocol+"//"+e.host),typeof n=="string"&&(n.charAt(0)==="/"&&(n.charAt(1)==="/"?n=e.protocol+n:n=e.host+n),/^(https?|wss?):\/\//.test(n)||(typeof e<"u"?n=e.protocol+"//"+n:n="https://"+n),i=Pr(n)),i.port||(/^(http|ws)$/.test(i.protocol)?i.port="80":/^(http|ws)s$/.test(i.protocol)&&(i.port="443")),i.path=i.path||"/";const r=i.host.indexOf(":")!==-1?"["+i.host+"]":i.host;return i.id=i.protocol+"://"+r+":"+i.port+t,i.href=i.protocol+"://"+r+(e&&e.port===i.port?"":":"+i.port),i}const Zl=typeof ArrayBuffer=="function",Jl=n=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(n):n.buffer instanceof ArrayBuffer,Sc=Object.prototype.toString,Ql=typeof Blob=="function"||typeof Blob<"u"&&Sc.call(Blob)==="[object BlobConstructor]",jl=typeof File=="function"||typeof File<"u"&&Sc.call(File)==="[object FileConstructor]";function wa(n){return Zl&&(n instanceof ArrayBuffer||Jl(n))||Ql&&n instanceof Blob||jl&&n instanceof File}function Es(n,t){if(!n||typeof n!="object")return!1;if(Array.isArray(n)){for(let e=0,i=n.length;e<i;e++)if(Es(n[e]))return!0;return!1}if(wa(n))return!0;if(n.toJSON&&typeof n.toJSON=="function"&&arguments.length===1)return Es(n.toJSON(),!0);for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e)&&Es(n[e]))return!0;return!1}function th(n){const t=[],e=n.data,i=n;return i.data=bs(e,t),i.attachments=t.length,{packet:i,buffers:t}}function bs(n,t,e){if(!n)return n;if(wa(n)){const i={_placeholder:!0,num:t.length};return t.push(n),i}else if(Array.isArray(n)){const i=new Array(n.length);for(let s=0;s<n.length;s++)i[s]=bs(n[s],t);return i}else if(typeof n=="object"&&!(n instanceof Date)){if(n.toJSON&&typeof n.toJSON=="function"&&!e)return bs(n.toJSON(),t,!0);const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=bs(n[s],t));return i}return n}function eh(n,t){return n.data=Dr(n.data,t),delete n.attachments,n}function Dr(n,t){if(!n)return n;if(n&&n._placeholder===!0){if(typeof n.num=="number"&&n.num>=0&&n.num<t.length)return t[n.num];throw new Error("illegal attachments")}else if(Array.isArray(n))for(let e=0;e<n.length;e++)n[e]=Dr(n[e],t);else if(typeof n=="object")for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&(n[e]=Dr(n[e],t));return n}const ih=["connect","connect_error","disconnect","disconnecting","newListener","removeListener"];var Yt;(function(n){n[n.CONNECT=0]="CONNECT",n[n.DISCONNECT=1]="DISCONNECT",n[n.EVENT=2]="EVENT",n[n.ACK=3]="ACK",n[n.CONNECT_ERROR=4]="CONNECT_ERROR",n[n.BINARY_EVENT=5]="BINARY_EVENT",n[n.BINARY_ACK=6]="BINARY_ACK"})(Yt||(Yt={}));class nh{constructor(t){this.replacer=t}encode(t){return(t.type===Yt.EVENT||t.type===Yt.ACK)&&Es(t)?this.encodeAsBinary({type:t.type===Yt.EVENT?Yt.BINARY_EVENT:Yt.BINARY_ACK,nsp:t.nsp,data:t.data,id:t.id}):[this.encodeAsString(t)]}encodeAsString(t){let e=""+t.type;return(t.type===Yt.BINARY_EVENT||t.type===Yt.BINARY_ACK)&&(e+=t.attachments+"-"),t.nsp&&t.nsp!=="/"&&(e+=t.nsp+","),t.id!=null&&(e+=t.id),t.data!=null&&(e+=JSON.stringify(t.data,this.replacer)),e}encodeAsBinary(t){const e=th(t),i=this.encodeAsString(e.packet),s=e.buffers;return s.unshift(i),s}}class Ta extends ve{constructor(t){super(),this.opts=Object.assign({reviver:void 0,maxAttachments:10},typeof t=="function"?{reviver:t}:t)}add(t){let e;if(typeof t=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");e=this.decodeString(t);const i=e.type===Yt.BINARY_EVENT;i||e.type===Yt.BINARY_ACK?(e.type=i?Yt.EVENT:Yt.ACK,this.reconstructor=new sh(e)):super.emitReserved("decoded",e)}else if(wa(t)||t.base64)if(this.reconstructor)e=this.reconstructor.takeBinaryData(t),e&&(this.reconstructor=null,super.emitReserved("decoded",e));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+t)}decodeString(t){let e=0;const i={type:Number(t.charAt(0))};if(Yt[i.type]===void 0)throw new Error("unknown packet type "+i.type);if(i.type===Yt.BINARY_EVENT||i.type===Yt.BINARY_ACK){const r=e+1;for(;t.charAt(++e)!=="-"&&e!=t.length;);const a=t.substring(r,e);if(a!=Number(a)||t.charAt(e)!=="-")throw new Error("Illegal attachments");const o=Number(a);if(!rh(o)||o<1)throw new Error("Illegal attachments");if(o>this.opts.maxAttachments)throw new Error("too many attachments");i.attachments=o}if(t.charAt(e+1)==="/"){const r=e+1;for(;++e&&!(t.charAt(e)===","||e===t.length););i.nsp=t.substring(r,e)}else i.nsp="/";const s=t.charAt(e+1);if(s!==""&&Number(s)==s){const r=e+1;for(;++e;){const a=t.charAt(e);if(a==null||Number(a)!=a){--e;break}if(e===t.length)break}i.id=Number(t.substring(r,e+1))}if(t.charAt(++e)){const r=this.tryParse(t.substr(e));if(Ta.isPayloadValid(i.type,r))i.data=r;else throw new Error("invalid payload")}return i}tryParse(t){try{return JSON.parse(t,this.opts.reviver)}catch{return!1}}static isPayloadValid(t,e){switch(t){case Yt.CONNECT:return ho(e);case Yt.DISCONNECT:return e===void 0;case Yt.CONNECT_ERROR:return typeof e=="string"||ho(e);case Yt.EVENT:case Yt.BINARY_EVENT:return Array.isArray(e)&&(typeof e[0]=="number"||typeof e[0]=="string"&&ih.indexOf(e[0])===-1);case Yt.ACK:case Yt.BINARY_ACK:return Array.isArray(e)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class sh{constructor(t){this.packet=t,this.buffers=[],this.reconPack=t}takeBinaryData(t){if(this.buffers.push(t),this.buffers.length===this.reconPack.attachments){const e=eh(this.reconPack,this.buffers);return this.finishedReconstruction(),e}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const rh=Number.isInteger||function(n){return typeof n=="number"&&isFinite(n)&&Math.floor(n)===n};function ho(n){return Object.prototype.toString.call(n)==="[object Object]"}const ah=Object.freeze(Object.defineProperty({__proto__:null,Decoder:Ta,Encoder:nh,get PacketType(){return Yt}},Symbol.toStringTag,{value:"Module"}));function Qe(n,t,e){return n.on(t,e),function(){n.off(t,e)}}const oh=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class Ec extends ve{constructor(t,e,i){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=t,this.nsp=e,i&&i.auth&&(this.auth=i.auth),this._opts=Object.assign({},i),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const t=this.io;this.subs=[Qe(t,"open",this.onopen.bind(this)),Qe(t,"packet",this.onpacket.bind(this)),Qe(t,"error",this.onerror.bind(this)),Qe(t,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...t){return t.unshift("message"),this.emit.apply(this,t),this}emit(t,...e){var i,s,r;if(oh.hasOwnProperty(t))throw new Error('"'+t.toString()+'" is a reserved event name');if(e.unshift(t),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(e),this;const a={type:Yt.EVENT,data:e};if(a.options={},a.options.compress=this.flags.compress!==!1,typeof e[e.length-1]=="function"){const u=this.ids++,f=e.pop();this._registerAckCallback(u,f),a.id=u}const o=(s=(i=this.io.engine)===null||i===void 0?void 0:i.transport)===null||s===void 0?void 0:s.writable,c=this.connected&&!(!((r=this.io.engine)===null||r===void 0)&&r._hasPingExpired());return this.flags.volatile&&!o||(c?(this.notifyOutgoingListeners(a),this.packet(a)):this.sendBuffer.push(a)),this.flags={},this}_registerAckCallback(t,e){var i;const s=(i=this.flags.timeout)!==null&&i!==void 0?i:this._opts.ackTimeout;if(s===void 0){this.acks[t]=e;return}const r=this.io.setTimeoutFn(()=>{delete this.acks[t];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===t&&this.sendBuffer.splice(o,1);e.call(this,new Error("operation has timed out"))},s),a=(...o)=>{this.io.clearTimeoutFn(r),e.apply(this,o)};a.withError=!0,this.acks[t]=a}emitWithAck(t,...e){return new Promise((i,s)=>{const r=(a,o)=>a?s(a):i(o);r.withError=!0,e.push(r),this.emit(t,...e)})}_addToQueue(t){let e;typeof t[t.length-1]=="function"&&(e=t.pop());const i={id:this._queueSeq++,tryCount:0,pending:!1,args:t,flags:Object.assign({fromQueue:!0},this.flags)};t.push((s,...r)=>(this._queue[0],s!==null?i.tryCount>this._opts.retries&&(this._queue.shift(),e&&e(s)):(this._queue.shift(),e&&e(null,...r)),i.pending=!1,this._drainQueue())),this._queue.push(i),this._drainQueue()}_drainQueue(t=!1){if(!this.connected||this._queue.length===0)return;const e=this._queue[0];e.pending&&!t||(e.pending=!0,e.tryCount++,this.flags=e.flags,this.emit.apply(this,e.args))}packet(t){t.nsp=this.nsp,this.io._packet(t)}onopen(){typeof this.auth=="function"?this.auth(t=>{this._sendConnectPacket(t)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(t){this.packet({type:Yt.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},t):t})}onerror(t){this.connected||this.emitReserved("connect_error",t)}onclose(t,e){this.connected=!1,delete this.id,this.emitReserved("disconnect",t,e),this._clearAcks()}_clearAcks(){Object.keys(this.acks).forEach(t=>{if(!this.sendBuffer.some(i=>String(i.id)===t)){const i=this.acks[t];delete this.acks[t],i.withError&&i.call(this,new Error("socket has been disconnected"))}})}onpacket(t){if(t.nsp===this.nsp)switch(t.type){case Yt.CONNECT:t.data&&t.data.sid?this.onconnect(t.data.sid,t.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case Yt.EVENT:case Yt.BINARY_EVENT:this.onevent(t);break;case Yt.ACK:case Yt.BINARY_ACK:this.onack(t);break;case Yt.DISCONNECT:this.ondisconnect();break;case Yt.CONNECT_ERROR:this.destroy();const i=new Error(t.data.message);i.data=t.data.data,this.emitReserved("connect_error",i);break}}onevent(t){const e=t.data||[];t.id!=null&&e.push(this.ack(t.id)),this.connected?this.emitEvent(e):this.receiveBuffer.push(Object.freeze(e))}emitEvent(t){if(this._anyListeners&&this._anyListeners.length){const e=this._anyListeners.slice();for(const i of e)i.apply(this,t)}super.emit.apply(this,t),this._pid&&t.length&&typeof t[t.length-1]=="string"&&(this._lastOffset=t[t.length-1])}ack(t){const e=this;let i=!1;return function(...s){i||(i=!0,e.packet({type:Yt.ACK,id:t,data:s}))}}onack(t){const e=this.acks[t.id];typeof e=="function"&&(delete this.acks[t.id],e.withError&&t.data.unshift(null),e.apply(this,t.data))}onconnect(t,e){this.id=t,this.recovered=e&&this._pid===e,this._pid=e,this.connected=!0,this.emitBuffered(),this._drainQueue(!0),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(t=>this.emitEvent(t)),this.receiveBuffer=[],this.sendBuffer.forEach(t=>{this.notifyOutgoingListeners(t),this.packet(t)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(t=>t()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:Yt.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(t){return this.flags.compress=t,this}get volatile(){return this.flags.volatile=!0,this}timeout(t){return this.flags.timeout=t,this}onAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(t),this}prependAny(t){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(t),this}offAny(t){if(!this._anyListeners)return this;if(t){const e=this._anyListeners;for(let i=0;i<e.length;i++)if(t===e[i])return e.splice(i,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(t),this}prependAnyOutgoing(t){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(t),this}offAnyOutgoing(t){if(!this._anyOutgoingListeners)return this;if(t){const e=this._anyOutgoingListeners;for(let i=0;i<e.length;i++)if(t===e[i])return e.splice(i,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(t){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const e=this._anyOutgoingListeners.slice();for(const i of e)i.apply(this,t.data)}}}function Sn(n){n=n||{},this.ms=n.min||100,this.max=n.max||1e4,this.factor=n.factor||2,this.jitter=n.jitter>0&&n.jitter<=1?n.jitter:0,this.attempts=0}Sn.prototype.duration=function(){var n=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var t=Math.random(),e=Math.floor(t*this.jitter*n);n=(Math.floor(t*10)&1)==0?n-e:n+e}return Math.min(n,this.max)|0};Sn.prototype.reset=function(){this.attempts=0};Sn.prototype.setMin=function(n){this.ms=n};Sn.prototype.setMax=function(n){this.max=n};Sn.prototype.setJitter=function(n){this.jitter=n};class Ir extends ve{constructor(t,e){var i;super(),this.nsps={},this.subs=[],t&&typeof t=="object"&&(e=t,t=void 0),e=e||{},e.path=e.path||"/socket.io",this.opts=e,Gs(this,e),this.reconnection(e.reconnection!==!1),this.reconnectionAttempts(e.reconnectionAttempts||1/0),this.reconnectionDelay(e.reconnectionDelay||1e3),this.reconnectionDelayMax(e.reconnectionDelayMax||5e3),this.randomizationFactor((i=e.randomizationFactor)!==null&&i!==void 0?i:.5),this.backoff=new Sn({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(e.timeout==null?2e4:e.timeout),this._readyState="closed",this.uri=t;const s=e.parser||ah;this.encoder=new s.Encoder,this.decoder=new s.Decoder,this._autoConnect=e.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(t){return arguments.length?(this._reconnection=!!t,t||(this.skipReconnect=!0),this):this._reconnection}reconnectionAttempts(t){return t===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=t,this)}reconnectionDelay(t){var e;return t===void 0?this._reconnectionDelay:(this._reconnectionDelay=t,(e=this.backoff)===null||e===void 0||e.setMin(t),this)}randomizationFactor(t){var e;return t===void 0?this._randomizationFactor:(this._randomizationFactor=t,(e=this.backoff)===null||e===void 0||e.setJitter(t),this)}reconnectionDelayMax(t){var e;return t===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=t,(e=this.backoff)===null||e===void 0||e.setMax(t),this)}timeout(t){return arguments.length?(this._timeout=t,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(t){if(~this._readyState.indexOf("open"))return this;this.engine=new Mc(this.uri,this.opts);const e=this.engine,i=this;this._readyState="opening",this.skipReconnect=!1;const s=Qe(e,"open",function(){i.onopen(),t&&t()}),r=o=>{this.cleanup(),this._readyState="closed",this.emitReserved("error",o),t?t(o):this.maybeReconnectOnOpen()},a=Qe(e,"error",r);if(this._timeout!==!1){const o=this._timeout,c=this.setTimeoutFn(()=>{s(),r(new Error("timeout")),e.close()},o);this.opts.autoUnref&&c.unref(),this.subs.push(()=>{this.clearTimeoutFn(c)})}return this.subs.push(s),this.subs.push(a),this}connect(t){return this.open(t)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const t=this.engine;this.subs.push(Qe(t,"ping",this.onping.bind(this)),Qe(t,"data",this.ondata.bind(this)),Qe(t,"error",this.onerror.bind(this)),Qe(t,"close",this.onclose.bind(this)),Qe(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(t){try{this.decoder.add(t)}catch(e){this.onclose("parse error",e)}}ondecoded(t){ks(()=>{this.emitReserved("packet",t)},this.setTimeoutFn)}onerror(t){this.emitReserved("error",t)}socket(t,e){let i=this.nsps[t];return i?this._autoConnect&&!i.active&&i.connect():(i=new Ec(this,t,e),this.nsps[t]=i),i}_destroy(t){const e=Object.keys(this.nsps);for(const i of e)if(this.nsps[i].active)return;this._close()}_packet(t){const e=this.encoder.encode(t);for(let i=0;i<e.length;i++)this.engine.write(e[i],t.options)}cleanup(){this.subs.forEach(t=>t()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")}disconnect(){return this._close()}onclose(t,e){var i;this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",t,e),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const t=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const e=this.backoff.duration();this._reconnecting=!0;const i=this.setTimeoutFn(()=>{t.skipReconnect||(this.emitReserved("reconnect_attempt",t.backoff.attempts),!t.skipReconnect&&t.open(s=>{s?(t._reconnecting=!1,t.reconnect(),this.emitReserved("reconnect_error",s)):t.onreconnect()}))},e);this.opts.autoUnref&&i.unref(),this.subs.push(()=>{this.clearTimeoutFn(i)})}}onreconnect(){const t=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",t)}}const Tn={};function ws(n,t){typeof n=="object"&&(t=n,n=void 0),t=t||{};const e=$l(n,t.path||"/socket.io"),i=e.source,s=e.id,r=e.path,a=Tn[s]&&r in Tn[s].nsps,o=t.forceNew||t["force new connection"]||t.multiplex===!1||a;let c;return o?c=new Ir(i,t):(Tn[s]||(Tn[s]=new Ir(i,t)),c=Tn[s]),e.query&&!t.query&&(t.query=e.queryKey),c.socket(e.path,t)}Object.assign(ws,{Manager:Ir,Socket:Ec,io:ws,connect:ws});class ch{constructor(t){this.gameEngine=t,this.socket=null,this.roomCode=null,this.playerNum=null,this.isHost=!1,this.isMultiplayer=!1,this.connected=!1,this.reconnecting=!1,this.ping=0,this.lastSyncTime=0,this.syncInterval=1e3/25,this.statusBadgeEl=document.getElementById("network-badge"),this.netLabelEl=document.getElementById("net-label"),this.netDotEl=this.statusBadgeEl?this.statusBadgeEl.querySelector(".net-dot"):null,this.reconnectBannerEl=document.getElementById("reconnect-banner")}init(){const t=window.location.port==="5173"?"http://localhost:3000":window.location.origin;this.socket=ws(t,{reconnection:!0,reconnectionAttempts:20,reconnectionDelay:1e3,reconnectionDelayMax:5e3,timeout:1e4,transports:["websocket","polling"]}),this.setupSocketEvents(),this.startPingHeartbeat()}setupSocketEvents(){this.socket.on("connect",()=>{this.connected=!0,this.reconnecting=!1,this.updateStatusBadge("online",this.isMultiplayer?"Connected":"Solo"),this.reconnectBannerEl&&this.reconnectBannerEl.classList.add("hidden"),console.log("[Net] Connected to multiplayer server.")}),this.socket.on("disconnect",t=>{this.connected=!1,this.reconnecting=!0,this.updateStatusBadge("reconnecting","Reconnecting..."),console.warn(`[Net] Disconnected: ${t}`)}),this.socket.on("connect_error",()=>{this.updateStatusBadge("offline","Offline")}),this.socket.on("partner-sync",t=>{if(this.gameEngine&&this.gameEngine.partner){const e=this.gameEngine.partner;e.targetX=t.x,e.targetY=t.y,e.vx=t.vx||0,e.vy=t.vy||0,e.targetFacing=t.facing,e.targetState=t.state,e.hp=t.hp}}),this.socket.on("partner-attack",t=>{if(this.gameEngine&&this.gameEngine.partner){const e=this.gameEngine.partner;e.facing=t.facing,e.performAttack(this.gameEngine.audio,this.gameEngine.particles)}}),this.socket.on("switch-updated",({switchId:t,state:e})=>{this.gameEngine&&this.gameEngine.applySwitchSync(t,e)}),this.socket.on("door-updated",({doorId:t,open:e})=>{this.gameEngine&&this.gameEngine.applyDoorSync(t,e)}),this.socket.on("chest-opened",({chestId:t,reward:e})=>{this.gameEngine&&this.gameEngine.applyChestSync(t,e)}),this.socket.on("checkpoint-activated",({checkpointId:t,x:e,y:i})=>{this.gameEngine&&this.gameEngine.applyCheckpointSync(t,e,i)}),this.socket.on("enemy-damage-sync",t=>{this.gameEngine&&this.gameEngine.applyEnemyDamageSync(t)}),this.socket.on("boss-damage-sync",t=>{this.gameEngine&&this.gameEngine.applyBossDamageSync(t)}),this.socket.on("next-level",({level:t})=>{this.gameEngine&&this.gameEngine.loadLevel(t,!1)}),this.socket.on("partner-disconnected",t=>{this.reconnectBannerEl&&(this.reconnectBannerEl.classList.remove("hidden"),document.getElementById("reconnect-title").textContent=`${t.name||"Partner"} Disconnected`,document.getElementById("reconnect-subtitle").textContent="Waiting for partner to reconnect... (You can continue playing)")}),this.socket.on("partner-reconnected",t=>{this.reconnectBannerEl&&this.reconnectBannerEl.classList.add("hidden"),this.gameEngine&&this.gameEngine.showToast(`✨ ${t.name||"Partner"} has reconnected!`)})}startPingHeartbeat(){setInterval(()=>{if(this.socket&&this.connected){const t=Date.now();this.socket.emit("latency-ping",t,()=>{this.ping=Date.now()-t,this.isMultiplayer&&this.updateStatusBadge("online",`${this.ping}ms`)})}},4e3)}updateStatusBadge(t,e){this.netDotEl&&(this.netDotEl.className=`net-dot ${t}`),this.netLabelEl&&(this.netLabelEl.textContent=e)}createRoom(t,e,i){this.isMultiplayer=!0,this.isHost=!0,this.socket.emit("create-room",{playerName:t,characterClass:e},s=>{s&&s.success&&(this.roomCode=s.roomCode,this.playerNum=1),i&&i(s)})}joinRoom(t,e,i,s){this.isMultiplayer=!0,this.isHost=!1,this.socket.emit("join-room",{code:t,playerName:e,characterClass:i},r=>{r&&r.success&&(this.roomCode=r.roomCode,this.playerNum=r.playerNum),s&&s(r)})}sendClassSelection(t){this.socket&&this.isMultiplayer&&this.socket.emit("select-class",t)}sendReadyToggle(t){this.socket&&this.isMultiplayer&&this.socket.emit("toggle-ready",t)}sendStartGame(){this.socket&&this.isMultiplayer&&this.isHost&&this.socket.emit("start-game")}sendPlayerSync(t){if(!this.socket||!this.isMultiplayer||!this.connected)return;const e=performance.now();e-this.lastSyncTime<this.syncInterval||(this.lastSyncTime=e,this.socket.emit("player-sync",{x:Math.round(t.x),y:Math.round(t.y),vx:Math.round(t.vx),vy:Math.round(t.vy),facing:t.facing,state:t.state,hp:t.hp}))}sendPlayerAttack(t){this.socket&&this.isMultiplayer&&this.socket.emit("player-attack",t)}sendSwitchTrigger(t,e){this.socket&&this.isMultiplayer&&this.socket.emit("trigger-switch",{switchId:t,state:e})}sendDoorTrigger(t,e){this.socket&&this.isMultiplayer&&this.socket.emit("trigger-door",{doorId:t,open:e})}sendChestOpened(t,e){this.socket&&this.isMultiplayer&&this.socket.emit("open-chest",{chestId:t,reward:e})}sendCheckpointActivated(t,e,i){this.socket&&this.isMultiplayer&&this.socket.emit("activate-checkpoint",{checkpointId:t,x:e,y:i})}sendEnemyDamage(t,e,i,s,r,a){this.socket&&this.isMultiplayer&&this.socket.emit("enemy-damage",{enemyId:t,damage:e,newHp:i,isDead:s,x:r,y:a})}sendBossDamage(t,e,i,s){this.socket&&this.isMultiplayer&&this.socket.emit("boss-damage",{damage:t,newHp:e,phase:i,isDead:s})}sendLevelTransition(t){this.socket&&this.isMultiplayer&&this.socket.emit("level-transition",{nextLevel:t})}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="186",lh=0,uo=1,hh=2,Ts=1,bc=2,Un=3,Yi=0,Oe=1,je=2,Si=0,On=1,fo=2,po=3,mo=4,uh=5,pn=100,dh=101,fh=102,ph=103,mh=104,gh=200,_h=201,xh=202,vh=203,wc=204,Tc=205,yh=206,Mh=207,Sh=208,Eh=209,bh=210,wh=211,Th=212,Ah=213,Rh=214,Nr=0,Ur=1,Fr=2,Gn=3,Or=4,Br=5,kr=6,Gr=7,Ac=0,Ch=1,Ph=2,ui=0,Rc=1,Cc=2,Pc=3,Lc=4,Dc=5,Ic=6,Nc=7,Uc=300,Ki=301,yn=302,Qs=303,js=304,zs=306,zr=1e3,Mi=1001,Hr=1002,we=1003,Lh=1004,jn=1005,Le=1006,tr=1007,Xi=1008,Ve=1009,Fc=1010,Oc=1011,zn=1012,Ra=1013,fi=1014,ci=1015,pi=1016,Ca=1017,Pa=1018,Hn=1020,Bc=35902,kc=35899,Gc=1021,zc=1022,ei=1023,wi=1026,qi=1027,Hc=1028,La=1029,$i=1030,Da=1031,Ia=1033,As=33776,Rs=33777,Cs=33778,Ps=33779,Vr=35840,Wr=35841,Xr=35842,qr=35843,Yr=36196,Kr=37492,$r=37496,Zr=37488,Jr=37489,Ds=37490,Qr=37491,jr=37808,ta=37809,ea=37810,ia=37811,na=37812,sa=37813,ra=37814,aa=37815,oa=37816,ca=37817,la=37818,ha=37819,ua=37820,da=37821,fa=36492,pa=36494,ma=36495,ga=36283,_a=36284,Is=36285,xa=36286,Dh=3200,va=0,Ih=1,Ui="",qe="srgb",Ns="srgb-linear",Us="linear",se="srgb",er=7680,Nh=519,Uh=512,Fh=513,Oh=514,Na=515,Bh=516,kh=517,Ua=518,Gh=519,zh=35044,go="300 es",li=2e3,Vn=2001;function Hh(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Fs(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Vh(){const n=Fs("canvas");return n.style.display="block",n}const _o={};function xo(...n){const t="THREE."+n.shift();console.log(t,...n)}function Vc(n){const t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Nt(...n){n=Vc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function jt(...n){n=Vc(n);const t="THREE."+n.shift();{const e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function _n(...n){const t=n.join(" ");t in _o||(_o[t]=!0,Nt(...n))}function Wh(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Xh={[Nr]:Ur,[Fr]:kr,[Or]:Gr,[Gn]:Br,[Ur]:Nr,[kr]:Fr,[Gr]:Or,[Br]:Gn};class Zi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vo=1234567;const Bn=Math.PI/180,Wn=180/Math.PI;function En(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]).toLowerCase()}function qt(n,t,e){return Math.max(t,Math.min(e,n))}function Fa(n,t){return(n%t+t)%t}function qh(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Yh(n,t,e){return n!==t?(e-n)/(t-n):0}function kn(n,t,e){return(1-e)*n+e*t}function Kh(n,t,e,i){return kn(n,t,1-Math.exp(-e*i))}function $h(n,t=1){return t-Math.abs(Fa(n,t*2)-t)}function Zh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Jh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Qh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function jh(n,t){return n+Math.random()*(t-n)}function tu(n){return n*(.5-Math.random())}function eu(n){n!==void 0&&(vo=n);let t=vo+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function iu(n){return n*Bn}function nu(n){return n*Wn}function su(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function ru(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function au(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ou(n,t,e,i,s){const r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+i)/2),u=a((t+i)/2),f=r((t-i)/2),h=a((t-i)/2),g=r((i-t)/2),v=a((i-t)/2);switch(s){case"XYX":n.set(o*u,c*f,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*f,o*l);break;case"ZXZ":n.set(c*f,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*v,c*g,o*l);break;case"YXY":n.set(c*g,o*u,c*v,o*l);break;case"ZYZ":n.set(c*v,c*g,o*u,o*l);break;default:Nt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function mn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Fi={DEG2RAD:Bn,RAD2DEG:Wn,generateUUID:En,clamp:qt,euclideanModulo:Fa,mapLinear:qh,inverseLerp:Yh,lerp:kn,damp:Kh,pingpong:$h,smoothstep:Zh,smootherstep:Jh,randInt:Qh,randFloat:jh,randFloatSpread:tu,seededRandom:eu,degToRad:iu,radToDeg:nu,isPowerOfTwo:su,ceilPowerOfTwo:ru,floorPowerOfTwo:au,setQuaternionFromProperEuler:ou,normalize:Ne,denormalize:mn},Xa=class Xa{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Xa.prototype.isVector2=!0;let Ht=Xa;class bn{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],f=i[s+3],h=r[a+0],g=r[a+1],v=r[a+2],S=r[a+3];if(f!==S||c!==h||l!==g||u!==v){let m=c*h+l*g+u*v+f*S;m<0&&(h=-h,g=-g,v=-v,S=-S,m=-m);let d=1-o;if(m<.9995){const M=Math.acos(m),R=Math.sin(M);d=Math.sin(d*M)/R,o=Math.sin(o*M)/R,c=c*d+h*o,l=l*d+g*o,u=u*d+v*o,f=f*d+S*o}else{c=c*d+h*o,l=l*d+g*o,u=u*d+v*o,f=f*d+S*o;const M=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=M,l*=M,u*=M,f*=M}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=f}static multiplyQuaternionsFlat(t,e,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],f=r[a],h=r[a+1],g=r[a+2],v=r[a+3];return t[e]=o*v+u*f+c*g-l*h,t[e+1]=c*v+u*h+l*f-o*g,t[e+2]=l*v+u*g+o*h-c*f,t[e+3]=u*v-o*f-c*h-l*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),f=o(r/2),h=c(i/2),g=c(s/2),v=c(r/2);switch(a){case"XYZ":this._x=h*u*f+l*g*v,this._y=l*g*f-h*u*v,this._z=l*u*v+h*g*f,this._w=l*u*f-h*g*v;break;case"YXZ":this._x=h*u*f+l*g*v,this._y=l*g*f-h*u*v,this._z=l*u*v-h*g*f,this._w=l*u*f+h*g*v;break;case"ZXY":this._x=h*u*f-l*g*v,this._y=l*g*f+h*u*v,this._z=l*u*v+h*g*f,this._w=l*u*f-h*g*v;break;case"ZYX":this._x=h*u*f-l*g*v,this._y=l*g*f+h*u*v,this._z=l*u*v-h*g*f,this._w=l*u*f+h*g*v;break;case"YZX":this._x=h*u*f+l*g*v,this._y=l*g*f+h*u*v,this._z=l*u*v-h*g*f,this._w=l*u*f-h*g*v;break;case"XZY":this._x=h*u*f-l*g*v,this._y=l*g*f-h*u*v,this._z=l*u*v+h*g*f,this._w=l*u*f+h*g*v;break;default:Nt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],f=e[10],h=i+o+f;if(h>0){const g=.5/Math.sqrt(h+1);this._w=.25/g,this._x=(u-c)*g,this._y=(r-l)*g,this._z=(a-s)*g}else if(i>o&&i>f){const g=2*Math.sqrt(1+i-o-f);this._w=(u-c)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+l)/g}else if(o>f){const g=2*Math.sqrt(1+o-i-f);this._w=(r-l)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(c+u)/g}else{const g=2*Math.sqrt(1+f-i-o);this._w=(a-s)/g,this._x=(r+l)/g,this._y=(c+u)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,e=Math.sin(e*l)/u,this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+s*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const qa=class qa{constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),u=2*(o*e-r*s),f=2*(r*i-a*e);return this.x=e+c*l+a*f-o*u,this.y=i+c*u+o*l-r*f,this.z=s+c*f+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ir.copy(this).projectOnVector(t),this.sub(ir)}reflect(t){return this.sub(ir.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};qa.prototype.isVector3=!0;let O=qa;const ir=new O,yo=new bn,Ya=class Ya{constructor(t,e,i,s,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l)}set(t,e,i,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],g=i[5],v=i[8],S=s[0],m=s[3],d=s[6],M=s[1],R=s[4],y=s[7],E=s[2],w=s[5],A=s[8];return r[0]=a*S+o*M+c*E,r[3]=a*m+o*R+c*w,r[6]=a*d+o*y+c*A,r[1]=l*S+u*M+f*E,r[4]=l*m+u*R+f*w,r[7]=l*d+u*y+f*A,r[2]=h*S+g*M+v*E,r[5]=h*m+g*R+v*w,r[8]=h*d+g*y+v*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*r,g=l*r-a*c,v=e*f+i*h+s*g;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/v;return t[0]=f*S,t[1]=(s*l-u*i)*S,t[2]=(o*i-s*a)*S,t[3]=h*S,t[4]=(u*e-s*c)*S,t[5]=(s*r-o*e)*S,t[6]=g*S,t[7]=(i*c-l*e)*S,t[8]=(a*e-i*r)*S,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return _n("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(nr.makeScale(t,e)),this}rotate(t){return _n("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(nr.makeRotation(-t)),this}translate(t,e){return _n("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ya.prototype.isMatrix3=!0;let Ut=Ya;const nr=new Ut,Mo=new Ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),So=new Ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cu(){const n={enabled:!0,workingColorSpace:Ns,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===se&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===se&&(s.r=xn(s.r),s.g=xn(s.g),s.b=xn(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ui?Us:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _n("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _n("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ns]:{primaries:t,whitePoint:i,transfer:Us,toXYZ:Mo,fromXYZ:So,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:qe},outputColorSpaceConfig:{drawingBufferColorSpace:qe}},[qe]:{primaries:t,whitePoint:i,transfer:se,toXYZ:Mo,fromXYZ:So,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:qe}}}),n}const Kt=cu();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function xn(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ji;class lu{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ji===void 0&&(ji=Fs("canvas")),ji.width=t.width,ji.height=t.height;const s=ji.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ji}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Fs("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Nt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let hu=0;class Oa{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=En(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(sr(s[a].image)):r.push(sr(s[a]))}else r=sr(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function sr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?lu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Nt("Texture: Unable to serialize Texture."),{})}let uu=0;const rr=new O;class Fe extends Zi{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,i=Mi,s=Mi,r=Le,a=Xi,o=ei,c=Ve,l=Fe.DEFAULT_ANISOTROPY,u=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=En(),this.name="",this.source=new Oa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ht(0,0),this.repeat=new Ht(1,1),this.center=new Ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rr).x}get height(){return this.source.getSize(rr).y}get depth(){return this.source.getSize(rr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Nt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Uc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zr:t.x=t.x-Math.floor(t.x);break;case Mi:t.x=t.x<0?0:1;break;case Hr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zr:t.y=t.y-Math.floor(t.y);break;case Mi:t.y=t.y<0?0:1;break;case Hr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=Uc;Fe.DEFAULT_ANISOTROPY=1;const Ka=class Ka{constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],g=c[5],v=c[9],S=c[2],m=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-S)<.01&&Math.abs(v-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+S)<.1&&Math.abs(v+m)<.1&&Math.abs(l+g+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const R=(l+1)/2,y=(g+1)/2,E=(d+1)/2,w=(u+h)/4,A=(f+S)/4,_=(v+m)/4;return R>y&&R>E?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=w/i,r=A/i):y>E?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=w/s,r=_/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=A/r,s=_/r),this.set(i,s,r,e),this}let M=Math.sqrt((m-v)*(m-v)+(f-S)*(f-S)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(m-v)/M,this.y=(f-S)/M,this.z=(h-u)/M,this.w=Math.acos((l+g+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ka.prototype.isVector4=!0;let fe=Ka;class du extends Zi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const s={width:t,height:e,depth:i.depth},r=new Fe(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Oa(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends du{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Wc extends Fe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=we,this.minFilter=we,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class fu extends Fe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=we,this.minFilter=we,this.wrapR=Mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const Bs=class Bs{constructor(t,e,i,s,r,a,o,c,l,u,f,h,g,v,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,c,l,u,f,h,g,v,S,m)}set(t,e,i,s,r,a,o,c,l,u,f,h,g,v,S,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=g,d[7]=v,d[11]=S,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Bs().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,i=t.elements,s=1/tn.setFromMatrixColumn(t,0).length(),r=1/tn.setFromMatrixColumn(t,1).length(),a=1/tn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const h=a*u,g=a*f,v=o*u,S=o*f;e[0]=c*u,e[4]=-c*f,e[8]=l,e[1]=g+v*l,e[5]=h-S*l,e[9]=-o*c,e[2]=S-h*l,e[6]=v+g*l,e[10]=a*c}else if(t.order==="YXZ"){const h=c*u,g=c*f,v=l*u,S=l*f;e[0]=h+S*o,e[4]=v*o-g,e[8]=a*l,e[1]=a*f,e[5]=a*u,e[9]=-o,e[2]=g*o-v,e[6]=S+h*o,e[10]=a*c}else if(t.order==="ZXY"){const h=c*u,g=c*f,v=l*u,S=l*f;e[0]=h-S*o,e[4]=-a*f,e[8]=v+g*o,e[1]=g+v*o,e[5]=a*u,e[9]=S-h*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const h=a*u,g=a*f,v=o*u,S=o*f;e[0]=c*u,e[4]=v*l-g,e[8]=h*l+S,e[1]=c*f,e[5]=S*l+h,e[9]=g*l-v,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const h=a*c,g=a*l,v=o*c,S=o*l;e[0]=c*u,e[4]=S-h*f,e[8]=v*f+g,e[1]=f,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=g*f+v,e[10]=h-S*f}else if(t.order==="XZY"){const h=a*c,g=a*l,v=o*c,S=o*l;e[0]=c*u,e[4]=-f,e[8]=l*u,e[1]=h*f+S,e[5]=a*u,e[9]=g*f-v,e[2]=v*f-g,e[6]=o*u,e[10]=S*f+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(pu,t,mu)}lookAt(t,e,i){const s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Ci.crossVectors(i,Ge),Ci.lengthSq()===0&&(Math.abs(i.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Ci.crossVectors(i,Ge)),Ci.normalize(),ts.crossVectors(Ge,Ci),s[0]=Ci.x,s[4]=ts.x,s[8]=Ge.x,s[1]=Ci.y,s[5]=ts.y,s[9]=Ge.y,s[2]=Ci.z,s[6]=ts.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],g=i[13],v=i[2],S=i[6],m=i[10],d=i[14],M=i[3],R=i[7],y=i[11],E=i[15],w=s[0],A=s[4],_=s[8],b=s[12],C=s[1],I=s[5],U=s[9],z=s[13],N=s[2],B=s[6],$=s[10],W=s[14],it=s[3],X=s[7],j=s[11],tt=s[15];return r[0]=a*w+o*C+c*N+l*it,r[4]=a*A+o*I+c*B+l*X,r[8]=a*_+o*U+c*$+l*j,r[12]=a*b+o*z+c*W+l*tt,r[1]=u*w+f*C+h*N+g*it,r[5]=u*A+f*I+h*B+g*X,r[9]=u*_+f*U+h*$+g*j,r[13]=u*b+f*z+h*W+g*tt,r[2]=v*w+S*C+m*N+d*it,r[6]=v*A+S*I+m*B+d*X,r[10]=v*_+S*U+m*$+d*j,r[14]=v*b+S*z+m*W+d*tt,r[3]=M*w+R*C+y*N+E*it,r[7]=M*A+R*I+y*B+E*X,r[11]=M*_+R*U+y*$+E*j,r[15]=M*b+R*z+y*W+E*tt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],g=t[14],v=t[3],S=t[7],m=t[11],d=t[15],M=c*g-l*h,R=o*g-l*f,y=o*h-c*f,E=a*g-l*u,w=a*h-c*u,A=a*f-o*u;return e*(S*M-m*R+d*y)-i*(v*M-m*E+d*w)+s*(v*R-S*E+d*A)-r*(v*y-S*w+m*A)}determinantAffine(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],u=t[10];return e*(a*u-o*l)-i*(r*u-o*c)+s*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],g=t[11],v=t[12],S=t[13],m=t[14],d=t[15],M=e*o-i*a,R=e*c-s*a,y=e*l-r*a,E=i*c-s*o,w=i*l-r*o,A=s*l-r*c,_=u*S-f*v,b=u*m-h*v,C=u*d-g*v,I=f*m-h*S,U=f*d-g*S,z=h*d-g*m,N=M*z-R*U+y*I+E*C-w*b+A*_;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/N;return t[0]=(o*z-c*U+l*I)*B,t[1]=(s*U-i*z-r*I)*B,t[2]=(S*A-m*w+d*E)*B,t[3]=(h*w-f*A-g*E)*B,t[4]=(c*C-a*z-l*b)*B,t[5]=(e*z-s*C+r*b)*B,t[6]=(m*y-v*A-d*R)*B,t[7]=(u*A-h*y+g*R)*B,t[8]=(a*U-o*C+l*_)*B,t[9]=(i*C-e*U-r*_)*B,t[10]=(v*w-S*y+d*M)*B,t[11]=(f*y-u*w-g*M)*B,t[12]=(o*b-a*I-c*_)*B,t[13]=(e*I-i*b+s*_)*B,t[14]=(S*R-v*E-m*M)*B,t[15]=(u*E-f*R+h*M)*B,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,f=o+o,h=r*l,g=r*u,v=r*f,S=a*u,m=a*f,d=o*f,M=c*l,R=c*u,y=c*f,E=i.x,w=i.y,A=i.z;return s[0]=(1-(S+d))*E,s[1]=(g+y)*E,s[2]=(v-R)*E,s[3]=0,s[4]=(g-y)*w,s[5]=(1-(h+d))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(v+R)*A,s[9]=(m-M)*A,s[10]=(1-(h+S))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=tn.set(s[0],s[1],s[2]).length();const o=tn.set(s[4],s[5],s[6]).length(),c=tn.set(s[8],s[9],s[10]).length();r<0&&(a=-a),$e.copy(this);const l=1/a,u=1/o,f=1/c;return $e.elements[0]*=l,$e.elements[1]*=l,$e.elements[2]*=l,$e.elements[4]*=u,$e.elements[5]*=u,$e.elements[6]*=u,$e.elements[8]*=f,$e.elements[9]*=f,$e.elements[10]*=f,e.setFromRotationMatrix($e),i.x=a,i.y=o,i.z=c,this}makePerspective(t,e,i,s,r,a,o=li,c=!1){const l=this.elements,u=2*r/(e-t),f=2*r/(i-s),h=(e+t)/(e-t),g=(i+s)/(i-s);let v,S;if(c)v=r/(a-r),S=a*r/(a-r);else if(o===li)v=-(a+r)/(a-r),S=-2*a*r/(a-r);else if(o===Vn)v=-a/(a-r),S=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=g,l[13]=0,l[2]=0,l[6]=0,l[10]=v,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=li,c=!1){const l=this.elements,u=2/(e-t),f=2/(i-s),h=-(e+t)/(e-t),g=-(i+s)/(i-s);let v,S;if(c)v=1/(a-r),S=a/(a-r);else if(o===li)v=-2/(a-r),S=-(a+r)/(a-r);else if(o===Vn)v=-1/(a-r),S=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=g,l[2]=0,l[6]=0,l[10]=v,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}};Bs.prototype.isMatrix4=!0;let me=Bs;const tn=new O,$e=new me,pu=new O(0,0,0),mu=new O(1,1,1),Ci=new O,ts=new O,Ge=new O,Eo=new me,bo=new bn;class Bi{constructor(t=0,e=0,i=0,s=Bi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],f=s[2],h=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,g),this._y=0);break;default:Nt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Eo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Eo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bo.setFromEuler(this),this.setFromQuaternion(bo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Bi.DEFAULT_ORDER="XYZ";class Xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let gu=0;const wo=new O,en=new bn,gi=new me,es=new O,An=new O,_u=new O,xu=new bn,To=new O(1,0,0),Ao=new O(0,1,0),Ro=new O(0,0,1),Co={type:"added"},vu={type:"removed"},nn={type:"childadded",child:null},ar={type:"childremoved",child:null};class Te extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gu++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new O,e=new Bi,i=new bn,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new Ut}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return en.setFromAxisAngle(t,e),this.quaternion.multiply(en),this}rotateOnWorldAxis(t,e){return en.setFromAxisAngle(t,e),this.quaternion.premultiply(en),this}rotateX(t){return this.rotateOnAxis(To,t)}rotateY(t){return this.rotateOnAxis(Ao,t)}rotateZ(t){return this.rotateOnAxis(Ro,t)}translateOnAxis(t,e){return wo.copy(t).applyQuaternion(this.quaternion),this.position.add(wo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(To,t)}translateY(t){return this.translateOnAxis(Ao,t)}translateZ(t){return this.translateOnAxis(Ro,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(gi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?es.copy(t):es.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),An.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gi.lookAt(An,es,this.up):gi.lookAt(es,An,this.up),this.quaternion.setFromRotationMatrix(gi),s&&(gi.extractRotation(s.matrixWorld),en.setFromRotationMatrix(gi),this.quaternion.premultiply(en.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Co),nn.child=t,this.dispatchEvent(nn),nn.child=null):jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(vu),ar.child=t,this.dispatchEvent(ar),ar.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Co),nn.child=t,this.dispatchEvent(nn),nn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(An,t,_u),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(An,xu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];r(t.shapes,f)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),g=a(t.animations),v=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),g.length>0&&(i.animations=g),v.length>0&&(i.nodes=v)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Te.DEFAULT_UP=new O(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class De extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yu={type:"move"};class or{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new De,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new De,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new De,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const S of t.hand.values()){const m=e.getJointPose(S,i),d=this._getHandJoint(l,S);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),g=.02,v=.005;l.inputState.pinching&&h>g+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=g-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(yu)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new De;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},is={h:0,s:0,l:0};function cr(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=qe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=Kt.workingColorSpace){if(t=Fa(t,1),e=qt(e,0,1),i=qt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=cr(a,r,t+1/3),this.g=cr(a,r,t),this.b=cr(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,e=qe){function i(r){r!==void 0&&parseFloat(r)<1&&Nt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Nt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Nt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=qe){const i=qc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Nt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=xn(t.r),this.g=xn(t.g),this.b=xn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=qe){return Kt.workingToColorSpace(Ce.copy(this),t),Math.round(qt(Ce.r*255,0,255))*65536+Math.round(qt(Ce.g*255,0,255))*256+Math.round(qt(Ce.b*255,0,255))}getHexString(t=qe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.workingToColorSpace(Ce.copy(this),e);const i=Ce.r,s=Ce.g,r=Ce.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(s-r)/f+(s<r?6:0);break;case s:c=(r-i)/f+2;break;case r:c=(i-s)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=Kt.workingColorSpace){return Kt.workingToColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=qe){Kt.workingToColorSpace(Ce.copy(this),t);const e=Ce.r,i=Ce.g,s=Ce.b;return t!==qe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Pi),this.setHSL(Pi.h+t,Pi.s+e,Pi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Pi),t.getHSL(is);const i=kn(Pi.h,is.h,e),s=kn(Pi.s,is.s,e),r=kn(Pi.l,is.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new zt;zt.NAMES=qc;class Ba{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new zt(t),this.density=e}clone(){return new Ba(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Mu extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Bi,this.environmentIntensity=1,this.environmentRotation=new Bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Ze=new O,_i=new O,lr=new O,xi=new O,sn=new O,rn=new O,Po=new O,hr=new O,ur=new O,dr=new O,fr=new fe,pr=new fe,mr=new fe;class ti{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Ze.subVectors(t,e),s.cross(Ze);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Ze.subVectors(s,e),_i.subVectors(i,e),lr.subVectors(t,e);const a=Ze.dot(Ze),o=Ze.dot(_i),c=Ze.dot(lr),l=_i.dot(_i),u=_i.dot(lr),f=a*l-o*o;if(f===0)return r.set(0,0,0),null;const h=1/f,g=(l*c-o*u)*h,v=(a*u-o*c)*h;return r.set(1-g-v,v,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,xi)===null?!1:xi.x>=0&&xi.y>=0&&xi.x+xi.y<=1}static getInterpolation(t,e,i,s,r,a,o,c){return this.getBarycoord(t,e,i,s,xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xi.x),c.addScaledVector(a,xi.y),c.addScaledVector(o,xi.z),c)}static getInterpolatedAttribute(t,e,i,s,r,a){return fr.setScalar(0),pr.setScalar(0),mr.setScalar(0),fr.fromBufferAttribute(t,e),pr.fromBufferAttribute(t,i),mr.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(fr,r.x),a.addScaledVector(pr,r.y),a.addScaledVector(mr,r.z),a}static isFrontFacing(t,e,i,s){return Ze.subVectors(i,e),_i.subVectors(t,e),Ze.cross(_i).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ze.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),Ze.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ti.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ti.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return ti.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return ti.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ti.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let a,o;sn.subVectors(s,i),rn.subVectors(r,i),hr.subVectors(t,i);const c=sn.dot(hr),l=rn.dot(hr);if(c<=0&&l<=0)return e.copy(i);ur.subVectors(t,s);const u=sn.dot(ur),f=rn.dot(ur);if(u>=0&&f<=u)return e.copy(s);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(i).addScaledVector(sn,a);dr.subVectors(t,r);const g=sn.dot(dr),v=rn.dot(dr);if(v>=0&&g<=v)return e.copy(r);const S=g*l-c*v;if(S<=0&&l>=0&&v<=0)return o=l/(l-v),e.copy(i).addScaledVector(rn,o);const m=u*v-g*f;if(m<=0&&f-u>=0&&g-v>=0)return Po.subVectors(r,s),o=(f-u)/(f-u+(g-v)),e.copy(s).addScaledVector(Po,o);const d=1/(m+S+h);return a=S*d,o=h*d,e.copy(i).addScaledVector(sn,a).addScaledVector(rn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class qn{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Je.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Je.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Je.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Je):Je.fromBufferAttribute(r,a),Je.applyMatrix4(t.matrixWorld),this.expandByPoint(Je);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ns.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ns.copy(i.boundingBox)),ns.applyMatrix4(t.matrixWorld),this.union(ns)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Je),Je.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rn),ss.subVectors(this.max,Rn),an.subVectors(t.a,Rn),on.subVectors(t.b,Rn),cn.subVectors(t.c,Rn),Li.subVectors(on,an),Di.subVectors(cn,on),Gi.subVectors(an,cn);let e=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-Gi.z,Gi.y,Li.z,0,-Li.x,Di.z,0,-Di.x,Gi.z,0,-Gi.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-Gi.y,Gi.x,0];return!gr(e,an,on,cn,ss)||(e=[1,0,0,0,1,0,0,0,1],!gr(e,an,on,cn,ss))?!1:(rs.crossVectors(Li,Di),e=[rs.x,rs.y,rs.z],gr(e,an,on,cn,ss))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Je).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Je).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const vi=[new O,new O,new O,new O,new O,new O,new O,new O],Je=new O,ns=new qn,an=new O,on=new O,cn=new O,Li=new O,Di=new O,Gi=new O,Rn=new O,ss=new O,rs=new O,zi=new O;function gr(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zi.fromArray(n,r);const o=s.x*Math.abs(zi.x)+s.y*Math.abs(zi.y)+s.z*Math.abs(zi.z),c=t.dot(zi),l=e.dot(zi),u=i.dot(zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const xe=new O,as=new Ht;let Su=0;class bi extends Zi{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Su++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=zh,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)as.fromBufferAttribute(this,e),as.applyMatrix3(t),this.setXY(e,as.x,as.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=mn(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mn(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mn(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mn(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}}class Yc extends bi{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Kc extends bi{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class ue extends bi{constructor(t,e,i){super(new Float32Array(t),e,i)}}const Eu=new qn,Cn=new O,_r=new O;class ka{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Eu.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Cn.subVectors(t,this.center);const e=Cn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Cn,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Cn.copy(t.center).add(_r)),this.expandByPoint(Cn.copy(t.center).sub(_r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let bu=0;const Xe=new me,xr=new Te,ln=new O,ze=new qn,Pn=new qn,be=new O;class ke extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bu++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hh(t)?Kc:Yc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ut().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,i){return Xe.makeTranslation(t,e,i),this.applyMatrix4(Xe),this}scale(t,e,i){return Xe.makeScale(t,e,i),this.applyMatrix4(Xe),this}lookAt(t){return xr.lookAt(t),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ln).negate(),this.translate(ln.x,ln.y,ln.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ue(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Nt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];ze.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,ze.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,ze.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(ze.min),this.boundingBox.expandByPoint(ze.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ka);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(ze.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Pn.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(ze.min,Pn.min),ze.expandByPoint(be),be.addVectors(ze.max,Pn.max),ze.expandByPoint(be)):(ze.expandByPoint(Pn.min),ze.expandByPoint(Pn.max))}ze.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)be.fromBufferAttribute(o,l),c&&(ln.fromBufferAttribute(t,l),be.add(ln)),s=Math.max(s,i.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new bi(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let _=0;_<i.count;_++)o[_]=new O,c[_]=new O;const l=new O,u=new O,f=new O,h=new Ht,g=new Ht,v=new Ht,S=new O,m=new O;function d(_,b,C){l.fromBufferAttribute(i,_),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,C),h.fromBufferAttribute(r,_),g.fromBufferAttribute(r,b),v.fromBufferAttribute(r,C),u.sub(l),f.sub(l),g.sub(h),v.sub(h);const I=1/(g.x*v.y-v.x*g.y);isFinite(I)&&(S.copy(u).multiplyScalar(v.y).addScaledVector(f,-g.y).multiplyScalar(I),m.copy(f).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(I),o[_].add(S),o[b].add(S),o[C].add(S),c[_].add(m),c[b].add(m),c[C].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,b=M.length;_<b;++_){const C=M[_],I=C.start,U=C.count;for(let z=I,N=I+U;z<N;z+=3)d(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const R=new O,y=new O,E=new O,w=new O;function A(_){E.fromBufferAttribute(s,_),w.copy(E);const b=o[_];R.copy(b),R.sub(E.multiplyScalar(E.dot(b))).normalize(),y.crossVectors(w,b);const I=y.dot(c[_])<0?-1:1;a.setXYZW(_,R.x,R.y,R.z,I)}for(let _=0,b=M.length;_<b;++_){const C=M[_],I=C.start,U=C.count;for(let z=I,N=I+U;z<N;z+=3)A(t.getX(z+0)),A(t.getX(z+1)),A(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new bi(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,g=i.count;h<g;h++)i.setXYZ(h,0,0,0);const s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,u=new O,f=new O;if(t)for(let h=0,g=t.count;h<g;h+=3){const v=t.getX(h+0),S=t.getX(h+1),m=t.getX(h+2);s.fromBufferAttribute(e,v),r.fromBufferAttribute(e,S),a.fromBufferAttribute(e,m),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),o.fromBufferAttribute(i,v),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,g=e.count;h<g;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),f.subVectors(s,r),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let g=0,v=0;for(let S=0,m=c.length;S<m;S++){o.isInterleavedBufferAttribute?g=c[S]*o.data.stride+o.offset:g=c[S]*u;for(let d=0;d<u;d++)h[v++]=l[g++]}return new bi(h,u,f)}if(this.index===null)return Nt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ke,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],g=t(h,i);c.push(g)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const g=l[f];u.push(g.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],f=r[l];for(let h=0,g=f.length;h<g;h++)u.push(f[h].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vr=new O,wu=new O,Tu=new Ut;class Ni{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=vr.subVectors(i,e).cross(wu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){const s=t.delta(vr),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Tu.getNormalMatrix(t),s=this.coplanarPoint(vr).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Au=0;class Yn extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Au++}),this.uuid=En(),this.name="",this.type="Material",this.blending=On,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=wc,this.blendDst=Tc,this.blendEquation=pn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new zt(0,0,0),this.blendAlpha=0,this.depthFunc=Gn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=er,this.stencilZFail=er,this.stencilZPass=er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Nt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){Nt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new zt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Ni().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ht().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ht().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const yi=new O,yr=new O,os=new O,cs=new O;class Ru{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){yr.copy(t).add(e).multiplyScalar(.5),os.copy(e).sub(t).normalize(),cs.copy(this.origin).sub(yr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(os),o=cs.dot(this.direction),c=-cs.dot(os),l=cs.lengthSq(),u=Math.abs(1-a*a);let f,h,g,v;if(u>0)if(f=a*c-o,h=a*o-c,v=r*u,f>=0)if(h>=-v)if(h<=v){const S=1/u;f*=S,h*=S,g=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;else h=-r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;else h<=-v?(f=Math.max(0,-(-a*r+o)),h=f>0?-r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+l):h<=v?(f=0,h=Math.min(Math.max(-r,-c),r),g=h*(h+2*c)+l):(f=Math.max(0,-(a*r+o)),h=f>0?r:Math.min(Math.max(-r,-c),r),g=-f*f+h*(h+2*c)+l);else h=a>0?-r:r,f=Math.max(0,-(a*h+o)),g=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(yr).addScaledVector(os,h),g}intersectSphere(t,e){if(t.radius<0)return null;yi.subVectors(t.center,this.origin);const i=yi.dot(this.direction),s=yi.dot(yi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,i,s,r){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=t.x-a.x,h=t.y-a.y,g=t.z-a.z,v=e.x-a.x,S=e.y-a.y,m=e.z-a.z,d=i.x-a.x,M=i.y-a.y,R=i.z-a.z,y=Math.abs(c),E=Math.abs(l),w=Math.abs(u);let A,_,b,C,I,U,z,N,B,$,W,it;if(y>=E&&y>=w?(b=c,U=f,B=v,it=d,c>=0?(A=l,_=u,C=h,I=g,z=S,N=m,$=M,W=R):(A=u,_=l,C=g,I=h,z=m,N=S,$=R,W=M)):E>=w?(b=l,U=h,B=S,it=M,l>=0?(A=u,_=c,C=g,I=f,z=m,N=v,$=R,W=d):(A=c,_=u,C=f,I=g,z=v,N=m,$=d,W=R)):(b=u,U=g,B=m,it=R,u>=0?(A=c,_=l,C=f,I=h,z=v,N=S,$=d,W=M):(A=l,_=c,C=h,I=f,z=S,N=v,$=M,W=d)),b===0)return null;const X=A/b,j=_/b,tt=1/b,Rt=C-X*U,Et=I-j*U,ie=z-X*B,Vt=N-j*B,$t=$-X*it,q=W-j*it,Q=$t*Vt-q*ie,_t=Rt*q-Et*$t,It=ie*Et-Vt*Rt;if(s){if(Q<0||_t<0||It<0)return null}else if((Q<0||_t<0||It<0)&&(Q>0||_t>0||It>0))return null;const gt=Q+_t+It;if(gt===0)return null;const Ot=tt*(Q*U+_t*B+It*it);return(gt>0?Ot<0:Ot>0)?null:this.at(Ot/gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oi extends Yn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.combine=Ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Lo=new me,Hi=new Ru,ls=new ka,Do=new O,hs=new O,us=new O,ds=new O,Mr=new O,fs=new O,Io=new O,ps=new O;class st extends Te{constructor(t=new ke,e=new Oi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){fs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],f=r[c];u!==0&&(Mr.fromBufferAttribute(f,t),a?fs.addScaledVector(Mr,u):fs.addScaledVector(Mr.sub(e),u))}e.add(fs)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ls.copy(i.boundingSphere),ls.applyMatrix4(r),Hi.copy(t.ray).recast(t.near),!(ls.containsPoint(Hi.origin)===!1&&(Hi.intersectSphere(ls,Do)===null||Hi.origin.distanceToSquared(Do)>(t.far-t.near)**2))&&(Lo.copy(r).invert(),Hi.copy(t.ray).applyMatrix4(Lo),!(i.boundingBox!==null&&Hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Hi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,h=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let v=0,S=h.length;v<S;v++){const m=h[v],d=a[m.materialIndex],M=Math.max(m.start,g.start),R=Math.min(o.count,Math.min(m.start+m.count,g.start+g.count));for(let y=M,E=R;y<E;y+=3){const w=o.getX(y),A=o.getX(y+1),_=o.getX(y+2);s=ms(this,d,t,i,l,u,f,w,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,g.start),S=Math.min(o.count,g.start+g.count);for(let m=v,d=S;m<d;m+=3){const M=o.getX(m),R=o.getX(m+1),y=o.getX(m+2);s=ms(this,a,t,i,l,u,f,M,R,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let v=0,S=h.length;v<S;v++){const m=h[v],d=a[m.materialIndex],M=Math.max(m.start,g.start),R=Math.min(c.count,Math.min(m.start+m.count,g.start+g.count));for(let y=M,E=R;y<E;y+=3){const w=y,A=y+1,_=y+2;s=ms(this,d,t,i,l,u,f,w,A,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const v=Math.max(0,g.start),S=Math.min(c.count,g.start+g.count);for(let m=v,d=S;m<d;m+=3){const M=m,R=m+1,y=m+2;s=ms(this,a,t,i,l,u,f,M,R,y),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Cu(n,t,e,i,s,r,a,o){let c;if(t.side===Oe?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===Yi,o),c===null)return null;ps.copy(o),ps.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(ps);return l<e.near||l>e.far?null:{distance:l,point:ps.clone(),object:n}}function ms(n,t,e,i,s,r,a,o,c,l){n.getVertexPosition(o,hs),n.getVertexPosition(c,us),n.getVertexPosition(l,ds);const u=Cu(n,t,e,i,hs,us,ds,Io);if(u){const f=new O;ti.getBarycoord(Io,hs,us,ds,f),s&&(u.uv=ti.getInterpolatedAttribute(s,o,c,l,f,new Ht)),r&&(u.uv1=ti.getInterpolatedAttribute(r,o,c,l,f,new Ht)),a&&(u.normal=ti.getInterpolatedAttribute(a,o,c,l,f,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new O,materialIndex:0};ti.getNormal(hs,us,ds,h.normal),u.face=h,u.barycoord=f}return u}class Pu extends Fe{constructor(t=null,e=1,i=1,s,r,a,o,c,l=we,u=we,f,h){super(null,a,o,c,l,u,s,r,f,h),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vi=new ka,Lu=new Ht(.5,.5),gs=new O;class Ga{constructor(t=new Ni,e=new Ni,i=new Ni,s=new Ni,r=new Ni,a=new Ni){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=li,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],f=r[5],h=r[6],g=r[7],v=r[8],S=r[9],m=r[10],d=r[11],M=r[12],R=r[13],y=r[14],E=r[15];if(s[0].setComponents(l-a,g-u,d-v,E-M).normalize(),s[1].setComponents(l+a,g+u,d+v,E+M).normalize(),s[2].setComponents(l+o,g+f,d+S,E+R).normalize(),s[3].setComponents(l-o,g-f,d-S,E-R).normalize(),i)s[4].setComponents(c,h,m,y).normalize(),s[5].setComponents(l-c,g-h,d-m,E-y).normalize();else if(s[4].setComponents(l-c,g-h,d-m,E-y).normalize(),e===li)s[5].setComponents(l+c,g+h,d+m,E+y).normalize();else if(e===Vn)s[5].setComponents(c,h,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Vi)}intersectsSprite(t){Vi.center.set(0,0,0);const e=Lu.distanceTo(t.center);return Vi.radius=.7071067811865476+e,Vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Vi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(gs.x=s.normal.x>0?t.max.x:t.min.x,gs.y=s.normal.y>0?t.max.y:t.min.y,gs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(gs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $c extends Fe{constructor(t=[],e=Ki,i,s,r,a,o,c,l,u){super(t,e,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Xn extends Fe{constructor(t,e,i=fi,s,r,a,o=we,c=we,l,u=wi,f=1){if(u!==wi&&u!==qi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:e,depth:f};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Du extends Xn{constructor(t,e=fi,i=Ki,s,r,a=we,o=we,c,l=wi){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,e,i,s,r,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Zc extends Fe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Zt extends ke{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,g=0;v("z","y","x",-1,-1,i,e,t,a,r,0),v("z","y","x",1,-1,i,e,-t,a,r,1),v("x","z","y",1,1,t,i,e,s,a,2),v("x","z","y",1,-1,t,i,-e,s,a,3),v("x","y","z",1,-1,t,e,i,s,r,4),v("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(f,2));function v(S,m,d,M,R,y,E,w,A,_,b){const C=y/A,I=E/_,U=y/2,z=E/2,N=w/2,B=A+1,$=_+1;let W=0,it=0;const X=new O;for(let j=0;j<$;j++){const tt=j*I-z;for(let Rt=0;Rt<B;Rt++){const Et=Rt*C-U;X[S]=Et*M,X[m]=tt*R,X[d]=N,l.push(X.x,X.y,X.z),X[S]=0,X[m]=0,X[d]=w>0?1:-1,u.push(X.x,X.y,X.z),f.push(Rt/A),f.push(1-j/_),W+=1}}for(let j=0;j<_;j++)for(let tt=0;tt<A;tt++){const Rt=h+tt+B*j,Et=h+tt+B*(j+1),ie=h+(tt+1)+B*(j+1),Vt=h+(tt+1)+B*j;c.push(Rt,Et,Vt),c.push(Et,ie,Vt),it+=6}o.addGroup(g,it,b),g+=it,h+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class za extends ke{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new O,u=new Ht;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let f=0,h=3;f<=e;f++,h+=3){const g=i+f/e*s;l.x=t*Math.cos(g),l.y=t*Math.sin(g),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,c.push(u.x,u.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new ue(a,3)),this.setAttribute("normal",new ue(o,3)),this.setAttribute("uv",new ue(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new za(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Be extends ke{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const u=[],f=[],h=[],g=[];let v=0;const S=[],m=i/2;let d=0;M(),a===!1&&(t>0&&R(!0),e>0&&R(!1)),this.setIndex(u),this.setAttribute("position",new ue(f,3)),this.setAttribute("normal",new ue(h,3)),this.setAttribute("uv",new ue(g,2));function M(){const y=new O,E=new O;let w=0;const A=(e-t)/i;for(let _=0;_<=r;_++){const b=[],C=_/r,I=C*(e-t)+t;for(let U=0;U<=s;U++){const z=U/s,N=z*c+o,B=Math.sin(N),$=Math.cos(N);E.x=I*B,E.y=-C*i+m,E.z=I*$,f.push(E.x,E.y,E.z),y.set(B,A,$).normalize(),h.push(y.x,y.y,y.z),g.push(z,1-C),b.push(v++)}S.push(b)}for(let _=0;_<s;_++)for(let b=0;b<r;b++){const C=S[b][_],I=S[b+1][_],U=S[b+1][_+1],z=S[b][_+1];(t>0||b!==0)&&(u.push(C,I,z),w+=3),(e>0||b!==r-1)&&(u.push(I,U,z),w+=3)}l.addGroup(d,w,0),d+=w}function R(y){const E=v,w=new Ht,A=new O;let _=0;const b=y===!0?t:e,C=y===!0?1:-1;for(let U=1;U<=s;U++)f.push(0,m*C,0),h.push(0,C,0),g.push(.5,.5),v++;const I=v;for(let U=0;U<=s;U++){const N=U/s*c+o,B=Math.cos(N),$=Math.sin(N);A.x=b*$,A.y=m*C,A.z=b*B,f.push(A.x,A.y,A.z),h.push(0,C,0),w.x=B*.5+.5,w.y=$*.5*C+.5,g.push(w.x,w.y),v++}for(let U=0;U<s;U++){const z=E+U,N=I+U;y===!0?u.push(N,N+1,z):u.push(N+1,N,z),_+=3}l.addGroup(d,_,y===!0?1:2),d+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Be(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class vn extends Be{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new vn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Hs extends ke{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};const r=[],a=[];o(s),l(i),u(),this.setAttribute("position",new ue(r,3)),this.setAttribute("normal",new ue(r.slice(),3)),this.setAttribute("uv",new ue(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const R=new O,y=new O,E=new O;for(let w=0;w<e.length;w+=3)g(e[w+0],R),g(e[w+1],y),g(e[w+2],E),c(R,y,E,M)}function c(M,R,y,E){const w=E+1,A=[];for(let _=0;_<=w;_++){A[_]=[];const b=M.clone().lerp(y,_/w),C=R.clone().lerp(y,_/w),I=w-_;for(let U=0;U<=I;U++)U===0&&_===w?A[_][U]=b:A[_][U]=b.clone().lerp(C,U/I)}for(let _=0;_<w;_++)for(let b=0;b<2*(w-_)-1;b++){const C=Math.floor(b/2);b%2===0?(h(A[_][C+1]),h(A[_+1][C]),h(A[_][C])):(h(A[_][C+1]),h(A[_+1][C+1]),h(A[_+1][C]))}}function l(M){const R=new O;for(let y=0;y<r.length;y+=3)R.x=r[y+0],R.y=r[y+1],R.z=r[y+2],R.normalize().multiplyScalar(M),r[y+0]=R.x,r[y+1]=R.y,r[y+2]=R.z}function u(){const M=new O;for(let R=0;R<r.length;R+=3){M.x=r[R+0],M.y=r[R+1],M.z=r[R+2];const y=m(M)/2/Math.PI+.5,E=d(M)/Math.PI+.5;a.push(y,1-E)}v(),f()}function f(){for(let M=0;M<a.length;M+=6){const R=a[M+0],y=a[M+2],E=a[M+4],w=Math.max(R,y,E),A=Math.min(R,y,E);w>.9&&A<.1&&(R<.2&&(a[M+0]+=1),y<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function g(M,R){const y=M*3;R.x=t[y+0],R.y=t[y+1],R.z=t[y+2]}function v(){const M=new O,R=new O,y=new O,E=new O,w=new Ht,A=new Ht,_=new Ht;for(let b=0,C=0;b<r.length;b+=9,C+=6){M.set(r[b+0],r[b+1],r[b+2]),R.set(r[b+3],r[b+4],r[b+5]),y.set(r[b+6],r[b+7],r[b+8]),w.set(a[C+0],a[C+1]),A.set(a[C+2],a[C+3]),_.set(a[C+4],a[C+5]),E.copy(M).add(R).add(y).divideScalar(3);const I=m(E);S(w,C+0,M,I),S(A,C+2,R,I),S(_,C+4,y,I)}}function S(M,R,y,E){E<0&&M.x===1&&(a[R]=M.x-1),y.x===0&&y.z===0&&(a[R]=E/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hs(t.vertices,t.indices,t.radius,t.detail)}}class Ha extends Hs{constructor(t=1,e=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ha(t.radius,t.detail)}}class Vs extends Hs{constructor(t=1,e=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Vs(t.radius,t.detail)}}class Kn extends ke{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,f=t/o,h=e/c,g=[],v=[],S=[],m=[];for(let d=0;d<u;d++){const M=d*h-a;for(let R=0;R<l;R++){const y=R*f-r;v.push(y,-M,0),S.push(0,0,1),m.push(R/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<o;M++){const R=M+l*d,y=M+l*(d+1),E=M+1+l*(d+1),w=M+1+l*d;g.push(R,y,w),g.push(y,E,w)}this.setIndex(g),this.setAttribute("position",new ue(v,3)),this.setAttribute("normal",new ue(S,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Kn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Pe extends ke{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new O,h=new O,g=[],v=[],S=[],m=[];for(let d=0;d<=i;d++){const M=[],R=d/i,y=a+R*o,E=t*Math.cos(y),w=Math.sqrt(t*t-E*E);let A=0;d===0&&a===0?A=.5/e:d===i&&c===Math.PI&&(A=-.5/e);for(let _=0;_<=e;_++){const b=_/e,C=s+b*r;f.x=-w*Math.cos(C),f.y=E,f.z=w*Math.sin(C),v.push(f.x,f.y,f.z),h.copy(f).normalize(),S.push(h.x,h.y,h.z),m.push(b+A,1-R),M.push(l++)}u.push(M)}for(let d=0;d<i;d++)for(let M=0;M<e;M++){const R=u[d][M+1],y=u[d][M],E=u[d+1][M],w=u[d+1][M+1];(d!==0||a>0)&&g.push(R,y,w),(d!==i-1||c<Math.PI)&&g.push(y,E,w)}this.setIndex(g),this.setAttribute("position",new ue(v,3)),this.setAttribute("normal",new ue(S,3)),this.setAttribute("uv",new ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pe(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ws extends ke{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},i=Math.floor(i),s=Math.floor(s);const c=[],l=[],u=[],f=[],h=new O,g=new O,v=new O;for(let S=0;S<=i;S++){const m=a+S/i*o;for(let d=0;d<=s;d++){const M=d/s*r;g.x=(t+e*Math.cos(m))*Math.cos(M),g.y=(t+e*Math.cos(m))*Math.sin(M),g.z=e*Math.sin(m),l.push(g.x,g.y,g.z),h.x=t*Math.cos(M),h.y=t*Math.sin(M),v.subVectors(g,h).normalize(),u.push(v.x,v.y,v.z),f.push(d/s),f.push(S/i)}}for(let S=1;S<=i;S++)for(let m=1;m<=s;m++){const d=(s+1)*S+m-1,M=(s+1)*(S-1)+m-1,R=(s+1)*(S-1)+m,y=(s+1)*S+m;c.push(d,M,y),c.push(M,R,y)}this.setIndex(c),this.setAttribute("position",new ue(l,3)),this.setAttribute("normal",new ue(u,3)),this.setAttribute("uv",new ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ws(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}function Mn(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];if(No(s))s.isRenderTargetTexture?(Nt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(No(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function Ue(n){const t={};for(let e=0;e<n.length;e++){const i=Mn(n[e]);for(const s in i)t[s]=i[s]}return t}function No(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Iu(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Jc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const Nu={clone:Mn,merge:Ue};var Uu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends Yn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Uu,this.fragmentShader=Fu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mn(t.uniforms),this.uniformsGroups=Iu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const i in t.uniforms){const s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new zt().setHex(s.value);break;case"v2":this.uniforms[i].value=new Ht().fromArray(s.value);break;case"v3":this.uniforms[i].value=new O().fromArray(s.value);break;case"v4":this.uniforms[i].value=new fe().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ut().fromArray(s.value);break;case"m4":this.uniforms[i].value=new me().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Ou extends mi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Dt extends Yn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=va,this.normalScale=new Ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Bu extends Yn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Dh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ku extends Yn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Va extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new zt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Gu extends Va{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Sr=new me,Uo=new O,Fo=new O;class Qc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ht(512,512),this.mapType=Ve,this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ga,this._frameExtents=new Ht(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Uo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Uo),Fo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Fo),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,i,s){Sr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),i.setFromProjectionMatrix(Sr,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,c=s?s.x/r.x:0,l=s?s.y/r.y:0;t.coordinateSystem===Vn||t.reversedDepth?e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),e.multiply(Sr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const _s=new O,xs=new bn,ri=new O;class jc extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(_s,xs,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,ri.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(_s,xs,ri),ri.x===1&&ri.y===1&&ri.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_s,xs,ri.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new O,Oo=new Ht,Bo=new Ht;class He extends jc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wn*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Bn*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wn*2*Math.atan(Math.tan(Bn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,Oo,Bo),e.subVectors(Bo,Oo)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Bn*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class zu extends Qc{constructor(){super(new He(90,1,.5,500)),this.isPointLightShadow=!0}}class Hu extends Va{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new zu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}}class Wa extends jc{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Vu extends Qc{constructor(){super(new Wa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Wu extends Va{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new Vu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const hn=-90,un=1;class Xu extends Te{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new He(hn,un,t,e);s.layers=this.layers,this.add(s);const r=new He(hn,un,t,e);r.layers=this.layers,this.add(r);const a=new He(hn,un,t,e);a.layers=this.layers,this.add(a);const o=new He(hn,un,t,e);o.layers=this.layers,this.add(o);const c=new He(hn,un,t,e);c.layers=this.layers,this.add(c);const l=new He(hn,un,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===li)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Vn)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,u),t.setRenderTarget(f,h,g),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class qu extends He{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const $a=class $a{constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){const r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};$a.prototype.isMatrix2=!0;let ko=$a;function Go(n,t,e,i){const s=Yu(i);switch(e){case Gc:return n*t;case Hc:return n*t/s.components*s.byteLength;case La:return n*t/s.components*s.byteLength;case $i:return n*t*2/s.components*s.byteLength;case Da:return n*t*2/s.components*s.byteLength;case zc:return n*t*3/s.components*s.byteLength;case ei:return n*t*4/s.components*s.byteLength;case Ia:return n*t*4/s.components*s.byteLength;case As:case Rs:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Cs:case Ps:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Wr:case qr:return Math.max(n,16)*Math.max(t,8)/4;case Vr:case Xr:return Math.max(n,8)*Math.max(t,8)/2;case Yr:case Kr:case Zr:case Jr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case $r:case Ds:case Qr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case jr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ea:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case ia:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case na:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case sa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case ra:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case aa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case oa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ca:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case la:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ha:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case ua:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case da:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case fa:case pa:case ma:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ga:case _a:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Is:case xa:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Yu(n){switch(n){case Ve:case Fc:return{byteLength:1,components:1};case zn:case Oc:case pi:return{byteLength:2,components:1};case Ca:case Pa:return{byteLength:2,components:4};case fi:case Ra:case ci:return{byteLength:4,components:1};case Bc:case kc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?Nt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function tl(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ku(n){const t=new WeakMap;function e(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let g;if(l instanceof Float32Array)g=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)g=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=n.SHORT;else if(l instanceof Uint32Array)g=n.UNSIGNED_INT;else if(l instanceof Int32Array)g=n.INT;else if(l instanceof Int8Array)g=n.BYTE;else if(l instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((g,v)=>g.start-v.start);let h=0;for(let g=1;g<f.length;g++){const v=f[h],S=f[g];S.start<=v.start+v.count+1?v.count=Math.max(v.count,S.start+S.count-v.start):(++h,f[h]=S)}f.length=h+1;for(let g=0,v=f.length;g<v;g++){const S=f[g];n.bufferSubData(l,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(n.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var $u=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ju=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,td=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ed=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,id=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ad=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,od=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ld=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,md=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,_d=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Md=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ed=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Td=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ad=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Rd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ld=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Id=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ud=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Od=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,zd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Hd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zd=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jd=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Qd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,af=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,of=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,df=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ff=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_f=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ef=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,bf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,If=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Nf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ff=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Of=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Kf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Zf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ip=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,np=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,up=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_p=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ep=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ap=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Gt={alphahash_fragment:$u,alphahash_pars_fragment:Zu,alphamap_fragment:Ju,alphamap_pars_fragment:Qu,alphatest_fragment:ju,alphatest_pars_fragment:td,aomap_fragment:ed,aomap_pars_fragment:id,batching_pars_vertex:nd,batching_vertex:sd,begin_vertex:rd,beginnormal_vertex:ad,bsdfs:od,iridescence_fragment:cd,bumpmap_pars_fragment:ld,clipping_planes_fragment:hd,clipping_planes_pars_fragment:ud,clipping_planes_pars_vertex:dd,clipping_planes_vertex:fd,color_fragment:pd,color_pars_fragment:md,color_pars_vertex:gd,color_vertex:_d,common:xd,cube_uv_reflection_fragment:vd,defaultnormal_vertex:yd,displacementmap_pars_vertex:Md,displacementmap_vertex:Sd,emissivemap_fragment:Ed,emissivemap_pars_fragment:bd,colorspace_fragment:wd,colorspace_pars_fragment:Td,envmap_fragment:Ad,envmap_common_pars_fragment:Rd,envmap_pars_fragment:Cd,envmap_pars_vertex:Pd,envmap_physical_pars_fragment:zd,envmap_vertex:Ld,fog_vertex:Dd,fog_pars_vertex:Id,fog_fragment:Nd,fog_pars_fragment:Ud,gradientmap_pars_fragment:Fd,lightmap_pars_fragment:Od,lights_lambert_fragment:Bd,lights_lambert_pars_fragment:kd,lights_pars_begin:Gd,lights_toon_fragment:Hd,lights_toon_pars_fragment:Vd,lights_phong_fragment:Wd,lights_phong_pars_fragment:Xd,lights_physical_fragment:qd,lights_physical_pars_fragment:Yd,lights_fragment_begin:Kd,lights_fragment_maps:$d,lights_fragment_end:Zd,lightprobes_pars_fragment:Jd,logdepthbuf_fragment:Qd,logdepthbuf_pars_fragment:jd,logdepthbuf_pars_vertex:tf,logdepthbuf_vertex:ef,map_fragment:nf,map_pars_fragment:sf,map_particle_fragment:rf,map_particle_pars_fragment:af,metalnessmap_fragment:of,metalnessmap_pars_fragment:cf,morphinstance_vertex:lf,morphcolor_vertex:hf,morphnormal_vertex:uf,morphtarget_pars_vertex:df,morphtarget_vertex:ff,normal_fragment_begin:pf,normal_fragment_maps:mf,normal_pars_fragment:gf,normal_pars_vertex:_f,normal_vertex:xf,normalmap_pars_fragment:vf,clearcoat_normal_fragment_begin:yf,clearcoat_normal_fragment_maps:Mf,clearcoat_pars_fragment:Sf,iridescence_pars_fragment:Ef,opaque_fragment:bf,packing:wf,premultiplied_alpha_fragment:Tf,project_vertex:Af,dithering_fragment:Rf,dithering_pars_fragment:Cf,roughnessmap_fragment:Pf,roughnessmap_pars_fragment:Lf,shadowmap_pars_fragment:Df,shadowmap_pars_vertex:If,shadowmap_vertex:Nf,shadowmask_pars_fragment:Uf,skinbase_vertex:Ff,skinning_pars_vertex:Of,skinning_vertex:Bf,skinnormal_vertex:kf,specularmap_fragment:Gf,specularmap_pars_fragment:zf,tonemapping_fragment:Hf,tonemapping_pars_fragment:Vf,transmission_fragment:Wf,transmission_pars_fragment:Xf,uv_pars_fragment:qf,uv_pars_vertex:Yf,uv_vertex:Kf,worldpos_vertex:$f,background_vert:Zf,background_frag:Jf,backgroundCube_vert:Qf,backgroundCube_frag:jf,cube_vert:tp,cube_frag:ep,depth_vert:ip,depth_frag:np,distance_vert:sp,distance_frag:rp,equirect_vert:ap,equirect_frag:op,linedashed_vert:cp,linedashed_frag:lp,meshbasic_vert:hp,meshbasic_frag:up,meshlambert_vert:dp,meshlambert_frag:fp,meshmatcap_vert:pp,meshmatcap_frag:mp,meshnormal_vert:gp,meshnormal_frag:_p,meshphong_vert:xp,meshphong_frag:vp,meshphysical_vert:yp,meshphysical_frag:Mp,meshtoon_vert:Sp,meshtoon_frag:Ep,points_vert:bp,points_frag:wp,shadow_vert:Tp,shadow_frag:Ap,sprite_vert:Rp,sprite_frag:Cp},dt={common:{diffuse:{value:new zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ut}},envmap:{envMap:{value:null},envMapRotation:{value:new Ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ut},normalScale:{value:new Ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new O},probesMax:{value:new O},probesResolution:{value:new O}},points:{diffuse:{value:new zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0},uvTransform:{value:new Ut}},sprite:{diffuse:{value:new zt(16777215)},opacity:{value:1},center:{value:new Ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ut},alphaMap:{value:null},alphaMapTransform:{value:new Ut},alphaTest:{value:0}}},oi={basic:{uniforms:Ue([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:Ue([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new zt(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:Ue([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new zt(0)},specular:{value:new zt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:Ue([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:Ue([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new zt(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:Ue([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:Ue([dt.points,dt.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:Ue([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:Ue([dt.common,dt.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:Ue([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:Ue([dt.sprite,dt.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ut}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:Ue([dt.common,dt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:Ue([dt.lights,dt.fog,{color:{value:new zt(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};oi.physical={uniforms:Ue([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ut},clearcoatNormalScale:{value:new Ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ut},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ut},sheen:{value:0},sheenColor:{value:new zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ut},transmissionSamplerSize:{value:new Ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ut},attenuationDistance:{value:0},attenuationColor:{value:new zt(0)},specularColor:{value:new zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ut},anisotropyVector:{value:new Ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ut}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const vs={r:0,b:0,g:0},Pp=new me,el=new Ut;el.set(-1,0,0,0,1,0,0,0,1);function Lp(n,t,e,i,s,r){const a=new zt(0);let o=s===!0?0:1,c,l,u=null,f=0,h=null;function g(M){let R=M.isScene===!0?M.background:null;if(R&&R.isTexture){const y=M.backgroundBlurriness>0;R=t.get(R,y)}return R}function v(M){let R=!1;const y=g(M);y===null?m(a,o):y&&y.isColor&&(m(y,1),R=!0);const E=n.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function S(M,R){const y=g(R);y&&(y.isCubeTexture||y.mapping===zs)?(l===void 0&&(l=new st(new Zt(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:Mn(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Oe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=y,l.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Pp.makeRotationFromEuler(R.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(el),l.material.toneMapped=Kt.getTransfer(y.colorSpace)!==se,(u!==y||f!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=n.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new st(new Kn(2,2),new mi({name:"BackgroundMaterial",uniforms:Mn(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(y.colorSpace)!==se,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=n.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,R){M.getRGB(vs,Jc(n)),e.buffers.color.setClear(vs.r,vs.g,vs.b,R,r)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,R=1){a.set(M),o=R,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:v,addToRenderList:S,dispose:d}}function Dp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(I,U,z,N,B){let $=!1;const W=f(I,N,z,U);r!==W&&(r=W,l(r.object)),$=g(I,N,z,B),$&&v(I,N,z,B),B!==null&&t.update(B,n.ELEMENT_ARRAY_BUFFER),($||a)&&(a=!1,y(I,U,z,N),B!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return n.createVertexArray()}function l(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function f(I,U,z,N){const B=N.wireframe===!0;let $=i[U.id];$===void 0&&($={},i[U.id]=$);const W=I.isInstancedMesh===!0?I.id:0;let it=$[W];it===void 0&&(it={},$[W]=it);let X=it[z.id];X===void 0&&(X={},it[z.id]=X);let j=X[B];return j===void 0&&(j=h(c()),X[B]=j),j}function h(I){const U=[],z=[],N=[];for(let B=0;B<e;B++)U[B]=0,z[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:N,object:I,attributes:{},index:null}}function g(I,U,z,N){const B=r.attributes,$=U.attributes;let W=0;const it=z.getAttributes();for(const X in it)if(it[X].location>=0){const tt=B[X];let Rt=$[X];if(Rt===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(Rt=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(Rt=I.instanceColor)),tt===void 0||tt.attribute!==Rt||Rt&&tt.data!==Rt.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function v(I,U,z,N){const B={},$=U.attributes;let W=0;const it=z.getAttributes();for(const X in it)if(it[X].location>=0){let tt=$[X];tt===void 0&&(X==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),X==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor));const Rt={};Rt.attribute=tt,tt&&tt.data&&(Rt.data=tt.data),B[X]=Rt,W++}r.attributes=B,r.attributesNum=W,r.index=N}function S(){const I=r.newAttributes;for(let U=0,z=I.length;U<z;U++)I[U]=0}function m(I){d(I,0)}function d(I,U){const z=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;z[I]=1,N[I]===0&&(n.enableVertexAttribArray(I),N[I]=1),B[I]!==U&&(n.vertexAttribDivisor(I,U),B[I]=U)}function M(){const I=r.newAttributes,U=r.enabledAttributes;for(let z=0,N=U.length;z<N;z++)U[z]!==I[z]&&(n.disableVertexAttribArray(z),U[z]=0)}function R(I,U,z,N,B,$,W){W===!0?n.vertexAttribIPointer(I,U,z,B,$):n.vertexAttribPointer(I,U,z,N,B,$)}function y(I,U,z,N){S();const B=N.attributes,$=z.getAttributes(),W=U.defaultAttributeValues;for(const it in $){const X=$[it];if(X.location>=0){let j=B[it];if(j===void 0&&(it==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),it==="instanceColor"&&I.instanceColor&&(j=I.instanceColor)),j!==void 0){const tt=j.normalized,Rt=j.itemSize,Et=t.get(j);if(Et===void 0)continue;const ie=Et.buffer,Vt=Et.type,$t=Et.bytesPerElement,q=Vt===n.INT||Vt===n.UNSIGNED_INT||j.gpuType===Ra;if(j.isInterleavedBufferAttribute){const Q=j.data,_t=Q.stride,It=j.offset;if(Q.isInstancedInterleavedBuffer){for(let gt=0;gt<X.locationSize;gt++)d(X.location+gt,Q.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let gt=0;gt<X.locationSize;gt++)m(X.location+gt);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let gt=0;gt<X.locationSize;gt++)R(X.location+gt,Rt/X.locationSize,Vt,tt,_t*$t,(It+Rt/X.locationSize*gt)*$t,q)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<X.locationSize;Q++)d(X.location+Q,j.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<X.locationSize;Q++)m(X.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ie);for(let Q=0;Q<X.locationSize;Q++)R(X.location+Q,Rt/X.locationSize,Vt,tt,Rt*$t,Rt/X.locationSize*Q*$t,q)}}else if(W!==void 0){const tt=W[it];if(tt!==void 0)switch(tt.length){case 2:n.vertexAttrib2fv(X.location,tt);break;case 3:n.vertexAttrib3fv(X.location,tt);break;case 4:n.vertexAttrib4fv(X.location,tt);break;default:n.vertexAttrib1fv(X.location,tt)}}}}M()}function E(){b();for(const I in i){const U=i[I];for(const z in U){const N=U[z];for(const B in N){const $=N[B];for(const W in $)u($[W].object),delete $[W];delete N[B]}}delete i[I]}}function w(I){if(i[I.id]===void 0)return;const U=i[I.id];for(const z in U){const N=U[z];for(const B in N){const $=N[B];for(const W in $)u($[W].object),delete $[W];delete N[B]}}delete i[I.id]}function A(I){for(const U in i){const z=i[U];for(const N in z){const B=z[N];if(B[I.id]===void 0)continue;const $=B[I.id];for(const W in $)u($[W].object),delete $[W];delete B[I.id]}}}function _(I){for(const U in i){const z=i[U],N=I.isInstancedMesh===!0?I.id:0,B=z[N];if(B!==void 0){for(const $ in B){const W=B[$];for(const it in W)u(W[it].object),delete W[it];delete B[$]}delete z[N],Object.keys(z).length===0&&delete i[U]}}}function b(){C(),a=!0,r!==s&&(r=s,l(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:C,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfObject:_,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:m,disableUnusedAttributes:M}}function Ip(n,t,e){let i;function s(c){i=c}function r(c,l){n.drawArrays(i,c,l),e.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),e.update(l,i,u))}function o(c,l,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let h=0;for(let g=0;g<u;g++)h+=l[g];e.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Np(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(A){return!(A!==ei&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const _=A===pi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Ve&&A!==ci&&!_&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=c(l);u!==l&&(Nt("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=e.logarithmicDepthBuffer===!0,h=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&h===!1&&Nt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),M=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:v,maxTextureSize:S,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:M,maxVaryings:R,maxFragmentUniforms:y,maxSamples:E,samples:w}}function Up(n){const t=this;let e=null,i=0,s=!1,r=!1;const a=new Ni,o=new Ut,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const g=f.length!==0||h||i!==0||s;return s=h,i=f.length,g},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,h){e=u(f,h,0)},this.setState=function(f,h,g){const v=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,d=n.get(f);if(!s||v===null||v.length===0||r&&!m)r?u(null):l();else{const M=r?0:i,R=M*4;let y=d.clippingState||null;c.value=y,y=u(v,h,R,g);for(let E=0;E!==R;++E)y[E]=e[E];d.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,g,v){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=c.value,v!==!0||m===null){const d=g+S*4,M=h.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<d)&&(m=new Float32Array(d));for(let R=0,y=g;R!==S;++R,y+=4)a.copy(f[R]).applyMatrix4(M,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}const gn=4,Fp=6,Op=20,Bp=256,Ln=new Wa,zo=new zt;let Er=null,br=0,wr=0,Tr=!1;const kp=new O,Wi=new O;class Ho{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){const{size:a=256,position:o=kp}=r;Er=this._renderer.getRenderTarget(),br=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Er,br,wr),this._renderer.xr.enabled=Tr,t.scissorTest=!1,dn(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ki||t.mapping===yn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Er=this._renderer.getRenderTarget(),br=this._renderer.getActiveCubeFace(),wr=this._renderer.getActiveMipmapLevel(),Tr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:pi,format:ei,colorSpace:Ns,depthBuffer:!1},s=Vo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vo(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Gp(r)),this._blurMaterial=Hp(r,t,e),this._ggxMaterial=zp(r,t,e)}return s}_compileMaterial(t){const e=new st(new ke,t);this._renderer.compile(e,Ln)}_sceneToCubeUV(t,e,i,s,r){const c=new He(90,1,e,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,g=f.toneMapping;f.getClearColor(zo),f.toneMapping=ui,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new st(new Zt,new Oi({name:"PMREM.Background",side:Oe,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let d=!1;const M=t.background;M?M.isColor&&(m.color.copy(M),t.background=null,d=!0):(m.color.copy(zo),d=!0);for(let R=0;R<6;R++){const y=R%3;y===0?(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[R],r.y,r.z)):y===1?(c.up.set(0,0,l[R]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[R],r.z)):(c.up.set(0,l[R],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[R]));const E=this._cubeSize;dn(s,y*E,R>2?E:0,E,E),f.setRenderTarget(s),d&&f.render(S,c),f.render(t,c)}f.toneMapping=g,f.autoClear=h,t.background=M}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ki||t.mapping===yn;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wo());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;dn(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,Ln)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=e/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=l*1.25,g=f*h,{_lodMax:v}=this,S=this._sizeLods[i],m=3*S*(i>v-gn?i-v+gn:0),d=4*(this._cubeSize-S);c.envMap.value=t.texture,c.roughness.value=g,c.mipInt.value=v-e,dn(r,m,d,3*S,2*S),s.setRenderTarget(r),s.render(o,Ln),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=v-i,dn(t,m,d,3*S,2*S),s.setRenderTarget(t),s.render(o,Ln)}_blur(t,e,i,s){const r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,i,a),this._blurPass(r,t,i,i,a)}_blurPass(t,e,i,s,r){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[s];c.material=o;const l=o.uniforms;l.envMap.value=t.texture,l.sigma.value=r,l.mipInt.value=this._lodMax-i;const u=this._sizeLods[s],f=3*u*(s>this._lodMax-gn?s-this._lodMax+gn:0),h=4*(this._cubeSize-u);dn(e,f,h,3*u,2*u),a.setRenderTarget(e),a.render(c,Ln)}}function Gp(n){const t=[],e=[];let i=n;const s=n-gn+1+Fp;for(let r=0;r<s;r++){const a=Math.pow(2,i);t.push(a);const o=1/(a-2),c=-o,l=1+o,u=[c,c,l,c,l,l,c,c,l,l,c,l],f=6,h=6,g=3,v=new Float32Array(g*h*f),S=new Float32Array(g*h*f);for(let d=0;d<f;d++){const M=d%3*2/3-1,R=d>2?0:-1,y=[M,R,0,M+2/3,R,0,M+2/3,R+1,0,M,R,0,M+2/3,R+1,0,M,R+1,0];v.set(y,g*h*d);for(let E=0;E<h;E++){const w=u[E*2]*2-1,A=u[E*2+1]*2-1;d===0?Wi.set(1,A,w):d===1?Wi.set(-w,1,-A):d===2?Wi.set(-w,A,1):d===3?Wi.set(-1,A,-w):d===4?Wi.set(-w,-1,A):Wi.set(w,A,-1),Wi.toArray(S,(d*h+E)*g)}}const m=new ke;m.setAttribute("position",new bi(v,g)),m.setAttribute("outputDirection",new bi(S,g)),e.push(new st(m,null)),i>gn&&i--}return{lodMeshes:e,sizeLods:t}}function Vo(n,t,e){const i=new ii(n,t,e);return i.texture.mapping=zs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function dn(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function zp(n,t,e){return new mi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Bp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Xs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Hp(n,t,e){return new mi({name:"SphericalGaussianBlur",defines:{SAMPLES:Op,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Xs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Wo(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Xo(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Si,depthTest:!1,depthWrite:!1})}function Xs(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class il extends ii{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new $c(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Zt(5,5,5),r=new mi({name:"CubemapFromEquirect",uniforms:Mn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Oe,blending:Si});r.uniforms.tEquirect.value=e;const a=new st(s,r),o=e.minFilter;return e.minFilter===Xi&&(e.minFilter=Le),new Xu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}}function Vp(n){let t=new WeakMap,e=new WeakMap,i=null;function s(h,g=!1){return h==null?null:g?a(h):r(h)}function r(h){if(h&&h.isTexture){const g=h.mapping;if(g===Qs||g===js)if(t.has(h)){const v=t.get(h).texture;return o(v,h.mapping)}else{const v=h.image;if(v&&v.height>0){const S=new il(v.height);return S.fromEquirectangularTexture(n,h),t.set(h,S),h.addEventListener("dispose",l),o(S.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const g=h.mapping,v=g===Qs||g===js,S=g===Ki||g===yn;if(v||S){let m=e.get(h);const d=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return i===null&&(i=new Ho(n)),m=v?i.fromEquirectangular(h,m):i.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),m.texture;if(m!==void 0)return m.texture;{const M=h.image;return v&&M&&M.height>0||S&&M&&c(M)?(i===null&&(i=new Ho(n)),m=v?i.fromEquirectangular(h):i.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,e.set(h,m),h.addEventListener("dispose",u),m.texture):null}}}return h}function o(h,g){return g===Qs?h.mapping=Ki:g===js&&(h.mapping=yn),h}function c(h){let g=0;const v=6;for(let S=0;S<v;S++)h[S]!==void 0&&g++;return g===v}function l(h){const g=h.target;g.removeEventListener("dispose",l);const v=t.get(g);v!==void 0&&(t.delete(g),v.dispose())}function u(h){const g=h.target;g.removeEventListener("dispose",u);const v=e.get(g);v!==void 0&&(e.delete(g),v.dispose())}function f(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:f}}function Wp(n){const t={};function e(i){if(t[i]!==void 0)return t[i];const s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&_n("WebGLRenderer: "+i+" extension not supported."),s}}}function Xp(n,t,e,i){const s={},r=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const v in h.attributes)t.remove(h.attributes[v]);h.removeEventListener("dispose",a),delete s[h.id];const g=r.get(h);g&&(t.remove(g),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(f,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function c(f){const h=f.attributes;for(const g in h)t.update(h[g],n.ARRAY_BUFFER)}function l(f){const h=[],g=f.index,v=f.attributes.position;let S=0;if(v===void 0)return;if(g!==null){const M=g.array;S=g.version;for(let R=0,y=M.length;R<y;R+=3){const E=M[R+0],w=M[R+1],A=M[R+2];h.push(E,w,w,A,A,E)}}else{const M=v.array;S=v.version;for(let R=0,y=M.length/3-1;R<y;R+=3){const E=R+0,w=R+1,A=R+2;h.push(E,w,w,A,A,E)}}const m=new(v.count>=65535?Kc:Yc)(h,1);m.version=S;const d=r.get(f);d&&t.remove(d),r.set(f,m)}function u(f){const h=r.get(f);if(h){const g=f.index;g!==null&&h.version<g.version&&l(f)}else l(f);return r.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function qp(n,t,e){let i;function s(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,h){n.drawElements(i,h,r,f*a),e.update(h,i,1)}function l(f,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,f*a,g),e.update(h,i,g))}function u(f,h,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,f,0,g);let S=0;for(let m=0;m<g;m++)S+=h[m];e.update(S,i,1)}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Yp(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:jt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Kp(n,t,e){const i=new WeakMap,s=new fe;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let C=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var g=C;h!==void 0&&h.texture.dispose();const v=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let y=0;v===!0&&(y=1),S===!0&&(y=2),m===!0&&(y=3);let E=o.attributes.position.count*y,w=1;E>t.maxTextureSize&&(w=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const A=new Float32Array(E*w*4*f),_=new Wc(A,E,w,f);_.type=ci,_.needsUpdate=!0;const b=y*4;for(let I=0;I<f;I++){const U=d[I],z=M[I],N=R[I],B=E*w*4*I;for(let $=0;$<U.count;$++){const W=$*b;v===!0&&(s.fromBufferAttribute(U,$),A[B+W+0]=s.x,A[B+W+1]=s.y,A[B+W+2]=s.z,A[B+W+3]=0),S===!0&&(s.fromBufferAttribute(z,$),A[B+W+4]=s.x,A[B+W+5]=s.y,A[B+W+6]=s.z,A[B+W+7]=0),m===!0&&(s.fromBufferAttribute(N,$),A[B+W+8]=s.x,A[B+W+9]=s.y,A[B+W+10]=s.z,A[B+W+11]=N.itemSize===4?s.w:1)}}h={count:f,texture:_,size:new Ht(E,w)},i.set(o,h),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let v=0;for(let m=0;m<l.length;m++)v+=l[m];const S=o.morphTargetsRelative?1:1-v;c.getUniforms().setValue(n,"morphTargetBaseInfluence",S),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function $p(n,t,e,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,f=l.geometry,h=t.get(l,f);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const g=l.skeleton;r.get(g)!==u&&(g.update(),r.set(g,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),e.remove(u.instanceMatrix),u.instanceColor!==null&&e.remove(u.instanceColor)}return{update:a,dispose:o}}const Zp={[Rc]:"LINEAR_TONE_MAPPING",[Cc]:"REINHARD_TONE_MAPPING",[Pc]:"CINEON_TONE_MAPPING",[Lc]:"ACES_FILMIC_TONE_MAPPING",[Ic]:"AGX_TONE_MAPPING",[Nc]:"NEUTRAL_TONE_MAPPING",[Dc]:"CUSTOM_TONE_MAPPING"};function Jp(n,t,e,i,s,r){const a=new ii(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new ke;l.setAttribute("position",new ue([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new ue([0,2,0,0,2,0],2));const u=new Ou({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new st(l,u),h=new Wa(-1,1,1,-1,0,1);let g=null,v=null,S=!1,m,d=null,M=[],R=!1;this.setSize=function(y,E){a.setSize(y,E),o!==null&&o.setSize(y,E),c!==null&&c.setSize(y,E);for(let w=0;w<M.length;w++){const A=M[w];A.setSize&&A.setSize(y,E)}},this.setEffects=function(y){M=y,R=M.length>0&&M[0].isRenderPass===!0;const E=a.width,w=a.height;M.length>0&&o===null&&(o=new ii(E,w,{type:pi,depthBuffer:!1,stencilBuffer:!1}),c=new ii(E,w,{type:pi,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<M.length;A++){const _=M[A];_.setSize&&_.setSize(E,w)}},this.begin=function(y,E){if(S||y.toneMapping===ui&&M.length===0)return!1;if(d=E,E!==null){const w=E.width,A=E.height;(a.width!==w||a.height!==A)&&this.setSize(w,A)}return R===!1&&y.setRenderTarget(a),m=y.toneMapping,y.toneMapping=ui,!0},this.hasRenderPass=function(){return R},this.end=function(y,E){y.toneMapping=m,S=!0;let w=a,A=o;for(let _=0;_<M.length;_++){const b=M[_];b.enabled!==!1&&(b.render(y,A,w,E),b.needsSwap!==!1&&(w=A,A=A===o?c:o))}if(g!==y.outputColorSpace||v!==y.toneMapping){g=y.outputColorSpace,v=y.toneMapping,u.defines={},Kt.getTransfer(g)===se&&(u.defines.SRGB_TRANSFER="");const _=Zp[v];_&&(u.defines[_]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(d),y.render(f,h),d=null,S=!1},this.isCompositing=function(){return S},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}const nl=new Fe,ya=new Xn(1,1),sl=new Wc,rl=new fu,al=new $c,qo=[],Yo=[],Ko=new Float32Array(16),$o=new Float32Array(9),Zo=new Float32Array(4);function wn(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=qo[s];if(r===void 0&&(r=new Float32Array(s),qo[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Me(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Se(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function qs(n,t){let e=Yo[t];e===void 0&&(e=new Int32Array(t),Yo[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Qp(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function jp(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2fv(this.addr,t),Se(e,t)}}function tm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;n.uniform3fv(this.addr,t),Se(e,t)}}function em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4fv(this.addr,t),Se(e,t)}}function im(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,i))return;Zo.set(i),n.uniformMatrix2fv(this.addr,!1,Zo),Se(e,i)}}function nm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,i))return;$o.set(i),n.uniformMatrix3fv(this.addr,!1,$o),Se(e,i)}}function sm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Me(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(Me(e,i))return;Ko.set(i),n.uniformMatrix4fv(this.addr,!1,Ko),Se(e,i)}}function rm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function am(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2iv(this.addr,t),Se(e,t)}}function om(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3iv(this.addr,t),Se(e,t)}}function cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4iv(this.addr,t),Se(e,t)}}function lm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function hm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;n.uniform2uiv(this.addr,t),Se(e,t)}}function um(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;n.uniform3uiv(this.addr,t),Se(e,t)}}function dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;n.uniform4uiv(this.addr,t),Se(e,t)}}function fm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ya.compareFunction=e.isReversedDepthBuffer()?Ua:Na,r=ya):r=nl,e.setTexture2D(t||r,s)}function pm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||rl,s)}function mm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||al,s)}function gm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||sl,s)}function _m(n){switch(n){case 5126:return Qp;case 35664:return jp;case 35665:return tm;case 35666:return em;case 35674:return im;case 35675:return nm;case 35676:return sm;case 5124:case 35670:return rm;case 35667:case 35671:return am;case 35668:case 35672:return om;case 35669:case 35673:return cm;case 5125:return lm;case 36294:return hm;case 36295:return um;case 36296:return dm;case 35678:case 36198:case 36298:case 36306:case 35682:return fm;case 35679:case 36299:case 36307:return pm;case 35680:case 36300:case 36308:case 36293:return mm;case 36289:case 36303:case 36311:case 36292:return gm}}function xm(n,t){n.uniform1fv(this.addr,t)}function vm(n,t){const e=wn(t,this.size,2);n.uniform2fv(this.addr,e)}function ym(n,t){const e=wn(t,this.size,3);n.uniform3fv(this.addr,e)}function Mm(n,t){const e=wn(t,this.size,4);n.uniform4fv(this.addr,e)}function Sm(n,t){const e=wn(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Em(n,t){const e=wn(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function bm(n,t){const e=wn(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function wm(n,t){n.uniform1iv(this.addr,t)}function Tm(n,t){n.uniform2iv(this.addr,t)}function Am(n,t){n.uniform3iv(this.addr,t)}function Rm(n,t){n.uniform4iv(this.addr,t)}function Cm(n,t){n.uniform1uiv(this.addr,t)}function Pm(n,t){n.uniform2uiv(this.addr,t)}function Lm(n,t){n.uniform3uiv(this.addr,t)}function Dm(n,t){n.uniform4uiv(this.addr,t)}function Im(n,t,e){const i=this.cache,s=t.length,r=qs(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),Se(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ya:a=nl;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function Nm(n,t,e){const i=this.cache,s=t.length,r=qs(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||rl,r[a])}function Um(n,t,e){const i=this.cache,s=t.length,r=qs(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||al,r[a])}function Fm(n,t,e){const i=this.cache,s=t.length,r=qs(e,s);Me(i,r)||(n.uniform1iv(this.addr,r),Se(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||sl,r[a])}function Om(n){switch(n){case 5126:return xm;case 35664:return vm;case 35665:return ym;case 35666:return Mm;case 35674:return Sm;case 35675:return Em;case 35676:return bm;case 5124:case 35670:return wm;case 35667:case 35671:return Tm;case 35668:case 35672:return Am;case 35669:case 35673:return Rm;case 5125:return Cm;case 36294:return Pm;case 36295:return Lm;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Im;case 35679:case 36299:case 36307:return Nm;case 35680:case 36300:case 36308:case 36293:return Um;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=_m(e.type)}}class km{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Om(e.type)}}class Gm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],i)}}}const Ar=/(\w+)(\])?(\[|\.)?/g;function Jo(n,t){n.seq.push(t),n.map[t.id]=t}function zm(n,t,e){const i=n.name,s=i.length;for(Ar.lastIndex=0;;){const r=Ar.exec(i),a=Ar.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Jo(e,l===void 0?new Bm(o,n,t):new km(o,n,t));break}else{let f=e.map[o];f===void 0&&(f=new Gm(o),Jo(e,f)),e=f}}}class Ls{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);zm(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&i.push(a)}return i}}function Qo(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Hm=37297;let Vm=0;function Wm(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const jo=new Ut;function Xm(n){Kt._getMatrix(jo,Kt.workingColorSpace,n);const t=`mat3( ${jo.elements.map(e=>e.toFixed(4))} )`;switch(Kt.getTransfer(n)){case Us:return[t,"LinearTransferOETF"];case se:return[t,"sRGBTransferOETF"];default:return Nt("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function tc(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Wm(n.getShaderSource(t),o)}else return r}function qm(n,t){const e=Xm(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const Ym={[Rc]:"Linear",[Cc]:"Reinhard",[Pc]:"Cineon",[Lc]:"ACESFilmic",[Ic]:"AgX",[Nc]:"Neutral",[Dc]:"Custom"};function Km(n,t){const e=Ym[t];return e===void 0?(Nt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ys=new O;function $m(){Kt.getLuminanceCoefficients(ys);const n=ys.x.toFixed(4),t=ys.y.toFixed(4),e=ys.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Zm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fn).join(`
`)}function Jm(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Qm(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Fn(n){return n!==""}function ec(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ic(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const jm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ma(n){return n.replace(jm,e0)}const t0=new Map;function e0(n,t){let e=Gt[t];if(e===void 0){const i=t0.get(t);if(i!==void 0)e=Gt[i],Nt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Ma(e)}const i0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nc(n){return n.replace(i0,n0)}function n0(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sc(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const s0={[Ts]:"SHADOWMAP_TYPE_PCF",[Un]:"SHADOWMAP_TYPE_VSM"};function r0(n){return s0[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const a0={[Ki]:"ENVMAP_TYPE_CUBE",[yn]:"ENVMAP_TYPE_CUBE",[zs]:"ENVMAP_TYPE_CUBE_UV"};function o0(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":a0[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const c0={[yn]:"ENVMAP_MODE_REFRACTION"};function l0(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":c0[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const h0={[Ac]:"ENVMAP_BLENDING_MULTIPLY",[Ch]:"ENVMAP_BLENDING_MIX",[Ph]:"ENVMAP_BLENDING_ADD"};function u0(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":h0[n.combine]||"ENVMAP_BLENDING_NONE"}function d0(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function f0(n,t,e,i){const s=n.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=r0(e),l=o0(e),u=l0(e),f=u0(e),h=d0(e),g=Zm(e),v=Jm(r),S=s.createProgram();let m,d,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Fn).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Fn).join(`
`),d.length>0&&(d+=`
`)):(m=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fn).join(`
`),d=[sc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ui?"#define TONE_MAPPING":"",e.toneMapping!==ui?Gt.tonemapping_pars_fragment:"",e.toneMapping!==ui?Km("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),$m(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fn).join(`
`)),a=Ma(a),a=ec(a,e),a=ic(a,e),o=Ma(o),o=ec(o,e),o=ic(o,e),a=nc(a),o=nc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===go?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===go?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const R=M+m+a,y=M+d+o,E=Qo(s,s.VERTEX_SHADER,R),w=Qo(s,s.FRAGMENT_SHADER,y);s.attachShader(S,E),s.attachShader(S,w),e.index0AttributeName!==void 0?s.bindAttribLocation(S,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(S,0,"position"),s.linkProgram(S);function A(I){if(n.debug.checkShaderErrors){const U=s.getProgramInfoLog(S)||"",z=s.getShaderInfoLog(E)||"",N=s.getShaderInfoLog(w)||"",B=U.trim(),$=z.trim(),W=N.trim();let it=!0,X=!0;if(s.getProgramParameter(S,s.LINK_STATUS)===!1)if(it=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,S,E,w);else{const j=tc(s,E,"vertex"),tt=tc(s,w,"fragment");jt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(S,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+j+`
`+tt)}else B!==""?Nt("WebGLProgram: Program Info Log:",B):($===""||W==="")&&(X=!1);X&&(I.diagnostics={runnable:it,programLog:B,vertexShader:{log:$,prefix:m},fragmentShader:{log:W,prefix:d}})}s.deleteShader(E),s.deleteShader(w),_=new Ls(s,S),b=Qm(s,S)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(S,Hm)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(S),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Vm++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=E,this.fragmentShader=w,this}let p0=0;class m0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new g0(t),e.set(t,i)),i}}class g0{constructor(t){this.id=p0++,this.code=t,this.usedTimes=0}}function _0(n){return n===$i||n===Ds||n===Is}function x0(n,t,e,i,s,r){const a=new Xc,o=new m0,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return c.add(_),_===0?"uv":`uv${_}`}function S(_,b,C,I,U,z){const N=I.fog,B=U.geometry,$=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,it=t.get(_.envMap||$,W),X=it&&it.mapping===zs?it.image.height:null,j=g[_.type];_.precision!==null&&(h=i.getMaxPrecision(_.precision),h!==_.precision&&Nt("WebGLProgram.getParameters:",_.precision,"not supported, using",h,"instead."));const tt=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Rt=tt!==void 0?tt.length:0;let Et=0;B.morphAttributes.position!==void 0&&(Et=1),B.morphAttributes.normal!==void 0&&(Et=2),B.morphAttributes.color!==void 0&&(Et=3);let ie,Vt,$t,q;if(j){const oe=oi[j];ie=oe.vertexShader,Vt=oe.fragmentShader}else{ie=_.vertexShader,Vt=_.fragmentShader;const oe=o.getVertexShaderStage(_),te=o.getFragmentShaderStage(_);o.update(_,oe,te),$t=oe.id,q=te.id}const Q=n.getRenderTarget(),_t=n.state.buffers.depth.getReversed(),It=U.isInstancedMesh===!0,gt=U.isBatchedMesh===!0,Ot=!!_.map,pe=!!_.matcap,Bt=!!it,ht=!!_.aoMap,Pt=!!_.lightMap,bt=!!_.bumpMap&&_.wireframe===!1,Qt=!!_.normalMap,de=!!_.displacementMap,ye=!!_.emissiveMap,Xt=!!_.metalnessMap,le=!!_.roughnessMap,D=_.anisotropy>0,Ee=_.clearcoat>0,ne=_.dispersion>0,T=_.retroreflectivity>0,p=_.iridescence>0,F=_.sheen>0,H=_.transmission>0,Y=D&&!!_.anisotropyMap,nt=Ee&&!!_.clearcoatMap,rt=Ee&&!!_.clearcoatNormalMap,K=Ee&&!!_.clearcoatRoughnessMap,J=p&&!!_.iridescenceMap,at=p&&!!_.iridescenceThicknessMap,Tt=F&&!!_.sheenColorMap,ut=F&&!!_.sheenRoughnessMap,ot=!!_.specularMap,At=!!_.specularColorMap,Lt=!!_.specularIntensityMap,Ft=H&&!!_.transmissionMap,L=H&&!!_.thicknessMap,ct=!!_.gradientMap,Z=!!_.alphaMap,lt=_.alphaTest>0,mt=!!_.alphaHash,et=!!_.extensions;let Ct=ui;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ct=n.toneMapping);const St={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:ie,fragmentShader:Vt,defines:_.defines,customVertexShaderID:$t,customFragmentShaderID:q,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:h,batching:gt,batchingColor:gt&&U._colorsTexture!==null,instancing:It,instancingColor:It&&U.instanceColor!==null,instancingMorph:It&&U.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Kt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ot,matcap:pe,envMap:Bt,envMapMode:Bt&&it.mapping,envMapCubeUVHeight:X,aoMap:ht,lightMap:Pt,bumpMap:bt,normalMap:Qt,displacementMap:de,emissiveMap:ye,normalMapObjectSpace:Qt&&_.normalMapType===Ih,normalMapTangentSpace:Qt&&_.normalMapType===va,packedNormalMap:Qt&&_.normalMapType===va&&_0(_.normalMap.format),metalnessMap:Xt,roughnessMap:le,anisotropy:D,anisotropyMap:Y,clearcoat:Ee,clearcoatMap:nt,clearcoatNormalMap:rt,clearcoatRoughnessMap:K,dispersion:ne,retroreflection:T,iridescence:p,iridescenceMap:J,iridescenceThicknessMap:at,sheen:F,sheenColorMap:Tt,sheenRoughnessMap:ut,specularMap:ot,specularColorMap:At,specularIntensityMap:Lt,transmission:H,transmissionMap:Ft,thicknessMap:L,gradientMap:ct,opaque:_.transparent===!1&&_.blending===On&&_.alphaToCoverage===!1,alphaMap:Z,alphaTest:lt,alphaHash:mt,combine:_.combine,mapUv:Ot&&v(_.map.channel),aoMapUv:ht&&v(_.aoMap.channel),lightMapUv:Pt&&v(_.lightMap.channel),bumpMapUv:bt&&v(_.bumpMap.channel),normalMapUv:Qt&&v(_.normalMap.channel),displacementMapUv:de&&v(_.displacementMap.channel),emissiveMapUv:ye&&v(_.emissiveMap.channel),metalnessMapUv:Xt&&v(_.metalnessMap.channel),roughnessMapUv:le&&v(_.roughnessMap.channel),anisotropyMapUv:Y&&v(_.anisotropyMap.channel),clearcoatMapUv:nt&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:rt&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:K&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:at&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Tt&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:ut&&v(_.sheenRoughnessMap.channel),specularMapUv:ot&&v(_.specularMap.channel),specularColorMapUv:At&&v(_.specularColorMap.channel),specularIntensityMapUv:Lt&&v(_.specularIntensityMap.channel),transmissionMapUv:Ft&&v(_.transmissionMap.channel),thicknessMapUv:L&&v(_.thicknessMap.channel),alphaMapUv:Z&&v(_.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Qt||D),vertexNormals:!!B.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!B.attributes.uv&&(Ot||Z),fog:!!N,useFog:_.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||B.attributes.normal===void 0&&Qt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:_t,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Et,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ct,decodeVideoTexture:Ot&&_.map.isVideoTexture===!0&&Kt.getTransfer(_.map.colorSpace)===se,decodeVideoTextureEmissive:ye&&_.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(_.emissiveMap.colorSpace)===se,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===je,flipSided:_.side===Oe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:et&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&_.extensions.multiDraw===!0||gt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return St.vertexUv1s=c.has(1),St.vertexUv2s=c.has(2),St.vertexUv3s=c.has(3),c.clear(),St}function m(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)b.push(C),b.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(d(b,_),M(b,_),b.push(n.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function d(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapCubeUVHeight),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.morphAttributeCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function M(_,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function R(_){const b=g[_.type];let C;if(b){const I=oi[b];C=Nu.clone(I.uniforms)}else C=_.uniforms;return C}function y(_,b){let C=u.get(b);return C!==void 0?++C.usedTimes:(C=new f0(n,b,_,s),l.push(C),u.set(b,C)),C}function E(_){if(--_.usedTimes===0){const b=l.indexOf(_);l[b]=l[l.length-1],l.pop(),u.delete(_.cacheKey),_.destroy()}}function w(_){o.remove(_)}function A(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:R,acquireProgram:y,releaseProgram:E,releaseShaderCache:w,programs:l,dispose:A}}function v0(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,c){n.get(a)[o]=c}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function y0(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function rc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ac(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(h){let g=0;return h.isInstancedMesh&&(g+=2),h.isSkinnedMesh&&(g+=1),g}function o(h,g,v,S,m,d){let M=n[t];return M===void 0?(M={id:h.id,object:h,geometry:g,material:v,materialVariant:a(h),groupOrder:S,renderOrder:h.renderOrder,z:m,group:d},n[t]=M):(M.id=h.id,M.object=h,M.geometry=g,M.material=v,M.materialVariant=a(h),M.groupOrder=S,M.renderOrder=h.renderOrder,M.z=m,M.group=d),t++,M}function c(h,g,v,S,m,d,M){M.reversedDepth===!0&&(m=-m);const R=o(h,g,v,S,m,d);v.transmission>0?i.push(R):v.transparent===!0?s.push(R):e.push(R)}function l(h,g,v,S,m,d){const M=o(h,g,v,S,m,d);v.transmission>0?i.unshift(M):v.transparent===!0?s.unshift(M):e.unshift(M)}function u(h,g){e.length>1&&e.sort(h||y0),i.length>1&&i.sort(g||rc),s.length>1&&s.sort(g||rc)}function f(){for(let h=t,g=n.length;h<g;h++){const v=n[h];if(v.id===null)break;v.id=null,v.object=null,v.geometry=null,v.material=null,v.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:f,sort:u}}function M0(){let n=new WeakMap;function t(i,s){const r=n.get(i);let a;return r===void 0?(a=new ac,n.set(i,[a])):s>=r.length?(a=new ac,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function S0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new O,color:new zt};break;case"SpotLight":e={position:new O,direction:new O,color:new zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new zt,groundColor:new zt};break;case"RectAreaLight":e={color:new zt,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function E0(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let b0=0;function w0(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function T0(n){const t=new S0,e=E0(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const s=new O,r=new me,a=new me;function o(l){let u=0,f=0,h=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let g=0,v=0,S=0,m=0,d=0,M=0,R=0,y=0,E=0,w=0,A=0,_=0,b=0,C=0;l.sort(w0);for(let U=0,z=l.length;U<z;U++){const N=l[U],B=N.color,$=N.intensity,W=N.distance;let it=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===$i?it=N.shadow.map.texture:it=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=B.r*$,f+=B.g*$,h+=B.b*$;else if(N.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(N.sh.coefficients[X],$);C++}else if(N.isSunLight){const X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const j=N.shadow,tt=e.get(N);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),i.sunShadow[v]=tt,i.sunShadowMap[v]=it;const Rt=j.getViewportCount();for(let Et=0;Et<Rt;Et++)i.sunShadowMatrix[S+Et]=j.getMatrix(Et),i.sunShadowCascade[S+Et]=j._cascadeData[Et];S+=Rt,v++}i.sun[g]=X,g++}else if(N.isDirectionalLight){const X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const j=N.shadow,tt=e.get(N);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,i.directionalShadow[m]=tt,i.directionalShadowMap[m]=it,i.directionalShadowMatrix[m]=N.shadow.matrix,E++}i.directional[m]=X,m++}else if(N.isSpotLight){const X=t.get(N);X.position.setFromMatrixPosition(N.matrixWorld),X.color.copy(B).multiplyScalar($),X.distance=W,X.coneCos=Math.cos(N.angle),X.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),X.decay=N.decay,i.spot[M]=X;const j=N.shadow;if(N.map&&(i.spotLightMap[_]=N.map,_++,j.updateMatrices(N),N.castShadow&&b++),i.spotLightMatrix[M]=j.matrix,N.castShadow){const tt=e.get(N);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,i.spotShadow[M]=tt,i.spotShadowMap[M]=it,A++}M++}else if(N.isRectAreaLight){const X=t.get(N);X.color.copy(B).multiplyScalar($),X.halfWidth.set(N.width*.5,0,0),X.halfHeight.set(0,N.height*.5,0),i.rectArea[R]=X,R++}else if(N.isPointLight){const X=t.get(N);if(X.color.copy(N.color).multiplyScalar(N.intensity),X.distance=N.distance,X.decay=N.decay,N.castShadow){const j=N.shadow,tt=e.get(N);tt.shadowIntensity=j.intensity,tt.shadowBias=j.bias,tt.shadowNormalBias=j.normalBias,tt.shadowRadius=j.radius,tt.shadowMapSize=j.mapSize,tt.shadowCameraNear=j.camera.near,tt.shadowCameraFar=j.camera.far,i.pointShadow[d]=tt,i.pointShadowMap[d]=it,i.pointShadowMatrix[d]=N.shadow.matrix,w++}i.point[d]=X,d++}else if(N.isHemisphereLight){const X=t.get(N);X.skyColor.copy(N.color).multiplyScalar($),X.groundColor.copy(N.groundColor).multiplyScalar($),i.hemi[y]=X,y++}}R>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=dt.LTC_FLOAT_1,i.rectAreaLTC2=dt.LTC_FLOAT_2):(i.rectAreaLTC1=dt.LTC_HALF_1,i.rectAreaLTC2=dt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const I=i.hash;(I.sunLength!==g||I.directionalLength!==m||I.pointLength!==d||I.spotLength!==M||I.rectAreaLength!==R||I.hemiLength!==y||I.numSunShadows!==v||I.numDirectionalShadows!==E||I.numPointShadows!==w||I.numSpotShadows!==A||I.numSpotMaps!==_||I.numLightProbes!==C)&&(i.sun.length=g,i.directional.length=m,i.spot.length=M,i.rectArea.length=R,i.point.length=d,i.hemi.length=y,i.sunShadow.length=v,i.sunShadowMap.length=v,i.sunShadowMatrix.length=S,i.sunShadowCascade.length=S,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.spotLightMatrix.length=A+_-b,i.spotLightMap.length=_,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=C,I.sunLength=g,I.directionalLength=m,I.pointLength=d,I.spotLength=M,I.rectAreaLength=R,I.hemiLength=y,I.numSunShadows=v,I.numDirectionalShadows=E,I.numPointShadows=w,I.numSpotShadows=A,I.numSpotMaps=_,I.numLightProbes=C,i.version=b0++)}function c(l,u){let f=0,h=0,g=0,v=0,S=0,m=0;const d=u.matrixWorldInverse;for(let M=0,R=l.length;M<R;M++){const y=l[M];if(y.isSunLight){const E=i.sun[f];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(d),f++}else if(y.isDirectionalLight){const E=i.directional[h];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),h++}else if(y.isSpotLight){const E=i.spot[v];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),v++}else if(y.isRectAreaLight){const E=i.rectArea[S];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),a.identity(),r.copy(y.matrixWorld),r.premultiply(d),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),S++}else if(y.isPointLight){const E=i.point[g];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(d),g++}else if(y.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(d),m++}}}return{setup:o,setupView:c,state:i}}function oc(n){const t=new T0(n),e=[],i=[],s=[];function r(h){f.camera=h,e.length=0,i.length=0,s.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function c(h){s.push(h)}function l(){t.setup(e)}function u(h){t.setupView(e,h)}const f={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:f,setupLights:l,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function A0(n){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new oc(n),t.set(s,[o])):r>=a.length?(o=new oc(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const R0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,P0=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],L0=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],cc=new me,Dn=new O,Rr=new O;function D0(n,t,e){let i=new Ga;const s=new Ht,r=new Ht,a=new fe,o=new Bu,c=new ku,l={},u=e.maxTextureSize,f={[Yi]:Oe,[Oe]:Yi,[je]:je},h=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ht},radius:{value:4}},vertexShader:R0,fragmentShader:C0}),g=h.clone();g.defines.HORIZONTAL_PASS=1;const v=new ke;v.setAttribute("position",new bi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new st(v,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ts;let d=this.type;this.render=function(w,A,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===bc&&(Nt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ts);const b=n.getRenderTarget(),C=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Si),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const z=d!==this.type;z&&A.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=w.length;N<B;N++){const $=w[N],W=$.shadow;if(W===void 0){Nt("WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const it=W.getFrameExtents();s.multiply(it),r.copy(W.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/it.x),s.x=r.x*it.x,W.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/it.y),s.y=r.y*it.y,W.mapSize.y=r.y));const X=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=X,W.map===null||z===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===Un){if($.isPointLight){Nt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new ii(s.x,s.y,{format:$i,type:pi,minFilter:Le,magFilter:Le,generateMipmaps:!1}),W.map.texture.name=$.name+".shadowMap",W.map.depthTexture=new Xn(s.x,s.y,ci),W.map.depthTexture.name=$.name+".shadowMapDepth",W.map.depthTexture.format=wi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=we,W.map.depthTexture.magFilter=we}else $.isPointLight?(W.map=new il(s.x),W.map.depthTexture=new Du(s.x,fi)):(W.map=new ii(s.x,s.y),W.map.depthTexture=new Xn(s.x,s.y,fi)),W.map.depthTexture.name=$.name+".shadowMap",W.map.depthTexture.format=wi,this.type===Ts?(W.map.depthTexture.compareFunction=X?Ua:Na,W.map.depthTexture.minFilter=Le,W.map.depthTexture.magFilter=Le):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=we,W.map.depthTexture.magFilter=we);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);const j=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();$.isPointLight!==!0&&W.updateMatrices($,_);for(let tt=0;tt<j;tt++){const Rt=W.getCamera(tt);if($.isPointLight){const Et=W.camera,ie=W.matrix,Vt=$.distance||Et.far;Vt!==Et.far&&(Et.far=Vt,Et.updateProjectionMatrix()),Dn.setFromMatrixPosition($.matrixWorld),Et.position.copy(Dn),Rr.copy(Et.position),Rr.add(P0[tt]),Et.up.copy(L0[tt]),Et.lookAt(Rr),Et.updateMatrixWorld(),ie.makeTranslation(-Dn.x,-Dn.y,-Dn.z),cc.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),W._frustum.setFromProjectionMatrix(cc,Et.coordinateSystem,Et.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,tt),n.clear();else{tt===0&&(n.setRenderTarget(W.map),n.clear());const Et=W.getViewport(tt);a.set(r.x*Et.x,r.y*Et.y,r.x*Et.z,r.y*Et.w),U.viewport(a)}i=W.getFrustum(tt),y(A,_,Rt,$,this.type)}W.isPointLightShadow!==!0&&this.type===Un&&M(W,_),W.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(b,C,I)};function M(w,A){const _=t.update(S);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,g.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,g.needsUpdate=!0),w.mapPass===null?w.mapPass=new ii(s.x,s.y,{format:$i,type:pi}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),h.uniforms.shadow_pass.value=w.map.depthTexture,h.uniforms.resolution.value.set(w.map.width,w.map.height),h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(A,null,_,h,S,null),g.uniforms.shadow_pass.value=w.mapPass.texture,g.uniforms.resolution.value.set(w.map.width,w.map.height),g.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(A,null,_,g,S,null)}function R(w,A,_,b){let C=null;const I=_.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)C=I;else if(C=_.isPointLight===!0?c:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=C.uuid,z=A.uuid;let N=l[U];N===void 0&&(N={},l[U]=N);let B=N[z];B===void 0&&(B=C.clone(),N[z]=B,A.addEventListener("dispose",E)),C=B}if(C.visible=A.visible,C.wireframe=A.wireframe,b===Un?C.side=A.shadowSide!==null?A.shadowSide:A.side:C.side=A.shadowSide!==null?A.shadowSide:f[A.side],C.alphaMap=A.alphaMap,C.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,C.map=A.map,C.clipShadows=A.clipShadows,C.clippingPlanes=A.clippingPlanes,C.clipIntersection=A.clipIntersection,C.displacementMap=A.displacementMap,C.displacementScale=A.displacementScale,C.displacementBias=A.displacementBias,C.wireframeLinewidth=A.wireframeLinewidth,C.linewidth=A.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const U=n.properties.get(C);U.light=_}return C}function y(w,A,_,b,C){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&C===Un)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,w.matrixWorld);const z=t.update(w),N=w.material;if(Array.isArray(N)){const B=z.groups;for(let $=0,W=B.length;$<W;$++){const it=B[$],X=N[it.materialIndex];if(X&&X.visible){const j=R(w,X,b,C);w.onBeforeShadow(n,w,A,_,z,j,it),n.renderBufferDirect(_,null,z,j,w,it),w.onAfterShadow(n,w,A,_,z,j,it)}}}else if(N.visible){const B=R(w,N,b,C);w.onBeforeShadow(n,w,A,_,z,B,null),n.renderBufferDirect(_,null,z,B,w,null),w.onAfterShadow(n,w,A,_,z,B,null)}}const U=w.children;for(let z=0,N=U.length;z<N;z++)y(U[z],A,_,b,C)}function E(w){w.target.removeEventListener("dispose",E);for(const _ in l){const b=l[_],C=w.target.uuid;C in b&&(b[C].dispose(),delete b[C])}}}function I0(n,t){function e(){let L=!1;const ct=new fe;let Z=null;const lt=new fe(0,0,0,0);return{setMask:function(mt){Z!==mt&&!L&&(n.colorMask(mt,mt,mt,mt),Z=mt)},setLocked:function(mt){L=mt},setClear:function(mt,et,Ct,St,oe){oe===!0&&(mt*=St,et*=St,Ct*=St),ct.set(mt,et,Ct,St),lt.equals(ct)===!1&&(n.clearColor(mt,et,Ct,St),lt.copy(ct))},reset:function(){L=!1,Z=null,lt.set(-1,0,0,0)}}}function i(){let L=!1,ct=!1,Z=null,lt=null,mt=null;return{setReversed:function(et){if(ct!==et){const Ct=t.get("EXT_clip_control");et?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),ct=et;const St=mt;mt=null,this.setClear(St)}},getReversed:function(){return ct},setTest:function(et){et?Q(n.DEPTH_TEST):_t(n.DEPTH_TEST)},setMask:function(et){Z!==et&&!L&&(n.depthMask(et),Z=et)},setFunc:function(et){if(ct&&(et=Xh[et]),lt!==et){switch(et){case Nr:n.depthFunc(n.NEVER);break;case Ur:n.depthFunc(n.ALWAYS);break;case Fr:n.depthFunc(n.LESS);break;case Gn:n.depthFunc(n.LEQUAL);break;case Or:n.depthFunc(n.EQUAL);break;case Br:n.depthFunc(n.GEQUAL);break;case kr:n.depthFunc(n.GREATER);break;case Gr:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}lt=et}},setLocked:function(et){L=et},setClear:function(et){mt!==et&&(mt=et,ct&&(et=1-et),n.clearDepth(et))},reset:function(){L=!1,Z=null,lt=null,mt=null,ct=!1}}}function s(){let L=!1,ct=null,Z=null,lt=null,mt=null,et=null,Ct=null,St=null,oe=null;return{setTest:function(te){L||(te?Q(n.STENCIL_TEST):_t(n.STENCIL_TEST))},setMask:function(te){ct!==te&&!L&&(n.stencilMask(te),ct=te)},setFunc:function(te,Ke,ni){(Z!==te||lt!==Ke||mt!==ni)&&(n.stencilFunc(te,Ke,ni),Z=te,lt=Ke,mt=ni)},setOp:function(te,Ke,ni){(et!==te||Ct!==Ke||St!==ni)&&(n.stencilOp(te,Ke,ni),et=te,Ct=Ke,St=ni)},setLocked:function(te){L=te},setClear:function(te){oe!==te&&(n.clearStencil(te),oe=te)},reset:function(){L=!1,ct=null,Z=null,lt=null,mt=null,et=null,Ct=null,St=null,oe=null}}}const r=new e,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},f={},h={},g=new WeakMap,v=[],S=null,m=!1,d=null,M=null,R=null,y=null,E=null,w=null,A=null,_=new zt(0,0,0),b=0,C=!1,I=null,U=null,z=null,N=null,B=null;const $=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,it=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(X)[1]),W=it>=1):X.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),W=it>=2);let j=null,tt={};const Rt=n.getParameter(n.SCISSOR_BOX),Et=n.getParameter(n.VIEWPORT),ie=new fe().fromArray(Rt),Vt=new fe().fromArray(Et);function $t(L,ct,Z,lt){const mt=new Uint8Array(4),et=n.createTexture();n.bindTexture(L,et),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<Z;Ct++)L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY?n.texImage3D(ct,0,n.RGBA,1,1,lt,0,n.RGBA,n.UNSIGNED_BYTE,mt):n.texImage2D(ct+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,mt);return et}const q={};q[n.TEXTURE_2D]=$t(n.TEXTURE_2D,n.TEXTURE_2D,1),q[n.TEXTURE_CUBE_MAP]=$t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[n.TEXTURE_2D_ARRAY]=$t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),q[n.TEXTURE_3D]=$t(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(n.DEPTH_TEST),a.setFunc(Gn),bt(!1),Qt(uo),Q(n.CULL_FACE),ht(Si);function Q(L){u[L]!==!0&&(n.enable(L),u[L]=!0)}function _t(L){u[L]!==!1&&(n.disable(L),u[L]=!1)}function It(L,ct){return h[L]!==ct?(n.bindFramebuffer(L,ct),h[L]=ct,L===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ct),L===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ct),!0):!1}function gt(L,ct){let Z=v,lt=!1;if(L){Z=g.get(ct),Z===void 0&&(Z=[],g.set(ct,Z));const mt=L.textures;if(Z.length!==mt.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let et=0,Ct=mt.length;et<Ct;et++)Z[et]=n.COLOR_ATTACHMENT0+et;Z.length=mt.length,lt=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,lt=!0);lt&&n.drawBuffers(Z)}function Ot(L){return S!==L?(n.useProgram(L),S=L,!0):!1}const pe={[pn]:n.FUNC_ADD,[dh]:n.FUNC_SUBTRACT,[fh]:n.FUNC_REVERSE_SUBTRACT};pe[ph]=n.MIN,pe[mh]=n.MAX;const Bt={[gh]:n.ZERO,[_h]:n.ONE,[xh]:n.SRC_COLOR,[wc]:n.SRC_ALPHA,[bh]:n.SRC_ALPHA_SATURATE,[Sh]:n.DST_COLOR,[yh]:n.DST_ALPHA,[vh]:n.ONE_MINUS_SRC_COLOR,[Tc]:n.ONE_MINUS_SRC_ALPHA,[Eh]:n.ONE_MINUS_DST_COLOR,[Mh]:n.ONE_MINUS_DST_ALPHA,[wh]:n.CONSTANT_COLOR,[Th]:n.ONE_MINUS_CONSTANT_COLOR,[Ah]:n.CONSTANT_ALPHA,[Rh]:n.ONE_MINUS_CONSTANT_ALPHA};function ht(L,ct,Z,lt,mt,et,Ct,St,oe,te){if(L===Si){m===!0&&(_t(n.BLEND),m=!1);return}if(m===!1&&(Q(n.BLEND),m=!0),L!==uh){if(L!==d||te!==C){if((M!==pn||E!==pn)&&(n.blendEquation(n.FUNC_ADD),M=pn,E=pn),te)switch(L){case On:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fo:n.blendFunc(n.ONE,n.ONE);break;case po:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case mo:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:jt("WebGLState: Invalid blending: ",L);break}else switch(L){case On:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case fo:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case po:jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case mo:jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:jt("WebGLState: Invalid blending: ",L);break}R=null,y=null,w=null,A=null,_.set(0,0,0),b=0,d=L,C=te}return}mt=mt||ct,et=et||Z,Ct=Ct||lt,(ct!==M||mt!==E)&&(n.blendEquationSeparate(pe[ct],pe[mt]),M=ct,E=mt),(Z!==R||lt!==y||et!==w||Ct!==A)&&(n.blendFuncSeparate(Bt[Z],Bt[lt],Bt[et],Bt[Ct]),R=Z,y=lt,w=et,A=Ct),(St.equals(_)===!1||oe!==b)&&(n.blendColor(St.r,St.g,St.b,oe),_.copy(St),b=oe),d=L,C=!1}function Pt(L,ct){L.side===je?_t(n.CULL_FACE):Q(n.CULL_FACE);let Z=L.side===Oe;ct&&(Z=!Z),bt(Z),L.blending===On&&L.transparent===!1?ht(Si):ht(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const lt=L.stencilWrite;o.setTest(lt),lt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ye(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):_t(n.SAMPLE_ALPHA_TO_COVERAGE)}function bt(L){I!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),I=L)}function Qt(L){L!==lh?(Q(n.CULL_FACE),L!==U&&(L===uo?n.cullFace(n.BACK):L===hh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_t(n.CULL_FACE),U=L}function de(L){L!==z&&(W&&n.lineWidth(L),z=L)}function ye(L,ct,Z){L?(Q(n.POLYGON_OFFSET_FILL),(N!==ct||B!==Z)&&(N=ct,B=Z,a.getReversed()&&(ct=-ct),n.polygonOffset(ct,Z))):_t(n.POLYGON_OFFSET_FILL)}function Xt(L){L?Q(n.SCISSOR_TEST):_t(n.SCISSOR_TEST)}function le(L){L===void 0&&(L=n.TEXTURE0+$-1),j!==L&&(n.activeTexture(L),j=L)}function D(L,ct,Z){Z===void 0&&(j===null?Z=n.TEXTURE0+$-1:Z=j);let lt=tt[Z];lt===void 0&&(lt={type:void 0,texture:void 0},tt[Z]=lt),(lt.type!==L||lt.texture!==ct)&&(j!==Z&&(n.activeTexture(Z),j=Z),n.bindTexture(L,ct||q[L]),lt.type=L,lt.texture=ct)}function Ee(){const L=tt[j];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ne(){try{n.compressedTexImage2D(...arguments)}catch(L){jt("WebGLState:",L)}}function T(){try{n.compressedTexImage3D(...arguments)}catch(L){jt("WebGLState:",L)}}function p(){try{n.texSubImage2D(...arguments)}catch(L){jt("WebGLState:",L)}}function F(){try{n.texSubImage3D(...arguments)}catch(L){jt("WebGLState:",L)}}function H(){try{n.compressedTexSubImage2D(...arguments)}catch(L){jt("WebGLState:",L)}}function Y(){try{n.compressedTexSubImage3D(...arguments)}catch(L){jt("WebGLState:",L)}}function nt(){try{n.texStorage2D(...arguments)}catch(L){jt("WebGLState:",L)}}function rt(){try{n.texStorage3D(...arguments)}catch(L){jt("WebGLState:",L)}}function K(){try{n.texImage2D(...arguments)}catch(L){jt("WebGLState:",L)}}function J(){try{n.texImage3D(...arguments)}catch(L){jt("WebGLState:",L)}}function at(L){return f[L]!==void 0?f[L]:n.getParameter(L)}function Tt(L,ct){f[L]!==ct&&(n.pixelStorei(L,ct),f[L]=ct)}function ut(L){ie.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),ie.copy(L))}function ot(L){Vt.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Vt.copy(L))}function At(L,ct){let Z=l.get(ct);Z===void 0&&(Z=new WeakMap,l.set(ct,Z));let lt=Z.get(L);lt===void 0&&(lt=n.getUniformBlockIndex(ct,L.name),Z.set(L,lt))}function Lt(L,ct){const lt=l.get(ct).get(L);c.get(ct)!==lt&&(n.uniformBlockBinding(ct,lt,L.__bindingPointIndex),c.set(ct,lt))}function Ft(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},j=null,tt={},h={},g=new WeakMap,v=[],S=null,m=!1,d=null,M=null,R=null,y=null,E=null,w=null,A=null,_=new zt(0,0,0),b=0,C=!1,I=null,U=null,z=null,N=null,B=null,ie.set(0,0,n.canvas.width,n.canvas.height),Vt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:_t,bindFramebuffer:It,drawBuffers:gt,useProgram:Ot,setBlending:ht,setMaterial:Pt,setFlipSided:bt,setCullFace:Qt,setLineWidth:de,setPolygonOffset:ye,setScissorTest:Xt,activeTexture:le,bindTexture:D,unbindTexture:Ee,compressedTexImage2D:ne,compressedTexImage3D:T,texImage2D:K,texImage3D:J,pixelStorei:Tt,getParameter:at,updateUBOMapping:At,uniformBlockBinding:Lt,texStorage2D:nt,texStorage3D:rt,texSubImage2D:p,texSubImage3D:F,compressedTexSubImage2D:H,compressedTexSubImage3D:Y,scissor:ut,viewport:ot,reset:Ft}}function N0(n,t,e,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ht,u=new WeakMap,f=new Set;let h;const g=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(T,p){return v?new OffscreenCanvas(T,p):Fs("canvas")}function m(T,p,F){let H=1;const Y=ne(T);if((Y.width>F||Y.height>F)&&(H=F/Math.max(Y.width,Y.height)),H<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const nt=Math.floor(H*Y.width),rt=Math.floor(H*Y.height);h===void 0&&(h=S(nt,rt));const K=p?S(nt,rt):h;return K.width=nt,K.height=rt,K.getContext("2d").drawImage(T,0,0,nt,rt),Nt("WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+nt+"x"+rt+")."),K}else return"data"in T&&Nt("WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),T;return T}function d(T){return T.generateMipmaps}function M(T){n.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(T,p,F,H,Y,nt=!1){if(T!==null){if(n[T]!==void 0)return n[T];Nt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let rt;H&&(rt=t.get("EXT_texture_norm16"),rt||Nt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let K=p;if(p===n.RED&&(F===n.FLOAT&&(K=n.R32F),F===n.HALF_FLOAT&&(K=n.R16F),F===n.UNSIGNED_BYTE&&(K=n.R8),F===n.UNSIGNED_SHORT&&rt&&(K=rt.R16_EXT),F===n.SHORT&&rt&&(K=rt.R16_SNORM_EXT)),p===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.R8UI),F===n.UNSIGNED_SHORT&&(K=n.R16UI),F===n.UNSIGNED_INT&&(K=n.R32UI),F===n.BYTE&&(K=n.R8I),F===n.SHORT&&(K=n.R16I),F===n.INT&&(K=n.R32I)),p===n.RG&&(F===n.FLOAT&&(K=n.RG32F),F===n.HALF_FLOAT&&(K=n.RG16F),F===n.UNSIGNED_BYTE&&(K=n.RG8),F===n.UNSIGNED_SHORT&&rt&&(K=rt.RG16_EXT),F===n.SHORT&&rt&&(K=rt.RG16_SNORM_EXT)),p===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RG8UI),F===n.UNSIGNED_SHORT&&(K=n.RG16UI),F===n.UNSIGNED_INT&&(K=n.RG32UI),F===n.BYTE&&(K=n.RG8I),F===n.SHORT&&(K=n.RG16I),F===n.INT&&(K=n.RG32I)),p===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RGB8UI),F===n.UNSIGNED_SHORT&&(K=n.RGB16UI),F===n.UNSIGNED_INT&&(K=n.RGB32UI),F===n.BYTE&&(K=n.RGB8I),F===n.SHORT&&(K=n.RGB16I),F===n.INT&&(K=n.RGB32I)),p===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(K=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(K=n.RGBA16UI),F===n.UNSIGNED_INT&&(K=n.RGBA32UI),F===n.BYTE&&(K=n.RGBA8I),F===n.SHORT&&(K=n.RGBA16I),F===n.INT&&(K=n.RGBA32I)),p===n.RGB&&(F===n.UNSIGNED_SHORT&&rt&&(K=rt.RGB16_EXT),F===n.SHORT&&rt&&(K=rt.RGB16_SNORM_EXT),F===n.UNSIGNED_INT_5_9_9_9_REV&&(K=n.RGB9_E5),F===n.UNSIGNED_INT_10F_11F_11F_REV&&(K=n.R11F_G11F_B10F)),p===n.RGBA){const J=nt?Us:Kt.getTransfer(Y);F===n.FLOAT&&(K=n.RGBA32F),F===n.HALF_FLOAT&&(K=n.RGBA16F),F===n.UNSIGNED_BYTE&&(K=J===se?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT&&rt&&(K=rt.RGBA16_EXT),F===n.SHORT&&rt&&(K=rt.RGBA16_SNORM_EXT),F===n.UNSIGNED_SHORT_4_4_4_4&&(K=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(K=n.RGB5_A1)}return(K===n.R16F||K===n.R32F||K===n.RG16F||K===n.RG32F||K===n.RGBA16F||K===n.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function E(T,p){let F;return T?p===null||p===fi||p===Hn?F=n.DEPTH24_STENCIL8:p===ci?F=n.DEPTH32F_STENCIL8:p===zn&&(F=n.DEPTH24_STENCIL8,Nt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):p===null||p===fi||p===Hn?F=n.DEPTH_COMPONENT24:p===ci?F=n.DEPTH_COMPONENT32F:p===zn&&(F=n.DEPTH_COMPONENT16),F}function w(T,p){return d(T)===!0||T.isFramebufferTexture&&T.minFilter!==we&&T.minFilter!==Le?Math.log2(Math.max(p.width,p.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?p.mipmaps.length:1}function A(T){const p=T.target;p.removeEventListener("dispose",A),b(p),p.isVideoTexture&&u.delete(p),p.isHTMLTexture&&f.delete(p)}function _(T){const p=T.target;p.removeEventListener("dispose",_),I(p)}function b(T){const p=i.get(T);if(p.__webglInit===void 0)return;const F=T.source,H=g.get(F);if(H){const Y=H[p.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&C(T),Object.keys(H).length===0&&g.delete(F)}i.remove(T)}function C(T){const p=i.get(T);n.deleteTexture(p.__webglTexture);const F=T.source,H=g.get(F);delete H[p.__cacheKey],a.memory.textures--}function I(T){const p=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(p.__webglFramebuffer[H]))for(let Y=0;Y<p.__webglFramebuffer[H].length;Y++)n.deleteFramebuffer(p.__webglFramebuffer[H][Y]);else n.deleteFramebuffer(p.__webglFramebuffer[H]);p.__webglDepthbuffer&&n.deleteRenderbuffer(p.__webglDepthbuffer[H])}else{if(Array.isArray(p.__webglFramebuffer))for(let H=0;H<p.__webglFramebuffer.length;H++)n.deleteFramebuffer(p.__webglFramebuffer[H]);else n.deleteFramebuffer(p.__webglFramebuffer);if(p.__webglDepthbuffer&&n.deleteRenderbuffer(p.__webglDepthbuffer),p.__webglMultisampledFramebuffer&&n.deleteFramebuffer(p.__webglMultisampledFramebuffer),p.__webglColorRenderbuffer)for(let H=0;H<p.__webglColorRenderbuffer.length;H++)p.__webglColorRenderbuffer[H]&&n.deleteRenderbuffer(p.__webglColorRenderbuffer[H]);p.__webglDepthRenderbuffer&&n.deleteRenderbuffer(p.__webglDepthRenderbuffer)}const F=T.textures;for(let H=0,Y=F.length;H<Y;H++){const nt=i.get(F[H]);nt.__webglTexture&&(n.deleteTexture(nt.__webglTexture),a.memory.textures--),i.remove(F[H])}i.remove(T)}let U=0;function z(){U=0}function N(){return U}function B(T){U=T}function $(){const T=U;return T>=s.maxTextures&&Nt("WebGLTextures: Trying to use "+(T+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,T}function W(T){const p=[];return p.push(T.wrapS),p.push(T.wrapT),p.push(T.wrapR||0),p.push(T.magFilter),p.push(T.minFilter),p.push(T.anisotropy),p.push(T.internalFormat),p.push(T.format),p.push(T.type),p.push(T.generateMipmaps),p.push(T.premultiplyAlpha),p.push(T.flipY),p.push(T.unpackAlignment),p.push(T.colorSpace),p.join()}function it(T,p){const F=i.get(T);if(T.isVideoTexture&&D(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&F.__version!==T.version){const H=T.image;if(H===null)Nt("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Nt("WebGLRenderer: Texture marked for update but image is incomplete");else{_t(F,T,p);return}}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+p)}function X(T,p){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){_t(F,T,p);return}else T.isExternalTexture&&(F.__webglTexture=T.sourceTexture?T.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+p)}function j(T,p){const F=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){_t(F,T,p);return}e.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+p)}function tt(T,p){const F=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&F.__version!==T.version){It(F,T,p);return}e.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+p)}const Rt={[zr]:n.REPEAT,[Mi]:n.CLAMP_TO_EDGE,[Hr]:n.MIRRORED_REPEAT},Et={[we]:n.NEAREST,[Lh]:n.NEAREST_MIPMAP_NEAREST,[jn]:n.NEAREST_MIPMAP_LINEAR,[Le]:n.LINEAR,[tr]:n.LINEAR_MIPMAP_NEAREST,[Xi]:n.LINEAR_MIPMAP_LINEAR},ie={[Uh]:n.NEVER,[Gh]:n.ALWAYS,[Fh]:n.LESS,[Na]:n.LEQUAL,[Oh]:n.EQUAL,[Ua]:n.GEQUAL,[Bh]:n.GREATER,[kh]:n.NOTEQUAL};function Vt(T,p){if(p.type===ci&&t.has("OES_texture_float_linear")===!1&&(p.magFilter===Le||p.magFilter===tr||p.magFilter===jn||p.magFilter===Xi||p.minFilter===Le||p.minFilter===tr||p.minFilter===jn||p.minFilter===Xi)&&Nt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,Rt[p.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,Rt[p.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,Rt[p.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,Et[p.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,Et[p.minFilter]),p.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,ie[p.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(p.magFilter===we||p.minFilter!==jn&&p.minFilter!==Xi||p.type===ci&&t.has("OES_texture_float_linear")===!1)return;if(p.anisotropy>1||i.get(p).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(p.anisotropy,s.getMaxAnisotropy())),i.get(p).__currentAnisotropy=p.anisotropy}}}function $t(T,p){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,p.addEventListener("dispose",A));const H=p.source;let Y=g.get(H);Y===void 0&&(Y={},g.set(H,Y));const nt=W(p);if(nt!==T.__cacheKey){Y[nt]===void 0&&(Y[nt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),Y[nt].usedTimes++;const rt=Y[T.__cacheKey];rt!==void 0&&(Y[T.__cacheKey].usedTimes--,rt.usedTimes===0&&C(p)),T.__cacheKey=nt,T.__webglTexture=Y[nt].texture}return F}function q(T,p,F){return Math.floor(Math.floor(T/F)/p)}function Q(T,p,F,H){const nt=T.updateRanges;if(nt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,p.width,p.height,F,H,p.data);else{nt.sort((Tt,ut)=>Tt.start-ut.start);let rt=0;for(let Tt=1;Tt<nt.length;Tt++){const ut=nt[rt],ot=nt[Tt],At=ut.start+ut.count,Lt=q(ot.start,p.width,4),Ft=q(ut.start,p.width,4);ot.start<=At+1&&Lt===Ft&&q(ot.start+ot.count-1,p.width,4)===Lt?ut.count=Math.max(ut.count,ot.start+ot.count-ut.start):(++rt,nt[rt]=ot)}nt.length=rt+1;const K=e.getParameter(n.UNPACK_ROW_LENGTH),J=e.getParameter(n.UNPACK_SKIP_PIXELS),at=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,p.width);for(let Tt=0,ut=nt.length;Tt<ut;Tt++){const ot=nt[Tt],At=Math.floor(ot.start/4),Lt=Math.ceil(ot.count/4),Ft=At%p.width,L=Math.floor(At/p.width),ct=Lt,Z=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,Ft),e.pixelStorei(n.UNPACK_SKIP_ROWS,L),e.texSubImage2D(n.TEXTURE_2D,0,Ft,L,ct,Z,F,H,p.data)}T.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,K),e.pixelStorei(n.UNPACK_SKIP_PIXELS,J),e.pixelStorei(n.UNPACK_SKIP_ROWS,at)}}function _t(T,p,F){let H=n.TEXTURE_2D;(p.isDataArrayTexture||p.isCompressedArrayTexture)&&(H=n.TEXTURE_2D_ARRAY),p.isData3DTexture&&(H=n.TEXTURE_3D);const Y=$t(T,p),nt=p.source;e.bindTexture(H,T.__webglTexture,n.TEXTURE0+F);const rt=i.get(nt);if(nt.version!==rt.__version||Y===!0){if(e.activeTexture(n.TEXTURE0+F),(typeof ImageBitmap<"u"&&p.image instanceof ImageBitmap)===!1){const Z=Kt.getPrimaries(Kt.workingColorSpace),lt=p.colorSpace===Ui?null:Kt.getPrimaries(p.colorSpace),mt=p.colorSpace===Ui||Z===lt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt)}e.pixelStorei(n.UNPACK_ALIGNMENT,p.unpackAlignment);let J=m(p.image,!1,s.maxTextureSize);J=Ee(p,J);const at=r.convert(p.format,p.colorSpace),Tt=r.convert(p.type);let ut=y(p.internalFormat,at,Tt,p.normalized,p.colorSpace,p.isVideoTexture);Vt(H,p);let ot;const At=p.mipmaps,Lt=p.isVideoTexture!==!0,Ft=rt.__version===void 0||Y===!0,L=nt.dataReady,ct=w(p,J);if(p.isDepthTexture)ut=E(p.format===qi,p.type),Ft&&(Lt?e.texStorage2D(n.TEXTURE_2D,1,ut,J.width,J.height):e.texImage2D(n.TEXTURE_2D,0,ut,J.width,J.height,0,at,Tt,null));else if(p.isDataTexture)if(At.length>0){Lt&&Ft&&e.texStorage2D(n.TEXTURE_2D,ct,ut,At[0].width,At[0].height);for(let Z=0,lt=At.length;Z<lt;Z++)ot=At[Z],Lt?L&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,ot.width,ot.height,at,Tt,ot.data):e.texImage2D(n.TEXTURE_2D,Z,ut,ot.width,ot.height,0,at,Tt,ot.data);p.generateMipmaps=!1}else Lt?(Ft&&e.texStorage2D(n.TEXTURE_2D,ct,ut,J.width,J.height),L&&Q(p,J,at,Tt)):e.texImage2D(n.TEXTURE_2D,0,ut,J.width,J.height,0,at,Tt,J.data);else if(p.isCompressedTexture)if(p.isCompressedArrayTexture){Lt&&Ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,ut,At[0].width,At[0].height,J.depth);for(let Z=0,lt=At.length;Z<lt;Z++)if(ot=At[Z],p.format!==ei)if(at!==null)if(Lt){if(L)if(p.layerUpdates.size>0){const mt=Go(ot.width,ot.height,p.format,p.type);for(const et of p.layerUpdates){const Ct=ot.data.subarray(et*mt/ot.data.BYTES_PER_ELEMENT,(et+1)*mt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,et,ot.width,ot.height,1,at,Ct)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,ot.width,ot.height,J.depth,at,ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,ut,ot.width,ot.height,J.depth,0,ot.data,0,0);else Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?L&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,ot.width,ot.height,J.depth,at,Tt,ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Z,ut,ot.width,ot.height,J.depth,0,at,Tt,ot.data);p.layerUpdates.size>0&&p.clearLayerUpdates()}else{Lt&&Ft&&e.texStorage2D(n.TEXTURE_2D,ct,ut,At[0].width,At[0].height);for(let Z=0,lt=At.length;Z<lt;Z++)ot=At[Z],p.format!==ei?at!==null?Lt?L&&e.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,ot.width,ot.height,at,ot.data):e.compressedTexImage2D(n.TEXTURE_2D,Z,ut,ot.width,ot.height,0,ot.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?L&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,ot.width,ot.height,at,Tt,ot.data):e.texImage2D(n.TEXTURE_2D,Z,ut,ot.width,ot.height,0,at,Tt,ot.data)}else if(p.isDataArrayTexture)if(Lt){if(Ft&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ct,ut,J.width,J.height,J.depth),L)if(p.layerUpdates.size>0){const Z=Go(J.width,J.height,p.format,p.type);for(const lt of p.layerUpdates){const mt=J.data.subarray(lt*Z/J.data.BYTES_PER_ELEMENT,(lt+1)*Z/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,lt,J.width,J.height,1,at,Tt,mt)}p.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,at,Tt,J.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,ut,J.width,J.height,J.depth,0,at,Tt,J.data);else if(p.isData3DTexture)Lt?(Ft&&e.texStorage3D(n.TEXTURE_3D,ct,ut,J.width,J.height,J.depth),L&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,at,Tt,J.data)):e.texImage3D(n.TEXTURE_3D,0,ut,J.width,J.height,J.depth,0,at,Tt,J.data);else if(p.isFramebufferTexture){if(Ft)if(Lt)e.texStorage2D(n.TEXTURE_2D,ct,ut,J.width,J.height);else{let Z=J.width,lt=J.height;for(let mt=0;mt<ct;mt++)e.texImage2D(n.TEXTURE_2D,mt,ut,Z,lt,0,at,Tt,null),Z>>=1,lt>>=1}}else if(p.isHTMLTexture){if("texElementImage2D"in n){const Z=n.canvas;if(Z.hasAttribute("layoutsubtree")||Z.setAttribute("layoutsubtree","true"),J.parentNode!==Z){Z.appendChild(J),f.add(p),Z.onpaint=lt=>{const mt=lt.changedElements;for(const et of f)mt.includes(et.image)&&(et.needsUpdate=!0)},Z.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,J);else{const mt=n.RGBA,et=n.RGBA,Ct=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,mt,et,Ct,J)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(At.length>0){if(Lt&&Ft){const Z=ne(At[0]);e.texStorage2D(n.TEXTURE_2D,ct,ut,Z.width,Z.height)}for(let Z=0,lt=At.length;Z<lt;Z++)ot=At[Z],Lt?L&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,at,Tt,ot):e.texImage2D(n.TEXTURE_2D,Z,ut,at,Tt,ot);p.generateMipmaps=!1}else if(Lt){if(Ft){const Z=ne(J);e.texStorage2D(n.TEXTURE_2D,ct,ut,Z.width,Z.height)}L&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,at,Tt,J)}else e.texImage2D(n.TEXTURE_2D,0,ut,at,Tt,J);d(p)&&M(H),rt.__version=nt.version,p.onUpdate&&p.onUpdate(p)}T.__version=p.version}function It(T,p,F){if(p.image.length!==6)return;const H=$t(T,p),Y=p.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+F);const nt=i.get(Y);if(Y.version!==nt.__version||H===!0){e.activeTexture(n.TEXTURE0+F);const rt=Kt.getPrimaries(Kt.workingColorSpace),K=p.colorSpace===Ui?null:Kt.getPrimaries(p.colorSpace),J=p.colorSpace===Ui||rt===K?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,p.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,p.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,p.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const at=p.isCompressedTexture||p.image[0].isCompressedTexture,Tt=p.image[0]&&p.image[0].isDataTexture,ut=[];for(let et=0;et<6;et++)!at&&!Tt?ut[et]=m(p.image[et],!0,s.maxCubemapSize):ut[et]=Tt?p.image[et].image:p.image[et],ut[et]=Ee(p,ut[et]);const ot=ut[0],At=r.convert(p.format,p.colorSpace),Lt=r.convert(p.type),Ft=y(p.internalFormat,At,Lt,p.normalized,p.colorSpace),L=p.isVideoTexture!==!0,ct=nt.__version===void 0||H===!0,Z=Y.dataReady;let lt=w(p,ot);Vt(n.TEXTURE_CUBE_MAP,p);let mt;if(at){L&&ct&&e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ft,ot.width,ot.height);for(let et=0;et<6;et++){mt=ut[et].mipmaps;for(let Ct=0;Ct<mt.length;Ct++){const St=mt[Ct];p.format!==ei?At!==null?L?Z&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct,0,0,St.width,St.height,At,St.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct,Ft,St.width,St.height,0,St.data):Nt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct,0,0,St.width,St.height,At,Lt,St.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct,Ft,St.width,St.height,0,At,Lt,St.data)}}}else{if(mt=p.mipmaps,L&&ct){mt.length>0&&lt++;const et=ne(ut[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,lt,Ft,et.width,et.height)}for(let et=0;et<6;et++)if(Tt){L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,ut[et].width,ut[et].height,At,Lt,ut[et].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Ft,ut[et].width,ut[et].height,0,At,Lt,ut[et].data);for(let Ct=0;Ct<mt.length;Ct++){const oe=mt[Ct].image[et].image;L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct+1,0,0,oe.width,oe.height,At,Lt,oe.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct+1,Ft,oe.width,oe.height,0,At,Lt,oe.data)}}else{L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,0,0,At,Lt,ut[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,0,Ft,At,Lt,ut[et]);for(let Ct=0;Ct<mt.length;Ct++){const St=mt[Ct];L?Z&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct+1,0,0,At,Lt,St.image[et]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+et,Ct+1,Ft,At,Lt,St.image[et])}}}d(p)&&M(n.TEXTURE_CUBE_MAP),nt.__version=Y.version,p.onUpdate&&p.onUpdate(p)}T.__version=p.version}function gt(T,p,F,H,Y,nt){const rt=r.convert(F.format,F.colorSpace),K=r.convert(F.type),J=y(F.internalFormat,rt,K,F.normalized,F.colorSpace),at=i.get(p),Tt=i.get(F);if(Tt.__renderTarget=p,!at.__hasExternalTextures){const ut=Math.max(1,p.width>>nt),ot=Math.max(1,p.height>>nt);Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?e.texImage3D(Y,nt,J,ut,ot,p.depth,0,rt,K,null):e.texImage2D(Y,nt,J,ut,ot,0,rt,K,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),le(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,H,Y,Tt.__webglTexture,0,Xt(p)):(Y===n.TEXTURE_2D||Y>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,H,Y,Tt.__webglTexture,nt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ot(T,p,F){if(n.bindRenderbuffer(n.RENDERBUFFER,T),p.depthBuffer){const H=p.depthTexture,Y=H&&H.isDepthTexture?H.type:null,nt=E(p.stencilBuffer,Y),rt=p.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;le(p)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(p),nt,p.width,p.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(p),nt,p.width,p.height):n.renderbufferStorage(n.RENDERBUFFER,nt,p.width,p.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,T)}else{const H=p.textures;for(let Y=0;Y<H.length;Y++){const nt=H[Y],rt=r.convert(nt.format,nt.colorSpace),K=r.convert(nt.type),J=y(nt.internalFormat,rt,K,nt.normalized,nt.colorSpace);le(p)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xt(p),J,p.width,p.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt(p),J,p.width,p.height):n.renderbufferStorage(n.RENDERBUFFER,J,p.width,p.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pe(T,p,F){const H=p.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(p.depthTexture&&p.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Y=i.get(p.depthTexture);if(Y.__renderTarget=p,(!Y.__webglTexture||p.depthTexture.image.width!==p.width||p.depthTexture.image.height!==p.height)&&(p.depthTexture.image.width=p.width,p.depthTexture.image.height=p.height,p.depthTexture.needsUpdate=!0),H){if(Y.__webglInit===void 0&&(Y.__webglInit=!0,p.depthTexture.addEventListener("dispose",A)),Y.__webglTexture===void 0){Y.__webglTexture=n.createTexture(),e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Vt(n.TEXTURE_CUBE_MAP,p.depthTexture);const at=r.convert(p.depthTexture.format),Tt=r.convert(p.depthTexture.type);let ut;p.depthTexture.format===wi?ut=n.DEPTH_COMPONENT24:p.depthTexture.format===qi&&(ut=n.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ut,p.width,p.height,0,at,Tt,null)}}else it(p.depthTexture,0);const nt=Y.__webglTexture,rt=Xt(p),K=H?n.TEXTURE_CUBE_MAP_POSITIVE_X+F:n.TEXTURE_2D,J=p.depthTexture.format===qi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(p.depthTexture.format===wi)le(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,K,nt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,J,K,nt,0);else if(p.depthTexture.format===qi)le(p)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,K,nt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,J,K,nt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Bt(T){const p=i.get(T),F=T.isWebGLCubeRenderTarget===!0;if(p.__boundDepthTexture!==T.depthTexture){const H=T.depthTexture;if(p.__depthDisposeCallback&&p.__depthDisposeCallback(),H){const Y=()=>{delete p.__boundDepthTexture,delete p.__depthDisposeCallback,H.removeEventListener("dispose",Y)};H.addEventListener("dispose",Y),p.__depthDisposeCallback=Y}p.__boundDepthTexture=H}if(T.depthTexture&&!p.__autoAllocateDepthBuffer)if(F)for(let H=0;H<6;H++)pe(p.__webglFramebuffer[H],T,H);else{const H=T.texture.mipmaps;H&&H.length>0?pe(p.__webglFramebuffer[0],T,0):pe(p.__webglFramebuffer,T,0)}else if(F){p.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer[H]),p.__webglDepthbuffer[H]===void 0)p.__webglDepthbuffer[H]=n.createRenderbuffer(),Ot(p.__webglDepthbuffer[H],T,!1);else{const Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=p.__webglDepthbuffer[H];n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,nt)}}else{const H=T.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,p.__webglFramebuffer),p.__webglDepthbuffer===void 0)p.__webglDepthbuffer=n.createRenderbuffer(),Ot(p.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,nt=p.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,nt),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,nt)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function ht(T,p,F){const H=i.get(T);p!==void 0&&gt(H.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&Bt(T)}function Pt(T){const p=T.texture,F=i.get(T),H=i.get(p);T.addEventListener("dispose",_);const Y=T.textures,nt=T.isWebGLCubeRenderTarget===!0,rt=Y.length>1;if(rt||(H.__webglTexture===void 0&&(H.__webglTexture=n.createTexture()),H.__version=p.version,a.memory.textures++),nt){F.__webglFramebuffer=[];for(let K=0;K<6;K++)if(p.mipmaps&&p.mipmaps.length>0){F.__webglFramebuffer[K]=[];for(let J=0;J<p.mipmaps.length;J++)F.__webglFramebuffer[K][J]=n.createFramebuffer()}else F.__webglFramebuffer[K]=n.createFramebuffer()}else{if(p.mipmaps&&p.mipmaps.length>0){F.__webglFramebuffer=[];for(let K=0;K<p.mipmaps.length;K++)F.__webglFramebuffer[K]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(rt)for(let K=0,J=Y.length;K<J;K++){const at=i.get(Y[K]);at.__webglTexture===void 0&&(at.__webglTexture=n.createTexture(),a.memory.textures++)}if(T.samples>0&&le(T)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let K=0;K<Y.length;K++){const J=Y[K];F.__webglColorRenderbuffer[K]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[K]);const at=r.convert(J.format,J.colorSpace),Tt=r.convert(J.type),ut=y(J.internalFormat,at,Tt,J.normalized,J.colorSpace,T.isXRRenderTarget===!0),ot=Xt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,ot,ut,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+K,n.RENDERBUFFER,F.__webglColorRenderbuffer[K])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),Ot(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(nt){e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture),Vt(n.TEXTURE_CUBE_MAP,p);for(let K=0;K<6;K++)if(p.mipmaps&&p.mipmaps.length>0)for(let J=0;J<p.mipmaps.length;J++)gt(F.__webglFramebuffer[K][J],T,p,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,J);else gt(F.__webglFramebuffer[K],T,p,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);d(p)&&M(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){for(let K=0,J=Y.length;K<J;K++){const at=Y[K],Tt=i.get(at);let ut=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ut=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ut,Tt.__webglTexture),Vt(ut,at),gt(F.__webglFramebuffer,T,at,n.COLOR_ATTACHMENT0+K,ut,0),d(at)&&M(ut)}e.unbindTexture()}else{let K=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(K=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(K,H.__webglTexture),Vt(K,p),p.mipmaps&&p.mipmaps.length>0)for(let J=0;J<p.mipmaps.length;J++)gt(F.__webglFramebuffer[J],T,p,n.COLOR_ATTACHMENT0,K,J);else gt(F.__webglFramebuffer,T,p,n.COLOR_ATTACHMENT0,K,0);d(p)&&M(K),e.unbindTexture()}T.depthBuffer&&Bt(T)}function bt(T){const p=T.textures;for(let F=0,H=p.length;F<H;F++){const Y=p[F];if(d(Y)){const nt=R(T),rt=i.get(Y).__webglTexture;e.bindTexture(nt,rt),M(nt),e.unbindTexture()}}}const Qt=[],de=[];function ye(T){if(T.samples>0){if(le(T)===!1){const p=T.textures,F=T.width,H=T.height;let Y=n.COLOR_BUFFER_BIT;const nt=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=i.get(T),K=p.length>1;if(K)for(let at=0;at<p.length;at++)e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,rt.__webglMultisampledFramebuffer);const J=T.texture.mipmaps;J&&J.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglFramebuffer);for(let at=0;at<p.length;at++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Y|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Y|=n.STENCIL_BUFFER_BIT)),K){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const Tt=i.get(p[at]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Tt,0)}n.blitFramebuffer(0,0,F,H,0,0,F,H,Y,n.NEAREST),c===!0&&(Qt.length=0,de.length=0,Qt.push(n.COLOR_ATTACHMENT0+at),T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&(Qt.push(nt),de.push(nt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,de)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Qt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),K)for(let at=0;at<p.length;at++){e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.RENDERBUFFER,rt.__webglColorRenderbuffer[at]);const Tt=i.get(p[at]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,rt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+at,n.TEXTURE_2D,Tt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,rt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.storeMultisampledDepthBuffer===!1&&c){const p=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[p])}}}function Xt(T){return Math.min(s.maxSamples,T.samples)}function le(T){const p=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&p.__useRenderToTexture!==!1}function D(T){const p=a.render.frame;u.get(T)!==p&&(u.set(T,p),T.update())}function Ee(T,p){const F=T.colorSpace,H=T.format,Y=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Ns&&F!==Ui&&(Kt.getTransfer(F)===se?(H!==ei||Y!==Ve)&&Nt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):jt("WebGLTextures: Unsupported texture color space:",F)),p}function ne(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=z,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=it,this.setTexture2DArray=X,this.setTexture3D=j,this.setTextureCube=tt,this.rebindTextures=ht,this.setupRenderTarget=Pt,this.updateRenderTargetMipmap=bt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=le,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function U0(n,t){function e(i,s=Ui){let r;const a=Kt.getTransfer(s);if(i===Ve)return n.UNSIGNED_BYTE;if(i===Ca)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Pa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Bc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===kc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Fc)return n.BYTE;if(i===Oc)return n.SHORT;if(i===zn)return n.UNSIGNED_SHORT;if(i===Ra)return n.INT;if(i===fi)return n.UNSIGNED_INT;if(i===ci)return n.FLOAT;if(i===pi)return n.HALF_FLOAT;if(i===Gc)return n.ALPHA;if(i===zc)return n.RGB;if(i===ei)return n.RGBA;if(i===wi)return n.DEPTH_COMPONENT;if(i===qi)return n.DEPTH_STENCIL;if(i===Hc)return n.RED;if(i===La)return n.RED_INTEGER;if(i===$i)return n.RG;if(i===Da)return n.RG_INTEGER;if(i===Ia)return n.RGBA_INTEGER;if(i===As||i===Rs||i===Cs||i===Ps)if(a===se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===As)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Rs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ps)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===As)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Rs)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Cs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ps)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Vr||i===Wr||i===Xr||i===qr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Vr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Xr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===qr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Yr||i===Kr||i===$r||i===Zr||i===Jr||i===Ds||i===Qr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Yr||i===Kr)return a===se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===$r)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Zr)return r.COMPRESSED_R11_EAC;if(i===Jr)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ds)return r.COMPRESSED_RG11_EAC;if(i===Qr)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===jr||i===ta||i===ea||i===ia||i===na||i===sa||i===ra||i===aa||i===oa||i===ca||i===la||i===ha||i===ua||i===da)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===jr)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ta)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ea)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ia)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===na)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ra)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===aa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oa)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ca)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===la)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ha)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ua)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===da)return a===se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fa||i===pa||i===ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===fa)return a===se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ga||i===_a||i===Is||i===xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ga)return r.COMPRESSED_RED_RGTC1_EXT;if(i===_a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Is)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Hn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const F0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,O0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class B0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Zc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new mi({vertexShader:F0,fragmentShader:O0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new st(new Kn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class k0 extends Zi{constructor(t,e){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,g=null,v=null;const S=typeof XRWebGLBinding<"u",m=new B0,d={},M=e.getContextAttributes();let R=null,y=null;const E=[],w=[],A=new Ht;let _=null,b=null;const C=new He;C.viewport=new fe;const I=new He;I.viewport=new fe;const U=[C,I],z=new qu;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=E[q];return Q===void 0&&(Q=new or,E[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=E[q];return Q===void 0&&(Q=new or,E[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=E[q];return Q===void 0&&(Q=new or,E[q]=Q),Q.getHandSpace()};function $(q){const Q=w.indexOf(q.inputSource);if(Q===-1)return;const _t=E[Q];_t!==void 0&&(_t.update(q.inputSource,q.frame,l||a),_t.dispatchEvent({type:q.type,data:q.inputSource}))}function W(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",it);for(let q=0;q<E.length;q++){const Q=w[q];Q!==null&&(w[q]=null,E[q].disconnect(Q))}N=null,B=null,m.reset();for(const q in d)delete d[q];if(t.setRenderTarget(R),g=null,h=null,f=null,s=null,y=null,$t.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(A.width,A.height,!1),b!==null){const q=b.camera;q.fov=b.fov,q.zoom=b.zoom,q.updateProjectionMatrix(),b=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Nt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Nt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return h!==null?h:g},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",W),s.addEventListener("inputsourceschange",it),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(A),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let _t=null,It=null,gt=null;M.depth&&(gt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=M.stencil?qi:wi,It=M.stencil?Hn:fi);const Ot={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};f=this.getBinding(),h=f.createProjectionLayer(Ot),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new ii(h.textureWidth,h.textureHeight,{format:ei,type:Ve,depthTexture:new Xn(h.textureWidth,h.textureHeight,It,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const _t={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),y=new ii(g.framebufferWidth,g.framebufferHeight,{format:ei,type:Ve,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function it(q){for(let Q=0;Q<q.removed.length;Q++){const _t=q.removed[Q],It=w.indexOf(_t);It>=0&&(w[It]=null,E[It].disconnect(_t))}for(let Q=0;Q<q.added.length;Q++){const _t=q.added[Q];let It=w.indexOf(_t);if(It===-1){for(let Ot=0;Ot<E.length;Ot++)if(Ot>=w.length){w.push(_t),It=Ot;break}else if(w[Ot]===null){w[Ot]=_t,It=Ot;break}if(It===-1)break}const gt=E[It];gt&&gt.connect(_t)}}const X=new O,j=new O;function tt(q,Q,_t){X.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(_t.matrixWorld);const It=X.distanceTo(j),gt=Q.projectionMatrix.elements,Ot=_t.projectionMatrix.elements,pe=gt[14]/(gt[10]-1),Bt=gt[14]/(gt[10]+1),ht=(gt[9]+1)/gt[5],Pt=(gt[9]-1)/gt[5],bt=(gt[8]-1)/gt[0],Qt=(Ot[8]+1)/Ot[0],de=pe*bt,ye=pe*Qt,Xt=It/(-bt+Qt),le=Xt*-bt;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(le),q.translateZ(Xt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),gt[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const D=pe+Xt,Ee=Bt+Xt,ne=de-le,T=ye+(It-le),p=ht*Bt/Ee*D,F=Pt*Bt/Ee*D;q.projectionMatrix.makePerspective(ne,T,p,F,D,Ee),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Rt(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Q=q.near,_t=q.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(_t=m.depthFar)),z.near=I.near=C.near=Q,z.far=I.far=C.far=_t,(N!==z.near||B!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),N=z.near,B=z.far),z.layers.mask=q.layers.mask|6,C.layers.mask=z.layers.mask&-5,I.layers.mask=z.layers.mask&-3;const It=q.parent,gt=z.cameras;Rt(z,It);for(let Ot=0;Ot<gt.length;Ot++)Rt(gt[Ot],It);gt.length===2?tt(z,C,I):z.projectionMatrix.copy(C.projectionMatrix),b===null&&q.isPerspectiveCamera&&(b={camera:q,fov:q.fov,zoom:q.zoom}),Et(q,z,It)};function Et(q,Q,_t){_t===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(_t.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Wn*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&g===null))return c},this.setFoveation=function(q){c=q,h!==null&&(h.fixedFoveation=q),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function(q){return d[q]};let ie=null;function Vt(q,Q){if(u=Q.getViewerPose(l||a),v=Q,u!==null){const _t=u.views;g!==null&&(t.setRenderTargetFramebuffer(y,g.framebuffer),t.setRenderTarget(y));let It=!1;_t.length!==z.cameras.length&&(z.cameras.length=0,It=!0);for(let Bt=0;Bt<_t.length;Bt++){const ht=_t[Bt];let Pt=null;if(g!==null)Pt=g.getViewport(ht);else{const Qt=f.getViewSubImage(h,ht);Pt=Qt.viewport,Bt===0&&(t.setRenderTargetTextures(y,Qt.colorTexture,Qt.depthStencilTexture),t.setRenderTarget(y))}let bt=U[Bt];bt===void 0&&(bt=new He,bt.layers.enable(Bt),bt.viewport=new fe,U[Bt]=bt),bt.matrix.fromArray(ht.transform.matrix),bt.matrix.decompose(bt.position,bt.quaternion,bt.scale),bt.projectionMatrix.fromArray(ht.projectionMatrix),bt.projectionMatrixInverse.copy(bt.projectionMatrix).invert(),bt.viewport.set(Pt.x,Pt.y,Pt.width,Pt.height),Bt===0&&(z.matrix.copy(bt.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),It===!0&&z.cameras.push(bt)}const gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const Bt=f.getDepthInformation(_t[0]);Bt&&Bt.isValid&&Bt.texture&&m.init(Bt,s.renderState)}if(gt&&gt.includes("camera-access")&&S){t.state.unbindTexture(),f=i.getBinding();for(let Bt=0;Bt<_t.length;Bt++){const ht=_t[Bt].camera;if(ht){let Pt=d[ht];Pt||(Pt=new Zc,d[ht]=Pt);const bt=f.getCameraImage(ht);Pt.sourceTexture=bt}}}}for(let _t=0;_t<E.length;_t++){const It=w[_t],gt=E[_t];It!==null&&gt!==void 0&&gt.update(It,Q,l||a)}ie&&ie(q,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),v=null}const $t=new tl;$t.setAnimationLoop(Vt),this.setAnimationLoop=function(q){ie=q},this.dispose=function(){}}}const G0=new me,ol=new Ut;ol.set(-1,0,0,0,1,0,0,0,1);function z0(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Jc(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,M,R,y){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(m,d):d.isMeshLambertMaterial?(r(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(m,d),f(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(m,d),h(m,d),d.isMeshPhysicalMaterial&&g(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),v(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),S(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,M,R):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Oe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Oe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const M=t.get(d),R=M.envMap,y=M.envMapRotation;R&&(m.envMap.value=R,m.envMapRotation.value.setFromMatrix4(G0.makeRotationFromEuler(y)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(ol),m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,M,R){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*M,m.scale.value=R*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function f(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function h(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function g(m,d,M){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Oe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.retroreflectivity>0&&(m.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function v(m,d){d.matcap&&(m.matcap.value=d.matcap)}function S(m,d){const M=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function H0(n,t,e,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,E){const w=E.program;i.uniformBlockBinding(y,w)}function l(y,E){let w=s[y.id];w===void 0&&(m(y),w=u(y),s[y.id]=w,y.addEventListener("dispose",M));const A=E.program;i.updateUBOMapping(y,A);const _=t.render.frame;r[y.id]!==_&&(h(y),r[y.id]=_)}function u(y){const E=f();y.__bindingPointIndex=E;const w=n.createBuffer(),A=y.__size,_=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,A,_),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,w),w}function f(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return jt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const E=s[y.id],w=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let _=0,b=w.length;_<b;_++){const C=w[_];if(Array.isArray(C))for(let I=0,U=C.length;I<U;I++)g(C[I],_,I,A);else g(C,_,0,A)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(y,E,w,A){if(S(y,E,w,A)===!0){const _=y.__offset,b=y.value;if(Array.isArray(b)){let C=0;for(let I=0;I<b.length;I++){const U=b[I],z=d(U);v(U,y.__data,C),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(C+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else v(b,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,_,y.__data)}}function v(y,E,w){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,w)}function S(y,E,w,A){const _=y.value,b=E+"_"+w;if(A[b]===void 0)return typeof _=="number"||typeof _=="boolean"?A[b]=_:ArrayBuffer.isView(_)?A[b]=_.slice():A[b]=_.clone(),!0;{const C=A[b];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return A[b]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function m(y){const E=y.uniforms;let w=0;const A=16;for(let b=0,C=E.length;b<C;b++){const I=Array.isArray(E[b])?E[b]:[E[b]];for(let U=0,z=I.length;U<z;U++){const N=I[U],B=Array.isArray(N.value)?N.value:[N.value];for(let $=0,W=B.length;$<W;$++){const it=B[$],X=d(it),j=w%A,tt=j%X.boundary,Rt=j+tt;w+=tt,Rt!==0&&A-Rt<X.storage&&(w+=A-Rt),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=w,w+=X.storage}}}const _=w%A;return _>0&&(w+=A-_),y.__size=w,y.__cache={},this}function d(y){const E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Nt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Nt("WebGLRenderer: Unsupported uniform value type.",y),E}function M(y){const E=y.target;E.removeEventListener("dispose",M);const w=a.indexOf(E.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function R(){for(const y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:R}}const V0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ai=null;function W0(){return ai===null&&(ai=new Pu(V0,16,16,$i,pi),ai.name="DFG_LUT",ai.minFilter=Le,ai.magFilter=Le,ai.wrapS=Mi,ai.wrapT=Mi,ai.generateMipmaps=!1,ai.needsUpdate=!0),ai}class X0{constructor(t={}){const{canvas:e=Vh(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:g=Ve}=t;this.isWebGLRenderer=!0;let v;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=i.getContextAttributes().alpha}else v=a;const S=g,m=new Set([Ia,Da,La]),d=new Set([Ve,fi,zn,Hn,Ca,Pa]),M=new Uint32Array(4),R=new Int32Array(4),y=new O;let E=null,w=null;const A=[],_=[];let b=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ui,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let I=!1,U=null,z=null,N=null,B=null;this._outputColorSpace=qe;let $=0,W=0,it=null,X=-1,j=null;const tt=new fe,Rt=new fe;let Et=null;const ie=new zt(0);let Vt=0,$t=e.width,q=e.height,Q=1,_t=null,It=null;const gt=new fe(0,0,$t,q),Ot=new fe(0,0,$t,q);let pe=!1;const Bt=new Ga;let ht=!1,Pt=!1;const bt=new me,Qt=new O,de=new fe,ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Xt=!1;function le(){return it===null?Q:1}let D=i;function Ee(x,P){return e.getContext(x,P)}let ne,T,p,F,H,Y,nt,rt,K,J,at,Tt,ut,ot,At,Lt,Ft,L,ct,Z,lt,mt,et;try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Aa}`),e.addEventListener("webglcontextlost",oe,!1),e.addEventListener("webglcontextrestored",te,!1),e.addEventListener("webglcontextcreationerror",Ke,!1),D===null){const P="webgl2";if(D=Ee(P,x),D===null)throw Ee(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ct()}catch(x){throw e.removeEventListener("webglcontextlost",oe,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",Ke,!1),jt("WebGLRenderer: "+x.message),x}function Ct(){ne=new Wp(D),ne.init(),lt=new U0(D,ne),T=new Np(D,ne,t,lt),p=new I0(D,ne),T.reversedDepthBuffer&&h&&p.buffers.depth.setReversed(!0),z=D.createFramebuffer(),N=D.createFramebuffer(),B=D.createFramebuffer(),F=new Yp(D),H=new v0,Y=new N0(D,ne,p,H,T,lt,F),nt=new Vp(C),rt=new Ku(D),mt=new Dp(D,rt),K=new Xp(D,rt,F,mt),J=new $p(D,K,rt,mt,F),L=new Kp(D,T,Y),At=new Up(H),at=new x0(C,nt,ne,T,mt,At),Tt=new z0(C,H),ut=new M0,ot=new A0(ne),Ft=new Lp(C,nt,p,J,v,c),Lt=new D0(C,J,T),et=new H0(D,F,T,p),ct=new Ip(D,ne,F),Z=new qp(D,ne,F),F.programs=at.programs,C.capabilities=T,C.extensions=ne,C.properties=H,C.renderLists=ut,C.shadowMap=Lt,C.state=p,C.info=F}S!==Ve&&(b=new Jp(S,e.width,e.height,o,s,r));const St=new k0(C,D);this.xr=St,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=ne.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=ne.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(x){x!==void 0&&(Q=x,this.setSize($t,q,!1))},this.getSize=function(x){return x.set($t,q)},this.setSize=function(x,P,V=!0){if(St.isPresenting){Nt("WebGLRenderer: Can't change size while VR device is presenting.");return}$t=x,q=P,e.width=Math.floor(x*Q),e.height=Math.floor(P*Q),V===!0&&(e.style.width=x+"px",e.style.height=P+"px"),b!==null&&b.setSize(e.width,e.height),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set($t*Q,q*Q).floor()},this.setDrawingBufferSize=function(x,P,V){$t=x,q=P,Q=V,e.width=Math.floor(x*V),e.height=Math.floor(P*V),this.setViewport(0,0,x,P)},this.setEffects=function(x){if(S===Ve){jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let P=0;P<x.length;P++)if(x[P].isOutputPass===!0){Nt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(tt)},this.getViewport=function(x){return x.copy(gt)},this.setViewport=function(x,P,V,k){x.isVector4?gt.set(x.x,x.y,x.z,x.w):gt.set(x,P,V,k),p.viewport(tt.copy(gt).multiplyScalar(Q).round())},this.getScissor=function(x){return x.copy(Ot)},this.setScissor=function(x,P,V,k){x.isVector4?Ot.set(x.x,x.y,x.z,x.w):Ot.set(x,P,V,k),p.scissor(Rt.copy(Ot).multiplyScalar(Q).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(x){p.setScissorTest(pe=x)},this.setOpaqueSort=function(x){_t=x},this.setTransparentSort=function(x){It=x},this.getClearColor=function(x){return x.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor(...arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,V=!0){let k=0;if(x){let G=!1;if(it!==null){const pt=it.texture.format;G=m.has(pt)}if(G){const pt=it.texture.type,vt=d.has(pt),ft=Ft.getClearColor(),yt=Ft.getClearAlpha(),wt=ft.r,kt=ft.g,Wt=ft.b;vt?(M[0]=wt,M[1]=kt,M[2]=Wt,M[3]=yt,D.clearBufferuiv(D.COLOR,0,M)):(R[0]=wt,R[1]=kt,R[2]=Wt,R[3]=yt,D.clearBufferiv(D.COLOR,0,R))}else k|=D.COLOR_BUFFER_BIT}P&&(k|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(k|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&D.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),U=x},this.dispose=function(){e.removeEventListener("webglcontextlost",oe,!1),e.removeEventListener("webglcontextrestored",te,!1),e.removeEventListener("webglcontextcreationerror",Ke,!1),Ft.dispose(),ut.dispose(),ot.dispose(),H.dispose(),nt.dispose(),J.dispose(),mt.dispose(),et.dispose(),at.dispose(),St.dispose(),St.removeEventListener("sessionstart",Ja),St.removeEventListener("sessionend",Qa),ki.stop()};function oe(x){x.preventDefault(),xo("WebGLRenderer: Context Lost."),I=!0}function te(){xo("WebGLRenderer: Context Restored."),I=!1;const x=F.autoReset,P=Lt.enabled,V=Lt.autoUpdate,k=Lt.needsUpdate,G=Lt.type;Ct(),F.autoReset=x,Lt.enabled=P,Lt.autoUpdate=V,Lt.needsUpdate=k,Lt.type=G}function Ke(x){jt("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function ni(x){const P=x.target;P.removeEventListener("dispose",ni),cl(P)}function cl(x){ll(x),H.remove(x)}function ll(x){const P=H.get(x).programs;P!==void 0&&(P.forEach(function(V){at.releaseProgram(V)}),x.isShaderMaterial&&at.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,V,k,G,pt){P===null&&(P=ye);const vt=G.isMesh&&G.matrixWorld.determinantAffine()<0,ft=dl(x,P,V,k,G);p.setMaterial(k,vt);let yt=V.index,wt=1;if(k.wireframe===!0){if(yt=K.getWireframeAttribute(V),yt===void 0)return;wt=2}const kt=V.drawRange,Wt=V.attributes.position;let Mt=kt.start*wt,ee=(kt.start+kt.count)*wt;pt!==null&&(Mt=Math.max(Mt,pt.start*wt),ee=Math.min(ee,(pt.start+pt.count)*wt)),yt!==null?(Mt=Math.max(Mt,0),ee=Math.min(ee,yt.count)):Wt!=null&&(Mt=Math.max(Mt,0),ee=Math.min(ee,Wt.count));const _e=ee-Mt;if(_e<0||_e===1/0)return;mt.setup(G,k,ft,V,yt);let he,ae=ct;if(yt!==null&&(he=rt.get(yt),ae=Z,ae.setIndex(he)),G.isMesh)k.wireframe===!0?(p.setLineWidth(k.wireframeLinewidth*le()),ae.setMode(D.LINES)):ae.setMode(D.TRIANGLES);else if(G.isLine){let Ae=k.linewidth;Ae===void 0&&(Ae=1),p.setLineWidth(Ae*le()),G.isLineSegments?ae.setMode(D.LINES):G.isLineLoop?ae.setMode(D.LINE_LOOP):ae.setMode(D.LINE_STRIP)}else G.isPoints?ae.setMode(D.POINTS):G.isSprite&&ae.setMode(D.TRIANGLES);if(G.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))ae.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ae=G._multiDrawStarts,xt=G._multiDrawCounts,Ie=G._multiDrawCount,Jt=yt?rt.get(yt).bytesPerElement:1,We=H.get(k).currentProgram.getUniforms();for(let si=0;si<Ie;si++)We.setValue(D,"_gl_DrawID",si),ae.render(Ae[si]/Jt,xt[si])}else if(G.isInstancedMesh)ae.renderInstances(Mt,_e,G.count);else if(V.isInstancedBufferGeometry){const Ae=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,xt=Math.min(V.instanceCount,Ae);ae.renderInstances(Mt,_e,xt)}else ae.render(Mt,_e)};function Za(x,P,V,k){U!==null&&x.isNodeMaterial&&U.setObject(k,x),ht===!0&&At.setState(x,V,!1),x.transparent===!0&&x.side===je&&x.forceSinglePass===!1?(x.side=Oe,x.needsUpdate=!0,Zn(x,P,k),x.side=Yi,x.needsUpdate=!0,Zn(x,P,k),x.side=je):Zn(x,P,k)}this.compile=function(x,P,V=null){V===null&&(V=x),U!==null&&U.renderStart(x,P,V),w=ot.get(V),w.init(P),_.push(w),V.traverseVisible(function(G){G.isLight&&G.layers.test(P.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),x!==V&&x.traverseVisible(function(G){G.isLight&&G.layers.test(P.layers)&&(w.pushLight(G),G.castShadow&&w.pushShadow(G))}),w.setupLights(),U!==null&&U.updateLights(w.state.lightsArray),Pt=this.localClippingEnabled,ht=At.init(this.clippingPlanes,Pt),ht===!0&&At.setGlobalState(this.clippingPlanes,P),U!==null&&Lt.render(w.state.shadowsArray,V,P);const k=new Set;return x.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const pt=G.material;if(pt)if(Array.isArray(pt))for(let vt=0;vt<pt.length;vt++){const ft=pt[vt];Za(ft,V,P,G),k.add(ft)}else Za(pt,V,P,G),k.add(pt)}),w=_.pop(),U!==null&&U.renderEnd(),k},this.compileAsync=function(x,P,V=null){const k=this.compile(x,P,V);return new Promise(G=>{function pt(){if(k.forEach(function(vt){const yt=H.get(vt).currentProgram;(yt===void 0||yt.isReady())&&k.delete(vt)}),k.size===0){G(x);return}setTimeout(pt,10)}ne.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Ys=null;function hl(x){Ys&&Ys(x)}function Ja(){ki.stop()}function Qa(){ki.start()}const ki=new tl;ki.setAnimationLoop(hl),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(x){Ys=x,St.setAnimationLoop(x),x===null?ki.stop():ki.start()},St.addEventListener("sessionstart",Ja),St.addEventListener("sessionend",Qa),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;U!==null&&U.renderStart(x,P);const V=St.enabled===!0&&St.isPresenting===!0,k=b!==null&&(it===null||V)&&b.begin(C,it);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(St.cameraAutoUpdate===!0&&St.updateCamera(P),P=St.getCamera()),x.isScene===!0&&x.onBeforeRender(C,x,P,it),w=ot.get(x,_.length),w.init(P),w.state.textureUnits=Y.getTextureUnits(),_.push(w),bt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Bt.setFromProjectionMatrix(bt,li,P.reversedDepth),Pt=this.localClippingEnabled,ht=At.init(this.clippingPlanes,Pt),E=ut.get(x,A.length),E.init(),A.push(E),St.enabled===!0&&St.isPresenting===!0){const vt=C.xr.getDepthSensingMesh();vt!==null&&Ks(vt,P,-1/0,C.sortObjects)}Ks(x,P,0,C.sortObjects),E.finish(),U!==null&&U.updateLights(w.state.lightsArray),C.sortObjects===!0&&E.sort(_t,It),Xt=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,Xt&&Ft.addToRenderList(E,x),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ht===!0&&At.beginShadows();const G=w.state.shadowsArray;if(Lt.render(G,x,P),ht===!0&&At.endShadows(),(k&&b.hasRenderPass())===!1){const vt=E.opaque,ft=E.transmissive;if(w.setupLights(),P.isArrayCamera){const yt=P.cameras;if(ft.length>0)for(let wt=0,kt=yt.length;wt<kt;wt++){const Wt=yt[wt];to(vt,ft,x,Wt)}Xt&&Ft.render(x);for(let wt=0,kt=yt.length;wt<kt;wt++){const Wt=yt[wt];ja(E,x,Wt,Wt.viewport)}}else ft.length>0&&to(vt,ft,x,P),Xt&&Ft.render(x),ja(E,x,P)}it!==null&&W===0&&(Y.updateMultisampleRenderTarget(it),Y.updateRenderTargetMipmap(it)),k&&b.end(C),x.isScene===!0&&x.onAfterRender(C,x,P),mt.resetDefaultState(),X=-1,j=null,_.pop(),_.length>0?(w=_[_.length-1],Y.setTextureUnits(w.state.textureUnits),ht===!0&&At.setGlobalState(C.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,U!==null&&U.renderEnd()};function Ks(x,P,V,k){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLightProbeGrid)w.pushLightProbeGrid(x);else if(x.isLight)w.pushLight(x),x.castShadow&&w.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||x.intersectsFrustum(Bt)){k&&de.setFromMatrixPosition(x.matrixWorld).applyMatrix4(bt);const vt=J.update(x),ft=x.material;ft.visible&&E.push(x,vt,ft,V,de.z,null,P)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||x.intersectsFrustum(Bt))){const vt=J.update(x),ft=x.material;if(k&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),de.copy(x.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),de.copy(vt.boundingSphere.center)),de.applyMatrix4(x.matrixWorld).applyMatrix4(bt)),Array.isArray(ft)){const yt=vt.groups;for(let wt=0,kt=yt.length;wt<kt;wt++){const Wt=yt[wt],Mt=ft[Wt.materialIndex];Mt&&Mt.visible&&E.push(x,vt,Mt,V,de.z,Wt,P)}}else ft.visible&&E.push(x,vt,ft,V,de.z,null,P)}}const pt=x.children;for(let vt=0,ft=pt.length;vt<ft;vt++)Ks(pt[vt],P,V,k)}function ja(x,P,V,k){const{opaque:G,transmissive:pt,transparent:vt}=x;w.setupLightsView(V),ht===!0&&At.setGlobalState(C.clippingPlanes,V),k&&p.viewport(tt.copy(k)),G.length>0&&$n(G,P,V),pt.length>0&&$n(pt,P,V),vt.length>0&&$n(vt,P,V),p.buffers.depth.setTest(!0),p.buffers.depth.setMask(!0),p.buffers.color.setMask(!0),p.setPolygonOffset(!1)}function to(x,P,V,k){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){const Mt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new ii(1,1,{generateMipmaps:!0,type:Mt?pi:Ve,minFilter:Xi,samples:Math.max(4,T.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const pt=w.state.transmissionRenderTarget[k.id],vt=k.viewport||tt;pt.setSize(vt.z*C.transmissionResolutionScale,vt.w*C.transmissionResolutionScale);const ft=C.getRenderTarget(),yt=C.getActiveCubeFace(),wt=C.getActiveMipmapLevel();C.setRenderTarget(pt),C.getClearColor(ie),Vt=C.getClearAlpha(),Vt<1&&C.setClearColor(16777215,.5),C.clear(),Xt&&Ft.render(V);const kt=C.toneMapping;C.toneMapping=ui;const Wt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),ht===!0&&At.setGlobalState(C.clippingPlanes,k),$n(x,V,k),Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Mt=!1;for(let ee=0,_e=P.length;ee<_e;ee++){const he=P[ee],{object:ae,geometry:Ae,material:xt,group:Ie}=he;if(xt.side===je&&ae.layers.test(k.layers)){const Jt=xt.side;xt.side=Oe,xt.needsUpdate=!0,eo(ae,V,k,Ae,xt,Ie),xt.side=Jt,xt.needsUpdate=!0,Mt=!0}}Mt===!0&&(Y.updateMultisampleRenderTarget(pt),Y.updateRenderTargetMipmap(pt))}C.setRenderTarget(ft,yt,wt),C.setClearColor(ie,Vt),Wt!==void 0&&(k.viewport=Wt),C.toneMapping=kt}function $n(x,P,V){const k=P.isScene===!0?P.overrideMaterial:null;for(let G=0,pt=x.length;G<pt;G++){const vt=x[G],{object:ft,geometry:yt,group:wt}=vt;let kt=vt.material;kt.allowOverride===!0&&k!==null&&(kt=k),ft.layers.test(V.layers)&&eo(ft,P,V,yt,kt,wt)}}function eo(x,P,V,k,G,pt){U!==null&&G.isNodeMaterial&&U.setObject(x,G),x.onBeforeRender(C,P,V,k,G,pt),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),G.onBeforeRender(C,P,V,k,x,pt),G.transparent===!0&&G.side===je&&G.forceSinglePass===!1?(G.side=Oe,G.needsUpdate=!0,C.renderBufferDirect(V,P,k,G,x,pt),G.side=Yi,G.needsUpdate=!0,C.renderBufferDirect(V,P,k,G,x,pt),G.side=je):C.renderBufferDirect(V,P,k,G,x,pt),x.onAfterRender(C,P,V,k,G,pt)}function Zn(x,P,V){P.isScene!==!0&&(P=ye);const k=H.get(x),G=w.state.lights,pt=w.state.shadowsArray,vt=G.state.version,ft=at.getParameters(x,G.state,pt,P,V,w.state.lightProbeGridArray),yt=at.getProgramCacheKey(ft);let wt=k.programs;k.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,k.fog=P.fog;const kt=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;k.envMap=nt.get(x.envMap||k.environment,kt),k.envMapRotation=k.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,wt===void 0&&(x.addEventListener("dispose",ni),wt=new Map,k.programs=wt);let Wt=wt.get(yt);if(Wt!==void 0){if(k.currentProgram===Wt&&k.lightsStateVersion===vt)return no(x,ft),Wt}else ft.uniforms=at.getUniforms(x),U!==null&&x.isNodeMaterial&&U.build(x,V,ft),x.onBeforeCompile(ft,C),Wt=at.acquireProgram(ft,yt),wt.set(yt,Wt),k.uniforms=ft.uniforms;const Mt=k.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Mt.clippingPlanes=At.uniform),no(x,ft),k.needsLights=pl(x),k.lightsStateVersion=vt,k.needsLights&&(Mt.ambientLightColor.value=G.state.ambient,Mt.lightProbe.value=G.state.probe,Mt.sunLights.value=G.state.sun,Mt.sunLightShadows.value=G.state.sunShadow,Mt.directionalLights.value=G.state.directional,Mt.directionalLightShadows.value=G.state.directionalShadow,Mt.spotLights.value=G.state.spot,Mt.spotLightShadows.value=G.state.spotShadow,Mt.rectAreaLights.value=G.state.rectArea,Mt.ltc_1.value=G.state.rectAreaLTC1,Mt.ltc_2.value=G.state.rectAreaLTC2,Mt.pointLights.value=G.state.point,Mt.pointLightShadows.value=G.state.pointShadow,Mt.hemisphereLights.value=G.state.hemi,Mt.sunShadowMatrix.value=G.state.sunShadowMatrix,Mt.sunShadowCascade.value=G.state.sunShadowCascade,Mt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Mt.spotLightMatrix.value=G.state.spotLightMatrix,Mt.spotLightMap.value=G.state.spotLightMap,Mt.pointShadowMatrix.value=G.state.pointShadowMatrix),k.lightProbeGrid=w.state.lightProbeGridArray.length>0,k.currentProgram=Wt,k.uniformsList=null,Wt}function io(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=Ls.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function no(x,P){const V=H.get(x);V.outputColorSpace=P.outputColorSpace,V.batching=P.batching,V.batchingColor=P.batchingColor,V.instancing=P.instancing,V.instancingColor=P.instancingColor,V.instancingMorph=P.instancingMorph,V.skinning=P.skinning,V.morphTargets=P.morphTargets,V.morphNormals=P.morphNormals,V.morphColors=P.morphColors,V.morphTargetsCount=P.morphTargetsCount,V.numClippingPlanes=P.numClippingPlanes,V.numIntersection=P.numClipIntersection,V.vertexAlphas=P.vertexAlphas,V.vertexTangents=P.vertexTangents,V.toneMapping=P.toneMapping}function ul(x,P){if(x.length===0)return null;if(x.length===1)return x[0].texture!==null?x[0]:null;y.setFromMatrixPosition(P.matrixWorld);for(let V=0,k=x.length;V<k;V++){const G=x[V];if(G.texture!==null&&G.boundingBox.containsPoint(y))return G}return null}function dl(x,P,V,k,G){P.isScene!==!0&&(P=ye),Y.resetTextureUnits();const pt=P.fog,vt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?P.environment:null,ft=it===null?C.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Kt.workingColorSpace,yt=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,wt=nt.get(k.envMap||vt,yt),kt=k.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Wt=!!V.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Mt=!!V.morphAttributes.position,ee=!!V.morphAttributes.normal,_e=!!V.morphAttributes.color;let he=ui;k.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(he=C.toneMapping);const ae=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Ae=ae!==void 0?ae.length:0,xt=H.get(k),Ie=w.state.lights;if(ht===!0&&(Pt===!0||x!==j)){const ce=x===j&&k.id===X;At.setState(k,x,ce)}let Jt=!1;k.version===xt.__version?(xt.needsLights&&xt.lightsStateVersion!==Ie.state.version||xt.outputColorSpace!==ft||G.isBatchedMesh&&xt.batching===!1||!G.isBatchedMesh&&xt.batching===!0||G.isBatchedMesh&&xt.batchingColor===!0&&G._colorsTexture===null||G.isBatchedMesh&&xt.batchingColor===!1&&G._colorsTexture!==null||G.isInstancedMesh&&xt.instancing===!1||!G.isInstancedMesh&&xt.instancing===!0||G.isSkinnedMesh&&xt.skinning===!1||!G.isSkinnedMesh&&xt.skinning===!0||G.isInstancedMesh&&xt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&xt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&xt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&xt.instancingMorph===!1&&G.morphTexture!==null||xt.envMap!==wt||k.fog===!0&&xt.fog!==pt||xt.numClippingPlanes!==void 0&&(xt.numClippingPlanes!==At.numPlanes||xt.numIntersection!==At.numIntersection)||xt.vertexAlphas!==kt||xt.vertexTangents!==Wt||xt.morphTargets!==Mt||xt.morphNormals!==ee||xt.morphColors!==_e||xt.toneMapping!==he||xt.morphTargetsCount!==Ae||!!xt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Jt=!0):(Jt=!0,xt.__version=k.version);let We=xt.currentProgram;Jt===!0&&(We=Zn(k,P,G),U&&k.isNodeMaterial&&U.onUpdateProgram(k,We,xt));let si=!1,Ti=!1,Ji=!1;const re=We.getUniforms(),ge=xt.uniforms;if(p.useProgram(We.program)&&(si=!0,Ti=!0,Ji=!0),k.id!==X&&(X=k.id,Ti=!0),xt.needsLights){const ce=ul(w.state.lightProbeGridArray,G);xt.lightProbeGrid!==ce&&(xt.lightProbeGrid=ce,Ti=!0)}if(si||j!==x){p.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),re.setValue(D,"projectionMatrix",x.projectionMatrix),re.setValue(D,"viewMatrix",x.matrixWorldInverse);const Ri=re.map.cameraPosition;Ri!==void 0&&Ri.setValue(D,Qt.setFromMatrixPosition(x.matrixWorld)),T.logarithmicDepthBuffer&&re.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&re.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),j!==x&&(j=x,Ti=!0,Ji=!0)}if(xt.needsLights&&(Ie.state.sunShadowMap.length>0&&re.setValue(D,"sunShadowMap",Ie.state.sunShadowMap,Y),Ie.state.directionalShadowMap.length>0&&re.setValue(D,"directionalShadowMap",Ie.state.directionalShadowMap,Y),Ie.state.spotShadowMap.length>0&&re.setValue(D,"spotShadowMap",Ie.state.spotShadowMap,Y),Ie.state.pointShadowMap.length>0&&re.setValue(D,"pointShadowMap",Ie.state.pointShadowMap,Y)),G.isSkinnedMesh){re.setOptional(D,G,"bindMatrix"),re.setOptional(D,G,"bindMatrixInverse");const ce=G.skeleton;ce&&(ce.boneTexture===null&&ce.computeBoneTexture(),re.setValue(D,"boneTexture",ce.boneTexture,Y))}G.isBatchedMesh&&(re.setOptional(D,G,"batchingTexture"),re.setValue(D,"batchingTexture",G._matricesTexture,Y),re.setOptional(D,G,"batchingIdTexture"),re.setValue(D,"batchingIdTexture",G._indirectTexture,Y),re.setOptional(D,G,"batchingColorTexture"),G._colorsTexture!==null&&re.setValue(D,"batchingColorTexture",G._colorsTexture,Y));const Ai=V.morphAttributes;if((Ai.position!==void 0||Ai.normal!==void 0||Ai.color!==void 0)&&L.update(G,V,We),(Ti||xt.receiveShadow!==G.receiveShadow)&&(xt.receiveShadow=G.receiveShadow,re.setValue(D,"receiveShadow",G.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&P.environment!==null&&(ge.envMapIntensity.value=P.environmentIntensity),ge.dfgLUT!==void 0&&(ge.dfgLUT.value=W0()),Ti){if(re.setValue(D,"toneMappingExposure",C.toneMappingExposure),xt.needsLights&&fl(ge,Ji),pt&&k.fog===!0&&Tt.refreshFogUniforms(ge,pt),Tt.refreshMaterialUniforms(ge,k,Q,q,w.state.transmissionRenderTarget[x.id]),xt.needsLights&&xt.lightProbeGrid){const ce=xt.lightProbeGrid;ge.probesSH.value=ce.texture,ge.probesMin.value.copy(ce.boundingBox.min),ge.probesMax.value.copy(ce.boundingBox.max),ge.probesResolution.value.copy(ce.resolution)}Ls.upload(D,io(xt),ge,Y)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Ls.upload(D,io(xt),ge,Y),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&re.setValue(D,"center",G.center),re.setValue(D,"modelViewMatrix",G.modelViewMatrix),re.setValue(D,"normalMatrix",G.normalMatrix),re.setValue(D,"modelMatrix",G.matrixWorld),k.uniformsGroups!==void 0){const ce=k.uniformsGroups;for(let Ri=0,Qi=ce.length;Ri<Qi;Ri++){const ro=ce[Ri];et.update(ro,We),et.bind(ro,We)}}return We}function fl(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.sunLights.needsUpdate=P,x.sunLightShadows.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function pl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return $},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return it},this.setRenderTargetTextures=function(x,P,V){const k=H.get(x);k.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),H.get(x.texture).__webglTexture=P,H.get(x.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:V,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){const V=H.get(x);V.__webglFramebuffer=P,V.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,V=0){it=x,$=P,W=V;let k=null,G=!1,pt=!1;if(x){const ft=H.get(x);if(ft.__useDefaultFramebuffer!==void 0){p.bindFramebuffer(D.FRAMEBUFFER,ft.__webglFramebuffer),tt.copy(x.viewport),Rt.copy(x.scissor),Et=x.scissorTest,p.viewport(tt),p.scissor(Rt),p.setScissorTest(Et),X=-1;return}else if(ft.__webglFramebuffer===void 0)Y.setupRenderTarget(x);else if(ft.__hasExternalTextures)Y.rebindTextures(x,H.get(x.texture).__webglTexture,H.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const kt=x.depthTexture;if(ft.__boundDepthTexture!==kt){if(kt!==null&&H.has(kt)&&(x.width!==kt.image.width||x.height!==kt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Y.setupDepthRenderbuffer(x)}}const yt=x.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(pt=!0);const wt=H.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(wt[P])?k=wt[P][V]:k=wt[P],G=!0):x.samples>0&&Y.useMultisampledRTT(x)===!1?k=H.get(x).__webglMultisampledFramebuffer:Array.isArray(wt)?k=wt[V]:k=wt,tt.copy(x.viewport),Rt.copy(x.scissor),Et=x.scissorTest}else tt.copy(gt).multiplyScalar(Q).floor(),Rt.copy(Ot).multiplyScalar(Q).floor(),Et=pe;if(V!==0&&(k=z),p.bindFramebuffer(D.FRAMEBUFFER,k)&&p.drawBuffers(x,k),p.viewport(tt),p.scissor(Rt),p.setScissorTest(Et),G){const ft=H.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,ft.__webglTexture,V)}else if(pt){const ft=P;for(let yt=0;yt<x.textures.length;yt++){const wt=H.get(x.textures[yt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+yt,wt.__webglTexture,V,ft)}}else if(x!==null&&V!==0){const ft=H.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ft.__webglTexture,V)}X=-1};function so(x){const P=H.get(x);return(P.__readFormat!==x.format||P.__readType!==x.type)&&(P.__readFormat=x.format,P.__readType=x.type,P.__formatReadable=T.textureFormatReadable(x.format),P.__typeReadable=T.textureTypeReadable(x.type)),P}this.readRenderTargetPixels=function(x,P,V,k,G,pt,vt,ft=0){if(!(x&&x.isWebGLRenderTarget)){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=H.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt){p.bindFramebuffer(D.FRAMEBUFFER,yt);try{const wt=x.textures[ft],kt=wt.format,Wt=wt.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft);const Mt=so(wt);if(Mt.__formatReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Mt.__typeReadable===!1){jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-k&&V>=0&&V<=x.height-G&&D.readPixels(P,V,k,G,lt.convert(kt),lt.convert(Wt),pt)}finally{const wt=it!==null?H.get(it).__webglFramebuffer:null;p.bindFramebuffer(D.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(x,P,V,k,G,pt,vt,ft=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=H.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&vt!==void 0&&(yt=yt[vt]),yt)if(P>=0&&P<=x.width-k&&V>=0&&V<=x.height-G){p.bindFramebuffer(D.FRAMEBUFFER,yt);const wt=x.textures[ft],kt=wt.format,Wt=wt.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+ft);const Mt=so(wt);if(Mt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Mt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ee=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,ee),D.bufferData(D.PIXEL_PACK_BUFFER,pt.byteLength,D.STREAM_READ),D.readPixels(P,V,k,G,lt.convert(kt),lt.convert(Wt),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const _e=it!==null?H.get(it).__webglFramebuffer:null;p.bindFramebuffer(D.FRAMEBUFFER,_e);const he=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Wh(D,he,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,ee),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,pt),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(ee),D.deleteSync(he),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,V=0){const k=Math.pow(2,-V),G=Math.floor(x.image.width*k),pt=Math.floor(x.image.height*k),vt=P!==null?P.x:0,ft=P!==null?P.y:0;Y.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,V,0,0,vt,ft,G,pt),p.unbindTexture()},this.copyTextureToTexture=function(x,P,V=null,k=null,G=0,pt=0){let vt,ft,yt,wt,kt,Wt,Mt,ee,_e;const he=x.isCompressedTexture?x.mipmaps[pt]:x.image;if(V!==null)vt=V.max.x-V.min.x,ft=V.max.y-V.min.y,yt=V.isBox3?V.max.z-V.min.z:1,wt=V.min.x,kt=V.min.y,Wt=V.isBox3?V.min.z:0;else{const ge=Math.pow(2,-G);vt=Math.floor(he.width*ge),ft=Math.floor(he.height*ge),x.isDataArrayTexture?yt=he.depth:x.isData3DTexture?yt=Math.floor(he.depth*ge):yt=1,wt=0,kt=0,Wt=0}k!==null?(Mt=k.x,ee=k.y,_e=k.z):(Mt=0,ee=0,_e=0);const ae=lt.convert(P.format),Ae=lt.convert(P.type);let xt;P.isData3DTexture?(Y.setTexture3D(P,0),xt=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Y.setTexture2DArray(P,0),xt=D.TEXTURE_2D_ARRAY):(Y.setTexture2D(P,0),xt=D.TEXTURE_2D),p.activeTexture(D.TEXTURE0),p.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),p.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),p.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const Ie=p.getParameter(D.UNPACK_ROW_LENGTH),Jt=p.getParameter(D.UNPACK_IMAGE_HEIGHT),We=p.getParameter(D.UNPACK_SKIP_PIXELS),si=p.getParameter(D.UNPACK_SKIP_ROWS),Ti=p.getParameter(D.UNPACK_SKIP_IMAGES);p.pixelStorei(D.UNPACK_ROW_LENGTH,he.width),p.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he.height),p.pixelStorei(D.UNPACK_SKIP_PIXELS,wt),p.pixelStorei(D.UNPACK_SKIP_ROWS,kt),p.pixelStorei(D.UNPACK_SKIP_IMAGES,Wt);const Ji=x.isDataArrayTexture||x.isData3DTexture,re=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){const ge=H.get(x),Ai=H.get(P),ce=H.get(ge.__renderTarget),Ri=H.get(Ai.__renderTarget);p.bindFramebuffer(D.READ_FRAMEBUFFER,ce.__webglFramebuffer),p.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ri.__webglFramebuffer);for(let Qi=0;Qi<yt;Qi++)Ji&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,H.get(x).__webglTexture,G,Wt+Qi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,H.get(P).__webglTexture,pt,_e+Qi)),D.blitFramebuffer(wt,kt,vt,ft,Mt,ee,vt,ft,D.DEPTH_BUFFER_BIT,D.NEAREST);p.bindFramebuffer(D.READ_FRAMEBUFFER,null),p.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(G!==0||x.isRenderTargetTexture||H.has(x)){const ge=H.get(x),Ai=H.get(P);p.bindFramebuffer(D.READ_FRAMEBUFFER,N),p.bindFramebuffer(D.DRAW_FRAMEBUFFER,B);for(let ce=0;ce<yt;ce++)Ji?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,ge.__webglTexture,G,Wt+ce):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ge.__webglTexture,G),re?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ai.__webglTexture,pt,_e+ce):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Ai.__webglTexture,pt),G!==0?D.blitFramebuffer(wt,kt,vt,ft,Mt,ee,vt,ft,D.COLOR_BUFFER_BIT,D.NEAREST):re?D.copyTexSubImage3D(xt,pt,Mt,ee,_e+ce,wt,kt,vt,ft):D.copyTexSubImage2D(xt,pt,Mt,ee,wt,kt,vt,ft);p.bindFramebuffer(D.READ_FRAMEBUFFER,null),p.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else re?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(xt,pt,Mt,ee,_e,vt,ft,yt,ae,Ae,he.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(xt,pt,Mt,ee,_e,vt,ft,yt,ae,he.data):D.texSubImage3D(xt,pt,Mt,ee,_e,vt,ft,yt,ae,Ae,he):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,pt,Mt,ee,vt,ft,ae,Ae,he.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,pt,Mt,ee,he.width,he.height,ae,he.data):D.texSubImage2D(D.TEXTURE_2D,pt,Mt,ee,vt,ft,ae,Ae,he);p.pixelStorei(D.UNPACK_ROW_LENGTH,Ie),p.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Jt),p.pixelStorei(D.UNPACK_SKIP_PIXELS,We),p.pixelStorei(D.UNPACK_SKIP_ROWS,si),p.pixelStorei(D.UNPACK_SKIP_IMAGES,Ti),pt===0&&P.generateMipmaps&&D.generateMipmap(xt),p.unbindTexture()},this.initRenderTarget=function(x){H.get(x).__webglFramebuffer===void 0&&Y.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Y.setTextureCube(x,0):x.isData3DTexture?Y.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Y.setTexture2DArray(x,0):Y.setTexture2D(x,0),p.unbindTexture()},this.resetState=function(){$=0,W=0,it=null,p.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Kt._getUnpackColorSpace()}}class q0{constructor(t){this.scene=t,this.particles=[],this.sparkleGeo=new Vs(.2,0),this.sphereGeo=new Pe(.2,6,6),this.boxGeo=new Zt(.3,.3,.3)}emit(t){const{x:e,y:i,z:s=0,count:r=8,color:a=16096779,size:o=.25,speed:c=6,life:l=.6,gravity:u=-12,shape:f="sparkle"}=t,h=f==="sparkle"?this.sparkleGeo:f==="box"?this.boxGeo:this.sphereGeo;for(let g=0;g<r;g++){const v=new Oi({color:a,transparent:!0,opacity:1}),S=new st(h,v);S.position.set(e,i,s),S.scale.setScalar(o),this.scene.add(S);const m=Math.random()*Math.PI*2,d=(Math.random()-.5)*Math.PI,M=(Math.random()*.7+.3)*c;this.particles.push({mesh:S,mat:v,vx:Math.cos(m)*Math.cos(d)*M,vy:(Math.sin(m)*.5+.5)*M+2,vz:Math.sin(d)*M*.6,life:l,maxLife:l,gravity:u,rx:(Math.random()-.5)*10,ry:(Math.random()-.5)*10})}}createHitSparks(t,e,i=16707722){this.emit({x:t,y:e,count:12,color:i,size:.3,speed:7,life:.3,shape:"sparkle"})}createDust(t,e){this.emit({x:t,y:e,count:5,color:9741240,size:.35,speed:2.5,life:.35,gravity:0,shape:"sphere"})}createCoinSparkle(t,e){this.emit({x:t,y:e,count:10,color:16436245,size:.3,speed:5,life:.5,shape:"sparkle"})}createMagicBurst(t,e,i=6333946){this.emit({x:t,y:e,count:16,color:i,size:.4,speed:8,life:.5,shape:"sparkle"})}createCheckpointAura(t,e){this.emit({x:t,y:e,count:24,color:3718648,size:.35,speed:6,life:.8,shape:"sparkle"})}createDefeatExplosion(t,e){this.emit({x:t,y:e,count:30,color:16347926,size:.5,speed:10,life:.7,shape:"box"}),this.emit({x:t,y:e,count:15,color:16436245,size:.35,speed:8,life:.5,shape:"sparkle"})}update(t){for(let e=this.particles.length-1;e>=0;e--){const i=this.particles[e];if(i.life-=t,i.life<=0){this.scene.remove(i.mesh),i.mat.dispose(),this.particles.splice(e,1);continue}i.vy+=i.gravity*t,i.mesh.position.x+=i.vx*t,i.mesh.position.y+=i.vy*t,i.mesh.position.z+=i.vz*t,i.mesh.rotation.x+=i.rx*t,i.mesh.rotation.y+=i.ry*t;const s=i.life/i.maxLife;i.mat.opacity=s,i.mesh.scale.setScalar(s)}}clear(){for(const t of this.particles)this.scene.remove(t.mesh),t.mat.dispose();this.particles=[]}}class Y0{constructor(){this.texts=[]}add(t,e,i,s={}){const{color:r="#ffffff",fontSize:a=16,duration:o=.8,isCrit:c=!1,vy:l=-60}=s;this.texts.push({text:t,x:e+(Math.random()*20-10),y:i,color:r,fontSize:c?a*1.3:a,duration:o,maxDuration:o,vy:c?l*1.3:l,isCrit:c})}update(t){for(let e=this.texts.length-1;e>=0;e--){const i=this.texts[e];if(i.duration-=t,i.duration<=0){this.texts.splice(e,1);continue}i.y+=i.vy*t}}render(t){for(let e=0;e<this.texts.length;e++){const i=this.texts[e],s=Math.max(0,i.duration/i.maxDuration);t.save(),t.globalAlpha=s,t.font=`bold ${i.fontSize}px 'Nunito', sans-serif`,t.textAlign="center",t.lineWidth=3,t.strokeStyle="#000000",t.strokeText(i.text,i.x,i.y),t.fillStyle=i.color,t.fillText(i.text,i.x,i.y),t.restore()}}}class K0{constructor(t){this.scene=t,this.platformMeshes=[],this.hazardMeshes=[],this.sceneryMeshes=[],this.lights=[]}setupLighting(t){for(const l of this.lights)this.scene.remove(l);this.lights=[];let e=14412542,i=1976635,s=16707722,r=988970,a=.012;t==="forest"?(e=8843180,i=413243,s=16707722,r=404775,a=.008):t==="cave"?(e=3718648,i=165063,s=6809849,r=198418,a=.015):t==="ruins"?(e=16638023,i=7877903,s=16436245,r=1841431,a=.01):t==="mountain"?(e=11032055,i=3215426,s=16007006,r=591124,a=.01):(e=12616956,i=1579035,s=16707722,r=592139,a=.009);const o=new Gu(e,i,.7);this.scene.add(o),this.lights.push(o);const c=new Wu(s,1.2);c.position.set(40,60,40),c.castShadow=!0,c.shadow.mapSize.width=1024,c.shadow.mapSize.height=1024,c.shadow.camera.near=.5,c.shadow.camera.far=150,this.scene.add(c),this.lights.push(c),this.scene.fog=new Ba(r,a)}buildPlatforms(t,e){for(const i of t){const s=i.width/20,r=i.height/20,a=i.x/20+s/2,o=(1e3-i.y)/20-r/2,c=new Zt(s,r,3.2);let l=1976635,u=2278750;e==="cave"?(l=988970,u=165063):e==="ruins"?(l=2696484,u=11817737):e==="mountain"?(l=1973067,u=6583435):e==="castle"&&(l=1579035,u=7434618);const f=new Dt({color:l,roughness:.75,metalness:.1}),h=new st(c,f);h.position.set(a,o,0),h.receiveShadow=!0,this.scene.add(h),this.platformMeshes.push(h);const g=new Zt(s,.25,3.3),v=new Dt({color:u,roughness:.5}),S=new st(g,v);S.position.set(a,o+r/2-.12,0),this.scene.add(S),this.platformMeshes.push(S)}}buildHazards(t){for(const e of t){const i=e.width/20,s=e.height/20,r=e.x/20,a=(1e3-e.y)/20,o=Math.max(2,Math.floor(i/.8)),c=new vn(.35,s*2,6),l=new Dt({color:9741240,metalness:.8,roughness:.3});for(let u=0;u<o;u++){const f=new st(c,l);f.position.set(r+(u+.5)*(i/o),a+s,0),this.scene.add(f),this.hazardMeshes.push(f)}}}buildScenery(t,e){const i=t/20;if(e==="forest"){const s=new Be(.3,.5,4,8),r=new Dt({color:7877903}),a=new vn(2.2,5,8),o=new Dt({color:1409085,roughness:.8});for(let c=0;c<i;c+=12){const l=new De,u=new st(s,r);u.position.y=2,l.add(u);const f=new st(a,o);f.position.y=5,l.add(f);const h=new st(a,o);h.position.y=6.8,h.scale.setScalar(.75),l.add(h),l.position.set(c+(Math.random()-.5)*4,15,-6-Math.random()*8),this.scene.add(l),this.sceneryMeshes.push(l)}}else if(e==="cave"){const s=new vn(.8,4,5),r=new Dt({color:3718648,emissive:165063,emissiveIntensity:.7,roughness:.2});for(let a=0;a<i;a+=15){const o=new st(s,r);o.position.set(a,12,-4),o.rotation.z=Math.random()*.4,this.scene.add(o),this.sceneryMeshes.push(o)}}else if(e==="ruins"){const s=new Be(.8,.8,12,10),r=new Dt({color:4674921,roughness:.8});for(let a=0;a<i;a+=16){const o=new st(s,r);o.position.set(a,18,-5),this.scene.add(o),this.sceneryMeshes.push(o)}}else{const s=new Zt(3,16,3),r=new Dt({color:2565930,roughness:.8});for(let a=0;a<i;a+=18){const o=new st(s,r);o.position.set(a,18,-6),this.scene.add(o),this.sceneryMeshes.push(o)}}}clear(){for(const t of this.platformMeshes)this.scene.remove(t);for(const t of this.hazardMeshes)this.scene.remove(t);for(const t of this.sceneryMeshes)this.scene.remove(t);for(const t of this.lights)this.scene.remove(t);this.platformMeshes=[],this.hazardMeshes=[],this.sceneryMeshes=[],this.lights=[]}}const lc={1:{id:1,name:"Whispering Forest",subtitle:"Tutorial & The Ancient Woods",worldWidth:3200,worldHeight:900,theme:"forest",spawnPoint:{x:80,y:550},platforms:[{x:0,y:650,width:900,height:250},{x:980,y:650,width:800,height:250},{x:1860,y:650,width:1340,height:250},{x:260,y:520,width:160,height:24},{x:480,y:430,width:180,height:24},{x:720,y:500,width:140,height:24},{x:1100,y:530,width:150,height:24},{x:1320,y:440,width:160,height:24},{x:1540,y:520,width:150,height:24},{x:1950,y:540,width:180,height:24},{x:2200,y:460,width:200,height:24},{x:2480,y:550,width:160,height:24}],movingPlatforms:[{id:"mp_1",x:890,y:580,width:85,height:20,dx:0,dy:-120,speed:50}],hazards:[{x:900,y:850,width:80,height:30,type:"spikes"},{x:1780,y:850,width:80,height:30,type:"spikes"}],coins:[{id:"c1",x:280,y:480},{id:"c2",x:320,y:480},{id:"c3",x:500,y:390},{id:"c4",x:540,y:390},{id:"c5",x:580,y:390},{id:"c6",x:1140,y:490},{id:"c7",x:1350,y:400},{id:"c8",x:1400,y:400},{id:"c9",x:2e3,y:500},{id:"c10",x:2250,y:420},{id:"c11",x:2300,y:420}],checkpoints:[{id:"cp_1_1",x:1050,y:596},{id:"cp_1_2",x:2150,y:596}],switches:[{id:"sw_1_1",x:740,y:470,targetId:"door_1_1",isPressurePlate:!1}],doors:[{id:"door_1_1",x:1720,y:570,width:24,height:80}],chests:[{id:"ch_1_1",x:550,y:402,tier:"common"},{id:"ch_1_2",x:1440,y:412,tier:"rare"}],enemies:[{id:"e1",type:"slime",x:380,y:620},{id:"e2",type:"slime",x:620,y:620},{id:"e3",type:"goblin",x:1220,y:610},{id:"e4",type:"slime",x:1480,y:620},{id:"e5",type:"goblin",x:2050,y:610}],boss:{level:1,x:2750,y:566},exitPortal:{x:3080,y:580},quests:[{id:"q_coins",title:"Collect 5 Forest Coins",required:5,type:"coins"},{id:"q_enemies",title:"Defeat 3 Woodland Creatures",required:3,type:"kills"},{id:"q_boss",title:"Defeat the Forest Guardian",required:1,type:"boss"}]},2:{id:2,name:"Crystal Cave",subtitle:"Underground Caverns & Moving Platforms",worldWidth:3400,worldHeight:950,theme:"cave",spawnPoint:{x:80,y:600},platforms:[{x:0,y:700,width:700,height:250},{x:860,y:700,width:900,height:250},{x:1900,y:700,width:1500,height:250},{x:240,y:560,width:150,height:24},{x:440,y:460,width:170,height:24},{x:960,y:560,width:160,height:24},{x:1200,y:460,width:220,height:24},{x:1500,y:540,width:160,height:24},{x:2050,y:560,width:180,height:24},{x:2320,y:460,width:200,height:24}],movingPlatforms:[{id:"mp_2_1",x:710,y:620,width:90,height:20,dx:140,dy:0,speed:65},{id:"mp_2_2",x:1770,y:620,width:90,height:20,dx:0,dy:-140,speed:60}],hazards:[{x:700,y:900,width:160,height:30,type:"spikes"},{x:1760,y:900,width:140,height:30,type:"spikes"}],coins:[{id:"c2_1",x:260,y:520},{id:"c2_2",x:460,y:420},{id:"c2_3",x:500,y:420},{id:"c2_4",x:1240,y:420},{id:"c2_5",x:1280,y:420},{id:"c2_6",x:2100,y:520},{id:"c2_7",x:2360,y:420}],checkpoints:[{id:"cp_2_1",x:920,y:646},{id:"cp_2_2",x:2e3,y:646}],switches:[{id:"sw_2_1",x:1260,y:450,targetId:"door_2_1",isPressurePlate:!0}],doors:[{id:"door_2_1",x:1660,y:620,width:24,height:80}],chests:[{id:"ch_2_1",x:480,y:432,tier:"rare"},{id:"ch_2_2",x:1350,y:432,tier:"epic"}],enemies:[{id:"e2_1",type:"bat",x:350,y:460},{id:"e2_2",type:"skeleton",x:520,y:660},{id:"e2_3",type:"bat",x:1100,y:480},{id:"e2_4",type:"skeleton",x:1360,y:660},{id:"e2_5",type:"bat",x:2200,y:460}],boss:{level:2,x:2900,y:620},exitPortal:{x:3260,y:630},quests:[{id:"q_switch",title:"Activate the Crystal Pressure Plate",required:1,type:"switch"},{id:"q_enemies",title:"Defeat 4 Cave Monsters",required:4,type:"kills"},{id:"q_boss",title:"Defeat the Crystal Beast",required:1,type:"boss"}]},3:{id:3,name:"Forgotten Ruins",subtitle:"Ancient Mechanisms & Traps",worldWidth:3600,worldHeight:950,theme:"ruins",spawnPoint:{x:80,y:600},platforms:[{x:0,y:700,width:850,height:250},{x:1e3,y:700,width:1100,height:250},{x:2250,y:700,width:1350,height:250},{x:280,y:540,width:180,height:24},{x:540,y:440,width:200,height:24},{x:1120,y:550,width:180,height:24},{x:1380,y:430,width:240,height:24},{x:1700,y:520,width:180,height:24},{x:2400,y:560,width:180,height:24},{x:2680,y:460,width:220,height:24}],movingPlatforms:[{id:"mp_3_1",x:860,y:640,width:100,height:20,dx:130,dy:0,speed:70},{id:"mp_3_2",x:2110,y:640,width:100,height:20,dx:130,dy:0,speed:70}],hazards:[{x:850,y:900,width:150,height:30,type:"spikes"},{x:2100,y:900,width:150,height:30,type:"spikes"}],coins:[{id:"c3_1",x:320,y:500},{id:"c3_2",x:560,y:400},{id:"c3_3",x:620,y:400},{id:"c3_4",x:1420,y:390},{id:"c3_5",x:1480,y:390},{id:"c3_6",x:2720,y:420}],checkpoints:[{id:"cp_3_1",x:1050,y:646},{id:"cp_3_2",x:2320,y:646}],switches:[{id:"sw_3_1",x:580,y:408,targetId:"door_3_1",isPressurePlate:!1},{id:"sw_3_2",x:1440,y:398,targetId:"door_3_1",isPressurePlate:!1}],doors:[{id:"door_3_1",x:1980,y:620,width:24,height:80}],chests:[{id:"ch_3_1",x:660,y:412,tier:"epic"},{id:"ch_3_2",x:1550,y:402,tier:"legendary"}],enemies:[{id:"e3_1",type:"skeleton",x:420,y:660},{id:"e3_2",type:"dark_knight",x:680,y:650},{id:"e3_3",type:"skeleton",x:1250,y:660},{id:"e3_4",type:"dark_knight",x:1600,y:650},{id:"e3_5",type:"bat",x:2500,y:480}],boss:{level:3,x:3050,y:608},exitPortal:{x:3450,y:630},quests:[{id:"q_levers",title:"Unlock the Ruin Gate",required:1,type:"switch"},{id:"q_enemies",title:"Defeat Ancient Defenders",required:4,type:"kills"},{id:"q_boss",title:"Defeat the Ancient Guardian",required:1,type:"boss"}]},4:{id:4,name:"Shadow Mountains",subtitle:"Hazard Chasms & Dark Knights",worldWidth:3600,worldHeight:1e3,theme:"mountain",spawnPoint:{x:80,y:650},platforms:[{x:0,y:750,width:750,height:250},{x:950,y:750,width:1050,height:250},{x:2200,y:750,width:1400,height:250},{x:220,y:600,width:160,height:24},{x:450,y:480,width:180,height:24},{x:680,y:380,width:160,height:24},{x:1100,y:580,width:180,height:24},{x:1350,y:450,width:220,height:24},{x:1650,y:560,width:180,height:24},{x:2350,y:590,width:180,height:24},{x:2650,y:460,width:220,height:24}],movingPlatforms:[{id:"mp_4_1",x:760,y:670,width:90,height:20,dx:180,dy:0,speed:75},{id:"mp_4_2",x:2010,y:670,width:90,height:20,dx:0,dy:-180,speed:70}],hazards:[{x:750,y:950,width:200,height:30,type:"spikes"},{x:2e3,y:950,width:200,height:30,type:"spikes"}],coins:[{id:"c4_1",x:470,y:440},{id:"c4_2",x:700,y:340},{id:"c4_3",x:1380,y:410},{id:"c4_4",x:1440,y:410},{id:"c4_5",x:2700,y:420}],checkpoints:[{id:"cp_4_1",x:1020,y:696},{id:"cp_4_2",x:2280,y:696}],switches:[{id:"sw_4_1",x:700,y:348,targetId:"door_4_1",isPressurePlate:!1}],doors:[{id:"door_4_1",x:1850,y:670,width:24,height:80}],chests:[{id:"ch_4_1",x:760,y:352,tier:"epic"},{id:"ch_4_2",x:1500,y:422,tier:"legendary"}],enemies:[{id:"e4_1",type:"dark_knight",x:500,y:700},{id:"e4_2",type:"bat",x:800,y:520},{id:"e4_3",type:"dark_knight",x:1250,y:700},{id:"e4_4",type:"bat",x:1550,y:480},{id:"e4_5",type:"dark_knight",x:2450,y:700}],boss:{level:4,x:3e3,y:666},exitPortal:{x:3450,y:680},quests:[{id:"q_mountain_climb",title:"Scale the Summit Peaks",required:1,type:"switch"},{id:"q_enemies",title:"Defeat 4 Shadow Troops",required:4,type:"kills"},{id:"q_boss",title:"Defeat the Shadow Warrior",required:1,type:"boss"}]},5:{id:5,name:"Lost Kingdom",subtitle:"The Throne of the Dark King",worldWidth:3800,worldHeight:1e3,theme:"castle",spawnPoint:{x:80,y:650},platforms:[{x:0,y:750,width:850,height:250},{x:1020,y:750,width:1150,height:250},{x:2350,y:750,width:1450,height:250},{x:260,y:590,width:180,height:24},{x:520,y:460,width:220,height:24},{x:1160,y:570,width:200,height:24},{x:1440,y:440,width:260,height:24},{x:1780,y:550,width:200,height:24},{x:2500,y:570,width:200,height:24},{x:2780,y:440,width:240,height:24}],movingPlatforms:[{id:"mp_5_1",x:860,y:670,width:100,height:20,dx:150,dy:0,speed:80},{id:"mp_5_2",x:2180,y:670,width:100,height:20,dx:0,dy:-180,speed:75}],hazards:[{x:850,y:950,width:170,height:30,type:"spikes"},{x:2170,y:950,width:180,height:30,type:"spikes"}],coins:[{id:"c5_1",x:300,y:550},{id:"c5_2",x:550,y:420},{id:"c5_3",x:600,y:420},{id:"c5_4",x:1500,y:400},{id:"c5_5",x:1560,y:400},{id:"c5_6",x:2820,y:400}],checkpoints:[{id:"cp_5_1",x:1080,y:696},{id:"cp_5_2",x:2420,y:696}],switches:[{id:"sw_5_1",x:550,y:450,targetId:"door_5_1",isPressurePlate:!0},{id:"sw_5_2",x:1520,y:408,targetId:"door_5_1",isPressurePlate:!1}],doors:[{id:"door_5_1",x:2040,y:670,width:24,height:80}],chests:[{id:"ch_5_1",x:640,y:432,tier:"epic"},{id:"ch_5_2",x:1620,y:412,tier:"legendary"}],enemies:[{id:"e5_1",type:"dark_knight",x:450,y:700},{id:"e5_2",type:"dark_knight",x:720,y:700},{id:"e5_3",type:"skeleton",x:1300,y:710},{id:"e5_4",type:"dark_knight",x:1650,y:700},{id:"e5_5",type:"bat",x:2600,y:500}],boss:{level:5,x:3200,y:654},exitPortal:{x:3650,y:680},quests:[{id:"q_royal_door",title:"Unlock the Throne Room Gate",required:1,type:"switch"},{id:"q_enemies",title:"Clear the Castle Guards",required:4,type:"kills"},{id:"q_boss",title:"Defeat The Dark King",required:1,type:"boss"}]}};class $0{constructor(t,e,i,s){this.id=t,this.x=e/20,this.y=(1e3-i)/20,this.z=0,this.active=!1,this.scene=s,this.animTime=0,this.group=new De,this.group.position.set(this.x,this.y,this.z);const r=new Be(.7,.9,.4,8),a=new Dt({color:4674921,roughness:.8}),o=new st(r,a);o.position.y=.2,this.group.add(o);const c=new Vs(.55,0);this.crystalMat=new Dt({color:9741240,emissive:4674921,emissiveIntensity:.3,roughness:.2,metalness:.8}),this.crystal=new st(c,this.crystalMat),this.crystal.position.y=1.3,this.group.add(this.crystal),this.light=new Hu(3718648,0,8),this.light.position.y=1.3,this.group.add(this.light),this.scene&&this.scene.add(this.group)}activate(t,e,i){return this.active?!1:(this.active=!0,this.crystalMat.color.setHex(3718648),this.crystalMat.emissive.setHex(165063),this.crystalMat.emissiveIntensity=1.2,this.light.intensity=2.5,t&&t.playCheckpoint(),e&&e.createCheckpointAura(this.x,this.y+.5),i&&i.add("✨ CHECKPOINT ACTIVATED",this.x*20,1e3-this.y*20,{color:"#67e8f9",fontSize:14}),!0)}update(t){this.animTime+=t,this.crystal.rotation.y+=1.8*t,this.crystal.rotation.x=Math.sin(this.animTime*2)*.2,this.crystal.position.y=1.3+Math.sin(this.animTime*3)*.15}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class Z0{constructor(t,e,i,s,r=!1,a=null){if(this.id=t,this.x=e/20,this.y=(1e3-i)/20,this.targetId=s,this.isPressurePlate=r,this.state=!1,this.scene=a,this.group=new De,this.group.position.set(this.x,this.y,0),this.isPressurePlate){const o=new Zt(1.6,.1,1.4),c=new Dt({color:3359061}),l=new st(o,c);l.position.y=.05,this.group.add(l);const u=new Zt(1.3,.15,1.1);this.plateMat=new Dt({color:15381256,emissive:13273604,emissiveIntensity:.3}),this.plateMesh=new st(u,this.plateMat),this.plateMesh.position.y=.15,this.group.add(this.plateMesh)}else{const o=new Zt(.8,.4,.6),c=new Dt({color:4674921}),l=new st(o,c);l.position.y=.2,this.group.add(l),this.leverArm=new De,this.leverArm.position.set(0,.3,0);const u=new Be(.06,.06,.9),f=new Dt({color:9741240,metalness:.9}),h=new st(u,f);h.position.y=.45,this.leverArm.add(h);const g=new Pe(.16,8,8);this.knobMat=new Dt({color:15680580,emissive:12131356});const v=new st(g,this.knobMat);v.position.y=.9,this.leverArm.add(v),this.leverArm.rotation.z=.6,this.group.add(this.leverArm)}this.scene&&this.scene.add(this.group)}setState(t){this.state=t,this.isPressurePlate&&this.plateMesh?(this.plateMesh.position.y=t?.06:.15,this.plateMat.color.setHex(t?2278750:15381256),this.plateMat.emissive.setHex(t?1409085:13273604)):this.leverArm&&(this.leverArm.rotation.z=t?-.6:.6,this.knobMat.color.setHex(t?2278750:15680580),this.knobMat.emissive.setHex(t?1409085:12131356))}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class J0{constructor(t,e,i,s=24,r=80,a=null){this.id=t,this.x=e/20,this.y=(1e3-(i+r))/20,this.w=s/20,this.h=r/20,this.isOpen=!1,this.currentOpenHeight=0,this.scene=a,this.group=new De,this.group.position.set(this.x+this.w/2,this.y,0);const o=new Dt({color:3359061,roughness:.7}),c=new Zt(.3,this.h,.8),l=new st(c,o);l.position.set(-this.w/2-.15,this.h/2,0);const u=new st(c,o);u.position.set(this.w/2+.15,this.h/2,0),this.group.add(l),this.group.add(u);const f=new Zt(this.w,this.h,.3),h=new Dt({color:6583435,metalness:.8,roughness:.4});this.gateMesh=new st(f,h),this.gateMesh.position.y=this.h/2,this.group.add(this.gateMesh),this.scene&&this.scene.add(this.group)}update(t){const e=this.isOpen?this.h:0;this.currentOpenHeight=Fi.lerp(this.currentOpenHeight,e,8*t),this.gateMesh&&(this.gateMesh.position.y=this.h/2+this.currentOpenHeight)}getSolidRect(){return this.isOpen&&this.currentOpenHeight>=this.h-.2?null:{x:this.x,y:this.y+this.currentOpenHeight,width:this.w,height:Math.max(0,this.h-this.currentOpenHeight)}}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class Q0{constructor(t,e,i,s="common",r=null){this.id=t,this.x=e/20,this.y=(1e3-i)/20,this.tier=s,this.opened=!1,this.scene=r,this.group=new De,this.group.position.set(this.x,this.y,0);const a=new Zt(1.2,.7,.9),o=new Dt({color:7877903,roughness:.6}),c=new st(a,o);c.position.y=.35,this.group.add(c);let l=9741240;s==="rare"?l=165063:s==="epic"?l=11032055:s==="legendary"&&(l=16096779),this.lidGroup=new De,this.lidGroup.position.set(0,.7,-.45);const u=new Be(.45,.45,1.2,8,1,!1,0,Math.PI),f=new Dt({color:l,metalness:.8,roughness:.3}),h=new st(u,f);h.rotation.z=Math.PI/2,h.position.set(0,0,.45),this.lidGroup.add(h),this.group.add(this.lidGroup),this.scene&&this.scene.add(this.group)}open(t,e,i){if(this.opened)return null;this.opened=!0,this.lidGroup.rotation.x=-Math.PI/1.7,t&&t.playChest();let s={coins:50,gems:0,text:"🪙 +50 Coins"};return this.tier==="rare"?s={coins:80,gems:2,text:"💎 Rare Treasure!"}:this.tier==="epic"?s={coins:150,gems:5,text:"⚔️ Epic Relic Found!"}:this.tier==="legendary"&&(s={coins:300,gems:10,text:"👑 Legendary Artifact!"}),e&&e.createCoinSparkle(this.x,this.y+.5),i&&i.add(s.text,this.x*20,1e3-this.y*20,{color:"#fbbf24",fontSize:14}),s}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class j0{constructor(t,e,i,s,r,a=160,o=0,c=60,l=null){this.id=t,this.startX=e/20,this.startY=(1e3-i)/20,this.x=this.startX,this.y=this.startY,this.w=s/20,this.h=r/20,this.dx=a/20,this.dy=-o/20,this.speed=c,this.time=0,this.scene=l;const u=new Zt(this.w,this.h,2),f=new Dt({color:3359061,metalness:.5,roughness:.5});this.mesh=new st(u,f),this.mesh.position.set(this.x+this.w/2,this.y-this.h/2,0),this.scene&&this.scene.add(this.mesh)}update(t){this.time+=t*(this.speed/50);const e=(Math.sin(this.time)+1)/2;this.x=this.startX+this.dx*e,this.y=this.startY+this.dy*e,this.mesh&&this.mesh.position.set(this.x+this.w/2,this.y-this.h/2,0)}destroy(){this.scene&&this.mesh&&this.scene.remove(this.mesh)}}class tg{constructor(t,e,i,s=null){this.id=t,this.x=e/20,this.y=(1e3-i)/20,this.collected=!1,this.scene=s,this.animTime=Math.random()*5;const r=new Be(.35,.35,.08,12),a=new Dt({color:16096779,metalness:.9,roughness:.2,emissive:14251782,emissiveIntensity:.3});this.mesh=new st(r,a),this.mesh.rotation.x=Math.PI/2,this.mesh.position.set(this.x,this.y,0),this.scene&&this.scene.add(this.mesh)}update(t){this.collected||(this.animTime+=t,this.mesh.rotation.z+=3.5*t,this.mesh.position.y=this.y+Math.sin(this.animTime*4)*.12)}collect(){this.collected=!0,this.scene&&this.mesh&&(this.mesh.visible=!1)}destroy(){this.scene&&this.mesh&&this.scene.remove(this.mesh)}}class eg{constructor(t,e,i=null){this.x=t/20,this.y=(1e3-e)/20,this.active=!1,this.scene=i,this.animTime=0,this.group=new De,this.group.position.set(this.x,this.y,0);const s=new Ws(1.6,.3,8,16,Math.PI),r=new Dt({color:4674921,roughness:.8}),a=new st(s,r);a.position.y=1.6,this.group.add(a);const o=new za(1.3,16);this.coreMat=new Dt({color:6514417,emissive:5195493,emissiveIntensity:.2,side:je}),this.core=new st(o,this.coreMat),this.core.position.y=1.6,this.group.add(this.core),this.scene&&this.scene.add(this.group)}update(t){this.animTime+=t,this.active&&(this.coreMat.emissive.setHex(11032055),this.coreMat.emissiveIntensity=1+Math.sin(this.animTime*6)*.4,this.core.rotation.z+=2*t)}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class ig{constructor(t,e,i,s,r={},a=null){this.id=t,this.type=e,this.x=i/20,this.y=(1e3-s)/20,this.z=0,this.initialX=this.x,this.initialY=this.y,this.patrolDistance=(r.patrolDistance||120)/20,this.scene=a,this.vx=0,this.vy=0,this.facing=1,this.isDead=!1,this.hurtTimer=0,this.animTime=Math.random()*5,this.initStats(),this.create3DMesh()}initStats(){switch(this.type){case"slime":this.width=1.2,this.height=.9,this.maxHp=40,this.hp=40,this.damage=10,this.speed=2.8,this.coins=5,this.flying=!1;break;case"bat":this.width=1.1,this.height=.8,this.maxHp=30,this.hp=30,this.damage=12,this.speed=4.2,this.coins=6,this.flying=!0;break;case"goblin":this.width=1.2,this.height=1.6,this.maxHp=60,this.hp=60,this.damage=15,this.speed=3.6,this.coins=10,this.flying=!1;break;case"skeleton":this.width=1.1,this.height=1.8,this.maxHp=75,this.hp=75,this.damage=18,this.speed=3,this.coins=12,this.flying=!1;break;case"dark_knight":this.width=1.4,this.height=2.1,this.maxHp=130,this.hp=130,this.damage=25,this.speed=2.6,this.coins=25,this.flying=!1;break;default:this.width=1.2,this.height=1.2,this.maxHp=50,this.hp=50,this.damage=10,this.speed=2.5,this.coins=5,this.flying=!1}}create3DMesh(){if(this.group=new De,this.type==="slime"){const t=new Pe(.65,12,10),e=new Dt({color:2278750,roughness:.1,transparent:!0,opacity:.88,emissive:1409085,emissiveIntensity:.2});this.mainMesh=new st(t,e),this.mainMesh.position.y=.5,this.group.add(this.mainMesh);const i=new Oi({color:988970}),s=new Pe(.1,6,6),r=new st(s,i);r.position.set(.25,.55,.5);const a=new st(s,i);a.position.set(-.25,.55,.5),this.group.add(r),this.group.add(a)}else if(this.type==="bat"){const t=new Pe(.35,8,8),e=new Dt({color:11032055,roughness:.4});this.mainMesh=new st(t,e),this.group.add(this.mainMesh);const i=new Zt(.7,.05,.35),s=new Dt({color:7020968});this.wingL=new st(i,s),this.wingL.position.set(-.45,.1,0),this.mainMesh.add(this.wingL),this.wingR=new st(i,s),this.wingR.position.set(.45,.1,0),this.mainMesh.add(this.wingR);const r=new Oi({color:15680580}),a=new Pe(.06,6,6),o=new st(a,r);o.position.set(.14,.08,.3);const c=new st(a,r);c.position.set(-.14,.08,.3),this.mainMesh.add(o),this.mainMesh.add(c)}else if(this.type==="goblin"){const t=new Dt({color:8702998,roughness:.6}),e=new Zt(.7,.8,.5);this.mainMesh=new st(e,t),this.mainMesh.position.y=.8,this.group.add(this.mainMesh);const i=new Pe(.4,8,8),s=new st(i,t);s.position.y=.6,this.mainMesh.add(s);const r=new Be(.12,.06,.9),a=new Dt({color:7877903}),o=new st(r,a);o.position.set(.5,.2,.2),this.mainMesh.add(o)}else if(this.type==="skeleton"){const t=new Dt({color:14870768,roughness:.5}),e=new Zt(.65,.9,.35);this.mainMesh=new st(e,t),this.mainMesh.position.y=.9,this.group.add(this.mainMesh);const i=new Zt(.45,.45,.45),s=new st(i,t);s.position.y=.7,this.mainMesh.add(s);const r=new Be(.04,.04,1.8),a=new st(r,t);a.position.set(.5,.2,.2),this.mainMesh.add(a)}else{const t=new Dt({color:1976635,metalness:.8,roughness:.3}),e=new Zt(.95,1.2,.6);this.mainMesh=new st(e,t),this.mainMesh.position.y=1,this.group.add(this.mainMesh);const i=new Zt(.6,.6,.6),s=new st(i,t);s.position.y=.85,this.mainMesh.add(s);const r=new Zt(.4,.08,.1),a=new Oi({color:15680580}),o=new st(r,a);o.position.set(0,0,.32),s.add(o);const c=new Zt(.15,1.6,.05),l=new Dt({color:9741240,metalness:.9}),u=new st(c,l);u.position.set(.6,.2,.3),this.mainMesh.add(u)}this.scene&&this.scene.add(this.group)}takeDamage(t,e){if(this.isDead||this.hurtTimer>0)return 0;const i=Math.min(this.hp,t);this.hp-=i,this.hurtTimer=.25;const s=this.x<e?-1:1;return this.vx=s*5,this.flying||(this.vy=4),this.hp<=0&&(this.isDead=!0,this.group&&(this.group.visible=!1)),i}update(t,e){if(this.isDead)return;this.animTime+=t,this.hurtTimer>0&&(this.hurtTimer-=t);let i=null,s=14;for(const r of e)if(r&&!r.isDead&&r.connected){const a=Math.hypot(r.x-this.x,r.y-this.y);a<s&&(s=a,i=r)}if(this.flying){if(i){const r=i.x-this.x,a=i.y+.5-this.y,o=Math.atan2(a,r);this.vx=Math.cos(o)*this.speed,this.vy=Math.sin(o)*this.speed,this.facing=r>0?1:-1}else this.vx=Math.sin(this.animTime*1.5)*this.speed*.7,this.vy=Math.cos(this.animTime*3)*1.5,this.facing=this.vx>0?1:-1;if(this.x+=this.vx*t,this.y+=this.vy*t,this.wingL&&this.wingR){const r=Math.sin(this.animTime*20)*.8;this.wingL.rotation.z=r,this.wingR.rotation.z=-r}}else if(i){const r=i.x>this.x?1:-1;this.vx=r*this.speed,this.facing=r}else this.x>this.initialX+this.patrolDistance?this.facing=-1:this.x<this.initialX-this.patrolDistance&&(this.facing=1),this.vx=this.facing*(this.speed*.6);if(this.type==="slime"&&this.mainMesh){const r=Math.sin(this.animTime*8)*.15;this.mainMesh.scale.set(1+r,1-r,1+r)}if(this.group){this.group.position.set(this.x,this.y,this.z);const r=this.facing===1?Math.PI/2:-Math.PI/2;this.group.rotation.y=Fi.lerp(this.group.rotation.y,r,12*t)}}destroy(){this.scene&&this.group&&this.scene.remove(this.group)}}class ng{constructor(t,e,i,s=null){this.level=t,this.x=e/20,this.y=(1e3-i)/20,this.z=0,this.initialX=this.x,this.initialY=this.y,this.scene=s,this.vx=0,this.vy=0,this.facing=-1,this.isDead=!1,this.hurtTimer=0,this.animTime=0,this.attackState="idle",this.stateTimer=1.8,this.projectiles=[],this.initBossData(),this.create3DMesh()}initBossData(){switch(this.level){case 1:this.name="Forest Guardian",this.width=3.2,this.height=4.2,this.maxHp=350,this.hp=350,this.damage=18,this.speed=2.4,this.color=1409085,this.glowColor=8843180;break;case 2:this.name="Crystal Beast",this.width=3.6,this.height=3.8,this.maxHp=450,this.hp=450,this.damage=22,this.speed=3,this.color=165063,this.glowColor=6809849;break;case 3:this.name="Ancient Guardian",this.width=3.8,this.height=4.6,this.maxHp=580,this.hp=580,this.damage=26,this.speed=2.6,this.color=11817737,this.glowColor=16638023;break;case 4:this.name="Shadow Warrior",this.width=3,this.height=4.2,this.maxHp=700,this.hp=700,this.damage=30,this.speed=4.4,this.color=3359061,this.glowColor=16007006;break;case 5:this.name="The Dark King",this.width=4,this.height=4.8,this.maxHp=950,this.hp=950,this.damage=35,this.speed=3.8,this.color=5774471,this.glowColor=12616956;break;default:this.name="Ancient Titan",this.width=3.5,this.height=4,this.maxHp=400,this.hp=400,this.damage=20,this.speed=2.8,this.color=7020968,this.glowColor=15324671}}get phase(){const t=this.hp/this.maxHp;return t>.66?1:t>.33?2:3}create3DMesh(){this.group=new De;const t=new Zt(this.width*.7,this.height*.65,1.6);this.bodyMat=new Dt({color:this.color,roughness:.4,metalness:.5}),this.body=new st(t,this.bodyMat),this.body.position.y=this.height*.5,this.body.castShadow=!0,this.group.add(this.body);const e=new Zt(1.2,1.2,1.2),i=new st(e,this.bodyMat);i.position.y=this.height*.45,this.body.add(i);const s=new Oi({color:this.glowColor}),r=new Pe(.18,8,8),a=new st(r,s);a.position.set(.35,.2,.65);const o=new st(r,s);o.position.set(-.35,.2,.65),i.add(a),i.add(o);const c=new Pe(.5,12,12);this.coreMat=new Dt({color:this.glowColor,emissive:this.glowColor,emissiveIntensity:.8}),this.core=new st(c,this.coreMat),this.core.position.set(0,0,.85),this.body.add(this.core);const l=new vn(.3,1.2,6),u=new st(l,this.coreMat);u.position.set(-.55,.85,0),u.rotation.z=-.35,i.add(u);const f=new st(l,this.coreMat);f.position.set(.55,.85,0),f.rotation.z=.35,i.add(f);const h=new Zt(.65,1.8,.65);this.armL=new st(h,this.bodyMat),this.armL.position.set(-this.width*.45,.1,0),this.body.add(this.armL),this.armR=new st(h,this.bodyMat),this.armR.position.set(this.width*.45,.1,0),this.body.add(this.armR),this.scene&&this.scene.add(this.group)}takeDamage(t){if(this.isDead||this.hurtTimer>0)return 0;const e=Math.min(this.hp,t);return this.hp-=e,this.hurtTimer=.22,this.hp<=0&&(this.isDead=!0,this.group&&(this.group.visible=!1)),e}update(t,e,i,s,r){if(this.isDead)return;this.animTime+=t,this.hurtTimer>0&&(this.hurtTimer-=t);for(let c=this.projectiles.length-1;c>=0;c--){const l=this.projectiles[c];l.x+=l.vx*t,l.y+=l.vy*t,l.life-=t,l.mesh&&l.mesh.position.set(l.x,l.y,l.z),l.life<=0&&(this.scene&&l.mesh&&this.scene.remove(l.mesh),this.projectiles.splice(c,1))}let a=null,o=999;for(const c of e)if(c&&!c.isDead&&c.connected){const l=Math.hypot(c.x-this.x,c.y-this.y);l<o&&(o=l,a=c)}if(a&&(this.facing=a.x>this.x?1:-1),this.stateTimer-=t,this.stateTimer<=0&&(this.attackState==="idle"?(this.attackState="telegraph",this.stateTimer=this.phase===3?.45:.8):this.attackState==="telegraph"?(this.attackState="attacking",this.stateTimer=.5,this.executePhaseAttack(a,i,s,r)):(this.attackState="idle",this.stateTimer=this.phase===3?1:1.8)),this.attackState==="idle"){if(a){const c=a.x>this.x?1:-1;this.vx=c*this.speed*(this.phase===3?1.4:1)}}else this.vx=0;if(this.group){this.group.position.set(this.x,this.y,this.z);const c=this.facing===1?Math.PI/2:-Math.PI/2;this.group.rotation.y=Fi.lerp(this.group.rotation.y,c,10*t);const l=.8+Math.sin(this.animTime*(this.phase===3?15:6))*.4;this.coreMat.emissiveIntensity=l,this.attackState==="telegraph"?(this.armL.rotation.x=-Math.PI/1.4,this.armR.rotation.x=-Math.PI/1.4):(this.armL.rotation.x=0,this.armR.rotation.x=0)}}executePhaseAttack(t,e,i,s){e&&e.playBossRoar(),s&&s.shake(8,.4);const r=this.x+this.facing*1.5,a=this.y+1.2;if(this.phase===1)this.spawn3DShockwave(r,a,this.facing*14,0,this.damage);else if(this.phase===2)[-.25,0,.25].forEach(o=>{const l=(this.facing===1?0:Math.PI)+o;this.spawn3DShockwave(r,a,Math.cos(l)*16,Math.sin(l)*16,this.damage*1.1)});else{for(let o=0;o<5;o++){const c=Math.PI*2/5*o;this.spawn3DShockwave(this.x,a,Math.cos(c)*14,Math.sin(c)*14,this.damage*1.3,15680580)}i&&i.createDefeatExplosion(this.x,this.y+2)}}spawn3DShockwave(t,e,i,s,r,a=null){const o=a||this.glowColor,c=new Ha(.5,0),l=new Dt({color:o,emissive:o,emissiveIntensity:.9}),u=new st(c,l);u.position.set(t,e,0),this.scene&&this.scene.add(u),this.projectiles.push({mesh:u,x:t,y:e,z:0,vx:i,vy:s,width:1,height:1,damage:r,life:2})}destroy(){this.scene&&this.group&&this.scene.remove(this.group);for(const t of this.projectiles)this.scene&&t.mesh&&this.scene.remove(t.mesh);this.projectiles=[]}}const Os={warrior:{name:"Warrior",icon:"🛡️",maxHp:120,maxMp:100,speed:210,jumpForce:430,attackDmg:28,attackRange:48,attackCooldown:.32,skillName:"Whirlwind Slash",skillCost:35,skillCooldown:1.8,color:"#38bdf8",secondaryColor:"#1e3a8a",capeColor:"#ef4444"},archer:{name:"Archer",icon:"🏹",maxHp:95,maxMp:100,speed:235,jumpForce:440,attackDmg:20,attackRange:280,attackCooldown:.35,skillName:"Piercing Arrow",skillCost:30,skillCooldown:1.5,color:"#4ade80",secondaryColor:"#14532d",capeColor:"#15803d"},mage:{name:"Mage",icon:"🔮",maxHp:85,maxMp:120,speed:205,jumpForce:420,attackDmg:24,attackRange:260,attackCooldown:.38,skillName:"Arcane Meteor",skillCost:40,skillCooldown:2.2,color:"#c084fc",secondaryColor:"#581c87",capeColor:"#9333ea"},rogue:{name:"Rogue",icon:"🗡️",maxHp:95,maxMp:100,speed:250,jumpForce:450,attackDmg:22,attackRange:42,attackCooldown:.22,skillName:"Shadow Dash",skillCost:35,skillCooldown:1.2,color:"#f43f5e",secondaryColor:"#4c0519",capeColor:"#334155"}};class In{constructor(t,e,i="warrior",s=!0,r=null){this.id=t,this.name=e,this.characterClass=i,this.isLocal=s,this.connected=!0,this.scene=r,this.stats=Os[i]||Os.warrior,this.x=4,this.y=8,this.z=0,this.vx=0,this.vy=0,this.facing=1,this.isGrounded=!1,this.canDoubleJump=!0,this.isDashing=!1,this.dashTimer=0,this.dashCooldown=0,this.hp=this.stats.maxHp,this.maxHp=this.stats.maxHp,this.mp=this.stats.maxMp,this.maxMp=this.stats.maxMp,this.coins=0,this.gems=0,this.score=0,this.attackCooldown=0,this.skillCooldown=0,this.attackAnimTimer=0,this.skillAnimTimer=0,this.hurtTimer=0,this.isDead=!1,this.checkpoint={x:4,y:8},this.animTime=0,this.state="idle",this.targetX=this.x,this.targetY=this.y,this.targetFacing=this.facing,this.targetState="idle",this.projectiles=[],this.createMeshHierarchy()}createMeshHierarchy(){this.group=new De;const t=new zt(this.stats.color),e=new zt(this.stats.secondaryColor),i=new zt(16498468),s=new Dt({color:t,roughness:.35,metalness:this.characterClass==="warrior"?.7:.2}),r=new Dt({color:e,roughness:.5}),a=new Dt({color:i,roughness:.8}),o=new Zt(.9,1.1,.6);this.torso=new st(o,s),this.torso.position.y=1.1,this.torso.castShadow=!0,this.group.add(this.torso);const c=new Zt(.95,.2,.65),l=new Dt({color:7877903,roughness:.4}),u=new st(c,l);u.position.y=-.4,this.torso.add(u);const f=new Pe(.48,12,12);this.head=new st(f,a),this.head.position.y=.95,this.head.castShadow=!0,this.torso.add(this.head);const h=new Oi({color:988970}),g=new Pe(.08,6,6),v=new st(g,h);v.position.set(.18,.05,.42);const S=new st(g,h);S.position.set(-.18,.05,.42),this.head.add(v),this.head.add(S);const m=new Pe(.52,10,10,0,Math.PI*2,0,Math.PI/1.7),d=new st(m,r);d.rotation.x=-Math.PI/8,this.head.add(d);const M=new Kn(.85,1.3,4,4),R=new Dt({color:new zt(this.stats.capeColor),side:je,roughness:.6});this.cape=new st(M,R),this.cape.position.set(0,.35,-.35),this.cape.rotation.x=Math.PI/12,this.torso.add(this.cape);const y=new Zt(.28,.8,.28);this.leftArm=new st(y,s),this.leftArm.position.set(-.65,.1,0),this.torso.add(this.leftArm),this.rightArm=new st(y,s),this.rightArm.position.set(.65,.1,0),this.torso.add(this.rightArm),this.weaponGroup=new De,this.build3DWeapon(this.weaponGroup),this.weaponGroup.position.set(0,-.35,.25),this.rightArm.add(this.weaponGroup);const E=new Zt(.32,.9,.32);this.leftLeg=new st(E,r),this.leftLeg.position.set(-.25,.45,0),this.leftLeg.castShadow=!0,this.group.add(this.leftLeg),this.rightLeg=new st(E,r),this.rightLeg.position.set(.25,.45,0),this.rightLeg.castShadow=!0,this.group.add(this.rightLeg),this.scene&&this.scene.add(this.group)}build3DWeapon(t){if(this.characterClass==="warrior"){const e=new Zt(.18,1.4,.05),i=new Dt({color:14870768,metalness:.9,roughness:.2}),s=new st(e,i);s.position.y=.6,t.add(s);const r=new Zt(.6,.1,.12),a=new Dt({color:16096779,metalness:.8,roughness:.3}),o=new st(r,a);t.add(o);const c=new Be(.06,.06,.4),l=new Dt({color:7877903,roughness:.7}),u=new st(c,l);u.position.y=-.25,t.add(u)}else if(this.characterClass==="archer"){const e=new Ws(.55,.05,8,16,Math.PI),i=new Dt({color:9584654,roughness:.6}),s=new st(e,i);s.rotation.y=Math.PI/2,t.add(s)}else if(this.characterClass==="mage"){const e=new Be(.06,.06,1.6),i=new Dt({color:7877903,roughness:.6}),s=new st(e,i);t.add(s);const r=new Pe(.2,12,12),a=new Dt({color:12616956,emissive:11032055,emissiveIntensity:.8,roughness:.1}),o=new st(r,a);o.position.y=.85,t.add(o)}else{const e=new Zt(.12,.7,.04),i=new Dt({color:9741240,metalness:.9}),s=new st(e,i);s.position.y=.25,t.add(s)}}takeDamage(t,e=0){if(this.isDead||this.hurtTimer>0||this.isDashing)return!1;this.hp=Math.max(0,this.hp-t),this.hurtTimer=.55;const i=this.x<e?-1:1;return this.vx=i*6,this.vy=5,this.hp<=0?(this.isDead=!0,this.state="dead"):this.state="hurt",!0}respawn(){this.x=this.checkpoint.x,this.y=this.checkpoint.y,this.vx=0,this.vy=0,this.hp=this.maxHp,this.mp=this.maxMp,this.isDead=!1,this.hurtTimer=.5,this.state="idle"}update(t,e,i,s,r){this.animTime+=t,this.attackCooldown>0&&(this.attackCooldown-=t),this.skillCooldown>0&&(this.skillCooldown-=t),this.dashCooldown>0&&(this.dashCooldown-=t),this.hurtTimer>0&&(this.hurtTimer-=t),this.attackAnimTimer>0&&(this.attackAnimTimer-=t),this.skillAnimTimer>0&&(this.skillAnimTimer-=t),this.mp<this.maxMp&&(this.mp=Math.min(this.maxMp,this.mp+12*t));for(let a=this.projectiles.length-1;a>=0;a--){const o=this.projectiles[a];o.x+=o.vx*t,o.y+=o.vy*t,o.life-=t,o.mesh&&o.mesh.position.set(o.x,o.y,o.z),o.life<=0&&(this.scene&&o.mesh&&this.scene.remove(o.mesh),this.projectiles.splice(a,1))}if(this.isDead){this.state="dead",this.animate3DDead(t);return}this.isLocal&&e?this.handleLocalInput(t,e,i,s,r):(this.x+=(this.targetX-this.x)*Math.min(1,15*t),this.y+=(this.targetY-this.y)*Math.min(1,15*t),this.facing=this.targetFacing,this.state=this.targetState),this.animate3DMesh(t)}handleLocalInput(t,e,i,s,r){const a=e.keys;if(e.consumeDash()&&this.dashCooldown<=0&&(this.isDashing=!0,this.dashTimer=.22,this.dashCooldown=.9,this.vx=this.facing*(this.stats.speed/18)*2.2,this.vy=0,i&&i.playDash(),s&&s.createDust(this.x,this.y)),this.isDashing){this.dashTimer-=t,this.dashTimer<=0&&(this.isDashing=!1);return}let o=0;a.left&&(o-=1),a.right&&(o+=1);const c=this.stats.speed/20;o!==0?(this.vx=o*c,this.facing=o,this.isGrounded&&Math.random()<.2&&s&&s.createDust(this.x,this.y)):(this.vx*=Math.pow(.001,t),Math.abs(this.vx)<.1&&(this.vx=0));const l=this.stats.jumpForce/28;e.consumeJump()&&(this.isGrounded?(this.vy=l,this.isGrounded=!1,this.canDoubleJump=!0,i&&i.playJump(),s&&s.createDust(this.x,this.y)):this.canDoubleJump&&(this.vy=l*.92,this.canDoubleJump=!1,i&&i.playDoubleJump(),s&&s.createMagicBurst(this.x,this.y,this.stats.color))),e.consumeAttack()&&this.attackCooldown<=0&&this.performAttack(i,s),e.consumeSkill()&&this.skillCooldown<=0&&this.mp>=this.stats.skillCost&&this.performSkill(i,s,r),this.attackAnimTimer>0?this.state="attack":this.skillAnimTimer>0?this.state="skill":this.isGrounded?Math.abs(this.vx)>.2?this.state="run":this.state="idle":this.state=this.vy>0?"jump":"fall"}performAttack(t,e){this.attackCooldown=this.stats.attackCooldown,this.attackAnimTimer=.25,this.state="attack",t&&t.playAttack(),this.characterClass==="archer"?this.spawn3DArrow(this.facing*18,0,this.stats.attackDmg):this.characterClass==="mage"&&this.spawn3DOrb(this.facing*15,0,this.stats.attackDmg,12616956),e&&e.emit({x:this.x+this.facing*.8,y:this.y+.8,count:8,color:new zt(this.stats.color).getHex()})}performSkill(t,e,i){this.mp-=this.stats.skillCost,this.skillCooldown=this.stats.skillCooldown,this.skillAnimTimer=.38,this.state="skill",t&&t.playMagic(),i&&i.add(this.stats.skillName,this.x*20,1e3-this.y*20,{color:"#facc15",fontSize:13}),this.characterClass==="warrior"?e&&e.createMagicBurst(this.x,this.y+1,3718648):this.characterClass==="archer"?this.spawn3DArrow(this.facing*24,0,this.stats.attackDmg*2.2,!0):this.characterClass==="mage"?this.spawn3DOrb(this.facing*12,0,this.stats.attackDmg*2.5,16007006,.45):this.characterClass==="rogue"&&(this.isDashing=!0,this.dashTimer=.3,this.vx=this.facing*(this.stats.speed/18)*3,e&&e.createMagicBurst(this.x,this.y+1,16007006))}spawn3DArrow(t,e,i,s=!1){const r=new Be(.04,.04,.8),a=new Dt({color:s?4906624:16436245,emissive:2278750}),o=new st(r,a);o.rotation.z=Math.PI/2,o.position.set(this.x+this.facing*.8,this.y+1,0),this.scene&&this.scene.add(o),this.projectiles.push({mesh:o,x:this.x+this.facing*.8,y:this.y+1,z:0,vx:t,vy:e,width:.8,height:.2,damage:i,life:1.5,type:s?"piercing_arrow":"arrow"})}spawn3DOrb(t,e,i,s,r=.3){const a=new Pe(r,10,10),o=new Dt({color:s,emissive:s,emissiveIntensity:.9}),c=new st(a,o);c.position.set(this.x+this.facing*.8,this.y+1,0),this.scene&&this.scene.add(c),this.projectiles.push({mesh:c,x:this.x+this.facing*.8,y:this.y+1,z:0,vx:t,vy:e,width:r*2,height:r*2,damage:i,life:1.5,type:"magic"})}getAttackHitbox(){if(this.attackAnimTimer<=0&&this.skillAnimTimer<=0)return null;const t=this.skillAnimTimer>0?2.5:1.8;return{x:this.facing===1?this.x+.4:this.x-t,y:this.y,width:t,height:2,damage:this.skillAnimTimer>0?45:this.stats.attackDmg}}animate3DMesh(t){if(!this.group)return;this.group.position.set(this.x,this.y,this.z);const e=this.facing===1?Math.PI/2:-Math.PI/2;this.group.rotation.y=Fi.lerp(this.group.rotation.y,e,15*t);const i=12,s=Math.sin(this.animTime*i)*.6,r=Math.cos(this.animTime*i)*.6;if(this.state==="run")this.leftLeg.rotation.x=s,this.rightLeg.rotation.x=-s,this.leftArm.rotation.x=-r,this.rightArm.rotation.x=r,this.torso.position.y=1.1+Math.abs(Math.sin(this.animTime*i))*.1,this.cape.rotation.x=Math.PI/4+Math.sin(this.animTime*i)*.15;else if(this.state==="jump"||this.state==="fall")this.leftLeg.rotation.x=.3,this.rightLeg.rotation.x=-.3,this.leftArm.rotation.x=.8,this.rightArm.rotation.x=.8,this.cape.rotation.x=Math.PI/3;else if(this.state==="attack"){const a=1-this.attackAnimTimer/this.stats.attackCooldown;this.rightArm.rotation.x=-Math.PI/2+Math.sin(a*Math.PI)*1.6,this.rightArm.rotation.z=Math.sin(a*Math.PI)*.5}else{const a=Math.sin(this.animTime*3)*.05;this.torso.position.y=1.1+a,this.leftLeg.rotation.x=0,this.rightLeg.rotation.x=0,this.leftArm.rotation.x=0,this.rightArm.rotation.x=0,this.cape.rotation.x=Math.PI/12+a*.5}this.hurtTimer>0?this.group.visible=Math.floor(this.animTime*30)%2===0:this.group.visible=!0}animate3DDead(t){this.group&&(this.group.rotation.z=Fi.lerp(this.group.rotation.z,Math.PI/2,8*t),this.group.position.y=Fi.lerp(this.group.position.y,this.y,8*t))}destroy(){this.scene&&this.group&&this.scene.remove(this.group);for(const t of this.projectiles)this.scene&&t.mesh&&this.scene.remove(t.mesh);this.projectiles=[]}}class sg{constructor(){this.quests=[],this.completedCount=0}loadQuests(t){this.quests=t.map(e=>({...e,current:0,completed:!1})),this.completedCount=0,this.renderHUD()}progressQuest(t,e=1,i=null,s=null,r=null){let a=!1;for(const o of this.quests)o.completed||o.type===t&&(o.current=Math.min(o.required,o.current+e),o.current>=o.required&&(o.completed=!0,this.completedCount++,a=!0,i&&i.playVictory(),s&&r&&(s.add("🎉 QUEST COMPLETE!",r.x+r.width/2,r.y-30,{color:"#facc15",fontSize:16,duration:1.2}),s.add("+100 XP  +50 COINS",r.x+r.width/2,r.y-12,{color:"#4ade80",fontSize:13,duration:1.2})),r&&(r.coins+=50,r.score+=100)));return(a||e>0)&&this.renderHUD(),a}isAllCompleted(){return this.quests.length>0&&this.quests.every(t=>t.completed)}renderHUD(){const t=document.getElementById("quest-list");if(t){t.innerHTML="";for(const e of this.quests){const i=document.createElement("li");i.className=`quest-item ${e.completed?"completed":""}`;const s=e.completed?"✅":"☐",r=e.required>1?` (${e.current}/${e.required})`:"";i.innerHTML=`
        <span class="quest-check">${s}</span>
        <span class="quest-text">${e.title}${r}</span>
      `,t.appendChild(i)}}}}class rg{constructor(){this.gameHudEl=document.getElementById("game-hud"),this.p1HudEl=document.getElementById("hud-p1"),this.p2HudEl=document.getElementById("hud-p2"),this.p1Name=document.getElementById("p1-name-display"),this.p1Class=document.getElementById("p1-class-display"),this.p1HpBar=document.getElementById("p1-hp-bar"),this.p1HpText=document.getElementById("p1-hp-text"),this.p1MpBar=document.getElementById("p1-mp-bar"),this.p1MpText=document.getElementById("p1-mp-text"),this.p2Name=document.getElementById("p2-name-display"),this.p2Class=document.getElementById("p2-class-display"),this.p2HpBar=document.getElementById("p2-hp-bar"),this.p2HpText=document.getElementById("p2-hp-text"),this.p2MpBar=document.getElementById("p2-mp-bar"),this.p2MpText=document.getElementById("p2-mp-text"),this.bossBarContainer=document.getElementById("boss-bar-container"),this.bossName=document.getElementById("boss-name"),this.bossPhase=document.getElementById("boss-phase"),this.bossHpBar=document.getElementById("boss-hp-bar"),this.levelTitle=document.getElementById("level-title-display"),this.coinCount=document.getElementById("coin-count"),this.gemCount=document.getElementById("gem-count"),this.toastContainer=document.getElementById("toast-container")}show(){this.gameHudEl&&this.gameHudEl.classList.remove("hidden");const t=document.getElementById("quest-tracker");t&&t.classList.remove("hidden")}hide(){this.gameHudEl&&this.gameHudEl.classList.add("hidden");const t=document.getElementById("quest-tracker");t&&t.classList.add("hidden")}updatePlayer1(t){if(!t)return;this.p1Name&&(this.p1Name.textContent=t.name),this.p1Class&&(this.p1Class.textContent=t.characterClass);const e=Math.max(0,Math.min(100,t.hp/t.maxHp*100));this.p1HpBar&&(this.p1HpBar.style.width=`${e}%`),this.p1HpText&&(this.p1HpText.textContent=`${Math.ceil(t.hp)} / ${t.maxHp}`);const i=Math.max(0,Math.min(100,t.mp/t.maxMp*100));this.p1MpBar&&(this.p1MpBar.style.width=`${i}%`),this.p1MpText&&(this.p1MpText.textContent=`${Math.ceil(t.mp)} / ${t.maxMp}`),this.coinCount&&(this.coinCount.textContent=t.coins),this.gemCount&&(this.gemCount.textContent=t.gems)}updatePlayer2(t){if(!t||!t.connected){this.p2HudEl&&this.p2HudEl.classList.add("hidden");return}this.p2HudEl&&this.p2HudEl.classList.remove("hidden"),this.p2Name&&(this.p2Name.textContent=t.name),this.p2Class&&(this.p2Class.textContent=t.characterClass);const e=Math.max(0,Math.min(100,t.hp/t.maxHp*100));this.p2HpBar&&(this.p2HpBar.style.width=`${e}%`),this.p2HpText&&(this.p2HpText.textContent=`${Math.ceil(t.hp)} / ${t.maxHp}`);const i=Math.max(0,Math.min(100,t.mp/t.maxMp*100));this.p2MpBar&&(this.p2MpBar.style.width=`${i}%`),this.p2MpText&&(this.p2MpText.textContent=`${Math.ceil(t.mp)} / ${t.maxMp}`)}setLevelInfo(t,e="⭐⭐⭐"){this.levelTitle&&(this.levelTitle.textContent=t)}updateBoss(t){if(!t||t.isDead){this.bossBarContainer&&this.bossBarContainer.classList.add("hidden");return}this.bossBarContainer&&this.bossBarContainer.classList.remove("hidden"),this.bossName&&(this.bossName.textContent=t.name),this.bossPhase&&(this.bossPhase.textContent=`Phase ${t.phase}`);const e=Math.max(0,Math.min(100,t.hp/t.maxHp*100));this.bossHpBar&&(this.bossHpBar.style.width=`${e}%`)}showToast(t){if(!this.toastContainer)return;const e=document.createElement("div");e.className="toast",e.textContent=t,this.toastContainer.appendChild(e),setTimeout(()=>{e.remove()},3e3)}}class ag{constructor(t,e,i,s){this.canvas=t,this.input=e,this.audio=i,this.network=s,this.scene=new Mu,this.camera=new He(52,window.innerWidth/window.innerHeight,.1,300),this.camera.position.set(10,18,24),this.camera.rotation.x=-.15,this.renderer=new X0({canvas:this.canvas,antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=bc,this.particles=new q0(this.scene),this.floatingTexts=new Y0,this.world3D=new K0(this.scene),this.questManager=new sg,this.hud=new rg,this.localPlayer=null,this.partner=null,this.currentLevel=1,this.levelData=null,this.platforms=[],this.movingPlatforms=[],this.hazards=[],this.coins=[],this.checkpoints=[],this.switches=[],this.doors=[],this.chests=[],this.enemies=[],this.boss=null,this.exitPortal=null,this.isPaused=!1,this.isRunning=!1,this.lastTime=0,this.killsThisLevel=0,this.shakeIntensity=0,this.shakeTimer=0,this.setupResize(),this.loadSaveData()}setupResize(){window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}loadSaveData(){try{const t=localStorage.getItem("twin_quest_save");this.saveData=t?JSON.parse(t):{unlockedLevel:1,totalCoins:0}}catch{this.saveData={unlockedLevel:1,totalCoins:0}}}saveProgress(){if(this.localPlayer)try{this.saveData.totalCoins=this.localPlayer.coins,this.saveData.unlockedLevel=Math.max(this.saveData.unlockedLevel||1,this.currentLevel),localStorage.setItem("twin_quest_save",JSON.stringify(this.saveData))}catch(t){console.warn("Could not save:",t)}}startSoloGame(t="warrior",e="Hero"){this.network.isMultiplayer=!1,this.partner&&(this.partner.destroy(),this.partner=null),this.localPlayer&&this.localPlayer.destroy(),this.localPlayer=new In("local",e,t,!0,this.scene),this.loadLevel(1),this.startLoop(),this.hud.show()}startMultiplayerGame(t,e){this.network.isMultiplayer=!0;const i=t.players.find(r=>r.playerNum===1),s=t.players.find(r=>r.playerNum===2);this.localPlayer&&this.localPlayer.destroy(),this.partner&&this.partner.destroy(),e===1?(this.localPlayer=new In("p1",i.name,i.characterClass,!0,this.scene),this.partner=new In("p2",s?s.name:"Partner",s?s.characterClass:"archer",!1,this.scene)):(this.localPlayer=new In("p2",s.name,s.characterClass,!0,this.scene),this.partner=new In("p1",i.name,i.characterClass,!1,this.scene)),this.loadLevel(t.currentLevel||1),this.startLoop(),this.hud.show()}loadLevel(t,e=!0){this.currentLevel=t,this.levelData=lc[t]||lc[1],this.killsThisLevel=0,this.clearCurrentLevel(),this.world3D.setupLighting(this.levelData.theme),this.world3D.buildPlatforms(this.levelData.platforms,this.levelData.theme),this.world3D.buildHazards(this.levelData.hazards),this.world3D.buildScenery(this.levelData.worldWidth,this.levelData.theme),this.platforms=this.levelData.platforms.map(r=>({x:r.x/20,y:(1e3-r.y)/20,width:r.width/20,height:r.height/20})),this.movingPlatforms=(this.levelData.movingPlatforms||[]).map(r=>new j0(r.id,r.x,r.y,r.width,r.height,r.dx,r.dy,r.speed,this.scene)),this.coins=this.levelData.coins.map(r=>new tg(r.id,r.x,r.y,this.scene)),this.checkpoints=this.levelData.checkpoints.map(r=>new $0(r.id,r.x,r.y,this.scene)),this.switches=this.levelData.switches.map(r=>new Z0(r.id,r.x,r.y,r.targetId,r.isPressurePlate,this.scene)),this.doors=this.levelData.doors.map(r=>new J0(r.id,r.x,r.y,r.width,r.height,this.scene)),this.chests=this.levelData.chests.map(r=>new Q0(r.id,r.x,r.y,r.tier,this.scene)),this.enemies=this.levelData.enemies.map(r=>new ig(r.id,r.type,r.x,r.y,{},this.scene)),this.levelData.boss?this.boss=new ng(this.levelData.boss.level,this.levelData.boss.x,this.levelData.boss.y,this.scene):this.boss=null,this.levelData.exitPortal&&(this.exitPortal=new eg(this.levelData.exitPortal.x,this.levelData.exitPortal.y,this.scene));const i=this.levelData.spawnPoint.x/20,s=(1e3-this.levelData.spawnPoint.y)/20;this.localPlayer&&(this.localPlayer.x=i,this.localPlayer.y=s,this.localPlayer.checkpoint={x:i,y:s},this.localPlayer.vx=0,this.localPlayer.vy=0,this.localPlayer.isDead=!1),this.partner&&(this.partner.x=i+1.5,this.partner.y=s,this.partner.checkpoint={x:i+1.5,y:s},this.partner.targetX=i+1.5,this.partner.targetY=s),this.questManager.loadQuests(this.levelData.quests||[]),this.audio.startMusic(t),this.hud.setLevelInfo(`Level ${t}: ${this.levelData.name}`),this.hud.showToast(`Entered ${this.levelData.name}!`),e&&this.network.isMultiplayer&&this.network.isHost&&this.network.sendLevelTransition(t)}clearCurrentLevel(){this.world3D.clear(),this.particles.clear();for(const t of this.movingPlatforms)t.destroy();for(const t of this.coins)t.destroy();for(const t of this.checkpoints)t.destroy();for(const t of this.switches)t.destroy();for(const t of this.doors)t.destroy();for(const t of this.chests)t.destroy();for(const t of this.enemies)t.destroy();this.boss&&this.boss.destroy(),this.exitPortal&&this.exitPortal.destroy(),this.movingPlatforms=[],this.coins=[],this.checkpoints=[],this.switches=[],this.doors=[],this.chests=[],this.enemies=[],this.boss=null,this.exitPortal=null}startLoop(){this.isRunning=!0,this.lastTime=performance.now(),requestAnimationFrame(t=>this.gameLoop(t))}gameLoop(t){if(!this.isRunning)return;const e=Math.min(.05,(t-this.lastTime)/1e3);this.lastTime=t,this.isPaused||this.update(e),this.render(),requestAnimationFrame(i=>this.gameLoop(i))}update(t){const e=[this.localPlayer,this.partner].filter(Boolean);this.input.consumePause()&&this.togglePause(),this.particles.update(t),this.floatingTexts.update(t);for(const i of this.movingPlatforms)i.update(t);for(const i of this.doors)i.update(t);for(const i of this.checkpoints)i.update(t);for(const i of this.coins)i.update(t);if(this.exitPortal&&(this.exitPortal.update(t),this.boss&&this.boss.isDead&&(this.exitPortal.active=!0)),this.localPlayer){if(this.localPlayer.update(t,this.input,this.audio,this.particles,this.floatingTexts),this.applyPlayer3DPhysics(this.localPlayer,t),this.localPlayer.isDead){const i=document.getElementById("modal-gameover");i&&i.classList.contains("hidden")&&(i.classList.remove("hidden"),this.audio.playGameOver())}this.network.isMultiplayer&&this.network.sendPlayerSync({x:this.localPlayer.x*20,y:1e3-this.localPlayer.y*20,vx:this.localPlayer.vx*20,vy:-this.localPlayer.vy*20,facing:this.localPlayer.facing,state:this.localPlayer.state,hp:this.localPlayer.hp})}this.partner&&this.partner.connected&&this.partner.update(t,null,this.audio,this.particles,this.floatingTexts);for(const i of this.enemies)i.update(t,e),i.flying||this.applyGround3DCollision(i,t);this.boss&&!this.boss.isDead&&(this.boss.update(t,e,this.audio,this.particles,this),this.applyGround3DCollision(this.boss,t),this.hud.updateBoss(this.boss)),this.handle3DInteractions(),this.handle3DCombat(),this.handle3DWorldCollisions(),this.update3DCamera(t),this.hud.updatePlayer1(this.localPlayer),this.partner&&this.hud.updatePlayer2(this.partner)}applyPlayer3DPhysics(t,e){if(t.isDashing){t.x+=t.vx*e;return}const i=-35;t.vy+=i*e,t.x+=t.vx*e,t.y+=t.vy*e,t.isGrounded=!1;for(const s of this.platforms){const r=s.y;s.y-s.height,t.x>s.x&&t.x<s.x+s.width&&t.vy<=0&&t.y<=r&&t.y-t.vy*e>=r-.4&&(t.y=r,t.vy=0,t.isGrounded=!0,t.canDoubleJump=!0)}for(const s of this.movingPlatforms)t.x>=s.x&&t.x<=s.x+s.w&&t.vy<=0&&Math.abs(t.y-s.y)<.5&&(t.y=s.y,t.vy=0,t.isGrounded=!0,t.canDoubleJump=!0);t.y<0&&(t.takeDamage(30),t.x=t.checkpoint.x,t.y=t.checkpoint.y,t.vx=0,t.vy=0,this.particles.createHitSparks(t.x,t.y))}applyGround3DCollision(t,e){t.vy+=-30*e,t.x+=t.vx*e,t.y+=t.vy*e;for(const s of this.platforms){const r=s.y;t.x>=s.x&&t.x<=s.x+s.width&&t.vy<=0&&t.y<=r&&t.y-t.vy*e>=r-.5&&(t.y=r,t.vy=0)}}handle3DInteractions(){const t=this.localPlayer;if(!t)return;const e=this.input.consumeInteract();for(const i of this.switches)if(i.isPressurePlate){const s=Math.abs(t.x-i.x)<.9&&Math.abs(t.y-i.y)<.4,r=this.partner&&Math.abs(this.partner.x-i.x)<.9&&Math.abs(this.partner.y-i.y)<.4,a=s||r;i.state!==a&&(i.setState(a),this.audio.playSwitch(),this.updateLinkedDoor(i.targetId),this.network.isMultiplayer&&this.network.sendSwitchTrigger(i.id,a),a&&this.questManager.progressQuest("switch",1,this.audio,this.floatingTexts,t))}else e&&Math.hypot(t.x-i.x,t.y-i.y)<2.4&&(i.setState(!i.state),this.audio.playSwitch(),this.updateLinkedDoor(i.targetId),this.network.isMultiplayer&&this.network.sendSwitchTrigger(i.id,i.state),this.questManager.progressQuest("switch",1,this.audio,this.floatingTexts,t));if(e){for(const i of this.chests)if(!i.opened&&Math.hypot(t.x-i.x,t.y-i.y)<2.6){const s=i.open(this.audio,this.particles,this.floatingTexts);s&&(t.coins+=s.coins,t.gems+=s.gems,this.network.isMultiplayer&&this.network.sendChestOpened(i.id,s))}this.exitPortal&&this.exitPortal.active&&Math.hypot(t.x-this.exitPortal.x,t.y-this.exitPortal.y)<3&&this.triggerVictory()}}updateLinkedDoor(t){const e=this.doors.find(o=>o.id===t);if(!e)return;const i=this.switches.filter(o=>o.targetId===t),s=this.network.isMultiplayer?i.length:1,a=i.filter(o=>o.state).length>=s;e.isOpen!==a&&(e.isOpen=a,this.audio.playDoor(),this.network.isMultiplayer&&this.network.sendDoorTrigger(e.id,a))}handle3DCombat(){const t=this.localPlayer;if(!t||t.isDead)return;const e=t.getAttackHitbox();if(e){for(const i of this.enemies)if(!i.isDead&&Math.hypot(t.x-i.x,t.y-i.y)<e.width){const s=i.takeDamage(e.damage,t.x);s>0&&(this.audio.playHit(),this.particles.createHitSparks(i.x,i.y+.5),i.isDead&&this.onEnemyKilled(i),this.network.isMultiplayer&&this.network.sendEnemyDamage(i.id,s,i.hp,i.isDead,i.x*20,i.y*20))}if(this.boss&&!this.boss.isDead&&Math.hypot(t.x-this.boss.x,t.y-this.boss.y)<e.width+1.2){const i=this.boss.takeDamage(e.damage);i>0&&(this.audio.playHit(),this.particles.createHitSparks(this.boss.x,this.boss.y+1.5),this.boss.isDead&&this.onBossKilled(),this.network.isMultiplayer&&this.network.sendBossDamage(i,this.boss.hp,this.boss.phase,this.boss.isDead))}}for(let i=t.projectiles.length-1;i>=0;i--){const s=t.projectiles[i];let r=!1;for(const a of this.enemies)if(!a.isDead&&Math.hypot(s.x-a.x,s.y-a.y)<1.2){r=!0,a.takeDamage(s.damage,t.x),this.audio.playHit(),this.particles.createHitSparks(a.x,a.y+.5),a.isDead&&this.onEnemyKilled(a);break}!r&&this.boss&&!this.boss.isDead&&Math.hypot(s.x-this.boss.x,s.y-this.boss.y)<2&&(r=!0,this.boss.takeDamage(s.damage),this.audio.playHit(),this.particles.createHitSparks(this.boss.x,this.boss.y+1.5),this.boss.isDead&&this.onBossKilled()),r&&s.type!=="piercing_arrow"&&(s.mesh&&this.scene.remove(s.mesh),t.projectiles.splice(i,1))}for(const i of this.enemies)!i.isDead&&Math.hypot(t.x-i.x,t.y-i.y)<1.2&&t.takeDamage(i.damage,i.x)&&(this.audio.playHit(),this.shake(5,.2));if(this.boss&&!this.boss.isDead){Math.hypot(t.x-this.boss.x,t.y-this.boss.y)<2.2&&t.takeDamage(this.boss.damage,this.boss.x)&&(this.audio.playHit(),this.shake(7,.25));for(let i=this.boss.projectiles.length-1;i>=0;i--){const s=this.boss.projectiles[i];Math.hypot(t.x-s.x,t.y-s.y)<1.2&&(t.takeDamage(s.damage,s.x)&&(this.audio.playHit(),this.shake(7,.25)),s.mesh&&this.scene.remove(s.mesh),this.boss.projectiles.splice(i,1))}}}onEnemyKilled(t){this.killsThisLevel++,this.particles.createDefeatExplosion(t.x,t.y+.8),this.localPlayer&&(this.localPlayer.coins+=t.coins,this.localPlayer.score+=t.coins*10),this.questManager.progressQuest("kills",1,this.audio,this.floatingTexts,this.localPlayer)}onBossKilled(){this.audio.playVictory(),this.shake(14,.8),this.particles.createDefeatExplosion(this.boss.x,this.boss.y+2),this.localPlayer&&(this.localPlayer.coins+=200,this.localPlayer.gems+=5),this.exitPortal&&(this.exitPortal.active=!0),this.questManager.progressQuest("boss",1,this.audio,this.floatingTexts,this.localPlayer),this.hud.updateBoss(null)}handle3DWorldCollisions(){const t=this.localPlayer;if(t){for(const e of this.coins)!e.collected&&Math.hypot(t.x-e.x,t.y-e.y)<1.4&&(e.collect(),t.coins+=10,this.audio.playCoin(),this.particles.createCoinSparkle(e.x,e.y),this.questManager.progressQuest("coins",1,this.audio,this.floatingTexts,t));for(const e of this.checkpoints)!e.active&&Math.hypot(t.x-e.x,t.y-e.y)<2&&(e.activate(this.audio,this.particles,this.floatingTexts),t.checkpoint={x:e.x,y:e.y},this.network.isMultiplayer&&this.network.sendCheckpointActivated(e.id,e.x*20,1e3-e.y*20))}}update3DCamera(t){if(!this.localPlayer)return;let e=this.localPlayer.x,i=this.localPlayer.y+2.5;if(this.partner&&this.partner.connected&&(e=(this.localPlayer.x+this.partner.x)/2,i=(this.localPlayer.y+this.partner.y)/2+2.5),this.camera.position.x=Fi.lerp(this.camera.position.x,e,7*t),this.camera.position.y=Fi.lerp(this.camera.position.y,i,7*t),this.shakeTimer>0){this.shakeTimer-=t;const s=this.shakeIntensity*(this.shakeTimer/.3);this.camera.position.x+=(Math.random()-.5)*s,this.camera.position.y+=(Math.random()-.5)*s}}shake(t=6,e=.25){this.shakeIntensity=t*.15,this.shakeTimer=e}triggerVictory(){this.isPaused=!0,this.saveProgress();const t=document.getElementById("modal-victory");t&&(document.getElementById("v-coins").textContent=this.localPlayer?this.localPlayer.coins:0,document.getElementById("v-kills").textContent=this.killsThisLevel,document.getElementById("v-boss").textContent=this.boss&&this.boss.isDead?"Defeated! 🏆":"Skipped",t.classList.remove("hidden")),this.audio.playVictory()}nextLevel(){const t=document.getElementById("modal-victory");t&&t.classList.add("hidden"),this.isPaused=!1;const e=this.currentLevel>=5?1:this.currentLevel+1;this.loadLevel(e)}respawnPlayer(){const t=document.getElementById("modal-gameover");t&&t.classList.add("hidden"),this.localPlayer&&(this.localPlayer.respawn(),this.particles.createCheckpointAura(this.localPlayer.x,this.localPlayer.y))}togglePause(){this.isPaused=!this.isPaused;const t=document.getElementById("modal-settings"),e=document.getElementById("btn-resume-game"),i=document.getElementById("btn-quit-to-menu"),s=document.getElementById("settings-title");this.isPaused?(s&&(s.textContent="⏸️ Game Paused"),e&&e.classList.remove("hidden"),i&&i.classList.remove("hidden"),t&&t.classList.remove("hidden")):t&&t.classList.add("hidden")}showToast(t){this.hud.showToast(t)}applySwitchSync(t,e){const i=this.switches.find(s=>s.id===t);i&&(i.setState(e),this.updateLinkedDoor(i.targetId))}applyDoorSync(t,e){const i=this.doors.find(s=>s.id===t);i&&(i.isOpen=e)}applyChestSync(t,e){const i=this.chests.find(s=>s.id===t);i&&!i.opened&&i.open(this.audio,this.particles,this.floatingTexts)}applyCheckpointSync(t){const e=this.checkpoints.find(i=>i.id===t);e&&!e.active&&e.activate(this.audio,this.particles,this.floatingTexts)}applyEnemyDamageSync(t){const e=this.enemies.find(i=>i.id===t.enemyId);e&&(e.hp=t.newHp,t.isDead&&!e.isDead&&(e.isDead=!0,this.onEnemyKilled(e)))}applyBossDamageSync(t){this.boss&&(this.boss.hp=t.newHp,t.isDead&&!this.boss.isDead&&(this.boss.isDead=!0,this.onBossKilled()))}render(){this.renderer.render(this.scene,this.camera)}}window.addEventListener("DOMContentLoaded",()=>{var A,_,b,C,I,U,z,N,B,$,W,it,X,j,tt,Rt,Et,ie,Vt,$t,q,Q,_t,It,gt,Ot,pe,Bt;const n=document.getElementById("gameCanvas"),t=new ml,e=new gl;let i="warrior",s="Hero";const r=new ch(null),a=new ag(n,e,t,r);r.gameEngine=a,r.init();const o=document.getElementById("screen-menu"),c=document.getElementById("screen-lobby"),l=document.getElementById("modal-join"),u=document.getElementById("modal-how-to-play"),f=document.getElementById("modal-settings");document.getElementById("modal-victory"),document.getElementById("modal-gameover");const h=document.getElementById("touch-controls");(e.isTouchDevice||window.innerWidth<=850)&&h&&h.classList.remove("hidden");const g=()=>{t.ensureContext(),window.removeEventListener("click",g),window.removeEventListener("keydown",g),window.removeEventListener("touchstart",g)};window.addEventListener("click",g),window.addEventListener("keydown",g),window.addEventListener("touchstart",g);const v=document.querySelectorAll("#menu-class-selector .class-card");v.forEach(ht=>{ht.addEventListener("click",()=>{v.forEach(Pt=>Pt.classList.remove("active")),ht.classList.add("active"),i=ht.getAttribute("data-class"),t.playJump()})}),(A=document.getElementById("btn-single-player"))==null||A.addEventListener("click",()=>{t.ensureContext(),o.classList.remove("active"),o.classList.add("hidden"),a.startSoloGame(i,s)}),(_=document.getElementById("btn-create-game"))==null||_.addEventListener("click",()=>{t.ensureContext(),r.createRoom(s,i,ht=>{ht&&ht.success?S(ht.snapshot,1):alert("Failed to create room. Please check server connection.")})}),(b=document.getElementById("btn-join-game"))==null||b.addEventListener("click",()=>{l.classList.remove("hidden")}),(C=document.getElementById("btn-close-join"))==null||C.addEventListener("click",()=>{l.classList.add("hidden")}),(I=document.getElementById("btn-cancel-join"))==null||I.addEventListener("click",()=>{l.classList.add("hidden")}),(U=document.getElementById("btn-confirm-join"))==null||U.addEventListener("click",()=>{const ht=document.getElementById("join-code-input").value.trim(),Pt=document.getElementById("join-name-input").value.trim();if(Pt&&(s=Pt),!ht||ht.length<4){alert("Please enter a valid room code.");return}r.joinRoom(ht,s,i,bt=>{bt&&bt.success?(l.classList.add("hidden"),S(bt.snapshot,bt.playerNum)):alert((bt==null?void 0:bt.reason)||"Could not join room.")})});function S(ht,Pt){o.classList.add("hidden"),c.classList.remove("hidden"),document.getElementById("lobby-code-display").textContent=ht.code,m(ht);const bt=document.getElementById("btn-lobby-start");Pt===1?(bt.style.display="block",bt.disabled=ht.players.length<2):bt.style.display="none"}function m(ht){var de,ye;const Pt=ht.players.find(Xt=>Xt.playerNum===1),bt=ht.players.find(Xt=>Xt.playerNum===2);if(Pt){document.getElementById("slot-p1-name").textContent=Pt.name,document.getElementById("slot-p1-class").textContent=Pt.characterClass,document.getElementById("slot-p1-avatar").textContent=((de=Os[Pt.characterClass])==null?void 0:de.icon)||"🛡️";const Xt=document.getElementById("slot-p1-status");Xt.textContent=Pt.ready?"🟢 Ready":"⏳ Preparing...",Xt.className=`slot-status ${Pt.ready?"ready":"waiting"}`}const Qt=document.getElementById("slot-p2");if(bt){Qt.classList.remove("waiting"),document.getElementById("slot-p2-name").textContent=bt.name,document.getElementById("slot-p2-class").textContent=bt.characterClass,document.getElementById("slot-p2-avatar").textContent=((ye=Os[bt.characterClass])==null?void 0:ye.icon)||"🏹";const Xt=document.getElementById("slot-p2-status");Xt.textContent=bt.ready?"🟢 Ready":"⏳ Preparing...",Xt.className=`slot-status ${bt.ready?"ready":"waiting"}`;const le=document.getElementById("btn-lobby-start");r.isHost&&(le.disabled=!(Pt&&Pt.ready&&bt.ready))}else Qt.classList.add("waiting"),document.getElementById("slot-p2-name").textContent="Waiting for Player 2...",document.getElementById("slot-p2-class").textContent="---",document.getElementById("slot-p2-avatar").textContent="❓",document.getElementById("slot-p2-status").textContent="⏳ Awaiting Connection"}r.socket.on("room-updated",ht=>{m(ht)}),r.socket.on("game-started",ht=>{c.classList.add("hidden"),a.startMultiplayerGame(ht,r.playerNum)});const d=document.querySelectorAll(".mini-picker-btn");d.forEach(ht=>{ht.addEventListener("click",()=>{d.forEach(Pt=>Pt.classList.remove("active")),ht.classList.add("active"),i=ht.getAttribute("data-class"),r.sendClassSelection(i)})});let M=!1;(z=document.getElementById("btn-lobby-ready"))==null||z.addEventListener("click",()=>{M=!M,document.getElementById("ready-btn-text").textContent=M?"Cancel Ready ⏳":"Ready Up ⚔️",r.sendReadyToggle(M)}),(N=document.getElementById("btn-lobby-start"))==null||N.addEventListener("click",()=>{r.sendStartGame()}),(B=document.getElementById("btn-copy-code"))==null||B.addEventListener("click",()=>{const ht=document.getElementById("lobby-code-display").textContent;navigator.clipboard.writeText(ht).then(()=>{a.showToast(`📋 Code ${ht} copied to clipboard!`)})}),($=document.getElementById("btn-copy-link"))==null||$.addEventListener("click",()=>{const ht=document.getElementById("lobby-code-display").textContent,Pt=`${window.location.origin}${window.location.pathname}?room=${ht}`;navigator.clipboard.writeText(Pt).then(()=>{a.showToast("🔗 Invite link copied to clipboard!")})}),(W=document.getElementById("btn-lobby-leave"))==null||W.addEventListener("click",()=>{window.location.reload()}),(it=document.getElementById("btn-how-to-play"))==null||it.addEventListener("click",()=>{u.classList.remove("hidden")}),(X=document.getElementById("btn-close-how"))==null||X.addEventListener("click",()=>{u.classList.add("hidden")}),(j=document.getElementById("btn-dismiss-how"))==null||j.addEventListener("click",()=>{u.classList.add("hidden")});const R=()=>{f.classList.remove("hidden")};(tt=document.getElementById("btn-settings"))==null||tt.addEventListener("click",R),(Rt=document.getElementById("btn-pause-toggle"))==null||Rt.addEventListener("click",()=>{a.togglePause()}),(Et=document.getElementById("btn-close-settings"))==null||Et.addEventListener("click",()=>{f.classList.add("hidden")}),(ie=document.getElementById("btn-dismiss-settings"))==null||ie.addEventListener("click",()=>{f.classList.add("hidden")}),(Vt=document.getElementById("btn-resume-game"))==null||Vt.addEventListener("click",()=>{a.togglePause()}),($t=document.getElementById("btn-quit-to-menu"))==null||$t.addEventListener("click",()=>{window.location.reload()}),(q=document.getElementById("slider-master-volume"))==null||q.addEventListener("input",ht=>{t.setMasterVolume(ht.target.value/100)}),(Q=document.getElementById("slider-sfx-volume"))==null||Q.addEventListener("input",ht=>{t.setSfxVolume(ht.target.value/100)}),(_t=document.getElementById("slider-music-volume"))==null||_t.addEventListener("input",ht=>{t.setMusicVolume(ht.target.value/100)}),(It=document.getElementById("btn-mute-toggle"))==null||It.addEventListener("click",ht=>{const Pt=t.toggleMute();ht.target.textContent=Pt?"Sound: MUTED 🔇":"Sound: ON 🔊"}),(gt=document.getElementById("btn-respawn"))==null||gt.addEventListener("click",()=>{a.respawnPlayer()}),(Ot=document.getElementById("btn-gameover-menu"))==null||Ot.addEventListener("click",()=>{window.location.reload()}),(pe=document.getElementById("btn-next-level"))==null||pe.addEventListener("click",()=>{a.nextLevel()}),(Bt=document.getElementById("btn-victory-menu"))==null||Bt.addEventListener("click",()=>{window.location.reload()});const E=new URLSearchParams(window.location.search).get("room");if(E){const ht=document.getElementById("join-code-input");ht&&(ht.value=E.toUpperCase()),l.classList.remove("hidden")}(()=>{document.querySelectorAll(".character-preview-card, .lobby-card, .class-card, .modal-card").forEach(Pt=>{Pt.addEventListener("mousemove",bt=>{const Qt=Pt.getBoundingClientRect(),de=bt.clientX-Qt.left,ye=bt.clientY-Qt.top,Xt=Qt.width/2,le=Qt.height/2,D=(ye-le)/le*-10,Ee=(de-Xt)/Xt*10;Pt.style.transform=`perspective(800px) rotateX(${D.toFixed(2)}deg) rotateY(${Ee.toFixed(2)}deg) translateZ(16px)`}),Pt.addEventListener("mouseleave",()=>{Pt.style.transform=""})})})()});
