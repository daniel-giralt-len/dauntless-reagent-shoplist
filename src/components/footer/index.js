import styled from 'styled-components'

const FooterWrapper = styled.footer`
  font-size: 0.7em;
  font-weight: 700;
  background: #d0d9de;
  position: fixed;
  bottom: 0;
  right: 0;
  color: #081d2b;
  text-shadow: none;
  padding: 2px 4px;
  border-top-left-radius: 4px;
  text-align: right;
  @media (max-width: 700px) {
    font-size: 0.5em;
    width: 100%;
  }
`

const Footer = () => (
  <FooterWrapper>
    Data last updated on 22-03-2020. Made by <a href='https://twitter.com/ironydaniel'>@IronyDaniel</a>, out of love for Dauntless. <a href="https://playdauntless.com/">Go play Dauntless!</a>
  </FooterWrapper>
)

export default Footer