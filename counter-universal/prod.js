(()=>{"use strict";class e{constructor(){this.events={}}on(e,t){return this.subscribe(e,t),this}emit(e,t){return this.getListeners(e).forEach((e=>e.call(null,t))),this}getListeners(e){return this.events[e]||[]}subscribe(e,t){var r=[...this.getListeners(e),t];return this.events[e]=r,this}off(e,t){var r=this.getListeners(e).filter((e=>e!==t));return this.events[e]=r,this}offAll(e){return delete this.events[e],this}}var t,r,{assign:s,entries:i}=Object,n=i,a=(Array.isArray,Number.isNaN,e=>typeof e),o=e=>"undefined"!==a(e),l=e=>"object"===a(e)&&!!e,h=e=>l(e)?new Map(n(e)):new Map,c=()=>{var{map:e,g:t,_g:r,Engine:s}=window;return o(r)&&o(t)&&o(e)&&!o(s)};!function(e){e[e.common=0]="common",e[e.unique=1]="unique",e[e.heroic=2]="heroic",e[e.legendary=3]="legendary"}(t||(t={})),function(e){e[e.common=0]="common",e[e.elite=1]="elite",e[e.elite2=2]="elite2",e[e.elite3=3]="elite3",e[e.hero=4]="hero",e[e.titan=5]="titan",e[e.colossus=6]="colossus"}(r||(r={}));var u=e=>{if("string"!=typeof e)throw new Error("item stats must be of type string");return e.match(";unique")||e.match("unique;")?t.unique:e.match(";heroic")||e.match("heroic;")?t.heroic:e.match(";legendary")||e.match("legendary;")?t.legendary:t.common},d=(e,t)=>4===e.type?r.common:e.wt>99?5===(null==t?void 0:t.mode)?r.colossus:r.titan:e.wt>79?r.hero:e.wt>29||e.wt>19?r.elite2:e.wt>9?r.elite:r.common,v=(e,t)=>{var r=e.icon.match(/([a-zA-Z0-9-_]{1,10}\/[a-zA-Z0-9_-]{1,50}\.gif)$/);return{name:e.nick,id:Number.parseInt(e.id),icon:r?r[0]:"",lvl:e.lvl,rank:d(e,t),x:e.x,y:e.y}},g=e=>({name:e.name,mode:e.mode}),m=()=>{var{Engine:e,map:t}=window;return c()?g(t):g(e.map.d)},f=e=>{var{g:t,Engine:r}=window;if(!e)return null;if(c()){var s,i=null==t||null==(s=t.npc)?void 0:s[e];return i?v(i,m()):null}var n=r.npcs.getById(Number(e));return n?v(n.d,m()):null};class p{constructor(e){this.key="GA: "+e}newError(e){var t=this.buildMessage(e);return p.emitter.emit("ERROR",t),new Error(t)}log(e){var t=this.buildMessage(e);console.log(t),p.emitter.emit("LOG",t)}error(e){var t=this.buildMessage(e);console.error(t),p.emitter.emit("ERROR",t)}buildMessage(e){return this.key+": "+e}}p.emitter=new e;var w=new p("html-utils"),y=e=>{var t=document.createElement("template");if(t.innerHTML=e.trim(),!t.content.firstElementChild)throw w.newError("createElement('"+e+"'): child is null");return t.content.firstElementChild},b=(e,t)=>{var r=(t||document).querySelector(e);if(r)return r;throw w.newError("find: nothing found using selector: "+e)},{location:E}=window,R=()=>E.host.split(".")[0],L=()=>{var e,t,{hero:r,Engine:s}=window;return c()?null==r?void 0:r.account:null==s||null==(e=s.hero)||null==(t=e.d)?void 0:t.account};class I extends e{constructor(e){super(),this.chatQueue=[],this.isBattle=!1,this.currentBattleUniqueId="",this.window=e,this.intercept()}pushChatMessage(e){this.chatQueue.push(e)}injectChatMessages(e){for(var t=1,r=Object.assign({},e,{c:e.c||{}}),s=Object.keys(r.c).length;this.chatQueue.length;){var i=this.chatQueue.shift(),n=e.ev+t,a=Object.assign({},i,{ts:n});r=Object.assign({},r,{c:Object.assign({},r.c,{[s]:a})}),s+=1,t+=1}return r}searchForBattleLogItems(e,t){var r=e.substring(8),s=": zdobyto ",i=r.includes(s)?s:": looted ",[n,a]=r.split(i);if(a){var o=a.split(", ");this.emit("BATTLE_LOG_ITEM",{items:o,npcName:n,battleId:this.currentBattleUniqueId,rawResponse:t})}}generateBattleUniqueId(){this.currentBattleUniqueId=btoa(""+Date.now()).substring(0,15)}challenge(e){this.emit("RAW_RESPONSE",{rawResponse:e}),l(e.f)&&e.f&&this.handleBattle(e.f,e),e.item&&e.loot&&l(e.item)&&l(e.loot)&&this.handleItems(e.item,e.loot,e),e.loot&&l(e.loot)&&this.handleLoot(e.loot,e),e.c&&l(e.c)&&this.handleChatMessages(e.c,e),e.npc&&l(e.npc)&&this.handleNpcs(e.npc,e),e.other&&l(e.other)&&this.handleOtherPlayers(e.other,e)}handleBattle(e,t){e.init&&(this.isBattle=!0,this.generateBattleUniqueId(),this.emit("BATTLE_START",{battleId:this.currentBattleUniqueId,rawResponse:t}));var r=new Map,s=new Map;if(e.w&&l(e.w)&&h(e.w).forEach(((e,i)=>{var n=Number(i);e.name?(r.set(n,e),this.emit("NEW_FIGHTER",{fighter:e,fighterId:n,battleId:this.currentBattleUniqueId,rawResponse:t})):(s.set(n,e),this.emit("FIGHTER_DATA_UPDATE",{fighter:e,fighterId:i,battleId:this.currentBattleUniqueId,rawResponse:t}),0===e.hpp&&this.emit("FIGHTER_KILLED",{fighter:e,fighterId:i,battleId:this.currentBattleUniqueId,rawResponse:t}))})),r.size&&this.emit("NEW_FIGHTERS",{fighters:r,battleId:this.currentBattleUniqueId,rawResponse:t}),s.size&&this.emit("FIGHTERS_DATA_UPDATE",{fighters:s,battleId:this.currentBattleUniqueId,rawResponse:t}),l(e.m)&&e.m){var i=e.m.reduce(((r,s,i)=>{if(l(e.mi)&&e.mi){s.startsWith("0;0;txt=")&&this.searchForBattleLogItems(s,t);var n=Number(e.mi[i]);return r.set(n,s)}return r}),new Map);this.emit("BATTLE_LOGS",{logs:i,battleId:this.currentBattleUniqueId,rawResponse:t})}this.isBattle&&-1===e.move&&(this.isBattle=!1,setTimeout((()=>this.emit("BATTLE_END",{battle:e,battleId:this.currentBattleUniqueId,rawResponse:t})),0))}handleItems(e,t,r){var s,i=[];(s=e,l(s)?n(s).map((e=>{var[,t]=e;return t})):[]).forEach((e=>{"l"!==e.loc&&"k"!==e.loc||"dialog"!==t.source&&(this.emit("LOOT",{item:e,lootDetails:t,rawResponse:r}),i=[...i,e])})),i.length&&this.emit("LOOTS",{items:i,lootDetails:t,rawResponse:r})}handleLoot(e,t){(e.states||e.timer||e.init)&&this.emit("LOOTS_SEND",{rawResponse:t})}handleChatMessages(e,t){h(e).forEach((e=>{this.emit("CHAT_MESSAGE",{chatMessage:e,rawResponse:t})}))}handleNpcs(e,t){h(e).forEach(((e,r)=>{e.del?this.emit("NPC_DELETED",{npcId:Math.abs(Number(r)),rawResponse:t}):e.nick&&this.emit("NEW_NPC",{npcData:e,rawResponse:t})}))}handleOtherPlayers(e,t){var r=[];h(e).forEach(((e,t)=>{e.nick&&(r=[...r,Object.assign({},e,{id:Number(t)})])})),r.length&&this.emit("NEW_PLAYERS_ON_MAP",{newPlayers:r,rawResponse:t})}intercept(){var e;if(c())e=this.window;else{if(!this.window.Engine||!this.window.Engine.communication)return void setTimeout(this.intercept);e=this.window.Engine.communication}"function"==typeof e.successData?(e.oldSuccessData=e.successData,e.successData=t=>{var r=JSON.parse(t),s=!1;if("object"==typeof r&&r){var i=Object.keys(r).length;if(this.chatQueue.length)for(var n in this.chatQueue)s=!0,this.chatQueue[n].ts=r.ev+1,this.injectChatMessages(r);i>=3&&(3!==i||!(r.h||r.js||r.event_done))&&this.challenge(r)}s?(s=!1,e.oldSuccessData(JSON.stringify(r))):e.oldSuccessData(t)}):setTimeout(this.intercept,100)}}var S="2.2.0";function C(e,t,r,s,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void r(e)}o.done?t(l):Promise.resolve(l).then(s,i)}var T=new class{constructor(e,t){this.apiUrl=e,this.options=Object.assign({timeout:1e4,credentials:"include",mode:"cors",headers:{"access-control-request-headers":"content-type","content-type":"application/json;charset=utf-8"}},t||{})}post(e,t){var r=JSON.stringify(t);return this.request("post",e,r)}get(e){return this.request("get",e)}request(e,t,r){var s,i=this;return(s=function*(){var s,n=i.apiUrl+t,a=Object.assign({},i.options,{method:e,body:r}),o=yield fetch(n,a);if("function"==typeof o.json&&(s=yield o.json()),!s)throw"Request failed "+e.toUpperCase()+":"+n;if(s.error&&s.message)throw s.message;return s},function(){var e=this,t=arguments;return new Promise((function(r,i){var n=s.apply(e,t);function a(e){C(n,r,i,a,o,"next",e)}function o(e){C(n,r,i,a,o,"throw",e)}a(void 0)}))})()}}("https://counter-service.grooove.pl/api"),A=new p("universal-counter");p.emitter.on("ERROR",(e=>{T.post("/reports",{error:e,margonemInterface:c()?"si":"ni",addonVersion:S})}));var B,_,O=A;!function(e){e.elite="elite",e.elite2="elite2",e.hero="hero",e.titan="titan",e.colossus="colossus",e.event="event",e.other="other"}(B||(B={})),function(e){e.elite="Elity",e.elite2="Elity II",e.hero="Herosi",e.titan="Tytani",e.colossus="Kolosi",e.event="Eventowe",e.other="Inne"}(_||(_={}));var N=e=>e>=r.elite,D=e=>{switch(e){case r.elite:return B.elite;case r.elite2:return B.elite2;case r.hero:return B.hero;case r.titan:return B.titan;case r.colossus:return B.colossus;default:return B.other}},j="bosses",k="item-names-from-battle-log";function P(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var s=r.call(e,t);if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return"symbol"==typeof t?t:String(t)}class M{constructor(e){this.store={},this.logger=new p("LocalStorageService"),this.isLocalStorageAvailable=M.isLocalStorageAvailable(),this.mainKey=e,this.recreateStore()}set(e,t){var r=(e=>{switch(typeof e){case"string":case"number":case"boolean":return null;case"object":if(Array.isArray(e))return e.filter(Boolean).length===e.length?null:"array includes falsy values"}return"incorrect value type ("+e+", "+typeof e+")"})(t);r?this.logger.log("set("+e+"): "+r):(this.store[e]=t,this.save())}get(e){return this.store[e]||null}remove(e){var t=function(e,t){if(null==e)return{};var r,s,i={},n=Object.keys(e);for(s=0;s<n.length;s++)r=n[s],t.indexOf(r)>=0||(i[r]=e[r]);return i}(this.store,[e].map(P));this.replaceStore(t)}replaceStore(e){this.store=e,this.save()}prepareDataForSave(){try{return JSON.stringify(this.store)}catch(e){return this.logger.log("prepareDataForSave(): "+e),"{}"}}save(){this.isLocalStorageAvailable&&localStorage.setItem(this.mainKey,this.prepareDataForSave())}recreateStore(){this.isLocalStorageAvailable?this.store=this.getSavedLocalStorageData():this.logger.log("localStorage is disabled or unavailable")}getSavedLocalStorageData(){var e={},t=window.localStorage;try{var r=t.getItem(this.mainKey);return r?JSON.parse(r):e}catch(t){return this.logger.log("getSavedLocalStorageData(): "+t),e}}static isLocalStorageAvailable(){var e=window.localStorage,t="LSTestKey",r="LSTestValue";try{if(e.setItem(t,r),e.getItem(t)===r)return localStorage.removeItem(t),!0}catch(e){return!1}return!1}}class z extends M{add(e,t){var r=this.get(e);r?Array.isArray(r)?this.set(e,[...r,t]):this.logger.log("add("+e+"): target is not an array"):this.set(e,[t])}removeEvery(e,t){var r=this.get(t);if(r)if(Array.isArray(r)){var s=r.filter((t=>JSON.stringify(t)!==JSON.stringify(e)));0!==s.length?this.set(t,s):this.remove(t)}else this.logger.log("removeEvery("+e+", "+t+"): target is not an array");else this.logger.log("removeEvery("+e+", "+t+"): target does not exist")}removeKeysByPattern(e){Object.keys(this.store).forEach((t=>{t.startsWith(e)&&this.remove(t)}))}}var q=new z("ga-universal-counter");function U(e,t,r,s,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void r(e)}o.done?t(l):Promise.resolve(l).then(s,i)}var x="ga-universal-counter-version",H=new z(x),F=new class{checkForUpdates(){return(e=function*(){var e=H.get(x);if(!(e&&Date.now()-e.lastChecked<36e5))try{var t=yield T.get("/latest-addon-version"),{version:r}=t;H.set("version",r),H.set("lastChecked",Date.now())}catch(e){}},function(){var t=this,r=arguments;return new Promise((function(s,i){var n=e.apply(t,r);function a(e){U(n,s,i,a,o,"next",e)}function o(e){U(n,s,i,a,o,"throw",e)}a(void 0)}))})();var e}},G="ga-uc-search";class K extends e{constructor(){super(),this.nodeRef=null,this.render()}render(){this.nodeRef=y('<input id="ga-uc-search" class="_1rqarav0" placeholder="Wyszukaj..." type="text">'),this.nodeRef.addEventListener("input",(()=>this.emit("INPUT",this.getValue())))}getValue(){return this.nodeRef.value}focus(){this.nodeRef.focus()}getNodeRef(){return this.nodeRef}}function W(e,t,r,s,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void r(e)}o.done?t(l):Promise.resolve(l).then(s,i)}function V(e){return function(){var t=this,r=arguments;return new Promise((function(s,i){var n=e.apply(t,r);function a(e){W(n,s,i,a,o,"next",e)}function o(e){W(n,s,i,a,o,"throw",e)}a(void 0)}))}}class J{constructor(e){this.label=e.label,this.id=e.id,this.data=e.data}render(){var e,t,r,s=(e=this.label,'<button type="button" '+((t=this.id)?'id="'+t+'"':"")+' class="_1801x7x0" '+((r=this.data)?r.map((e=>{var[t,r]=e;return"data-"+t+'="'+r+'"'})).join(" "):"")+">"+e+"</>");return y(s)}toString(){return this.render().outerHTML}}var Q=[{id:B.elite,label:_.elite},{id:B.elite2,label:_.elite2},{id:B.hero,label:_.hero},{id:B.titan,label:_.titan},{id:B.colossus,label:_.colossus},{id:B.event,label:_.event},{id:B.other,label:_.other}],Z="is-visible",Y="is-active";class $ extends e{constructor(e){super(),this.containerRef=e.containerRef,this.tip=e.tip,this.render()}render(){var e=' <div class="_1ol33ot0'+(c()?" is-si":"")+'">L</div>',t=y(e);t.addEventListener("click",(()=>this.emit("LAUNCHER_CLICKED"))),t.addEventListener("mouseenter",(()=>this.tip.show(t,"Licznik Ubić by Groove Armada v2.2.0<br>Skrót: SHIFT + L"))),t.addEventListener("mouseleave",(()=>this.tip.hide())),this.containerRef.appendChild(t)}}class X{constructor(e){this.props=e}render(){var e,r,s=(r=(e=this.props).npc.icon?'<img class="_1rnrz0u4" src="'+e.npc.icon+'">':"",' <div class="_1rnrz0u0"> <div class="_1rnrz0u1">'+e.npc.name+'</div> <div class="_1rnrz0u2"> <p>Ubić: <b class="_1rnrz0u5">'+e.stats.kills+'</b></p> <p>Looty unikatowe: <b class="_1rnrz0u6">'+e.stats.loots[t.unique]+'</b></p> <p>Looty heroiczne: <b class="_1rnrz0u7">'+e.stats.loots[t.heroic]+'</b></p> <p>Looty legendarne: <b class="_1rnrz0u8">'+e.stats.loots[t.legendary]+"</b></p> <p>Liczone od: <b>"+e.stats.trackedSince+'</b></p> </div> <div class="_1rnrz0u3"> '+r+" </div> </div> ");return y(s)}toString(){return this.render().outerHTML}}var ee="y8udqv1";class te{constructor(e){this.containerRef=e.containerRef,this.nodeRef=this.render()}render(){var e=y('<div class="y8udqv0"></div>');return this.containerRef.appendChild(e),e}setContent(e){this.nodeRef.innerHTML=e}show(e,t){this.setContent(t),this.setPosition(this.calculatePosition(e)),this.nodeRef.classList.add(ee)}hide(){this.nodeRef.classList.remove(ee)}setPosition(e){this.nodeRef.style.left=e.left+"px",this.nodeRef.style.top=e.top+"px"}calculatePosition(e){var t=e.getBoundingClientRect(),r=t.top,{innerHeight:s}=window,i=Math.floor(s/2),n=document.body.clientWidth,a=Math.floor(n/2),o=e.clientHeight,l=e.clientWidth,h=t.left,c=n-h-l,u=Math.floor(l/2),d=Math.floor(this.nodeRef.clientWidth/2),v=this.nodeRef.clientHeight,g=this.nodeRef.clientWidth;return{top:r<=i&&r<v+3+5?r+3+o+5:r-v-3-5,left:l>=g?h+u-d:h+u>a?c<d-u-10?n-g-10:h+u-d:h+u-d<10?10:h+u-d}}}function re(e,t,r,s,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void r(e)}o.done?t(l):Promise.resolve(l).then(s,i)}var se=(e=>{var t="GAFramework v1.0.0";return e.GAServices=e.GAServices||new Map,e.GAServices.get(t)||e.GAServices.set(t,new I(e)),e.GAServices.get(t)})(window),ie=new class extends e{constructor(){super(...arguments),this.cache=[]}hasCache(){return this.cache.length>0}download(){var e=this;return V((function*(){try{var t="?world="+R()+"&userMargonemId="+L()+"&addonVersion="+S,r=yield T.get("/kills"+t);e.cache=r.entries,e.emit("DATA_FETCHED")}catch(t){var s="Nie udało się pobrać danych o ubiciach z serwera: "+t;e.emit("ERROR",s)}}))()}upload(e,t){return V((function*(){try{yield T.post(e,Object.assign({},t,{world:R(),userMargonemId:L(),addonVersion:S}))}catch(t){O.log("Nie udało się zapisać ubicia ("+e+") na serwerze: "+t)}}))()}getByCategory(e){return this.cache.filter((t=>t.npc.category===e))}search(e,t){return(t?this.getByCategory(t):this.cache).filter((t=>t.npc.name.toLowerCase().includes(e)))}},ne=new class extends e{constructor(e){super(),this.isVisible=!1,this.isRendered=!1,this.currentCategory=null,this.containerElement=null,this.canvasRef=null,this.appContainerRef=e.appContainerRef,this.tabsRef=new Map}render(e){var t,r,s=' <div class="bcizgm0"> <div class="bcizgm1" id="js-canvas"> Trwa pobieranie danych... </div> <div class="bcizgm2" id="js-tabs"> '+Q.map((e=>new J({label:e.label,data:[["id",e.id]]}))).join("")+' </div> <div class="bcizgm3" > '+new J({label:"Odśwież",id:"js-refresh"})+" "+new J({label:"Zamknij",id:"js-close"})+" </div> </div>",i=y(s),n=b("#js-canvas",i),a=b("#js-close",i),o=b("#js-refresh",i),l=(t="#js-tabs button",(r=(i||document).querySelectorAll(t)).length?[...r]:(w.log("findAll: nothing found using selector: "+t),[]));i.insertBefore(e.getNodeRef(),n),this.containerElement=i,this.canvasRef=n,l.forEach((e=>{var t=e.dataset.id;this.tabsRef.set(t,e),e.addEventListener("click",(()=>{this.getCurrentCategoryId()!==t&&this.emit("TAB_CLICKED",t),this.selectCategory(t)}))})),o.addEventListener("click",(()=>this.emit("REFRESH_BUTTON_CLICKED"))),a.addEventListener("click",(()=>this.hide())),n.addEventListener("mousewheel",(e=>e.stopPropagation())),this.appContainerRef.appendChild(i),this.selectCategory(B.elite2),this.isRendered=!0}hide(){this.isVisible=!1,this.containerElement.classList.remove(Z)}show(){this.isVisible=!0,this.containerElement.classList.add(Z)}message(e){this.canvasRef.innerText=e}renderEntries(e){this.canvasRef.innerHTML=e.map((e=>e.toString())).join("")}getCurrentCategoryId(){return this.currentCategory?this.currentCategory.dataset.id:null}unselectCurrentCategory(){this.currentCategory&&(this.currentCategory.classList.remove(Y),this.currentCategory=null)}selectCategory(e){if(this.getCurrentCategoryId()!==e&&(this.unselectCurrentCategory(),e)){var t=this.tabsRef.get(e);t.classList.add(Y),this.currentCategory=t}}}({appContainerRef:window.document.body});new class{constructor(e,t,r){var s;this.model=e,this.view=t,this.window=r.window,this.gameDataProcessor=r.gameDataProcessor,F.checkForUpdates(),s=()=>{if(this.view.isVisible)return this.view.hide();this.show()},document.addEventListener("keydown",(e=>{var t=e.target;"l"!==e.key.toLowerCase()||!e.shiftKey||["input","textarea"].includes(t.localName)&&t.id!==G||(e.stopPropagation(),e.preventDefault(),s())})),this.tip=new te({containerRef:this.window.document.body}),this.launcher=new $({containerRef:b(c()?"#centerbox":".game-layer"),tip:this.tip}),this.search=new K,this.launcher.on("LAUNCHER_CLICKED",(()=>this.show())),this.search.on("INPUT",(e=>{if(!e){var t=B.elite2;return this.view.selectCategory(t),void this.renderEntries(t)}this.view.selectCategory(null),this.handlePhrase(e)})),e.on("DATA_FETCHED",(()=>this.renderEntries(t.getCurrentCategoryId()||B.elite2))),e.on("ERROR",(e=>t.message(e))),t.on("REFRESH_BUTTON_CLICKED",(()=>e.download())),t.on("TAB_CLICKED",(e=>{var t=this.search.getValue();if(!t)return this.renderEntries(e);this.handlePhrase(t,e)})),this.gameDataProcessor.on("LOOT",(t=>e.upload("/loots",t))),this.gameDataProcessor.on("KILL",(t=>e.upload("/kills",t)))}renderEntries(e){var t=this.model.getByCategory(e).map((e=>new X(e)));if(!t.length)return this.view.message("Na świecie "+R()+" nie zapisano jeszcze ubić z tej kategorii.");this.view.renderEntries(t)}handlePhrase(e,t){var r=this.model.search(e.toLowerCase(),t);if(!r.length)return this.view.message("Nie znaleziono ubić pasujących do wyszukiwania.");this.view.renderEntries(r.map((e=>new X(e))))}show(){var e,t=this;return(e=function*(){t.view.isRendered||t.view.render(t.search),t.view.show(),t.search.focus(),t.model.hasCache()||(yield t.model.download())},function(){var t=this,r=arguments;return new Promise((function(s,i){var n=e.apply(t,r);function a(e){re(n,s,i,a,o,"next",e)}function o(e){re(n,s,i,a,o,"throw",e)}a(void 0)}))})()}}(ie,ne,{window,gameDataProcessor:new class extends e{constructor(e){super(),this.isBattleRefreshed=!1,e.on("BATTLE_START",(e=>this.handleBattleStart(e))),e.on("NEW_FIGHTERS",(e=>this.handleFighters(e))),e.on("BATTLE_LOG_ITEM",(e=>this.handleBattleLogItem(e))),e.on("LOOTS",(e=>this.handleLoots(e))),e.on("NPC_DELETED",(e=>this.handleNpcDeleted(e)))}handleBattleStart(e){var t;this.isBattleRefreshed=void 0!==(t=e.rawResponse).f&&void 0!==t.matchmaking_state,this.resetStorageItems(),this.isBattleRefreshed||this.resetStorage()}handleFighters(e){var t,r,{fighters:s}=e,i=(e=>{var t=[];return e.forEach(((e,r)=>{var s=Math.abs(Number(r)),i=f(s);if(i&&N(i.rank)){var n={id:s,icon:i.icon,name:i.name,lvl:i.lvl,category:D(i.rank)};t=[...t,n]}})),t})((t=s,r=new Map,t.forEach(((e,t)=>{e.npc&&r.set(t,e)})),r));this.isBattleRefreshed&&this.getAllRegisteredBosses()||i.forEach((e=>this.registerBoss(e)))}handleBattleLogItem(e){var{npcName:t,items:r}=e;this.getAllRegisteredBosses().some((e=>e.name===t))&&r.forEach((e=>{q.add(k,e)}))}handleNpcDeleted(e){var{npcId:t}=e,r=f(t);if(!r)return O.log("Could not find deleted NPC");if(N(r.rank)){var s=this.getRegisteredBoss(r.id);s&&this.emit("KILL",{npc:s})}}handleLoots(e){var{items:r}=e,s=(e=>e.map((e=>({name:e.name,rank:u(e.stat)}))))(r).filter((e=>e.rank>=t.unique));s.length&&this.isEveryItemInStorage(s)&&this.applyLootsToEveryBoss(s)}applyLootsToEveryBoss(e){var t=this.getAllRegisteredBosses(),r=this.countItemTypes(e),s=[],i=[];t.forEach((e=>{i.includes(e.name)||(i.push(e.name),s.push(e))})),s.forEach((e=>{this.emit("LOOT",{npc:e,loots:r})}))}countItemTypes(e){var r={[t.unique]:0,[t.heroic]:0,[t.legendary]:0};return e.forEach((e=>{var{rank:t}=e;t<1||(r[t]+=1)})),r}isEveryItemInStorage(e){var t,r=q.get(k);if(!r||!r.length)return!1;for(var s=[...e];t=s.shift();){var{name:i}=t,n=r.indexOf(i);if(-1===n)return!1;r=r.slice(n,1)}return!0}resetStorageItems(){q.remove(k)}resetStorage(){q.remove(j)}registerBoss(e){q.add(j,e)}getAllRegisteredBosses(){return q.get(j)||[]}getRegisteredBoss(e){return this.getAllRegisteredBosses().find((t=>t.id===e))}}(se)})})();