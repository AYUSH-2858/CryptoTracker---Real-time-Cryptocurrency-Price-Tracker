import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Star } from 'lucide-react';
import { CryptoAsset } from '../types/crypto';
import { toggleStarAsset } from '../features/crypto/cryptoSlice';
import { selectTheme } from '../features/theme/themeSelectors';
import { formatCurrency, formatNumber, formatPercent } from '../utils/formatters';
import classNames from 'classnames';

interface CryptoTableRowProps {
  asset: CryptoAsset;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ asset }) => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(selectTheme);
  const [priceHighlighted, setPriceHighlighted] = useState(false);
  const [previousPrice, setPreviousPrice] = useState(asset.price);

  useEffect(() => {
    // Check if price has changed
    if (previousPrice !== asset.price) {
      setPriceHighlighted(true);
      setPreviousPrice(asset.price);
      
      // Remove highlight after animation completes
      const timer = setTimeout(() => {
        setPriceHighlighted(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [asset.price, previousPrice]);

  const handleToggleStar = () => {
    dispatch(toggleStarAsset(asset.id));
  };

  const getPriceChangeColor = (value: number) => {
    if (value > 0) return 'text-green-500';
    if (value < 0) return 'text-red-500';
    return isDarkMode ? 'text-gray-400' : 'text-gray-500';
  };

  const getPriceHighlightClass = () => {
    if (!priceHighlighted) return '';
    return asset.priceChange > 0 
      ? 'animate-price-up' 
      : asset.priceChange < 0 
        ? 'animate-price-down' 
        : '';
  };

  return (
    <tr className={`${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
      <td className={`px-6 py-4 whitespace-nowrap text-sm sticky left-0 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center">
          <button 
            onClick={handleToggleStar}
            className={`mr-2 focus:outline-none ${asset.starred ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'} hover:text-yellow-400`}
            aria-label={asset.starred ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={16} fill={asset.starred ? 'currentColor' : 'none'} />
          </button>
          <span>{asset.rank}</span>
        </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap sticky left-16 z-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center">
          <img src={asset.logo} alt={`${asset.name} logo`} className="w-6 h-6 mr-2" />
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className={`px-6 py-4 whitespace-nowrap font-medium ${getPriceHighlightClass()}`}>
        {formatCurrency(asset.price)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap ${getPriceChangeColor(asset.percentChange1h)}`}>
        {formatPercent(asset.percentChange1h)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap ${getPriceChangeColor(asset.percentChange24h)}`}>
        {formatPercent(asset.percentChange24h)}
      </td>
      <td className={`px-6 py-4 whitespace-nowrap ${getPriceChangeColor(asset.percentChange7d)}`}>
        {formatPercent(asset.percentChange7d)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(asset.marketCap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatCurrency(asset.volume24h)}
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {formatNumber(asset.volume24h / asset.price)} {asset.symbol}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {formatNumber(asset.circulatingSupply)} {asset.symbol}
        {asset.maxSupply && (
          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {Math.round((asset.circulatingSupply / asset.maxSupply) * 100)}% of max supply
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <img src={asset.chartData} alt={`${asset.name} 7 day chart`} className="h-16" />
      </td>
    </tr>
  );
};

export default CryptoTableRow;