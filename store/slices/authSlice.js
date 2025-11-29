import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,        // logged-in user info
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    setAvatar: (state, action) =>{ 
       if(state.user){
        state.user.profilePic = action.payload
       }
    }
  },
});

export const { setLoading, setError, setUser, clearUser, setAvatar } = authSlice.actions;
export default authSlice.reducer;
