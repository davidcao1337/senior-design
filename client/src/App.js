import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Exercise from './components/Exercise';
import Diet from './components/Diet';
import Sleep from './components/Sleep';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} /> {/* This will need to be changed in the future; user must be authenticated and logged in to redirect to the dashboard*/}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/sleep" element={<Sleep />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
