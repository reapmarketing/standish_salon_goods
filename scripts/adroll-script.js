// Hack to prevent errors, may break things
// adroll_adv_id = ''; adroll_pix_id = '';
// I have no idea who or what this tracking code is, but it throws errors and stops execution without the above hacks

var adroll_adv_id = "QKPAWPSEO5ETRJDJ2LA5OR",
	adroll_pix_id = "XAFMSLOA7ZHDZH7A75RILZ";
(function () {
var oldonload = window.onload;
window.onload = function(){
   __adroll_loaded=true;
   var scr = document.createElement("script");
   var host = (("https:" == document.location.protocol) ? "https://s.adroll.com": "http://a.adroll.com");
   scr.setAttribute('async', 'true');
   scr.type = "text/javascript";
   scr.src = host + "/j/roundtrip.js";
   ((document.getElementsByTagName('head') || [null])[0] ||
	document.getElementsByTagName('script')[0].parentNode).appendChild(scr);
   if(oldonload){oldonload()}};
}());

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function (con) {
	'use strict';
	var prop, method;
	var empty = {};
	var dummy = function() {};
	var properties = 'memory'.split(',');
	var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
		 'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
		 'time,timeEnd,trace,warn').split(',');
	while (prop = properties.pop()) con[prop] = con[prop] || empty;
	while (method = methods.pop()) con[method] = con[method] || dummy;
})(window.console = window.console || {});
// End of Console-polyfill

// Begin Inspectlet Embed Code
window.__insp = window.__insp || [];
__insp.push(['wid', 1419991297]);
(function() {
	function __ldinsp(){var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https': 'http') + '://cdn.inspectlet.com/inspectlet.js'; var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x); }
	if (window.attachEvent){
		window.attachEvent('onload', __ldinsp);
	}else{
		window.addEventListener('load', __ldinsp, false);
	}
})();
// End Inspectlet Embed Code