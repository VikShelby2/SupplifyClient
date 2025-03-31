import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    stopLoading: (state) => {
      state.isLoading = false
    },
  },
})

export const { startLoading, stopLoading } = loadingSlice.actions

export const selectLoading = (state) => state.loading.isLoading

export default loadingSlice.reducer
