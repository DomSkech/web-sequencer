import midi from "../midi/midi"
import getState from '../_state/state'

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

const playNote = () => {
	const state = getState();
	const port = state.port;
	const rndDur = Math.floor(getRndInRange(state.durationRange));
	const rndVel = Math.floor(getRndInRange(state.velocityRange))/1000;
	const rndChance = Math.floor(Math.random() * 100) + 1;

	setBpm(state.bpm,state.bpb, state.ticks);

	const noteDynamic = {
		duration: rndDur,
		velocity: rndVel,
		release:1
	}

	console.log(rndChance, state.key)

	if(rndChance < state.chance){
		port.playNote(
			getNote(state),
			1, 
			noteDynamic
		);
	}

	transport.currentStepIdx = state.loop(transport.currentStepIdx, state.arp.length);
}

const getRndInRange = (range) => {
	const diff = range[1]-range[0];

	if(diff===0) return range[0];

	const maxResolution = Math.max(1000, diff);
	const multiplier = Math.floor(maxResolution / Math.ceil(diff));
	const rndScaled = Math.floor(Math.random() * (diff * multiplier));
	const rndNum = rndScaled / multiplier + range[0];

	return Number(rndNum.toFixed(1));
}

const setBpm = (bpm, bpb, ticks) => {
	transport.timing = getTiming(bpm, bpb, ticks);
}

const startInterval = () => {
	transport.timer = setTimeout(() => {
		playNote();
		startInterval();
	}, transport.timing);
}

const startSequence = () => {
	const state = getState();

	setBpm(state.bpm,state.bpb, state.ticks);
	startInterval(transport);
	
	return true;
}

const stopSequence = () => {
	clearTimeout(transport.timer);
	transport.timer = null;
}

export default { startSequence, stopSequence, getTiming, getRndInRange }