import React, {useEffect, useState} from 'react';
import './nutrition.css';

const ProcessNutritionGoal = ( { item } ) => {

    return(
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className='goalDesc'>{item.description}</div>
        </div>
    )
}

export default ProcessNutritionGoal;