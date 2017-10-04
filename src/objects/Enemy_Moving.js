import Player from 'objects/Player';

class Enemy_Moving extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'moving_enemy');

		this.game = game;

		//Globals
		this.movingEnemyTick = 120;
		this.movingEnemySwitch = false;


		//Sprite
		this.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		this.animations.play('walking');
		this.anchor.setTo(0.5, 0.5);
		this.autoCull = true;

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
	}

	update() {
		if (this.alive) {
			if (this.movingEnemyTick > 120) {
				this.movingEnemySwitch = false;
				this.body.velocity.x = 12;
				this.scale.x = 1;
			} else if (this.movingEnemyTick < 0) {
				this.movingEnemySwitch = true;
				this.body.velocity.x = -12;
				this.scale.x = -1;
			}

			if (this.movingEnemySwitch) {
				this.movingEnemyTick++;
			} else {
				this.movingEnemyTick--;
			}
		}
	}

	testFunc() {
		console.log("lol");
	}
}

export default Enemy_Moving;