import React, {useState} from 'react';
import './sleep.css';
import Calendar from 'react-calendar';

const AddSleepData = (props) => {
    const [date, setDate] = useState(new Date());
    const [sleepTime, setTime] = useState();

    const handleDateChange = (date) => {
        setDate(date);
        //console.log(date);
    };

    const callSetTime = (event) => {
        setTime(event.target.value);
    };

    const addTime = () => {
        props.onAddSleepTime(Number(sleepTime));
    };

    return(
        <popupContainer>
            <div className='popupTitle'>Add Sleep Time</div>
            <popupDivider>
                <Calendar onChange={handleDateChange} value={date} />
                <label>Sleep Time:  </label>
                    <input onChange={callSetTime} value={sleepTime} size="10" placeholder="hrs" />
                <br></br>
                <submitButton>
                    <button onClick={addTime}>Submit</button>
                </submitButton>
            </popupDivider>
            
        </popupContainer>
    )
}

export default AddSleepData;