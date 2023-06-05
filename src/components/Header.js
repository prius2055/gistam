import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';

import './Header.css';

const Header = () => {
  console.log('header');
  return (
    <div className="header">
      <div className="search">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="header-icons"
        />
        <input type="search" placeholder="search chatter" />
      </div>
      <div className="profile">
        <FontAwesomeIcon icon={faBell} className="header-icons" />
        <img />
      </div>
    </div>
  );
};

export default Header;
