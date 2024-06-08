import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { FaPencil } from 'react-icons/fa6';

import { NavLink, useNavigate } from 'react-router-dom';
import { deleteContent, getAllContent } from '../store/postSlice';
import { PostObj } from '../data/postData';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';

import Post from './Post';
import { NewLikeObj } from '../data/likeData';
import { postLike, deleteLike } from '../store/likeSlice';
import { getCurrentUser } from '../store/userSlice';
import Navigation from './Navigation';
import Header from './Header';

import './PostList.css';
import MobileNavigation from './MobileNavigation';
import MobileHeader from './MobileHeader';
const PostList: React.FC = () => {
  const { currentUser } = useAppSelector((store) => store.users);

  const { postsArray, isLoading, loadingError, navigationDisplay } =
    useAppSelector((store) => store.posts);

  const [likeObj, setLikeObj] = useState<NewLikeObj>({
    user_id: 1,
    post_id: 1,
  });
  const [likeBtnState, setLikeBtnState] = useState({ btnState: false });

  const reversedPostsArray: PostObj[] = [...postsArray].reverse();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getAllContent());
    if (likeBtnState.btnState) {
      dispatch(postLike(likeObj));
    } else if (!likeBtnState.btnState) {
      dispatch(deleteLike(likeObj));
    }

    // if (!currentUser?.firstname) {
    //   navigate('/');
    // }
  }, [dispatch, likeBtnState.btnState]);

  const handlePostDelete = (userId: number, postId: number) => {
    const deleteDetails = {
      userId,
      postId,
    };
    dispatch(deleteContent(deleteDetails)).then((response) => {
      const { payload } = response;
      if (payload.status === 200) {
        dispatch(getAllContent());
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-list-container">
      <Navigation />

      <div style={{ display: navigationDisplay ? 'flex' : 'none' }}>
        <MobileNavigation />
      </div>

      <div className="post-list">
        <Header />
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
            <span>Post</span>
          </NavLink>
        </div>

        <ul className="post-nav">
          <li>For you</li>
          <li>Featured</li>
          <li>Recent</li>
        </ul>

        {reversedPostsArray.map((post) => (
          <div key={post.id}>
            <Post post={post} key={post.id} />

            <div className="post-icons">
              <div className="icon-grp">
                <FaRegComments className="icon" />
                <p>{post.comments.length}</p>
              </div>

              <div className="icon-grp">
                <form
                  className="like-form"
                  onSubmit={(e: React.FormEvent<EventTarget>) => {
                    e.preventDefault();

                    if (currentUser?.firstname) {
                      setLikeObj({ user_id: currentUser.id, post_id: post.id });
                      setLikeBtnState({
                        btnState: !likeBtnState.btnState,
                      });
                    } else {
                      navigate('/login');
                    }
                  }}
                >
                  <button type="submit" className="like-btn">
                    <FaRegHeart
                      className="icon"
                      style={{
                        backgroundColor: `${
                          likeBtnState.btnState ? 'red' : 'transparent'
                        }`,
                        fill: `${likeBtnState.btnState ? 'white' : ''}`,
                        cursor: 'pointer',
                        backgroundClip: 'border-box',
                      }}
                    />
                  </button>
                </form>
                <p>{post.likes.length}</p>
              </div>

              {currentUser?.id === post.user_id && (
                <form
                  onSubmit={(e: React.FormEvent<EventTarget>) => {
                    e.preventDefault();
                    handlePostDelete(currentUser.id, post.id);
                  }}
                  className="icon-grp"
                >
                  <button type="submit" className="delete-btn">
                    <AiOutlineDelete className="delete-icon" />
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
