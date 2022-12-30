export default class UpgradeController{
    constructor(){
        this.currency = 0;
        document.addEventListener("kill", this.kill, false);
    }

    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Money: $" + this.currency, 10, 45);
        context.closePath();
    }

    kill = (e) => {
        this.currency += e.detail;
    }

    resetToDefault(){
        this.currency = 0;
    }
}