import React from 'react'

import { ToastProvider} from "@heroui/toast";
import { NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';
import {HeroUIProvider} from "@heroui/react";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from '../context/redux/store';
const Providers = ({children}) => {
  console.log(process.env.GOOGLE_CLIENT_ID)
  return (
   <HeroUIProvider>
     <GoogleOAuthProvider clientId={'359651328675-0h1s06dgceh6s1pemj861icvl7e87nqs.apps.googleusercontent.com'}>
    <NextUIProvider>
      <RecoilRoot> 
      <ToastProvider />
       <Provider store={store}>
        {children}
       </Provider>
      </RecoilRoot> 
     </NextUIProvider></GoogleOAuthProvider>
    </HeroUIProvider>
  )
}

export default Providers
