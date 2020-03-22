import styled from 'styled-components';
import ResourceList from '../resourceList'

const FixedHeader = styled.header`
	/*position: fixed;*/
	left: 0;
	top: 0;
	width: 100%;
`

const FilterList = styled.ul`
	list-style-type: none;
  padding: 0;
	margin: 0;
	display: flex;
	justify-content: space-around;
`

const FilterListItem = styled.li`
	display: inline;
`

const FilterCheckbox = styled.input`
	display: none;
`

const FilterLabel = styled.label`
	${({checked}) => checked
		? `background: linear-gradient(180deg, #aad7f6, #77b4da);
		border: 2px solid #aad7f6;`
		: `background: linear-gradient(180deg, #1d5d82, #115174);
		border: 2px solid #376a82;`
	}
	border-radius: 12px;
	padding: 10px;
`

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const Header = ({onFilterToggle, filters, totalResources}) => (
	<FixedHeader>
		<FilterList>
			{Object.entries(filters).map(([name, isChecked]) => (
				<FilterListItem>
					<FilterCheckbox type="checkbox" id={name} name={name} onChange={e => onFilterToggle(e, name)} checked={isChecked} />
					<FilterLabel for={name} checked={isChecked}>{capitalize(name)}</FilterLabel>
				</FilterListItem>
			))}
		</FilterList>

		<div>Total remaining:
			<ResourceList resources={totalResources} />
		</div>
	</FixedHeader>
);

export default Header;
