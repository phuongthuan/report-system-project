import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2'
import PropTypes from 'prop-types';

class PieChart extends Component {

  static defaultProps = {
    displayName: 'Pie Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
  }

  state = {
    data: {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    }
  }


  render() {
    return (
      <div className="card-body">
        <Pie
          data={this.state.data}
          options={{
            title: {
              display: this.props.displayTitle,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}


export default PieChart;
