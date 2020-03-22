import styled from 'styled-components';
import ReagentList from '../reagentList'
import filterIcons from '../../assets/typesToIcons.json'

const FilterIconImage = styled.img`
	width: 40px;
`

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
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const Header = ({onFilterToggle, filters, totalReagents}) => (
	<FixedHeader>
		<FilterList>
			{Object.entries(filters).map(([name, isChecked]) => (
				<FilterListItem>
					<FilterCheckbox 
						type="checkbox" 
						id={name} 
						name={name} 
						aria-labelledby={name}
						onChange={e => onFilterToggle(e, name)} 
						checked={isChecked} 
						aria-checked={isChecked}
					/>
					<FilterLabel for={name} checked={isChecked}>
						<FilterIconImage src={filterIcons[name]} alt={name} title={name} />
					</FilterLabel>
				</FilterListItem>
			))}
		</FilterList>

		<div>Total remaining:
			<ReagentList reagents={totalReagents} />
		</div>
	</FixedHeader>
);

export default Header;
