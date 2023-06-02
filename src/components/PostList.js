import Post from './Post';
import { useSelector } from 'react-redux';

const PostList = () => {
  const { posts } = useSelector((store) => store.post);
  console.log(posts)
  console.log('postlist')

  const filteredPosts = posts.filter((post) => post.posts.length !== 0);
  return filteredPosts.map((post) => <Post key={post.id} postItem={post} />);
};

export default PostList;
