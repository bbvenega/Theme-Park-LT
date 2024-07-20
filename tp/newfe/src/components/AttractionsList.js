import React, { useState } from "react";

const AttractionsList = ({ attractions, onAddAttraction }) => {
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [fastpass, setFastpass] = useState(false);
  const [singleRider, setSingleRider] = useState(false);
  const [brokeDown, setBrokeDown] = useState(false);

  const handleAttractionSelect = (attraction) => {
    setSelectedAttraction(attraction);
  };

  const handleSubmit = () => {
    if (selectedAttraction) {
      onAddAttraction({
        attraction: selectedAttraction,
        fastpass,
        singleRider,
        brokeDown,
      });
    }
  };

  return (
    <div>
      <h2>Attractions</h2>
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
