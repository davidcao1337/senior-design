import React, {useEffect, useState} from 'react';
import './diet.css';
import Select from 'react-select';

const DiaryEntry = () => {

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
            <popupDivider>
                <typeSelect>
                    <div>Select Type</div>
                    <Select options={Meals} />
                </typeSelect>
            </popupDivider>
            <popupDivider>
                <label>Name
                    <input type="text" name="name" />
                </label>
                <label>Calories
                    <input type="text" name="Calories" />
                </label>
            </popupDivider>
            <form>
                <input type="submit" value="Submit" />
            </form>
        </popupContainer>
    )
}

export default DiaryEntry;