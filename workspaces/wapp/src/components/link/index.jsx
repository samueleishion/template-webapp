import './styles.css';

const Link = ({ children, href, newWindow, className, ...props }) => {
  return (
    <a
      href={href}
      className={[
        "cs-link",
        className || ''
      ].join(' ').trim()}
      target={newWindow ? "_blank" : undefined}
      rel={newWindow ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;