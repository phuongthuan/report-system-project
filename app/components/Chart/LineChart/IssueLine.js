import React, { Component } from 'react';
import update from 'immutability-helper';
import { Card, CardBody } from 'reactstrap'
import { Line } from 'react-chartjs-2';
import count from '../../../utils/count'

class IssueLine extends Component {

  static defaultProps = {
    displayName: 'Line Chart',
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom',
  }

  state = {
    dataSource: this.props.dataSource,
    issues: [],
    data: {

      labels: ['June', 'July', 'August', 'September'],
      datasets: [
        {
          label: 'Hard for Debugging',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#990099',
          borderColor: '#990099',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#990099',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#990099',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81]
        },

        {
          label: 'Keeping up with Technology',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#3366cc',
          borderColor: '#3366cc',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#3366cc',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#3366cc',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [25, 49, 20, 51]
        },
        {
          label: 'Communication with others',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#109618',
          borderColor: '#109618',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#109618',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#109618',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [35, 79, 10, 51]
        },
        {
          label: 'Time Estimation',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#DC3912',
          borderColor: '#DC3912',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#DC3912',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#DC3912',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [55, 29, 60, 21]
        },
        {
          label: 'Security Threats',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#FF9900',
          borderColor: '#FF9900',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#FF9900',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#FF9900',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [78, 39, 40, 20]
        }
      ]
    }
  }

  componentDidMount() {
    const {dataSource} = this.props;
    const issues = [];

    dataSource.map(report => {
      report.issues.map(issue =>
        issues.push(issue)
      );
    });

    let newState = update(this.state, {
      data: {
        datasets: [
          {
            data: {$set: count(issues)}
          }
        ]
      }
    });

    this.setState(newState);
  }

  // componentWillReceiveProps(nextProps, state) {
  //   const issues = [];
  //   nextProps.dataSource.map(report => {
  //     report.issues.map(issue =>
  //       issues.push(issue)
  //     );
  //   });
  //
  //   // Update state using immutability-helper:
  //   let newState = update(this.state, {
  //     data: {
  //       datasets: [
  //         {
  //           data: {$set: count(issues)}
  //         }
  //       ]
  //     }
  //   });
  //   this.setState(newState);
  // }

  render() {

    return (
      <Card
        className="border-0 shadow-sm"
        style={{borderRadius: '0'}}
      >
        <CardBody>
          <Line
            data={this.state.data}
            options={{
              title: {
                display: this.props.displayTitle,
                fontSize: 25,
                text: 'Issues of reports changing by time'
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </CardBody>
      </Card>
    );
  }
}

export default IssueLine;
