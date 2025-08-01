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

import appLogo from '../../assets/logo.svg';

const User = () => {
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
          <Login render={(userSession, login, logout) => (
            <div>
              {userSession ? (
                <p>Welcome, {userSession.name}!</p>
              ) : (
                <p>Please log in to continue.</p>
              )}
              <Button variant="outlined" onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </Button>
            </div>
          )} />
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