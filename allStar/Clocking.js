import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';
import {FormField} from 'elemental';
import Moment from 'moment';

class Clocking extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentClock: null,
			currentClockTime: null,
			clockInText : "Clock In",
			clockInTime : '',
			clockInDisabled : false,
			clockInTimeDisplay : 'none',
			clockedOutText : "Clock Out",
			clockedOutTime: '',
			clockedOutDisabled : true,
			clockedOutDisplay : 'none',
			clockedOutTimeDisplay: 'none',
			hoursWorked : 0,
			minutesWorked : 0,
			timeWorkedDisplay : 'none',
		}
	}	

	componentWillMount(){
		var that = this;
		var clock = setInterval(function(){
			var time_moment = Moment();
			that.setState({currentClock : clock, currentClockTime : time_moment.format('LTS')});
		},1000);
	}
	
	onClockIn(e){
		var clock_in = Moment().format('LT');
		this.setState({clockInTime : clock_in, clockInDisplay : 'inline-block', 
clockInDisabled : true, clockInTimeDisplay : 'inline-block', clockedOutDisplay : 'inline-block', clockedOutDisabled : false});
	}

	onClockOut(e){
		var clock_in = Moment(this.state.clockInTime, 'LT');
		var clock_out = Moment();
		clearInterval(this.state.currentClock);
		var hours_worked = clock_out.diff(clock_in, 'hours');
		var minutes_worked = clock_out.diff(clock_in, 'minutes');
		var seconds_worked = clock_out.diff(clock_in, 'seconds');
		if(minutes_worked>0 && seconds_worked<60){
			minutes_worked--;
		}
		if(minutes_worked>0 && seconds_worked>=60){
			seconds_worked%=60;
		}
		if(hours_worked>0 && minutes_worked<60){
			hours_worked--;
		}
		if(hours_worked>0 && minutes_worked>=60){
			minutes_worked%=60;
		}
		this.setState({clockedOutTime : clock_out.format('LT'), clockedOutDisabled : true, clockedOutTimeDisplay : 'inline-block', timeWorkedDisplay : 'block', hoursWorked : hours_worked, minutesWorked : minutes_worked});
	}

	render(){

		var clock_in_time_display = {
			display : this.state.clockInTimeDisplay,
		}

		var clocked_out_display = {
			display : this.state.clockedOutDisplay,
		}
		
		var clocked_out_time_display = {
			display : this.state.clockedOutTimeDisplay,
		}
		
		var time_worked_display = {
			display : this.state.timeWorkedDisplay,
		}

		return(
			<div>
				<div>
					{this.state.currentClockTime}
				</div>
				<div>
					<input type = 'button' value = {this.state.clockInText} disabled={this.state.clockInDisabled} onClick={this.onClockIn.bind(this)}/>
					<label style={clock_in_time_display}>
						{this.state.clockInTime}
					</label>
				</div>
				<div style={clocked_out_display}>
					<input type = 'button' value = {this.state.clockedOutText} disabled={this.state.clockedOutDisabled} onClick={this.onClockOut.bind(this)}/>
					<label style={clocked_out_time_display}>
						{this.state.clockedOutTime}
					</label>
				</div>
				<div style={time_worked_display}>
					You worked for {this.state.hoursWorked} hr(s)  & {this.state.minutesWorked}minutes. Get home safe c:
				</div>
			</div>
		)
	}                                                 
}
export default Clocking;	
