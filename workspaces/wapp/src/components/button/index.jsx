import './styles.css';

const Button = ({
  children,
  variant=null,
  ...props 
}) => {
  return (
    <button 
      {...props} 
      className={[
        "cs-button",
        variant ? `cs-button-${variant}` : '',
        props.className || ''
      ].join(' ').trim()
    }>
      {children}
    </button>
  );
}

export default Button;