import { createContext, useReducer, useEffect } from 'react'

export const FoodsContext = createContext();

export const foodsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FOOD':
            return { foods: action.payload }
        case 'CREATE_FOOD':
            return { foods: [action.payload, ...state.foods] }
        case 'DELETE_FOOD':
            return { foods: state.foodItems.filter((s) => s._id !== action.payload._id) }
        default:
            return state;
    }
}

export const FoodsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(foodsReducer, {
        foods: null
    })

    return (
        <FoodsContext.Provider value={{...state, dispatch}}>
            { children }
        </FoodsContext.Provider>
    )
}