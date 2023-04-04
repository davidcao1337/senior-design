import React, {useEffect, useState} from 'react';
import './nutrition.css';
import ProcessNutritionGoal from './nutritionGoalEntry';

const RenderNutritionGoals = ( props ) => {

    const nutritionGoals = props.goals.nutritionGoals

    const count = nutritionGoals.length

    return(
        <div className='nutritionGoals'>
            <div className='goalCount'>{count} Goal Found</div>
            {nutritionGoals.map(( item ) => (
                <ProcessNutritionGoal key={item._id} item={item} />
            ))}
        </div>
    )
}

export default RenderNutritionGoals;