import { configureStore } from '@reduxjs/toolkit';
import registerReducer from "./features/registerSlice"
import loginReducer from './features/loginSlice';

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
