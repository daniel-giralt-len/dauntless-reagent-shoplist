import styled from 'styled-components'

const LevelSliderWrapper = styled.div`
  display: flex;
  justify-content: flex-row;
  align-items: center;
`

const LevelValue = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
`

const LevelSlider = ({ range, index, onLevelChange }) => {
  const onDecrement = () => onLevelChange(Math.max(index-1, 0))
  const onIncrement = () => onLevelChange(Math.min(index+1, range.length-1))
  return (<LevelSliderWrapper>
    <button onClick={onDecrement}>-</button>
    <LevelValue>{range[index]}</LevelValue>
    <button onClick={onIncrement}>+</button>
  </LevelSliderWrapper>)
}

export default LevelSlider