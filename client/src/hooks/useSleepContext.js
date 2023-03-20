import { SleepContext } from '../context/SleepContext';
import { useContext } from 'react';

export const useSleepContext = () => {
    const context = useContext(SleepContext);
    if (!context) {
        throw Error('useSleepContext must be used inside an SleepContextProvider');
    }

    return context;
}