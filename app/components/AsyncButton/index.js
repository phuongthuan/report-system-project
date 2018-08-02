import React from 'react'
import { Button } from 'antd'

const AsyncButton = ({buttonName, type, size, htmlType, onClick, loading, className, icon, shape}) => (
  <Button
    type={type}
    shape={shape}
    size={size}
    htmlType={htmlType}
    onClick={onClick}
    loading={loading}
    className={className}
    icon={icon}
  >
    {buttonName}
  </Button>
)

export default AsyncButton;