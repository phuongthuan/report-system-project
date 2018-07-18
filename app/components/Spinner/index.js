import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Wrapper from './Wrapper'

const Spinner = ({width, height}) => (
  <Wrapper width={width} height={height}>
    <FontAwesomeIcon icon="spinner" size="lg" spin/>
  </Wrapper>
);

export default Spinner;
