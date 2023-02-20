import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Login } from './pages/Login/index_login';
import { Register } from './pages/Login/index_register';
import Profile from './pages/Account/index_profile';
import Settings from './pages/Account/index_settings';
import Privacy from './pages/Account/index_privacy';
import Notifications from './pages/Account/index_notifications';
import Preferences from './pages/Account/index_preferences'
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
          <Route path="/account/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/account/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
          <Route path="/account/privacy" element={user ? <Privacy /> : <Navigate to="/login" />} />
          <Route path="/account/notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
          <Route path="/account/preferences" element={user ? <Preferences /> : <Navigate to="/login" />} />
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
