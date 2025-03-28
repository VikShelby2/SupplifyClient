import React from 'react'
import { HoverEffect } from '../../../../components/ui/animations/crad-hover-effect'
import { HomeCardData } from '../../../../data/constants'
import TextGenerateEffect from '../../../../components/ui/animations/gardual-text-spacing'

const  Features  = () => {
  return (
    <div className='h-full w-full bg-[#8152f1] mt-20 rounded-t-[40px]'>
    <div className='w-full flex items-center justify-center'>
    <div className='max-w-[62rem] flex justify-center p-10 text-center items-center'>
    <h1 className="h1 mb-6">
  <TextGenerateEffect words={' Transform your vision into reality with  the ultimate eCommerce solution where limitless possibilities meet unparalleled innovation.'} />
 
   
  </h1>
    </div>
    
    </div>
    
     <div className="max-w-auto mt-[10px]  mr-[3.7rem]   ml-[3.7rem]    px-8">
      <HoverEffect items={HomeCardData} />
    </div>
    </div>
  )
}

export default Features 
