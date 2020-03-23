import { useState } from 'preact/hooks'
import styled from 'styled-components'

import IntegerRange from '../integerRange'
import ReagentList from '../reagentList'
import DauntlessButton from '../dauntlessButton'

import filterIcons from '../../assets/typesToIcons.json'

const ItemTypeIcon = styled.img`
  width: 1em;
`

const ListItemWrapper = styled.div`
  background: linear-gradient(180deg, #26546b, #0e2836);
  border-width: 2px;
  border-style: solid;
  border-color: #d0d9de #a5adb1 #777e83;
  padding: 10px 6px;
`

const TitleWrapper = styled.h2`
  display: flex;
  align-items: center;
  justify-content: space-around;
  grid-area: name;
  font-size: 1.1em;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CraftableItem = ({item, onItemLevelChange}) => {
  const [displayReagents, setDisplayReagents] = useState(false)
  const {name, type, partType, remainingReagents, currentLevelIndex, availableLevels} = item
  const onSliderChange = newLevel => onItemLevelChange({name, levelIndex: newLevel})
	return (<ListItemWrapper>
    <IntegerRange 
      index={currentLevelIndex}
      range={availableLevels}
      onSliderChange={onSliderChange}
    />
    <TitleWrapper>
      <div>{name}</div>
      <ItemTypeIcon
        src={filterIcons[partType ? partType : type]}
        alt={partType ? `${type} (${partType})` : type}
      />
    </TitleWrapper>
    {displayReagents
      ? (<ReagentList reagents={remainingReagents} />)
      : (
        <ButtonWrapper>
          <DauntlessButton checked onClick={() => setDisplayReagents(true)}>
            Show reagents
          </DauntlessButton>
        </ButtonWrapper>)
    }
  </ListItemWrapper>)
};

export default CraftableItem;