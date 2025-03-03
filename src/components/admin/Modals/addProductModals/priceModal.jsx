import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure , price , Tooltip , Button  ,Checkbox} from "@nextui-org/react";
import { Input } from "../../../../pages/public/Home/components/input";
export default function PriceModal({openModal ,handleFieldChange ,variantChanges , setOpenModal ,priceValue , compareValue ,setPriceValue , setCompareAtValue , handleSave}){
    const [enabled , setEnabled] = useState(false)
    const [openTax , setOpenTax] = useState(false)
    const Action = () =>{
        handleSave()
        setOpenModal(false)
    }
    return(
        <Modal isOpen={openModal}  onClose={()=>{setOpenModal(!openModal)}} >
        <ModalContent className="bg-[#fff]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#101010]">Edit Price</ModalHeader>
              <ModalBody>
              <div className="grid md:grid-cols-2  grid-cols-1 gap-3 mr-0">
                <form class="max-w-sm mx-auto">
                <label for="small-input" class="block  mb-2  text-[#101010]"
              style={{
                fontSize:'1rem' ,
                fontFamily:"Arabato" ,
              fontWeight:'500'
              }}>Price</label>
                 <div class="relative">
               <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-sm text-[#616161] '>ALL</span>
              </div>
                   <Input
                   name="price"
                   value={variantChanges.price}
                   onChange={(e) => handleFieldChange('price', e.target.value)}
                   type="text" id="price-input" aria-describedby="helper-text-explanation" 
                   variant="priceWhite"
                  required />
              </div>
       
               </form>
               
               <form class="max-w-sm mx-auto">
               <div className='w-fill mb-2 flex items-center justify-between'>  
                 <label for="small-input" class="block    text-[#101010] "
              style={{
                fontSize:'1rem' ,
                fontFamily:"Arabato" ,
              fontWeight:'500'
              }}>Compare-at Price</label>
                  <Tooltip showArrow={true} size='xl'  content="Enter a value higher then your price . Often shown with a strikethrough " className='text-[#8c52f1] max-w-[150px] p-3'>
                       
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-[#101010]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                           </svg>  

                  </Tooltip>
               
              </div>
           
                 <div class="relative">
                  <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <span className='text-sm text-[#101010]'>ALL</span>
                </div>
                   <Input  
                    placeholder="0.00" 
                    name="comparePrice"
                    value={compareValue}
                    variant="priceWhite"
                    onChange={(e) => handleFieldChange('weight', e.target.value)}
                    type="text" 
                    id="comparePrice-input" 
                    aria-describedby="helper-text-explanation" 
                    required />
                </div>
       
               </form> 
                  
           </div>
         
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={()=>{setOpenModal(!openModal)}}>
                  Close
                </Button>
                <Button color="secondary"  onClick={()=>{Action()}}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}