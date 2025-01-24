import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Components/Screens/Home/appReducer'; // Adjust the path to your slice

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});
