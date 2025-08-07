import { cloneElement } from 'react';

/* Assets */ 
import './styles.css';

const Flex = ({ 
  tag=<div></div>,
  children, 
  inline=false,
  direction='row', 
  wrap='nowrap', 
  justify='flex-start', 
  align='stretch', 
  grow=0,
  shrink=1, 
  basis='auto', 
  gap=0,
  ...props 
}) => {
  return (
    cloneElement(
      tag,
      {
        ...props,
        className: [
          "cs-flex",
          inline ? 'cs-flex-inline' : '',
          direction ? `cs-flex-${direction}` : '',
          wrap ? `cs-flex-${wrap}` : '',
          justify ? `cs-flex-justify-${justify}` : '',
          align ? `cs-flex-align-${align}` : '',
          props.className || ''
        ].join(' ').trim(),
        style: {
          gap: typeof gap === 'number' ? `${gap}px` : gap,
          flexGrow: grow,
          flexShrink: shrink,
          flexBasis: basis,
          ...props.style
        }
      }, 
      children
    )
  );
}

export default Flex;