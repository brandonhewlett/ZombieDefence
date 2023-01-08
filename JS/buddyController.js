import Buddy from "./buddy.js";

export default class BuddyController{
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

    draw(context){
        this.buddies.forEach((buddy) => {
            buddy.draw(context);
        });
    }

    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Buddies: " + this.buddies.length + "/4", 450, 170);
        context.closePath();
    }

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

    shoot(zombies){
        this.buddies.forEach((buddy, index) => {
            buddy.shoot(zombies[index]);
        })
    }

    getBullets(i){
        return this.buddies[i].getBullets();
    }

    bulletHit = (e) =>{
        this.buddies[e.detail.sender].deleteBullet(e.detail.key);
    }

    getCount(){
        return this.buddies.length;
    }

    resetToDefault(){
        this.buddies = [];
    }
}