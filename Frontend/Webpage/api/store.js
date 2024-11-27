import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../pages/slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
