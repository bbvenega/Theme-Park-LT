// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import LogoutButton from '../components/auth/LogoutButton';

const Dashboard = () => {
    const [parks, setParks] = useState([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchParks = async () => {
            try {
                const token = await getAccessTokenSilently();
                const response = await axios.get('http://localhost:8080/parks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setParks(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchParks();
    }, [getAccessTokenSilently]);

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
