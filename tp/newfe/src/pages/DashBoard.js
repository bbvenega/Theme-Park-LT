// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import LogoutButton from '../components/auth/LogoutButton';
import fetchVisits from '../services/getVisitsByUserId';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently, isAuthenticated, isLoading, user } = useAuth0();
    const [visits, setVisits] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('User object: ', user);
        const fetchParks = async () => {
        
            if(isAuthenticated && !isLoading) {
            try {
                const token = await getAccessTokenSilently();
                console.log("TOKEN: ", token);
                try {
                const response = await axios.get('http://localhost:8080/parks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setParks(response.data);
            } catch (error) {
                console.error('Error fetching parks: ', error);
                setError(error);
                setLoading(false);
            }

            try {
                const userId = user.sub.split('|')[1];
                console.log(`IN DASHBOARD ~ Fetching visits for user: ${userId}, with token: ${token}`);
                const userVisits = await fetchVisits(userId, token);
                setVisits(userVisits);
                
            } catch (error) {
                console.error('Error fetching visits: ', error);
                setError(error);
                setLoading(false);
            }

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
    }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

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

        <h2>Your Visits</h2>
        {visits && visits.length >0 ? (
            <ul>
                {visits.map((visit) => (
                    <li key={visit.id}>
                        <p> Park: {visit.parkName} - {visit.dateVisited} </p>
                    </li>
                ))}
            </ul>
        ): (
            <p> No Visits Found! </p>
        )}

        <Link to="/add-visit">
            <button type ="button">Add Visit</button>
        </Link>
        
        

        <h2>Your Parks</h2>
        {/* <pre>{JSON.stringify(parks, null, 2)}</pre> */}
        <ul>
            {parks.map((park) => (
                <li key={park.id}>{park.name}
                <h3> {park.name}'s Individual Parks </h3>
                <ul>
                    {park.parks.map((individualPark) => (
                        <li key={individualPark.id}>
                            <h4>{individualPark.name}</h4>
                            <ul>
                            {individualPark.attraction && individualPark.attraction
                                .filter(attraction =>
                                    attraction.entityType === 'ATTRACTION' && attraction.status === 'OPERATING'
                                ).map((attraction) => (
                                            attraction && (
                                                <li key={attraction.id}>
                                                      {attraction.name} - Wait Time: {attraction.queue && attraction.queue.STANDBY ? attraction.queue.STANDBY.waitTime : "N/A"}
                                                </li>
                                    ) 
                                ))}
                            </ul>
                            </li>
                            
                    ))}
                </ul>
                </li>
            ))}
        </ul>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
