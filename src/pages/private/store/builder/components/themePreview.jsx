import React from 'react'
import {DotPattern} from '../../../../../components/ui/animations/dotPattern'
import { cn } from '../../../../../lib/utils' 
import wireframe from '../../../../../assets/private/store/products/wireframe.png'
import { Edit, Eye, Pen, Settings, Upload } from 'lucide-react'
import { ShineBorder } from './animatedBorder'
import { Dropdown, DropdownItem, DropdownMenu } from '@heroui/react'
import { DropdownTrigger } from '@heroui/react'
import { IconSettings } from '@tabler/icons-react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Iphone15Pro, Safari } from './mockups'
const ThemePreview = () => {
  return (
    <div className="flex w-full h-[450px] max-h-[450px] bg-white  flex-col gap-0 items-center rounded-xl ">
       
      <div className="h-[380px] cursor-grab active:cursor-grabbing  w-full flex items-center justify-center relative overflow-hidden rounded-xl">
      <DotPattern
        glow={true}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
        )}
      />
        <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
      <TransformWrapper>  
         
          <TransformComponent contentClass="transformer-cs" wrapperClass='w-full h-full flex items-center transformer-cs justify-center'>  
<div className='w-full h-full flex items-center gap-4 flex-row justify-center '>
        <Iphone15Pro width={150} height={350}  />
        <Safari width={300} height={350}/>
 </div>
          </TransformComponent>
        
        </TransformWrapper>
      </div>  
      <div className="flex w-full p-5 justify-between items-center">
        <div className="grid items-center gap-0`">
          <h2 style={{ fontWeight: '550' }}>Classical</h2>
          <p className="text-gray-500 leading-tight">clasical Supplify theme</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="pr-up-btn">Costumize</button>
          <Dropdown triggerScaleOnOpen={false} placement="bottom-end">
            <DropdownTrigger>
              <button className="pr-up-btn">
                <IconSettings className="size-5" />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
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
