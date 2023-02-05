import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext'
import { Login } from './components/Login/index_login';
import { Register } from './components/Login/index_register';
import Dashboard from './components/Dashboard';
import Exercise from './components/Exercise';
import Diet from './components/Diet';
import Sleep from './components/Sleep';
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
          <Route path="/diet" element={user ? <Diet /> : <Navigate to="/login" />} />
          <Route path="/sleep" element={user ? <Sleep /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
