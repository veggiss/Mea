class Laser extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'beam');

		//Globals
		this.needsReset = false;
		this.game = game;
		this.loadedVars = false;
		this.isTouching = false;
		this.timer = this.game.time.now;
		this.lastX = 0;

		//Sprite
		this.autoCull = true;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.immovable = true;
		this.body.moves = false;

		// Laser sprite
		this.laser = this.game.add.sprite(this.x, this.y - 3, 'laser');
		this.game.add.tween(this.laser).to({alpha: 0.6}, 50, Phaser.Easing.Linear.None, true, 0).loop(true).yoyo(true);
	}

	update() {
		if (this.game.DEBUG) {
			this.game.debug.body(this);
		}

		if (!this.loadedVars) {
			if (this.anchor.x == 1) {
				this.laser.x += this.width;
				this.x += this.width;
			}
			this.laser.anchor.setTo(this.anchor.x, this.anchor.y);
			this.originWidth = this.width;
			this.loadedVars = true;
		}

		if (this.timer != this.game.time.now) {
			this.laser.width = this.originWidth;
			this.lastX = 0;
		}
	}

	interSectPoint(obj) {
		if (this.lastX < obj.x) {
			let max = Math.max(obj.x, this.x);
			let min = Math.min(obj.x, this.x);
			this.laser.width = max - (min + (obj.width/2));
			this.lastX = obj.x;
		} else {
			this.lastX = 0;
		}

		this.timer = this.game.time.now;
	}

	isOverlapping(obj) {
    	let a = obj.getBounds();
    	let b = this.laser.getBounds();

    	return Phaser.Rectangle.intersects(a, b);
	}
}

export default Laser;