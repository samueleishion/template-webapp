import { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

/* Global State */ 
import useAppState, { actionTypes } from '../data/app-state';
import useLocalState from '../data/local-state';

/* Shared Components */
import Alert, { AlertManager } from '../components/alert';
import Loading from '../components/loading'; 

/* Pages */ 
import Home from '../pages/home';
import Admin from '../pages/admin';
import User from '../pages/user';
import Developer from '../pages/developer';
import Product from '../pages/product';
import Settings from '../pages/settings';

const AppRouter = () => {
  const [appState, dispatch] = useContext(useAppState);
  const [accountTheme] = useLocalState('accountTheme', 'system');

  const closeAlert = (entry) => {
    dispatch({
      type: actionTypes.setAlertOff,
      payload: entry 
    });
  };

  useEffect(() => {
    // Apply the account theme to the document
    if (accountTheme === "system") {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', accountTheme);
    }
  }, [accountTheme]);

  return (
    <>
      <Loading active={appState.loading && appState.loading.length > 0} />
      <Router>
        {appState.userSession 
          ? appState.supervisedSession.role === "admin" 
            ? <Routes>
              <Route path="*" element={<Admin />} />
              <Route path="settings/:route" element={<Settings />} />
              <Route path="settings" element={<Settings />} />
              <Route path="product" element={<Product />} />
            </Routes>
            : appState.supervisedSession.role === "developer"
            ? <Routes>
              <Route path="*" element={<Developer />} />
              <Route path="settings/:route" element={<Settings />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
            : <Routes>
              <Route path="*" element={<User />} />
              <Route path="settings/:route" element={<Settings />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          : <Routes>
            <Route path="*" element={<Home />} />
          </Routes>
        }
      </Router>
      <AlertManager entries={appState.alerts} onClose={closeAlert} />
      {/* <Alert type={appState.alertType} onClick={closeAlert}>
        {appState.alertMessage}
      </Alert> */}
    </>
  )
}; 

export default AppRouter;