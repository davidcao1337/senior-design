import { useAuthContext } from './useAuthContext';
import { useGoalsContext } from './useGoalsContext';
import { useExerciseContext } from './useExerciseContext';
import { useSleepContext } from './useSleepContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: goalDispatch} = useGoalsContext();
    const { dispatch: exerciseDispatch } = useExerciseContext();
    const { dispatch: sleepDispatch } = useSleepContext();

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
        goalDispatch({type: 'SET_GOALS', payload: null});
        exerciseDispatch({type: 'SET_EXERCISES', payload: null});
        sleepDispatch({type: 'SET_SLEEPS', payload: null});
    }

    return {logout}
}