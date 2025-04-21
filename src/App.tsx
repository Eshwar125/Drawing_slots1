import React from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Header from './components/Header';
import CategorySelector from './components/CategorySelector';
import SlotForm from './components/SlotForm';
import SlotList from './components/SlotList';
import DrawingBoard from './components/DrawingBoard';

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

const AppContent: React.FC = () => {
  const { state } = React.useContext(AppContext);
  const { theme } = state;

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:px-6 lg:max-w-5xl">
        <div className="md:flex md:space-x-8">
          <div className="md:w-2/3">
            <CategorySelector />
            <SlotForm />
            <SlotList />
          </div>
          
          <div className="md:w-1/3 mt-8 md:mt-0">
            <DrawingBoard />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;