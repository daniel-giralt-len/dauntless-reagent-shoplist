import { useState, useEffect } from 'preact/hooks'
import styled from 'styled-components'

const LevelSliderWrapper = styled.div`
  display: flex;
  justify-direction: flex-row;
  align-items: center;
`

const LevelSlider = ({ range, onNumberChange }) => {
  const [selectedIndex, setIndex] = useState(0)
  const onDecrement = () => setIndex(Math.max(selectedIndex-1, 0))
  const onIncrement = () => setIndex(Math.min(selectedIndex+1, range.length-1))
  useEffect(() => onNumberChange && onNumberChange(selectedIndex), [selectedIndex])
  return (<LevelSliderWrapper>
    <button onClick={onDecrement}>-</button>
    <div>{range[selectedIndex]}</div>
    <button onClick={onIncrement}>+</button>
  </LevelSliderWrapper>)
}

export default LevelSlider