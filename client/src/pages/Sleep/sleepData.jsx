import React, {useState} from 'react';
import './sleep.css';
import Select from 'react-select';

const AddSleepData = (props) => {
    const [sleepTime, setData] = useState(Number('0.0'));

    const handleSubmit = (event) =>{
        event.preventDefault();
        props.onSubmit(sleepTime);
    }

    const getData = (event) => {
        setData(event.target.value);
    };

    return(
        <popupContainer>
            <div className='popupTitle'>Add Sleep Time</div>
            <popupDivider>
                <label>Sleep Time:  </label>
                    <input type="text" onChange={getData} value={sleepTime} size="10" placeholder="e.g. 5.0" id= "ls" />
                <br></br>
                <h4> {sleepTime} </h4>
                <submitButton>
                    <form onSubmit={handleSubmit}>
                        <button type='submit' onChange={getData}>Submit</button>
                    </form>
                </submitButton>
            </popupDivider>
            
        </popupContainer>
    )
}

export default AddSleepData;