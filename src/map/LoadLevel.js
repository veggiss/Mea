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

		// Sound
		this.sound_enemy_death = this.game.add.audio('sound_enemy_death');
		this.sound_enemy_death.volume = 0.3;

		this.player.bringToTop();
		this.mea.bringToTop();
		this.mea.juiceMeter.bringToTop();

		this.startPosX = this.map.startPos.getAt(0).x;
		this.startPosY = this.map.startPos.getAt(0).y - this.player.height;

		return this;
	}

	update() {
		this.updateCollitions();
		this.updateButton();
		this.playerOutOfBounds();
		this.bg.update();
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
		this.game.physics.arcade.collide(this.player, this.map.obj_spikes, this.playerDeath, null, this);
		this.game.physics.arcade.collide(this.player, this.map.obj_moving_platform);
		this.game.physics.arcade.collide(this.player, this.map.obj_boat);
		this.game.physics.arcade.overlap(this.player, this.map.obj_laser, this.laserOverlapPlayer, null, this);

		//Objects vs the world
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.groundLayer);
		this.game.physics.arcade.collide(this.map.obj_enemy_moving, this.map.groundLayer);

		//Objects vs objects
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_moving, this.stoneHandler, null, this);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_enemy_flying, this.stoneHandler, null, this);
		this.game.physics.arcade.collide(this.map.obj_enemy_moving, this.map.obj_enemy_moving);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_button);
		this.game.physics.arcade.collide(this.map.obj_stone, this.map.obj_moving_platform);
		this.game.physics.arcade.overlap(this.map.obj_enemy_moving, this.map.obj_catapult, this.catapultHandler, null, this);
		this.game.physics.arcade.overlap(this.map.obj_stone, this.map.obj_laser, this.laserIntersect, null, this);
	}

	loadBackground(bg) {
		if (bg == "overworld") {
			this.bg = new BG_Overworld(this.game);
		}
	}

	laserIntersect(p, e) {
		e.interSectPoint(p);
	}

	laserOverlapPlayer(p, e) {
		if (e.isOverlapping(p)) {
			this.resetObjects();
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

	stoneHandler(p, e) {
		if (p.body.touching.down && e.body.touching.up) {
			this.killObject(p, e);
		}
	}

	movingEnemyHandler(p, e) {
		if (p.body.touching.down && e.body.touching.up) {
			p.body.velocity.y = -175;
			this.killObject(p, e);
		} else {
			this.resetObjects();
		}
	}

	updateButton() {
		if (!this.levelCleared && this.player.activated) {
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
		this.sound_enemy_death.play();
		e.kill();
	}

	catapultHandler(p, e) {
		if (e.name == "catapult_vertical") {
			p.body.velocity.y = -275 * e.scale.y;
		} else if (e.name == "catapult_horizontal") {
			p.body.velocity.x = 275 * e.scale.x;
		}
		e.anim.play(15);
		this.player.sound_jump.play();
	}

	playerDeath(p, e) {
		this.resetObjects();
	}

	resetPlayerPos() {
		this.player.x = this.startPosX;
		this.player.y = this.startPosY;
		this.mea.x = this.startPosX;
		this.mea.y = this.startPosY;
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

	}

	resetObjects() {
		this.game.camera.flash(0x000000, 500);
		this.levelCleared = false;
		this.player.activated = false;

		this.map.allObjects.forEach(group => {
			group.forEach(obj => {
				if (obj.needsReset) {
					obj.resetPos();
				}
			});
		});

		this.resetPlayerPos();
	}

	playerOutOfBounds() {
		if (this.player.y > this.game.world.height) {
			this.resetObjects();
		}
	}
}

export default LoadLevel;