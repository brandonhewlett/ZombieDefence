import Player from "./player.js";
import Cursor from "./cursor.js";
import Wall from "./wall.js";
import ZombieController from "./zombieController.js";
import DayController from "./dayController.js";
import UpgradeController from "./upgradeController.js";

window.onload = startup;

//Declaring constants and vars for game function
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const wall = new Wall();
const player = new Player(0, 0, 7, canvas, wall.getX());
const cursor = new Cursor(canvas);
const zomCon = new ZombieController();
const dayCon = new DayController();
const upCon = new UpgradeController();
const startButton = document.getElementById("start");

canvas.addEventListener("click", shoot, false);
startButton.addEventListener("click", startGame, false);
document.addEventListener("waveEnd", waveEnd, false);

var playingGame = false;
var waveStart = false;

function startGame(){
    startButton.style.display = "none";
    if (!playingGame){
        playingGame = true;
    }
    if (!waveStart){
        waveStart = true;
        dayCon.newDay();
        zomCon.populateWaves(dayCon.getDay());
    }
}

function startup(){
    canvas.onmousemove = mouseMove;
    gameLoop();
}

function shoot(){
    player.shoot(cursor.getX(), cursor.getY());
}

function mouseMove(evt) {
    cursor.move(evt);
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
}

function stopGame(){
    context.clearRect(0, 0, 900, 400);
    playingGame = false;
    waveStart = false;
    startButton.style.display = "block";

    player.resetToDefault();
    zomCon.resetToDefault();
    wall.resetToDefault();
    upCon.resetToDefault();
    dayCon.resetToDefault();
}

function waveEnd(){
    context.clearRect(0, 0, 900, 400);
    waveStart = false;
    startButton.style.display = "block";
    player.resetToDefault();
}

