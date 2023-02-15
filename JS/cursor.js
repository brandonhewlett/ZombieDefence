/**
 * Cursor Class, used for handling all actions related to tracking and displaying the cursor on the canvas
 */
export default class Cursor{
    /**
     * Constructor
     * @param {HtmlElement} canvas - The Canvas HTML Element
     */
    constructor(canvas){
        this.x = 0;
        this.y = 0;
        this.canvas = canvas.getBoundingClientRect();
    }

    /**
     * Draw the custom cursor onto the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 5, 0, 2*Math.PI);
        context.fillStyle = "#0000FF";
        context.fill();
        context.closePath();
    }

    /**
     * Moves the custom cursor to the current position of the client's cursor on the canvas
     * @param {Event} evt - The mouse move event, including details
     */
    move(evt){
        this.x = evt.clientX - this.canvas.left;
        this.y = evt.clientY - this.canvas.top;
    }

    /**
     * Get the x coordinate of the cursor
     * @returns {number} The X coordinate of the cursor
     */
    getX(){
        return this.x;
    }

    /**
     * Get the y coordinate of the cursor
     * @returns {number} The y coordinate of the cursor
     */
    getY() {
        return this.y;
    }
}