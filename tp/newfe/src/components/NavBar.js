import React from 'react';

import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">DashBoard</Link>
                </li>

                <li>
                    <Link to="/add-visit">Add Visit</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;