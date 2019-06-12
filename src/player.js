const MovingObject = require("./moving_object");
const Enemy = require("./enemy");
const PowerupPlusScore = require("./powerup_plus_score");
const PowerupInvincibility = require("./powerup_invincibility");

class Player extends MovingObject {
    constructor(options) {
        options.radius = options.radius || 12; // 30 means explode
        options.vel = options.vel || [0, 0];
        options.color = "#FFFFFF";
        options.pos = options.pos || [500, 552];
        super(options);
        this.safe_bottom = true;
        this.safe_top = false;
        this.invincible = false;
    }

    vulnerable() {  
        if (this.safe_bottom === false && this.safe_top === false) {
            return true;
        }
    }

    launch() {
        if (this.safe_bottom) {
            this.vel = [0, -10];
            this.safe_bottom = false;
        } else if (this.safe_top) {
            this.vel = [0, 10];
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
        if (otherObject instanceof Enemy && this.vulnerable() === true && this.invincible === false) {
            this.gameOver();
            return true;
        }

        if (otherObject instanceof Enemy && this.vulnerable() === true && this.invincible === true) { // and player is invincible
            otherObject.remove();
            otherObject.explode();
            this.game.score += 1;
            return true;
        }

        if (otherObject instanceof PowerupPlusScore && this.vulnerable() === true) {
            this.game.score += 2;
            otherObject.remove();
            otherObject.explode();
            return true;
        }

        if (otherObject instanceof PowerupInvincibility && this.vulnerable() === true) {
            this.invincible = true;
            this.color = "#237dfc";
            setTimeout(() => {
                this.invincible = false;
                this.color = "rgba(255, 255, 255, 1)";
            }, 6 * 1000);
            otherObject.remove();
            otherObject.explode();
            return true;
        }

        return false;
    }

    gameOver() {
        alert("GAME OVER");
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 40;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    
}

module.exports = Player;