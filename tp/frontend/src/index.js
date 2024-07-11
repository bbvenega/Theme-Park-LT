// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './assets/styles/index.css';
import Auth0ProviderWithNavigate from './components/auth/Auth0ProviderWithNavigate';

const root = createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Auth0ProviderWithNavigate>
            <App />
        </Auth0ProviderWithNavigate>
    </Router>
);
