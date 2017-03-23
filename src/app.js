import React from 'react';
import ReactDOM from 'react-dom';
import { SelectFromArray, SelectFromObject } from "./select/select"
import Button from "./button/button"
import midi from "./midi/midi"
import behaviour from './_state/behaviour'
import scales from './_config/scales'
import arps from './_config/arps'
import loopTypes from './_config/loop_types'

midi
.initialize()
.then((midiStream) => {

	ReactDOM.render(
		<div>
		 	<SelectFromArray items={midiStream.outputs} id="ports" valProp="id" nameProp="name" prompt="Choose midi port..." />
		 	<SelectFromObject items={scales} id="scales" nameProp="name" prompt="Choose scale..." />
		 	<SelectFromObject items={arps} id="arps" nameProp="name" prompt="Choose arp type..." />
		 	<SelectFromObject items={loopTypes} id="loop-types" nameProp="name" prompt="Choose loop type..." />
		 	<Button />
		</div>,
	  document.getElementById('dom')
	);
});

