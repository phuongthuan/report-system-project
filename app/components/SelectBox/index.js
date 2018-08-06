import React from 'react'
import { FieldArray, Field } from 'formik'
import { Button, FormGroup, ButtonGroup } from 'reactstrap'

const issues_type = [
  {value: 1, label: 'Hard for Debugging'},
  {value: 2, label: 'Keeping up with Technology'},
  {value: 3, label: 'Communication with others'},
  {value: 4, label: 'Time Estimation'},
  {value: 5, label: 'Security Threats'}
]

const SelectBox = ({values}) => (
  <FieldArray
    name="issues"
    render={arrayHelpers => (
      <div className="row mb-3">
        {values.issues && values.issues.length > 0 ? (
          values.issues.map((issue, index) => (
            <FormGroup className="d-flex" key={index}>
              <div className="col-md-8">
                <Field component="select" name={`issues.${index}`}>
                  <option>Select issue</option>
                  {issues_type.map(issue => (
                    <option
                      key={issue.value}
                      value={issue.label}
                    >
                      {issue.label}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="col-md-4">
                <ButtonGroup>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    <strong> - </strong>
                  </Button>
                  <Button
                    size="sm"
                    type="button"
                    onClick={() => arrayHelpers.insert(index, '')}
                  >
                    <strong> + </strong>
                  </Button>
                </ButtonGroup>
              </div>
            </FormGroup>
          ))
        ) : (
          <Button
            type="button"
            color="link"
            onClick={() => arrayHelpers.push('')}
          >
            + Add new issue
          </Button>
        )}
      </div>
    )}
  />
);

export default SelectBox;