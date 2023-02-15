import BulletController from "./bulletController.js";
import Zombie from "./zombie.js";

/**
 * Buddy Class, used for handling individual buddies on the field
 */
export default class Buddy{
    /**
     * Constructor. Creates an individual bullet controller for the buddy
     * @param {int} x - X position for buddy on canvas
     * @param {int} y - Y position for buddy on canvas
     * @param {HtmlElement} canvas - The Canvas HTML Element
     */
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas
        this.bulletController = new BulletController();
    }

    /**
     * Draws the buddy onto the canvas. Also calls draw method for bullet controller
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#0000FF";
        context.fill();
        context.closePath();
        this.bulletController.draw(context);
    }

    /**
     * Shoots a bullet at a random target
     * @param {Zombie} zombie - The random zombie that the buddy will shoot at. Provides target X and Y for the bullet controller.
     */
    shoot(zombie){
        this.bulletController.shoot(this.x, this.y, 10, this.canvas.width, this.canvas.height, zombie.x, zombie.y);
    }

    /**
     * Get a list of this buddy's currently spawned bullets
     * @returns {Map} a Map of the bullets currently associated with this buddy's bullet controller
     */
    getBullets(){
        return this.bulletController.getBullets();
    }

    /**
     * Remove bullet from bullet controller based on provided key
     * @param {int} key - The key of the bullet to be removed
     */
    deleteBullet(key){
        this.bulletController.deleteBullet(key);
    }
}