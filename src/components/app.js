import craftableItems from '../assets/crafting.json'
import CraftableItem from './craftableItem'
import Header from './header'
import { useState } from 'preact/hooks'
import styled from 'styled-components'

const GridList = styled.ul`
	margin-top: 100px;
	list-style-type: none;
	padding: 0;
	display: grid;
	grid-template-columns: repeat(auto-fit, 200px);
`

const CenteredApp = styled.main`

`

const App = () => {
 	const [resourceList, setResourceList] = useState({})
	const updateResourceCount = (name, resources) => {

	}

	return (
		<div id="app">
			<Header />
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