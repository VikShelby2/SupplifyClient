// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import tabsReducer from './tabsSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    tabs: tabsReducer,
  },
});

export default store;
