import getLoopMap from '../_state/getLoopMap'

let transport = {};

const initTransport = () => {
	transport = {
		timing: 0,
		currentStepIdx: 0,
		currentTickIdx:0,
		currentBarIdx: 0,
		ticksSinceBpmChange:0,
		currentBpm:null,
		timer: null
	}
	return transport;
}

initTransport();

const getTiming = (bpm, bpb, ticks) => {
	const timing = (60 * 1000) / (bpm * (ticks / bpb));
	return timing;
}

const getNote = (mappedState) => {
	const noteIdx = mappedState.arp[transport.currentStepIdx];
	return mappedState.scale[noteIdx] + mappedState.key;
}

const playNote = (mappedState, superState) => {
	const isMuted = mappedState.muted[transport.currentTickIdx];

	if(isMuted) return;

	const port = mappedState.port;
	const rndDur = Math.floor(getRndInRange(mappedState.durationRange));
	const rndVel = Math.floor(getRndInRange(mappedState.velocityRange))/1000;
	const rndChance = Math.floor(Math.random() * 100) + 1;

	setBpm(mappedState, superState);

	const noteDynamic = {
		duration: rndDur,
		velocity: rndVel,
		release:1
	}

	if(rndChance < mappedState.chance){
		port.playNote(
			getNote(mappedState),
			1, 
			noteDynamic
		);
	}
}

const toogleFreezeLoop = (i) => {
	if(i === transport.currentBarIdx){
		transport.freeze=false;
	}else{
		transport.currentBarIdx=i;
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

const setBpm = ({bpm, bpb, ticks}, superState) => {

	const usedBpm = superState.retrieve('useMasterClock') ? superState.retrieve('masterClock') : bpm;
	const newTiming = getTiming(usedBpm, bpb, ticks);

	if(newTiming !== transport.timing){
		transport.timing = newTiming;
		transport.ticksSinceBpmChange = 0;
		resetMillis();
	}
	transport.currentBpm = bpm;
}

const getNextIdx = (length, currentIdx) => {
	if ( currentIdx < (length - 1) ){
		return currentIdx += 1; 
	} else {
		return 0;
	}
}

const updateUI = (barIdx, tickIdx, superState) => {
	superState.update({
		currentTickCoord: [barIdx,tickIdx]
	});
}

const resetMillis = () => {
	transport.millis = performance.now();
}

const executeBeat = (transport, superState, mappedState) => {
	const newTime = performance.now();
	const scheduledTimes = (newTime - transport.millis)/transport.ticksSinceBpmChange

	if(transport.timing <= scheduledTimes){
		playNote(mappedState, superState);
		updateUI(transport.currentBarIdx, transport.currentTickIdx, superState);

		transport.currentStepIdx = mappedState.loopType(transport.currentStepIdx, mappedState.arp.length);
		transport.currentTickIdx = getNextIdx(mappedState.ticks, transport.currentTickIdx);
		transport.ticksSinceBpmChange += 1;

		if (transport.currentTickIdx === 0 && !transport.freeze) {
			transport.currentBarIdx = getNextIdx(superState.retrieve('bars').length, transport.currentBarIdx);
		}
	}
	startTimeout(transport, superState);
}

const startTimeout = (transport, superState) => {
	const mappedState = getLoopMap(superState.retrieve('bars')[transport.currentBarIdx]);
	transport.timer = setTimeout(() => {
		executeBeat(transport, superState, mappedState);
	}, 1);
}

const startSequence = (superState) => {	
	stopSequence();
	resetMillis();
	startTimeout(transport, superState);
	return true;
}

const stopSequence = () => {
	clearTimeout(transport.timer);
	transport.timer = null;
	initTransport();
}

export default { startSequence, stopSequence, getTiming, getRndInRange, toogleFreezeLoop }