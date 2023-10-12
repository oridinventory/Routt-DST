/**
 * Copyright @ 2023 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["require","exports"],function(e,t){function i(e){var t=2;return e.replace(/\n/g,function(){var e;return e=t++,e=1e3>e?("  "+e).slice(-3):""+e,"\n"+e+":"})}return function(){function e(e,t,i,r){this.glName=void 0,this.defines=r,this.gl=i,this.type=e,this.source=t}return e.prototype.init=function(){void 0===this.glName&&(this.glName=this.gl.createShader(this.type),this.loadShader())},e.prototype.loadShader=function(){var e=this.source,t=this.defines,r=this.gl;if(void 0!==t){for(var n="",o=0;o<t.length;o++)n+="#define "+t[o]+"\n";e=n+e}r.shaderSource(this.glName,e),r.compileShader(this.glName),r.getShaderParameter(this.glName,r.COMPILE_STATUS)||(console.error(r.getShaderInfoLog(this.glName)),console.error(i(e)))},e.prototype.changeDefines=function(e){return JSON.stringify(this.defines)!==JSON.stringify(e)&&(this.defines=e,void 0!==this.glName&&this.loadShader(),!0)},e.prototype.getGLName=function(){return this.init(),this.glName},e}()});