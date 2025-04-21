import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { sounds } from '../utils/sounds';

const SlotForm: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { categories, selectedCategory, theme } = state;
  
  const [slotName, setSlotName] = useState('');
  const [slotCategory, setSlotCategory] = useState(selectedCategory || '');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slotName.trim()) {
      sounds.success.play();
      dispatch({
        type: 'ADD_SLOT',
        payload: {
          name: slotName.trim(),
          category: slotCategory,
        },
      });
      setSlotName('');
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    sounds.click.play();
    setIsExpanded(!isExpanded);
    if (!isExpanded && selectedCategory) {
      setSlotCategory(selectedCategory);
    }
  };

  return (
    <div className={`mt-6 mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      {!isExpanded ? (
        <button
          onClick={toggleExpand}
          className={`w-full py-3 px-4 flex items-center justify-center rounded-lg border border-dashed ${
            theme === 'dark'
              ? 'border-gray-600 hover:border-gray-500 bg-gray-800 hover:bg-gray-700'
              : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          } transition-colors`}
        >
          <PlusCircle className="w-5 h-5 mr-2 text-indigo-600" />
          <span>Add New Slot</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className={`p-4 rounded-lg shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <h3 className="text-lg font-medium mb-3">Add New Slot</h3>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="slotName" className="block text-sm font-medium mb-1">
                Slot Name
              </label>
              <input
                id="slotName"
                type="text"
                value={slotName}
                onChange={(e) => setSlotName(e.target.value)}
                placeholder="Enter slot name"
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                autoFocus
              />
            </div>
            
            <div>
              <label htmlFor="slotCategory" className="block text-sm font-medium mb-1">
                Category (optional)
              </label>
              <select
                id="slotCategory"
                value={slotCategory}
                onChange={(e) => setSlotCategory(e.target.value)}
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              >
                <option value="">No Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Slot
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click.play();
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded ${
                theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SlotForm;