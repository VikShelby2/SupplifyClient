import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "./context/atoms/userAtom";
import loadingAtom from "./context/atoms/loadingAtom";
import isLogged from "./context/atoms/loggedAtom";
import Loading from "./pages/public/Home/components/Loading";
import { storeAtom } from "./context/atoms/storeAtom";
import { AuthRoute, DashboardRoute, RootRoute } from "./Routes/router";
import { useDispatch } from "react-redux";
import { listProducts } from "./api/store/products";

function Root() {
  const user = useRecoilValue(userAtom);
  const loading = useRecoilValue(loadingAtom);
 const setUser = useSetRecoilState(userAtom)
  const [token, setToken] = useState(localStorage.getItem("user-threads"));
 const setStore  = useSetRecoilState(storeAtom)
 const dispatch = useDispatch()


 const [loggedIn, setLoggedIn]  = useState(false)
 const isLoggedIn = useRecoilValue(isLogged)
 const [message, setMessage] = useState('');

const setLoading = useSetRecoilState(loadingAtom)



  useEffect(()=>{
   if(user){
    setStore((prevUser) => ({
      ...prevUser,
      userId: user._id,
    }));
    
   }
   const fetchData = async () => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:8080/api/protected', {
            method: 'GET',
            credentials: 'include', // Include credentials (cookies) in the request
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
};

   fetchData();
  }, [user])
  console.log(loading)
  const store = useRecoilValue(storeAtom);
  useEffect(()=>{
 
  const fetchData =  () => {
     dispatch( listProducts(store ) )
  };
  fetchData()
},[store._id])
console.log(store);
	console.log(isLoggedIn)
	const router = createBrowserRouter([
	 ...RootRoute(),
	 ...AuthRoute(),
	 ...DashboardRoute()

	])
	console.log(user)
  return (
    
  
    loading === true ? <Loading /> : <RouterProvider router={router} />

  
  
  
  ); 
      
}

export default Root;
