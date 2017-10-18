class Moving_Platform_16 extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'moving_platform_16');

		//Globals
		this.needsReset = false;
		this.originX = this.x;
		this.originY = this.y;
		this.game = game;

		//Sprite
		this.autoCull = true;
		this.moveToDest = true;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = true;
		this.body.allowGravity = false;
	}

	update() {
		if (this.dir == "horizontal") {
			if (this.x < this.dest) {
				this.moveToDest = false;
			} else if (this.x > this.originX) {
				this.moveToDest = true;
			}

			if (this.moveToDest) {
				this.body.velocity.x = -25;
			} else {
				this.body.velocity.x = 25;
			}
		} else if (this.dir == "vertical") {
			if (this.y < this.dest) {
				this.moveToDest = false;
			} else if (this.y > this.originY) {
				this.moveToDest = true;
			}

			if (this.moveToDest) {
				this.body.velocity.y = -25;
			} else {
				this.body.velocity.y = 25;
			}
		}
	}
}

export default Moving_Platform_16;