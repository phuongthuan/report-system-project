import styled, { css } from 'styled-components'

const Button = styled.button`
  padding: 0.25em 1em;
  background: transparent;
  color: #ffffff;
  border: 2px solid #525453;
  cursor: pointer;
  
  &:focus {
    outline:none;
  }
  
  ${props => props.primary && css`
    border: 2px solid #a3a096;
    background: #a3a096;
    color: white;
  `};
  
  ${props => props.success && css`
    background: green;
    border: 2px solid green;
    color: white;
  `};
  
  ${props => props.danger && css`
    background: red;
    border: 2px solid red;
    color: white;
  `};
  
`;

export default Button;