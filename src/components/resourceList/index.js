import reagentsToIcons from '../../assets/reagentsToIcons.json'
import styled from 'styled-components';

const ReagentIcon = styled.img`
  width: 1em;
`

const CenteredListItem = styled.li`
  display: flex;
  align-items: center;
`

const ResourceList = ({resources}) => {
  return (<ul>
    {Object.entries(resources).map(([name, amount]) => {
      const iconUrl = reagentsToIcons[name]
      !iconUrl && console.log(name)
      return (<CenteredListItem>
        {iconUrl && <ReagentIcon src={iconUrl} />}
        {name} (x{amount})
        </CenteredListItem>)
    })}
  </ul>)
}

export default ResourceList