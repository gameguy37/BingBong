const MovingObject = require("./moving_object");
const Util = require("./util");

class Enemy extends MovingObject {
    constructor(options) {
        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];
        options.vel = Util.entranceVelocity(options.pos[0]);
        options.radius = 20;
        options.color = "#f45942";
        super(options);
    }
}

module.exports = Enemy;