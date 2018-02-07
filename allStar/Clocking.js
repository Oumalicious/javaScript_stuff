import React, {Component} from  'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';
import {FormField} from 'elemental';
import {Moment} from 'moment';

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
			clockInTimer: null,
			clockedOutText : "Clock Out",
			clockedOutTime: '',
			clockedOutDisabled : true,
			clockedOutDisplay : 'none',
			clockOutTimer : null,
			clockedOutTimeDisplay: 'none',
			meridiem: 'please work',
			hourWorked : 0,
			minutesWorked : 0,
			timeWorked : '',
			timeWorkedDisplay : 'none'
		}
	}	

	componentWillMount(){
		/*
		var that = this;
		var clock = setInterval(function(){
			var on_going_timer = new Date();
			var hours = on_going_timer.getHours();
			var minutes = on_going_timer.getMinutes();
			var seconds = on_going_timer.getSeconds();
			var meridiem;
			if(hours>12){
				meridiem = 'a.m.';
			}else{
				meridiem = 'p.m.';
			}
			if(minutes<10){
				minutes = ""+"0"+minutes;
			}
			if(seconds<10){
				seconds = ""+"0"+seconds;
			}
			var timer_concat = ''+hours+":"+minutes+":"+seconds;
			that.setState({currentClock : clock, currentClockTime : timer_concat});
		},1000);
		*/
		var clock_moment = Moment();
		this.setState({currentClock : clock_moment});
	}
	
	onClockIn(e){
		this.setState({clockInTime : this.state.currentClockTime, clockInDisplay : 'inline-block', 
clockInDisabled : true, clockInTimeDisplay : 'inline-block', clockedOutDisplay : 'inline-block', clockedOutDisabled : false});
	}

	onClockOut(e){
		var temp_clock_in = this.state.clockInTime;
		var temp_clock_out = this.state.currentClockTime;
		clearInterval(this.state.currentClock);
		this.setState({clockedOutTime : this.state.currentClockTime, clockedOutDisabled : true, clockedOutTimeDisplay : 'inline-block', timeWorkedDisplay : 'block'});
		var clock_in_split_array = temp_clock_in.split(":");
		var clocked_out_split_array = temp_clock_out.split(":");
		var _MINUTES = 1;
		var _HOURS = 0;
		var carry_over = false;
		var minutes_worked = clocked_out_split_array[_MINUTES] - clock_in_split_array[_MINUTES];
		if(minutes_worked<0){
			minutes_worked+=60;
			carry_over=true;
		}
		var hours_worked = clocked_out_split_array[_HOURS] - clock_in_split_array[_HOURS];
		if(carry_over){
			hours_worked--;
		}
		this.setState({hoursWorked : hours_worked, minutesWorked : minutes_worked, timeWorked : ""+hours_worked+" hr(s) "+minutes_worked+" minutes"});
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
					You worked for {this.state.timeWorked}. Get home safe c:
				</div>
			</div>
			<div>
			</div>
		</div>
		)
	}                                                 
}
export default Clocking;	
