import LoadMap from 'map/LoadMap';
import BG_Overworld from 'map/BG_Overworld';

class LoadLevel {
	constructor(game, player, mea, map, startPosX, startPosY) {
		this.game = game;
		this.player = player;
		this.mea = mea;
		this.startPosX = startPosX;
		this.startPosY = startPosY;
		this.allActivated = false;
		this.mapName = map;

		this.loadBackground("overworld");
		this.map = new LoadMap(game, map);

		this.player.bringToTop();
		this.mea.bringToTop();
		this.mea.juiceMeter.bringToTop();

		return this;
	}

	update() {
		this.updateCollitions();
	}

	updateCollitions() {
		//Player vs the world
		this.game.physics.arcade.collide(this.player, this.map.groundLayer);

		//Player vs objects
		this.game.physics.arcade.collide(this.player, this.map.obj_stone);
		this.game.physics.arcade.collide(this.player, this.map.obj_enemy_moving, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_button);

		//Objects vs the world
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.groundLayer);
		this.game.physics.arcade.collide(this.map.obj_enemy_moving, this.map.groundLayer);

		//Objects vs objects
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_moving);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_button);
	}

	loadBackground(bg) {
		if (bg == "overworld") {
			this.bg = new BG_Overworld(this.game);
		}
	}

	movingEnemyHandler(p, e) {
		if (e.body.touching.up) {
			this.player.body.velocity.y = -175;
			e.kill();
		} else {
			this.resetObjects();
		}
	}

	resetObjects() {
		this.player.x = this.startPosX;
		this.player.y = this.startPosY;
		this.mea.x = this.startPosX;
		this.mea.y = this.startPosY;

		this.map.allObjects.forEach(group => {
			group.forEach(obj => {
				if (obj.needsReset) {
					obj.resetPos();
				}
			});
		});
	}
}

export default LoadLevel;