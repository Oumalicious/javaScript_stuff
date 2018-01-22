import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';


class SimpleStringEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			optionsString: this.props.stringObject,
			stringDisplay: this.props.stringObject,
			editField: ''
		}
	}
	onInputChangeEvent(e){
		this.setState({editField: e.target.value});		
	}	

	onEditTextEvent(e){
		if(e.target.value==''){
			this.setState({stringDisplay: this.state.editField});
		}
	}
	
	onClearTextEvent(e){
		this.setState({stringDisplay : ''});
	}

	onRevertTextEvent(e){
		this.setState({stringDisplay : this.state.optionsString});
	}

	onModifyTextEvent(e){
		this.setState({optionsString : this.state.stringDisplay});
	}

	render(){ 
		return(
			<div>
				<div>
					{this.props.editStringText} : {this.state.stringDisplay}		
				</div>		<br />
				<div>
					<input type='text' value={this.state.editField} onChange={this.onInputChangeEvent.bind(this)}/>			<br /> <br />
					<input type ='button' value={this.props.editButtonText} onClick = {this.onEditTextEvent.bind(this)}/>
					<input type ='button' value={this.props.clearButtonText} onClick = {this.onClearTextEvent.bind(this)}/>
					<input type ='button' value={this.props.revertButtonText} onClick = {this.onRevertTextEvent.bind(this)}/>
					<input type ='button' value={this.props.modifyButtonText} onClick = {this.onModifyTextEvent.bind(this)}/>
				</div>
			</div>
		)
	}	
}

class SimpleNumberEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			optionsNumber : this.props.numberObject,
			numberDisplay : this.props.numberObject,
			editField: ''
		}
	}
	
	onInputChangeEvent(e){
		this.setState({editField : e.target.value});
	}

	onEditNumberEvent(e){
		if(this.state.editField!== '' && ( parseInt(this.state.editField) < 0 || parseInt(this.state.editField) >= 0) ){
			this.setState({numberDisplay : parseInt(this.state.editField)});
		}
	}

	onClearNumberEvent(e){
		this.setState({numberDisplay : 0});
	}

	onRevertNumberEvent(e){
		this.setState({numberDisplay : this.state.optionsNumber});
	}

	onIncrementEvent(e){
		if(this.state.editField!== '' && ( parseInt(this.state.editField) < 0 || parseInt(this.state.editField) >= 0) ){
			this.setState({numberDisplay : this.state.numberDisplay + parseInt(this.state.editField)});
		}
	}
	
	onDecrementEvent(e){
		if(this.state.editField!== '' && ( parseInt(this.state.editField) < 0 || parseInt(this.state.editField) >= 0) ){
			this.setState({numberDisplay : this.state.numberDisplay + parseInt(this.state.editField)});
		}
	}

	onModifyNumberEvent(e){
		this.setState({optionsNumber : this.state.numberDisplay});
	}

	render(){
		return(
			<div>
				<div>
					{this.props.editNumberText} : {this.state.numberDisplay}
				</div>			<br />
				<div>
					<input type = 'text' value = {this.state.editField} onChange = {this.onInputChangeEvent.bind(this)}/>			<br /> <br />
					<input type = 'button' value = {this.props.editButtonText} onClick = {this.onEditNumberEvent.bind(this)}/>
					<input type = 'button' value = {this.props.clearButtonText} onClick = {this.onClearNumberEvent.bind(this)}/>
					<input type = 'button' value = {this.props.revertButtonText} onClick = {this.onRevertNumberEvent.bind(this)}/>
					<input type = 'button' value = {this.props.incrementButtonText} onClick = {this.onIncrementEvent.bind(this)}/>
					<input type = 'button' value = {this.props.decrementButtonText} onClick = {this.onDecrementEvent.bind(this)}/>
					<input type = 'button' value = {this.props.modifyButtonText} onClick = {this.onModifyNumberEvent.bind(this)}/>
				</div>
			</div>
		)
	}	
}

class SimpleArrayEditor extends Component {
	constructor(props){
		super(props);
	}
}

class SimpleObjectEditor extends Component {
	constructor(props){
		super(props);
	}
}

