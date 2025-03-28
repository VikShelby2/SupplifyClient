import React , { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Label } from "../../public/Home/components/label";
import { cn } from "../../../lib/utils";
import { Input } from "../../public/Home/components/input";
import { storeAtom } from "../../../context/atoms/storeAtom";
import zxcvbn from 'zxcvbn';
import { HandleSignUp } from "../../../api/auth";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
  } from "@tabler/icons-react";

import WhiteLogo from "../../../assets/public/home/home-logo-purple.svg";
import AuthLayout from "../../../layout/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function SignUp(){
 
    const {user  , isAuthinticated} = useSelector((state)=>state.user)
    const setStore  = useSetRecoilState(storeAtom)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    const store = useRecoilValue(storeAtom);
    const [input , setInput] = useState({
      name:'',
      username:'',
      email:'',
      collectionName: 'MyHome' ,
      password:'',
      storeName: store  ? store.storeName : 'MyStore'  ,
      storeLocation: store ? store.storeLocation :''
    }
    ) 
   
    const [passwordScore, setPasswordScore] = useState(0);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
      };
       

    useEffect(() => {
      checkStrength();
    }, [input.password]);
  
    const checkStrength = () => {
      if (!input.password) return setPasswordScore(0);
      setPasswordScore(zxcvbn(input.password).score + 1);
    }; 
  useEffect(()=>{
    console.log(store)
    if (store === null) {
       navigate('/create-store');
      }}
    , [store])  
    if (store === null) {
    return navigate('/create-store');
    }
    
    return(
  <AuthLayout>
     <div className="center " >
     <h1 className="text-3xl tracking-[-0.10em] text-black font-bold">Supplify</h1>
        
        <img className="size-7 flex items-center justify-center" src={WhiteLogo} />
        </div>
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to SupplifyX | Platforms
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Login and start your free trail . Enjoy it!
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" value={input.name}    onChange={(event) => {
                setInput({...input , name: event.target.value});
              }}/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" value={input.username}  onChange={(event) => {
                setInput({...input , username: event.target.value});
            
              }} />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" value={input.email}      onChange={(event) => {
                setInput({...input , email: event.target.value});
           
              }}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" value={input.password}   onChange={(event) => {
                  setInput({...input , password: event.target.value});
                 
                }} />
        </LabelInputContainer>
        <div className="flex " style={{marginRight:'.5rem' , marginLeft:'.5rem' , marginBottom:'1rem'}}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-1/5 px-1">
              <div
                className={`h-2 rounded-xl transition-colors ${i < passwordScore ? (passwordScore <= 2 ? 'bg-red-400' : (passwordScore <= 4 ? 'bg-yellow-400' : 'bg-green-500')) : 'bg-gray-200'}`}
              />
            </div>
          ))}
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={()=>{
            
              HandleSignUp(input , navigate   ,dispatch , setStore  ) 
           
           }}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
         
        </div>
      </form>
  </AuthLayout>)
}
const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className,
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
  
  