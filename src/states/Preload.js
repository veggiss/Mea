class Preload extends Phaser.State {

	preload() {
		this.game.load.spritesheet('player', 'assets/player.png', 13, 16, 13);
		this.game.load.spritesheet('mea', 'assets/mea.png', 8, 6, 4);
		this.game.load.spritesheet('button', 'assets/button.png', 8, 2, 2);
		this.game.load.spritesheet('door', 'assets/door.png', 14, 20, 11);
		this.game.load.spritesheet('moving_enemy', 'assets/moving_enemy.png', 13, 11, 8);
		this.game.load.spritesheet('tm_ground', 'assets/tm_ground.png', 8, 8, 32);
		this.game.load.spritesheet('tm_ground_inv', 'assets/tm_ground_inv.png', 8, 8, 32);
		//this.game.load.tilemap('level_debug_16-9', 'assets/tiles/level_debug_16-9.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level_debug_parallax', 'assets/tiles/level_debug_parallax.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level_testing', 'assets/tiles/level_testing.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_objectPool', 'assets/tiles/level_objectPool.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('tile_bg', 'assets/tile_bg.png');
		this.game.load.image('bg_mtn_front', 'assets/bg_mtn_front.png');
		this.game.load.image('bg_mtn_back', 'assets/bg_mtn_back.png');
		this.game.load.image('bg_sky_sun', 'assets/bg_sky_sun.png');
		this.game.load.image('juiceMeter', 'assets/juiceMeter.png');
		this.game.load.image('stone', 'assets/stone.png');
	}

	create() {
		this.game.state.start("Main");
	}

}

export default Preload;
