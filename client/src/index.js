import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { GoalsContextProvider } from './context/GoalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GoalsContextProvider>
        <App />
      </GoalsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
