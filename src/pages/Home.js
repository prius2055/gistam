import PostList from '../components/PostList';
import './Home.css'
export default function Home() {
  console.log('home');
  return (
    <div className="home">
      <PostList />
    </div>
  );
}
