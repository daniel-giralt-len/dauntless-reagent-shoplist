import styled from 'styled-components';
import filterIcons from '../../assets/typesToIcons.json'
import DauntlessSquare from '../dauntlessSquare'
import DauntlessButton from '../dauntlessButton'

const FilterIconImage = styled.img`
	width: 40px;
	@media (max-width: 900px) {
		width: 20px;
	}
`

const FixedHeader = styled.header`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	margin: 10px;
`

const FilterList = styled.ul`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	list-style-type: none;
  padding: 0;
	margin: 0;
	margin-bottom: 15px;
	max-width: 900px;
`

const FilterListItem = styled.li`
	display: inline;
`

const FilterCheckbox = styled.input`
	display: none;
`

const ButtonList = styled.div`
	display: block;
`

const ConfigButton = styled(DauntlessButton)`
	display: inline;
	padding: 2px 6px;
	margin-right: 10px;
`

const turnAllFiltersTo = (filters, value) => Object.keys(filters).
	reduce((acc, filter) => ({...acc, [filter]: value}), {})

const Header = ({onFilterChange, onSaveRequest, filters}) => (
	<FixedHeader>
		<FilterList>
			{Object.entries(filters).map(([name, isChecked]) => (
				<FilterListItem>
					<FilterCheckbox 
						type="checkbox" 
						id={name} 
						name={name} 
						aria-labelledby={name}
						onChange={e => onFilterChange(e, {[name]: !isChecked})} 
						checked={isChecked} 
						aria-checked={isChecked}
					/>
					<DauntlessSquare for={name} checked={isChecked} as='label'>
						<FilterIconImage src={filterIcons[name]} alt={name} title={name} />
					</DauntlessSquare>
				</FilterListItem>
			))}
		</FilterList>
		<ButtonList>
			<ConfigButton checked onClick={e => onFilterChange(e, turnAllFiltersTo(filters, true))} >Show all</ConfigButton>
			<ConfigButton onClick={e => onFilterChange(e, turnAllFiltersTo(filters, false))} >Hide all</ConfigButton>
			<ConfigButton onClick={onSaveRequest} >Save</ConfigButton>
		</ButtonList>
	</FixedHeader>
);

export default Header;
