import Footer from '../../components/footer';
import Layout, { 
  LayoutContent, 
  LayoutFooter, 
  LayoutHeader, 
  LayoutMain
} from '../../components/layout';
import Login from '../../components/login';

const User = () => {
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
          <h1>User Page</h1>
          <p>This is the user page content.</p>
          <Login render={(userSession, login, logout) => (
            <div>
              {userSession ? (
                <p>Welcome, {userSession.name}!</p>
              ) : (
                <p>Please log in to continue.</p>
              )}
              <button onClick={userSession ? logout : login}>
                {userSession ? 'Log out' : 'Log in'}
              </button>
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