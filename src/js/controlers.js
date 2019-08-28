export const controlers = {
    "window":{
    },
    "allowedKeys": [90, 81, 83, 68, 37, 38, 39, 40, 32],
    "pressedKeys": [],
    init(game){
        this.game = game
        const keyD = e => {
            if (this.allowedKeys.indexOf(e.keyCode) !== -1) {
                if (this.pressedKeys.indexOf(e.keyCode) === -1) {
                    this.pressedKeys.push(e.keyCode)
                }
            }
        }
        const keyU = e => {
            if (this.allowedKeys.indexOf(e.keyCode) !== -1) {
                if (this.pressedKeys.indexOf(e.keyCode) !== -1) {
                    this.pressedKeys.splice(this.pressedKeys.indexOf(e.keyCode), 1)
                }
            }
            console.log(this.pressedKeys)
        }
        window.addEventListener("keydown", keyD, false)
        window.addEventListener("keyup", keyU, false)
        document.querySelector("#theme").addEventListener("change", (e)=>{
            this.game.datas.currentStyle=e.target.value
        }, false)
    },
    update(){
            }
}