/**
 * Copyright @ 2023 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","esri/core/lang","esri/views/3d/webgl-engine/lib/Util","esri/core/libs/gl-matrix-2/vec3f64","esri/core/libs/gl-matrix-2/vec2f64","esri/core/libs/gl-matrix-2/vec3","esri/core/libs/gl-matrix-2/vec2","../../webgl-engine-extensions/VertexBufferLayout","../../webgl-engine-extensions/GLVertexArrayObject","../../webgl-engine-extensions/GLXBO","../../webgl-engine-extensions/GLVerTexture","../../support/fx3dUtils","../../support/fx3dUnits","../../support/interpolationUtils","../Effect","./BounceMaterial","../../webgl-engine-extensions/constraints"],function(i,e,t,s,r,n,a,h,o,l,_,d,u,g,c,f,m,v,p){var x,b,w,y=n.vec3f64,h=h.vec3,I=a.vec2f64,o=o.vec2,F=40.11,M=y.create(),P=y.create(),z=y.create(),V=y.create(),T=y.create(),A=y.create(),B=y.create(),O=y.create(),D=y.create(),C=y.fromValues(0,0,1),N=0,L=-1,S=0,H=p.VertexAttrConstants,G=t([m],{declaredClass:"esri.views.3d.effects.Bounce.BounceEffect",effectName:"Bounce",constructor:function(e){i.hitch(this,e),this.orderId=2,this._pointsNum=15,this._cachedFlyPaths={},this._cachedPulses={},this._timeAwareFids=[],this._needsAllLoaded=!0,this._layer.timeInfo instanceof Object?(this._hasTimeInfo=!0,this._needsRenderPath=!1):this._hasTimeInfo=!1,this._hasTimeInfo=!1},_initRenderingInfo:function(){this.renderingInfo.radius=30,this.renderingInfo.dashHeight=1e5,this.renderingInfo.haloColors=[g.rgbNames.cadetblue,g.rgbNames.yellowgreen,g.rgbNames.lightpink,g.rgbNames.orangered,g.rgbNames.green,g.rgbNames.indianred],this._colorBarDirty=!0,this._renderingInfoDirty=!0,this._vacDirty=!0,this._shapeDirty=!0,this.inherited(arguments)},_doRenderingInfoChange:function(i){this.inherited(arguments);for(var e in i)i.hasOwnProperty(e)&&this.renderingInfo.hasOwnProperty(e)&&(g.endsWith(e.toLowerCase(),"info")?g.isInforAttrChanged(this.renderingInfo[e],i[e])&&(this._renderingInfoDirty=!0):g.endsWith(e.toLowerCase(),"color")?i[e]instanceof Array&&3==i[e].length&&(this.renderingInfo[e]=[i[e][0]/255,i[e][1]/255,i[e][2]/255]):g.endsWith(e.toLowerCase(),"colors")?i[e]instanceof Array&&(this.renderingInfo[e]=i[e],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"radius"===e.toLowerCase()||"dashHeight"===e.toLowerCase()||"transparency"===e.toLowerCase()?(this._clampScope(i,e),"radius"==e&&this._radiusUnit?this.renderingInfo[e]=c.toMeters(this._radiusUnit,i[e],this._view.viewingMode):"dashHeight"==e&&this._dashHeightUnit?(this.renderingInfo[e]=c.toMeters(this._dashHeightUnit,i[e],this._view.viewingMode),this._updateDefaultLabelHeight()):this.renderingInfo[e]=i[e]):typeof i[e]==typeof this.renderingInfo[e]&&(this.renderingInfo[e]=i[e]))},_updateDefaultLabelHeight:function(){var i=this._pointsNum*this.renderingInfo.dashHeight;this._layer._labelDefaultHeight={flag:0,min:i,max:i}},setContext:function(t){this.inherited(arguments),this._effectConfig&&i.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._dashHeightUnit=null,e.forEach(this._effectConfig.renderingInfo,function(i){"radius"===i.name.toLowerCase()?(this._radiusUnit=i.unit,this.renderingInfo.radius=c.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"dashHeight"===i.name.toLowerCase()&&(this._dashHeightUnit=i.unit,this.renderingInfo.dashHeight=c.toMeters(this._dashHeightUnit,this.renderingInfo.dashHeight,this._view.viewingMode),this._updateDefaultLabelHeight())}.bind(this)),this._aroundVerticesTexture=new u(this._gl),this._aroundVerticesTextureSize=I.create())},destroy:function(){this._resetXBOs(),this._dispose("_aroundVerticesTexture"),this._dispose("_vao"),this._dispose("_pulseVAO")},_resetXBOs:function(){this._dispose("_vbo"),this._dispose("_ibo"),this._dispose("_pulseVBO"),N=0,L=-1,x=0,S=0,this._needsRenderPath=!1},_initVertexLayout:function(){this._vertexAttrConstants=[H.POSITION,H.AUXPOS1],this._vertexBufferLayout=new l(this._vertexAttrConstants,[3,2],[5126,5126])},_initRenderContext:function(){return this.inherited(arguments),this._vacDirty&&(this._initVertexLayout(),this._resetXBOs(),this._vacDirty=!1,this._vao&&(this._vao.unbind(),this._vao._initialized=!1),this._pulseVAO&&(this._pulseVAO.unbind(),this._pulseVAO._initialized=!1)),this._pulseVBO||(this._pulseVBO=new d(this._gl,(!0),this._vertexBufferLayout)),this._hasTimeInfo?(this._vbo||(this._vbo=new d(this._gl,(!0),this._vertexBufferLayout)),this._ibo||(this._ibo=new d(this._gl,(!1))),this._vaoExt&&(this._vao=new _(this._gl,this._vaoExt)),this._buildTimeAwareAroundPathGeometries()):(this._vaoExt&&(this._pulseVAO=new _(this._gl,this._vaoExt)),this._buildVerticalGeometries())},_buildTimeAwareAroundPathGeometries:function(){var i,e,t=this._allGraphics();if(t.sort(function(t,s){return i=t.attributes[this._layer.timeInfo.startTimeField],e=s.attributes[this._layer.timeInfo.startTimeField],i===e?0:i<e?1:i>e?-1:0}.bind(this)),this._cachedFlyPaths={},this._timeAwareFids=[],t.length>1){for(var s,r,n,a,o,l,_,d,u,c,m,v=[],p=0,x=t.length-1;p<x;p++)if(null!=t[p].geometry){for(s=t[p].geometry,s.altitude||(s.altitude=F),r=t[p+1].geometry,r.altitude||(r.altitude=F),h.set(M,s.longitude,s.latitude,s.altitude),"global"===this._view.viewingMode?g.wgs84ToSphericalEngineCoords(M,0,M,0):"local"===this._view.viewingMode&&g.wgs84ToWebMerc(M,0,M,0),h.set(P,r.longitude,r.latitude,r.altitude),"global"===this._view.viewingMode?g.wgs84ToSphericalEngineCoords(P,0,P,0):"local"===this._view.viewingMode&&g.wgs84ToWebMerc(P,0,P,0),0==p&&this._initPulseGeometries(p,t[p]),h.subtract(z,M,P),o=h.length(z),"global"===this._view.viewingMode?n=o<=5e5?18:o<=1e6?40:Math.floor(1e-5*o):"local"===this._view.viewingMode&&(n=o<=1e6?10:o<=2e6?18:Math.floor(6e-6*o)),m=.6*o,h.lerp(V,M,P,.5),"global"===this._view.viewingMode?(c=h.length(V),h.normalize(V,V),h.scale(V,V,c+m)):"local"===this._view.viewingMode&&(h.scale(D,C,m),h.add(V,D,V)),h.normalize(z,z),h.scale(T,z,m),h.add(A,V,T),h.scale(B,z,-m),h.add(O,V,B),this._cachedFlyPaths[t[p].attributes.FID]={vertices:null,indices:null},v=f.getPoints(n,M,M,A,V),v.pop(),v=v.concat(f.getPoints(n,V,O,P,P)),a=v.length,l=[],_=[],d=0,u=a;d<u;d++)l.push(v[d][0],v[d][1],v[d][2],d,a),d<u-1&&0===(1&d)&&(_.push(d,d+1),d+1===a-2&&_.push(d+1,d+2));this._cachedFlyPaths[t[p].attributes.FID].vertices=new Float32Array(l),this._cachedFlyPaths[t[p].attributes.FID].indices=new Uint32Array(_),this._timeAwareFids.push(t[p].attributes.FID),this._initPulseGeometries(p+1,t[p+1])}return this._resetAddGeometries(),!0}return 1==t.length&&(this._initPulseGeometries(0,t[0]),this._resetAddGeometries(),!0)},_initPulseGeometries:function(i,e){if(e.geometry){var t,s,r=e.geometry,n=this._vertexBufferLayout.getStride(),a=new Float32Array(this._pointsNum*n);for(t=0;t<this._pointsNum;t++)s=n*t,a[s+0]=r.longitude,a[s+1]=r.latitude,a[s+2]=null==r.altitude?F:F+r.altitude,a[s+3]=t==this._pointsNum-1?-this._pointsNum-1:t+1,a[s+4]=i;this._cachedPulses[e.attributes.FID]={vertices:a}}},_buildVerticalGeometries:function(){var i=this._allGraphics();if(i.length>0){var e,t=this._vertexBufferLayout.getStride(),s=new Float32Array(i.length*t*this._pointsNum),r=0,n=0,a=0;for(n=0;n<i.length;n++)if(e=i[n].geometry)for(a=0;a<this._pointsNum;a++)r=(n*this._pointsNum+a)*t,s[r+0]=e.longitude,s[r+1]=e.latitude,s[r+2]=null==e.altitude?F:F+e.altitude,s[r+3]=a==this._pointsNum-1?-this._pointsNum-1:a+1,s[r+4]=n;return this._pulseVBO.addData(!1,s),this._pulseVAO&&(this._pulseVAO._initialized=!1),this._resetAddGeometries(),!0}return!1},_initAroundVerticesTexture:function(){if(2*this._pathIdNum!==this._tmpPoints.length)return!1;var i=this._gl.getParameter(3379),e=2,t=this._pathIdNum*e,s=g.nextHighestPowerOfTwo(t);s>i&&(s=i,console.warn("Too many graphics, and some data will be discarded."));var r=Math.ceil(t/s);r=g.nextHighestPowerOfTwo(r),r>i&&(r=i,console.warn("Too many graphics, and some data will be discarded."));for(var n,a=new Float32Array(s*r*4),h=0;h<this._pathIdNum;h++)n=h*e*4,a[0+n]=h,a[1+n]=this._tmpPoints[h*e][0],a[2+n]=this._tmpPoints[h*e][1],a[3+n]=this._tmpPoints[h*e][2],a[4+n]=h,a[5+n]=this._tmpPoints[h*e+1][0],a[6+n]=this._tmpPoints[h*e+1][1],a[7+n]=this._tmpPoints[h*e+1][2];return this._aroundVerticesTexture.setData(s,r,a),o.set(this._aroundVerticesTextureSize,s,r),!0},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new v({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders(this._hasTimeInfo)},_initColourMap:function(){this._colourMapTexture||(this._colourMapTexture=this._gl.createTexture());var i=new Image;i.src=g.spriteImg;var e=this;return i.onload=function(){var t=e._gl.getParameter(e._gl.TEXTURE_BINDING_2D);e._gl.bindTexture(3553,e._colourMapTexture),e._gl.pixelStorei(37440,!0),e._gl.texParameteri(3553,10240,9728),e._gl.texParameteri(3553,10241,9728),e._gl.texParameteri(3553,10242,33071),e._gl.texParameteri(3553,10243,33071),e._gl.texImage2D(3553,0,6408,6408,5121,i),e._gl.generateMipmap(3553),e._gl.bindTexture(3553,t)},0===this._gl.getError()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var i=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture),this._gl.pixelStorei(37440,!0),this._gl.texParameteri(3553,10240,9728),this._gl.texParameteri(3553,10241,9728),this._gl.texParameteri(3553,10242,33071),this._gl.texParameteri(3553,10243,33071);var e=g.createColorBarTexture(32,1,this.renderingInfo.haloColors);return this._gl.texImage2D(3553,0,6408,6408,5121,e),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,i),0===this._gl.getError()},render:function(i,e){this.inherited(arguments),this._layer.visible&&this.ready&&this._bindPramsReady()&&(this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._hasTimeInfo?this._renderWithTimeInfo(i,e):this._renderWithoutTimeInfo(i,e))},_renderWithTimeInfo:function(e,t){this._material.bind(i.mixin({},{pi:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],pp:this._vizFieldVerTextureSize,im:this._colourMapTexture,ss:this.renderingInfo.animationInterval,sm:this.renderingInfo.transparency,pe:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,il:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,po:this._colorBarTexture,is:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},e)),N=Math.floor(this.time/this.renderingInfo.animationInterval),this._repeatCount=Math.floor(N/this._timeAwareFids.length),N%=this._timeAwareFids.length,this._repeatCount>this.renderingInfo.repeat&&(N=this._timeAwareFids.length-1),N!=L&&(0==(1&N)?(w=this._cachedPulses[this._timeAwareFids[x++]],this._pulseVBO.addData(!0,w.vertices),S=x-1):x>0&&(b=this._cachedFlyPaths[this._timeAwareFids[x-1]],this._vbo.addData(!1,b.vertices),this._ibo.addData(!1,b.indices),S=-1),L=N),this._material.bindBoolean("drawFlyPath",!1),this._material.bindFloat("currentIndex",S),this._material.blend(!0,t),this._pulseVBO.bind(this._material.getProgram()),this._gl.drawArrays(0,0,this._pulseVBO.getNum()),this._pulseVBO.unbind(),1==(1&N)&&(this._material.bindBoolean("drawFlyPath",!0),this._material.blend(!1,t),this._vbo.bind(this._material.getProgram()),this._ibo.bind(),this._gl.drawElements(1,this._ibo.getNum(),5125,0),this._ibo.unbind(),this._vbo.unbind()),this._material.release()},_localPulseBinds:function(){this._pulseVBO.bind(this._material._program),this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program)},_bindPulseBuffer:function(){this._pulseVAO?(this._pulseVAO._initialized||this._pulseVAO.initialize(this._localPulseBinds.bind(this)),this._pulseVAO.bind()):this._localPulseBinds()},_unBindPulseBuffer:function(){this._pulseVAO?this._pulseVAO.unbind():(this._pulseVBO.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program))},_renderWithoutTimeInfo:function(e,t){this._material.bind(i.mixin({},{pi:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],pp:this._vizFieldVerTextureSize,im:this._colourMapTexture,ss:this.renderingInfo.animationInterval,sm:this.renderingInfo.transparency,pe:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,il:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,po:this._colorBarTexture,is:[this._scopes.radius[0],this.renderingInfo.radius,this.renderingInfo.dashHeight]},e),t),this._material.blend(!0,t),this._bindPulseBuffer(),this._gl.drawArrays(0,0,this._pulseVBO.getNum()),this._material.release(t),this._unBindPulseBuffer()}});return G});