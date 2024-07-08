// App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginButton from './LoginButton';
import LogoutButton from './logout';
import Profile from './profile';
import UserSettings from './UserSettings';

const App = () => {
    const {isAuthenticated} = useAuth0();
    
    return (
        <Router>
        <div>
            <h1>Welcome to My App</h1>
            <LoginButton />
            <LogoutButton />
            <Switch>
                <Route path="/profile">
                {isAuthenticated ? <Profile /> : <Redirect to="/" />}
                </Route> 
                <Route path="/" component ={UserSettings} exact/>
                <Route path="*">
                <Redirect to="/" />
                </Route>
            </Switch>
          
        </div>
        </Router>

    );
};

export default App;
