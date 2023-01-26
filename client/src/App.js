import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Login } from './components/Login/index_login';
import { Register } from './components/Login/index_register';
import Dashboard from './components/Dashboard';
import Exercise from './components/Exercise';
import Diet from './components/Diet';
import Sleep from './components/Sleep';
import TestChart from './components/TestChart';
import './index.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* TODO: If user is authenticated, navigate to /dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/sleep" element={<Sleep />} />
          <Route path="/testChart" component={<TestChart />} /> {/* TO DO: Chart does not display, may be use <link> instead */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
