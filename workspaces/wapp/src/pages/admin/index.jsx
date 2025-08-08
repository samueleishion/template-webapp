import React, { useContext, useEffect, useState } from 'react';

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
import {
  Tabs, 
  Tab
} from '../../components/tabs'; 

/* Assets */
// import appLogo from '../../assets/logo.svg';

/* Local Modules */ 
import UserTable from './user-table';
import TokenTable from './token-table';

const Admin = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [tabSelected, setTabSelected] = useState('users');

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
          <h1>Admin Page</h1>
          <Tabs>
            <Tab
              selected={tabSelected === 'users'} 
              onClick={() => setTabSelected('users')}
            >
              Users
            </Tab>
            <Tab
              selected={tabSelected === 'tokens'} 
              onClick={() => setTabSelected('tokens')}
            >
              Tokens
            </Tab>
          </Tabs>
          {tabSelected === 'users' && (
            <UserTable />
          )}
          {tabSelected === 'tokens' && (
            <TokenTable />
          )}
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

export default Admin;