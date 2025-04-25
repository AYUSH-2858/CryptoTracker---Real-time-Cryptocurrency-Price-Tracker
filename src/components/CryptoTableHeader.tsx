import React from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/themeSelectors';
import InfoIcon from './InfoIcon';

interface CryptoTableHeaderProps {
  requestSort: (key: string) => void;
  sortConfig: { key: string; direction: 'ascending' | 'descending' } | null;
}

const CryptoTableHeader: React.FC<CryptoTableHeaderProps> = ({ requestSort, sortConfig }) => {
  const { isDarkMode } = useSelector(selectTheme);

  const getSortDirection = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  const headerClass = `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
    isDarkMode ? 'text-gray-300' : 'text-gray-500'
  } cursor-pointer hover:bg-opacity-10 hover:bg-gray-400`;

  return (
    <thead className={isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}>
      <tr>
        <th scope="col" className={`${headerClass} w-16 sticky left-0 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          #
        </th>
        <th scope="col" className={`${headerClass} sticky left-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`} onClick={() => requestSort('name')}>
          Name {getSortDirection('name')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('price')}>
          Price {getSortDirection('price')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('percentChange1h')}>
          1h % {getSortDirection('percentChange1h')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('percentChange24h')}>
          24h % {getSortDirection('percentChange24h')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('percentChange7d')}>
          7d % {getSortDirection('percentChange7d')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('marketCap')}>
          Market Cap <InfoIcon tooltip="Market Cap = Price x Circulating Supply" /> {getSortDirection('marketCap')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('volume24h')}>
          Volume(24h) <InfoIcon tooltip="Volume is the amount of cryptocurrency traded in the last 24 hours" /> {getSortDirection('volume24h')}
        </th>
        <th scope="col" className={headerClass} onClick={() => requestSort('circulatingSupply')}>
          Circulating Supply <InfoIcon tooltip="The amount of cryptocurrency that is currently available in the market" /> {getSortDirection('circulatingSupply')}
        </th>
        <th scope="col" className={headerClass}>
          Last 7 Days
        </th>
      </tr>
    </thead>
  );
};

export default CryptoTableHeader;