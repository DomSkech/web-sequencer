import midi from "../midi/midi"
import settings from '../_config/settings'
import scales from '../_config/scales'
import arps from '../_config/arps'
import loopTypes from '../_config/loop_types'

const getLoopMap = (loop) => {
	const port = midi.getPorts(loop.port);
	const scale = scales[loop.scale].sequence;
	const arp = arps[loop.arp].sequence;
	const loopType = loopTypes[loop.loop].loop;

	return {
		scale:scale, 
		arp:arp,
		loopType:loopType,
		port: port, 
		durationRange: loop.durationRange,
		velocityRange: loop.velocityRange,
		bpb: Number(settings.time[loop.time].bpb),
		ticks: Number(settings.time[loop.time].ticks),
		chance: Number(loop.chance),
		bpm: Number(loop.bpm),
		key: Number(loop.key),
	}
}

export default getLoopMap;