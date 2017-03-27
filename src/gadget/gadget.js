import React from 'react';
import getState from '../_state/state'
import sequencer from '../sequencer/sequencer'

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
	const i = props.i;
	const isCurrentLoop = i === props.state.currentTickCoord[0];
	const currentTick = isCurrentLoop ? props.state.currentTickCoord[1] : false;

	return (
		<div className={props.state.frozenLoopIdx === i ? 'gadget on' : 'gadget'} key={i} 
			onClick={(e) => {
				props.state.update({
					frozenLoopIdx: sequencer.toogleFreezeLoop(i) ? i : false
				});
			}}
		>
			<Leds num={props.loop.ticks} currentTickIdx={currentTick}/>
			<span onClick={(e) => {
				e.preventDefault();
				props.state.update({loops:props.state.loops.filter((_, x) => x !== i)})
				sequencer.stopSequence();
			}}>-</span>
		</div>
	)
}

const LoopSequences = (props) => {
	return (
		<div className="gadgets">
			{[...props.state.loops].map((loop, i) => {

				return (<Gadget {...props} key={i} i={i} loop={loop} />)
			})}
			<Add {...props} />
		</div>
	)
}

const Add = (props) => (
	<div className="add-sequence" onClick={() => {
		const state = getState();
		sequencer.stopSequence();
		props.state.update({loops:[...props.state.loops, state]})
	}}>+
	</div>
);

LoopSequences.PropTypes = {
	state:React.PropTypes.shape({
		loops: []
	})
}

export {
	Add,
	LoopSequences
}