import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
