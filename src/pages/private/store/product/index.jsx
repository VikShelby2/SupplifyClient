import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import NoProductView from './components/noProductView'
import {storeAtom } from '../../../../context/atoms/storeAtom'
import { useRecoilValue } from "recoil"
import Table from './components/tabel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs'
import {Spinner} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/dropdown";
import NormalModal from '../../../../components/ui/basics/modal-normal';
import { Input } from '../../../public/Home/components/input';
import FilterProducts from './components/filterProducts';
import { handleAddTab, handleEditTab, handleListTabs, listProducts } from '../../../../api/store/products';
import {  ChevronsUpDown, Factory } from 'lucide-react';
import TableEdit from './components/tableEdit';
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../../../context/redux/productsSlice'
const ProductPage = () => {
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);
const [noProducts , setNoProducts] = useState(false)
const [activeTab , setActiveTab] = useState('all')
const [newTabId , setNewTabId] = useState('')
const store = useRecoilValue(storeAtom)
const dispatch = useDispatch()

const tabs = useSelector((state)=> state.tabs.tabs)

const [drafted , setDrafted] = useState([])
const filterFunction = (arr , detail , value) =>{
   return arr.filter((item)=>{
     return item.status === detail
   }) 
}
useEffect(()=>{
if(products.length > 0){
  const filterd = filterFunction(products , 'Drafted' , 'status')
  if(filterd){
    setDrafted(filterd)
  }
}
} , [products])
const [archived , setArchied] = useState([])

