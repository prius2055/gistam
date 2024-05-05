import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './login/SignUp';
import LogIn from './login/LogIn';
import NewPost from './pages/NewPost';
import PostAnalytics from './pages/PostDetail';
import ProtectedRoutes from './components/ProtectedRoutes';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />

        <Route element={<ProtectedRoutes />}>
          {/* <Route path="/new-post" element={<NewPost />} /> */}
          <Route path="/post-analytics" element={<PostAnalytics />} />
        </Route>
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
