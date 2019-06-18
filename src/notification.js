const MovingObject = require("./moving_object");

class Notification extends MovingObject {
    constructor(options) {
        options.pos = options.pos;
        options.vel = options.vel || [0.5, -0.5];
        options.color = "#FFFFFF";
        super(options);
        this.message = options.message;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.font = "14px Saira Semi Condensed";
        ctx.fillStyle = this.color;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${this.message}`, this.pos[0], this.pos[1]);
        ctx.closePath();
    }
    
}

module.exports = Notification;