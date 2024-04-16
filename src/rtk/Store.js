import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/auth";
import MarkersSlice from './slices/marker'; // Import the new markers slice

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    markers: MarkersSlice, // Add the markers slice to the reducer
  },
});
