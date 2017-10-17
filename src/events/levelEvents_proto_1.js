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

	updateButton() {
		let activated = 0;

		this.buttons.forEach(obj => {
			if (obj.activated) {
				activated++;
			}

			if (activated === this.buttons.length) {
				console.log("lol");
			}
		});
	}
}

export default levelEvents_test;