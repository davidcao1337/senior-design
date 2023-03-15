import { setDate } from 'date-fns'
import React, { useState } from 'react'

const AddSleepData = (props) => {
    const { onClosePop, date } = props
    //const [sleepTime, setTime] = useState(null)
    const [newDate, setNewDate] = useState(date)
    const [error, setError] = useState(null)
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const sleep = { date, hours, minutes }

        const response = await fetch('/sleep', {
            method: 'POST',
            body: JSON.stringify(sleep),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setNewDate(null)
            setHours(null)
            setMinutes(null)
            setError(null)
            console.log("new sleep added", json)
            callClose()
        }
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Add Sleep Time</h2>
                <p class="font-bold" >{date.toDateString()}</p>
                    <div className="form-container">
                        <form className="flex flex-col" onSubmit={handleSubmit}>
                            <div className='flex flex-row'>
                                <div className='flex flex-col'>
                                    <label>Hours:</label>
                                    <input 
                                        className="mb-6 border-2 w-auto rounded-[5px] px-2 py-2" 
                                        value={hours} 
                                        onChange={(e) => setHours(e.target.value)} 
                                        type="number"
                                        id="hours" 
                                        name="hours" 
                                        autoComplete="off" 
                                        placeholder="hrs" 
                                    />
                                </div>
                                <div className="ml-5 mr-5"></div>
                                <div className='flex flex-col'>
                                    <label>Minutes:</label>
                                    <input 
                                        className="mb-6 border-2 w-auto rounded-[5px] px-2 py-2" 
                                        value={minutes} 
                                        onChange={(e) => setMinutes(e.target.value)} 
                                        type="number"
                                        id="minutes" 
                                        name="minutes" 
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