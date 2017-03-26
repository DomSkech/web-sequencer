import React from 'react';
import ReactDOM from 'react-dom';

import { SelectFromArray, SelectFromObject, SliderFromObject } from "./form_elements/form_elements"
import { PlayButton, StopButton } from "./button/button"
import midi from "./midi/midi"
import Gadget from "./gadget/gadget"
import scales from './_config/scales'
import arps from './_config/arps'
import loopTypes from './_config/loop_types'
import durationRange from './_config/note_length_range'
import settings from './_config/settings'
import velocity from './_config/velocity_range'

import css from './main.css'

class Main extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
			foo: 'bar'
		};
		this.state.update = this.updateState.bind(this);
  }

  updateState(obj){
  	this.setState(obj);
  }

  render () {
  	return (<div className="bg">
		 	<SelectFromArray className="block" items={this.props.midiStream.outputs} id="ports" valProp="id" nameProp="name" prompt="Midi port..." />
		 	<SelectFromObject className="block" items={scales} id="scales" nameProp="name" prompt="Scale..." />
		 	<SelectFromObject className="block" items={settings.key} id="key" prompt="Key..." />
		 	<SelectFromObject className="block" items={arps} id="arps" nameProp="name" prompt="Arp type..." />
		 	<SelectFromObject className="block" items={loopTypes} id="loop-types" nameProp="name" prompt="Loop type..." />
		 	<div className="spread">
		 		<SliderFromObject className="block wrapper" item={settings.bpm} id="bpm" nameProp="name" prompt="BPM" />
		 		<SelectFromObject className="block" items={settings.time} id="time" nameProp="name" prompt="Time..." />
		 	</div>
		 	<div className="spread">
		 		<SliderFromObject className="block wrapper" item={settings.chance} id="chance" nameProp="name" prompt="Chance" />
		 	</div>
		 	<div className="spread">
		 		<SliderFromObject className="block wrapper" item={durationRange.lower} id="min-duration" nameProp="name" prompt="Min duration" />
			 	<SliderFromObject className="block wrapper" item={durationRange.higher} id="max-duration" nameProp="name" prompt="Max duration" />
		 	</div>
		 	<div className="spread">
		 		<SliderFromObject className="block wrapper" item={velocity.lower} id="min-velocity" nameProp="name" prompt="Min velocity" />
			 	<SliderFromObject className="block wrapper" item={velocity.higher} id="max-velocity" nameProp="name" prompt="Max velocity" />
		 	</div>
		 	<div className="spread">
			 	<PlayButton className="block" />
			 	<StopButton className="block" />
		 	</div>
		 	<div className="spread">
		 		{this.state.foo}
			 	<Gadget num={8} state={this.state} />
		 	</div>
		</div>)
  }
}

midi
.initialize()
.then((midiStream) => {
	ReactDOM.render(<Main midiStream={midiStream} />, document.getElementById('dom'));
});

