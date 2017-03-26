import React from 'react';

const Gadget = (props) => (
		<div className="gadget" onClick={() => {
			props.state.update({foo:'doo'})
		}}>+
		{[...Array(props.num)].map((x, i) =>
	    <div className="led" key={i}></div>
	  )}
		</div>
);

export default Gadget