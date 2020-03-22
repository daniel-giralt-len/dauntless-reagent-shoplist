import styled from 'styled-components'
import IntegerRange from '../integerRange'
import ReagentList from '../reagentList'

const ListItemWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "name"
    "current-level";
  border: 1px solid black;
`

const CraftableItem = ({item, onItemLevelChange}) => {
  const {name, type, partType, remainingReagents, currentLevelIndex, availableLevels} = item
  const onSliderChange = newLevel => onItemLevelChange({name, levelIndex: newLevel})
	return (<ListItemWrapper>
    <div style={{gridArea: 'name'}}>{name}, {type} {partType && `(${partType})`}</div>
    <div style={{gridArea: 'current-level'}}>
      <IntegerRange 
        index={currentLevelIndex}
        range={availableLevels}
        onSliderChange={onSliderChange}
      />
    </div>
    <ReagentList reagents={remainingReagents} />
  </ListItemWrapper>)
};

export default CraftableItem;