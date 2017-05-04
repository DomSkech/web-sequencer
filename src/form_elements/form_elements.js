import React from 'react';
import ReactDOM from 'react-dom'

const Option = (props) => {
	return (
		<option value={props.val} >{props.text}</option>
	)
}

const SelectFromArray = (props) => {
	
	const handleChange = (e) => {
    	props.update(e.target.value);
	}

	return (
	 <select 
     id={props.id} 
     value={props.value} 
     className={props.className} 
     onChange={handleChange}
   >
	 	<option value=''>{props.prompt}</option>
	 	{
			[...props.items].map((item, i) => {
				return <Option 
					val={item[props.valProp] || item} 
					key={i} 
					text={item[props.nameProp] || item}
				/>
			})
		}
	 </select>
	)
};

const SelectFromObject = (props) => {
	
	const handleChange = (e) => {
    	props.update(e.target.value);
	}

	return (
	 <select id={props.id} value={props.value} className={props.className} onChange={handleChange}>
	 	<option value=''>{props.prompt}</option>
	 	{
			Object.keys(props.items).map( key => {
				const text = props.nameProp ? props.items[key][props.nameProp] : props.items[key];
				return <Option 
					val={key} 
					key={key} 
					text={text} 
				/>;
			})	
		}
	 </select>
	)
};

class SliderFromObject extends React.Component {
  constructor(props) {
  	super(props);
  }
  handleChange (e) {
    if(this.props.update){
    	this.props.update(Number(e.target.value));
    }
  }
  render () {
  	const props = this.props;
    return (
			<div className={props.className}>
				<label>
					{props.prompt} [{this.props.value}]
				</label>
				<input 
					type="range" 
					id={props.id} 
					name={props.item.name}
					max={props.item.max}
					min={props.item.min}
					step={props.item.steps}
					value={this.props.value}
					onChange={(e) => this.handleChange(e)}
				/>
			</div>
    );
  }
}

SliderFromObject.propTypes = {
  value: React.PropTypes.number
};

export {
	SelectFromObject,
	SelectFromArray,
	SliderFromObject
}
