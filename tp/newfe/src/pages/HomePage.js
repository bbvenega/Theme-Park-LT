import React from 'react';
import LoginButton from '../components/auth/LoginButton';
import "../Styles/Button.css";
import "../Styles/Fonts.css";
import "../Styles/Logo.css";
import PageTransition from '../services/Cosmetic/pageTransition';


// The page a user logins to. This is a public page.
const HomePage = () => {
    return (
        <PageTransition>
    <div className="HomePage">
            <h1>Welcome to the TPLT!</h1>
            <div className='logo-container'>
            <div className="logo"></div>
            </div>
            <p>A web-based application that allows you to track your ride wait times at over XX theme parks!</p>
            <div className='buttons-container'>
            <LoginButton />
            </div>
        </div>
    </PageTransition>
    );
};

export default HomePage;