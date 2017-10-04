import Player from 'objects/Player';

class Enemy_Moving extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'moving_enemy');

		this.game = game;

		//Sprite
		this.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		this.animations.play('walking');
		this.anchor.setTo(0.5, 0.5);
		this.autoCull = true;
		
		if(Math.random() >= 0.5) {
			this.scale.x = 1;
		}

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
	}

	update() {
		if (this.alive) {
			if (this.body.blocked.left || this.body.touching.left) {
				this.scale.x = 1;
			} else if (this.body.blocked.right || this.body.touching.right) {
				this.scale.x = -1;
			}

			this.body.velocity.x = this.scale.x * 12;
		}
	}

	testFunc() {
		console.log("LOL");
	}
}

export default Enemy_Moving;