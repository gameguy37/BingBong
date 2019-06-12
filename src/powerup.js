const MovingObject = require("./moving_object");

class Powerup extends MovingObject {
    constructor(options) {
        options.pos = options.pos;
        // options.vel = options.vel;
        options.radius = options.radius;
        options.color = options.color;
        super(options);
        this.speedMultiplier = 1;
        options.vel = [(options.vel[0] * this.speedMultiplier), (options.vel[1] * this.speedMultiplier)];
    }
}

module.exports = Powerup;