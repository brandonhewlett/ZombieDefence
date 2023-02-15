import BulletController from "./bulletController.js";

/**
 * Player Class, used for handling everything related to the player
 */
export default class Player{
    /**
     * Constructor. Initializes values, movement tracking, and movement events, and creates a new bullet controller for the player
     * @param {int} x - The current X coordinate of the player
     * @param {int} y - The current Y coordinate of the player
     * @param {int} speed - The speed of the player
     * @param {HTMLElement} canvas - The HTML Canvas element
     * @param {int} wX - The X position of the defence wall
     */
    constructor(x, y, speed, canvas, wX){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.canvas = canvas.getBoundingClientRect();
        this.bulletController = new BulletController();
        this.wallX = wX;
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("bulletHit", this.bulletHit, false);
        document.addEventListener("upgradeDamage", this.upgradeDamage, false);
    }

    /**
     * Handles player movement, draws the player on the canvas, then calls for the bullet controller to draw
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        this.movement();
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#FF0000";
        context.fill();
        context.closePath();
        this.bulletController.draw(context);
    }

    /**
     * Handles movement of the player based on which keys are currently pressed.
     * Uses Math.min to make sure that the player cannot leave the play area, defined as everything between the left edge of the canvas and the x position of the wall.
     */
    movement() {
        if (this.rightPressed) {
            this.x += Math.min(this.speed, this.wallX - this.x);
        }
        if (this.leftPressed) {
            this.x -= Math.min(this.speed, 0 + this.x);
        }
        if (this.downPressed) {
            this.y += Math.min(this.speed, this.canvas.height - this.y);
        }
        if (this.upPressed) {
            this.y -= Math.min(this.speed, 0 + this.y);
        }
    }

    /**
     * Tells the bullet controller to create a new bullet starting from the player and aimed at the current position of the cursor
     * @param {*} cursorX - The current X coordinate of the cursor
     * @param {*} cursorY - The current Y coordinate of the cursor
     */
    shoot(cursorX, cursorY) {
        this.bulletController.shoot(this.x, this.y, 10, this.canvas.width, this.canvas.height, cursorX, cursorY);
    }

    /**
     * Handler for the keydown event
     * @param {Event} e - The event and its details of which key was pressed
     */
    keyDownHandler = (e) => {
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = true;
                break;
            case "ArrowLeft":
                this.leftPressed = true;
                break;
            case "ArrowUp":
                this.upPressed = true;
                break;
            case "ArrowDown":
                this.downPressed = true;
                break;
            default:
                break;
        }
    }
    
    /**
     * Handler for the keyup event
     * @param {Event} e - The event and its details of which key was depressed
     */
    keyUpHandler = (e) => {
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = false;
                break;
            case "ArrowLeft":
                this.leftPressed = false;
                break;
            case "ArrowUp":
                this.upPressed = false;
                break;
            case "ArrowDown":
                this.downPressed = false;
                break;
            default:
                break;
        }
    }

    /**
     * Handler for custom bullet hit event, which passes information to the bullet controller to delete a specific bullet
     * @param {Event} e - The event and its details (a unique key for the bullet to be deleted)
     */
    bulletHit = (e) => {
        this.bulletController.deleteBullet(e.detail.key);
    }

    /**
     * Returns the bullets map from the associated bullet controller
     * @returns {Map} A Map of bullets
     */
    getBullets(){
        return this.bulletController.getBullets();
    }

    /**
     * Handler for the upgradeDamage event, used to tell the associated bullet controller to upgrade its power
     * @param {Event} e - An empty custom event
     */
    upgradeDamage = (e) => {
        this.bulletController.upgradeDamage();
    }

    /**
     * Gets the current X coordinate of the player
     * @returns {int} The current X coordinate of the player
     */
    getX(){
        return this.x;
    }

    /**
     * Gets the current Y coordinate of the player
     * @returns {int} The current Y coordinate of the player
     */
    getY(){
        return this.y;
    }

    /**
     * Tells the associated bullet controller to reset its bullets map
     */
    resetBullets(){
        this.bulletController.resetBullets();
    }

    /**
     * Tells the associated bullet controller to reset back to default values
     */
    resetToDefault(){
        this.bulletController.resetToDefault();
    }
}