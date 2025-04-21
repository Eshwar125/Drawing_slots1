import React, { useState, useEffect } from 'react';
import { Shuffle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getRandomSlot, getSlotsByCategory } from '../utils';
import DrawingResult from './DrawingResult';
import { sounds } from '../utils/sounds';

const DrawingBoard: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { slots, selectedCategory, theme, isDrawing } = state;
  
  const [animation, setAnimation] = useState<NodeJS.Timeout | null>(null);
  const [currentSlotIndex, setCurrentSlotIndex] = useState(0);
  
  const filteredSlots = getSlotsByCategory(slots, selectedCategory);

  const startDrawing = () => {
    if (filteredSlots.length === 0 || isDrawing) return;
    
    sounds.draw.play();
    dispatch({ type: 'SET_IS_DRAWING', payload: true });
    dispatch({ type: 'SET_DRAWN_SLOT', payload: null });
    
    // Animate through slots rapidly
    const interval = setInterval(() => {
      setCurrentSlotIndex((prev) => (prev + 1) % filteredSlots.length);
    }, 100);
    
    setAnimation(interval);
    
    // Stop animation after a random time between 2-4 seconds
    const duration = 2000 + Math.random() * 2000;
    setTimeout(() => {
      if (interval) clearInterval(interval);
      setAnimation(null);
      
      const result = getRandomSlot(filteredSlots);
      dispatch({ type: 'SET_DRAWN_SLOT', payload: result });
      sounds.success.play();
      
      // Reset drawing state after showing the result
      setTimeout(() => {
        dispatch({ type: 'SET_IS_DRAWING', payload: false });
      }, 3000);
    }, duration);
  };

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (animation) clearInterval(animation);
    };
  }, [animation]);

  return (
    <div className={`py-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className={`p-6 rounded-lg shadow-sm text-center ${
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className="text-xl font-bold mb-4">Drawing Board</h2>
        
        {filteredSlots.length === 0 ? (
          <div className="py-8">
            <p>Add some slots to start drawing!</p>
          </div>
        ) : (
          <>
            <div className="min-h-32 mb-6 flex items-center justify-center">
              {animation ? (
                <div className={`text-2xl font-bold p-4 rounded-lg animate-pulse ${
                  theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {filteredSlots[currentSlotIndex]?.name}
                </div>
              ) : (
                <DrawingResult />
              )}
            </div>
            
            <button
              onClick={startDrawing}
              disabled={isDrawing || filteredSlots.length === 0}
              className={`px-6 py-3 rounded-full font-semibold flex items-center justify-center mx-auto ${
                isDrawing || filteredSlots.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              } transition-colors`}
            >
              <Shuffle className="w-5 h-5 mr-2" />
              {isDrawing ? 'Drawing...' : 'Draw a Slot'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DrawingBoard;