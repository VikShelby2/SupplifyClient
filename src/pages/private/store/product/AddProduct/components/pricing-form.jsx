import React from "react";

import {Tooltip, Checkbox ,  Button} from "@nextui-org/react";
import FormCard from "../../../../../../components/ui/basics/form-card";
import { Input } from "../../../../../public/Home/components/input";
import FormLabel from "./label-form";
export default function Pricing({
    input ,
    enabled ,
    setEnabled ,
    openTax ,
    setOpenTax ,
    handleChange
}){
    return(
       <FormCard cardStyle={'bg-white shadow-input rounded-[.75rem]'} contentStyle={"mt-[1.3rem]"}>

        <div className="grid md:grid-cols-2  grid-cols-1 gap-3 mr-0 flex items-center">
                <form class="">
                <FormLabel className={'text-black pl-[2px]'}>
                        Pricing
                      </FormLabel>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-sm text-[#616161] '>ALL</span>
              </div>
                   <Input 
                   name="price"
                   placeholder="0.00" 
                   type="number"
                   value={input.price}
                   onChange={handleChange}
                   variant="priceWhite"
                   required />
              </div>
       
               </form>
               
               <form class="">
               <div className='w-fill  flex items-center justify-between'>  
            
              <FormLabel className={'text-black pl-[2px]'}>
              Compare-at Price
                      </FormLabel>
                  <Tooltip showArrow={true} size='xl'  content="Enter a value higher then your price . Often shown with a strikethrough " className='text-[#8c52f1] max-w-[150px] p-3'>
                       
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                           </svg>  

                  </Tooltip>
               
              </div>
           
               <div class="relative">
                  <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <span className='text-sm text-[#616161] '>ALL</span>
                </div>
                   <Input   
                    placeholder="0.00" 
                    name="comparePrice"
      value={input.comparePrice}
      onChange={handleChange}
                    type="text" 
                    id="comparePrice-input" 
                    aria-describedby="helper-text-explanation" 
                    variant="priceWhite"
                    required />
                </div>
       
               </form> 
       <div class="flex items-center justify-start ml-1 mb-2">

          <Checkbox
                 checked={enabled}
           onChange={setEnabled}
          onClick={()=>{setOpenTax(!openTax)}}
          radius='sm'
            color="secondary"
              />

            <label for="default-checkbox" class=" text-sm font-medium text-black">Charge tax on this product</label>
        </div>             
           </div>
           <div className={`flex items-center justify-between  mr-0   mt-[.3rem]`}>
               <form class={`  ${openTax ? 'md:mr-0' :'w-[49%]'} `}>
               <div className='w-fill  flex items-center justify-between'>  
               <FormLabel className={'text-black pl-[2px]'}>
              Cost per item
                      </FormLabel>
                  <Tooltip showArrow={true} size='xl' content="Buyers wont see this" className='text-[#8c52f1] text-sm max-w-[150px]'>
                       
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-black">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                           </svg>  

                  </Tooltip>
               
              </div>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-sm text-[#616161]'>ALL</span>
              </div>
                   <Input    name="costPerItem"
      value={input.costPerItem}
      onChange={handleChange} type="text" id="costperitem-input" aria-describedby="helper-text-explanation" 
      variant="priceWhite"
      required />
              </div>
       
               </form>
            { openTax && ( <> <form class={`max-w-sm mx-auto  ${openTax ? 'md:mr-0' :'md:mr-[.4rem]'}`}>
            <FormLabel className={'text-black pl-[2px]'}>
              Profit
                      </FormLabel>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-lg text-[#000]'>--</span>
              </div>
                   <Input 
                    name="profit"
      value={input.profit}
      onChange={handleChange}
                   type="text" id="costperitem-input" aria-describedby="helper-text-explanation" 
                 variant="priceWhite"
                 required />
              </div>
       
               </form>
               <form class={`max-w-sm mx-auto  ${openTax ? 'md:mr-0' :'md:mr-[.4rem]'}`}>
               <FormLabel className={'text-black pl-[2px]'}>
              Label
                      </FormLabel>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-lg text-[#000]'>--</span>
              </div>
                   <Input  name="margin"
      value={input.margin}
      onChange={handleChange} type="text" id="costperitem-input" aria-describedby="helper-text-explanation" 
      variant="priceWhite"
       required />
              </div>
       
               </form> </> ) }
           </div>
       </FormCard>
           
       
    )
}