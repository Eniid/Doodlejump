export const doodle = {
    init(game){
        this.game = game;
        this.sx = 0;
        this.sy = 0;
        this.sw = 124;
        this.sh = 120;
        this.x = 200;
        this.y = 0;
        this.states = ["doodle-l", "doodle-r", "doodle-u"];
        this.currentState = 0;
        this.speed = 3;
        this.style;
        this.vy = 0;
        this.rot = 0;
    },
    draw(){
        const drawDatas={
            sprite:`${this.game.datas.sprites.path}doodle/${this.style}/${this.states[this.currentState]}.png`,
            sx:this.sx,
            sy:this.sy,
            sw:this.sw,
            sh:this.sh,
            dx:this.x,
            dy:this.y,
            dw:this.sw,
            dh:this.sh,
            x:this.x,
            y:this.y,
            rot:this.rot,
            notCenter:true
        }
        this.game.draw(drawDatas);
    },
    move(){
        const controlers = this.game.controlers;
        if(controlers.pressedKeys && controlers.pressedKeys.length){
            if(controlers.pressedKeys.indexOf(37) !== -1){
                this.direction = "left"
            }else if(controlers.pressedKeys.indexOf(39) !== -1){
                this.direction = "right"
            }else{
                this.direction = null
            }
        }

        if(this.direction==="left"){
            this.x-=this.speed;
            this.currentState = 0
        }
        if(this.direction==="right"){
            this.x+=this.speed;
            this.currentState = 1
        }
        
        this.direction = null
    },    
    hitGround(){
        this.game.datas.grounds.forEach((ground, i)=>{
            if(ground){
                if(this.x+this.sw-40 >= ground.x && this.x+40 < ground.x+ground.sw){
                    if(this.footPos >= ground.y && this.footPos <= ground.y+ground.sh && this.vy>0){
                        this.vy=-10;
                    }
                }
            }
        })
    },
    update(){
            this.footPos = this.y+this.sh;
            this.move();
            this.hitGround();
            this.y+=this.vy;
            this.vy+=0.2;
            if(this.y+20<0){
                this.vy=1
            }
            if(this.x+40<0){
                this.x=-40
            }
            if(this.x+this.sw-40>this.game.canvas.width){
                this.x=this.game.canvas.width-this.sw+40
            }
            if(this.y>this.game.canvas.height && this.game.datas.doodleDead===false){
                this.game.datas.canPlay = false;
                this.game.doodleDead = true
                this.vy=-20
                this.rot=1
                
            }
            this.style = this.game.datas.gameStyles[this.game.datas.currentStyle];
            this.draw();
    }
}