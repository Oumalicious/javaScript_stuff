import React, {Component} from  'react';
import * as DataStore from './DataStore';

class MatchId extends Component {
	constructor(props){
		super(props);
		this.state = {
			editField:'',
			selectedRadio: null,
			appendToFront: null,
			appendedString: '',
			appendedStringDisplay: 'none',
			appendedStringColor: 'red',
			textDisabled: true,
			matchedId: false,
			saveButtonText: "save",
			saveButtonDisabled: true,
			idExistsText: '',
			aidesMap: null,
		}
	}	

	componentWillMount(){
		var that=this;
		DataStore.fetchAideBasicInfo(function(aides)
		{
			var tempArray = aides.sort();
			var tempMap = new Map();
			for(var index in tempArray){
				tempMap.set(tempArray[index].allstar_id,tempArray[index].allstar_id)
			}
			that.setState({aides: tempArray, aidesMap : tempMap});
		});
	}

	onRadioPrefixChange(e){
		if(this.state.textDisabled){
			this.setState({textDisabled : false});
		}
		var tempAppendedString = e.target.value + this.state.editField;
		var match = false;
		this.setState({appendToFront : true, selectedRadio : e.target.value, appendedString : tempAppendedString});
		if(this.state.editField.length!=0){
			if(this.state.aidesMap.has(tempAppendedString)){
				match = true;
				this.setState({saveButtonDisabled : true, idExistsText : "already exists." , appendedStringDisplay : 'inline-block', matchedId : true})
			}else{
				this.setState({saveButtonDisabled : false, idExistsText : null, appendedStringDisplay : 'none', matchedId : 'false'});
			}
		}else{
			this.setState({saveButtonDisabled : true, idExistsText : null, appendedStringDisplay : 'none', matchedId : 'false'});
		}
	}
	
	onRadioSuffixChange(e){
		if(this.state.textDisabled){
			this.setState({textDisabled : false});
		}
		var tempAppendedString = this.state.editField + e.target.value;
		var match = false;
		this.setState({appendToFront : false, selectedRadio : e.target.value, appendedString : tempAppendedString});
		if(this.state.editField.length!=0){
			if(this.state.aidesMap.has(tempAppendedString)){
				match = true;
				this.setState({saveButtonDisabled : true, idExistsText : " already exists.", appendedStringDisplay : 'inline-block', matchedId : true});
			}else{
				this.setState({saveButtonDisabled : false, idExistsText : null, appendedStringDisplay : 'none', matchedId : false});
			}
		}else{
			this.setState({saveButtonDisabled : true, idExistsText : null, appendedStringDisplay : "none", matchedId : false});
		}
   }

	onInputChange(e){
		var s = e.target.value;
		if(this.state.appendedStringDisplay==='none'){
			this.setState({appendedStringDisplay : 'inline-block'});
		}
		var tempAppendedString;
		if(this.state.appendToFront ===  false){
			tempAppendedString = s+this.state.selectedRadio;
		}else{
			tempAppendedString = this.state.selectedRadio+s;
		}
		var match = false;
		this.setState({editField : s, appendedString: tempAppendedString});
		if(s.length!=0){
			if(this.state.aidesMap.has(tempAppendedString)){
				match = true;
				this.setState({saveButtonDisabled : true, idExistsText : " already exists.", appendedStringDisplay : 'inline-block', matchedId: true});
			}else{
				this.setState({saveButtonDisabled : false, idExistsText : null, appendedStringDisplay : 'none', matchedId : false});
			}
		}else{
			this.setState({saveButtonDisabled : true, idExistsText : null, appendedStringDisplay : 'none', matchedId :  false});
		}
	}

	render(){
		var radioBlockCSS = {
			padding : '8px',
		}
		
		var inputTextCSS = {
			marginLeft : '5px',
			marginRight : '5px',
		}
		
		var flexCSS = {
			display : 'flex',
		}
		
		var outputStrCSS = {
			display : this.state.appendedStringDisplay,
			color : this.state.appendedStringColor
		}
		return(
			<div>
				<form>
					<label style={radioBlockCSS}>	
						<input type='radio' name='options' value="A-" onChange={this.onRadioPrefixChange.bind(this)}/>
							PCW
					</label>
					<label style={radioBlockCSS}>
						<input type='radio' name='options' value="CD" onChange={this.onRadioSuffixChange.bind(this)}/>
							CDPAP
					</label>
					<label style={radioBlockCSS}>
						<input type='radio' name='options' value="K-" onChange={this.onRadioPrefixChange.bind(this)}/>
							KOREAN
					</label>
				</form>
				<div style={flexCSS}>
					<div style={inputTextCSS}>
						<input type='text' value={this.state.editField} onChange={this.onInputChange.bind(this)} disabled={this.state.textDisabled}/>
					</div>
					<input type ='button' value={this.state.saveButtonText} disabled={this.state.saveButtonDisabled} />
				</div>
				<div style={outputStrCSS}>
					The allstar_id {this.state.appendedString} {this.state.idExistsText}
				</div>
			</div>
		)
	}
}
export default MatchId;	
