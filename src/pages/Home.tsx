import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getCurrentUser } from '../store/userSlice';

import Navigation from '../components/Navigation';
import PostList from '../components/PostList';
import Header from '../components/Header';

import './Home.css';

const Home: React.FC = () => {
  const { currentUser, isLoading, loadingError } = useAppSelector(
    (store) => store.users
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <div className="feeds">
      {currentUser && <Navigation />}
      <div className="feed-group">
        <Header />
        <PostList />
      </div>
      {/* <button onClick={getData}>get post nice post</button> */}
    </div>
  );
};

export default Home;
