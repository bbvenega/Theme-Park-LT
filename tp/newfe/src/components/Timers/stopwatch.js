import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "./CircularTimer";
import "../../Styles/CircularTimer.css";

const Stopwatch = ({ onStop, postedWaitTime }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

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

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
    if (onStop) {
      onStop(time);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div>
      <CircularTimer duration={postedWaitTime * 60} elapsedTime={time} />
      <div className="buttons-container">
      <button className="button" onClick={start}>Start</button>
      <button className="button" onClick={stop}>Stop</button>
      <button className="button" onClick={reset}>Reset</button>
    </div>
    </div>
  );
};

export default Stopwatch;
