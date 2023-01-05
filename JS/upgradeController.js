export default class UpgradeController{
    constructor(){
        this.currency = 0;
        this.damageUpgrade1 = false;
        this.damageUpgrade2 = false;
        this.warningLabel = document.getElementById("warningLabel");

        this.repairCost = 15;
        this.upgradeCost = 100;
        this.damageCost = 20;
        this.buddyCost = 70;

        document.addEventListener("kill", this.kill, false);
        document.addEventListener("deductPayment", this.deductPayment, false);
        document.addEventListener("displayError", this.displayErrorMessage, false);
    }

    draw(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "left";
        context.fillText("Money: $" + this.currency, 10, 45);
        context.closePath();
    }

    drawWaveEnd(context){
        context.beginPath();
        context.font = "24px Arial";
        context.fillStyle = "black";
        context.textAlign = "center";
        context.fillText("Money: $" + this.currency, 450, 110);
        context.closePath();
    }

    kill = (e) => {
        this.currency += e.detail;
    }

    deductPayment = (e) => {
        switch(e.detail){
            case "repairWall":
                this.currency -= this.repairCost;
                break;
            case "upgradeWall":
                this.currency -= this.upgradeCost;
                break;
            default:
                //I have broken something, and I am making that your problem
                this.currency = 0;
        }
        document.dispatchEvent(new CustomEvent("redrawWaveEndGraphics"));
    }

    displayErrorMessage = (e) => {
        if (typeof e === "string"){
            this.warningLabel.innerText = e;
        }else{
            this.warningLabel.innerText = e.detail;
        }
    }

    repairWall(){
        if (this.currency - this.repairCost >= 0){
            document.dispatchEvent(new CustomEvent("repairWall"));
        }else{
            this.displayErrorMessage("Not enough funds to repair the wall");
        }
    }

    upgradeWall(){
        if (this.currency - this.upgradeCost >= 0){
            document.dispatchEvent(new CustomEvent("upgradeWall"));
        }else{
            this.displayErrorMessage("Not enough funds to upgrade the wall");
        }
    }

    upgradeDamage(){
        document.dispatchEvent(new CustomEvent("upgradeDamage"));
    }

    resetToDefault(){
        this.currency = 0;
    }
}