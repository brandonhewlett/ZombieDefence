export default class Zombie{
    constructor(){
        this.x = 1000;
        this.y = 200;
        this.speed = 5;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#00FF00";
        context.fill();
        context.closePath();
    }

    moveToWall(){
        this.x -= Math.min(this.speed, this.x - 200)
    }

    moveToPlayer(px, py){
        var d = Math.atan2(py - this.y, px - this.x);
        this.x += Math.cos(d) * this.speed;
        this.y += Math.sin(d) * this.speed;
    }

    //TODO: Change hard-coding of radius
    bulletCollisionCheck(bullet){
        let dx = bullet.getX() - this.x;
        let dy = bullet.getY() - this.y;
        let rad = 10+2.5;
        

        if((dx*dx)+(dy*dy) < (rad*rad)){
            return true;
        }else{
            return false;
        }
    }
}