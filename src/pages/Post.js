import { NavLink } from 'react-router-dom';
import './Post.css';

const Post = ({ postItem }) => {
  console.log('post');

  return (
    <div className="post">
      <NavLink to="/post">
        <h2>{postItem.topic}</h2>
        <p>{postItem.intro}</p>
        <p>{postItem.fullname}</p>
        {/* <p>{postItem.date}</p> */}
      </NavLink>
    </div>
  );
};

export default Post;
