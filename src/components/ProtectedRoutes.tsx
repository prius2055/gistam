import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../store/userSlice';

const ProtectedRoutes: React.FC = () => {
  const { currentUser, isLoading, loadingError } = useAppSelector(
    (store) => store.users
  );

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [currentUser, isInitialLoad]);

  // console.log(currentUser);
  // console.log(currentUser?.firstname);

  if (isInitialLoad || isLoading) {
    return null;
  }

  // if (loadingError) {
  //   <p>Error loading</p>;
  // }

  if (!currentUser.firstname) {
    return <Navigate to="./login" replace />;
  }

  return <Outlet context={currentUser} />;
};

export default ProtectedRoutes;
