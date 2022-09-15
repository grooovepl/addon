(()=>{"use strict";class e{constructor(){this.events={}}on(e,t){return this.subscribe(e,t),this}emit(e,t){return this.getListeners(e).forEach((e=>e.call(null,t))),this}getListeners(e){return this.events[e]||[]}subscribe(e,t){var s=[...this.getListeners(e),t];return this.events[e]=s,this}off(e,t){var s=this.getListeners(e).filter((e=>e!==t));return this.events[e]=s,this}offAll(e){return delete this.events[e],this}}var t,s,{assign:r,entries:i}=Object,n=i,a=(Array.isArray,Number.isNaN,e=>typeof e),o=e=>"undefined"!==a(e),l=e=>"object"===a(e)&&!!e,c=e=>l(e)?new Map(n(e)):new Map,h=()=>{var{map:e,g:t,_g:s,Engine:r}=window;return o(s)&&o(t)&&o(e)&&!o(r)};!function(e){e[e.common=0]="common",e[e.unique=1]="unique",e[e.heroic=2]="heroic",e[e.legendary=3]="legendary"}(t||(t={})),function(e){e[e.common=0]="common",e[e.elite=1]="elite",e[e.elite2=2]="elite2",e[e.elite3=3]="elite3",e[e.hero=4]="hero",e[e.titan=5]="titan",e[e.colossus=6]="colossus"}(s||(s={}));var d=e=>{if("string"!=typeof e)throw new Error("item stats must be of type string");return e.match(";unique")||e.match("unique;")?t.unique:e.match(";heroic")||e.match("heroic;")?t.heroic:e.match(";legendary")||e.match("legendary;")?t.legendary:t.common},u=(e,t)=>4===e.type?s.common:e.wt>99?5===(null==t?void 0:t.mode)?s.colossus:s.titan:e.wt>79?s.hero:e.wt>29||e.wt>19?s.elite2:e.wt>9?s.elite:s.common,v=(e,t)=>{var s=e.icon.match(/([a-zA-Z0-9-_]{1,10}\/[a-zA-Z0-9_-]{1,50}\.gif)$/);return{name:e.nick,id:Number.parseInt(e.id),icon:s?s[0]:"",lvl:e.lvl,rank:u(e,t),x:e.x,y:e.y}},g=e=>({name:e.name,mode:e.mode}),m=()=>{var{Engine:e,map:t}=window;return h()?g(t):g(e.map.d)},f=e=>{var{g:t,Engine:s}=window;if(!e)return null;if(h()){var r,i=null==t||null==(r=t.npc)?void 0:r[e];return i?v(i,m()):null}var n=s.npcs.getById(Number(e));return n?v(n.d,m()):null};class p{constructor(e){this.key="GA: "+e}newError(e){var t=this.buildMessage(e);return p.emitter.emit("ERROR",t),new Error(t)}log(e){var t=this.buildMessage(e);console.log(t),p.emitter.emit("LOG",t)}error(e){var t=this.buildMessage(e);console.error(t),p.emitter.emit("ERROR",t)}buildMessage(e){return this.key+": "+e}}p.emitter=new e;var w=new p("html-utils"),y=e=>{var t=document.createElement("template");if(t.innerHTML=e.trim(),!t.content.firstElementChild)throw w.newError("createElement('"+e+"'): child is null");return t.content.firstElementChild},b=(e,t)=>{var s=(t||document).querySelector(e);if(s)return s;throw w.newError("find: nothing found using selector: "+e)},{location:E}=window,R=()=>E.host.split(".")[0],L=()=>{var e,t,{hero:s,Engine:r}=window;return h()?null==s?void 0:s.account:null==r||null==(e=r.hero)||null==(t=e.d)?void 0:t.account};class S extends e{constructor(e){super(),this.chatQueue=[],this.isBattle=!1,this.currentBattleUniqueId="",this.window=e,this.intercept()}pushChatMessage(e){this.chatQueue.push(e)}injectChatMessages(e){for(var t=1,s=Object.assign({},e,{c:e.c||{}}),r=Object.keys(s.c).length;this.chatQueue.length;){var i=this.chatQueue.shift(),n=e.ev+t,a=Object.assign({},i,{ts:n});s=Object.assign({},s,{c:Object.assign({},s.c,{[r]:a})}),r+=1,t+=1}return s}searchForBattleLogItems(e,t){var s=e.substring(8),r=": zdobyto ",i=s.includes(r)?r:": looted ",[n,a]=s.split(i);if(a){var o=a.split(", ");this.emit("BATTLE_LOG_ITEM",{items:o,npcName:n,battleId:this.currentBattleUniqueId,rawResponse:t})}}generateBattleUniqueId(){this.currentBattleUniqueId=btoa(""+Date.now()).substring(0,15)}challenge(e){this.emit("RAW_RESPONSE",{rawResponse:e}),l(e.f)&&e.f&&this.handleBattle(e.f,e),e.item&&e.loot&&l(e.item)&&l(e.loot)&&this.handleItems(e.item,e.loot,e),e.loot&&l(e.loot)&&this.handleLoot(e.loot,e),e.c&&l(e.c)&&this.handleChatMessages(e.c,e),e.npc&&l(e.npc)&&this.handleNpcs(e.npc,e),e.other&&l(e.other)&&this.handleOtherPlayers(e.other,e)}handleBattle(e,t){e.init&&(this.isBattle=!0,this.generateBattleUniqueId(),this.emit("BATTLE_START",{battleId:this.currentBattleUniqueId,rawResponse:t}));var s=new Map,r=new Map;if(e.w&&l(e.w)&&c(e.w).forEach(((e,i)=>{var n=Number(i);e.name?(s.set(n,e),this.emit("NEW_FIGHTER",{fighter:e,fighterId:n,battleId:this.currentBattleUniqueId,rawResponse:t})):(r.set(n,e),this.emit("FIGHTER_DATA_UPDATE",{fighter:e,fighterId:i,battleId:this.currentBattleUniqueId,rawResponse:t}),0===e.hpp&&this.emit("FIGHTER_KILLED",{fighter:e,fighterId:i,battleId:this.currentBattleUniqueId,rawResponse:t}))})),s.size&&this.emit("NEW_FIGHTERS",{fighters:s,battleId:this.currentBattleUniqueId,rawResponse:t}),r.size&&this.emit("FIGHTERS_DATA_UPDATE",{fighters:r,battleId:this.currentBattleUniqueId,rawResponse:t}),l(e.m)&&e.m){var i=e.m.reduce(((s,r,i)=>{if(l(e.mi)&&e.mi){r.startsWith("0;0;txt=")&&this.searchForBattleLogItems(r,t);var n=Number(e.mi[i]);return s.set(n,r)}return s}),new Map);this.emit("BATTLE_LOGS",{logs:i,battleId:this.currentBattleUniqueId,rawResponse:t})}this.isBattle&&-1===e.move&&(this.isBattle=!1,setTimeout((()=>this.emit("BATTLE_END",{battle:e,battleId:this.currentBattleUniqueId,rawResponse:t})),0))}handleItems(e,t,s){var r,i=[];(r=e,l(r)?n(r).map((e=>{var[,t]=e;return t})):[]).forEach((e=>{"l"!==e.loc&&"k"!==e.loc||"dialog"!==t.source&&(this.emit("LOOT",{item:e,lootDetails:t,rawResponse:s}),i=[...i,e])})),i.length&&this.emit("LOOTS",{items:i,lootDetails:t,rawResponse:s})}handleLoot(e,t){(e.states||e.timer||e.init)&&this.emit("LOOTS_SEND",{rawResponse:t})}handleChatMessages(e,t){c(e).forEach((e=>{this.emit("CHAT_MESSAGE",{chatMessage:e,rawResponse:t})}))}handleNpcs(e,t){c(e).forEach(((e,s)=>{e.del?this.emit("NPC_DELETED",{npcId:Math.abs(Number(s)),rawResponse:t}):e.nick&&this.emit("NEW_NPC",{npcData:e,rawResponse:t})}))}handleOtherPlayers(e,t){var s=[];c(e).forEach(((e,t)=>{e.nick&&(s=[...s,Object.assign({},e,{id:Number(t)})])})),s.length&&this.emit("NEW_PLAYERS_ON_MAP",{newPlayers:s,rawResponse:t})}intercept(){var e;if(h())e=this.window;else{if(!this.window.Engine||!this.window.Engine.communication)return void setTimeout(this.intercept);e=this.window.Engine.communication}"function"==typeof e.successData?(e.oldSuccessData=e.successData,e.successData=t=>{var s=JSON.parse(t),r=!1;if("object"==typeof s&&s){var i=Object.keys(s).length;if(this.chatQueue.length)for(var n in this.chatQueue)r=!0,this.chatQueue[n].ts=s.ev+1,this.injectChatMessages(s);i>=3&&(3!==i||!(s.h||s.js||s.event_done))&&this.challenge(s)}r?(r=!1,e.oldSuccessData(JSON.stringify(s))):e.oldSuccessData(t)}):setTimeout(this.intercept,100)}}var I="https://cdn.jsdelivr.net/gh/grooovepl/addon/counter-universal/style.css?ver="+Date.now(),T="2.1.2";function C(e,t,s,r,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void s(e)}o.done?t(l):Promise.resolve(l).then(r,i)}var A=new class{constructor(e,t){this.apiUrl=e,this.options=Object.assign({timeout:1e4,credentials:"include",mode:"cors",headers:{"access-control-request-headers":"content-type","content-type":"application/json;charset=utf-8"}},t||{})}post(e,t){var s=JSON.stringify(t);return this.request("post",e,s)}get(e){return this.request("get",e)}request(e,t,s){var r,i=this;return(r=function*(){var r,n=i.apiUrl+t,a=Object.assign({},i.options,{method:e,body:s}),o=yield fetch(n,a);if("function"==typeof o.json&&(r=yield o.json()),!r)throw"Request failed "+e.toUpperCase()+":"+n;if(r.error&&r.message)throw r.message;return r},function(){var e=this,t=arguments;return new Promise((function(s,i){var n=r.apply(e,t);function a(e){C(n,s,i,a,o,"next",e)}function o(e){C(n,s,i,a,o,"throw",e)}a(void 0)}))})()}}("https://counter-service.grooove.pl/api"),B=new p("universal-counter");p.emitter.on("ERROR",(e=>{A.post("/reports",{error:e,margonemInterface:h()?"si":"ni",addonVersion:T})}));var O,D,N=B;!function(e){e.elite="elite",e.elite2="elite2",e.hero="hero",e.titan="titan",e.colossus="colossus",e.event="event",e.other="other"}(O||(O={})),function(e){e.elite="Elity",e.elite2="Elity II",e.hero="Herosi",e.titan="Tytani",e.colossus="Kolosi",e.event="Eventowe",e.other="Inne"}(D||(D={}));var _=e=>e>=s.elite,j=e=>{switch(e){case s.elite:return O.elite;case s.elite2:return O.elite2;case s.hero:return O.hero;case s.titan:return O.titan;case s.colossus:return O.colossus;default:return O.other}},k="bosses",M="item-names-from-battle-log";function P(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var r=s.call(e,t);if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e,"string");return"symbol"==typeof t?t:String(t)}class x{constructor(e){this.store={},this.logger=new p("LocalStorageService"),this.isLocalStorageAvailable=x.isLocalStorageAvailable(),this.mainKey=e,this.recreateStore()}set(e,t){var s=(e=>{switch(typeof e){case"string":case"number":case"boolean":return null;case"object":if(Array.isArray(e))return e.filter(Boolean).length===e.length?null:"array includes falsy values"}return"incorrect value type ("+e+", "+typeof e+")"})(t);s?this.logger.log("set("+e+"): "+s):(this.store[e]=t,this.save())}get(e){return this.store[e]||null}remove(e){var t=function(e,t){if(null==e)return{};var s,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)s=n[r],t.indexOf(s)>=0||(i[s]=e[s]);return i}(this.store,[e].map(P));this.replaceStore(t)}replaceStore(e){this.store=e,this.save()}prepareDataForSave(){try{return JSON.stringify(this.store)}catch(e){return this.logger.log("prepareDataForSave(): "+e),"{}"}}save(){this.isLocalStorageAvailable&&localStorage.setItem(this.mainKey,this.prepareDataForSave())}recreateStore(){this.isLocalStorageAvailable?this.store=this.getSavedLocalStorageData():this.logger.log("localStorage is disabled or unavailable")}getSavedLocalStorageData(){var e={},t=window.localStorage;try{var s=t.getItem(this.mainKey);return s?JSON.parse(s):e}catch(t){return this.logger.log("getSavedLocalStorageData(): "+t),e}}static isLocalStorageAvailable(){var e=window.localStorage,t="LSTestKey",s="LSTestValue";try{if(e.setItem(t,s),e.getItem(t)===s)return localStorage.removeItem(t),!0}catch(e){return!1}return!1}}class q extends x{add(e,t){var s=this.get(e);s?Array.isArray(s)?this.set(e,[...s,t]):this.logger.log("add("+e+"): target is not an array"):this.set(e,[t])}removeEvery(e,t){var s=this.get(t);if(s)if(Array.isArray(s)){var r=s.filter((t=>JSON.stringify(t)!==JSON.stringify(e)));0!==r.length?this.set(t,r):this.remove(t)}else this.logger.log("removeEvery("+e+", "+t+"): target is not an array");else this.logger.log("removeEvery("+e+", "+t+"): target does not exist")}removeKeysByPattern(e){Object.keys(this.store).forEach((t=>{t.startsWith(e)&&this.remove(t)}))}}var U=new q("ga-universal-counter");function H(e,t,s,r,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void s(e)}o.done?t(l):Promise.resolve(l).then(r,i)}var G="ga-universal-counter-version",z=new q(G),F=new class{checkForUpdates(){return(e=function*(){var e=z.get(G);if(!(e&&Date.now()-e.lastChecked<108e5))try{var t=yield A.get("/latest-addon-version"),{version:s}=t;z.set("version",s),z.set("lastChecked",Date.now())}catch(e){}},function(){var t=this,s=arguments;return new Promise((function(r,i){var n=e.apply(t,s);function a(e){H(n,r,i,a,o,"next",e)}function o(e){H(n,r,i,a,o,"throw",e)}a(void 0)}))})();var e}};function K(e,t,s,r,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void s(e)}o.done?t(l):Promise.resolve(l).then(r,i)}function W(e){return function(){var t=this,s=arguments;return new Promise((function(r,i){var n=e.apply(t,s);function a(e){K(n,r,i,a,o,"next",e)}function o(e){K(n,r,i,a,o,"throw",e)}a(void 0)}))}}class J{constructor(e){this.label=e.label,this.id=e.id,this.data=e.data}render(){var e,t,s,r=(e=this.label,'<button type="button" '+((t=this.id)?'id="'+t+'"':"")+' class="_1801x7x0" '+((s=this.data)?s.map((e=>{var[t,s]=e;return"data-"+t+'="'+s+'"'})).join(" "):"")+">"+e+"</>");return y(r)}toString(){return this.render().outerHTML}}var Q=[{id:O.elite,label:D.elite},{id:O.elite2,label:D.elite2},{id:O.hero,label:D.hero},{id:O.titan,label:D.titan},{id:O.colossus,label:D.colossus},{id:O.event,label:D.event},{id:O.other,label:D.other}],V="is-visible",Y="is-active";class Z extends e{constructor(e){super(),this.containerRef=e.containerRef,this.tip=e.tip,this.render()}render(){var e=' <div class="_1ol33ot0'+(h()?" is-si":"")+'">L</div>',t=y(e);t.addEventListener("click",(()=>this.emit("LAUNCHER_CLICKED"))),t.addEventListener("mouseenter",(()=>this.tip.show(t,"Licznik Ubić by Groove Armada v2.1.2"))),t.addEventListener("mouseleave",(()=>this.tip.hide())),this.containerRef.appendChild(t)}}var $="y8udqv1";class X{constructor(e){this.containerRef=e.containerRef,this.nodeRef=this.render()}render(){var e=y('<div class="y8udqv0"></div>');return this.containerRef.appendChild(e),e}setContent(e){this.nodeRef.innerHTML=e}show(e,t){this.setContent(t),this.setPosition(this.calculatePosition(e)),this.nodeRef.classList.add($)}hide(){this.nodeRef.classList.remove($)}setPosition(e){this.nodeRef.style.left=e.left+"px",this.nodeRef.style.top=e.top+"px"}calculatePosition(e){var t=e.getBoundingClientRect(),s=t.top,{innerHeight:r}=window,i=Math.floor(r/2),n=document.body.clientWidth,a=Math.floor(n/2),o=e.clientHeight,l=e.clientWidth,c=t.left,h=n-c-l,d=Math.floor(l/2),u=Math.floor(this.nodeRef.clientWidth/2),v=this.nodeRef.clientHeight,g=this.nodeRef.clientWidth;return{top:s<=i&&s<v+3+5?s+3+o+5:s-v-3-5,left:l>=g?c+d-u:c+d>a?h<u-d-10?n-g-10:c+d-u:c+d-u<10?10:c+d-u}}}class ee{constructor(e){this.props=e}render(){var e,s,r=(s=(e=this.props).npc.icon?'<img class="lubflx4" src="'+e.npc.icon+'">':"",' <div class="lubflx0"> <div class="lubflx1">'+e.npc.name+'</div> <div class="lubflx2"> <p>Ubić: <b class="lubflx5">'+e.stats.kills+'</b></p> <p>Looty unikatowe: <b class="lubflx6">'+e.stats.loots[t.unique]+'</b></p> <p>Looty heroiczne: <b class="lubflx7">'+e.stats.loots[t.heroic]+'</b></p> <p>Looty legendarne: <b class="lubflx8">'+e.stats.loots[t.legendary]+"</b></p> <p>Liczone od: <b>"+e.stats.trackedSince+'</b></p> </div> <div class="lubflx3"> '+s+" </div> </div> ");return y(r)}toString(){return this.render().outerHTML}}function te(e,t,s,r,i,n,a){try{var o=e[n](a),l=o.value}catch(e){return void s(e)}o.done?t(l):Promise.resolve(l).then(r,i)}function se(e){return function(){var t=this,s=arguments;return new Promise((function(r,i){var n=e.apply(t,s);function a(e){te(n,r,i,a,o,"next",e)}function o(e){te(n,r,i,a,o,"throw",e)}a(void 0)}))}}var re=(e=>{var t="GAFramework v1.0.0";return e.GAServices=e.GAServices||new Map,e.GAServices.get(t)||e.GAServices.set(t,new S(e)),e.GAServices.get(t)})(window),ie=new class extends e{constructor(){super(...arguments),this.cache=[]}hasCache(){return this.cache.length>0}download(){var e=this;return W((function*(){try{var t="?world="+R()+"&userMargonemId="+L()+"&addonVersion="+T,s=yield A.get("/kills"+t);e.cache=s.entries,e.emit("DATA_FETCHED")}catch(t){var r="Nie udało się pobrać danych o ubiciach z serwera: "+t;e.emit("ERROR",r)}}))()}upload(e,t){return W((function*(){try{yield A.post(e,Object.assign({},t,{world:R(),userMargonemId:L(),addonVersion:T}))}catch(t){N.log("Nie udało się zapisać ubicia ("+e+") na serwerze: "+t)}}))()}get(e){return this.cache.filter((t=>t.npc.category===e))}},ne=new class extends e{constructor(e){super(),this.currentCategory=null,this.containerElement=null,this.canvasRef=null,this.appContainerRef=e.appContainerRef,this.tabsRef=new Map}render(){var e,t,s=' <div class="bcizgm0"> <div class="bcizgm1" id="js-canvas"> Trwa pobieranie danych... </div> <div class="bcizgm2" id="js-tabs"> '+Q.map((e=>new J({label:e.label,data:[["id",e.id]]}))).join("")+' </div> <div class="bcizgm3" > '+new J({label:"Odśwież",id:"js-refresh"})+" "+new J({label:"Zamknij",id:"js-close"})+" </div> </div>",r=y(s),i=b("#js-canvas",r),n=b("#js-close",r),a=b("#js-refresh",r),o=(e="#js-tabs button",(t=(r||document).querySelectorAll(e)).length?[...t]:(w.log("findAll: nothing found using selector: "+e),[]));this.containerElement=r,this.canvasRef=i,o.forEach((e=>{this.tabsRef.set(e.dataset.id,e),e.addEventListener("click",(()=>this.selectCategory(e.dataset.id)))})),a.addEventListener("click",(()=>this.emit("REFRESH_BUTTON_CLICKED"))),n.addEventListener("click",(()=>this.hide())),i.addEventListener("mousewheel",(e=>e.stopPropagation())),this.appContainerRef.appendChild(r),this.selectCategory(O.elite2)}hide(){this.containerElement.classList.remove(V)}show(){this.containerElement.classList.add(V)}message(e){this.canvasRef.innerText=e}renderCategory(e){this.canvasRef.innerHTML=e.map((e=>e.toString())).join("")}getCurrentCategoryId(){return this.currentCategory.dataset.id}selectCategory(e){this.currentCategory&&this.currentCategory.classList.remove(Y);var t=this.tabsRef.get(e);t.classList.add(Y),this.currentCategory=t,this.emit("TAB_CLICKED",t.dataset.id)}loadStyles(){var e=y('<link rel="stylesheet" type="text/css" href="'+I+'">');e.addEventListener("error",(()=>this.emit("LOADING_STYLES_ERROR"))),this.appContainerRef.appendChild(e)}}({appContainerRef:window.document.body});new class{constructor(e,t,s){var r=this;this.isViewRendered=!1,this.model=e,this.view=t,this.window=s.window,this.gameDataProcessor=s.gameDataProcessor,t.loadStyles(),F.checkForUpdates(),this.tip=new X({containerRef:this.window.document.body}),this.launcher=new Z({containerRef:b(h()?"#centerbox":".game-layer"),tip:this.tip}),this.launcher.on("LAUNCHER_CLICKED",se((function*(){r.isViewRendered||(t.render(),r.isViewRendered=!0),t.show(),e.hasCache()||(yield e.download())}))),e.on("DATA_FETCHED",(()=>{var e=t.getCurrentCategoryId();this.showCategory(e)})),e.on("ERROR",(e=>t.message(e))),t.on("REFRESH_BUTTON_CLICKED",(()=>e.download())),t.on("TAB_CLICKED",(e=>this.showCategory(e))),t.on("LOADING_STYLES_ERROR",(()=>N.error("Nie udało się załadować pliku CSS."))),this.gameDataProcessor.on("LOOT",(t=>e.upload("/loots",t))),this.gameDataProcessor.on("KILL",(t=>e.upload("/kills",t)))}showCategory(e){var t=this.model.get(e).map((e=>new ee(e)));if(!t.length)return this.view.message("Na świecie "+R()+" nie zapisano jeszcze ubić z tej kategorii.");this.view.renderCategory(t)}}(ie,ne,{window,gameDataProcessor:new class extends e{constructor(e){super(),this.isBattleRefreshed=!1,e.on("BATTLE_START",(e=>this.handleBattleStart(e))),e.on("NEW_FIGHTERS",(e=>this.handleFighters(e))),e.on("BATTLE_LOG_ITEM",(e=>this.handleBattleLogItem(e))),e.on("LOOTS",(e=>this.handleLoots(e))),e.on("NPC_DELETED",(e=>this.handleNpcDeleted(e)))}handleBattleStart(e){var t;this.isBattleRefreshed=void 0!==(t=e.rawResponse).f&&void 0!==t.matchmaking_state,this.resetStorageItems(),this.isBattleRefreshed||this.resetStorage()}handleFighters(e){var t,s,{fighters:r}=e,i=(e=>{var t=[];return e.forEach(((e,s)=>{var r=Math.abs(Number(s)),i=f(r);if(i&&_(i.rank)){var n={id:r,icon:i.icon,name:i.name,lvl:i.lvl,category:j(i.rank)};t=[...t,n]}})),t})((t=r,s=new Map,t.forEach(((e,t)=>{e.npc&&s.set(t,e)})),s));this.isBattleRefreshed&&this.getAllRegisteredBosses()||i.forEach((e=>this.registerBoss(e)))}handleBattleLogItem(e){var{npcName:t,items:s}=e;this.getAllRegisteredBosses().some((e=>e.name===t))&&s.forEach((e=>{U.add(M,e)}))}handleNpcDeleted(e){var{npcId:t}=e,s=f(t);if(!s)return N.log("Could not find deleted NPC");if(_(s.rank)){var r=this.getRegisteredBoss(s.id);r&&this.emit("KILL",{npc:r})}}handleLoots(e){var{items:s}=e,r=(e=>e.map((e=>({name:e.name,rank:d(e.stat)}))))(s).filter((e=>e.rank>=t.unique));r.length&&this.isEveryItemInStorage(r)&&this.applyLootsToEveryBoss(r)}applyLootsToEveryBoss(e){var t=this.getAllRegisteredBosses(),s=this.countItemTypes(e),r=[],i=[];t.forEach((e=>{i.includes(e.name)||(i.push(e.name),r.push(e))})),r.forEach((e=>{this.emit("LOOT",{npc:e,loots:s})}))}countItemTypes(e){var s={[t.unique]:0,[t.heroic]:0,[t.legendary]:0};return e.forEach((e=>{var{rank:t}=e;t<1||(s[t]+=1)})),s}isEveryItemInStorage(e){var t,s=U.get(M);if(!s||!s.length)return!1;for(var r=[...e];t=r.shift();){var{name:i}=t,n=s.indexOf(i);if(-1===n)return!1;s=s.slice(n,1)}return!0}resetStorageItems(){U.remove(M)}resetStorage(){U.remove(k)}registerBoss(e){U.add(k,e)}getAllRegisteredBosses(){return U.get(k)||[]}getRegisteredBoss(e){return this.getAllRegisteredBosses().find((t=>t.id===e))}}(re)})})();