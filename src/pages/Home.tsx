import React, { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import Post from '../components/Post';
import Header from '../components/Header';

import './Home.css';
import { PostObj } from '../data/postData';
import { getAllContent } from '../store/postSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import MobileHeader from '../components/MobileHeader';

const Home: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);
  const { postsArray, isLoading, loadingError } = useAppSelector(
    (store) => store.posts
  );

  const reversedPostsArray: PostObj[] = [...postsArray].reverse();

  const [likeObj, setLikeObj] = useState({
    user_id: 1,
    post_id: 1,
  });

  const [likeBtnState, setLikeBtnState] = useState({
    btnState: false,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser?.firstname) {
      navigate('/posts');
    }
    dispatch(getAllContent());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="post-list-header">
        <Header />
      </div>

      <MobileHeader />

      <div className="post-header">
        <div>
          <h2>POSTS</h2>
          <p>Explore different content you'd love</p>
        </div>
        <NavLink
          to={currentUser?.firstname ? '/new-post' : '/login'}
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
        <div>
          <Post post={post} key={post.id} />
          <div className="post-icons">
            <div className="icon-grp">
              <form
                onSubmit={(e: React.FormEvent<EventTarget>) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                <button type="submit" className="like-btn">
                  <FaRegComments
                    className="icon"
                    style={{
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  />
                </button>
              </form>

              <p>{post.comments.length}</p>
            </div>

            <div className="icon-grp">
              <form
                onSubmit={(e: React.FormEvent<EventTarget>) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                <button type="submit" className="like-btn">
                  <FaRegHeart
                    className="icon"
                    style={{
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                    }}
                  />
                </button>
              </form>
              <p>{post.likes.length}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
