import React, {Component} from 'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';
import {FormField} from 'elemental';
import Moment from 'moment';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import * as PaidLeave from './PaidLeaveEligibility.js';

class PaidLeaveGrid extends Component {
	constructor(props){
		super(props);
		var columns = [
			{headerName: "Week", field : "week", suppressMovable : true},
			{headerName: "Day + Shift", field : "day", suppressMovable : true},
			{headerName: "Eligible", field : "eligible", suppressMovable : true},
			{headerName: "Eligible Date", field : "eligible_date", suppressMovable : true},
			{headerName: "Hours Met Date", field : "hours_met_date", suppressMovable : true},
			{headerName: "Days Met", field : "days_met_date", suppressMovable : true},
			{headerName: "Total Hours", field : "total_hours", suppressMovable : true},
			{headerName: "Days Employed", field : "days_employed", suppressMovable : true},
		];	
		this.state = {
			columnDefs : columns,
			rowData : null,
		}
	}
	componentWillMount(){
		var temp_array = PaidLeave.PaidLeaveStatus(20170716, PaidLeave.GetSamplePayrolls());
		var temp_grid_array = [];
		for(var index in temp_array){
			temp_grid_array.push({
				week: temp_array[index].week,
				day : temp_array[index].day,
				eligible: temp_array[index].eligible,
				eligible_date: temp_array[index].eligible_date,
				hours_met_date: temp_array[index].hours_met,
				days_met_date: temp_array[index].days_met,
				total_hours: temp_array[index].total_hours,
				days_employed: temp_array[index].days_employed,
			});
		}
		this.setState({rowData : temp_grid_array});
	}
	render(){
		var divContainer = {marginTop: '0', width: '100%', height: '100%'};
		var grid_style={width: '100%', height: '500px'};
		return (
			<div style={divContainer} className='ag-blue'>
				<div style={grid_style}>
					<AgGridReact
						columnDefs={this.state.columnDefs}
						rowData={this.state.rowData}
						enableSorting
						enableFilter
					/>
				</div>
			</div>
		)
	}
}

export default PaidLeaveGrid
