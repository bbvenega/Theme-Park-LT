// The deleteVisitModal component is used to delete a visit entirely. The component is displayed on the VistPage.

import React, { useEffect, useState } from "react";

import "../../Styles/Modal.css";

// The modal function takes in the show, onClose, and children props.
// The show prop is used to determine if the modal should be displayed or not.
// The onClose prop is used to close the modal.
// The children prop is used to render the children of the modal.
const DeleteVisitModal = ({ show, onClose, handleDeleteVisit}) => {
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





  // console.log("isVisible: ", isVisible);

  // The return statement below will render the AddVisitModal component.
  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <h3> Are you sure you want to delete the visit? </h3>
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        <div className="buttons-container">
        <button onClick={handleDeleteVisit} className="delete-button-visit">
            Delete
        </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVisitModal;
