export default class DayController{
    constructor() {
        this.dayCounter = 0;
        this.waveSound = new Audio('./Sounds/wavestart.wav');
    }

    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Day " + this.dayCounter, 10, 20);
        context.closePath();
    }

    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "Center";
        context.fillText("You survived day " + this.dayCounter, 450, 80);
        context.closePath();
    }

    newDay(){
        this.dayCounter += 1;
        this.waveSound.play();
    }

    getDay(){
        return this.dayCounter;
    }

    resetToDefault(){
        this.dayCounter = 0;
    }
}