import React , {useEffect, useState} from "react";
import { ageRanges , productGenders , materials } from "../../../../../../data/constants";
import { Select, SelectItem  ,Checkbox } from "@nextui-org/react";
import { Card, CardContent, CardFooter } from "../../../../../../components/ui/card";
import FormLabel from "./label-form";
export default function Details({
  isCheckedRadio ,
  isCheckedRadioTow ,
  handleToggleRadio ,
  handleToggleRadioTow ,
  selectedMaterial,
  setSelectedMaterial,
  selectedAgeRange,
  setSelectedAgeRange,
  selectedGender,
  setSelectedGender

}){
  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  };
   const [checked, setChecked] = useState(false);
  const handleAgeRangeChange = (e) => {
    setSelectedAgeRange(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };
    return(
      <>
      <Card x-chunk="dashboard-07-chunk-0" class="bg-white shadow-input rounded-[.75rem] gap-2">
                  <CardContent className="mt-[1.3rem]">
                  <div className='grid '>
                  <div className='flex w-full items-center justify-between pl-[2px] '>     
                   <FormLabel className={'text-black'} >Details</FormLabel>
                   <div className=' flex items-center flex-col'>
        <div className=' flex items-center justify-between mr-6'>
          <div className='flex items-center justify-start '>
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              radius='sm'
              color='secondary'
            />
            <label htmlFor='default-checkbox' className='text-sm font-medium text-black'>
              Add details for this product
             </label>
          </div>
        </div>
                   </div>
                        
                        </div>  
                     
                   {checked && (<>    <div className="w-full pl-[2px] flex items-center justify-between"><p className='text-gray-400' style={{
                          fontWright:'450',
                          fontSize:'.85rem'
                        }}>Add what best describes your</p></div>
                   <div className='grid grid-cols-2 items-center justify-between'>
                        <div className='p-2 px-0  flex items-center jusitfy-start w-full'>
                        <FormLabel className={'text-black'} >Condition</FormLabel>
                        </div>
                        <div  className='p-2 flex items-center gap-2 jusitfy-start w-full'>
                        <div className='w-[50%]'>
      <input 
        className="sr-only peer" 
        type="radio" 
        value="new" 
        name="answer" 
        id="answer_yes" 
        checked={isCheckedRadio} 
        onChange={() => {}} 
      />
      <label 
        className={`p-2 flex items-center gap-2 justify-start w-full border border-2 rounded-lg cursor-pointer focus:outline-none  ${isCheckedRadio ? 'ring-[#8c52f1] ring-offset-2 ring-2 text-black border-black' : ' text-black '}`} 
        htmlFor="answer_yes"
        onClick={()=>{handleToggleRadio('New')}}
      >
    <input id="country-option-1" type="radio" name="countries" value="used" class=" custom-radio h-5 w-5 border-gray-300  focus:text-black " aria-labelledby="country-option-1" aria-describedby="country-option-1"         checked={isCheckedRadio} />  New
      </label>
                           </div>
                           <div className='w-[50%]'>
       <input 
        className="sr-only peer" 
        type="radio" 
        value="yes" 
        name="answer" 
        id="answer_yes" 
        checked={isCheckedRadioTow} 
        onChange={() => {}} 
      />
      <label 
        className={`p-2 flex items-center gap-2 justify-start w-full  border border-2  rounded-lg cursor-pointer focus:outline-none  ${isCheckedRadioTow ? 'ring-[#8c52f1] ring-offset-2 ring-2 border-black ' : ''} text-black`} 
        htmlFor="answer_yes"
        onClick={()=>{handleToggleRadioTow('Used')}}
      >
    <input id="country-option-1" type="radio" name="countries" value="USA" class=" custom-radio h-5 w-5 border-gray-300  focus:text-black " aria-labelledby="country-option-1" aria-describedby="country-option-1"         checked={isCheckedRadioTow} /> Used
      </label>
                           </div>
                        </div>

                    </div>  
                    <div className='grid grid-cols-2 items-center justify-between'>
                    <div className='p-2 px-0  flex items-center jusitfy-start w-full'>
                    <FormLabel className={'text-black'} >Material</FormLabel>
                    </div>   
                        <div  className='p-2 flex items-center gap-2 jusitfy-start w-full'>
                      <SelectBasic arr={materials} value={selectedMaterial} setValue={setSelectedMaterial} handleChange={handleMaterialChange} label={'Materials'} placeholder={'materials'}/>
                    </div>
                    </div>
                    <div className='grid grid-cols-2 items-center justify-between'>
                    <div className='p-2 px-0 flex items-center jusitfy-start w-full'><FormLabel className={'text-black'} >Age range</FormLabel></div>   
                        <div  className='p-2 flex items-center gap-2 jusitfy-start w-full'>
                      <SelectBasic arr={ageRanges} value={selectedAgeRange} setValue={setSelectedAgeRange} handleChange={handleAgeRangeChange} label={'Age Ranges'} placeholder={'Age Range'}/>
                    </div>
                    </div>
                    <div className='grid grid-cols-2 items-center justify-between'>
                    <div className='p-2b px-0  flex items-center jusitfy-start w-full'>
                        <FormLabel className={'text-black'} >Gander</FormLabel>
                    </div>   
                        <div  className='p-2 flex items-center gap-2 jusitfy-start w-full'>
                      <SelectBasic arr={productGenders} value={selectedGender} setValue={setSelectedGender} handleChange={handleGenderChange} label={'Gender'} placeholder={'gender for your product'}/>
                    </div>  </div></>
                    )}
                  
                    </div>         
                  </CardContent>
                  {
     !checked && ( <CardFooter class="border-t p-[16px]">
<div className='w-full flex items-center justify-start text-gray-500 text-[.8rem]'>
         <h1>Customers won’t enter shipping details at checkout. Learn how to set up your store for digital products or services.</h1>
        </div>

     </CardFooter> )
       }
                </Card>
      </> 
    )
}

function SelectBasic({arr , label , placeholder , value , setValue  , handleChange}) {

    return (
        <Select
            items={arr}
            variant='bordered'
            label={label}
            onChange={handleChange}
            selectedKeys={[value]}
            placeholder={`Select a ${placeholder}`}
            className="max-w-xs"
        >
            {(el) => <SelectItem  key={el.label}>{el.label}</SelectItem>}
        </Select>
    );
}
