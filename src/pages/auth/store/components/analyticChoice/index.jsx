import React from 'react'
import Cards from '../cards/index'
import { BoxIcon, Check, Crown, DownloadIcon, Phone, ShoppingBasketIcon, Store, SubscriptIcon, X } from 'lucide-react';
import { GlobeIcon } from '../../../../../components/ui/dashboard/icon';
import { Button } from '@nextui-org/react';
import { FaServicestack } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { IoMdHappy } from 'react-icons/io';
const targetMarketQuestions = [
  {
    name: "Consumers",
    desc: "Sell directly to individual customers by  reaching out to them.",
  },
  {
    name: "Businesses",
    desc: "Sell products or services to other businesses.",
  },
  {
    name: "Niche Audiences",
    desc: "Target specific groups like eco-friendly or tech enthusiasts.",
  },
  {
    name: "Global/Local Markets",
    desc: "Sell to a broad international audience or local market.",
  },
];

const questions = [
    {
      name: "Online Store",
      desc: "Sell through your own website powered by your Supliffy store.",
      icon: <GlobeIcon/>, // Use an appropriate icon here
    },
    {
      name: "Social Media",
      desc: "Sell through your own website powered by your Supliffy store",
      icon: <Phone/>, // You can use a mobile/social media icon
    },
    {
      name: "Marketplaces",
      desc: "Sell on popular marketplaces like Amazon, eBay, or Etsy.",
      icon: <ShoppingBasketIcon />, // Marketplace cart icon
    },
    {
      name: "Physical Store",
      desc: "Sell in a physical retail location with Point-of-Sale integration.",
      icon: <Store />, // Storefront icon
    },
 
  ];
  const budged = [
   
    {
      name: "Small",
      desc: "Less then $250K   ",
      
    },
    {
      name: "Medium",
      desc: "$250K-$1M annually",
    
    },
    {
      name: "Large  ",
      desc: "More then $1M ",
    
    },
    
   
 
  ];
  const productQuestions = [
    {
      name: "Physical Goods",
      desc: "Tangible products like clothing, gadgets, or home goods.",
      icon: <BoxIcon />, // Physical product icon
    },
    {
      name: "Digital Products",
      desc: "Downloadable items like e-books, software, or artwork.",
      icon: <DownloadIcon />, // Digital product icon
    },
    {
      name: "Services",
      desc: "Offer services like consulting, design, or online courses.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
    </svg>
      , // Service-related icon
    },
    {
      name: "Subscription-based Products",
      desc: "Products on a subscription model like boxes or memberships.",
      icon: <SubscriptIcon />, // Subscription icon
    },
  ];
  const descQ = [
    {
      name: "I just started , im   intrested",
      desc: "You just started  online buissnes and want to improve",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
    , // Digital product icon
    },
    {
      name: "Im already selling online or in person",
      desc: "You are somewhere there",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
    </svg>
    , // Digital product icon
    },
    {
      name: "I have a wholsome of sales",
      desc: "You have been active for a long time and have proffesional noladge",
      icon: <Check/>, // Digital product icon
    },
    {
      name: "I have a full buissnes on growth",
      desc: "You have a great buissnes which growing linearlly and want better mangement",
      icon: <Crown/>, // Digital product icon
    },
  ];
  


const SellPosition = ({click}) => {
  return (
    <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
    <div className="grid gap-0 w-full text-[#303030]">
        <h1 className="text-[1.4rem] leading-tight">Where would you like to sell ?</h1>
        <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">Choose as many as you want </p>
    </div>
    <div className='w-full flex items-center'>
      <Cards items={questions} />
    </div>
    <div className='flex items-center justify-end w-full'>
       <div className='flex items-center gap-3'>
       <Button onPress={click} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
       </div>
    </div>
   </div>

  )
}

const brandingStyleQuestions = [
  {
    name: "Minimalist",
    desc: "Simple and clean design with a focus on essentials.",
  },
  {
    name: "Bold & Colorful",
    desc: "Vibrant, eye-catching designs with bold colors.",
  },
  {
    name: "Luxury/High-End",
    desc: "Elegant, sophisticated designs for premium products.",
  },
  {
    name: "Fun & Playful",
    desc: "Bright and lively designs that feel approachable and fun.",
  },
];

