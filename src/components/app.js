import { Component } from 'preact';
import craftableItems from '../assets/crafting.json'
import CraftableItem from './craftableItem'

export default class App extends Component {
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<ul>{craftableItems.map(props => (<CraftableItem {...props} />))}</ul>
			</div>
		);
	}
}
