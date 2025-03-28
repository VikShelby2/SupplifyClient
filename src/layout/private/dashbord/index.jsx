// Chakra imports
import { Box } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/admin/Navbar';
import SidebarComponent from '../../../components/admin/Sidebar/sidebar';
import { useRecoilValue } from 'recoil';
import { storeAtom } from '../../../context/atoms/storeAtom';
import { cva } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../api/store/products';

const buttonVariants = cva("", {
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
});

export default function DashboardLayout({ children, classNames, isSmall = false }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const store = useRecoilValue(storeAtom);
	const { user, isAuthenticated } = useSelector((state) => state.user);

	const [lastRouteElement, setLastRouteElement] = useState('');
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		dispatch(listProducts(store));
	}, [store, dispatch]);

	useEffect(() => {
		try {
			const accounts = JSON.parse(localStorage.getItem("accounts"));

			if (isAuthenticated && store) {
				console.log('Welcome back');
			} else if (!isAuthenticated && accounts) {
				localStorage.removeItem('store');
				navigate("/choose-account");
			} else if (!store && isAuthenticated) {
				navigate(`/store-list`);
			}
		} catch (error) {
			console.error("Error parsing accounts from localStorage:", error);
		}
	}, [navigate, store, isAuthenticated]);

	useEffect(() => {
		const pathElements = location.pathname.split('/');
		setLastRouteElement(pathElements[pathElements.length - 1]);
	}, [location]);

	document.documentElement.dir = 'ltr';

	const toggleSidebar = () => {
		setExpanded((prev) => !prev);
	};

	useEffect(() => {
		document.body.style.backgroundColor = '#f1f1f1';
		document.body.style.height = isSmall ? '100vh' : '';

		return () => {
			document.body.style.backgroundColor = '';
			document.body.style.height = '';
		};
	}, [isSmall]);

	return (
		<Box>
			<Navbar click={toggleSidebar} backgroundColor={'#fff'} />
			<SidebarComponent open={expanded} />
			<div className={cn("p-4 py-10 md:ml-64 mt-[62px]", classNames)}>
				{children}
			</div>
		</Box>
	);
}
