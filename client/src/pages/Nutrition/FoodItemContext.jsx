import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state of the context
const initialState = {
    foodItems: [],
};

// Define the actions that can be performed on the context
const FoodItemActions = {
    ADD_FOOD_ITEM: 'ADD_FOOD_ITEM',
};

// Define the reducer function that updates the state based on the action
const reducer = (state, action) => {
    switch (action.type) {
        case FoodItemActions.ADD_FOOD_ITEM:
            return {
                ...state,
                foodItems: [...state.foodItems, action.payload],
            };
        default:
            return state;
    }
};

// Create the context and export it
export const FoodItemContext = createContext();

// Define a custom hook to use the context
export const useFoodItemContext = () => useContext(FoodItemContext);

// Define the provider component that wraps the app and provides access to the context
export const FoodItemContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FoodItemContext.Provider value={{ state, dispatch }}>
            {children}
        </FoodItemContext.Provider>
    );
};
