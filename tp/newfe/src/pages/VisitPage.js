import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AttractionsList from "../components/AttractionsList";
import AddAttractionToVisit from "../components/AddAttractionToVisit";
import Modal from "../components/Modal";
import { getVisitDetails } from "../services/VisitService";
import { useAuth0 } from "@auth0/auth0-react";
import { formatMilliseconds } from "../services/formatTIme";
import "../Styles/VisitPage.css";
import Stopwatch from "../components/stopwatch";
import axios from "axios";

const VisitPage = () => {
  const { visitId } = useParams();
  const [visitDetails, setVisitDetails] = useState(null);
  const { getAccessTokenSilently } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [selectedAttractionData, setSelectedAttractionData] = useState(null);

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

const handleOpenModal = () => {
  setShowModal(true);
};

const handleCloseModal = () => {
  setShowModal(false);
}

const handleAddAttraction = async (attractionData) => {
  try {
    const token = await getAccessTokenSilently();
    await axios.post(
      `http://localhost:8080/visits/${visitId}/attractions`,
      {
        attractionData,
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
          attractionData
        },
      ],
    }
    )
  );
  setSelectedAttractionData(attractionData);
  setShowModal(false);
    alert("Attraction added!");
  } catch (error) {
    console.error("Error adding attraction: ", error);
  }
};

  return (
    <div>
      <h1>Visit Page</h1>
      {visitDetails ? (
        <div>
          <h2>Visited Attractions</h2>
          <ul className="attractions-list">
            {visitDetails.userAttractions.map(
              (attraction) => (
                //eslint-disable-next-line
                console.log("attraction:", attraction),
                (
                  <li key={attraction.id} className="attraction-item">
                    <span className="attraction-name">
                      {attraction.attractionName}
                    </span>
                    <ul className = "attraction-details">
                     Posted Wait Time: {attraction.postedWaitTime}{" "}
                    minutes  || Actual wait time:
                    {formatMilliseconds(attraction.actualWaitTime)}
                    <ul>
                      {" "}
                      Fastpass? {attraction.fastpass ? "✅" : "❌"} Single
                      rider? {attraction.singleRider ? "✅" : "❌"} Broke
                      down? {attraction.brokeDown ? "✅" : "❌"}
                    </ul>
                    </ul>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={handleOpenModal}>Add Attraction</button>
      <Modal show={showModal} onClose={handleCloseModal}>
      <AddAttractionToVisit visitId={visitId} onAddAttraction={handleAddAttraction}/>
      </Modal>

      {selectedAttractionData && (
        <div>
          <h3> Currently timing: {selectedAttractionData.attractionName}</h3>
          <Stopwatch onStop= {(time) => console.log('Elapsed time:  ${time}')}/> 
    </div>
  )
};
</div>
);
};

export default VisitPage;
