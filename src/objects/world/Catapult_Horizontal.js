class Catapult_Horizontal extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'catapult_horizontal');

		//Globals
		this.needsReset = false;
		this.game = game;

		//Sprite
		this.anim = this.animations.add('spwoink', [4, 0, 1, 2, 1]);
		this.animations.frame = 1;
		this.autoCull = true;

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

export default Catapult_Horizontal;