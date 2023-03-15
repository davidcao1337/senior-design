import { ExerciseContext } from '../context/ExerciseContext';
import { useContext } from 'react';

export const useExerciseContext = () => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw Error('useExerciseContext must be used inside an ExerciseContextProvider');
    }

    return context;
}