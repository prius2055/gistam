import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Feeds from './pages/Feeds';
import Navigation from './components/Nagivation';
import Membership from './pages/Membership';
import Home from './pages/Home';
import Sign from './pages/Sign';
import NewPost from './pages/NewPost';
import Header from './components/Header';

import './App.css';

function App() {
  const { posts } = useSelector((state) => state.post);

  console.log(posts);

  const filtered = posts.filter((post) => post.loggedIn);

  console.log(filtered);

  return (
    <div className="App-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Sign />} />
        <Route path="/feeds" element={<Feeds />} />
        {/* <Route path="/" element={<Navigation />} /> */}
      </Routes>

      {/* <Header /> */}

      {/* <Feeds /> */}

      {/* <div className="app">
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/member" element={<Membership />} />
            <Route path="/newpost" element={<NewPost />} />
          </Routes>
        </div>
      </div> */}
    </div>
  );
}

export default App;
