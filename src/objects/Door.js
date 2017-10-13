import Player from 'objects/Player';

class Door extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'door');
		//Globals
		this.game = game;
		this.activated = false;

		//Sprite
		this.autoCull = true;
		this.anim = this.animations.add('complete');
		this.anim.onComplete.add(this.activateDoor, this);

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;

		Door.getDoor = this;
		Door.activated = this.activated;
	}

	activateDoor() {
		this.activated = true;
	}

	startAnim() {
		this.anim.play(12);
		this.game.camera.shake(0.0005, 1000);
	}
}

export default Door;
