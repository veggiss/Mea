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
		this.currentLevel = 0;
		this.levelMaps = ["level_proto_1", "level_proto_2", "level_proto_3", "level_proto_4", "level_proto_5"];

		this.player = new Player(this.game);
		this.mea = new Mea(this.game);
		
		this.loadCurrentLevel();
				
		this.game.physics.arcade.gravity.y = 450;
		this.game.physics.arcade.TILE_BIAS = 8;

		this.game.camera.follow(this.player, Phaser.Camera.LOCKON, 0.1, 0.1);
	}

	update() {
		if (this.level != undefined) {
			this.level.update();
			this.checkDoor();
		}

		/*if(this.levelEvent != undefined) {
			this.levelEvent.update();
			this.checkDoor();
		}*/
	}

	checkDoor() {
		if (this.level.map.obj_door.length > 0) {
			if (this.level.levelCleared && this.player.cursors.down.isDown) {
				this.game.physics.arcade.overlap(this.player, this.level.map.obj_door, this.nextLevel, null, this);
			}
		}
	}

	nextLevel() {
		if (this.levelMaps.length - 1 > this.currentLevel) {
			this.currentLevel++;
			this.loadCurrentLevel();
		}
	}

	loadCurrentLevel() {
		if (this.level != undefined) {
			this.level.destroy();
		}

		this.level = new LoadLevel(this.game, this.player, this.mea, this.levelMaps[this.currentLevel]);
		//this.levelEvent = new LoadEvent(this.level);
	}
}

export default Main;

