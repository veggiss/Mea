class levelEvents_test{
	constructor(level) {
		this.level = level;
		this.game = level.game;
	}

	update() {
		this.updateButton();
	}

	updateButton() {
		let activated = 0;

		if (!this.allActivated) {
			this.level.map.obj_button.forEach(obj => {
				if (obj.activated) {
					activated++;
				}

				if(activated >= this.level.map.obj_button.length) {
					this.allActivated = true;
					this.level.map.obj_door.getChildAt(0).startAnim();
				}
			}, this);
		}
	}
}

export default levelEvents_test;