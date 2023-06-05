import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Nagivation';
import Membership from './pages/Membership';
import SignIn from './pages/SignIn';
import NewPost from './pages/NewPost';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div className="App-container">
      <Navigation />
      <div className="app">
        <Header />
        <div className='pages'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/member" element={<Membership />} />
            <Route path="/newpost" element={<NewPost />} />
            <Route path="/sign" element={<SignIn />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
