(()=>{"use strict";var e="2.4.5";class t{constructor(){this.events={}}on(e,t){return this.subscribe(e,t),this}emit(e,t){return this.getListeners(e).forEach((e=>e.call(null,t))),this}getListeners(e){return this.events[e]||[]}subscribe(e,t){var s=[...this.getListeners(e),t];return this.events[e]=s,this}off(e,t){var s=this.getListeners(e).filter((e=>e!==t));return this.events[e]=s,this}offAll(e){return delete this.events[e],this}}class s extends t{constructor(e){super(),this.key="GA: "+e,this.memory=new Set}getAll(){return Array.from(this.memory)}newError(e){var t=this.decorate(e,"error");return this.memory.add(t),this.emit("ERROR",t),new Error(t.message)}log(e){var t=this.decorate(e,"log");this.memory.add(t),this.emit("LOG",t)}debug(e){var t=this.decorate(e,"debug");this.memory.add(t),this.emit("DEBUG",t)}error(e){var t=this.decorate(e,"error");this.memory.add(t),this.stderr(t.message),this.emit("ERROR",t)}stderr(e){console.error(e)}decorate(e,t){return{type:t,message:this.key+": "+e,rawMessage:e,timestamp:Date.now()}}}var i,r,n,o,a=new s("html-utils"),l=e=>{var t=document.createElement("template");if(t.innerHTML=e.trim(),!t.content.firstElementChild)throw a.newError("createElement('"+e+"'): child is null");return t.content.firstElementChild},h=(e,t)=>{var s=(t||document).querySelector(e);if(s)return s;throw a.newError("find: nothing found using selector: "+e)},c="ga-uc-search";class d extends t{constructor(){super(),this.render()}render(){this.node=l('<input id="ga-uc-search" class="_1rqarav0" placeholder="Wyszukaj..." type="text">'),this.node.addEventListener("input",(()=>this.emit("INPUT",this.getValue())))}getValue(){return this.node.value}focus(){this.node.focus()}getNode(){return this.node}}!function(e){e[e.common=0]="common",e[e.unique=1]="unique",e[e.heroic=2]="heroic",e[e.legendary=3]="legendary"}(i||(i={})),function(e){e[e.common=0]="common",e[e.elite=1]="elite",e[e.elite2=2]="elite2",e[e.elite3=3]="elite3",e[e.hero=4]="hero",e[e.titan=5]="titan",e[e.colossus=6]="colossus"}(r||(r={})),function(e){e.elite="elite",e.elite2="elite2",e.hero="hero",e.titan="titan",e.colossus="colossus",e.event="event",e.other="other"}(n||(n={})),function(e){e.elite="Elity",e.elite2="Elity II",e.hero="Herosi",e.titan="Tytani",e.colossus="Kolosi",e.event="Eventowe",e.other="Inne"}(o||(o={}));var{assign:u,entries:g}=Object,v=g,m=(Array.isArray,Number.isNaN,e=>typeof e),p=e=>"undefined"!==m(e),f=e=>"object"===m(e)&&!!e,w=e=>("0"+e).slice(-2),y=e=>f(e)?new Map(v(e)):new Map,b=()=>{var{map:e,g:t,_g:s,Engine:i}=window;return p(s)&&p(t)&&p(e)&&!p(i)},E=e=>{if("string"!=typeof e)throw new Error("item stats must be of type string");return e.match(";unique")||e.match("unique;")?i.unique:e.match(";heroic")||e.match("heroic;")?i.heroic:e.match(";legendary")||e.match("legendary;")?i.legendary:i.common},L=(e,t)=>4===e.type?r.common:e.wt>99?5===(null==t?void 0:t.mode)?r.colossus:r.titan:e.wt>79?r.hero:e.wt>29||e.wt>19?r.elite2:e.wt>9?r.elite:r.common,C=(e,t)=>{var s=e.icon.match(/([a-zA-Z0-9-_]{1,10}\/[a-zA-Z0-9_-]{1,50}\.gif)$/);return{name:e.nick,id:Number.parseInt(e.id),icon:s?s[0]:"",lvl:e.lvl,rank:L(e,t),x:e.x,y:e.y}},S=e=>({name:e.name,mode:e.mode}),I=()=>{var{Engine:e,map:t}=window;return b()?S(t):S(e.map.d)},R=e=>{var{g:t,Engine:s}=window;if(!e)return null;if(b()){var i,r=null==t||null==(i=t.npc)?void 0:i[e];return r?C(r,I()):null}var n=s.npcs.getById(Number(e));return n?C(n.d,I()):null},{location:T}=window,B=()=>T.host.split(".")[0],A=()=>{var e,t,{hero:s,Engine:i}=window;return b()?null==s?void 0:s.account:null==i||null==(e=i.hero)||null==(t=e.d)?void 0:t.account},N=e=>e>=r.elite,k=e=>{switch(e){case r.elite:return n.elite;case r.elite2:return n.elite2;case r.hero:return n.hero;case r.titan:return n.titan;case r.colossus:return n.colossus;default:return n.other}},O="bosses",j="item-names-from-battle-log",_=new s("universal-counter");function z(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,t);if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return"symbol"==typeof t?t:String(t)}class D{constructor(e){this.store={},this.logger=new s("LocalStorageService"),this.isLocalStorageAvailable=D.isLocalStorageAvailable(),this.mainKey=e,this.recreateStore()}set(e,t){var s=(e=>{switch(typeof e){case"string":case"number":case"boolean":return null;case"object":if(Array.isArray(e))return e.filter(Boolean).length===e.length?null:"array includes falsy values"}return"incorrect value type ("+e+", "+typeof e+")"})(t);s?this.logger.log("set("+e+"): "+s):(this.store[e]=t,this.save())}get(e){return this.store[e]||null}remove(e){var t=function(e,t){if(null==e)return{};var s,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)s=n[i],t.indexOf(s)>=0||(r[s]=e[s]);return r}(this.store,[e].map(z));this.replaceStore(t)}replaceStore(e){this.store=e,this.save()}prepareDataForSave(){try{return JSON.stringify(this.store)}catch(e){return this.logger.log("prepareDataForSave(): "+e),"{}"}}save(){this.isLocalStorageAvailable&&localStorage.setItem(this.mainKey,this.prepareDataForSave())}recreateStore(){this.isLocalStorageAvailable?this.store=this.getSavedLocalStorageData():this.logger.log("localStorage is disabled or unavailable")}getSavedLocalStorageData(){var e={},t=window.localStorage;try{var s=t.getItem(this.mainKey);return s?JSON.parse(s):e}catch(t){return this.logger.log("getSavedLocalStorageData(): "+t),e}}static isLocalStorageAvailable(){var e=window.localStorage,t="LSTestKey",s="LSTestValue";try{if(e.setItem(t,s),e.getItem(t)===s)return localStorage.removeItem(t),!0}catch(e){return!1}return!1}}var M=new class extends D{add(e,t){var s=this.get(e);s?Array.isArray(s)?this.set(e,[...s,t]):this.logger.log("add("+e+"): target is not an array"):this.set(e,[t])}removeEvery(e,t){var s=this.get(t);if(s)if(Array.isArray(s)){var i=s.filter((t=>JSON.stringify(t)!==JSON.stringify(e)));0!==i.length?this.set(t,i):this.remove(t)}else this.logger.log("removeEvery("+e+", "+t+"): target is not an array");else this.logger.log("removeEvery("+e+", "+t+"): target does not exist")}removeKeysByPattern(e){Object.keys(this.store).forEach((t=>{t.startsWith(e)&&this.remove(t)}))}}("ga-universal-counter");function P(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var q=new class{constructor(e,t){this.apiUrl=e,this.options=Object.assign({timeout:1e4,credentials:"include",mode:"cors",headers:{"access-control-request-headers":"content-type","content-type":"application/json;charset=utf-8"}},t||{})}post(e,t){var s=JSON.stringify(t);return this.request("post",e,s)}get(e){return this.request("get",e)}request(e,t,s){var i,r=this;return(i=function*(){var i,n=r.apiUrl+t,o=Object.assign({},r.options,{method:e,body:s}),a=yield fetch(n,o);if("function"==typeof a.json&&(i=yield a.json()),!i)throw"Request failed "+e.toUpperCase()+":"+n;if(i.error&&i.message)throw i.message;return i},function(){var e=this,t=arguments;return new Promise((function(s,r){var n=i.apply(e,t);function o(e){P(n,s,r,o,a,"next",e)}function a(e){P(n,s,r,o,a,"throw",e)}o(void 0)}))})()}}("https://counter-service.grooove.pl/api");function x(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var H=new D("ga-universal-counter-version"),U=new class{checkForUpdates(){return(e=function*(){var e="lastChecked",t=H.get(e)||0;if(!(Date.now()-t<36e5))try{var s=yield q.get("/latest-addon-version"),{version:i}=s;H.set("version",i),H.set(e,Date.now())}catch(e){}},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){x(n,i,r,o,a,"next",e)}function a(e){x(n,i,r,o,a,"throw",e)}o(void 0)}))})();var e}};function G(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}function K(e){return function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){G(n,i,r,o,a,"next",e)}function a(e){G(n,i,r,o,a,"throw",e)}o(void 0)}))}}var F="is-hidden";class W extends t{constructor(e){super();var t=(e=>{var{label:t,id:s,data:i,classes:r,title:n}=e;return'<button type="button" '+(s?'id="'+s+'"':"")+" "+(n?'title="'+n+'"':"")+' class="_1801x7x0 '+(r||"")+'" '+(i?i.map((e=>{var[t,s]=e;return"data-"+t+'="'+s+'"'})).join(" "):"")+">"+t+"</>"})(e),s=l(t);s.addEventListener("click",(()=>this.emit("CLICK"))),s.addEventListener("mouseenter",(()=>this.emit("HOVER"))),this.node=s}setLabel(e){this.node.innerText=e}setClass(e){this.node.classList.add(e)}removeClass(e){this.node.classList.remove(e)}show(){this.node.classList.remove(F)}hide(){this.node.classList.add(F)}toString(){return this.node.outerHTML}}class V extends t{constructor(e){super(),this.container=e.containerRef,this.tip=e.tip,this.render()}render(){var e=' <div class="_1ol33ot0'+(b()?" is-si":"")+'">L</div>',t=l(e);t.addEventListener("click",(()=>this.emit("CLICK"))),t.addEventListener("mouseenter",(()=>this.tip.show(t,"Licznik Ubić by Groove Armada v2.4.5<br>Skrót: SHIFT + L"))),this.container.appendChild(t),this.node=t}setNotificationsCount(e){var t=e>9?9:e;this.node.setAttribute("data-notifications",""+t)}}class J{constructor(e){var t=(e=>{var t,s,i=(s=(t=e.timestamp)?new Date(t):new Date,w(s.getHours())+":"+w(s.getMinutes())+":"+w(s.getSeconds()));return' <p class="_1ndkfgi0" data-type="'+e.type+'"> <span class="_1ndkfgi1">'+i+"</span> <span>"+e.rawMessage+"</span> </p> "})(e),s=l(t);this.node=s}toString(){return this.node.outerHTML}}var Z="is-visible";class Q{constructor(e){this.container=e.containerRef,this.render()}render(){var e=l(' <div class="_1kw7mee0"> <div class="_1kw7mee1" id="js-title"></div> <div class="_1kw7mee2" id="js-content"></div> <div class="_1kw7mee3" id="js-controls"></div> </div>');this.title=h("#js-title",e),this.content=h("#js-content",e),this.controls=h("#js-controls",e),this.container.appendChild(e),this.node=e}open(){return this.node.classList.add(Z),this}close(e){return this.node.classList.remove(Z),e&&(this.setTitle(""),this.setContentMarkup(""),this.setControls([])),this}setTitle(e){return this.title.innerText=e,this}setContent(e){return this.content.innerHTML="",e.forEach((e=>this.content.appendChild(e))),this}setContentMarkup(e){return this.content.innerHTML=e,this}setControls(e){return this.controls.innerHTML="",e.forEach((e=>this.controls.appendChild(e))),this}}var Y="y8udqv1";class X{constructor(e){this.containerRef=e.containerRef,this.node=this.render()}render(){var e=l('<div class="y8udqv0"></div>');return this.containerRef.appendChild(e),e}setContent(e){this.node.innerHTML=e}show(e,t){this.setContent(t),this.setPosition(this.calculatePosition(e)),this.node.classList.add(Y),e.addEventListener("mouseout",(()=>this.hide()))}hide(){this.node.classList.remove(Y)}setPosition(e){this.node.style.left=e.left+"px",this.node.style.top=e.top+"px"}calculatePosition(e){var t=e.getBoundingClientRect(),s=t.top,{innerHeight:i}=window,r=Math.floor(i/2),n=document.body.clientWidth,o=Math.floor(n/2),a=e.clientHeight,l=e.clientWidth,h=t.left,c=n-h-l,d=Math.floor(l/2),u=Math.floor(this.node.clientWidth/2),g=this.node.clientHeight,v=this.node.clientWidth;return{top:s<=r&&s<g+3+5?s+3+a+5:s-g-3-5,left:l>=v?h+d-u:h+d>o?c<u-d-10?n-v-10:h+d-u:h+d-u<10?10:h+d-u}}}var $="bcizgm7",ee=[{id:n.elite,label:o.elite},{id:n.elite2,label:o.elite2},{id:n.hero,label:o.hero},{id:n.titan,label:o.titan},{id:n.colossus,label:o.colossus},{id:n.event,label:o.event},{id:n.other,label:o.other}],te="is-visible",se="is-active",ie="is-dimmed";class re{constructor(e){this.props=e}render(){var e,t,s=(t=(e=this.props).npc.icon?'<img class="_1rnrz0u4" src="'+e.npc.icon+'">':"",' <div class="_1rnrz0u0"> <div class="_1rnrz0u1">'+e.npc.name+'</div> <div class="_1rnrz0u2"> <p>Ubić: <b class="_1rnrz0u5">'+e.stats.kills+'</b></p> <p>Looty unikatowe: <b class="_1rnrz0u6">'+e.stats.loots[i.unique]+'</b></p> <p>Looty heroiczne: <b class="_1rnrz0u7">'+e.stats.loots[i.heroic]+'</b></p> <p>Looty legendarne: <b class="_1rnrz0u8">'+e.stats.loots[i.legendary]+"</b></p> <p>Liczone od: <b>"+e.stats.trackedSince+'</b></p> </div> <div class="_1rnrz0u3"> '+t+" </div> </div> ");return l(s)}toString(){return this.render().outerHTML}}function ne(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var oe=e=>new re(e);class ae extends t{constructor(e){super(),this.chatQueue=[],this.isBattle=!1,this.currentBattleUniqueId="",this.window=e,this.intercept()}pushChatMessage(e){this.chatQueue.push(e)}injectChatMessages(e){for(var t=1,s=Object.assign({},e,{c:e.c||{}}),i=Object.keys(s.c).length;this.chatQueue.length;){var r=this.chatQueue.shift(),n=e.ev+t,o=Object.assign({},r,{ts:n});s=Object.assign({},s,{c:Object.assign({},s.c,{[i]:o})}),i+=1,t+=1}return s}searchForBattleLogItems(e,t){var s=e.substring(8),i=": zdobyto ",r=s.includes(i)?i:": looted ",[n,o]=s.split(r);if(o){var a=o.split(", ");this.emit("BATTLE_LOG_ITEM",{items:a,npcName:n,battleId:this.currentBattleUniqueId,rawResponse:t})}}generateBattleUniqueId(){this.currentBattleUniqueId=btoa(""+Date.now()).substring(0,15)}challenge(e){this.emit("RAW_RESPONSE",{rawResponse:e}),f(e.f)&&e.f&&this.handleBattle(e.f,e),e.item&&e.loot&&f(e.item)&&f(e.loot)&&this.handleItems(e.item,e.loot,e),e.loot&&f(e.loot)&&this.handleLoot(e.loot,e),e.c&&f(e.c)&&this.handleChatMessages(e.c,e),e.npc&&f(e.npc)&&this.handleNpcs(e.npc,e),e.other&&f(e.other)&&this.handleOtherPlayers(e.other,e)}handleBattle(e,t){e.init&&(this.isBattle=!0,this.generateBattleUniqueId(),this.emit("BATTLE_START",{battleId:this.currentBattleUniqueId,rawResponse:t}));var s=new Map,i=new Map;if(e.w&&f(e.w)&&y(e.w).forEach(((e,r)=>{var n=Number(r);e.name?(s.set(n,e),this.emit("NEW_FIGHTER",{fighter:e,fighterId:n,battleId:this.currentBattleUniqueId,rawResponse:t})):(i.set(n,e),this.emit("FIGHTER_DATA_UPDATE",{fighter:e,fighterId:r,battleId:this.currentBattleUniqueId,rawResponse:t}),0===e.hpp&&this.emit("FIGHTER_KILLED",{fighter:e,fighterId:r,battleId:this.currentBattleUniqueId,rawResponse:t}))})),s.size&&this.emit("NEW_FIGHTERS",{fighters:s,battleId:this.currentBattleUniqueId,rawResponse:t}),i.size&&this.emit("FIGHTERS_DATA_UPDATE",{fighters:i,battleId:this.currentBattleUniqueId,rawResponse:t}),f(e.m)&&e.m){var r=e.m.reduce(((s,i,r)=>{if(f(e.mi)&&e.mi){i.startsWith("0;0;txt=")&&this.searchForBattleLogItems(i,t);var n=Number(e.mi[r]);return s.set(n,i)}return s}),new Map);this.emit("BATTLE_LOGS",{logs:r,battleId:this.currentBattleUniqueId,rawResponse:t})}this.isBattle&&-1===e.move&&(this.isBattle=!1,setTimeout((()=>this.emit("BATTLE_END",{battle:e,battleId:this.currentBattleUniqueId,rawResponse:t})),0))}handleItems(e,t,s){var i,r=[];(i=e,f(i)?v(i).map((e=>{var[,t]=e;return t})):[]).forEach((e=>{"l"!==e.loc&&"k"!==e.loc||"dialog"!==t.source&&(this.emit("LOOT",{item:e,lootDetails:t,rawResponse:s}),r=[...r,e])})),r.length&&this.emit("LOOTS",{items:r,lootDetails:t,rawResponse:s})}handleLoot(e,t){(e.states||e.timer||e.init)&&this.emit("LOOTS_SEND",{rawResponse:t})}handleChatMessages(e,t){y(e).forEach((e=>{this.emit("CHAT_MESSAGE",{chatMessage:e,rawResponse:t})}))}handleNpcs(e,t){y(e).forEach(((e,s)=>{e.del?this.emit("NPC_DELETED",{npcId:Math.abs(Number(s)),rawResponse:t}):e.nick&&this.emit("NEW_NPC",{npcData:e,rawResponse:t})}))}handleOtherPlayers(e,t){var s=[];y(e).forEach(((e,t)=>{e.nick&&(s=[...s,Object.assign({},e,{id:Number(t)})])})),s.length&&this.emit("NEW_PLAYERS_ON_MAP",{newPlayers:s,rawResponse:t})}intercept(){var e;if(b())e=this.window;else{if(!this.window.Engine||!this.window.Engine.communication)return void setTimeout(this.intercept);e=this.window.Engine.communication}"function"==typeof e.successData?(e.oldSuccessData=e.successData,e.successData=t=>{var s=JSON.parse(t),i=!1;if("object"==typeof s&&s){var r=Object.keys(s).length;if(this.chatQueue.length)for(var n in this.chatQueue)i=!0,this.chatQueue[n].ts=s.ev+1,this.injectChatMessages(s);r>=3&&(3!==r||!(s.h||s.js||s.event_done))&&this.challenge(s)}i?(i=!1,e.oldSuccessData(JSON.stringify(s))):e.oldSuccessData(t)}):setTimeout(this.intercept,100)}}_.debug(window.location.host),_.debug(window.navigator.userAgent);var le=(e=>{var t="GAFramework v1.0.0";return e.GAServices=e.GAServices||new Map,e.GAServices.get(t)||e.GAServices.set(t,new ae(e)),e.GAServices.get(t)})(window),he=new class extends t{constructor(){super(...arguments),this.cache=[]}hasCache(){return this.cache.length>0}download(t){var s=this;return K((function*(){try{var i="?world="+B()+"&userMargonemId="+A()+"&addonVersion="+e,r=yield q.get("/kills"+i);s.cache=r.entries,setTimeout((()=>s.emit("DATA")),t?200:0)}catch(e){var n="Nie udało się pobrać danych o ubiciach z serwera: "+e;s.emit("ERROR",n)}}))()}upload(t,s){return K((function*(){_.debug('Zapis "'+t+'" dla NPC "'+s.npc.name+'"');var i=Object.assign({},s,{world:B(),userMargonemId:A(),addonVersion:e});try{var r=yield q.post(t,i);_.debug("Server: "+r.message)}catch(e){_.error('Nie udało się zapisać "'+t+'" na serwerze: '+e)}}))()}getByCategory(e){return this.cache.filter((t=>t.npc.category===e))}search(e,t){return(t?this.getByCategory(t):this.cache).filter((t=>t.npc.name.toLowerCase().includes(e)))}},ce=new class extends t{constructor(e){var t;super(),this.isVisible=!1,this.isRendered=!1,this.window=window,this.appContainer=e.appContainerRef,t=()=>{this.isVisible?this.hide():this.show()},document.addEventListener("keydown",(e=>{var s=e.target;"l"!==e.key.toLowerCase()||!e.shiftKey||["input","textarea"].includes(s.localName)&&s.id!==c||(e.stopPropagation(),e.preventDefault(),t())})),this.tip=new X({containerRef:this.window.document.body}),this.search=new d,this.launcher=new V({containerRef:h(b()?"#centerbox":".game-layer"),tip:this.tip}),this.logsButton=new W({label:"i",classes:"bcizgm6"}),this.refreshButton=new W({label:"Odśwież",classes:"bcizgm5"}),this.closeButton=new W({label:"Zamknij"}),this.tabs=new Map,this.search.on("INPUT",(e=>this.emit("SEARCH",e))),this.logsButton.on("HOVER",(()=>this.tip.show(this.logsButton.node,"Pokaż logi dodatku"))),this.launcher.on("CLICK",(()=>{this.isRendered||this.render(),this.show(),this.emit("LAUNCHER_CLICKED")}))}render(){var e,t,s,i,r,o,c,d,u,g,v,m,p,f,w,y=' <div class="bcizgm0"> <div class="bcizgm1" id="js-canvas"> Trwa pobieranie danych... </div> <div class="bcizgm2" id="js-tabs"> '+ee.map((e=>new W({label:e.label,data:[["id",e.id]],classes:"bcizgm3"}))).join("")+' </div> <div class="bcizgm4" id="js-controls"></div> </div>',b=l(y),E=h("#js-canvas",b),L=(e="#js-tabs button",(t=(b||document).querySelectorAll(e)).length?[...t]:(a.log("findAll: nothing found using selector: "+e),[])),C=h("#js-controls",b);b.insertBefore(this.search.getNode(),E),C.appendChild(this.logsButton.node),C.appendChild(this.refreshButton.node),C.appendChild(this.closeButton.node),this.node=b,this.canvas=E,L.forEach((e=>{var t=e.dataset.id;this.tabs.set(t,e),e.addEventListener("click",(()=>{this.getCurrentCategoryId()!==t&&this.emit("TAB_CLICKED",t),this.selectCategory(t)}))})),this.refreshButton.on("CLICK",(()=>{this.message("Trwa pobieranie danych..."),this.emit("REFRESH")})),this.closeButton.on("CLICK",(()=>this.hide())),E.addEventListener("mousewheel",(e=>e.stopPropagation())),this.logsButton.on("CLICK",(()=>this.emit("SHOW_LOGS"))),this.appContainer.appendChild(b),this.selectCategory(n.elite2),s=b,d=!1,u=0,g=0,v=e=>{e.stopPropagation(),"touchstart"===e.type?(o=e.touches[0].clientX-u,c=e.touches[0].clientY-g):(o=e.clientX-u,c=e.clientY-g),d=!0},m=e=>{e.stopPropagation(),o=i,c=r,d=!1},p=e=>{d&&(e.preventDefault(),e.stopPropagation(),"touchmove"===e.type?(i=e.touches[0].clientX-o,r=e.touches[0].clientY-c):(i=e.clientX-o,r=e.clientY-c),u=i,g=r,f(i,r,s))},f=(e,t,s)=>{s.style.transform="translate3d("+e+"px, "+t+"px, 0)"},(w=C||s).addEventListener("touchstart",v,!1),w.addEventListener("touchend",m,!1),w.addEventListener("touchmove",p,!1),w.addEventListener("mousedown",v,!1),w.addEventListener("mouseup",m,!1),w.addEventListener("mousemove",p,!1),this.isRendered=!0}hide(){var e;this.isVisible=!1,this.node.classList.remove(te),null==(e=this.modal)||e.close()}show(){this.isVisible=!0,this.undim(),this.node.classList.add(te),this.search.focus()}dim(){this.node.classList.add(ie)}undim(){this.node.classList.remove(ie)}message(e){this.canvas.innerText=e}renderEntries(e){this.canvas.innerHTML=e.map((e=>e.toString())).join("")}getCurrentCategoryId(){if(this.currentCategory)return this.currentCategory.dataset.id}handleNotifications(e){this.launcher.setNotificationsCount(e),this.logsButton.setLabel(""+e),this.logsButton.setClass($)}displayLogs(e){if(!this.modal){var t=new W({label:"Zamknij"}),s=new Q({containerRef:this.window.document.body});t.on("CLICK",(()=>{this.modal.close(),this.undim()})),s.setTitle("Logi dodatku (v2.4.5)"),s.setControls([t.node]),this.modal=s}this.dim(),this.modal.setContentMarkup(e.map((e=>new J(e).toString())).join("")),this.modal.open(),this.launcher.setNotificationsCount(0),this.logsButton.setLabel("i"),this.logsButton.removeClass($)}unselectCurrentCategory(){this.currentCategory&&(this.currentCategory.classList.remove(se),this.currentCategory=void 0)}selectCategory(e){if(this.getCurrentCategoryId()!==e&&(this.unselectCurrentCategory(),e)){var t=this.tabs.get(e);t.classList.add(se),this.currentCategory=t}}getSearchValue(){return this.search.getValue()}}({appContainerRef:window.document.body,window});new class{constructor(e,t,s){this.model=e,this.view=t,this.gameDataProcessor=s.gameDataProcessor,this.logger=s.logger,this.notificationsManager=s.notificationsManager,U.checkForUpdates(),t.on("LAUNCHER_CLICKED",(()=>this.fetch())),t.on("SEARCH",(e=>{if(!e){var t=n.elite2;return this.view.selectCategory(t),void this.renderEntries(t)}this.view.selectCategory(void 0),this.handleSearch(e)})),e.on("DATA",(()=>this.renderEntries(t.getCurrentCategoryId()))),e.on("ERROR",(e=>t.message(e))),t.on("REFRESH",(()=>e.download(!0))),t.on("TAB_CLICKED",(e=>this.renderEntries(e))),t.on("SHOW_LOGS",(()=>{t.displayLogs(this.logger.getAll()),this.notificationsManager.resetCounter()})),this.gameDataProcessor.on("LOOT",(t=>e.upload("/loots",t))),this.gameDataProcessor.on("KILL",(t=>e.upload("/kills",t))),this.notificationsManager.on("NEW",(e=>t.handleNotifications(e)))}renderEntries(e){var t=this.view.getSearchValue();if(t)return this.handleSearch(t,e);var s=this.model.getByCategory(e||n.elite2);if(!s.length)return this.view.message("Na świecie "+B()+" nie zapisano jeszcze ubić z tej kategorii.");this.view.renderEntries(s.map(oe))}handleSearch(e,t){var s=this.model.search(e.toLowerCase(),t);if(!s.length)return this.view.message("Nie znaleziono ubić pasujących do wyszukiwania.");this.view.renderEntries(s.map(oe))}fetch(){var e,t=this;return(e=function*(){t.model.hasCache()||(yield t.model.download())},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){ne(n,i,r,o,a,"next",e)}function a(e){ne(n,i,r,o,a,"throw",e)}o(void 0)}))})()}}(he,ce,{logger:_,window,gameDataProcessor:new class extends t{constructor(e){super(),this.isBattleRefreshed=!1,e.on("BATTLE_START",(e=>this.handleBattleStart(e))),e.on("NEW_FIGHTERS",(e=>this.handleFighters(e))),e.on("BATTLE_LOG_ITEM",(e=>this.handleBattleLogItem(e))),e.on("LOOTS",(e=>this.handleLoots(e))),e.on("NPC_DELETED",(e=>this.handleNpcDeleted(e)))}handleBattleStart(e){var t;this.isBattleRefreshed=void 0!==(t=e.rawResponse).f&&void 0!==t.matchmaking_state,this.resetStorageItems(),this.isBattleRefreshed||this.resetStorage()}handleFighters(e){var t,s,{fighters:i}=e,r=(e=>{var t=[];return e.forEach(((e,s)=>{var i=Math.abs(Number(s)),r=R(i);if(r&&N(r.rank)){var n={id:i,icon:r.icon,name:r.name,lvl:r.lvl,category:k(r.rank)};t=[...t,n]}})),t})((t=i,s=new Map,t.forEach(((e,t)=>{e.npc&&s.set(t,e)})),s));this.isBattleRefreshed&&this.getAllRegisteredBosses()||r.forEach((e=>this.registerBoss(e)))}handleBattleLogItem(e){var{npcName:t,items:s}=e;_.debug('Loot z logu walki "'+s.join(", ")+'" z NPC: "'+t+'"'),this.getAllRegisteredBosses().some((e=>e.name===t))?s.forEach((e=>{M.add(j,e)})):_.debug('Zdobyto loot "'+s.join(", ")+'" z niezarejestrowanego NPC: "'+t+'"')}handleNpcDeleted(e){var{npcId:t}=e,s=R(t);if(!s)return _.debug('Usunięto z mapy niezidentyfikowanego NPC: "'+t+'"');if(N(s.rank)){var i=this.getRegisteredBoss(s.id);i?this.emit("KILL",{npc:i}):_.debug('Usunięto z mapy niezarejestrowanego wcześniej NPC: "'+s.name+'"')}}handleLoots(e){var{items:t}=e,s=(e=>e.map((e=>({name:e.name,rank:E(e.stat)}))))(t),r=s.filter((e=>e.rank>=i.unique));if(s.forEach((e=>{_.debug('Zdobyto loot "'+e.name+"@"+e.rank+'"')})),r.length)if(this.isEveryItemInStorage(r))this.applyLootsToEveryBoss(r);else{var n=r.map((e=>e.name)).join(", ");_.debug('Zdobyto loot "'+n+'", który nie został zarejestrowany podczas walki')}}applyLootsToEveryBoss(e){var t=this.getAllRegisteredBosses(),s=this.countItemTypes(e),i=[],r=[];t.forEach((e=>{r.includes(e.name)||(r.push(e.name),i.push(e))})),i.forEach((e=>{_.debug('Zapis lootu "'+JSON.stringify(s)+'" dla NPC: "'+e.name+'"'),this.emit("LOOT",{npc:e,loots:s})}))}countItemTypes(e){var t={[i.unique]:0,[i.heroic]:0,[i.legendary]:0};return e.forEach((e=>{var{rank:s}=e;s<i.unique||(t[s]+=1)})),_.debug("Loot: "+JSON.stringify(t)),t}isEveryItemInStorage(e){var t,s=M.get(j);if(!s||!s.length)return!1;for(var i=[...e];t=i.shift();){var{name:r}=t,n=s.indexOf(r);if(-1===n)return!1;s=s.slice(n,1)}return!0}resetStorageItems(){M.remove(j)}resetStorage(){M.remove(O)}registerBoss(e){_.debug('Wykryto NPC do potencjalnego zliczenia: "'+e.name+'"'),M.add(O,e)}getAllRegisteredBosses(){return M.get(O)||[]}getRegisteredBoss(e){return this.getAllRegisteredBosses().find((t=>t.id===e))}}(le),notificationsManager:new class extends t{constructor(e){super(),this.counter=0,this.logger=e,this.logger.on("ERROR",(()=>{this.counter+=1,this.emit("NEW",this.counter)}))}resetCounter(){this.counter=0}}(_)})})();