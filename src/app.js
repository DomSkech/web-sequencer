import React from 'react';
import ReactDOM from 'react-dom';

import { SelectFromArray, SelectFromObject, SliderFromObject } from "./form_elements/form_elements"
import { PlayButton, StopButton } from "./button/button"
import midi from "./midi/midi"
import {LoopSequences, Add} from "./gadget/gadget"
import loopTypes from './_config/loop_types'
import durationRange from './_config/note_length_range'
import channelRange from './_config/channels_range'
import settings from './_config/settings'
import scales from './_config/scales'
import arps from './_config/arps'
import velocity from './_config/velocity_range'
import css from './main.css'

class Main extends React.Component {
  constructor(props) {
  	super(props);
    this.state = {
			bars:[{
				scale:'major', 
				arp:'normal',
				loop:'up',
				port: 'output-3',
        channel: 1,
        minChannel:1,
        maxChannel:1,
        channelRange: [1, 1],
				durationRange: [50, 100],
				velocityRange: [60, 80],
				time: '8/4',
				chance: 100,
				bpm: 120,
				key: 60
			}],
			input: 2,
			masterClock:120,
			useMasterClock: false,
    	currentTickCoord:[0,0]
    };
		this.state.update = this.updateState.bind(this);
		this.state.retrieve = this.retrieveState.bind(this);
		this.updateMasterClock =	this.updateMasterClock.bind(this);
		this.freezeTempo =	this.freezeTempo.bind(this);
		this.updateStateProperty = this.updateStateProperty.bind(this);
  }

  updateState(obj){
  	this.setState(obj);
  }

  retrieveState(property){
  	return this.state[property];
  }

  updateStateProperty(prop, val){
		const newState = {...this.state}
		newState.bars[this.state.currentTickCoord[0]][prop] = val;
    this.setState(newState);
  }

  updateMasterClock(val){
  	this.setState({
  		masterClock: val
  	});
  }

  freezeTempo(){
  	this.setState({
  		useMasterClock: !this.state.useMasterClock
  	});
  }

