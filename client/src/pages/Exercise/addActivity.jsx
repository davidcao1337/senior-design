import React, { useState } from 'react'
import { format } from 'date-fns';
import { useExerciseContext } from '../../hooks/useExerciseChart';

const AddActivity = (props) => {
    const { onClosePop, date } = props

    const { dispatch } = useExerciseContext()
    //const [sleepTime, setTime] = useState(null)
    
    const [selectedOption, setSelectedOption] = useState("");


    //const [targetWeight, setTargetWeight] = useState(null);
    const [newDate, setNewDate] = useState(date);
    const [type, setType] = useState(null);
    const [exerciseType, setExerciseType] = useState(null);
    const [time, setTime] = useState(null);
    const [distance, setDistance] = useState(null);
    const [loadWeight, setLoadWeight] = useState(null);
    const [sets, setSets] = useState(null);
    const [reps, setReps] = useState(null);
    const [calorie, setCalorie] = useState(null);
    const [error, setError] = useState(null)
    
    //const [gainWeight, setGainWeight] = useState();

    function handleOptionChange(event) {
        setType(event.target.value)
        setSelectedOption(event.target.value);
    }

    // const addTime = () => {
    //     props.onAddSleepTime(Number(sleepTime));
    // };

    const callClose = () => {
        props.onClosePop()
    }


    const handleSave = async (e) => {
        e.preventDefault()
        props.onClosePop()
    }

    // const closePop = () => {
    //     setOpenPopup(false)
    // } 
    // className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" value={} onChange={(e) => set(e.target.value)} id="" name="" autoComplete="off"
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const exercise = { date, type, time, distance, exerciseType, loadWeight, sets, reps, calorie }

        const response = await fetch('/exercise', {
            method: 'POST',
            body: JSON.stringify(exercise),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setType(null)
            setNewDate(null)
            setDistance(null)
            setExerciseType(null)
            setLoadWeight(null)
            setSets(null)
            setReps(null)
            setCalorie(null)
            setError(null)
            console.log("new exercise added", json)
            dispatch({type: 'CREATE_EXERCISE', payload: json})
            callClose()
        }
    }


    function taskSelection() {
        switch(selectedOption){
            case "Cardio":
                return (
                    <div className="flex flex-col">
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Time:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    id="time" 
                                    name="time" 
                                    autoComplete="off" 
                                    placeholder="mins" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Cardio type:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={exerciseType} 
                                    onChange={(e) => setExerciseType(e.target.value)} 
                                    id="strengthType" 
                                    name="strengthType"                                         
                                    autoComplete="off" 
                                />
                                </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Distance:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={distance} 
                                    onChange={(e) => setDistance(e.target.value)} 
                                    id="distance" 
                                    name="distance" 
                                    autoComplete="off" 
                                    placeholder="km" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-row'>
                                <div className='flex flex-col'>
                                    <label>Calories:</label>
                                    <input 
                                        className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                        value={calorie} 
                                        onChange={(e) => setCalorie(e.target.value)} 
                                        id="calorie" 
                                        name="calorie" 
                                        autoComplete="off" 
                                        placeholder="kCals" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Strength":
                return (
                    <div className="flex flex-col">
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Workout time:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    id="time" 
                                    name="time" 
                                    autoComplete="off" 
                                    placeholder="mins" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Workout type:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={exerciseType} 
                                    onChange={(e) => setExerciseType(e.target.value)} 
                                    id="strengthType" 
                                    name="strengthType" 
                                    autoComplete="off" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Load weight:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={loadWeight} 
                                    onChange={(e) => setLoadWeight(e.target.value)} 
                                    id="pressWeight" 
                                    name="pressWeight" 
                                    autoComplete="off" 
                                    placeholder="kg" 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Sets:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={sets} 
                                    onChange={(e) => setSets(e.target.value)} 
                                    id="sets" 
                                    name="sets" 
                                    autoComplete="off" 
                                    placeholder="count values" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Reps:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={reps} 
                                    onChange={(e) => setReps(e.target.value)} 
                                    id="reps" 
                                    name="reps" 
                                    autoComplete="off" 
                                    placeholder="count values"
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Calorie:</label>
                                <input 
                                    className="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={calorie} 
                                    onChange={(e) => setCalorie(e.target.value)} 
                                    id="calorie" 
                                    name="calorie" 
                                    autoComplete="off" 
                                    placeholder="kCals" 
                                />
                            </div>
                        </div>
                    </div>
                  );
            default:
                return null;
            }
        }

    return (
        <div className="my-modal">
            
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Add Activity</h2>
                <p class="font-bold">{format(date, 'yyyy/MM/dd')}</p>
                    <div className="form-container">
                        <div className="flex flex-col">
                            <div className= "mx-auto">
                                <select class="mb-5" value={selectedOption} onChange={handleOptionChange}>
                                    <option value="">Select Exercise Type</option>
                                    <option value="Cardio">Cardio</option>
                                    <option value="Strength">Strength</option>
                                </select>
                                {taskSelection()}
                            </div>
                                <div className="buttons-container flex flex-row justify-center">
                                    <button className="mb-3 mr-12 mt-10 pr-6 pl-6 btn btn-primary rounded-md" onClick={handleSubmit}>Submit</button>
                                    <button className="ml-10 mt-10 btn" onClick={onClosePop}>Cancel</button>
                                </div>
                        </div>
                    </div>
                    
                    {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span class="block sm:inline">{error}</span>
                                <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                            </div>}
            </div>
        </div>
    )
}

export default AddActivity;