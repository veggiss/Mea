import Player from 'objects/Player';
import Mea from 'objects/Mea';
import LoadLevel from 'map/LoadLevel';
import LoadEvent from 'map/LoadEvent';

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#b77d10';
		this.game.stage.disableVisibilityChange = false;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.level, this.levelEvent;
		this.levelLoaded = false;
		this.currentLevel = -1;
		this.levelMaps = ["level_objectPool", "level_test"];

		this.player = new Player(this.game, 200, 100);
		this.mea = new Mea(this.game, 200, 100);

		this.nextLevel();
				
		this.game.physics.arcade.gravity.y = 450;
		this.game.physics.arcade.TILE_BIAS = 8;

		this.game.camera.follow(this.player, Phaser.Camera.LOCKON, 0.1, 0.1);
	}

	update() {
		this.level.update();
		this.levelEvent.update();
		this.checkDoor();
	}

	checkDoor() {
		if (this.level.map.obj_door.children[0].activated && this.player.cursors.down.isDown) {
			this.game.physics.arcade.overlap(this.player, this.level.map.obj_door, this.nextLevel, null, this);
		}
	}

	nextLevel() {
		this.currentLevel++;
		this.level = new LoadLevel(this.game, this.player, this.mea, this.levelMaps[this.currentLevel], 200, 100);
		this.levelEvent = new LoadEvent(this.level);
	}
}

export default Main;

