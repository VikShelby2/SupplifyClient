// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import userReducer from './userSlice'
import tabsReducer from './tabsSlice'
import loadingReducer from './loadingSlice'
import providerReducer from './providersSlie'
const store = configureStore({
  reducer: {
    products: productsReducer,
    tabs: tabsReducer,
    provider: providerReducer,
    loading: loadingReducer,
    user: userReducer,
  },
})

export default store
