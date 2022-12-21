export default class Wall{
    constructor(){
        this.x = 200;
    }

    draw(context){
        context.beginPath();
        context.rect(this.x, 10, 10, 380);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();
    }

    getX(){
        return this.x;
    }
}