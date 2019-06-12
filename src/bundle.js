/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Enemy extends MovingObject {\n    constructor(options) {\n        options.pos = options.pos;\n        options.vel = options.vel;\n        options.radius = options.radius;\n        options.color = options.color;\n        super(options);\n    }\n}\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack:///./src/enemy.js?");

/***/ }),

/***/ "./src/enemy_circle.js":
/*!*****************************!*\
  !*** ./src/enemy_circle.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass EnemyCircle extends Enemy {\n    constructor(options) {\n        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];\n        options.vel = Util.entranceVelocity(options.pos[0]);\n        options.radius = 20;\n        options.color = \"#f45942\";\n        super(options);\n    }\n\n    draw(ctx) {\n        ctx.strokeStyle = this.color;\n        ctx.lineWidth = 5;\n        ctx.shadowColor = this.color;\n        ctx.shadowBlur = 30;\n        ctx.shadowOffsetX = 0;\n        ctx.shadowOffsetY = 0;\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n        ctx.stroke();\n        ctx.fill();\n        ctx.closePath();\n    }\n}\n\nmodule.exports = EnemyCircle;\n\n//# sourceURL=webpack:///./src/enemy_circle.js?");

/***/ }),

/***/ "./src/enemy_square.js":
/*!*****************************!*\
  !*** ./src/enemy_square.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass EnemySquare extends Enemy {\n    constructor(options) {\n        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];\n        options.vel = Util.entranceVelocity(options.pos[0]);\n        options.radius = 15; /////////\n        options.color = \"#f442e8\";\n        super(options);\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = \"#000000\";\n        ctx.strokeStyle = this.color;\n        ctx.lineWidth = 5;\n        ctx.shadowColor = this.color;\n        ctx.shadowBlur = 30;\n        ctx.shadowOffsetX = 0;\n        ctx.shadowOffsetY = 0;\n        ctx.beginPath();\n        ctx.strokeRect(this.pos[0] - 15, this.pos[1] - 15, 30, 30);\n        ctx.fillRect(this.pos[0] -15, this.pos[1] -15, 30, 30);\n        ctx.moveTo(-10, -10);\n        ctx.stroke();\n        ctx.fill();\n        ctx.closePath();\n    }\n}\n\nmodule.exports = EnemySquare;\n\n//# sourceURL=webpack:///./src/enemy_square.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Powerup = __webpack_require__(/*! ./powerup */ \"./src/powerup.js\");\nconst Particle = __webpack_require__(/*! ./particle */ \"./src/particle.js\");\nconst EnemyCircle = __webpack_require__(/*! ./enemy_circle */ \"./src/enemy_circle.js\");\nconst EnemySquare = __webpack_require__(/*! ./enemy_square */ \"./src/enemy_square.js\");\n\nclass Game {\n    constructor() {\n        this.enemies = [];\n        this.powerups = [];\n        this.player = [];\n        this.particles = [];\n        this.score = 0;\n        this.ripple = 0;\n\n        this.addNPCs();\n    }\n\n    add(object) {\n        if (object instanceof Enemy) {\n            this.enemies.push(object);\n        } else if (object instanceof Powerup) {\n            this.powerups.push(object);\n        } else if (object instanceof Player) {\n            this.player.push(object);\n        } else {\n            throw new Error(\"unknown object type\");\n        }\n    }\n\n    addEnemyCircle() {\n        this.add(new EnemyCircle({ game: this }));\n    }\n\n    addEnemySquare() {\n        this.add(new EnemySquare({ game: this }));\n    }\n\n    addNPCs() {\n        // setInterval( () => {\n        //     if (Math.random() > 0.25) {\n        //         this.addEnemyCircle();\n        //     }\n        // }, 1 * 1000);\n\n        setInterval(() => {\n            if (Math.random() > 0.25) {\n                this.addEnemySquare();\n            }\n        }, 1 * 1000);\n\n        // setInterval( () => {\n        //     if (Math.random() > 0) {\n        //         this.addPowerup();\n        //     }\n        // }, 1 * 1000);\n    }\n\n    addPlayer() {\n        const player = new Player({game: this});\n        this.add(player);\n        return player;\n    }\n\n    addPowerup() {\n        this.add( new Powerup({game: this}));\n    }\n\n    allNPCs() {\n        return [].concat(this.enemies, this.powerups, this.particles);\n    }\n\n    allObjects() {\n        return [].concat(this.player, this.enemies, this.powerups, this.particles);\n    }\n\n    checkCollisions() {\n        const player = this.player[0];\n        const allNPCs = this.allNPCs();\n        for (let i = 0; i < allNPCs.length; i++) {\n            const npc = allNPCs[i];\n            if (player.isCollidedWith(npc)) {\n                const collision = player.collideWith(npc);\n                if (collision) return;\n            }\n        }\n    }\n\n    draw(ctx) {\n        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        ctx.fillStyle = Game.BG_COLOR;\n        ctx.shadowColor = this.color;\n        ctx.shadowBlur = 0;\n        ctx.shadowOffsetX = 0;\n        ctx.shadowOffsetY = 0;\n        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n        ctx.fillStyle = Game.SAFE_ZONE_COLOR;\n        ctx.fillRect(0, 0, Game.DIM_X, (Game.DIM_Y * 0.03));\n        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.03), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));\n        ctx.fillRect(0, (Game.DIM_Y * 0.97), Game.DIM_X, (Game.DIM_Y * 0.03));\n        ctx.fillRect((Game.DIM_X * 0.49), (Game.DIM_Y * 0.92), (Game.DIM_X * 0.02), (Game.DIM_Y * 0.05));\n        ctx.font = \"160px Saira Semi Condensed\";\n        ctx.fillStyle = \"rgba(204, 204, 204, 0.2)\";\n        ctx.textAlign = \"center\";\n        ctx.textBaseline = \"middle\";\n        ctx.fillText(`${this.score}`, 500, 320);\n\n        this.allObjects().forEach( object => {\n            object.draw(ctx);\n        });\n\n        this.drawScoreRipple(ctx);\n    }\n\n    drawScoreRipple(ctx) {\n        ctx.lineWidth = 8;\n        if (this.ripple === 10) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.5)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 200, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 9;\n            }, 50);\n        }\n        if (this.ripple === 9) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.45)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 180, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 8;\n            }, 50);\n        }\n        if (this.ripple === 8) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.40)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 160, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 7;\n            }, 50);\n        }\n        if (this.ripple === 7) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.35)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 140, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 6;\n            }, 50);\n        }\n        if (this.ripple === 6) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.30)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 120, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 5;\n            }, 50);\n        }\n        if (this.ripple === 5) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.25)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 100, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 4;\n            }, 50);\n        }\n        if (this.ripple === 4) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.20)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 80, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 3;\n            }, 50);\n        }\n        if (this.ripple === 3) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.15)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 60, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 2;\n            }, 50);\n        }\n        if (this.ripple === 2) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.10)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 40, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 1;\n            }, 50);\n        }\n        if (this.ripple === 1) {\n            ctx.strokeStyle = \"rgba(204, 204, 204, 0.05)\";\n            ctx.beginPath();\n            ctx.arc(500, 300, 20, 0, 2 * Math.PI, true);\n            ctx.stroke();\n            setTimeout(() => {\n                this.ripple = 0;\n            }, 50);\n        }\n    }\n\n    explode(object) {\n        for (let i = 0; i < 100; i++) {\n            let posNeg = [1, -1];\n            let directionX = posNeg[Math.floor(Math.random() * posNeg.length)];\n            let directionY = posNeg[Math.floor(Math.random() * posNeg.length)];\n            let vx = directionX * ((Math.random() * 60) - 30);\n            let vy = directionY * ((Math.random() * 60) - 30);\n            this.particles.push(new Particle({\n                pos: object.pos,\n                vel: [vx, vy],\n                color: object.color,\n                game: this,\n            }));\n        }\n        setTimeout(() => {\n            this.particles = [];\n        }, 750);\n    }\n\n    isOutOfBounds(pos) {\n        return (pos[0] < 0) || (pos[0] > Game.DIM_X) || (pos[1] < 0) || (pos[1] > Game.DIM_Y);\n    }\n\n    moveObjects(delta) {\n        this.allObjects().forEach( object => {\n            object.move(delta);\n        });\n    }\n\n    randomPositionX() {\n        const startingPositions = [0, Game.DIM_X];\n        return startingPositions[Math.floor(Math.random() * startingPositions.length)];\n    }\n\n    randomPositionY() {\n        return (Math.random() * ((Game.DIM_Y * 0.90) - (Game.DIM_Y * 0.10)) + (Game.DIM_Y * 0.10));\n    }\n\n    remove(object) {\n        if (object instanceof Enemy) {\n            this.enemies.splice(this.enemies.indexOf(object), 1);\n        } else if (object instanceof Powerup) {\n            this.powerups.splice(this.powerups.indexOf(object), 1);\n        } else if (object instanceof Player) {\n            this.player.splice(this.player.indexOf(object), 1);\n        } else if (object instanceof Particle) {\n            this.particles.splice(this.particles.indexOf(object), 1);\n        } else {\n            throw new Error(\"unknown object type\");\n        }\n    }\n\n    step(delta) {\n        this.moveObjects(delta);\n        this.checkCollisions();\n        this.player[0].attemptCatch();\n    }\n\n}\n\nGame.DIM_X = 1000;\nGame.DIM_Y = 600;\nGame.BG_COLOR = \"#000000\";\nGame.SAFE_ZONE_COLOR = \"#1c661f\";\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.player = this.game.addPlayer();\n    }\n\n    bindKeyHandler() {\n        const player = this.player;\n        key(\"space\", () => { player.launch(); });\n    }\n\n    start() {\n        this.bindKeyHandler();\n        this.lastTime = 0;\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n    animate(time) {\n        const score = this.game.score;\n        const timeDelta = time - this.lastTime;\n        this.game.step(timeDelta);\n        const newScore = this.game.score;\n        if (newScore - score > 0) {\n            this.game.ripple = 10;\n        }\n        this.lastTime = time;\n        this.game.draw(this.ctx);\n        requestAnimationFrame(this.animate.bind(this));\n    }\n\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n    const canvasEl = document.getElementById('canvas');\n    canvasEl.width = Game.DIM_X;\n    canvasEl.height = Game.DIM_Y;\n\n    const ctx = canvasEl.getContext('2d');\n    const game = new Game();\n    new GameView(game, ctx).start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass MovingObject {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = options.vel;\n        this.radius = options.radius;\n        this.color = options.color;\n        this.game = options.game;\n    }\n\n    isCollidedWith(otherObject) {\n        const centerDist = Util.dist(this.pos, otherObject.pos);\n        return centerDist < (this.radius + otherObject.radius);\n    }\n\n    move() {\n        this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];\n        \n        if (this.game.isOutOfBounds(this.pos)) {\n            this.remove();\n        }\n    }\n\n    remove() {\n        this.game.remove(this);\n    }\n\n    explode() {\n        this.game.explode(this);\n    }\n\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/particle.js":
