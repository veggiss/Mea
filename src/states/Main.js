import Player from 'objects/player/Player';
import Mea from 'objects/mea/Mea';
import LoadLevel from 'map/LoadLevel';

class Main extends Phaser.State {

	create() {
		this.game.stage.backgroundColor = '#b77d10';
		this.game.stage.disableVisibilityChange = false;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.level, this.levelEvent;
		this.levelLoaded = false;
		this.game.DEBUG = false;
		this.game.level_reset_events = this.level_reset_events();
		this.currentLevel = 0;
		this.nextLevelStarted = false;
		this.musicOn = true;
		this.outroTime;
		this.eventFired = [];
		this.levelMaps = ["level_intro_scene", "level_1", "level_2", "level_3", "level_4", "level_5", "level_6", "level_7", "level_8", "level_9", "level_10", "level_11", "level_12", "level_outro_scene"];

		// Main characters
		this.player = new Player(this.game);
		this.mea = new Mea(this.game);

		// Sound
		this.sound_passed = this.game.add.audio('sound_passed');
		this.music_intro = this.game.add.audio('music_intro');
		this.music_loop = this.game.add.audio('music_loop');
		this.sound_passed.volume = 0.8;
		this.music_intro.volume = 0.1;
		this.music_loop.volume = 0.1;
		this.music_loop.loop = true;
		this.music_intro.play();
		this.music_intro.onStop.add(() => {this.music_loop.play();}, this);

		// Bitmap texts
		this.bitmapText_intro = this.game.add.bitmapText(this.game.width/2 + 25,this.game.height/2 - 50, 'font', '', 10);
		this.bitmapText_dialog = this.game.add.bitmapText(this.game.width/2 + 25,this.game.height/2 - 30, 'font', '', 5);
		this.dialog = this.game.add.group();
		this.dialog.add(this.bitmapText_intro);
		this.dialog.add(this.bitmapText_dialog);

		//Load level
		this.loadCurrentLevel();
		this.player.cursors.down.onDown.add(this.checkDoor, this);
		let restartKey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
		let muteKey = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
		restartKey.onDown.add(this.restartKeyEvent, this);
		muteKey.onDown.add(this.toggleMusic, this);
		
		// Set bias and gravity
		this.game.physics.arcade.gravity.y = 450;
		this.game.physics.arcade.TILE_BIAS = 8;

		// Let camera follow player
		this.game.camera.follow(this.player, Phaser.Camera.LOCKON, 0.1, 0.1);
		this.game.camera.onFadeComplete.add(this.startNextLevel, this);
		this.game.camera.onFlashComplete.add(this.level_reset_events, this);
	}

	update() {
		if (this.level != undefined) {
			this.level.update();
			this.level_update_events();
		}
	}

	checkDoor() {
		if (this.level.map.obj_door.length > 0) {
			if (this.level.map.obj_door.getAt(0).activated) {
				this.game.physics.arcade.overlap(this.player, this.level.map.obj_door, this.nextLevel, null, this);
			}
		}
	}

	restartKeyEvent() {
		if(this.player.activated) {
			this.level.resetObjects();
		}
	}

	startNextLevel() {
		this.nextLevelStarted = false;
		this.currentLevel++;
		this.loadCurrentLevel();
		this.fadeFromBlack(1000);
		this.mea.activated = true;
		this.player.unlockPlayer();
	}

	nextLevel() {
		if (!this.nextLevelStarted && this.levelMaps.length - 1 > this.currentLevel) {
			this.sound_passed.play();
			this.nextLevelStarted = true;
			this.player.lockPlayer();
			this.camera.fade(0x000000, 1000, true);
		}
	}

	loadCurrentLevel() {
		if (this.level != undefined) {
			this.level.destroy();
			this.eventFired = [];
		}

		this.level = new LoadLevel(this.game, this.player, this.mea, this.levelMaps[this.currentLevel]);
		this.level.map.groundLayer.bringToTop();
		this.level.map.bgLayer.bringToTop();
		this.mea.bringToTop();
		this.mea.juiceMeter.bringToTop();
		this.game.world.bringToTop(this.dialog);
		this.level.resetPlayerPos();

		if(this.currentLevel == 0) {
			this.level_intro_events();
		} else if (this.currentLevel == 3) {
			this.level_3_events();
		} else if (this.currentLevel == 13) {
			this.level_outro_events();
		}
	}

	toggleMusic() {
		if (this.musicOn) {
			this.music_intro.stop();
			this.music_loop.stop();
			this.musicOn = false;
		} else {
			this.music_intro.play();
			this.musicOn = true;
		}
	}

	fadeFromBlack(duration) {
		this.camera.flash('#000000', duration, true);
	}

