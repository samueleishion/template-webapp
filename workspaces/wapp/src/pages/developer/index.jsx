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
import Nav, {
  NavLogo,
  NavLinks,
  NavUser
} from '../../components/nav';
import {
  Tabs, 
  Tab
} from '../../components/tabs'; 

const Developer = () => {
  const [appState, dispatch] = useContext(useAppState);

  return (
    <Layout>
      <LayoutHeader>
        <Nav>
          <LayoutContent className="cs-nav-content">
            <NavLogo alt="App Logo" />
            <NavLinks userRole={appState.supervisedSession.role} />
            <NavUser />
          </LayoutContent>
        </Nav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutContent>
          <h1>Developer Page</h1>
          <Tabs>
            <Tab selected>first</Tab>
            <Tab>second</Tab>
            <Tab>third</Tab>
          </Tabs>
          <p>This is the developer page content.</p>
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

export default Developer;