/**
 * Wall Class, used to handle events and values relating to the defensive wall
 */
export default class Wall{
    /**
     * Constructor. Sets start position, current and max HP, audio, and event listeners
     */
    constructor(){
        this.x = 200;
        this.hp = 100;
        this.maxHP = 100;
        this.width = 10;
        this.wallHit1Sound = new Audio("./Sounds/wallhit1.wav");
        this.wallHit2Sound = new Audio("./Sounds/wallhit2.wav");
        this.wallHit3Sound = new Audio("./Sounds/wallhit3.wav");
        document.addEventListener("attackWall", this.damageWall, false);
        document.addEventListener("repairWall", this.repairWall, false);
        document.addEventListener("upgradeWall", this.upgradeWall, false);
    }

    /**
     * Draw the defensive wall and informational label onto the canvas, except if the wall has 0 hp
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        if (this.hp > 0){
            context.beginPath();
            context.rect(this.x, 10, this.width, 380);
            context.fillStyle = "#000000";
            context.fill();
            context.closePath();
        }
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Wall HP: " + this.hp + "/" + this.maxHP, 10, 70);
        context.closePath();
    }

    /**
     * Draws the wall hp onto the canvas at wave end
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Wall HP: " + this.hp + "/" + this.maxHP, 450, 140);
        context.closePath();
    }

    /**
     * Get the current x coordinate of the wall
     * @returns the current X coordinate of the wall
     */
    getX(){
        return this.x;
    }

    /**
     * Get the current x coordinate of the wall plus the current width of the wall, for zombie collision with the right side of the wall
     * @returns {int} x + width
     */
    getSpacer(){
        return this.x + this.width;
    }

    /**
     * Get the current hp value of the wall
     * @returns {int} The current wall hp
     */
    getHP(){
        return this.hp;
    }

    /**
     * Handler for the damage wall event, reducing the hp of the wall by the passed-along value
     * @param {Event} e - Event and details containing the damage amount
     */
    damageWall = (e) => {
        this.hp -= e.detail
        if (this.hp < 0){
            this.hp = 0;
        }
        this.wallHitSound();
    }

    /**
     * When called, plays a random wall hit sound
     */
    wallHitSound(){
        switch(this.randomInt(1, 3)){
            case 1:
                this.wallHit1Sound.play();
                break;
            case 2:
                this.wallHit2Sound.play();
                break;
            case 3:
                this.wallHit3Sound.play();
                break;
        }
    }

    /**
     * Handler for repair wall event. When called, checks if wall is at full health before repairing wall by 50 hp
     * @param {Event} e - Event that called the function 
     */
    repairWall = (e) => {
        if (this.hp >= this.maxHP){
            document.dispatchEvent(new CustomEvent('displayError', {detail: "The wall doesn't need any repairs"}))
        } else {
            this.hp += 50;
            if (this.hp > this.maxHP){
                this.hp = this.maxHP;
            }
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "repairWall"}));
        }
    }

    /**
     * Handler for upgrade wall event. When called, checks if wall is at maximum health before raising both current and max hp by 100. Maximum of 500
     * @param {Event} e - Event that called the function 
     */
    upgradeWall = (e) => {
        if (this.maxHP == 500){
            document.dispatchEvent(new CustomEvent('displayError', {detail: "Can't upgrade the wall any further"}))
        }else {
            this.maxHP += 100;
            this.hp += 100;
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "upgradeWall"}));
        }
    }

    /**
     * Returns a random integer between the min and max values, inclusive
     * @param {int} min - The minimum possible int value
     * @param {int} max - The maximum possible int value
     * @returns {int} - A random int between the min and max values
     */
    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /**
     * Resets wall handler to defaults, bringing max and current HP back to 100 at game end
     */
    resetToDefault(){
        this.hp = 100;
        this.maxHP = 100;
    }
}