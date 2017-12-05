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
		this.eventFired = [];
		this.levelMaps = ["level_intro_scene", "level_1", "level_2", "level_3", "level_4", "level_5", "level_6", "level_7", "level_8", "level_9"];

		// Main characters
		this.player = new Player(this.game);
		this.mea = new Mea(this.game);

		// Sound
		this.sound_passed = this.game.add.audio('sound_passed');
		this.sound_passed.volume = 0.4;

		// Bitmap texts
		this.bitmapText_intro = this.game.add.bitmapText(this.game.width/2 + 25,this.game.height/2 - 50, 'font', '', 10);
		this.bitmapText_dialog = this.game.add.bitmapText(this.game.width/2 + 25,this.game.height/2 - 30, 'font', '', 5);
		this.dialog = this.game.add.group();
		this.dialog.add(this.bitmapText_intro);
		this.dialog.add(this.bitmapText_dialog);

		//Load level
		this.loadCurrentLevel();
		this.player.cursors.down.onDown.add(this.checkDoor, this);
		
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

	startNextLevel() {
		this.nextLevelStarted = false;
		this.currentLevel++;
		this.player.unlockPlayer();
		this.loadCurrentLevel();
		this.fadeFromBlack(1000);
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
		this.game.world.bringToTop(this.dialog);
		this.level.resetPlayerPos();

		if(this.currentLevel == 0) {
			this.level_intro_events();
		} else if (this.currentLevel == 3) {
			this.level_3_events();
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

	level_reset_events() {
		if (this.player && this.currentLevel != 0) {
			this.player.activated = true;
		}

		if(this.currentLevel == 3) {
			this.level_3_events();
		}
	}

	level_update_events() {
		if(this.currentLevel == 3 && (!this.eventFired[0] || !this.eventFired[1])) {
			if (this.player.body.x > 185 && !this.eventFired[0]) {
				this.bitmapText_dialog.x = this.mea.body.x - (this.bitmapText_dialog.width/2);
				this.bitmapText_dialog.y = this.mea.body.y - 10;				
				this.bitmapText_dialog.text = '[space] might get you there';
				this.eventFired[0] = true;
			} else if (this.eventFired[0] && !this.eventFired[1]) {
				this.bitmapText_dialog.x = this.mea.body.x - (this.bitmapText_dialog.width/2);
				this.bitmapText_dialog.y = this.mea.body.y - 10;
				if (this.mea.gravKey.isDown) {
					this.eventFired[1] = true;
					this.game.add.tween(this.bitmapText_dialog).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 1000);
				}
			}
		}
	}
}

export default Main;

