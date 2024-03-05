import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Feeds from './pages/Feeds';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import SignUp from './login/SignUp';
import LogIn from './login/LogIn';
import NewPost from './pages/NewPost';
import PostAnalytics from './pages/PostDetail';

import './App.css';

const App: React.FC = () => {
  // const { posts } = useSelector((state) => state.post);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/post-analytics" element={<PostAnalytics />} />
        <Route path="/new-post" element={<NewPost />} />
      </Routes>

      {/* <Header /> */}

      {/* <Feeds /> */}

      {/* <div className="app">
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/member" element={<Membership />} />
           
          </Routes>
        </div>
      </div> */}
    </div>
  );
};

export default App;
