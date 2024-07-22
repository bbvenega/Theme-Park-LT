// pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import LogoutButton from "../components/auth/LogoutButton";
import fetchVisits from "../services/getVisitsByUserId";
import { useNavigate } from "react-router-dom";
import PageTransition from "../services/pageTransition";

const Dashboard = () => {
  const navigate = useNavigate();
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, isAuthenticated, isLoading, user } =
    useAuth0();
  const [visits, setVisits] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("User object: ", user);
    const fetchParks = async () => {
      if (isAuthenticated && !isLoading) {
        try {
          const token = await getAccessTokenSilently();
          console.log("TOKEN: ", token);
          try {
            const response = await axios.get("http://localhost:8080/parks", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setParks(response.data || []);
          } catch (error) {
            console.error("Error fetching parks: ", error);
            setError(error);
            setLoading(false);
          }

          try {
            const userId = user.sub.split("|")[1];
            console.log(
              `IN DASHBOARD ~ Fetching visits for user: ${userId}, with token: ${token}`
            );
            const userVisits = await fetchVisits(userId, token);
            setVisits(userVisits);
          } catch (error) {
            console.error("Error fetching visits: ", error);
            setError(error);
            setLoading(false);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setError(error);
          setLoading(false);
        }
      } else {
        console.log("User is not authenticated");
        setLoading(false);
      }
    };

    fetchParks();
  }, [getAccessTokenSilently, isAuthenticated, isLoading, user]);


 
 
  const handleSelectVisit = (visit) => {
    console.log("Selected Visit: ", visit);
    navigate(`/visit/${visit.id}`);
  };

  if (loading) {
    <div className="visit-list-container">
      return <div>Loading...</div>;
    </div>;
  }

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
