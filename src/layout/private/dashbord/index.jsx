// Chakra imports
import {  Box,  } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/admin/Navbar';
import userAtom from '../../../context/atoms/userAtom';
import { useRecoilValue } from 'recoil';

import { useNavigate } from "react-router-dom";
import { storeAtom} from '../../../context/atoms/storeAtom'
import { cva } from 'class-variance-authority';
import SidebarComponent from '../../../components/admin/Sidebar/sidebar';
import { cn } from '../../../lib/utils';

 
const buttonVariants = cva(
	"",
	{
	  variants: {
		variant: {
		  default: "p-4 md:ml-64 mt-[62px]",
		  product: ""
		},
		size: {
		  default: "h-10 px-4 py-2",
		  sm: "h-9 rounded-md px-3",
		  lg: "h-11 rounded-md px-8",
		  icon: "h-10 w-10",
		},
	  },
	  defaultVariants: {
		variant: "default",
		size: "default",
	  },
	}
  )
  
// Custom Chakra theme
export default function DashboardLayout({children , classNames}) {
	const navigate = useNavigate();
	const location = useLocation();
	const [lastRouteElement, setLastRouteElement] = useState('');
	const [expanded, setExpanded] = useState(false)
	const user = useRecoilValue(userAtom)
	
	const store = useRecoilValue(storeAtom)
	useEffect(() => {
		const token = localStorage.getItem("user-threads");
		const accounts = JSON.parse(localStorage.getItem("accounts"));
		
		if (token && user && store) {
		  console.log('welcome back')
		} else if (!user && accounts) {
			localStorage.removeItem('store')
		  navigate("/choose-account");
		  
		} else if( !store && user) {
			navigate(`/store-list`);
		}
	  }, [navigate, store ,  user]);
	useEffect(() => {
		const pathElements = location.pathname.split('/');
		const lastElement = pathElements[pathElements.length - 1];
		setLastRouteElement(lastElement);
	  }, [location]);
	
	document.documentElement.dir = 'ltr';
	document.documentElement.dir = 'ltr';
	const openSideBar = () =>{
	   setExpanded(!expanded)
	}
	useEffect(() => {
		// Set background color when the componenwt mounts
		document.body.style.backgroundColor = '#f1f1f1'; // or any color you want
		document.body.style.height = '100vh'
		// Cleanup function to reset background when the component unmounts
		return () => {
			document.body.style.height = ''
		  document.body.style.backgroundColor = ''; // Reset to default or another color
		};
	  }, []);
	return (
	
		<Box >
		<Navbar click={openSideBar}  backgroundColor={'#fff'}/>
		<SidebarComponent open={''} />
		<div className={cn("p-4 py-10 md:ml-64 mt-[62px] " , classNames)} >
            {children}
            </div>
		</Box>
	);
}