// The editAttractionModal component is used to edit an attraction. It displays the attraction details in a modal and allows the user to update the posted wait time, actual wait time, fastpass, single rider, and broke down status. The user can save the changes or delete the attraction.

import React, { useState, useEffect } from "react";
import "../../Styles/Modal.css";

// The modal function takes in the show, onClose, attraction, onSave, onDelete and children props.
// The show prop is used to determine if the modal should be displayed or not.
// The onClose prop is used to close the modal.
// The children prop is used to render the children of the modal.
// The attraction prop is used to set the attraction details.
// The onSave prop is used to save the changes made to the attraction details.
// The onDelete prop is used to delete the attraction.
const EditAttractionModal = ({
  show,
  onClose,
  attraction,
  onSave,
  onDelete,
}) => {
  const [postedWaitTime, setPostedWaitTime] = useState("");
  const [actualWaitTime, setActualWaitTime] = useState("");
  const [fastpass, setFastpass] = useState(false);
  const [singleRider, setSingleRider] = useState(false);
  const [brokeDown, setBrokeDown] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("");
  // const [attraction, setAttraction] = useState(null);\
  const [attractionName, setAttractionName] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // The useEffect hook is used to set the visibility of the modal.
  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [show]); // useEffect hook is dependent on the show variable.
// console.log("attraction: ", attraction);
  // The useEffect hook is used to set the state of the attraction details based on the updated information.
  useEffect(() => {
    if (attraction) {
      // setAttraction(attraction);
      setPostedWaitTime(attraction.postedWaitTime || "");
      setActualWaitTime(attraction.actualWaitTime || "");
      setFastpass(attraction.fastpass || false);
      setSingleRider(attraction.singleRider || false);
      setBrokeDown(attraction.brokeDown || false);
      setTimeOfDay(attraction.timeOfDay || "");
      setAttractionName(attraction.attractionName || "");
    }
  }, [attraction]); // useEffect hook is dependent on the attraction variable.

  // The handleSave function is used to save the changes made to the attraction details.
  const handleSave = () => {
    onSave({
      id: attraction.id,
      attractionName,
      timeOfDay,
      postedWaitTime,
      actualWaitTime,
      fastpass,
      singleRider,
      brokeDown,
    });
  };

  // The handleDelete function is used to delete the attraction.
  const handleDelete = () => {
    onDelete(attraction.id);
  };

  // console.log("isVisible: ", isVisible);

  // The return statement below will render the EditAttractionModal component.
  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <button onClick={onClose} className="modal-close-button">
          {" "}
          &times;{" "}
        </button>
        <h3>Edit Attraction</h3>
        <div class = "form-group">
        <label>
          Posted Wait Time (Minutes):
          <input
            type="number"
            value={postedWaitTime}
            onChange={(e) => setPostedWaitTime(e.target.value)}
          />
        </label>
          </div>
          <div class = "form-group">
        <label>
          Actual Wait Time (Minutes):
          <input
            type="number"
            // value={Math.ceil( actualWaitTime / 60)}
            onChange={(e) => setActualWaitTime(e.target.value )}
          />
        </label>
          </div>
        <br />
        <div class = "form-group">
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

          </div>
          <div class = "edit-button-container">
        <button className="big-button" onClick={handleSave}>
          Save
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
        </div>
      </div>
    </div>
  );
};

export default EditAttractionModal;