class StringEditor extends Component {
	constructor(props){
		super(props);
		var img_array = ['/images/blue_heart_32.png','/images/green_heart_32.png','/images/yellow_heart_32.png','/images/olive_heart_32.png'];
		this.state = {
			example:'Try to edit this String.',
			editField:'',
			EditButton:'Edit Text',
			ClearButton:'Clear Text',
			generateButtonLabel:'Generate Keys',
			imgSRCArray: img_array,
			imgSRC: img_array[0],
			timer:'Hover this text to start a timer.',
			timerTrigger: false,
			optionsSelection: [],
			selectedOption:'',
			optionsString:'nothing',	
			selected_type : null,
			db_options: null
		}
	}	
			
	componentWillMount()
	{
		var that=this;
		DataStore.fetchOptions(function(options){
			var optionsDB = options;
			var keys = Object.keys(optionsDB).sort();
			var tempArray = [];
			for( var key in keys){
				tempArray.push({ label : keys[key], value : keys[key]});
			}
			that.setState({optionsSelection: tempArray, db_options: options});
		});
	}
	
	onEditEvent(e){
		if(this.state.editField!==""){
			this.setState({example: this.state.editField});
		}
	}
	
	onClearEvent(e){
		this.setState({example: ""});
	
}
	onChangeEvent(e){
		this.setState({editField: e.target.value});		
	}	
	
	onImgClickEvent(e){
		var isRandom = false;
		var number = Math.floor(Math.random()*4);
		while(!isRandom){
			if(this.state.imgSRCArray[number]!==this.state.imgSRC){
				isRandom=!isRandom;
			}else{
 				number = Math.floor(Math.random()*4);
			}
		}
		this.setState({imgSRC:this.state.imgSRCArray[number]});
	}
	
	onTimerEvent(e){
		if(this.state.timerTrigger!==true){
			var that = this;
			that.setState({timerTrigger: true});
			var startingTime = new Date().getTime();
			var clock = setInterval (function(){
				var onGoingTimer = new Date().getTime();
				var difference = onGoingTimer - startingTime;
				var timerConcat = ''+Math.floor(difference/(1000*60*60*24))+':'+Math.floor((difference%(1000*60*60*24))/(1000*60*60))+':'+Math.floor((difference%(1000*60*60))/(1000*60))+':'+Math.floor((difference%(1000*60))/1000);
				that.setState({timer: timerConcat});
			},1000);
		}
	}
	onOptionChange(val){
		var key = val;
		var selected_type = typeof this.state.db_options[key];
		this.setState({selectedOption: key , optionsString: this.state.db_options[key], selected_type: selected_type});
	}
	render(){ 
		return(
			<div>
{
/*
				<div>
						{this.state.example}		 <br /> <br />
						<input type='text' value={this.state.editField} onChange={this.onChangeEvent.bind(this)}/>		<br /> <br />
						<input type='button' onClick={this.onEditEvent.bind(this)} value={this.state.EditButton}/>
						<input type='button' onClick={this.onClearEvent.bind(this)} value={this.state.ClearButton}/>
						<br /> <br />
						<img src={this.state.imgSRC} onMouseOver={this.onImgClickEvent.bind(this) }/> 			<br /> <br />
						<div onMouseOver={this.onTimerEvent.bind(this)} >
							{this.state.timer}
						</div>
				</div>			 <br />
*/
}
				<div>	
						<FormSelect
							options={this.state.optionsSelection}
							value={this.state.selectedOption}
							onChange={this.onOptionChange.bind(this)}
						/>			<br />
				</div>
				<div>
				{
					this.state.selected_type === 'string' &&
					<SimpleStringEditor
						editStringText = 'Edit the string'
						stringObject = {this.state.optionsString}
						editButtonText = 'Edit'
						clearButtonText = 'Clear'
						revertButtonText = 'Revert'
						modifyButtonText = 'Modify the value'
					/>
				}	
				{
					this.state.selected_type === 'number' &&
					<SimpleNumberEditor
						editNumberText = 'Edit the number'
						numberObject = {this.state.optionsString}
						editButtonText = 'Edit'
						clearButtonText = 'Clear'
						revertButtonText = 'Revert'
						incrementButtonText = 'Increment the value by the input'
						decrementButtonText = 'Decrement the value by the input'
						modifyButtonText = 'Modify the value'
					/>
				}
				{
					this.state.selected_type === 'object' &&
					<SimpleObjectEditor
					
					/>
				}
				{
					this.state.selected_type === 'array' &&
					<SimpleArrayEditor
					
					/>
				}
				</div>
			</div>
		)	
	}
}
export default StringEditor;			
