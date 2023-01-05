export default class Bullet{
    constructor (sX, sY, speed, power, w, h, cursorX, cursorY){
        this.x = sX;
        this.y = sY;
        this.speed = speed;
        this.power = power;
        this.vx = 0;
        this.vy = 0;
        this.canvasX = w;
        this.canvasY = h;
        this.setVelocity(cursorX, cursorY);
    }

    draw(context){
        this.updatePosition();
        context.beginPath();
        context.arc(this.x, this.y, 2.5, 0, 2*Math.PI);
        context.fillStyle = "#000000";
        context.fill();
        context.closePath();
    }

    setVelocity(cx, cy){
        let d = Math.atan2(cy - this.y, cx - this.x);
        this.vx = Math.cos(d) * this.speed;
        this.vy = Math.sin(d) * this.speed;
    }

    checkVisibility(){
        if (this.x > this.canvasX || this.x < 0 || this.y > this.canvasY || this.y < 0){
            return false;
        } else {
            return true;
        }
    }

    updatePosition(){
        this.x += this.vx;
        this.y += this.vy;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}