// Format a number as currency (USD)
export const formatCurrency = (value: number): string => {
  // For very large numbers like market cap, use abbreviations
  if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(2)}K`;
  }
  
  // For normal prices
  if (value > 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
  
  // For very small prices (e.g., $0.0000123)
  const significantDigits = 6;
  const decimalPlaces = Math.max(
    2,
    -Math.floor(Math.log10(Math.abs(value))) + (significantDigits - 1)
  );
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Math.min(decimalPlaces, 8),
    maximumFractionDigits: Math.min(decimalPlaces, 8)
  }).format(value);
};

// Format a percentage value
export const formatPercent = (value: number): string => {
  const formattedValue = value.toFixed(2);
  const sign = value > 0 ? '+' : '';
  return `${sign}${formattedValue}%`;
};

// Format a large number with appropriate abbreviations
export const formatNumber = (value: number): string => {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  
  return new Intl.NumberFormat('en-US').format(Math.round(value * 100) / 100);
};