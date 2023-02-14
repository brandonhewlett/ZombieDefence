export default class Wall{
    constructor(){
        this.x = 200;
        this.hp = 100;
        this.maxHP = 100;
        this.width = 10;
        this.wallHit1Sound = new Audio("./Sounds/wallhit1.wav");
        this.wallHit2Sound = new Audio("./Sounds/wallhit2.wav");
        this.wallHit3Sound = new Audio("./Sounds/wallhit3.wav");
        document.addEventListener("attackWall", this.damageWall, false);
        document.addEventListener("repairWall", this.repairWall, false);
        document.addEventListener("upgradeWall", this.upgradeWall, false);
    }

    draw(context){
        if (this.hp > 0){
            context.beginPath();
            context.rect(this.x, 10, this.width, 380);
            context.fillStyle = "#000000";
            context.fill();
            context.closePath();
        }
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Wall HP: " + this.hp + "/" + this.maxHP, 10, 70);
        context.closePath();
    }

    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Wall HP: " + this.hp + "/" + this.maxHP, 450, 140);
        context.closePath();
    }

    damage(dmg){
        this.hp -= dmg;
        if (this.hp < 0){
            this.hp = 0;
        }
    }

    getX(){
        return this.x;
    }

    getSpacer(){
        return this.x + this.width;
    }

    getHP(){
        return this.hp;
    }

    damageWall = (e) => {
        this.hp -= e.detail;
        this.wallHitSound();
    }

    wallHitSound(){
        switch(this.randomInt(1, 3)){
            case 1:
                this.wallHit1Sound.play();
                break;
            case 2:
                this.wallHit2Sound.play();
                break;
            case 3:
                this.wallHit3Sound.play();
                break;
        }
    }

    repairWall = (e) => {
        if (this.hp >= this.maxHP){
            document.dispatchEvent(new CustomEvent('displayError', {detail: "The wall doesn't need any repairs"}))
        } else {
            this.hp += 50;
            if (this.hp > this.maxHP){
                this.hp = this.maxHP;
            }
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "repairWall"}));
        }
    }

    upgradeWall = (e) => {
        if (this.maxHP == 500){
            document.dispatchEvent(new CustomEvent('displayError', {detail: "Can't upgrade the wall any further"}))
        }else {
            this.maxHP += 100;
            this.hp += 100;
            document.dispatchEvent(new CustomEvent('deductPayment',{detail: "upgradeWall"}));
        }
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    resetToDefault(){
        this.hp = 100;
    }
}