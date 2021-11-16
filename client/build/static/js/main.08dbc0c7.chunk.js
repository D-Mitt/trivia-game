(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{24:function(e,t,a){},49:function(e,t,a){},69:function(e,t,a){},71:function(e,t,a){},72:function(e,t,a){"use strict";a.r(t);a(38);var r,n=a(0),c=a.n(n),s=a(13),i=a.n(s),o=a(8),u=a(14),d=(a(49),a(2)),m=(a(24),a(4)),j=a(34),b=a(10),g=a.n(b),l=a(21),O=a(22),f=a.n(O),h="https://dmitton-trivia-quiz.herokuapp.com",x="CREATE_NEW_GAME_REQUESTED",v="CREATE_NEW_GAME_SUCCEEDED",p="CREATE_NEW_GAME_FAILED",D="GET_GAME_SUCCEEDED";!function(e){e.Done="DONE",e.Unknown="UNKNOWN",e.Started="STARTED",e.Waiting="WAITING"}(r||(r={}));a(69);var w=a(1),E=function(){var e=Object(o.c)((function(e){return e.game})),t=Object(o.b)(),a=Object(n.useState)(0),c=Object(m.a)(a,2),s=c[0],i=c[1];Object(n.useEffect)((function(){var e=setInterval((function(){u()}),2e3);return i(e),function(){clearInterval(s)}}),[]);var u=function(){var a;t((a=e.gameId,function(){var e=Object(l.a)(g.a.mark((function e(t){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"GET_GAME_REQUESTED"}),e.prev=1,e.next=4,f.a.get("".concat(h,"/games/").concat(a));case 4:r=e.sent,t((n=r.data,{type:D,gameData:n})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:"GET_GAME_FAILED"});case 11:case"end":return e.stop()}var n}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()))},d=function(){var t=Date.now(),a=new Date(JSON.parse(JSON.stringify(e.timeOfNextRound))).valueOf();return Math.ceil(Math.max(0,a-t)/1e3)},b=function(t){var a=t.startTime,r=t.countdownTimer,c=Object(n.useState)(!1),s=Object(m.a)(c,2),i=s[0],o=s[1];return Object(n.useEffect)((function(){i&&clearInterval(r)}),[i]),a<=0&&!i&&o(!0),Object(w.jsx)("div",{className:"round-start mb-5",children:e.isWaitingForNextRound?"Game starting in ".concat(a," seconds"):""})},O=function(e){var t=e.gameStartCheckId,a=e.gameState,c=Object(n.useState)(!1),s=Object(m.a)(c,2),i=s[0],o=s[1],u=Object(n.useState)(0),g=Object(m.a)(u,2),l=g[0],O=g[1],f=Object(n.useState)(10),h=Object(m.a)(f,2),x=h[0],v=h[1];if(Object(n.useEffect)((function(){if(i){clearInterval(t);var e=setInterval((function(){v(d())}),1e3);O(e)}}),[i]),a.isWaitingForNextRound&&!i&&a.status===r.Waiting&&o(!0),a.status===r.Waiting){var p=void 0!==a.requiredToStart&&void 0!==a.totalUsers?Math.min(0,a.requiredToStart-a.totalUsers):0;return Object(w.jsxs)("div",{className:"waiting-container",children:[Object(w.jsx)("div",{className:"mb-3",children:"You are Contestant #".concat(a.userId)}),Object(w.jsx)(b,{startTime:x,countdownTimer:l}),Object(w.jsxs)("div",{className:"d-flex",children:[Object(w.jsx)("div",{children:Object(w.jsx)(j.a,{animation:"border",role:"status",children:Object(w.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}),Object(w.jsx)("div",{className:"waiting-message",children:"Waiting for at least ".concat(p," more...")})]})]})}return null};return Object(w.jsx)(O,{gameStartCheckId:s,gameState:e})},N=a(37),S=a(73),I=(a(71),function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.game.isSearchingForGame})),a=Object(o.c)((function(e){return e.game.gameId}));if(a!==S.a)return Object(w.jsx)(d.a,{to:"/games/".concat(a)});var r=function(){var a=Object(n.useState)(!1),r=Object(m.a)(a,2),c=r[0],s=r[1],i=Object(n.useCallback)((function(){s(!0)}),[c]);return Object(n.useEffect)((function(){c&&e(function(){var e=Object(l.a)(g.a.mark((function e(t){var a,r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:x}),e.prev=1,a={},e.next=5,f.a.post("".concat(h,"/games"),a);case 5:r=e.sent,t((n=r.data,{type:v,gameData:n})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t({type:p});case 12:case"end":return e.stop()}var n}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[c]),Object(w.jsx)(N.a,{className:"mt-5",variant:"primary",size:"lg",onClick:t?void 0:function(){i()},disabled:t,children:t?"Searching...":"Find a Game"})};return Object(w.jsxs)("div",{children:[Object(w.jsx)("div",{className:"title mt-5",children:"Welcome to the Trivia Quiz!"}),Object(w.jsx)("div",{className:"description mt-3",children:"Compete with other players to see who can correctly answer the most questions."}),Object(w.jsx)("div",{className:"description mt-3",children:"Find a game below!"}),Object(w.jsx)(r,{})]})}),R=function(){return Object(w.jsx)("div",{className:"dark-mode-background",children:Object(w.jsx)("h1",{children:"Sorry, page not found"})})},A=function(){return Object(w.jsxs)(d.d,{children:[Object(w.jsx)(d.b,{path:"/",element:Object(w.jsx)(I,{})}),Object(w.jsx)(d.b,{path:"/games/:id",element:Object(w.jsx)(E,{})}),Object(w.jsx)(d.b,{path:"*",element:Object(w.jsx)(R,{})})]})},T=function(){return Object(w.jsx)("div",{className:"App",children:Object(w.jsx)("main",{children:Object(w.jsx)(u.a,{children:Object(w.jsx)(A,{})})})})},U=a(9),k=a(35),C=a(36),F=a(3),W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isSearchingForGame:!1,gameId:S.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],currentCorrectAnswer:"",status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2},t=arguments.length>1?arguments[1]:void 0,a=e;switch(t.type){case x:a=Object(F.a)(Object(F.a)({},a),{},{isSearchingForGame:!0});break;case v:a=Object(F.a)(Object(F.a)({},a),{},{isSearchingForGame:!1,gameId:t.gameData.gameId,userId:t.gameData.userId,isWaitingForNextRound:t.gameData.isWaitingForNextRound,timeOfNextRound:t.gameData.timeOfNextRound,currentRound:t.gameData.currentRound,currentQuestion:t.gameData.currentQuestion,currentIncorrectAnswers:t.gameData.currentIncorrectAnswers,currentCorrectAnswer:t.gameData.currentCorrectAnswer,status:t.gameData.status,totalUsers:t.gameData.totalUsers,remainingUsers:t.gameData.remainingUsers,requiredToStart:t.gameData.requiredToStart});break;case D:a=Object(F.a)(Object(F.a)({},a),{},{isSearchingForGame:!1,gameId:t.gameData.gameId,isWaitingForNextRound:t.gameData.isWaitingForNextRound,timeOfNextRound:t.gameData.timeOfNextRound,currentRound:t.gameData.currentRound,currentQuestion:t.gameData.currentQuestion,currentIncorrectAnswers:t.gameData.currentIncorrectAnswers,currentCorrectAnswer:t.gameData.currentCorrectAnswer,status:t.gameData.status,totalUsers:t.gameData.totalUsers,remainingUsers:t.gameData.remainingUsers,requiredToStart:t.gameData.requiredToStart});break;case p:a=Object(F.a)(Object(F.a)({},a),{},{isSearchingForGame:!1,gameId:S.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],currentCorrectAnswer:"",status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2})}return a},G=Object(U.combineReducers)({game:W});var y,_={game:{isSearchingForGame:!1,gameId:S.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],currentCorrectAnswer:"",status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2}},q=(y=_,Object(U.createStore)(G,y,Object(k.composeWithDevTools)(Object(U.applyMiddleware)(C.a))));i.a.render(Object(w.jsx)(o.a,{store:q,children:Object(w.jsx)(c.a.StrictMode,{children:Object(w.jsx)(T,{})})}),document.getElementById("root"))}},[[72,1,2]]]);
//# sourceMappingURL=main.08dbc0c7.chunk.js.map