import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const ListComponent = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    console.log('Fetched token', token);
                    const response = await axios.get('/api/parks', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Fetched parks data:', response.data);
                    setParks(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError(error);
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [isAuthenticated, getAccessTokenSilently]);

    console.log('ListComponent rendered. isAuthenticated:', isAuthenticated);

    if(loading) {
        return <div>Loading...</div>
    }

    if(error) {
        return <div>Error: {error.message}</div>
    }

    if (!isAuthenticated) {
        return <div>Please Log In to view your list!</div>;
    }

    return (
        <div> 
            <h1> Theme Parks</h1>
            <ul>
                {parks.map((park) => (
                    <li key={park.id}>{park.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ListComponent;