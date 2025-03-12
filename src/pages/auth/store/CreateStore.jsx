import React, { useEffect, useState } from "react";

import { MorphingText } from "../../../components/ui/morphyne-text";
import { HoverEffectContainer } from "../../../components/ui/tabssp";
import {Branding, Describe, Market, ProductsChoice, SellPosition} from "./components/analyticChoice";
import { useSelector } from "react-redux";
import StoreForm from "./components/storeForm";



export default function CreateStore({}){
  const [animationTime , setAnimationTime] = useState('5s')
  const [style , setSyle] = useState(
    {
      display: "flex",
      justifyContent: "center",
      alignItems: "center" ,
       overflow: "hidden" ,
      backgroundColor:' hsla(0,0%,100%,1) ' ,
     minHeight: "100vh" ,
    backgroundImage: ' radial-gradient(at 17% 0%, hsla(281deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 98% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 33% 87%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 65% 86%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 61% 21%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 36% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 31% 31%, hsla(248deg, 100%, 66%, 0.8) 0, transparent 50%), radial-gradient(at 42% 32%, hsla(248deg, 83%, 76%, 1) 0, transparent 50%), radial-gradient(at 0% 1%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 10% 66%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 64% 56%, hsl(222.1, 100%, 57.3%) 0, transparent 50%), radial-gradient(at 68% 46%, hsla(180deg, 43%, 53%, 1) 0, transparent 50%), radial-gradient(at 99% 98%, hsla(300deg, 0%, 94%, 1) 0, transparent 50%), radial-gradient(at 67% 59%, hsla(194deg, 100%, 73%, 1) 0, transparent 50%)' ,
    animation: `pulseGradient 5s infinite alternate ease-in-out`
    }
  )

  
  const switchTab = (index , tabs , setTabs , setCurrentTab) => {
    // Move the selected tab to the front
    const reorderedTabs = [
      tabs[index],
      ...tabs.filter((_, i) => i !== index),
    ];
    setTabs(reorderedTabs); // Update the tabs with the reordered list
    setCurrentTab(0); // The selected tab is now the first one
  };
  const [showStoreForm , setShowForm] = useState(false)
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
const {user , isAuthinticated} = useSelector((state)=>state.user)

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
        <Branding back={()=>switchTabBackward(3 , tabs  , setTabs ,setCurrentTab )} next={()=>setShowForm(true)} />
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

  useEffect(() => {
    console.log("Animation Time updated:", animationTime);
 }, [animationTime]);
 
  const message = [
    'Welcome' ,
    'To' ,
    'Supplify'
  ]
   return(
  <div 
  className=""
   style={style}
  >
    {
      showMessage && (
        <MorphingText texts={message} />
      )
    }
    {!showMessage && !showStoreForm && (
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
    {!showMessage && showStoreForm && (
      <StoreForm setAnimationTime={setSyle} />
    )}
  
  </div>
    )
}