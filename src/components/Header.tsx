import React from 'react';
import { Moon, Sun, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { sounds } from '../utils/sounds';

const Header: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { theme } = state;

  const toggleTheme = () => {
    sounds.click.play();
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <header className={`py-4 px-6 shadow-md sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Menu className="h-6 w-6 md:hidden" />
          <h1 className="text-xl font-bold">Drawing Slots</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
};

export default Header;