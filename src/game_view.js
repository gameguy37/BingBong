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
        const timeDelta = time - this.lastTime;
        this.game.step(timeDelta);
        this.game.draw(this.ctx);
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
    }

}

module.exports = GameView;