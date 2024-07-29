import React from 'react';
import LoginButton from '../components/auth/LoginButton';
import "../Styles/Button.css";
import "../Styles/Fonts.css";

// The page a user logins to. This is a public page.
const HomePage = () => {
    return (
        <div className="HomePage">
            <h1>Welcome to the TPLT!</h1>
            <p>A web-based application that allows you to track your ride wait times at over XX theme parks!</p>
            <div className='buttons-container'>
            <LoginButton />
            </div>
        </div>
    );
};

export default HomePage;