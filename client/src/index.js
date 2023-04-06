import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { GoalsContextProvider } from './context/GoalContext';
import { ExerciseContextProvider } from './context/ExerciseContext';
import { SleepContextProvider } from './context/SleepContext';
import { FoodItemContextProvider } from './context/FoodItemContext';
import { FoodsContextProvider } from './context/FoodsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalsContextProvider>
      <ExerciseContextProvider>
      <SleepContextProvider>
      <FoodItemContextProvider>
      <FoodsContextProvider>
      <App />
      </FoodsContextProvider>
      </FoodItemContextProvider>
      </SleepContextProvider>
      </ExerciseContextProvider>
      </GoalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
