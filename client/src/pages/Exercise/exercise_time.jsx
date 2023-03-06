import React, {useState} from 'react';
import './exercise.css';

const UpdateTime = (props) => {
    const [time, setTime] = useState();

    const callSetTime = event => {
        setTime(event.target.value);
    }

    const passTime = () =>{
        props.onEditTime(time)
        //console.log(time);
    }

    return(
        <popupContainer>
            <div className='popupTitle'>Edit Exercise Time</div>
            <popupDivider>
                <label>New Time:</label>
                    <input value={time} size="10" onChange={callSetTime} placeholder='mins' />
                <br></br>
                <submitButton>
                    <button onClick={passTime}>Submit</button>
                </submitButton>
            </popupDivider>
            
        </popupContainer>
    )
}

export default UpdateTime;