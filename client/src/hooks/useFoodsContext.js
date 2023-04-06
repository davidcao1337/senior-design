import { FoodsContext } from "../context/FoodsContext";
import { useContext } from 'react';

export const useFoodsContext = () => {
    const context = useContext(FoodsContext);
    if (!context) {
        throw Error('useFoodsContext must be used inside a FoodsContextProvider');
    }

    return context;
}