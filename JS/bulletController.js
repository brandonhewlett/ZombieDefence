import Bullet from "./bullet.js";

export default class BulletController{
    constructor() {
        this.bullets = new Map();
        this.power = 1;
        this.uniqueID = 0;
    }
    
    draw(context){
        if (this.bullets.size > 0){
            this.bullets.forEach((bullet, key) => {
                bullet.draw(context);
            })
        }
        this.checkVisibility();
    }

    shoot(pX, pY, speed, canvasX, canvasY, cursorX, cursorY){
        this.bullets.set(this.uniqueID, new Bullet(pX, pY, speed, this.power, canvasX, canvasY, cursorX, cursorY));
        this.uniqueID += 1;
    }

    checkVisibility(){
        if (this.bullets.length > 0){
            this.bullets.forEach((bullet, key) => {
                if (!bullet.checkVisibility()){
                    this.deleteBullet(key);
                }
            })
        }
    }

    getBullets(){
        return this.bullets;
    }

    deleteBullet(i){
        this.bullets.delete(i);
    }

    upgradeDamage(){
        if (this.power < 3){
            this.power += 1;
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "upgradeDamage"}));
        }else{
            document.dispatchEvent(new CustomEvent('displayError', {detail: "Your damage can't get any higher"}))
        }
    }

    resetBullets(){
        this.bullets.clear();
        this.uniqueID = 0;
    }

    resetToDefault(){
        this.bullets.clear();
        this.uniqueID = 0;
        this.power = 1;
    }
}