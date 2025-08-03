import React, { useContext } from 'react';

/* Global State */
import useAppState, { actionTypes } from '../../data/app-state';

/* Shared Components */
import Button from '../../components/button';
import Footer from '../../components/footer';
import Login from '../../components/login';
import Layout, { 
  LayoutContent, 
  LayoutFooter, 
  LayoutHeader, 
  LayoutMain
} from '../../components/layout';
import Link from '../../components/link';
import Nav, {
  NavLogo,
  NavLinks,
  NavUser
} from '../../components/nav';

/* Assets */ 
// import appLogo from '../../assets/logo.svg';

const Home = ({ children }) => {
  const [appState, dispatch] = useContext(useAppState);
  
  return (
    <Layout>
      <LayoutHeader>
        <Nav>
          <LayoutContent className="cs-nav-content">
            {/* <NavLogo src={appLogo} alt="App Logo" width="57px" height="57px" /> */}
            <NavLogo alt="App Logo" />
            <NavLinks>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </NavLinks>
            <Login render={(userSession, login, logout) => (
              <Button variant="default" size="small" onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </Button>
            )} />
          </LayoutContent>
        </Nav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutContent>
          <h1>C-Suite</h1>
          {/* <img src={appLogo} className="logo" alt="App Logo" /> */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Login render={(userSession, login, logout) => (
              <Button variant="default" size="small" onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </Button>
            )} />
            <Login render={(userSession, login, logout) => (
              <Button variant="outlined" size="small" onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </Button>
            )} />
            <Login render={(userSession, login, logout) => (
              <Button variant="filled" size="small" onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </Button>
            )} />
          </div>
          <div className="card">
            {children}
          </div>
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

export default Home;