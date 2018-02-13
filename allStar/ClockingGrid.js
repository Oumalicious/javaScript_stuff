import React, {Component} from 'react';
import * as DataStore from './DataStore';
import {FormSelect} from 'elemental';
import {FormField} from 'elemental';
import Moment from 'moment';
import {AgGridReact} from 'ag-grid-react';

class ClockingGrid extends Component {
	constructor(props){
	
		var columns = [
			{headerName: "Employee", field : "employee"},
			{headerName: "Date", field : "date"},
			{headerName: "Clock In", field : "clock_in"},
			{headerName: "Clock Out", field : "clock_out"},
			{headerName: "Hours Worked", field : "hours_worked"}
		];
		var rowData = [
			{employee: "vincent", date: "2/8/18/", clock_in : "9:02:33", clock_out : "2:30:00", hours_worked : "5 hrs &  5 minutes"},
		];
	
		super(props);
			this.state = {
				columnDefs : columns,
				rowData: rowData,
			}
	}
	render(){
		return (
			<div>
				<div>
					<AgGridReact
						columnDefs={this.state.columnDefs}
						rowData={this.state.rowData}
					>
//						＼(＾▽＾)／
						<AgGridColumn field='employee'></AgGridColumn>
						<AgGridColumn field='date'/>
						<AgGridColumn field='clock_in'/>
						<AgGridColumn field='clock_out'/>
						<AgGridColumn field='hours_worked'/>
					</AgGridReact>
				</div>
			</div>
		)
	}
}

export default ClockingGrid
