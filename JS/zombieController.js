import Zombie from "./zombie.js";

export default class ZombieController{
    constructor (){
        this.zombies = [];
    }

    draw(context){
        if (this.zombies.length != 0){
            this.zombies.forEach((zombie) => {
                zombie.draw(context);
            })
        }
    }

    move(w, px = 0, py = 0){
        if (this.zombies.length != 0){
            if (w > 0){
                this.zombies.forEach((zombie) => {
                    zombie.moveToWall()
                })
            } else {
                this.zombies.forEach((zombie) => {
                    zombie.moveToPlayer(px, py)
                })
            }
        }
    }

    spawn(){
        this.zombies.push(new Zombie());
    }

    bulletCollisionCheck(bullets, sender){
        try{
            bullets.forEach((bullet, key) => {
                for (let i = this.zombies.length - 1; i >= 0; i--){
                    if (this.zombies[i].bulletCollisionCheck(bullet)){
                        this.kill(i)
                        i = -1
                        if (sender = "p"){
                            document.dispatchEvent(new CustomEvent('bulletHit', {detail: {key}}));
                        } else if (sender = "b"){
                            document.dispatchEvent(new CustomEvent('buddyBulletHit',{detail: {key}}));
                        }
                    }
                }
            })
        } catch(e) {
            
        } 
    }

    playerCollisionCheck(px, py){
        for (let i = this.zombies.length - 1; i >= 0; i--){
            if (this.zombies.length !=0){
                var hit = this.zombies[i].playerCollisionCheck(px, py);
                if (hit){
                    i = -1
                    return true;
                }
            }
        }
    }

    kill(i){
        this.zombies.splice(i, 1);
    }
}