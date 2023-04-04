import React, { useState } from 'react';
import Select from 'react-select';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './nutrition.css';

const AddFoodEntryPopup = ( props ) => {
    // initial setup of contexts for add food
    const { user } = useAuthContext()
    const { dispatch } = useFoodItemContext();

    const { isOpen, toggleModalVisibility } = props

    const [mealType, setMealType] = useState("")

    const handleMealSelect = (selectedOption) => {
        setMealType(selectedOption.value)
    }

    const mealCategories = [
        { value: "Breakfast", label: "Breakfast" },
        { value: "Lunch", label: "Lunch" },
        { value: "Dinner", label: "Dinner" },
        { value: "Snack", label: "Snack" }
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

        const response = await fetch('/nutrition', {
            method: 'POST',
            body: JSON.stringify(newItem),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if(response.ok) {
            setItemName('')
            setServingsEaten('')
            setCalsPerServing('')
            setProteinPerServing('')
            setFatPerServing('')
            setCarbsPerServing('')
            setMealType('')
            setError(null)
            console.log("new food item added", json)
            dispatch({type: 'CREATE_FOOD', payload: json})
        }
    };

    return(
        <div className="my-modal">
            <div className="overlay"></div>
            <div className="modal-content flex flex-col space-y-10">
                <h2 className="mt-3 font-bold text-2xl">Add Food Item</h2>
                    <div className="form-container">
                        <form className="flex flex-col">
                        <label for="mealCategories" className="font-semibold">Select Meal Type</label>
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
                                options={mealCategories} 
                                onChange={handleMealSelect} 
                            />
                            <div className="food-item-description-container flex flex-col space-y-5">
                                <div className="form-section-container flex flex-row space-x-5">
                                    <div className="item-name-container flex flex-row space-x-5">
                                        <div className="amount-container flex flex-col">
                                            <label className="font-semibold">Item Name</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={itemName} onChange={(e) => setItemName(e.target.value)} id="itemName" name="itemName" />
                                        </div>
                                    </div>
                                    <div className="cals-per-serving-container flex flex-row space-x-5">
                                        <div className="cals-container flex flex-col">
                                            <label className="font-semibold">Calories Per Serving</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={calsPerServing} onChange={(e) => setCalsPerServing(e.target.value)} id="calsPerServing" name="calsPerServing" type="number" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-section-container flex flex-row space-x-5">
                                    <div className="protein-per-serving-container flex flex-row space-x-5">
                                        <div className="protein-container flex flex-col">
                                            <label className="font-semibold">Protein Per Serving</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={proteinPerServing} onChange={(e) => setProteinPerServing(e.target.value)} id="proteinPerServing" name="proteinPerServing" type="number" />
                                        </div>
                                    </div>
                                    <div className="carbs-per-serving-container flex flex-row space-x-5">
                                        <div className="carbs-container flex flex-col">
                                            <label className="font-semibold">Carbs Per Serving(g)</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={carbsPerServing} onChange={(e) => setCarbsPerServing(e.target.value)} id="carbsPerServing" name="carbsPerServing" type="number" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-section-container flex flex-row space-x-5">
                                    <div className="fat-per-serving-container flex flex-row space-x-5">
                                        <div className="fat-container flex flex-col">
                                            <label className="font-semibold">Fat Per Serving(g)</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={fatPerServing} onChange={(e) => setFatPerServing(e.target.value)} id="fatPerServing" name="fatPerServing" type="number" />
                                        </div>
                                    </div>
                                    <div className="servings-eaten-container flex flex-row space-x-5">
                                        <div className="servings-container flex flex-col">
                                            <label className="font-semibold">Servings Eaten</label>
                                            <input className="border-2 w-full rounded-[5px] px-2 py-2" value={servingsEaten} onChange={(e) => setServingsEaten(e.target.value)} id="servingsEaten" name="servingsEaten" type="number" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="buttons-container flex flex-row justify-center">
                        <button className="mb-3 mr-10 pr-7 pl-7 btn btn-primary rounded-md" onClick={handleSubmit}>Add Entry</button>
                        <button className="ml-10 btn" onClick={toggleModalVisibility}>Cancel</button>
                    </div>
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            </div>
        </div>
    )
}

export default AddFoodEntryPopup;