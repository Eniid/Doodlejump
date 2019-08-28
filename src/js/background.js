export const background = {
    init(game){
        this.game = game;
        this.sx = 0;
        this.sy = 0;
        this.sw = 640;
        this.sh = 1400;
        this.x = 0;
        this.y = 0;
        this.style;
    },
    draw(){
        const drawDatas={
            sprite:`${this.game.datas.sprites.path}background/${this.style}/background.png`,
            sx:this.sx,
            sy:this.sy,
            sw:this.sw,
            sh:this.sh,
            dx:0,
            dy:0,
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
        this.draw();
    }
}