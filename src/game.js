const Player = require("./player");
const Enemy = require("./enemy");
const EnemyCircle = require("./enemy_circle");
const EnemyLine = require("./enemy_line");
const EnemyRectangleHorizontal = require("./enemy_rectangle_horizontal");
const EnemyRectangleVertical = require("./enemy_rectangle_vertical");
const EnemySquare = require("./enemy_square");
const Notification = require("./notification");
const Powerup = require("./powerup");
const PowerupBulletTime = require("./powerup_bullet_time");
const PowerupInvincibility = require("./powerup_invincibility");
const PowerupPlusScore = require("./powerup_plus_score");
const PowerupWipeout = require("./powerup_wipeout");
const Particle = require("./particle");

class Game {
    constructor(npcSpeedMultiplierBool, angledEnemySpawnsBool, playerSpeedMultiplierBool, enemySpawnFrequencyMultiplierBool, enemySpeedRandomBool) {
        this.playing = true;
        this.enemies = [];
        this.powerups = [];
        this.player = [];
        this.particles = [];
        this.notifications = [];
        this.score = 0;
        this.ripple = 0;
        this.highScoreSet = false;

        this.npcSpeedMultiplier = 1;
        this.angledEnemySpawns = false;
        this.playerSpeedMultiplier = 1;
        this.enemySpawnFrequencyMultiplier = 1;
        this.enemySpeedRandom = false;

        this.totalScoreMultiplier = 1;

        if (npcSpeedMultiplierBool === true) {
            this.npcSpeedMultiplier = 1.5;
            this.totalScoreMultiplier *= 1.5;
        }
        
        if (angledEnemySpawnsBool === true) {
            this.angledEnemySpawns = true;
            this.totalScoreMultiplier *= 2;
        }
        
        if (playerSpeedMultiplierBool === true) {
            this.playerSpeedMultiplier = 0.75;
            this.totalScoreMultiplier *= 1.2;
        }

        if (enemySpawnFrequencyMultiplierBool === true) {
            this.enemySpawnFrequencyMultiplier = 1.5;
            this.totalScoreMultiplier *= 1.5;
        }

        if (enemySpeedRandomBool === true) {
            this.enemySpeedRandom = true;
            this.totalScoreMultiplier *= 1.5;
        }

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

    addEnemyCircle() {
        this.add(new EnemyCircle({ game: this }));
    }

    addEnemyLine() {
        this.add(new EnemyLine({ game: this }));
    }

    addEnemyRectangleHorizontal() {
        this.add(new EnemyRectangleHorizontal({ game: this }));
    }

    addEnemyRectangleVertical() {
        this.add(new EnemyRectangleVertical({ game: this }));
    }

    addEnemySquare() {
        this.add(new EnemySquare({ game: this }));
    }

    addNPCs() {
        setInterval( () => {
            if (Math.random() > 0.10) {
                this.addEnemyCircle();
            }
        }, ((2 * 520) / this.enemySpawnFrequencyMultiplier));

        setInterval(() => {
            if (Math.random() > 0.35) {
                this.addEnemyLine();
            }
        }, ((4 * 535) / this.enemySpawnFrequencyMultiplier));

        setInterval(() => {
            if (Math.random() > 0.15) {
                this.addEnemyRectangleHorizontal();
            }
        }, ((5 * 515) / this.enemySpawnFrequencyMultiplier));

        setInterval(() => {
            if (Math.random() > 0.20) {
                this.addEnemyRectangleVertical();
            }
        }, ((6 * 465) / this.enemySpawnFrequencyMultiplier));

        setInterval(() => {
            if (Math.random() > 0.20) {
                this.addEnemySquare();
            }
        }, ((4 * 310) / this.enemySpawnFrequencyMultiplier));

        setInterval(() => {
            if (Math.random() > 0.80) {
                this.addPowerupBulletTime();
            }
        }, 23 * 510);

        setInterval( () => {
            if (Math.random() > 0.5) {
                this.addPowerupPlusScore();
            }
        }, 28 * 535);

        setInterval(() => {
            if (Math.random() > 0.70) {
                this.addPowerupInvincibility();
            }
        }, 25 * 585);

        setInterval(() => {
            if (Math.random() > 0.35) {
                this.addPowerupWipeout();
            }
        }, 30 * 505);

    }

    addPlayer() {
        const player = new Player({game: this});
        this.add(player);
        this.player[0].growPlayer();
        return player;
    }

    addPowerupBulletTime() {
        this.add(new PowerupBulletTime({ game: this }));
    }

    addPowerupInvincibility() {
        this.add(new PowerupInvincibility({ game: this }));
    }

    addPowerupPlusScore() {
        this.add(new PowerupPlusScore({ game: this }));
    }

    addPowerupWipeout() {
        this.add(new PowerupWipeout({ game: this }));
    }

    allNPCs() {
        return [].concat(this.enemies, this.powerups, this.particles);
    }

    allObjects() {
        return [].concat(this.player, this.enemies, this.powerups, this.particles, this.notifications);
    }

    checkCollisions() {
        if (this.player.length !== 0) {
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
    }

    checkRadius() {
        if (this.player[0].radius === 27) {
            this.player[0].explode();
            this.player[0].remove();
            setTimeout(() => {
                this.playing = false;
                this.updateHighScores(this.score);
            }, 1500);
        }
    }

    draw(ctx) {
        if (this.playing === true) {
            ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
            ctx.fillStyle = Game.BG_COLOR;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.beginPath();
            ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
            ctx.fillStyle = Game.SAFE_ZONE_COLOR;
            ctx.shadowColor = Game.SAFE_ZONE_COLOR;
            ctx.shadowBlur = 20;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.fillRect((Game.DIM_X * 0.49), 0, (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
            ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.95), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));
            ctx.font = "160px Saira Semi Condensed";
            ctx.fillStyle = "rgba(204, 204, 204, 0.2)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${Math.ceil(this.score)}`, 500, 320);
            ctx.font = "30px Saira Semi Condensed";
            ctx.fillStyle = "rgba(204, 204, 204, 0.2)";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(`Score Multiplier: x ${parseFloat(this.totalScoreMultiplier).toFixed(2)}`, 10, 580);
            ctx.closePath();

            this.allObjects().forEach( object => {
                object.draw(ctx);
            });

            this.drawScoreRipple(ctx);
        } else {
            ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
            ctx.fillStyle = Game.BG_COLOR;
            ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
            ctx.font = "160px Saira Semi Condensed";
            ctx.fillStyle = "rgba(204, 204, 204, 0.2)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("GAME OVER", 500, 320);
        }
    }

    drawScoreRipple(ctx) {
        ctx.lineWidth = 8;
        if (this.ripple === 10) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.5)";
            ctx.arc(500, 300, 200, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 9;
            }, 50);
        }
        if (this.ripple === 9) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.45)";
            ctx.arc(500, 300, 180, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 8;
            }, 50);
        }
        if (this.ripple === 8) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.40)";
            ctx.arc(500, 300, 160, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 7;
            }, 50);
        }
        if (this.ripple === 7) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.35)";
            ctx.arc(500, 300, 140, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 6;
            }, 50);
        }
        if (this.ripple === 6) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.30)";
            ctx.arc(500, 300, 120, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 5;
            }, 50);
        }
        if (this.ripple === 5) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.25)";
            ctx.arc(500, 300, 100, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 4;
            }, 50);
        }
        if (this.ripple === 4) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.20)";
            ctx.arc(500, 300, 80, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 3;
            }, 50);
        }
        if (this.ripple === 3) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.15)";
            ctx.arc(500, 300, 60, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 2;
            }, 50);
        }
        if (this.ripple === 2) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.10)";
            ctx.arc(500, 300, 40, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 1;
            }, 50);
        }
        if (this.ripple === 1) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(204, 204, 204, 0.05)";
            ctx.arc(500, 300, 20, 0, 2 * Math.PI, true);
            ctx.stroke();
            ctx.closePath();
            setTimeout(() => {
                this.ripple = 0;
            }, 50);
        }
    }

    explode(object) {
        for (let i = 0; i < 25; i++) {
            let posNeg = [1, -1];
            let directionX = posNeg[Math.floor(Math.random() * posNeg.length)];
            let directionY = posNeg[Math.floor(Math.random() * posNeg.length)];
            let vx = directionX * ((Math.random() * 60) - 30);
            let vy = directionY * ((Math.random() * 60) - 30);
            this.particles.push(new Particle({
                pos: object.pos,
                vel: [vx, vy],
                color: object.color,
                game: this,
            }));
        }
        setTimeout(() => {
            this.particles = [];
        }, 750);
        if (object instanceof PowerupPlusScore) {
            this.notifications.push(new Notification({
                message: `Score +${parseFloat(20 * this.totalScoreMultiplier).toFixed(0)}`,
                pos: object.pos,
                game: this,
            }));
            setTimeout( () => {
                this.notifications = [];
            }, 1000);
        }
        if (object instanceof PowerupInvincibility) {
            this.notifications.push(new Notification({
                message: "INVINCIBLE",
                pos: object.pos,
                game: this,
            }));
            setTimeout(() => {
                this.notifications = [];
            }, 750);
        }
        if (object instanceof Enemy && this.player.length === 1) {
            this.notifications.push(new Notification({
                message: `Score +${parseFloat(10 * this.totalScoreMultiplier).toFixed(0)}`,
                pos: object.pos,
                game: this,
            }));
            setTimeout(() => {
                this.notifications = [];
            }, 750);
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
        return (Math.random() * ((Game.DIM_Y * 0.80) - (Game.DIM_Y * 0.20)) + (Game.DIM_Y * 0.20));
    }

    remove(object) {
        if (object instanceof Enemy) {
            this.enemies.splice(this.enemies.indexOf(object), 1);
        } else if (object instanceof Powerup) {
            this.powerups.splice(this.powerups.indexOf(object), 1);
        } else if (object instanceof Player) {
            this.player.splice(this.player.indexOf(object), 1);
        } else if (object instanceof Particle) {
            this.particles.splice(this.particles.indexOf(object), 1);
        } else if (object instanceof Notification) {
            this.notifications.splice(this.notifications.indexOf(object), 1);
        } else {
            throw new Error("unknown object type");
        }
    }

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
        if (this.player.length !== 0) {
            this.player[0].attemptCatch();
            this.checkRadius();
        }
    }

    updateHighScores(score) {
        let hs1;
        let hs2;
        let hs3;
        let hs4;
        let hs5;

        if (localStorage.getItem('hs1')) {
            hs1 = localStorage.getItem('hs1');
        } else {
            hs1 = 0;
        }
        if (localStorage.getItem('hs2')) {
            hs2 = localStorage.getItem('hs2');
        } else {
            hs2 = 0;
        }
        if (localStorage.getItem('hs3')) {
            hs3 = localStorage.getItem('hs3');
        } else {
            hs3 = 0;
        }
        if (localStorage.getItem('hs4')) {
            hs4 = localStorage.getItem('hs4');
        } else {
            hs4 = 0;
        }
        if (localStorage.getItem('hs5')) {
            hs5 = localStorage.getItem('hs5');
        } else {
            hs5 = 0;
        }

        let scores = [];
        scores.push(hs1);
        scores.push(hs2);
        scores.push(hs3);
        scores.push(hs4);
        scores.push(hs5);
        scores.push(score.toFixed(0).toString());

        let orderedScores = scores.sort(function(a,b){return a - b}).reverse();
        scores = [];
    
        hs1 = orderedScores[0];
        hs2 = orderedScores[1];
        hs3 = orderedScores[2];
        hs4 = orderedScores[3];
        hs5 = orderedScores[4];
        
        localStorage.setItem('hs5', hs5);
        localStorage.setItem('hs4', hs4);
        localStorage.setItem('hs3', hs3);
        localStorage.setItem('hs2', hs2);
        localStorage.setItem('hs1', hs1);

        let highScores = document.getElementById('high-scores');
        highScores.innerHTML = `<li>${hs1}</li><li>${hs2}</li><li>${hs3}</li><li>${hs4}</li><li>${hs5}</li>`;
    }

}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = "#000000";
Game.SAFE_ZONE_COLOR = "#4cedff";

module.exports = Game;