import LoadMap from 'map/LoadMap';
import BG_Overworld from 'map/BG_Overworld';

class LoadLevel {
	constructor(game, player, mea, mapName) {
		this.game = game;
		this.player = player;
		this.mea = mea;
		this.levelCleared = false;
		this.mapName = mapName;

		this.loadBackground("overworld");
		this.map = new LoadMap(game, mapName);

		this.player.bringToTop();
		this.mea.bringToTop();
		this.mea.juiceMeter.bringToTop();
		this.startPosX = this.map.startPos.getAt(0).x
		this.startPosY = this.map.startPos.getAt(0).y
		this.player.x = this.startPosX;
		this.player.y = this.startPosY;
		this.mea.x = this.startPosX;
		this.mea.y = this.startPosY - 8;

		return this;
	}

	update() {
		this.updateCollitions();
		this.updateButton();
		this.playerOutOfBounds();
	}

	updateCollitions() {
		//Player vs the world
		this.game.physics.arcade.collide(this.player, this.map.groundLayer);

		//Player vs objects
		this.game.physics.arcade.collide(this.player, this.map.obj_stone);
		this.game.physics.arcade.collide(this.player, this.map.obj_enemy_moving, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_enemy_flying, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_button);
		this.game.physics.arcade.overlap(this.player, this.map.obj_catapult, this.catapultHandler, null, this);
		this.game.physics.arcade.overlap(this.player, this.map.obj_mea_crystal, this.meaCrystalHandler, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_spikes, this.playerDeath, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_moving_platform);

		//Objects vs the world
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.groundLayer);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_flying, this.killObject, null, this);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_moving, this.killObject, null, this);
		this.game.physics.arcade.collide(this.map.obj_enemy_moving, this.map.groundLayer);

		//Objects vs objects
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_moving, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_button);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_moving_platform);
	}

	loadBackground(bg) {
		if (bg == "overworld") {
			this.bg = new BG_Overworld(this.game);
		}
	}

	destroy() {
		this.map.groundLayer.destroy();
		this.map.bgLayer.destroy();
		this.bg.destroy();
		this.map.allObjects.forEach(group => {
			group.destroy();
		});
	}

	movingEnemyHandler(p, e) {
		if (e.body.touching.up) {
			p.body.velocity.y = -175;
			e.kill();
		} else {
			this.resetObjects();
		}
	}

	updateButton() {
		if (!this.levelCleared) {
			let activated = 0;

			this.map.obj_button.forEach(obj => {
				if (obj.activated) {
					activated++;
				}

				if (activated === this.map.obj_button.length) {
					this.map.obj_door.getAt(0).startAnim();
					this.levelCleared = true;
				}
			});
		}
	}

	killObject(p, e) {
		e.kill();
	}

	catapultHandler(p, e) {
		if (e.name == "catapult_vertical") {
			p.body.velocity.y = -275 * e.scale.y;
		} else if (e.name == "catapult_horizontal") {
			p.body.velocity.x = 275 * e.scale.x;
		}
		e.anim.play(15);
	}

	meaCrystalHandler(p, e) {
		if (this.mea.juice < this.mea.juiceMax) {
			this.mea.juice = this.mea.juiceMax;
			this.mea.noGravTime = this.game.time.now;
			this.mea.juiceMeter.resetMeter(0, 0);
			e.kill();
		}
	}

	playerDeath(p, e) {
		this.resetObjects();
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

		this.levelCleared = false;
	}

	playerOutOfBounds() {
		if (this.player.y > this.game.world.width) {
			this.resetObjects();
		}
	}
}

export default LoadLevel;