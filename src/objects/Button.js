class Button extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'button');

		//Globals
		this.activated = false;
		
		//Sprite
		this.autoCull = true;

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
		this.body.maxVelocity = 1;
		this.body.setSize(8, 1, 0, 1);
	}

	update() {
		if (this.body.touching.up || this.body.blocked.up) {
			this.animations.frame = 1;
			this.activated = true;
		} else {
			this.animations.frame = 0;
			this.activated = false;
		}
	}


}

export default Button;