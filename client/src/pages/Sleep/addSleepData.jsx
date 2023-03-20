import { format } from 'date-fns';
import React, { useState } from 'react';
import { useSleepContext } from '../../hooks/useSleepChart';
import { useAuthContext } from '../../hooks/useAuthContext';

const AddSleepData = (props) => {
    const { onClosePop, date } = props;
    const { user } = useAuthContext();

    const { dispatch } = useSleepContext();
    const [ newDate, setNewDate] = useState(null);
    const [error, setError] = useState(null);
    const [hours, setHours] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const callClose = () => {
        props.onClosePop();
    }

    const checkHour = (e) => {
        const value = e.target.value;
        if (Number(value) <= 23 && Number(value) >= 0) {
            setHours(value);
        } else {
            setError("The hour value should be in the range from 0 to 23")
        }
    }
    const checkMinute = (e) => {
        const value = e.target.value;
        if (Number(value) <= 59 && Number(value) >= 0) {
            setMinutes(value);
        } else {
            setError("The minute value should be in the range from 0 to 59")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError("You must be logged in!")
            return
        }
        
        const sleep = { date, hours, minutes }

        const response = await fetch('/sleep', {
            method: 'POST',
            body: JSON.stringify(sleep),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok) {
            setNewDate(null)
            setHours(null)
            setMinutes(null)
            setError(null)
            setEmptyFields([])
            console.log("new sleep added", json)
            dispatch({type: 'CREATE_SLEEP', payload: json})
            callClose()
        }
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Add Sleep Time</h2>
                <p class="font-bold" >{format(date, 'yyyy/MM/dd')}</p>
                    <div className="form-container">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className='sleep-input flex flex-row'>
                                <div className='flex flex-col'>
                                    <label>Hours:</label>
                                    <input 
                                        className={emptyFields.includes('Hours') ? 'error' : ''}
                                        class="mb-6 border-2 w-auto rounded-[5px] px-2 py-2" 
                                        value={hours} 
                                        onChange={checkHour} 
                                        type="number"
                                        autoComplete="off" 
                                        placeholder="hrs" 
                                    />
                                </div>
                                <div className="ml-5 mr-5"></div>
                                <div className='flex flex-col'>
                                    <label>Minutes:</label>
                                    <input 
                                        className={emptyFields.includes('Minutes') ? 'error' : ''}
                                        class="mb-6 border-2 w-auto rounded-[5px] px-2 py-2" 
                                        value={minutes} 
                                        onChange={checkMinute} 
                                        type="number"
                                        autoComplete="off" 
                                        placeholder="mins" 
                                    />
                                </div>
                            </div>
                            <div className="buttons-container flex flex-row justify-center">
                                <button 
                                    className="mb-3 mr-12 mt-10 pr-6 pl-6 btn btn-primary rounded-md" 
                                >Submit</button>
                                <button className="ml-10 mt-10 btn" onClick={onClosePop}>Cancel</button>
                            </div>
                        </form>
                    </div>
                    
                    {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span class="block sm:inline">{error}</span>
                                <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                            </div>}
            </div>
        </div>
    )
}

export default AddSleepData;