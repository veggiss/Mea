class Boot extends Phaser.State {
	preload() {
		console.log("%cVersion: alpha", "color:black; background:yellow");
	}

	create() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
		Phaser.Canvas.setSmoothingEnabled(this.game.canvas, false);
  		/*this.game.forceSingleUpdate = true;*/
		//PIXI.scaleModes.DEFAULT = PIXI.scaleModes.NEAREST;
		this.game.state.start("Preload");
	}

}

export default Boot;
