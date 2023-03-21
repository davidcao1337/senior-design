import { createContext, useReducer, useEffect } from 'react'

export const FoodItemContext = createContext();

export const foodItemReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FOOD':
            return { foodItems: action.payload }
        case 'CREATE_FOOD':
            return { foodItems: [action.payload, ...state.foodItems] }
        case 'DELETE_FOOD':
            return { foodItems: state.foodItems.filter((s) => s._id !== action.payload._id) }
        default:
            return state;
    }
}

export const FoodItemContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodItemReducer, {
        foodItems: null
    })

    return (
        <FoodItemContext.Provider value={{...state, dispatch}}>
            { children }
        </FoodItemContext.Provider>
    )
}