/*!*************************!*\
  !*** ./src/particle.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nclass Particle extends MovingObject {\n    constructor(options) {\n        options.pos = options.pos;\n        options.vel = options.vel;\n        options.radius = 2;\n        options.color = options.color;\n        super(options);\n        debugger\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n        ctx.fill();\n    }\n    \n}\n\nmodule.exports = Particle;\n\n//# sourceURL=webpack:///./src/particle.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Enemy = __webpack_require__(/*! ./enemy */ \"./src/enemy.js\");\nconst Powerup = __webpack_require__(/*! ./powerup */ \"./src/powerup.js\");\n\nclass Player extends MovingObject {\n    constructor(options) {\n        options.radius = options.radius || 12; // 30 means explode\n        options.vel = options.vel || [0, 0];\n        options.color = options.color || \"#FFFFFF\";\n        options.pos = options.pos || [500, 552];\n        super(options);\n        this.safe_bottom = true;\n        this.safe_top = false;\n    }\n\n    vulnerable() {  \n        if (this.safe_bottom === false && this.safe_top === false) {\n            return true;\n        }\n    }\n\n    launch() {\n        if (this.safe_bottom) {\n            this.vel = [0, -10];\n            this.safe_bottom = false;\n        } else if (this.safe_top) {\n            this.vel = [0, 10];\n            this.safe_top = false;\n        } else {\n            return;\n        }\n    }\n\n    attemptCatch() {\n        if (this.vulnerable() && this.pos[1] >= 552) {\n            this.vel = [0, 0];\n            this.pos = [500, 552];\n            this.safe_bottom = true;\n            this.game.score += 1;\n        } else if (this.vulnerable() && this.pos[1] <= 48) {\n            this.vel = [0, 0];\n            this.pos = [500, 48];\n            this.safe_top = true;\n            this.game.score += 1;\n        } else {\n            return;\n        }\n    }\n\n    collideWith(otherObject) {\n        if (otherObject instanceof Enemy && this.vulnerable() === true) {\n            this.gameOver();\n            return true;\n        }\n        // else if (otherObject instanceof Player) { // and player is invincible\n        //     this.remove();\n        //     return true;\n        // }\n        if (otherObject instanceof Powerup && this.vulnerable() === true) {\n            // this.gainPowers();\n            otherObject.remove();\n            otherObject.explode();\n            return true;\n        }\n\n        return false;\n    }\n\n    gainPowers() {\n        alert(\"YOU'RE POWERED UP!\");\n    }\n\n    gameOver() {\n        alert(\"GAME OVER\");\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = \"#000000\";\n        ctx.strokeStyle = this.color;\n        ctx.lineWidth = 5;\n        ctx.shadowColor = this.color;\n        ctx.shadowBlur = 40;\n        ctx.shadowOffsetX = 0;\n        ctx.shadowOffsetY = 0;\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n        ctx.fill();\n        ctx.stroke();\n        ctx.closePath();\n    }\n    \n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/powerup.js":
/*!************************!*\
  !*** ./src/powerup.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Powerup extends MovingObject {\n    constructor(options) {\n        options.pos = [options.game.randomPositionX(), options.game.randomPositionY()];\n        options.vel = Util.entranceVelocity(options.pos[0]);\n        options.radius = 12;\n        options.color = \"#48f442\";\n        super(options);\n    }\n\n    draw(ctx) {\n        ctx.strokeStyle = this.color;\n        ctx.lineWidth = 5;\n        ctx.shadowColor = this.color;\n        ctx.shadowBlur = 30;\n        ctx.shadowOffsetX = 0;\n        ctx.shadowOffsetY = 0;\n        ctx.beginPath();\n        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);\n        ctx.stroke();\n        ctx.fill();\n        ctx.closePath();\n    }\n    \n}\n\nmodule.exports = Powerup;\n\n//# sourceURL=webpack:///./src/powerup.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n\n    dist(pos1, pos2) {\n        return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));\n    },\n\n    entranceVelocity(x) {\n        if (x === 0) {\n            return [5, 0];\n        } else {\n            return [-5, 0];\n        }\n    },\n\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });