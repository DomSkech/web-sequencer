import scales from '../_config/scales'
import arps from '../_config/arps'
import loopTypes from '../_config/loop_types'
import settings from '../_config/settings'
import midi from "../midi/midi"

export default () => {
	const chosenPort = document.getElementById('ports').value;
	const chosenScale = document.getElementById('scales').value;
	const chosenArp = document.getElementById('arps').value;
	const chosenLoopType = document.getElementById('loop-types').value;
	const minDuration = document.getElementById('min-duration').value;
	const maxDuration = document.getElementById('max-duration').value;
	const minVelocity = document.getElementById('min-velocity').value;
	const maxVelocity = document.getElementById('max-velocity').value;
	const chosenTime = document.getElementById('time').value;
	const chance = document.getElementById('chance').value;
	const bpm = document.getElementById('bpm').value;
	const key = document.getElementById('key').value;

	if(chosenPort !== '' && chosenScale !== ''&& chosenArp !== ''){
		return {
			scale:scales[chosenScale].sequence, 
			arp:arps[chosenArp].sequence,
			loop:loopTypes[chosenLoopType].loop,
			port: midi.getPorts(chosenPort), 
			durationRange: [Number(minDuration),Number(maxDuration)],
			velocityRange: [Number(minVelocity),Number(maxVelocity)],
			bpb: settings.time[chosenTime].bpb,
			ticks: settings.time[chosenTime].ticks,
			chance: Number(chance),
			bpm,
			key: Number(key)
		}
	} else {
		return false;
	}
}	