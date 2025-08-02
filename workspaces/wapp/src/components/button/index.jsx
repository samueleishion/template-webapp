import { cloneElement } from 'react';
import './styles.css';

const Button = ({
  tag=<button />,
  children,
  variant=null,
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