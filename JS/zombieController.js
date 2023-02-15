import Zombie from "./zombie.js";

/**
 * Zombie Controller, used for handling the various groups of zombies
 */
export default class ZombieController{
    /**
     * Constructor. Initializes zombie arrays and adds audio
     */
    constructor (){
        this.waves = [[], [], []];
        this.currentWave = -1;
        this.kill1Sound = new Audio("./Sounds/kill1.wav");
        this.kill2Sound = new Audio("./Sounds/kill2.wav");
        this.kill3Sound = new Audio("./Sounds/kill3.wav");
        this.hit1Sound = new Audio("./Sounds/hit1.wav");
        this.hit2Sound = new Audio("./Sounds/hit2.wav");
        this.hit3Sound = new Audio("./Sounds/hit3.wav");
    }

    /**
     * Iterates through the current wave of zombies and draws them on the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        this.waves[this.currentWave].forEach((zombie) => {
            zombie.draw(context);
        })
    }

    /**
     * Determines the movement type needed for the zombies based on passed-in values and instructs each zombie in the current wave to move properly
     * @param {int} w - The current health of the wall
     * @param {int} px - The current X coordinate of the player (can be null)
     * @param {int} py - The current Y coordinate of the player (can be null)
     */
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

    /**
     * Plays a random hit sound when a zombie is shot
     */
    hitSound(){
        switch(this.randomInt(1, 3)){
            case 1:
                this.hit1Sound.play();
                break;
            case 2:
                this.hit2Sound.play();
                break;
            case 3:
                this.hit3Sound.play();
                break;
        }
    }

    /**
     * Plays a random kill sound when a zombie is killed
     */
    killSound(){
        switch(this.randomInt(1, 3)){
            case 1:
                this.kill1Sound.play();
                break;
            case 2:
                this.kill2Sound.play();
                break;
            case 3:
                this.kill3Sound.play();
                break;
        }
    }

    /**
     * Populate the three waves of the day with new zombies
     * @param {int} dayNumber - The current day
     */
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

    /**
     * Checks each bullet against each zombie to see if any have collided.
     * If they have, damage the zombie in question, stop checking the current bullet, and dispatch an event to either the player or the buddies, based on the sender.
     * @param {Map} bullets - A map of bullets
     * @param {string} sender - A character indicating which bullet controller sent the call for bullet collision checking
     */
    bulletCollisionCheck(bullets, sender){
        if (this.currentWave >= 0 && this.currentWave <= 2){
            bullets.forEach((bullet, key) => {
                for (let i = this.waves[this.currentWave].length - 1; i >= 0; i--){
                    if (this.waves[this.currentWave][i].bulletCollisionCheck(bullet)){
                        this.kill(i, bullet.getPower());
                        i = -1;
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

    /**
     * Check the player against each zombie to see if they have collided.
     * If they have, stop checking and return true
     * @param {int} px - The current X coordinate of the player
     * @param {int} py - The current Y coordinate of the player
     * @returns 
     */
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

    /**
     * Damage zombie i based on power. 
     * If it has no health, dispatch a kill event for the upgrade controller, stop the zombie's attack timer, kill it, and iterate the wave number if necessary.
     * If the final wave is dead, dispatch a waveEnd event. 
     * If the zombie is still alive, just play a hit sound.
     * @param {int} i 
     * @param {int} power 
     */
    kill(i, power){
        if (this.waves[this.currentWave][i].hit(power) <= 0){
            document.dispatchEvent(new CustomEvent('kill',{detail: 1}));
            this.killSound();
            this.waves[this.currentWave][i].stopAttackTimer();
            this.waves[this.currentWave].splice(i, 1);
            if (this.waves[this.currentWave].length == 0){
                this.currentWave += 1;
                if (this.currentWave > 2){
                    document.dispatchEvent(new CustomEvent("waveEnd"));
                }
            }
        }else{
            this.hitSound();
        }
    }

    /**
     * Acquire and return an array of random zombies with size equal to count. Used for getting targets for buddies to shoot at
     * @param {int} count - The number of zombies to grab and return
     * @returns {Zombie[]} - An array of random zombies
     */
    getRandomZombies(count){
        let returnArray = [];
        for (let i = 1; i <= count; i++){
            returnArray.push(this.waves[this.currentWave][this.randomInt(0, this.waves[this.currentWave].length - 1)]);
        }
        return returnArray;
    }

    /**
     * Returns a random integer between the min and max values, inclusive
     * @param {int} min - The minimum possible int value
     * @param {int} max - The maximum possible int value
     * @returns {int} A random integer
     */
    randomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /**
     * Resets zombie controller to default state, stopping all attack timers and clearing zombie arrays
     */
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