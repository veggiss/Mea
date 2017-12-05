class Decor extends Phaser.Sprite {
	constructor(game, x, y, key) {
		super(game, x, y, key);

		this.game = game;

		return this;
	}
}

export default Decor;