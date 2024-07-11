// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/auth/LoginButton';
import LogoutButton from './components/auth/LogoutButton';
import Profile from './components/auth/Profile';
import HomePage from './pages/HomePage';
import UserSettings from './pages/UserSettings';
import LandingPage from './pages/LandingPage';
import ListComponent from './components/common/ListComponent';

const App = () => {
    const { isAuthenticated } = useAuth0();

    console.log('User is authenticated:', isAuthenticated);

    return (
        <div>
            <h1>Welcome to My App</h1>
            <LoginButton />
            <LogoutButton />
            <Routes>
            <Route path="/" element={<LandingPage />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
                <Route path="/settings" element={isAuthenticated ? <UserSettings /> : <Navigate to="/" />} />
                <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/" />} />
                {/* <Route path="/list" element={isAuthenticated ? <ListComponent /> : <Navigate to="/" />} /> */}
                <Route path="/list" element={<ListComponent />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            
        </div>
    );
};

export default App;
