import CraftableItem from "../craftableItem"
import styled from 'styled-components'

const GridList = styled.ul`
	list-style-type: none;
	padding: 0;
	display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  row-gap: 15px;
  column-gap: 5px;
` 

const CraftableItemList = ({items, onItemLevelChange}) => (
  <GridList>
    {Object.values(items).map(item =>
      (<li>
        <CraftableItem 
          item={item}
          onItemLevelChange={onItemLevelChange}
        />
      </li>))}
  </GridList>
)

export default CraftableItemList