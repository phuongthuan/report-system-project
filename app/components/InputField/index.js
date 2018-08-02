import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'
import isEmpty from 'lodash/isEmpty'

const InputField = ({
                      type,
                      id,
                      label,
                      value,
                      error,
                      onChange,
                      className,
                      ...props
                    }) => (
  <FormGroup className={className}>
    {label && (<Label for={id}>{label}</Label>)}
    {isEmpty(error) ? (
      <Input
        bsSize="sm"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    ) : (
      <Input
        invalid
        bsSize="sm"
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
    )}
    {error ? (
      <FormFeedback>{error}</FormFeedback>
    ) : null}
  </FormGroup>
)

export default InputField;
