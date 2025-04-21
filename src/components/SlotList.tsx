import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Slot } from '../types';
import { getSlotsByCategory } from '../utils';
import { sounds } from '../utils/sounds';

const SlotList: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { slots, categories, selectedCategory, theme } = state;
  
  const [editingSlot, setEditingSlot] = React.useState<Slot | null>(null);
  const [editedName, setEditedName] = React.useState('');
  const [editedCategory, setEditedCategory] = React.useState('');
  
  const filteredSlots = getSlotsByCategory(slots, selectedCategory);

  const startEditing = (slot: Slot) => {
    sounds.click.play();
    setEditingSlot(slot);
    setEditedName(slot.name);
    setEditedCategory(slot.category);
  };

  const saveEdit = () => {
    if (editingSlot && editedName.trim()) {
      sounds.success.play();
      dispatch({
        type: 'EDIT_SLOT',
        payload: {
          ...editingSlot,
          name: editedName.trim(),
          category: editedCategory,
        },
      });
      setEditingSlot(null);
    }
  };

  const cancelEdit = () => {
    sounds.click.play();
    setEditingSlot(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const handleDelete = (id: string) => {
    sounds.click.play();
    dispatch({ type: 'DELETE_SLOT', payload: id });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.color : '#CBD5E1'; // default color
  };

  return (
    <div className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-lg font-semibold mb-3">
        {selectedCategory 
          ? `Slots in ${categories.find(c => c.id === selectedCategory)?.name || 'Selected Category'}`
          : 'All Slots'}
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({filteredSlots.length})
        </span>
      </h2>
      
      {filteredSlots.length === 0 ? (
        <div className={`p-4 rounded-lg text-center ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <p>No slots found. Add some slots to get started!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredSlots.map((slot) => (
            <div 
              key={slot.id} 
              className={`p-3 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
              } transition-colors shadow-sm border ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              {editingSlot?.id === slot.id ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`p-2 border rounded w-full ${
                      theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                    }`}
                    autoFocus
                  />
                  
                  <select
                    value={editedCategory}
                    onChange={(e) => setEditedCategory(e.target.value)}
                    className={`p-2 border rounded w-full ${
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
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className={`px-3 py-1 rounded ${
                        theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {slot.category && (
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: getCategoryColor(slot.category) }}
                      ></span>
                    )}
                    <span className="font-medium">{slot.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => startEditing(slot)}
                      className={`p-1 rounded ${
                        theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                      aria-label="Edit slot"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(slot.id)}
                      className={`p-1 rounded ${
                        theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                      }`}
                      aria-label="Delete slot"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlotList;