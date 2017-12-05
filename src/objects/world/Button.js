class Button extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'button');

		//Globals
		this.activated = false;
		this.needsReset = false;
		
		//Sprite
		this.autoCull = true;

		//Sound
		this.sound_activate = this.game.add.audio('sound_activate');

		this.sound_activate.volume = 0.3;

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
		this.body.maxVelocity = 1;
		this.body.setSize(8, 1, 0, 1);
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}
		
		if (this.body.touching.up || this.body.blocked.up) {
			if(!this.activated) {
				this.animations.frame = 1;
				this.activated = true;
				this.sound_activate.play();
			}
		} else {
			if(this.activated) {
				this.animations.frame = 0;
				this.activated = false;
			}
		}
	}


}

export default Button;