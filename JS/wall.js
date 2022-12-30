export default class Wall{
    constructor(){
        this.x = 200;
        this.hp = 500;
        this.width = 10;
        document.addEventListener("attackWall", this.damageWall, false);
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
        context.fillText("Wall HP: " + this.hp, 10, 70);
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
    }

    resetToDefault(){
        this.hp = 500;
    }
}