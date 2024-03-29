import React, {useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './rightPanel.css';
import Popup from 'reactjs-popup';
import AddSleepData from '../../pages/Sleep/addSleepData';
import lyfeonLogo from '../../assets/lyfeon-green.png';

const SleepRightPanel = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const closePop = () => {
        setOpenPopup(false)
    }

    return (
        <div className="right-panel">
            <div className='userCardContainer'>
                <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
                <div className='userCardTypeA'> <div className='text-center text-xl tracking-tight'>Click a date to add sleep</div></div>
            </div>
            <div className='calendar'>
                <div className="calendar-container">
                    <Calendar 
                        onChange={setSelectedDate}
                        value={selectedDate}
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
