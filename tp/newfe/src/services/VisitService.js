import axios from 'axios';
import {useAuth0} from '@auth0/auth0-react';

export const getVisitDetails = async (visitId, getAccessTokenSilently) => {

    const token = await getAccessTokenSilently();
    const response = await axios.get(`http://localhost:8080/visits/${visitId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    return response.data;
};