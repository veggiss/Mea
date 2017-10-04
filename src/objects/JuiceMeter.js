import Mea from 'objects/Mea';

class JuiceMeter extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'juiceMeter', 0);
		this.kill();

		game.add.existing(this);
	}

	update() {
		this.x = Mea.getX - 4;
		this.y = Mea.getY - 10;
	}

	killMeter() {
		if (this.alive) {
			this.kill();
		}
	}

	resetMeter(x, y) {
		if (!this.alive && Mea.getAlive) {
			this.reset(x, y);
		}
	}
}

export default JuiceMeter;