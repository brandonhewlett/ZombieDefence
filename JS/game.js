import Player from "./player.js";
import Cursor from "./cursor.js";
import Wall from "./wall.js";
import ZombieController from "./zombieController.js";

window.onload = startup;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const wall = new Wall();
const player = new Player(0, 0, 7, canvas, wall.getX());
const cursor = new Cursor(canvas);
const zomCon = new ZombieController();

canvas.addEventListener("click", shoot, false);

var playingGame = true;

function startup(){
    canvas.onmousemove = mouseMove;
    setInterval(spawnZombies, 1000);
    gameLoop();
}

function spawnZombies(){
    zomCon.spawn();
}

function shoot(){
    player.shoot(cursor.getX(), cursor.getY());
}

function mouseMove(evt) {
    cursor.move(evt);
}

function gameLoop(){
    if (playingGame){
        play();
    }
    requestAnimationFrame(gameLoop);
}

function play(){
    context.clearRect(0, 0, 900, 400);
    player.draw(context);
    cursor.draw(context);
    wall.draw(context);
    zomCon.move(wall.getHP());
    zomCon.draw(context);
    zomCon.bulletCollisionCheck(player.getBullets(), "p");
}

