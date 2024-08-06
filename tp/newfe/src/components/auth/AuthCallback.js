import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AuthCallback = () => {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Handling Auth0 redirect callback...');
        await handleRedirectCallback();
        console.log('Auth0 redirect callback handled, navigating to dashboard...');
        navigate('/Theme-Park-LT/dashboard');
      } catch (error) {
        console.error('Error handling Auth0 redirect callback:', error);
      }
    };

    handleAuthCallback();
  }, [handleRedirectCallback, navigate]);

  return <div>Loading...</div>;
};

export default AuthCallback;
