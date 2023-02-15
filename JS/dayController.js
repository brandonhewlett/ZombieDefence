/**
 * Day Controller Class, used for counting and displaying the current day/round to the player
 */
export default class DayController{
    /**
     * Constructor
     */
    constructor() {
        this.dayCounter = 0;
        this.waveSound = new Audio('./Sounds/wavestart.wav');
    }

    /**
     * Draws the current day onto the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Day " + this.dayCounter, 10, 20);
        context.closePath();
    }

    /**
     * Draws the finished day onto the canvas at wave end
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "Center";
        context.fillText("You survived day " + this.dayCounter, 450, 80);
        context.closePath();
    }

    /**
     * Iterates the day by 1 on game start and wave start, and plays the associated sound
     */
    newDay(){
        this.dayCounter += 1;
        this.waveSound.play();
    }

    /**
     * Get the current day
     * @returns {int} The current day
     */
    getDay(){
        return this.dayCounter;
    }

    /**
     * Resets the day to 0 when the game ends
     */
    resetToDefault(){
        this.dayCounter = 0;
    }
}