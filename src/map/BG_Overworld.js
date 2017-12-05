class BG_Overworld {
	constructor(game) {
		this.game = game;
		
 		this.bg_sky_sun = this.game.add.sprite(0, 0, 'bg_sky_sun');
		this.bg_mtn_back = this.game.add.tileSprite(0, 0, 512, 256, 'bg_mtn_back');
		this.bg_mtn_front = this.game.add.tileSprite(0, 56, 512, 128, 'bg_mtn_front');
		this.bg_sky_sun.fixedToCamera = true;
		this.bg_mtn_back.fixedToCamera = true;
		this.bg_mtn_front.fixedToCamera = true;

		this.moveForwardBool = false;

		return this

	}

	update() {
		if (this.moveForwardBool) {
			this.moveForward();
		} else {
			this.bg_mtn_back.tilePosition.x = -this.game.camera.x * 0.08/*, -this.game.camera.y * 0.08*/;
			this.bg_mtn_front.tilePosition.x = -this.game.camera.x * 0.15/*, -this.game.camera.y * 0.15*/;
		}
	}

	moveForward() {
		this.bg_mtn_back.tilePosition.x -= 0.05;
		this.bg_mtn_front.tilePosition.x -= 0.2;
	}

	destroy() {
		this.bg_sky_sun.destroy();
		this.bg_mtn_back.destroy();
		this.bg_mtn_front.destroy();
	}
}

export default BG_Overworld;