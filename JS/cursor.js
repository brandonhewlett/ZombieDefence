export default class Cursor{
    
    constructor(canvas){
        this.x = 0;
        this.y = 0;
        this.canvas = canvas.getBoundingClientRect();
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI);
        context.fillStyle = "#0000FF";
        context.fill();
        context.closePath();
    }

    move(evt){
        this.x = evt.clientX - this.canvas.left;
        this.y = evt.clientY - this.canvas.top;
    }

    getX(){
        return this.x;
    }

    getY() {
        return this.y;
    }
}