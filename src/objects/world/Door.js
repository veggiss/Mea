import Player from 'objects/player/Player';
import Arrowdown from 'objects/world/Arrowdown';

class Door extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'door');
		
		//Globals
		this.game = game;
		this.activated = false;
		this.needsReset = true;

		//Sprite
		this.autoCull = true;
		this.anim = this.animations.add('complete');
		this.anim.onComplete.add(this.activateDoor, this);
		this.arrowdown = new Arrowdown(this.game);

		//Sounds
		this.sound_opening = this.game.add.audio('sound_opening');
		this.sound_ending = this.game.add.audio('sound_ending');

		this.sound_opening.volume = 0.3;
		this.sound_ending.volume = 0.3;

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
		this.originX = this.body.x;
		this.originY = this.body.y;
	}

	activateDoor() {
		this.arrowdown.reset(this.body.x + 2, this.body.y - 15);
		let tween = this.game.add.tween(this.arrowdown).to({y:this.arrowdown.y - 10}, 0, Phaser.Easing.Quadratic.InOut, true).loop(true).yoyo(true);
		this.sound_opening.stop();
		this.sound_ending.play();
		Player.getPlayer.unlockPlayer();
		this.game.camera.follow(Player.getPlayer, Phaser.Camera.LOCKON, 0.1, 0.1);
		this.activated = true;
	}

	startAnim() {
		this.anim.play(12);
		this.game.camera.shake(0.0005, 1000);
		this.sound_opening.play();

		if (!this.inWorld) {
			Player.getPlayer.lockPlayer();
			this.game.camera.follow(this, Phaser.Camera.LOCKON, 0.1, 0.1);
		}
	}

	resetPos() {
		this.activated = false;
		this.animations.frame = 0;
		this.arrowdown.kill();
	}
}

export default Door;
