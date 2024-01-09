import { useSelector } from 'react-redux';
import Post from './Post';

import './PostList.css';

const PostList = () => {
  // const { posts } = useSelector((store) => store.post);
  

  // const filteredPosts = posts.filter((post) => post.posts.length !== 0);

  return (
    <div className="post-list">
      {/* {filteredPosts.map((post) => ( */}
        {/* <Post key={post.id} postItem={post} /> */}
      {/* ))} */}
    </div>
  );
};

export default PostList;
