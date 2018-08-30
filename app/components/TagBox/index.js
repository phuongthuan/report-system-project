import React from 'react';
import PropTypes from "prop-types";
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

TagBox.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default TagBox;
