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
    dataSource: this.props.dataSource,
    data: {
      labels: [
        'Hard for Debugging',
        'Keeping up with Technology',
        'Communication with others',
        'Time Estimation',
        'Security Threats'
      ],
      datasets: [{
        data: [300, 100, 200, 50, 100],
        backgroundColor: [
          '#990099',
          '#3366cc',
          '#109618',
          '#DC3912',
          '#FF9900'
        ],
        hoverBackgroundColor: [
          '#990099',
          '#3366cc',
          '#109618',
          '#DC3912',
          '#FF9900'
        ]
      }]
    }
  }

  componentDidMount() {
    console.log('CDM', this.state.dataSource);
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
