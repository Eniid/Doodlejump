export const ground = {
    init(game){
        this.game = game;
        this.sx = 0;
        this.sy = 0;
        this.sw = 117;
        this.sh = 33;
        this.x = Math.floor(Math.random()*this.game.canvas.width)-this.sw/2;
        console.log(this.x)
        this.y = -this.sh;
        this.style;
        this.isOffScreen = false;
    },
    draw(){
        const drawDatas={
            sprite:`${this.game.datas.sprites.path}tiles/${this.style}/tiles.png`,
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
            notCenter:true
        }
        this.game.draw(drawDatas);
    },
    update(){
        this.style = this.game.datas.gameStyles[this.game.datas.currentStyle];
        this.y++;
        if(this.y>this.game.canvas.height+this.sh){
            this.isOffScreen=true;
        }
        this.draw();
    }
}