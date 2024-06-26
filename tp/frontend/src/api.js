import axios from 'axios';

const API_URL = '/api';

export const getGreeting = async () => {
    try {
        const response = await axios.get(`${API_URL}/greeting`);
        return response.data;
    } catch (error) {
        console.error('Error getting greeting:', error);
        throw error;
    }
};