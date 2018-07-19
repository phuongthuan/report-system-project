import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Navigation extends Component {

  state = {
    isOpen: false,
    today: moment(),
  };

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  render() {
    const { today } = this.state;
    return (
      <Navbar color="light" light expand="md" className="shadow-sm">
        <NavbarBrand>
          <FontAwesomeIcon icon="clock" />
          <span> {moment(today).format("dddd, MMM Do YYYY")}</span>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Displayed by
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Day
                </DropdownItem>
                <DropdownItem>
                  Week
                </DropdownItem>
                <DropdownItem>
                  Month
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
