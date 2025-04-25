import { AppDispatch } from '../../app/store';
import { CryptoAsset } from '../../types/crypto';
import { updateAssetPrices } from './cryptoSlice';

let simulationInterval: number | null = null;

// Helper function to generate random price changes
const generateRandomChange = (min: number, max: number): number => {
  return (Math.random() * (max - min) + min) * (Math.random() > 0.5 ? 1 : -1);
};

// Simulate WebSocket updates
export const startWebSocketSimulation = () => (dispatch: AppDispatch, getState: () => any) => {
  // Clear any existing interval
  if (simulationInterval !== null) {
    clearInterval(simulationInterval);
  }

  // Set up a new interval
  simulationInterval = window.setInterval(() => {
    const { crypto } = getState();
    const assets = crypto.assets;
    
    // Update 1-3 random assets
    const numAssetsToUpdate = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numAssetsToUpdate; i++) {
      const randomIndex = Math.floor(Math.random() * assets.length);
      const asset = assets[randomIndex];
      
      // Generate random price change (between -1% and +1%)
      const priceChangePercent = generateRandomChange(0.001, 0.01);
      const oldPrice = asset.price;
      const newPrice = oldPrice * (1 + priceChangePercent);
      
      // Update 1h, 24h, 7d percentages slightly
      const hourChange = asset.percentChange1h + generateRandomChange(0.05, 0.2);
      const dayChange = asset.percentChange24h + generateRandomChange(0.1, 0.3);
      const weekChange = asset.percentChange7d + generateRandomChange(0.2, 0.5);
      
      // Update volume (between -2% and +2%)
      const volumeChange = asset.volume24h * (1 + generateRandomChange(0.005, 0.02));
      
      // Dispatch the update action
      dispatch(updateAssetPrices({
        id: asset.id,
        price: newPrice,
        priceChange: newPrice - oldPrice,
        percentChange1h: hourChange,
        percentChange24h: dayChange,
        percentChange7d: weekChange,
        volume24h: volumeChange
      }));
    }
  }, 1500); // Update every 1.5 seconds
};

export const stopWebSocketSimulation = () => () => {
  if (simulationInterval !== null) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
};