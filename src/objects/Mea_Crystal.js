class Mea_Crystal extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'mea_crystal');

		//Globals
		this.needsReset = true;
		this.game = game;
		this.originX = this.x;
		this.originY = this.y;
		this.moveUp = true;
		this.timer = 0;

		//Sprite
		this.anim = this.animations.add('sprinkle');
		this.anim.play(30, true);
		this.autoCull = true;
		this.anchor.setTo(0.5, 0.5);

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
	}

	update() {
	}

	resetPos() {
		if (!this.alive) {
			this.revive();
		}

		this.x = this.originX;
		this.y = this.originY;
	}
}

export default Mea_Crystal;