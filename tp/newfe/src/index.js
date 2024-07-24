import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = createRoot(document.getElementById('root'));

// The section of code below sets the parameters for the Auth0Provider component, allowing user authentication.
root.render(
<Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    // redirectUri={window.location.origin}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/dashboard`, 
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
    }}

  >
    <App />
  </Auth0Provider>,
);


