// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/widget-config/GroupSettingPage.html":'\x3cdiv class\x3d"group-setting-page"\x3e\r\n  \x3cdiv class\x3d"section common-setting" data-dojo-attach-point\x3d"commonSettingNode"\x3e\r\n    \x3cdiv class\x3d"basic"\x3e\r\n      \x3cdiv class\x3d"icon jimu-float-leading"\x3e\r\n        \x3cimg class\x3d"real-icon"  data-dojo-attach-point\x3d"iconNode"\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"right jimu-float-trailing jimu-leading-margin1"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-attach-point\x3d"labelNode" placeholder\x3d"${nls.groupLabel}" required\x3d"true" class\x3d"group-setting-input"\x3e\r\n        \x3cdiv class\x3d"right-foot" data-dojo-attach-point\x3d"rightFooterNode"\x3e\r\n          \x3cdiv class\x3d"image-container"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"imageChooserPlaceholder"\x3e\x3c/div\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dojo/topic jimu/utils dojo/string dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin jimu/dijit/ImageChooser dojo/text!./GroupSettingPage.html".split(" "),function(f,g,c,h,k,d,l,m,n,p,a,q){return f([m,n,p],{templateString:q,baseClass:"group-setting-page",startup:function(){this.initCommonAttr()},initCommonAttr:function(){var b=d.processUrlInAppConfig(this.setting.icon);c.setAttr(this.iconNode,"src",b);this.labelNode.set("value",
this.setting.label);this.imageChooser=new a({goldenWidth:24,goldenHeight:24,format:[a.GIF,a.JPEG,a.PNG],label:this.nls.changeGroupIcon},this.imageChooserPlaceholder);c.addClass(this.imageChooser.domNode,"jimu-float-leading");this.imageChooser.enableChooseImage();this.own(h(this.imageChooser,"imageChange",g.hitch(this,function(e){this.iconNode.src=e;this.setting.icon=e})))},_checkLabelExist:function(){var b=this.labelNode.get("value");return""===l.trim(b)?this.nls.labelRequired:""},onOk:function(){if(this._checkLabelExist())return!1;
this.imageChooser.imageData&&(this.setting.icon=this.imageChooser.imageData);this.setting.label=d.stripHTML(this.labelNode.get("value"));k.publish("groupChanged",this.setting);this.popup.close()},onCancel:function(){}})});