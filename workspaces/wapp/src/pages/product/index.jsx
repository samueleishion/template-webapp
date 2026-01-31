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
            <NavLinks userRole={appState.supervisedSession.role} />
            <NavUser />
          </LayoutContent>
        </Nav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutContent>
          <h1>Product</h1>
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