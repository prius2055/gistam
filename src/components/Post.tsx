import React, { useEffect, useState } from 'react';
import { VscBook } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { PostObj } from '../data/postData';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

import './Post.css';

type Props = {
  post: PostObj;
};

const Post: React.FC<Props> = ({ post }) => {
  const { id, posterDetail } = post;
  const { currentUser } = useAppSelector((store) => store.users);

  // console.log(currentUser.id);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const firstname = posterDetail.firstname;
  const lastname = posterDetail.lastname;

  const authorName = firstname + ' ' + lastname;

  const date = new Date(post.created_at);

  const createdDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // console.log(likeBtnState);

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  //   if (likeBtnState.btnState) {
  //     dispatch(postLike(likeObj));
  //   }
  // }, [likeBtnState.btnState]);

  // const likeBtnHandler = (e: React.FormEvent<EventTarget>) => {
  //   e.preventDefault();

  //   if (currentUser?.firstname) {
  //     setLikeBtnState((prev) => ({ ...prev, btnState: !prev.btnState }));
  //   } else {
  //     navigate('/login');
  //   }
  // };

  return (
    <div className="post">
      <div className="post-content">
        <div className="content">
          <div className="content-details">
            <CgProfile className="author-picture" />
            <div className="content-description">
              <p>{authorName}</p>
              <span>{createdDate}</span>
              <span className="d-time">{date.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <Link to={`/posts/${post.id}`} className="post-topic">
          <h2>{post.topic}</h2>
        </Link>

        <div className="read-time">
          <VscBook />
          <span>10 mins read</span>
        </div>
        <p>{post.content}</p>
        <img src={post.post_image_url} alt="post image" className="post-hero" />
      </div>
    </div>
  );
};

export default Post;
