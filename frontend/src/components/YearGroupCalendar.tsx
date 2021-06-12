/** Year Group Calendar */

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import listPlugin from "@fullcalendar/list";

/**
 * Year 12 Year Group Calendar
 * Will eventually have 1 for all year groups
 */
export default class YearGroupCalendar extends React.Component {
	render() {
		return (
			<div style={{
				padding: 50
			}}>
				<h1 style={{ fontSize: "3em", marginBottom: 0 }}>Year 12 Calendar</h1>
				<h2>Contains Exam Details.</h2>
				<h3 style={{ marginBottom: 30 }}>Other year groups to follow later.</h3>
				<FullCalendar
					plugins={[listPlugin, iCalendarPlugin]}
					initialView="listWeek"
					events={{
						url: "/cal/KECHB/Year12.ics",
						format: "ics",
					}}
					visibleRange={{
						start: "2021-06-14",
						end: "2021-06-20"
					}}
					eventBackgroundColor="#fe5000"
					viewDidMount={function (calendar) { calendar.view.calendar.gotoDate("2021-06-14"); }}
					height="auto"
				/>
			</div>
		);
	}
}