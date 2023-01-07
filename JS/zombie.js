export default class Zombie{
    constructor(currentDay){
        this.x = this.randomInt(1500, 2000);
        this.y = this.randomInt(15, 385);
        this.speed = 0;
        this.power = 0;
        this.health = 0;
        this.color = null;
        this.attackTimer = null;
        this.determineType(currentDay);
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 10, 0, 2*Math.PI);
        context.fillStyle=this.color;
        context.fill();
        context.closePath();
    }

    determineType(currentDay){
        let speedThreshold = 0;
        let bruteThreshold = 0;

        switch (currentDay){
            default:
                speedThreshold = 51;
                bruteThreshold = 76;
                break;
            case 1: 
                speedThreshold = 101;
                bruteThreshold = 101;
                break;
            case 2:
            case 3:
                speedThreshold = 81;
                bruteThreshold = 91;
                break;
            case 4:
            case 5:
            case 6:
                speedThreshold = 71;
                bruteThreshold = 86;
                break;
            case 7:
            case 8:
            case 9:
                speedThreshold = 61;
                bruteThreshold = 81;
                break;
        }

        let determiner = this.randomInt(1, 100);

        if (determiner < speedThreshold){
            this.speed = 3;
            this.power = 1;
            this.health = 3;
            this.color = "#009900";
        }else if (determiner < bruteThreshold){
            this.speed = 6;
            this.power = 1;
            this.health = 1;
            this.color = "#00FF00";
        }else {
            this.speed = 2;
            this.power = 3;
            this.health = 6;
            this.color = "#004900";
        }
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

    hit(power){
        this.health -= power;
        return this.health;
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