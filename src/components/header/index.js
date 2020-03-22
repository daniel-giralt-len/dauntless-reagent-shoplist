import styled from 'styled-components';

const FixedHeader = styled.header`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
`

const Header = ({onFilterToggle, filters}) => (
	<FixedHeader>
		<div>Filters: 
			<ul>
				{Object.entries(filters).map(([name, isChecked]) => (<li>
						<input type="checkbox" id={name} name={name} onChange={e => onFilterToggle(e, name)} checked={isChecked} />
  					<label for={name}>{name}</label>
					</li>))}
			</ul>
		</div>
		<div>Total remaining</div>
	</FixedHeader>
);

export default Header;
