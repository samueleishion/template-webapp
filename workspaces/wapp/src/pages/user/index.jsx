import React, { useContext } from 'react';

/* Global State */
import useAppState, { actionTypes } from '../../data/app-state';

/* Shared Components */
import Button from '../../components/button';
import Footer from '../../components/footer';
import Layout, { 
  LayoutContent, 
  LayoutFooter, 
  LayoutHeader, 
  LayoutMain
} from '../../components/layout';
import Link from '../../components/link';
import Login from '../../components/login';
import Nav, {
  NavLogo,
  NavLinks,
  NavUser
} from '../../components/nav';

/* Assets */
import appLogo from '../../assets/logo.svg';

const User = () => {
  const [appState, dispatch] = useContext(useAppState);

  return (
    <Layout>
      <LayoutHeader>
        <Nav>
          <LayoutContent className="cs-nav-content">
            <NavLogo src={appLogo} alt="App Logo" width="57px" height="57px" />
            <NavLinks>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </NavLinks>
            <NavUser />
          </LayoutContent>
        </Nav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutContent>
          <h1>User Page</h1>
          <p>This is the user page content.</p>
          <p>Welcome, {appState.userSession.name}!</p>
        </LayoutContent>
      </LayoutMain>
      <LayoutFooter>
        <LayoutContent>
          <Footer />
        </LayoutContent>
      </LayoutFooter>
    </Layout>
  );
}

export default User;