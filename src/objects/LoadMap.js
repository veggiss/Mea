class LoadMap extends Phaser.Tilemap {
	constructor(game, key, width, height) {
		super(game, key);

		game.world.setBounds(0, 0, width, height);

		this.addTilesetImage('tm_ground');
		this.addTilesetImage('tile_bg');
		this.setCollisionBetween(1, 32);

		this.groundLayer = this.createLayer('groundLayer');
		this.bgLayer = this.createLayer('bgLayer');

		this.groundLayer.resizeWorld();
		this.bgLayer.resizeWorld();

		return this;
	}
}

export default LoadMap;