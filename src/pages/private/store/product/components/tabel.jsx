import React, { useRef, useState } from 'react'
import { Badge } from '../../../../../components/ui/badge'
import {Checkbox} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import { useRecoilValue } from 'recoil';
import { IoIosArrowDown } from "react-icons/io";
import {Avatar, AvatarGroup , Button} from "@nextui-org/react";
import { useEffect } from 'react';
import { storeAtom } from '../../../../../context/atoms/storeAtom';
import {EarthIcon, ShoppingBag} from 'lucide-react';
import {cn} from '../../../../../lib/utils'
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct, setSelectedProductId } from '../../../../../context/redux/productsSlice';
import { useDispatch } from 'react-redux';
const Table = ({filteredProducts , setIsSelected , isSelected , selectedProjects , setSelectedProjects}) => {
 const store = useRecoilValue(storeAtom)
  useEffect(()=>{
    if(selectedProjects.length > 0){
    setIsSelected(false)
    
    } else {
     setIsSelected(true)
    }
    
    } , [selectedProjects])
    const areAllSelected = 
    filteredProducts.length > 0 && selectedProjects.length === filteredProducts.length;
   
   // Toggle individual project selection
   const handleProjectChange = (id) => {
    setSelectedProjects((prev) =>
      prev.includes(id)
        ? prev.filter((projectId) => projectId !== id) 
        : [...prev, id] 
    );
   };
   
   // Handle the header checkbox to select/deselect all projects
   const handleSelectAll = () => {
    if (areAllSelected) {
      setSelectedProjects([]); // Deselect all
    } else {
      setSelectedProjects(filteredProducts.map((product) => product._id)); // Select all
    }
   };
   const items = [
    {
      key: "archive",
      label: "Archive Product",
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
    } ,
    {
      key: "delete",
      isLast: true ,
      label: "Delete Project",
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-red-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    } ,
    {
      key: "Include in sales channel",
      label: "Include in sales channel",
     
    } ,
    {
      key: "Exlude in sales channel",
      label: "Exlude in sales channel",
     
    } ,
    {
      key: "Include in market",
      label: "Include from market",
     
    } ,
    {
      key: "Exlude in market",
      label: "Exlude from market",
     
    } ,
    {
      key: "Add tags",
      label: "Add tags",
     
    } ,
    {
      key: "Remove tags",
      label: "Remove tags",
     
    } ,
    {
      key: "Add to collections",
      label: "Add to collections",
     
    } ,
    {
      key: "Remove from collections ",
      label: "Remove from collections",
     
    } ,
  ];




   const [enterTable , setEnterTable] = useState('');
 const handleCountChannels = (product) =>{
  if(product){
    const activeCount = product.publishing !== undefined ? product.publishing.channels.filter(channel => channel.isActive).length : 0 ;
  return activeCount 
  }
  

 }
 const handleCountMarkets = (product) =>{
  if(product){
    const activeCount = product.publishing !== undefined ? product.publishing.markets.filter(channel => channel.isActive).length : 0 ;
  return activeCount 
  }
  

 }
 const navigate = useNavigate();
 const dispatch = useDispatch()
const sendToEdit = (productId , product) =>{
    dispatch(setSelectedProduct(product))
    dispatch(setSelectedProductId(productId))
    navigate('edit')

}
const channels  = [{
  name: store.storeName ,
  icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-violet-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
  </svg>

} , {
  name: 'POS' ,
  icon: <ShoppingBag />
} ]
    const markets  = [{
        name: store.storeLocation || 'Albania',
        icon: <img src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f1e6-1f1f1.svg" alt="Albanian Flag"
                   width="24"/>


    }, {
        name: 'International',
        icon: <EarthIcon/>
    }]
    const [hovered, setHovered] = useState(null);

    return (
        <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs bg-[#f4f4f4] costume-tr">
            <tr className="text-black rounded-t-xl custom-tr-hd">
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
                        <th scope="col" className=" px-[12px] py-[8px]">Status</th>
                        <th scope="col" className="px-[12px] py-[8px]">Inventory</th>
                        <th scope="col" className="px-[12px] py-[8px]">Sales Channel</th>
                        <th scope="col" className="px-[12px] py-[8px]">Markets</th>
                        <th scope="col" className="px-[12px] py-[8px]">Category</th>
                        <th scope="col" className="px-[12px] py-[8px]">Type</th>
                        <th scope="col" className="px-[12px] py-[8px]">Vendor</th>
                    </>
                ) : (
                    <>
                          <th scope="col" style={{userSelect:'none'}} className="text-[#f4f4f4] px-[12px]  py-[8px]">Status</th>
                        <th scope="col"  style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Inventory</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Sales Channel</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Markets</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Category</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Type</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Vendor</th>
                        
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Type</th>
                        <th scope="col" style={{userSelect:'none'}}  className=" text-[#f4f4f4] px-[12px] py-[8px]">Vendor</th>
                    </>
              

                )}
            </tr>


            </thead>
            <tbody className='crusor-poiter'>
            {filteredProducts.map((product) => (
                <tr onClick={()=>(sendToEdit(product._id , product))} onMouseEnter={() => setEnterTable(product._id)} onMouseLeave={() => setEnterTable('')}
                    key={product._id} className="hover:opacity-[var(--nextui-hover-opacity)] cursor-pointer custom-tr">
                    <td className="p-3 w-2">
                        <div className="flex items-center">
                            <Checkbox
                                isSelected={selectedProjects.includes(product._id)}
                                color='secondary'
                                size='md'
                                classNames={{
                                    base: "outline-none focus:outline-none focus:ring-0",
                                  }}
                                radius="sm"
                                onValueChange={() => handleProjectChange(product._id)}

                            ></Checkbox>
                        </div>
                    </td>
                    <th
                        scope="row"
                        className="px-3 py-2  "
                    >
                        <div className="flex items-center mr-3 text-black">
              <span
                  className="mr-3"
                  style={{
                      width: '40px',
                      height: '40px',
                      boxShadow: 'rgba(85, 85, 85, 0.3) 0rem 0rem 0rem 0.0625rem inset',
                      justifyContent: 'center',
                      borderRadius: '.5rem',
                      alignItems: 'center',
                      display: 'flex',
                  }}
              >
                {product.photoUrls && product.photoUrls.length > 0 ? (
                    <img src={product.photoUrls[0]} alt="img" className="h-8 w-auto"/>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-4 ">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"/>
                    </svg>

                )}
              </span>
                            {product.title}
                        </div>
                    </th>
                    <td className="px-3 py-2">
            <span
                className=" text-primary-800 text-xs font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
              <Badge
                  variant="outline"
                  style={{
                      color: product.status === 'active' ? 'rgb(12 ,81 , 50)' : product.status === 'Archived' ? 'rgb(97, 16, 142)' : '#101010',
                      background: product.status === 'active' ? 'rgb(180 ,254 ,210)' : product.status === 'Archived' ? 'rgb(229, 157, 255)' : 'rgb(236, 236, 236)'
                  }}    
                  className="text-[rgb(12 ,81 , 50)] bg-[rgb(180 ,254 ,210)]"
              >
                {product.status}
              </Badge>
            </span>
                    </td>
                    <td
                        className="px-3 py-2 font-medium  text-red whitespace-nowrap dark:text-white"
                        style={product.stock > 0 ? {color: 'rgb(36, 151, 83)'} : {color: 'rgb(255, 60, 19)'}}
                    >
                        {product.stock || 0} in stock
                    </td>
                    <td className="px-1 py-2 font-medium whitespace-nowrap text-black">
                        <Dropdown
                            placement="bottom-start"
                            triggerScaleOnOpen={false}
                            classNames={{

                                content: "p-0 border-none border-divider bg-background w-auto   min-w-[13rem]",
                            }}
                        >


                            <DropdownTrigger>
                                <div
                                    className={`flex items-center gap-2 group hover:bg-[#f4f4f4]  p-2   rounded-[.75rem] max-w-[4rem]`}>
                                    <span className='ml-2'>{handleCountChannels(product)}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className={cn("size-6 hidden text-violet-500", enterTable === product._id ? "flex" : "group-hover:flex")}

                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                    </svg>
                                </div>


                            </DropdownTrigger>
                            <DropdownMenu
                                closeOnSelect={false}
                                itemClasses={{
                                    base: "data-[hover=true]:bg-transparent p-2 m-0"
                                }}
                            >

                                <DropdownItem

                                    startContent={
                                        <div className="flex items-center gap-1 ">

                                            {//  index < hovered ? `${(index - hovered) * 1.2}rem` : "0rem", //
                                                channels.map((items, index) => (
                                                    <div
                                                        key={index}
                                                        onMouseEnter={() => setHovered(index)}
                                                        onMouseLeave={() => setHovered(null)}
                                                        style={{
                                                            marginLeft: index === 0
                                                                ? "0rem" // No margin for the first item
                                                                : hovered === null
                                                                    ? `${index * 1.2}rem` // Apply normal margin for non-hovered state
                                                                    : index === hovered
                                                                        ? `${index * 1.2}rem` // Increase margin for hovered item
                                                                        : `${(index) * 4.7}rem` // Apply increased margin to other items when hovered
                                                        }}


                                                        className={`z-50 ${index === 0 ? 'absolute' : ''}   bg-white flex items-center p-1 shadow-input justify-center rounded-[.5rem] transition-all duration-300 `}>
                                                        {items.icon}
                                                        {
                                                            hovered === index && (
                                                                <div className={`   text-black`}>
                                                                    <span>{items.name}</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>

                                    }

                                >

                                </DropdownItem>


                            </DropdownMenu>
                        </Dropdown>

                    </td>


                    <td className="px-1 py-2 font-medium whitespace-nowrap text-black">
                        <Dropdown
                            placement="bottom-start"
                            triggerScaleOnOpen={false}

                        >


                            <DropdownTrigger>
                                <div
                                    className='flex items-center gap-2 group hover:bg-[#f4f4f4] p-2   rounded-[.75rem] max-w-[4rem]'>
                                    <span className='ml-2'>{handleCountMarkets(product)}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className={cn("size-6 hidden text-violet-500", enterTable === product._id ? "flex" : "group-hover:flex")}
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                    </svg>
                                </div>


                            </DropdownTrigger>
                            <DropdownMenu
                                closeOnSelect={false}
                                itemClasses={{
                                    base: "data-[hover=true]:bg-transparent p-2 m-0"
                                }}
                            >

                                <DropdownItem
                                    startContent={
                                        <div className="flex items-center gap-3 ">

                                            {//  index < hovered ? `${(index - hovered) * 1.2}rem` : "0rem", //
                                                markets.map((items, index) => (
                                                    <div
                                                        key={index}
                                                        onMouseEnter={() => setHovered(index)}
                                                        onMouseLeave={() => setHovered(null)}
                                                        style={{
                                                            marginLeft: index === 0
                                                                ? "0rem" // No margin for the first item
                                                                : hovered === null
                                                                    ? `${index * 1.2}rem` // Apply normal margin for non-hovered state
                                                                    : index === hovered
                                                                        ? `${index * 1.2}rem` // Increase margin for hovered item
                                                                        : `${(index) * 5.2}rem` // Apply increased margin to other items when hovered
                                                        }}


                                                        className={`z-50 ${index === 0 ? 'absolute' : ''}   bg-white flex items-center p-1 shadow-input justify-center rounded-[.5rem] transition-all duration-300 `}>
                                                        {items.icon}
                                                        {
                                                            hovered === index && (
                                                                <div className={`   text-black`}>
                                                                    <span>{items.name}</span>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>

                                    }

                                >

                                </DropdownItem>


                            </DropdownMenu>
                        </Dropdown>

                    </td>
                    <td className="px-3 py-2 font-medium whitespace-nowrap text-black">
                        <div className="flex items-center mr-3 text-black">

                            <span
                                className="ml-[.3rem] text-black">{product?.category.name ? product.category.name : 'Uncategorized'}</span>
                        </div>
                    </td>

                    <td className="px-3 py-2 text-black">
                        {product.type || ''}
                    </td>
                    <td className="px-3 py-2 text-black">
                        {product.vendor || 'My Store'}
                    </td>


                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table
