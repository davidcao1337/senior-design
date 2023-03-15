import { SLeepContext } from '../context/SLeepContext';
import { useContext } from 'react';

export const useSLeepContext = () => {
    const context = useContext(SLeepContext);
    if (!context) {
        throw Error('useSLeepContext must be used inside an SLeepContextProvider');
    }

    return context;
}