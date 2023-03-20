import React, { useState } from 'react'
import { format } from 'date-fns';
import { useExerciseContext } from '../../hooks/useExerciseChart';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddActivity = (props) => {
    const { onClosePop, date } = props;
    const { user } = useAuthContext();

    const { dispatch } = useExerciseContext();
    const [selectedOption, setSelectedOption] = useState("");
    const [newDate, setNewDate] = useState(date);
    const [type, setType] = useState(null);
    const [exerciseType, setExerciseType] = useState(null);
    const [time, setTime] = useState(null);
    const [distance, setDistance] = useState(null);
    const [loadWeight, setLoadWeight] = useState(null);
    const [sets, setSets] = useState(null);
    const [reps, setReps] = useState(null);
    const [calorie, setCalorie] = useState(null);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    
    function handleOptionChange(event) {
        setType(event.target.value)
        setSelectedOption(event.target.value);
    }

    const callClose = () => {
        props.onClosePop()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in!")
            return
        }
        
        const exercise = { date, type, time, distance, exerciseType, loadWeight, sets, reps, calorie }

        const response = await fetch('/exercise', {
            method: 'POST',
            body: JSON.stringify(exercise),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
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
            setEmptyFields([])
            console.log("new exercise added", json)
            dispatch({type: 'CREATE_EXERCISE', payload: json})
            callClose()
        }
    }


    function taskSelection() {
        switch(selectedOption){
            case "Cardio":
                return (
                    <div className="exercise-input flex flex-col">
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Time:</label>
                                <input 
                                    className={emptyFields.includes('time') ? 'error' : ''}
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="mins" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Cardio type:</label>
                                <input 
                                    className={emptyFields.includes('ExerciseType') ? 'error' : ''}
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={exerciseType} 
                                    onChange={(e) => setExerciseType(e.target.value)}                                                                          
                                    autoComplete="off" 
                                />
                                </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Distance:</label>
                                <input 
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={distance} 
                                    onChange={(e) => setDistance(e.target.value)} 
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="km" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-row'>
                                <div className='flex flex-col'>
                                    <label>Calories:</label>
                                    <input 
                                        className={emptyFields.includes('Calories') ? 'error' : ''}
                                        class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                        value={calorie} 
                                        onChange={(e) => setCalorie(e.target.value)} 
                                        type="number"
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
                    <div className="exercise-input flex flex-col">
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Workout time:</label>
                                <input 
                                    className={emptyFields.includes('Time') ? 'error' : ''}
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={time} 
                                    onChange={(e) => setTime(e.target.value)} 
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="mins" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Workout type:</label>
                                <input 
                                    className={emptyFields.includes('ExerciseType') ? 'error' : ''}
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={exerciseType} 
                                    onChange={(e) => setExerciseType(e.target.value)} 
                                    autoComplete="off" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Load weight:</label>
                                <input 
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={loadWeight} 
                                    onChange={(e) => setLoadWeight(e.target.value)} 
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="kg" 
                                />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <label>Sets:</label>
                                <input 
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={sets} 
                                    onChange={(e) => setSets(e.target.value)}  
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="count values" 
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Reps:</label>
                                <input 
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={reps} 
                                    onChange={(e) => setReps(e.target.value)} 
                                    type="number"
                                    autoComplete="off" 
                                    placeholder="count values"
                                />
                            </div>
                            <div className="ml-5 mr-5"></div>
                            <div className='flex flex-col'>
                                <label>Calorie:</label>
                                <input 
                                    className={emptyFields.includes('Calories') ? 'error' : ''}
                                    class="mb-6 border-2 w-full rounded-[5px] px-2 py-2" 
                                    value={calorie} 
                                    onChange={(e) => setCalorie(e.target.value)} 
                                    type="number"
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
                                <select class="mb-5 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" value={selectedOption} onChange={handleOptionChange}>
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