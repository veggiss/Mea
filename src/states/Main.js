import Player from 'objects/Player';
import Mea from 'objects/Mea';
import LoadLevel from 'map/LoadLevel';

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#b77d10';
		this.game.stage.disableVisibilityChange = false;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.player = new Player(this.game, 200, 100);
		this.level = new LoadLevel(this.game, this.player, 'level_objectPool');
		this.mea = new Mea(this.game, 200, 100);
				
		this.game.physics.arcade.gravity.y = 450;

		this.game.camera.follow(this.player, Phaser.Camera.LOCKON, 0.1, 0.1);
	}

	update() {
		this.level.update();
	}

	resetPlayer() {
		this.objects.forEachDead(function(obj) {
			obj.testFunc();
		});
		this.player.x = 200;
		this.player.y = 100;
	}
}

export default Main;

