import { useState, useEffect } from 'preact/hooks'

import CraftableItemList from './craftableItemList'
import Header from './header'

import craftableItems from '../assets/crafting.json'
import filterNames from '../assets/filters.json'

const getFilteredItems = ({itemList, filters}) => itemList
		.filter(({type, partType}) => filters.includes(partType ? partType : type))

const getAvailableLevels = (craftingList) => (['Not crafted', ...craftingList.map(c => c.level)])

const addItemResources = ({itemList, filters}) => {
	const accountableItems =itemList
		.filter(({type, partType}) => filters.includes(partType ? partType : type))
	return Object.values(accountableItems).reduce((acc, item) => {
		Object.entries(item.remainingResources).forEach(([resourceName, resourceAmount]) => {
			acc[resourceName] = (acc[resourceName] || 0) + resourceAmount
		})
		return acc
	}, {})
}

const calculateResourceCost = ({craftingList, currentLevelIndex, allAvailableLevels}) => {
  const remainingLevels = allAvailableLevels.slice(currentLevelIndex+1)
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

const getActiveFilters = filters => Object.entries(filters)
	.filter(([_, active]) => active)
	.map(([filterName]) => filterName)

const craftableItemsByName = craftableItems.reduce((acc, item) => {
	const currentLevelIndex = 0
	const availableLevels = getAvailableLevels(item.crafting)
	return {
		...acc,
		[item.name]: {
			...item,
			currentLevelIndex,
			availableLevels,
			remainingResources: calculateResourceCost({
				craftingList: item.crafting,
				currentLevelIndex,
				allAvailableLevels: availableLevels
			})
		}
	}
}, {})

const initialFilters = filterNames.reduce((acc, f) => ({...acc, [f]: true}), {})

const App = () => {
	const [items, setItems] = useState(craftableItemsByName)
	const [filters, setFilters] = useState(initialFilters)
	const [totalRemainingResources, setTotalRemainingResources] = useState({})

	const onFilterToggle = (event, filterName) => {
		event.preventDefault();
		setFilters({...filters, [filterName]: !filters[filterName]})
	}

	const onItemLevelChange = ({name, levelIndex}) => { 
		setItems({
			...items,
			[name]: {
				...items[name],
				currentLevelIndex: levelIndex,
				remainingResources: calculateResourceCost(({
					craftingList: items[name].crafting,
					currentLevelIndex: levelIndex,
					allAvailableLevels: items[name].availableLevels
				}))
			}
		})
	}

	useEffect(() => {
		const totalResources = addItemResources({
			itemList: Object.values(items), 
			filters: getActiveFilters(filters)
		})
		setTotalRemainingResources(totalResources)
		console.log(totalResources)
	}, [items, filters])

	const renderableItems = getFilteredItems({
		itemList: Object.values(items),
		filters: getActiveFilters(filters)
	})

	return (
		<div id="app">
			<Header
				onFilterToggle={onFilterToggle} 
				filters={filters} 
				totalResources={totalRemainingResources}
			/>
			<CraftableItemList 
				items={renderableItems}
				onItemLevelChange={onItemLevelChange}
			/>
		</div>
	);
}

export default App