import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from '../features/crypto/cryptoSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    theme: themeReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;