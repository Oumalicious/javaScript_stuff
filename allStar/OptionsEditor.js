import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';


class OptionsEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			editField:'',
			optionsSelection: [],
			selectedOption:'',
			db_options: null,
		}
	}	
			
	componentWillMount()
	{
		var that=this;
		DataStore.fetchOptions(function(options){
			var optionsDB=options;
			var keys=Object.keys(optionsDB).sort();
			var tempArray=[];
			tempArray.push({ label : '', value : ''});
			for( var key in keys){
				tempArray.push({ label : keys[key], value : keys[key]});
			}
			that.setState({optionsSelection: tempArray, db_options: options});
		});
	}
	onOptionChange(val){
		var key=val;
		var selected_type;
		var stringifiedValue= '';
		var display=this.state.db_options[key];
		this.setState({selectedOption : key, editField : JSON.stringify(display, null, 2)});
	}
	render(){
		
		var selectOptionStyle = {
			marginTop: '27px'
		}
		
		var textAreaStyle = {
			width: '600px',
			height: '360px',
			fontFamily: 'arial',
			marginBottom: '30px',
			fontSize: '18px',
			spellcheck : 'true'
		}

		var textAreaLocation = {
			textAlign : 'center',
			display: 'inline-block'			
		}

		var formSelectLocation = {
			paddingLeft : '26px',
			position : 'fixed',
		}

		var divGap1 = {
			marginTop : '40px'
		}
		
		var divGap2 = {
			marginTop : '5px'
		}
		
		var border = {
			textAlign : 'center',
			border : 'ridge #e6e6fa',
			marginLeft: '30px',
			marginTop: '20px',
			paddingRight : '55px',
			paddingLeft: '55px',
			display : 'inline-block',
			boxShadow :'3.2px 4px #dcdcdc'
		}
		
		return(
			<div style={border}>
					<div style ={selectOptionStyle}>
						Select an option
					</div>
					<div style = {divGap2}/>
					<div>	
						<FormSelect
							options={this.state.optionsSelection}
							value={this.state.selectedOption}
							onChange={this.onOptionChange.bind(this)}
						/>
					</div>
					<div style = {divGap1}>
					</div>
					<div style = {textAreaLocation}>
						<textarea style = {textAreaStyle} value={this.state.editField}/>
					</div>
			</div>
		)	
	}
}
export default OptionsEditor;	
