import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../pages/Sleep/sleep.css';
import Popup from 'reactjs-popup';
import AddSleepData from '../../pages/Sleep/addSleepData';

const SleepRightPanel = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const closePop = () => {
        setOpenPopup(false)
    }

    return (
        <div className="right-panel">
            <div className='userCardContainer'>
                <div className='userCard'></div>
            </div>
            <div className='calendar'>
                <div className="calendar-container">
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
                </div>
            </div>
            <div className='recomendationSystem'></div>
        </div>
        
    );
};

export default SleepRightPanel;
