import React from 'react';
import { Icon } from 'antd'
import Wrapper from './Wrapper'

const Spinner = ({width, height}) => (
  <Wrapper width={width} height={height}>
    <Icon type="loading" style={{ fontSize: 30 }} spin />
  </Wrapper>
);

export default Spinner;
