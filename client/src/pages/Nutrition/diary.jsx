import React, {useEffect, useState} from 'react';
import './nutrition.css';
import Select from 'react-select';

const AddFoodPopup = ({addFoodEntry}) => {
    
    const [newItem, setNewItem] = useState({
        name: "",
        servings: "",
        calories: "",
    });

    const handleChange = (event) => {
        setNewItem({ ...newItem, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        addFoodEntry( newItem );
        setNewItem({ name: "", servings: "", calories: "" });
    };


    const Meals = [
        { 
            value: 1,
            label: "Breakfast"
        },
        {
            value:  2,
            label: "Lunch"
        },
        {
            value:  3,
            label: "Dinner"
        },
        {
            value:  3,
            label: "Snack"
        }
    ];

    return(
        <popupContainer>
            <div className='popupTitle'>Add Food</div>
            <form onSubmit={handleSubmit}> 
            <div className='popupFields'>
                <label>Name
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Name"
                        value={newItem.name}
                        onChange={handleChange}
                        style={{width: "100px"}}
                    />
                </label>
                <label>Servings
                    <input 
                        type="number" 
                        name="servings"
                        placeholder="Servings"
                        value={newItem.servings}
                        onChange={handleChange}
                        style={{width: "100px"}}
                    />
                </label>
                <label>Calories
                    <input 
                        type="number" 
                        name="calories"
                        placeholder="Calories"
                        value={newItem.calories}
                        onChange={handleChange} 
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