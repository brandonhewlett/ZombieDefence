import Zombie from "./zombie.js";

export default class ZombieController{
    constructor (){
        this.zombies = [];
        this.waves = [[], [], []];
        this.currentWave = -1;
    }

    draw(context){
        this.waves[this.currentWave].forEach((zombie) => {
            zombie.draw(context);
        })
    }

    move(w, px, py){
        if (w > 0){
            this.waves[this.currentWave].forEach((zombie) => {
                zombie.moveToWall();
            })
        } else {
            this.waves[this.currentWave].forEach((zombie) => {
                zombie.moveToPlayer(px, py);
            })
        }
    }

    populateWaves(dayNumber){
        //log 1.1 + 10
        let count = (Math.log(dayNumber) / Math.log(1.1)) + 10;
        for (let i = 0; i < count; i++){
            this.waves[0].push(new Zombie(dayNumber));
        }
        for (let i = 0; i < count; i++){
            this.waves[1].push(new Zombie(dayNumber));
        }
        for (let i = 0; i < count; i++){
            this.waves[2].push(new Zombie(dayNumber));
        }
        this.currentWave = 0;
    }

    bulletCollisionCheck(bullets, sender){
        if (this.currentWave >= 0 && this.currentWave <= 2){
            bullets.forEach((bullet, key) => {
                for (let i = this.waves[this.currentWave].length - 1; i >= 0; i--){
                    if (this.waves[this.currentWave][i].bulletCollisionCheck(bullet)){
                        this.kill(i, bullet.getPower());
                        i = -1;
                        console.log("Bullet Hit by Buddy " + sender);
                        if (sender == "p"){
                            document.dispatchEvent(new CustomEvent('bulletHit', {detail: {key}}));
                        } else {
                            document.dispatchEvent(new CustomEvent('buddyBulletHit',{detail: {key, sender}}));
                        }
                    }
                }
            })
        }
    }

    playerCollisionCheck(px, py){
        for (let i = this.waves[this.currentWave].length - 1; i >= 0; i--){
            if (this.waves[this.currentWave].length !=0){
                var hit = this.waves[this.currentWave][i].playerCollisionCheck(px, py);
                if (hit){
                    i = -1;
                    return true;
                }
            }
        }
    }

    kill(i, power){
        if (this.waves[this.currentWave][i].hit(power) <= 0){
            document.dispatchEvent(new CustomEvent('kill',{detail: 1}));
            this.waves[this.currentWave][i].stopAttackTimer();
            this.waves[this.currentWave].splice(i, 1);
            if (this.waves[this.currentWave].length == 0){
                this.currentWave += 1;
                if (this.currentWave > 2){
                    document.dispatchEvent(new CustomEvent("waveEnd"));
                }
            }
        }
    }

    getRandomZombies(count){
        let returnArray = [];
        for (let i = 1; i <= count; i++){
            returnArray.push(this.waves[this.currentWave][this.randomInt(0, this.waves[this.currentWave].length - 1)]);
        }
        return returnArray;
    }

    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    resetToDefault(){
        this.waves.forEach(waveArray => {
            waveArray.forEach(zombie => {
                zombie.stopAttackTimer();
            })
        });

        this.waves = [[], [], []];
        this.currentWave = -1;
    }
}