	level_intro_events() {
		this.game.add.tween(this.level.map.obj_boat).to({y:this.level.map.obj_boat.y - 5}, 2000, Phaser.Easing.Quadratic.InOut, true).loop(true).yoyo(true);
		this.game.world.bringToTop(this.level.map.obj_boat);
		
		this.player.playerState = 'idle';
		this.player.activated = false;
		this.level.map.bgLayer.bringToTop();
		this.fadeFromBlack(5000);
		
		this.level.bg.moveForwardBool = true;

		this.bitmapText_intro.text = 'mea';
		this.bitmapText_dialog.text = 'press [down] to continue';
		this.bitmapText_intro.alpha = 0;
		this.bitmapText_dialog.alpha = 0;
		let introTween = this.game.add.tween(this.bitmapText_intro).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1000);
		introTween.onComplete.add(() => {
			this.game.add.tween(this.bitmapText_dialog).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 1000);
			let continueBtn = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
			let nextLevelStuff = this.game.camera.onFadeComplete.add(firstNextLevel, this);
			continueBtn.onDown.add(nextLevelSpace, this);

			function nextLevelSpace() {
				continueBtn.onDown.remove(nextLevelSpace, this);
				this.sound_passed.play();
				this.camera.fade(0x000000, 1000, true);
			}

			function firstNextLevel() {
				if (this.levelMaps.length - 1 > this.currentLevel) {
					this.level.bg.moveForwardBool = false;
					this.bitmapText_intro.text = '';
					this.bitmapText_dialog.text = '';
					this.game.camera.onFadeComplete.remove(firstNextLevel, this);
				}
			}
		});
	}

	level_3_events() {
		this.bitmapText_dialog.text = '';
		this.eventFired = [false, false];
	}

	level_outro_events() {
		this.game.camera.onFadeComplete.removeAll();
		this.bitmapText_dialog.text = '';
		this.bitmapText_dialog.alpha = 1;
		this.music_loop.fadeOut(4000);
		this.outroTime = 0;
		this.eventFired = [false, false, false, false, false, false, false];
	}

	level_reset_events() {
		if (this.player && this.currentLevel != 0) {
			this.player.activated = true;
		}

		if(this.currentLevel == 3) {
			this.level_3_events();
		}
	}

	level_update_events() {
		if (this.currentLevel == 1) {
			this.game.add.tween(this.bitmapText_dialog).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false, 1000);
			this.bitmapText_dialog.x = 35;
			this.bitmapText_dialog.y = 25;
			this.bitmapText_dialog.text = '[m] to mute music';
		} else if (this.currentLevel == 2) {
			this.game.add.tween(this.bitmapText_dialog).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, false, 1000);
			this.bitmapText_dialog.text = '[r] to restart';
		} else if (this.currentLevel == 3) {
			if(this.level.map.obj_door.getAt(0).activated && (!this.eventFired[0] || !this.eventFired[1])) {
				if (this.player.body.x > 185 && !this.eventFired[0]) {
					this.bitmapText_dialog.x = 125;
					this.bitmapText_dialog.y = 50;				
					this.bitmapText_dialog.text = '[space] might get you there';
					this.eventFired[0] = true;
				} else if (this.eventFired[0] && !this.eventFired[1]) {
					if (this.mea.gravKey.isDown) {
						this.eventFired[1] = true;
						this.game.add.tween(this.bitmapText_dialog).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 1000);
					}
				}
			}
		} else if (this.currentLevel == 13) {
			if (this.player.x > 320) {
				this.player.lockPlayer();
				this.player.animations.frame = 0;
				this.mea.activated = false;
				this.mea.body.velocity.x = 0;
				this.mea.body.velocity.y = 0;
				this.bitmapText_dialog.y = 125;
				let meafem = this.level.map.mea_fem.getAt(0);
				let textX = meafem.x - Math.round((this.bitmapText_dialog.width/2));

				if (!this.eventFired[0]) {
					this.bitmapText_dialog.x = textX;
					this.bitmapText_dialog.text = 'mea!';
					this.outroTime = this.game.time.now;
					this.eventFired[0] = true;
				} else if (this.eventFired[0] && !this.eventFired[1] && this.outroTime + 2500 < this.game.time.now) {
				    this.mea.body.velocity.x = 50;
					if (this.mea.x > 375) {
						this.mea.body.velocity.x = 0;
						this.outroTime = this.game.time.now;
						this.eventFired[1] = true;
					}
				} else if (this.eventFired[1] && !this.eventFired[2] && this.outroTime + 1000 < this.game.time.now) {
					this.bitmapText_dialog.text = "";
					this.outroTime = this.game.time.now;
					this.eventFired[2] = true;
				} else if (this.eventFired[2] && !this.eventFired[3] && this.outroTime + 2500 < this.game.time.now) {
					this.mea.scale.x = 1;
					this.mea.body.velocity.x = -25;

					if (this.mea.x < 340) {
						this.outroTime = this.game.time.now;		
						this.eventFired[3] = true;
					}
				} else if (this.eventFired[3] && !this.eventFired[4] && this.outroTime + 2500 < this.game.time.now) {
					this.bitmapText_dialog.x = 320;
					this.bitmapText_dialog.text = "thank you!";
					this.outroTime = this.game.time.now;
					this.eventFired[4] = true;
				} else if (this.eventFired[4] && !this.eventFired[5] && this.outroTime + 2500 < this.game.time.now) {
					this.game.camera.fade(0x000000, 4000);
					this.currentLevel = -1;
					this.eventFired[5] = true;
				}
			}
		}
	}
}

export default Main;

