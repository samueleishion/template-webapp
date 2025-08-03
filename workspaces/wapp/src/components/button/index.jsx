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
      children
    )
  );
}
//     <button 
//       {...props} 
//       className={[
//         "cs-button",
//         variant ? `cs-button-${variant}` : '',
//         props.className || ''
//       ].join(' ').trim()
//     }>
//       {children}
//     </button>
//   );
// }

export default Button;