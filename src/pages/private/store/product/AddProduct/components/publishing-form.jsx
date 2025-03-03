import React from 'react'
import FormCard from '../../../../../../components/ui/basics/form-card'
import FormLabel from './label-form'
import { Store  , ShoppingBag , Ellipsis , Earth   } from 'lucide-react';
import { Badge } from '../../../../../../components/ui/shadcn/badge';
import { useRecoilValue } from 'recoil';
import { storeAtom } from '../../../../../../context/atoms/storeAtom';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";

const PublishingForm = ({
   updateMyStore ,
   updatePOS , 
   input,
   open ,
   setOpen
}) => {
    const store = useRecoilValue(storeAtom)
  return (
    <FormCard cardStyle={'bg-white shadow-input rounded-[.75rem]'} contentStyle={"mt-[1.3rem]"}>
     
    
       <div className='w-full flex items-center justify-between'><FormLabel className={'text-black'}>Publishing</FormLabel>
       <Dropdown
            classNames={{
        base: "before:bg-default-200 ", // change arrow background
        content: "p-0 border-small border-divider bg-background w-auto min-w-2",
      }}
      >
      <DropdownTrigger>
      <button className='p-1 hover:bg-gray-100 rounded-lg'>
    
    <Ellipsis className='size-5' />
  </button>
       
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        
      >
        <DropdownItem hideSelectedIcon onClick={()=>{setOpen(true)}}   key="Heading 1">Menage Sales channel</DropdownItem>
        <DropdownItem hideSelectedIcon   key="Heading 2">Menage  Marketing</DropdownItem>
    
       
      </DropdownMenu>
    </Dropdown>
    </div>
     <div className='flex mt-2 flex-col mb-2'>
     <FormLabel className={'text-black text-[.85rem]'}> Sales Channels</FormLabel>
      <div className='mt-2 flex items-center justify-between w-full'>
       <div className='flex items-center gap-2'>
            <Badge variant={'outline'} className={'flex items-center justify-center rounded-[.3rem]  gap-1 p-1 px-2 border'} >
               <Store className='size-5 text-violet-500'/>
               <span className='text-black '>My Store</span>
            </Badge>
            <Badge variant={'outline'} className={'flex items-center justify-center rounded-[.3rem]  gap-1 p-1 px-2 border'} >
               <ShoppingBag className='size-5 text-violet-500'/>
               <span className='text-black '>Point of sale</span>
            </Badge>
       </div>
       <div className='flex items-center justify-center'>
      
       
       </div>
      </div></div>
      <div className='flex mt-2 flex-col'>
     <FormLabel className={'text-black text-[.85rem]'}>Market</FormLabel>
      <div className='mt-2 flex items-center justify-between w-full'>
       <div className='flex items-center gap-2'>
            <Badge variant={'outline'} className={'flex items-center justify-center rounded-[.3rem]  gap-1 p-1 px-2 border'} >
               <img src={store.locationFlag} className='size-5 w-6 rounded-[.3rem]' />
               <span className='text-black '>{store.storeLocation}</span>
            </Badge>
            <Badge variant={'outline'} className={'flex items-center justify-center rounded-[.3rem]  gap-1 p-1 px-2 border'} >
               <Earth  className='size-5 text-violet-500'/>
               <span className='text-black '>International</span>
            </Badge>
       </div>
       <div className='flex items-center justify-center'>
      
       
       </div>
      </div></div>
     
    </FormCard>
  )
}

export default PublishingForm
