class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        this.player = this.game.addPlayer();
    }

    bindKeyHandler() {
        const player = this.player;
        key("space", () => { player.launch(); });
    }

    start() {
        this.bindKeyHandler();
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const score = this.game.score;
        const timeDelta = time - this.lastTime;
        this.game.step(timeDelta);
        const newScore = this.game.score;
        if (newScore - score > 0 && (this.player.safe_bottom === true || this.player.safe_top === true) ) {
            this.game.ripple = 10;
        }
        this.lastTime = time;
        this.game.draw(this.ctx);
        requestAnimationFrame(this.animate.bind(this));
    }

}

module.exports = GameView;