import React from 'react';
import ReactDOM from 'react-dom'
import defaults from '../_config/defaults'

const Option = (props) => {
	return (
		<option value={props.val} >{props.text}</option>
	)
}

const SelectFromArray = (props) => {
	const defaultOption = defaults[props.id];

	return (
	 <select id={props.id} value={defaultOption} readOnly>
	 	<option value=''>{props.prompt}</option>
	 	{
			[...props.items].map((item, i) => {
				console.log(defaultOption === item[props.valProp])
				return <Option 
					val={item[props.valProp]} 
					key={i} 
					text={item[props.nameProp]} 
				/>
			})
		}
	 </select>
	)
};

const SelectFromObject = (props) => {
	const defaultOption = defaults[props.id];
console.log(defaultOption,props.id)
	return (
	 <select id={props.id} value={defaultOption} readOnly>
	 	<option value=''>{props.prompt}</option>
	 	{
			Object.keys(props.items).map( key => {
				return <Option 
					val={key} 
					key={key} 
					text={props.items[key][props.nameProp]} 
				/>;
			})	
		}
	 </select>
	)
};

export {
	SelectFromObject,
	SelectFromArray
}
