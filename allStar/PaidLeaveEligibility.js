var Moment = require('moment');
var payrolls = [
	{
//		"_id" : ObjectId("5963eb94d568b9283f362746"),
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170716,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			}
		},
		"__v" : 0,
		"work_times_recorded" : true,
		"payroll_date" : 20170815
	},
	{
//		"_id" : ObjectId("598b2b46e387133b54cbfcde"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170723,
		"patient_id" : "0289",
		"work_times" : {
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170815
	},
	{
//		"_id" : ObjectId("5963eb94d568b9283f362748"),
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170730,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"work_times_recorded" : true,
		"payroll_date" : 20170830
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd9652d"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170806,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170830
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd9652e"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170813,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170915
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd9652f"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170820,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170915
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd96530"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170827,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170930
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd96531"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170903,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20170930
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd96532"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170910,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171015
	},
	{
//		"_id" : ObjectId("59973b20b5a362489dd96533"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20170917,
		"patient_id" : "0289",
		"work_times" : {
			"Tuesday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Thursday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12:00 PM"
			},
			"Saturday" : {
				"start_time" : "9:00 AM",
				"end_time" : "12"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171015
	},
	{
//		"_id" : ObjectId("59e4bce0f15c013eec211d0e"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171001,
		"patient_id" : "0860",
		"date_created" : "10/16/2017 10:06:24",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171030
	},
	{
//		"_id" : ObjectId("59e4b715f15c013eec211d09"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171008,
		"patient_id" : "0860",
		"date_created" : "10/16/2017 09:41:41",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171030
	},
	{
//		"_id" : ObjectId("5a0dc57dd795164ffe93c8d4"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171029,
		"patient_id" : "0860",
		"date_created" : "11/16/2017 12:06:05",
		"work_times" : {
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171130
	},
	{
//		"_id" : ObjectId("5a0dc52cd795164ffe93c8c8"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171105,
		"patient_id" : "0860",
		"date_created" : "11/16/2017 12:04:44",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171130
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132229"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171112,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171215
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f813222d"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171119,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171215
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132231"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171126,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171230
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132235"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171203,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20171230
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132239"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171210,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180115
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f813223d"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171217,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180115
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132241"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171224,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180115
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132245"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20171231,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180130
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132249"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20180107,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180130
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f813224d"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20180114,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180215
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132251"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20180121,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Saturday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			}
		},
		"__v" : 0,
		"payroll_date" : 20180215
	},
	{
//		"_id" : ObjectId("5a2064715df3ff07f8132255"),
		"work_times_recorded" : true,
		"paid" : true,
		"aide_id" : "A-001",
		"week" : 20180128,
		"patient_id" : "0860",
		"date_created" : "11/30/2017 15:05:05",
		"work_times" : {
			"Sunday" : {
				"start_time" : "2:00 PM",
				"end_time" : "6:30 PM"
			},
			"Friday" : {
				"start_time" : "",
				"end_time" : ""
			},
			"Saturday" : {
				"start_time" : "",
				"end_time" : ""
			}
		},
		"__v" : 0,
		"payroll_date" : 20180228
	}
];

function PaidLeaveEligibility (start_date, payrolls){
	var start_moment = Moment(start_date, "YYYYMMDD");
	var total_hours = 0;
	var DAYS_MET = false;
	var DAYS_MET_MOMENT;
	var HOURS_MET = false;
	var HOURS_MET_MOMENT;
	var eligible = false;
	var eligible_date = null;
	var CAN_START;
	for(var payroll in payrolls){
		var current_week = payrolls[payroll];
		var week_number = Moment(payrolls[payroll].week, 'YYYYMMDD');
		var days_employed = week_number.diff(start_moment, 'days');
		CAN_START = (start_moment.isBefore(week_number) || start_moment.isSame(week_number));
		if(!(DAYS_MET) && days_employed >= 120){
			_DAYS_MET = true;
			var temp_days_employed = days_employed;
			var temp_moment = Moment(week_number, 'YYYYMMDD');
			if(!(DAYS_MET) && temp_days_employed>=120){
				DAYS_MET = true;
				var difference = temp_days_employed - 120;
				DAYS_MET_MOMENT = Moment(week_number.subtract(difference,'days'), 'YYYYMMDD').format("YYYYMMDD");
			}
		}
		if(!eligible && DAYS_MET && HOURS_MET){
			eligible_date = (!eligible && DAYS_MET && HOURS_MET) ? eligible_DATE = HOURS_MET_MOMENT : eligible_date = DAYS_MET_MOMENT;
		}
		var work_times = payrolls[payroll].work_times;
		var days_worked = Object.keys(work_times);
		var current_day_moment = Moment(start_moment.day(), 'dddd');
		if(CAN_START){
			for(var days in work_times){
				if(Moment(work_times[days].start_time, 'h:mm a').isValid()){
					var current_day = week_number;
					var start_shift = Moment(work_times[days].start_time, 'h:mm a');
					var end_shift = Moment(work_times[days].end_time, 'h:mm a');
					var hours_worked = end_shift.diff(start_shift, 'hours', true);
					total_hours += hours_worked;
					var day_of_week = Moment(days_worked[days], 'dddd');
					var days_difference = day_of_week.diff(current_day_moment, 'days');
					current_day = current_day.add(days_difference, 'day');
					if(!(HOURS_MET) && total_hours >= 80){
						HOURS_MET = true;
						HOURS_MET_MOMENT = Moment(current_day, "YYYYMMDD").format("YYYYMMDD");
					}
					if(!eligible && DAYS_MET && HOURS_MET ){
						eligible = true;
						eligible_date = Moment(current_day, "YYYYMMDD").format("YYYYMMDD");
					}
					current_day_moment = current_day.add(1,'days');
				}
			}
		}
	}
	var eligible_status = {
		"eligible" : eligible,
		"eligible_date" : eligible_date,
		"hours_met" : HOURS_MET_MOMENT,
		"days_met" : DAYS_MET_MOMENT,
		"total_hours" : total_hours,
		"days_employed" : days_employed,
	}
	return eligible_status;
}

var result = PaidLeaveEligibility(20171217,payrolls );
console.log(JSON.stringify(result));
