import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { GoalsContextProvider } from './context/GoalContext';
import { ExerciseContextProvider } from './context/ExerciseContext';
import { SleepContextProvider } from './context/SleepContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalsContextProvider>
      <ExerciseContextProvider>
      <SleepContextProvider>
      <App />
      </SleepContextProvider>
      </ExerciseContextProvider>
      </GoalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
