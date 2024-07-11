import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const ListComponent = () => {
    const {isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [list, setList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    const token = await getAccessTokenSilently();
                    const response = await axios.get('http://localhost:8080/api/list', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setList(response.data);
                } catch (error) {
                    console.error("Error fetching the list", error);
                }
            }
        };

        fetchData();
    }, [isAuthenticated, getAccessTokenSilently]);

    if (!isAuthenticated) {
        return <div>Please Log In to view your list!</div>;
    }

    return (
        <div> 
            <h1> Theme Parks</h1>
            <ul>
                {list.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};