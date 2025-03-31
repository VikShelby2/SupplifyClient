import React, { useEffect, useState } from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown'
import { Input, Select, SelectItem, Slider } from '@nextui-org/react'
import { productCategories, productStatus } from '../../../../../data/constants'
import {
  handleListCollections,
  handleListTags,
} from '../../../../../api/store/products'
import { useRecoilValue } from 'recoil'
import { storeAtom } from '../../../../../context/atoms/storeAtom'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../../../../context/redux/productsSlice'
import { ProductsFilterMenu } from '../../../../../components/admin/menus'
export const SelectorIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M8 9l4 -4l4 4" />
      <path d="M16 15l-4 4l-4 -4" />
    </svg>
  )
}

const FilterProducts = ({ products, setNoOption }) => {
  const dispatch = useDispatch()
  const [originalProducts, setOriginalProducts] = useState(products)
  const [selectedStatus, setSelectedStatus] = useState(new Set([]))
  const [selectedVendor, setSelectedVendor] = useState('')
  const [selectedSale, setSelectedSale] = useState([])
  const [selectedMarket, setSelectedMarket] = useState([])
  const [selectedType, setSelectedType] = useState([])
  const [selectedGift, setSelectedGift] = useState([])
  const [selectedCollection, setSelectedCollection] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useSelector((state) => state.user)
  const [tags, setTags] = useState([])
  const store = useRecoilValue(storeAtom)
  const [collections, setCollections] = useState([])
  useEffect(() => {
    const fetchTags = async () => {
      await handleListTags(user._id, setTags, setLoading)
    }
    const fetchCollection = async () => {
      await handleListCollections(store._id, setCollections)
    }
    fetchCollection()
    fetchTags()
    console.log(collections)
  }, [user, store])

  const [selectedTags, setSelectedTags] = useState(new Set([]))
  const [selectedCat, setSelectedCat] = useState(new Set([]))
  const [priceRange, setPriceRange] = useState([0, 500])

  const handleSliderChange = (values) => {
    setPriceRange(values)
  }
  const handleInputChange = (index, value) => {
    const newValue = [...priceRange]
    newValue[index] = Math.min(Math.max(Number(value), 0), 1000)
    setPriceRange(newValue)
  }

  const [filtering, setFiltering] = useState(true)
  useEffect(() => {
    const filteredProducts = () => {
      let filtered = [...originalProducts] // Start with original products

      // Apply filters
      if (selectedTags.size > 0) {
        filtered = filtered.filter((product) =>
          product.tags.some((tag) => selectedTags.has(tag.name))
        )
      }

      if (selectedCat.id) {
        filtered = filtered.filter(
          (product) => product.category.name === selectedCat.name
        )
      }

      if (selectedStatus.size > 0) {
        filtered = filtered.filter((product) =>
          selectedStatus.has(product.status)
        )
      }

      if (selectedVendor.length > 0) {
        filtered = filtered.filter((product) =>
          selectedVendor.includes(product.vendor)
        )
      }

      if (priceRange[0] > 0 || priceRange[1] < 1000) {
        filtered = filtered.filter(
          (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )
      }

      const noFilteredProducts = filtered.length === 0

      // Dispatch the filtered products to Redux
      dispatch(setProducts(noFilteredProducts ? originalProducts : filtered))

      // Set no option state
      setNoOption(noFilteredProducts)
    }

    // Call the filtering function
    filteredProducts()
  }, [
    selectedTags,
    selectedCat,
    selectedStatus,
    selectedVendor,
    priceRange,
    originalProducts,
    dispatch,
  ])

  return (
    <div className="max-w-[450px] max-h-[350px]  w-full  grid flex-col items-center cursor-pointer  bg-white rounded-xl ">
      <div
        className={
          ' w-full min-h-full  p-1 px-4 pt-5 pb-3 flex flex-col items-center'
        }
      >
        <div className="flex items-center justify-between w-full">
          <h1 className="text-[1.2rem] font-bold">Filter Products</h1>
          <ProductsFilterMenu />
        </div>
        <div className="flex items-cetner w-full flex-row gap-3">
          <div className="flex w-full items-center">
            <Select
              classNames={{
                base: 'max-w-[204px]',
                trigger:
                  'border-[0.5px] data-[hover=true]:border-2 data-[focus=true]:border-2',
              }}
              label="Tags"
              variant="bordered"
              selectionMode="multiple"
              labelPlacement={'outside'}
              selectedKeys={selectedTags}
              onSelectionChange={setSelectedTags}
              selectorIcon={<SelectorIcon />}
            >
              {tags.length > 0 &&
                tags.map((item) => (
                  <SelectItem key={item.id}>{item.name}</SelectItem>
                ))}
            </Select>
          </div>
          <div className="flex w-full items-center">
            <Select
              bottomContent={
                <div className="px-2 cursor-pointer hover:text-violet-400 py-2 border-t border-default-300">
                  Clear
                </div>
              }
              classNames={{
                base: 'max-w-[204px]',
                trigger:
                  'border-[0.5px] data-[hover=true]:border-2 data-[focus=true]:border-2',
              }}
              label="Categories"
              variant="bordered"
              selectionMode="multiple"
              labelPlacement={'outside'}
              selectorIcon={<SelectorIcon />}
              selectedKeys={selectedCat}
              onSelectionChange={setSelectedCat}
            >
              {productCategories.length > 0 &&
                productCategories.map((item) => (
                  <SelectItem key={item.id}>{item.name}</SelectItem>
                ))}
            </Select>
          </div>
        </div>
        <div className="flex items-center mt-3 gap-2 flex-col w-full">
          <div className="flex items-center  gap-3 w-full">
            <Input
              label="Min Price"
              type="number"
              variant="bordered"
              value={priceRange[0]}
              classNames={{
                inputWrapper: 'border-small',
              }}
              onChange={(e) => handleInputChange(0, e.target.value)}
              className="w-full"
              labelPlacement={'outside'}
            />
            <Input
              label="Max Price"
              type="number"
              variant="bordered"
              classNames={{
                inputWrapper: 'border-small',
              }}
              labelPlacement={'outside'}
              value={priceRange[1]}
              onChange={(e) => handleInputChange(1, e.target.value)}
              className="w-full"
            />
          </div>
          <Slider
            className="max-w-md w-full"
            value={priceRange}
            onChange={handleSliderChange}
            formatOptions={{ style: 'currency', currency: 'USD' }}
            minValue={0}
            maxValue={1000}
            step={50}
            color="secondary"
          />
        </div>
        <div className="flex items-cetner w-full flex-row gap-3">
          <div className="flex w-full items-center">
            <Select
              classNames={{
                base: 'max-w-[204px]',
                trigger:
                  'border-[0.5px] data-[hover=true]:border-2 data-[focus=true]:border-2',
              }}
              label="Status"
              variant="bordered"
              selectionMode="multiple"
              selectedKeys={selectedStatus}
              onSelectionChange={setSelectedStatus}
              labelPlacement={'outside'}
              selectorIcon={<SelectorIcon />}
            >
              {productStatus.map((item) => (
                <SelectItem key={item.key}>{item.label}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex w-full items-center">
            <Select
              classNames={{
                base: 'max-w-[204px]',
                trigger:
                  'border-[0.5px] data-[hover=true]:border-2 data-[focus=true]:border-2',
              }}
              label="Vendors"
              variant="bordered"
              selectedKeys={selectedVendor}
              onSelectionChange={setSelectedVendor}
              selectionMode="multiple"
              labelPlacement={'outside'}
              selectorIcon={<SelectorIcon />}
            >
              <SelectItem key={'das'}>My Store</SelectItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-1"></div>

      <div className={'flex w-full p-1 px-6 py-3 pt-2  items-center'}>
        <h1
          className={`${products.length === originalProducts.length ? 'text-gray-300' : 'text-violet-600'}`}
        >
          clear
        </h1>
      </div>
    </div>
  )
}

export default FilterProducts
