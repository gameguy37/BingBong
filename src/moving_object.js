const Util = require("./util");

class MovingObject {
    constructor(options) {
        this.game = options.game;
        this.pos = options.pos;
        this.radius = options.radius;
        this.length = options.length;
        this.width = options.width;
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
        if (otherObject.constructor.name === "EnemyCircle" ||
            otherObject.constructor.name === "PowerupBulletTime" ||
            otherObject.constructor.name === "PowerupInvincibility" ||
            otherObject.constructor.name === "PowerupPlusScore" ||
            otherObject.constructor.name === "PowerupWipeout") {
                const centerDist = Util.dist(this.pos, otherObject.pos);
                return centerDist < (this.radius + otherObject.radius);
        }
        if (otherObject.constructor.name === "EnemyLine" ||
            otherObject.constructor.name === "EnemyRectangleHorizontal" ||
            otherObject.constructor.name === "EnemyRectangleVertical" ||
            otherObject.constructor.name === "EnemySquare") {
                let DeltaX = this.pos[0] - Math.max(otherObject.pos[0] - (otherObject.width / 2), Math.min(this.pos[0], (otherObject.pos[0] + (otherObject.width / 2))));
                let DeltaY = this.pos[1] - Math.max(otherObject.pos[1] - (otherObject.length / 2), Math.min(this.pos[1], (otherObject.pos[1] + (otherObject.length / 2))));
                return (DeltaX * DeltaX + DeltaY * DeltaY) < (this.radius * this.radius);
                // this formula for collision between a circle and a regular polygon inspired by the article here: https://yal.cc/rectangle-circle-intersection-test/
        }
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