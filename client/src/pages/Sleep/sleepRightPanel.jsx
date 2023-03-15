import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './sleep.css';
import lyfeonLogo from '../../assets/lyfeon-green.png';
import Popup from 'reactjs-popup';
import AddSleepData from './addSleepData';

const SleepRightPanel = (props) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [sleepTime, setTime] = useState([8.5, 8.2, 8.2, 7.9, 7.8, 8.5, 8.6, 7.9, 8.0, 8.4, 8.1, 8.0, 8.9, 7.6, 7.9, 10.0, 8.8, 11.0, 9.5]);
    const [sleepWeek, setWeek] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);

    const addTime = () => {
        props.onAddSleepTime(Number(sleepTime));
    };
    const callSetTime = (newTime) => {
        setTime(newTime)
    }

    const addSleepTime = (newTime) => {
        setTime([
            ...sleepTime,
            newTime
        ])
        setWeek(prevState => [...prevState.slice(1),prevState[0]]);
        //console.log(sleepTime)
    };

    const closePop = () => {
        setOpenPopup(false)
    }

    return (
        <sleepRightPanel>
            <center><img className="mt-10 mb-10" src={lyfeonLogo} alt="" width="100" height="69" /></center>
            <sleepCalendar>
                <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    calendarType="US"
                    onClickDay={() => setOpenPopup(true)}
                />
                <Popup open={openPopup} onClose={() => setOpenPopup(false)} position="left center">
                    <AddSleepData 
                        onClosePop={closePop}
                        date={selectedDate}
                    />
                </Popup>
            </sleepCalendar>
        </sleepRightPanel>
    );
};

export default SleepRightPanel;
