import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "../components/auth/LogoutButton";
import AddVisitModal from "../components/Modals/AddVisitModal";
import ParksList from "../components/Lists/ParksList";

import PageTransition from "../services/Cosmetic/pageTransition";
import {
  getVisitDetails,
  getVisitsByUserId,
  fetchParks,
  addVisit,
} from "../services/API Calls/VisitService";

import "../Styles/Dashboard.css";
import "../Styles/Button.css";
import "../Styles/Fonts.css";

const Dashboard = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently, user } = useAuth0();
  const [visits, setVisits] = useState([]);
  const { error } = useState(null);
  const { state } = useLocation();
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data =
          state?.visits ||
          (await getVisitsByUserId(user, getAccessTokenSilently));
        setVisits(data.reverse());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching visits: ", error);
        setLoading(false);
      }
    };

    fetchVisits();
  }, [getAccessTokenSilently, state, user]);

  const handleSelectVisit = async (visit) => {
    console.log("Selected Visit: ", visit);


    try {
      const visitDetails = await getVisitDetails(
        visit.id,
        getAccessTokenSilently
      );
      navigate(`/visit/${visit.id}`, { state: { visitDetails } });
    } catch (error) {
      console.error("Error fetching visit details: ", error);
    } finally {

    }
  };

  const handleOpenAddVisitModal = async () => {
    try {
      const parkData = await fetchParks(getAccessTokenSilently);
      setParks(parkData);
      setShowAddVisitModal(true);
    } catch (error) {
      console.error("Error fetching parks: ", error);
    }
  };

  const handleCloseModal = () => {
    setShowAddVisitModal(false);
  };

  const handleAddVisit = async (newVisit) => {
    try {
      await addVisit(newVisit, getAccessTokenSilently);
      const updatedVisits = await getVisitsByUserId(user, getAccessTokenSilently);
        setVisits(updatedVisits.reverse());
      setShowAddVisitModal(false);

      navigate (`/visit/${newVisit.id}`, {state: {visitDetails: newVisit}});
    } catch (error) {
      console.error("Error adding visit: ", error);
    }
  };

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

    if (loading) {
    return <div>Loading...</div>;
    }

  return (
    <PageTransition>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is a private page you can see only after logging in.</p>
        <h2>Your Visits</h2>
        {visits && visits.length > 0 ? (
          <ul className="visit-list">
            {visits.map((visit) => (
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
          <p>No Visits Found!</p>
        )}
        <button
          className="button"
          type="button"
          onClick={handleOpenAddVisitModal}
        >
          Add Visit
        </button>
        <AddVisitModal show={showAddVisitModal} onClose={handleCloseModal}>
          <ParksList parks={parks} onAdd={handleAddVisit} />
        </AddVisitModal>
        <LogoutButton />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
