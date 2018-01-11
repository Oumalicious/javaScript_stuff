import React, {Component} from  'react';
import * as DataStore from './DataStore';

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
			selectBox: 'selectBox',
			options: null,
			optionKeys: null,
			scrollBox: 'scrollBox',
			generateKeys: 'Generate \'option\' keys',		
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
		if(this.state.timerTrigger!=true){
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
	{
	/*TODO
		1 : Fix Unexpected token error
		2 : let optionKeys be the keys for this.state.option
		3 : iterator through optionKeys
		4 : For each option in optionKey,
			4.1 : Create an 'option' object
			4.2 : Append the 'option' object to the selectionBox
	*/
	}
	onGenerateKeys(){
		this.setState({optionKeys:Object.keys({this.state.options});
		for(var  i = 0, i < {this.state.optionKeys.length} ; ++i){
			var anOption = {this.state.optionKeys[i]};
			var optionChild = React.createElement('option', {}. anOption);
			{this.state.selectionBox}.appendChild(optionChild);
		}
	}
	render(){ 
		return(
			<form>
				<div>
						{this.state.example}		 <br /> <br />
						<input type='text' value={this.state.editField} onChange={this.onChangeEvent.bind(this)}/>		<br /> <br />
						<input type='button' onClick={this.onEditEvent.bind(this)} value={this.state.EditButton}/>
						<input type='button' onClick={this.onClearEvent.bind(this)} value={this.state.ClearButton}/>
						<input type='button' onClick={this.onGenerateKeys.bind(this)} value={this.state.generateKeys}/>
						<br /> <br />
						<img src={this.state.imgSRC} onMouseOver={this.onImgClickEvent.bind(this) }/>
						<div onMouseOver={this.onTimerEvent.bind(this)} >
							{this.state.timer}
						</div>
				</div>			<br /> <br /> <br /> <br /> <br /> <br />
				<div>			
						{this.state.optionKeys};
						<select id={this.state.scrollBox}>
	
						</select>
						{this.state.keys}	
				</div>
			</form>
		)	
	}
}
export default StringEditor;			
