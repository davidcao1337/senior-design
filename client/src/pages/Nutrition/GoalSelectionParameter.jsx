import React, {useEffect, useState} from 'react';
import './nutrition.css';

const RenderSelectionButtons = ( ) => {

    return(
        <selectionGoal>
            <button className='nutritionSummaryButton'>Lose</button>
            <button className='nutritionSummaryButton'>Maintain</button>
            <button className='nutritionSummaryButton'>Gain</button>
        </selectionGoal>
    )
}

export default RenderSelectionButtons;