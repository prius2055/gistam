import PostList from '../components/PostList';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../firebase/firebaseConfig';
import './Feeds.css';

export default function Feeds() {
  const collectionRef = collection(database, 'users');

  const getData = () => {
    getDocs(collectionRef).then((response) => {
      console.log(
        response.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  return (
    <div className="feed">
      <PostList />
      <button onClick={getData}>get post nice post</button>
    </div>
  );
}
