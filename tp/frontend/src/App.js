// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import HomePage from './HomePage';
import UserSettings from './UserSettings';
import LandingPage from './LandingPage';
import ListComponent from './ListComponent';

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
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/list" element={isAuthenticated ? <ListComponent /> : <Navigate to="/" />} /> 
            </Routes>
        </div>
    );
};

export default App;
