// pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LogoutButton from "../components/auth/LogoutButton";
import { useNavigate } from "react-router-dom";
import PageTransition from "../services/pageTransition";
import { getVisitDetails, getVisitsByUserId } from "../services/API Calls/VisitService";

const Dashboard = () => {
 const[loadingVisit, setLoadingVisit] = useState(false);
  const navigate = useNavigate();
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, isLoading, user } =
    useAuth0();
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(null);
  const { state } = useLocation();


  useEffect(() => {

      const fetchVisits = async () => {
        try {
          const data = state?.visits || await getVisitsByUserId(user, getAccessTokenSilently);
          setVisits(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching visits: ', error);
          setLoading(false);
        } finally {
            setLoading(false);
        }
      };

      fetchVisits();
    
  }, [getAccessTokenSilently, state, user]);


 
 
  const handleSelectVisit = async (visit) => {
    console.log("Selected Visit: ", visit);
    setLoadingVisit(true);

    try {
        const visitDetails = await getVisitDetails(visit.id, getAccessTokenSilently);
        navigate(`/visit/${visit.id}`, { state: { visitDetails } });
    } catch (error) {
        console.error("Error fetching visit details: ", error);
    } finally {
        setLoadingVisit(false);
    }
};





  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <PageTransition>
    <div className="dashboard-container">
      <h1>Welcome to Your Dashboard</h1>
      <p>This is a private page you can see only after logging in.</p>

      <h2>Your Visits</h2>
      {/* <div className="visit-list-container"> */}
        {visits && visits.length > 0 ? (
          <ul className="visit-list">
            {visits.reverse().map((visit) => (
              <li
                key={visit.id}
                className="visit-list-item"
                onClick={() => handleSelectVisit(visit)}
              >
                <div className="visit-list-item-content">
                  {visit.parkName} - {visit.dateVisited}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p> No Visits Found! </p>
        )}
      {/* </div> */}
      <button className="button" type="button">
        Add Visit
      </button>

      <LogoutButton />
    </div>
    </PageTransition>
  );
};

export default Dashboard;
