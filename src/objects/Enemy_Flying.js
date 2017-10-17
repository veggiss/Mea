class Enemy_Flying extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'enemy_flying');

		//Globals
		this.originX = this.x;
		this.originY = this.y - 10;
		this.needsReset = true;
		this.game = game;
		this.player = game.player;
		this.moveUp = true;
		this.timer = 0;

		//Sprite
		this.anim = this.animations.add('flying');
		this.anim.play(20, true);
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
	}

	update() {
		if (this.alive) {
			if(this.timer > 15) {
				if (this.moveUp) {
					this.moveUp = false;
				} else {
					this.moveUp = true;
				}

				this.timer = 0;
			}

			if (this.moveUp) {
				this.game.physics.arcade.moveToXY(this, this.originX, this.originY + 2, 60, 200);
			} else {
				this.game.physics.arcade.moveToXY(this, this.originX, this.originY - 2, 60, 200);
			}

			this.timer++;
		}
	}

	resetPos() {
		if (!this.alive) {
			this.revive();
		}

		this.x = this.originX;
		this.y = this.originY;
	}
}

export default Enemy_Flying;