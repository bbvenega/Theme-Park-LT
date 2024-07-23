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

function App() {
  const location = useLocation();

  return (
    <PageTransition>
      <div>{/* <NavBar /> */}</div>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/visit/:visitId" element={<VisitPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </PageTransition>
  );
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
