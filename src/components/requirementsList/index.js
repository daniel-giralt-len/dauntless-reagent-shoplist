const RequirementsList = ({resources}) => {
  return (<ul>
    {Object.entries(resources).map(([name, amount]) => {
      return (<li>Name: {name}, Amount: {amount}</li>)
    })}
  </ul>)
}

export default RequirementsList