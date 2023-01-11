(()=>{"use strict";var e="2.8.0",t="ga-universal-counter";class s{constructor(){this.events={}}on(e,t){return this.subscribe(e,t),this}emit(e,t){return this.getListeners(e).forEach((e=>e.call(null,t))),this}getListeners(e){return this.events[e]||[]}subscribe(e,t){var s=[...this.getListeners(e),t];return this.events[e]=s,this}off(e,t){var s=this.getListeners(e).filter((e=>e!==t));return this.events[e]=s,this}offAll(e){return delete this.events[e],this}}var{assign:i,entries:r}=Object,n=r,o=(Array.isArray,Number.isNaN,e=>typeof e),a=e=>"undefined"!==o(e),h=e=>"object"===o(e)&&!!e,l=e=>("0"+e).slice(-2),c=e=>h(e)?new Map(n(e)):new Map,d=e=>{var{map:t,g:s,_g:i,Engine:r}=e;return a(i)&&a(s)&&a(t)&&!a(r)};class u extends s{constructor(e){super(),this.key="GA: "+e,this.memory=new Set}getAll(){return Array.from(this.memory)}log(e){var t=this.decorate(e,"log");this.memory.add(t),this.emit("LOG",t)}error(e){var t=this.decorate(e,"error");return this.memory.add(t),this.stderr(t.message),this.emit("ERROR",t),new Error(e)}report(e){var t=this.decorate(e,"report");return this.memory.add(t),this.stderr(t.message),this.emit("REPORT",t),new Error(e)}stderr(e){console.error(e)}decorate(e,t){return{type:t,message:this.key+": "+e,rawMessage:e,timestamp:Date.now()}}}var g,m,v=new u("html-utils"),p=e=>{var t=document.createElement("template");if(t.innerHTML=e.trim(),!t.content.firstElementChild)throw v.report("createElement('"+e+"'): child is null");return t.content.firstElementChild},w=(e,t)=>{var s=(t||document).querySelector(e);if(s)return s;throw v.report("find: nothing found using selector: "+e)},f=e=>w((e=>d(e)?"#centerbox":".game-layer")(e)),y=e=>({name:e.name,mode:e.mode}),b=e=>{var{Engine:t,map:s}=e;return d(e)?y(s):y(t.map.d)};!function(e){e[e.common=0]="common",e[e.unique=1]="unique",e[e.heroic=2]="heroic",e[e.legendary=3]="legendary"}(g||(g={})),function(e){e[e.common=0]="common",e[e.elite=1]="elite",e[e.elite2=2]="elite2",e[e.elite3=3]="elite3",e[e.hero=4]="hero",e[e.titan=5]="titan",e[e.colossus=6]="colossus"}(m||(m={}));var E,L,S=e=>{if("string"!=typeof e)throw new Error("item stats must be of type string");return e.startsWith("unique")||e.match(";unique")||e.match("unique;")||e.endsWith("unique")?g.unique:e.startsWith("heroic")||e.match(";heroic")||e.match("heroic;")||e.endsWith("heroic")?g.heroic:e.startsWith("legendary")||e.match(";legendary")||e.match("legendary;")||e.endsWith("legendary")?g.legendary:g.common},C=(e,t)=>e>99?5===(null==t?void 0:t.mode)?m.colossus:m.titan:e>79?m.hero:e>19?m.elite2:e>9?m.elite:m.common,I=(e,t)=>{var s=e.icon.match(/([a-zA-Z0-9-_]{1,10}\/[a-zA-Z0-9_-]{1,50}\.gif)$/);return{name:e.nick,id:Number.parseInt(e.id),icon:s?s[0]:"",lvl:e.lvl,rank:C(e.wt,t),x:e.x,y:e.y,wt:e.wt}},N=(e,t)=>{var{g:s,Engine:i}=t;if(!e)return null;if(d(t)){var r,n=null==s||null==(r=s.npc)?void 0:r[e];return n?I(n,b(t)):null}var o=i.npcs.getById(Number(e));return o?I(o.d,b(t)):null},k=e=>{var t,s,{hero:i,Engine:r}=e;return d(e)?null==i?void 0:i.account:null==r||null==(t=r.hero)||null==(s=t.d)?void 0:s.account},T=e=>e.location.host.split(".")[0];function R(e,t,s,i,r,n,o){try{var a=e[n](o),h=a.value}catch(e){return void s(e)}a.done?t(h):Promise.resolve(h).then(i,r)}function A(e){return function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){R(n,i,r,o,a,"next",e)}function a(e){R(n,i,r,o,a,"throw",e)}o(void 0)}))}}!function(e){e.elite="elite",e.elite2="elite2",e.hero="hero",e.titan="titan",e.colossus="colossus",e.event="event",e.other="other"}(E||(E={})),function(e){e.elite="Elity",e.elite2="Elity II",e.hero="Herosi",e.titan="Tytani",e.colossus="Kolosi",e.event="Eventowe",e.other="Inne"}(L||(L={}));var O="is-hidden";class j extends s{constructor(e){super();var t=(e=>{var{label:t,id:s,data:i,classes:r,title:n}=e;return'<button type="button" '+(s?'id="'+s+'"':"")+" "+(n?'title="'+n+'"':"")+' class="_1801x7x0 '+(r||"")+'" '+(i?i.map((e=>{var[t,s]=e;return"data-"+t+'="'+s+'"'})).join(" "):"")+">"+t+"</>"})(e),s=p(t);s.addEventListener("click",(()=>this.emit("CLICK"))),s.addEventListener("mouseenter",(()=>this.emit("HOVER"))),this.node=s}setLabel(e){this.node.innerText=e}setClass(e){this.node.classList.add(e)}removeClass(e){this.node.classList.remove(e)}show(){this.node.classList.remove(O)}hide(){this.node.classList.add(O)}toString(){return this.node.outerHTML}}class B extends s{constructor(e){super(),this.container=e.containerRef,this.tip=e.tip,this.isSI=e.isSI,this.render()}render(){var e=' <div class="_1ol33ot0'+(this.isSI?" is-si":"")+" "+t+'">L</div>',s=p(e);s.addEventListener("click",(()=>this.emit("CLICK"))),s.addEventListener("mouseenter",(()=>this.tip.show(s,"Licznik Ubić by Groove Armada v2.8.0<br>Skrót: SHIFT + L"))),this.container.appendChild(s),this.node=s}setNotificationsCount(e){var t=e>9?9:e;this.node.setAttribute("data-notifications",""+t)}}class M{constructor(e){var t=(e=>{var t,s,i=(s=(t=e.timestamp)?new Date(t):new Date,l(s.getHours())+":"+l(s.getMinutes())+":"+l(s.getSeconds()));return' <p class="_1ndkfgi0" data-type="'+e.type+'"> <span class="_1ndkfgi1">'+i+'</span> <span class="_1ndkfgi2">'+e.rawMessage+"</span> </p> "})(e),s=p(t);this.node=s}toString(){return this.node.outerHTML}}var _="is-visible";class P{constructor(e){this.container=e.containerRef,this.render()}render(){var e=p(' <div class="_1kw7mee0"> <div class="_1kw7mee1" id="js-title"></div> <div class="_1kw7mee2" id="js-content"></div> <div class="_1kw7mee3" id="js-controls"></div> </div>');this.title=w("#js-title",e),this.content=w("#js-content",e),this.controls=w("#js-controls",e),this.content.addEventListener("mousewheel",(e=>e.stopPropagation())),this.container.appendChild(e),this.node=e}open(){return this.node.classList.add(_),this}close(e){return this.node.classList.remove(_),e&&(this.setTitle(""),this.setContentMarkup(""),this.setControls([])),this}setTitle(e){return this.title.innerText=e,this}setContent(e){return this.content.innerHTML="",e.forEach((e=>this.content.appendChild(e))),this}setContentMarkup(e){return this.content.innerHTML=e,this}setControls(e){return this.controls.innerHTML="",e.forEach((e=>this.controls.appendChild(e))),this}}var z="ga-uc-search";class D extends s{constructor(){super(),this.render()}render(){this.node=p('<input id="ga-uc-search" class="_1rqarav0" placeholder="Wyszukaj..." type="text">'),this.node.addEventListener("input",(()=>this.emit("INPUT",this.getValue())))}getValue(){return this.node.value}focus(){this.node.focus()}getNode(){return this.node}}var W="y8udqv1";class q{constructor(e){this.containerRef=e.containerRef,this.node=this.render()}render(){var e=p('<div class="y8udqv0"></div>');return this.containerRef.appendChild(e),e}setContent(e){this.node.innerHTML=e}show(e,t){this.setContent(t),this.setPosition(this.calculatePosition(e)),this.node.classList.add(W),e.addEventListener("mouseout",(()=>this.hide()))}hide(){this.node.classList.remove(W)}setPosition(e){this.node.style.left=e.left+"px",this.node.style.top=e.top+"px"}calculatePosition(e){var t=e.getBoundingClientRect(),s=t.top,{innerHeight:i}=window,r=Math.floor(i/2),n=document.body.clientWidth,o=Math.floor(n/2),a=e.clientHeight,h=e.clientWidth,l=t.left,c=n-l-h,d=Math.floor(h/2),u=Math.floor(this.node.clientWidth/2),g=this.node.clientHeight,m=this.node.clientWidth;return{top:s<=r&&s<g+3+5?s+3+a+5:s-g-3-5,left:h>=m?l+d-u:l+d>o?c<u-d-10?n-m-10:l+d-u:l+d-u<10?10:l+d-u}}}function H(e,t,s,i,r,n,o){try{var a=e[n](o),h=a.value}catch(e){return void s(e)}a.done?t(h):Promise.resolve(h).then(i,r)}var x=e=>[E.elite,E.elite2,E.hero,E.titan,E.colossus,E.event].includes(e),U=e=>{switch(e){case m.elite:return E.elite;case m.elite2:return E.elite2;case m.hero:return E.hero;case m.titan:return E.titan;case m.colossus:return E.colossus;default:return E.other}},G="npc",F="item-names-from-battle-log";class V{constructor(e){this.key=e.key,this.ls=e.targetWindow.localStorage,this.logger=e.logger,this.isLocalStorageAvailable=this.isAvailable()}save(e){this.isLocalStorageAvailable&&localStorage.setItem(this.key,e)}get(){return this.isLocalStorageAvailable?this.ls.getItem(this.key):(this.logger.log("LocalStorageService: localStorage is disabled or unavailable"),null)}isAvailable(){var e="LSTestKey",t="LSTestValue";try{if(this.ls.setItem(e,t),this.ls.getItem(e)===t)return localStorage.removeItem(e),!0}catch(e){return!1}return!1}}function K(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var i=s.call(e,t);if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return"symbol"==typeof t?t:String(t)}class J{constructor(e,t){this.memory={},this.storage=e,this.logger=t,this.restore()}set(e,t){this.memory[e]=t,this.save()}add(e,t){var s=this.get(e);s?Array.isArray(s)?this.set(e,[...s,t]):this.logger.log("Memstore: add("+e+"): not an array"):this.set(e,[t])}removeEvery(e,t){var s=this.get(t);if(s)if(Array.isArray(s)){var i=s.filter((t=>JSON.stringify(t)!==JSON.stringify(e)));0!==i.length?this.set(t,i):this.remove(t)}else this.logger.log("Memstore: removeEvery("+e+", "+t+"): not an array");else this.logger.log("Memstore: removeEvery("+e+", "+t+"): key does not exist")}removeKeysStartingWith(e){Object.keys(this.memory).forEach((t=>{t.startsWith(e)&&this.remove(t)}))}get(e){return this.memory[e]||null}remove(e){var t=function(e,t){if(null==e)return{};var s,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)s=n[i],t.indexOf(s)>=0||(r[s]=e[s]);return r}(this.memory,[e].map(K));this.memory=t,this.save()}restore(){var e=this.storage.get();if(e)try{this.memory=JSON.parse(e)}catch(e){this.logger.log("Memstore: restore: "+e)}}save(){try{this.storage.save(JSON.stringify(this.memory))}catch(e){this.logger.log("Memstore: save: "+e)}}}var Z=(e,t)=>{var s=new V({key:e,logger:t,targetWindow:window});return new J(s,t)},Q="bcizgm7",Y=[{id:E.elite,label:L.elite},{id:E.elite2,label:L.elite2},{id:E.hero,label:L.hero},{id:E.titan,label:L.titan},{id:E.colossus,label:L.colossus},{id:E.event,label:L.event},{id:E.other,label:L.other}],X="is-visible",$="is-active",ee="is-dimmed";class te{constructor(e){this.props=e}render(){var e,t,s=(t=(e=this.props).npc.icon?'<img class="_1rnrz0u4" src="'+e.npc.icon+'">':"",' <div class="_1rnrz0u0"> <div class="_1rnrz0u1">'+e.npc.name+'</div> <div class="_1rnrz0u2"> <p>Ubić: <b class="_1rnrz0u5">'+e.stats.kills+'</b></p> <p>Looty unikatowe: <b class="_1rnrz0u6">'+e.stats.loots[g.unique]+'</b></p> <p>Looty heroiczne: <b class="_1rnrz0u7">'+e.stats.loots[g.heroic]+'</b></p> <p>Looty legendarne: <b class="_1rnrz0u8">'+e.stats.loots[g.legendary]+"</b></p> <p>Liczone od: <b>"+e.stats.trackedSince+'</b></p> </div> <div class="_1rnrz0u3"> '+t+" </div> </div> ");return p(s)}toString(){return this.render().outerHTML}}function se(e,t,s,i,r,n,o){try{var a=e[n](o),h=a.value}catch(e){return void s(e)}a.done?t(h):Promise.resolve(h).then(i,r)}var ie,re=e=>new te(e);function ne(e,t,s,i,r,n,o){try{var a=e[n](o),h=a.value}catch(e){return void s(e)}a.done?t(h):Promise.resolve(h).then(i,r)}!function(e){e.GET="GET",e.POST="POST"}(ie||(ie={}));class oe extends s{constructor(e){super(),this.chatQueue=[],this.currentBattleUniqueId="",this.window=e,this.intercept()}pushChatMessage(e){this.chatQueue.push(e)}injectChatMessages(e){for(var t=1,s=Object.assign({},e,{c:e.c||{}}),i=Object.keys(s.c).length;this.chatQueue.length;){var r=this.chatQueue.shift(),n=e.ev+t,o=Object.assign({},r,{ts:n});s=Object.assign({},s,{c:Object.assign({},s.c,{[i]:o})}),i+=1,t+=1}return s}searchForBattleLogItems(e,t){var s=e.substring(8),i=": zdobyto ",r=s.includes(i)?i:": looted ",[n,o]=s.split(r);if(o){var a=o.split(", ");this.emit("BATTLE_LOG_ITEM",{items:a,npcName:n,battleId:this.currentBattleUniqueId,rawResponse:t})}}generateBattleUniqueId(){this.currentBattleUniqueId=btoa(""+Date.now()).substring(0,15)}challenge(e){this.emit("RAW_RESPONSE",{rawResponse:e}),h(e.f)&&e.f&&this.handleBattle(e.f,e),e.item&&e.loot&&h(e.item)&&h(e.loot)&&this.handleItems(e.item,e.loot,e),e.loot&&h(e.loot)&&this.handleLoot(e.loot,e),e.c&&h(e.c)&&this.handleChatMessages(e.c,e),e.npc&&h(e.npc)&&this.handleNpcs(e.npc,e),e.other&&h(e.other)&&this.handleOtherPlayers(e.other,e)}handleBattle(e,t){e.init&&(this.generateBattleUniqueId(),this.emit("BATTLE_START",{battleId:this.currentBattleUniqueId,rawResponse:t}));var s=new Map,i=new Map;if(e.w&&h(e.w)&&c(e.w).forEach(((e,r)=>{var n=Number(r);e.name?(s.set(n,e),this.emit("NEW_FIGHTER",{fighter:e,fighterId:n,battleId:this.currentBattleUniqueId,rawResponse:t})):(i.set(n,e),this.emit("FIGHTER_DATA_UPDATE",{fighter:e,fighterId:r,battleId:this.currentBattleUniqueId,rawResponse:t}),0===e.hpp&&this.emit("FIGHTER_KILLED",{fighter:e,fighterId:r,battleId:this.currentBattleUniqueId,rawResponse:t}))})),s.size&&this.emit("NEW_FIGHTERS",{fighters:s,battleId:this.currentBattleUniqueId,rawResponse:t}),i.size&&this.emit("FIGHTERS_DATA_UPDATE",{fighters:i,battleId:this.currentBattleUniqueId,rawResponse:t}),h(e.m)&&e.m){var r=e.m.reduce(((s,i,r)=>{if(h(e.mi)&&e.mi){i.startsWith("0;0;txt=")&&this.searchForBattleLogItems(i,t);var n=Number(e.mi[r]);return s.set(n,i)}return s}),new Map);this.emit("BATTLE_LOGS",{logs:r,battleId:this.currentBattleUniqueId,rawResponse:t})}-1===e.endBattle&&setTimeout((()=>this.emit("BATTLE_END",{battle:e,battleId:this.currentBattleUniqueId,rawResponse:t})),0)}handleItems(e,t,s){var i,r=[];(i=e,h(i)?n(i).map((e=>{var[,t]=e;return t})):[]).forEach((e=>{"l"!==e.loc&&"k"!==e.loc||["dialog","lootbox"].includes(t.source)||(this.emit("LOOT",{item:e,lootDetails:t,rawResponse:s}),r=[...r,e])})),r.length&&this.emit("LOOTS",{items:r,lootDetails:t,rawResponse:s})}handleLoot(e,t){(e.states||e.endTs||e.init)&&this.emit("LOOTS_SEND",{rawResponse:t})}handleChatMessages(e,t){c(e).forEach((e=>{this.emit("CHAT_MESSAGE",{chatMessage:e,rawResponse:t})}))}handleNpcs(e,t){c(e).forEach(((e,s)=>{e.del?this.emit("NPC_DELETED",{npcId:Math.abs(Number(s)),rawResponse:t}):e.nick&&this.emit("NEW_NPC",{npcData:e,rawResponse:t})}))}handleOtherPlayers(e,t){var s=[];c(e).forEach(((e,t)=>{e.nick&&(s=[...s,Object.assign({},e,{id:Number(t)})])})),s.length&&this.emit("NEW_PLAYERS_ON_MAP",{newPlayers:s,rawResponse:t})}intercept(){var e;if(d(this.window))e=this.window;else{if(!this.window.Engine||!this.window.Engine.communication)return void setTimeout(this.intercept,100);e=this.window.Engine.communication}"function"==typeof e.successData?(e.oldSuccessData=e.successData,e.successData=t=>{var s=JSON.parse(t),i=!1;if("object"==typeof s&&s){var r=Object.keys(s).length;if(this.chatQueue.length)for(var n in this.chatQueue)i=!0,this.chatQueue[n].ts=s.ev+1,this.injectChatMessages(s);r>=3&&(3!==r||!(s.h||s.js||s.event_done||s.dead))&&this.challenge(s)}i?(i=!1,e.oldSuccessData(JSON.stringify(s))):e.oldSuccessData(t)}):setTimeout(this.intercept,100)}}var ae=window,he=new u("universal-counter");he.log(window.location.host+", "+(d(ae)?"SI":"NI")),he.log(window.navigator.userAgent);var le=new class{constructor(e,t){this.apiUrl=e,this.options=Object.assign({timeout:1e4,credentials:"include",mode:"cors",headers:{"access-control-request-headers":"content-type","content-type":"application/json;charset=utf-8"}},t||{})}post(e,t){var s=JSON.stringify(t);return this.request(ie.POST,e,s)}get(e){return this.request(ie.GET,e)}request(e,t,s){var i,r=this;return(i=function*(){var i,n=r.apiUrl+t,o=Object.assign({},r.options,{method:e,body:s}),a=yield fetch(n,o);if("function"==typeof a.json&&(i=yield a.json()),!i)throw new Error('Request "'+e+":"+n+'" failed. Received no data.');if(i.error&&i.message)throw new Error(i.message);return i},function(){var e=this,t=arguments;return new Promise((function(s,r){var n=i.apply(e,t);function o(e){ne(n,s,r,o,a,"next",e)}function a(e){ne(n,s,r,o,a,"throw",e)}o(void 0)}))})()}}("https://counter-service.grooove.pl/api"),ce=new class{constructor(e){this.logger=e.logger,this.httpService=e.httpService,this.margonemInterface=e.margonemInterface,this.addonVersion=e.addonVersion,this.subscribe()}subscribe(){this.logger.on("REPORT",(e=>{this.report(e.message),this.report(this.logger.getAll().map((e=>e.message)).join("\\r\\n"))}))}report(e){this.httpService.post("/reports",{error:e,margonemInterface:this.margonemInterface,addonVersion:this.addonVersion})}}({logger:he,addonVersion:e,margonemInterface:(e=>d(e)?"SI":"NI")(ae),httpService:le}),de=(e=>{var t="GAFramework v1.0.0";return e.GAServices=e.GAServices||new Map,e.GAServices.get(t)||e.GAServices.set(t,new oe(e)),e.GAServices.get(t)})(ae),ue=Z("ga-universal-counter",he),ge=new class extends s{constructor(e){super(),this.cache=[],this.window=e.targetWindow,this.httpService=e.httpService,this.logger=e.logger}hasCache(){return this.cache.length>0}download(t){var s=this;return A((function*(){try{var i="?world="+T(s.window)+"&userMargonemId="+k(s.window)+"&addonVersion="+e,r=yield s.httpService.get("/kills"+i);s.cache=r.entries,setTimeout((()=>s.emit("DATA")),t?150:0)}catch(e){var n="Nie udało się pobrać danych o ubiciach z serwera: "+e;s.emit("ERROR",n)}}))()}upload(t,s){var i=this;return A((function*(){i.logger.log('Zapis "'+t+'" dla NPC "'+s.npc.name+'"');var r=Object.assign({},s,{world:T(i.window),userMargonemId:k(i.window),addonVersion:e});try{var n=yield i.httpService.post(t,r);i.logger.log("Serwer: "+n.message)}catch(e){var o="/kills"===t?"ubicia":"lootu";i.logger.error("Nie udało się zapisać "+o+" na serwerze: "+e)}}))()}getByCategory(e){return this.cache.filter((t=>t.npc.category===e))}search(e,t){return(t?this.getByCategory(t):this.cache).filter((t=>t.npc.name.toLowerCase().includes(e)))}}({logger:he,httpService:le,targetWindow:ae}),me=new class extends s{constructor(e){var t;super(),this.isVisible=!1,this.isRendered=!1,this.window=e.targetWindow,this.appContainer=e.appContainerRef,t=()=>{this.isVisible?this.hide():this.show()},document.addEventListener("keydown",(e=>{var s=e.target;"l"!==e.key.toLowerCase()||!e.shiftKey||["input","textarea"].includes(s.localName)&&s.id!==z||(e.stopPropagation(),e.preventDefault(),t())})),this.tip=new q({containerRef:this.window.document.body}),this.search=new D,this.launcher=new B({containerRef:f(this.window),tip:this.tip,isSI:d(this.window)}),this.logsButton=new j({label:"i",classes:"bcizgm6"}),this.refreshButton=new j({label:"Odśwież",classes:"bcizgm5"}),this.closeButton=new j({label:"Zamknij"}),this.tabs=new Map,this.search.on("INPUT",(e=>this.emit("SEARCH",e))),this.logsButton.on("HOVER",(()=>this.tip.show(this.logsButton.node,"Pokaż logi dodatku"))),this.launcher.on("CLICK",(()=>this.show()))}render(){var e,t,s,i,r,n,o,a,h,l,c,d,u,g,m,f=' <div class="bcizgm0"> <div class="bcizgm1" id="js-canvas"> Trwa pobieranie danych... </div> <div class="bcizgm2" id="js-tabs"> '+Y.map((e=>new j({label:e.label,data:[["id",e.id]],classes:"bcizgm3"}))).join("")+' </div> <div class="bcizgm4" id="js-controls"></div> </div>',y=p(f),b=w("#js-canvas",y),L=(e="#js-tabs button",(t=(y||document).querySelectorAll(e)).length?[...t]:(v.log("findAll: nothing found using selector: "+e),[])),S=w("#js-controls",y);y.insertBefore(this.search.getNode(),b),S.appendChild(this.logsButton.node),S.appendChild(this.refreshButton.node),S.appendChild(this.closeButton.node),this.node=y,this.canvas=b,L.forEach((e=>{var t=e.dataset.id;this.tabs.set(t,e),e.addEventListener("click",(()=>{this.getCurrentCategoryId()!==t&&this.emit("TAB_CLICKED",t),this.selectCategory(t)}))})),this.refreshButton.on("CLICK",(()=>{this.message("Trwa pobieranie danych..."),this.emit("REFRESH")})),this.closeButton.on("CLICK",(()=>this.hide())),b.addEventListener("mousewheel",(e=>e.stopPropagation()),{passive:!0}),this.logsButton.on("CLICK",(()=>this.emit("SHOW_LOGS"))),this.appContainer.appendChild(y),this.selectCategory(E.elite2),s=y,a=!1,h=0,l=0,c=e=>{e.stopPropagation(),"touchstart"===e.type?(n=e.touches[0].clientX-h,o=e.touches[0].clientY-l):(n=e.clientX-h,o=e.clientY-l),a=!0},d=e=>{e.stopPropagation(),n=i,o=r,a=!1},u=e=>{a&&(e.preventDefault(),e.stopPropagation(),"touchmove"===e.type?(i=e.touches[0].clientX-n,r=e.touches[0].clientY-o):(i=e.clientX-n,r=e.clientY-o),h=i,l=r,g(i,r,s))},g=(e,t,s)=>{s.style.transform="translate3d("+e+"px, "+t+"px, 0)"},(m=S||s).addEventListener("touchstart",c,!1),m.addEventListener("touchend",d,!1),m.addEventListener("touchmove",u,!1),m.addEventListener("mousedown",c,!1),m.addEventListener("mouseup",d,!1),m.addEventListener("mousemove",u,!1),this.isRendered=!0}hide(){var e;this.isVisible=!1,this.node.classList.remove(X),null==(e=this.modal)||e.close()}show(){this.isRendered||this.render(),this.isVisible=!0,this.undim(),this.node.classList.add(X),this.search.focus(),this.emit("SHOW_ADDON")}dim(){this.node.classList.add(ee)}undim(){this.node.classList.remove(ee)}message(e){this.canvas.innerHTML=e}renderEntries(e){this.canvas.innerHTML=e.map((e=>e.toString())).join("")}getCurrentCategoryId(){if(this.currentCategory)return this.currentCategory.dataset.id}handleNotifications(e){this.launcher.setNotificationsCount(e),this.logsButton.setLabel(""+e),this.logsButton.setClass(Q)}displayLogs(e){if(!this.modal){var t=new j({label:"Zamknij"}),s=new P({containerRef:this.window.document.body});t.on("CLICK",(()=>{this.modal.close(),this.undim()})),s.setTitle("Logi dodatku (v2.8.0)"),s.setControls([t.node]),this.modal=s}this.dim(),this.modal.setContentMarkup(e.map((e=>new M(e).toString())).join("")),this.modal.open(),this.launcher.setNotificationsCount(0),this.logsButton.setLabel("i"),this.logsButton.removeClass(Q)}unselectCurrentCategory(){this.currentCategory&&(this.currentCategory.classList.remove($),this.currentCategory=void 0)}selectCategory(e){if(this.getCurrentCategoryId()!==e&&(this.unselectCurrentCategory(),e)){var t=this.tabs.get(e);t.classList.add($),this.currentCategory=t}}getSearchValue(){return this.search.getValue()}}({targetWindow:ae,appContainerRef:ae.document.body});new class{constructor(e,t,s){this.model=e,this.view=t,this.gameDataProcessor=s.gameDataProcessor,this.logger=s.logger,this.notificationsManager=s.notificationsManager,this.window=s.targetWindow,t.on("SHOW_ADDON",(()=>this.fetch())),t.on("SEARCH",(e=>{if(!e){var t=E.elite2;return this.view.selectCategory(t),void this.renderEntries(t)}this.view.selectCategory(void 0),this.handleSearch(e)})),e.on("DATA",(()=>this.renderEntries(t.getCurrentCategoryId()))),e.on("ERROR",(e=>t.message(e))),t.on("REFRESH",(()=>e.download(!0))),t.on("TAB_CLICKED",(e=>this.renderEntries(e))),t.on("SHOW_LOGS",(()=>{t.displayLogs(this.logger.getAll()),this.notificationsManager.resetCounter()})),this.gameDataProcessor.on("LOOT",(t=>e.upload("/loots",t))),this.gameDataProcessor.on("KILL",(t=>e.upload("/kills",t))),this.notificationsManager.on("NEW",(e=>t.handleNotifications(e)))}renderEntries(e){var t=this.view.getSearchValue();if(t)return this.handleSearch(t,e);var s=this.model.getByCategory(e||E.elite2);if(!s.length)return this.view.message("Na świecie "+T(this.window)+" nie zapisano jeszcze ubić z tej kategorii.");this.view.renderEntries(s.map(re))}handleSearch(e,t){var s=this.model.search(e.toLowerCase(),t);if(!s.length)return this.view.message("Nie znaleziono ubić pasujących do wyszukiwania.");this.view.renderEntries(s.map(re))}fetch(){var e,t=this;return(e=function*(){t.model.hasCache()||(yield t.model.download())},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){se(n,i,r,o,a,"next",e)}function a(e){se(n,i,r,o,a,"throw",e)}o(void 0)}))})()}}(ge,me,{logger:he,targetWindow:ae,gameDataProcessor:new class extends s{constructor(e){super(),this.framework=e.framework,this.logger=e.logger,this.store=e.store,this.window=e.targetWindow,this.errorReporter=e.errorReporter,this.framework.on("BATTLE_START",(e=>this.handleBattleStart(e))),this.framework.on("NEW_FIGHTERS",(e=>this.handleFighters(e))),this.framework.on("FIGHTERS_DATA_UPDATE",(e=>this.handleFightersDataUpdate(e))),this.framework.on("BATTLE_LOG_ITEM",(e=>this.handleBattleLogItem(e))),this.framework.on("LOOTS",(e=>this.handleLoots(e))),this.framework.on("NPC_DELETED",(e=>this.handleNpcDeleted(e)))}handleBattleStart(e){this.resetStorageItems(),this.resetStorageNpc()}handleFighters(e){var t,s,i,r,n,{fighters:o}=e;(i=(t=o,s=new Map,t.forEach(((e,t)=>{e.npc&&s.set(t,e)})),s),r=b(this.window),n=[],i.forEach(((e,t)=>{var s=e.originalId||t,i={id:Math.abs(Number(s)),icon:e.icon,name:e.name,lvl:e.lvl,category:U(C(e.wt,r))};n=[...n,i]})),n).forEach((e=>this.registerNpc(e)))}handleFightersDataUpdate(e){var t,s,{fighters:i}=e;this.getAllRegisteredNpc().length||((e,t,s)=>{var i=[];return e.forEach(((e,r)=>{var n=Math.abs(Number(r)),o=N(n,s);if(o){var a={id:n,icon:o.icon,name:o.name,lvl:o.lvl,category:U(C(o.wt,t))};i=[...i,a]}})),i})((t=i,s=new Map,t.forEach(((e,t)=>{t<0&&s.set(t,e)})),s),b(this.window),this.window).forEach((e=>this.registerNpc(e)))}handleBattleLogItem(e){var{npcName:t,items:s,rawResponse:i}=e;if(this.logger.log('Loot z logu walki "'+s.join(", ")+'" z NPC: "'+t+'"'),!this.getAllRegisteredNpc().some((e=>e.name===t)))return this.logger.report('Zdobyto loot "'+s.join(", ")+'" z niezarejestrowanego NPC: "'+t+'"'),void this.errorReporter.report(JSON.stringify(i));s.forEach((e=>{this.logger.log('Persystencja dla itema z logu walki "'+e+'" z NPC "'+t+'"'),this.store.add(F,{itemName:e,npcName:t})}))}handleNpcDeleted(e){var{npcId:t}=e,s=N(t,this.window);if(s){var i=this.getRegisteredNpcById(s.id);i&&x(i.category)&&this.emit("KILL",{npc:i})}}handleLoots(e){var{items:t,rawResponse:s}=e,i=(e=>e.map((e=>({name:e.name,rank:S(e.stat),stats:e.stat}))))(t).filter((e=>(this.logger.log('Zdobyto item "'+e.name+'" - '+(e=>{switch(e){case g.common:return"zwykły";case g.unique:return"unikat";case g.heroic:return"heroik";case g.legendary:return"legendarny"}})(e.rank)),this.logger.log('Statsy "'+e.name+'": "'+e.stats+'"'),e.rank>=g.unique)));i.length&&(i.forEach((()=>{})),this.getAllRegisteredNpc().length?this.isEveryItemInStorage(i,s)&&this.applyLootsToNpc(i):this.logger.log("Loot kwalifikujący się do zapisu, ale brak zarejestrowanych NPC."))}applyLootsToNpc(e){var t=this.getAllRegisteredNpc(),s=this.store.get(F),i=[];t.forEach((t=>{if(x(t.category)){if(!i.includes(t.name)){i.push(t.name);var r=e.filter((e=>{var i=s.find((t=>t.itemName===e.name));return!!i&&t.name===i.npcName})),n=this.countItemTypes(r);this.logger.log('Zapis lootu "'+JSON.stringify(n)+'" dla NPC "'+t.name+'"'),this.emit("LOOT",{npc:t,loots:n})}}else this.logger.log("Ubity NPC ze zbyt niską rangą ("+t.category+'): "'+t.name+'"')}))}countItemTypes(e){var t={[g.unique]:0,[g.heroic]:0,[g.legendary]:0};return e.forEach((e=>{var{rank:s}=e;s<g.unique||(t[s]+=1)})),t}isEveryItemInStorage(e,t){var s=this.store.get(F);return s&&s.length?e.every((e=>!!s.some((t=>t.itemName===e.name))||(this.logger.report('Brak persystencji dla itema z logu walki: "'+e.name+'"'),this.errorReporter.report(JSON.stringify(t)),!1))):(this.logger.report("Brak persystencji dla lootu z logu walki."),this.errorReporter.report(JSON.stringify(t)),!1)}resetStorageItems(){this.store.remove(F)}resetStorageNpc(){this.store.remove(G)}registerNpc(e){this.logger.log('Zarejestrowano NPC o kategorii "'+e.category+'": "'+e.name+'"'),this.store.add(G,e)}getAllRegisteredNpc(){return this.store.get(G)||[]}getRegisteredNpcById(e){return this.getAllRegisteredNpc().find((t=>t.id===e))}}({framework:de,logger:he,store:ue,targetWindow:ae,errorReporter:ce}),notificationsManager:new class extends s{constructor(e){super(),this.counter=0,this.logger=e,this.logger.on("ERROR",(()=>{this.counter+=1,this.emit("NEW",this.counter)}))}resetCounter(){this.counter=0}}(he)});var ve=new class{constructor(e){this.logger=e.logger,this.addonClassName=e.addonClassName,this.window=e.targetWindow}check(){this.window.document.getElementsByClassName(this.addonClassName).length>1&&this.logger.error("Wykryto, że Licznik Ubić jest zainstalowany dwukrotnie. Usuń jeden z nich, aby dane zapisywały się poprawnie.")}}({logger:he,targetWindow:ae,addonClassName:t});setTimeout((()=>ve.check()),1e3*(3,15,Math.floor(13*Math.random()+3))),new class{constructor(e){this.httpService=e.httpService,this.store=e.store,this.checkInterval=e.checkInterval}checkForUpdates(){var e,t=this;return(e=function*(){var e="lastChecked",s=t.store.get(e)||0;if(!(Date.now()-s<t.checkInterval))try{var{version:i}=yield t.httpService.get("/latest-addon-version");t.store.set("version",i),t.store.set(e,Date.now())}catch(e){}},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){H(n,i,r,o,a,"next",e)}function a(e){H(n,i,r,o,a,"throw",e)}o(void 0)}))})()}}({httpService:le,store:Z("ga-universal-counter-version",he),checkInterval:36e5}).checkForUpdates()})();