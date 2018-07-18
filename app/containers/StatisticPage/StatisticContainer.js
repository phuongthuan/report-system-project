import React, { Component } from 'react';
import isEmpty from "lodash/isEmpty";
import SideBar from 'components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BarChart from "../../components/Chart/BarChart";
import PieChart from "../../components/Chart/PieChart";

class StatisticContainer extends Component {
  render() {
    return (
      <div>
        <div className="row mt-5 mb-5">
          <div className="col-md-2">
            <SideBar/>
          </div>
          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <PieChart />
            </div>
          </div>

          <div className="col-md-5">
            {/*{loading && isEmpty(profile) ? (*/}
            {/*<FontAwesomeIcon icon="spinner" size="lg" spin/>*/}
            {/*) : (*/}
            {/*<div className="shadow-sm">*/}
            {/*Static Container*/}
            {/*</div>*/}
            {/*)}*/}
            <div className="shadow-sm">
              <BarChart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StatisticContainer;
