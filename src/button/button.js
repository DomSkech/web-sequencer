import React from 'react';
import ReactDOM from 'react-dom';
import sequencer from '../sequencer/sequencer'
import getState from '../_state/state'

const play = () => {
	const state = getState();
	state && sequencer.startSequence(state);
}

const stop = () => {
	sequencer.stopSequence();
}

const Button = (props) => (
	<div>
		<button id="playButton" onClick={play}>Play sequence</button>
		<button id="stopButton" onClick={stop}>Stop sequence</button>
	</div>
);

export default Button;