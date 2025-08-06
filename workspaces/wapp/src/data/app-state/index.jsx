import React, { createContext, useReducer } from 'react';

const initialUserSession = window.localStorage.getItem('userSession');
const initialSupervisedSession = window.localStorage.getItem('supervisedSession');

export const actionTypes = {
  setUserSession: 'SET_USER_SESSION',
  setSupervisedSession: 'SET_SUPERVISED_SESSION',
  setLoadingOn: 'SET_LOADING_ON',
  setLoadingOff: 'SET_LOADING_OFF',
  setDialogOn: 'SET_DIALOG_ON',
  setDialogOff: 'SET_DIALOG_OFF',
  setAlertOn: 'SET_ALERT_ON',
  setAlertOff: 'SET_ALERT_OFF',
  setReload: 'SET_RELOAD',
  // Modules 
  // ,,,
}; 

export const initialState = {
  userSession: initialUserSession === "null" ? null : JSON.parse(initialUserSession),
  supervisedSession: initialSupervisedSession === "null" ? null : JSON.parse(initialSupervisedSession),
  loading: [],
  alerts: [], 
  alertOpen: false, // @TODO delete this
  alertType: 'info',// @TODO delete this
  alertMessage: 'hello world',// @TODO delete this
  reload: false,
  // Modules
  analysisListRequest: [],
};

// reducer 
export const reducer = (state, action) => {
  let _loading;
  let _loadingIndex;
  let _alerts;
  let _alertIndex;

  switch (action.type) {
    case actionTypes.setUserSession:
      window.localStorage.setItem('userSession', JSON.stringify(action.payload));
      return { ...state, userSession: action.payload };
    case actionTypes.setSupervisedSession:
      window.localStorage.setItem('supervisedSession', JSON.stringify(action.payload));
      return { ...state, supervisedSession: action.payload };
    case actionTypes.setLoadingOn:
      _loading = [...state.loading];
      _loadingIndex = _loading.indexOf(action.payload);

      if (_loadingIndex < 0) {
        _loading.push(action.payload);
      }

      return { ...state, loading: _loading };
    case actionTypes.setLoadingOff:
      _loading = [...state.loading];
      _loadingIndex = _loading.indexOf(action.payload);

      if (_loadingIndex >= 0) {
        _loading.splice(_loadingIndex, 1);
      }

      return { ...state, loading: _loading };
    case actionTypes.setAlertOn:
      _alerts = [...state.alerts];
      _alertIndex = _alerts.findIndex(alert => alert.id === action.payload.id);

      if (_alertIndex < 0) {
        _alerts.push(action.payload);
      }

      return { ...state, alerts: _alerts };
    case actionTypes.setAlertOff:
      _alerts = [...state.alerts];
      _alertIndex = _alerts.findIndex(alert => alert.id === action.payload.id);
  
      if (_alertIndex >= 0) {
        _alerts.splice(_alertIndex, 1);
      }

      return { ...state, alerts: _alerts };
    case actionTypes.setReload:
      return { ...state, reload: action.payload };
    default:
      return state;
  }
}; 

// context 
const useAppState = createContext(initialState);

// provider
export const AppStateProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(reducer, initialState);

  return (
    <useAppState.Provider value={[appState, dispatch]}>
      {children}
    </useAppState.Provider>
  );
};

export default useAppState;