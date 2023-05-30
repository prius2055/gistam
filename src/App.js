import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Membership from './pages/Membership';
import SignIn from './pages/SignIn';
import NewPost from './pages/NewPost';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Membership />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/sign" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
