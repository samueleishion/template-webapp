import { cloneElement } from 'react';
import './styles.css';

const Button = ({
  tag=<button />,
  round=false,
  variant=null,
  size=null,
  children,
  ...props 
}) => {
  return (
    cloneElement(
      tag, 
      {
        ...props,
        className: [
          "cs-button",
          variant ? `cs-button-${variant}` : '',
          round ? `cs-button-round` : '',
          size ? `cs-button-${size}` : '',
          props.className || ''
        ].join(' ').trim()
      },
      tag.type !== "input" ? children : null
    )
  );
}

const ButtonGroup = ({
  children,
  className='',
  ...props
}) => {
  return (
    <div className={`cs-button-group ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Button;

export { 
  Button,
  ButtonGroup 
};