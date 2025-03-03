import React from 'react'

import wireframe from '../../../../../assets/private/store/products/wireframe.png'
import { Edit, Eye, Pen, Settings, Upload } from 'lucide-react';
import { ShineBorder } from './animatedBorder';
import { Dropdown, DropdownItem , DropdownMenu } from '@heroui/react';
import { DropdownTrigger } from '@heroui/react';
import { IconSettings } from '@tabler/icons-react';
const ThemePreview = () => {
  return (
       <div className='flex w-full h-[450px] max-h-[450px] bg-white  flex-col gap-0 items-center rounded-xl '>
                <div className='h-[380px] p-7 w-full flex items-center justify-center relative overflow-hidden bg-gray-100 rounded-xl'>
                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <img
                   src={wireframe}
                   className='w-fit max-h-[380px] h-[300px] '
                  />
                </div>
                <div className='flex w-full p-5 justify-between items-center'>
                  <div className='grid items-center gap-0`'>
                   <h2 style={{fontWeight:'550'}}>Classical</h2>
                   <p className="text-gray-500 leading-tight">clasical Supplify theme</p>
                  </div>
                  <div className='flex items-center gap-2'>
                        <button className='pr-up-btn'>
                            Costumize
                        </button>
                        <Dropdown 
                         triggerScaleOnOpen={false}
                         placement='bottom-end'
                         >
                          <DropdownTrigger>
                          <button className='pr-up-btn'>
                          <IconSettings className='size-5'/>
                        </button>   
                          </DropdownTrigger>
                          <DropdownMenu
                              
                          >
                            <DropdownItem>Rename</DropdownItem>
                            <DropdownItem>Duplicate</DropdownItem>
                            <DropdownItem>Download</DropdownItem>
                            <DropdownItem>Edit code</DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                       
                  </div>
                  </div>   
           </div>
  )
}

export default ThemePreview
