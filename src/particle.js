const MovingObject = require("./moving_object");

class Particle extends MovingObject {
    constructor(options) {
        options.pos = options.pos;
        options.vel = options.vel;
        options.radius = 2;
        options.color = options.color;
        super(options);
        debugger
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
    
}

module.exports = Particle;