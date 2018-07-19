import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';

class BarChart extends Component {

  static defaultProps = {
    displayName: 'Bar Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right'
  }

  state = {
    dataSource: this.props.dataSource,
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  }

  render() {
    const { dataSource, data } = this.state;
    return (
      <div className="card-body">
        <Bar
          data={data}
          width={50}
          height={30}
          options={{
            title: {
              display: this.props.displayTitle,
              fontSize:25
            },
            legend:{
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

BarChart.propTypes = {};

export default BarChart;
