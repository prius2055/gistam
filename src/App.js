import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Feeds from './pages/Feeds';
import Navigation from './components/Nagivation';
import Home from './pages/Home';
import SignUp from './login/SignUp';
import LogIn from './login/LogIn';
import NewPost from './pages/NewPost';
import Header from './components/Header';

import './App.css';

function App() {
  // const { posts } = useSelector((state) => state.post);

 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/feeds" element={<Feeds />} />
        {/* <Route path="/feeds" element={<Navigation />} /> */}
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
