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
import AddVisit from "./pages/AddVisit";
import NavBar from "./components/NavBar";
import VisitPage from "./pages/VisitPage";
import PageTransition from "./services/pageTransition";

function App() {
  const location = useLocation();

  return (
    <PageTransition>
      <div>{/* <NavBar /> */}</div>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-visit" element={<AddVisit />} />
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
