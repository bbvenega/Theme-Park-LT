import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import Home from "./pages/HomePage";
import VisitPage from "./pages/VisitPage";
import PageTransition from "./services/Cosmetic/pageTransition";

// The App component is the main component that will be rendered by the Router.
function App() {
  const location = useLocation();

  return (
    // PageTransition is a custom component that will animate the transition between routes.
    <PageTransition>
      <Routes location={location}>
        {/* The default route is the Home component. */}
        <Route path="/" element={<Home />} />
        {/* The Dashboard route will render the Dashboard component, where a user can see / add a visit. */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* The VisitPage route will render the VisitPage component, where a user's indiviudal visit can be modified. */}
        <Route path="/visit/:visitId" element={<VisitPage />} />
        {/* If the route does not match any of the above, the user will be redirected to the Home component. */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </PageTransition>
  );
}


// The AppWrapper component is a wrapper for the App component that will be rendered by the Router.
const AppWrapper = () => {
  return (
    // <Router>
     <Router basename={process.env.PUBLIC_URL}> 
      <App />
    </Router>
  );
};

export default AppWrapper;
