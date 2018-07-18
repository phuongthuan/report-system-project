import React, { Component } from 'react';
import SideBar from 'components/SideBar'
import MembersList from 'components/MembersList'

class MemberContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            <div className="shadow-sm">
              <MembersList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberContainer;
