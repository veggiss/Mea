class MeaFem extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'mea_fem');

		this.game = game;

		//Privates
		this.meaY = 10;
		this.meaYMax = 15;
		this.meaYMin = 10;
		this.meaMoveUp = true;
		//Sprite
		this.flyAnim = this.animations.add('flapping_fem', [0, 1, 2, 3, 2, 1, 0]);
		this.flyAnim.play(15, true);
		this.anchor.setTo(0.5, 0.5);
	}

	update() {
		this.updatePos();
	}

	updatePos() {
		if (this.meaY > this.meaYMax) {
			this.meaMoveUp = false;
		} else if (this.meaY < this.meaYMin) {
			this.meaMoveUp = true;
		}

		if (this.meaMoveUp) {
			this.meaY += 0.25;
		} else {
			this.meaY -= 0.25;
		}

		this.y = 168 - this.meaY;
	}
}

export default MeaFem;