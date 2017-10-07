import LoadMap from 'map/LoadMap';
import Stone from 'objects/Stone';
import Enemy_Moving from 'objects/Enemy_Moving';
import Button from 'objects/Button';
import Door from 'objects/Door';

class Level_test {
	constructor(game, player, level) {
		this.game = game;
		this.player = player;

		this.allActivated = false;
 		this.bg_sky_sun = this.game.add.sprite(0, 0, 'bg_sky_sun');
		this.bg_mtn_back = this.game.add.tileSprite(0, 15, 320, 180, 'bg_mtn_back');
		this.bg_mtn_front = this.game.add.tileSprite(0, 4, 640, 180, 'bg_mtn_front');
		this.bg_sky_sun.fixedToCamera = true;
		this.bg_mtn_back.fixedToCamera = true;
		this.bg_mtn_front.fixedToCamera = true;

		this.obj_stone = this.game.add.group();
		this.obj_enemy_moving = this.game.add.group();
		this.obj_button = this.game.add.group();
		this.obj_door = this.game.add.group();

		this.map = new LoadMap(game, level);

		this.loadObjects();
		this.player.bringToTop();

		return this;
	}

	update() {
		this.updateBG();
		this.updateCollitions();
		this.updateButton();
	}

	loadObjects() {
		this.map.createFromObjects('objectLayer', 129, 'stone', 0, true, true, this.obj_stone, Stone);
		this.map.createFromObjects('objectLayer', 130, 'moving_enemy', 0, true, true, this.obj_enemy_moving, Enemy_Moving);
		this.map.createFromObjects('objectLayer', 138, 'button', 0, true, true, this.obj_button, Button);
		this.map.createFromObjects('objectLayer', 149, 'door', 0, true, true, this.obj_door, Door);
	}

	updateBG() {
		this.bg_mtn_back.tilePosition.set(-this.game.camera.x * 0.08, -this.game.camera.y * 0.08);
		this.bg_mtn_front.tilePosition.set(-this.game.camera.x * 0.15, -this.game.camera.y * 0.15);
	}

	updateCollitions() {
		//Player vs the world
		this.game.physics.arcade.collide(this.player, this.map.groundLayer);

		//Player vs objects
		this.game.physics.arcade.collide(this.player, this.obj_stone);
		this.game.physics.arcade.collide(this.player, this.obj_enemy_moving, this.movingEnemyHandler, null, this);
		this.game.physics.arcade.collide(this.player, this.obj_button);
		//this.game.physics.arcade.overlap(this.player, this.obj_door);

		//Objects vs the world
		this.game.physics.arcade.collide(this.obj_stone, this.map.groundLayer);
		this.game.physics.arcade.collide(this.obj_enemy_moving, this.map.groundLayer);
		this.game.physics.arcade.collide(this.obj_button, this.map.groundLayer);
		this.game.physics.arcade.collide(this.obj_door, this.map.groundLayer);

		//Objects vs objects
		this.game.physics.arcade.collide(this.obj_stone, this.obj_enemy_moving);
		this.game.physics.arcade.collide(this.obj_stone, this.obj_button);
	}

	updateButton() {
		let activated = 0;

		if (!this.allActivated) {
			this.obj_button.forEach(obj => {
				if (obj.activated) {
					activated++;
				}

				if(activated >= 2) {
					this.allActivated = true;
					this.obj_door.getChildAt(0).startAnim();
				}
			}, this);
		}
	}

	movingEnemyHandler(p, e) {
		if (e.body.touching.up) {
			this.player.body.velocity.y = -125;
			e.kill();
		} else {
			this.game.resetPlayer();
		}
	}
}

export default Level_test;