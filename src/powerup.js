const MovingObject = require("./moving_object");
const Util = require("./util");

class Powerup extends MovingObject {
    constructor(options) {
        options.pos = options.pos;
        options.vel = options.vel;
        options.radius = options.radius;
        options.color = options.color;
        super(options);
    }
}

module.exports = Powerup;