import React, {useState} from 'react';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './exercise.css';
import lyfeonLogo from '../../assets/lyfeon-green.png'
import Popup from 'reactjs-popup';
import AddActivity from './addActivity'

const ExerciseRightPanel = (props) => {
    const [task, setTask] = useState();
    const [time_reps, setTime] = useState();
    const [distance_set, setDistance] = useState();
    const [incline_weight, setIncline] = useState();
    const [calories, setCalories] = useState();
    const [date, setDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);

    const handleDateChange = (date) => {
        setDate(date);
        //console.log(date);
    };


    const passActivity = () => {
        //console.log(task, time, distance, incline, calories);
        props.onAddActivity(task, time_reps, distance_set, incline_weight, calories);
    }

    const [selectedOption, setSelectedOption] = useState("");
        
    function handleOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    const closePop = () => {
        setOpenPopup(false)
    }
    
    function taskSelection() {
        switch(selectedOption){
            case "cardio":
                return (
                    <div className="taskSelection flex flex-col">
                    <div>
                        <label>Walk Time:</label>
                        <input type="text" placeholder="mins" />
                    </div>
                    <div>
                        <label>Distance:</label>
                        <input type="text" placeholder="km" />
                    </div>
                    <div>
                        <label>Frequency:</label>
                        <input type="text" placeholder="mins" />
                    </div>
                    <div>
                        <label>Calories:</label>
                        <input type="text" placeholder="kCals" />
                    </div>
                    <div>
                        <label>Lose weight:</label>
                        <input type="text" placeholder="Lose weight" />
                      </div>
                      <div>
                        <label>Gain weight:</label>
                        <input type="text" placeholder="Gain weight" />
                      </div>
                    </div>
                );
            case "strength":
                return (
                    <div className="taskSelection flex flex-col">
                      <div>
                        <label>Chest/bench press:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Shoulder press:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Tricep extend:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Back workout:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Bicep curl:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Hamstring workout:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Leg press/squat:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Calf raise/press:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Abs workout:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Calorie:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Lose weight:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                      <div>
                        <label>Gain weight:</label>
                        <input type="text" placeholder="kg" />
                      </div>
                    </div>
                  );
            default:
                return null;
            }
    }

    return (
        <exerciseRightPanel>
            <center><img className="mt-10 mb-10" src={lyfeonLogo} alt="" width="100" height="69" /></center>
            <exerciseCalendar>
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
            </exerciseCalendar>
        </exerciseRightPanel>
    );
};

export default ExerciseRightPanel;
