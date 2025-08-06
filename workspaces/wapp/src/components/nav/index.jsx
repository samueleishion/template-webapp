import React, { useId, useContext } from 'react';
import { useFloating, useInteractions, useClick, offset, flip, shift } from '@floating-ui/react';

/* Global State */
import useAppState, { actionTypes } from '../../data/app-state';
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
  Settings as SettingsIcon,
  Key,
  Group,
  User
} from 'iconoir-react';
import LeonardoDavinci from '../../assets/leonardo-davinci.jpg';
import Logo from '../../assets/new_logo.svg?react';

import './styles.css';

const NavLogo = ({ alt, ...props }) => {
  return (
    <Logo className="cs-nav-logo" aria-label={alt} />
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
  const id = useId();

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
      {appState.userSession._id !== appState.supervisedSession._id && (
        <Group id={id} aria-label="Supervised session by admin" />
      )}
      <Avatar
        tag={<Button
          variant="outlined" 
          aria-label={appState.supervisedSession ? "log out" : "log in"} 
        />}
        aria-describedby={appState.userSession._id !== appState.supervisedSession._id ? id : undefined}
        src={appState.supervisedSession?.picture || LeonardoDavinci}
        alt={appState.supervisedSession?.name || 'User Avatar'}
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
            {appState.userSession._id !== appState.supervisedSession._id && (
              <li>
                <Link tag={<button />} onClick={() => {
                  dispatch({ type: actionTypes.setSupervisedSession, payload: appState.userSession });
                  window.location.reload();
                }}>
                  <Key />
                  Admin view
                </Link>
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
