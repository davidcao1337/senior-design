import React, {useState} from 'react';
import './sleep.css';

const UpdateSleepGoal = (props) => {
    const [time, setTime] = useState();

    const callSetTime = event => {
        setTime(event.target.value);
    }

    const passTime = () =>{
        props.onEditGoal(time)
        //console.log(time);
    }


    return(
        <popupContainer>
            <div className='popupTitle'>Edit Sleep Goal</div>
            <popupDivider>
                <label>New Goal:</label>
                    <input value={time} size="10" onChange={callSetTime} placeholder='hrs' />
                <br></br>
                <submitButton>
                    <button onClick={passTime}>Submit</button>
                </submitButton>
            </popupDivider>
            
        </popupContainer>
    )
}

export default UpdateSleepGoal;