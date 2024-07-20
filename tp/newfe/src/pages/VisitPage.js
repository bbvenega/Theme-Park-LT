import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import EditAttractionModal from "../components/EditAttractionModal";
import { getVisitDetails } from "../services/VisitService";
import { useAuth0 } from "@auth0/auth0-react";
import { formatTime } from "../services/formatTime";
import Stopwatch from "../components/stopwatch"; // Import Stopwatch component
import "../Styles/VisitPage.css";
import axios from "axios";


const VisitPage = () => {
  const { visitId } = useParams();
  const [visitDetails, setVisitDetails] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [showEditAttractionModal, setShowEditAttractionModal] = useState(false);
  const [selectedAttractionData, setSelectedAttractionData] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [parkName, setParkName] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        console.log("Fetching visit details...");
        const data = await getVisitDetails(visitId, getAccessTokenSilently);
        console.log("Visit details fetched: ", data);
        setVisitDetails(data);
        setLoadingPage(false);
      } catch (error) {
        console.error("Error fetching visit details: ", error);
        setLoadingPage(false);
      }
    };

    fetchVisitDetails();
  }, [visitId, getAccessTokenSilently]);

  useEffect(() => {
    if (visitDetails) {
      setParkName(visitDetails.parkName);
      console.log("Park name set: ", visitDetails.parkName);
    }
  }, [visitDetails]);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        console.log("Fetching attractions...");
        const token = await getAccessTokenSilently();
        const visitResponse = await axios.get(
          `http://localhost:8080/visits/${visitId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Visit response: ", visitResponse.data);
        const mainParkId = visitResponse.data.park.id;
        const individualParksResponse = await axios.get(
          `http://localhost:8080/parks/${mainParkId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Individual parks response: ", individualParksResponse.data);
        const individualParks = individualParksResponse.data.parks;
        const attractionsPromises = individualParks.map((individualPark) =>
          axios.get(
            `http://localhost:8080/parks/${individualPark.id}/attractions`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );

        const responses = await Promise.all(attractionsPromises);
        const allAttractions = responses.flatMap((res) => res.data);
        console.log("Attractions fetched: ", allAttractions);
        setAttractions(allAttractions);
        setLoadingAttractions(false); // Data is ready
      } catch (error) {
        console.error("Error fetching attractions:", error);
        setLoadingAttractions(false); // Error occurred, stop loading
      }
    };

    fetchAttractions();
  }, [visitId, getAccessTokenSilently]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleShowEditAttractionModal = (attraction) => {
    setSelectedAttraction(attraction);
    setShowEditAttractionModal(true);
  }

  const handleCloseEditAttractionModal = () => {
    setShowEditAttractionModal(false);
  }

  const handleSaveAttraction = async (updatedAttraction) => {
    
    console.log("Updated attraction: ", updatedAttraction);
    try {
      const token = await getAccessTokenSilently();

      const updatedAttractionPayload = {
        id: updatedAttraction.id,
        timeOfDay: updatedAttraction.timeOfDay,
        actualWaitTime: updatedAttraction.actualWaitTime,
        postedWaitTime: updatedAttraction.postedWaitTime,
        attractionName: updatedAttraction.attractionName,
        fastpass: updatedAttraction.fastpass,
        singleRider: updatedAttraction.singleRider,
        brokeDown: updatedAttraction.brokeDown
      };

      console.log("Token: ", token);
      console.log(`Attempting to call http://localhost:8080/visits/${visitId}/attractions/${updatedAttraction.id}`);
      await axios.put(
        `http://localhost:8080/visits/${visitId}/attractions/${updatedAttraction.id}`,
        updatedAttractionPayload,
        {
          headers: {
            Authorizationq: `Bearer ${token}`,
          },
    }

  );
    const updatedAttractions = visitDetails.userAttractions.map((attraction) =>
      attraction.id === updatedAttraction.id ? updatedAttraction : attraction
    );
    setVisitDetails((prevDetails) => ({
      ...prevDetails,
      userAttractions: updatedAttractions,
    }));
    handleCloseEditAttractionModal();
  } catch (error) {
    console.error("Error updating attraction: ", error);
  }
};

  const handleDeleteAttraction = (attractionId) => {
    setVisitDetails((prevDetails) => ({
      ...prevDetails,
      userAttractions: prevDetails.userAttractions.filter((attraction) => attraction.id !== attractionId),
    }));
    setShowEditAttractionModal(false);
    }


  const handleAddAttraction = (data) => {
    setShowModal(false); // Close the modal immediately
    setSelectedAttractionData(data);
  };

  const handleStopwatchStop = (time) => {
    setElapsedTime(time);
  };

  const handleConfirmSubmit = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `http://localhost:8080/visits/${visitId}/attractions`,
        {
          attractionId: selectedAttractionData.attraction.id,
          timeOfDay: "CHANGE THIS",
          actualWaitTime: elapsedTime,
          postedWaitTime: selectedAttractionData.attraction.queue.STANDBY.waitTime,
          attractionName: selectedAttractionData.attraction.name,
          fastpass: selectedAttractionData.fastpass,
          singleRider: selectedAttractionData.singleRider,
          brokeDown: selectedAttractionData.brokeDown,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVisitDetails((prevDetails) => ({
        ...prevDetails,
        userAttractions: [
          ...prevDetails.userAttractions,
          {
            attractionId: selectedAttractionData.attraction.id,
            timeOfDay: "CHANGE THIS",
            actualWaitTime: elapsedTime,
            postedWaitTime: selectedAttractionData.attraction.queue.STANDBY.waitTime,
            attractionName: selectedAttractionData.attraction.name,
            fastpass: selectedAttractionData.fastpass,
            singleRider: selectedAttractionData.singleRider,
            brokeDown: selectedAttractionData.brokeDown,
          },
        ],
      }));
      setSelectedAttractionData(null);
      setElapsedTime(0); // Reset elapsed time
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error adding attraction: ", error);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  if (loadingPage) {
    return <div>Loading...</div>; // Loading placeholder for page
  }

  return (
    <div className={`visit-page-container ${showModal || showConfirmationModal ? 'blurred' : ''}`}>
      <button onClick={goToDashboard} className="back-button">Dashboard</button>
      <h1>{parkName}</h1>
      <button className="button" onClick={handleOpenModal}>Add Attraction</button>
      <Modal show={showModal} onClose={handleCloseModal}>
        {loadingAttractions ? (
          <div>Loading...</div>
        ) : (
          <AttractionsList
            attractions={attractions}
            onAddAttraction={handleAddAttraction}
          />
        )}
      </Modal>
      {selectedAttractionData && (
        <div className="stopwatch-container">
          <h3>Currently Timing: {selectedAttractionData.attraction.name}</h3>
          <Stopwatch
            onStop={handleStopwatchStop}
            postedWaitTime={
              selectedAttractionData.attraction.queue.STANDBY.waitTime
            }
          />
          <button className="button" onClick={handleShowConfirmationModal}>Submit</button>
        </div>
      )}
      <ConfirmationModal
        show={showConfirmationModal}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmSubmit}
        elapsedTime={elapsedTime}
      />
      <EditAttractionModal
        show={showEditAttractionModal}
        onClose={handleCloseEditAttractionModal}
        attraction={selectedAttraction}
        onSave={handleSaveAttraction}
        onDelete={handleDeleteAttraction}
      />
      {visitDetails ? (
        <div className="visited-attractions-container">
          <h2>Visited Attractions</h2>
          <ul className="attractions-list">
            {visitDetails.userAttractions.map((attraction) => (
              <li key={attraction.id} 
              className="visited-attraction-item"
              onClick={() => handleShowEditAttractionModal(attraction)}
              >
                <span className="attraction-name">
                  {attraction.attractionName}
                </span>
                <ul className="attraction-details">
                  Posted Wait Time: {attraction.postedWaitTime} minutes || Actual wait time: {formatTime(attraction.actualWaitTime)}
                  <ul>
                     {attraction.fastpass ? "⚡" : ""}  {attraction.singleRider ? "🙋" : ""} {attraction.brokeDown ? "🔨" : ""}
                  </ul>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VisitPage;
