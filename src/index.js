const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener('DOMContentLoaded', () => {

    ////////// DIAGRAM
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
    ctxDiagram.arc(40, 450, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('S', 40, 452);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
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
    ctxDiagram.arc(40, 485, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('!', 40, 487);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
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
    ctxDiagram.arc(40, 520, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "24px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('+', 40, 520);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
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
    ctxDiagram.arc(40, 555, 12, 0, 2 * Math.PI, true);
    ctxDiagram.stroke();
    ctxDiagram.fill();
    ctxDiagram.closePath();
    ctxDiagram.beginPath();
    ctxDiagram.font = "20px Saira Semi Condensed";
    ctxDiagram.fillStyle = "white";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText('X', 40, 557);
    ctxDiagram.closePath();

    ctxDiagram.beginPath();
    ctxDiagram.font = "16px Saira Semi Condensed";
    ctxDiagram.fillStyle = "rgba(204, 204, 204, 0.75)";
    ctxDiagram.textAlign = "center";
    ctxDiagram.textBaseline = "middle";
    ctxDiagram.fillText("CLEAR SCREEN", 125, 555);
    ctxDiagram.closePath();
    
    ////////// GAME

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

    document.getElementById('start-game').onclick = () => {
        const game = new Game();
        new GameView(game, ctx).start();
    }
});

