// The modal component is used as a general modal but in this case, it is used to display the modal for the attractionsList component.

import React, { useEffect, useState } from "react";
import "../../Styles/Modal.css";

// The modal function takes in the show, onClose, and children props.
// The show prop is used to determine if the modal should be displayed or not.
// The onClose prop is used to close the modal.
// The children prop is used to render the children of the modal.
const InfoModal = ({ show, onClose }) => {
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

  // The return statement below will render the Modal component.
  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
        <h1>Welcome to Your Visit Page!</h1>
        <h3>Track All the Attractions You Experience During Your Visit</h3>
        <p>
          Use the "Add Attraction" button to select rides from a list with live
          wait times. You can also specify whether you are using the single
          rider line or a fastpass.
        </p>
        <p>
          Start the timer to track your wait time in line. When you reach the
          end of the line, stop the timer and submit your time.
        </p>
        <p>
          After submitting, you can review your ride times and see how long you
          waited for each attraction.
        </p>

        <h3>Important Notes</h3>

          <p>
            Remember to stop the timer when you reach the end of the line.
          </p>
          <p>Submit your time before starting the next ride.</p>
          <p>
            '🚧' - Use this button to track how long a ride is broken down if
            you decide to wait through it.
          </p>
          <p>
            '🔨' - Indicates that the ride broke down while you were in pne.
          </p>
          <p>'🙋' - Indicates that you used the single rider pne.</p>
          <p>'⚡' - Indicates that you used a fastpass.</p>


        <h3>Enjoy your visit!</h3>
      </div>
    </div>
  );
};

export default InfoModal;
