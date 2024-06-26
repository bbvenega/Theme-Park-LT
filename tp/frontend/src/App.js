import React, { useState, useEffect } from 'react';
import { getGreeting } from './api';

const App = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const data = await getGreeting();
                setGreeting(data);
            } catch (error) {
                console.error('Error fetching greeting:', error);
            }
        };

        fetchGreeting();
    }, []);

    return (

          <div style={{ backgroundColor: 'pink', height: '100vh', padding: '20px' }}>
            <h1>{greeting}</h1>
        </div>
    );
};

export default App;
