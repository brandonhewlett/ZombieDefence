import BulletController from "./bulletController.js";

export default class Buddy{
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas
        this.bulletController = new BulletController();
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#0000FF";
        context.fill();
        context.closePath();
        this.bulletController.draw(context);
    }

    shoot(zombie){
        this.bulletController.shoot(this.x, this.y, 10, this.canvas.width, this.canvas.height, zombie.x, zombie.y);
    }

    getBullets(){
        return this.bulletController.getBullets();
    }

    deleteBullet(key){
        this.bulletController.deleteBullet(key);
    }
}