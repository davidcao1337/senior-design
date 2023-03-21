import { createContext, useReducer, useEffect } from 'react'

export const SleepContext = createContext();

export const sleepReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SLEEPS':
            return { sleeps: action.payload }
        case 'CREATE_SLEEP':
            return { sleeps: [action.payload, ...state.sleeps] }
        case 'DELETE_SLEEP':
            return { sleeps: state.sleeps.filter((s) => s._id !== action.payload._id) }
        default:
            return state;
    }
}

export const SleepContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sleepReducer, {
        sleeps: null
    })

    return (
        <SleepContext.Provider value={{...state, dispatch}}>
            { children }
        </SleepContext.Provider>
    )
}