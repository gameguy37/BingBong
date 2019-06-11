const Util = require("./util");

class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
    }

    // collideWith(otherObject) {
        
    // }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
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

}

module.exports = MovingObject;