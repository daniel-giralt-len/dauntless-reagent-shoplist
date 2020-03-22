import styled from 'styled-components'
import DauntlessSquare from '../dauntlessSquare'

const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 10px;
`

const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
`

const ButtonWrapper = styled(DauntlessSquare)`
  font-family: inherit;
  color: inherit;
  font-weight: inherit;
  text-shadow: inherit;
  font-size: inherit;
  width: 30px;
  height: 30px;
`

const IntegerRange = ({ range, index, onSliderChange }) => {
  const onDecrement = () => onSliderChange(Math.max(index-1, 0))
  const onIncrement = () => onSliderChange(Math.min(index+1, range.length-1))
  return (<SliderWrapper>
    <ButtonWrapper checked as='button' onClick={onDecrement}>-</ButtonWrapper>
    <ValueWrapper>{range[index]}</ValueWrapper>
    <ButtonWrapper checked as='button' onClick={onIncrement}>+</ButtonWrapper>
  </SliderWrapper>)
}

export default IntegerRange