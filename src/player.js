const MovingObject = require("./moving_object");
const Enemy = require("./enemy");
const PowerupBulletTime = require("./powerup_bullet_time");
const PowerupInvincibility = require("./powerup_invincibility");
const PowerupPlusScore = require("./powerup_plus_score");
const PowerupWipeout = require("./powerup_wipeout");

class Player extends MovingObject {
    constructor(options) {
        options.radius = options.radius || 12; // 27 means explode
        options.vel = [0, 0];
        options.color = "#FFFFFF";
        options.pos = options.pos || [500, 570];
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
            this.radius = 12;
            this.vel = [0, (-10 * this.game.playerSpeedMultiplier)];
            this.safe_bottom = false;
        } else if (this.safe_top) {
            this.radius = 12;
            this.vel = [0, (10 * this.game.playerSpeedMultiplier)];
            this.safe_top = false;
        } else {
            return;
        }
    }

    attemptCatch() {
        if (this.vulnerable() && this.pos[1] >= 570) {
            this.vel = [0, 0];
            this.pos = [500, 570];
            this.safe_bottom = true;
            this.game.score += 10 * this.game.totalScoreMultiplier;
        } else if (this.vulnerable() && this.pos[1] <= 30) {
            this.vel = [0, 0];
            this.pos = [500, 30];
            this.safe_top = true;
            this.game.score += 10 * this.game.totalScoreMultiplier;
        } else {
            return;
        }
    }

    growPlayer() {
        if (this.safe_bottom === true || this.safe_top === true) {
            setInterval( () => {
                this.radius += 1
            }, 533);
        }
    }

    collideWith(otherObject) {
        if (otherObject instanceof Enemy && this.vulnerable() === true && this.invincible === false) {
            this.remove();
            this.explode();
            this.game.enemies.forEach(enemy => {
                enemy.explode();
            })
            this.game.enemies = [];
            setTimeout( () => {
                this.game.playing = false;
                this.game.updateHighScores(this.game.score);
            }, 1500);
            return true;
        }

        if (otherObject instanceof Enemy && this.vulnerable() === true && this.invincible === true) {
            otherObject.remove();
            otherObject.explode();
            this.game.score += 10 * this.game.totalScoreMultiplier;
            return true;
        }

        if (otherObject instanceof PowerupBulletTime && this.vulnerable() === true) {
            this.game.npcSpeedMultiplier = 0.4;
            let revert = (1 / this.game.npcSpeedMultiplier);
            this.game.enemies.forEach( enemy => {
                enemy.vel[0] = enemy.vel[0] * this.game.npcSpeedMultiplier;
                enemy.vel[1] = enemy.vel[1] * this.game.npcSpeedMultiplier;
            })
            this.game.powerups.forEach( powerup => {
                powerup.vel[0] = powerup.vel[0] * this.game.npcSpeedMultiplier;
                powerup.vel[1] = powerup.vel[1] * this.game.npcSpeedMultiplier;
            })
            setTimeout(() => {
                this.game.npcSpeedMultiplier = 1;
                this.game.enemies.forEach(enemy => {
                    enemy.vel[0] = enemy.vel[0] * revert;
                    enemy.vel[1] = enemy.vel[1] * revert;
                })
                this.game.powerups.forEach(powerup => {
                    powerup.vel[0] = powerup.vel[0] * revert;
                    powerup.vel[1] = powerup.vel[1] * revert;
                })
            }, 6 * 1000);

            otherObject.remove();
            otherObject.explode();
            return true;
        }

        
        if (otherObject instanceof PowerupInvincibility && this.vulnerable() === true) {
            this.invincible = true;
            this.color = "#237dfc";
            this.vel[1] *= 1.5;
            this.game.playerSpeedMultiplier *= 1.5;
            setTimeout(() => {
                this.invincible = false;
                this.color = "rgba(255, 255, 255, 1)";
                this.vel[1] /= 1.5;
                this.game.playerSpeedMultiplier /= 1.5;
            }, 6 * 1000);
            otherObject.remove();
            otherObject.explode();
            return true;
        }

        if (otherObject instanceof PowerupPlusScore && this.vulnerable() === true) {
            this.game.score += 10 * this.game.totalScoreMultiplier;
            otherObject.remove();
            otherObject.explode();
            return true;
        }

        if (otherObject instanceof PowerupWipeout && this.vulnerable() === true) {
            otherObject.remove();
            otherObject.explode();
            this.game.score += 10 * this.game.totalScoreMultiplier * this.game.enemies.length;
            this.game.enemies.forEach(enemy => {
                enemy.explode();
            })
            this.game.enemies = [];
            return true;
        }
        
        return false;
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