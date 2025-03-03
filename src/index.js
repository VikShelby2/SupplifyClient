import React from 'react';

import ReactDOM from 'react-dom/client';

import './index.css';
import './assets/private/store/products/addproduct.css'
import './assets/styles/fonts.css'
import './App.css';
import { NextUIProvider } from '@nextui-org/react';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot } from 'recoil';
import Root from './Root';
import Toaster from 'react-hot-toast'
import { SidebarProvider } from './components/ui/shadcn/sidebar';
import { Provider } from 'react-redux';
import store from './context/redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <NextUIProvider>

  <RecoilRoot> 
  <Provider store={store}>
  <Toaster/>
    <Root />
    </Provider>
    </RecoilRoot> 
    
    </NextUIProvider>
  </React.StrictMode>
);
