import Buddy from "./buddy.js";

/**
 * Buddy Controller Class, used for interfacing with individual or all buddies as required
 */
export default class BuddyController{
    /**
     * Constructor. Initializes x and y for buddies and adds event listeners for adding buddies and bullet collision
     * @param {HtmlElement} canvas - The Canvas HTML Element
     */
    constructor(canvas){
        this.buddies = [];
        this.bx = 100;
        this.b1y = 50;
        this.b2y = 150;
        this.b3y = 250;
        this.b4y = 350;
        this.canvas = canvas.getBoundingClientRect();
        document.addEventListener("addBuddy", this.addBuddy, false);
        document.addEventListener("buddyBulletHit", this.bulletHit, false);
    }

    /**
     * Iterates through the buddies array and draws all buddies
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        this.buddies.forEach((buddy) => {
            buddy.draw(context);
        });
    }

    /**
     * Draws graphics onto the canvas for the upgrade phase of the game, to display current buddy count to user
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Buddies: " + this.buddies.length + "/4", 450, 170);
        context.closePath();
    }

    /**
     * Function for adding a new buddy to the buddies array. Only allows a maximum of 4 before firing off an error event
     * @param {Event} e - The event that called the function
     */
    addBuddy = (e) => {
        switch (this.buddies.length){
            case 0:
                this.buddies.push(new Buddy(this.bx, this.b1y, this.canvas));
                document.dispatchEvent(new CustomEvent('deductPayment',{detail: "addBuddy"}));
                break;
            case 1:
                this.buddies.push(new Buddy(this.bx, this.b2y, this.canvas));
                document.dispatchEvent(new CustomEvent('deductPayment',{detail: "addBuddy"}));
                break;
            case 2:
                this.buddies.push(new Buddy(this.bx, this.b3y, this.canvas));
                document.dispatchEvent(new CustomEvent('deductPayment',{detail: "addBuddy"}));
                break;
            case 3:
                this.buddies.push(new Buddy(this.bx, this.b4y, this.canvas));
                document.dispatchEvent(new CustomEvent('deductPayment',{detail: "addBuddy"}));
                break;
            default:
                document.dispatchEvent(new CustomEvent('displayError', {detail: "You can't have any more buddies"}))
                break;
        }
    }

    /**
     * Iterates through the buddies array and provides a zombie target for each buddy to shoot at
     * @param {Zombie[]} zombies - An array of zombies for the buddies to shoot at. Always has a count equal to current buddy count
     */
    shoot(zombies){
        this.buddies.forEach((buddy, index) => {
            buddy.shoot(zombies[index]);
        })
    }

    /**
     * Returns the current bullets Map from the specified buddy
     * @param {int} i - Index for deciding which buddy to retrieve a bullets Map from
     * @returns {Map} a Map of bullet objects
     */
    getBullets(i){
        return this.buddies[i].getBullets();
    }

    /**
     * Function for removing a specific bullet from a buddy's bullet controller, in response to this bullet hitting a zombie
     * @param {Event} e - The event that called the function
     */
    bulletHit = (e) =>{
        this.buddies[e.detail.sender].deleteBullet(e.detail.key);
    }

    /**
     * Get the length of the buddies array
     * @returns {int} the length of the buddies array
     */
    getCount(){
        return this.buddies.length;
    }

    /**
     * Resets the controller to default on game end in preparation for a new game
     */
    resetToDefault(){
        this.buddies = [];
    }
}