import React from 'react';
import { useSelector } from 'react-redux';
import { Coins } from 'lucide-react';
import { selectTheme } from '../features/theme/themeSelectors';

const Header: React.FC = () => {
  const { isDarkMode } = useSelector(selectTheme);

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Coins size={36} className="text-blue-600 mr-3" />
          <div>
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              CryptoTracker
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Real-time cryptocurrency price tracking
            </p>
          </div>
        </div>
        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </header>
  );
};

export default Header;