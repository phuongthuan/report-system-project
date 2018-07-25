import React, { Component, Fragment } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import moment from 'moment';

class DateTimePicker extends Component {

  onChange = (date, dateString) => {
    console.log('Selected Date: ', date);
    console.log('Formatted Selected Time: ', dateString);
  }

  onOk = (value) => {
    console.log('onOk: ', value);
  }

  render() {
    return (
      <Fragment>
        <DatePicker
          onChange={this.onChange}
          placeholder="Select date"
          onOk={this.onOk}
        />
      </Fragment>
    );
  }
}

export default DateTimePicker;