import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './login/SignUp';
import LogIn from './login/LogIn';
import NewPost from './pages/NewPost';
import PostAnalytics from './pages/PostAnalytics';
import ProtectedRoutes from './components/ProtectedRoutes';
import PostDetail from './components/PostDetail';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/post-analytics" element={<PostAnalytics />} />
        <Route path="/post-detail" element={<PostDetail/>} />
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
