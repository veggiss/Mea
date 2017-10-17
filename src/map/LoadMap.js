import Stone from 'objects/Stone';
import Enemy_Moving from 'objects/Enemy_Moving';
import Enemy_Flying from 'objects/Enemy_Flying';
import Button from 'objects/Button';
import Door from 'objects/Door';

class LoadMap extends Phaser.Tilemap {
	constructor(game, key, width, height) {
		super(game, key);

		this.game.world.setBounds(0, 0, width, height);

		this.addTilesetImage('tm_ground');
		this.addTilesetImage('tm_ground_inv');
		this.setCollisionBetween(1, 3200);

		this.groundLayer = this.createLayer('groundLayer');
		this.bgLayer = this.createLayer('bgLayer');

		this.groundLayer.resizeWorld();
		this.bgLayer.resizeWorld();

		this.obj_stone = this.game.add.group();
		this.obj_enemy_moving = this.game.add.group();
		this.obj_enemy_flying = this.game.add.group();
		this.obj_button = this.game.add.group();
		this.obj_door = this.game.add.group();
		this.startPos = this.game.add.group();

		this.allObjects = [this.obj_stone, this.obj_enemy_moving, this.obj_enemy_flying, this.obj_button, this.obj_door, this.startPos];

		this.loadObjects();

		return this;
	}

	loadObjects() {
		this.createFromObjects('objectLayer', 'stone', 'stone', 0, true, true, this.obj_stone, Stone);
		this.createFromObjects('objectLayer', 'enemy_moving', 'enemy_moving', 0, true, true, this.obj_enemy_moving, Enemy_Moving);
		this.createFromObjects('objectLayer', 'enemy_flying', 'enemy_flying', 0, true, true, this.obj_enemy_flying, Enemy_Flying);
		this.createFromObjects('objectLayer', 'button', 'button', 0, true, true, this.obj_button, Button);
		this.createFromObjects('objectLayer', 'door', 'door', 0, true, true, this.obj_door, Door);
		this.createFromObjects('objectLayer', 'startPos', null, 0, false, false, this.startPos);
	}
}

export default LoadMap;