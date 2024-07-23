import React, { useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ParksList = ({ parks, onAdd }) => {
  const [date, setDate] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedParkName, setSelectedParkName] = useState("");
  const { user } = useAuth0();

  const handleAddVisit = async (e) => {
    e.preventDefault();
    const userId = user.sub.split("|")[1];
    console.log("User ID: ", userId);

    const newVisit = {
      park: {
        id: selectedPark,
      },
      parkName: selectedParkName,
      dateVisited: date,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
      },
      userAttractions: [],
    };

    onAdd(newVisit);
  };

  const handleParkSelect = (park) => {
    setSelectedPark(park.id);
    setSelectedParkName(park.name);
  };

  const sortedParks = [...parks]
    .map((park) => ({
      ...park,
      parks: park.parks.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h1>Add a New Visit</h1>
      <form onSubmit={handleAddVisit}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Park:</label>
          <ul className="park-list">
            {sortedParks.map((park) => (
              <li
                key={park.id}
                className={`park-item ${
                  selectedPark === park.id ? "selected" : ""
                }`}
                onClick={() => handleParkSelect(park)}
              >
                <div className="park-item-content">
                  <strong>{park.name}</strong>
                  <br />
                  <div className="park-item-subtext">
                    {park.parks
                      .map((individualPark) => individualPark.name)
                      .join(", ")}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button className="button" type="submit" disabled={!selectedPark}>
          Add Visit
        </button>
      </form>
    </div>
  );
};

export default ParksList;
