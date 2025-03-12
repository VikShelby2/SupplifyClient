import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the user
const initialState = {
  user: null,         // Store user information
  isAuthenticated: false, // Authentication status
  loading: false,         // Loading status
  error: null,            // Error message (if any)
};

// Create the user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Export the actions from the slice
export const { loginRequest, loginSuccess, loginFailure, logout } = userSlice.actions;

// Export the reducer to be added to the store
export default userSlice.reducer;
