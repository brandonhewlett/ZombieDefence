export default class Wall{
    constructor(){

    }

    draw(context){
        context.beginPath();
        context.rect(200, 10, 10, 380);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();
    }
}