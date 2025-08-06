import React, { useContext, useState } from 'react';

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
          <h1>Admin Page</h1>
          <Tabs>
            <Tab
              selected={tabSelected === 'users'} 
              onClick={() => setTabSelected('users')}
            >
              Users
            </Tab>
          </Tabs>
          {tabSelected === 'users' && (
            <UserTable />
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