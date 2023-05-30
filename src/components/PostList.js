import Post from './Post';
import { useSelector } from 'react-redux';

const PostList = () => {
  const { posts } = useSelector((store) => store.post);
  return posts.map(
    (post) => post.intro && <Post key={post.id} postItem={post} />
  );
};

export default PostList;
