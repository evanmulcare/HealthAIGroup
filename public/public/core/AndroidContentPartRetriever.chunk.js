/** Notice * This file contains works from many authors under various (but compatible) licenses. Please see core.txt for more information. **/
(function(){(window.wpCoreControlsBundle=window.wpCoreControlsBundle||[]).push([[1],{521:function(wa,ta,n){n.r(ta);var pa=n(0),oa=n(292);wa=n(517);n=n(438);var na=window,ja=function(ka){function fa(y,x){var f=ka.call(this,y,x)||this;f.url=y;f.range=x;f.request=new XMLHttpRequest;f.request.open("GET",f.url,!0);na.Uint8Array&&(f.request.responseType="arraybuffer");f.request.setRequestHeader("X-Requested-With","XMLHttpRequest");f.status=oa.a.NOT_STARTED;return f}Object(pa.c)(fa,ka);return fa}(wa.ByteRangeRequest);
wa=function(ka){function fa(y,x,f,e){y=ka.call(this,y,x,f,e)||this;y.EB=ja;return y}Object(pa.c)(fa,ka);fa.prototype.Wy=function(y,x){return y+"/bytes="+x.start+","+(x.stop?x.stop:"")};return fa}(wa["default"]);Object(n.a)(wa);Object(n.b)(wa);ta["default"]=wa}}]);}).call(this || window)