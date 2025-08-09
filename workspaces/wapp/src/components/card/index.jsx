/* Local Modules */ 
import { CardList, CardListItem } from './card-list'

/* Assets */
import './styles.css';

const Card = ({ children, variant="default", ...props }) => {
  return (
    <div
      {...props}
      className={[
        "cs-card",
        `cs-card-${variant}`,
        props.className || ''
      ].join(' ').trim()}
    >
      {children}
    </div>
  );
}

export default Card;

export { 
  Card, 
  CardList, 
  CardListItem
}