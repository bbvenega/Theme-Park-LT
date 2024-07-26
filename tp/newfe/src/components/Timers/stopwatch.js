// The stopwatch component is used to measure the time taken for an attraction to be completed.
// This is used in combination with the circular timer component to display the time taken for an attraction to be completed.

import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "./CircularTimer";
import BreakdownTimerModal from "../Modals/BreakdownTimerModal";
import "../../Styles/CircularTimer.css";

// The stopwatch function takes in the onStop, postedWaitTime, and onBreakdownTimeChange props.
// The onStop prop is used to stop the stopwatch and notify the parent component.
// The postedWaitTime prop is used to set the posted wait time.
// The onBreakdownTimeChange prop is used to notify the parent component of the breakdown time.
const Stopwatch = ({ onStop, postedWaitTime, onBreakdownTimeChange }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [breakdownTime, setBreakdownTime] = useState(0);
  const timerRef = useRef(null);

  // The useEffect hook is used to update the main timer.
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // The useEffect hook is used to notify the parent component of breakdown time changes.
  useEffect(() => {
    onBreakdownTimeChange(breakdownTime);
  }, [breakdownTime, onBreakdownTimeChange]);

  // The start function is used to start the stopwatch.
  const start = () => {
    setIsRunning(true);
  };

  // The stop function is used to stop the stopwatch.
  const stop = () => {
    setIsRunning(false);
    if (onStop) {
      onStop(time);
    }
  };

  // The reset function is used to reset the stopwatch.
  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  // The return statement below will render the Stopwatch component.
  return (
    <div>
      <CircularTimer duration={postedWaitTime * 60} elapsedTime={time} />
      <div className="buttons-container">
        <button className="button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="button" onClick={reset}>Reset</button>
        <button className="button" onClick={() => setShowBreakdownModal(true)}>Break down?</button>
      </div>

      <BreakdownTimerModal
        show={showBreakdownModal}
        onClose={() => setShowBreakdownModal(false)}
        breakdownTime={breakdownTime}
        setBreakdownTime={setBreakdownTime}
      />
    </div>
  );
};

export default Stopwatch;
