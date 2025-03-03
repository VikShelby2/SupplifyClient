import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure , Button , Select, SelectItem} from "@nextui-org/react";
import { Input } from "../../../../pages/public/Home/components/input";
import FormLabel from "../../../../pages/private/store/product/AddProduct/components/label-form";
export const weights = [
    { label: 'kg'  },
    { label: 'oz'  },
    { label: 'lb' },
    { label: 'g' },
];
export default function WeightModal({openModal , setOpenModal ,setWeight , weight , handleSave , handleFieldChange , variantChanges}){
  const [weightUnit, setWeightUnit] = useState(new Set(['kg'])); 
  const [shopLocations, setShopLocations] = useState(0); 

    const Action = () =>{
        handleSave()
        setOpenModal(false)
    }
    return(
        <Modal isOpen={openModal}  onClose={()=>{setOpenModal(!openModal)}} >
        <ModalContent className="bg-[#1d1d1d]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">Edit Weight</ModalHeader>
              <ModalBody>
              <div className={`grid grid-cols-1 gap-[.5rem] `}>    
         <form class=" m-0 ">
                     <label for="zip-input" style={{
               fontFamily:'Arabato',
               fontWeight: '450' ,
            
              }} class="text-[.834rem] text-white pl-[2px]">Weight</label>
                <div className='flex flex-col'>
            
              <div className='flex gap-2'>
              <div className='relative'>
              <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
             <span className='text-sm text-[#616161]'>{weightUnit}</span>
              </div> 
              <Input
                  value={variantChanges.weight}
                  onChange={(e) => handleFieldChange( 'weight' , e.target.value)}
                  variant='priceWhite' className='flex-1' />
              </div>
               
                <Select
                  className='w-24 text-sm'
                  
                  selectedKeys={weightUnit}
                  onSelectionChange={setWeightUnit}
                >
                  {weights.map((item , index) =>(
                    <SelectItem key={item.label}  >
                        {item.label}
                    </SelectItem>
      ))}
                </Select>
              </div>
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