import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Tooltip
} from "@nextui-org/react";
import {TableSeparator} from "../../Separetaor/Tabel";
import {weights} from "./wight";
import React, {useState} from "react";



export default function OverAllModal({

    openModal,
    setOpenModal,
    variantChanges,
    handleFieldChange,
    handleSave ,
    count ,
    decrement,
    increment,
                                     }){
    const [weightUnit, setWeightUnit] = useState(new Set(['kg']));
return(

        <Modal
            size={'xl'}
            isOpen={openModal}
            onClose={()=>{setOpenModal(!openModal)}}

        >
            <ModalContent className="bg-[#fff]">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col text-[#101010] gap-1">Edit Product Variant</ModalHeader>
                        <ModalBody >
                            <div className="grid md:grid-cols-2   grid-cols-1 gap-3 mr-0" >
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
                                        <input
                                            name="price"
                                            value={variantChanges.price}
                                            onChange={(e) => handleFieldChange('price', e.target.value)}
                                            type="text" id="price-input" aria-describedby="helper-text-explanation"
                                            class=" h-[38px]  border shadow-sm bg-white  text-[#101010] text-sm rounded-lg focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  " placeholder="0.00" style={{paddingInlineStart: '3.5rem'  , cursor:'pointer'}}  required />
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
                                            <span className='text-sm text-[#616161]'>ALL</span>
                                        </div>
                                        <input
                                            placeholder="0.00"
                                            name="comparePrice"
                                            value={variantChanges.compareAt}
                                            onChange={(e) => handleFieldChange('compareAt', e.target.value)}
                                            type="text"
                                            id="comparePrice-input"
                                            aria-describedby="helper-text-explanation"
                                            class="h-[38px] bg-white border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  " style={{paddingInlineStart: '3.5rem' ,cursor:'pointer'}}  required />
                                    </div>

                                </form>

                            </div>

                            <TableSeparator />
                            <div className="grid md:grid-cols-2   grid-cols-1 gap-3 mr-0" >
                                <form class="max-w-sm mx-auto w-full">
                                    <label for="small-input" class="block  mb-2  text-[#101010]"
                                           style={{
                                               fontSize:'1rem' ,
                                               fontFamily:"Arabato" ,
                                               fontWeight:'500'
                                           }}>SKU</label>
                                    <div class="relative">


                                        <input
                                            placeholder="0.00"
                                            name="sku"
                                            value={variantChanges.sku}
                                            onChange={(e) => handleFieldChange('sku', e.target.value)}
                                            type="text"
                                            id="comparePrice-input"
                                            aria-describedby="helper-text-explanation"
                                            class="h-[38px] bg-white border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full p-2.5  " style={{cursor:'pointer'}}  required />
                                    </div>

                                </form>

                                <form class="max-w-sm mx-auto w-full">
                                    <div className='w-fill mb-2 flex items-center justify-between'>
                                        <label for="small-input" class="block    text-[#101010] "
                                               style={{
                                                   fontSize:'1rem' ,
                                                   fontFamily:"Arabato" ,
                                                   fontWeight:'500'
                                               }}>Barcode</label>


                                    </div>




                                    <input
                                        placeholder="0.00"
                                        name="barcode"
                                        value={variantChanges.barcode}
                                        onChange={(e) => handleFieldChange('barcode', e.target.value)}
                                        type="text"
                                        id="comparePrice-input"
                                        aria-describedby="helper-text-explanation"
                                        class="h-[38px] bg-[#fff] border shadow-sm text-[#101010] text-sm rounded-lg  focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full  p-2.5  " style={{cursor:'pointer'}}  required />


                                </form>

                            </div>
                            <TableSeparator />
                            <div class="grid items-center ">
                                <div className='grid grid-cols-2 items-center justify-between'>
                                    <div className='p-2 pl-0  flex items-center jusitfy-start w-full'><h1 className='text-[1rem] text-[#101010] ' style={{
                                        fontFamily:'Arabato',
                                        fontWeight: '450' ,

                                    }}>Quantity</h1></div>
                                    <div  className='p-2 flex items-center gap-2 justify-end w-full'>

                                        <div class="py-2 px-3 inline-block bg-[#fff] border border-gray-200 rounded-lg  " data-hs-input-number="">
                                            <div class="flex items-center gap-x-1.5">
                                                <button onClick={()=>{decrement()}} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-[#1d1d1d] bg-[white] text-[#101010] shadow-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-input-number-decrement="">
                                                    <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                        <path d="M5 12h14"></path>
                                                    </svg>
                                                </button>
                                                <input class="p-0 w-6 bg-transparent border-0 text-[#101010] text-center focus:ring-0 " type="text" value={count} data-hs-input-number-input=""/>
                                                <button  onClick={()=>{increment()}} type="button" class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-[#1d1d1d] bg-[white] text-[#101010] shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" data-hs-input-number-increment="">
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
                            <form class="grid grid-cols-2 m-0 ">
                                <h1 className='text-[1rem] text-[#101010] mb-1' style={{
                                    fontFamily:'Arabato',
                                    fontWeight: '450' ,

                                }}>Weight</h1>
                                <div class="relative flex items-center gap-2 ">
                                    <Select
                                        className='w-[125px] text-sm'

                                        selectedKeys={weightUnit}
                                        onSelectionChange={setWeightUnit}
                                    >
                                        {weights.map((item , index) =>(
                                            <SelectItem key={item.label}  >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">

                                    </div>
                                    <div class="relative">
                                        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                            <span className='text-sm text-[#101010] '>{weightUnit}</span>
                                        </div>
                                        <input
                                            name="price"
                                            value={variantChanges.weight}
                                            onChange={(e) => handleFieldChange('weight', e.target.value)}
                                            type="text" id="price-input" aria-describedby="helper-text-explanation"
                                            class=" h-[38px]  border shadow-sm bg-[#fff]  text-[#101010] text-sm rounded-lg focus:outline-none focus:ring-[#8c52fe] focus:ring-2  focus:ring-offset-2 focus:border-black block w-full ps-10 p-2.5  " placeholder="0.00" style={{paddingInlineStart: '3.5rem'  , cursor:'pointer'}}  required />
                                    </div>
                                </div>

                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onClick={()=>{setOpenModal(false)}}>
                                Close
                            </Button>
                            <Button color="secondary" onClick={()=>{handleSave()}}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )


}