useEffect(()=>{
if(products.length > 0){
  const filterd = filterFunction(products , 'Archived' , 'status')
  if(filterd){
    setArchied(filterd)
  }
}
} , [products])
const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
const [openSearch , setOpenSearch] = useState(false)
const [editingTabName , setEditingTabName] = useState('')
const [selectedProjects , setSelectedProjects] = useState([])
const [isSelected , setSelected] = useState(false)
const [openNewTabModal , setOpenNewTabModal] = useState(false)
const [tabName , setTabName] = useState('')
const [eidtingTab , setEditingTab] = useState(false)
const [noOption , setNoOption] = useState(false)
const toggleEdit = (tabName) =>{
   setEditingTab(!eidtingTab)
   setEditingTabName(tabName)

}
const toggleTab = (id , tabName) =>{

  handleTabClick(tabName)
setNewTabId(id)
}
const handleTabClick = (tabName) => {
  if (activeTab === tabName) {
    // If the tab is already active, toggle the dropdown
    setIsDropdownOpen(true);
  } else {
    // Switch to the clicked tab and hide the dropdown
    setActiveTab(tabName);
    setIsDropdownOpen(false);
  }
};
useEffect(()=>{
  console.log(archived)
}   , [archived])
  return ( 
    <>
    <div className='w-full h-full flex items-center flex-col gap-10'>
      <div className='w-full flex items-center justify-between'>
         <div className='flex items-center'>
           <h1 className='text-[1.8rem] font-bold text-black'>Products</h1>
         </div>
        { !loading && products.length > 0  && (<div className='flex items-center justify-center gap-3'>
         <button className="pr-up-btn" size={'sm'}>
          
           <div className='flex items-center justify-between gap-1'> 
            Export
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>


           </div>
           </button >
           <button  className="pr-up-btn" size={'sm'}>
           <div className='flex items-center justify-between gap-1'> 
            Import
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
</svg>

           </div>
          
           </button>
           <Link to={`add`}>
             <button className='-btn-op-ad'>
             Add Product
            </button>
           </Link>
            
         </div>)}
      </div>
      <main className={`w-full flex  ${openSearch ? 'flex-row gap-3' : ''} flex-row gap-3`}>
    
     { !loading && noProducts && !noOption && (  
     <NoProductView />)}
     { !loading && products.length > 0 &&(
     
      <div className=' relative rounded-[.75rem] h-fit  p-[5px] bg-[#fff]  w-full ' >
      <Tabs defaultValue='all'>
       <div className='w-full flex  items-center  justify-between'>
      
     { !openSearch  &&( 
      <div className=' p-1   rounded-t-xl max-w-[500px] overflow-auto scrollbar-hide '>
      <TabsList className="flex bg-white items-start justify-start  ">
      
      <TabsTrigger  onClick={()=>{setActiveTab('all')}} value="all"> All
      </TabsTrigger>
      <TabsTrigger onClick={()=>{setActiveTab('drafted')}}  value="draft">Draft</TabsTrigger>
      <TabsTrigger onClick={()=>{setActiveTab('archived')}} value="Archived">Archived</TabsTrigger>
      {tabs.map((tab) => {
  const isActive = activeTab === tab.name; // Store the condition in a variable
  return isActive ? (
    <Dropdown 
    classNames={{
       
      content: "p-0 border-none border-divider bg-background w-auto    min-w-[8rem]",
    }}
    placement='bottom-start' disableAnimation key={tab._id}>
      <DropdownTrigger>
        <TabsTrigger
          value={tab.name}
          onClick={() => toggleTab(tab._id , tab.name)}
          className="gap-2"
        >
          {tab.name} {isActive && (<ChevronsUpDown className='size-[.8rem]' />)}
        </TabsTrigger>
      </DropdownTrigger>
     
        <DropdownMenu>
          <DropdownItem onClick={()=>{toggleEdit(tab.name)}} startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
           </svg>
} key="action1">Rename View</DropdownItem>
          <DropdownItem color='secondary' startContent={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>

} key="action2">Dublicate View</DropdownItem>
          <DropdownItem startContent={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
} color='danger' key="action4">Delete View</DropdownItem>
        </DropdownMenu>
    
    </Dropdown>
  ) : (
    <TabsTrigger
      key={tab._id}
      value={tab.name}
      onClick={() => handleTabClick(tab.name)}
    >
      {tab.name}
    </TabsTrigger>
  );
})}

      
           

      <div onClick={()=>{setOpenNewTabModal(true)}}  className='inline-flex  items-center justify-center whitespace-nowrap group rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-violet-600     data-[state=active]:text-white  data-[state=active]:shadow-sm hover:bg-violet-600 hover:text-white text-black  flex items-center px-1 gap-1 text-black fill-none hover:text-white hover:fill-white' value="">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5  text-black group-hover:text-white" >
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
</div>

    </TabsList>
      </div>
      )}
      {
        openSearch && (
          <div className='flex items-center p-1'>
            <Input placeholder="Search for product" variant="primaryWhiteSmall" />
          </div>
        )
      }
      <div className='flex  items-center  '>
      <TabsList className="flex bg-white items-start  justify-start  ">
      
      
      <div onClick={()=>{setOpenSearch(!openSearch)}} className={`inline-flex  items-center justify-center whitespace-nowrap rounded-[.5rem] 
        ${openSearch ?'pr-up-btn-isActive' : 'pr-up-btn'} px-[12px] py-[4px] text-sm font-medium
        `} value="">
         <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          className='size-6 text-black'
          stroke="black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          ></path>
        </svg>
        </div>
    </TabsList>
    

      </div>
       

      </div>
      <TabsContent className='m-0' value='all' >
    
      {noOption ? (
      <div
      className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
      >
         <h1>No products found</h1>
         <span className='hover-underline-animation-primary'>Check out other products</span>
     </div>
    ) : (  <div className=' items-center  shadow-input h-full  rounded-xl bg-white rounded-xl relative justify-center overflow-x-auto w-full  '>
      <Table selectedProjects={selectedProjects} isSelected={isSelected} setIsSelected={setSelected} setSelectedProjects={setSelectedProjects} filteredProducts={products} />
    </div>         )}
     
   
      
      </TabsContent>
    
        <TabsContent className='m-0' value='draft' >
        {drafted.length > 0 ? (
          <div
          className="items-center w-full shadow-input h-full rounded-xl bg-white relative justify-center"
          >
         <Table selectedProjects={selectedProjects} isSelected={isSelected} setIsSelected={setSelected} setSelectedProjects={setSelectedProjects} filteredProducts={drafted}  />
         </div>
        ): noOption ?
         (
          <div
          className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
          >
             <h1>No products found</h1>
             <span className='hover-underline-animation-primary'>Check out other products</span>
         </div>
        ) : (
          <div
       className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
       >
          <h1>No drafted products</h1>
          <span className='hover-underline-animation-primary'>Learn more about drafted products</span>
      </div>
        )}
         
      
      </TabsContent>
      <TabsContent className='m-0' value='Archived' >
        {archived.length > 0 ? (
          <div
          className="items-center w-full shadow-input h-full rounded-xl bg-white relative justify-center"
          >
            
         <Table selectedProjects={selectedProjects} isSelected={isSelected} setIsSelected={setSelected} setSelectedProjects={setSelectedProjects} filteredProducts={archived} />
         </div>
        ):  noOption ?
        (
         <div
         className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
         >
            <h1>No products found</h1>
            <span className='hover-underline-animation-primary'>Check out other products</span>
        </div>
       ) :(
          <div
       className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
       >
          <h1>No archived products</h1>
          <span className='hover-underline-animation-primary'>Learn more about archived products</span>
      </div>
        )}
         
      
      </TabsContent>
      {
        tabs.length > 0 && tabs.map((item)=>(
          <TabsContent value={item.name}>
      <div
       className="items-center w-full shadow-input flex text-center flex-col h-[200px] rounded-xl bg-white relative justify-center"
       >
          <h1>No products in {item.name}</h1>
          
      </div>
          </TabsContent>
        ))
      }
      </Tabs>
     

  
       {!isSelected && (
        <TableEdit selected={selectedProjects.length} />
       )}
     </div>

    )} 
   {
    loading && (
      <div className=' relative rounded-[.75rem] h-[400px] flex justify-center items-center shadow-input p-[5px] bg-[#fff]  w-full ' >
       <Spinner />
      </div>
    )
   }
    {openSearch && (  <FilterProducts setNoOption={setNoOption} products={products} setProducts={dispatch(setProducts)} />)}
      </main>
    </div>
   
    <NormalModal isNewTab={true} storeId={store._id} tabType={'product-main-table'} tabName={tabName} press={()=>{console.log('fsdfsf')}} open={openNewTabModal} setOpen={setOpenNewTabModal} title={'Create tab'}   actionText={'Save'} >
      <div className='w-full flex flex-col '>
       <h1>Tab Name</h1>    
       <Input value={tabName} onChange={(e)=>{setTabName(e.target.value)}} variant="primaryWhite" />
      </div>
    </NormalModal>
    <NormalModal press={()=>{handleEditTab(newTabId , editingTabName)}} open={eidtingTab} setOpen={setEditingTab} title={'Edit tab'}   actionText={'Save'} >
      <div className='w-full flex flex-col '>
       <h1>Edit Tab</h1>    
       <Input value={editingTabName} onChange={(e)=>{setEditingTab(e.target.value)}} variant="primaryWhite" />
      </div>
    </NormalModal>
 
    </>
  )
}

export default ProductPage



