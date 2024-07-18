// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './assets/styles/index.css';
// import Auth0ProviderWithNavigate from './components/auth/Auth0ProviderWithNavigate';
import { Auth0Provider } from '@auth0/auth0-react';


const root = createRoot(document.getElementById('root'));

// Add this in node_modules/react-dom/index.js
window.React1 = require('react');

// Add this in your component file
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

root.render(
    <Router>
        <Auth0Provider>
            <App />
        </Auth0Provider>
    </Router>
);
