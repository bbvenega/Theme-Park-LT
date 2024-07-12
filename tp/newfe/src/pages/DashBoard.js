// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import LogoutButton from '../components/auth/LogoutButton';

const Dashboard = () => {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchParks = async () => {
        
            if(isAuthenticated && !isLoading) {
            try {
                const token = await getAccessTokenSilently();
                console.log(token);
                const response = await axios.get('http://localhost:8080/parks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setParks(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(error);
                setLoading(false);
            }
        } else {
            console.log('User is not authenticated');
            setLoading(false);
        }
    
        };

        fetchParks();
    }, [getAccessTokenSilently, isAuthenticated, isLoading]);

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Oops... {error.message}</div>
    }

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      <p>This is a private page you can see only after logging in.</p>

        <h2>Your Parks</h2>
        <ul>
            {parks.map((park) => (
                <li key={park.id}>{park.name}</li>
            ))}
        </ul>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
