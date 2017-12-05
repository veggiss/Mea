class Arrowdown extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'arrowdown', 0);
		this.kill();
		game.add.existing(this);
	}
}

export default Arrowdown;