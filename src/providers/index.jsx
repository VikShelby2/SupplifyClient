import React from 'react'

import { ToastProvider} from "@heroui/toast";
import { NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';
import {HeroUIProvider} from "@heroui/react";

import { Provider } from 'react-redux';
import store from '../context/redux/store';
const Providers = ({children}) => {
  return (
   <HeroUIProvider>
    <NextUIProvider>
      <RecoilRoot> 
      <ToastProvider />
       <Provider store={store}>
        {children}
       </Provider>
      </RecoilRoot> 
     </NextUIProvider>
    </HeroUIProvider>
  )
}

export default Providers
