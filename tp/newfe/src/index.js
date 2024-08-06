import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';


const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || `${window.location.origin}/Theme-Park-LT/dashboard`
  );
};
const root = createRoot(document.getElementById('root'));

// Log environment variables to ensure they are being read correctly


root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/Theme-Park-LT/dashboard`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE
    }}

    onRedirectCallback={onRedirectCallback}

  >
    <App />
  </Auth0Provider>,
);
