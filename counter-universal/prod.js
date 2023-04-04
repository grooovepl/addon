(()=>{"use strict";class e{constructor(){this.events={}}on(e,t){return this.subscribe(e,t),this}emit(e,t){return this.getListeners(e).forEach((e=>e.call(null,t))),this}getListeners(e){return this.events[e]||[]}subscribe(e,t){var s=[...this.getListeners(e),t];return this.events[e]=s,this}off(e,t){var s=this.getListeners(e).filter((e=>e!==t));return this.events[e]=s,this}offAll(e){return delete this.events[e],this}}var{assign:t,entries:s}=Object,i=s,r=(Array.isArray,Number.isNaN,e=>typeof e),n=e=>"undefined"!==r(e),o=e=>"object"===r(e)&&!!e,a=e=>("0"+e).slice(-2),l=e=>o(e)?new Map(i(e)):new Map,h=e=>{var{map:t,g:s,_g:i,Engine:r}=e;return n(i)&&n(s)&&n(t)&&!n(r)};class c extends e{constructor(e){super(),this.key="GA: "+e,this.memory=new Set}getAll(){return Array.from(this.memory)}log(e){var t=this.decorate(e,"log");this.memory.add(t),this.emit("LOG",t)}error(e){var t=this.decorate(e,"error");return this.memory.add(t),this.stderr(t.message),this.emit("ERROR",t),new Error(e)}report(e){var t=this.decorate(e,"report");return this.memory.add(t),this.stderr(t.message),this.emit("REPORT",t),new Error(e)}stderr(e){console.error(e)}decorate(e,t){return{type:t,message:this.key+": "+e,rawMessage:e,timestamp:Date.now()}}}var d=new c("html-utils"),u=e=>{var t=document.createElement("template");if(t.innerHTML=e.trim(),!t.content.firstElementChild)throw d.report("createElement('"+e+"'): child is null");return t.content.firstElementChild},g=(e,t)=>{var s=(t||document).querySelector(e);if(s)return s;throw d.report("find: nothing found using selector: "+e)},m=e=>g((e=>h(e)?"#centerbox":".game-layer")(e)),v=e=>({name:e.name,mode:e.mode}),p=e=>{var{Engine:t,map:s}=e;return h(e)?v(s):v(t.map.d)},w=function(e){return e[e.common=0]="common",e[e.unique=1]="unique",e[e.heroic=2]="heroic",e[e.legendary=3]="legendary",e}({}),f=function(e){return e[e.common=0]="common",e[e.elite=1]="elite",e[e.elite2=2]="elite2",e[e.elite3=3]="elite3",e[e.hero=4]="hero",e[e.titan=5]="titan",e[e.colossus=6]="colossus",e}({}),y=e=>{if("string"!=typeof e)throw new Error("item stats must be of type string");return e.startsWith("unique")||e.match(";unique")||e.match("unique;")||e.endsWith("unique")?w.unique:e.startsWith("heroic")||e.match(";heroic")||e.match("heroic;")||e.endsWith("heroic")?w.heroic:e.startsWith("legendary")||e.match(";legendary")||e.match("legendary;")||e.endsWith("legendary")?w.legendary:w.common},b=(e,t)=>e>99?5===(null==t?void 0:t.mode)?f.colossus:f.titan:e>79?f.hero:e>29?f.elite3:e>19?f.elite2:e>9?f.elite:f.common,E=(e,t)=>{var s=e.icon.match(/([a-zA-Z0-9-_]{1,10}\/[a-zA-Z0-9_-]{1,50}\.gif)$/),i=(e=>!!e.nick)(e);return{name:i?e.nick:e.name,id:i?Number.parseInt(e.id):e.originalId,icon:s?s[0]:"",lvl:e.lvl,rank:b(e.wt,t),wt:e.wt}},L=(e,t)=>{var{g:s,Engine:i}=t;if(!e)return null;var r=Math.abs(Number(e));if(h(t)){var n,o=null==s||null==(n=s.npc)?void 0:n[r];return o?E(o,p(t)):null}var a=i.npcs.getById(r);return a?E(a.d,p(t)):null},C=(e,t)=>{var s=(e=>{var{g:t,Engine:s}=e;if(h(e)){var i,r=null==t||null==(i=t.battle)?void 0:i.f;return"object"!=typeof r?[]:Object.values(r).filter((e=>!!e.npc))}var n=s.battle.warriorsList;return"object"!=typeof n?[]:Object.values(n).filter((e=>!!e.npc))})(t),i=s.find((t=>Math.abs(Number(t.id))===e));return i?L(i.originalId,t):null},S=e=>{var t,s,{hero:i,Engine:r}=e;return h(e)?null==i?void 0:i.account:null==r||null==(t=r.hero)||null==(s=t.d)?void 0:s.account},k=e=>e.location.host.split(".")[0];function N(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}function T(e){return function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){N(n,i,r,o,a,"next",e)}function a(e){N(n,i,r,o,a,"throw",e)}o(void 0)}))}}var I=function(e){return e.elite="elite",e.elite2="elite2",e.elite3="elite3",e.hero="hero",e.titan="titan",e.colossus="colossus",e.event="event",e.other="other",e}({}),R=function(e){return e.elite="Elity",e.elite2="Elity II",e.elite3="Elity III",e.hero="Herosi",e.titan="Tytani",e.colossus="Kolosi",e.event="Eventowe",e.other="Inne",e}({}),O="is-hidden";class A extends e{constructor(e){super();var t=(e=>{var{label:t,id:s,data:i,classes:r,title:n}=e;return'<button type="button" '+(s?'id="'+s+'"':"")+" "+(n?'title="'+n+'"':"")+' class="_1801x7x0 '+(r||"")+'" '+(i?i.map((e=>{var[t,s]=e;return"data-"+t+'="'+s+'"'})).join(" "):"")+">"+t+"</>"})(e),s=u(t);s.addEventListener("click",(()=>this.emit("CLICK"))),s.addEventListener("mouseenter",(()=>this.emit("HOVER"))),this.node=s}setLabel(e){this.node.innerText=e}setClass(e){this.node.classList.add(e)}removeClass(e){this.node.classList.remove(e)}show(){this.node.classList.remove(O)}hide(){this.node.classList.add(O)}toString(){return this.node.outerHTML}}var P="2.12.1",j="ga-universal-counter";class _ extends e{constructor(e){super(),this.container=e.containerRef,this.tip=e.tip,this.isSI=e.isSI,this.render()}render(){var e=' <div class="_1ol33ot0'+(this.isSI?" is-si":"")+" "+j+'">L</div>',t=u(e),s="Licznik Ubić by Groove Armada v"+P+"<br>Skrót: SHIFT + L";t.addEventListener("click",(()=>this.emit("CLICK"))),t.addEventListener("mouseenter",(()=>this.tip.show(t,s))),this.container.appendChild(t),this.node=t}setNotificationsCount(e){var t=e>9?9:e;this.node.setAttribute("data-notifications",""+t)}}class z{constructor(e){var t=(e=>{var t,s,i=(s=(t=e.timestamp)?new Date(t):new Date,a(s.getHours())+":"+a(s.getMinutes())+":"+a(s.getSeconds()));return' <p class="_1ndkfgi0" data-type="'+e.type+'"> <span class="_1ndkfgi1">'+i+'</span> <span class="_1ndkfgi2">'+e.rawMessage+"</span> </p> "})(e),s=u(t);this.node=s}toString(){return this.node.outerHTML}}var B="is-visible";class M{constructor(e){this.container=e.containerRef,this.render()}render(){var e=u(' <div class="_1kw7mee0"> <div class="_1kw7mee1" id="js-title"></div> <div class="_1kw7mee2" id="js-content"></div> <div class="_1kw7mee3" id="js-controls"></div> </div>');this.title=g("#js-title",e),this.content=g("#js-content",e),this.controls=g("#js-controls",e),this.content.addEventListener("mousewheel",(e=>e.stopPropagation())),this.container.appendChild(e),this.node=e}open(){return this.node.classList.add(B),this}close(e){return this.node.classList.remove(B),e&&(this.setTitle(""),this.setContentMarkup(""),this.setControls([])),this}setTitle(e){return this.title.innerText=e,this}setContent(e){return this.content.innerHTML="",e.forEach((e=>this.content.appendChild(e))),this}setContentMarkup(e){return this.content.innerHTML=e,this}setControls(e){return this.controls.innerHTML="",e.forEach((e=>this.controls.appendChild(e))),this}}var D="ga-uc-search";class W extends e{constructor(){super(),this.render()}render(){var e='<input id="'+D+'" class="_1rqarav0" placeholder="Wyszukaj..." type="text">';this.node=u(e),this.node.addEventListener("input",(()=>this.emit("INPUT",this.getValue())))}getValue(){return this.node.value}focus(){this.node.focus()}getNode(){return this.node}}var H="y8udqv1";class x{constructor(e){this.containerRef=e.containerRef,this.node=this.render()}render(){var e=u('<div class="y8udqv0"></div>');return this.containerRef.appendChild(e),e}setContent(e){this.node.innerHTML=e}show(e,t){this.setContent(t),this.setPosition(this.calculatePosition(e)),this.node.classList.add(H),e.addEventListener("mouseout",(()=>this.hide()))}hide(){this.node.classList.remove(H)}setPosition(e){this.node.style.left=e.left+"px",this.node.style.top=e.top+"px"}calculatePosition(e){var t=e.getBoundingClientRect(),s=t.top,{innerHeight:i}=window,r=Math.floor(i/2),n=document.body.clientWidth,o=Math.floor(n/2),a=e.clientHeight,l=e.clientWidth,h=t.left,c=n-h-l,d=Math.floor(l/2),u=Math.floor(this.node.clientWidth/2),g=this.node.clientHeight,m=this.node.clientWidth;return{top:s<=r&&s<g+3+5?s+3+a+5:s-g-3-5,left:l>=m?h+d-u:h+d>o?c<u-d-10?n-m-10:h+d-u:h+d-u<10?10:h+d-u}}}function G(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var q=e=>[I.elite,I.elite2,I.elite3,I.hero,I.titan,I.colossus,I.event].includes(e),F=e=>{switch(e){case f.elite:return I.elite;case f.elite2:return I.elite2;case f.elite3:return I.elite3;case f.hero:return I.hero;case f.titan:return I.titan;case f.colossus:return I.colossus;default:return I.other}},K="npc",U="item-names-from-battle-log";class V{constructor(e){this.key=e.key,this.ls=e.targetWindow.localStorage,this.logger=e.logger,this.isLocalStorageAvailable=this.isAvailable()}save(e){this.isLocalStorageAvailable&&this.ls.setItem(this.key,e)}get(){return this.isLocalStorageAvailable?this.ls.getItem(this.key):(this.logger.log("LocalStorageService: localStorage is disabled or unavailable"),null)}isAvailable(){var e="LSTestKey",t="LSTestValue";try{if(this.ls.setItem(e,t),this.ls.getItem(e)===t)return localStorage.removeItem(e),!0}catch(e){return!1}return!1}}function J(e){var t=function(e){if("object"!=typeof e||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var s=t.call(e,"string");if("object"!=typeof s)return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}class Z{constructor(e,t){this.memory={},this.storage=e,this.logger=t,this.restore()}set(e,t){this.memory[e]=t,this.save()}add(e,t){var s=this.get(e);s?Array.isArray(s)?this.set(e,[...s,t]):this.logger.log("Memstore: add("+e+"): not an array"):this.set(e,[t])}removeEvery(e,t){var s=this.get(t);if(s)if(Array.isArray(s)){var i=s.filter((t=>JSON.stringify(t)!==JSON.stringify(e)));0!==i.length?this.set(t,i):this.remove(t)}else this.logger.log("Memstore: removeEvery("+e+", "+t+"): not an array");else this.logger.log("Memstore: removeEvery("+e+", "+t+"): key does not exist")}removeKeysStartingWith(e){Object.keys(this.memory).forEach((t=>{t.startsWith(e)&&this.remove(t)}))}get(e){return this.memory[e]||null}remove(e){var t=function(e,t){if(null==e)return{};var s,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)s=n[i],t.indexOf(s)>=0||(r[s]=e[s]);return r}(this.memory,[e].map(J));this.memory=t,this.save()}restore(){var e=this.storage.get();if(e)try{this.memory=JSON.parse(e)}catch(e){this.logger.log("Memstore: restore: "+e)}}save(){try{this.storage.save(JSON.stringify(this.memory))}catch(e){this.logger.log("Memstore: save: "+e)}}}var Q=(e,t)=>{var s=new V({key:e,logger:t,targetWindow:window});return new Z(s,t)},Y="bcizgm5",X="bcizgm7",$=[{id:I.elite,label:R.elite},{id:I.elite2,label:R.elite2},{id:I.elite3,label:R.elite3},{id:I.hero,label:R.hero},{id:I.titan,label:R.titan},{id:I.colossus,label:R.colossus},{id:I.event,label:R.event},{id:I.other,label:R.other}],ee="is-visible",te="is-active",se="is-dimmed";class ie{constructor(e){this.props=e}render(){var e,t,s=(t=(e=this.props).npc.icon?'<img class="_1rnrz0u4" src="'+e.npc.icon+'">':"",' <div class="_1rnrz0u0"> <div class="_1rnrz0u1">'+e.npc.name+'</div> <div class="_1rnrz0u2"> <p>Ubić: <b class="_1rnrz0u5">'+e.stats.kills+'</b></p> <p>Looty unikatowe: <b class="_1rnrz0u6">'+e.stats.loots[w.unique]+'</b></p> <p>Looty heroiczne: <b class="_1rnrz0u7">'+e.stats.loots[w.heroic]+'</b></p> <p>Looty legendarne: <b class="_1rnrz0u8">'+e.stats.loots[w.legendary]+"</b></p> <p>Liczone od: <b>"+e.stats.trackedSince+'</b></p> </div> <div class="_1rnrz0u3"> '+t+" </div> </div> ");return u(s)}toString(){return this.render().outerHTML}}function re(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var ne=e=>new ie(e),oe=["headers"];function ae(e,t,s,i,r,n,o){try{var a=e[n](o),l=a.value}catch(e){return void s(e)}a.done?t(l):Promise.resolve(l).then(i,r)}var le=function(e){return e.GET="GET",e.POST="POST",e.PUT="PUT",e.DELETE="DELETE",e}(le||{}),he=e=>!!e.name;class ce extends e{constructor(e){super(),this.chatQueue=[],this.window=e,this.intercept()}pushChatMessage(e){this.chatQueue.push(e)}injectChatMessages(e){for(var t=1,s=Object.assign({},e,{c:e.c||{}}),i=Object.keys(s.c).length;this.chatQueue.length;){var r=this.chatQueue.shift(),n=e.ev+t,o=Object.assign({},r,{ts:n});s=Object.assign({},s,{c:Object.assign({},s.c,{[i]:o})}),i+=1,t+=1}return s}searchForBattleLogItems(e,t){var[,s]=e.split("txt="),i=": zdobyto ",r=s.includes(i)?i:": looted ",[n,o]=s.split(r);if(o){var a=o.split(", ");this.emit("BATTLE_LOG_ITEMS",{items:a,npcName:n,rawResponse:t})}}challenge(e){this.emit("RAW_RESPONSE",{rawResponse:e}),o(e.f)&&e.f&&this.handleBattle(e.f,e),e.item&&e.loot&&o(e.item)&&o(e.loot)&&this.handleItems(e.item,e.loot,e),e.loot&&o(e.loot)&&this.handleLoot(e.loot,e),e.c&&o(e.c)&&this.handleChatMessages(e.c,e),e.npc&&o(e.npc)&&this.handleNpcs(e.npc,e),e.other&&o(e.other)&&this.handleOtherPlayers(e.other,e)}handleBattle(e,t){if(e.init&&this.emit("BATTLE_START",{isFreshBattle:void 0===t.matchmaking_state,rawResponse:t}),e.w&&o(e.w)&&l(e.w).forEach(((e,s)=>{var i=Math.abs(Number(s)),r=Number(s)<0;he(e)?this.emit("NEW_FIGHTER",{fighter:e,fighterId:e.originalId,npc:r?L(e.originalId,this.window)||{icon:e.icon,name:e.name,id:e.originalId,lvl:e.lvl,wt:e.wt,rank:b(e.wt,p(this.window))}:null,rawResponse:t}):this.emit("FIGHTER_DATA_UPDATE",{fighter:e,fighterId:i,npc:C(i,this.window),rawResponse:t}),0===e.hpp&&this.emit("FIGHTER_KILLED",{fighter:e,fighterId:i,npc:r?he(e)?L(e.originalId,this.window)||{icon:e.icon,name:e.name,id:e.originalId,lvl:e.lvl,wt:e.wt,rank:b(e.wt,p(this.window))}:C(i,this.window):null,rawResponse:t})})),o(e.m)&&e.m){var s=e.m.reduce(((s,i,r)=>{if(o(e.mi)&&e.mi){i.includes("txt=")&&this.searchForBattleLogItems(i,t);var n=Number(e.mi[r]);return s.set(n,i)}return s}),new Map);this.emit("BATTLE_LOGS",{logs:s,rawResponse:t})}-1===e.endBattle&&setTimeout((()=>this.emit("BATTLE_END",{battle:e,rawResponse:t})),0)}handleItems(e,t,s){var r,n=[];(r=e,o(r)?i(r).map((e=>{var[,t]=e;return t})):[]).forEach((e=>{"l"!==e.loc&&"k"!==e.loc||["dialog","lootbox"].includes(t.source)||(this.emit("LOOT",{item:e,lootDetails:t,rawResponse:s}),n=[...n,e])})),n.length&&this.emit("LOOTS",{items:n,lootDetails:t,rawResponse:s})}handleLoot(e,t){(e.states||e.endTs||e.init)&&this.emit("LOOTS_SEND",{rawResponse:t})}handleChatMessages(e,t){l(e).forEach((e=>{this.emit("CHAT_MESSAGE",{chatMessage:e,rawResponse:t})}))}handleNpcs(e,t){l(e).forEach(((e,s)=>{e.del?this.emit("NPC_DELETED",{npcId:Math.abs(Number(s)),rawResponse:t}):e.nick&&this.emit("NEW_NPC",{npcData:e,rawResponse:t})}))}handleOtherPlayers(e,t){var s=[];l(e).forEach(((e,t)=>{e.nick&&(s=[...s,Object.assign({},e,{id:Number(t)})])})),s.length&&this.emit("NEW_PLAYERS_ON_MAP",{newPlayers:s,rawResponse:t})}intercept(){var e;if(h(this.window))e=this.window;else{if(!this.window.Engine||!this.window.Engine.communication)return void setTimeout(this.intercept,100);e=this.window.Engine.communication}"function"==typeof e.successData?(e.oldSuccessData=e.successData,e.successData=t=>{var s=JSON.parse(t),i=!1;if("object"==typeof s&&s){var r=Object.keys(s).length;if(this.chatQueue.length)for(var n in this.chatQueue)i=!0,this.chatQueue[n].ts=s.ev+1,this.injectChatMessages(s);r>=3&&(3!==r||!(s.h||s.js||s.event_done||s.dead))&&this.challenge(s)}i?(i=!1,e.oldSuccessData(JSON.stringify(s))):e.oldSuccessData(t)}):setTimeout(this.intercept,100)}}var de=window,ue=new c("universal-counter");ue.log(window.location.host+", "+(h(de)?"SI":"NI")),ue.log(window.navigator.userAgent);var ge=new class{constructor(e,t){void 0===t&&(t={});var s=function(e,t){if(null==e)return{};var s,i,r={},n=Object.keys(e);for(i=0;i<n.length;i++)s=n[i],t.indexOf(s)>=0||(r[s]=e[s]);return r}(t,oe);this.apiUrl=e,this.options=Object.assign({credentials:"include",mode:"cors",headers:Object.assign({"access-control-request-headers":"content-type","content-type":"application/json;charset=utf-8"},t.headers)},s)}post(e,t){var s=JSON.stringify(t);return this.request(le.POST,e,s)}put(e,t){var s=JSON.stringify(t);return this.request(le.PUT,e,s)}delete(e,t){var s=JSON.stringify(t);return this.request(le.DELETE,e,s)}get(e,t){var s=Object.entries(t).map((e=>{var[t,s]=e;return[t,(null==s?void 0:s.toString())||""]})),i=new URLSearchParams(s).toString();return this.request(le.GET,e+"?"+i)}request(e,t,s){var i,r=this;return(i=function*(){var i,n=r.apiUrl+t,o=Object.assign({},r.options,{method:e,body:s}),a=yield fetch(n,o);if("function"==typeof a.json&&(i=yield a.json()),!i)throw new Error('Request "'+e+":"+n+'" failed. Received no data.');if(i.error&&i.message)throw i.message;return i},function(){var e=this,t=arguments;return new Promise((function(s,r){var n=i.apply(e,t);function o(e){ae(n,s,r,o,a,"next",e)}function a(e){ae(n,s,r,o,a,"throw",e)}o(void 0)}))})()}}("https://counter-service.grooove.pl/api"),me=new class{constructor(e){this.logger=e.logger,this.httpService=e.httpService,this.margonemInterface=e.margonemInterface,this.addonVersion=e.addonVersion,this.subscribe()}subscribe(){this.logger.on("REPORT",(e=>{this.report(e.message),this.report(this.logger.getAll().map((e=>e.message)).join("\\r\\n"))}))}report(e){this.httpService.post("/reports",{error:e,margonemInterface:this.margonemInterface,addonVersion:this.addonVersion})}}({logger:ue,addonVersion:P,margonemInterface:(e=>h(e)?"SI":"NI")(de),httpService:ge}),ve=(e=>{var t="GAFramework v1.1.0";return e.GAServices=e.GAServices||new Map,e.GAServices.get(t)||e.GAServices.set(t,new ce(e)),e.GAServices.get(t)})(de),pe=Q("ga-universal-counter",ue),we=new class extends e{constructor(e){super(),this.cache=[],this.window=e.targetWindow,this.httpService=e.httpService,this.logger=e.logger}hasCache(){return this.cache.length>0}download(e){var t=this;return T((function*(){try{var s={world:k(t.window),userMargonemId:S(t.window),client:"COUNTER"},i=yield t.httpService.get("/kills",s);t.cache=i.entries,setTimeout((()=>t.emit("DATA")),e?150:0)}catch(e){var r="Nie udało się pobrać danych o ubiciach z serwera: "+e;t.emit("ERROR",r)}}))()}upload(e,t){var s=this;return T((function*(){var i="/kills"===e?"ubicia":"lootu";s.logger.log("Zapis "+i+' dla NPC "'+t.npc.name+'"');var r=Object.assign({},t,{world:k(s.window),userMargonemId:S(s.window)});try{var n=yield s.httpService.post(e,r);s.logger.log("Serwer: "+n.message)}catch(e){(""+e).includes("duplikat")?s.logger.log("Nie udało się zapisać "+i+" na serwerze: "+e):s.logger.error("Nie udało się zapisać "+i+" na serwerze: "+e)}}))()}getByCategory(e){return this.cache.filter((t=>t.npc.category===e))}search(e,t){return(t?this.getByCategory(t):this.cache).filter((t=>t.npc.name.toLowerCase().includes(e)))}}({logger:ue,httpService:ge,targetWindow:de}),fe=new class extends e{constructor(e){var t;super(),this.isVisible=!1,this.isRendered=!1,this.window=e.targetWindow,this.appContainer=e.appContainerRef,t=()=>{this.isVisible?this.hide():this.show()},document.addEventListener("keydown",(e=>{var s=e.target;"l"!==e.key.toLowerCase()||!e.shiftKey||["input","textarea"].includes(s.localName)&&s.id!==D||(e.stopPropagation(),e.preventDefault(),t())})),this.tip=new x({containerRef:this.window.document.body}),this.search=new W,this.launcher=new _({containerRef:m(this.window),tip:this.tip,isSI:h(this.window)}),this.logsButton=new A({label:"i",classes:"bcizgm6"}),this.refreshButton=new A({label:"Odśwież",classes:""+Y}),this.goToGroooveplButton=new A({label:"Edytuj ubicia",classes:""+Y}),this.closeButton=new A({label:"Zamknij"}),this.tabs=new Map,this.search.on("INPUT",(e=>this.emit("SEARCH",e))),this.logsButton.on("HOVER",(()=>this.tip.show(this.logsButton.node,"Pokaż logi dodatku"))),this.launcher.on("CLICK",(()=>this.show()))}render(){var e,t,s,i,r,n,o,a,l,h,c,m,v,p,w,f=' <div class="bcizgm0"> <div class="bcizgm1" id="js-canvas"> Trwa pobieranie danych... </div> <div class="bcizgm2" id="js-tabs"> '+$.map((e=>new A({label:e.label,data:[["id",e.id]],classes:"bcizgm3"}))).join("")+' </div> <div class="bcizgm4" id="js-controls"></div> </div>',y=u(f),b=g("#js-canvas",y),E=(e="#js-tabs button",(t=(y||document).querySelectorAll(e)).length?[...t]:(d.log("findAll: nothing found using selector: "+e),[])),L=g("#js-controls",y);y.insertBefore(this.search.getNode(),b),L.appendChild(this.logsButton.node),L.appendChild(this.refreshButton.node),L.appendChild(this.goToGroooveplButton.node),L.appendChild(this.closeButton.node),this.node=y,this.canvas=b,E.forEach((e=>{var t=e.dataset.id;this.tabs.set(t,e),e.addEventListener("click",(()=>{this.getCurrentCategoryId()!==t&&this.emit("TAB_CLICKED",t),this.selectCategory(t)}))})),this.goToGroooveplButton.on("CLICK",(()=>{var e;null==(e=this.window.open("https://grooove.pl/licznik/","_blank"))||e.focus()})),this.refreshButton.on("CLICK",(()=>{this.message("Trwa pobieranie danych..."),this.emit("REFRESH")})),this.closeButton.on("CLICK",(()=>this.hide())),b.addEventListener("mousewheel",(e=>e.stopPropagation()),{passive:!0}),this.logsButton.on("CLICK",(()=>this.emit("SHOW_LOGS"))),this.appContainer.appendChild(y),this.selectCategory(I.elite2),s=y,a=!1,l=0,h=0,c=e=>{e.stopPropagation(),"touchstart"===e.type?(n=e.touches[0].clientX-l,o=e.touches[0].clientY-h):(n=e.clientX-l,o=e.clientY-h),a=!0},m=e=>{e.stopPropagation(),n=i,o=r,a=!1},v=e=>{a&&(e.preventDefault(),e.stopPropagation(),"touchmove"===e.type?(i=e.touches[0].clientX-n,r=e.touches[0].clientY-o):(i=e.clientX-n,r=e.clientY-o),l=i,h=r,p(i,r,s))},p=(e,t,s)=>{s.style.transform="translate3d("+e+"px, "+t+"px, 0)"},(w=L||s).addEventListener("touchstart",c,!1),w.addEventListener("touchend",m,!1),w.addEventListener("touchmove",v,!1),w.addEventListener("mousedown",c,!1),w.addEventListener("mouseup",m,!1),w.addEventListener("mousemove",v,!1),this.isRendered=!0}hide(){var e;this.isVisible=!1,this.node.classList.remove(ee),null==(e=this.modal)||e.close()}show(){this.isRendered||this.render(),this.isVisible=!0,this.undim(),this.node.classList.add(ee),this.search.focus(),this.emit("SHOW_ADDON")}dim(){this.node.classList.add(se)}undim(){this.node.classList.remove(se)}message(e){this.canvas.innerHTML=e}renderEntries(e){this.canvas.innerHTML=e.map((e=>e.toString())).join("")}getCurrentCategoryId(){if(this.currentCategory)return this.currentCategory.dataset.id}handleNotifications(e){this.launcher.setNotificationsCount(e),this.logsButton.setLabel(""+e),this.logsButton.setClass(X)}displayLogs(e){if(!this.modal){var t=new A({label:"Zamknij"}),s=new M({containerRef:this.window.document.body});t.on("CLICK",(()=>{this.modal.close(),this.undim()})),s.setTitle("Logi dodatku (v"+P+")"),s.setControls([t.node]),this.modal=s}this.dim(),this.modal.setContentMarkup(e.map((e=>new z(e).toString())).join("")),this.modal.open(),this.launcher.setNotificationsCount(0),this.logsButton.setLabel("i"),this.logsButton.removeClass(X)}unselectCurrentCategory(){this.currentCategory&&(this.currentCategory.classList.remove(te),this.currentCategory=void 0)}selectCategory(e){if(this.getCurrentCategoryId()!==e&&(this.unselectCurrentCategory(),e)){var t=this.tabs.get(e);t.classList.add(te),this.currentCategory=t}}getSearchValue(){return this.search.getValue()}}({targetWindow:de,appContainerRef:de.document.body});new class{constructor(e,t,s){this.model=e,this.view=t,this.gameDataProcessor=s.gameDataProcessor,this.logger=s.logger,this.notificationsManager=s.notificationsManager,this.window=s.targetWindow,t.on("SHOW_ADDON",(()=>this.fetch())),t.on("SEARCH",(e=>{if(!e){var t=I.elite2;return this.view.selectCategory(t),void this.renderEntries(t)}this.view.selectCategory(void 0),this.handleSearch(e)})),e.on("DATA",(()=>this.renderEntries(t.getCurrentCategoryId()))),e.on("ERROR",(e=>t.message(e))),t.on("REFRESH",(()=>e.download(!0))),t.on("TAB_CLICKED",(e=>this.renderEntries(e))),t.on("SHOW_LOGS",(()=>{t.displayLogs(this.logger.getAll()),this.notificationsManager.resetCounter()})),this.gameDataProcessor.on("LOOT",(t=>e.upload("/loots",t))),this.gameDataProcessor.on("KILL",(t=>e.upload("/kills",t))),this.notificationsManager.on("NEW",(e=>t.handleNotifications(e)))}renderEntries(e){var t=this.view.getSearchValue();if(t)return this.handleSearch(t,e);var s=this.model.getByCategory(e||I.elite2);if(!s.length)return this.view.message("Na świecie "+k(this.window)+" nie zapisano jeszcze ubić z tej kategorii.");this.view.renderEntries(s.map(ne))}handleSearch(e,t){var s=this.model.search(e.toLowerCase(),t);if(!s.length)return this.view.message("Nie znaleziono ubić pasujących do wyszukiwania.");this.view.renderEntries(s.map(ne))}fetch(){var e,t=this;return(e=function*(){t.model.hasCache()||(yield t.model.download())},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){re(n,i,r,o,a,"next",e)}function a(e){re(n,i,r,o,a,"throw",e)}o(void 0)}))})()}}(we,fe,{logger:ue,targetWindow:de,gameDataProcessor:new class extends e{constructor(e){super(),this.lock=!1,this.framework=e.framework,this.logger=e.logger,this.store=e.store,this.window=e.targetWindow,this.errorReporter=e.errorReporter,this.framework.on("BATTLE_START",(e=>this.handleBattleStart(e))),this.framework.on("BATTLE_END",(()=>this.handleBattleEnd())),this.framework.on("NEW_FIGHTER",(e=>this.handleNewFighter(e))),this.framework.on("FIGHTER_DATA_UPDATE",(e=>this.handleNewFighter(e))),this.framework.on("BATTLE_LOG_ITEMS",(e=>this.handleBattleLogItem(e))),this.framework.on("LOOTS",(e=>this.handleLoots(e))),this.framework.on("NPC_DELETED",(e=>this.handleNpcDeleted(e))),this.framework.on("FIGHTER_KILLED",(e=>this.handleFighterKilled(e)))}handleBattleStart(e){var t,{isFreshBattle:s,rawResponse:i}=e;this.lock=!1,s?(this.resetStorageItems(),this.resetStorageNpc()):null!=(t=i.f)&&t.endBattle&&(this.lock=!0,this.logger.log('Wykryto odświeżenie strony z już zakończoną walką. Zapis ubić sposobem "BATTLE_NPC_HPP" został wyłączony dla tej walki.'))}handleBattleEnd(){setTimeout((()=>{this.resetStorageItems(),this.resetStorageNpc()}),2e3)}handleNewFighter(e){var{npc:t}=e;t&&!this.getRegisteredNpcById(t.id)&&this.registerNpc({id:t.id,icon:t.icon,name:t.name,lvl:t.lvl,category:F(t.rank)})}handleBattleLogItem(e){var{npcName:t,items:s,rawResponse:i}=e;if(this.logger.log('Loot z logu walki "'+s.join(", ")+'" z NPC: "'+t+'"'),!this.getAllRegisteredNpc().some((e=>e.name===t)))return this.logger.report('Zdobyto loot "'+s.join(", ")+'" z niezarejestrowanego NPC: "'+t+'"'),void this.errorReporter.report(JSON.stringify(i));s.forEach((e=>{this.logger.log('Persystencja dla itema z logu walki "'+e+'" z NPC "'+t+'"'),this.store.add(U,{itemName:e,npcName:t})}))}handleNpcDeleted(e){var{npcId:t}=e,s=L(t,this.window);if(s){var i=this.getRegisteredNpcById(s.id);i&&q(i.category)&&(this.logger.log('Wykryto ubicie NPC "'+s.name+'" sposobem "NPC_REMOVED_FROM_THE_MAP"'),this.emit("KILL",{npc:i}))}}handleFighterKilled(e){var{npc:t}=e;if(t){this.getRegisteredNpcById(t.id)||this.registerNpc({id:t.id,icon:t.icon,name:t.name,lvl:t.lvl,category:F(t.rank)});var s=this.getRegisteredNpcById(t.id);s&&(q(s.category)?(this.logger.log('Wykryto ubicie NPC "'+t.name+'" sposobem "BATTLE_NPC_HPP"'),this.lock||this.emit("KILL",{npc:s})):this.logger.log('Ranga NPC "'+t.name+'" zbyt niska - "'+s.category+'"'))}}handleLoots(e){var{items:t,rawResponse:s}=e,i=(e=>e.map((e=>({name:e.name,rank:y(e.stat),stats:e.stat}))))(t).filter((e=>(this.logger.log('Zdobyto item "'+e.name+'" - '+(e=>{switch(e){case w.common:return"zwykły";case w.unique:return"unikat";case w.heroic:return"heroik";case w.legendary:return"legendarny"}})(e.rank)),this.logger.log('Statsy "'+e.name+'": "'+e.stats+'"'),e.rank>=w.unique)));i.length&&(this.getAllRegisteredNpc().length?this.isEveryItemInStorage(i,s)&&this.applyLootsToNpc(i):this.logger.log("Loot kwalifikujący się do zapisu, ale brak zarejestrowanych NPC."))}applyLootsToNpc(e){var t=this.getAllRegisteredNpc(),s=this.getAllRegisteredItems(),i=[];t.forEach((t=>{if(q(t.category)){if(!i.includes(t.name)){i.push(t.name);var r=e.filter((e=>{var i=s.find((t=>t.itemName===e.name));return!!i&&t.name===i.npcName})),n=this.countItemTypes(r);this.logger.log('Zapis lootu "'+JSON.stringify(n)+'" dla NPC "'+t.name+'"'),this.emit("LOOT",{npc:t,loots:n})}}else this.logger.log("Ubity NPC ze zbyt niską rangą ("+t.category+'): "'+t.name+'"')}))}countItemTypes(e){var t={[w.unique]:0,[w.heroic]:0,[w.legendary]:0};return e.forEach((e=>{var{rank:s}=e;s<w.unique||(t[s]+=1)})),t}isEveryItemInStorage(e,t){var s=this.getAllRegisteredItems();return s.length?e.every((e=>!!s.some((t=>t.itemName===e.name))||(this.logger.report('Brak persystencji dla itema z logu walki: "'+e.name+'"'),this.errorReporter.report(JSON.stringify(t)),!1))):(this.logger.report("Brak persystencji dla lootu z logu walki."),this.errorReporter.report(JSON.stringify(t)),!1)}resetStorageItems(){this.logger.log("Resetowanie stanu zarejestrowanych itemów z logu walki"),this.store.remove(U)}resetStorageNpc(){this.logger.log("Resetowanie stanu zarejestrowanych NPC"),this.store.remove(K)}registerNpc(e){this.logger.log('Persystencja dla NPC "'+e.name+'" - ranga: "'+e.category+'"'),this.store.add(K,e)}getAllRegisteredNpc(){return this.store.get(K)||[]}getAllRegisteredItems(){return this.store.get(U)||[]}getRegisteredNpcById(e){return this.getAllRegisteredNpc().find((t=>t.id===e))}}({framework:ve,logger:ue,store:pe,targetWindow:de,errorReporter:me}),notificationsManager:new class extends e{constructor(e){super(),this.counter=0,this.logger=e,this.logger.on("ERROR",(()=>{this.counter+=1,this.emit("NEW",this.counter)}))}resetCounter(){this.counter=0}}(ue)});var ye=new class{constructor(e){this.logger=e.logger,this.addonClassName=e.addonClassName,this.window=e.targetWindow}check(){this.window.document.getElementsByClassName(this.addonClassName).length>1&&this.logger.error("Wykryto, że Licznik Ubić jest zainstalowany dwukrotnie. Usuń jeden z nich, aby dane zapisywały się poprawnie.")}}({logger:ue,targetWindow:de,addonClassName:j});setTimeout((()=>ye.check()),1e3*(3,15,Math.floor(13*Math.random()+3))),new class{constructor(e){this.httpService=e.httpService,this.store=e.store,this.checkInterval=e.checkInterval}checkForUpdates(){var e,t=this;return(e=function*(){var e="lastChecked",s=t.store.get(e)||0;if(!(Date.now()-s<t.checkInterval))try{var{version:i}=yield t.httpService.get("/latest-addon-version",{client:"COUNTER"});t.store.set("version",i),t.store.set(e,Date.now())}catch(e){}},function(){var t=this,s=arguments;return new Promise((function(i,r){var n=e.apply(t,s);function o(e){G(n,i,r,o,a,"next",e)}function a(e){G(n,i,r,o,a,"throw",e)}o(void 0)}))})()}}({httpService:ge,store:Q("ga-universal-counter-version",ue),checkInterval:36e5}).checkForUpdates()})();