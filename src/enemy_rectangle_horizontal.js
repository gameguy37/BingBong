const Enemy = require("./enemy");
const Util = require("./util");

class EnemyRectangleHorizontal extends Enemy {
    constructor(options) {
        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];
        options.vel = Util.entranceVelocity(options.pos[0]);
        options.width = 60;
        options.length = 30;
        options.color = "#f9e43e";
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
        ctx.strokeRect(this.pos[0] - (this.width / 2), this.pos[1] - (this.length / 2), this.width, this.length);
        ctx.fillRect(this.pos[0] - (this.width / 2), this.pos[1] - (this.length / 2), this.width, this.length);
        ctx.moveTo(-(this.width / 2), -(this.length / 2));
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
}

module.exports = EnemyRectangleHorizontal;