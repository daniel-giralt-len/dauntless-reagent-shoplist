import styled from 'styled-components'
import LevelSlider from '../levelSlider'
import RequirementsList from '../requirementsList'
import { useState } from 'preact/hooks'

const ListItemWrapper = styled.li`
  display: grid;
  grid-template-areas:
    "name"
    "current-level";
  background: light-grey;
  border: 1px solid black;
`

const calculateResourceCost = (craftingList, currentLevel, allAvailableLevels) => {
  const remainingLevels = allAvailableLevels.slice(currentLevel+1)
  if(remainingLevels.length === 0){
    return []
  }
  return craftingList.filter(c => remainingLevels.includes(c.level))
    .reduce((acc, c) => {
      c.requirements.forEach(({name, amount}) => {
        acc[name] = acc[name] ? acc[name]+amount : amount
      })
      return acc
    },{})
}

const getAvailableLevels = (craftingList) => craftingList.map(c => c.level)

const CraftableItem = ({name, type, partType, crafting}) => {
  const [remainingResources, setRemainingResources] = useState([])
  const itemLevels = ['Not crafted', ...getAvailableLevels(crafting)]
  const onLevelChange = newLevel => { 
    console.log(newLevel)
    console.log(calculateResourceCost(crafting, newLevel, itemLevels))
    setRemainingResources(calculateResourceCost(crafting, newLevel, itemLevels))
  }
	return (<ListItemWrapper>
    <div style={{gridArea: 'name'}}>{name}, {type} {partType && `(${partType})`}</div>
    <div style={{gridArea: 'current-level'}}>
      <LevelSlider range={itemLevels} onNumberChange={onLevelChange} />
    </div>
    <RequirementsList resources={remainingResources} />
  </ListItemWrapper>)
};

export default CraftableItem;


/**
  "name": "Standard Barrel",
  "type": "ostian repeaters",
  "partType": "barrels",
  "crafting": [
    {
      "level": "+1",
      "requirements": [
        {
          "name": "Rams",
          "amount": 20
        }
        ...
      ],
    },
    ...
 */