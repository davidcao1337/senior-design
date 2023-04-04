import React, { useState } from 'react';
import Select from 'react-select';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './nutrition.css';

const CalculateCaloriePopup = ( props ) => {
    // initial setup of contexts for add food
    const { user } = useAuthContext()
    const { dispatch } = useFoodItemContext();

    const { isOpen, toggleModalVisibility } = props

    const [mealType, setMealType] = useState("")
    const [weightGoalType, setWeightGoalType] = useState("")
    const [weightAmount, setWeightAmount] = useState("")

    const handleWeightGoalSelect = (selectedOption) => {
        setWeightGoalType(selectedOption.value)
    }

    const weightGoalCategories = [
        { value: "Gain", label: "Gain" },
        { value: "Lose", label: "Lose" },
        { value: "Maintain", label: "Maintain" }
    ]

    const handleWeightAmountSelect = (selectedOption) => {
        setWeightAmount(selectedOption.value)
    }

    const weightAmountCategories = [
        { value: 1, label: "1" },
        { value: 2, label: "2" }
    ]

    const [itemName, setItemName] = useState('')
    const [calsPerServing, setCalsPerServing] = useState('')
    const [proteinPerServing, setProteinPerServing] = useState('')
    const [carbsPerServing, setCarbsPerServing] = useState('')
    const [fatPerServing, setFatPerServing] = useState('')
    const [servingsEaten, setServingsEaten] = useState('')

    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        const newItem = {itemName: itemName, servingsEaten: servingsEaten, caloriesPerServing: calsPerServing, proteinPerServing: proteinPerServing, fatPerServing: fatPerServing, carbsPerServing: carbsPerServing, dateEaten: props.date.date, mealCategory: mealType}

    };

    return(
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Calculate Calorie Goal</h2>
                <div className="form-container">
                    <form className="flex flex-col">
                        <label for="weightGoalCategories" className="font-semibold">Select Desired Weight Goal</label>
                        <Select 
                            className="mb-6"
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary: '#18B283'
                                }
                            })}
                            id="weightGoalCategories" 
                            options={weightGoalCategories} 
                            onChange={handleWeightGoalSelect} 
                        />
                        <label for="weightGoalCategories" className="font-semibold">Select Pounds Per Week</label>
                        <Select 
                            className="mb-6"
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                primary: '#18B283'
                                }
                            })}
                            id="mealCategories" 
                            options={weightAmountCategories} 
                            onChange={handleWeightAmountSelect} 
                        />
                    </form>
                </div>
                <div className="buttons-container flex flex-row justify-center">
                    <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSubmit}>Calculate</button>
                </div>
                <h2 className="mt-3 font-bold">Estimated Calorie Goal: </h2>
                <div className="buttons-container flex flex-row justify-center">
                    <button className="ml-10 btn" onClick={toggleModalVisibility}>Close</button>
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            </div>
        </div>
    )
}

export default CalculateCaloriePopup;