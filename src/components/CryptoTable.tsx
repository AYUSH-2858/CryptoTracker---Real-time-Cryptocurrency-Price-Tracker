import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCryptoAssets, selectCryptoLoading } from '../features/crypto/cryptoSelectors';
import { selectTheme } from '../features/theme/themeSelectors';
import CryptoTableHeader from './CryptoTableHeader';
import CryptoTableRow from './CryptoTableRow';
import InfoIcon from './InfoIcon';

const CryptoTable: React.FC = () => {
  const assets = useSelector(selectCryptoAssets);
  const loading = useSelector(selectCryptoLoading);
  const { isDarkMode } = useSelector(selectTheme);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

  // Sorting function
  const sortedAssets = React.useMemo(() => {
    const sortableAssets = [...assets];
    if (sortConfig !== null) {
      sortableAssets.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableAssets;
  }, [assets, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <CryptoTableHeader requestSort={requestSort} sortConfig={sortConfig} />
        <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          {loading ? (
            <tr>
              <td colSpan={12} className="text-center py-4">Loading...</td>
            </tr>
          ) : (
            sortedAssets.map((asset) => (
              <CryptoTableRow key={asset.id} asset={asset} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;