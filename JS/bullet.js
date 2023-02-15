/**
 * Bullet Class, used for handling individual bullets on the play field
 */
export default class Bullet{
    /**
     * Constructor. Sets values and automatically calls setVelocity to set the proper velocity values
     * @param {number} sX - starting x coordinate of bullet
     * @param {number} sY - starting y coordinate of bullet
     * @param {int} speed - The speed of the bullet
     * @param {int} power - How much damage the bullet does
     * @param {int} w - The width of the canvas
     * @param {int} h - The height of the canvas
     * @param {number} cursorX - The x coordinate of the bullet's intended target
     * @param {number} cursorY - The y coordinate of the bullet's intended target
     */
    constructor (sX, sY, speed, power, w, h, cursorX, cursorY){
        this.x = sX;
        this.y = sY;
        this.speed = speed;
        this.power = power;
        this.vx = 0;
        this.vy = 0;
        this.canvasX = w;
        this.canvasY = h;
        this.setVelocity(cursorX, cursorY);
    }

    /**
     * Updates the bullet's position and draws the bullet onto the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        this.updatePosition();
        context.beginPath();
        context.arc(this.x, this.y, 2.5, 0, 2*Math.PI);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();
    }

    /**
     * Gets the arctangent (counterclockwise angle) of the target coordinates relative to the start position, then uses the sine and cosine of that angle to determine x and y velocity
     * Only executed once, to set initial velocity for bullet movement
     * @param {int} cx - The X coordinate of the bullet's target
     * @param {int} cy - The Y coordinate of the bullet's target
     */
    setVelocity(cx, cy){
        let d = Math.atan2(cy - this.y, cx - this.x);
        this.vx = Math.cos(d) * this.speed;
        this.vy = Math.sin(d) * this.speed;
    }

    /**
     * Checks if the bullet has gone past the bounds of the canvas
     * @returns {boolean} boolean
     */
    checkVisibility(){
        if (this.x > this.canvasX || this.x < 0 || this.y > this.canvasY || this.y < 0){
            return false;
        } else {
            return true;
        }
    }

    /**
     * When called, iterates the position of the bullet based on specified velocity
     */
    updatePosition(){
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * Get the current X coordinate of the bullet
     * @returns {number} X coordinate of bullet
     */
    getX(){
        return this.x;
    }

    /**
     * Get the current Y coordinate of the bullet
     * @returns {number} Y coordinate of bullet
     */
    getY(){
        return this.y;
    }

    /**
     * Get how much damage the bullet will do when it hits something
     * @returns {int} Current power
     */
    getPower(){
        return this.power;
    }
}