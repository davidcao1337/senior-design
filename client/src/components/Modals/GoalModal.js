import React, { useState } from 'react'
import Select from 'react-select'
import './GoalModal.css'

const GoalModal = (props) => {

    const { isOpen, toggleModalVisibility } = props
    const [goalType, setGoalType] = useState("")
    const goalOptions = [
        { value: "exercise", label: "Exercise" },
        { value: "nutrition", label: "Nutrition" },
        { value: "sleep", label: "Sleep" }
    ]


    // Exercise Goal Stuff

    // Strength Goal: Weight lifting load (kg)
    const [load, setLoad] = useState("")
    // General Goal: Target Weight (kg)
    const [targetWeight, setTargetWeight] = useState("")
    // General Goal: Burn Calories (Daily)
    const [calorieAmount, setCalorieAmount] = useState("")
    // Cardio Goal: Distance (km) or Time (minutes)
    const [metricAmount, setMetricAmount] = useState("")

    const [exerciseType, setExerciseType] = useState("")
    const exerciseOptions = [
        { value: "general", label: "General" },
        { value: "cardio", label: "Cardio" },
        { value: "strength", label: "Strength" }
    ]

    const [generalActivity, setGeneralActivity] = useState("")
    const generalExerciseOptions = [
        { value: "Reach target weight", label: "Reach target weight" },
        { value: "Burn calories (daily)", label: "Burn calories (daily)" }
    ]

    const cardioExerciseOptions = [
        { value: "Walk", label: "Walk" },
        { value: "Run", label: "Run" }
    ]
    const metricOptions = [
        { value: "Distance (km)", label: "Distance (km)" },
        { value: "Time (min)", label: "Time (min)" }
    ]
    const frequencyOptions = [
        { value: "Daily", label: "Daily" },
        { value: "Weekly", label: "Weekly" }
    ]

    const strengthExerciseOptions = [
        { value: "Chest/bench press", label: "Chest/bench press" },
        { value: "Shoulder press", label: "Shoulder press" },
        { value: "Tricep extend", label: "Tricep extend" },
        { value: "Back workout", label: "Back workout" },
        { value: "Bicep curl", label: "Bicep curl" },
        { value: "Hamstring workout", label: "Hamstring workout" },
        { value: "Leg press/squat", label: "Leg press/squat" },
        { value: "Calf raise/press", label: "Calf raise/press" },
        { value: "Abs workout", label: "Abs workout" }
    ]


    const [error, setError] = useState(null)

    if ( !isOpen ) {
        return null
    }

    const handleGoalSelect = (selectedOption) => {
        setGoalType(selectedOption.value)
    }

    const handleExerciseSelect = (selectedOption) => {
        setExerciseType(selectedOption.value)
    }

    const handleActivitySelect = (selectedOption) => {
        setGeneralActivity(selectedOption.value)
    }

    const handleSave = async (e) => {
        e.preventDefault()

        // TODO: Save to DB
        console.log("Saved!")

        props.toggleModalVisibility()
    }

    return (
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Add Goal</h2>
                    <div className="form-container">
                        <form className="flex flex-col">
                            <label for="goalType" className="font-semibold">Goal Type</label>
                            <Select 
                                className="mb-6"
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: '#18B283'
                                    }
                                })}
                                id="goalType" 
                                options={goalOptions} 
                                onChange={handleGoalSelect} 
                            />
                            { goalType === "exercise" ? 
                                <div>
                                    <label for="exerciseType" className="font-semibold">Exercise Type</label>
                                    <Select
                                        className="mb-6"
                                        theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#18B283'
                                            }
                                        })}
                                        id="exerciseType"
                                        options={exerciseOptions}
                                        onChange={handleExerciseSelect}
                                    />
                                    { exerciseType === "general" ?
                                        <div className="goal-description-container flex flex-col space-y-5">
                                            <div className="activity-container flex flex-col">
                                                <label className="font-semibold">Activity</label>
                                                <Select 
                                                    className="mb-6"
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: '#18B283'
                                                        }
                                                    })}
                                                    options={generalExerciseOptions}
                                                    onChange={handleActivitySelect}
                                                />
                                                <div className="amount-container flex flex-col">
                                                    { generalActivity === "Reach target weight" ? 
                                                        <div className="target-weight-container">
                                                            <label className="font-semibold">Weight (kg)</label>
                                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={targetWeight} onChange={(e) => setTargetWeight(e.target.value)} id="load" name="load" />
                                                        </div>
                                                        : 
                                                        generalActivity === "Burn calories (daily)" ?
                                                            <div className="calorie-amount-container">
                                                                <label className="font-semibold">Amount (cal)</label>
                                                                <input className="border-2 w-full rounded-[5px] px-2 py-2" value={calorieAmount} onChange={(e) => setCalorieAmount(e.target.value)} id="load" name="load" />
                                                            </div>
                                                        :
                                                        <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        : exerciseType === "cardio" ? 
                                        <div className="goal-description-container flex flex-col space-y-5">
                                            <div className="exercise-container flex flex-col">
                                                <label className="font-semibold">Exercise</label>
                                                <Select 
                                                    className="mb-6"
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: '#18B283'
                                                        }
                                                    })}
                                                    options={cardioExerciseOptions}
                                                />
                                            </div>
                                            <div className="metric-amount-container flex flex-row space-x-5">
                                                <div className="metric-container flex flex-col">
                                                    <label className="font-semibold">Metric</label>
                                                    <Select 
                                                        className="mb-6"
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                                ...theme.colors,
                                                                primary: '#18B283'
                                                            }
                                                        })}
                                                        options={metricOptions}
                                                    />
                                                </div>
                                                <div className="amount-container flex flex-col">
                                                    <label className="font-semibold">Amount</label>
                                                    <input className="border-2 w-full rounded-[5px] px-2 py-2" value={metricAmount} onChange={(e) => setMetricAmount(e.target.value)} id="metricAmount" name="metricAmount" />
                                                </div>
                                            </div>
                                            <div className="frequency-container flex flex-col">
                                                    <label className="font-semibold">Frequency</label>
                                                    <Select 
                                                        className="mb-6"
                                                        theme={(theme) => ({
                                                            ...theme,
                                                            colors: {
                                                                ...theme.colors,
                                                                primary: '#18B283'
                                                            }
                                                        })}
                                                        options={frequencyOptions}
                                                    />
                                            </div>
                                        </div>
                                        : exerciseType === "strength" ? 
                                        <div className="goal-description-container flex flex-col space-y-5">
                                            <div className="exercise-container flex flex-col">
                                                <label className="font-semibold">Exercise</label>
                                                <Select
                                                    theme={(theme) => ({
                                                        ...theme,
                                                        colors: {
                                                            ...theme.colors,
                                                            primary: '#18B283'
                                                        }
                                                    })}
                                                    options={strengthExerciseOptions}
                                                />
                                            </div>
                                            <div className="load-container flex flex-col">
                                                <label className="font-semibold">Load (kg)</label>
                                                <input className="border-2 w-full rounded-[5px] px-2 py-2" value={load} onChange={(e) => setLoad(e.target.value)} id="load" name="load" />
                                            </div>
                                        </div>
                                        : <></>
                                    }
                                </div>
                                : goalType === "nutrition" || goalType === "sleep" ? <label className="font-semibold">Goal Description</label>
                                : <></>
                            }

                        </form>
                    </div>
                    <div className="buttons-container flex flex-row justify-center">
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={!error && handleSave}>Save</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="error">{error}</div>}
            </div>
        </div>
    )
}

export default GoalModal;