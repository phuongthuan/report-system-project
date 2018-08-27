import React, { Component } from 'react';
import { Button, Dropdown, Menu, Icon } from 'antd'

class Language extends Component {

  handleMenuClick = (e) => {
    const { changeLocale } = this.props;
    changeLocale(e.item.props.children);
  }

  render() {

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">vi</Menu.Item>
        <Menu.Item key="2">en</Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button>
          <Icon type="global" />
        </Button>
      </Dropdown>
    );
  }
}

Language.propTypes = {};

export default Language;
