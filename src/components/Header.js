import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.css';

export default function Header() {
  const { posts } = useSelector((state) => state.post);

  const loggedInUser = posts.filter((post) => post.loggedIn);

  return (
    <div className="header">
      <NavLink to="/">Chatter</NavLink>

      <div>
        {loggedInUser.length !== 0 &&
          loggedInUser.map((user) => (
            <nav className="navigation">
              <ul className="navbar">
                <li>
                  Welcome, <span>{user.fullname}</span>
                </li>
                <li>
                  <NavLink to="/newpost">Write a post</NavLink>
                </li>
              </ul>
              <button type="button">Sign out</button>
            </nav>
          ))}

        {loggedInUser.length === 0 && (
          <nav className="navigation">
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
        )}
      </div>
    </div>
  );
}
