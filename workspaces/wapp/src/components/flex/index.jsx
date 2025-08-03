import './styles.css';

const Flex = ({ 
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
    <div
      {...props}
      className={[
        "cs-flex",
        inline ? 'cs-flex-inline' : '',
        direction ? `cs-flex-${direction}` : '',
        wrap ? `cs-flex-${wrap}` : '',
        justify ? `cs-flex-justify-${justify}` : '',
        align ? `cs-flex-align-${align}` : '',
        props.className || ''
      ].join(' ').trim()}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        flexGrow: grow,
        flexShrink: shrink,
        flexBasis: basis,
        ...props.style
      }}
    >
      {children}
    </div>
  );
}

export default Flex;