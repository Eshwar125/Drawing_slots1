import React from 'react';
import { PlusCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Category } from '../types';
import { getRandomColor } from '../utils';
import { sounds } from '../utils/sounds';

const CategorySelector: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { categories, selectedCategory, theme } = state;
  const [newCategoryName, setNewCategoryName] = React.useState('');
  const [isAdding, setIsAdding] = React.useState(false);

  const handleCategorySelect = (categoryId: string | null) => {
    sounds.click.play();
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: categoryId });
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      sounds.success.play();
      dispatch({
        type: 'ADD_CATEGORY',
        payload: {
          name: newCategoryName.trim(),
          color: getRandomColor(),
        },
      });
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCategory();
    }
  };

  return (
    <div className={`mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Categories</h2>
        <button
          onClick={() => {
            sounds.click.play();
            setIsAdding(!isAdding);
          }}
          className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <PlusCircle className="w-4 h-4 mr-1" />
          Add Category
        </button>
      </div>

      {isAdding && (
        <div className="flex mb-3">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Category name"
            className={`flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-300'
            }`}
            autoFocus
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategorySelect(null)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === null
              ? 'bg-indigo-600 text-white'
              : theme === 'dark'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          All Slots
        </button>
        
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors flex items-center ${
              selectedCategory === category.id
                ? 'text-white'
                : theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            style={{
              backgroundColor: selectedCategory === category.id ? category.color : '',
            }}
          >
            <span
              className="w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: category.color }}
            ></span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;