import { useContext, useEffect } from 'react'; 

// import useAppState from '../../data/app-state';

import './styles.css';

const Loading = ({ active=false, ...props }) => {
  // const [appState] = useContext(useAppState);

  // useEffect(() => {
  //   console.log("Loading component", appState.loading);
  // }, [appState.loading]);

  return (
    active
      ? <div className="cs-loading" {...props}></div>
      : null 
  );
}

export default Loading;