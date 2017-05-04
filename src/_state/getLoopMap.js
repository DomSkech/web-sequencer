import midi from "../midi/midi"
import settings from '../_config/settings'
import scales from '../_config/scales'
import arps from '../_config/arps'
import loopTypes from '../_config/loop_types'

const getLoopMap = (bar) => {
	const port = midi.getPorts(bar.port);
	const scale = scales[bar.scale].sequence;
	const arp = arps[bar.arp].sequence;
	const loopType = loopTypes[bar.loop].loop;

	return {
		scale:scale, 
		arp:arp,
		loopType:loopType,
		port: port, 
		channel: bar.channel,
		channelRange: bar.channelRange,
		durationRange: bar.durationRange,
		velocityRange: bar.velocityRange,
		bpb: Number(settings.time[bar.time].bpb),
		ticks: Number(settings.time[bar.time].ticks),
		muted: bar.muted || {},
		chance: Number(bar.chance),
		bpm: Number(bar.bpm),
		key: Number(bar.key),
	}
}

export default getLoopMap;