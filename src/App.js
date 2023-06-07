import { Route, Routes } from 'react-router-dom';
import Feeds from './pages/Feeds';
import Navigation from './components/Nagivation';
import Membership from './pages/Membership';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import Header from './components/Header';

import './App.css';

function App() {
  return (
    <div className="App-container">
      <Home />
      <Navigation />
      <div className="app">
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/feeds" element={<Feeds />} />
            <Route path="/member" element={<Membership />} />
            <Route path="/newpost" element={<NewPost />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
