/* import React from "react";

const RightPanel = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthsOfYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    // get the number of days in the current month
    const numDays = new Date(year, month + 1, 0).getDate();

    // get the day of the week for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // create an array of empty strings to represent the days before the first day of the month
    const daysBefore = new Array(firstDayOfMonth).fill("");

    // create an array of numbers to represent the days of the month
    const daysOfMonth = Array.from({ length: numDays }, (_, i) => i + 1);

    // combine the days before and days of the month into a single array
    const days = [...daysBefore, ...daysOfMonth];

    return (
        <div className="right-panel">
            <div className="right-panel-header">Calendar</div>
            <div className="calendar">
                <div className="calendar-header">
                    {monthsOfYear[month]} {year}
                </div>
                <div className="calendar-body">
                    <div className="calendar-row">
                        {daysOfWeek.map((day) => (
                            <div className="calendar-header-cell">{day}</div>
                        ))}
                    </div>
                    {days.reduce(
                        (rows, day, index) =>
                            index % 7 === 0
                                ? [...rows, [day]]
                                : [...rows.slice(0, -1), [...rows.slice(-1)[0], day]],
                        []
                    ).map((row) => (
                        <div className="calendar-row">
                            {row.map((day) => (
                                <div
                                    className={
                                        day === ""
                                            ? "calendar-cell empty-cell"
                                            : "calendar-cell"
                                    }
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RightPanel;
 */


import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png'

const RightPanel = () => {
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (value) => {
        setDate(value);
    };

    return (
        <div className="right-panel">
            <center><img className="mt-24 mb-10" src={lyfeonLogo} alt="" width="100" height="69" /></center> 
            <h2 className="panel-header">Calendar</h2>
            <div className="calendar-container">
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    calendarType="US"
                />
            </div>
        </div>
    );
};

export default RightPanel;
