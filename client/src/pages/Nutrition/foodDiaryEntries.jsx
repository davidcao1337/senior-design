import React, {useEffect, useState} from 'react';
import './nutrition.css';
import ProcessEntry from './EntryItem';
import Popup from 'reactjs-popup';
import AddFoodPopup from './diary';
import FoodEntryList from './EntryList';

const FoodDiaryEntries = ( props ) => {

    const title = props.props.id;

    const currDate = new Date();
    if( !props.props.props.date ){
        props.props.props.date = currDate
    }

    props.props.props.category = title

    const foodEntries = props.props.display

    console.log( foodEntries );

    return(
        <div className='foodDiary'>
            <div className='foodDiarySectionTitle'>{title}</div>
            {foodEntries.map(( item ) => (
                <ProcessEntry key={item._id} item={item} />
            ))}
        </div>
    )
}

export default FoodDiaryEntries;