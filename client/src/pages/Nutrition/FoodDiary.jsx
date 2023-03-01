import React, {useEffect, useState} from 'react';
import './nutrition.css';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import FoodEntryList from './EntryList';

const RenderFoodLog = ( name ) => {

    const title = name.props.id;

    const [foodEntries, updateFoodEntries] = useState([]);

    const addFoodEntry = ( foodEntry ) => {
        updateFoodEntries([...foodEntries, foodEntry]);
    };

    console.log( foodEntries );

    return(
        <foodLogSection>
            <mealLabel><div> {title} </div></mealLabel>
            <labels>
                <div>Item</div>
                <div>Servings</div>
                <div>Calories</div>
            </labels>
            <FoodEntryList listItems={foodEntries} />
            <addFood>
                <Popup trigger={<button> Click to add food </button>} position="left center">
                    <AddFoodPopup addFoodEntry={addFoodEntry} />
                </Popup>
            </addFood>
        </foodLogSection>
    )
}

export default RenderFoodLog;