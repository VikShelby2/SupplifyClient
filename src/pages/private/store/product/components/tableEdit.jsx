import React, { useState } from 'react'
import { MdOutlineDragIndicator } from "react-icons/md";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
  } from "@nextui-org/dropdown";
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
const TableEdit = ({selected}) => {
  return (
     <div className="fixed left-1/2 bottom-0 transform -translate-x-1/2 p-4  text-center mb-10">
          <Draggable selected={selected} />
    </div>
  )
}

export default TableEdit
export const Draggable = ({selected}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    return (
      <div
        className="w-[400px] h-[40px] bg-white rounded-[.5rem] shadow-input p-2 flex items-center"
        style={{

          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // In case the mouse leaves the div while dragging
      >
      <div className='w-full flex items-center justify-between g text-black'>
        <div className='flex items-center gap-3'>

            <button className='p-1  active:scale-90  rounded-[.5rem] hover:bg-slate-100'>
            <MdOutlineDragIndicator className='size-6' />

        </button>
        <span className='text-[.85rem]' style={{fontWeight:'700'}}>{selected} selected</span>
        </div>
          <div>
          <Dropdown
          placement="bottom-start"
          classNames={{
            base: "", // change arrow background
            content: "p-1 shadow-input bg-white min-w-[212px]",
          }}
        >
          <DropdownTrigger>
          <button className='p-1  active:scale-90  rounded-[.5rem] hover:bg-slate-100'>
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

        </button>

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
      </div>
      </div>
    );
  };