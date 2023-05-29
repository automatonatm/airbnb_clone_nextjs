import { configureStore } from '@reduxjs/toolkit';
import registerReducer from "./features/registerSlice"

export const store = configureStore({
  reducer: {
    registerReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
