import React from 'react';
import * as Util from './Util';
import * as DataStore from './DataStore';
import * as TextGenerator from './TextGenerator';
import * as LabelGenerator from './LabelGenerator';
import InsuranceDetails from './InsuranceDetails';
import MedicalDetails from './MedicalDetails';
import ScheduleDetails from './ScheduleDetails';
//import {AgGridReact} from 'ag-grid-react';

class PatientDetails extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			patient_labels : null,
			name : {
				value : "Patient Name",
				fields : {
					value : ['Vincent Xue'],
				},
				needs_editField : false,
			},
			name_editfield : "",
			dob : {
				value : "DoB",
				fields : {
					value : ['1/24/98'],
				},
				needs_editField : false,
			},
			dob_editfield : "",
			soc : {
				value : "SOC",
				fields : {
					value : ['3/7/2013'],
				},
				needs_editField : false,
			},
			soc_editfield : "",
			pcn : {
				value : "PCN",
				fields : {
					value : ['xxxx'],
				},
				needs_editField : false,
			},
			pcn_editfield : "",
			phone : {
				value : "Phone",
				fields : {
					value : ['(1) 646-610-0808'],
				},
				needs_editField : false,
			},
			phone_editfield : "",
			languages : {
				value : "Languages",
				fields : {
					value : ['Chinglish']
				},
				needs_editField : false,
			},
			languages_editfield : "",				
			address : {
				value : "Address",
				fields : {
					value : ['618 76th']
				},
				needs_editField : false,
			},		
			apt : {
				value : "Apt Floor",
				fields : {
					value : ['n/a']
				},
				needs_editField : false,
			},	
			city : {
				value : "City",
				fields : {
					value : ['Brooklyn']
				},
				needs_editField : false,
			},
			zip : {
				value : "Zip Code",
				fields : {
					value : ['11209']
				},
				needs_editField : false,
			},
			house_editfield : "",
			apt_editfield : "",
			city_editfield : "",
			state_editfield : "",
			zip_editfield : "",
			insurance : "insurance",
			medical : "medical",
			schedule_today : "schedule today",
			insurance_display : "none",
			medical_display : "none",
			schedule_display : "none",
			edit_mode : false,
			field_display : 'block',
			input_display : 'none',
		}
	}
	//asdf for code jumping purposes
	componentWillMount(){
		DataStore.fetchPatient("0001",function(patient){
			
		});
		var array_of_fields = [this.state.name,this.state.dob,this.state.soc,this.state.pcn,this.state.phone,this.state.languages,this.state.address,this.state.apt,this.state.city,this.state.zip];
		var temp_labels = {};
		var gap = '25';
		for(var i in array_of_fields){
			var component = array_of_fields[i];
			var title = TextGenerator.textObj(component.value, '16', 'italic',this.state.field_display);
			title.style = Object.assign({}, title.style, TextGenerator.borderField('padding', '10'));
			title.style = Object.assign({}, title.style, TextGenerator.shift('margin', 'bottom', '-8'));
//			var width;
//			if(component.fields.value.length === 2){
//				width = '300px';
//			}else if(component.fields.value.length === 3 || component.fields.value.length === 1) {
//				width = '170px';
//			}
			component.fields.boxstyle = {
				width : '200px'
			}
			component.fields.editstyle = {
				marginLeft : '18px',
				marginRight : gap + 'px',
			}
			if(!component.needs_editField){
				component.fields.editstyle = Object.assign({},component.fields.editstyle,{display : this.state.input_display});
//				title.style = Object.assign({}, title.style, TextGenerator.shift('margin','right',width));
			}else component.fields.edityle = Object.assign({},component.fields.editstyle,{display :  'block'});
			var temp_fields = [];
			for (var j in component.fields.value){
				var text = component.fields.value[j];
				var generated_text = TextGenerator.textObj(text, '12', 'normal', 'block');
				generated_text.style = Object.assign({}, generated_text.style, TextGenerator.shift('margin','left','18'));
				generated_text.editstyle = component.fields.editstyle;
				generated_text.boxstyle = component.fields.boxstyle;
				temp_fields.push(generated_text);
			}
			var generated_label = LabelGenerator.GenerateLabel(title, temp_fields,gap);
			var label_name = generated_label.title.value.toLowerCase();
			label_name = label_name.replace(" ","_");
			temp_labels[label_name] = generated_label;
		}
		this.setState({patient_labels : temp_labels});
	}

	InsuranceChangeDisplay(e){
		if(this.state.insurance_display === 'none') this.setState({insurance_display : 'block'});
		else this.setState({insurance_display: 'none'});
	}
	
	MedicalChangeDisplay(e){
		if(this.state.medical_display === 'none') this.setState({medical_display: 'block'});
		else this.setState({medical_display: 'none'});
	}

	ScheduleChangeDisplay(e){
		if(this.state.schedule_display === 'none') this.setState({schedule_display: 'block'});
		else this.setState({schedule_display: 'none'});
	}
	
	onEditMode(e){
		var edit_mode = this.state.edit_mode;
		edit_mode = !edit_mode;
		if(edit_mode){
			this.setState({input_display : 'block', field_display : 'none',edit_mode : edit_mode});
		}else{
			this.setState({input_display : 'none', field_display : 'block',edit_mode : edit_mode});
		}
	}
	render()
	{
		var display_flex = {
			display : 'flex'
		}
		
		var checkbox_css = {
			marginTop : '2px',
			padding : '3px',
		}
		var textbox = {
			width : '200px'
		}
		var insurance_display = {
			display : this.state.insurance_display,
		}

		var medical_display = {
			display : this.state.medical_display,
		}
		
		var schedule_display = {
			display : this.state.schedule_display,
		}
		return(
			<div>
				<div style = {display_flex}>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.patient_name.title.style}>
							{this.state.patient_labels.patient_name.title.value}
						</div>
						<div style = {this.state.patient_labels.patient_name.fields[0].style}>
							{this.state.patient_labels.patient_name.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.patient_name.fields[0].editstyle}>
							<input type='text' value={this.state.name_editfield} style={this.state.patient_labels.patient_name.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.dob.title.style}>
							{this.state.patient_labels.dob.title.value}
						</div>
						<div style = {this.state.patient_labels.dob.fields[0].style}>
							{this.state.patient_labels.dob.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.dob.fields[0].editstyle}>
							<input type ='text' value={this.state.dob_editfield} style={this.state.patient_labels.dob.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style={this.state.patient_labels.soc.title.style}>
							{this.state.patient_labels.soc.title.value}
						</div>
						<div style = {this.state.patient_labels.soc.fields[0].style}>
							{this.state.patient_labels.soc.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.soc.fields[0].editstyle}>
							<input type ='text' value={this.state.soc_editfield} style={this.state.patient_labels.soc.fields[0].boxstyle}/>
						</div>
					</div>
				</div>
				<div style = {display_flex}>	
					<div style = {textbox}>
						<div style={this.state.patient_labels.pcn.title.style}>
							{this.state.patient_labels.pcn.title.value}
						</div>
						<div style = {this.state.patient_labels.pcn.fields[0].style}>
							{this.state.patient_labels.pcn.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.pcn.fields[0].editstyle}>
							<input type='text' value={this.state.pcn_editfield} style={this.state.patient_labels.pcn.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.phone.title.style}>
							{this.state.patient_labels.phone.title.value}
						</div>
						<div style={this.state.patient_labels.phone.fields[0].style}>
							{this.state.patient_labels.phone.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.phone.fields[0].editstyle}>
							<input type='text' value={this.state.phone_editfield} style={this.state.patient_labels.phone.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.languages.title.style}>
							{this.state.patient_labels.languages.title.value}
						</div>
						<div style = {this.state.patient_labels.languages.fields[0].style}>
							{this.state.patient_labels.languages.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.languages.fields[0].editstyle}>
							<input type='text' value={this.state.languages_editfield} style={this.state.patient_labels.languages.fields[0].boxstyle}/>
						</div>
					</div>
				</div>
				<div style = {display_flex}>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.address.title.style}>
							{this.state.patient_labels.address.title.value}
						</div>
						<div style = {this.state.patient_labels.address.fields[0].style}>
							{this.state.patient_labels.address.fields[0].value}						
						</div>
						<div style = {this.state.patient_labels.address.fields[0].editstyle}>
							<input type='text' value={this.state.house_editfield} style={this.state.patient_labels.address.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style={this.state.patient_labels.apt_floor.title.style}>
							{this.state.patient_labels.apt_floor.title.value}
						</div>
						<div style = {this.state.patient_labels.apt_floor.fields[0].style}>
							{this.state.patient_labels.apt_floor.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.apt_floor.fields[0].editstyle}>
							<input type='text' value={this.state.apt_editfield} style={this.state.patient_labels.apt_floor.fields[0].boxstyle}/>
						</div>
					</div>
				</div>
				<div style = {display_flex}>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.city.title.style}>
							{this.state.patient_labels.city.title.value}
						</div>
						<div style = {this.state.patient_labels.city.fields[0].style}>
							{this.state.patient_labels.city.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.city.fields[0].editstyle}>
							<input type='text' value={this.state.city_editfield} style={this.state.patient_labels.city.fields[0].boxstyle}/>
						</div>
					</div>
					<div style = {textbox}>
						<div style = {this.state.patient_labels.zip_code.title.style}>	
							{this.state.patient_labels.zip_code.title.value}
						</div>
						<div style = {this.state.patient_labels.zip_code.fields[0].style}>
							{this.state.patient_labels.zip_code.fields[0].value}
						</div>
						<div style = {this.state.patient_labels.zip_code.fields[0].editstyle}>
							<input type='text' value={this.state.zip_editfield} style={this.state.patient_labels.zip_code.fields[0].boxstyle}/>
						</div>
					</div>
				</div>
				<div>
					<div>
						<label style={checkbox_css}>
							Insurance
							<input type='checkbox' name='view' value='insurance' onClick={this.InsuranceChangeDisplay.bind(this)}/>
						</label>
						<div>
							{
								this.state.insurance_display === 'block' &&
								<InsuranceDetails
									claim_type = {
										{
											value : 'Claim Type',
											fields : {
												value : ['Name','Effective Date'],
											},
											needs_editfield : true,
										}
									}
									claim_history = {
										{
											value : 'Claim History',
											fields : {
												value : ['Name', 'Date'],
											},
											needs_editfield : true,
										}
									}
									claim_history_display = 'none'
									claim_editfield = ''
								/>
							}
						</div>
					</div>
					<hr />
					<div>
						<label style={checkbox_css}>
							Medical
							<input type='checkbox' name='view' value='medical' onClick={this.MedicalChangeDisplay.bind(this)}/>
						</label>
						<div>
							{
								this.state.medical_display === 'block' &&
								<MedicalDetails
									primary_dx = {
										{
											value : 'Primary Dx',
											fields : {
												value : ['Arthritis'],
											},
											needs_editfield : true,
										}
									}
									emergency_code = {
										{
											value : 'Emergency Code',
											fields : {
												value : ['Green'],
											},
											needs_editfield : true,
										}
									}
								/>
							}						
						</div>							
						<hr />
					</div>
					<div>
						<label style={checkbox_css}>
							Schedule Today
							<input type='checkbox' name='view' value='schedule' onClick={this.ScheduleChangeDisplay.bind(this)}/>
						</label>
						<div>
							{
								this.state.schedule_display === 'block' &&
								<ScheduleDetails
									coordinator = {
										{
											value : 'Coordinator',
											fields : {
												value : ['Ann']
											},
											needs_editfield : true,
										}
									}
									aide_assigned = {
										{
											value : 'Aide Assigned',
											fields : {
												value : ['A-060']
											},
											needs_editfield : true,
										}
									}
								/>
							}							
						</div>
						<hr />
					</div>
				</div>
				<div>
					<input type='button' value='edit' onClick={this.onEditMode.bind(this)}/>
				</div>
			</div>
		)
	}
}
export default PatientDetails
