import React, { useEffect, useState } from "react";
import { Center } from '@chakra-ui/react';
import logo  from '../../../assets/public/home/home-logo-purple.svg'
import AuthLayout from "../../../layout/auth";
import ListStore from "./components/list";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {Pencil1Icon} from '@radix-ui/react-icons'
export default function UserSelect() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [edit , setEdit] = useState([])
  useEffect(() => {
    // Retrieve accounts from localStorage
    localStorage.removeItem('user-threads')
    localStorage.removeItem('store')
    const accountsString = localStorage.getItem('accounts');
    if (accountsString) {
      const parsedAccounts = JSON.parse(accountsString);
      setAccounts(parsedAccounts);
    } else {
      // Redirect to sign-in page if no accounts are found
      navigate('/signin');
    }
  }, [navigate]);
  
  const handleAccountSelect = (account) => {
    // Example action on account select (you can adjust this as per your requirement)
    console.log("Selected Account:", account);
  
    //dispatch(setUser({email: account.user.email}))
    navigate('/signIn'); // Example navigation to '/store-list'
  };
  const handleDeleteAccount = (accountToDelete) => {
    const updatedAccounts = accounts.filter(account => account.user.email !== accountToDelete.user.email);
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);
    if (updatedAccounts.length === 0) {
      navigate('/signUp');
    }
  };

  return (
    <AuthLayout classNames={'md:h-[500px] lg:h-auto'}>
      <Center>
        <img src={logo} alt="logo" style={{ height: '3.5rem', paddingBottom: '1rem' }} />
      </Center>
      <div className="w-full items-center flex justify-between px-[10px]">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Choose account
        </h2>
        <button className="p-1 gap-1 border rounded-md flex items-center justify-between px-2">
        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" /></svg>
          Edit
        </button>
      </div>

      <div className="store-list-container">
        <div className="store-list-wrapper">  
          {accounts.length > 0 && accounts.map((account, index) => (
            <div
              key={index}
              onClick={() => handleAccountSelect(account)}
              className="cursor-pointer" // Added cursor-pointer for better UX
            >
              <ListStore
                className={'mt-3 '}
                title={account.user.email} // Assuming 'name' is the property you want to display
                svg={account.user.svg && (
                  <div className="w-[40px]" dangerouslySetInnerHTML={{ __html: account.user.svg }} />
                )}
              /> 
            </div> 
          ))}
    
        </div>
     
      </div>
      <div className="px-[10px]">
         <Link to='/signUp'><ListStore
                className={'mt-3 hover:bg-[#8c51f2] bg-[#8c51f2] text-black '}
                title={'Create new account'} // Assuming 'name' is the property you want to display
                col={'text-black'}
              /></Link> 
      </div>
   
    </AuthLayout>
  );
}
