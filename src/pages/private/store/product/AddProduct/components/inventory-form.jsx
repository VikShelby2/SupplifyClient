import React from "react";

import { Input } from "../../../../../public/Home/components/input";
import {Checkbox} from "@nextui-org/react";
import {Switch} from "@nextui-org/react";
import FormCard from "../../../../../../components/ui/basics/form-card";
import FormLabel from "./label-form";


export default function Inventory({
  input ,
  count ,
  increment,
  decrement,
  setShowInventory,
  showInventory,
  handleChange
}){

    return(
        <FormCard cardStyle={'bg-white shadow-input rounded-[.75rem]'} contentStyle={"mt-[1.3rem]"}>


       
        <div class="grid items-center ">
        <div className='grid grid-cols-2 items-center justify-between'>
          <div className='p-2 px-[6px] flex items-center justify-start w-full'>
      <FormLabel className={'text-black text-[1rem]'}> 
                Quantity
              </FormLabel>  
              </div> 
                 
              <div  className='p-2 flex items-center gap-2 justify-end w-full'>
   
                      <div class="py-2 px-3 inline-block  border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700" data-hs-input-number="">
                         <div class="flex items-center gap-x-1.5">
<button onClick={()=>{decrement()}} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200  text-black shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-input-number-decrement="">
<svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M5 12h14"></path>
</svg>
</button>
<input class="p-0 w-6 bg-transparent border-0 text-black text-center focus:ring-0 dark:text-white" type="text" value={count} data-hs-input-number-input=""/>
<button  onClick={()=>{increment()}} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200  text-black shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-input-number-increment="">
<svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M5 12h14"></path>
<path d="M12 5v14"></path>
</svg>
</button>
                        </div>
                     </div>

           </div>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center justify-between    pt-0'>
        <div className='p-2 px-[4px]  flex items-center jusitfy-start w-full'>
        <div className='grid pl-[2px] '>     
           <label for="small-input" class="block  text-[1rem] font-medium text-black dark:text-white" 
              style={{

               fontWeight: '500' ,
              }}>No Stock</label>
              <p className='text-gray-400' style={{
                fontWright:'450',
                fontFamily:'Arabato' ,
                fontSize:'.75rem'
              }}>Sell this product even without stock
              </p>
              </div>  
        </div>   
        <div  className='p-2 flex items-center gap-2 justify-end w-full'>
              <Switch  color="secondary"></Switch>
           </div>
        </div>
     
          
        <div className={` align-center justify-center border-t-2 border-t-[#f1f1f1]   border-b-2 border-b-[#f1f1f1]`}>
      <div className={` p-[1.2rem] px-[4px] ${showInventory ? 'pb-[1.2rem]' : 'pb-1'} `}>
      <div class="flex items-center mb-4 p-[2px]">
        <Checkbox
           radius='sm'
            color="secondary"
               onClick={()=>{setShowInventory(!showInventory)}} 
              
           /> 
          
            <label for="default-checkbox" class=" text-sm font-medium text-black">This product has sku and barcode</label>
        </div>
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-[.5rem] ${showInventory ? '' : 'hidden'}`}>    
         <form class="max-w-sm m-0 ">
                     
              <FormLabel className={'text-black'}> 
              SKU (Stock per unit)
              </FormLabel>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             
              </div>
                   <Input
                    name="sku"
      value={input.sku}
      onChange={handleChange} type="text" id="zip-input" aria-describedby="helper-text-explanation"
      variant="primaryWhite"
        style={{paddingInlineStart: '.5rem' , cursor:'pointer'}}  required />
              </div>
       
               </form>
                <form class="max-w-sm m-0">
                <FormLabel className={'text-black'} weight={'450'}> 
              Barcode
              </FormLabel>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          
              </div>
                   <Input  name="barcode"
      value={input.barcode}
      onChange={handleChange} type="text" id="zip-input" aria-describedby="helper-text-explanation" 
      variant="primaryWhite"
       style={{paddingInlineStart: '.5rem' , cursor:'pointer'}}  required />
              </div>
       
       </form>
               </div>
                     
           </div>

        </div>
        <div className='grid grid-cols-2 items-center justify-between   pt-[1.2rem] px-[6px] pb-0'>
        <div className='p-2 px-0   flex items-center justify-start w-full'>
        <div className='grid pl-[2px] '>     
           <label for="small-input" class="block  text-[1rem] font-medium text-black dark:text-white" 
              style={{

               fontWeight: '500' ,
              }}>Let buyers make offers</label>
              <p className='text-gray-400' style={{
                fontWright:'450',
                fontFamily:'Arabato' ,
                fontSize:'.75rem'
              }}>Allowing offers increases your chances of selling by 3-7% based on recent
                individual seller listing preformance .
              </p>
              </div>  
        </div>   
              <div  className='p-2 px-0 flex items-center gap-2 justify-end w-full'>
              <Switch  color="secondary"></Switch>
           </div>
        </div>
        <div className='grid grid-cols-2 items-center justify-between   pt-[1.2rem] px-[6px] pt-0'>
        <div className='p-2 px-0  flex items-center jusitfy-start w-full'>
        <div className='grid pl-[2px] '>     
           <label for="small-input" class="block  text-[1rem] font-medium text-black dark:text-white" 
              style={{

               fontWeight: '500' ,
              }}>Volume Pricing</label>
              <p className='text-gray-400' style={{
                fontWright:'450',
                fontFamily:'Arabato' ,
                fontSize:'.75rem'
              }}>Offer a discount when buyers purchase more then one item
              </p>
              </div>  
        </div>   
              <div  className='p-2 px-0 flex items-center gap-2 justify-end w-full'>
              <Switch  color="secondary"></Switch>
           </div>
        </div>
      
       </FormCard>
    )
}