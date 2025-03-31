import { useRecoilValue } from 'recoil'

import Home from '../pages/public/Home'
import SignUp from '../pages/auth/SignUp'
import SignIn from '../pages/auth/SignIn'
import CreateStore from '../pages/auth/store/CreateStore'
import UserSelect from '../pages/auth/store/ChooseAccount'
import UserStore from '../pages/auth/store/ListStore'
import { Navigate } from 'react-router-dom'
import { storeAtom } from '../context/atoms/storeAtom'
import DashboardLayout from '../layout/private/dashbord'
import ProductPage from '../pages/private/store/product'
import AddProduct from '../pages/private/store/product/AddProduct/addProduct'
import InventoryPage from '../pages/private/store/product/inventory'
import P2card from '../pages/private/store/home/components/p2card'
import DashHome from '../pages/private/store/home'
import CollectionPage from '../pages/private/store/product/collections'
import Theme from '../pages/private/store/builder'
import ProtectRoute from '../components/admin/Private/auth'

export const RootRoute = () => {
  const routes = [{ path: '/', element: <Home /> }]

  return routes
}

export const AuthRoute = ({ useSelector }) => {
  const store = useRecoilValue(storeAtom)

  const { user, isAuthenticated } = useSelector((state) => state.user)

  const authRoute = [
    {
      path: '/signUp',
      element: (
        <ProtectRoute protectSignUp={true}>
          <SignUp />
        </ProtectRoute>
      ),
    },
    {
      path: '/signIn',
      element: !isAuthenticated ? <SignIn /> : <Navigate to={`/store-list/`} />,
    },
    { path: '/create-store', element: <CreateStore /> },
    {
      path: '/choose-account',
      element: (
        <ProtectRoute>
          <UserSelect />
        </ProtectRoute>
      ),
    },
    {
      path: '/store-list',
      element: (
        <ProtectRoute>
          <Navigate
            to={`/store-list/${isAuthenticated && user && user._id ? user._id : ''}`}
          />
        </ProtectRoute>
      ),
    },
    {
      path: `/store-list/:userId`,
      element: user ? (
        <ProtectRoute>
          <UserStore />
        </ProtectRoute>
      ) : (
        <Navigate to="/signIn" />
      ),
    },
  ]
  return authRoute
}

export const DashboardRoute = (loggedIn) => {
  const routes = [
    { path: '/store-panel/', element: <Navigate to={`/store-panel/home`} /> },
    {
      path: `/store-panel/home`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout isSmall={true} classNames={'mt-[60px] '}>
            <DashHome />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/theme`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout classNames={'mt-[40px]'}>
            <Theme />
          </DashboardLayout>
          :
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/products`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout>
            <ProductPage />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/products/inventory`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout>
            <InventoryPage />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/products/add`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/products/edit`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
    {
      path: `/store-panel/collections`,
      element: (
        <ProtectRoute dashboard={true}>
          <DashboardLayout>
            <CollectionPage />
          </DashboardLayout>
        </ProtectRoute>
      ),
    },
  ]
  return routes
}
