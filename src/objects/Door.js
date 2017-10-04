class Door extends Phaser.Sprite {
	constructor(game, x, y, 'button') {
		//Sprite
		this.autoCull = true;

		//Physics
		game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;
	}
}

export default Button;