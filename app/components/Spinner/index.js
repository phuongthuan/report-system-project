import React from 'react';
import { Icon, Spin } from 'antd'
import Wrapper from './Wrapper'

const Spinner = ({width, height, style}) => {
  const antIcon = <Icon type="loading" style={style} spin />;
  return (
    <Wrapper width={width} height={height} >
      <Spin indicator={antIcon} />
    </Wrapper>
  );
}

export default Spinner;
