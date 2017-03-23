import behaviour from '../_state/behaviour'
import scales from '../_config/scales'
import arps from '../_config/arps'
import loopTypes from '../_config/loop_types'
import midi from "../midi/midi"

export default () => {
	const chosenPort = document.getElementById('ports').value;
	const chosenScale = document.getElementById('scales').value;
	const chosenArp = document.getElementById('arps').value;
	const chosenLoopType = document.getElementById('loop-types').value;

	if(chosenPort !== '' && chosenScale !== ''&& chosenArp !== ''){
		return {
			scale:scales[chosenScale].sequence, 
			arp:arps[chosenArp].sequence,
			loop:loopTypes[chosenLoopType].loop,
			port: midi.getPorts(chosenPort), 
			behaviour: behaviour(),
			key: 55
		}
	} else {
		return false;
	}
}	