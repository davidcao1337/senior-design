import React, {useEffect, useState} from 'react';
import './nutrition.css';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import FoodEntryList from './EntryList';

const RenderFoodLog = ( props ) => {

    // we need the id of the list
    const title = props.props.id;
    // we need the date from the calendar that the user has selected

    
    const currDate = new Date();
    if( !props.props.props.date ){
        props.props.props.date = currDate
    }

    props.props.props.category = title

    const foodEntries = props.props.display

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
                    <AddFoodPopup props={{props}}/>
                </Popup>
            </addFood>
        </foodLogSection>
    )
}

export default RenderFoodLog;
