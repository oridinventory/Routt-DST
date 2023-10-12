// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/app-list/CardPageWithSmallThumbnail.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"app-card-page-content" id\x3d"app-card-page-content" data-dojo-attach-point\x3d"appCardPageContent"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n'}});
define("dojo/_base/declare dojo/_base/html dojo/_base/array dojo/_base/lang dojo/on dojo/dom ./AppOperMenu dijit/_WidgetBase dijit/_TemplatedMixin jimu/utils dijit/_WidgetsInTemplateMixin dojo/text!./CardPageWithSmallThumbnail.html dojox/form/Uploader dojo/NodeList-dom".split(" "),function(q,b,k,l,m,r,t,u,v,g,w,x){return q([u,v,w],{baseClass:"card-page-with-small-thumbnail",templateString:x,loading:null,folderUrl:null,appListWidget:null,_eventHandles:null,_appOperMenus:null,postMixInProperties:function(){this.inherited(arguments);
this.nls=this.appListWidget.nls;this.loading=this.appListWidget.loading;this.folderUrl=this.appListWidget.folderUrl},constructor:function(){this._eventHandles=[];this._appOperMenus=[]},startup:function(){this.inherited(arguments);b.setSelectable(this.domNode,!1)},refresh:function(a){this.createAppList(a)},cleanAppList:function(){b.empty(this.appCardPageContent);k.forEach(this._appOperMenus,function(a){a.destroy()});this._appOperMenus=[];k.forEach(this._eventHandles,function(a){a.remove()});this._eventHandles=
[]},createAppList:function(a){this.cleanAppList();k.forEach(a,function(e){this.createAppCard(e)},this)},createAppCard:function(a){var e=a.isTemplate?this.nls.preview:this.nls.launch,d=b.create("div",{"class":"app-card-box jimu-float-leading"},this.appCardPageContent);d=b.create("div",{"class":"card app-info-card"},d);var c=b.create("div",{"class":"app-title-part"},d);b.create("div",{"class":"app-type-div "+("HTML"===a.appType?"app-type-2d":"app-type-3d")},c);c=b.create("table",{"class":"app-title-table"},
c);c=b.create("tbody",{"class":"app-title-table-body"},c);c=b.create("tr",{"class":"app-title-table-tr"},c);var y=b.create("td",{"class":"app-thumbnail-td"},c);b.create("a",{"class":"app-thumbnail",style:"background-image: url("+a.thumbnail+"?date\x3d"+this.appListWidget.getRefreshImageFlag()+")",href:a.appUrl,target:"_blank",title:e},y);c=b.create("td",{"class":"app-title-td"},c);b.create("div",{"class":"app-title-div",innerHTML:g.sanitizeHTML(a.name),title:a.name},c);b.create("div",{"class":"app-time-div",
innerHTML:g.sanitizeHTML(this.appListWidget._getLocaleDateTime(a.lastUpdated))},c);b.create("div",{"class":"app-creator-div",innerHTML:g.sanitizeHTML(a.creator)},c);c=b.create("div",{"class":"app-desc-box"},d);c=b.create("div",{"class":"desc-wrap jimu-clamp-wrap"},c);b.create("div",{"class":"app-desc-part clamp "+(a.description?"":"place-holder-class"),innerHTML:a.description?g.sanitizeHTML(a.description):this.nls.defaultDesc,title:a.description},c);d=b.create("div",{"class":"app-operation-part"},
d);b.create("div",{innerHTML:'\x3ca href\x3d"'+g.sanitizeHTML(a.appUrl)+'" target\x3d"_blank"\x3e\x3c/a\x3e',"class":"app-operation launch-operation jimu-float-leading",title:e},d);a.isTemplate||b.create("div",{innerHTML:'\x3ca href\x3d"'+g.sanitizeHTML(a.downloadUrl)+'" target\x3d"downloadTargetFrame"\x3e\x3c/a\x3e',"class":"app-operation download-operation jimu-float-leading",title:this.nls.download},d);e=b.create("div",{"class":"app-operation edit-operation jimu-float-leading "+(a.isPredefined?
"disable":""),title:a.isTemplate?this.nls.configTemplate:this.nls.configApp},d);var h=b.create("div",{"class":"app-operation more-operation jimu-float-trailing "+(a.isPredefined?"disable":"")},d),f=(new t({app:a,posNode:h,appListWidget:this.appListWidget,nls:this.nls,isTemplate:a.isTemplate,appContentNode:this.appCardPageContent,height:a.isTemplate?a.isPredefined?45:162:122,offset:{top:44,left:-10,right:-10}})).placeAt(h);this._appOperMenus.push(f);c=m(h,"click",l.hitch(this,function(n){f.isShow?
(f.hide(),b.removeClass(h,"item-more-selected")):(k.forEach(this._appOperMenus,function(p){p.isShow&&(p.hide(),b.removeClass(p.posNode,"item-more-selected"))}),f.show(),b.addClass(h,"item-more-selected"));n.itemId=a.id}));this._eventHandles.push(c);c=m(e,"click",l.hitch(this,function(){this.appListWidget.pluginManager.getPluginByName("startup").switchToAppConfig(a)}));this._eventHandles.push(c);a.isTemplate&&(e=b.create("div",{"class":"app-operation create-app-from-item-operation jimu-float-leading",
title:this.nls.createApp},d),c=m(e,"click",l.hitch(this,function(){f._onCreateAppFromTempalteClick()})),this._eventHandles.push(c));c=m(r.byId("content-box"),"click",l.hitch(this,function(n){n.itemId!==a.id&&(b.removeClass(f.posNode,"item-more-selected"),f.hide())}));this._eventHandles.push(c)}})});