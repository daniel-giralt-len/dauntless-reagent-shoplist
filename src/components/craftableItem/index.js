import styled from 'styled-components'
import IntegerRange from '../integerRange'
import ReagentList from '../reagentList'
import filterIcons from '../../assets/typesToIcons.json'

const ItemTypeIcon = styled.img`
  width: 1em;
`

const ListItemWrapper = styled.div`
  display: grid;
  grid-template-areas:
    "current-level"
    "name";
  border: 1px solid black;
`

const TitleWrapper = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-area: name;
  font-size: 1.1em;
`

const CraftableItem = ({item, onItemLevelChange}) => {
  const {name, type, partType, remainingReagents, currentLevelIndex, availableLevels} = item
  const onSliderChange = newLevel => onItemLevelChange({name, levelIndex: newLevel})
	return (<ListItemWrapper>
    <TitleWrapper>
      <div style={{gridArea: 'name'}}>{name}</div>
      <ItemTypeIcon
        src={filterIcons[type]}
        alt={partType ? `${type} (${partType})` : type}
      />
    </TitleWrapper>
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