import React, { Component } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { Icon } from 'antd';

const Flash = styled.div`
  position: absolute;
  margin: 0 10px 10px 0;
  bottom: 0;
  right: 0;
  width: auto;
  z-index: 1;
`;

class FlashMessage extends Component {

  static propTypes = {
    deleteFlashMessage: PropTypes.func,
    message: PropTypes.object
  };

  componentDidMount() {
    const {deleteFlashMessage, message} = this.props;
    setTimeout(() => {
      deleteFlashMessage(message.id);
    }, 2000)
  }

  render() {
    const {type, text} = this.props.message;
    return (
      <Flash className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}
      >
        {text}&nbsp;
        <Icon
          type={(() => {
            switch (type) {
              case "success":
                return "smile";
              case "error":
                return "frown";
              default:
                return "smile";
            }
          })()}
        />
      </Flash>
    );
  }
}

export default FlashMessage;
