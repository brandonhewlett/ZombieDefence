import Bullet from "./bullet.js";

export default class BulletController{
    constructor() {
        this.bullets = new Map();
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
        this.bullets.set(this.uniqueID, new Bullet(pX, pY, speed, canvasX, canvasY, cursorX, cursorY));
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

    resetToDefault(){
        this.bullets.clear();
        this.uniqueID = 0;
    }
}