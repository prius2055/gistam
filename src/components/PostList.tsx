import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { FaPencil } from 'react-icons/fa6';
import Post from './Post';
import { NavLink, Link } from 'react-router-dom';
import { getAllContent } from '../store/postSlice';
import PostDetail from './PostDetail';
import { PostObj } from '../data/postData';

import './PostList.css';

const PostList: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);

  const { postsArray, isLoading, loadingError } = useAppSelector(
    (store) => store.posts
  );

  const reversedPostsArray: PostObj[] = [...postsArray].reverse();
 

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllContent());
  }, [dispatch]);

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

      {reversedPostsArray.map((post) => (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
