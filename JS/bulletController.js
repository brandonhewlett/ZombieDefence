import Bullet from "./bullet.js";

export default class BulletController{
    constructor() {
        this.bullets = [];
    }
    
    draw(context){
        if (this.bullets.length > 0){
            this.bullets.forEach((bullet) => {
                bullet.draw(context);
            })
        }
        this.checkVisibility();
    }

    shoot(pX, pY, speed, canvasX, canvasY, cursorX, cursorY){
        this.bullets.push(new Bullet(pX, pY, speed, canvasX, canvasY, cursorX, cursorY));
    }

    checkVisibility(){
        if (this.bullets.length > 0){
            for (let i = this.bullets.length - 1; i >= 0; i--){
                if (!this.bullets[i].checkVisibility()){
                    this.bullets.splice(i, 1);
                }
            }
        }
    }

    getBullets(){
        return this.bullets;
    }

    deleteBullet(i){
        this.bullets.splice(i, 1);
    }
}