/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='/assets/templates/standish-responsive/images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "2.0.1",
   minimumCompatibleVersion: "2.0.0",
   build: "2.0.1.268",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'Standish-Icons',
            type:'image',
            rect:['6px','9px','30px','130px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"Standish-Icons.png",'0px','0px']
         },
         {
            id:'Standish-Icons-Looper',
            type:'image',
            rect:['6px','9px','30px','130px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"Standish-Icons.png",'0px','0px']
         },
         {
            id:'Affordable',
            type:'text',
            rect:['48px','27px','175px','11px','auto','auto'],
            text:"AFFORDABLE QUALITY",
            align:"left",
            font:['Palatino Linotype, Book Antigua, Palatino, serif',10,"rgba(0,0,0,0.66)","400","none","normal"]
         },
         {
            id:'SafeSecureCopy',
            type:'text',
            rect:['48px','5px','175px','11px','auto','auto'],
            opacity:0,
            text:"SAFE &amp; SECURE<br>",
            align:"left",
            font:['Palatino Linotype, Book Antigua, Palatino, serif',10,"rgba(0,0,0,0.66)","400","none","normal"]
         },
         {
            id:'FriendlyService',
            type:'text',
            rect:['48px','8px','175px','11px','auto','auto'],
            text:"FRIENDLY SERVICE",
            align:"left",
            font:['Palatino Linotype, Book Antigua, Palatino, serif',10,"rgba(0,0,0,0.66)","400","none","normal"]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_Standish-Icons-Looper}": [
            ["style", "left", '5px'],
            ["style", "top", '61px']
         ],
         "${_Standish-Icons}": [
            ["style", "left", '5px'],
            ["style", "top", '9px']
         ],
         "${_FriendlyService}": [
            ["style", "letter-spacing", '1px'],
            ["color", "color", 'rgba(0,0,0,0.6563)'],
            ["style", "font-weight", 'normal'],
            ["style", "left", '48px'],
            ["style", "font-size", '10px'],
            ["style", "top", '9px'],
            ["style", "opacity", '0'],
            ["style", "font-family", '\'Palatino Linotype\', \'Book Antigua\', Palatino, serif'],
            ["style", "word-spacing", '0px'],
            ["style", "text-decoration", 'none']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "width", '194px'],
            ["style", "height", '50px'],
            ["style", "overflow", 'hidden']
         ],
         "${_Affordable}": [
            ["style", "letter-spacing", '1px'],
            ["color", "color", 'rgba(0,0,0,0.6563)'],
            ["style", "font-weight", 'normal'],
            ["style", "left", '47px'],
            ["style", "font-size", '10px'],
            ["style", "top", '21px'],
            ["style", "opacity", '1'],
            ["style", "font-family", '\'Palatino Linotype\', \'Book Antigua\', Palatino, serif'],
            ["style", "word-spacing", '0px'],
            ["style", "text-decoration", 'none']
         ],
         "${_SafeSecureCopy}": [
            ["style", "letter-spacing", '1px'],
            ["color", "color", 'rgba(0,0,0,0.6563)'],
            ["style", "font-weight", 'normal'],
            ["style", "left", '48px'],
            ["style", "font-size", '10px'],
            ["style", "top", '5px'],
            ["style", "text-decoration", 'none'],
            ["style", "font-family", '\'Palatino Linotype\', \'Book Antigua\', Palatino, serif'],
            ["style", "word-spacing", '0px'],
            ["style", "opacity", '0']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 6000,
         autoPlay: true,
         timeline: [
            { id: "eid18", tween: [ "style", "${_SafeSecureCopy}", "opacity", '1', { fromValue: '0'}], position: 1750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid21", tween: [ "style", "${_SafeSecureCopy}", "opacity", '0.01', { fromValue: '1'}], position: 3750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid50", tween: [ "style", "${_Standish-Icons-Looper}", "top", '9px', { fromValue: '61px'}], position: 5750, duration: 250, easing: "easeInOutBack" },
            { id: "eid24", tween: [ "style", "${_FriendlyService}", "top", '22px', { fromValue: '9px'}], position: 3750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid40", tween: [ "style", "${_FriendlyService}", "top", '53px', { fromValue: '22px'}], position: 5750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid5", tween: [ "style", "${_Standish-Icons}", "top", '-44px', { fromValue: '9px'}], position: 1750, duration: 250, easing: "easeInOutBack" },
            { id: "eid9", tween: [ "style", "${_Standish-Icons}", "top", '-92px', { fromValue: '-44px'}], position: 3750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid49", tween: [ "style", "${_Standish-Icons}", "top", '-145px', { fromValue: '-92px'}], position: 5750, duration: 250, easing: "easeInOutBack" },
            { id: "eid19", tween: [ "style", "${_SafeSecureCopy}", "top", '21px', { fromValue: '5px'}], position: 1750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid20", tween: [ "style", "${_SafeSecureCopy}", "top", '50px', { fromValue: '21px'}], position: 3750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid26", tween: [ "style", "${_FriendlyService}", "opacity", '1', { fromValue: '0'}], position: 3750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid42", tween: [ "style", "${_FriendlyService}", "opacity", '1', { fromValue: '1'}], position: 5750, duration: 0, easing: "easeInOutQuart" },
            { id: "eid43", tween: [ "style", "${_FriendlyService}", "opacity", '1', { fromValue: '1'}], position: 6000, duration: 0, easing: "easeInOutQuart" },
            { id: "eid15", tween: [ "style", "${_Affordable}", "top", '50px', { fromValue: '21px'}], position: 1750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid33", tween: [ "style", "${_Affordable}", "top", '7px', { fromValue: '50px'}], position: 2000, duration: 3500, easing: "easeInOutQuart" },
            { id: "eid37", tween: [ "style", "${_Affordable}", "top", '4px', { fromValue: '7px'}], position: 5500, duration: 250, easing: "easeInOutQuart" },
            { id: "eid38", tween: [ "style", "${_Affordable}", "top", '21px', { fromValue: '4px'}], position: 5750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid14", tween: [ "style", "${_Affordable}", "opacity", '0', { fromValue: '1'}], position: 1750, duration: 250, easing: "easeInOutQuart" },
            { id: "eid17", tween: [ "style", "${_Affordable}", "opacity", '1', { fromValue: '0'}], position: 5750, duration: 250, easing: "easeInOutQuart" }         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "taglines");
