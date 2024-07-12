import axios from 'axios';

const fetchVisits = async (userId, token) => {
    console.log(`Fetching visits for user: ${userId}, with token: ${token}`);
    
    try {
        const response = await axios.get(`http://localhost:8080/visits/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        console.log('Visits response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching visits: ', error);
        return [];
    }
};

export default fetchVisits;
