import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import { getVisitDetails } from "../services/VisitService";
import { useAuth0 } from "@auth0/auth0-react";
import { formatMilliseconds } from "../services/formatTime";
import Stopwatch from "../components/stopwatch"; // Import Stopwatch component
import "../Styles/VisitPage.css";
import axios from "axios";

const VisitPage = () => {
  const { visitId } = useParams();
  const [visitDetails, setVisitDetails] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [selectedAttractionData, setSelectedAttractionData] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [parkName, setParkName] = useState(null);

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        const data = await getVisitDetails(visitId, getAccessTokenSilently);
        setVisitDetails(data);
      } catch (error) {
        console.error("Error fetching visit details: ", error);
      }
    };



    fetchVisitDetails();
  }, [visitId, getAccessTokenSilently]);

  useEffect(() => {
    if (visitDetails) {
      setParkName(visitDetails.parkName);
    }
  }, [visitDetails]);

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

  return (
    <div className = "visit-page-container">
      <h1>{parkName}</h1>
      <button onClick={handleOpenModal}>Add Attraction</button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <AttractionsList visitId={visitId} onAddAttraction={handleAddAttraction} />
      </Modal>
      {selectedAttractionData && (
        <div className = "stopwatch-container">
          <h3>Currently Timing: {selectedAttractionData.attraction.name}</h3>
          <Stopwatch onStop={handleStopwatchStop} postedWaitTime={selectedAttractionData.attraction.queue.STANDBY.waitTime}/>
          <button onClick={handleShowConfirmationModal}>Submit</button>
        </div>
      )}
      <ConfirmationModal 
      show = {showConfirmationModal}
      onClose = {handleCloseConfirmationModal}
      onConfirm= {handleConfirmSubmit}
      elapsedTime = {elapsedTime}
      />
      {visitDetails ? (
        <div className = "visited-attractions-container">
          <h2>Visited Attractions</h2>
          <ul className="attractions-list">
            {visitDetails.userAttractions.map((attraction) => (
              <li key={attraction.id} className="visited-attraction-item">
                <span className="attraction-name">
                  {attraction.attractionName}
                </span>
                <ul className="attraction-details">
                  Posted Wait Time: {attraction.postedWaitTime} minutes || Actual wait time: {formatMilliseconds(attraction.actualWaitTime)}
                  <ul>
                    Fastpass? {attraction.fastpass ? "✅" : "❌"} Single rider? {attraction.singleRider ? "✅" : "❌"} Broke down? {attraction.brokeDown ? "✅" : "❌"}
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
