import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import { Login } from './pages/Login/index_login';
import { Register } from './pages/Login/index_register';
import Dashboard from './pages/Dashboard';
import Exercise from './pages/Exercise';
import Nutrition from './pages/Nutrition';
import Sleep from './pages/Sleep';
import './index.css';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/exercise" element={user ? <Exercise /> : <Navigate to="/login" />} />
          <Route path="/nutrition" element={user ? <Nutrition /> : <Navigate to="/login" />} />
          <Route path="/sleep" element={user ? <Sleep /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
