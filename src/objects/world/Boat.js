class Boat extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'boat');

		this.game = game;

		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
		this.body.setSize(93, 25, 0, 73);
		this.bringToTop();

		return this;
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}
	}

	bringMeToTop() {
		this.bringToTop();
	}
}

export default Boat;