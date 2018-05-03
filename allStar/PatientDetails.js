import React from 'react';
import * as Util from './Util';
import * as DataStore from './DataStore';
import {Button,Modal,FormRow,FormSelect,FormField,FormInput,ModalFooter,ModalHeader,ModalBody} from 'elemental';
import AddressEditor from './AddressEditor';
import AuthorizationEditorNew from './AuthorizationEditorNew';
import ClaimEntityEditor from './ClaimEntityEditor';
import DiagCodeEditorNew from './DiagCodeEditorNew';
import MLTCEditor from './MLTCEditor';
import ProgramEditor from './ProgramEditor';
import ProgressEditor from './ProgressEditor';
import StatusEditor from './StatusEditor'
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';

class PatientDetails extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			patient : null,
			patient_fields : null,
			field_display : {
				display : 'none'
			},
			input_display : {
				display : 'block'
			}
		}
	}
	componentDidMount(){
		var that = this;
		var temp;
		DataStore.fetchPatient("0001",function(patient){
			var temp_state = {};
			var editfields = {};
			var displays = {};
			var temp_patient = patient;
			temp_state.patient_fields = {};
			for(var key in temp_patient){
				if(key.charAt(0)== '_') continue;
				var temp_obj = temp_patient[key];
				var key_obj;
				editfields[key] = {};
				if(typeof temp_obj === 'object'){
					if(Array.isArray(temp_obj)){
						key_obj = [];
					}else{
						key_obj = {}; 
					}
					if(Array.isArray(temp_obj) && temp_obj.length == 0 || temp_obj == {}){
						key_obj = 'n/a';
					}else for(var i in temp_obj){
						if(i.charAt(0)=='_') continue;
						var field = temp_obj[i];
						var field_obj;
						editfields[key][i] = {};
						if(typeof field === 'object'){
							if(Array.isArray(field)){
								field_obj = [];
							}else{
								field_obj = {};
							}
							for(var j in field){
								if(j.charAt(0)=='_') continue;
								editfields[key][i][j] = {}
								editfields[key][i][j].editfield = field[j];
								editfields[key][i][j].placeholder = field[j];
							}
						}else{
							editfields[key][i].editfield = field;
							editfields[key][i].placeholder = field;
						}
						key_obj[i] = field_obj;
					}
				}else{
					editfields[key].editfield = temp_obj;
					editfields[key].placeholder = temp_obj;
					key_obj = temp_obj;
				}
				displays[key] = {};
				displays[key].show = {display : 'block'};
				displays[key].hide = {display : 'none'};
			}
			delete displays.DOB,displays.MDCAID,displays.SOC,displays.SSC,displays.allstar_id,displays.coordinator,displays.gender,displays.phone,displays.name,displays.allstar_id,displays.flag,displays.initial_assessment_date,displays.physician,displays.level,displays.returned_485,displays,displays.six_month_485_returned,displays.authorization_received,displays.six_month_assessment_date,displays.primary_dx,displays.emergency_code;
			var field_checklist = ['DOB','MDCAID','SOC','SSC','allstar_id','category','coordinator','flag','gender','initial_assesssment_date','language','level','primary_dx','referrer','returned_485','six_month_485_returned','six_month_assessment_date','authorization_received','initial_assessment_date','physician'];
			var array_checklist = ['MLTC_CHHA','authorization','claim_entity','claim_type','diagnosis_codes','program','progress_report','service_code'];
			for(var i in field_checklist){
				if(!temp_patient.hasOwnProperty(field_checklist[i])){
					var missing_field = field_checklist[i];
					editfields[missing_field] = {};
					editfields[missing_field]['editfield'] = '';
					editfields[missing_field]['placeholder'] = '';
					temp_patient[missing_field] = {};
					temp_patient[missing_field]['editfield'] = '';
					temp_patient[missing_field]['placeholder'] = '';
					displays[missing_field] = {};
					displays[missing_field].show = {display : 'block'};
					displays[missing_field].hide = {display : 'none'};
				}
			}
			for(var i in array_checklist){
				if(!temp_patient.hasOwnProperty(array_checklist[i])){
					var missing_field = field_checklist[i];
					editfields[missing_field] = {};
					editfields[missing_field]['editfield'] = [];
					editfields[missing_field]['placeholder'] = [];
					temp_patient[missing_field] = {};
					temp_patient[missing_field]['editfield'] = [];
					temp_patient[missing_field]['placeholder'] = [];
					displays[missing_field] = {};
					displays[missing_field].show = {display : 'block'};
					displays[missing_field].hide = {display : 'none'};
				}
			}
			if(!temp_patient.hasOwnProperty('phone')){
				editfields['phone'] = {}
				editfields['phone']['other'] = {};
				editfields['phone']['other']['editfield'] = '';
				editfields['phone']['other']['placeholder'] = '';
				editfields['phone']['primary'] = {};
				editfields['phone']['primary']['editfield'] = '';
				editfields['phone']['primary']['placeholder'] = '';
				temp_patient['phone'] = {}
				temp_patient['phone']['other'] = {};
				temp_patient['phone']['other']['editfield'] = '';
				temp_patient['phone']['other']['placeholder'] = '';
				temp_patient['phone']['primary'] = {};
				temp_patient['phone']['primary']['editfield'] = '';
				temp_patient['phone']['primary']['placeholder'] = '';
				displays['phone'] = {};
				displays['phone']['primary'] = {};
				displays['phone']['primary'].show = {display : 'block'};
				displays['phone']['primary'].hide = {displays : 'none'};
				displays['phone']['other'] = {};
				displays['phone']['other'].show = {display : 'block'};
				displays['phone']['other'].hide = {display : 'none'};
			}else{
				 if(!temp_patient.phone.hasOwnProperty('other')){
					editfields['phone']['other'] = {};
					editfields['phone']['other']['editfield'] = '';
					editfields['phone']['other']['placeholder'] = '';
					temp_patient['phone']['other'] = {};
					temp_patient['phone']['other']['editfield'] = '';
					temp_patient['phone']['other']['placeholder'] = '';
					displays['phone']['other'] = {};
					displays['phone']['other'].show = {display : 'block'};
					displays['phone']['other'].hide = {display : 'none'};
				}
				if(!temp_patient.phone.hasOwnProperty('primary')){
					editfields['phone']['primary'] = {};
					editfields['phone']['primary']['editfield'] = '';
					editfields['phone']['primary']['placeholder'] = '';
					temp_patient['phone']['primary'] = {};
					temp_patient['phone']['primary']['editfield'] = '';
					temp_patient['phone']['primary']['placeholder'] = '';
					displays['phone']['primary'] = {};
					displays['phone']['primary'].show = {display : 'block'};
					displays['phone']['primary'].hide = {displays : 'none'};
				}
			}
			temp_state.patient = patient;
			temp_state.editfields = editfields;
			temp_state.displays = displays;
			that.setState(temp_state);
		});
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
		this.setState({field_display : {display :'none'}, input_display : {display : 'block'}});
	}

	onExitEditMode(e){
//		var components = [this.state.patient_fields,this.insurance_details.getDetails(),this.medical_details.getDetails(),this.schedule_details.getDetails()];
		var editfields = this.state.editfields;
		var temp_state = {};
		for(var key in editfields){
			var field = this.state.editfields[key];
			if(!field.hasOwnProperty("editfield")){
				for(var i in field){
					var field_obj = field[i];
					if(!field_obj.hasOwnProperty("editfield")){
						for(var j in field_obj){
							if(field_obj[j].editfield!=field_obj[j].placeholder){
								field_obj[j].editfield = field_obj[j].placeholder;
							}
						}
					}else{
						if(field_obj.editfield!=field_obj.placeholder){
							field_obj.editfield = field_obj.placeholder;
						}
					}
				}
			}else{
				if(field.editfield!=field.placeholder){
					field.editfield = field.placeholder;
				}
			}
		}
		temp_state.editfields = editfields;
		temp_state.field_display = {display : 'block'};
		temp_state.input_display = {display : 'none'};
		this.setState(temp_state);
	}
	EditFieldEvent(label,index,e){
		var temp = this.state.editfields;
		temp[label][index].editfield = e.target.value;
		this.setState({editfields : temp});
	}

	EditTextEvent(label,e){
		var temp = this.state.editfields;
		temp[label].editfield = e.target.value;
		this.setState({editfields : temp});
	}

	SaveChanges(e){
//		var components = [this.state.patient_labels,this.insurance_details.getDetails(),this.medical_details.getDetails(),this.schedule_details.getDetails()];
		var editfields = this.state.editfields;
		var temp_state = {};
		var patient = this.state.patient;
		for(var key in editfields){
			var field = this.state.editfields[key];
			if(!field.hasOwnProperty("editfield")){
				for(var i in field){
					var field_obj = field[i];
					if(!field_obj.hasOwnProperty("editfield")){
						for(var j in field_obj){
							if(field_obj[j].editfield!=field_obj[j].placeholder){
								temp_state[key] = this.state.patient[key];
								patient = field_obj[j].editfield;
								temp_state[key][i][j] = field_obj[j].editfield;
								field_obj[j].placeholder = field_obj[j].editfield;
							}
						}
					}else{
						if(field_obj.editfield!=field_obj.placeholder){
							patient[key][i] = field_obj.editfield;
							temp_state[key] = this.state.patient[key];
							temp_state[key][i] = this.state.patient[key][i];
							field_obj.placeholder = field_obj.editfield;
						}
					}
				}
			}else{
				if(field.editfield!=field.placeholder){
					patient[key] = field.editfield;
					temp_state[key] = field.editfield;
					field.placeholder = field.editfield;
				}
			}
		}
		temp_state.editfields = editfields;
		temp_state.patient = patient;
//		temp_state.field_display = {display : 'block'};
//		temp_state.input_display = {display : 'none'};
		this.setState(temp_state);
	}
	
	saveAddress(address){
		var patient = this.state.patient;
		patient.address = JSON.parse(JSON.stringify(address));
		this.setState({patient : patient});
	}

	saveAuthorization(auth_schedule){
		var patient = this.state.patient;
		if(!Util.isValid(patient.authorization)){
			patient.authorization = [];
		}
		var last_element = Util.getLastElement(patient.authorization);
//		delete last_element._id;
		if(JSON.stringify(last_element)!=JSON.stringify(auth_schedule.authorization)){
			patient.authorization.push(JSON.parse(JSON.stringify(auth_schedule.authorization)));
			this.setState({patient : patient});
		}
	}
	
	saveClaimEntity(claim_entity){
		var temp = claim_entity;
		var date = Moment(temp.date,["YYYYMMDD","M/D/YY","M/DD/YY","M/D/YYYY","M/DD/YYYY","MM/D/YY","MM/DD/YY","MM/D/YYYY","MM/DD/YYYY","M-D-YY","M-DD-YY","M-D-YYYY","M-DD-YYYY","MM-D-YY","MM-DD-YY","MM-D-YYYY","MM-DD-YYYY","M D YY","M DD YY","M D YYYY","M DD YYYY","MM D YY","MM DD YY","MM D YYYY","MM DD YYYY"],true);
		if(!date.isValid()) return;
		var patient = this.state.patient;
		if(!Util.isValid(patient.claim_entity)){
			patient.claim_entity = [];
		}
		patient.claim_entity = temp;
		this.setState({patient : patient})
	}

	saveMLTC(mltc){
		var temp = mltc;
		var date = Moment(Util.getLastElement(temp).date,["YYYYMMDD","M/D/YY","M/DD/YY","M/D/YYYY","M/DD/YYYY","MM/D/YY","MM/DD/YY","MM/D/YYYY","MM/DD/YYYY","M-D-YY","M-DD-YY","M-D-YYYY","M-DD-YYYY","MM-D-YY","MM-DD-YY","MM-D-YYYY","MM-DD-YYYY","M D YY","M DD YY","M D YYYY","M DD YYYY","MM D YY","MM DD YY","MM D YYYY","MM DD YYYY"],true);
		if(!date.isValid()) temp[temp.length-1].date = "n/a";
		var patient = this.state.patient;
		if(!Util.isValid(patient.MLTC_CHHA)){
			patient.MLTC_CHHA = [];
		}
		patient.MLTC_CHHA = temp;
		this.setState({patient : patient});
	}

	saveDiagCode(diag){
		if(!Util.isValid(diag) || diag.length == 0) return;
		var temp = JSON.parse(JSON.stringify(diag));
		var patient = this.state.patient;
		if(!Util.isValid(patient.diagnosis_codes)){
			patient.diagnosis_codes = [];
		}
		patient.diagnosis_codes = temp;
		this.setState({patient : patient});
	}

	saveLanguage(language){
		var patient = this.state.patient;
		patient.language = language;
		this.setState({patient:patient});
	}

	saveProgram(program){
		var patient = this.state.patient;
		if(!Util.isValid(patient.program)){
			patient.program = [];
		}
		patient.program = program;
		this.setState({patient : program});
	}

	saveStatus(status){
		var patient = this.state.patient;
		if(!Util.isValid(patient.status)){
			patient.status = []
		}
		patient.status = status;
		this.setState({status : status});
	}

	ShowComponent(field, e){
		var display = {};
		display['displays'] = this.state.displays;
		display['displays'][field].show = {display : 'none'};
		display['displays'][field].hide = {display : 'block'};
		this.setState(display);
	}

	HideComponent(field, e){
		var display = {};
		display['displays'] = this.state.displays;
		display['displays'][field].hide = {display : 'none'};
		display['displays'][field].show = {display : 'block'};
		this.setState(display);
	}

	ShowAllComponents(e){
		var displays = {};
		displays['displays'] = this.state.displays;
		for(var key in displays['displays']){
			displays['displays'][key].show = {display : 'none'};
			displays['displays'][key].hide = {display : 'block'};
		}
		this.setState(displays);
	}

	HideAllComponents(e){
		var displays = {};
		displays['displays'] = this.state.displays;
		for(var key in displays['displays']){
			displays['displays'][key].show = {display : 'block'};
			displays['displays'][key].hide = {display : 'none'};
		}
		this.setState(displays);
	}

	SaveAll(e){
		var save_pairs = {
			address : this.saveAddress.bind(this.state.patient.address),
			authorization : this.saveAuthorization.bind(this.state.patient.authorization),
			claim_entity : this.saveClaimEntity.bind(this.state.patient.claim_entity),
			MLTC_CHHA : this.saveMLTC.bind(this.state.patient.MLTC_CHHA),
			diagnosis_codes : this.saveDiagCode.bind(this.state.patient.diagnosis_codes),
			language : this.saveLanguage.bind(this.state.patient.language),
			program : this.saveProgram.bind(this.state.patient.program),
			status : this.saveStatus.bind(this.state.patient.status),
		}
		var displays = this.state.displays;
		for(var key in save_pairs){
			if(displays[key].hide['display'] == 'block'){
				 save_pairs[key];
			}
//			save_pairs[key];
		}
		this.SaveChanges(e);
	}

	render()
	{
		if(!Util.isValid(this.state.patient))
		{
			return null;
		}
		var display_flex = {
			display : 'flex'
		}
		
		var checkbox_css = {
			marginTop : '2px',
			padding : '3px',
		}
		var textbox = {
			width : '175px'
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
	
		var textbox_s = {
			width : '100px',
		}	

		var textbox_l = {
			width : '225px',
		}

		var grand_title = {
			fontWeight : 'bold',
			fontSize : '17px',
		}
		
		var border_style = {
			paddingTop : '4px',
			paddingLeft : '10px',
			paddingRight : '10px',
			marginBottom : '-14px',
		}

		var padding_sides = {
			paddingLeft : '10px',
			paddingRight : '10px',
			paddingTop : '5px',
			paddingBottom : '5px'
		}

		var div_wrap = {
			paddingLeft : '6px',
			paddingRight : '6px',
		}
		
		var buttons_padding = {
			padding : '5px'
		}
			
		var color = this.state.editfields.emergency_code.editfield.toLowerCase();
		var emergency_code = (color == 'green'|| color == 'yellow' || color == 'red' ) ? {backgroundColor : color} : {backgroundColor : 'white'};

		var buttons_shift = {
			marginTop : '14px',
			marginLeft : '-155px',
			border : '1.5px solid',
//			borderRadius : '35px 15px 35px',
			borderRadius : '15px',
			boxShadow : '3px 3px #888888',
			backgroundColor : "#FAFF7D"
		}
		return(
			<div>
				<div style = {display_flex}>
					<div>
						<div style = {border_style}>
							<FormRow>
								<FormField width = 'one-fifth' label='Last name'>
									<FormInput name = 'first_name' value = {this.state.editfields.name.last_name.editfield} onChange = {this.EditFieldEvent.bind(this,'name','last_name')}/>
								</FormField>
								<FormField width = 'one-fifth' label='First name'>
									<FormInput name = 'first_name' value = {this.state.editfields.name.first_name.editfield} onChange = {this.EditFieldEvent.bind(this,'name','first_name')}/>
								</FormField>
								<FormField width = 'one-fifth' label='DoB'>
									<FormInput name = 'dob' value = {this.state.editfields.DOB.editfield} onChange = {this.EditTextEvent.bind(this,'DOB')}/>
								</FormField>
								<FormField width = 'one-fifth' label='Gender'>
									<FormInput name = 'gender' value = {this.state.editfields.gender.editfield} onChange = {this.EditTextEvent.bind(this,'gender')}/>
								</FormField>
							</FormRow>
						</div>
						<div style = {border_style}>
							<FormRow>
								<FormField width = 'one-fifth' label='SoC'>
									<FormInput name = 'soc' value = {this.state.editfields.SOC.editfield} onChange = {this.EditTextEvent.bind(this,'SOC')}/>
								</FormField>
								<FormField width = 'one-fifth' label='SSC'>
									<FormInput name = 'ssc' value = {this.state.editfields.SSC.editfield} onChange = {this.EditTextEvent.bind(this,'SSC')}/>
								</FormField>
								<FormField width = 'one-fifth' label='Phone (primary)'>
									<FormInput name = 'phone_primary' value = {this.state.editfields.phone.primary.editfield} onChange = {this.EditFieldEvent.bind(this,'phone','primary')}/>
								</FormField>
							<FormField width = 'one-fifth' label='Phone (other)'>
									<FormInput name = 'phone_other' value = {this.state.editfields.phone.other.editfield} onChange = {this.EditFieldEvent.bind(this,'phone','other')}/>
								</FormField>					
							</FormRow>
						</div>
						<div style = {border_style}>
							<FormRow>
								<FormField width = 'one-fifth' label='MDCAID'>
									<FormInput name = 'mdcaid' value = {this.state.editfields.MDCAID.editfield} onChange = {this.EditTextEvent.bind(this,'MDCAID')}/>
								</FormField>
								<FormField width = 'one-fifth' label='Allstar Id'>
									<FormInput name = 'allstar_id' value = {this.state.editfields.allstar_id.editfield} onChange = {this.EditTextEvent.bind(this,'allstar_id')}/>
								</FormField>
								<FormField width = 'one-fifth' label='Referrer'>
									<FormInput name = 'referrer' value = {this.state.editfields.referrer.editfield} onChange = {this.EditTextEvent.bind(this,'referrer')}/>
								</FormField>
								<FormField width = 'one-fifth' label='Coordinator'>
									<FormInput name = 'coordinator' value = {this.state.editfields.coordinator.editfield} onChange = {this.EditTextEvent.bind(this,'coordinator')}/>
								</FormField>
							</FormRow>
						</div>
					</div>
					<div>
						<div style = {buttons_shift}>
							<div style = {Object.assign({},div_wrap,display_flex,{paddingTop : '3px'})}>
								<div style = {buttons_padding}>
									<Button type='primary' style = {this.state.input_display} onClick={this.SaveChanges.bind(this)}>
										Save
									</Button>
								</div>
								<div style = {buttons_padding}>
									<Button type='primary' style = {this.state.input_display} >
										Exit
									</Button>
								</div>
								<div style = {buttons_padding}>
									<Button type='primary' style = {this.state.input_display} onClick={this.ShowAllComponents.bind(this)}>
										Show All
									</Button>
								</div>
								<div style = {buttons_padding}>
									<Button type='primary' style = {this.state.input_display} onClick={this.HideAllComponents.bind(this)}>
									Hide All
									</Button>
								</div>
								<div style = {buttons_padding}>
									<Button type='primary' style = {this.state.input_display} onClick={this.SaveAll.bind(this)}>
										Save All
									</Button>
								</div>
							</div>
							<div style = {Object.assign({},div_wrap,display_flex)}>
								<div style = {Object.assign({},buttons_padding,this.state.displays.address.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'address')}>
										Show Address
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.address.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'address')}>
										Hide Address
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.authorization.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'authorization')}>
										Show Authorization
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.authorization.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'authorization')}>
										Hide Authoriztion 
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.language.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'language')}>
										Show Language
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.language.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'language')}>
										Hide Language
									</Button>
								</div>
							</div>
							<div style = {Object.assign({},div_wrap,display_flex)}>
								<div style = {Object.assign({},buttons_padding,this.state.displays.claim_entity.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'claim_entity')}>
										Show Claim Entity 
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.claim_entity.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'claim_entity')}>
										Hide Claim Entity
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.MLTC_CHHA.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'MLTC_CHHA')}>
										Show MLTC CHHA
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.MLTC_CHHA.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'MLTC_CHHA')}>
										Hide MLTC CHHA
									</Button>
								</div>
							</div>
							<div style = {Object.assign({},div_wrap,display_flex,{paddingBottom : '3px'})}>
								<div style = {Object.assign({},buttons_padding,this.state.displays.diagnosis_codes.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'diagnosis_codes')}>
										Show Diagnosis
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.diagnosis_codes.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'diagnosis_codes')}>
										Hide Diagnosis
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.program.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'program')}>
										Show Program
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.program.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'program')}>
										Hide Program
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.status.show)}>
									<Button type='primary' onClick={this.ShowComponent.bind(this,'status')}>
										Show Status
									</Button>
								</div>
								<div style = {Object.assign({},buttons_padding,this.state.displays.status.hide)}>
									<Button type='primary' onClick={this.HideComponent.bind(this,'status')}>
										Hide Status
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div style = {border_style}>
						<FormRow>
							<FormField width = 'one-seventh' label='Flag'>
								<FormInput name = 'flag' value = {this.state.editfields.flag.editfield} onChange = {this.EditTextEvent.bind(this,'flag')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Initial Assessment Date'>
								<FormInput name = 'initial_assessment_date' value = {this.state.editfields.initial_assessment_date.editfield} onChange = {this.EditTextEvent.bind(this,'initial_assessment_date')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Authorization Received'>
								<FormInput name = 'authorization_received' value = {this.state.editfields.authorization_received.editfield} onChange = {this.EditTextEvent.bind(this,'authorization_received')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Physician : (Phone)'>
								<FormInput name = 'physician' value = {this.state.editfields.physician.editfield} onChange = {this.EditTextEvent.bind(this,'physician')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Level'>
								<FormInput name = 'level' value = {this.state.editfields.level.editfield} onChange = {this.EditTextEvent.bind(this,'level')}/>
							</FormField>
						</FormRow>
					</div>
					<div style = {border_style}>
						<FormRow>
							<FormField width = 'one-seventh' label='Returned 485'>
								<FormInput name = 'returned_485' value = {this.state.editfields.returned_485.editfield} onChange = {this.EditTextEvent.bind(this,'returned_485')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Six Month 485 Returned'>
								<FormInput name = 'six_month_485_returned' value = {this.state.editfields.six_month_485_returned.editfield} onChange = {this.EditTextEvent.bind(this,'six_month_485_returned')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Six Month Assessment Date'>
								<FormInput name = 'six_month_assessment_date' value = {this.state.editfields.six_month_assessment_date.editfield} onChange = {this.EditTextEvent.bind(this,'six_month_assesment_date')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Primary Dx'>
								<FormInput name = 'primary_dx' value = {this.state.editfields.primary_dx.editfield} onChange = {this.EditTextEvent.bind(this,'primary_dx')}/>
							</FormField>
							<FormField width = 'one-seventh' label='Emergency Code'>
								<FormInput name = 'emergency_code' value = {this.state.editfields.emergency_code.editfield} onChange = {this.EditTextEvent.bind(this,'emergency_code')} style = {emergency_code}/>
							</FormField>
						</FormRow>
					</div>
				</div>
				<div>
					<div style = {Object.assign({},this.state.displays.address.hide,padding_sides,{width :'1100px', padding : '10px'})}>
					{
						this.state.displays.address.hide['display'] == 'block' &&
						<AddressEditor
							ref = {(input) => {this.address_editor = input}}
							address = {this.state.patient.address} 
							onSave = {this.saveAddress.bind(this)}
						/>
					}
					</div>
					<div style = {Object.assign({},{width : '1100px'}, padding_sides,this.state.displays.authorization.hide)}>
						{
							this.state.displays.authorization.hide['display'] == 'block' &&
							<AuthorizationEditorNew
								ref = {(input) => {this.authorization_editor = input}}
								auth = {(Util.isValid(this.state.patient)) ? Util.getLastElement(this.state.patient.authorization) : null}
								allstar_id = {this.state.patient.allstar_id}
								onSave = {this.saveAuthorization.bind(this)}
							/>
						}
					</div>
					<div style = {display_flex}>
						<div style = {Object.assign({},this.state.displays.claim_entity.hide,{width : '550px', padding : '10px'})}>
							{
								this.state.displays.claim_entity.hide['display'] == 'block' &&
								<ClaimEntityEditor
									ref = {(input) => {this.claim_entity_editory = input}}
									history = {this.state.patient.claim_entity}
									programs = {['ALLSTAR','ALLSTAR_FI']}
									onSave = {this.saveClaimEntity.bind(this)}
								/>
							}
						</div>
						<div style = {Object.assign({},this.state.displays.MLTC_CHHA.hide, {width : '550px', padding : '10px'})}>
							{
								this.state.displays.MLTC_CHHA.hide['display'] == 'block' && 
								<MLTCEditor
									ref = {(input) => {this.mltc_editor = input}}
									history = {this.state.patient.MLTC_CHHA}
									options = {['HF','VC']}
									onSave = {this.saveMLTC.bind(this)}
								/>
							}
						</div>
					</div>
					<div style = {display_flex}>
						<div style = {Object.assign({},this.state.displays.diagnosis_codes.hide,{width : '550px', padding : '10px'})}>
							{
								this.state.displays.diagnosis_codes.hide['display'] == 'block' &&
								<DiagCodeEditorNew
									ref = {(input) => {this.diag_code_editor = input}}
									history = {this.state.patient.diagnosis_code}
									programs = {['ALLSTAR','ALLSTAR_FI']}
									onSave = {this.saveDiagCode.bind(this)}
								/>
							}
						</div>
						<div style = {Object.assign({},this.state.displays.language.hide,{width : '550px', padding : '10px'})}>
							{
								this.state.displays.language.hide['display'] == 'block' &&
								<LanguageEditorNew
									ref = {(input) => {this.language_editor = input}}
									language_options = {["English","Cantonese","Mandarin","Fujian","Fuzhou","Spanish","Toisan","Korean","Chinese"]}
									current_language = {this.state.patient.language}
									onSave = {this.saveLanguage.bind(this)}
								/>
							}
						</div>
					</div>
					<div style = {display_flex}>
						<div style = {Object.assign({},this.state.displays.program.hide,{width : '550px', padding : '10px'})}>
							{
									
								this.state.displays.program.hide['display'] == 'block' &&
								<ProgramEditor
									ref = {(input) => {this.program_editor = input}}
									history = {this.state.patient.program}
									programs = {["PCW","CDPAP"]}
									onSave = {this.saveProgram.bind(this)}
								/>
							}
						</div>
						<div style = {Object.assign({},this.state.displays.status.hide,{width : '550px', padding : '10px'})}>
							{	
								this.state.displays.status.hide['display'] == 'block' &&
								<StatusEditor
									ref = {(input) => {this.status_editor = input}}
									status_options ={["ACTIVE","INACTIVE"]}
									status_history = {this.state.patient.status}
									onSave = {this.saveStatus.bind(this)}
								/>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
//asdfasdf
}
export default PatientDetails
