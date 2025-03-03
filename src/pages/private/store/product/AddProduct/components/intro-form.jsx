import React, { useState } from "react";
import { Input } from "../../../../../public/Home/components/input";
import FormCard from "../../../../../../components/ui/basics/form-card";
import Icon from "../../../../../../components/ui/basics/Icon";
import Button from "../../../../../../components/ui/basics/button";
import RichTextEditor from "../../../../../../lib/rich-text-editor";
import FormLabel from "./label-form";
export default function Intro({
    files,
    setFiles , 
    previews , 
    setPreviews ,
    setInput ,
    input ,
    Media
}){
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };  const handleDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
 
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };
    return(
        <FormCard cardStyle={'bg-white shadow-input rounded-[.75rem]'} contentStyle={"mt-[1.3rem]"}>
           <div className="grid gap-6"  >   
                    <div className="grid gap-1 items-center jusitfy-start" >
                     <div className='grid pl-[2px] '>     
                      <FormLabel  className={'text-black'}>
                       Title
                      </FormLabel>
                          <p className='text-gray-400' style={{
                            fontWright:'450',
                            fontSize:'.85rem'
                          }}>Make it short  , descriptive and exiting</p>
                          </div>  
                                    <Input type="text" id="small-input" placeholder="T-shirt with long sleeve"
                                  variant="primaryWhite"
                                             name="title"
                  value={input.title}
                  onChange={handleChange}
                              />
                        </div>
                        <div className="grid gap-3">
                        <div className='grid pl-[2px] '>     
                      <FormLabel className={'text-black'}>
                        Description
                      </FormLabel>
                          <p className='text-gray-400' style={{
                            fontWright:'450',
                            fontSize:'.85rem'
                          }}>Start with a brief overview that describes your item's best features</p>
                          </div>  
                       <RichTextEditor />
                        </div>
           {   Media && 
           (  <div className="grid gap-3">
                <div className='grid pl-[2px] '>     
                <FormLabel  className={'text-black'}>
                       Media
                      </FormLabel>
                          <p className='text-gray-400' style={{
                            fontWright:'450',
                            fontSize:'.85rem'
                          }}>Choose the perfect image that sponsors your product</p>
                </div>  
                      { files.length > 0  ? (
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                     <div className='pr-gr'> 
                       <div className='pr-in-gr'>
                         <div className='test'>
                      <img key={index} src={preview} alt={`preview ${index}`} style={{
                            position: 'absolute',
                            display: 'block',
                            maxWidth: '100%',
                            maxHeight: '100%'
                       }} />
                       
                      </div>
                      <div className='ovl-pr-gr'>
                        <div className='ovl-pr-div'>
                        <button onClick={()=>{handleDelete(index)}} className='ovl-pr-btn'>
                        <Icon name="trash" className="text-red-300" />
                        </button>
                        </div>
                        <span className='ovl-pr-spn'>
                        <span className='ovl-pr-spn-sc'></span>
                        </span>
                      </div>
                      </div></div> 
                   ))}
                   <div className='pr-up-gr'>
                     <div className='pr-up-div'>
                      <div className='pr-up-gri'> 
                      <button className='pr-up-btn' onClick={(e) => {
          e.preventDefault();
          document.getElementById('dropzone-file').click();
      }}>
                      <span className='pr-up-spn'>Upload</span>
                     
                      </button>  
                       <input id="dropzone-file" type="file" class="hidden" multiple onChange={handleFileChange}/>
                      </div>
                      <div className='pr-up-gri-src'>
                      <button size={'sm'} >
                        <span className='pr-up-spn-src  hover-underline-animation-primary' >Select File</span>
                      </button></div>
                     </div>
  
                   </div>
                
                   </div>) : 
                          ( <div>
                      <div class="flex items-center justify-center w-full">
                                            <label for="dropzone-file"  class="flex flex-col items-center justify-center w-full h-64 border-2 shadow-sm border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                         <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mb-[.3rem] fill-white text-[#8c52fe]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
  
                                   <div className='flex items-center justify-center gap-3 mb-2'> 
                                   <div className='pr-up-gri'  style={{fontSize:'.75rem' , fontWeight:'650'}}> 
                                    <Button size={'sm'}  onClick={(e) => {
                                     e.preventDefault();
                                     document.getElementById('dropzone-file').click();}} >
                                       <span className='pr-up-spn text-sm'>Upload</span> 
                                       </Button>  
                                     </div>
                                     <div className='pr-up-gri'  style={{fontSize:'.75rem' , fontWeight:'650'}}>  
                         <button size={'sm'} className='pr-up-btn-src' >
                        <span className='pr-up-spn-src text-sm hover-underline-animation-primary ' >Select File</span>
                      </button>
                      </div>
                      </div>
                      <p class="text-xs mt-[.15rem] text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                 
                                   </div>
                           <input id="dropzone-file" type="file" class="hidden" multiple onChange={handleFileChange}/>
                              </label>
                              </div>     
                      </div>)}</div>
                      
                      )}
                      </div>
        </FormCard>        
    )
}