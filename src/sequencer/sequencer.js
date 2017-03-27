import midi from "../midi/midi"
import getState from '../_state/state'

let transport = {};

const initTransport = () => {
	transport = {
		timing: 0,
		currentStepIdx: 0,
		currentTickIdx:0,
		currentLoopIdx: 0,
		timer: null
	}
	return transport;
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
	const rndDur = Math.floor(getRndInRange(state.durationRange));
	const rndVel = Math.floor(getRndInRange(state.velocityRange))/1000;
	const rndChance = Math.floor(Math.random() * 100) + 1;

	setBpm(state.bpm,state.bpb, state.ticks);

	const noteDynamic = {
		duration: rndDur,
		velocity: rndVel,
		release:1
	}

	if(rndChance < state.chance){
		port.playNote(
			getNote(state),
			1, 
			noteDynamic
		);
	}
}

const toogleFreezeLoop = (i) => {
	if(i === transport.currentLoopIdx){
		transport.freeze=false;
	}else{
		transport.currentLoopIdx=i;
		transport.freeze=true;
	}

	return transport.freeze;
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

const getNextIdx = (loopsLength, currentIdx) => {
	if ( currentIdx < (loopsLength - 1) ){
		return currentIdx += 1; 
	} else {
		return 0;
	}
}

const updateUI = (loopIdx, tickIdx, liveState) => {
	liveState.update({
		currentTickCoord: [loopIdx,tickIdx]
	})
}

const startTimeout = (transport, liveState) => {
	const state = liveState.loops[transport.currentLoopIdx ];

	setBpm(state.bpm, state.bpb, state.ticks);

	transport.timer = setTimeout(() => {
		playNote(state);
		updateUI(transport.currentLoopIdx, transport.currentTickIdx, liveState);

		transport.currentStepIdx = state.loop(transport.currentStepIdx, state.arp.length);
		transport.currentTickIdx = getNextIdx(state.ticks, transport.currentTickIdx);
		transport.currentLoopIdx = transport.currentTickIdx === 0 && !transport.freeze ? getNextIdx(liveState.loops.length, transport.currentLoopIdx) : transport.currentLoopIdx;

		startTimeout(transport, liveState);
	}, transport.timing);
}

const startSequence = (liveState) => {
	startTimeout(transport, liveState);
	
	return true;
}

const stopSequence = () => {
	clearTimeout(transport.timer);
	initTransport();
}

export default { startSequence, stopSequence, getTiming, getRndInRange, toogleFreezeLoop }