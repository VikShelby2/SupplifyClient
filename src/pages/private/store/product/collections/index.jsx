import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoProductView from '../components/noProductView'
import { storeAtom } from '../../../../../context/atoms/storeAtom'
import { useRecoilValue } from "recoil"
import Table from './components/tabel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../components/ui/tabs'
import { FaFilter } from "react-icons/fa";
import NormalModal from '../../../../../components/ui/basics/modal-normal';
import { Input } from '../../../../public/Home/components/input';
import FilterProducts from '../components/filterProducts';
import { handleAddTab, handleListTabs } from '../../../../../api/store/products';
const CollectionPage = () => {
const [collections , setCollections] = useState([])

const store = useRecoilValue(storeAtom)
useEffect(()=>{
  const fetchCollections= async () =>{
    const res  = await fetch('http://localhost:8080/api/product/collection/list' , {
      method: 'POST' ,
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({ storeId : store._id})
    })
    try{
    const data = await res.json() 
  
     setCollections(data.collections.collections)
    console.log(data)
    } catch(error){
    console.error('Error: ' , error)
    }
  
  }
 
  fetchCollections()

},[store._id])
useEffect(()=>{
  const fetchTabs = async() =>{
    await handleListTabs(store._id, setTabs , 'collection-main-table' )
   
  }
   fetchTabs()
} , [store])



const [openSearch , setOpenSearch] = useState(false)
const [selectedProjects , setSelectedProjects] = useState([])
const [isSelected , setSelected] = useState(false)
const [openNewTabModal , setOpenNewTabModal] = useState(false)
const [tabName , setTabName] = useState('')
const [tabs , setTabs] = useState([])
const [filterdTabs , setFilterdTabs] = useState([])
useEffect(()=>{
  if(tabs.length > 0 ){
    const filtered = tabs.filter((item)=>{
  return item.table === 'collection-main-table'
    
 })
 if(filtered){
     setFilterdTabs(filtered)
     }
  }
 
}   , [tabs])
  return ( 
    <>
    <div className='w-full h-full flex items-center flex-col gap-10'>
      <div className='w-full flex items-center justify-between'>
         <div className='flex items-center'>
           <h1 className='text-[1.8rem] font-bold text-black'>Collections</h1>
         </div>
        { collections.length > 0  && (
            <div className='flex items-center justify-center gap-3'>
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
           <Link to={'add'}>
             <button className='-btn-op-ad'>
             Add Collection
            </button>
           </Link>
            
         </div>)}
      </div>
      <main className={`w-full flex  ${openSearch ? 'flex-row gap-3' : ''} flex-row gap-3`}>
    
     { collections.length === 0 && (  
     <NoProductView />)}
     { collections.length > 0 &&(
     
      <div className=' relative rounded-[.75rem] h-fit shadow-input p-[5px] bg-[#fff]  w-full ' >
      <Tabs defaultValue='all'>
       <div className='w-full flex  items-center  justify-between'>
      
     { !openSearch  &&( 
      <div className=' p-1   rounded-t-xl '>
      <TabsList className="flex bg-white items-start justify-start  ">
      
      <TabsTrigger value="all"> All
      </TabsTrigger>
      {filterdTabs.length > 0 && filterdTabs.map((tab)=>(
        <TabsTrigger key={tab._id} value={tab.name}>
        {tab.name}
        </TabsTrigger>
      ))}
      <div onClick={()=>{setOpenNewTabModal(true)}}  className='inline-flex  items-center justify-center whitespace-nowrap rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-violet-600     data-[state=active]:text-white  data-[state=active]:shadow-sm hover:bg-violet-600 hover:text-white text-black  flex items-center px-1 gap-1 text-black fill-none hover:text-white hover:fill-white' value="">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-black hover:text-white" >
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
      
      
      <div onClick={()=>{setOpenSearch(!openSearch)}} className='inline-flex  items-center justify-center whitespace-nowrap rounded-[.5rem] px-[12px] py-[4px] text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-violet-600     data-[state=active]:text-white  data-[state=active]:shadow-sm hover:bg-violet-600 hover:text-white text-black  flex items-center px-1 gap-1 text-black fill-none hover:text-white hover:fill-white' value=""> <svg xmlns="http://www.w3.org/2000/svg" fill="hover:text-red-200" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg><FaFilter />
</div>
   
    </TabsList>
    

      </div>
       

      </div>
      <TabsContent className='m-0' value='all' >
      <div className=' items-center  shadow-input h-full  rounded-xl bg-white rounded-xl relative justify-center overflow-x-auto w-full  '>
     
     <Table selectedProjects={selectedProjects} isSelected={isSelected} setIsSelected={setSelected} setSelectedProjects={setSelectedProjects} filteredProducts={collections} />
     </div>       
      
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
      
    
       
     </div>

    )} 

    {openSearch && (  <FilterProducts />)}
      </main>
    </div>
    <NormalModal press={()=>{handleAddTab(tabName , store._id , 'collection-main-table' , setTabs )}} open={openNewTabModal} setOpen={setOpenNewTabModal} title={'Create tab'}   actionText={'Save'} >
      <div className='w-full flex flex-col '>
       <h1>Tab Name</h1>    
       <Input value={tabName} onChange={(e)=>{setTabName(e.target.value)}} variant="primaryWhite" />
      </div>
    </NormalModal>
    </>
  )
}

export default CollectionPage

