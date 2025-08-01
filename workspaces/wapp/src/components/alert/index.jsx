import { useContext, useEffect } from 'react'; 

/* Global State */
// import useAppState, { actionTypes } from '../../data/app-state';

/* Shared Components */
import Button from '../../components/button';

/* Icons */ 
import { Xmark } from 'iconoir-react';

/* Assets */
import './styles.css';

const Alert = ({ type="", onClick=() => {}, ...props }) => {
  // const [appState, dispatch] = useContext(useAppState);

  return (
    <div 
      {...props} 
      aria-live="assertive"
      aria-atomic="true"
      role="alert"
      className={[
        "cs-alert",
        type ? `cs-alert-${type}` : '',
        props.className || ''
      ].join(' ').trim()
    }>
      {props.children}
      <Button onClick={onClick}>
        <Xmark />
      </Button>
    </div>
  );
}

export default Alert;