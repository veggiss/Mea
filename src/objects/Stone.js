class Stone extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'stone');

		//Globals
		this.originX = this.x;
		this.originY = this.y;
		this.needsReset = true;
		
		//Sprite
		this.anchor.setTo(0.5, 0.5);
		this.autoCull = true;

		//Physics
		game.physics.arcade.enable(this);
		this.body.drag.x = 1000;
		this.body.maxVelocity.x = 0.1;
		this.body.setSize(8, 9, 0, -1);
	}

	resetPos() {
		if (!this.alive) {
			this.revive();
		}

		this.x = this.originX;
		this.y = this.originY;
	}
}

export default Stone;