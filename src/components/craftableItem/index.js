import styled from 'styled-components'
import LevelSlider from '../levelSlider'
import RequirementsList from '../requirementsList'

const ListItemWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "name"
    "current-level";
  border: 1px solid black;
`

const CraftableItem = ({item, onLevelChange}) => {
  const {name, type, partType, remainingResources, currentLevelIndex, availableLevels} = item
  const onItemLevelChange = newLevel => onLevelChange({name, levelIndex: newLevel})
	return (<ListItemWrapper>
    <div style={{gridArea: 'name'}}>{name}, {type} {partType && `(${partType})`}</div>
    <div style={{gridArea: 'current-level'}}>
      <LevelSlider index={currentLevelIndex} range={availableLevels} onLevelChange={onItemLevelChange} />
    </div>
    <RequirementsList resources={remainingResources} />
  </ListItemWrapper>)
};

export default CraftableItem;