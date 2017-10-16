class BG_Overworld {
	constructor(game) {
		this.game = game;
		
 		this.bg_sky_sun = this.game.add.sprite(0, 0, 'bg_sky_sun');
		this.bg_mtn_back = this.game.add.tileSprite(0, 15, 320, 180, 'bg_mtn_back');
		this.bg_mtn_front = this.game.add.tileSprite(0, 4, 640, 180, 'bg_mtn_front');
		this.bg_sky_sun.fixedToCamera = true;
		this.bg_mtn_back.fixedToCamera = true;
		this.bg_mtn_front.fixedToCamera = true;

		return this

	}

	update() {
		this.bg_mtn_back.tilePosition.set(-this.game.camera.x * 0.08, -this.game.camera.y * 0.08);
		this.bg_mtn_front.tilePosition.set(-this.game.camera.x * 0.15, -this.game.camera.y * 0.15);
	}
}

export default BG_Overworld;