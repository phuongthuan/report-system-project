import styled from 'styled-components'

const Wrapper = styled.div.attrs({
  width: props => props.width || '100%',
  height: props => props.height || '100%'
})`
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default Wrapper;