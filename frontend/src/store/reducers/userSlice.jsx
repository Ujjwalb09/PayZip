import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.info = action.payload;
    },
    removeUser: (state) => {
      state.info = null;
    },
  },
});

export const { loadUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
