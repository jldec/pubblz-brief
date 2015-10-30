(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=function(e,t){function a(){e.on("nav",r),e.on("loaded",r),e.on("updatedText",o)}function n(){e.off("nav",r),e.off("loaded",r),e.off("updatedText",o)}function r(a,n,r,o){function p(){var o=e.layoutTemplate(h);c.html(e.renderLayout(h)),c.attr("data-render-layout",o),f("jqueryview updateLayout",a,n,r),e.emit("update-view",a,n,r,t,c)}function v(){var o=i("[data-render-page]");return o.length?(o.html(e.renderPage(h)),o.attr("data-render-page",h._href),f("jqueryview updatePage:",a,n,r),void e.emit("update-view",a,n,r,t,o)):e.emit("notify","Oops, jqueryview cannot update page "+a)}function m(t,a){if(t&&t.fixlayout)return!0;if(l(t)!==l(a))return!0;var n=c.attr("data-render-layout")||"main-layout",r=e.layoutTemplate(a);return r!==n}var y=o||!a;a=a||location.pathname,n=n||y&&location.search||"",r=r||y&&location.hash||"";var h=e.findPage(a);if(!h)return e.emit("notify","Oops, jqueryview cannot find new page object "+a);var s=d.unPrefix(location.pathname,u.staticRoot),g=e.findPage(s);return g?y||h!==g?(e.req={query:n?require("querystring").parse(n.slice(1)):{}},c.length&&(y||m(g,h))?void p():void v()):void 0:e.emit("notify","Oops, jqueryview cannot find current page object "+s)}function o(a){var n=e.fragment$[a];if(!n)return e.emit("notify","Oops, jqueryview cannot find fragment: "+a);var r=i('[data-render-html="'+a+'"]');return r.length?(r.html(e.renderHtml(n)),f("jqueryview updateHtml",location.pathname,location.search,location.hash),void e.emit("update-view",location.pathname,location.search,location.hash,t,r)):e.emit("notify","Oops, jqueryview cannot update html for fragment: "+a)}var i=t.$,u=e.opts,d=e.util,l=e.handlebars.pageLang,f=u.log,c=i("[data-render-layout]"),p={start:a,stop:n};return p};
},{"querystring":9}],2:[function(require,module,exports){
(function (process){
"use strict";function page(e,t){if("function"==typeof e)return page("*",e);if("function"==typeof t)for(var n=new Route(e),a=1;a<arguments.length;++a)page.callbacks.push(n.middleware(arguments[a]));else"string"==typeof e?page["string"==typeof t?"redirect":"show"](e,t):page.start(e)}function unhandled(e){if(!e.handled){var t;t=hashbang?base+location.hash.replace("#!",""):location.pathname+location.search,t!==e.canonicalPath&&(page.stop(),e.handled=!1,location.href=e.canonicalPath)}}function decodeURLEncodedURIComponent(e){return"string"!=typeof e?e:decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e}function Context(e,t){"/"===e[0]&&0!==e.indexOf(base)&&(e=base+(hashbang?"#!":"")+e);var n=e.indexOf("?");if(this.canonicalPath=e,this.path=e.replace(base,"")||"/",hashbang&&(this.path=this.path.replace("#!","")||"/"),this.title=document.title,this.state=t||{},this.state.path=e,this.querystring=~n?decodeURLEncodedURIComponent(e.slice(n+1)):"",this.pathname=decodeURLEncodedURIComponent(~n?e.slice(0,n):e),this.params={},this.hash="",!hashbang){if(!~this.path.indexOf("#"))return;var a=this.path.split("#");this.path=a[0],this.hash=decodeURLEncodedURIComponent(a[1])||"",this.querystring=this.querystring.split("#")[0]}}function Route(e,t){t=t||{},this.path="*"===e?"(.*)":e,this.method="GET",this.regexp=pathtoRegexp(this.path,this.keys=[],t.sensitive,t.strict)}function onclick(e){if(1===which(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!==t.nodeName;)t=t.parentNode;if(t&&"A"===t.nodeName&&!t.hasAttribute("download")&&"external"!==t.getAttribute("rel")){var n=t.getAttribute("href");if((hashbang||t.pathname!==location.pathname||!t.hash&&"#"!==n)&&!(n&&n.indexOf("mailto:")>-1)&&!t.target&&sameOrigin(t.href)){var a=t.pathname+t.search+(t.hash||"");"undefined"!=typeof process&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var o=a;0===a.indexOf(base)&&(a=a.substr(base.length)),hashbang&&(a=a.replace("#!","")),base&&o===a||(e.preventDefault(),page.show(o))}}}}function which(e){return e=e||window.event,null===e.which?e.button:e.which}function sameOrigin(e){var t=location.protocol+"//"+location.hostname;return location.port&&(t+=":"+location.port),e&&0===e.indexOf(t)}var pathtoRegexp=require("path-to-regexp");module.exports=page;var clickEvent="undefined"!=typeof document&&document.ontouchstart?"touchstart":"click",location="undefined"!=typeof window&&(window.history.location||window.location),dispatch=!0,decodeURLComponents=!0,base="",running,hashbang=!1,prevContext;page.callbacks=[],page.exits=[],page.current="",page.len=0,page.base=function(e){return 0===arguments.length?base:void(base=e)},page.start=function(e){if(e=e||{},!running&&(running=!0,!1===e.dispatch&&(dispatch=!1),!1===e.decodeURLComponents&&(decodeURLComponents=!1),!1!==e.popstate&&window.addEventListener("popstate",onpopstate,!1),!1!==e.click&&document.addEventListener(clickEvent,onclick,!1),!0===e.hashbang&&(hashbang=!0),dispatch)){var t=hashbang&&~location.hash.indexOf("#!")?location.hash.substr(2)+location.search:location.pathname+location.search+location.hash;page.replace(t,null,!0,dispatch)}},page.stop=function(){running&&(page.current="",page.len=0,running=!1,document.removeEventListener(clickEvent,onclick,!1),window.removeEventListener("popstate",onpopstate,!1))},page.show=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,!1!==n&&page.dispatch(o),!1!==o.handled&&!1!==a&&o.pushState(),o},page.back=function(e,t){page.len>0?(history.back(),page.len--):e?setTimeout(function(){page.show(e,t)}):setTimeout(function(){page.show(base,t)})},page.redirect=function(e,t){"string"==typeof e&&"string"==typeof t&&page(e,function(e){setTimeout(function(){page.replace(t)},0)}),"string"==typeof e&&"undefined"==typeof t&&setTimeout(function(){page.replace(e)},0)},page.replace=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,o.init=n,o.save(),!1!==a&&page.dispatch(o),o},page.dispatch=function(e){function t(){var e=page.exits[i++];return e?void e(a,t):n()}function n(){var t=page.callbacks[o++];return e.path!==page.current?void(e.handled=!1):t?void t(e,n):unhandled(e)}var a=prevContext,o=0,i=0;prevContext=e,a?t():n()},page.exit=function(e,t){if("function"==typeof e)return page.exit("*",e);for(var n=new Route(e),a=1;a<arguments.length;++a)page.exits.push(n.middleware(arguments[a]))},page.Context=Context,Context.prototype.pushState=function(){page.len++,history.pushState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},Context.prototype.save=function(){history.replaceState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},page.Route=Route,Route.prototype.middleware=function(e){var t=this;return function(n,a){return t.match(n.path,n.params)?e(n,a):void a()}},Route.prototype.match=function(e,t){var n=this.keys,a=e.indexOf("?"),o=~a?e.slice(0,a):e,i=this.regexp.exec(decodeURIComponent(o));if(!i)return!1;for(var s=1,r=i.length;r>s;++s){var h=n[s-1],p=decodeURLEncodedURIComponent(i[s]);void 0===p&&hasOwnProperty.call(t,h.name)||(t[h.name]=p)}return!0};var onpopstate=function(){var e=!1;if("undefined"!=typeof window)return"complete"===document.readyState?e=!0:window.addEventListener("load",function(){setTimeout(function(){e=!0},0)}),function(t){if(e)if(t.state){var n=t.state.path;page.replace(n,t.state)}else page.show(location.pathname+location.hash,void 0,void 0,!1)}}();page.sameOrigin=sameOrigin;
}).call(this,require('_process'))
},{"_process":6,"path-to-regexp":3}],3:[function(require,module,exports){
function parse(e){for(var t,r=[],n=0,o=0,p="";null!=(t=PATH_REGEXP.exec(e));){var a=t[0],i=t[1],s=t.index;if(p+=e.slice(o,s),o=s+a.length,i)p+=i[1];else{p&&(r.push(p),p="");var u=t[2],c=t[3],l=t[4],f=t[5],g=t[6],x=t[7],h="+"===g||"*"===g,m="?"===g||"*"===g,y=u||"/",T=l||f||(x?".*":"[^"+y+"]+?");r.push({name:c||n++,prefix:u||"",delimiter:y,optional:m,repeat:h,pattern:escapeGroup(T)})}}return o<e.length&&(p+=e.substr(o)),p&&r.push(p),r}function compile(e){return tokensToFunction(parse(e))}function tokensToFunction(e){for(var t=new Array(e.length),r=0;r<e.length;r++)"object"==typeof e[r]&&(t[r]=new RegExp("^"+e[r].pattern+"$"));return function(r){for(var n="",o=r||{},p=0;p<e.length;p++){var a=e[p];if("string"!=typeof a){var i,s=o[a.name];if(null==s){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to be defined')}if(isarray(s)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but received "'+s+'"');if(0===s.length){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var u=0;u<s.length;u++){if(i=encodeURIComponent(s[u]),!t[p].test(i))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'", but received "'+i+'"');n+=(0===u?a.prefix:a.delimiter)+i}}else{if(i=encodeURIComponent(s),!t[p].test(i))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but received "'+i+'"');n+=a.prefix+i}}else n+=a}return n}}function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function escapeGroup(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function attachKeys(e,t){return e.keys=t,e}function flags(e){return e.sensitive?"":"i"}function regexpToRegexp(e,t){var r=e.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)t.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return attachKeys(e,t)}function arrayToRegexp(e,t,r){for(var n=[],o=0;o<e.length;o++)n.push(pathToRegexp(e[o],t,r).source);var p=new RegExp("(?:"+n.join("|")+")",flags(r));return attachKeys(p,t)}function stringToRegexp(e,t,r){for(var n=parse(e),o=tokensToRegExp(n,r),p=0;p<n.length;p++)"string"!=typeof n[p]&&t.push(n[p]);return attachKeys(o,t)}function tokensToRegExp(e,t){t=t||{};for(var r=t.strict,n=t.end!==!1,o="",p=e[e.length-1],a="string"==typeof p&&/\/$/.test(p),i=0;i<e.length;i++){var s=e[i];if("string"==typeof s)o+=escapeString(s);else{var u=escapeString(s.prefix),c=s.pattern;s.repeat&&(c+="(?:"+u+c+")*"),c=s.optional?u?"(?:"+u+"("+c+"))?":"("+c+")?":u+"("+c+")",o+=c}}return r||(o=(a?o.slice(0,-2):o)+"(?:\\/(?=$))?"),o+=n?"$":r&&a?"":"(?=\\/|$)",new RegExp("^"+o,flags(t))}function pathToRegexp(e,t,r){return t=t||[],isarray(t)?r||(r={}):(r=t,t=[]),e instanceof RegExp?regexpToRegexp(e,t,r):isarray(e)?arrayToRegexp(e,t,r):stringToRegexp(e,t,r)}var isarray=require("isarray");module.exports=pathToRegexp,module.exports.parse=parse,module.exports.compile=compile,module.exports.tokensToFunction=tokensToFunction,module.exports.tokensToRegExp=tokensToRegExp;var PATH_REGEXP=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");
},{"isarray":4}],4:[function(require,module,exports){
module.exports=Array.isArray||function(r){return"[object Array]"==Object.prototype.toString.call(r)};
},{}],5:[function(require,module,exports){
$(function(){var r=window.parent.generator;if(!r)throw new Error("cannot bind preview to pub-generator");var e=r.util,n=r.opts,a=n.log,i=n.appUrl;window.generator=r,window.onGenerator&&window.onGenerator(r);var o=require("./jqueryview")(r,window);o.start();var t=window.parent.location.search?require("querystring").parse(window.parent.location.search.slice(1)).page:"";window.pager=require("page"),window.pager("*",function(o){var w=o.path;w=e.unPrefix(w,i),w=e.unPrefix(w,n.staticRoot),w=w.split("?")[0],a("pager nav %s%s%s%s",w,o.querystring?"?"+o.querystring:"",o.hash?"#"+o.hash:"",t?" (forceReload)":""),r.emit("nav",w,o.querystring?"?"+o.querystring:"",o.hash?"#"+o.hash:"",!!t),t=void 0}),window.pager({dispatch:!1}),t&&pager.show(t)});
},{"./jqueryview":1,"page":2,"querystring":9}],6:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
},{}],7:[function(require,module,exports){
"use strict";function hasOwnProperty(r,e){return Object.prototype.hasOwnProperty.call(r,e)}module.exports=function(r,e,t,n){e=e||"&",t=t||"=";var o={};if("string"!=typeof r||0===r.length)return o;var a=/\+/g;r=r.split(e);var s=1e3;n&&"number"==typeof n.maxKeys&&(s=n.maxKeys);var p=r.length;s>0&&p>s&&(p=s);for(var y=0;p>y;++y){var u,c,i,l,f=r[y].replace(a,"%20"),v=f.indexOf(t);v>=0?(u=f.substr(0,v),c=f.substr(v+1)):(u=f,c=""),i=decodeURIComponent(u),l=decodeURIComponent(c),hasOwnProperty(o,i)?isArray(o[i])?o[i].push(l):o[i]=[o[i],l]:o[i]=l}return o};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)};
},{}],8:[function(require,module,exports){
"use strict";function map(r,e){if(r.map)return r.map(e);for(var t=[],n=0;n<r.length;n++)t.push(e(r[n],n));return t}var stringifyPrimitive=function(r){switch(typeof r){case"string":return r;case"boolean":return r?"true":"false";case"number":return isFinite(r)?r:"";default:return""}};module.exports=function(r,e,t,n){return e=e||"&",t=t||"=",null===r&&(r=void 0),"object"==typeof r?map(objectKeys(r),function(n){var i=encodeURIComponent(stringifyPrimitive(n))+t;return isArray(r[n])?map(r[n],function(r){return i+encodeURIComponent(stringifyPrimitive(r))}).join(e):i+encodeURIComponent(stringifyPrimitive(r[n]))}).join(e):n?encodeURIComponent(stringifyPrimitive(n))+t+encodeURIComponent(stringifyPrimitive(r)):""};var isArray=Array.isArray||function(r){return"[object Array]"===Object.prototype.toString.call(r)},objectKeys=Object.keys||function(r){var e=[];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&e.push(t);return e};
},{}],9:[function(require,module,exports){
"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode");
},{"./decode":7,"./encode":8}]},{},[5]);
