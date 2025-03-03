import React from 'react'
import {Checkbox} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import { useEffect } from 'react';
const Table = ({filteredProducts , setIsSelected , isSelected , selectedProjects , setSelectedProjects}) => {
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



  return (
    <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
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
        <span>Collection</span>
      </th>
      <th scope="col" className="px-[12px] py-[8px]">Products</th>
      <th scope="col" className="px-[12px] py-[8px]">Product condition</th>
     
    </>
  ) : (
    <th colSpan={8} className="w-full px-[12px] py-[8px]">
      <div className="flex justify-between items-center">
        <span>{selectedProjects.length} Selected</span>
        <Dropdown
          placement="bottom-start"
          classNames={{
            base: "", // change arrow background
            content: "p-1 shadow-input bg-white min-w-[212px]",
          }}
        >
          <DropdownTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </DropdownTrigger>
          <DropdownMenu 
           
          aria-label="Dynamic Actions" > 
          <DropdownSection showDivider>
            {items.slice(0,2).map((item) => (
            
              <DropdownItem
                key={item.key}
                 color={`${item.key === 'delete' ? 'danger' : ''}`}
                className={` ${item.key === 'delete' ? "text-red-500 hover:text-white" : 'data-[hover=true]:bg-gray-100'}`}
              >
                <div className="w-full flex gap-1  items-center justify-between">
                  {item.label}
                  {item.icon}
                </div>
              </DropdownItem>
               
            ))}
            </DropdownSection>
            <DropdownSection showDivider>
            {items.slice(2,4).map((item) => (
            
              <DropdownItem
                key={item.key}
                 color={`${item.key === 'delete' ? 'danger' : ''}`}
                className={` ${item.key === 'delete' ? "text-red-500 hover:text-white" : 'data-[hover=true]:bg-gray-100'}`}
              >
                <div className="w-full flex gap-1  items-center justify-between">
                  {item.label}
                  {item.icon}
                </div>
              </DropdownItem>
               
            ))} </DropdownSection>
            <DropdownSection showDivider>
            {items.slice(4,6).map((item) => (
            
            <DropdownItem
              key={item.key}
               color={`${item.key === 'delete' ? 'danger' : ''}`}
              className={` ${item.key === 'delete' ? "text-red-500 hover:text-white" : 'data-[hover=true]:bg-gray-100'}`}
            >
              <div className="w-full flex gap-1  items-center justify-between">
                {item.label}
                {item.icon}
              </div>
            </DropdownItem>
             
            ))}
            
          </DropdownSection>
          <DropdownSection showDivider>
            {items.slice(6,8).map((item) => (
            
            <DropdownItem
              key={item.key}
               color={`${item.key === 'delete' ? 'danger' : ''}`}
              className={` ${item.key === 'delete' ? "text-red-500 hover:text-white" : 'data-[hover=true]:bg-gray-100'}`}
            >
              <div className="w-full flex gap-1  items-center justify-between">
                {item.label}
                {item.icon}
              </div>
            </DropdownItem>
             
          ))}
          </DropdownSection>
          <DropdownSection >
            {items.slice(8,10).map((item) => (
            
            <DropdownItem
              key={item.key}
               color={`${item.key === 'delete' ? 'danger' : ''}`}
              className={` ${item.key === 'delete' ? "text-red-500 hover:text-white" : 'data-[hover=true]:bg-gray-100'}`}
            >
              <div className="w-full flex gap-1  items-center justify-between">
                {item.label}
                {item.icon}
              </div>
            </DropdownItem>
             
          ))}
          </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </th>
    
  )}
</tr>

      
     
    </thead>
    <tbody>
      {filteredProducts.map((product) => (
        <tr key={product._id} className="hover:opacity-[var(--nextui-hover-opacity)]  custom-tr">
          <td className="p-3 w-2">
            <div className="flex items-center">
            <Checkbox 
        isSelected={selectedProjects.includes(product._id)}
        color='secondary'
        size='md'
        className={{
         base: ' border '
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
                  <img src={product.photoUrls[0]} alt="img" className="h-8 w-auto" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

                )}
              </span>
              {product.name}
            </div>
          </th>
          <td className="px-3 py-2">
            <span className=" text-primary-800 text-xs font-medium py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
      
                {product.products || '0'}
         
            </span>
          </td>
          <td
            className="px-3 py-2 font-medium  text-red whitespace-nowrap dark:text-white"
            style={product.stock > 0 ? { color: 'rgb(36, 151, 83)' } : { color: 'rgb(255, 60, 19)' }}
          >
            {product.condition || ''} 
          </td> 
         
      
        
        </tr>
      ))}
    </tbody>
  </table>
  )
}

export default Table
