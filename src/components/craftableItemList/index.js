import CraftableItem from "../craftableItem"
import styled from 'styled-components'

const GridList = styled.ul`
	margin-top: 100px;
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, 200px);
`

const CraftableItemList = ({items, onLevelChange}) => (
  <GridList>
    {Object.values(items).map(item =>
      (<li>
        <CraftableItem 
          item={item}
          onLevelChange={onLevelChange}
        />
      </li>))}
  </GridList>
)

export default CraftableItemList