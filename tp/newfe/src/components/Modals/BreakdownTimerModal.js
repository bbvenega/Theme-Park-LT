// The addVisitModal component is used to display a stopwatch to track how long a ride is broken. The component is displayed on the Visit Page.
// BreakdownTimerModal.js

import React, { useEffect } from "react";
import "../../Styles/Modal.css";
import { formatTime } from "../../services/Time Stuff/formatTime";


const BreakdownTimerModal = ({ show, onClose, breakdownTime, setBreakdownTime }) => {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setInterval(() => {
        setBreakdownTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [show, setBreakdownTime]);

  return (
    <div className={`modal-backdrop ${show ? "fade-in" : "fade-out"}`}>
      <div className={`modal-content ${show ? "fade-in" : "fade-out"}`}>
        <h3>🚧 Breakdown Timer 🚧</h3>
        <p>Breakdown Time <br></br>{formatTime(breakdownTime)}</p>
        <button onClick={onClose} className="modal-close-button">
          &times;
        </button>
      </div>
    </div>
  );
};

export default BreakdownTimerModal;

