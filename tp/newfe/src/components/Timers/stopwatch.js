import React, { useState, useEffect, useRef } from "react";
import CircularTimer from "./CircularTimer";
import BreakdownTimerModal from "../Modals/BreakdownTimerModal";
import "../../Styles/CircularTimer.css";

const Stopwatch = ({ onStop, postedWaitTime, onBreakdownTimeChange }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [breakdownTime, setBreakdownTime] = useState(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const breakdownStartTimeRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if (isRunning) {
          const now = Date.now();
          const elapsed = Math.floor((now - startTimeRef.current) / 1000);
          setTime(elapsed);
        }
        const savedBreakdownStartTime = localStorage.getItem("breakdownStartTime");
        if (savedBreakdownStartTime) {
          const now = Date.now();
          breakdownStartTimeRef.current = parseInt(savedBreakdownStartTime, 10);
          const breakdownElapsed = Math.floor((now - breakdownStartTimeRef.current) / 1000);
          setBreakdownTime(breakdownElapsed);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning]);

  useEffect(() => {
    const savedStartTime = localStorage.getItem("stopwatchStartTime");
    const savedBreakdownStartTime = localStorage.getItem("breakdownStartTime");

    if (savedStartTime) {
      const now = Date.now();
      startTimeRef.current = parseInt(savedStartTime, 10);
      const elapsed = Math.floor((now - startTimeRef.current) / 1000);
      setTime(elapsed);
      setIsRunning(true);
    }

    if (savedBreakdownStartTime) {
      const now = Date.now();
      breakdownStartTimeRef.current = parseInt(savedBreakdownStartTime, 10);
      const breakdownElapsed = Math.floor((now - breakdownStartTimeRef.current) / 1000);
      setBreakdownTime(breakdownElapsed);
    }

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const updateTimer = () => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTimeRef.current) / 1000);
        setTime(elapsed);

        if (breakdownStartTimeRef.current) {
          const breakdownElapsed = Math.floor((now - breakdownStartTimeRef.current) / 1000);
          setBreakdownTime(breakdownElapsed);
        }
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [isRunning]);

  useEffect(() => {
    onBreakdownTimeChange(breakdownTime);
  }, [breakdownTime, onBreakdownTimeChange]);

  const start = () => {
    const now = Date.now();
    startTimeRef.current = now;
    setIsRunning(true);
    localStorage.setItem("stopwatchStartTime", now.toString());
  };

  const stop = () => {
    setIsRunning(false);
    localStorage.removeItem("stopwatchStartTime");
    if (onStop) {
      onStop(time);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.removeItem("stopwatchStartTime");
    localStorage.removeItem("breakdownStartTime");
    startTimeRef.current = null;
    breakdownStartTimeRef.current = null;
  };

  const handleBreakdownStart = () => {
    const now = Date.now();
    breakdownStartTimeRef.current = now;
    localStorage.setItem("breakdownStartTime", now.toString());
    setShowBreakdownModal(true);
  };

  return (
    <div>
      <CircularTimer duration={postedWaitTime * 60} elapsedTime={time} />
      <div className="buttons-container">
        <button className="button" onClick={start}>
          Start
        </button>
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
        <button className="button" onClick={handleBreakdownStart}>
          🚧
        </button>
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
