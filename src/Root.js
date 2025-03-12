import { RouterProvider, createBrowserRouter } from "react-router-dom";

import React, { useEffect, useState } from "react";

import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";

import Loading from "./pages/public/Home/components/Loading";
import { storeAtom } from "./context/atoms/storeAtom";
import { AuthRoute, DashboardRoute, RootRoute } from "./Routes/router";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./api/auth";
import { selectLoading } from "./context/redux/loadingSlice";


function Root() {

  const setStore = useSetRecoilState(storeAtom);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const isLoading = useSelector(selectLoading);


  useEffect(() => {
    // Dispatch the authUser action to fetch authentication data
    dispatch(authUser());
  }, [dispatch]);

  useEffect(() => {
    // When the user data is available, update the store atom
    if (user) {
      setStore((prevStore) => ({
        ...prevStore,
        userId: user._id,
      }));
    }
  }, [user, setStore]);

  // Create the router object once to avoid re-creating it during every render
  const router = createBrowserRouter([
    ...RootRoute(),
    ...AuthRoute({ useSelector }),
    ...DashboardRoute(),
  ]);

  if (isLoading) {
    
    return <Loading />;
  }

  // Once loading is false (data is fetched), render the routes
  return <RouterProvider router={router} />;
}

export default Root;


