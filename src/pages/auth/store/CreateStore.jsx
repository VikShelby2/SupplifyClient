import React, { useEffect, useState } from "react";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { storeAtom } from "../../../context/atoms/storeAtom";
import { MultiStepCard } from "./components/MultiStepCard";
import {useNavigate} from 'react-router-dom'
import userAtom from "../../../context/atoms/userAtom";
import loadingAtom from "../../../context/atoms/loadingAtom";
import { FirstStep, SecondStep, StoreForm, ThirdStep } from "./components/steps/steps";
import { MorphingText } from "../../../components/ui/morphyne-text";
import { HoverEffectContainer } from "../../../components/ui/tabssp";
import {Branding, Budged, Describe, Market, ProductsChoice, SellPosition} from "./components/analyticChoice";




const DummyContent = () => {
  return (
  <>
  
  </>
  );
};


export default function CreateStore(){
  const switchTab = (index , tabs , setTabs , setCurrentTab) => {
    // Move the selected tab to the front
    const reorderedTabs = [
      tabs[index],
      ...tabs.filter((_, i) => i !== index),
    ];
    setTabs(reorderedTabs); // Update the tabs with the reordered list
    setCurrentTab(0); // The selected tab is now the first one
  };
  const switchTabBackward = (index, tabs, setTabs, setCurrentTab) => {
    // Move the selected tab to the previous position (backwards)
    const reorderedTabs = [
      ...tabs.filter((_, i) => i !== index),
      tabs[index],
    ];
    setTabs(reorderedTabs); // Update the tabs with the reordered list
    setCurrentTab(0); // Move to the previous tab, or stay at the first tab if already at the start
  };
  
  const [showMessage, setShowMessage] = useState(true);
  const [onlyVisible , setOnlyVisible] = useState(0)

  const tabsCon = [
    {
      title: "Product",
      value: "product",
      content: (
       <SellPosition click={()=>switchTab(1 , tabs  , setTabs ,setCurrentTab )} />
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
      <ProductsChoice back={()=>switchTabBackward(0 , tabs  , setTabs ,setCurrentTab )} next={()=>switchTab(2 , tabs  , setTabs ,setCurrentTab )} />
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <Describe back={()=>switchTabBackward(1 , tabs  , setTabs ,setCurrentTab )} next={()=>switchTab(3 , tabs  , setTabs ,setCurrentTab )} />
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
      <Market back={()=>switchTabBackward(3 , tabs  , setTabs ,setCurrentTab )} next={()=>switchTab(4 , tabs  , setTabs ,setCurrentTab )} />
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <Branding back={()=>switchTabBackward(3 , tabs  , setTabs ,setCurrentTab )} next={()=>switchTab(4 , tabs  , setTabs ,setCurrentTab )} />
      ),
    },
  ];
  const [tabs , setTabs] = useState(tabsCon)
  const [currentTab, setCurrentTab] = useState(0); 
    useEffect(()=>{console.log(currentTab)} , [currentTab])
  useEffect(() => {
  
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 4000);

    
    return () => clearTimeout(timer);
  }, []);

const [image, setImage] = useState(null); 
const navigate = useNavigate()
const setLoading = useSetRecoilState(loadingAtom);
const setUser = useSetRecoilState(userAtom)
const user = useRecoilValue(userAtom)
useEffect(()=>{
console.log(user)
},[user])   
const setStore = useSetRecoilState(storeAtom)
const [input, setInput] = useState({
  storeLocation: '',
  storeName: '',
  ...(user && { userId: user._id }) ,
  storeCurrency: ''  , 
  locationFlag: '' , 
  
});
useEffect(()=>{console.log(input)} , [input])

 const buildStore = async () =>{
 setLoading(true)
  try{
   const res = await fetch("http://localhost:8080/api/add-store" , {
      method: 'POST' ,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
   })
   const data = await res.json();
    if (data.error) {
      console.log("Error", data.error, "error");
      setLoading(false);
      return;
    }
    
    localStorage.removeItem('store');
    localStorage.setItem("store", JSON.stringify(data));
    setStore(data)
    console.log(data)
   navigate(`/store-panel/${data._id}/home`)
    setLoading(false)
  }
  catch(error){
    console.log("Error", error, "error");
    setLoading(false);
  }

}
const token = localStorage.getItem('user-threads')
 const handleSetStoreData = () => {
    setStore((prevUser) => ({
      ...prevUser,
      ...input
    }))
    if (token === null) {
    setUser(null)
      navigate('/signup');
  } else {
     console.log(input)
     buildStore()
    }
     
    }
  const message = [
    'Welcome' ,
    'To' ,
    'Supplify'
  ]
   return(
  <div 
  className="pulsing-gradient"
   style={{
        
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center" ,
         overflow: "hidden"
      }}
  >
    {
      showMessage && (
        <MorphingText texts={message} />
      )
    }
    {!showMessage && (
      <div className="h-[20rem] md:h-[40rem] justify-center items-center [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  my-40 mt-0">
       <HoverEffectContainer
        setTabs={setTabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        tabs={tabs}
        isOnlyCurrentTabVisible={onlyVisible}
        switchTab={switchTab}
       
      />
    </div>
    )}
  
  
  </div>
    )
}