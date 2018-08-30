import React, { PureComponent } from 'react';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import classnames from 'classnames'
import { Icon } from 'antd';

const Flash = styled.div`
  position: absolute;
  margin: 0 0 10px 10px;
  bottom: 0;
  left: 0;
  width: auto;
  z-index: 1;
`;

class FlashMessage extends PureComponent {

  static propTypes = {
    deleteFlashMessage: PropTypes.func,
    message: PropTypes.object
  };

  componentDidMount() {
    const {deleteFlashMessage, message} = this.props;
    setTimeout(() => {
      deleteFlashMessage(message.id);
    }, 4000)
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
