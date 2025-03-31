import React, { useRef, useState } from 'react'
import { Badge } from '../../../../../components/ui/badge'
import { Checkbox, Tooltip } from '@heroui/react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown'
import { useRecoilValue } from 'recoil'
import { IoIosArrowDown } from 'react-icons/io'
import { Avatar, AvatarGroup, Button } from '@nextui-org/react'
import { useEffect } from 'react'
import { storeAtom } from '../../../../../context/atoms/storeAtom'
import { EarthIcon, ShoppingBag } from 'lucide-react'
import { cn } from '../../../../../lib/utils'
import { useNavigate } from 'react-router-dom'
import {
  setSelectedProduct,
  setSelectedProductId,
} from '../../../../../context/redux/productsSlice'
import { useDispatch } from 'react-redux'
import { ProductsTableMenu } from '../../../../../components/admin/menus'
import FilterProducts from './filterProducts'
const Table = ({
  filteredProducts,
  setIsSelected,
  isSelected,
  selectedProjects,
  setSelectedProjects,
}) => {
  const store = useRecoilValue(storeAtom)
  useEffect(() => {
    if (selectedProjects.length > 0) {
      setIsSelected(false)
    } else {
      setIsSelected(true)
    }
  }, [selectedProjects])
  const areAllSelected =
    filteredProducts.length > 0 &&
    selectedProjects.length === filteredProducts.length

  // Toggle individual project selection
  const handleProjectChange = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id)
        : [...prev, id]
    )
  }

  // Handle the header checkbox to select/deselect all projects
  const handleSelectAll = () => {
    if (areAllSelected) {
      setSelectedProjects([]) // Deselect all
    } else {
      setSelectedProjects(filteredProducts.map((product) => product._id)) // Select all
    }
  }
  const items = [
    {
      key: 'archive',
      label: 'Archive Product',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
          />
        </svg>
      ),
    },
    {
      key: 'delete',
      isLast: true,
      label: 'Delete Project',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 text-red-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      ),
    },
    {
      key: 'Include in sales channel',
      label: 'Include in sales channel',
    },
    {
      key: 'Exlude in sales channel',
      label: 'Exlude in sales channel',
    },
    {
      key: 'Include in market',
      label: 'Include from market',
    },
    {
      key: 'Exlude in market',
      label: 'Exlude from market',
    },
    {
      key: 'Add tags',
      label: 'Add tags',
    },
    {
      key: 'Remove tags',
      label: 'Remove tags',
    },
    {
      key: 'Add to collections',
      label: 'Add to collections',
    },
    {
      key: 'Remove from collections ',
      label: 'Remove from collections',
    },
  ]

  const [enterTable, setEnterTable] = useState('')
  const handleCountChannels = (product) => {
    if (product) {
      const activeCount =
        product.publishing !== undefined
          ? product.publishing.channels.filter((channel) => channel.isActive)
              .length
          : 0
      return activeCount
    }
  }
  const handleCountMarkets = (product) => {
    if (product) {
      const activeCount =
        product.publishing !== undefined
          ? product.publishing.markets.filter((channel) => channel.isActive)
              .length
          : 0
      return activeCount
    }
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sendToEdit = (productId, product) => {
    dispatch(setSelectedProduct(product))
    dispatch(setSelectedProductId(productId))
    navigate('edit')
  }
  const channels = [
    {
      name: store.storeName,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 text-violet-600"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
          />
        </svg>
      ),
    },
    {
      name: 'POS',
      icon: <ShoppingBag />,
    },
  ]
  const markets = [
    {
      name: store.storeLocation || 'Albania',
      icon: (
        <img
        alt='location flag'
        src={store.locationFlag}
        className="size-5 w-6 rounded-[.3rem]"
      />
      ),
    },
    {
      name: 'International',
      icon: <EarthIcon />,
    },
  ]
  const [hovered, setHovered] = useState(null)
  const svgToDataUri = (svg) => {
    const encodedSvg = encodeURIComponent(svg)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22')

    return `data:image/svg+xml,${encodedSvg}`
  }
  return (
    <table className="w-full table-auto   border-separate border-spacing-0   p-[1px]  text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs font-light  ">
        <tr className="text-gray-500 rounded-xl color-th shadow-table   ">
          <th scope="col" className="px-[12px] py-[8px]">
            <Checkbox
              defaultSelected
              color="secondary"
              isSelected={areAllSelected}
              size="md"
              radius="sm"
              onValueChange={handleSelectAll}
            ></Checkbox>
          </th>
          {isSelected ? (
            <>
              <th scope="col" className="px-[12px] py-[8px]">
                <span>Product</span>
              </th>
              <th scope="col" className=" px-[12px] py-[8px]">
                Status
              </th>
              <th scope="col" className="px-[12px] py-[8px]">
                Inventory
              </th>
              <th scope="col" className="px-[12px] py-[8px]">
              Selling Platfroms
              </th>
              <th scope="col" className="px-[12px] py-[8px]">
                Regions
              </th>
              <th scope="col" className="px-[12px] py-[8px]">
                Category
              </th>

              <th scope="col" className="px-[12px] py-[8px]">
                Vendor
              </th>
            </>
          ) : (
            <>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className="text-[#fff] px-[12px] font-normal  py-[8px]"
              >
                Status
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Inventory
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Selling Platfroms
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Regions
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Category
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Type
              </th>
              <th
                scope="col"
                style={{ userSelect: 'none' }}
                className=" text-[#fff] px-[12px] py-[8px]"
              >
                Vendor
              </th>
            </>
          )}
        </tr>
        <tr
          tabindex="-1"
          aria-hidden="true"
          class="w-px h-px block"
          style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
        ></tr>
      </thead>
      <tbody className=" border-collapse rounded-xl color-th crusor-poiter">
      {filteredProducts.map((product, index) => {
  const isSelected = selectedProjects.includes(product._id);
  const prevSelected = index > 0 && selectedProjects.includes(filteredProducts[index - 1]._id);
  const nextSelected = index < filteredProducts.length - 1 && selectedProjects.includes(filteredProducts[index + 1]._id);
  const isFirstSelected = isSelected && !prevSelected; // First in a contiguous selection
  const isLastSelected = isSelected && !nextSelected; // Last in a contiguous selection
  const isFirst = index === 0;
  const isLast = index === filteredProducts.length - 1;
  return (
    <>
      {isFirstSelected && !isFirst && (
      <tr
      tabindex="-1"
      aria-hidden="true"
      class="w-px h-px block"
      style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
    ></tr>
      )}

      <tr
        onMouseEnter={() => setEnterTable(product._id)}
        onMouseLeave={() => setEnterTable('')}
        key={product._id}
        className="hover:opacity-[var(--nextui-hover-opacity)] text-[#333] cursor-pointer"
      >
        <td className={cn(
          'p-3 w-2 border-b border-l',
          
          nextSelected && !isSelected && 'rounded-bl-[.5rem] border-b',
          isFirst && 'rounded-tl-xl border border-r-0', 
          isLast && 'rounded-bl-xl',
          isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && ' rounded-l-xl border-none' ,
          isFirstSelected && 'rounded-tl-xl' ,
          prevSelected  && !isSelected && 'rounded-tl-xl border-t ' ,
          isLastSelected && 'rounded-bl-xl'
        )}>
          <div className="flex items-center">
            <Checkbox
              isSelected={isSelected}
              color="secondary"
              className='outline-none focus:outline-none focus:ring-0'
              size="md"  classNames={{
                wrapper: "focus:ring-0 focus:ring-offset-0"
              }}
              radius="sm"
              onValueChange={() => handleProjectChange(product._id)}
            ></Checkbox>
          </div>
        </td>
        
        <th className={cn(
          'px-3 py-2 border-b text-[#333]', 
          isFirst && 'border-t border-r-0 '  ,
          prevSelected && !isSelected && 'border-t ',
          isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,
          isFirstSelected && '' , )}>
          <div className="flex items-center mr-3  font-[550]">
            <span className={`mr-3  ${isSelected ? 'shadow-input' : 'shadow-table' } `} style={{
              width: '40px', height: '40px',
              justifyContent: 'center', borderRadius: '.5rem',
              alignItems: 'center', display: 'flex'
            }}>
              {product.photoUrls && product.photoUrls.length > 0 ? (
                <img src={product.photoUrls[0]} alt="img" className="h-8 w-auto" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              )}
            </span>
            <span className="first-letter:uppercase "> {product.title} </span>
          </div>
        </th>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}>
         <Badge
  variant="outline"
  className={`
    ${product.status === 'active' ? 'text-green-800 bg-green-200' :
      product.status === 'Archived' ? 'text-white bg-secondary' :
      'text-gray-900 bg-gray-200'}
  `}
>
  {product.status}
</Badge>

        </td>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}
            style={{ color: product.stock > 0 ? 'rgb(36, 151, 83)' : 'rgb(255, 60, 19)' }}>
          {product.stock || 0} in stock
        </td>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}>
          <ProductsTableMenu
            handleCount={handleCountChannels}
            product={product}
            enterTable={enterTable}
            hovered={hovered}
            setHovered={setHovered}
            item={channels}
          />
        </td>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}>
          <ProductsTableMenu
            handleCount={handleCountMarkets}
            product={product}
            enterTable={enterTable}
            hovered={hovered}
            setHovered={setHovered}
            item={markets}
          />
        </td>

        <td className={cn(
          'px-3 py-2 border-b',
           isFirst && 'border-t border-r-0',
           prevSelected && !isSelected && 'border-t ',
           isSelected && 'bg-[#f2f2f2] border-b ',
           (isFirstSelected && selectedProjects.length - 1 === 0 ) && '  border-none' ,)}>
          <div className="flex items-center mr-3 ">
            <span className="ml-[.3rem]">
              {product?.category.name ? product.category.name : 'Uncategorized'}
            </span>
          </div>
        </td>

        

        <td className={cn(
            'px-3 py-2 border-b border-r', 
            isFirst && !isSelected && 'border-t border-r rounded-tr-xl', 
            isLast && !isSelected &&'rounded-br-xl' , 
            isSelected && 'bg-[#f2f2f2] border-b ',
          (isFirstSelected && selectedProjects.length - 1 === 0 ) && ' rounded-r-xl border-none' ,
          isFirstSelected && 'rounded-tr-xl' ,
          isLastSelected && 'rounded-br-xl' ,
            prevSelected && !isSelected && 'border-t rounded-tr-xl ' ,

            nextSelected && !isSelected &&'rounded-br-xl border-b',)}>
              <Tooltip content={'My Store'}>

              <Avatar
                      isBordered
                      color="secondary"
                      radius="sm"
                      className="w-[20px] h-[20px]"
                      src={svgToDataUri(store.svgData)}
                    />   
              </Tooltip>
         
        </td>
      </tr> 

      {isLastSelected && (
       <tr
       tabindex="-1"
       aria-hidden="true"
       class="w-px h-px block"
       style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}
     ></tr>
      )}
    </>
  );
})}


      </tbody>
    </table>
  )
}

export default Table
