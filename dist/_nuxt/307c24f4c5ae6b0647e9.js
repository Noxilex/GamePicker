(window.webpackJsonp=window.webpackJsonp||[]).push([[5,2,3,4],{233:function(e,t,n){var content=n(236);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(64).default)("06ef5dbf",content,!0,{sourceMap:!1})},234:function(e,t,n){var content=n(238);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(64).default)("33186146",content,!0,{sourceMap:!1})},235:function(e,t,n){"use strict";var r=n(233);n.n(r).a},236:function(e,t,n){(t=n(63)(!1)).push([e.i,"#result[data-v-72095b60]{min-height:200px;width:100%}.list-group-item[data-v-72095b60]{display:flex;flex-flow:row wrap;justify-content:flex-start;align-items:center;padding:0;background-color:rgba(44,38,38,.8);color:#fff}.list-group-item>img[data-v-72095b60]{flex:initial}.list-group-item>h2[data-v-72095b60]{flex:auto}",""]),e.exports=t},237:function(e,t,n){"use strict";var r=n(234);n.n(r).a},238:function(e,t,n){(t=n(63)(!1)).push([e.i,".friendlist{height:500px;color:#fff;overflow-y:auto}",""]),e.exports=t},239:function(e,t,n){var content=n(244);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(64).default)("6759f5ab",content,!0,{sourceMap:!1})},240:function(e,t,n){"use strict";n.r(t);var r={props:{user:{type:Object,default:function(){return{name:"DefaultUser"}}},gamelist:{type:Array,required:!0}},methods:{getImageURL:function(e,t){return"http://media.steampowered.com/steamcommunity/public/images/apps/".concat(e,"/").concat(t,".jpg")},formatTimeString:function(e){var t=Math.floor(e/60),n=e%60;return t>0?n>0?"".concat(t,"h").concat(n,"min"):"".concat(t,"h"):"".concat(n,"min")}}},o=(n(235),n(65)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.gamelist?n("b-list-group",{attrs:{id:"results",flush:""}},e._l(e.gamelist,(function(t,r){return n("b-list-group-item",{key:r},[t.img_logo_url||t.img_icon_url?n("img",{attrs:{src:e.getImageURL(t.appid,t.img_logo_url||t.img_icon_url)}}):e._e(),e._v(" "),n("h3",{staticClass:"px-3"},[e._v("\n        "+e._s(t.name)+"\n      ")])])})),1):e._e(),e._v(" "),e.gamelist?e._e():n("h2",[e._v("\n    You don't have any games in common... Sorry 😕\n  ")])],1)}),[],!1,null,"72095b60",null);t.default=component.exports},241:function(e,t,n){"use strict";n.r(t);n(30),n(29),n(122),n(81);var r={props:["friendlist"],data:function(){return{filterName:"",selectedFriends:[]}},computed:{filteredFriendList:function(){var e=this,t=new RegExp(this.toLowerCase(this.filterName),"g");return this.friendlist?this.friendlist.filter((function(n){return e.toLowerCase(n.name).match(t)})):[]}},methods:{toLowerCase:function(e){return e.split("").map((function(e){return e.toLowerCase()})).join("")}}},o=(n(237),n(65)),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[n("h1",[e._v("Select the friends you wanna play with")]),e._v(" "),n("div",{staticClass:"content"},[n("b-input",{model:{value:e.filterName,callback:function(t){e.filterName=t},expression:"filterName"}}),e._v(" "),n("b-form-group",{staticClass:"friendlist"},[n("b-form-checkbox-group",{attrs:{id:"checkbox-group-2",name:"flavour-2",stacked:""},model:{value:e.selectedFriends,callback:function(t){e.selectedFriends=t},expression:"selectedFriends"}},e._l(e.filteredFriendList,(function(t,r){return n("b-form-checkbox",{key:r,attrs:{value:t.steamid}},[e._v("\n          "+e._s(t.name)+"\n          "),n("img",{attrs:{src:t.avatar}})])})),1)],1)],1),e._v(" "),n("b-button",{on:{click:function(t){return e.$emit("friendListInput",e.selectedFriends)}}},[e._v("\n    Confirm\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports},242:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{username:""}},methods:{verifyUser:function(){return!0}}},o=n(65),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Enter your Steam name")]),e._v(" "),n("b-form",{staticClass:"py-2"},[n("b-form-input",{attrs:{trim:""},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),n("b-button",{staticClass:"mt-5",attrs:{variant:"success"},on:{click:function(t){return e.$emit("usernameInput",e.username)}}},[e._v("\n      Next\n    ")])],1)],1)}),[],!1,null,null,null);t.default=component.exports},243:function(e,t,n){"use strict";var r=n(239);n.n(r).a},244:function(e,t,n){var r=n(63),o=n(245),c=n(246);t=r(!1);var l=o(c);t.push([e.i,"body{background-image:url("+l+");background-color:#35495e;color:#000}.content{overflow:auto;flex:1 1 auto;justify-content:center}#form{position:relative}h1{color:#fff}.blur-bg{background-color:rgba(0,0,0,.7);-webkit-filter:blur(20px);filter:blur(20px)}.container{color:#fff;position:relative;margin:0 auto;display:flex;height:100vh;flex-direction:column;justify-content:space-evenly;align-items:center;text-align:center}#results{flex:1 1 auto;overflow:auto}#header{flex:initial;position:relative;top:0;width:100%;padding-top:10px;padding-bottom:10px}.title{font-family:Quicksand,Source Sans Pro,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;display:block;font-weight:300;font-size:100px;color:#35495e;letter-spacing:1px}.subtitle{font-weight:300;font-size:42px;color:#526488;word-spacing:5px;padding-bottom:15px}.links{padding-top:15px}.absolute{position:absolute;height:100%;width:100%;z-index:-1}",""]),e.exports=t},245:function(e,t,n){"use strict";e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},246:function(e,t,n){e.exports=n.p+"img/8d237eb.jpg"},247:function(e,t,n){"use strict";n.r(t);n(10),n(9),n(70),n(82);var r=n(33),o=(n(123),n(124),n(29),n(79)),c=n.n(o),l=n(241),m=n(242),f=n(240),d={components:{FriendList:l.default,Start:m.default,CommonGameList:f.default},data:function(){return{user:null,currentComponent:m.default,friendlist:[],commonGameList:[],listGames:[{name:"Game1",playtime:100},{name:"Game2",playtime:200},{name:"Game3",playtime:300}]}},computed:{filteredListGames:function(){return this.listGames.filter((function(e){return e.name&&e.name.length>0&&!(e.name.includes("ValveTestApp")||e.name.includes("UntitledApp"))})).sort((function(e,t){return t.playtime-e.playtime}))}},mounted:function(){},methods:{onUsernameInput:function(e){var t=this;this.getUserData(e).then((function(e){return t.user=e,t.getFriendList(e.id)})).then((function(e){t.friendlist=e.map((function(e){return{name:e.personaname,icon:e.avatar,steamid:e.steamid}})),t.currentComponent=l.default})).catch((function(e){t.toast("Error","danger",e.message)}))},getPromiseArray:function(e){var t=this,n=[];return e.forEach((function(e){return n.push(t.getUserGames(e))})),n},onFriendListInput:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e.push(t.user),r=[],n.next=5,Promise.all(t.getPromiseArray(e));case 5:r=(r=n.sent).filter((function(e){var t=void 0!==e;return t&&console.log("Removed a game list because it was undefined"),t})),console.log("Get common games"),o=r[0],Array.isArray(r)&&r.length>1&&r.forEach((function(e){var t=o.map((function(e){return e.appid})),n=[];e.forEach((function(e){t.includes(e.appid)&&n.push(e)})),o=n})),console.log("Games to keep:",o),t.commonGameList=o,t.currentComponent=f.default,n.next=20;break;case 15:n.prev=15,n.t0=n.catch(0),console.log(n.t0),t.toast("Error","danger",n.t0.message),t.currentComponent=m.default;case 20:case"end":return n.stop()}}),n,null,[[0,15]])})))()},getFriendList:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={url:"http://api.steampowered.com/ISteamUser/GetFriendList/v0001/",method:"get",responseType:"json",params:{key:"3E2DC52CF04CD401DE0DBD7A9E63DC6F",steamid:e,relationship:"friend"}},t.next=3,c()(n).then((function(e){return e.data.friendslist.friends}));case 3:return r=t.sent,o={url:"http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",method:"get",responseType:"json",params:{key:"3E2DC52CF04CD401DE0DBD7A9E63DC6F",steamids:r.map((function(e){return e.steamid})).join(",")}},t.next=7,c()(o).then((function(e){return e.data.response.players}));case 7:return l=t.sent,t.abrupt("return",l);case 9:case"end":return t.stop()}}),t)})))()},getGameInfo:function(e){var t={url:"http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/",method:"get",responseType:"json",params:{key:"3E2DC52CF04CD401DE0DBD7A9E63DC6F",appid:e}};return c()(t).then((function(e){if(e.error)throw new Error(e.error);return e.data.game})).catch((function(e){throw new Error(e)}))},queryGamesForUser:function(e){var t=this;this.listGames=[],this.getUserGames(e).then((function(e){var n=[];e.forEach((function(e){var t=e.img_logo_url||e.img_icon_url;n.push({name:e.name,playtime:e.playtime_forever,appIcon:t})})),t.listGames=n})).catch((function(e){t.toast("Error","danger",e.message),console.error(e)}))},getUserData:function(e){var t={url:"http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/",method:"get",responseType:"json",params:{key:"3E2DC52CF04CD401DE0DBD7A9E63DC6F",vanityurl:e}};return c()(t).then((function(e){if(e.error)throw new Error(e.error);return e.data.response}))},getUserGames:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={url:"http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/",method:"get",responseType:"json",params:{key:"3E2DC52CF04CD401DE0DBD7A9E63DC6F",steamid:e,format:"json",include_appinfo:!0,include_played_free_games:!0}},t.next=3,c()(n);case 3:return r=t.sent,t.abrupt("return",r.data.response.games);case 5:case"end":return t.stop()}}),t)})))()},toast:function(e,t,n){this.$bvToast.toast(n,{title:e,variant:t,autoHideDelay:5e3})}}},h=(n(243),n(65)),component=Object(h.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container ",attrs:{id:"page"}},[n("div",{staticClass:"absolute blur-bg"}),e._v(" "),e._m(0),e._v(" "),n("div",{staticClass:"content d-flex flex-column py-5"},[n(e.currentComponent,{tag:"component",attrs:{gamelist:e.commonGameList,friendlist:e.friendlist},on:{usernameInput:e.onUsernameInput,friendListInput:e.onFriendListInput}})],1)])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"header"}},[t("h1",[this._v("Game Picker")])])}],!1,null,null,null);t.default=component.exports}}]);