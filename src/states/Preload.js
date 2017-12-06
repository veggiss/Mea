class Preload extends Phaser.State {

	preload() {
		// Sprite animations
		this.game.load.spritesheet('player', 'assets/player/player.png', 13, 16, 13);
		this.game.load.spritesheet('mea', 'assets/mea/mea.png', 8, 8, 4);
		this.game.load.spritesheet('mea_fem', 'assets/mea/mea_fem.png', 8, 8, 4);
		this.game.load.spritesheet('button', 'assets/world/objects/button.png', 8, 2, 2);
		this.game.load.spritesheet('door', 'assets/world/objects/door.png', 14, 20, 11);
		this.game.load.spritesheet('enemy_moving', 'assets/enemy/enemy_moving.png', 13, 11, 8);
		this.game.load.spritesheet('enemy_flying', 'assets/enemy/enemy_flying.png', 16, 16, 5);
		this.game.load.spritesheet('catapult_vertical', 'assets/world/objects/catapult_vertical.png', 11, 5, 5);
		this.game.load.spritesheet('catapult_horizontal', 'assets/world/objects/catapult_horizontal.png', 5, 11, 5);
		this.game.load.spritesheet('spikes', 'assets/enemy/spikes.png', 4, 6, 4);
		this.game.load.spritesheet('tm_mtn', 'assets/world/tm_mtn.png', 8, 8, 36);
		this.game.load.spritesheet('tm_ground', 'assets/world/tm_ground.png', 8, 8, 32);
		this.game.load.spritesheet('tm_ground_inv', 'assets/world/tm_ground_inv.png', 8, 8, 32);
		this.game.load.spritesheet('sea', 'assets/world/bg/sea.png', 8, 8, 2);

		// Maps
		this.game.load.tilemap('level_intro_scene', 'assets/tiles/level_intro_scene.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_outro_scene', 'assets/tiles/level_outro_scene.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_1', 'assets/tiles/level_1.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_2', 'assets/tiles/level_2.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_3', 'assets/tiles/level_3.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_4', 'assets/tiles/level_4.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_5', 'assets/tiles/level_5.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_6', 'assets/tiles/level_6.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_7', 'assets/tiles/level_7.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_8', 'assets/tiles/level_8.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_9', 'assets/tiles/level_9.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_10', 'assets/tiles/level_10.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_11', 'assets/tiles/level_11.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.tilemap('level_12', 'assets/tiles/level_12.json', null, Phaser.Tilemap.TILED_JSON);

		// Sprites
		this.game.load.image('bg_mtn_front', 'assets/world/bg/bg_mtn_front.png');
		this.game.load.image('bg_mtn_back', 'assets/world/bg/bg_mtn_back.png');
		this.game.load.image('bg_sky_sun', 'assets/world/bg/bg_sky_sun.png');
		this.game.load.image('boat', 'assets/world/bg/boat.png');
		this.game.load.image('tree', 'assets/world/bg/tree.png');
		this.game.load.image('juiceMeter', 'assets/mea/juiceMeter.png');
		this.game.load.image('stone', 'assets/world/objects/stone.png');
		this.game.load.image('laser', 'assets/enemy/laser.png');
		this.game.load.image('beam', 'assets/enemy/beam.png');
		this.game.load.image('lasercannon', 'assets/enemy/lasercannon.png');
		this.game.load.image('arrowdown', 'assets/world/objects/arrowdown.png');
		this.game.load.image('trigger', 'assets/trigger.png');
		this.game.load.image('moving_platform_16', 'assets/world/objects/moving_platform_16.png');

		// Sounds
		// Music
		this.game.load.audio('music_intro', 'assets/sound/music_intro.ogg');
		this.game.load.audio('music_loop', 'assets/sound/music_loop.ogg');
		// Player
		this.game.load.audio('sound_step_1', 'assets/sound/player/step_1.ogg');
		this.game.load.audio('sound_step_2', 'assets/sound/player/step_2.ogg');
		this.game.load.audio('sound_step_3', 'assets/sound/player/step_3.ogg');
		this.game.load.audio('sound_jump', 'assets/sound/player/jump.ogg');
		this.game.load.audio('sound_player_death', 'assets/sound/player/death.ogg');
		// Door
		this.game.load.audio('sound_opening', 'assets/sound/door/opening.ogg');
		this.game.load.audio('sound_ending', 'assets/sound/door/ending.ogg');
		this.game.load.audio('sound_passed', 'assets/sound/door/passed.ogg');
		// Button
		this.game.load.audio('sound_activate', 'assets/sound/button/activate.ogg');
		// Enemy
		this.game.load.audio('sound_enemy_death', 'assets/sound/enemy/death.ogg');
		// Mea
		this.game.load.audio('sound_carry', 'assets/sound/mea/carry.ogg');

		// Font
		this.game.load.bitmapFont('font', 'assets/font/font.png', 'assets/font/font.xml');
	}

	create() {
		this.game.state.start("Main");
	}

}

export default Preload;
