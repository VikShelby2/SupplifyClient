import React, { useEffect, useState } from 'react'
import { storeAtom } from '../../../../../context/atoms/storeAtom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Intro from './components/intro-form'
import { useRecoilValue } from 'recoil'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../../../components/ui/basics/button'
import Status from './components/status-form'
import Header from './components/header'
import Pricing from './components/pricing-form'
import Inventory from './components/inventory-form'
import ShippingForm from './components/shpping-form'
import Details from './components/details-form'
import VariantsForm from './components/VariantsForm'
import PublishingForm from './components/publishing-form'
import ChannelsModal from '../../../../../components/admin/Modals/addProductModals/Publishing/sales'
import ProductOrganizationForm from './components/org-form'
import { createProduct, editProduct } from '../../../../../api/store/products'
const AddProduct = () => {
  const store = useRecoilValue(storeAtom)
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])

  const [checkedOne, setCheckedOne] = useState(true)
  const [checkedTow, setCheckedTow] = useState(true)
  const [checkedThree, setCheckedThree] = useState(true)
  const [enabled, setEnabled] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [input, setInput] = useState({
    storeId: store._id,
    title: '',
    description: '',
    price: '',
    comparePrice: '',
    costPerItem: '',
    collections: '',
    photos: '',
    tags: '',
    condition: '',
    material: '',
    ageRange: '',
    gander: '',
    stock: 0,
    type: '',
    vendor: '',
    category: '',
    status: 'active',
    sku: '',
    barcode: '',
    variants: [],
    profit: '',
    margin: '',
    publishing: {
      channels: [
        { name: 'My Store', isActive: true },
        { name: 'POS', isActive: true },
      ],
      markets: [
        { name: 'Store Location', isActive: true },
        { name: 'International', isActive: true },
      ],
    },
  })
  const [titleValid, setTitleValid] = useState(false)
  const updateMyStore = (newValue) => {
    setInput((prev) =>
      prev.publishing.map((item) =>
        item.name === 'Sales Channel'
          ? {
              ...item,
              channels: item.channels.map((channel) =>
                channel.myStore !== undefined
                  ? { ...channel, myStore: newValue }
                  : channel
              ),
            }
          : item
      )
    )
  }
  const updatePos = (newValue) => {
    setInput((prev) =>
      prev.publishing.map((item) =>
        item.name === 'Sales Channel'
          ? {
              ...item,
              channels: item.channels.map((channel) =>
                channel.pos !== undefined
                  ? { ...channel, pos: newValue }
                  : channel
              ),
            }
          : item
      )
    )
  }

  useEffect(() => {
    setTitleValid(input.title.trim() !== '')
  }, [input.title])
  const [isCheckedRadioTow, setIsCheckedRadioTow] = useState(false)
  const [selected, setSelected] = useState([])
  const [selectedCollection, setSelectedCollection] = useState([])
  const [showInventory, setShowInventory] = useState(false)
  const [toggleChannelMyStore, setToggleChannelMyStore] = useState(false)

  const [text, setText] = useState('')
  const [variants, setVariants] = useState({
    variants: [],
  })
  const [addedVariants, setAddedVariants] = useState([])
  const [openTax, setOpenTax] = useState(false)
  const [selectedTag, setSelectedTag] = useState([])
  const [productId, setProductId] = useState('')
  const [productSaved, setProductSaved] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [isCheckedRadio, setIsCheckedRadio] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState('')
  const [selectedAgeRange, setSelectedAgeRange] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const dispatch = useDispatch()
  const handleToggleRadio = (value) => {
    setIsCheckedRadio(!isCheckedRadio)
    handleToggleRadioDetail(value)
    setIsCheckedRadioTow(false)
  }
  const [count, setCount] = useState(0)
  useEffect(() => {}, [toggleChannelMyStore])
  // Function to handle decrementing the count
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  // Function to handle incrementing the count
  const increment = () => {
    setCount(count + 1)
  }
  const handleToggleRadioTow = (value) => {
    handleToggleRadioDetail(value)
    setIsCheckedRadioTow(!isCheckedRadioTow)
    setIsCheckedRadio(false)
  }
  const [isCheckedRadioStateDetail, setIsCheckedRadioStateDetail] =
    useState('new') // Initialize with default value

  const handleToggleRadioDetail = (value) => {
    setIsCheckedRadio(value) // Update isCheckedRadio state based on the selected radio value
  }
  const handleSubmit = () => {
    dispatch(createProduct(input, setProductId, setIsSaved))
  }
  const handelEditProduct = async () => {
    dispatch(editProduct(input, setProductId, productId))
  }
  const isSelectedProductId = useSelector(
    (state) => state.products.isSelectedProductId
  )
  const stateSelectedProduct = useSelector(
    (state) => state.products.selectedProduct
  )
  useEffect(() => {
    if (isSelectedProductId !== null && stateSelectedProduct !== null) {
      const { _id, ...productWithoutId } = stateSelectedProduct
      setIsSaved(true)
      setProductId(_id)
      setInput(productWithoutId)
    }
  }, [isSelectedProductId])

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isSaved) {
        // Custom message might not be displayed in all browsers
        const message =
          'You have unsaved changes. Are you sure you want to leave?'
        event.returnValue = message
        return message
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isSaved])

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      condition: isCheckedRadioStateDetail,
    }))
  }, [isCheckedRadioStateDetail])
  const handleStatusChange = (value) => {
    setInput((prevInput) => ({
      ...prevInput,
      status: value,
    }))
  }
  const isProductIdSet = productId !== ''

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }))
  }
  const handleVariantChange = (newVariants) => {
    setVariants((prevInput) => ({
      ...prevInput,
      variants: newVariants,
    }))
  }

  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      description: text,
    }))
  }, [text])

  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      salesOnline: checkedOne,
    }))
  }, [checkedOne])
  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      stock: count,
    }))
  }, [count])

  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      variants: addedVariants,
    }))
  }, [addedVariants])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      photos: files,
    }))
  }, [files])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      category: selected,
    }))
  }, [selected])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      tags: selectedTag,
    }))
  }, [selectedTag])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      collections: selectedCollection,
    }))
  }, [selectedCollection])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      material: selectedMaterial,
    }))
  }, [selectedMaterial])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      ageRange: selectedAgeRange,
    }))
  }, [selectedAgeRange])
  useEffect(() => {
    // Update input.description when text changes
    setInput((prevState) => ({
      ...prevState,
      gender: selectedGender,
    }))
  }, [selectedGender])

  const [openChannelsModal, setOpenChannelsModal] = useState(false)
  useEffect(() => {
    console.log(input)
  }, [input])
  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`flex min-h-screen w-full flex-col  `}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="flex flex-col sm:gap-4  mx-auto min-w-[1100px] max-w-[1100px] "
          style={{
            fontFamily:
              'sora, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          }}
        >
          <main className="grid flex-1 items-start gap-4   md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
              <Header
                store={store}
                productSaved={isSaved}
                titleFilled={titleValid}
                isProductIdSet={isProductIdSet}
                handelEditProduct={handelEditProduct}
                handleSubmit={handleSubmit}
              />
              <div className="grid gap-1 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-[1rem]">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Intro
                    input={input}
                    files={files}
                    setFiles={setFiles}
                    setInput={setInput}
                    previews={previews}
                    setPreviews={setPreviews}
                    Media={true}
                  />
                  <Pricing
                    input={input}
                    handleChange={handleChange}
                    enabled={enabled}
                    setEnabled={setEnabled}
                    openTax={openTax}
                    setOpenTax={setOpenTax}
                  />
                  <Inventory
                    increment={increment}
                    count={count}
                    decrement={decrement}
                    input={input}
                    showInventory={showInventory}
                    setShowInventory={setShowInventory}
                    handleChange={handleChange}
                  />
                  <ShippingForm />
                  <Details
                    isCheckedRadio={isCheckedRadio}
                    isCheckedRadioTow={isCheckedRadioTow}
                    handleToggleRadio={handleToggleRadio}
                    handleToggleRadioTow={handleToggleRadioTow}
                    selectedMaterial={selectedMaterial}
                    setSelectedMaterial={setSelectedMaterial}
                    selectedAgeRange={selectedAgeRange}
                    setSelectedAgeRange={setSelectedAgeRange}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                  />
                  <VariantsForm
                    variants={variants}
                    addedVariants={addedVariants}
                    setAddedVariants={setAddedVariants}
                    handleVariantChange={handleVariantChange}
                  />
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Status handleStatusChange={handleStatusChange} />
                  <PublishingForm
                    input={input}
                    updateMyStore={updateMyStore}
                    updatePOS={updatePos}
                    open={openChannelsModal}
                    setOpen={setOpenChannelsModal}
                  />
                  <ProductOrganizationForm
                    selected={selected}
                    selectedCollection={selectedCollection}
                    handleChange={handleChange}
                    setSelected={setSelected}
                    input={input}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                    setSelectedCollection={setSelectedCollection}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button
                  style={{
                    boxShadow:
                      ' 0rem -.0625rem 0rem .0625rem rgba(0, 0, 0, .8) inset, 0rem 0rem 0rem .0625rem rgba(48, 48, 48, 1) inset, 0rem .03125rem 0rem .09375rem rgba(255, 255, 255, .25) inset ',
                  }}
                  size="sm"
                >
                  Save Product
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
      <ChannelsModal
        setInput={setInput}
        input={input}
        handleSave={updateMyStore}
        openModal={openChannelsModal}
        setOpenModal={setOpenChannelsModal}
        updatePos={updatePos}
      />
    </DndProvider>
  )
}

export default AddProduct
