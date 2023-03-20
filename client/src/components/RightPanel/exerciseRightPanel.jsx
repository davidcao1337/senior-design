import React, {useState} from 'react';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../pages/Exercise/exercise.css';
import Popup from 'reactjs-popup';
import AddActivity from '../../pages/Exercise/addActivity'

const ExerciseRightPanel = () => {
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
                    <AddActivity 
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

export default ExerciseRightPanel;
