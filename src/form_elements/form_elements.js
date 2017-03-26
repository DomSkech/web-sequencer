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
	 <select id={props.id} defaultValue={defaultOption} className={props.className}>
	 	<option value=''>{props.prompt}</option>
	 	{
			[...props.items].map((item, i) => {
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


	return (
	 <select id={props.id} defaultValue={defaultOption} className={props.className}>
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
    this.state = {
			value: this.props.item.default
		};
  }
  handleChange (e) {
    this.setState({ value: e.target.value });
  }
  render () {
  	const props = this.props;
  	console.log(props)
    return (
			<div className={props.className}>
				<label>
					{props.prompt} [{this.state.value}]
				</label>
				<input 
					type="range" 
					id={props.id} 
					defaultValue={props.item.default}
					name={props.item.name}
					max={props.item.max}
					min={props.item.min}
					step={props.item.steps}
					onChange={(e) => this.handleChange(e)}
				/>
			</div>
    );
  }
}

const universalDefaultProps = {
 a:''
}

const universalPropTypes = {
 a:React.PropTypes.String
}

SliderFromObject.proptypes = universalPropTypes
SelectFromArray.proptypes = universalPropTypes
SliderFromObject.proptypes = universalPropTypes


SliderFromObject.defaultProps = universalDefaultProps
SelectFromArray.defaultProps = universalDefaultProps
SliderFromObject.defaultProps = universalDefaultProps

export {
	SelectFromObject,
	SelectFromArray,
	SliderFromObject
}
