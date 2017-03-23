import React from 'react';
import ReactDOM from 'react-dom';
import sequencer from '../sequencer/sequencer'

const play = () => {
	stop() && sequencer.startSequence();
}

const stop = () => {
	sequencer.stopSequence();
	return true;
}

const PlayButton = (props) => (
		<button className={props.className} id="playButton" onClick={play}>Play sequence</button>
);

const StopButton = (props) => (
		<button className={props.className} id="stopButton" onClick={stop}>Stop sequence</button>
);

export {
	PlayButton,
	StopButton
};