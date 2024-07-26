// The ConfirmationModal is a modal that pops up when the user tries to submit a time. It asks the user to confirm the time they are submitting.

import React, {useEffect, useState} from "react";
import '../../Styles/Modal.css';
import { formatTime } from "../../services/Time Stuff/formatTime";

// The modal function takes in the show, onClose, onConfirm and elapsedTime props.
// The show prop is used to determine if the modal should be displayed or not.
// The onClose prop is used to close the modal.
// The onConfirm prop is used to confirm the submission of the time.
// The elapsedTime prop is used to set the elapsed time.

const ConfirmationModal = ({ show, onClose, onConfirm, elapsedTime }) => {
    const [isVisible, setIsVisible] = useState(false);

    // The useEffect hook is used to set the visibility of the modal.
    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);


  // console.log("isVisible: ", isVisible);

  // The return statement below will render the ConfirmationModal component.
  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <h3> Confirm Submission</h3>
        <p>
          {" "}
          Are you sure you want to submit the time: <br></br>
          {formatTime(elapsedTime)}?
        </p>
        <button className="button" onClick={onConfirm}> Yes</button>
        <button className="button" onClick={onClose}> No</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
