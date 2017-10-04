class Stone extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'stone');
		
		//Sprite
		this.anchor.setTo(0.5, 0.5);
		this.autoCull = true;

		//Physics
		game.physics.arcade.enable(this);
		this.body.drag.x = 1;
	}
}

export default Stone;