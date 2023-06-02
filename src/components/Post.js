import { NavLink } from 'react-router-dom';
import './Post.css';

const Post = ({ postItem }) => {
  console.log('post');

  return (
    <div className="post">
      <NavLink to="/post">
        {postItem.posts.map((post) => (
          <div key={post.postId}>
            <h2>{post.topic}</h2>
            <p>{post.intro}</p>
          </div>
        ))}
        <p>{postItem.fullname}</p>
        {/* <p>{postItem.date}</p> */}
      </NavLink>
    </div>
  );
};

export default Post;
