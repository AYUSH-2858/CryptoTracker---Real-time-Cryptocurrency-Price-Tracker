import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState } from '../../types/crypto';
import { initialCryptoData } from '../../data/cryptoData';

const initialState: CryptoState = {
  assets: initialCryptoData,
  loading: false,
  error: null,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateAssetPrices: (state, action: PayloadAction<{ id: string; price: number; percentChange1h: number; percentChange24h: number; percentChange7d: number; volume24h: number; priceChange: number }>) => {
      const { id, ...updates } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      
      if (asset) {
        Object.assign(asset, updates);
      }
    },
    toggleStarAsset: (state, action: PayloadAction<string>) => {
      const asset = state.assets.find(a => a.id === action.payload);
      if (asset) {
        asset.starred = !asset.starred;
      }
    }
  },
});

export const { updateAssetPrices, toggleStarAsset } = cryptoSlice.actions;
export default cryptoSlice.reducer;