// CircleTimer is a component that displays a circular timer. 
// As the elapsedTime increases, the circular timer will fill up. The component will display the time in hours, minutes, and seconds.
// The closer the time gets to the posted wait time, the color of the circular timer will change from green to red.

import React, { useEffect, useState } from 'react';
import '../../Styles/CircularTimer.css';

// CircularTimer takes in the duration and elapsedTime as props.
// The duration prop is used to set the total time for the timer.
// The elapsedTime prop is used to set the time elapsed.
const CircularTimer = ({ duration, elapsedTime }) => {
  const [startLoading, setStartLoading] = useState(true);

  // The useEffect hook is used to set the startLoading state to false after 2 seconds.
  // This is used for the small animation when the user first selects an attraction.
  useEffect(() => {
    const timer = setTimeout(() => setStartLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // The variables below are used to design the circle timer.
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = startLoading ? circumference / 10 : circumference;

  const currentProgress = Math.min(elapsedTime / duration, 1);
  const offset = circumference - currentProgress * circumference;

  const startColor = { r: 66, g: 153, b: 69 };
  const endColor = { r: 255, g: 0, b: 0 };

  const color = `rgb(
    ${Math.floor(startColor.r + currentProgress * (endColor.r - startColor.r))}, 
    ${Math.floor(startColor.g + currentProgress * (endColor.g - startColor.g))}, 
    ${Math.floor(startColor.b + currentProgress * (endColor.b - startColor.b))}
  )`;

  // The formatTime function is used to format the time in hours, minutes, and seconds.
  const formatTime = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor(time / 3600);
    return `${hours > 0 ? `${hours}:` : ''}${
      minutes > 9 ? minutes : `0${minutes}`
    }:${seconds > 9 ? seconds : `0${seconds}`}`;
  };

  // The return statement below will render the CircularTimer component.
  return (
    // White circle: The background of the timer.
    <div className="timer-container">
      <svg className="circular-timer" width="250" height="250">
        <circle
          className="timer-background"
          cx="125"
          cy="125"
          r={radius}
          strokeWidth="30"
        />
        
        {/* Green Circle: The progress of the timer. */}
        <circle
          className={`timer-progress ${startLoading ? 'loading' : ''}`}
          cx="125"
          cy="125"
          r={radius}
          strokeWidth="35"
          style={{
            strokeDasharray: `${strokeDasharray} ${circumference}`,
            strokeDashoffset: offset,
            stroke: color,
          }}
        />
        {/* Small dot to finish animation. */}
        {!startLoading && (
          <circle
            // className="timer-dot"
            cx="225"
            cy="125"
            r="17"
            fill={color}
          />
        )}
      </svg>
      <div className="timer-text">{formatTime(elapsedTime)}</div>
    </div>
  );
};

export default CircularTimer;
