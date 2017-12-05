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
		this.body.maxVelocity.y = 325;
		this.body.setSize(8, 9, 0, -1);
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}
	}

	resetPos() {
		this.body.velocity.y = 0;
		this.reset(this.originX, this.originY);
	}
}

export default Stone;