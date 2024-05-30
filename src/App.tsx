import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './login/SignUp';
import LogIn from './login/LogIn';
import NewPost from './pages/NewPost';
import PostAnalytics from './pages/PostAnalytics';
import PostDetail from './components/PostDetail';
import PostList from './components/PostList';
import Splash from './pages/Splash';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/post-analytics" element={<PostAnalytics />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/message" element={<Splash />} />
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
