import React from 'react';
import ProgressBar from '../Nutrition/ProgressBar';
import { useFoodItemContext } from '../../hooks/useFoodItemContext';

const NutritionProgressBar = () => {
    const { caloriesEaten, macroCals, color } = useFoodItemContext();
    return (
        <ProgressBar
            props={{ caloriesEaten, macroCals, color }}
        />
    );
};

export default NutritionProgressBar;
