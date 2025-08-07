import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";

/* Global State */
import useAppState from '../../data/app-state'; 

/* Shared Components */
import Card from '../../components/card';
import Flex from '../../components/flex';
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

/* Internal Modules */
import AccountSettings from './views/account';
import DeveloperSettings from './views/developer';

/* Assets */
import {
  Code,
  CreditCards,
  RefreshCircle,
  User
} from 'iconoir-react'

const DEFAULT_ROUTE = 'account';

const Settings = () => {
  const { route } = useParams();
  const [appState, dispatch] = useContext(useAppState); 

  const [tabSelected, setTabSelected] = useState(route || DEFAULT_ROUTE);
  
  const handleTabChange = (tab) => {
    setTabSelected(tab);
  }

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
          <h1>Settings</h1>
        </LayoutContent>
        <LayoutContent>
          <Flex direction="row" justify="flex-start" align="flex-start" gap={12}>
            <Tabs orientation="vertical" style={{maxWidth: '220px', minWidth: '220px', paddingBlockStart: '20px'}}>
              <Tab 
                selected={tabSelected === 'account'}
                onClick={() => handleTabChange('account')}
              >
                <User />
                <span>Account</span>
              </Tab>
              <Tab 
                selected={tabSelected === 'payment-methods'}
                onClick={() => handleTabChange('payment-methods')}
              >
                <CreditCards /> 
                <span>Payment Methods</span>
              </Tab>
              <Tab 
                selected={tabSelected === 'subscriptions'}
                onClick={() => handleTabChange('subscriptions')}
              > 
                <RefreshCircle />
                <span>Subscriptions</span>
              </Tab>
              { appState.supervisedSession && (
                  appState.supervisedSession.role === "admin" ||
                  appState.supervisedSession.role === "developer" 
                )
                ? <Tab 
                  selected={tabSelected === 'developer'}
                  onClick={() => handleTabChange('developer')}
                > 
                  <Code />
                  <span>Developer</span>
                </Tab>
                : null 
              }
            </Tabs>
            <Flex direction="column" grow={1} gap={24}>
              {tabSelected === 'account' && (
                <AccountSettings />
              )}
              {tabSelected === 'payment-methods' && (
                <>
                  <h2>Payment Methods</h2>
                  <p>Manage your payment methods here.</p>
                </>
              )}
              {tabSelected === 'subscriptions' && (
                <>
                  <h2>Subscriptions</h2>
                  <p>Manage your subscriptions here.</p>
                </>
              )}  
              {(tabSelected === 'developer' && (
                appState.supervisedSession && (
                  appState.supervisedSession.role === "admin" ||
                  appState.supervisedSession.role === "developer"
                )
              )) && (
                <DeveloperSettings />
              )}  
            </Flex>
          </Flex>
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

export default Settings;