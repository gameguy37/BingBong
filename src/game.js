const Player = require("./player");
const Enemy = require("./enemy");
const Powerup = require("./powerup");

class Game {
    constructor() {
        this.enemies = [];
        this.powerups = [];
        this.player = [];

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

    addNPCs() {

        setInterval( () => {
            this.addEnemy();
        }, 3 * 1000);

        setInterval( () => {
            this.addPowerup();
        }, 10 * 1000)

    }

    addPlayer() {
        const player = new Player({game: this});
        this.add(player);
        return player;
    }

    addEnemy() {
        this.add( new Enemy({game: this}));
    }

    addPowerup() {
        this.add( new Powerup({game: this}));
    }

    allObjects() {
        return [].concat(this.player, this.enemies, this.powerups);
    }

    allNPCs() {
        return [].concat(this.enemies, this.powerups);
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
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.SAFE_ZONE_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, (Game.DIM_Y * 0.03));
        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.03), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
        ctx.fillRect(0, (Game.DIM_Y * 0.97), Game.DIM_X, (Game.DIM_Y * 0.03));
        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.92), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));


        this.allObjects().forEach( object => {
            object.draw(ctx);
        });
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