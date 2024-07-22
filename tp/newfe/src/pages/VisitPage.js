import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import EditAttractionModal from "../components/EditAttractionModal";
import { useAuth0 } from "@auth0/auth0-react";
import { formatTime } from "../services/formatTime";
import Stopwatch from "../components/stopwatch"; // Import Stopwatch component
import "../Styles/VisitPage.css";
import axios from "axios";
import  getTimeofDay  from "../services/getTimeofDay";
import PageTransition from "../services/pageTransition";
import { getVisitDetails, getVisitAttractions, getVisitsByUserId} from "../services/API Calls/VisitService";


const VisitPage = () => {
  const { visitId } = useParams();
  const { state } = useLocation();
  const [visitDetails, setVisitDetails] = useState(state?.visitDetails || null);
  const { getAccessTokenSilently, user} = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [showEditAttractionModal, setShowEditAttractionModal] = useState(false);
  const [selectedAttractionData, setSelectedAttractionData] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [parkName, setParkName] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(!state?.visitDetails);
  const [loadingAttractions, setLoadingAttractions] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.visitDetails) {
      const fetchVisitDetails = async () => {
        try {
          console.log('Fetching visit details...');
          const data = await getVisitDetails(visitId, getAccessTokenSilently);
          console.log('Visit details fetched: ', data);
          setVisitDetails(data);
          setLoadingPage(false);
        } catch (error) {
          console.error('Error fetching visit details:', error);
          setLoadingPage(false);
        }
      };
  
      fetchVisitDetails();
    } else {
      setLoadingPage(false);
    }
  }, [visitId, getAccessTokenSilently, state]);

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
        const data = await getVisitAttractions(visitId, getAccessTokenSilently);
        console.log("Attractions: ", data);
        setAttractions(data);
        setLoadingAttractions(false); // Data is ready
      }
      catch (error) {
        console.error("Error fetching attractions: ", error);
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

    setShowEditAttractionModal(true);
    setSelectedAttraction(attraction);
  };

  const handleCloseEditAttractionModal = () => {
    setShowEditAttractionModal(false);
  };

  const goToDashboard = async () => {
    try {
      const data = await getVisitsByUserId(user, getAccessTokenSilently);
      navigate("/dashboard", { state: { visits: data } });
    } catch (error) {
      console.error("Error fetching user visits: ", error);
    }
    };

  const handleSaveAttraction = async (updatedAttraction) => {
    console.log("Updated attraction: ", updatedAttraction);
    try {
    const token = await getAccessTokenSilently();

    const updatedAttractionPayload = {
      id: updatedAttraction.id,
      timeOfDay: updatedAttraction.timeOfDay,
      actualWaitTime: updatedAttraction.actualWaitTime * 60,
      postedWaitTime: updatedAttraction.postedWaitTime,
      attractionName: updatedAttraction.attractionName,
      fastpass: updatedAttraction.fastpass,
      singleRider: updatedAttraction.singleRider,
      brokeDown: updatedAttraction.brokeDown,
    };

    console.log("Token: ", token);
    // LEFT OFF HERE ~ ERROR when trying to update attraction in th
    console.log("Attempting to update attraction: ", updatedAttractionPayload);
    console.log(
      `Attempting to call http://localhost:8080/visits/${visitId}/attractions/${updatedAttraction.id}`
    );
    await axios.put(
      `http://localhost:8080/visits/${visitId}/attractions/${updatedAttraction.id}`,
      {
        ...updatedAttractionPayload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const updatedAttractions = visitDetails.userAttractions.reverse().map((attraction) =>
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


  const handleDeleteAttraction = async (attractionId) => {

    setVisitDetails((prevDetails) => ({
      ...prevDetails,
      userAttractions: prevDetails.userAttractions.filter(
        (attraction) => attraction.id !== attractionId
      ),
    }));
    setShowEditAttractionModal(false);

    // Delete the attraction from the database
    try {
      const token = await getAccessTokenSilently();
      await axios.delete(
        `http://localhost:8080/visits/${visitId}/attractions/${attractionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    catch (error) {
      console.error("Error deleting attraction: ", error);
    }
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
          timeOfDay: getTimeofDay(),
          actualWaitTime: elapsedTime,
          postedWaitTime:
            selectedAttractionData.attraction.queue.STANDBY.waitTime,
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
            timeOfDay: selectedAttractionData.timeOfDay,
            actualWaitTime: elapsedTime,
            postedWaitTime:
              selectedAttractionData.attraction.queue.STANDBY.waitTime,
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



  // if (loadingPage) {
  //   return <div>Loading...</div>; // Loading placeholder for page
  // }

    console.log("showeditmodal status: ", showEditAttractionModal);

  return (
    <PageTransition>
    <div
      className={`visit-page-container ${
        showModal || showConfirmationModal ? "blurred" : ""
      }`}
    >
      <button onClick={goToDashboard} className="back-button">
        Dashboard
      </button>
      <h1>{parkName}</h1>
      <button className="button" onClick={handleOpenModal}>
        Add Attraction
      </button>
      <Modal show={showModal} onClose={handleCloseModal}>
        {loadingAttractions ? (
          <div>Loading...</div>
        ) : (
          
          <AttractionsList
            attractions={attractions}
            onAddAttraction={handleAddAttraction}
            setElapsedTime={setElapsedTime}
            setShowConfirmationModal={setShowConfirmationModal}
          />
        )}
      </Modal>
      {selectedAttractionData && (
        <div className="stopwatch-container">
          <h3>Currently Timing: <br></br>{selectedAttractionData.attraction.name}</h3>
          <Stopwatch
            onStop={handleStopwatchStop}
            postedWaitTime={
              selectedAttractionData.attraction.queue.STANDBY.waitTime
            }
          />
          <button className="button" onClick={handleShowConfirmationModal}>
            Submit
          </button>
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
            {visitDetails.userAttractions.reverse().map((attraction) => (
              <li
                key={attraction.id}
                className="visited-attraction-item"
                onClick={() => handleShowEditAttractionModal(attraction)}
              >
                <span className="attraction-name">
                  {attraction.attractionName}
                </span>
                <ul className="attraction-details">
                  Posted Wait Time: {attraction.postedWaitTime} minutes <br></br>
                  Actual wait time: {formatTime(attraction.actualWaitTime)} <br></br>
                  <ul>
                    {attraction.fastpass ? "⚡" : ""}{" "}
                    {attraction.singleRider ? "🙋" : ""}{" "}
                    {attraction.brokeDown ? "🔨" : ""}
                  </ul>
                  {attraction.timeOfDay ? `Time of Day: ${attraction.timeOfDay}` : ""}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </PageTransition>
  );
};

export default VisitPage;
