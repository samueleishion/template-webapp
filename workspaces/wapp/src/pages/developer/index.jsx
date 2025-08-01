import Login from '../../components/login';

const Developer = () => {
  return (
    <div>
      <h1>Developer Page</h1>
      <p>This is the developer page content.</p>
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
    </div>
  );
}

export default Developer;