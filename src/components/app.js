import { useState, useEffect } from 'preact/hooks'

import CraftableItemList from './craftableItemList'
import Header from './header'

import craftableItems from '../assets/crafting.json'
import filterNames from '../assets/filters.json'

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`		
	/* latin-ext */
	@font-face {
		font-family: 'Marcellus';
		font-style: normal;
		font-weight: 400;
		src: local('Marcellus'), local('Marcellus-Regular'), url(https://fonts.gstatic.com/s/marcellus/v7/wEO_EBrOk8hQLDvIAF81WPoK7Es.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	/* latin */
	@font-face {
		font-family: 'Marcellus';
		font-style: normal;
		font-weight: 400;
		src: local('Marcellus'), local('Marcellus-Regular'), url(https://fonts.gstatic.com/s/marcellus/v7/wEO_EBrOk8hQLDvIAF81VvoK.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}

	body {
		padding: 0;
		margin: 0;
		font-family: Marcellus;
		color: #FFF;
		font-weight: bold;
		text-shadow: #081d2b 2px 2px 3px;
		font-size: 20px;
		background: url(/assets/images/background_image.jpg);
	}
`;

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
	}, [items, filters])

	const renderableItems = getFilteredItems({
		itemList: Object.values(items),
		filters: getActiveFilters(filters)
	})

	return (
		<div id="app">
			<GlobalStyle />
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