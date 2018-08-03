import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

export default class Input extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const { value, onChange } = this.props
    return (
      <Fragment>
        <input
          type="text"
          placeholder="Type your name..."
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </Fragment>
    )
  }
}
