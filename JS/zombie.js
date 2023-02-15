/**
 * Zombie class, used for handling individual zombies on the play field
 */
export default class Zombie{
    /**
     * Constructor. Sets random spawn position off-screen to stagger incoming zombies
     * Initializes speed, power, health, and color, and automatically uses current day to determine zombie type
     * Initializes attack timer as null
     * @param {int} currentDay 
     */
    constructor(currentDay){
        this.x = this.randomInt(1500, 2000);
        this.y = this.randomInt(15, 385);
        this.speed = 0;
        this.power = 0;
        this.health = 0;
        this.color = null;
        this.attackTimer = null;
        this.determineType(currentDay);
    }

    /**
     * Draws the zombie onto the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle=this.color;
        context.fill();
        context.closePath();
    }

    /**
     * Takes in the current day, and uses that to determine what type of zombie this zombie should be.
     * @param {int} currentDay - The current value of the day counter from dayController
     */
    determineType(currentDay){
        let speedThreshold = 0;
        let bruteThreshold = 0;

        //Switch for determining the percentile thresholds for the different zombie types. 
        switch (currentDay){
            default:
                speedThreshold = 51;
                bruteThreshold = 76;
                break;
            case 1: 
                speedThreshold = 101;
                bruteThreshold = 101;
                break;
            case 2:
            case 3:
                speedThreshold = 81;
                bruteThreshold = 91;
                break;
            case 4:
            case 5:
            case 6:
                speedThreshold = 71;
                bruteThreshold = 86;
                break;
            case 7:
            case 8:
            case 9:
                speedThreshold = 61;
                bruteThreshold = 81;
                break;
        }

        let determiner = this.randomInt(1, 100);

        //Normal Zombie. Standard speed, power, and health
        if (determiner < speedThreshold){
            this.speed = 3;
            this.power = 1;
            this.health = 3;
            this.color = "#009900";
        //Fast Zombie. Very fast, but has 1/3 as much health
        }else if (determiner < bruteThreshold){
            this.speed = 6;
            this.power = 1;
            this.health = 1;
            this.color = "#00FF00";
        //Brute. Slower than average, but has more health and does more damage to the wall
        }else {
            this.speed = 2;
            this.power = 3;
            this.health = 6;
            this.color = "#004900";
        }
    }

    /**
     * Move the zombie towards the wall, and start the attack timer if the wall has been reached
     */
    moveToWall(){
        this.x -= Math.min(this.speed, this.x - 200-20)
        if (this.x == 220 && this.attackTimer == null){
            this.attackTimer = setInterval(this.attack, 1000);
        }
    }

    /**
     * Gets the arctangent (counterclockwise angle) of the target coordinates relative to the start position, then uses the sine and cosine of that angle to determine x and y velocity
     * Executed every time the zombie needs to change position, in order to properly track and move to the player
     * @param {number} px - The current X coordinate of the player
     * @param {number} py - The current Y coordinate of the player
     */
    moveToPlayer(px, py){
        if (this.attackTimer != null){
            this.stopAttackTimer();
        }
        var d = Math.atan2(py - this.y, px - this.x);
        this.x += Math.cos(d) * (this.speed/2);
        this.y += Math.sin(d) * (this.speed/2);
    }

    /**
     * Checks if the passed-in bullet has collided with the zombie
     * @param {Bullet} bullet 
     * @returns {boolean} True or false
     */
    //TODO: Change hard-coding of radius
    bulletCollisionCheck(bullet){
        let dx = bullet.getX() - this.x;
        let dy = bullet.getY() - this.y;
        let rad = 10+2.5;
        

        //If x squared + y squared is less than radius squared, the objects have collided. 
        if((dx*dx)+(dy*dy) < (rad*rad)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Checks if the player has collided with the zombie
     * @param {int} px 
     * @param {int} py 
     * @returns {boolean} True or false 
     */
    playerCollisionCheck(px, py){
        let dx = px - this.x;
        let dy = py - this.y;
        let rad = 10+10;
        
        //If x squared + y squared is less than radius squared, the objects have collided. 
        if((dx*dx)+(dy*dy) < (rad*rad)){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Reduces the zombie's health by the passed-in value
     * @param {int} power 
     * @returns {int} The current health of the zombie
     */
    hit(power){
        this.health -= power;
        return this.health;
    }

    /**
     * Handler for the attack interval. Dispatches an attackWall event for the wall controller
     */
    attack = () => {
        document.dispatchEvent(new CustomEvent("attackWall",{detail: this.power}));
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
     * Clears the interval for the attack timer, stopping the zombies from damaging the wall
     */
    stopAttackTimer(){
        clearInterval(this.attackTimer);
        this.attackTimer = null;
    }
}