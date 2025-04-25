import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoonStar, Sun } from 'lucide-react';
import CryptoTable from './components/CryptoTable';
import { startWebSocketSimulation, stopWebSocketSimulation } from './features/crypto/cryptoActions';
import { toggleTheme } from './features/theme/themeSlice';
import { selectTheme } from './features/theme/themeSelectors';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(selectTheme);
  
  useEffect(() => {
    // Start the simulation when the component mounts
    dispatch(startWebSocketSimulation());
    
    // Clean up the simulation when the component unmounts
    return () => {
      dispatch(stopWebSocketSimulation());
    };
  }, [dispatch]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex justify-end mb-4">
          <button
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
            onClick={handleThemeToggle}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={20} /> : <MoonStar size={20} />}
          </button>
        </div>
        
        <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <CryptoTable />
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

export default App;