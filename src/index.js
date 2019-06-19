const Game = require("./game");
const GameView = require("./game_view");

let npcSpeedMultiplierBool = false;
let angledEnemySpawnsBool = false;
let playerSpeedMultiplierBool = false;
let enemySpawnFrequencyMultiplierBool = false;
let enemySpeedRandomBool = false;

document.addEventListener('DOMContentLoaded', () => {

    const canvasEl = document.getElementById('canvas');
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    const ctx = canvasEl.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.SAFE_ZONE_COLOR;
    ctx.shadowColor = Game.SAFE_ZONE_COLOR;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect((Game.DIM_X * 0.49), 0, (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
    ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.95), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
    ctx.closePath();

    /////////////

    let fasterNPCs = document.getElementById('faster-npcs');
    fasterNPCs.onclick = () => {
        if (npcSpeedMultiplierBool === false) {
            npcSpeedMultiplierBool = true;
            fasterNPCs.setAttribute("class", "multiplier-btn-active");
            
        } else {
            npcSpeedMultiplierBool = false;
            fasterNPCs.setAttribute("class", "multiplier-btn");
        }
        fasterNPCs.blur();
    }

    let angledEnemySpawns = document.getElementById('angled-enemy-spawns');
    angledEnemySpawns.onclick = () => {
        if (angledEnemySpawnsBool === false) {
            angledEnemySpawnsBool = true;
            angledEnemySpawns.setAttribute("class", "multiplier-btn-active");
        } else {
            angledEnemySpawnsBool = false;
            angledEnemySpawns.setAttribute("class", "multiplier-btn");
        }
        angledEnemySpawns.blur();
    }

    let playerSpeedMultiplier = document.getElementById('slow-player');
    playerSpeedMultiplier.onclick = () => {
        if (playerSpeedMultiplierBool === false) {
            playerSpeedMultiplierBool = true;
            playerSpeedMultiplier.setAttribute("class", "multiplier-btn-active");
        } else {
            playerSpeedMultiplierBool = false;
            playerSpeedMultiplier.setAttribute("class", "multiplier-btn");
        }
        playerSpeedMultiplier.blur();
    }

    let enemySpawnFrequencyMultiplier = document.getElementById('more-enemies');
    enemySpawnFrequencyMultiplier.onclick = () => {
        if (enemySpawnFrequencyMultiplierBool === false) {
            enemySpawnFrequencyMultiplierBool = true;
            enemySpawnFrequencyMultiplier.setAttribute("class", "multiplier-btn-active");
        } else {
            enemySpawnFrequencyMultiplierBool = false;
            enemySpawnFrequencyMultiplier.setAttribute("class", "multiplier-btn");
        }
        enemySpawnFrequencyMultiplier.blur();
    }

    let enemySpeedRandom = document.getElementById('random-enemy-speed');
    enemySpeedRandom.onclick = () => {
        if (enemySpeedRandomBool === false) {
            enemySpeedRandomBool = true;
            enemySpeedRandom.setAttribute("class", "multiplier-btn-active");
        } else {
            enemySpeedRandomBool = false;
            enemySpeedRandom.setAttribute("class", "multiplier-btn");
        }
        enemySpeedRandom.blur();
    }

    /////////////
    
    let hs1 = window.hs1;
    let hs2 = window.hs2;
    let hs3 = window.hs3;
    let hs4 = window.hs4;
    let hs5 = window.hs5;

    let highScores = document.getElementById('high-scores');
    highScores.innerHTML = `<li>${hs1}</li><li>${hs2}</li><li>${hs3}</li><li>${hs4}</li><li>${hs5}</li>`;

    /////////////

    let startGame = document.getElementById('start-game');
    startGame.onclick = () => {
        const game = new Game(npcSpeedMultiplierBool, angledEnemySpawnsBool, playerSpeedMultiplierBool, enemySpawnFrequencyMultiplierBool, enemySpeedRandomBool);
        new GameView(game, ctx).start();
        startGame.blur();

    }
});

function renderDiagram() {
    const canvasDiagram = document.getElementById('diagram');
    canvasDiagram.width = 200;
    canvasDiagram.height = 600;
    const ctxDiagram = canvasDiagram.getContext('2d');

    ctxDiagram.clearRect(0, 0, 200, 600);
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.beginPath();
    ctxDiagram.fillRect(0, 0, 200, 600);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 1)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText("ENEMIES", 100, 25);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#f45942";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#f45942";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.arc(100, 75, 20, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#a442f4";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#a442f4";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.strokeRect(60, 125, 80, 10);
    ctxDiagram.fillRect(60, 125, 80, 10);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#f9e43e";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#f9e43e";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.strokeRect(70, 170, 60, 30);
    ctxDiagram.fillRect(70, 170, 60, 30);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#fca420";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#fca420";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.strokeRect(85, 235, 30, 60);
    ctxDiagram.fillRect(85, 235, 30, 60);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#f442e8";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#f442e8";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.strokeRect(85, 330, 30, 30);
    ctxDiagram.fillRect(85, 330, 30, 30);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 1)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.shadowBlur = 0;
    ctxDiagram.fillText("POWERUPS", 100, 405);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#48f442";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#48f442";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.arc(35, 450, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('S', 35, 453);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.shadowBlur = 0;
    ctxDiagram.fillText("SLOW TIME", 125, 450);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#48f442";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#48f442";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.arc(35, 485, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('!', 35, 488);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.shadowBlur = 0;
    ctxDiagram.fillText("INVINCIBLE", 125, 485);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#48f442";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#48f442";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.arc(35, 520, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "24px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('+', 35, 521);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.shadowBlur = 0;
    ctxDiagram.fillText("SCORE PLUS", 125, 520);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.fillStyle = "#000000";
    ctxDiagram.strokeStyle = "#48f442";
    ctxDiagram.lineWidth = 5;
    ctxDiagram.shadowColor = "#48f442";
    ctxDiagram.shadowBlur = 30;
    ctxDiagram.shadowOffsetX = 0;
    ctxDiagram.shadowOffsetY = 0;
    ctxDiagram.arc(35, 555, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('X', 35, 558);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.shadowBlur = 0;
    ctxDiagram.fillText("CLEAR SCREEN", 125, 555);
    ctxDiagram.closePath();
}

document.fonts.load('10pt "Saira Semi Condensed"').then(renderDiagram);

