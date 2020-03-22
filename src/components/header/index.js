import styled from 'styled-components';

const FixedHeader = styled.header`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
`

const Header = () => (
	<FixedHeader>
		<div>Filters</div>
		<div>Total remaining</div>
	</FixedHeader>
);

export default Header;
