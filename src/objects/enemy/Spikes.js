class Spikes extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'spikes');

		//Globals
		this.needsReset = false;
		this.game = game;

		//Sprite
		this.autoCull = true;
		this.animations.frame = Math.floor(Math.random() * 3);

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}
	}
}

export default Spikes;