class Player extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'player');

		this.game = game;

		//Privates
		this.playerState = "falling";
		this.jumpTimer = 0;
		this.noGravTime;
		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.cursors = game.input.keyboard.createCursorKeys();

		//Sprite
		this.animations.add('walking', [1, 2, 3, 4, 5, 6, 7], 14, true);
		this.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10, true);
		this.anchor.setTo(0.5, 0.5);
		this.smoothed = false;

		//Physics
		game.physics.arcade.enable(this);
		this.body.setSize(6, 12, 4, 4);

		//Globals
		Player.getX = this.x;
		Player.getY = this.y;
		Player.getAlive = this.alive;
		Player.getScaleX = this.scale.x;
		Player.getPlayer = this;
		Player.getBody = this.body;

		this.game.add.existing(this);
	}

	update() {
		this.playerAnimations();
		this.playerControls();
		this.updateJump();
		this.updateGets();
	}

	updateGets() {
		Player.getX = this.x;
		Player.getY = this.y;
		Player.getAlive = this.alive;
		Player.getScaleX = this.scale.x;
	}

	updateJump() {
		if (this.jumpKey.isDown) {
			if (this.body.onFloor() && this.jumpTimer === 0) {
	            this.jumpTimer = 1;
	            this.body.velocity.y = -75;
	        } else if (this.jumpTimer > 0 && this.jumpTimer < 7) {
	            this.jumpTimer++;
	            this.body.velocity.y = -75 - (this.jumpTimer * 5);
	        }
	    } else {
	        this.jumpTimer = 0;
	    }
	}

	enemyJump() {
		this.body.velocity.y = -this.body.velocity.y/2;
	}

	playerControls() {
		if (this.cursors.right.isDown || this.cursors.left.isDown) {
			if (this.cursors.right.isDown) {
				this.body.velocity.x = 75;
				this.scale.x = 1;
			} else if (this.cursors.left.isDown) {
				this.body.velocity.x = -75;
				this.scale.x = -1;
			}
			if (this.body.onFloor()) {
				this.playerState = 'walking';
			}
		} else {
			if (this.body.onFloor()) {
				this.playerState = 'idle';
				this.body.velocity.x = 0;
			} else {
				if (this.body.velocity.x > 1) {
					this.body.velocity.x -= this.body.velocity.x / 10;
				} else if (this.body.velocity.x < 1) {
					this.body.velocity.x -= this.body.velocity.x / 10;
				} else {
					this.body.velocity.x = 0;
				}
			}
		}

		if (!this.body.onFloor() && this.playerState != 'falling') {
			this.playerState = 'falling';
		}
	}

	playerAnimations() {
		if (this.body.touching.down) {
			this.body.blocked.down = true;
		}

		if (this.playerState == 'idle') {
			this.animations.play('idle');
		} else if (this.playerState == 'flying') {
			this.animations.frame = 8;
			this.animations.stop();
		} else if (this.playerState == 'walking') {
			this.animations.play('walking');
		} else if (this.playerState == 'falling') {
			if (this.body.velocity.y < -25) {
				this.animations.frame = 10;
			} else if (this.body.velocity.y > -25 && this.body.velocity.y < 50) {
				this.animations.frame = 11;
			} else if (this.body.velocity.y > 50) {
				this.animations.frame = 12;
			}
			this.animations.stop();
		}
	}
}

export default Player;