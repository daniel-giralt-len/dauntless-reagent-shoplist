import craftableItems from '../assets/crafting.json'
import CraftableItem from './craftableItem'
import Header from './header'
import { useState } from 'preact/hooks'
import styled from 'styled-components'
import filterNames from '../assets/filters.json'

const GridList = styled.ul`
	margin-top: 100px;
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, 200px);
`

const App = () => {
	const [resourceList, setResourceList] = useState([])
	const [resourcesByItem, setResourcesByItem] = useState({})
	const [filters, setFilters] = useState(filterNames.reduce((acc, f) => ({...acc, [f]: false}), {}))

	console.log(filterNames)
	console.log(filters)
	const onFilterToggle = (event, filterName) => {
		event.preventDefault();
		setFilters({...filters, [filterName]: !filters[filterName]})
		console.log(filters)
	}

	const recalculateTotalResources = () => {
		resourcesByItem
	}

	const updateResourceCount = (name, resources) => {
		setResourcesByItem({...resourcesByItem, [name]: resources})
		recalculateTotalResources();		
	}

	return (
		<div id="app">
			<Header onFilterToggle={onFilterToggle} filters={filters} />
			<GridList>
				{craftableItems.map(props =>
					(<li>
						<CraftableItem 
							{...props} 
							onResourcesChange={updateResourceCount}
						/>
					</li>))}
			</GridList>
		</div>
	);
}

export default App