const MovingObject = require("./moving_object");
const Util = require("./util");

class Powerup extends MovingObject {
    constructor(options) {
        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];
        options.vel = Util.entranceVelocity(options.pos[0]);
        options.radius = 12;
        options.color = "#48f442";
        super(options);
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    
}

module.exports = Powerup;