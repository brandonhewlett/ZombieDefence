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
    }

    damage(dmg){
        this.hp -= dmg;
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
}