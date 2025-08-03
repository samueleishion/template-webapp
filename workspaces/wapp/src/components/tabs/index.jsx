/* Shared Components */
import Button from '../button';

/* Assets */ 
import './styles.css'

const Tabs = ({ children, orientation='horizontal', ...props }) => {
  return (
    <ul 
      {...props}
      className={[
        "cs-tabs",
        `cs-tabs-${orientation}`,
        props.className || ''
      ].join(' ').trim()}
    >
      { children }
    </ul>
  )
}

const Tab = ({ children, selected=false, disabled=false, onClick=() => {}, ...props }) => (
  <li className={[
    "cs-tab",
    props.className || ''
  ].join(' ').trim()}>
    <Button 
      role="tab" 
      aria-selected={selected ? "true" : undefined } 
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      { children }
    </Button>
  </li>
)

export default Tabs; 

export { Tabs, Tab }; 