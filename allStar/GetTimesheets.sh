#!/bin/bash

CDPAS_timesheets="/mounts/nas_server/Timesheet/CDPAS Timesheet/"
PCW_timesheets="/mounts/nas_server/Timesheet/PCW Timesheet/"
CDPAS_timesheets_added=0
CDOAS_timesheets_not_added=0
PCW_timesheets_added=0
PCW_timesheets_not_added=0
timesheets_added=$((CDPAS_timesheets_added + PCW_timesheets_added))
IFS=$'\n'
for file in $(find "$CDPAS_timesheets" -name "*.pdf*" | sed -e 's/\/mounts\/nas_server\/Timesheet\///')
do
	CDPAS_check=$(echo "db.timesheet.count({'file_location':\"$file\"})" | mongo | egrep '^[0-9]+')
	file_dir="$(cut -d'/' -f3 <<<"$file")"
	if [[ $CDPAS_check > 0 ]]
	then
		echo "CDPAS timesheet found $file_dir $CDPAS_check"x
		((CDPAS_timesheets_not_added++))
	else
		echo "CDPAS timesheet did not find $file_dir $CDPAS_check"x 
		((CDPAS_timesheets_added++))
	fi
done
echo "~~CDPAS TIMESHEETS DONE CHECKING~~"
for file in $(find "$PCW_timesheets" -name "*.pdf*" | sed -e 's/\/mounts\/nas_server\/Timesheet\///')
do
	PCW_check=$(echo "db.timesheet.count({'file_location':\"$file\"})" | mongo | egrep '^[0-9]+')
	file_dir="$(cut -d'/' -f3 <<<"$file")"
	if [[ $PCW_check > 0 ]]
	then
		echo "PCW timesheet found $file_dir $PCW_check"x
		((PCW_timesheets_not_added++))
	else
		echo "PCW timesheet did not find $file_dir $PCW_check"x
		((PCW_timesheets_added++))
	fi
done
echo "$CDPAS_timesheets_added CDPAS timesheets missing"
echo "$CDPAS_timesheets_not_added CDPAS timesheets not added"
echo "$PCW_timesheets_added PCW timesheets missing"
echo "$PCW_timesheets_not_added PCW timesheets not added"
echo "$timesheets_added timesheets were added"
