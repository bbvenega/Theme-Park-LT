import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

// Log environment variables to ensure they are being read correctly
console.log('Auth0 Domain:', process.env.REACT_APP_AUTH0_DOMAIN);
console.log('Auth0 Client ID:', process.env.REACT_APP_AUTH0_CLIENT_ID);
console.log('Auth0 Redirect URI:', process.env.REACT_APP_AUTH0_REDIRECT_URI);
console.log('Auth0 Audience:', process.env.REACT_APP_AUTH0_AUDIENCE);
;

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/dashboard`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
    }}
  >
    <App />
  </Auth0Provider>,
);
