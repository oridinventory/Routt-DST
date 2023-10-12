/**
 * Copyright @ 2023 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/text!./BounceMaterial.xml","dojo/_base/declare","../../webgl-engine-extensions/GLSLShader","../../webgl-engine-extensions/GLSLProgramExt","../../support/fx3dUtils","../Materials"],function(t,e,i,s,n,r){var a=e([r],{declaredClass:"esri.views.3d.effects.Bounce.BounceMaterial",constructor:function(t){this._gl=t.gl,this._shaderSnippets=t.shaderSnippets,this._program=null,this._pushState=t.pushState,this._restoreState=t.restoreState,this._srcAlpha=770,this._dstAlpha=771,this._viewingMode=t.viewingMode,"local"==t.viewingMode&&(this._srcAlpha=770,this._dstAlpha=771)},destroy:function(){this._program&&(this._program.dispose(),delete this._program,this._program=null)},_addDefines:function(t,e){var i="";if(null!=e)if(Array.isArray(e))for(var s=0,n=e.length;s<n;s++){var r=e[s];i+="#define "+r+"\n"}else for(var r in e)i+="#define "+r+"\n";return this._shaderSnippets.defines+"\n"+i+t},loadShaders:function(e){if(this._shaderSnippets){var n="bounceVS",r="bounceFS";e&&(n="timeInfoBounceVS",r="timeInfoBounceFS"),null!=this._shaderSnippets[n]&&null!=this._shaderSnippets[r]||this._shaderSnippets._parse(t);var a=[];"global"==this._viewingMode?a.push("GLOBAL"):a.push("LOCAL");var o=this._addDefines(this._shaderSnippets[n],a),h=new i(35633,o,this._gl),l=new i(35632,this._shaderSnippets[r],this._gl);this._program=new s([h,l],this._gl),this._program.init()}return this._initResources()},getProgram:function(){return this._program},_initResources:function(){return!0},bind:function(t,e){this._program.use(),this._program.uniformMatrix4fv("ms",t.proj),this._program.uniformMatrix4fv("ls",t.view),this._program.uniform3fv("oo",t.camPos),this._program.uniform3fv("om",t.lightingData.direction),this._program.uniform4fv("lo",t.lightingData.ambient),this._program.uniform4fv("ll",t.lightingData.diffuse),this._program.uniform4fv("so",t.lightingData.specular),this._oldTex=this._gl.getParameter(32873);var i=this.getOldActiveUnit(e);t.pi.bind(i+1),this._program.uniform1i("pi",i+1),this._program.uniform2fv("pp",t.pp),this._program.uniform2fv("pe",[t.pe,t.il]),this._gl.activeTexture(33984+i+2),this._gl.bindTexture(3553,t.po),this._program.uniform1i("po",i+2),this._gl.activeTexture(33984+i+3),this._gl.bindTexture(3553,t.im),this._program.uniform1i("im",i+3),this._program.uniform3fv("is",t.is),this._program.uniform1f("ss",t.ss),this._program.uniform1f("sm",t.sm),this._program.uniform1f("es",t.time),1!=e._depthTestEnabled&&(this._pushState(["setDepthTestEnabled",e._depthTestEnabled]),e.setDepthTestEnabled(!0)),0!=e._depthWriteEnabled&&(this._pushState(["setDepthWriteEnabled",e._depthWriteEnabled]),e.setDepthWriteEnabled(!1))},bindBoolean:function(t,e){this._program.uniform1i(t,e)},bindFloat:function(t,e){this._program.uniform1f(t,e)},blend:function(t,e){t?(1!=e._blendEnabled&&(this._pushState(["setBlendingEnabled",e._blendEnabled]),e.setBlendingEnabled(!0)),this._pushState(["setBlendFunctionSeparate",[e._state.blendFunction.srcRGB,e._state.blendFunction.dstRGB,e._state.blendFunction.srcAlpha,e._state.blendFunction.dstAlpha]]),e.setBlendFunction(this._srcAlpha,this._dstAlpha)):0!=e._blendEnabled&&(this._pushState(["setBlendingEnabled",e._blendEnabled]),e.setFaceCullingEnabled(!1))},release:function(t){this._gl.activeTexture(33984+t._state.activeTexture+1),this._gl.bindTexture(3553,this._oldTex),this._restoreState(t),this._gl.useProgram(null)}});return a});