import React from "react";
import ModalPrimary from "../../../../../../ui/Modal";
import { Checkbox } from "@nextui-org/react";
export default function ChannelModal({
    checkedOne , 
    setCheckedOne ,
    checkedTow ,
    setCheckedTow ,
    setOpenModal ,
    openModal ,
    handleSelect ,
    getCheckboxStatus
}){
    return( 
    
    <ModalPrimary open={openModal} setOpen={setOpenModal}  childrenHeader={'Menage Sales Chanel'} children={
        <>
           <div className='flex items-center w-full mt-2' style={
             {
              justifyContent:'space-between'
             }
           }>
           <p class="hover-underline-animation" onClick={()=>{handleSelect()}}>{ checkedOne || checkedTow ? 'Diselect' : 'Select All'}</p>
           <p className="text-white">{getCheckboxStatus()}</p>
           </div>    
           <div>
           <div className="col-span-2 flex items-center " style={{ paddingTop: '1rem' , paddingBottom:'0.5rem' }}>
                        <Checkbox
                          id="default-checkbox"
                          isSelected={checkedOne}
                          onClick={()=>{setCheckedOne(!checkedOne)}}
          onChange={setCheckedOne}
                          color="secondary"
                        >
                         
                        </Checkbox>
                        <label htmlFor="default-checkbox" className="ms-2 text-md font-medium text-white" style={{fontWeight:'550'}} >Online Store</label>
                      </div>
           <div className="col-span-2 flex items-center border-b pb-[1rem]" >
                        <Checkbox
                          id="default-checkbox"
                          isSelected={checkedTow}
          onChange={setCheckedTow}
          onClick={()=>{setCheckedTow(!checkedTow)}}
                          color="secondary"
                        >
                        </Checkbox>
                        <label htmlFor="default-checkbox" className="ms-2 text-md font-medium text-white" style={{fontWeight:'550'}}>Point of Sale</label>
                      </div>
           </div>
        </>
        }/>)
}