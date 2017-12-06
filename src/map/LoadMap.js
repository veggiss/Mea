import Stone from 'objects/world/Stone';
import Enemy_Moving from 'objects/enemy/Enemy_Moving';
import Enemy_Flying from 'objects/enemy/Enemy_Flying';
import Button from 'objects/world/Button';
import Door from 'objects/world/Door';
import Catapult_Vertical from 'objects/world/Catapult_Vertical';
import Catapult_Horizontal from 'objects/world/Catapult_Horizontal';
import Laser from 'objects/enemy/Laser';
import Spikes from 'objects/enemy/Spikes';
import Boat from 'objects/world/Boat';
import Decor from 'objects/world/Decor';
import MeaFem from 'objects/mea/MeaFem';
import Moving_Platform_16 from 'objects/world/Moving_Platform_16';

class LoadMap extends Phaser.Tilemap {
	constructor(game, key, width, height) {
		super(game, key);

		this.game.world.setBounds(0, 0, width, height);

		this.addTilesetImage('tm_ground');
		this.addTilesetImage('tm_ground_inv');
		this.addTilesetImage('tm_mtn');
		this.addTilesetImage('sea');
		this.setCollisionBetween(1, 3200);

		this.groundLayer = this.createLayer('groundLayer');
		this.bgLayer = this.createLayer('bgLayer');

		this.groundLayer.resizeWorld();
		this.bgLayer.resizeWorld();

		this.obj_decor = this.game.add.group();
		this.obj_door = this.game.add.group();
		this.obj_stone = this.game.add.group();
		this.obj_enemy_moving = this.game.add.group();
		this.obj_enemy_flying = this.game.add.group();
		this.obj_button = this.game.add.group();
		this.obj_catapult = this.game.add.group();
		this.obj_laser = this.game.add.group();
		this.obj_spikes = this.game.add.group();
		this.obj_moving_platform = this.game.add.group();
		this.obj_boat = this.game.add.group();
		this.startPos = this.game.add.group();
		this.mea_fem = this.game.add.group();

		this.allObjects = [this.obj_stone, this.obj_enemy_moving, this.obj_enemy_flying, 
		this.obj_button, this.obj_door, this.obj_catapult, this.obj_laser, this.obj_spikes, 
		this.obj_moving_platform, this.obj_boat, this.obj_decor, this.startPos];

		this.loadObjects();

		return this;
	}

	loadObjects() {
		this.createFromObjects('objectLayer', 'tree', 'tree', 0, true, true, this.obj_decor, Decor);
		this.createFromObjects('objectLayer', 'door', 'door', 0, true, true, this.obj_door, Door);
		this.createFromObjects('objectLayer', 'stone', 'stone', 0, true, true, this.obj_stone, Stone);
		this.createFromObjects('objectLayer', 'enemy_moving', 'enemy_moving', 0, true, true, this.obj_enemy_moving, Enemy_Moving);
		this.createFromObjects('objectLayer', 'enemy_flying', 'enemy_flying', 0, true, true, this.obj_enemy_flying, Enemy_Flying);
		this.createFromObjects('objectLayer', 'button', 'button', 0, true, true, this.obj_button, Button);
		this.createFromObjects('objectLayer', 'catapult_vertical', 'catapult_vertical', 0, true, true, this.obj_catapult, Catapult_Vertical);
		this.createFromObjects('objectLayer', 'catapult_horizontal', 'catapult_horizontal', 0, true, true, this.obj_catapult, Catapult_Horizontal);
		this.createFromObjects('objectLayer', 'spikes', 'spikes', 0, true, true, this.obj_spikes, Spikes);
		this.createFromObjects('objectLayer', 'moving_platform', 'moving_platform_16', 0, true, true, this.obj_moving_platform, Moving_Platform_16);
		this.createFromObjects('objectLayer', 'startPos', 'trigger', 0, false, false, this.startPos);
		this.createFromObjects('objectLayer', 'boat', 'boat', 0, true, true, this.obj_boat, Boat);
		this.createFromObjects('objectLayer', 'laser', 'laser', 0, true, true, this.obj_laser, Laser);
		this.createFromObjects('objectLayer', 'mea_fem', 'mea_fem', 0, true, true, this.mea_fem, MeaFem);
	}
}

export default LoadMap;