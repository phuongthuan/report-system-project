import React from 'react';
import { Tag } from 'antd'

const TagBox = ({color, style, name, ...rest}) => (
  <Tag
    color={color}
    style={style}
    {...rest}
  >
    {name}
  </Tag>
);

export default TagBox;
