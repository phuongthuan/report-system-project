import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class StatisticContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-5 mb-5">
          <div className="col-md-4">
            <SideBar />
          </div>
          <div className="col-md-8">
            {/*{loading && isEmpty(profile) ? (*/}
              {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
              {/*<div className="shadow-sm">*/}
                {/*Static Container*/}
              {/*</div>*/}
            {/*)}*/}

            <div className="shadow-sm">
              Static Container
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticContainer;
