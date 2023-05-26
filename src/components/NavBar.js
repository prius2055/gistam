import { NavLink } from 'react-router-dom';

import './NavBar.css';

export default function NavBar() {
  return (
    <div className="header">
      <NavLink to="/">Chatter</NavLink>
      <nav className='navigation'>
        <ul className="navbar">
          <li>
            <NavLink to="/">About Chatter</NavLink>
          </li>
          <li>
            <NavLink to="/member">Become a member</NavLink>
          </li>
        </ul>
        <button type="button">
          <NavLink to="/sign">Sign in</NavLink>
        </button>
      </nav>
    </div>
  );
}
