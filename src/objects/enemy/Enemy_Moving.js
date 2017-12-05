class Enemy_Moving extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'enemy_moving');

		//Globals
		this.originX = this.x;
		this.originY = this.y;
		this.needsReset = true;
		this.game = game;
		this.player = game.player;

		//Sprite
		this.animations.add('walking', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		this.animations.play('walking');
		this.anchor.setTo(0.5, 0.5);
		this.autoCull = true;
		this.scale.x = 1;

		if(Math.random() >= 0.5) {
			this.scale.x = -1;
		}

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = true;
		this.body.setSize(8, 8, 3, 3);
		this.body.collideWorldBounds = true;
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}
		
		if (this.alive) {
			if (this.body.blocked.left || this.body.touching.left) {
				this.scale.x = 1;
			} else if (this.body.blocked.right || this.body.touching.right) {
				this.scale.x = -1;
			}

			this.body.velocity.x = this.scale.x * 12;
		}
	}

	resetPos() {		
		this.x = this.originX;
		this.y = this.originY;

		if (!this.alive) {
			this.revive();
		}
	}
}

export default Enemy_Moving;