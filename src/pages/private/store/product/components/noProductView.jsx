import React from 'react'
import ImgPrd  from '../../../../../assets/private/store/products/noprdshic.png'
import { Link } from 'react-router-dom'
import Button from '../../../../../components/ui/basics/button'
const NoProductView = () => {
  return (
    <div className=' relative p-[1px] pb-[0.5px] 3xl:pb-[1px]  w-full h-[300px] lg:h-[400px] rounded-md bg-[#fff]'>
    <div className="absolute  inset-0 rounded-lg bg-gradient-to-r from-[#7451dd] to-purple-500 opacity-50" />
    {/*No Product */}
    <div className={`flex items-center lg:gap-20 w-full h-full bg-white rounded-lg relative justify-center `}>
     <div className="items-start gap-3 grid justify-start w-[400px] mr-5">
       <div className="grid">
         <div className="text-start flex flex-start h-full">
           <h1 className="text-lg text-black font-semibold md:text-2xl" style={{lineHeight:'1.5rem'}}>Add Product</h1>
         </div>
         <div className="text-start flex flex-start h-full">
           <p className="text-stone-500" style={{ fontWeight: '450', fontSize: '.85rem' }}>
             Start by stocking your store with products your customers will love
           </p>
         </div>
       </div>
       <div className="w-full flex gap-2">
      <Link to={'add'}>
      <Button intent='primary' size={'sm'}>Add Product</Button>
      </Link>   
         <Button size={'sm'}>Import Product</Button>
       </div>
     </div>
     <div className="w-[365px] p-4">
     <img className="w-full" src={ImgPrd} alt="Placeholder" />
     </div>
   
   </div>
    </div>
  )
}

export default NoProductView
