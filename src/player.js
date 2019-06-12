const MovingObject = require("./moving_object");
const Enemy = require("./enemy");
const Powerup = require("./powerup");

class Player extends MovingObject {
    constructor(options) {
        options.radius = options.radius || 12; // 30 means explode
        options.vel = options.vel || [0, 0];
        options.color = options.color || "#FFFFFF";
        options.pos = options.pos || [500, 552];
        super(options);
        this.safe_bottom = true;
        this.safe_top = false;
    }

    vulnerable() {  
        if (this.safe_bottom === false && this.safe_top === false) {
            return true;
        }
    }

    launch() {
        if (this.safe_bottom) {
            this.vel = [0, -8];
            this.safe_bottom = false;
        } else if (this.safe_top) {
            this.vel = [0, 8];
            this.safe_top = false;
        } else {
            return;
        }
    }

    attemptCatch() {
        if (this.vulnerable() && this.pos[1] >= 552) {
            this.vel = [0, 0];
            this.pos = [500, 552];
            this.safe_bottom = true;
            this.game.score += 1;
        } else if (this.vulnerable() && this.pos[1] <= 48) {
            this.vel = [0, 0];
            this.pos = [500, 48];
            this.safe_top = true;
            this.game.score += 1;
        } else {
            return;
        }
    }

    collideWith(otherObject) {
        if (otherObject instanceof Enemy && this.vulnerable() === true) {
            this.gameOver();
            return true;
        }
        // else if (otherObject instanceof Player) { // and player is invincible
        //     this.remove();
        //     return true;
        // }
        if (otherObject instanceof Powerup && this.vulnerable() === true) {
            this.gainPowers();
            otherObject.remove();
            return true;
        }

        return false;
    }

    gainPowers() {
        alert("YOU'RE POWERED UP!");
    }

    gameOver() {
        alert("GAME OVER");
    }
    
}

module.exports = Player;