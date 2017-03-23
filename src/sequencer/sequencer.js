import midi from "../midi/midi"

const transport = {
	timing: 0,
	currentStepIdx: 0,
	timer: null
}

const getTiming = (bpm, bpb, ticks) => {
	const timing = (60 * 1000) / (bpm * (ticks / bpb));
	return timing;
}

const getNote = (state) => {
	const noteIdx = state.arp[transport.currentStepIdx];
	return state.scale[noteIdx] + state.key;
}

const playNote = (state) => {
	const port = state.port;
	const noteDynamic = {
		duration: getRndInRange(state.behaviour.noteLengthRange),
		velocity: getRndInRange(state.behaviour.velocityRange),
		release:1
	}

	port.playNote(
		getNote(state), 
		1, 
		noteDynamic
	);

	transport.currentStepIdx = state.loop(transport.currentStepIdx, state.arp.length);
}

const getRndInRange = (range) => {
	const diff = range[1]-range[0];
	const maxResolution = Math.max(1000, diff);
	const multiplier = Math.floor(maxResolution / Math.ceil(diff));
	const rndScaled = Math.floor(Math.random() * (diff * multiplier));
	const rndNum = rndScaled / multiplier + range[0];

	return Number(rndNum.toFixed(1));
}

const startSequence = (state) => {
	if(state.transport){ return false }

	const bpm = state.behaviour.bpm;
	const ticks = state.behaviour.ticks;
	const bpb = state.behaviour.bpb;

	transport.timing = getTiming(bpm, bpb, ticks);

	transport.timer = setInterval(() => {
		playNote(state);
	}, transport.timing);

	return true;
}

const stopSequence = () => {
	clearInterval(transport.timer);
	transport.timer = null;
}

export default { startSequence, stopSequence, getTiming, getRndInRange }