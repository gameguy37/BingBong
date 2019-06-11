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
}

module.exports = Powerup;