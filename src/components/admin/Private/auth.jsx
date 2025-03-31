import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
// Assuming this is the action to authenticate user
import { Navigate } from 'react-router-dom'
import { authUser } from '../../../api/auth'
import { useRecoilValue } from 'recoil'
import { storeAtom } from '../../../context/atoms/storeAtom'
import { selectLoading } from '../../../context/redux/loadingSlice'

const ProtectRoute = ({
  children,
  protectSignUp = false,
  createStore = false,
  dashboard = false,
}) => {
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const isLoading = useSelector(selectLoading)

  const store = useRecoilValue(storeAtom)
  console.log(user)
  if (
    protectSignUp &&
    (store === null || store.length <= 0) &&
    isAuthenticated
  ) {
    return <Navigate to="/create-store" />
  }
  if (
    !protectSignUp &&
    !createStore &&
    !isAuthenticated &&
    store &&
    store.length <= 0
  ) {
    return <Navigate to="/signIn" />
  }
  if (!isAuthenticated && !protectSignUp && !createStore && !isLoading) {
    // If not authenticated, redirect to a different page (e.g., login page)
    return <Navigate to="/signIn" />
  }

  return <>{children}</>
}

export default ProtectRoute
