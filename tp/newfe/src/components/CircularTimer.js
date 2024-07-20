import React, {useEffect, useState } from 'react';
import '../Styles/CircularTimer.css';

const CircularTimer = ({duration, elapsedTime }) => {
    const radius = 100;
    const circumference = 2 * Math.PI * radius;



    const currentProgress = Math.min((elapsedTime / duration), 1);
    const offset = circumference - (currentProgress * circumference);

    const startColor = {r: 0, g: 255, b: 0};
    const endColor = {r: 255, g: 0, b: 0};

    const color = `rgb(
        ${Math.floor(startColor.r + currentProgress * (endColor.r - startColor.r))}, 
        ${Math.floor(startColor.g + currentProgress * (endColor.g - startColor.g))}, 
        ${Math.floor(startColor.b + currentProgress * (endColor.b - startColor.b))}
      )`;


      const formatTime = (time) => {
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor((time / 60) % 60);
        const hours = Math.floor(time / 3600);
        return `${hours > 0 ? `${hours}:` : ''}${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
    };

    return (
        <div className="timer-container">
            <svg className="circular-timer" width="250" height="250">
                <circle
                className="timer-background"
                cx="125"
                cy="125"
                r={radius}
                strokeWidth="30"
                />
                <circle
                className="timer-progress"
                cx="125"
                cy="125"
                r={radius}
                strokeWidth="35"
                style={{ 
                    strokeDasharray: circumference, 
                    strokeDashoffset: offset,
                    stroke: color, 
                }}
                />
            </svg>
            <div className="timer-text">
                {formatTime(elapsedTime)}
            </div>
        </div>
    );
};

export default CircularTimer;
