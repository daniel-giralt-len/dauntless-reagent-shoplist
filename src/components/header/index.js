import styled from 'styled-components';
import ReagentList from '../reagentList'
import filterIcons from '../../assets/typesToIcons.json'
import DauntlessSquare from '../dauntlessSquare'

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
	display: flex;
	justify-content: space-around;
	list-style-type: none;
  padding: 0;
	margin: 0;
	margin-bottom: 15px;
	align-items: center;
	max-width: 900px;
`

const FilterListItem = styled.li`
	display: inline;
`

const FilterCheckbox = styled.input`
	display: none;
`

const Header = ({onFilterToggle, filters, totalReagents}) => (
	<FixedHeader>
		<FilterList>
			Filters:
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
					<DauntlessSquare for={name} checked={isChecked} as='label'>
						<FilterIconImage src={filterIcons[name]} alt={name} title={name} />
					</DauntlessSquare>
				</FilterListItem>
			))}
		</FilterList>

		<div>Total remaining:
			<ReagentList reagents={totalReagents} compact />
		</div>
	</FixedHeader>
);

export default Header;
