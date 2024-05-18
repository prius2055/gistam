import React, { useEffect } from 'react';
import { VscBook } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import FeedHero from '../img/feed-hero.png';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineViewStream } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllContent } from '../store/postSlice';
import { PostObj } from '../data/postData';

import './Post.css';

type Props = {
  post: PostObj;
};

const Post: React.FC<Props> = ({ post }) => {
  const { posterDetail, comments } = post;

  const firstname = posterDetail.firstname;
  const lastname = posterDetail.lastname;

  const authorName = firstname + ' ' + lastname;

  const date = new Date(post.created_at);

  const createdDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="post">
      <div className="post-content">
        <div className="content-details">
          <CgProfile className="author-picture" />
          <div className="content-description">
            <p>{authorName}</p>
            <span>{createdDate}</span>
            <span className="d-time">{date.toLocaleTimeString()}</span>
          </div>
        </div>
        <h2>{post.topic}</h2>
        <div className="read-time">
          <VscBook />
          <span>10 mins read</span>
        </div>
        <p>{post.content}</p>
        <img src={post.post_image_url} alt="post image" className="post-hero" />
        <div className="post-icons">
          <div className="icon">
            <FaRegComments />
            <p>{post.comments.length}</p>
          </div>
          <div className="icon">
            <FaRegHeart />
            <p>2000</p>
          </div>
          <div className="icon">
            <MdOutlineViewStream />
            <p>240 views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
