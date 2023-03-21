import React, {useEffect, useState} from 'react';
import './nutrition.css';

const RenderSelectionButtons = ( userWeightGoal ) => {

    const[ select, setSelects] = useState();

    const handleChange = (value) => {
        setSelects(value);
        userWeightGoal = value;
    };

    return(
        <selectionGoal>
            <select
                value={select} 
                onChange={handleChange} >
                <option>Lose</option>
                <option>Maintain</option>
                <option>Gain</option>
            </select>
        </selectionGoal>
    )
}

export default RenderSelectionButtons;
