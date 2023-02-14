import Player from "./player.js";
import Cursor from "./cursor.js";
import Wall from "./wall.js";
import ZombieController from "./zombieController.js";
import DayController from "./dayController.js";
import UpgradeController from "./upgradeController.js";
import BuddyController from "./buddyController.js";

window.onload = startup;

//Declaring constants and vars for game function
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const upgradePanel = document.getElementById("upgradePanel");
const repairButton = document.getElementById("repairWall");
const upgradeWallButton = document.getElementById("upgradeWall");
const upgradeDamageButton = document.getElementById("upgradeDamage");
const buyABuddyButton = document.getElementById("buyABuddy");
const wall = new Wall();
const player = new Player(100, 200, 7, canvas, wall.getX());
const cursor = new Cursor(canvas);
const zomCon = new ZombieController();
const dayCon = new DayController();
const upCon = new UpgradeController();
const buddyCon = new BuddyController(canvas);
const startButton = document.getElementById("start");

const dieSound = new Audio('./Sounds/dead.wav');

canvas.addEventListener("click", shoot, false);
startButton.addEventListener("click", startGame, false);
repairButton.addEventListener("click", repairWall, false);
upgradeWallButton.addEventListener("click", upgradeWall, false);
upgradeDamageButton.addEventListener("click", upgradeDamage, false);
buyABuddyButton.addEventListener("click", buyABuddy, false);

document.addEventListener("waveEnd", waveEnd, false);
document.addEventListener("redrawWaveEndGraphics", redrawWaveEndGraphics, false);

var playingGame = false;
var waveStart = false;
var buddyShootTimer = null;

function startGame(){
    upCon.clearWarningLabel();
    startButton.style.display = "none";
    canvas.style.cursor = "none";
    if (!playingGame){
        playingGame = true;
    }
    if (!waveStart){
        waveStart = true;
        dayCon.newDay();
        zomCon.populateWaves(dayCon.getDay());
        upgradePanel.style.display = "none";
        if (buddyCon.getCount() > 0){
            buddyShootTimer = setInterval(buddyShoot, 1000);
        }
    }
}

function startup(){
    canvas.onmousemove = mouseMove;
    titleScreenDraw();
    gameLoop();
}

function titleScreenDraw(){
    context.beginPath();
    context.font = "36px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("ZOMBIE", 450, 150);
    context.fillText("DEFENCE", 450, 185);
    context.closePath();
}

function shoot(){
    if (waveStart){
        player.shoot(cursor.getX(), cursor.getY());
    }
    if (buddyCon.length > 0){
        buddyCon.shoot(zomCon.getRandomZombies(buddyCon.length));
    }
}

function buddyShoot(){
    buddyCon.shoot(zomCon.getRandomZombies(buddyCon.getCount()));
}

function mouseMove(evt) {
    cursor.move(evt);
}

function repairWall(){
    upCon.repairWall();
}

function upgradeWall(){
    upCon.upgradeWall();
}

function upgradeDamage(){
    upCon.upgradeDamage();
}

function buyABuddy(){
    upCon.buyABuddy();
}

function gameLoop(){
    if (playingGame && waveStart){
        play();
    }
    requestAnimationFrame(gameLoop);
}

function play(){
    context.clearRect(0, 0, 900, 400);
    player.draw(context);
    cursor.draw(context);
    wall.draw(context);
    upCon.draw(context);
    dayCon.draw(context);
    buddyCon.draw(context);
    if (wall.getHP() > 0){
        zomCon.move(wall.getHP());
    } else {
        zomCon.move(wall.getHP(), player.getX(), player.getY());
    }
    
    zomCon.draw(context);
    if (zomCon.playerCollisionCheck(player.getX(), player.getY())){
        stopGame();
    }
    zomCon.bulletCollisionCheck(player.getBullets(), "p");
    for(let i = 0; i < buddyCon.getCount(); i++){
        zomCon.bulletCollisionCheck(buddyCon.getBullets(i), i);
    }
}

function stopGame(){
    canvas.style.cursor = "default";
    context.clearRect(0, 0, 900, 400);
    gameOverDraw();
    playingGame = false;
    waveStart = false;
    startButton.style.display = "block";
    clearTimeout(buddyShootTimer);
    buddyShootTimer = null;
    player.resetToDefault();
    zomCon.resetToDefault();
    wall.resetToDefault();
    upCon.resetToDefault();
    dayCon.resetToDefault();
    buddyCon.resetToDefault();
    dieSound.play();
}

function gameOverDraw(){
    context.beginPath();
    context.font = "36px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("GAME OVER", 450, 170);
    context.fillText("You died on day " + dayCon.getDay(), 450, 250);
    context.closePath();
}

function waveEnd(){
    canvas.style.cursor = "default";
    context.clearRect(0, 0, 900, 400);
    waveStart = false;
    startButton.style.display = "block";
    upgradePanel.style.display = "block";
    clearTimeout(buddyShootTimer);
    buddyShootTimer = null;
    player.resetBullets();
    upCon.drawWaveEnd(context);
    dayCon.drawWaveEnd(context);
    wall.drawWaveEnd(context);
    buddyCon.drawWaveEnd(context);
}

function redrawWaveEndGraphics(){
    context.clearRect(0, 0, 900, 400);
    upCon.drawWaveEnd(context);
    dayCon.drawWaveEnd(context);
    wall.drawWaveEnd(context);
    buddyCon.drawWaveEnd(context);
}

