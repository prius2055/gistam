import { useSelector } from 'react-redux';
import { FaPencil } from 'react-icons/fa6';
import { VscBook } from 'react-icons/vsc';
import FeedImage from '../img/feed-image.png';
import FeedHero from '../img/feed-hero.png';
import { FaRegComments } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { MdOutlineViewStream } from 'react-icons/md';

import './PostList.css';

const PostList = () => {
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
        <img src={FeedHero} alt="post image" className='post-hero' />
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

      {/* {filteredPosts.map((post) => ( */}
      {/* <Post key={post.id} postItem={post} /> */}
      {/* ))} */}
    </div>
  );
};

export default PostList;
