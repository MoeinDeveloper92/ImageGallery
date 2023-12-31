import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice"
import imageReducer from "../features/image/imageSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    image: imageReducer
  },
  devTools: true
});
