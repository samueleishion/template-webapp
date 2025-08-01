import { useContext, useEffect } from 'react'; 
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

/* Global State */
import useAppState, { actionTypes } from '../../data/app-state';
import {
  getUsers,
  postUsers,
  updateUser
} from '../../data/api';
// import { postUser } from '../../../../server/src/routes/users/model';
// import { validate } from '../../../../server/src/routes/users/schema';

/* Shared Components */
// import Button from '../../components/button';

const Login = ({ render=null, ...props }) => {
  const [appState, dispatch] = useContext(useAppState);

  const clearSession = () => {
    dispatch({
      type: actionTypes.setUserSession,
      payload: null
    }); 
    dispatch({
      type: actionTypes.setSupervisedSession,
      payload: null
    }); 
  }

  const validateUser = (data) => {
    const isNotNull = data && data !== null && data !== undefined;
    const isArray = isNotNull && data instanceof Array;
    const isObject = isNotNull && data instanceof Object;

    const valid = 
      data && 
      ((isArray && data.length > 0) ||
      (isObject && 'email' in data && 'name' in data)
      );

    if (!valid) {
      console.error("Error validating user for loging in: ", data); 
      clearSession(); 
      dispatch({
        type: actionTypes.setAlertOn,
        payload: {
          type: 'error',
          message: `Error validating user for loging in.`
        }
      });

      return false;
    }

    const session = isArray ? data[0] : data;
    // const profile = session.profileObj;

    dispatch({
      type: actionTypes.setUserSession,
      payload: session
    }); 
    dispatch({
      type: actionTypes.setSupervisedSession,
      payload: session
    }); 
    
    return true; 
  };

  const fetchUser = (email=null, profile=null) => {
    // check for email 
    if (!email) {
      dispatch({
        type: actionTypes.setAlertOn,
        payload: {
          type: 'error',
          message: `Error loging in: email is required`
        }
      });
      clearSession();
      return; 
    }

    if (!profile) {
      dispatch({
        type: actionTypes.setAlertOn,
        payload: {
          type: 'error',
          message: `Error loging in: unable to fetch user profile`
        }
      });
      clearSession();
      return;
    }

    // get user 
    getUsers({
      email: email
    }, (error, resp) => {
      if (error) {
        console.error("Error fetching user:", error);
        dispatch({
          type: actionTypes.setAlertOn,
          payload: {
            type: 'error',
            message: `Error fetching user: ${error.message}`
          }
        });
        clearSession();
        return;
      }

      // check if user needs to be created
      const isValid = validateUser(resp);

      if (!isValid) {
        // create user
        profile['googleId'] = profile['id'];
        delete profile['id'];
        postUsers(profile, (err, resp2) => { 
          if (err) {
            console.error("Error creating user:", err);
            dispatch({
              type: actionTypes.setAlertOn,
              payload: {
                type: 'error',
                message: `Error creating user: ${err.message}`
              }
            });
            clearSession();
            return;
          }
          validateUser(resp2);
        });
      } else {
        // google profile has changed, update 
        const shallowCompare = (obj1, obj2) =>
          Object.keys(obj1).length === Object.keys(obj2).length &&
          Object.keys(obj1).every(key => 
            obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
          );

        if (!shallowCompare(resp, profile)) {
          profile['googleId'] = profile['id'];
          delete profile['id'];
          updateUser({
            id: resp._id
          }, 
          profile,
          () => {
            // get updated user data 
            getUsers({
              email: email
            }, (error, resp2) => {
              if (error) {
                console.error("Error fetching updated user:", error);
                dispatch({
                  type: actionTypes.setAlertOn,
                  payload: {
                    type: 'error',
                    message: `Error fetching updated user: ${error.message}`
                  }
                });
                clearSession();
                return;
              } 
              validateUser(resp2);
            });
          });
        }
        // user is valid and google profile is up-to-date, set session 
        else {
          validateUser(resp);
        }
      } 
    }); 
      // error
      // else {
      //   dispatch({
      //     type: actionTypes.setAlertOn,
      //     payload: {
      //       type: 'error',
      //       message: `Error loging in: ${data.status}: ${data.message}`
      //     }
      //   });
      // }
    // });
  }

  const loginStart = () => {
    dispatch({
      type: actionTypes.setLoadingOn,
      payload: 'loggingIn'
    }); 
  }; 

  const loginSuccess = (...sprops) => {
    const profile = sprops[0].profileObj; 
    dispatch({
      type: actionTypes.setLoadingOff,
      payload: 'loggingIn'
    }); 
    fetchUser(profile.email, profile); 
  };

  const loginFailure = (...fprops) => {
    dispatch({
      type: actionTypes.setLoadingOff,
      payload: 'loggingIn'
    }); 
    dispatch({
      type: actionTypes.setAlertOn,
      payload: {
        type: 'error',
        message: 'Error loging in' + (fprops[0].details ? `: ${fprops[0].details}` : '')
      }
    });
  }; 

  const login = useGoogleLogin({
    onSuccess: (tokenResponse, ...props) => {
      loginStart();
      axios({
        method: 'get',
        url: 'https://www.googleapis.com/oauth2/v1/userinfo',
        data: {
          access_token: tokenResponse.accessToken
        },
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
          Accept: "application/json",
        }
      }).then((response) => {
        loginSuccess({
          profileObj: response.data
        })
      })
    },
    onError: loginFailure
  });

  const logout = () => {
    clearSession(); 
    window.location.reload(); 
  };

  useEffect(() => {
    if (appState.reload) {
      fetchUser(appState.userSession.email, appState.userSession.profileObj); 
      dispatch({
        type: actionTypes.setReload,
        payload: false
      }); 
    }
  }, [appState.reload]); 

  return (
    render === null || typeof render !== 'function'
      ? appState.userSession
        ? <button onClick={logout}>
          Log out
        </button>
        : <button onClick={login}>
          Log in
        </button>
      : render(appState.userSession, login, logout)
  ); 
}

export default Login;