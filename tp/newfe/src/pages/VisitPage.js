// The visit page is used to display a user's visit and allows them to add, edit, and delete attractions from their visit.

// The following imports are required for this page:
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

// The following components are imported from the components directory:
import AttractionsList from "../components/Lists/AttractionsList";
import Stopwatch from "../components/Timers/stopwatch";

// The following components are imported from the components/Modals directory:
import Modal from "../components/Modals/Modal";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import EditAttractionModal from "../components/Modals/EditAttractionModal";
import DeleteVisitModal from "../components/Modals/DeleteVisitModal";
import BreakdownTimerModal from "../components/Modals/BreakdownTimerModal";
import InfoModal from "../components/Modals/InfoModal";

// The following services are imported from the services directory:
import { formatTime } from "../services/Time Stuff/formatTime";
import getTimeofDay from "../services/Time Stuff/getTimeofDay";
import PageTransition from "../services/Cosmetic/pageTransition";
import {
  getVisitDetails,
  getVisitAttractions,
  getVisitsByUserId,
  deleteVisit,
} from "../services/API Calls/VisitService";

// The following styles are imported from the Styles directory:
import "../Styles/VisitPage.css";
import "../Styles/Button.css";
import "../Styles/Fonts.css";

// The VisitPage component is a functional component that will display a user's visit and allow them to add, edit, and delete attractions from their visit.
const VisitPage = () => {
  // The variables below are all dependent on React hooks.
  const { visitId } = useParams();
  const { state } = useLocation();
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();

  // The variables below are used to manage the state of modal components.
  const [showModal, setShowModal] = useState(false);
  const [visitDetails, setVisitDetails] = useState(state?.visitDetails || null);
  const [showEditAttractionModal, setShowEditAttractionModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);


  // The variables below are used to manage the state of selected attractions that are being added / deleted.
  const [selectedAttractionData, setSelectedAttractionData] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [breakdownTime, setBreakdownTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [parkName, setParkName] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [loadingPage, setLoadingPage] = useState(!state?.visitDetails);
  const [loadingAttractions, setLoadingAttractions] = useState(true);

  // The useEffect hook below is used to fetch visit details based on the state of the visit.
  // If the visit details are not present, the visit details are fetched.
  // Otherwise, the loading page is set to false and the visit details are displayed.
  useEffect(() => {
    if (!state?.visitDetails) {
      const fetchVisitDetails = async () => {
        try {
          const data = await getVisitDetails(visitId, getAccessTokenSilently);
          setVisitDetails(data);
          setLoadingPage(false);
        } catch (error) {
          console.error("Error fetching visit details:", error);
          setLoadingPage(false);
        }
      };
      fetchVisitDetails();
    }
  }, [visitId, getAccessTokenSilently, state]); // The useEffect hook is dependent on the visitId, getAccessTokenSilently, and state variables.

  // The useEffect hook below is used to set the park name based on the visit details.
  // This is used to display the park name on the visit page.
  useEffect(() => {
    if (visitDetails) {
      setParkName(visitDetails.parkName);
      // console.log("Park name set: ", visitDetails.parkName);
    }
  }, [visitDetails]); // The useEffect hook is dependent on the visitDetails variable.

  // The useEffect hook below is used to fetch attractions based on the visitId.
  // If the attractions are not present, the attractions are fetched.
  // Otherwise, the loading attractions is set to false and the attractions are displayed.
  useEffect(() => {
    console.log("Visit ID: ", visitId);
    const fetchAttractions = async () => {
      try {
        console.log("Fetching attractions...");
        const data = await getVisitAttractions(visitId, getAccessTokenSilently);
        const sortedAttractions = data.sort(
          (a, b) => a.name.localeCompare(b.name)
        );
        setAttractions(sortedAttractions);
        setLoadingAttractions(false); // Data is ready
      } catch (error) {
        console.error("Error fetching attractions: ", error);
        setLoadingAttractions(false); // Error occurred, stop loading
      }
    };

    console.log("Initial fetch at: ", new Date());
    fetchAttractions(); // Initial fetch
    const intervalId = setInterval(() => {
      console.log("Fetching at interval @ ", new Date());
      fetchAttractions();
    }, 300000); // 10 seconds

    return () => {
      console.log("Clearing interval @ ", new Date());
      clearInterval(intervalId);
    };
  }, [visitId, getAccessTokenSilently]); // The useEffect hook is dependent on the visitId and getAccessTokenSilently variables.
  // The handleOpenModal function is used to open the modal component.
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // The handleCloseModal function is used to close the modal component.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // The handleShowConfirmationModal function is used to show the confirmation modal component.
  const handleShowConfirmationModal = () => {
    setShowConfirmationModal(true);
  };
  // The handleCloseConfirmationModal function is used to close the confirmation modal component.
  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  // The handleShowEditAttractionModal function is used to show the edit attraction modal component.
  // It also sets the selected attraction to the attraction that is being edited so that it can be displayed in the modal.
  const handleShowEditAttractionModal = (attraction) => {
    setShowEditAttractionModal(true);
    setSelectedAttraction(attraction);
  };

  // The handleCloseEditAttractionModal function is used to close the edit attraction modal component.
  const handleCloseEditAttractionModal = () => {
    setShowEditAttractionModal(false);
  };

  // The handleShowDeleteModal function is used to show the delete visit modal component.
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // The handleCloseDeleteModal function is used to close the delete visit modal component.
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  // The handleDeleteVisit function is used to delete the visit entirely.
  const handleDeleteVisit = async () => {
    try {
      await deleteVisit(visitId, getAccessTokenSilently);
      goToDashboard();
    } catch (error) {
      console.error("Error deleting visit: ", error);
    }
  };

  // The following function is used to make naviagtion to the dashboard page easier:
  // It fetches the details of the user's visits and navigates to the dashboard page.
  const goToDashboard = async () => {
    try {
      const data = await getVisitsByUserId(user, getAccessTokenSilently);
      navigate("/dashboard", { state: { visits: data } });
    } catch (error) {
      console.error("Error fetching user visits: ", error);
    }
  };

  // The handleSaveAttraction function is used to save the updated attraction details.
  // It updates the attraction details in the database and updates the visit details with the new attraction details.
  const handleSaveAttraction = async (updatedAttraction) => {
    // console.log("Updated attraction: ", updatedAttraction);
    try {
      const token = await getAccessTokenSilently();
      // console.log("Token: ", token);
      // console.log("Updated attraction: ", updatedAttraction.id);

      // the payload is updated to match the format of the database
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

      // The updated attraction is sent to the database to be updated.
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

      // The updated attraction is then updated in the visit details.
      // The updated attraction is reversed so that the most recent attraction is displayed first.
      const updatedAttractions = visitDetails.userAttractions
        .reverse()
        .map((attraction) =>
          attraction.id === updatedAttraction.id
            ? updatedAttraction
            : attraction
        );

      // The updated attractions are then set in the visit details.
      setVisitDetails((prevDetails) => ({
        ...prevDetails,
        userAttractions: updatedAttractions,
      }));

      // The edit attraction modal is then closed.
      handleCloseEditAttractionModal();
    } catch (error) {
      console.error("Error updating attraction: ", error);
    }
  };

  // The handleDeleteAttraction function is used to delete an attraction from the visit.
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
    } catch (error) {
      console.error("Error deleting attraction: ", error);
    }
  };

  // The handleAddAttraction function is used to add an attraction to the visit.
  const handleAddAttraction = (data) => {
    setElapsedTime(0); // Reset elapsed time
    setShowModal(false); // Close the modal immediately
    setSelectedAttractionData(data);
  };



  // The handleStopwatchStop function is used to handle the stopwatch stop event.
  const handleStopwatchStop = (time) => {
    setElapsedTime(time);
  };

  // The handleConfirmSubmit function is used to confirm the submission of the attraction.
  const handleConfirmSubmit = async () => {
    try {
      const token = await getAccessTokenSilently();

      // console.log("Selected Attraction Data: ", selectedAttractionData);
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
          brokeDown: breakdownTime > 0 ? true : false,
          breakdownTime: breakdownTime,
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
            timeOfDay: getTimeofDay(),
            actualWaitTime: elapsedTime,
            postedWaitTime:
              selectedAttractionData.attraction.queue.STANDBY.waitTime,
            attractionName: selectedAttractionData.attraction.name,
            fastpass: selectedAttractionData.fastpass,
            singleRider: selectedAttractionData.singleRider,
            brokeDown: breakdownTime > 0 ? true : false,
            breakdownTime: breakdownTime,
          },
        ].reverse(),
      }));
      const updatedVisitDetails = await getVisitDetails(
        visitId,
        getAccessTokenSilently
      );
      updatedVisitDetails.userAttractions.reverse();
      setVisitDetails(updatedVisitDetails);

      // Reset the state and close modals
      setSelectedAttractionData(null);
      setElapsedTime(0); // Reset elapsed time
      setBreakdownTime(0); // Reset breakdown time
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Error adding attraction: ", error);
    }
  };

  const handleBreakdownTimeChange = (time) => setBreakdownTime(time);

  // The following conditional statement is used to display a loading message while the page is loading.
  if (loadingPage) {
    return <div>Loading...</div>; // Loading placeholder for page
  }

  // console.log("showeditmodal status: ", showEditAttractionModal);

  // The return statement below is used to return the JSX for the VisitPage component.
  return (
    <PageTransition>
      <div
        className={`visit-page-container ${
          showModal || showConfirmationModal ? "blurred" : ""
        }`}
      >
        {/* The button below is used to navigate to the dashboard page, it loads the user's visits and navigates to the dashboard page. */}
        <button onClick={goToDashboard} className="back-button">
        ←
        </button>
        <h1 className="title">{parkName}</h1>
        {/* The button below is used to open the add attraction modal. It presents a list of attractions that the user can add to their visit.  */}
        {/* This is done with the AttractionsList component. */}
        <button className="big-button" onClick={handleOpenModal}>
          Add Attraction
        </button>
        <Modal show={showModal} onClose={handleCloseModal}>
          {/* When the attractions are loaded, the AttractionsList component is displayed. */}
          {loadingAttractions ? (
            <div>Loading...</div>
          ) : (
            <AttractionsList
              // Here we pass the attractions we loaded, the handleAddAttraction function, the setElapsedTime function, and the setShowConfirmationModal function to the AttractionsList component.
              attractions={attractions}
              onAddAttraction={handleAddAttraction}
              setElapsedTime={setElapsedTime}
              setShowConfirmationModal={setShowConfirmationModal}
            />
          )}
        </Modal>

        {/* If a selected attraction is present, the stopwatch component is displayed: In order to time the wait time. */}
        {selectedAttractionData && (
          <div className="stopwatch-container">
            <h3>
              <span className="currently-timing"> Currently Timing </span>{" "}
              <br></br>
              <span className="currently-timing-attraction">
                {selectedAttractionData.attraction.name}
              </span>
              <br></br>
              <span className="currently-timing-waitTime">
                Posted Wait Time:{" "}
                {selectedAttractionData.attraction.queue.STANDBY.waitTime}{" "}
                minutes{" "}
              </span>
            </h3>
            <Stopwatch
              onStop={handleStopwatchStop}
              postedWaitTime={
                selectedAttractionData.attraction.queue.STANDBY.waitTime
              }
              onBreakdownTimeChange={handleBreakdownTimeChange}
            />
            {/* The button below is used to submit the time. */}
            <button className="button" onClick={handleShowConfirmationModal}>
              Submit
            </button>
          </div>
        )}
        {/* The confirmationModal is called when the user tries to submit a time. It asks the user to confirm the time they are submitting. */}
        <ConfirmationModal
          show={showConfirmationModal}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleConfirmSubmit}
          elapsedTime={elapsedTime}
        />
        {/* The editAttractionModal is used to edit an attraction's posted / wait time, fastpass, single-rider, and broken status. */}
        <EditAttractionModal
          show={showEditAttractionModal}
          onClose={handleCloseEditAttractionModal}
          attraction={selectedAttraction}
          onSave={handleSaveAttraction}
          onDelete={handleDeleteAttraction}
        />

        {/* The following conditional statement is used to display a message if no attractions are found. */}
        {/* If there are attractions in the visit, the visited attractions are displayed in a list with the most recent attraction displayed first. */}
        {visitDetails ? (
          <div className="visited-attractions-container">
            <h2>Visited Attractions</h2>
            <ul className="attractions-list">
              {visitDetails.userAttractions.map((attraction) => (
                <li
                  key={attraction.id}
                  className="visited-attraction-item"
                  onClick={() => handleShowEditAttractionModal(attraction)}
                >
                  <span className="attraction-name">
                    {attraction.attractionName}
                  </span>
                  <ul className="attraction-details">
                    {attraction.fastpass ? "⚡" : ""}{" "}
                    {attraction.singleRider ? "🙋" : ""}{" "}
                    {attraction.brokeDown ? "🔨" : ""}
                    {attraction.fastpass || attraction.singleRider || attraction.brokeDown ? <br /> : null}
                    {attraction.timeOfDay
                      ? `${attraction.timeOfDay}`
                      : ""}
                    <br></br>Posted Wait Time: {attraction.postedWaitTime} minutes{" "}
                    <br></br>
                    Actual wait time <br></br> {formatTime(
                      attraction.actualWaitTime
                    )}{" "}
                    <br></br>
                    {attraction.brokeDown ? (
                      <>
                        Breakdown time: {formatTime(attraction.breakdownTime)}
                      </>
                    ) : null}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* The deleteVisitModal is used to delete the visit entirely. */}
        <DeleteVisitModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          handleDeleteVisit={handleDeleteVisit} // Pass the function correctly
        />

        <button className="delete-button" onClick={handleShowDeleteModal}>
          delete this visit
        </button>



        <BreakdownTimerModal>
          show={false}
          onClose={() => {}}
          breakdownTime={breakdownTime}
          setBreakDownTime={setBreakdownTime}
        </BreakdownTimerModal>

        <button className="info-button" onClick={handleShowInfoModal}>
        ❔
        </button>
        <InfoModal show={showInfoModal} onClose={handleCloseInfoModal}> 
        </InfoModal>
      </div>
    </PageTransition>
  );
};

export default VisitPage;
