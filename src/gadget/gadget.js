import React from 'react';
import sequencer from '../sequencer/sequencer'
import getLoopMap from '../_state/getLoopMap'

const freezeBar = (state, barNum) => {
	state.update({
			frozenLoopIdx: sequencer.toogleFreezeLoop(barNum) ? barNum : false
	});
}

const muteNote = (state, barNum, i) => {
	const newState = {...state}
	newState.bars[barNum].muted = newState.bars[barNum].muted || {};
	newState.bars[barNum].muted[i] = !newState.bars[barNum].muted[i];

	state.update({
		bars:newState.bars
	});
}

const deleteBar = (state, barNum) => {
	state.update({
		bars:state.bars.filter((_, x) => x !== barNum)
	});
	sequencer.stopSequence();
}

const Leds = (props) => (
	<div className="leds">
		{[...Array(props.bar.ticks)].map((x, i) => 
			{
				const tickClass = props.currentTickIdx === i ? `led on` : 'led';
				const mutedClass = (props.bar.muted && props.bar.muted[i]) ? ' muted' : '';
		    return <div className={tickClass+mutedClass} key={i} onClick={(e) => { muteNote(props.superState, props.barNum, i); }}></div>
	  	}
	  )}
  </div>
)

const Gadget = (props) => {
	const superState = props.superState;
	const i = props.barNum;

	const isCurrentLoop = superState.currentTickCoord[0] === i;
	const isFrozenLoop = superState.frozenLoopIdx === i;
	const currentTick = isCurrentLoop ? superState.currentTickCoord[1] : false;

	return (
		<div 
			className={isFrozenLoop ? 'gadget on' : 'gadget'} 
			key={i}
		>
			<div className="locking" onClick={(e) => { freezeBar(superState, i); }}><div>Lock</div></div>
			<Leds {...props} currentTickIdx={currentTick}/>
			<span onClick={(e) => {
				e.preventDefault();
				deleteBar(superState, i);
			}}> - </span>
		</div>
	)
}

const LoopSequences = (props) => {
	return (
		<div className="gadgets">
			{[...props.superState.bars].map((bar, i) => {
				bar = getLoopMap(bar);
				return (<Gadget {...props} key={i} barNum={i} bar={bar} />)
			})}
			<Add {...props} />
		</div>
	)
}

const Add = (props) => (
	<div className="add-sequence" onClick={() => {
		const newState = {...props.superState.bars[props.superState.currentTickCoord[0]]};
		sequencer.stopSequence();
		props.superState.update({bars:[...props.superState.bars, newState]})
	}}>+
	</div>
);

LoopSequences.PropTypes = {
	superState:React.PropTypes.shape({
		loops: []
	})
}

export {
	Add,
	LoopSequences
}