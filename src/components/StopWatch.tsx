"use client";
import React from "react";

const StopWatch = () => {
  const [isRunning, setIsRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef<number>(0);
  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
  const handlePlayClick = () => {
    setIsRunning(true);
    timerRef.current = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const handleStopClick = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };
  return (
    <div>
      <div>
        <h1 className="text-5xl">{formatTime(time)}</h1>
        {isRunning ? (
          <button
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            onClick={handleStopClick}
          >
            Stop
          </button>
        ) : (
          <button
            className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            onClick={handlePlayClick}
          >
            Play
          </button>
        )}
      </div>
    </div>
  );
};

export default StopWatch;
