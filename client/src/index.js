import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { GoalsContextProvider } from './context/GoalContext';
import { ExerciseContextProvider } from './context/ExerciseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalsContextProvider>
      <ExerciseContextProvider>
        <App />
      </ExerciseContextProvider>
      </GoalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
