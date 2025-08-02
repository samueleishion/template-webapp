import React, { useContext } from 'react';
import { useFloating, useInteractions, useClick, offset, flip, shift } from '@floating-ui/react';

/* Global State */
import useAppState from '../../data/app-state';
import useLocalState from '../../data/local-state';

/* Shared Components */
import Avatar from '../avatar';
import Button from '../button';
import Card from '../card';
import Login from '../login';
import Link from '../link';

/* Assets */
import {
  LogOut, 
  Settings as SettingsIcon
} from 'iconoir-react';
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
    <nav className="cs-nav-links-container">
      <ul
        {...props}
        className={[
          "cs-nav-links",
          props.className || ''
        ].join(' ').trim()}
      >
        {children}
      </ul>
    </nav>
  );
}

const NavUser = ({ ...props }) => {
  const [appState, dispatch] = useContext(useAppState);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isExpanded,
    onOpenChange: setIsExpanded,
    placement: 'bottom-end',
    middleware: [offset(12), flip(), shift()],
  })

  const click = useClick(context);
  const {getReferenceProps, getFloatingProps} = useInteractions([
    click,
  ]);

  return (
    <div
      {...props}
      className={[
        "cs-nav-user",
        props.className || ''
      ].join(' ').trim()}
    >
      <Avatar
        tag={<Button
          variant="outlined" 
          aria-label={appState.userSession ? "log out" : "log in"} 
        />}
        src={appState.userSession?.picture || LeonardoDavinci}
        alt={appState.userSession?.name || 'User Avatar'}
        size="medium"
        ref={refs.setReference} {...getReferenceProps()}
      />
      {isExpanded && (
        <Card
          ref={refs.setFloating}
          className="cs-nav-user-dropdown"
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <ul>
            {appState.userSession && (
              <li>
                <Link href="/settings"><SettingsIcon /> Settings</Link>
              </li>
            )}
            <li>
              <Login render={(userSession, login, logout) => (
                <Link tag={<button />} variant="default" onClick={userSession ? logout : login}>
                  {userSession 
                    ? <>
                      <LogOut /> Log out
                    </>
                    : 'Log in'
                  }
                </Link>
              )} />
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
}

export { NavLogo, NavLinks, NavUser };

const Nav = ({
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={[
        "cs-nav",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
};

export default Nav;
