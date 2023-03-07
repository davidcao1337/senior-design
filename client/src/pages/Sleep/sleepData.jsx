import React, {useState} from 'react';
import './sleep.css';
import Select from 'react-select';

const AddSleepData = (props) => {
    const [sleepTime, setTime] = useState();

    const callSetTime = (event) => {
        setTime(event.target.value);
    };

    const addTime = () => {
        props.onAddSleepTime(Number(sleepTime))
    }

    return(
        <popupContainer>
            <div className='popupTitle'>Add Sleep Time</div>
            <popupDivider>
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