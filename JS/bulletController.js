import Bullet from "./bullet.js";

export default class BulletController{
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
        this.shootSound();
    }

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

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
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