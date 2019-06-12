const MovingObject = require("./moving_object");

class Powerup extends MovingObject {
    constructor(options) {
        options.pos = options.pos;
        options.vel = options.vel;
        options.radius = options.radius;
        options.color = options.color;
        options.speedMultiplier = options.speedMultiplier;
        super(options);
    }
}

module.exports = Powerup;