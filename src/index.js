import React from 'react'

import ReactDOM from 'react-dom/client'

import './assets/styles/index.css'
import './assets/private/store/products/addproduct.css'
import './assets/styles/fonts.css'
import './assets/styles/App.css'
import { addToast, ToastProvider } from '@heroui/toast'
import { NextUIProvider } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'
import { HeroUIProvider } from '@heroui/react'
import Root from './Root'
import { Provider } from 'react-redux'
import store from './context/redux/store'
import Providers from './providers'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Providers>
      <Root />
    </Providers>
  </React.StrictMode>
)
