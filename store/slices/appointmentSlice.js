import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setAppointments, setLoading, setError } = appointmentSlice.actions;
export default appointmentSlice.reducer;
