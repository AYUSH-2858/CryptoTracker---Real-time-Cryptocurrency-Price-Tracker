import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/themeSelectors';

interface InfoIconProps {
  tooltip: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isDarkMode } = useSelector(selectTheme);

  return (
    <span className="relative inline-block ml-1">
      <HelpCircle 
        size={14} 
        className={`inline-block ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} cursor-help`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className={`absolute z-20 w-48 p-2 -mt-1 text-xs rounded-md shadow-lg ${
          isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-700 border border-gray-200'
        } left-1/2 transform -translate-x-1/2 -translate-y-full`}>
          {tooltip}
          <div className={`absolute w-2 h-2 transform rotate-45 ${
            isDarkMode ? 'bg-gray-700' : 'bg-white border-r border-b border-gray-200'
          } -bottom-1 left-1/2 -ml-1`}></div>
        </div>
      )}
    </span>
  );
};

export default InfoIcon;