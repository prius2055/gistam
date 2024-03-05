import React from 'react';
import { NavLink } from 'react-router-dom';
import './Post.css';
import { VscBook } from 'react-icons/vsc';
import FeedImage from '../img/feed-image.png';
import FeedHero from '../img/feed-hero.png';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineViewStream } from 'react-icons/md';

const Post: React.FC = () => {

  return (
    <div className="post">
      <div className="post-content">
        <div className="content-details">
          <img src={FeedImage} alt="Grace" />
          <div className="content-description">
            <p>Grace Ikpang</p>
            <span>Product designer</span>
            <span className="d-date">May 25th 2023</span>
          </div>
        </div>
        <h2>Starting out as a designer</h2>
        <div className="read-time">
          <VscBook />
          <span>10 mins read</span>
        </div>
        <p>
          Embarking on a journey as a product designer can be an exhilarating
          and fulfilling experience. As a profession that bridges the realms of
          art, technology, and problem-solving, product design offers an
          opportunity to shape the way people interact with the world around
          them.
        </p>
        <img src={FeedHero} alt="post image" className="post-hero" />
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

export default Post;
