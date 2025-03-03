import React, { useEffect, useState } from "react";
import { Center } from '@chakra-ui/react';
import logo from '../../../assets/public/home/home-logo-purple.svg';
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../../context/atoms/userAtom";
import AuthLayout from "../../../layout/auth";
import ListStore from "./components/list";
import { Link, useNavigate } from "react-router-dom";
import { storeAtom } from "../../../context/atoms/storeAtom";
import { encryptData } from "../../../lib/crypto";

export default function UserStore() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const setStore = useSetRecoilState(storeAtom);
  const [stores, setStores] = useState([]);


  const handleStoreSelect = (store) => {
    console.log(store);
    setStore(store);
    localStorage.removeItem('store'); // Remove the existing store object
    localStorage.setItem("store", encryptData(store));
    navigate(`/store-panel/${store._id}/home`); // Navigate to the store's home panel
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/list-store", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        });
        const data = await res.json();
        setStores(data);
      } catch (error) {
        console.log("Error", error, "error");
        navigate("/signIn")
      }
    };

    fetchList();
  }, [user._id]);

  console.log(stores);

  return (
    <AuthLayout classNames={'md:h-[400px]  xl:h-[600px]'}>
      <Center>
        <img src={logo} alt="logo" style={{ height: '3.5rem', paddingBottom: '1rem' }} />
      </Center>
      <div className="w-full items-center flex justify-between ">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Choose a Store
        </h2>
        <Link to='/create-store'><button className="-btn-op-ad">
          Create Store
        </button></Link>
      </div>
      <div className="w-full flex items-start justify-start p-[10px] pl-0">
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Choose a store you own personally or with a team
      </p>
      </div>
    

      <div className="store-list-container">
        <div className="store-list-wrapper max-h-[200px] xl:max-h-full">
          {stores.length > 0 && stores.map((store) => (
            <div 
              key={store._id}
              onClick={() => handleStoreSelect(store)} >
              <ListStore 
                className={'mt-3 '}
                title={store.storeName} 
                svg={store.svgData && (
                  <div className="w-[40px]" dangerouslySetInnerHTML={{ __html: store.svgData }} />
                )} 
              /> 
            </div> 
          ))}
        
        </div>
       
      </div>
    </AuthLayout>
  );
}
