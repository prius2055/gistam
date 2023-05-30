import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.css';

export default function Header() {
  const { users } = useSelector((state) => state.post);

  // users.map((user) => console.log(user));
  console.log(users.length);

  return (
    <div className="header">
      <NavLink to="/">Chatter</NavLink>

      <div>
        {users.length !== 0 &&
          users.map((user) => {
            if (user.loggedIn) {
              return (
                <nav className="navigation">
                  <ul className="navbar">
                    <li>
                      Welcome,
                      <span>{user.fullname}</span>
                    </li>
                    <li>
                      <NavLink to='/newpost'> Start Writing</NavLink>
                    </li>
                  </ul>
                  <button type="button">Sign out</button>
                </nav>
              );
            } else {
              return (
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
              );
            }
          })}

        {users.length === 0 && (
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
