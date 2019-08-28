import {doodle} from './doodle'
import {background} from './background'
import {controlers} from './controlers'
import {ground} from './ground'

export const game = {
    "canvas": document.querySelector("canvas"),
    "ctx": null,
    "datas": { // variables du jeu
        "canPlay":false,
        "doodleDead":false,
        "frame": 0, // nombre d'images passées // donnée de temps
        "gravity": 1,
        "gameStyles":["classic", "ice", "space"],
        "currentStyle":0,
        "grounds":[],
        "sprites":{ // tous les chemins vers les images du jeux
            "path":"./assets/",
            "game-over":"race-over.png",
            "play":"play.png"
        }
    },
    controlers,
    doodle,
    background,
    ground,
    draw(obj) {
        const sprite = new Image()
        sprite.src = obj.sprite;
        this.ctx.save() // Sauvegarde l'état du canvas avant de dessiner
        if(!obj.notCenter || obj.notCenter === false)this.ctx.translate(obj.dw / 2, obj.dh / 2) // sert à placer le centre de rotation de tous les éléments (feux + particules)
        if(obj.rot)this.ctx.rotate(obj.rot)
        this.ctx.drawImage(sprite, obj.sx, obj.sy, obj.sw, obj.sh, obj.dx, obj.dy, obj.dw, obj.dh)
        this.ctx.restore() // reset l'état du canvas après le dessin
    },
    init() {
        this.canvas.width=414
        this.canvas.height=665
        this.ctx = this.canvas.getContext("2d")
        this.controlers.init(this)
        this.doodle.init(this)
        this.background.init(this)
        this.update()              
        for(let i=0;i<6;i++){
            const newGround = Object.assign({}, this.ground)
            newGround.init(game)
            this.datas.grounds.push(newGround)
            newGround.y = (Math.random()*500)
        }
    },
    update() {
        this.background.update()
        if(this.datas.canPlay){
            if(this.datas.frame%270===0 || this.datas.grounds.length<2){
                for(let i=0;i<Math.random()*4;i++){
                    const newGround = Object.assign({}, this.ground)
                    newGround.init(game)
                    this.datas.grounds.push(newGround)
                    newGround.y = newGround.y - Math.random()*200
                }
            }

            if(this.datas.frame<300 && this.datas.grounds.length<2){
  
            }
            this.datas.grounds.forEach((ground, i)=>{
                if(ground){
                    ground.update();
                    if(ground.isOffScreen){
                        this.datas.grounds[i] = undefined;
                    }
                }
            })
        }else{
            if(this.doodleDead){
                const gameover = `${this.datas.sprites.path}${this.datas.sprites["game-over"]}`;
                const drawDatas={
                    sprite:gameover,
                    sx:0,
                    sy:0,
                    sw:206,
                    sh:60,
                    dx:this.canvas.width/2-103,
                    dy:this.canvas.height/2-60,
                    dw:206,
                    dh:60,
                    x:this.canvas.width/2-103,
                    y:this.canvas.height/2-60,
                    notCenter:true
                }
                this.draw(drawDatas)
            }else{
                const gameover = `${this.datas.sprites.path}${this.datas.sprites["play"]}`;
                const drawDatas={
                    sprite:gameover,
                    sx:0,
                    sy:0,
                    sw:200,
                    sh:200,
                    dx:this.canvas.width/2-100,
                    dy:this.canvas.height/2-100,
                    dw:200,
                    dh:200,
                    x:this.canvas.width/2-100,
                    y:this.canvas.height/2-100,
                    notCenter:true
                }
                this.draw(drawDatas)
            }

        }
        if(this.datas.doodleDead===false&&this.datas.canPlay===true){
            this.doodle.update()
            this.datas.frame++;
        }
        if(controlers.pressedKeys.indexOf(32) !== -1){
            if(this.datas.canPlay==false){
                this.datas.canPlay=true;
            }else{
                this.datas.canPlay=false;
            }
        }
        this.controlers.update() // on actualise les controleurs
        window.requestAnimationFrame(e => {
            this.update() // on actualise l'animation
        })
    }
}