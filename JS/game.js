import Player from "./player.js";
import Cursor from "./cursor.js";
import Wall from "./wall.js";
import ZombieController from "./zombieController.js";
import DayController from "./dayController.js";
import UpgradeController from "./upgradeController.js";
import BuddyController from "./buddyController.js";

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
var playingGame = false;
var waveStart = false;
var buddyShootTimer = null;

const dieSound = new Audio('./Sounds/dead.wav');

//Adding event listeners for clicking on canvas and UI elements
canvas.addEventListener("click", shoot, false);
startButton.addEventListener("click", startGame, false);
repairButton.addEventListener("click", repairWall, false);
upgradeWallButton.addEventListener("click", upgradeWall, false);
upgradeDamageButton.addEventListener("click", upgradeDamage, false);
buyABuddyButton.addEventListener("click", buyABuddy, false);

//Adding listeners for custom events
document.addEventListener("waveEnd", waveEnd, false);
document.addEventListener("redrawWaveEndGraphics", redrawWaveEndGraphics, false);

//Run initial startup function on window load
window.onload = startup;

/**
 * Initial game startup function. 
 * Activates mouse move event for canvas, draws title screen, and begins game loop
 */
function startup(){
    canvas.onmousemove = mouseMove;
    titleScreenDraw();
    gameLoop();
}

/**
 * Draws initial title screen graphic upon first load of the window
 */
function titleScreenDraw(){
    context.beginPath();
    context.font = "36px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("ZOMBIE", 450, 150);
    context.fillText("DEFENCE", 450, 185);
    context.closePath();
}

/**
 * Main game loop. Recursively calls itself to animate all elements on the canvas 
 */
function gameLoop(){
    if (playingGame && waveStart){
        play();
    }
    requestAnimationFrame(gameLoop);
}

/**
 * Looping game logic. Draws all UI elements, moves zombies, and checks for collision between zombies and bullets or the player
 */
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

/**
 * Handler for start button onclick, which starts the game. 
 * Starts game both from beginning and from inter-day upgrade period
 */
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

/**
 * Handler for canvas onclick event. Fires a bullet from the player to the cursor
 */
function shoot(){
    if (waveStart){
        player.shoot(cursor.getX(), cursor.getY());
    }
}

/**
 * Handler for buddy shoot timer. Fires a bullet from each buddy towards a random zombie
 */
function buddyShoot(){
    buddyCon.shoot(zomCon.getRandomZombies(buddyCon.getCount()));
}

/**
 * Handler for canvas mousemove event. Tells the custom cursor to follow where the user's cursor is
 * @param {Event} evt 
 */
function mouseMove(evt) {
    cursor.move(evt);
}

/**
 * Handler for repair button onclick. Tells the upgrade controller to try and repair the wall
 */
function repairWall(){
    upCon.repairWall();
}

/**
 * Handler for upgrade wall button onclick. Tells the upgrade controller to try and upgrade the wall
 */
function upgradeWall(){
    upCon.upgradeWall();
}

/**
 * Handler for upgrade damage onclick. Tells the upgrade controller to try and upgrade the damage value of the player's bullets
 */
function upgradeDamage(){
    upCon.upgradeDamage();
}

/**
 * Handler for buy buddy button onclick. Tells the upgrade controller to try and purchase a new buddy
 */
function buyABuddy(){
    upCon.buyABuddy();
}

/**
 * Handler for waveEnd event. Ends the wave, clears the canvas, displays the upgrade panel, and draws the upgrade screen graphics
 */
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

/**
 * Handler for redraw wave end graphics event. Redraws all UI elements on canvas whenever one of them changes, to keep displayed info up to date
 */
function redrawWaveEndGraphics(){
    context.clearRect(0, 0, 900, 400);
    upCon.drawWaveEnd(context);
    dayCon.drawWaveEnd(context);
    wall.drawWaveEnd(context);
    buddyCon.drawWaveEnd(context);
}

/**
 * Ends the game. 
 * Clears all UI elements, draws the game over screen, and resets all controllers to their default state
 */
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

/**
 * Draws the game over screen when the game ends
 */
function gameOverDraw(){
    context.beginPath();
    context.font = "36px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("GAME OVER", 450, 170);
    context.fillText("You died on day " + dayCon.getDay(), 450, 250);
    context.closePath();
}