const ProductsChoice = ({next , back}) => {
    return (
      <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-5  bg-white shadow-input">
      <div className="grid gap-0 w-full text-[#303030]">
          <h1 className="text-[1.4rem] leading-tight">What products will you sell ?</h1>
          <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">Tell us more about your store </p>
      </div>
      <div className='w-full flex items-center'>
        <Cards items={productQuestions} />
      </div>
      <div className='flex items-center justify-end w-full'>
         <div className='flex items-center gap-3'>
         <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
         <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
         </div>
      </div>
     </div>
    )
  }

  const Describe = ({next , back}) => {
    return (
      <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
      <div className="grid gap-0 w-full text-[#303030]">
          <h1 className="text-[1.4rem] leading-tight">What describes you best ?</h1>
          <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">This helps us suggest the best choices </p>
      </div>
      <div className='w-full flex items-center'>
        <Cards noAvatar={true} items={descQ} />
      </div>
      <div className='flex items-center justify-end w-full'>
         <div className='flex items-center gap-3'>
         <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
         <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
         </div>
      </div>
     </div>
    )
  }
  const Budged = ({next , back}) => {
    return (
      <div className="w-full  flex items-center h-[320px] w-[650px] 2xl:w-[750px] ">
     <div className="w-full  relative  items-start grid rounded-2xl  h-[200px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
      <div className="grid gap-0 w-full text-[#303030]">
          <h1 className="text-[1.4rem] leading-tight">Whats your budged ?</h1>
          <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">Select one to get tailored support. We won't share this with anyone.</p>
      </div>
      <div className='w-full flex items-center'>
        <Cards grid='grid-cols-3' noAvatar={true} items={budged} />
      </div>
      <div className='flex items-center justify-end w-full'>
         <div className='flex items-center gap-3'>
         <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
         <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
         </div>
      </div></div>
     </div>
  
    )
  }
  
  const Market = ({next , back}) => {
    return (
      <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
      <div className="grid gap-0 w-full text-[#303030]">
          <h1 className="text-[1.4rem] leading-tight">What is your markeitng goal ?</h1>
          <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">Our AI ecosystem will provie you the best help</p>
      </div>
      <div className='w-full flex items-center'>
        <Cards noAvatar={true} items={targetMarketQuestions} />
      </div>
      <div className='flex items-center justify-end w-full'>
         <div className='flex items-center gap-3'>
         <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
         <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
         </div>
      </div>
     </div>
    )
  }
  const Branding = ({next , back}) => {
    return (
      <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
      <div className="grid gap-0 w-full text-[#303030]">
          <h1 className="text-[1.4rem] leading-tight">What is you stores braniding style?</h1>
          <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">This helps us suggest the best choices </p>
      </div>
      <div className='w-full flex items-center'>
        <Cards noAvatar={true} items={brandingStyleQuestions} />
      </div>
      <div className='flex items-center justify-end w-full'>
         <div className='flex items-center gap-3'>
         <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
         <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
         </div>
      </div>
     </div>
    )
  }
  const BuildStore = ({next , back}) =>{
    <div className="w-full  relative  items-start grid rounded-2xl  h-[320px] w-[650px] 2xl:w-[750px] text-xl md:text-4xl font-bold  text-white bg-gradient-to-br px-5 pt-4  bg-white shadow-input">
    <div className="grid gap-0 w-full text-[#303030]">
        <h1 className="text-[1.4rem] leading-tight">Choose a name and reigion fro your store</h1>
        <p style={{fontWeight:'500'}} className="text-[.9rem]  text-gray-400 leading-tight">Our AI ecosystem will provie you the best help</p>
    </div>
    <div className='w-full flex items-center'>
      <Cards noAvatar={true} items={targetMarketQuestions} />
    </div>
    <div className='flex items-center justify-end w-full'>
       <div className='flex items-center gap-3'>
       <Button onPress={back} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Back</span></Button>
       <Button onPress={next} className='bg-[#1d1d1d]'  size='sm'><span style={{fontWeight:'550'}} className='text-[.85rem] text-white'>Next</span></Button>
       </div>
    </div>
   </div>
  }
  export {
    SellPosition ,
    ProductsChoice , 
    Describe ,
    Budged , 
    Market ,
    Branding ,
    BuildStore
  }