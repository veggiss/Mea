class Preload extends Phaser.State {

	preload() {
		this.game.load.spritesheet('player', 'assets/player.png', 13, 16, 13);
		this.game.load.spritesheet('mea', 'assets/mea.png', 8, 6, 4);
		this.game.load.spritesheet('button', 'assets/button.png', 8, 2, 2);
		this.game.load.spritesheet('door', 'assets/door.png', 14, 20, 11);
		this.game.load.spritesheet('enemy_moving', 'assets/enemy_moving.png', 13, 11, 8);
		this.game.load.spritesheet('enemy_flying', 'assets/enemy_flying.png', 11, 8, 5);
		this.game.load.spritesheet('catapult_vertical', 'assets/catapult_vertical.png', 11, 5, 5);
		this.game.load.spritesheet('catapult_horizontal', 'assets/catapult_horizontal.png', 5, 11, 5);
		this.game.load.spritesheet('mea_crystal', 'assets/mea_crystal.png', 3, 3, 8);
		this.game.load.spritesheet('spikes', 'assets/spikes.png', 4, 6, 4);
		this.game.load.spritesheet('tm_ground', 'assets/tm_ground.png', 8, 8, 32);
		this.game.load.spritesheet('tm_ground_inv', 'assets/tm_ground_inv.png', 8, 8, 32);
		//this.game.load.tilemap('level_debug_16-9', 'assets/tiles/level_debug_16-9.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level_debug_parallax', 'assets/tiles/level_debug_parallax.json', null, Phaser.Tilemap.TILED_JSON);
		//this.game.load.tilemap('level_testing', 'assets/tiles/level_testing.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_proto_1', 'assets/tiles/level_proto_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_proto_2', 'assets/tiles/level_proto_2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_proto_3', 'assets/tiles/level_proto_3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_proto_4', 'assets/tiles/level_proto_4.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_proto_5', 'assets/tiles/level_proto_5.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_showcase', 'assets/tiles/level_showcase.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('bg_mtn_front', 'assets/bg_mtn_front.png');
		this.game.load.image('bg_mtn_back', 'assets/bg_mtn_back.png');
		this.game.load.image('bg_sky_sun', 'assets/bg_sky_sun.png');
		this.game.load.image('juiceMeter', 'assets/juiceMeter.png');
		this.game.load.image('stone', 'assets/stone.png');
		this.game.load.image('laser', 'assets/laser.png');
		this.game.load.image('mea_crystal_glow', 'assets/mea_crystal_glow.png');
		this.game.load.image('moving_platform_16', 'assets/moving_platform_16.png');
	}

	create() {
		this.game.state.start("Main");
	}

}

export default Preload;
