class levelEvents_test{
	constructor(level) {
		this.level = level;
		this.game = level.game;
		this.buttons = [];
		this.level.map.obj_button.forEach(obj => {
			this.buttons.push(obj);
		});
	}

	update() {
		this.updateButton();
	}


}

export default levelEvents_test;