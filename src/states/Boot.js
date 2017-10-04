class Boot extends Phaser.State {
	preload() {
		console.log("%cVersion: proto", "color:white; background:red");
	}

	create() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
  		/*this.game.forceSingleUpdate = true;
		Phaser.Canvas.setSmoothingEnabled(this.game.canvas, false);
		PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;*/
		this.game.state.start("Preload");
	}

}

export default Boot;
