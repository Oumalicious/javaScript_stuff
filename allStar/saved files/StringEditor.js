import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';


class SimpleStringEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			optionsString: this.props.stringObject,
			stringDisplay: this.props.stringObject,
			editField : this.props.editField,
			db_options : this.props.db_options,
			key : this.props.selectionKey,
		}
	}
	
	componentWillReceiveProps(props)
   {
      this.setState({stringDisplay : props.stringObject, optionsString : props.stringObject, editField : props.editField, db_options : props.db_options, key : props.selectionKey});
   }
	
//	componentWillMount(){
//		this.setState({optionsString : this.state.db_options[this.state.key]});
//	}

	onInputChangeEvent(e){
		this.setState({editField: e.target.value});		
	}	

	onEditTextEvent(e){
		if(this.state.editField!==''){
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
		var tempOptionsDB = this.state.db_options;
		tempOptionsDB[this.state.key] =  this.state.stringDisplay;
		this.setState({db_options : tempOptionsDB, optionsString : this.state.db_options[this.state.key]});
	}

	render(){ 
		return(
			<div>
				<div>
					{this.props.editStringText} : {this.state.stringDisplay}		
				</div>
				<div>
					 The value is still {this.state.optionsString}
				</div>
				<div>
					 <input type='text' value={this.state.editField} onChange={this.onInputChangeEvent.bind(this)}/>			<br /> <br />
					<input type='button' value={this.props.editButtonText} onClick={this.onEditTextEvent.bind(this)}/>
					<input type='button' value={this.props.clearButtonText} onClick={this.onClearTextEvent.bind(this)}/>
					<input type='button' value={this.props.revertButtonText} onClick={this.onRevertTextEvent.bind(this)}/>
					<input type='button' value={this.props.modifyButtonText} onClick={this.onModifyTextEvent.bind(this)}/>
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
			editField : this.props.editField,
			db_options : this.props.db_options,
			key : this.props.selectionKey
		}
	}
	
	onInputChangeEvent(e){
		this.setState({editField : parseInt(e.target.value)});
	}

	componentWillReceiveProps(props)
	{
		this.setState({numberDisplay : props.numberObject, optionsNumber : props.numberObject, editField : props.editField, db_options : props.db_options, key : props.selectionKey});
	}

	onEditNumberEvent(e){
		if(this.state.editField!== '' && ( parseInt(this.state.editField) < 0 || parseInt(this.state.editField) >= 0) ){
//		if(this.state.editField!== ''){

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
		if(this.state.editField!==''&& ( parseInt(this.state.editField) < 0 || parseInt(this.state.editField) >= 0) ){
			this.setState({numberDisplay : this.state.numberDisplay - parseInt(this.state.editField)});
		}
	}

	onModifyNumberEvent(e){
		var tempOptionsDB = this.state.db_options;
      tempOptionsDB[this.state.key]=this.state.numberDisplay;
      this.setState({db_options : tempOptionsDB, optionsNumber : this.state.db_options[this.state.key]});

	}

	render(){
		return(
			<div>
				<div>
					{this.props.editNumberText} : {this.state.numberDisplay}
				</div>
				<div>
					This value is still {this.state.optionsNumber}
				</div>			<br />
				<div>
					<input type='text' value={this.state.editField} onChange={this.onInputChangeEvent.bind(this)}/>			<br /> <br />
					<input type='button' value={this.props.editButtonText} onClick={this.onEditNumberEvent.bind(this)}/>
					<input type='button' value={this.props.clearButtonText} onClick={this.onClearNumberEvent.bind(this)}/>
					<input type='button' value={this.props.revertButtonText} onClick={this.onRevertNumberEvent.bind(this)}/>
					<input type='button' value={this.props.incrementButtonText} onClick={this.onIncrementEvent.bind(this)}/>
					<input type='button' value={this.props.decrementButtonText} onClick={this.onDecrementEvent.bind(this)}/>
					<input type='button' value={this.props.modifyButtonText} onClick={this.onModifyNumberEvent.bind(this)}/>
				</div>
			</div>
		)
	}	
}

class SimpleArrayEditor extends Component {
	constructor(props){
		super(props);
		this.state = {
			optionsArray : this.props.arrayObject,
			optionsArrayS : null,
			arrayDisplay : this.props.arrayObject,
			arrayDisplayS : null,
			optionsSelection : [],
			optionsString : null,
			optionsKeys: null,
			selectedOption : '',
			selected_type : null,
			editField : JSON.stringify(this.props.arrayObject),
			db_options : this.props.db_options,
			key : this.props.selectionKey,
			editField : JSON.stringify(this.props.arrayObject),
		}
	}

//	componentWillMount(){
//		var keys = Object.keys(this.state.arrayDisplay).sort();
//		var tempArray = [];
//		tempArray.push({ label : '', value : ''});
//		for( var key in keys ){
//			tempArray.push({ label : this.state.arrayDisplay[keys[key]], value : keys[key]});	
//	}
//	this.setState({optionsSelection: tempArray, optionsKeys : keys}); 
//	}
	
	componentWillMount(){
		var s = JSON.stringify(this.props.arrayObject);
		while(s.indexOf('\"')>0){
			var index = s.indexOf('\"');
			s = s.slice(0,index)+s.slice(index+1,s.length);
		}
		var s_NoBracket = s.slice(1,s.length-1);
		this.setState({editField : s_NoBracket, arrayDisplayS : s, optionsArrayS : s
});
	}

	componentWillReceiveProps(props){
      this.setState({arrayDisplay : props.optionsArray, optionsArray : props.arrayObject, db_options : props.db_options, key : props.selectionKey, editField : JSON.stringify(this.props.arrayObject)});
   }


	onInputChangeEvent(e){
		this.setState({editField : e.target.value});
	}
	
//	onOptionChange(val){
//		var key = val;
//		var selected_type;
//		if(this.state.optionsSelection[key]==null){
//			this.setState({selectedOption : key});
//		}else{
//			if(Array.isArray(this.state.optionsSelection[key])){
//				selected_type = 'array';
//			}else{
//				selected_type = typeof this.state.arrayDisplay[key];
//			}
//			var tempOptionsSelection = this.state.optionsSelection;
//			tempOptionsSelection[key].label = this.state.arrayDisplay[key];
//			this.setState({selectedOption: key , optionsString: this.state.arrayDisplay[key], selected_type: selected_type, optionsSelection: tempOptionsSelection});
//		}
//	}
	
	onEditArrayEvent(e){
		var tempS = '';
		if(this.state.editField.length==0){
			tempS = '[ ]';
		}else{
			tempS=this.state.editField;
		}
		var  tempArray=[];
		while(tempS.length>1){
			var index=tempS.indexOf(',');
			tempArray.push(0,index);
			tempS=tempS.substr(1,tempS.length);
		}
		this.setState({ arrayDisplay : tempArray, arrayDisplayS : '[' + this.state.editField + ']'});
	}
		
	onModifyArrayEvent(e){
		var tempOptionsDB = this.state.db_options;
		tempOptionsDB[this.state.key]=this.state.displayArray;
		this.setState({db_options : tempOptionsDB, optionsArray : this.state.db_options[this.state.key], optionsArrayS : this.state.arrayDisplayS});
	}

	render(){
		return(
			<div>
				<div>
					{this.props.editArrayText} : {this.state.arrayDisplayS}
				</div>			<br />
				<div>
					The array is still : {this.state.optionsArrayS}
				</div>			<br />
				<div>
					<input type='text' value={this.state.editField} onChange={this.onInputChangeEvent.bind(this)}/>			<br />
					<input type='button' value={this.props.editButtonText} onClick={this.onEditArrayEvent.bind(this)}/>
					<input type='button' value={this.props.modifyButtonText} onClick={this.onModifyArrayEvent.bind(this)}/>
				</div>
				{/*
				<div>
					<FormSelect
						options = {this.state.optionsSelection}
						value = {this.state.selectedOption}
						onChange = {this.onOptionChange.bind(this)}
					/>
				</div>
				*/}			<br />
				{/*
				<div>
				{
					this.state.selected_type==='string' &&
					<SimpleStringEditor
						editStringText='Edit the string'
						editField=''
						db_options={this.state.optionsArray}
						selectionKey={this.state.selectedOption}
						stringObject={this.state.optionsString}
						editButtonText='Edit'
						clearButtonText='Clear'
						revertButtonText='Revert'
						modifyButtonText='Modify the value'
					/>
				}	
				{
					this.state.selected_type==='number' &&
					<SimpleNumberEditor
						editNumberText='Edit the number'
						editField=''
						db_options={this.state.db_options}
						selectionKey={this.state.key}
						numberObject={this.state.optionsString}
						editButtonText='Edit'
						clearButtonText='Clear'
						revertButtonText='Revert'
						incrementButtonText='Increment the value by the input'
						decrementButtonText='Decrement the value by the input'
						modifyButtonText='Modify the value'
					/>
				}
				{
					this.state.selected_type==='object' &&
					<SimpleObjectEditor
						editObjectText='Edit the object'
						editFields= ''
						db_options={this.state.db_options}
						selectionKey={this.state.key}
						objectInstance={this.state.optionsString}
						editButtonText='Edit'
						clearButtonText='Clear'
						revertButtonText='Revert'
						modifyButtonText='Modify the object'
					/>
				}
				{
					this.state.selected_type==='array' &&
					<SimpleArrayEditor
						editArrayText='Edit the array'
						selectionKey={this.state.key}
						arrayObject={this.state.optionsString}
						editButtonText='Edit'
						clearButtonText='Clear'
						revertButtonText='Revert'
						modifyButtonText='Modify'
					/>
				}
				</div>
				*/}
			</div>
		)
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
		var isRandom=false;
		var number=Math.floor(Math.random()*4);
		while(!isRandom){
			if(this.state.imgSRCArray[number]!==this.state.imgSRC){
				isRandom=!isRandom;
			}else{
 				number=Math.floor(Math.random()*4);
			}
		}
		this.setState({imgSRC:this.state.imgSRCArray[number]});
	}
	
	onTimerEvent(e){
		if(this.state.timerTrigger!==true){
			var that=this;
			that.setState({timerTrigger: true});
			var startingTime=new Date().getTime();
			var clock=setInterval (function(){
				var onGoingTimer=new Date().getTime();
				var difference=onGoingTimer - startingTime;
				var timerConcat=''+Math.floor(difference/(1000*60*60*24))+':'+Math.floor((difference%(1000*60*60*24))/(1000*60*60))+':'+Math.floor((difference%(1000*60*60))/(1000*60))+':'+Math.floor((difference%(1000*60))/1000);
				that.setState({timer: timerConcat});
			},1000);
		}
	}
	onOptionChange(val){
		var key=val;
		var selected_type;
		if(this.state.db_options[key]==null){
			this.setState({selectedOption : key});
		}else{
			if(Array.isArray(this.state.db_options[key])){
				selected_type='array';
			}else{
				selected_type=typeof this.state.db_options[key];
			}
			this.setState({selectedOption: key , optionsString: this.state.db_options[key], selected_type: selected_type});
		}
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
						editField = ''
						db_options = {this.state.db_options}
						selectionKey = {this.state.selectedOption}
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
						editField = ''
						db_options = {this.state.db_options}
						selectionKey = {this.state.selectedOption}
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
						editObjectText = 'Edit the object'
						editField = ''
						db_options = {this.state.db_options}
						selectionKey = {this.state.selectedOption}
						objectInstance = {this.state.optionsString}
						editButtonText = 'Edit'
						clearButtonText = 'Clear'
						revertButtonText = 'Revert'
						modifyButtonText = 'Modify the object'
					/>
				}
				{
					this.state.selected_type === 'array' &&
					<SimpleArrayEditor
						editArrayText = 'Edit the array'
						editField = ''
						db_options = {this.state.db_options}
						selectionKey = {this.state.selectedOption}
						arrayObject = {this.state.optionsString}
						editButtonText = 'Edit'
						clearButtonText = 'Clear'
						revertButtonText = 'Revert'
						modifyButtonText = 'Modify'
				
					/>
				}
				</div>
			</div>
		)	
	}
}
export default StringEditor;	



/** WEBPACK FOOTER **
 ** ./src/StringEditor.js
 **/
