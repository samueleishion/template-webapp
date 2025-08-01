import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

/* Global State */ 
import useAppState, { actionTypes } from '../data/app-state';

/* Shared Components */
import Alert from '../components/alert';
import Loading from '../components/loading'; 

/* Pages */ 
import Home from '../pages/home';
import Admin from '../pages/admin';
import User from '../pages/user';
import Developer from '../pages/developer';

const AppRouter = () => {
  const [appState, dispatch] = useContext(useAppState);

  const closeAlert = () => {
    dispatch({
      type: actionTypes.setAlertOff
    });
  };

  return (
    <>
      <Loading active={appState.loading && appState.loading.length > 0} />
      <Router>
        {appState.userSession 
          ? appState.supervisedSession.type === "admin" 
            ? <Routes>
              <Route path ="*" element={<Admin />} />
            </Routes>
            : appState.supervisedSession.type === "developer"
            ? <Routes>
              <Route path ="*" element={<Developer />} />
            </Routes>
            : <Routes>
              <Route path ="*" element={<User />} />
            </Routes>
          : <Routes>
            <Route path ="*" element={<Home />} />
          </Routes>
        }
      </Router>
      <Alert type={appState.alertType} onClick={closeAlert}>
        {appState.alertMessage}
      </Alert>
    </>
  )
}; 

export default AppRouter;