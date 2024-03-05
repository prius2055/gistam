import React from 'react';
import { useSelector } from 'react-redux';
import { FaPencil } from 'react-icons/fa6';
import Post from './Post';
import './PostList.css';

const PostList: React.FC = () => {
  // const { posts } = useSelector((store) => store.post);

  // const filteredPosts = posts.filter((post) => post.posts.length !== 0);

  return (
    <div className="post-list">
      <div className="post-header">
        <div>
          <h2>FEED</h2>
          <p>Explore different content you'd love</p>
        </div>
        <div className="feed-header-action">
          <FaPencil />
          <span>Post a content</span>
        </div>
      </div>

      <ul className="post-nav">
        <li>For you</li>
        <li>Featured</li>
        <li>Recent</li>
      </ul>

      <Post />
    </div>
  );
};

export default PostList;
