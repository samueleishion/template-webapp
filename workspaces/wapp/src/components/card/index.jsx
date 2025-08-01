import './styles.css';

const Card = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={[
        "cs-card",
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
}

export default Card;