  render () {
  	const currentLoopIdx = this.state.currentTickCoord[0];
  	const currentLoop = this.state.bars[currentLoopIdx] || this.state.bars[0];
  	const tempoClassName = this.state.useMasterClock ? 'master on' : 'master';

  	if(!currentLoop){
  		return false;
  	}

  	return (<div className="bg">
 			<div className="header">
 				<h1>Scaletricks</h1>
				<img src="logo-b.jpg" />
 			</div>

		 	<fieldset>
		 		<legend>Master clock</legend>
		 		<div className="spread">
		 		
				 	<SelectFromArray 
          className="block" 
          items={this.props.midiStream.inputs} 
          id="inputs" 
          valProp="id"
          nameProp="name" 
          prompt="None" 
			 			update={val => {
			 				this.setState({
			 					'input': val
			 				});
			 				midi.monitorInput(val, this.updateMasterClock, this.state);
			 			}}
			 			value={this.state.input}
				 	/>
				 	<div className={`block ${tempoClassName}`}>
				 		<div className='locking' onClick={this.freezeTempo}><div>Lock</div></div>
				 		{this.state.masterClock}
				 	</div>
			 	</div>
			</fieldset>

		 	<fieldset>
		 		<legend>Notes</legend>
		 		<div className="spread">
		 		
			 	<SelectFromArray 
          className="block" 
          items={this.props.midiStream.outputs} 
          id="ports" 
          valProp="id" 
          nameProp="name" 
          prompt="Midi output..."
		 			update={val => {
		 				this.updateStateProperty('port', val);
		 			}}
		 			value={currentLoop.port}
			 	/>
			 	<SelectFromObject 
          className="block" 
          items={scales} 
          id="scales" 
          nameProp="name" 
          prompt="Scale..." 
		 			update={val => {
		 				this.updateStateProperty('scale', val);
		 			}}
		 			value={currentLoop.scale}
			 	/>
			 	<SelectFromObject className="block" items={settings.key} id="key" prompt="Key..." 
		 			update={val => {
		 				this.updateStateProperty('key', val);
		 			}}
		 			value={currentLoop.key}
			 	/>
			 	<SelectFromObject className="block" items={arps} id="arps" nameProp="name" prompt="Arp type..." 
		 			update={val => {
		 				this.updateStateProperty('arp', val);
		 			}}
		 			value={currentLoop.arp}
			 	/>
			 	<SelectFromObject className="block" items={loopTypes} id="loop-types" nameProp="name" prompt="Loop type..." 
		 			update={val => {
		 				this.updateStateProperty('loop', val);
		 			}}
		 			value={currentLoop.loop}
			 	/>
		 		<SliderFromObject className={`block wrapper ${this.state.useMasterClock ? 'disabled' : ''}`} item={settings.bpm} id="bpm" nameProp="name" prompt="Loop BPM" 
		 			update={val => {
		 				this.updateStateProperty('bpm', val);
		 			}}
		 			value={currentLoop.bpm}
				/>
		 		<SelectFromObject className="block" items={settings.time} id="time" nameProp="name" prompt="Time..." 
		 			update={val => {
		 				this.updateStateProperty('time', val);
		 			}}
		 			value={currentLoop.time}
		 		/>
		 		</div>
		 	</fieldset>
		 	<fieldset>
		 	<legend>Dynamic</legend>

		 		<SliderFromObject className="block wrapper" item={settings.chance} id="chance" nameProp="name" prompt="Chance" 
		 			update={val => {
		 				this.updateStateProperty('chance', val);
		 			}}
		 			value={currentLoop.chance}
		 		/>

        <SliderFromObject className="block wrapper" item={channelRange.lower} id="min-channel" nameProp="name" prompt="Min channel" 
          update={val => {
            this.updateStateProperty('channelRange', [val, currentLoop.channelRange[1]]);
          }}
          value={currentLoop.channelRange[0]}
        />

        <SliderFromObject className="block wrapper" item={channelRange.higher} id="max-channel" nameProp="name" prompt="Max Channel" 
          update={val => {
            this.updateStateProperty('channelRange', [currentLoop.channelRange[0], val]);
          }}
          value={currentLoop.channelRange[1]}
        />
		 		<SliderFromObject className="block wrapper" item={durationRange.lower} id="min-duration" nameProp="name" prompt="Min duration" 
		 			update={val => {
		 				this.updateStateProperty('durationRange', [val, currentLoop.durationRange[1]]);
		 			}}
		 			value={currentLoop.durationRange[0]}
		 		/>
			 	<SliderFromObject className="block wrapper" item={durationRange.higher} id="max-duration" nameProp="name" prompt="Max duration" 
		 			update={val => {
		 				this.updateStateProperty('durationRange', [currentLoop.durationRange[0], val]);
		 			}}
		 			value={currentLoop.durationRange[1]}
			 	/>
		 		<SliderFromObject className="block wrapper" item={velocity.lower} id="min-velocity" nameProp="name" prompt="Min velocity" 
		 			update={val => {
		 				this.updateStateProperty('velocityRange', [val, currentLoop.velocityRange[1]]);
		 			}}
		 			value={currentLoop.velocityRange[0]}
		 		/>
			 	<SliderFromObject className="block wrapper" item={velocity.higher} id="max-velocity" nameProp="name" prompt="Max velocity" 
		 			update={val => {
		 				this.updateStateProperty('velocityRange', [currentLoop.velocityRange[0], val]);
		 			}}
		 			value={currentLoop.velocityRange[1]}
			 	/>

		 	</fieldset>
		 	<fieldset>
		 		<legend>Controls</legend>
				<PlayButton className="block" superState={this.state}/>
			 	<StopButton className="block" superState={this.state} />			
		 	</fieldset>
		 	<fieldset className="spread">
		 		<legend>Sequence</legend>
				<LoopSequences superState={this.state} />		 			
		 	</fieldset>
		</div>)
  }
}

midi
.initialize()
.then((midiStream) => {
	ReactDOM.render(<Main midiStream={midiStream} />, document.getElementById('dom'));
});

