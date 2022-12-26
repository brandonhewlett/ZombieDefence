import BulletController from "./bulletController.js";

export default class Player{
    constructor(x, y, speed, canvas, wX){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.canvas = canvas.getBoundingClientRect();
        this.bulletController = new BulletController();
        this.wallX = wX;
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        document.addEventListener("bulletHit", this.bulletHit, false);
    }

    draw(context){
        this.movement();
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#FF0000";
        context.fill();
        context.closePath();
        this.bulletController.draw(context);
    }

    movement() {
        if (this.rightPressed) {
            this.x += Math.min(this.speed, this.wallX - this.x);
        }
        if (this.leftPressed) {
            this.x -= Math.min(this.speed, 0 + this.x);
        }
        if (this.downPressed) {
            this.y += Math.min(this.speed, this.canvas.height - this.y);
        }
        if (this.upPressed) {
            this.y -= Math.min(this.speed, 0 + this.y);
        }
    }

    shoot(cursorX, cursorY) {
        this.bulletController.shoot(this.x, this.y, 10, this.canvas.width, this.canvas.height, cursorX, cursorY);
    }

    keyDownHandler = (e) => {
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = true;
                break;
            case "ArrowLeft":
                this.leftPressed = true;
                break;
            case "ArrowUp":
                this.upPressed = true;
                break;
            case "ArrowDown":
                this.downPressed = true;
                break;
            default:
                break;
        }
    }
    
    keyUpHandler = (e) => {
        switch (e.key) {
            case "ArrowRight":
                this.rightPressed = false;
                break;
            case "ArrowLeft":
                this.leftPressed = false;
                break;
            case "ArrowUp":
                this.upPressed = false;
                break;
            case "ArrowDown":
                this.downPressed = false;
                break;
            default:
                break;
        }
    }

    bulletHit = (e) => {
        this.bulletController.deleteBullet(e.detail.key);
    }

    getBullets(){
        return this.bulletController.getBullets();
    }
}