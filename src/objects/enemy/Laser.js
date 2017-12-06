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
			if (this.dir == 'left') {
				this.laser.x += this.width;
				this.x += this.width;
				this.laser.anchor.setTo(1, 0);
				this.anchor.setTo(1, 0);
			} else if (this.dir == 'down') {
				this.height = this.width;
				this.width = 1;
				this.laser.angle = 90;
				this.laser.y += 3;
				this.laser.x += 3;
				this.x++;
				this.y += 2;
			} else if (this.dir == 'up') {
				this.height = this.width;
				this.laser.anchor.setTo(1, 1);
				this.anchor.setTo(1, 1);
				this.width = 1;
				this.laser.angle = 90;
				this.laser.y += this.height + 2;
				this.y += this.height + 1;
				this.x += 3;
			}

			this.y--;
			if (this.dir == 'left' || this.dir == 'right') {
				this.originWidth = this.width;
			} else if (this.dir == 'up' || this.dir == 'down') {
				this.originWidth = this.height;
			}
			this.loadedVars = true;
		}

		if (this.timer != this.game.time.now) {
			this.laser.width = this.originWidth;

			if (this.dir == 'left' || this.dir == 'up') {
				this.lastX = 0;
			} else if (this.dir == 'right' || this.dir == 'down') {
				this.lastX = 9999;
			}
		}
	}

	interSectPoint(obj) {
		this.timer = this.game.time.now;

		if (this.dir == 'left') {
			if (this.lastX < obj.x) {
				let max = Math.max(obj.x, this.x);
				let min = Math.min(obj.x, this.x);
				this.laser.width = (max - (min + (obj.width/2))) + 1;
				this.lastX = obj.x;
				if(obj.key == 'stone') {
					this.laser.width--;
				}
			} else {
				this.lastX = 0;
			}
		} else if (this.dir == 'right') {
			if (this.lastX > obj.x) {
				let max = Math.max(obj.x, this.x);
				let min = Math.min(obj.x, this.x);
				this.laser.width = (max - (min + (obj.width/2))) + 1;
				this.lastX = obj.x;
				if(obj.key == 'stone') {
					this.laser.width--;
				}
			} else {
				this.lastX = 9999;
			}
		} else if (this.dir == 'down') {
			if (this.lastX > obj.y) {
				let max = Math.max(obj.y, this.y);
				let min = Math.min(obj.y, this.y);
				this.laser.width = (max - (min + (obj.height/2))) + 1;
				this.lastX = obj.y;
				if(obj.key == 'stone') {
					this.laser.width--;
				}
			} else {
				this.lastX = 9999;
			}
		} else if (this.dir == 'up') {
			if (this.lastX < obj.y) {
				let max = Math.max(obj.y, this.y);
				let min = Math.min(obj.y, this.y);
				this.laser.width = (max - (min + (obj.height/2))) - 1;
				this.lastX = obj.y;
				if(obj.key == 'stone') {
					this.laser.width++;
				}
			} else {
				this.lastX = 0;
			}
		}
	}

	isOverlapping(obj) {
    	let a = obj.getBounds();
    	let b = this.laser.getBounds();

    	return Phaser.Rectangle.intersects(a, b);
	}
}

export default Laser;