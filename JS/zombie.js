export default class Zombie{
    constructor(){
        this.x = 1000;
        this.y = this.randomInt(15, 385);
        this.speed = 5;
        this.power = 1;
        this.attackTimer = null;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle="#00FF00";
        context.fill();
        context.closePath();
    }

    moveToWall(){
        this.x -= Math.min(this.speed, this.x - 200-20)
        if (this.x == 220 && this.attackTimer == null){
            this.attackTimer = setInterval(this.attack, 1000);
        }
    }

    moveToPlayer(px, py){
        var d = Math.atan2(py - this.y, px - this.x);
        this.x += Math.cos(d) * (this.speed/2);
        this.y += Math.sin(d) * (this.speed/2);
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

    playerCollisionCheck(px, py){
        let dx = px - this.x;
        let dy = py - this.y;
        let rad = 10+10;
        
        if((dx*dx)+(dy*dy) < (rad*rad)){
            return true;
        }else{
            return false;
        }
    }

    attack = () => {
        document.dispatchEvent(new CustomEvent("attackWall",{detail: this.power}));
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    stopAttackTimer(){
        clearInterval(this.attackTimer);
    }
}