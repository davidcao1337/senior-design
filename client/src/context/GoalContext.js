import { createContext, useReducer } from "react";

export const GoalsContext = createContext()

export const goalsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GOALS':
            return {
                goals: action.payload
            }
        case 'CREATE_GOAL':
            return {
                goals: [...state.goals, action.payload]
            }
        case 'DELETE_GOAL':
            return {
                goals: state.goals.filter((goal) => goal._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const GoalsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(goalsReducer, {
        goals: null
    })

    return (
        <GoalsContext.Provider value={{...state, dispatch}}>
            { children }
        </GoalsContext.Provider>
    )
}
