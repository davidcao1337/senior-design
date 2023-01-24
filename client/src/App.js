import React, { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './components/Login/index_login';
import { Register } from './components/Login/index_register';
import Dashboard from './components/Dashboard';
import Exercise from './components/Exercise';
import Diet from './components/Diet';
import Sleep from './components/Sleep';
import TestChart from './components/TestChart';
import './index.css';
function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />} /> {/* This will need to be changed in the future; user must be authenticated and logged in to redirect to the dashboard. If not, then landing page */}
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
