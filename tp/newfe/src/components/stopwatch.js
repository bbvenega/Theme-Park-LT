import React, {useState, useEffect, useRef} from 'react';

const Stopwatch = ( {onStop}) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if(isRunning) {
            timerRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(timerRef.current);
        }

        return () => 
            clearInterval(timerRef.current);
        }, [isRunning]);

        const formatTime = (time) => {
            const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
            const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
            const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
            const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
            return `${hours}:${minutes}:${seconds}:${getMilliseconds}`;
          };

          const start = () => {
            setIsRunning(true);
          }

            const stop = () => {
                setIsRunning(false);
                    if(onStop) {
                        onStop(time);
                    }
            }

            const reset = () => {
                clearInterval(timerRef.current);
                setIsRunning(false);
                setTime(0);
            };

            return (
                <div>
                    <h1>Stopwatch</h1>
                    <p>{formatTime(time)}</p>
                    <button onClick={start}>Start</button>
                    <button onClick={stop}>Stop</button>
                    <button onClick={reset}>Reset</button>
                </div>
            );
        };

        export default Stopwatch;