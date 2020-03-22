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
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const ReagentList = ({reagents}) => {
  return (<UnorderedListWrapper>
    {Object.entries(reagents).map(([name, amount]) => {
      const iconUrl = reagentsToIcons[name]
      !iconUrl && console.log(name)
      return (<CenteredListItem>
        {iconUrl && <ReagentIcon src={iconUrl} />}
        {name} (x{amount})
        </CenteredListItem>)
    })}
  </UnorderedListWrapper>)
}

export default ReagentList