import { FoodItemContext } from "../context/FoodItemContext";
import { useContext } from 'react';

export const useFoodItemContext = () => {
    const context = useContext(FoodItemContext);
    if (!context) {
        throw Error('useFoodItemContext must be used inside a FoodItemContextProvider');
    }

    return context;
}