import { useSelector } from 'react-redux';
import Post from './Post';

export default function Home() {
  const { posts } = useSelector((store) => store.post);
  console.log(posts);
  return (
    <div className="home">
      {posts.map((post) => (
        <Post key={post.id} postItem={post} />
      ))}
    </div>
  );
}
