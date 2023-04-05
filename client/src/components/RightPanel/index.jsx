import React from 'react';
import Calendar from 'react-calendar';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png'

const RightPanel = () => {

    return (
        <div className="right-panel">
        <div className='userCardContainer'>
            <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
            <div className='userCardTypeA'></div>
        </div>
        <div className='calendar'>
            <div className="calendar-container">
                <Calendar />
            </div>
        <div className='recomendationSystem'></div>
        </div>
    </div>
    );
};

export default RightPanel;
