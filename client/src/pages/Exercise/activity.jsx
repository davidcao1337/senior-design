import React, {useEffect, useState} from 'react';
import './exercise.css';
import Select from 'react-select';

const Activity = (props) => {

    const [task, setTask] = useState();
    const [time_reps, setTime] = useState();
    const [distance_set, setDistance] = useState();
    const [incline_weight, setIncline] = useState();
    const [calories, setCalories] = useState();

    const passActivity = () => {
        //console.log(task, time, distance, incline, calories);
        props.onAddActivity(task, time_reps, distance_set, incline_weight, calories);
    }
    const handleTask = (selectedOption) => {
        setTask(selectedOption.value);
    }

    const Tasks = [
        { 
            value: 1,
            label: "Indoor Run"
        },
        {
            value:  2,
            label: "Lateral Pulldown"
        },
        {
            value:  3,
            label: "Dumbbell Squat"
        }
    ];

    return(
        <popupExeContainer>
            <div className='popupTitle'>Add Activity</div>
            <popupDivider>
                <typeSelect>
                    <div>Select Task&emsp;&emsp;&emsp;&emsp;</div>
                    <Select options={Tasks} onChange={handleTask}/>
                </typeSelect>
            </popupDivider>
            <popupDivider>
                <label>Time/Reps:
                    <input value={time_reps} size="10" onChange={e => setTime(Number(e.target.value))} placeholder='mins/Reps' />
                </label>
                <br></br>
                <label>Distance/Set:
                    <input value={distance_set} size="10" onChange={e => setDistance(Number(e.target.value))}placeholder='mi/set'/>
                </label>
                <br></br>
                <label>Incline/Weight:
                    <input value={incline_weight} size="10" onChange={e => setIncline(Number(e.target.value))}placeholder='%/lb'/>
                </label>
                <br></br>
                <label>Calories:
                    <input value={calories} size="10" onChange={e => setCalories(Number(e.target.value))}placeholder='kCals'/>
                </label>
                <br></br>
            </popupDivider>
            <submitButton>
                <button onClick={passActivity}>Submit</button>
            </submitButton>
        </popupExeContainer>
    )
}

export default Activity;