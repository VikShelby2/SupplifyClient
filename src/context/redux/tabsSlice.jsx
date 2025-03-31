// src/redux/tabsSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tabs: [],
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabs: (state, action) => {
      state.tabs = action.payload // Replace the entire tabs array
    },
  },
})

// Export the actions to use them in your components
export const { setTabs, toggleTab } = tabsSlice.actions

// Export the reducer to be included in the store
export default tabsSlice.reducer
