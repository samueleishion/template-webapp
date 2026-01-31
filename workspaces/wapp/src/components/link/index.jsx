import { cloneElement } from 'react';
import './styles.css';

const Link = ({ tag=<a />, children, href, newWindow, className, ...props }) => {
  return (
    cloneElement(
      tag, 
      {
        ...props,
        className: [
          "cs-link",
          className || ''
        ].join(' ').trim(),
        href: href || '#',
        target: tag.type === "a" && newWindow ? "_blank" : undefined,
        rel: tag.type === "a" && newWindow ? "noopener noreferrer" : undefined
      },
      children
    )
  );
}

export default Link;