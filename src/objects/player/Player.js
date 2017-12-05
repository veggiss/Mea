class Player extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'player');

		this.game = game;

		//Privates
		this.playerState = "falling";
		this.jumpTimer = 0;
		this.activated = true;
		this.noGravTime;
		this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.cursors = game.input.keyboard.createCursorKeys();

		//Sprite
		this.anim_walking = this.animations.add('walking', [1, 2, 3, 4, 5, 6, 7], 14, true);
		this.animations.add('idle', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 10, true);
		this.anchor.setTo(0.5, 0.5);
		this.smoothed = false;

		//Sounds
		this.sound_step_1 = this.game.add.audio('sound_step_1');
		this.sound_step_2 = this.game.add.audio('sound_step_2');
		this.sound_step_3 = this.game.add.audio('sound_step_3');
		this.sound_jump = this.game.add.audio('sound_jump');

		this.sound_step_1.volume = 0.3;
		this.sound_step_2.volume = 0.3;
		this.sound_step_3.volume = 0.3;
		this.sound_jump.volume = 0.2;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.setSize(6, 12, 4, 4);
		this.body.maxVelocity.y = 325;
		this.body.collideWorldBounds = true;
		this.game.physics.arcade.checkCollision.up = true;
		this.game.physics.arcade.checkCollision.down = false;
		this.game.physics.arcade.checkCollision.left = true;
		this.game.physics.arcade.checkCollision.right = true;

		//Globals
		Player.getX = this.x;
		Player.getY = this.y;
		Player.getAlive = this.alive;
		Player.getScaleX = this.scale.x;
		Player.getActivated = this.activated;
		Player.getPlayer = this;
		Player.getBody = this.body;

		this.game.add.existing(this);
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}

		if (this.activated) {
			this.playerControls();
			this.updateJump();
			this.playerAnimations();
			this.updateSound();
		}
		
		this.updateGets();
	}

	updateGets() {
		Player.getX = this.x;
		Player.getY = this.y;
		Player.getAlive = this.alive;
		Player.getScaleX = this.scale.x;
		Player.getActivated = this.activated;
	}

	lockPlayer() {
		this.activated = false;
		this.body.enable = false;
		this.animations.stop();
	}

	unlockPlayer() {
		this.activated = true;
		this.body.enable = true;
		this.animations.play();
	}

	updateJump() {
		if (this.jumpKey.isDown) {
			if (this.body.onFloor() && this.jumpTimer === 0) {
	            this.jumpTimer = 1;
	            this.body.velocity.y = -75;
	            this.sound_step_3.play();
	        } else if (this.jumpTimer > 0 && this.jumpTimer < 8) {
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
		if (this.body.touching.down) {
			this.body.blocked.down = true;
		}

		if (this.body.onFloor()) {
				if (this.cursors.right.isDown) {
					if (this.body.velocity.x < 80 && this.body.velocity.x > -80) {
						this.body.velocity.x = 75;
					} else {
						this.body.velocity.x -= this.body.velocity.x / 4;
					}
					this.scale.x = 1;
					this.playerState = 'walking';
				} else if (this.cursors.left.isDown) {
					if (this.body.velocity.x < 80 && this.body.velocity.x > -80) {
						this.body.velocity.x = -75;
					} else {
						this.body.velocity.x -= this.body.velocity.x / 4;
					}
					this.scale.x = -1;
					this.playerState = 'walking';
				} else {
					this.playerState = 'idle';
					if (this.body.velocity.x > 1 || this.body.velocity.x < 1) {
						this.body.velocity.x -= this.body.velocity.x / 2;
					} else {
						this.body.velocity.x = 0;
					}
				}
		} else {
			if (this.body.velocity.x < 70 && this.body.velocity.x > -70) {
				if (this.cursors.right.isDown) {
					this.body.velocity.x += 25;
					this.scale.x = 1;
				} else if (this.cursors.left.isDown) {
					this.body.velocity.x -= 25;
					this.scale.x = -1;
				}
			}

			if (this.body.velocity.x > 1 || this.body.velocity.x < 1) {
					this.body.velocity.x -= this.body.velocity.x / 10;
			} else {
				this.body.velocity.x = 0;
			}
		}

		if (!this.body.onFloor() && this.playerState != 'falling') {
			this.playerState = 'falling';
		}
	}

	updateSound() {
		if(this.animations.frame == 2 && !this.sound_step_1.isPlaying) {
			this.sound_step_1.play();
		} else if (this.animations.frame == 6 && !this.sound_step_2.isPlaying) {
			this.sound_step_2.play();
		}
	}

	playerAnimations() {
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