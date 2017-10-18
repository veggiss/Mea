import JuiceMeter from 'objects/JuiceMeter';
import Player from 'objects/Player';

class Mea extends Phaser.Sprite {
	constructor(game, x, y) {
		super(game, x, y, 'mea');

		this.game = game;

		//Privates
		this.meaY = 10;
		this.meaYMax = 15;
		this.meaYMin = 10;
		this.meaMoveUp = true;
		this.juiceMeter = new JuiceMeter(this.game, 0, 0);
		this.juiceTimer = 4000;
		this.juiceMax = 100;
		this.juice = this.juiceMax;
		this.isFlying = false;
		this.gravDelay = 10;
		this.gravKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//Globals
		Mea.getX = this.x;
		Mea.getY = this.y;
		Mea.getAlive = this.alive;

		//Sprite
		this.flyAnim = this.animations.add('flapping', [0, 1, 2, 3, 2, 1, 0]);
		this.flyAnim.play(15, true);
		this.anchor.setTo(0.5, 0.5);
		this.smoothed = false;

		//Physics
		this.game.physics.arcade.enable(this);
		this.body.allowGravity = false;

		this.game.add.existing(this);
	}

	update() {
		this.updatePos();
		this.updateGets();
		this.antiGravity();
	}

	updateGets() {
		Mea.getX = this.x;
		Mea.getY = this.y;
		Mea.getAlive = this.alive;
	}

	updatePos() {
		if (!this.isFlying) {
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

			this.game.physics.arcade.moveToXY(this, Player.getX - (Player.getScaleX * 7), Player.getY - this.meaY, 60, 150);
		} else {
			this.game.physics.arcade.moveToXY(this, Player.getX + (Player.getBody.velocity.x/8), Player.getY + (Player.getBody.velocity.y/8) - 8, 30, 100);
		}
		this.scale.x = -Player.getScaleX;
	}

	antiGravity() {
		if (this.gravKey.isDown && this.juice > 15) {
			this.flyAnim.delay = 20;
			if (this.gravDelay > 0) {
				this.gravDelay--;
			}
			
			if (Player.getBody.velocity.y > -50 && this.gravDelay < 1) {
				Player.getBody.velocity.y -= 15;
			}

			this.juice--;
			this.noGravTime = this.game.time.now;
			this.juiceMeter.resetMeter(0, 0);
			this.isFlying = true;
		} else {
			this.flyAnim.delay = 35;
			this.isFlying = false;
			this.gravDelay = 10;
			if (this.juice < this.juiceMax && !this.gravKey.isDown && this.game.time.now - this.noGravTime > this.juiceTimer) {
				this.juice++;
			}
		}

		this.juiceMeter.width = (this.juice / this.juiceMax) * 8;

		if (this.juice >= this.juiceMax && this.game.time.now - this.noGravTime > this.juiceTimer) {
			this.juiceMeter.killMeter();
		}
		
		/*if (!this.gravKey.isDown && this.game.time.now - this.noGravTime > this.juiceTimer) {
			this.juice++;
		}*/
	}
}

export default Mea;