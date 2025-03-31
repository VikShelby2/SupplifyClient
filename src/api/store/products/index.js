import {
  setLoading,
  setError,
  addProduct,
  setProducts,
  editProductMeth,
} from '../../../context/redux/productsSlice'
import { setTabs } from '../../../context/redux/tabsSlice'

export const createProduct =
  (input, setProductId, setIsSaved) => async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setError(null))

    // Create a FormData object to append all fields and photos
    const formData = new FormData()

    // Append all input fields to the FormData object
    for (const key in input) {
      formData.append(
        key,
        typeof input[key] === 'object' ? JSON.stringify(input[key]) : input[key]
      )
    }

    // Handle photo uploads (if any)
    if (input.photos && input.photos.length > 0) {
      input.photos.forEach((photo) => {
        formData.append('photos', photo)
      })
    }

    try {
      // Make the fetch call to the backend API
      const response = await fetch('http://localhost:8080/api/product/add', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        throw new Error('Failed to create the product')
      }
      const newProduct = await response.json()
      setProductId(newProduct._id)
      setIsSaved(true)
      dispatch(addProduct(newProduct))
      dispatch(setLoading(false))
    } catch (error) {
      // Handle error and stop loading
      dispatch(setError(error.message))
      dispatch(setLoading(false))
    }
  }
export const listProducts = (store) => async (dispatch) => {
  dispatch(setLoading(true))
  console.log('start')
  const productReq = fetch('http://localhost:8080/api/product/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ storeId: store._id }),
  })
  const tabsReq = new Promise((resolve, reject) => {
    dispatch(handleListTabs(store._id, 'product-main-table', resolve, reject))
  })

  try {
    const [productResponse, tabsResponse] = await Promise.all([
      productReq,
      tabsReq,
    ])
    if (!productResponse.ok) {
      throw new Error('Failed to fetch products')
    }

    const productData = await productResponse.json()
    if (productData) {
      console.log('succes')
      dispatch(setProducts(productData))
    }

    dispatch(setLoading(false))
  } catch (error) {
    // Handle error and stop loading
    dispatch(setError(error.message))
    dispatch(setLoading(false))
  }
}
export const editProduct =
  (input, setProductId, productId) => async (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    const formData = new FormData()

    for (const key in input) {
      formData.append(
        key,
        typeof input[key] === 'object' ? JSON.stringify(input[key]) : input[key]
      )
    }

    if (input.photos && input.photos.length > 0) {
      input.photos.forEach((photo) => {
        formData.append('photos', photo)
      })
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/edit/${productId}`,
        {
          method: 'PUT',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create the product')
      }
      const newProduct = await response.json()
      setProductId(newProduct._id)
      dispatch(editProductMeth(newProduct))
      dispatch(setLoading(false))
    } catch (error) {
      // Handle error and stop loading
      dispatch(setError(error.message))
      dispatch(setLoading(false))
    }
  }
export const handleAddTag = async (userId, query, tags, setOptions) => {
  const newTag = { name: query }
  try {
    const response = await fetch(`http://localhost:8080/api/product/tags/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, tag: newTag.name }),
    })
    if (response.ok) {
      const addedTag = await response.json()
      console.log(tags)
      setOptions([...tags, addedTag.tag])
    } else {
      console.error('Failed to add tag')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
export const handleListTags = async (userId, setTags) => {
  try {
    const res = await fetch('http://localhost:8080/api/product/tags/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
    if (res.ok) {
      const Tags = await res.json()
      const opt = Tags.tags
      setTags(opt)
      console.log(opt)
    } else {
      console.error('Failed to add tag')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
export const handleListCollections = async (storeId, setCollections) => {
  try {
    const res = await fetch(
      'http://localhost:8080/api/product/collection/list',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId }),
      }
    )

    if (res.ok) {
      const Cols = await res.json()

      setCollections(Cols.collections.collections)
      console.log('ASSsSasSasSs' + Cols.collections[0].name)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
export const handleAddCollection = async (storeId, query, tags, setOptions) => {
  const name = { name: query }
  try {
    const response = await fetch(
      `http://localhost:8080/api/product/collection/add`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeId, name }),
      }
    )
    if (response.ok) {
      const addedTag = await response.json()
      console.log(tags.collections)
      setOptions([...tags, addedTag.collections])
    } else {
      console.error('Failed to add collection')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

export const handleAddTab =
  (name, storeId, table, setOpen) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/tabs/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, storeId, table }),
        }
      )
      if (response.ok) {
        const addedTabs = await response.json()
        if (addedTabs) {
          dispatch(setTabs(addedTabs))

          setOpen(false)
          console.log(addedTabs.tabs)
        } else {
        }
      } else {
      }
    } catch (error) {
      console.log(error)
    }
  }
export const handleEditTab = async (tabId, newName) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/product/tabs/edit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tabId, newName }),
      }
    )
  } catch (error) {
    console.log(error)
  }
}
export const handleListTabs =
  (storeId, type, resolve, reject) => async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/product/tabs/list`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ storeId, type }),
        }
      )
      if (response.status === 200) {
        const addedTabs = await response.json()
        if (addedTabs) {
          dispatch(setTabs(addedTabs))
          resolve(addedTabs)
          console.log(`Tab listed successfully ${addedTabs}`)
          console.log(addedTabs)
        } else {
        }
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  }
