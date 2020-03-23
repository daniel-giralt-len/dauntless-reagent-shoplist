import styled from 'styled-components'
import DauntlessButton from '../dauntlessButton'

const SliderWrapper = styled.div`
  display: flex;
  justify-content: ${({single}) => single ? 'center' : 'space-between'};
  align-items: center;
  margin: 0px 10px;
`

const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 0.8em;
`

const ButtonWrapper = styled(DauntlessButton)`
  width: 30px;
  height: 30px;
`

const IntegerRange = ({ range, index, onSliderChange }) => {
  const onFirstValue = index === 0
  const onLastValue = index === range.length-1

  const onDecrement = () => onSliderChange(Math.max(index-1, 0))
  const onIncrement = () => onSliderChange(Math.min(index+1, range.length-1))
  return (<SliderWrapper>
    <ButtonWrapper hide={onFirstValue} checked as='button' onClick={onDecrement}>-</ButtonWrapper>
    <ValueWrapper>{range[index]}</ValueWrapper>
    <ButtonWrapper hide={onLastValue} checked as='button' onClick={onIncrement}>+</ButtonWrapper>
  </SliderWrapper>)
}

export default IntegerRange