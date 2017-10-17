import Boot from 'states/Boot';
import Preload from 'states/Preload';
import Main from 'states/Main';

class Game extends Phaser.Game {

	constructor() {
		super(320, 184, Phaser.CANVAS, 'mea', null, false, false);
		this.state.add('Boot', Boot, false);
		this.state.add('Preload', Preload, false);
		this.state.add('Main', Main, false);
		this.state.start('Boot');
	}
}

new Game();
