import React, {useEffect, useState} from "react";
import "../Styles/Modal.css";
import { formatTime } from "../services/formatTime";

const ConfirmationModal = ({ show, onClose, onConfirm, elapsedTime }) => {
    const [isVisibile, setIsVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200);
            return () => clearTimeout(timer);
        }
    }, [show]);

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
