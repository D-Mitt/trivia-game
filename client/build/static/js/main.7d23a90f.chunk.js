(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{31:function(e,t,a){},60:function(e,t,a){},91:function(e,t,a){},93:function(e,t,a){},94:function(e,t,a){"use strict";a.r(t);a(50);var r,n=a(0),s=a.n(n),c=a(24),i=a.n(c),o=a(11),u=a(25),d=(a(60),a(3)),l=(a(31),a(7)),m=a(28),j=a(17),b=a(29),g=a(46),O="https://dmitton-trivia-quiz.herokuapp.com",f=a(13),h=a.n(f),S=a(20),v=a(21),x=a.n(v),w="CREATE_NEW_SOLO_GAME_REQUESTED",A="CREATE_NEW_SOLO_GAME_SUCCEEDED",p="CREATE_NEW_SOLO_GAME_FAILED",E="JOIN_MULTIPLAYER_GAME_REQUESTED",D="JOIN_MULTIPLAYER_GAME_SUCCEEDED",I="JOIN_MULTIPLAYER_GAME_FAILED",N="GET_GAME_SUCCEEDED",R="UPDATE_REMAINING_PLAYERS_REQUESTED",y="UPDATE_REMAINING_PLAYERS_SUCCEEDED",U="UPDATE_REMAINING_PLAYERS_FAILED",C="SELECTED_ANSWER_SET";!function(e){e.Done="DONE",e.Unknown="UNKNOWN",e.Started="STARTED",e.Waiting="WAITING"}(r||(r={}));var T=function(e,t,a){return function(){var r=Object(S.a)(h.a.mark((function r(n){return h.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n({type:R}),r.prev=1,!a){r.next=5;break}return r.next=5,x.a.post("".concat(O,"/games/").concat(e,"/remainingPlayers/").concat(t),{});case 5:n({type:y}),r.next=11;break;case 8:r.prev=8,r.t0=r.catch(1),n({type:U});case 11:case"end":return r.stop()}}),r,null,[[1,8]])})));return function(e){return r.apply(this,arguments)}}()},_=(a(91),a(1)),k=function(){var e=Object(o.c)((function(e){return e.game})),t=Object(o.b)(),a=Object(n.useState)(0),s=Object(l.a)(a,2),c=s[0],i=s[1];Object(n.useEffect)((function(){var e=setInterval((function(){u()}),2e3);return i(e),function(){clearInterval(c)}}),[]);var u=function(){var a;t((a=e.gameId,function(){var e=Object(S.a)(h.a.mark((function e(t){var r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"GET_GAME_REQUESTED"}),e.prev=1,e.next=4,x.a.get("".concat(O,"/games/").concat(a));case 4:r=e.sent,t((n=r.data,{type:N,gameData:n})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t({type:"GET_GAME_FAILED"});case 11:case"end":return e.stop()}var n}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}()))},d=function(e){var t=Date.now(),a=new Date(JSON.parse(JSON.stringify(e))).valueOf();return Math.ceil(Math.max(0,a-t)/1e3)},f=function(t){var a=t.startTime,r=t.countdownTimer,s=Object(n.useState)(!1),c=Object(l.a)(s,2),i=c[0],o=c[1];Object(n.useEffect)((function(){i&&(clearInterval(r),u())}),[i]),a<=0&&!i&&o(!0);var d="seconds";return 1===a&&(d="second"),Object(_.jsx)("div",{className:"alerting mb-5",children:e.isWaitingForNextRound?"Game starting in ".concat(a," ").concat(d):""})},v=function(e){var t=e.gameStartCheckId,a=e.gameState,r=Object(n.useState)(!1),s=Object(l.a)(r,2),c=s[0],i=s[1],o=Object(n.useState)(0),u=Object(l.a)(o,2),m=u[0],j=u[1],b=Object(n.useState)(a.isSolo?5:12),O=Object(l.a)(b,2),h=O[0],S=O[1];Object(n.useEffect)((function(){if(c){clearInterval(t);var e=setInterval((function(){S(d(a.timeOfNextRound))}),1e3);j(e)}return function(){clearInterval(m)}}),[c]);var v=void 0!==a.requiredToStart&&void 0!==a.totalUsers?Math.max(0,a.requiredToStart-a.totalUsers):0;return a.isWaitingForNextRound&&0===v&&!c&&i(!0),Object(_.jsxs)("div",{className:"waiting-container",children:[Object(_.jsx)("div",{className:"mb-3",children:"You are Player #".concat(a.userId)}),Object(_.jsx)(f,{startTime:h,countdownTimer:m}),a.isSolo?Object(_.jsx)("div",{className:"waiting-message",children:"Enjoy your solo game!"}):Object(_.jsxs)("div",{className:"d-flex",children:[Object(_.jsx)("div",{children:Object(_.jsx)(g.a,{animation:"border",role:"status",children:Object(_.jsx)("span",{className:"visually-hidden",children:"Loading..."})})}),Object(_.jsx)("div",{className:"waiting-message",children:0===v?"Waiting for any stragglers...":"Waiting for at least ".concat(v," more...")})]})]})},w=function(a){var r=a.startTime,s=a.countdownTimer,c=Object(n.useState)(!1),i=Object(l.a)(c,2),o=i[0],d=i[1];Object(n.useEffect)((function(){o&&(clearInterval(s),u(),e.hasSubmittedAnswer||t(T(e.gameId,e.userId,!0)))}),[o]),r<=0&&!o&&d(!0);var m="seconds";return 1===r&&(m="second"),Object(_.jsx)("div",{className:"alerting mb-5",children:"".concat(r," ").concat(m," left to answer!")})},A=function(e){var t=e.gameState,a=Object(n.useState)(""),r=Object(l.a)(a,2),s=r[0],c=r[1],i=function(e){c(e.target.id.substr(7))},o=[];return t.allCurrentAnswersShuffled.forEach((function(e,a){var r="";t.hasSubmittedAnswer&&(r="answer-border-wrong",e===t.currentCorrectAnswer&&(r="answer-border-correct")),o.push(Object(_.jsx)("div",{className:"".concat(r," mb-3 px-3"),children:Object(_.jsx)(b.a.Check,{type:"radio",id:"answer-".concat(a),label:"".concat(Object(m.a)(e)),className:"answer",disabled:t.hasSubmittedAnswer,onChange:i,checked:s==="".concat(a)})},"answer-".concat(a)))})),Object(_.jsxs)(_.Fragment,{children:[Object(_.jsx)(b.a,{children:Object(_.jsx)("div",{children:o},"answer-form")}),Object(_.jsx)(p,{gameState:t,selectedAnswer:s})]})},p=function(e){var a=e.gameState,r=e.selectedAnswer,s=Object(n.useState)(!1),c=Object(l.a)(s,2),i=c[0],o=c[1];return Object(n.useEffect)((function(){var e=a.allCurrentAnswersShuffled[r]!==a.currentCorrectAnswer;i&&t(T(a.gameId,a.userId,e))}),[i]),Object(_.jsx)(j.a,{className:"mt-5",variant:"success",size:"lg",onClick:a.hasSubmittedAnswer?void 0:function(){o(!0)},disabled:a.hasSubmittedAnswer,children:a.isUpdatingRemainingPlayers?"Submitting...":"Submit Answer"})},E=function(e){var t=e.gameState,a=Object(n.useState)(0),r=Object(l.a)(a,2),s=r[0],c=r[1],i=Object(n.useState)(12),o=Object(l.a)(i,2),u=o[0],j=o[1];return Object(n.useEffect)((function(){var e=setInterval((function(){j(d(t.timeOfNextRound))}),1e3);return c(e),function(){clearInterval(e)}}),[]),Object(_.jsxs)("div",{className:"waiting-container",children:[Object(_.jsx)("div",{children:"Round ".concat(t.currentRound)}),Object(_.jsx)("div",{className:"mb-3",children:"".concat(Object(m.a)(t.currentQuestion))}),Object(_.jsx)(w,{startTime:u,countdownTimer:s}),Object(_.jsx)(A,{gameState:t})]})},D=function(e){var t=e.gameState,a=function(){return Object(_.jsx)(j.a,{className:"mt-5",variant:"success",size:"lg",href:O,children:"Home"})};return Object(_.jsxs)("div",{children:[t.hasPlayerWon?Object(_.jsx)("div",{className:"mt-5 win",children:"Congratulations, you won!"}):Object(_.jsx)("div",{className:"mt-5 alerting",children:"Oh no, you lost!"}),Object(_.jsx)("div",{className:"description mt-3",children:"Play again?"}),Object(_.jsx)(a,{})]})};return e.status===r.Waiting?Object(_.jsx)(v,{gameStartCheckId:c,gameState:e}):e.status===r.Started?Object(_.jsx)(E,{gameState:e}):e.status===r.Done||e.hasPlayerLost?Object(_.jsx)(D,{gameState:e}):null},P=a(95),G=(a(93),function(){var e=Object(o.b)(),t=Object(o.c)((function(e){return e.game.isSearchingForGame})),a=Object(o.c)((function(e){return e.game.isCreatingSoloGame})),r=Object(o.c)((function(e){return e.game.gameId}));if(r!==P.a)return Object(_.jsx)(d.a,{to:"/games/".concat(r)});var s=function(r){var s=r.classes,c=Object(n.useState)(!1),i=Object(l.a)(c,2),o=i[0],u=i[1],d=Object(n.useCallback)((function(){u(!0)}),[o]);return Object(n.useEffect)((function(){o&&e(function(){var e=Object(S.a)(h.a.mark((function e(t){var a,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:E}),e.prev=1,a={},e.next=5,x.a.post("".concat(O,"/games"),a);case 5:r=e.sent,t((n=r.data,{type:D,gameData:n})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t({type:I});case 12:case"end":return e.stop()}var n}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[o]),Object(_.jsx)(j.a,{className:"".concat(s," mt-5"),variant:"success",size:"lg",onClick:t?void 0:function(){d()},disabled:t||a,children:t?"Searching...":"Find a Game"})},c=function(r){var s=r.classes,c=Object(n.useState)(!1),i=Object(l.a)(c,2),o=i[0],u=i[1],d=Object(n.useCallback)((function(){u(!0)}),[o]);return Object(n.useEffect)((function(){o&&e(function(){var e=Object(S.a)(h.a.mark((function e(t){var a,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:w}),e.prev=1,a={},e.next=5,x.a.post("".concat(O,"/soloGames"),a);case 5:r=e.sent,t((n=r.data,{type:A,gameData:n})),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),t({type:p});case 12:case"end":return e.stop()}var n}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}),[o]),Object(_.jsx)(j.a,{className:"".concat(s," mt-5"),variant:"success",size:"lg",onClick:a?void 0:function(){d()},disabled:t||a,children:a?"Creating...":"Solo Game"})};return Object(_.jsxs)("div",{children:[Object(_.jsx)("div",{className:"title mt-5",children:"Welcome to the Trivia Quiz!"}),Object(_.jsx)("div",{className:"description mt-3",children:"Compete with other players to see who can correctly answer the most questions."}),Object(_.jsx)("div",{className:"description mt-3",children:"Find a game below!"}),Object(_.jsxs)("div",{children:[Object(_.jsx)(s,{classes:"first-button"}),Object(_.jsx)(c,{classes:""})]})]})}),W=function(){return Object(_.jsx)("div",{className:"mt-5 dark-mode-background",children:Object(_.jsx)("h1",{children:"Sorry, page not found"})})},L=function(){return Object(_.jsxs)(d.d,{children:[Object(_.jsx)(d.b,{path:"/",element:Object(_.jsx)(G,{})}),Object(_.jsx)(d.b,{path:"/games/:id",element:Object(_.jsx)(k,{})}),Object(_.jsx)(d.b,{path:"*",element:Object(_.jsx)(W,{})})]})},F=function(){return Object(_.jsx)("div",{className:"App",children:Object(_.jsx)("main",{children:Object(_.jsx)(u.a,{children:Object(_.jsx)(L,{})})})})},M=a(15),Q=a(47),q=a(48),J=a(49),Y=a(2),z=function(e){for(var t,a=e.length;0!=a;){t=Math.floor(Math.random()*a),a--;var r=[e[t],e[a]];e[a]=r[0],e[t]=r[1]}return e},B=function(e,t){return-1===e.findIndex((function(e){return e===t}))},H=function(e,t){return 1===e.length&&e[0]===t},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isSearchingForGame:!1,isCreatingSoloGame:!1,gameId:P.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],currentCorrectAnswer:"",allCurrentAnswersShuffled:[],status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,selectedAnswer:"",hasPlayerLost:!1,hasPlayerWon:!1,isSolo:!0},t=arguments.length>1?arguments[1]:void 0,a=e;switch(t.type){case w:a=Object(Y.a)(Object(Y.a)({},a),{},{isCreatingSoloGame:!0});break;case A:a=Object(Y.a)(Object(Y.a)({},a),{},{isCreatingSoloGame:!1,gameId:t.gameData.gameId,userId:t.gameData.userId,isWaitingForNextRound:t.gameData.isWaitingForNextRound,timeOfNextRound:t.gameData.timeOfNextRound,currentRound:t.gameData.currentRound,currentQuestion:t.gameData.currentQuestion,currentIncorrectAnswers:t.gameData.currentIncorrectAnswers,currentCorrectAnswer:t.gameData.currentCorrectAnswer,status:t.gameData.status,totalUsers:t.gameData.totalUsers,remainingUsers:t.gameData.remainingUsers,requiredToStart:t.gameData.requiredToStart,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,selectedAnswer:"",hasPlayerLost:!1,hasPlayerWon:!1,isSolo:t.gameData.isSolo});break;case p:a=Object(Y.a)(Object(Y.a)({},a),{},{isCreatingSoloGame:!1,gameId:P.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],allCurrentAnswersShuffled:[],currentCorrectAnswer:"",status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,hasPlayerLost:!1,hasPlayerWon:!1,isSolo:!1});break;case E:a=Object(Y.a)(Object(Y.a)({},a),{},{isSearchingForGame:!0});break;case D:a=Object(Y.a)(Object(Y.a)({},a),{},{isSearchingForGame:!1,gameId:t.gameData.gameId,userId:t.gameData.userId,isWaitingForNextRound:t.gameData.isWaitingForNextRound,timeOfNextRound:t.gameData.timeOfNextRound,currentRound:t.gameData.currentRound,currentQuestion:t.gameData.currentQuestion,currentIncorrectAnswers:t.gameData.currentIncorrectAnswers,currentCorrectAnswer:t.gameData.currentCorrectAnswer,status:t.gameData.status,totalUsers:t.gameData.totalUsers,remainingUsers:t.gameData.remainingUsers,requiredToStart:t.gameData.requiredToStart,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,selectedAnswer:"",hasPlayerLost:!1,hasPlayerWon:!1,isSolo:t.gameData.isSolo});break;case I:a=Object(Y.a)(Object(Y.a)({},a),{},{isSearchingForGame:!1,gameId:P.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],allCurrentAnswersShuffled:[],currentCorrectAnswer:"",status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,hasPlayerLost:!1,hasPlayerWon:!1,isSolo:!1});break;case N:a=Object(Y.a)(Object(Y.a)({},a),{},{isCreatingSoloGame:!1,gameId:t.gameData.gameId,isWaitingForNextRound:t.gameData.isWaitingForNextRound,timeOfNextRound:t.gameData.timeOfNextRound,currentRound:t.gameData.currentRound,currentQuestion:t.gameData.currentQuestion,currentIncorrectAnswers:t.gameData.currentIncorrectAnswers,currentCorrectAnswer:t.gameData.currentCorrectAnswer,allCurrentAnswersShuffled:z([].concat(Object(J.a)(t.gameData.currentIncorrectAnswers),[t.gameData.currentCorrectAnswer])),status:t.gameData.status,totalUsers:t.gameData.totalUsers,remainingUsers:t.gameData.remainingUsers,requiredToStart:t.gameData.requiredToStart,hasPlayerLost:B(t.gameData.remainingUsers,e.userId),hasPlayerWon:H(t.gameData.remainingUsers,e.userId),hasSubmittedAnswer:!1,selectedAnswer:""});break;case R:a=Object(Y.a)(Object(Y.a)({},a),{},{isUpdatingRemainingPlayers:!0,hasSubmittedAnswer:!0});break;case y:case U:a=Object(Y.a)(Object(Y.a)({},a),{},{isUpdatingRemainingPlayers:!1});break;case C:a=Object(Y.a)(Object(Y.a)({},a),{},{selectedAnswer:t.answer})}return a},V=Object(M.combineReducers)({game:K});var X,Z={game:{isSearchingForGame:!1,isCreatingSoloGame:!1,gameId:P.a,userId:0,isWaitingForNextRound:!1,timeOfNextRound:new Date,currentRound:0,currentQuestion:"",currentIncorrectAnswers:[],currentCorrectAnswer:"",allCurrentAnswersShuffled:[],status:r.Unknown,totalUsers:0,remainingUsers:[0],requiredToStart:2,isUpdatingRemainingPlayers:!1,hasSubmittedAnswer:!1,selectedAnswer:"",hasPlayerLost:!1,hasPlayerWon:!1,isSolo:!1}},$=(X=Z,Object(M.createStore)(V,X,Object(Q.composeWithDevTools)(Object(M.applyMiddleware)(q.a))));i.a.render(Object(_.jsx)(o.a,{store:$,children:Object(_.jsx)(s.a.StrictMode,{children:Object(_.jsx)(F,{})})}),document.getElementById("root"))}},[[94,1,2]]]);
//# sourceMappingURL=main.7d23a90f.chunk.js.map