import webMidi from "../../node_modules/webmidi/webmidi.min"

const errorMessage = 'MIDI error';

const initialize = () => {
	return new Promise ((resolve, reject) => {
		webMidi.enable(() => {
			console.log('resolving soon');
			resolve(webMidi);
		});	
	})
}

const play = (portId, note, duration, velocity) => {
	const output = webMidi.getOutputById(portId);

	output.playNote(note, 1 , {
		velocity,
		duration
	});
}

export default { play, initialize }