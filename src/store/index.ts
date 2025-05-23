import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './cryptoSlice';

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 