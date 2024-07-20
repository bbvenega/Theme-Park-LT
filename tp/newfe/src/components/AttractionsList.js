import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Stopwatch from "./stopwatch";

const AttractionsList = ({ visitId, onAddAttraction }) => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { getAccessTokenSilently } = useAuth0();
  const [fastpass, setFastpass] = useState(false);
  const [singleRider, setSingleRider] = useState(false);
  const [brokeDown, setBrokeDown] = useState(false);

  console.log("visitId:", visitId);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log("Token: ", token);
        const visitResponse = await axios.get(
          `http://localhost:8080/visits/${visitId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mainParkId = visitResponse.data.park.id;

        const individualParksResponse = await axios.get(
          `http://localhost:8080/parks/${mainParkId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const individualParks = individualParksResponse.data.parks;
        console.log("individualParks:", individualParks);

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
        setAttractions(allAttractions);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };

    fetchAttractions();
  }, [visitId, getAccessTokenSilently]);

  const handleAttractionSelect = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleSubmit = () => {
    console.log("selectedAttraction:", selectedAttraction);
    if (selectedAttraction) {
      onAddAttraction({
        attractionId: selectedAttraction.id,
        timeOfDay: "CHANGE THIS",
        actualWaitTime: elapsedTime,
        postedWaitTime: selectedAttraction.queue.STANDBY.waitTime,
        attractionName: selectedAttraction.name,
        fastpass: fastpass,
        singleRider: singleRider,
        brokeDown: brokeDown,
      });
    }
  };

  // console.log('selectedAttraction:', selectedAttraction);
  // console.log('selectedAttraction ID: ', selectedAttraction?.id);
  // console.log('selectedAttraction WT: ',  selectedAttraction.queue.STANDBY.waitTime);
  return (
    <div>
      <h2>Attractions</h2>
      {/* <Stopwatch onStop={setElapsedTime} /> */}
      <ul>
        {attractions
          .filter(
            (attraction) =>
              attraction.entityType === "ATTRACTION" &&
              attraction.status === "OPERATING"
          )
          .map((attraction) => (
            <li
              key={attraction.id}
              onClick={() => handleAttractionSelect(attraction)}
            >
              {attraction.name} - ~ Wait Time:{" "}
              {attraction.queue && attraction.queue.STANDBY
                ? attraction.queue.STANDBY.waitTime
                : "N/A"}
            </li>
          ))}
      </ul>
      {selectedAttraction && (
        <div>
          <h3>Selected Attraction: {selectedAttraction.name}</h3>
          <label>
            <input
              type="checkbox"
              checked={fastpass}
              onChange={(e) => setFastpass(e.target.checked)}
            />
            Fastpass?
          </label>
          <label>
            <input
              type="checkbox"
              checked={singleRider}
              onChange={(e) => setSingleRider(e.target.checked)}
            />
            Single Rider?
          </label>
          <label>
            <input
              type="checkbox"
              checked={brokeDown}
              onChange={(e) => setBrokeDown(e.target.checked)}
            />
            Did it breakdown?
          </label>

          <button onClick={handleSubmit}>Add Attraction</button>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;
