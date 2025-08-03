/* Shared Components */
import Button from '../../components/button';

/* Icons */ 
import { Xmark } from 'iconoir-react';

/* Assets */
import './styles.css';

const Alert = ({ type="", onClick=() => {}, ...props }) => {
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