import { useRecoilValue } from "recoil";
import userAtom from "../context/atoms/userAtom";
import Home from "../pages/public/Home";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import CreateStore from "../pages/auth/store/CreateStore";
import UserSelect from "../pages/auth/store/ChooseAccount";
import UserStore from "../pages/auth/store/ListStore";
import { Navigate } from 'react-router-dom';
import { storeAtom } from "../context/atoms/storeAtom";
import DashboardLayout from "../layout/private/dashbord";
import ProductPage from "../pages/private/store/product";
import AddProduct from "../pages/private/store/product/AddProduct/addProduct";
import InventoryPage from "../pages/private/store/product/inventory";
import P2card from "../pages/private/store/home/components/p2card";
import DashHome from "../pages/private/store/home";
import CollectionPage from "../pages/private/store/product/collections";
import Theme from "../pages/private/store/builder";

export const RootRoute = () =>{
    const routes = [
          { path: '/', element: <Home /> },
          
         
      ];
      
    return routes  
  }
  
  export const AuthRoute = () => {
    const user = useRecoilValue(userAtom);
    const store = useRecoilValue(storeAtom)
    const token = localStorage.getItem('user-threads')
     const authRoute = [
         {path: '/signUp'  , element: store && token === null ?  <SignUp/> : <Navigate  to={'/create-store'}/> },
         {path: '/signIn' , element: <SignIn/> },
         {path: '/create-store' , element: <CreateStore/>},
         {path:'/choose-account' , element: <UserSelect />} ,
         {path: '/store-list'  ,   element: user ? <Navigate to={`/store-list/${user?._id}`} />  : <Navigate to="/signin" /> } ,
         {path: `/store-list/:userId`, element: user ? <UserStore /> : <Navigate to="/signIn" />  } ,
     ]
    return authRoute
  }
  
  
  export const DashboardRoute = (loggedIn) =>{
    const store = useRecoilValue(storeAtom);
    const user = useRecoilValue(userAtom)
  
   const routes = [
     { path: '/store-panel/' , element: <Navigate to={`/store-panel/${store?._id}/home`}/>},
     { path: `/store-panel/:storeId/home`, element: user  ? <DashboardLayout classNames={'mt-[60px] '}><DashHome/></DashboardLayout>: <Navigate to={'/signIn'}/>},
     { path: `/store-panel/:storeId/theme`, element: user  ? <DashboardLayout classNames={'mt-[40px]'}><Theme/></DashboardLayout>: <Navigate to={'/signIn'}/>},
     { path: `/store-panel/${store ?  store._id : ''}/products`, element: user  ? <DashboardLayout><ProductPage/></DashboardLayout>: <Navigate to={'/signIn'}/>},
     { path: `/store-panel/${store ?  store._id : ''}/products/inventory`, element: user  ? <DashboardLayout><InventoryPage/></DashboardLayout>: <Navigate to={'/signIn'}/>},
     { path: `/store-panel/${store ?  store._id : ''}/products/add`, element: user  ? <DashboardLayout><AddProduct/></DashboardLayout>: <Navigate to={'/signIn'}/>} ,
     { path: `/store-panel/${store ?  store._id : ''}/products/edit`, element: user  ? <DashboardLayout><AddProduct/></DashboardLayout>: <Navigate to={'/signIn'}/>} ,
     { path: `/store-panel/${store ?  store._id : ''}/collections`, element: user  ? <DashboardLayout><CollectionPage/></DashboardLayout>: <Navigate to={'/signIn'}/>},  
   ]
  return routes;
}