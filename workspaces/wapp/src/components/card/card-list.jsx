/* Shared Components */ 
import Card from '../card'
import Flex from '../flex';

const CardList = ({ children=<></>, ...props }) => {
  return (
    <Card variant="outlined" className="cs-card-list" {...props}>
      {children}
    </Card>
  )
}

const CardListItem = ({ children=<></>, ...props }) => {
  return (
    <Flex direction="row" justify="between" align="center" className="cs-card-list-item" gap="var(--cs-card-list-item-gap)" {...props}>
      {children}
    </Flex>
  )
}

export {
  CardList,
  CardListItem
}; 