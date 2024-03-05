import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchContent } from '../store/postSlice';

import Navigation from '../components/Navigation';
import PostList from '../components/PostList';
import Header from '../components/Header';

import './Feeds.css';

const Feeds: React.FC = () => {
  // const { usersArray, currentUsers, isLoading, loadingError } = useSelector(
  //   (store) => store.users
  // );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchContent());
  // }, []);

  return (
    <div className="feeds">
      <Navigation />
      <div className="feed-group">
        <Header />
        <PostList />
      </div>
      {/* <button onClick={getData}>get post nice post</button> */}
    </div>
  );
};

export default Feeds;
