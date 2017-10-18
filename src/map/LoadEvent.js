import levelEvents_proto_1 from 'events/levelEvents_proto_1';

class EventLoader {
	constructor(level) {
		let event;

		if (level.mapName == "level_showcase") {
			event = new levelEvents_proto_1(level);
		}

		return event;
	}
}

export default EventLoader;