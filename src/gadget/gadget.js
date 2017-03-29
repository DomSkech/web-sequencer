import React from 'react';
import sequencer from '../sequencer/sequencer'
import getLoopMap from '../_state/getLoopMap'

const freezeBar = (state, barNum) => {
	state.update({
			frozenLoopIdx: sequencer.toogleFreezeLoop(barNum) ? barNum : false
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
		{[...Array(props.num)].map((x, i) => 
			{
				const tickClass = props.currentTickIdx === i ? `led on` : 'led';
		    return <div className={tickClass} key={i}></div>
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
			onClick={(e) => { freezeBar(superState, i); }}
		>
			<Leds num={props.bar.ticks} currentTickIdx={currentTick}/>
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