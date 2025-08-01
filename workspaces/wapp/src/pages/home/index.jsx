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

/* Assets */ 
import appLogo from '../../assets/logo.svg';

const Home = ({ children }) => {
  const [appState, dispatch] = useContext(useAppState);
  
  return (
    <Layout>
      <LayoutHeader>
        <nav>
          <LayoutContent>
            nav 
          </LayoutContent>
        </nav>
      </LayoutHeader>
      <LayoutMain>
        <LayoutContent>
          <h1>C-Suite</h1>
          <h2>Login</h2>
          <img src={appLogo} className="logo" alt="App Logo" />
          <div className="card">
            {children}
            {/* Login form */}
            <Login render={(userSession, login, logout) => (
              <div>
                {userSession ? (
                  <p>Welcome, {userSession.name}!</p>
                ) : (
                  <p>Please log in to continue.</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                  <Button variant="default" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                  <Button variant="outlined" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                  <Button variant="filled" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
                  <Button disabled variant="default" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                  <Button disabled variant="outlined" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                  <Button disabled variant="filled" onClick={userSession ? logout : login}>
                    {userSession ? 'Log out' : 'Log in'}
                  </Button>
                </div>
              </div>
            )} />
          </div>
          <div className="card">
            userSession: {JSON.stringify(appState.userSession)}<br />
            supervisedSession: {JSON.stringify(appState.supervisedSession)}<br />
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