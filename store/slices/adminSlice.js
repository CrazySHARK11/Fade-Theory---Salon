import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
        state.admin = action.payload;
        state.isAuthenticated = true;
    },
    adminLogout: (state) => {
        state.admin = null,
        state.isAuthenticated = false;
    } 
  }
});

export const { setAdmin, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;