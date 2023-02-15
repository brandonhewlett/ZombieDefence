/**
 * Upgrade Controller, used for handling upgrades and currency tracking
 */
export default class UpgradeController{
    /**
     * Constructor. Sets upgrade costs, adds event listeners, and adds sounds
     */
    constructor(){
        this.currency = 0;

        this.repairCost = 15;
        this.upgradeCost = 45;
        this.damageCost = 20;
        this.buddyCost = 10;

        this.buySound = new Audio ("./Sounds/buy.wav");
        this.errorSound = new Audio ("./Sounds/error.wav");

        this.warningLabel = document.getElementById("warningLabel");

        document.addEventListener("kill", this.kill, false);
        document.addEventListener("deductPayment", this.deductPayment, false);
        document.addEventListener("displayError", this.displayErrorMessage, false);
    }

    /**
     * Draws the current currency amount onto the canvas
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Money: $" + this.currency, 10, 45);
        context.closePath();
    }

    /**
     * Draws the currency onto the canvas at wave end
     * @param {CanvasRenderingContext2D} context - Context for drawing onto the canvas
     */
    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Money: $" + this.currency, 450, 110);
        context.font = "16px Arial";
        context.fillText("$" + this.repairCost, 45, 390);
        context.fillText("$" + this.upgradeCost, 150, 390);
        context.fillText("$" + this.damageCost, 270, 390);
        context.fillText("$" + this.buddyCost, 375, 390);
        context.closePath();
    }

    /**
     * Handler for kill event, which adds currency to the total based on event details
     * @param {Event} e - The event with details regarding currency amount
     */
    kill = (e) => {
        this.currency += e.detail;
    }

    /**
     * Handler for payment event, which deducts cost from currency based on event details
     * @param {Event} e - The event with details regarding upgrade type
     */
    deductPayment = (e) => {
        switch(e.detail){
            case "repairWall":
                this.currency -= this.repairCost;
                break;
            case "upgradeWall":
                this.currency -= this.upgradeCost;
                break;
            case "upgradeDamage":
                this.currency -= this.damageCost;
                break;
            case "addBuddy":
                this.currency -= this.buddyCost;
                break;
            default:
                //I have broken something, and I am making that the player's problem
                this.currency = 0;
        }
        this.buySound.play();
        document.dispatchEvent(new CustomEvent("redrawWaveEndGraphics"));
    }

    /**
     * Handler for error event, which displays the passed error message in the warning label
     * @param {*} e - Event or string containing the error message to be displayed
     */
    displayErrorMessage = (e) => {
        if (typeof e === "string"){
            this.warningLabel.innerText = e;
        }else{
            this.warningLabel.innerText = e.detail;
        }
        this.errorSound.play();
    }

    /**
     * Dispatches a repair wall event for the wall handler
     */
    repairWall(){
        if (this.currency - this.repairCost >= 0){
            document.dispatchEvent(new CustomEvent("repairWall"));
        }else{
            this.displayErrorMessage("Not enough funds to repair the wall");
        }
    }

    /**
     * Dispatches an upgrade wall event for the wall handler
     */
    upgradeWall(){
        if (this.currency - this.upgradeCost >= 0){
            document.dispatchEvent(new CustomEvent("upgradeWall"));
        }else{
            this.displayErrorMessage("Not enough funds to upgrade the wall");
        }
    }

    /**
     * Dispatches a upgrade damage event for the player handler
     */
    upgradeDamage(){
        if (this.currency - this.damageCost >= 0){
            document.dispatchEvent(new CustomEvent("upgradeDamage"));
        }else{
            this.displayErrorMessage("Not enough funds to upgrade your damage");
        }
    }

    /**
     * Dispatches an add buddy event for the buddy controller handler
     */
    buyABuddy(){
        if (this.currency - this.buddyCost >= 0){
            document.dispatchEvent(new CustomEvent("addBuddy"));
        }else{
            this.displayErrorMessage("Not enough funds to buy a buddy");
        }
    }

    /**
     * Clear the warning label text
     */
    clearWarningLabel(){
        this.warningLabel.innerText = "";
    }

    /**
     * Reset currency to 0 when game ends
     */
    resetToDefault(){
        this.currency = 0;
    }
}