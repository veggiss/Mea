import LoadMap from 'objects/LoadMap';
import Stone from 'objects/Stone';
import Enemy_Moving from 'objects/Enemy_Moving';
import Button from 'objects/Button';
import Door from 'objects/Door';

class Level_test {
	constructor(game) {
		this.game = game;
 		this.bg_sky_sun = this.game.add.sprite(0, 0, 'bg_sky_sun');
		this.bg_mtn_back = this.game.add.tileSprite(0, 15, 320, 180, 'bg_mtn_back');
		this.bg_mtn_front = this.game.add.tileSprite(0, 4, 640, 180, 'bg_mtn_front');
		this.bg_sky_sun.fixedToCamera = true;
		this.bg_mtn_back.fixedToCamera = true;
		this.bg_mtn_front.fixedToCamera = true;

		this.objects = this.game.add.group();

		this.door = this.game.add.group();

		this.map = new LoadMap(game, 'level_objectPool');

		this.allActivated = false;

		return this;
	}

	loadObjects() {
		this.map.createFromObjects('objectLayer', 129, 'stone', 0, true, true, this.objects, Stone);
		this.map.createFromObjects('objectLayer', 130, 'moving_enemy', 0, true, true, this.objects, Enemy_Moving);
		this.map.createFromObjects('objectLayer', 138, 'button', 0, true, true, this.objects, Button);
		this.map.createFromObjects('objectLayer', 149, 'door', 0, true, true, this.door, Door);
		return this.objects;
	}

	updateBG() {
		this.bg_mtn_back.tilePosition.set(-this.game.camera.x * 0.08, -this.game.camera.y * 0.08);
		this.bg_mtn_front.tilePosition.set(-this.game.camera.x * 0.15, -this.game.camera.y * 0.15);
	}

	updateButton() {
		let activated = 0;

		if (!this.allActivated) {
			this.objects.forEach(function(obj, a) {
				
				if (obj.gid = 138) {
					if (obj.activated) {
						activated++;
					}

					if(activated >= 2) {
						this.allActivated = true;
						this.door.getChildAt(0).startAnim();
						console.log("eureika");
					}
				}
			}, this);
		}
	}
}

export default Level_test;