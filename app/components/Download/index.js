import React, { Component } from 'react';
import CsvCreator from 'react-csv-creator';
import { Button } from 'antd';

class Download extends Component {

  state = {
    headers: [
      {
        id: 'first',
        display: 'ID'
      },
      {
        id: 'second',
        display: 'Emotion'
      },
      {
        id: 'third',
        display: 'Title'
      },
      {
        id: 'fourth',
        display: 'Author'
      },
      {
        id: 'fifth',
        display: 'Date'
      },
    ],

    rows: this.props.data.map(row => ({
      first: row.id.toString(),
      second: row.emotion.colons,
      third: row.title,
      fourth: `${row.userId.firstName} ${row.userId.lastName}`,
      fifth: row.date
    }))
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: nextProps.data.map(row => ({
        first: row.id.toString(),
        second: row.emotion.colons,
        third: row.title,
        fourth: `${row.userId.firstName} ${row.userId.lastName}`,
        fifth: row.date
      }))
    });
  }

  render() {
    const { rows, headers } = this.state;
    return (
      <CsvCreator
        filename={`reports ${this.props.user.division}`}
        headers={headers}
        rows={rows}
      >
        <Button type="primary" icon="download" size="small">
          Export
        </Button>
      </CsvCreator>
    );
  }
}

export default Download;
