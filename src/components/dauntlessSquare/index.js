import styled from 'styled-components';

const DauntlessSquare = styled.button`
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

	:hover{
		border: 2px solid #000;
	}
	:active{
		background: linear-gradient(180deg, #d7ebf9, #a0c8e0);
		border: 2px solid #000;
	}
`

export default DauntlessSquare