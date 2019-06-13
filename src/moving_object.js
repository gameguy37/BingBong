const Util = require("./util");
const Player = require("./player");

class MovingObject {
    constructor(options) {
        this.game = options.game;
        this.pos = options.pos;
        this.radius = options.radius;
        this.color = options.color;
        if (this.game.angledEnemySpawns === true && !(this.constructor.name === "Player") && !(this.constructor.name === "Notification")) {
            let yVectorsArray = [1.5, 1, 0.5, 0, -0.5, -1, -1.5];
            let vectorY = yVectorsArray[Math.floor(Math.random() * yVectorsArray.length)];
            options.vel[1] += vectorY;
        }
        if (this.game.enemySpeedRandom === true && !(this.constructor.name === "Player") && !(this.constructor.name === "Notification")) {
            let vectorsArray = [2, 1.5, 1, 0.5, 0, -0.5, -1, -1.5, -2];
            let vectorX = vectorsArray[Math.floor(Math.random() * vectorsArray.length)];
            let vectorY = vectorsArray[Math.floor(Math.random() * vectorsArray.length)];
            options.vel[0] += vectorX;
            options.vel[1] += vectorY;
        }
        this.vel = [(options.vel[0] * this.game.npcSpeedMultiplier), (options.vel[1] * this.game.npcSpeedMultiplier)];
    }

    isCollidedWith(otherObject) {
        const centerDist = Util.dist(this.pos, otherObject.pos);
        return centerDist < (this.radius + otherObject.radius);
    }

    move() {
        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
        
        if (this.game.isOutOfBounds(this.pos)) {
            this.remove();
        }
    }

    remove() {
        this.game.remove(this);
    }

    explode() {
        this.game.explode(this);
    }

}

module.exports = MovingObject;