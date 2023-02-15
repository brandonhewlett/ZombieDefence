import Bullet from "./bullet.js";

/**
 * Bullet Controller Class, used for interfacing with individual or all bullets as required
 */
export default class BulletController{
    /**
     * Constructor. Initializes bullet map, power, unique ID tracker, and sounds
     */
    constructor() {
        this.bullets = new Map();
        this.power = 1;
        this.uniqueID = 0;
        this.shoot1Sound = new Audio('./Sounds/shoot1.wav');
        this.shoot2Sound = new Audio('./Sounds/shoot2.wav');
        this.shoot3Sound = new Audio('./Sounds/shoot3.wav');
        this.shoot4Sound = new Audio('./Sounds/shoot4.wav');
        this.shoot5Sound = new Audio('./Sounds/shoot5.wav');
    }
    
    /**
     * Iterates through the bullets map and draws all bullets
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        if (this.bullets.size > 0){
            this.bullets.forEach((bullet, key) => {
                bullet.draw(context);
            })
        }
        this.checkVisibility();
    }

    /**
     * Create a new bullet with a unique index and add it to the map, firing it at a specific targer
     * @param {number} pX - The starting X coordinate of the bullet
     * @param {number} pY - The starting Y coordinate of the bullet
     * @param {int} speed - How fast the bullet should move
     * @param {int} canvasX - The width of the canvas
     * @param {int} canvasY - The height of the canvas
     * @param {number} cursorX - The X coordinate of the target
     * @param {number} cursorY - The Y coordinate of the target
     */
    shoot(pX, pY, speed, canvasX, canvasY, cursorX, cursorY){
        this.bullets.set(this.uniqueID, new Bullet(pX, pY, speed, this.power, canvasX, canvasY, cursorX, cursorY));
        this.uniqueID += 1;
        this.shootSound();
    }

    /**
     * Play a random shooting sound whenever a bullet is created
     */
    shootSound(){
        switch(this.randomInt(1, 5)){
            case 1:
                this.shoot1Sound.play();
                break;
            case 2:
                this.shoot2Sound.play();
                break;
            case 3:
                this.shoot3Sound.play();
                break;
            case 4:
                this.shoot4Sound.play();
                break;
            case 5:
                this.shoot5Sound.play();
                break;
        }
    }

    /**
     * Iterate through the bullet map and has each bullet check its visibility, deleting the bullets that are no longer visible
     */
    checkVisibility(){
        if (this.bullets.length > 0){
            this.bullets.forEach((bullet, key) => {
                if (!bullet.checkVisibility()){
                    this.deleteBullet(key);
                }
            })
        }
    }

    /**
     * Get the current list of active bullets for this controller
     * @returns {Map} The Map of bullets
     */
    getBullets(){
        return this.bullets;
    }

    /**
     * Deletes a specified bullet from the bullets Map
     * @param {int} i - The unique key of the bullet to be deleted
     */
    deleteBullet(i){
        this.bullets.delete(i);
    }

    /**
     * Upgrades the damage of all bullets spawned by the controller. Fires off events for the upgrade controller on success or failure
     */
    upgradeDamage(){
        if (this.power < 3){
            this.power += 1;
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "upgradeDamage"}));
        }else{
            document.dispatchEvent(new CustomEvent('displayError', {detail: "Your damage can't get any higher"}))
        }
    }

    /**
     * Returns a random integer between the min and max values, inclusive
     * @param {int} min - The minimum possible int value
     * @param {int} max - The maximum possible int value
     * @returns {int} A random integer
     */
    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /**
     * Empties the bullets Map in preparation for a new wave
     */
    resetBullets(){
        this.bullets.clear();
        this.uniqueID = 0;
    }

    /**
     * Resets the controller to default on game end in preparation for a new game
     */
    resetToDefault(){
        this.bullets.clear();
        this.uniqueID = 0;
        this.power = 1;
    }
}