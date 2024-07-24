// The modal component is used as a general modal but in this case, it is used to display the modal for the attractionsList component.

import React, { useEffect, useState } from "react";
import "../../Styles/Modal.css";

// The modal function takes in the show, onClose, and children props.
// The show prop is used to determine if the modal should be displayed or not.
// The onClose prop is used to close the modal.
// The children prop is used to render the children of the modal.
const Modal = ({ show, onClose, children }) => {
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

  console.log("isVisible: ", isVisible);

    // The return statement below will render the Modal component.
  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
