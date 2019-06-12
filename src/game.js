const Player = require("./player");
const Enemy = require("./enemy");
const Powerup = require("./powerup");

class Game {
    constructor() {
        this.enemies = [];
        this.powerups = [];
        this.player = [];
        this.score = 0;
        this.ripple = 0;

        this.addNPCs();
    }

    add(object) {
        if (object instanceof Enemy) {
            this.enemies.push(object);
        } else if (object instanceof Powerup) {
            this.powerups.push(object);
        } else if (object instanceof Player) {
            this.player.push(object);
        } else {
            throw new Error("unknown object type");
        }
    }

    addEnemy() {
        this.add(new Enemy({ game: this }));
    }

    addNPCs() {
        setInterval( () => {
            if (Math.random() > 0.25) {
                this.addEnemy();
            }
        }, 1 * 1000);
        setInterval( () => {
            if (Math.random() > 0.5) {
                this.addPowerup();
            }
        }, 12 * 1700);
    }

    addPlayer() {
        const player = new Player({game: this});
        this.add(player);
        return player;
    }

    addPowerup() {
        this.add( new Powerup({game: this}));
    }

    allNPCs() {
        return [].concat(this.enemies, this.powerups);
    }

    allObjects() {
        return [].concat(this.player, this.enemies, this.powerups);
    }

    checkCollisions() {
        const player = this.player[0];
        const allNPCs = this.allNPCs();
        for (let i = 0; i < allNPCs.length; i++) {
            const npc = allNPCs[i];
            if (player.isCollidedWith(npc)) {
                const collision = player.collideWith(npc);
                if (collision) return;
            }
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.SAFE_ZONE_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, (Game.DIM_Y * 0.03));
        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.03), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
        ctx.fillRect(0, (Game.DIM_Y * 0.97), Game.DIM_X, (Game.DIM_Y * 0.03));
        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.92), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
        ctx.font = "160px Saira Semi Condensed";
        ctx.fillStyle = "rgba(204, 204, 204, 0.2)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${this.score}`, 500, 320);

        this.allObjects().forEach( object => {
            object.draw(ctx);
        });

        this.drawScoreRipple(ctx);
    }

    drawScoreRipple(ctx) {
        ctx.lineWidth = 8;
        if (this.ripple === 10) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.5)";
            ctx.beginPath();
            ctx.arc(500, 300, 200, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 9;
            }, 50);
        }
        if (this.ripple === 9) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.45)";
            ctx.beginPath();
            ctx.arc(500, 300, 180, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 8;
            }, 50);
        }
        if (this.ripple === 8) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.40)";
            ctx.beginPath();
            ctx.arc(500, 300, 160, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 7;
            }, 50);
        }
        if (this.ripple === 7) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.35)";
            ctx.beginPath();
            ctx.arc(500, 300, 140, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 6;
            }, 50);
        }
        if (this.ripple === 6) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.30)";
            ctx.beginPath();
            ctx.arc(500, 300, 120, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 5;
            }, 50);
        }
        if (this.ripple === 5) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.25)";
            ctx.beginPath();
            ctx.arc(500, 300, 100, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 4;
            }, 50);
        }
        if (this.ripple === 4) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.20)";
            ctx.beginPath();
            ctx.arc(500, 300, 80, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 3;
            }, 50);
        }
        if (this.ripple === 3) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.15)";
            ctx.beginPath();
            ctx.arc(500, 300, 60, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 2;
            }, 50);
        }
        if (this.ripple === 2) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.10)";
            ctx.beginPath();
            ctx.arc(500, 300, 40, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 1;
            }, 50);
        }
        if (this.ripple === 1) {
            ctx.strokeStyle = "rgba(204, 204, 204, 0.05)";
            ctx.beginPath();
            ctx.arc(500, 300, 20, 0, 2 * Math.PI, true);
            ctx.stroke();
            setTimeout(() => {
                this.ripple = 0;
            }, 50);
        }
    }

    isOutOfBounds(pos) {
        return (pos[0] < 0) || (pos[0] > Game.DIM_X) || (pos[1] < 0) || (pos[1] > Game.DIM_Y);
    }

    moveObjects(delta) {
        this.allObjects().forEach( object => {
            object.move(delta);
        });
    }

    randomPositionX() {
        const startingPositions = [0, Game.DIM_X];
        return startingPositions[Math.floor(Math.random() * startingPositions.length)];
    }

    randomPositionY() {
        return (Math.random() * ((Game.DIM_Y * 0.90) - (Game.DIM_Y * 0.10)) + (Game.DIM_Y * 0.10));
    }

    remove(object) {
        if (object instanceof Enemy) {
            this.enemies.splice(this.enemies.indexOf(object), 1);
        } else if (object instanceof Powerup) {
            this.powerups.splice(this.powerups.indexOf(object), 1);
        } else if (object instanceof Player) {
            this.player.splice(this.player.indexOf(object), 1);
        } else {
            throw new Error("unknown object type");
        }
    }

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
        this.player[0].attemptCatch();
    }

}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = "#000000";
Game.SAFE_ZONE_COLOR = "#1c661f";
Game.NUM_ENEMIES = 5;
Game.NUM_POWERUPS = 1;

module.exports = Game;