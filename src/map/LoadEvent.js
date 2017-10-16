import levelEvents_test from 'events/levelEvents_test';
import levelEvents_test2 from 'events/levelEvents_test2';

class EventLoader {
	constructor(level) {
		let event;

		if (level.mapName == "level_objectPool") {
			event = new levelEvents_test(level);
		} else if (level.mapName == "level_test") {
			event = new levelEvents_test2(level);
		}

		return event;
	}
}

export default EventLoader;