!function(t){var s={};function e(i){if(s[i])return s[i].exports;var a=s[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}e.m=t,e.c=s,e.d=function(t,s,i){e.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,s){if(1&s&&(t=e(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var a in t)e.d(i,a,function(s){return t[s]}.bind(null,a));return i},e.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(s,"a",s),s},e.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},e.p="/",e(e.s=0)}([function(t,s,e){e(1),t.exports=e(2)},function(t,s,e){"use strict";e.r(s);var i={window:{},allowedKeys:[90,81,83,68,37,38,39,40,32],pressedKeys:[],init:function(t){var s=this;this.game=t;window.addEventListener("keydown",function(t){-1!==s.allowedKeys.indexOf(t.keyCode)&&-1===s.pressedKeys.indexOf(t.keyCode)&&s.pressedKeys.push(t.keyCode)},!1),window.addEventListener("keyup",function(t){-1!==s.allowedKeys.indexOf(t.keyCode)&&-1!==s.pressedKeys.indexOf(t.keyCode)&&s.pressedKeys.splice(s.pressedKeys.indexOf(t.keyCode),1),console.log(s.pressedKeys)},!1),document.querySelector("#theme").addEventListener("change",function(t){s.game.datas.currentStyle=t.target.value},!1)},update:function(){}},a={init:function(t){this.game=t,this.sx=0,this.sy=0,this.sw=117,this.sh=33,this.x=Math.floor(Math.random()*this.game.canvas.width)-this.sw/2,console.log(this.x),this.y=-this.sh,this.style,this.isOffScreen=!1},draw:function(){var t={sprite:"".concat(this.game.datas.sprites.path,"tiles/").concat(this.style,"/tiles.png"),sx:this.sx,sy:this.sy,sw:this.sw,sh:this.sh,dx:this.x,dy:this.y,dw:this.sw,dh:this.sh,x:this.x,y:this.y,notCenter:!0};this.game.draw(t)},update:function(){this.style=this.game.datas.gameStyles[this.game.datas.currentStyle],this.y++,this.y>this.game.canvas.height+this.sh&&(this.isOffScreen=!0),this.draw()}},h={canvas:document.querySelector("canvas"),ctx:null,datas:{canPlay:!1,doodleDead:!1,frame:0,gravity:1,gameStyles:["classic","ice","space"],currentStyle:0,grounds:[],sprites:{path:"./assets/","game-over":"race-over.png",play:"play.png"}},controlers:i,doodle:{init:function(t){this.game=t,this.sx=0,this.sy=0,this.sw=124,this.sh=120,this.x=200,this.y=0,this.states=["doodle-l","doodle-r","doodle-u"],this.currentState=0,this.speed=3,this.style,this.vy=0,this.rot=0},draw:function(){var t={sprite:"".concat(this.game.datas.sprites.path,"doodle/").concat(this.style,"/").concat(this.states[this.currentState],".png"),sx:this.sx,sy:this.sy,sw:this.sw,sh:this.sh,dx:this.x,dy:this.y,dw:this.sw,dh:this.sh,x:this.x,y:this.y,rot:this.rot,notCenter:!0};this.game.draw(t)},move:function(){var t=this.game.controlers;t.pressedKeys&&t.pressedKeys.length&&(-1!==t.pressedKeys.indexOf(37)?this.direction="left":-1!==t.pressedKeys.indexOf(39)?this.direction="right":this.direction=null),"left"===this.direction&&(this.x-=this.speed,this.currentState=0),"right"===this.direction&&(this.x+=this.speed,this.currentState=1),this.direction=null},hitGround:function(){var t=this;this.game.datas.grounds.forEach(function(s,e){s&&t.x+t.sw-40>=s.x&&t.x+40<s.x+s.sw&&t.footPos>=s.y&&t.footPos<=s.y+s.sh&&t.vy>0&&(t.vy=-10)})},update:function(){this.footPos=this.y+this.sh,this.move(),this.hitGround(),this.y+=this.vy,this.vy+=.2,this.y+20<0&&(this.vy=1),this.x+40<0&&(this.x=-40),this.x+this.sw-40>this.game.canvas.width&&(this.x=this.game.canvas.width-this.sw+40),this.y>this.game.canvas.height&&!1===this.game.datas.doodleDead&&(this.game.datas.canPlay=!1,this.game.doodleDead=!0,this.vy=-20,this.rot=1),this.style=this.game.datas.gameStyles[this.game.datas.currentStyle],this.draw()}},background:{init:function(t){this.game=t,this.sx=0,this.sy=0,this.sw=640,this.sh=1400,this.x=0,this.y=0,this.style},draw:function(){var t={sprite:"".concat(this.game.datas.sprites.path,"background/").concat(this.style,"/background.png"),sx:this.sx,sy:this.sy,sw:this.sw,sh:this.sh,dx:0,dy:0,dw:this.sw,dh:this.sh,x:this.x,y:this.y,notCenter:!0};this.game.draw(t)},update:function(){this.style=this.game.datas.gameStyles[this.game.datas.currentStyle],this.draw()}},ground:a,draw:function(t){var s=new Image;s.src=t.sprite,this.ctx.save(),t.notCenter&&!1!==t.notCenter||this.ctx.translate(t.dw/2,t.dh/2),t.rot&&this.ctx.rotate(t.rot),this.ctx.drawImage(s,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),this.ctx.restore()},init:function(){this.canvas.width=414,this.canvas.height=665,this.ctx=this.canvas.getContext("2d"),this.controlers.init(this),this.doodle.init(this),this.background.init(this),this.update();for(var t=0;t<6;t++){var s=Object.assign({},this.ground);s.init(h),this.datas.grounds.push(s),s.y=500*Math.random()}},update:function(){var t=this;if(this.background.update(),this.datas.canPlay){if(this.datas.frame%270==0||this.datas.grounds.length<2)for(var s=0;s<4*Math.random();s++){var e=Object.assign({},this.ground);e.init(h),this.datas.grounds.push(e),e.y=e.y-200*Math.random()}this.datas.frame<300&&this.datas.grounds.length,this.datas.grounds.forEach(function(s,e){s&&(s.update(),s.isOffScreen&&(t.datas.grounds[e]=void 0))})}else if(this.doodleDead){var a={sprite:"".concat(this.datas.sprites.path).concat(this.datas.sprites["game-over"]),sx:0,sy:0,sw:206,sh:60,dx:this.canvas.width/2-103,dy:this.canvas.height/2-60,dw:206,dh:60,x:this.canvas.width/2-103,y:this.canvas.height/2-60,notCenter:!0};this.draw(a)}else{var n={sprite:"".concat(this.datas.sprites.path).concat(this.datas.sprites.play),sx:0,sy:0,sw:200,sh:200,dx:this.canvas.width/2-100,dy:this.canvas.height/2-100,dw:200,dh:200,x:this.canvas.width/2-100,y:this.canvas.height/2-100,notCenter:!0};this.draw(n)}!1===this.datas.doodleDead&&!0===this.datas.canPlay&&(this.doodle.update(),this.datas.frame++),-1!==i.pressedKeys.indexOf(32)&&(0==this.datas.canPlay?this.datas.canPlay=!0:this.datas.canPlay=!1),this.controlers.update(),window.requestAnimationFrame(function(s){t.update()})}};e(2),h.init()},function(t,s){}]);