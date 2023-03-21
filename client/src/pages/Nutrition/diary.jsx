import React, { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';
import './nutrition.css';

const AddFoodPopup = ( props ) => {
    const { user } = useAuthContext();
    const { dispatch } = useFoodItemContext();

    const [name, setName] = useState('')
    const [servings, setServings] = useState('')
    const [calories, setCalories] = useState('')
    const [protein, setProtein] = useState('')
    const [fat, setFat] = useState('')
    const [carbs, setCarbs] = useState('')
    const [error, setError] = useState(null)

    const [newItem, setNewItem] = useState({
        name: "",
        servings: "",
        calories: "",
        protein: "",
        fat: "",
        carbs: "",
        dateEaten: "",
        category: " "
    });

    const handleChange = (event) => {
        setNewItem({ ...newItem, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        const newItem = {itemName: name, servingsEaten: servings, caloriesPerServing: calories, proteinPerServing: protein, fatPerServing: fat, carbsPerServing: carbs, dateEaten: props.props.props.props.props.date, mealCategory: props.props.props.props.id}

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
            setName('')
            setServings('')
            setCalories('')
            setProtein('')
            setFat('')
            setCarbs('')
            setError(null)
            console.log("new food item added", json)
            dispatch({type: 'CREATE_FOOD', payload: json})
        }
    };

    return(
        <popupContainer>
            <div className='popupTitle'>New Entry</div>
            <form onSubmit={handleSubmit}> 
            <div className='popupFields'>
                <label>Name
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{width: "100px"}}
                    />
                </label>
                <label>Servings
                    <input 
                        type="number" 
                        name="servings"
                        placeholder="Servings"
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        style={{width: "100px"}}
                    />
                </label>
                <label>kCals/Serving
                    <input 
                        type="number" 
                        name="calories"
                        placeholder="Calories"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)} 
                        style={{width: "100px"}}
                    />
                </label>
                <label>Protein/Serving
                    <input 
                        type="number" 
                        name="protein"
                        placeholder="Protein"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                        style={{width: "100px"}}
                    />
                </label>
                <label>Fat/Serving
                    <input 
                        type="number" 
                        name="fat"
                        placeholder="Fat"
                        value={fat}
                        onChange={(e) => setFat(e.target.value)}
                        style={{width: "100px"}}
                    />
                </label>
                <label>Carbs/Serving
                    <input 
                        type="number" 
                        name="carbs"
                        placeholder="Carbs"
                        value={carbs}
                        onChange={(e) => setCarbs(e.target.value)}
                        style={{width: "100px"}}
                    />
                </label>
                </div>
                <button>Submit Item</button>
            </form>
        </popupContainer>
    )
}

export default AddFoodPopup;
