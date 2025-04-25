import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CryptoAsset } from '../../types/crypto';

export const selectCryptoAssets = (state: RootState): CryptoAsset[] => state.crypto.assets;

export const selectCryptoLoading = (state: RootState): boolean => state.crypto.loading;

export const selectCryptoError = (state: RootState): string | null => state.crypto.error;

export const selectStarredAssets = createSelector(
  [selectCryptoAssets],
  (assets) => assets.filter(asset => asset.starred)
);