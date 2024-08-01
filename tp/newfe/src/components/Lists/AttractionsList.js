// This component is used to display a list of attractions and add them to the visit.

import React, { useState } from "react";

// The AttractionsList component is a functional component that will render a list of attractions that a user can add to their visit.
const AttractionsList = ({
  attractions,
  onAddAttraction,
  setElapsedTime,
  setShowConfirmationModal,
}) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [fastpass, setFastpass] = useState(false);
  const [singleRider, setSingleRider] = useState(false);
  const [brokeDown, setBrokeDown] = useState(false);

  // The handleAttractionSelect function is used to select an attraction from the list of attractions.
  // This is in preparation for adding the attraction to the visit.
  const handleAttractionSelect = (attraction) => {
    // console.log(attraction);
    setSelectedAttraction(attraction);
    setFastpass(false);
    setSingleRider(false);
    setBrokeDown(false);
    setElapsedTime(0); // Reset elapsed time for the new attraction
  };

  // The handleSubmit function is used to add the selected attraction to the visit.
  const handleSubmit = () => {
    // console.log(selectedAttraction);
    if (selectedAttraction) {
      onAddAttraction({
        attraction: selectedAttraction,
        fastpass,
        singleRider,
        brokeDown,
      });
    }
  };

  // The return statement below will render the AttractionsList component.
  // The component will display a list of selectable attractions from the visit's theme park that a user can add to their visit.
  return (
    <div>
      <h2 className="h2-attraction-list-title">Attractions</h2>
      {attractions && attractions.length > 0 ? (
        <ul className="attractions-list">
          {attractions
            .filter(
              (attraction) =>
                attraction.entityType === "ATTRACTION" &&
                attraction.status === "OPERATING" &&
                attraction.queue &&
                attraction.queue.STANDBY &&
                attraction.queue.STANDBY.waitTime != null &&
                attraction.queue.STANDBY.waitTime !== 0
            )
            .map((attraction) => (
              <li
                key={attraction.id}
                className={`attraction-item ${
                  selectedAttraction === attraction ? "selected" : ""
                }`}
                onClick={() => handleAttractionSelect(attraction)}
              >
                <span className="attraction-name">{attraction.name}</span>{" "}
                <br></br> Live Wait Time:{" "}
                {attraction.queue && attraction.queue.STANDBY
                  ? attraction.queue.STANDBY.waitTime
                  : "N/A"}{" "}
                minutes
              </li>
            ))}
        </ul>
      ) : (
        <p>No attractions available, ensure your park is open!</p>
      )}
      {selectedAttraction && (
        <div className="attraction-select-options">
          <h3>Selected Attraction: 
            <br></br>{selectedAttraction.name}</h3>
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

          <button className="button" onClick={handleSubmit}>
            Add Attraction
          </button>
        </div>
      )}
    </div>
  );
};

export default AttractionsList;
