import Player from "./player.js";
import Cursor from "./cursor.js";
import Wall from "./wall.js";

window.onload = startup;

const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const wall = new Wall();
const player = new Player(0, 0, 7, canvas, wall.getX());
const cursor = new Cursor(canvas);

canvas.addEventListener("click", shoot, false);

var playingGame = true;

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
}

