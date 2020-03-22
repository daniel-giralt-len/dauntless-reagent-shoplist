import reagentsToIcons from '../../assets/reagentsToIcons.json'
import styled from 'styled-components';

const ReagentIcon = styled.img`
  width: 1em;
`

const CenteredListItem = styled.li`
  display: flex;
  align-items: center;
  font: 0.9em;
`

const UnorderedListWrapper = styled.ul`
  ${({compact}) => compact && `
    display: grid;
    grid-template-columns: repeat(auto-fit, 250px);
    font-size: 0.8em;
  `}
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ReagentList = ({reagents, compact}) => {
  return (<UnorderedListWrapper compact={compact}>
    {Object.entries(reagents).map(([name, amount]) => {
      const iconUrl = reagentsToIcons[name]
      return (<CenteredListItem>
        <ReagentIcon src={iconUrl} />
        {name} (x{amount})
        </CenteredListItem>)
    })}
  </UnorderedListWrapper>)
}

export default ReagentList