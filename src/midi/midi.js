import webMidi from "../../node_modules/webmidi/webmidi.min"

const errorMessage = 'MIDI error';
let ports = null;
let oldInputPort = null;
let lastTimestamps = [];
let lastTimestamp = null;
const clockAverageOver = 96;


const getPorts = (id) => {
	return id ? ports[id] : ports;
}

const getAverageTimeBetweenClocks = (clockTimeArray) => {
	const cumulative = [...clockTimeArray].reduce(function(a, b) { return a + b; }, 0);
	const len = clockTimeArray.length;

	return cumulative / len;
}

const getBPMFromClockInterval = (interval) => {
	return Number(((1000*60)/(interval*24)).toFixed(1));
}

const monitorClock = (clockEvent) => {
		let cumulative;
    if(lastTimestamp){
    	lastTimestamps.push(clockEvent.timestamp - lastTimestamp);

    	cumulative = getAverageTimeBetweenClocks([...lastTimestamps]);
    
    	if(lastTimestamps.length > clockAverageOver){
    		lastTimestamps.splice(0, 1);
    	}
  	}
  	lastTimestamp = clockEvent.timestamp;
  	return cumulative ? getBPMFromClockInterval(cumulative) : null;
}

const monitorInput = (portNum, cb, superState) => {
	const input = webMidi.inputs[portNum];
	const tolerance = 0.3;
	if(oldInputPort){
		oldInputPort.removeListener('clock', "all");
	}
	
	input.addListener('clock', "all", (e) => {
		const accurateBpm = monitorClock(e) || 0;
		const masterBpm = superState.retrieve('masterClock');
		if(Math.abs(masterBpm - accurateBpm) > tolerance){
			cb(accurateBpm);
		}
	});
	oldInputPort = input;
}

const initialize = () => {
	return new Promise ((resolve, reject) => {
		webMidi.enable(() => {
			ports = webMidi.outputs;
			resolve(webMidi);
		});	
	})
};

export default {  initialize, getPorts, getAverageTimeBetweenClocks, monitorInput }