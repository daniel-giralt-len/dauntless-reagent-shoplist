import { useState, useEffect } from 'preact/hooks'
import styled from 'styled-components'
import preactLocalStorage from 'preact-localstorage'

import CraftableItemList from './craftableItemList'
import Header from './header'
import ReagentList from './reagentList'

import craftableItems from '../assets/crafting.json'
import filterNames from '../assets/filters.json'
import GlobalStyle from '../globalStyle'

const MainWrapper = styled.main`
	margin-top: 110px;
`

const getFilteredItems = ({itemList, filters}) => itemList
		.filter(({type, partType}) => filters.includes(partType ? partType : type))

const getAvailableLevels = ({name, craftingList}) => {
	if(name.includes('Recruit') || name.includes('Training')){
		return ['Base']
	}
	return ['Not crafted', ...craftingList.map(c => c.level)]
}

const addItemReagents = ({itemList, filters}) => {
	const accountableItems =itemList
		.filter(({type, partType}) => filters.includes(partType ? partType : type))
	return Object.values(accountableItems).reduce((acc, item) => {
		Object.entries(item.remainingReagents).forEach(([reagentName, reagentAmount]) => {
			acc[reagentName] = (acc[reagentName] || 0) + reagentAmount
		})
		return acc
	}, {})
}

const calculateReagentCost = ({craftingList, currentLevelIndex, allAvailableLevels}) => {
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

const cookieName = 'dauntless-shoplist.loadout'
const cookieLoadout = preactLocalStorage.getObject(cookieName) || {}

const craftableItemsByName = craftableItems.reduce((acc, item) => {
	const currentLevelIndex = cookieLoadout[item.name] || 0
	const availableLevels = getAvailableLevels({name: item.name, craftingList: item.crafting})
	return {
		...acc,
		[item.name]: {
			...item,
			currentLevelIndex,
			availableLevels,
			remainingReagents: calculateReagentCost({
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
	const [totalRemainingReagents, setTotalRemainingReagents] = useState({})

	const onFilterChange = (event, newFilters) => {
		event.preventDefault();
		setFilters({...filters, ...newFilters})
	}

	const onItemLevelChange = ({name, levelIndex}) => { 
		setItems({
			...items,
			[name]: {
				...items[name],
				currentLevelIndex: levelIndex,
				remainingReagents: calculateReagentCost(({
					craftingList: items[name].crafting,
					currentLevelIndex: levelIndex,
					allAvailableLevels: items[name].availableLevels
				}))
			}
		})
	}

	const onSaveRequest = () => {
		const currentLoadout = Object.values(items).
			reduce((acc, {name, currentLevelIndex}) => ({...acc, [name]: currentLevelIndex}), {})
			preactLocalStorage.setObject(cookieName, currentLoadout)
	}

	useEffect(() => {
		const totalReagents = addItemReagents({
			itemList: Object.values(items), 
			filters: getActiveFilters(filters)
		})
		setTotalRemainingReagents(totalReagents)
	}, [items, filters])

	const renderableItems = getFilteredItems({
		itemList: Object.values(items),
		filters: getActiveFilters(filters)
	})

	return (
		<div id="app">
			<GlobalStyle />
			<Header
				onFilterChange={onFilterChange} 
				onSaveRequest={onSaveRequest}
				filters={filters} 
			/>
			<MainWrapper>
				<div>Total remaining:
					<ReagentList 
						reagents={totalRemainingReagents} 
						compact 
					/>
				</div>
				<CraftableItemList 
					items={renderableItems}
					onItemLevelChange={onItemLevelChange}
				/>
			</MainWrapper>
		</div>
	);
}

export default App