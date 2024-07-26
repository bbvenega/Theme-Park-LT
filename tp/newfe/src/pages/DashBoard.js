// The dashboard is the landing page for the user after they have logged in. The user can see a list of their visits and add a new visit. The dashboard is a private page that can only be accessed after logging in. The user can also log out from the dashboard.

// The following imports are required for this page:
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// The following components are imported from the components directory:
import LogoutButton from "../components/auth/LogoutButton";
import AddVisitModal from "../components/Modals/AddVisitModal";
import ParksList from "../components/Lists/ParksList";

// The following components are imported from the components/Modals directory:
import PageTransition from "../services/Cosmetic/pageTransition";
import {
  getVisitDetails,
  getVisitsByUserId,
  fetchParks,
  addVisit,
} from "../services/API Calls/VisitService";
import {FormatDate} from "../services/Time Stuff/FormatDate";

// The following styles are imported from the Styles directory:
import "../Styles/Dashboard.css";
import "../Styles/Button.css";
import "../Styles/Fonts.css";

// The dashbaord component is a functional component that will render the user's dashboard. The user can see a list of their visits and add a new visit. The dashboard is a private page that can only be accessed after logging in. The user can also log out from the dashboard.
const Dashboard = () => {
  // The variables below are all dependent on React hooks.
  const navigate = useNavigate();
  const { getAccessTokenSilently, user } = useAuth0();
  const { error } = useState(null);
  const { state } = useLocation();

  // The variables below are all used to fetch and load a user's visits.
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parks, setParks] = useState([]);
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);

  // The useEffect hook is used to fetch the user's visits and set the state of the visits variable.
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

  // The handleSelectVisit function is used to select a visit and navigate to the VisitPage component.
  // It preloads the visit details to the state of the VisitPage component.
  const handleSelectVisit = async (visit) => {
    console.log("Selected Visit: ", visit);

    try {
      const visitDetails = await getVisitDetails(
        visit.id,
        getAccessTokenSilently
      );

      if(visitDetails && visitDetails.userAttractions) { 
      visitDetails.userAttractions.reverse();
      
      }
      navigate(`/visit/${visit.id}`, { state: { visitDetails } });
    } catch (error) {
      console.error("Error fetching visit details: ", error);
    } finally {
    }
  };

  // The handleOpenAddVisitModal function is used to open the AddVisitModal component and fetch the parks data.
  const handleOpenAddVisitModal = async () => {
    try {
      const parkData = await fetchParks(getAccessTokenSilently);
      setParks(parkData);
      setShowAddVisitModal(true);
    } catch (error) {
      console.error("Error fetching parks: ", error);
    }
  };

  // The handleCloseModal function is used to close the AddVisitModal component.
  const handleCloseModal = () => {
    setShowAddVisitModal(false);
  };

  // The handleAddVisit function is used to add a new visit and navigate to the VisitPage component.
  const handleAddVisit = async (newVisit) => {
    try {
      const createdVisit = await addVisit(newVisit, getAccessTokenSilently);
      const updatedVisits = await getVisitsByUserId(
        user,
        getAccessTokenSilently
      );
      setVisits(updatedVisits.reverse());
      setShowAddVisitModal(false);

      

     if(createdVisit && createdVisit.id) {
      console.log("Created Visit: ", createdVisit);
      navigate(`/visit/${createdVisit.id}`, { state: { visitDetails: createdVisit } });
     } else {
      console.error("Error adding visit: ", createdVisit);
     }

      
    } catch (error) {
      console.error("Error adding visit: ", error);
    }
  };

  // The following conditional statements are used to handle loading and error states.
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  // The following conditional statement is used to display a loading message while the visits are being fetched.
  if (loading) {
    return <div>Loading...</div>;
  }

  // The following JSX is the structure of the dashboard component.
  return (
    <PageTransition>
      <div className="dashboard-container">
        <h1>Welcome to Your Dashboard</h1>
        <p>This is a private page you can see only after logging in.</p>
        <h2>Your Visits</h2>
        {/* If the visits array is not empty, the component will render a list of the user's visits. If the visits array is empty, the component will render a message saying "No Visits Found!". */}
        {visits && visits.length > 0 ? (
          <ul className="visit-list">
            {/* All of the user's visits are displayed in a list. Each visit is a clickable list item that will navigate the user to the VisitPage component when clicked. */}
            {visits.map((visit) => (
              <li
                key={visit.id}
                className="visit-list-item"
                onClick={() => handleSelectVisit(visit)}
              >
                <div className="visit-list-item-content">
                  <div className="modal-text-header">
                  {visit.parkName} 
                  </div>
                  <div className="modal-text-subtext">
                  {FormatDate(visit.dateVisited)}
                  </div>
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
        {/* The AddVisitModal component is displayed when the showAddVisitModal state is true. */}
        <AddVisitModal show={showAddVisitModal} onClose={handleCloseModal}>
          <ParksList parks={parks} onAdd={handleAddVisit} />
        </AddVisitModal>
        <LogoutButton />
      </div>
    </PageTransition>
  );
};

export default Dashboard;
