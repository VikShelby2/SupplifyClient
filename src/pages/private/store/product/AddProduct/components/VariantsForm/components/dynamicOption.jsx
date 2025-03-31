import React, { useEffect, useState } from 'react'
import { Checkbox, Select, SelectItem } from '@nextui-org/react'

import { Ellipsis } from 'lucide-react'
import { Image } from 'lucide-react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Tooltip,
} from '@nextui-org/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react'
import PriceModal from '../../../../../../../../components/admin/Modals/addProductModals/priceModal'
import SkuModal from '../../../../../../../../components/admin/Modals/addProductModals/skuModal'
import BarcodeModal from '../../../../../../../../components/admin/Modals/addProductModals/barcode'
import QuantityModal from '../../../../../../../../components/admin/Modals/addProductModals/quantitis'
import WeightModal, {
  weights,
} from '../../../../../../../../components/admin/Modals/addProductModals/wight'
import { TableSeparator } from '../../../../../../../../components/admin/Separetaor/Tabel'
import OverAllModal from '../../../../../../../../components/admin/Modals/addProductModals/overAllModal'
const DynamicOptions = ({ addedVariants, setAddedVariants }) => {
  const [showInventory, setShowInventory] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedOptionValueIndex, setSelectedOptionValueIndex] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [price, setPrice] = useState('')
  const [compareAt, setCompareAt] = useState('')
  const [sku, setSku] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [barcode, setBarcode] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const [seller, setSeller] = useState([])
  const [weight, setWeight] = useState('')
  const [country, setCountry] = useState('')
  const [sellStock, setSellStock] = useState(false)
  const handleImageChange = (event, variantIndex, optionValueIndex) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const updatedVariants = [...addedVariants]
        updatedVariants[variantIndex].optionValues[optionValueIndex].photo =
          reader.result
        setAddedVariants(updatedVariants)
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const [weightUnit, setWeightUnit] = useState(new Set(['kg']))
  const [variantChanges, setVariantChanges] = useState({
    price: '',
    compareAt: '',
    sku: '',
    quantity: 0,
    barcode: '',
    weight: '',
    country: '',
  })
  const handleFieldChange = (field, value) => {
    setVariantChanges((prevChanges) => ({
      ...prevChanges,
      [field]: value,
    }))
  }

  const handleSave = () => {
    if (selectedOptions.length > 0) {
      const updatedVariants = [...addedVariants]
      selectedOptions.forEach(({ variantIndex, optionValueIndex }) => {
        const selectedOptionValue =
          updatedVariants[variantIndex].optionValues[optionValueIndex]
        selectedOptionValue.price = variantChanges.price
        selectedOptionValue.compareAt = variantChanges.compareAt
        selectedOptionValue.sku = variantChanges.sku
        selectedOptionValue.country = variantChanges.country
        selectedOptionValue.weight = variantChanges.weight
        selectedOptionValue.quantity = variantChanges.quantity
        selectedOptionValue.barcode = variantChanges.barcode
      })
      setAddedVariants(updatedVariants)
      setOpenModal(false)
    }
  }

  const [count, setCount] = useState(0)

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
  useEffect(() => {
    setVariantChanges((prevState) => ({
      ...prevState,
      quantity: count,
    }))
  }, [count])

  const handleEditClick = (variantIndex, optionValueIndex) => {
    const variant = addedVariants[variantIndex]
    const optionValue = variant.optionValues[optionValueIndex]

    setSelectedOptions([{ variantIndex, optionValueIndex }])
    setVariantChanges({
      price: optionValue.price || '',
      quantity: optionValue.quantity || 0,
      weight: optionValue.weight || '',
      compareAt: optionValue.compareAt || '',
      sku: optionValue.sku || '',
      barcode: optionValue.barcode || '',
      country: optionValue.country || '',
      sellStock: optionValue.sellStock || false,
    })
    setOpenModal(true)
  }

  const handleCheckboxChange = (variantIndex, optionValueIndex) => {
    const updatedSelectedOptions = [...selectedOptions]
    const index = updatedSelectedOptions.findIndex(
      (item) =>
        item.variantIndex === variantIndex &&
        item.optionValueIndex === optionValueIndex
    )

    if (index === -1) {
      updatedSelectedOptions.push({ variantIndex, optionValueIndex })
    } else {
      updatedSelectedOptions.splice(index, 1)
    }

    setSelectedOptions(updatedSelectedOptions)
  }

  const handleHeaderCheckboxChange = () => {
    const allChecked =
      selectedOptions.length ===
      addedVariants.reduce(
        (acc, variant) => acc + variant.optionValues.length,
        0
      )
    const allOptions = []

    if (!allChecked) {
      addedVariants.forEach((variant, variantIndex) => {
        variant.optionValues.forEach((optionValue, optionValueIndex) => {
          allOptions.push({ variantIndex, optionValueIndex })
        })
      })
      setSelectedOptions(allOptions)
    } else {
      setSelectedOptions([])
    }
  }

  const isChecked = (variantIndex, optionValueIndex) => {
    return selectedOptions.some(
      (item) =>
        item.variantIndex === variantIndex &&
        item.optionValueIndex === optionValueIndex
    )
  }
  let selectedOptionDetails
  let trues = 0
  let falsies = 0
  useEffect(() => {
    console.log(selectedOptions)
  }, [selectedOptions])

  const isIndeterminate = selectedOptions.length > 0
  const [openModalPrice, setOpenModalPrice] = useState(false)
  const [openModalQuantities, setOpenModalQuantities] = useState(false)
  const [openModalSKU, setOpenModalSKU] = useState(false)
  const [openModalBarcode, setOpenModalBarcode] = useState(false)
  const [openModalWeight, setOpenModalWeight] = useState(false)
  const [openModalCountryRegion, setOpenModalCountryRegion] = useState(false)
  const [openModalHSCode, setOpenModalHSCode] = useState(false)
  const [openModalAddImages, setOpenModalAddImages] = useState(false)
  const [openModalEditLocation, setOpenModalEditLocation] = useState(false)

  const toggleModal = (modalName) => {
    switch (modalName) {
      case 'openModalPrice':
        setOpenModalPrice(!openModalPrice)
        break
      case 'openModalQuantities':
        setOpenModalQuantities(!openModalQuantities)
        break
      case 'openModalSKU':
        setOpenModalSKU(!openModalSKU)
        break
      case 'openModalBarcode':
        setOpenModalBarcode(!openModalBarcode)
        break
      case 'openModalWeight':
        setOpenModalWeight(!openModalWeight)
        break
      case 'openModalCountryRegion':
        setOpenModalCountryRegion(!openModalCountryRegion)
        break
      case 'openModalHSCode':
        setOpenModalHSCode(!openModalHSCode)
        break
      case 'openModalAddImages':
        setOpenModalAddImages(!openModalAddImages)
        break

      case 'openModalEditLocation':
        setOpenModalEditLocation(!openModalEditLocation)
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="relative bg-[#fff] overflow-x-auto w-[99%] shadow-sm sm:rounded-b-lg ml-[0.1rem]">
        {addedVariants.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-black ">
            <thead className="text-xs text-black bg-[#fff] border-t-2 border-b-2 border-t border-b   ">
              <tr>
                <th
                  scope="col"
                  className="p-4"
                  style={{ paddingTop: '.45rem', paddingBottom: '.45rem' }}
                >
                  <div className="flex items-center">
                    <Checkbox
                      color="secondary"
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 accent-black border-gray-300 rounded focus:ring-[#8c52fe] dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={handleHeaderCheckboxChange}
                      {...(isIndeterminate ? { isIndeterminate: true } : {})}
                      isSelected={
                        selectedOptions.length ===
                        addedVariants.reduce(
                          (acc, variant) => acc + variant.optionValues.length,
                          0
                        )
                      }
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ paddingTop: '.45rem', paddingBottom: '.45rem' }}
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right"
                  style={{ paddingTop: '.45rem', paddingBottom: '.45rem' }}
                >
                  {selectedOptions.length > 0 ? (
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="light" isIconOnly>
                          <Ellipsis className={'text-black'} />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="new"
                          onClick={() => toggleModal('openModalPrice')}
                        >
                          Edit price
                        </DropdownItem>
                        <DropdownItem
                          key="copy"
                          onClick={() => toggleModal('openModalQuantities')}
                        >
                          Edit quantities
                        </DropdownItem>
                        <DropdownItem
                          key="edit"
                          onClick={() => toggleModal('openModalSKU')}
                        >
                          Edit SKU
                        </DropdownItem>
                        <DropdownItem
                          key="new"
                          onClick={() => toggleModal('openModalBarcode')}
                        >
                          Edit barcode
                        </DropdownItem>
                        <DropdownItem
                          key="copy"
                          onClick={() => toggleModal('openModalWeight')}
                        >
                          Edit weight
                        </DropdownItem>
                        <DropdownItem
                          key="edit"
                          onClick={() => toggleModal('openModalCountryRegion')}
                        >
                          Edit country/region
                        </DropdownItem>
                        <DropdownItem
                          key="new"
                          onClick={() => toggleModal('openModalHSCode')}
                        >
                          Edit HS code
                        </DropdownItem>
                        <DropdownItem
                          key="copy"
                          onClick={() => toggleModal('openModalAddImages')}
                        >
                          Add Images
                        </DropdownItem>
                        <DropdownItem key="edit">Remove Images</DropdownItem>

                        <DropdownItem
                          key="edit"
                          onClick={() => toggleModal('openModalEditLocation')}
                        >
                          Edit Location
                        </DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                        >
                          Delete Variant
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    'Active'
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {addedVariants.map((variant, variantIndex) => (
                <React.Fragment key={variantIndex}>
                  {variant.optionValues.map((optionValue, optionValueIndex) => (
                    <tr key={optionValueIndex} className={` custom-tr`}>
                      <td className="w-4 p-4">
                        <div className="flex items-center">
                          <Checkbox
                            color="secondary"
                            id={`checkbox-table-search-${variantIndex}-${optionValueIndex}`}
                            type="checkbox"
                            className="w-4 h-4 accent-black border-gray-300 rounded focus:ring-[#8c52fe] dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={() =>
                              handleCheckboxChange(
                                variantIndex,
                                optionValueIndex
                              )
                            }
                            isSelected={isChecked(
                              variantIndex,
                              optionValueIndex
                            )}
                          />
                          <label
                            htmlFor={`checkbox-table-search-${variantIndex}-${optionValueIndex}`}
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            className="w-[40px] h-[40px] flex text-[#8c52fe] bg-transparent rounded-[.5rem] justify-center items-center p-1"
                            style={{
                              boxShadow:
                                'rgba(255, 255, 255, 0.3) 0rem 0rem 0rem 0.0625rem inset',
                            }}
                            onClick={(e) => {
                              e.preventDefault()
                              document
                                .getElementById(
                                  `dropzoneee-file-${variantIndex}-${optionValueIndex}`
                                )
                                .click()
                            }}
                          >
                            {optionValue.photo ? (
                              <img
                                src={optionValue.photo}
                                alt="Selected"
                                className="h-8 w-auto"
                              />
                            ) : (
                              <Image />
                            )}
                          </button>
                          <input
                            id={`dropzoneee-file-${variantIndex}-${optionValueIndex}`}
                            type="file"
                            className="hidden"
                            multiple
                            onChange={(e) =>
                              handleImageChange(
                                e,
                                variantIndex,
                                optionValueIndex
                              )
                            }
                          />
                          <div className="ps-3">
                            <div className="text-base font-semibold">
                              {variant.optionName}-{optionValue.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <button
                          className="pr-up-btn"
                          onClick={() =>
                            handleEditClick(variantIndex, optionValueIndex)
                          }
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        size={'xl'}
        isOpen={openModal}
        onClose={() => {
          setOpenModal(!openModal)
        }}
      >
        <ModalContent className="bg-[#fff]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-[#101010] gap-1">
                Edit Product Variant
              </ModalHeader>
              <ModalBody>
                <div className="grid md:grid-cols-2   grid-cols-1 gap-3 mr-0">
                  <form class="max-w-sm mx-auto">
                    <label
                      for="small-input"
                      class="block  mb-2  text-[#101010]"
                      style={{
                        fontSize: '1rem',
                        fontFamily: 'Arabato',
                        fontWeight: '500',
                      }}
                    >
                      Price
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="text-sm text-[#616161] ">ALL</span>
                      </div>
                      <input
                        name="price"
                        value={variantChanges.price}
                        onChange={(e) =>
                          handleFieldChange('price', e.target.value)
                        }
                        type="text"
                        id="price-input"
                        aria-describedby="helper-text-explanation"
                        class=" h-[38px]  border shadow-sm bg-white  text-[#101010] text-sm rounded-lg focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  "
                        placeholder="0.00"
                        style={{
                          paddingInlineStart: '3.5rem',
                          cursor: 'pointer',
                        }}
                        required
                      />
                    </div>
                  </form>

                  <form class="max-w-sm mx-auto">
                    <div className="w-fill mb-2 flex items-center justify-between">
                      <label
                        for="small-input"
                        class="block    text-[#101010] "
                        style={{
                          fontSize: '1rem',
                          fontFamily: 'Arabato',
                          fontWeight: '500',
                        }}
                      >
                        Compare-at Price
                      </label>
                      <Tooltip
                        showArrow={true}
                        size="xl"
                        content="Enter a value higher then your price . Often shown with a strikethrough "
                        className="text-[#8c52f1] max-w-[150px] p-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6 text-[#101010]"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </Tooltip>
                    </div>

                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="text-sm text-[#616161]">ALL</span>
                      </div>
                      <input
                        placeholder="0.00"
                        name="comparePrice"
                        value={variantChanges.compareAt}
                        onChange={(e) =>
                          handleFieldChange('compareAt', e.target.value)
                        }
                        type="text"
                        id="comparePrice-input"
                        aria-describedby="helper-text-explanation"
                        class="h-[38px] bg-white border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  "
                        style={{
                          paddingInlineStart: '3.5rem',
                          cursor: 'pointer',
                        }}
                        required
                      />
                    </div>
                  </form>
                </div>

                <TableSeparator />
                <div className="grid md:grid-cols-2   grid-cols-1 gap-3 mr-0">
                  <form class="max-w-sm mx-auto w-full">
                    <label
                      for="small-input"
                      class="block  mb-2  text-[#101010]"
                      style={{
                        fontSize: '1rem',
                        fontFamily: 'Arabato',
                        fontWeight: '500',
                      }}
                    >
                      SKU
                    </label>
                    <div class="relative">
                      <input
                        placeholder="0.00"
                        name="sku"
                        value={variantChanges.sku}
                        onChange={(e) =>
                          handleFieldChange('sku', e.target.value)
                        }
                        type="text"
                        id="comparePrice-input"
                        aria-describedby="helper-text-explanation"
                        class="h-[38px] bg-white border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full p-2.5  "
                        style={{ cursor: 'pointer' }}
                        required
                      />
                    </div>
                  </form>

                  <form class="max-w-sm mx-auto w-full">
                    <div className="w-fill mb-2 flex items-center justify-between">
                      <label
                        for="small-input"
                        class="block    text-[#101010] "
                        style={{
                          fontSize: '1rem',
                          fontFamily: 'Arabato',
                          fontWeight: '500',
                        }}
                      >
                        Barcode
                      </label>
                    </div>

                    <input
                      placeholder="0.00"
                      name="barcode"
                      value={variantChanges.barcode}
                      onChange={(e) =>
                        handleFieldChange('barcode', e.target.value)
                      }
                      type="text"
                      id="comparePrice-input"
                      aria-describedby="helper-text-explanation"
                      class="h-[38px] bg-[#fff] border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full  p-2.5  "
                      style={{ cursor: 'pointer' }}
                      required
                    />
                  </form>
                </div>
                <TableSeparator />
                <div class="grid items-center ">
                  <div className="grid grid-cols-2 items-center justify-between">
                    <div className="p-2 pl-0  flex items-center jusitfy-start w-full">
                      <h1
                        className="text-[1rem] text-[#101010] "
                        style={{
                          fontFamily: 'Arabato',
                          fontWeight: '450',
                        }}
                      >
                        Quantity
                      </h1>
                    </div>
                    <div className="p-2 flex items-center gap-2 justify-end w-full">
                      <div
                        class="py-2 px-3 inline-block bg-[#fff] border border-gray-200 rounded-lg  "
                        data-hs-input-number=""
                      >
                        <div class="flex items-center gap-x-1.5">
                          <button
                            onClick={() => {
                              decrement()
                            }}
                            type="button"
                            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-[#1d1d1d] bg-[white] text-[#101010] shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            data-hs-input-number-decrement=""
                          >
                            <svg
                              class="flex-shrink-0 size-3.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M5 12h14"></path>
                            </svg>
                          </button>
                          <input
                            class="p-0 w-6 bg-transparent border-0 text-[#101010] text-center focus:ring-0 "
                            type="text"
                            value={count}
                            data-hs-input-number-input=""
                          />
                          <button
                            onClick={() => {
                              increment()
                            }}
                            type="button"
                            class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-[#1d1d1d] bg-[white] text-[#101010] shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                            data-hs-input-number-increment=""
                          >
                            <svg
                              class="flex-shrink-0 size-3.5"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M5 12h14"></path>
                              <path d="M12 5v14"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <form class="grid grid-cols-2 m-0 ">
                  <h1
                    className="text-[1rem] text-[#101010] mb-1"
                    style={{
                      fontFamily: 'Arabato',
                      fontWeight: '450',
                    }}
                  >
                    Weight
                  </h1>
                  <div class="relative flex items-center gap-2 ">
                    <Select
                      className="w-[125px] text-sm"
                      selectedKeys={weightUnit}
                      onSelectionChange={setWeightUnit}
                    >
                      {weights.map((item, index) => (
                        <SelectItem key={item.label}>{item.label}</SelectItem>
                      ))}
                    </Select>
                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none"></div>
                    <div class="relative">
                      <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="text-sm text-[#101010] ">
                          {weightUnit}
                        </span>
                      </div>
                      <input
                        name="price"
                        value={variantChanges.weight}
                        onChange={(e) =>
                          handleFieldChange('weight', e.target.value)
                        }
                        type="text"
                        id="price-input"
                        aria-describedby="helper-text-explanation"
                        class=" h-[38px]  border shadow-sm bg-[#fff]  text-[#101010] text-sm rounded-lg focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  "
                        placeholder="0.00"
                        style={{
                          paddingInlineStart: '3.5rem',
                          cursor: 'pointer',
                        }}
                        required
                      />
                    </div>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onClick={() => {
                    setOpenModal(false)
                  }}
                >
                  Close
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    handleSave()
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <PriceModal
        handleSave={handleSave}
        variantChanges={variantChanges}
        setOpenModal={setOpenModalPrice}
        openModal={openModalPrice}
        priceValue={price}
        compareValue={compareAt}
        setCompareAtValue={setCompareAt}
        setPriceValue={setPrice}
        handleFieldChange={handleFieldChange}
      />
      <SkuModal
        handleSave={handleSave}
        variantChanges={variantChanges}
        setOpenModal={setOpenModalSKU}
        openModal={openModalSKU}
        sku={sku}
        setSku={setSku}
        handleFieldChange={handleFieldChange}
      />
      <BarcodeModal
        handleSave={handleSave}
        variantChanges={variantChanges}
        setBarcode={setBarcode}
        barcode={barcode}
        setOpenModal={setOpenModalBarcode}
        openModal={openModalBarcode}
        handleFieldChange={handleFieldChange}
      />
      <WeightModal
        handleSave={handleSave}
        variantChanges={variantChanges}
        setWeight={setWeight}
        weight={weight}
        setOpenModal={setOpenModalWeight}
        openModal={openModalWeight}
        handleFieldChange={handleFieldChange}
      />
      <QuantityModal
        handleSave={handleSave}
        variantChanges={variantChanges}
        setQuantity={setQuantity}
        quantity={quantity}
        setOpenModal={setOpenModalQuantities}
        openModal={openModalQuantities}
        handleFieldChange={handleFieldChange}
      />
    </>
  )
}

export default DynamicOptions
