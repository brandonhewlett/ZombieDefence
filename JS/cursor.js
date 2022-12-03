export default class Cursor{
    //Constructor: Starts cursor at 0,0 and gets dimensions of canvas
    constructor(canvas){
        this.x = 0;
        this.y = 0;
        this.canvas = canvas.getBoundingClientRect();
    }

    //Draw: Draws cursor at current coordinates
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI);
        context.fillStyle = "#0000FF";
        context.fill();
        context.closePath();
    }

    //Move: Moves canvas cursor to the same point as the client's cursor.
    //-2.5 is used to ensure cursor is at center of client cursor.
    move(evt){
        this.x = evt.clientX - this.canvas.left;
        this.y = evt.clientY - this.canvas.top;
    }
}