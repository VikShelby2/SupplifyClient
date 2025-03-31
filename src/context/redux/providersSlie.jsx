import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toasterPoistion: '',
}

const providersSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setPositionOffToast: (state, action) => {
      state.toasterPoistion = action.payload
    },
  },
})

// Export actions
export const { setPositionOffToast } = providersSlice.actions

// Export the reducer
export default providersSlice.reducer
