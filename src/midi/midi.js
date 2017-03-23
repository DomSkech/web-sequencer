import webMidi from "../../node_modules/webmidi/webmidi.min"

const errorMessage = 'MIDI error';
let ports = null;

const getPorts = (id) => {
	return id ? ports[id] : ports;
}

const initialize = () => {
	return new Promise ((resolve, reject) => {
		webMidi.enable(() => {
			console.log(webMidi.outputs)
			ports = webMidi.outputs;
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
console.log(ports);
export default { play, initialize, getPorts }