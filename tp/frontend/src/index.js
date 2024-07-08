// index.js
import React from 'react';
import {createRoot} from 'react-dom/client';
import {Auth0Provider} from '@auth0/auth0-react';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log('Auth0 Redirect URI:', process.env.REACT_APP_REDIRECT_URI);




root.render(
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        authorizationParams={{
            redirectUri: window.location.origin
        }}
    >
        <App />
    </Auth0Provider>
);
