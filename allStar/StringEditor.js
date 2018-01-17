import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';
class StringEditor extends Component {
	constructor(props){
		super(props);
		var img_array = ['/images/blue_heart_32.png','/images/green_heart_32.png','/images/yellow_heart_32.png','/images/olive_heart_32.png'];
//		var options = [
//			{ label : "George", value : "0001" },
//			{ label : "Mary", value : "9999" }
//		];
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
//			optionsTemp: options,
			options: null,
			selectedOption:'0001',
			optionsString:'\'nothing\'',	
		};
	}
	componentWillMount()
	{
		var that=this;
		DataStore.fetchOptions(function(options){
			that.setState({options : options});
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
		this.setState({optionsString: val});
		this.setState({selectedOption: val});
	}
	render(){ 
		return(
			<form>
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
				<form>	
						<FormSelect
							options={this.state.options}
							value={this.state.selectedOption}
							onChange={this.onOptionChange.bind(this)}
						/>			<br />
						<div>
							You selected {this.state.optionsString}.
						</div>
				</form>
			</form>
		)	
	}
}
export default StringEditor;			
