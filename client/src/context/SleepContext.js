import { createContext, useReducer, useEffect } from 'react'

export const SleepContext = createContext();

export const sleepReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SLEEPS':
            return { sleeps: action.payload }
        case 'CREATE_SLEEP':
            return { sleeps: [action.payload, ...state.sleeps] }
        default:
            return state;
    }
}

export const SleepContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(sleepReducer, {
        sleeps: null
    })

    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'));
    //     if (user) {
    //         dispatch({ type: 'LOGIN', payload: user });
    //     }
    // }, [])

    // console.log('AuthContext state: ', state);

    return (
        <SleepContext.Provider value={{...state, dispatch}}>
            { children }
        </SleepContext.Provider>
    )
}