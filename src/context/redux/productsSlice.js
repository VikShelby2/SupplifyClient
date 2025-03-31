import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  selectedProductId: null, // Stores only the product ID
  selectedProduct: null, // Stores the full product object
  loading: false,
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSelectedProductId: (state, action) => {
      state.selectedProductId = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    editProductMeth: (state, action) => {
      const updatedProduct = action.payload
      const productIndex = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      )

      if (productIndex !== -1) {
        // Replace the old product at the found index with the updated product
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updatedProduct,
        }
      }
    },
  },
})

// Export actions
export const {
  setProducts,
  addProduct,
  setLoading,
  setError,
  editProductMeth,
  setSelectedProductId,
  setSelectedProduct,
} = productsSlice.actions

// Export the reducer
export default productsSlice.reducer
