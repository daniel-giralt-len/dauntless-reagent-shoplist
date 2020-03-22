import styled from 'styled-components'

const SliderWrapper = styled.div`
  display: flex;
  justify-content: flex-row;
  align-items: center;
`

const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 90px;
`

const IntegerRange = ({ range, index, onSliderChange }) => {
  const onDecrement = () => onSliderChange(Math.max(index-1, 0))
  const onIncrement = () => onSliderChange(Math.min(index+1, range.length-1))
  return (<SliderWrapper>
    <button onClick={onDecrement}>-</button>
    <ValueWrapper>{range[index]}</ValueWrapper>
    <button onClick={onIncrement}>+</button>
  </SliderWrapper>)
}

export default IntegerRange