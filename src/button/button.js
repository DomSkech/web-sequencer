import React from 'react';
import ReactDOM from 'react-dom';
import sequencer from '../sequencer/sequencer'

const play = (props) => {
	sequencer.startSequence(props.state);
}

const stop = (props) => {
	sequencer.stopSequence();
	props.state.update({
		frozenLoopIdx:false
	});
	return true;
}

const PlayButton = (props) => {
	return (
		<button className={props.className} id="playButton" 
			onClick={() => {
				if(props.state.loops.length){
					play(props);
				}else{
					console.log('No sequence has been added');
				}
			}}
		>
			Play sequence
		</button>
	)
};

const StopButton = (props) => {
	return (
		<button className={props.className} id="stopButton" 
			onClick={() => {
				stop(props);
			}}
		>
			Stop sequence
		</button>
	)
};

export {
	PlayButton,
	StopButton
};