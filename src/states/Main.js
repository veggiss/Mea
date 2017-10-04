import Player from 'objects/Player';
import Mea from 'objects/Mea';
import Level_test from 'levels/Level_test';

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#b77d10';
		this.game.stage.disableVisibilityChange = false;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.level = new Level_test(this.game, this.player);
		this.mea = new Mea(this.game, 200, 100);
		this.player = new Player(this.game, 200, 100);

		this.map = this.level.map;
		this.objects = this.level.loadObjects();
				
		this.game.physics.arcade.gravity.y = 450;

		this.game.camera.follow(this.player, Phaser.Camera.LOCKON, 0.1, 0.1);
	}

	update() {
		this.game.physics.arcade.collide(this.objects, this.map.groundLayer);
		this.game.physics.arcade.collide(this.player, this.map.groundLayer);
		this.game.physics.arcade.collide(this.objects, this.player, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.objects);
		this.level.updateButton();
		this.level.updateBG();
	}

	render() {
		//this.game.debug.cameraInfo(this.game.camera, 32, 32);
	}

	buttonHandler() {
		console.log("buttonhandler");
	}

	movingEnemyHandler(p, e) {
		if (e.key == "moving_enemy") {
			if (e.body.touching.up) {
				this.player.body.velocity.y = -125;
				e.kill();
			} else {
				this.resetPlayer();
			}
		}
	}

	resetPlayer() {
		this.objects.forEachDead(function(obj) {
			obj.testFunc();
		});
		this.player.x = 200;
		this.player.y = 100;
	}

	updateButton() {
		if (this.button.body.touching.up) {
			this.button.animations.frame = 1;
			this.buttonTimer = 0;
		} else {
			if (this.buttonTimer > 5) {
				this.button.animations.frame = 0;
			} else {
				this.buttonTimer++;
			}
		}
	}
}

export default Main;

