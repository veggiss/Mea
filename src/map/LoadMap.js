import Stone from 'objects/Stone';
import Enemy_Moving from 'objects/Enemy_Moving';
import Button from 'objects/Button';
import Door from 'objects/Door';

class LoadMap extends Phaser.Tilemap {
	constructor(game, key, width, height) {
		super(game, key);

		this.game.world.setBounds(0, 0, width, height);

		this.addTilesetImage('tm_ground');
		this.addTilesetImage('tile_bg');
		this.setCollisionBetween(1, 32);

		this.groundLayer = this.createLayer('groundLayer');
		this.bgLayer = this.createLayer('bgLayer');

		this.groundLayer.resizeWorld();
		this.bgLayer.resizeWorld();

		this.obj_stone = this.game.add.group();
		this.obj_enemy_moving = this.game.add.group();
		this.obj_button = this.game.add.group();
		this.obj_door = this.game.add.group();

		this.allObjects = [this.obj_stone, this.obj_enemy_moving, this.obj_button, this.obj_door];

		this.loadObjects();

		return this;
	}

	loadObjects() {
		this.createFromObjects('objectLayer', 129, 'stone', 0, true, true, this.obj_stone, Stone);
		this.createFromObjects('objectLayer', 130, 'moving_enemy', 0, true, true, this.obj_enemy_moving, Enemy_Moving);
		this.createFromObjects('objectLayer', 138, 'button', 0, true, true, this.obj_button, Button);
		this.createFromObjects('objectLayer', 149, 'door', 0, true, true, this.obj_door, Door);
	}
}

export default LoadMap;