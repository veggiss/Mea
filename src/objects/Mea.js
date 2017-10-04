import Player from 'objects/Player';

class Mea extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'mea');

		this.game = game;

		//Privates
		this.meaY = 5;
		this.meaYMax = 15;
		this.meaYMin = 5;
		this.meaMoveUp = true;

		//Globals
		Mea.getX = this.x;
		Mea.getY = this.y;
		Mea.getAlive = this.alive;

		//Sprite
		this.animations.add('flapping', [0, 1, 2, 3, 2, 1, 0], 28, true);
		this.animations.play('flapping');
		this.anchor.setTo(0.5, 0.5);
		this.smoothed = false;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.allowGravity = false;

		game.add.existing(this);
	}

	update() {
		this.updatePos();
		this.updateGets();
	}

	updateGets() {
		Mea.getX = this.x;
		Mea.getY = this.y;
		Mea.getAlive = this.alive;
	}

	updatePos() {
		if (this.meaY > this.meaYMax) {
			this.meaMoveUp = false;
		} else if (this.meaY < this.meaYMin) {
			this.meaMoveUp = true;
		}

		if (this.meaMoveUp) {
			this.meaY += 0.5;
		} else {
			this.meaY -= 0.5;
		}

		this.game.physics.arcade.moveToXY(this, Player.getX - (Player.getScaleX * 7), Player.getY - this.meaY, 60, 300);
		this.scale.x = -Player.getScaleX;
	}
}

export default Mea;