const Enemy = require("./enemy");
const Util = require("./util");

class EnemySquare extends Enemy {
    constructor(options) {
        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];
        options.vel = Util.entranceVelocity(options.pos[0]);
        options.radius = 15; /////////
        options.color = "#f442e8";
        super(options);
    }

    draw(ctx) {
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.strokeRect(this.pos[0] - 15, this.pos[1] - 15, 30, 30);
        ctx.fillRect(this.pos[0] -15, this.pos[1] -15, 30, 30);
        ctx.moveTo(-10, -10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}

module.exports = EnemySquare;