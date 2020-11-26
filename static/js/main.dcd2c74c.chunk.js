(this["webpackJsonpreact-posenet-pull-up"]=this["webpackJsonpreact-posenet-pull-up"]||[]).push([[0],{115:function(e,t,n){e.exports=n(229)},120:function(e,t,n){},127:function(e,t){},129:function(e,t){},159:function(e,t){},160:function(e,t){},218:function(e,t){},220:function(e,t){},229:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(106),i=n.n(c),u=(n(120),n(9)),o=(n(121),n(107)),l=n.n(o),s={architecture:"MobileNetV1"},f={decodingMethod:"single-person"},m=n(108),v=n.n(m),p=n(231),h=n(230),d=n(110),b=function(e){var t=e.label,n=e.value,r=e.onChange;return a.a.createElement(p.a,null,a.a.createElement(p.a.Group,{as:h.a,className:"d-flex"},a.a.createElement(p.a.Label,{column:!0,sm:"2"},t),a.a.createElement(d.a,{sm:"10"},a.a.createElement(p.a.Control,{type:"text",placeholder:"Enter ".concat(t),value:n,onChange:r}))))};var g=function(e){var t=e.label,n=function(e){var t=Object(r.useState)(localStorage.getItem(e)||""),n=Object(u.a)(t,2),a=n[0],c=n[1];return[a,function(t){c(t.target.value),localStorage.setItem(e,t.target.value)}]}(v()(t,{lower:!0})),c=Object(u.a)(n,2),i=c[0],o=c[1];return a.a.createElement(b,{label:t,value:i,onChange:o})},O=n(35),j=n.n(O),E=n(111),y=n(232);function w(){return(w=Object(E.a)(j.a.mark((function e(t){var n,r,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.setCaptureInput,r=t.videoRef,e.prev=1,e.next=4,navigator.mediaDevices.getDisplayMedia();case 4:a=e.sent,(c=r.current).srcObject=a,c.onloadedmetadata=function(){c.play(),n(c)},e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error("Error: ".concat(e.t0));case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))).apply(this,arguments)}var C,k=function(e){var t=e.setCaptureInput,n=e.width,c=void 0===n?600:n,i=e.height,u=void 0===i?500:i,o=Object(r.useRef)();return a.a.createElement(a.a.Fragment,null,a.a.createElement("video",{playsInline:!0,ref:o,style:{width:"0",height:"0"},width:c,height:u}),a.a.createElement("div",null,a.a.createElement(y.a,{onClick:function(){return function(e){return w.apply(this,arguments)}({setCaptureInput:t,videoRef:o})}},"Use screen display")))},I=n(112),x=n.n(I),R=(n(113),localStorage.getItem("influxdb-url")),S={writePoints:function(){}};try{S=new x.a.InfluxDB(R)}catch(B){console.error(B)}function M(e,t){try{S.writePoints([{fields:{count:t},measurement:e}])}catch(n){console.error(n)}}var D=function(e){var t=e.count,n=void 0===t?{}:t,c=Object.values(n).every((function(e){return 0===e})),i=Object(r.useState)(new Date),o=Object(u.a)(i,2),l=o[0],s=o[1],f=Object(r.useState)(),m=Object(u.a)(f,2),v=m[0],p=m[1];return Object(r.useEffect)((function(){s(new Date),M("elapsed",1)}),[c]),Object(r.useEffect)((function(){clearInterval(C),C=setInterval((function(){var e=Math.round((new Date-l)/1e3);p(e)}),1e3)}),[l]),a.a.createElement("div",null,Object.keys(n).map((function(e){return a.a.createElement("h1",{key:e},e.replace("use","").replace(/[A-Z]/g,(function(e){return" ".concat(e.toLowerCase())})),": ",n[e])})),a.a.createElement("h1",null,"elapsed: ",v))};function _(e,t){return"increment"===t?(M("squat_notification",e+1),e+1):e>1?(M("squat",e),0):0}function H(e,t){return"increment"===t?(M("pull_up_notification",e+1),e+1):e>1?(M("pull_up",e),0):0}function W(e,t){return"increment"===t?(M("leg_raise_notification",e+1),e+1):e>1?(M("leg_raise",e),0):0}function N(){var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=Object(r.useReducer)(H,0),n=Object(u.a)(t,2),a=n[0],c=n[1],i=Object(r.useRef)(0),o=Object(r.useCallback)((function(t){var n=t.leftShoulder,r=t.rightShoulder,a=t.leftElbow,u=t.rightElbow,o=t.leftWrist,l=t.rightWrist,s=t.leftHip,f=t.rightHip,m=a||u,v=n||r;if(m&&v)if(v.y>m.y)i.current=Math.max(i.current,m.y);else{if(i.current>m.y+e)return c("increment"),void(i.current=0);var p=s||f,h=o||l;if(p&&h)h.y+e>p.y&&c("reset")}}),[e]);return[a,o]}(),t=Object(u.a)(e,2),n=t[0],a=t[1],c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:220,t=Object(r.useReducer)(W,0),n=Object(u.a)(t,2),a=n[0],c=n[1],i=Object(r.useRef)(0),o=Object(r.useCallback)((function(t){var n=t.leftWrist,r=t.rightWrist,a=t.leftAnkle,u=t.rightAnkle,o=t.leftShoulder,l=t.rightShoulder,s=t.leftHip,f=t.rightHip,m=a||u,v=o||l;if(m&&v)if(Math.abs(m.y-v.y)<e)i.current+=1;else{if(i.current>10)return c("increment"),void(i.current=0);var p=s||f,h=n||r;if(p&&h)h.y+e/10>p.y&&c("reset")}}),[e]);return[a,o]}(),i=Object(u.a)(c,2),o=i[0],l=i[1],s=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,t=Object(r.useReducer)(_,0),n=Object(u.a)(t,2),a=n[0],c=n[1],i=Object(r.useRef)(0),o=Object(r.useCallback)((function(t){var n=t.leftEar,r=t.rightEar,a=t.leftKnee,u=t.rightKnee,o=t.leftHip,l=t.rightHip,s=o,f=a;if(s&&f||(s=l,f=u),s&&f)if(Math.abs(s.x-f.x)>e)i.current+=1;else{if(i.current>5)return c("increment"),void(i.current=0);n&&r&&c("reset")}}),[e]);return[a,o]}(),f=Object(u.a)(s,2),m=f[0],v=f[1];return[{squatCount:m,pullUpCount:n,legRaiseCount:o},Object(r.useCallback)((function(e){if(1===e.length){var t=e[0].keypoints.reduce((function(e,t){var n=t.part,r=t.position;return e[n]=r,e}),{});a(t),l(t),v(t)}}),[l,a,v])]}var A=function(){var e,t=Object(r.useState)(),n=Object(u.a)(t,2),c=n[0],i=n[1],o=(e=c,Object(r.useMemo)((function(){var t=localStorage.getItem("cam-url");if(t){var n=new Image;return n.src=t,n.crossOrigin="",n}if(e)return e}),[e])),m=N(),v=Object(u.a)(m,2),p=v[0],h=v[1];return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"d-flex"},a.a.createElement(l.a,{input:o,className:"min-vh-100",facingMode:"environment",frameRate:15,onEstimate:h,minPartConfidence:.75,modelConfig:s,inferenceConfig:f}),a.a.createElement(D,{count:p})),a.a.createElement(k,{setCaptureInput:i}),a.a.createElement("div",{className:"my-3"}),a.a.createElement(g,{label:"InfluxDB URL"}),a.a.createElement(g,{label:"CAM URL"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(A,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[115,1,2]]]);
//# sourceMappingURL=main.dcd2c74c.chunk.js.map