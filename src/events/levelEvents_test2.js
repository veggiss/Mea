class levelEvents_test2{
	constructor(level) {
		this.level = level;
		this.game = level.game;
		this.player = level.player;
	}

	update() {
		this.testing();
	}

	testing() {
		if (this.player.x > 500) {
			console.log("lolol");
		}
	}
}

export default levelEvents_test2;