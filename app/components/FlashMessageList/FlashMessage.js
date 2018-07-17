import React, { Component } from 'react';
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types';
import classnames from 'classnames'



class FlashMessage extends Component {

  onClick = () => {
    const { deleteFlashMessage, message } = this.props;
    deleteFlashMessage(message.id);
  }

  render() {
    const { type, text } = this.props.message;

    return (
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}
      >
        <button onClick={this.onClick} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {};

export default FlashMessage;
