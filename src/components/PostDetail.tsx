import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { VscBook } from 'react-icons/vsc';
import { CgProfile } from 'react-icons/cg';
import FeedHero from '../img/feed-hero.png';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineViewStream } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllContent, getContent } from '../store/postSlice';
import { PostObj } from '../data/postData';

import './Post.css';

const PostDetail: React.FC = () => {
  const param = useParams();

  const id = Number(param.postId);

  console.log(id)

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContent(id));
  }, [id, dispatch]);

  //   const date = new Date(post.created_at);
  // const day = post.created_at.getDate();

  //   const createdDate = date.toLocaleDateString('en-GB', {
  //     day: 'numeric',
  //     month: 'long',
  //     year: 'numeric',
  //   });

  return (
    <div className="post">
      <div className="post-content">
        <div className="content-details">
          <CgProfile className="author-picture" />
          <div className="content-description">
            {/* <p>{post.author_name}</p> */}
            <span>Product designer</span>
            {/* <span className="d-date">{createdDate}</span> */}
            {/* <span className="d-date">{date.toLocaleTimeString()}</span> */}
          </div>
        </div>
        {/* <h2>{post.topic}</h2> */}
        <div className="read-time">
          <VscBook />
          <span>10 mins read</span>
        </div>
        {/* <p>{post.content}</p> */}
        {/* <img src={post.post_image} alt="post image" className="post-hero" /> */}
        <div className="post-icons">
          <div className="icon">
            <FaRegComments />
            <p>200</p>
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

export default PostDetail;
