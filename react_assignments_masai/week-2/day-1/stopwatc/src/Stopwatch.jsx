
import React, { useEffect, useRef, useState } from 'react';

const SOUND_URL = "https://www.soundjay.com/button/beep-07.mp3"; 

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [target, setTarget] = useState(10); 
  const [hasPlayed, setHasPlayed] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [running]);

  
  useEffect(() => {
    if (seconds === Number(target) && !hasPlayed) {
      if (audioRef.current) {
        audioRef.current.play();
      } else {
        console.log(" Target reached!");
      }
      setHasPlayed(true);
    }
  }, [seconds, target, hasPlayed]);

  const handleReset = () => {
    setSeconds(0);
    setRunning(false);
    setHasPlayed(false);
  };

  const handleTargetChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val > 0) {
      setTarget(val);
      setHasPlayed(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">⏱ React Stopwatch</h1>

        <p className="text-4xl font-mono mb-4">{seconds}s</p>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setRunning(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={running}
          >
            Start
          </button>
          <button
            onClick={() => setRunning(false)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            disabled={!running}
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">
            Target Time (seconds)
          </label>
          <input
            type="number"
            value={target}
            onChange={handleTargetChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        
        <audio ref={audioRef} src={SOUND_URL} preload="auto" />
      </div>
    </div>
  );
};

export default Stopwatch;
