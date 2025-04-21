import React, { useEffect, useState } from 'react';
import confetti from '../utils/confetti';
import { useAppContext } from '../context/AppContext';

const DrawingResult: React.FC = () => {
  const { state } = useAppContext();
  const { drawnSlot, theme } = state;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (drawnSlot) {
      setShowConfetti(true);
      confetti();
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [drawnSlot]);

  if (!drawnSlot) {
    return (
      <div className={`p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <p className="text-lg">Press the button to draw a slot</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none" id="confetti-canvas"></div>
      )}
      <div className={`p-6 rounded-lg border-2 ${
        theme === 'dark' 
          ? 'bg-gray-700 border-indigo-500' 
          : 'bg-white border-indigo-500'
      } transform transition-all duration-300 scale-105 shadow-lg`}>
        <h3 className="text-lg text-indigo-500 font-semibold mb-1">Result</h3>
        <p className="text-2xl font-bold">{drawnSlot.name}</p>
      </div>
    </div>
  );
};

export default DrawingResult;