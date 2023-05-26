import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Membership from './pages/Membership';
import SignIn from './pages/SignIn';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/member" element={<Membership />} />
        <Route path="/sign" element={<SignIn />} />
      </Routes>
    </div>
  );
}

export default App;
