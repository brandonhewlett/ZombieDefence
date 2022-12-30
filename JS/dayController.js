export default class DayController{
    constructor() {
        this.dayCounter = 0;
    }

    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Day " + this.dayCounter, 10, 20);
        context.closePath();
    }

    newDay(){
        this.dayCounter += 1;
    }

    getDay(){
        return this.dayCounter;
    }

    resetToDefault(){
        this.dayCounter = 0;
    }
}