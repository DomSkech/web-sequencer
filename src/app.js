import React from 'react';
import ReactDOM from 'react-dom';
import { SelectFromArray, SelectFromObject, SliderFromObject } from "./form_elements/form_elements"
import { PlayButton, StopButton } from "./button/button"
import midi from "./midi/midi"
import behaviour from './_state/behaviour'
import scales from './_config/scales'
import arps from './_config/arps'
import loopTypes from './_config/loop_types'
import durationRange from './_config/note_length_range'
import css from './main.css'

midi
.initialize()
.then((midiStream) => {
	ReactDOM.render(
		<div className="bg">
		 	<SelectFromArray className="block" items={midiStream.outputs} id="ports" valProp="id" nameProp="name" prompt="Choose midi port..." />
		 	<SelectFromObject className="block" items={scales} id="scales" nameProp="name" prompt="Choose scale..." />
		 	<SelectFromObject className="block" items={arps} id="arps" nameProp="name" prompt="Choose arp type..." />
		 	<SelectFromObject className="block" items={loopTypes} id="loop-types" nameProp="name" prompt="Choose loop type..." />
		 	<div className="spread">
		 		<SliderFromObject className="block wrapper" item={durationRange.lower} id="min-duration" nameProp="name" prompt="Min duration" />
			 	<SliderFromObject className="block wrapper" item={durationRange.higher} id="max-duration" nameProp="name" prompt="Max duration" />
		 	</div>
		 	<div className="spread">
			 	<PlayButton className="block" />
			 	<StopButton className="block" />
		 	</div>
		</div>,
	  document.getElementById('dom')
	);
});

