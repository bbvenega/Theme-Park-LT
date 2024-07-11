import React from 'react';
import LoginButton from '../components/auth/LoginButton';

const HomePage = () => {
    return (
        <div className="HomePage">
            <h1>Welcome to the Home Page</h1>
            <p>This is a public page you can see without logging in.</p>
            <LoginButton />
        </div>
    );
};

export default HomePage;