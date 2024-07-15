import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AddVisit = () => {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAccessTokenSilently, isAuthenticated, isLoading, user } = useAuth0();
    const [date, setDate] = useState('');
    const [selectedPark, setSelectedPark] = useState('');
    const [selectedParkName, setSelectedParkName] = useState('');



    useEffect(() => {
        const fetchParks = async () => {
            if(isAuthenticated && !isLoading) {
                try {
                    const token = await getAccessTokenSilently();
                    console.log("TOKEN: ", token);

                        console.log('ADDVISIT.JS: attempting to call http://localhost:8080/parks')
                        const response = await axios.get('http://localhost:8080/parks', {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            } 
                        });
                        setParks(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error fetching parks: ', error);
                        setLoading(false);
                    } finally {
                        setLoading(false);
                    }
                    
                 
            } else {
                console.log('User is not authenticated');
                setLoading(false);
            }
            };

            fetchParks();
        }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);

        const handleAddVisit = async (e) => {
            e.preventDefault();
            const token = await getAccessTokenSilently();
            const userId = user.sub.split('|')[1];
            console.log('User ID: ', userId);

            const newVisit = {
            park: {
                id: selectedPark,
            },
            parkName: selectedParkName,
            dateVisited: date,
            user: {
                id: userId,
            },
            userAttractions: []
        
        };

        console.log("New Visit: ", newVisit);

        try {
            console.log('ADDVISIT.JS: attempting to call http://localhost:8080/visits/', newVisit)
            await axios.post('http://localhost:8080/visits', newVisit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            alert('Visit added successfully');

        } catch (error) {
            console.error('Error adding visit: ', error);
            alert('Error adding visit');
        }
    };




    if(loading) {
        return <div>Loading...</div>
    }
    

    return (
        <div>
            <h1> Add a New Visit </h1>
            <form onSubmit = {handleAddVisit}>
                <div>
                    <label>Date:</label>
                    <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required
                    />
        </div>
        <div>
            <label>Park: </label>
            <select
                value = {selectedPark}
                onChange = {(e) => {
                    const selectedParkId = e.target.value;
                    const selectedParkObj = parks.find(park => park.id === selectedParkId);
                    setSelectedPark(selectedParkId);
                    setSelectedParkName(selectedParkObj ? selectedParkObj.name : '');
                }}
                required
                >
                <option value = ''>Select a park</option>
                {parks.map((park) => (
                    <option key = {park.id} value = {park.id}>
                        {park.name}
                    </option>
                ))}
                </select>
        </div>
        <div>

            

        </div>
        <button type = 'submit'>Add Visit</button>
        </form>
        <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
    
};

export default AddVisit;

