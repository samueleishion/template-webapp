import React, { useContext } from 'react';

/* Global State */
import useAppState from '../../data/app-state';

/* Shared Components */
import Avatar from '../avatar';

/* Assets */
import LeonardoDavinci from '../../assets/leonardo-davinci.jpg';
import './styles.css';

const NavLogo = ({ src, alt, ...props }) => {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={[
        "cs-nav-logo",
        props.className || ''
      ].join(' ').trim()}
    />
  );
}

const NavLinks = ({ children, ...props }) => {
  return (
    <ul
      {...props}
      className={[
        "cs-nav-links",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </ul>
  );
}

const NavUser = ({ userSession, login, logout, ...props }) => {
  const [appState, dispatch] = useContext(useAppState);
  return (
    <div
      {...props}
      className={[
        "cs-nav-user",
        props.className || ''
      ].join(' ').trim()}
    >
      <Avatar
        tag={<button 
          onClick={appState.userSession ? logout : login} 
          aria-label={appState.userSession ? "log out" : "log in"} 
        />}
        src={appState.userSession?.picture || LeonardoDavinci}
        alt={appState.userSession?.name || 'User Avatar'}
        size="medium"
      />
    </div>
  );
}

export { NavLogo, NavLinks, NavUser };

const Nav = ({
  children,
  ...props
}) => {
  return (
    <nav
      {...props}
      className={[
        "cs-nav",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </nav>
  );
};

export default Nav;
