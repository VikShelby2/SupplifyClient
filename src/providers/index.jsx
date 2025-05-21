import React from 'react'

import { ToastProvider } from '@heroui/toast'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'
import { HeroUIProvider } from '@heroui/react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { Provider } from 'react-redux'
import store from '../context/redux/store'
const Providers = ({ children }) => {
  return (
    <HeroUIProvider>
      <DndProvider backend={HTML5Backend}>
        <NextUIProvider>
          <RecoilRoot>
            <ToastProvider />
            <Provider store={store}>{children}</Provider>
          </RecoilRoot>
        </NextUIProvider>
     </DndProvider>
    </HeroUIProvider>
  )
}

export default Providers
