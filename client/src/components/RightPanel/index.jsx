import React from 'react';
import Calendar from 'react-calendar';
import './rightPanel.css';
import lyfeonLogo from '../../assets/lyfeon-green.png'

const RightPanel = ( props ) => {
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (value) => {
        setDate(value);
        props.props.props.date = value;
    };

    return (
        <div className="right-panel">
                    


            <div className='userCardContainer'>
                <center><img src={lyfeonLogo}  alt="Lyfeon Logo"  className="logo" /></center>
                <div className='userCard'></div>
                
            </div>
            <div className='calendar'>
                <div className="calendar-container">
                    <Calendar onChange={handleDateChange} value={date}/>
                </div>
            </div>
            <div className='recomendationSystem'>Recommendations:</div>
        </div>
    );
};

export default RightPanel;
