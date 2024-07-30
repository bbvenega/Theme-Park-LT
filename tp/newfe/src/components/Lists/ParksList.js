// Parks List component that displays a list of parks and allows the user to select a park and add a visit to that park.
// This component is used in the AddVisitModal component and is similar to AttractionsList component.
import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ParksList = ({ parks, onAdd }) => {
  const [date, setDate] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedParkName, setSelectedParkName] = useState("");
  const { user } = useAuth0();

  // The handleAddVisit function is used to add a visit to the selected park.
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

  // The handleParkSelect function is used to select a park from the list of parks.
  // This is preparation for adding a visit to the selected park.
  const handleParkSelect = (park) => {
    setSelectedPark(park.id);
    setSelectedParkName(park.name);
  };

  // The return statement below will render the ParksList component.
  // The component will display a list of selectable parks ( in alpabetical order ) that a user can add to their visit.
  const sortedParks = [...parks]
    .map((park) => ({
      ...park,
      parks: park.parks.sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // The return statement below will render the ParksList component.
  return (
    <div>
      <h1>Add a New Visit</h1>
      <form onSubmit={handleAddVisit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          
            Park:
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
