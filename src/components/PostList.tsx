import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { FaPencil } from 'react-icons/fa6';
import Post from './Post';
import { NavLink, Link } from 'react-router-dom';
import './PostList.css';
import { getAllContent } from '../store/postSlice';
import PostDetail from './PostDetail';

const PostList: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);

  const { postsArray, isLoading, loadingError } = useAppSelector(
    (store) => store.posts
  );

  const reversedPostsArray = [...postsArray].reverse();

  // const array = [1, 2, 3, 4];
  // array.reverse();

  // console.log(array);
  // [ 4, 3, 2, 1 ]

  // const reversedPostArray = postsArray?.reverse();

  console.log(reversedPostsArray);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllContent());
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-list">
      <div className="post-header">
        <div>
          <h2>FEED</h2>
          <p>Explore different content you'd love</p>
        </div>
        <NavLink
          to={currentUser.firstname ? '/new-post' : '/login'}
          className="feed-header-action"
        >
          <FaPencil />
          <span>Post a content</span>
        </NavLink>
      </div>

      <ul className="post-nav">
        <li>For you</li>
        <li>Featured</li>
        <li>Recent</li>
      </ul>

      {reversedPostsArray.map((post, i) => (
        <Link to="/post-detail">
          <Post post={post} key={i} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
